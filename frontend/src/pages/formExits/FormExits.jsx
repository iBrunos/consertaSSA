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
  const [exit_price, setExit_price] = useState("");
  const [type, setType] = useState("");
  const [payment, setPayment] = useState('');
  const [store, setStore] = useState('');
  const [editingItem, setEditingItem] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [parcelas, setParcelas] = useState("");

  const API_URL = 'https://api-happymakeup.vercel.app/exit';

  const handlepaymentChange = (e) => {
    setPayment(e.target.value);
    if (e.target.value === "Crédito") {
      setParcelas("");
    }
  };

  const handleParcelasChange = (e) => {
    setParcelas(e.target.value);
  };
  const changePageTitle = (newTitle) => {
    document.title = newTitle;
  };
  changePageTitle("Happy Makeup | Saídas");

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

  const addItem = async (e) => {
    e.preventDefault();

    const username = localStorage.getItem("username");
    const token = localStorage.getItem("token");

    const newItem = {
      product,
      observation,
      amount,
      exit_price,
      inserted_by,
      store,
      payment: payment + " " + parcelas,
      type,
    };
    newItem.inserted_by = username;
    newItem.type = "Saída";
    const response = await axios.post(API_URL, newItem, {
      headers: { Authorization: `Bearer ${token}` },
    });

    setItems([...items, response.data]);
    setProduct("");
    setObservation("");
    setAmount("");
    setStore("todos");
    setExit_price("");
    setPayment("");
    setType("Saída");
    fetchItems();
    toast.success("Saída criada com sucesso!");
  };

  const deleteItem = async (id) => {
    const token = localStorage.getItem("token");
    try {
      await axios.delete(`${API_URL}/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setItems(items.filter((item) => item._id !== id));
      toast.success("Saída apagada com sucesso!");
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
    setStore(item.store);
    setAmount(item.amount);
    setExit_price(item.exit_price);
    setPayment(item.payment);
    setInserted_by(item.inserted_by);
  };
  const updateItem = async (e) => {
    e.preventDefault();
    const username = localStorage.getItem("username");
    const updatedItem = {
      _id: editingItem,
      product,
      observation,
      amount,
      store,
      exit_price,
      inserted_by,
      payment: payment + " " + parcelas,
      type,
    };
    updatedItem.inserted_by = username;
    updatedItem.type = "Saída";

    const token = localStorage.getItem("token");

    const response = await axios.put(`${API_URL}/${editingItem}`, updatedItem, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setItems(
      items.map((item) => (item._id === editingItem ? response.data : item))
    );
    setObservation("");
    setAmount("");
    setExit_price("");
    setInserted_by("");
    setPayment("");
    setType("Saída");
    setEditingItem(null);
    fetchItems();
    toast.success("Saída atualizada com sucesso!");
  };

  return (
    <>
     <ToastContainer />
      <Header />
      <form
        onSubmit={editingItem !== null ? updateItem : addItem}
        className="flex lg:flex-row flex-col mb-0 mt-1 bg-white border-b-gray-200 border-b pl-8 pt-1 pb-2 ml-0"
      >
        <div className="relative mr-2 w-60 ">
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
            <p className="w-full py-2  pl-2 pr-8 text-gray-500 border-gray-300 bg-white border rounded-md shadow-sm outline-none appearance-none focus:border-pink-500 cursor-pointer">Cadastre um produto. </p>
          ) : (
            <div>
              <select
                className="w-full py-2 pl-2 pr-8 text-gray-500 border-gray-300 bg-white border rounded-md shadow-sm outline-none appearance-none focus:border-pink-500 cursor-pointer"
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
          className="mr-2 border-gray-300 border rounded-md p-2 lg:w-[30rem] w-[20rem] lg:mt-0 mt-2 outline-none appearance-none placeholder-gray-500 text-gray-500 focus:border-pink-500"
        />
        <div className="flex flex-row">
          <select
            className="lg:ml-0 ml-0 flex items-center space-x-2 border rounded-md p-2 text-gray-500 lg:mt-0 mt-2 mr-2 w-46 cursor-pointer"
            onChange={(e) => setStore(e.target.value)}
            value={store}
            required

          >
             <option value="" disabled selected>Loja</option>
            {localStorage.getItem("store") === "Loja 01" && (
              <option value="Loja 01">Loja 01</option>
            )}
            {localStorage.getItem("store") === "Loja 02" && (
              <option value="Loja 02">Loja 02</option>
            )}
            {localStorage.getItem("store") === "Todas" && (
              <>
                <option value="Loja 01">Loja 01</option>
                <option value="Loja 02">Loja 02</option>
              </>
            )}
          </select>
        </div>

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
        <div>
          <div className="flex flex-row">
            <select
              className="lg:ml-0 ml-0 flex items-center space-x-2 border rounded-md p-2 text-gray-500 lg:mt-0 mt-2 mr-2 w-46 cursor-pointer"
              onChange={handlepaymentChange}
              value={payment}
            >
              <option value="todos">Pagamento</option>
              <option value="Dinheiro">Dinheiro</option>
              <option value="Crédito">Crédito</option>
              <option value="Débito">Débito</option>
              <option value="Pix">Pix</option>
            </select>
            {payment === "Crédito" && (
              <select
                className="lg:ml-0 ml-0 flex items-center border rounded-md py-2 pl-2 text-gray-500 lg:mt-0 mt-2 mr-2 w-[6rem]"
                value={parcelas}
                onChange={handleParcelasChange}
              >
                <option value="">Parcelas</option>
                <option value="1x">1x </option>
                <option value="2x">2x </option>
                <option value="3x">3x </option>
                <option value="4x">4x </option>
                <option value="5x">5x </option>
                <option value="6x">6x </option>
                <option value="7x">7x </option>
                <option value="8x">8x </option>
                <option value="9x">9x </option>
                <option value="10x">10x </option>
                <option value="11x">11x </option>
                <option value="12x">12x </option>
              </select>
            )}
          </div>
        </div>
        <input
          type="number"
          inputMode="decimal"
          value={exit_price}
          placeholder="Preço de Saída"
          onChange={(e) => setExit_price(e.target.value)}
          className="mr-2 border-gray-300 border rounded-md py-2 pl-2 lg:w-[10rem] w-[20rem] lg:mt-0 mt-2 outline-none appearance-none placeholder-gray-500 text-gray-500 focus:border-pink-500"
          min="0"
          max="9999.99"
          step="0.01"
          required
        />
        <button
          type="submit"
          className="mr-10 border rounded-md p-2 lg:mt-0 mt-2 bg-pink-500 text-white font-medium hover:bg-pink-600 w-40 lg:w-40"
        >
          {editingItem !== null ? "Salvar Saída" : "Adicionar Saída"}
        </button>
        <section className="flex items-center border rounded-md p-2  ml-0 lg:w-64 w-40 lg:mt-0 mt-2 lg:ml-[15rem] mr-[2rem] focus:border-pink-500">
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
            className="outline-none appearance-none placeholder-gray-500 text-gray-500 lg:w-64 w-32 "
            onChange={(e) => setSearchTerm(e.target.value)}
            type="text"
            placeholder="Pesquisar"
            id="input__pesquisar"
          />
        </section>
      </form>
      <div className="p-0 m-2 text-center">
        <h3 className="text-gray-800 text-4xl font-bold text-center ">
          SAÍDA DE PRODUTOS
        </h3>
      </div>
      <div className="bg-white mx-auto px-4 md:px-8">
        <div className="mt-1 shadow-sm border rounded-lg overflow-x-auto max-h-[44rem]">
          {items.length === 0 ? (
            <p className="text-gray-800 text-4xl font-extralight text-center ">
              {" "}
              Nenhuma saída encontrada.
            </p>
          ) : (
            <table className="w-full table-auto text-sm text-left">
              <thead className="bg-gray-50 text-gray-600 font-medium border-b">
                <tr>
                  <th className="py-3 px-6">Produto</th>
                  <th className="py-3 px-6">Observação</th>
                  <th className="py-3 px-6">Quantidade</th>
                  <th className="py-3 px-6">Forma de Pagamento</th>
                  <th className="py-3 px-6">Preço de Saída</th>
                  <th className="py-3 px-6">Funcionário</th>
                  <th className="py-3 px-6">Loja</th>
                  <th className="py-3 px-6">Criado</th>
                  <th className="py-3 px-6">Editado</th>
                  <th className="py-3 px-6">Ações</th>
                </tr>
              </thead>
              <tbody className="text-gray-600 divide-y">
                {items
                  .filter((item) => {
                    const getStore = localStorage.getItem("store");
                    const searchTermUnidecoded = unidecode(
                      searchTerm?.toLowerCase() || ""
                    );
                    const storeMatches =
                      getStore === "Todas" || getStore === item.store; // Novo filtro de loja corrigido
                    const itemUserUnidecoded = unidecode(
                      item.product?.toLowerCase() || ""
                    ); // aqui foi adicionado o teste para item.product ser nulo ou indefinido
                    if (searchTermUnidecoded === "" && storeMatches) {
                      return item;
                    } else if (
                      itemUserUnidecoded.includes(searchTermUnidecoded) && storeMatches
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
                      <td className="px-6 py-4 whitespace-normal break-words w-[30rem]">
                        {item.observation}
                      </td>
                      <td className="px-6 py-4 whitespace-normal break-words">
                        {item.amount}
                      </td>
                      <td className="px-6 py-4 whitespace-normal break-words">
                        {item.payment}
                      </td>
                      <td className="px-6 py-4 whitespace-normal break-words">
                        R$: {item.exit_price}
                      </td>
                      <td className="px-8 py-4 whitespace-nowrap">
                        {item.inserted_by}
                      </td>
                      <td className="px-6 py-4 whitespace-normal break-words">
                        {item.store}
                      </td>
                      <td className="px-6 py-4 whitespace-normal break-words">
                        {formatDateHours(item.created_at)}
                      </td>
                      <td className="px-6 py-4 whitespace-normal break-words">
                        {formatDateHours(item.updated_at)}
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
