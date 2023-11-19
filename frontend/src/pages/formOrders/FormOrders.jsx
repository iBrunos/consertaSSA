import { useState, useEffect } from "react";
import axios from "axios";
import Header from "../../components/header/Header";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import unidecode from "unidecode";
import moment from 'moment';

import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from 'react-toastify';

export default function FormOrders() {
  const [items, setItems] = useState([]);
  const [type, setType] = useState("");
  const [status, setStatus] = useState("");
  const [anexos, setAnexos] = useState("");
  const [editingItem, setEditingItem] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const API_URL = 'http://localhost:3000/order';

  const changePageTitle = (newTitle) => {
    document.title = newTitle;
  };
  changePageTitle("ConsertaSSA | Pedidos");

  const fetchItems = async () => {
    const token = localStorage.getItem("token");
    // definir o cabeçalho `Authorization` com o token JWT
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    // fazer uma solicitação HTTP GET para a rota protegida com o token JWT
    try {
      const response = await axios.get(API_URL, config);
      setItems(response.data);
      console.log(items)

    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);


  const addItem = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    const newItem = {
      type,
      status,
    };

    const formData = new FormData();
    formData.append("anexos", anexos);
    formData.append("type", newItem.type);
    formData.append("status", newItem.status);

    try {
      const response = await axios.post(API_URL, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      setItems([...items, response.data]);
      setType("");
      setStatus("");
      setAnexos(null); // Reset the selected image file to null
      fetchItems();
      toast.success("Pedido criado com sucesso!"); // Enable toast for success
    } catch (error) {
      console.error(error);
      toast.error("Erro ao criar pedido."); // Add toast for error
    }
  };
  const deleteItem = async (id) => {
    const token = localStorage.getItem("token");
    try {
      await axios.delete(`${API_URL}/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setItems(items.filter((item) => item._id !== id));
      toast.success("Pedido apagado com sucesso!");
    } catch (error) {
      console.error(error);
    }
  };

  const editItem = async (id) => {
    const token = localStorage.getItem("token");

    setEditingItem(id);
    const response = await axios.get(`${API_URL}/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    const item = response.data;
    setType(item.type);
    setStatus(item.status);

  };
  function formatDate(dateString) {
    const date = moment(dateString).format("DD/MM/YYYY");
    return date;
  }
  const updateItem = async (e) => {
    e.preventDefault();
    const updatedItem = {
      _id: editingItem,
      type,
      status,
      anexos,
    };
    const formData = new FormData();
    formData.append("_id", updatedItem._id);
    formData.append("anexos", updatedItem.anexos); // Add the image file to the form data
    formData.append("type", updatedItem.type);
    formData.append("status", updatedItem.status);

    const token = localStorage.getItem("token");

    const response = await axios.put(`${API_URL}/${editingItem}`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data", // Set the content type to multipart/form-data
      },
    });
    setItems(
      items.map((item) => (item._id === editingItem ? response.data : item))
    );
    setType("");
    setStatus("");
    setAnexos("");
    setEditingItem(null);
    fetchItems();
    //toast.success("Pedido atualizado com sucesso!");
  };
  return (
    <>
      <ToastContainer />
      <Header />
      <form
        onSubmit={editingItem !== null ? updateItem : addItem}
        className="flex lg:flex-row flex-col mb-0 mt-1 bg-white border-b-gray-200 border-b pl-8 pt-1 pb-2 ml-0"
      >
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="mr-2 border-gray-300 border rounded-md p-2 lg:w-[16em] w-[20rem] lg:mt-0 mt-2 outline-none appearance-none placeholder-gray-500 text-gray-500 focus:border-pink-500"
          id="select__type"
          required
        >
          <option value="">Selecione o Tipo de Solicitação</option>
          <option value="Conserto de rua">Conserto de rua</option>
          <option value="Vazamento">Vazamento</option>
          <option value="Esgoto">Esgoto</option>
        </select>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="mr-2 border-gray-300 border rounded-md p-2 lg:w-[10rem] w-[20rem] lg:mt-0 mt-2 outline-none appearance-none placeholder-gray-500 text-gray-500 focus-border-pink-500"
          id="select__status"
          required
        >
          <option value="">Selecione o Status</option>
          <option value="Aberto">Aberto</option>
          <option value="Fechado">Fechado</option>
          <option value="Em andamento">Em andamento</option>
        </select>
        <label
          htmlFor="meuArquivo"
          className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded cursor-pointer lg:mt-0 mt-2 w-[9rem]"
        >
          Escolher Foto
        </label>
        <input
          type="file"
          accept="image/*"
          id="meuArquivo"
          onChange={(e) => setAnexos(e.target.files[0])}
          className="my-0 border-gray-300 rounded-sm outline-none appearance-none placeholder-pink-500 text-gray-500 focus:border-pink-500 hidden"
        />
        <button
          type="submit"
          className="block mr-16 lg:mt-0 mt-2 w-[10rem] border rounded-md lg:ml-2 ml-0 p-2 bg-orange-500 text-white font-medium hover:bg-orange-600"
        >
          {editingItem !== null ? "Salvar Pedido" : "Adicionar Pedido"}
        </button>
        <section className="flex items-center space-x-2 border rounded-md p-2 lg:mt-0 mt-2 lg:w-64 w-[20rem] focus:border-pink-500 lg:ml-[43rem]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 flex-none text-gray-300"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <input
            className="outline-none appearance-none placeholder-gray-500 text-gray-500 lg:w-64 w-[20rem] "
            onChange={(e) => setSearchTerm(e.target.value)}
            type="text"
            placeholder="Pesquisar"
            id="input__pesquisar"
          />
        </section>
      </form>
      <div className="p-0 m-2 text-center">
        <h3 className="text-gray-800 text-4xl font-bold text-center ">
          SEUS PEDIDOS
        </h3>
      </div>
      <div className="bg-white mx-auto px-4 md:px-8">
        <div className="mt-1 shadow-sm border rounded-lg overflow-x-auto max-h-[44rem]">
          {items.length === 0 ? (
            <p className="text-gray-800 text-4xl font-extralight text-center ">
              {" "}
              Nenhum item encontrado.
            </p>
          ) : (
            <table className="w-full table-auto text-sm text-left">
              <thead className="bg-gray-50 text-gray-600 font-medium border-b">
                <tr>
                  <th className="py-3 px-6">Tipo de Solicitação</th>
                  <th className="py-3 px-6">Data</th>
                  <th className="py-3 px-6">Status</th>
                  <th className="py-3 px-6">Anexo</th>

                </tr>
              </thead>
              <tbody className="text-gray-600 divide-y">
                {items
                  .filter((item) => {
                    const searchTermUnidecoded = unidecode(
                      searchTerm?.toLowerCase() || ""
                    );
                    const itemUserUnidecoded = unidecode(
                      item.type?.toLowerCase() || ""
                    );
                    if (searchTermUnidecoded === "") {
                      return true;
                    } else if (
                      itemUserUnidecoded.includes(searchTermUnidecoded)
                    ) {
                      return true;
                    }
                    return false;
                  })
                  .map((item, index) => (
                    <tr className="w-full" key={item._id || index}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {item.type}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {formatDate(item.createdAt)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {item.status}
                      </td>
                      <td className="px-6 py-4 whitespace-normal break-words w-96">
                        {item.anexos && (
                          <img
                            src={URL.createObjectURL(new Blob([new Uint8Array(item.anexos.data)], { type: 'image/png' }))}
                            alt="Anexos"
                            className="w-full h-full sm:w-20 rounded-full border lg:border-2"
                          />
                        )}
                      </td>

                      <td className="px-6 whitespace-nowrap">
                        <button
                          onClick={() => editItem(item._id)}
                          className="py-1 px-2 font-medium text-white duration-150 hover:bg-indigo-700 bg-indigo-600 rounded-lg mr-1"
                        >
                          <EditIcon className="mr-1" />
                          Editar
                        </button>
                        <button
                          onClick={() => deleteItem(item._id)}
                          className="py-1 leading-none px-2 font-medium text-white duration-150 bg-red-600 hover:bg-red-700 rounded-lg"
                        >
                          <DeleteForeverIcon className="mr-1" />
                          Deletar
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
}