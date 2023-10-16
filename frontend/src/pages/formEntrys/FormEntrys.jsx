import { useState, useEffect } from "react";
import axios from "axios";
import Header from "../../components/header/Header";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import moment from "moment";
import unidecode from "unidecode";
import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from 'react-toastify';

export default function FormProducts() {
  const [items, setItems] = useState([]);
  const [items2, setItems2] = useState([]);
  const [product, setProduct] = useState("");
  const [observation, setObservation] = useState("");
  const [inserted_by, setInserted_by] = useState("");
  const [amount, setAmount] = useState("");
  const [entry_price, setEntry_price] = useState("");
  const [type, setType] = useState("");
  const [store, setStore] = useState("");
  const [in_stock] = useState("");
  const [expiration_date, setExpiration_date] = useState("");
  const [editingItem, setEditingItem] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const API_URL = 'https://api-happymakeup.vercel.app/entry';
  //const API_URL = 'http://localhost:3000/entry';
  const changePageTitle = (newTitle) => {
    document.title = newTitle;
  };
  changePageTitle("Happy Makeup | Entradas");

  useEffect(() => {
    fetchItems();
    dropDown();
  }, []);

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

  const dropDown = async () => {
    const token = localStorage.getItem("token");
    // definir o cabeçalho `Authorization` com o token JWT
    const config2 = {
      headers: { Authorization: `Bearer ${token}` },
    };
    // fazer uma solicitação HTTP GET para a rota protegida com o token JWT
    try {
      const response2 = await axios.get(
        "https://api-happymakeup.vercel.app/product",
        config2
      );
      setItems2(response2.data);
    } catch (error) {
      console.error(error);
    }
  };

  function formatDateHours(dateString) {
    const date = moment(dateString).format("DD/MM/YYYY [às] HH:mm");
    return date;
  }
  function formatDate(dateString) {
    const date = moment(dateString).format("DD/MM/YYYY");
    return date;
  }

  const addItem = async (e) => {
    e.preventDefault();

    const username = localStorage.getItem("username");
    const token = localStorage.getItem("token");
    formatDate(expiration_date)
    const newItem = {
      product,
      observation,
      amount,
      entry_price,
      inserted_by,
      store,
      expiration_date,
      type,
    };
    newItem.inserted_by = username;
    newItem.type = "Entrada";

    const response = await axios.post(API_URL, newItem, {
      headers: { Authorization: `Bearer ${token}` },
    });

    setItems([...items, response.data]);
    setProduct("");
    setObservation("");
    setAmount("");
    setEntry_price("");
    setType("Entrada");
    setExpiration_date("");
    setStore("");
    fetchItems();
    toast.success("Entrada criada com sucesso!");
  };

  const deleteItem = async (id) => {
    const token = localStorage.getItem("token");
    try {
      await axios.delete(`${API_URL}/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setItems(items.filter((item) => item._id !== id));
      toast.success("Entrada apagada com sucesso!");
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
    setObservation(item.observation);
    setAmount(item.amount);
    setEntry_price(item.entry_price);
    setInserted_by(item.inserted_by);
    setExpiration_date(item.expiration_date);
    setStore(item.store);
  };
  const updateItem = async (e) => {
    e.preventDefault();
    const username = localStorage.getItem("username");
    formatDate(expiration_date)
    const updatedItem = {
      _id: editingItem,
      product,
      observation,
      amount,
      entry_price,
      inserted_by,
      expiration_date,
      store,
      type,
      in_stock
    };
    updatedItem.inserted_by = username;
    updatedItem.type = "Entrada";
    updatedItem.in_stock = true;
    const token = localStorage.getItem("token");

    const response = await axios.put(`${API_URL}/${editingItem}`, updatedItem, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setItems(
      items.map((item) => (item._id === editingItem ? response.data : item))
    );
    setObservation("");
    setAmount("");
    setEntry_price("");
    setInserted_by("");
    setType("Entrada");
    setStore("");
    setExpiration_date("")
    setEditingItem(null);
    fetchItems();
    toast.success("Entrada atualizada com sucesso!");
  };

  return (
    <>
      <ToastContainer />
      <Header />
      <form
        onSubmit={editingItem !== null ? updateItem : addItem}
        className="flex lg:flex-row flex-col mb-0 mt-1 bg-white border-b-gray-200 border-b pl-8 pt-1 pb-2 ml-0"
      >
        <div className="relative w-[20rem] mr-2 ">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="absolute top-0 bottom-0 w-6 h-6 my-auto text-pink-500 right-1"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
          {items2.length === 0 ? (
            <p className="w-full py-2  pl-2 pr-6 text-gray-500 border-gray-300 bg-white border rounded-md shadow-sm outline-none appearance-none focus:border-pink-500 cursor-pointer">Cadastre um produto. </p>
          ) : (
            <div>
              <select
                className="w-full py-2  pl-2 pr-6 text-gray-500 border-gray-300 bg-white border rounded-md shadow-sm outline-none appearance-none focus:border-pink-500 cursor-pointer"
                value={product}
                onChange={(e) => setProduct(e.target.value)}
                required // adicionado o atributo required
              >
                <option value="">Selecione um produto</option>
                {items2.map((item2) => (
                  <option
                    key={item2.id}
                    className="hover:text-pink-500 hover:bg-pink-50"
                    value={item2.product}
                  >
                    {item2.product}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>

        <input
          type="text"
          value={observation}
          placeholder="Observação"
          onChange={(e) => setObservation(e.target.value)}
          className="mr-2 border-gray-300 border rounded-md p-2 lg:w-[20rem] w-[20rem] lg:mt-0 mt-2 outline-none appearance-none placeholder-gray-500 text-gray-500 focus:border-pink-500"
        />
        <input
          type="number"
          value={amount}
          placeholder="Quantidade"
          onChange={(e) => setAmount(e.target.value)}
          className="mr-2 border-gray-300 border rounded-md p-2 lg:w-[10rem] w-[20rem] lg:mt-0 mt-2 outline-none appearance-none placeholder-gray-500 text-gray-500 focus:border-pink-500"
          min="0"
          max="9999"
          required
        />
        <input
          type="number"
          inputMode="decimal"
          value={entry_price}
          placeholder="Preço de Entrada"
          onChange={(e) => setEntry_price(e.target.value)}
          className="mr-2 border-gray-300 border rounded-md p-2 lg:w-[10rem] w-[20rem] lg:mt-0 mt-2 outline-none appearance-none placeholder-gray-500 text-gray-500 focus:border-pink-500"
          min="0"
          max="9999.99"
          step="0.01"
          required
        />
        <div className="relative w-20 mr-2 text-pink-500 lg:mt-0 mt-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="absolute top-0 bottom-0 w-6 h-6 my-auto text-pink-500 right-1"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
          <select
            className="w-20 py-2 pl-1 pr-5 text-gray-500 border-gray-300 bg-white border rounded-md shadow-sm outline-none appearance-none focus:border-pink-500 cursor-pointer"
            value={store}
            onChange={(e) => setStore(e.target.value)}
            required
          >
            <option value="">Loja</option>
            <option className="hover:text-pink-500 hover:bg-pink-50">
              Loja 01
            </option>
            <option className="hover:text-pink-500 hover:bg-pink-50">
              Loja 02
            </option>
          </select>
        </div>
        <label
          htmlFor="validade"
          className=" text-gray-400 align-middle px-2 py-2 rounded lg:mt-0 mt-2 w-[5rem]"
        >
          Validade:
        </label>
        <input
          id="validade"
          className="mr-2 border-gray-300 border rounded-md p-2 lg:w-[8.7rem] w-[10rem] lg:mt-0 mt-2 outline-none appearance-none placeholder-gray-500 text-gray-500 focus:border-pink-500"
          type="date"
          value={expiration_date}
          onChange={(e) => setExpiration_date(e.target.value)}
          placeholder="Data de validade"
          required
        />
        <button
          type="submit"
          className="mr-10 border rounded-md p-2 lg:mt-0 mt-2 bg-pink-500 text-white font-medium hover:bg-pink-600 w-40 lg:w-40"
        >
          {editingItem !== null ? "Salvar Entrada" : "Adicionar Entrada"}
        </button>

        <section className="flex items-center border rounded-md p-2 lg:ml-[12rem] ml-0 mr-2 lg:w-64 w-40 lg:mt-0 mt-2 focus:border-pink-500">
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
            className="outline-none appearance-none placeholder-gray-500 text-gray-500 lg:w-44 w-32 "
            onChange={(e) => setSearchTerm(e.target.value)}
            type="text"
            placeholder="Pesquisar"
            id="input__pesquisar"
          />
        </section>
      </form>
      <div className="p-0 m-2 text-center">
        <h3 className="text-gray-800 text-4xl font-bold text-center ">
          ENTRADA DE PRODUTOS
        </h3>
      </div>
      <div className="bg-white mx-auto px-4 md:px-8">
        <div className="mt-1 shadow-sm border rounded-lg overflow-x-auto max-h-[44rem]">
          {items.length === 0 ? (
            <p className="text-gray-800 text-4xl font-extralight text-center ">
              {" "}
              Nenhuma entrada encontrada.
            </p>
          ) : (
            <table className="w-full table-auto text-sm text-left">
              <thead className="bg-gray-50 text-gray-600 font-medium border-b">
                <tr>
                  <th className="py-3 px-6">Produto</th>
                  <th className="py-3 px-6">Observação</th>
                  <th className="py-3 px-6">Quantidade</th>
                  <th className="py-3 px-6">Preço de Entrada</th>
                  <th className="py-3 px-6">Loja Inserida</th>
                  <th className="py-3 px-6">Funcionário</th>
                  <th className="py-3 px-6">Validade</th>
                  <th className="py-3 px-6">Criado</th>
                  <th className="py-3 px-6">Editado</th>
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
                    ); // aqui foi adicionado o teste para item.product ser nulo ou indefinido
                    if (searchTermUnidecoded === "") {
                      return item;
                    } else if (
                      itemUserUnidecoded.includes(searchTermUnidecoded)
                    ) {
                      return item;
                    }
                    return null;
                  })
                  .map((item) => (
                    <tr key={item.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {item.product}
                      </td>
                      <td className="px-6 py-4 whitespace-normal break-words w-[40rem]">
                        {item.observation}
                      </td>
                      <td className="px-6 py-4 whitespace-normal break-words">
                        {item.amount}
                      </td>
                      <td className="px-6 py-4 whitespace-normal break-words">
                        R$: {item.entry_price}
                      </td>
                      <td className="px-8 py-4 whitespace-nowrap">
                        {item.store}
                      </td>
                      <td className="px-8 py-4 whitespace-nowrap">
                        {item.inserted_by}
                      </td>
                      <td className="px-8 py-4 whitespace-nowrap">
                        {formatDate(item.expiration_date)}
                      </td>
                      <td className="px-6 py-4 whitespace-normal break-words">
                        {formatDateHours(item.created_at)}
                      </td>
                      <td className="px-6 py-4 whitespace-normal break-words">
                        {formatDateHours(item.updated_at)}
                      </td>
                      <td className=" px-6 whitespace-nowrap">
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
  )
}