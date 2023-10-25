import { useState, useEffect } from "react";
import axios from "axios";
import Header from "../../components/header/Header";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import unidecode from "unidecode";
import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from 'react-toastify';

export default function FormOrders() {
  const [items, setItems] = useState([]);
  const [type, setType] = useState("");
  const [status, setStatus] = useState("");
  const [anexos, setAnexos] = useState();
  const [editingItem, setEditingItem] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const API_URL = 'https://api-happymakeup.vercel.app/product';

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

    // Create a new FormData object
    const formData = new FormData();
    formData.append("avatar", avatar); // Add the image file to the form data
    formData.append("type", newItem.type);
    formData.append("status", newItem.status);

    try {
      const response = await axios.post(API_URL, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data", // Set the content type to multipart/form-data
        },
      });
      setItems([...items, response.data]);
      setType("");
      setStatus("");
      setAvatar(""); // Reset the selected image file
      fetchItems();
      toast.success("Pedido criado com sucesso!");
    } catch (error) {
      console.error(error);
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
    toast.success("Pedido atualizado com sucesso!");
  };
  return (
    <>
    <ToastContainer />
      <Header />
      <form
        onSubmit={editingItem !== null ? updateItem : addItem}
        className="flex lg:flex-row flex-col mb-0 mt-1 bg-white border-b-gray-200 border-b pl-8 pt-1 pb-2 ml-0"
      >
        <input
          type="text"
          value={type}
          placeholder="Pedido"
          onChange={(e) => setType(e.target.value)}
          className="mr-2 border-gray-300 border rounded-md p-2 lg:w-[10rem] w-[20rem] lg:mt-0 mt-2 outline-none appearance-none placeholder-gray-500 text-gray-500 focus:border-pink-500"
          id="input__product"
          required
        />
        <input
          type="number"
          inputMode="decimal"
          lang="en-US"
          value={status}
          placeholder="Preço"
          onChange={(e) => setStatus(e.target.value)}
          required
          min="0"
          max="9999.99"
          step="0.01"
          className="mr-2 border-gray-300 border rounded-md p-2 lg:w-[10rem] w-[20rem] lg:mt-0 mt-2 outline-none appearance-none placeholder-gray-500 text-gray-500 focus:border-pink-500"
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
                  <th className="py-3 px-6">Pedido</th>
                  <th className="py-3 px-6">Preço</th>
                  <th className="py-3 px-6">Marca</th>
                  <th className="py-3 px-6">Descrição</th>
                  <th className="py-3 px-6">Funcionário</th>
                  <th className="py-3 px-6">Ações</th>
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
                        R$: {item.price}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {item.brand}
                      </td>
                      <td className="px-6 py-4 whitespace-normal break-words w-96">
                        {item.description}
                      </td>
                      <td className="px-8 py-4 whitespace-nowrap">
                        {item.inserted_by}
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
