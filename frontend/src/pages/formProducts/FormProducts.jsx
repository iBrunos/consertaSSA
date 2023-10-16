import { useState, useEffect } from "react";
import axios from "axios";
import Header from "../../components/header/Header";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import unidecode from "unidecode";
import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from 'react-toastify';

export default function FormProducts() {
  const [items, setItems] = useState([]);
  const [product, setProduct] = useState("");
  const [price, setPrice] = useState("");
  const [brand, setBrand] = useState("");
  const [description, setDescription] = useState("");
  const [inserted_by, setInserted_by] = useState("");
  const [editingItem, setEditingItem] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const API_URL = 'https://api-happymakeup.vercel.app/product';

  const changePageTitle = (newTitle) => {
    document.title = newTitle;
  };
  changePageTitle("Happy Makeup | Cadastro");

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

    const username = localStorage.getItem("username");
    const token = localStorage.getItem("token");

    const newItem = {
      product,
      price,
      brand,
      description,
      inserted_by,
    };
    newItem.inserted_by = username;

    const response = await axios.post(API_URL, newItem, {
      headers: { Authorization: `Bearer ${token}` },
    });

    setItems([...items, response.data]);
    setProduct("");
    setPrice("");
    setBrand("");
    setDescription("");
    fetchItems();
    toast.success("Produto criado com sucesso!");
  };
  const deleteItem = async (id) => {
    const token = localStorage.getItem("token");
    try {
      await axios.delete(`${API_URL}/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setItems(items.filter((item) => item._id !== id));
      toast.success("Produto apagado com sucesso!");
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
    setProduct(item.product);
    setPrice(item.price);
    setBrand(item.brand);
    setDescription(item.description);
    setInserted_by(item.inserted_by);
  };

  const updateItem = async (e) => {
    e.preventDefault();
    const username = localStorage.getItem("username");
    const updatedItem = {
      _id: editingItem,
      product,
      price,
      brand,
      description,
      inserted_by,
    };
    updatedItem.inserted_by = username;

    const token = localStorage.getItem("token");

    const response = await axios.put(`${API_URL}/${editingItem}`, updatedItem, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setItems(
      items.map((item) => (item._id === editingItem ? response.data : item))
    );
    setProduct("");
    setPrice("");
    setBrand("");
    setDescription("");
    setInserted_by("");
    setEditingItem(null);
    fetchItems();
    toast.success("Produto Atualizado com sucesso!");
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
          value={product}
          placeholder="Produto"
          onChange={(e) => setProduct(e.target.value)}
          className="mr-2 border-gray-300 border rounded-md p-2 lg:w-[10rem] w-[20rem] lg:mt-0 mt-2 outline-none appearance-none placeholder-gray-500 text-gray-500 focus:border-pink-500"
          id="input__product"
          required
        />
        <input
          type="number"
          inputMode="decimal"
          lang="en-US"
          value={price}
          placeholder="Preço"
          onChange={(e) => setPrice(e.target.value)}
          required
          min="0"
          max="9999.99"
          step="0.01"
          className="mr-2 border-gray-300 border rounded-md p-2 lg:w-[10rem] w-[20rem] lg:mt-0 mt-2 outline-none appearance-none placeholder-gray-500 text-gray-500 focus:border-pink-500"
        />

        <input
          type="text"
          value={brand}
          placeholder="Marca"
          onChange={(e) => setBrand(e.target.value)}
          className="mr-2 border-gray-300 border rounded-md p-2 lg:w-[10rem] w-[20rem] lg:mt-0 mt-2 outline-none appearance-none placeholder-gray-500 text-gray-500 focus:border-pink-500"
          required
        />
        <input
          type="text"
          value={description}
          placeholder="Descrição"
          onChange={(e) => setDescription(e.target.value)}
          className="mr-2 border-gray-300 border rounded-md p-2 lg:w-[10rem] w-[20rem] lg:mt-0 mt-2 outline-none appearance-none placeholder-gray-500 text-gray-500 focus:border-pink-500"
          
        />
        <button
          type="submit"
          className="block mr-16 lg:mt-0 mt-2 w-[10rem] border rounded-md lg:ml-2 ml-0 p-2 bg-pink-500 text-white font-medium hover:bg-pink-600"
        >
          {editingItem !== null ? "Salvar Produto" : "Adicionar Produto"}
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
          CADASTRO DE PRODUTOS
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
                  <th className="py-3 px-6">Produto</th>
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
                      item.product?.toLowerCase() || ""
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
                        {item.product}
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
