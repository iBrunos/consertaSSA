import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import jwt_decode from "jwt-decode";
import logo from "../../assets/imgs/logoConsertaSSA.png";
import wallpaper from "../../assets/imgs/wallpaper.png";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [rememberMe, setRememberMe] = useState(false);
  const [modalAberto, setModalAberto] = useState(false);

  const abrirModal = () => {
    setModalAberto(true);
  };

  const fecharModal = () => {
    setModalAberto(false);
  };

  const handleBotaoClick = () => {
    abrirModal();
  };
  const changePageTitle = (newTitle) => {
    document.title = newTitle;
  };
  changePageTitle("ConsertaSSA | Login");

  useEffect(() => {
    if (localStorage.getItem("checkError") === "true") {
      window.alert(
        "Você precisa fazer login para acessar essa página.\nCaso Esteja com algum erro, chame o suporte."
      );
      localStorage.removeItem("checkError");
    }
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = jwt_decode(token);
      const currentTime = Date.now() / 1000;

      if (decodedToken.exp > currentTime) {
        navigate("/user/pedidos");
      }
    }
  }, [navigate]);

  const handleRememberMe = () => {
    setRememberMe(!rememberMe);
    if (!rememberMe) {
      const credentials = { email, password };
      localStorage.setItem("credentials", JSON.stringify(credentials));
    } else {
      localStorage.removeItem("credentials");
    }
  };

  useEffect(() => {
    const savedCredentials = JSON.parse(localStorage.getItem("credentials"));
    if (savedCredentials) {
      setEmail(savedCredentials.email);
      setPassword(savedCredentials.password);
      setRememberMe(true);
    }
  }, []);

  const login = async (e) => {
    e.preventDefault();
    const newItem = { email, password };
    const response = await axios.post(
      "http://localhost:3000/auth",
      newItem
    );
    const data = response.data;
    if (data.message === "Login realizado com sucesso.") {
      localStorage.setItem("token", data.token);
      localStorage.setItem("email", data.email);
      localStorage.setItem("username", data.username);
      localStorage.setItem("userId", data.id);
      localStorage.setItem("level", data.level);
      localStorage.setItem("store", data.store);
      navigate("/user/pedidos");
    } else {
      setPassword("");
      setEmail("");
      alert(data.message);
    }
  };

  return (
    <>
      <section className="bg-white lg:py-[13rem] py-[7rem] overflow-y-hidden">
        <div className="flex w-full max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-lg lg:max-w-4xl">
          <div
            className="hidden bg-cover lg:block lg:w-full"
            style={{ backgroundImage: `url(${wallpaper})` }}
          >
          </div>
          <form onSubmit={login} className="w-full px-6 py-8 md:px-8 lg:w-1/2">
            <div className="flex justify-center mx-auto mb-20" >
              <img className="w-auto h-[5rem] my-[-2rem]" src={logo} alt="logo" />
            </div>
            <h2 className="mt-2 text-2xl lg:w-80 w-[22rem] font-normal tracking-wide text-center text-gray-800  md:text-3xl">
              Bem vindo ao, Sistema de Pedidos
            </h2>
            <p className="my-2 text-2xl font-normal tracking-wide text-left text-gray-800  md:text-xl">
              Realize seu login:
            </p>
            <div className="">
              <label
                className="block mb-2 text-sm font-medium text-gray-600"
                htmlFor="LoggingEmailAddress"
              >
                E-mail
              </label>
              <input
                id="LoggingEmailAddress"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg focus:border-orange-400 focus:ring-opacity-40 dark:focus:border-orange-300 focus:outline-none focus:ring focus:ring-orange-300"
                type="email" placeholder="seuemail@exemplo.com"
                required
              />
            </div>

            <div className="mt-4">
              <div className="flex justify-between">
                <label
                  className="block mb-2 text-sm font-medium text-gray-600"
                  htmlFor="loggingPassword"
                >
                  Senha
                </label>
                <div>
                  <a
                    href="#"
                    className="text-xs text-gray-500 hover:underline hover:text-orange-500"
                    onClick={handleBotaoClick}
                  >
                    Esqueceu sua senha?
                  </a>

                  {modalAberto && (
                    <section
                      id="password-change-banner"
                      className="fixed z-50 inset-0 flex items-center justify-center bg-black bg-opacity-60"
                    >
                      <div className="max-w-md shadow-2xl p-4 mx-auto bg-white border-2 border-orange-200 rounded-2xl">
                        <h2 className="font-semibold text-gray-800 ">
                          🔒 Esqueceu a sua senha? 🔑
                        </h2>

                        <p className="mt-4 text-sm text-gray-600">
                          Caso tenha esquecido ou perdido sua senha, por favor, entre em
                          contato com o <span className="text-orange-600">suporte</span> ou o seu <span className="text-orange-600">gerente</span> designado para
                          obter assistência na recuperação da sua senha.
                        </p>
                        <p className="mt-4 text-sm text-gray-600">
                          Lembre-se de armazenar sua senha de forma segura.
                        </p>

                        <div className="flex justify-end mt-4">
                          <button
                            className="text-xs border text-white bg-gray-800 hover:bg-gray-700 font-medium rounded-lg px-4 py-2.5 duration-300 transition-colors focus:outline-none"
                            onClick={fecharModal}
                          >
                            Fechar
                          </button>
                        </div>
                      </div>
                    </section>
                  )}
                </div>
              </div>

              <input
                id="loggingPassword"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg focus:border-orange-400 focus:ring-opacity-40 dark:focus:border-orange-300 focus:outline-none focus:ring focus:ring-orange-300 font-black"
                type="password"
                placeholder="●●●●●●●●"
                required
              />
            </div>
            <div className="flex items-center justify-between mt-3">
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="remember"
                    aria-describedby="remember"
                    type="checkbox"
                    className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:bg-orange-400 focus:ring-3 focus:ring-primary-300 accent-orange-500 cursor-pointer"
                    checked={rememberMe}
                    onChange={handleRememberMe}
                  ></input>
                </div>
                <div className="ml-3 text-sm">
                  <label
                    htmlFor="remember"
                    className="text-gray-500 hover:text-orange-500 cursor-pointer"
                  >
                    Lembre-se de mim
                  </label>
                </div>
              </div>
            </div>

            <div className="mt-3">
              <button className="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-orange-700 rounded-lg hover:bg-orange-500 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50">
                Entrar
              </button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}
