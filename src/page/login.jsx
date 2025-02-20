import { useState } from "react";
import logo from "../../public/logo.jpeg";
import { login } from "../service/AuthService";

export const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    await login(username, password);

    setPassword("");
    setUsername("");
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="flex flex-col md:flex-row w-11/12 max-w-4xl bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="hidden md:block md:w-1/2">
          <img src={logo} alt="Login" className="w-full h-full object-cover" />
        </div>

        <div className="w-full md:w-1/2 p-6 md:p-10 flex flex-col justify-center">
          <h1 className="text-4xl font-bold text-sky-600 text-center mb-6">
            Kubassile Sistema
          </h1>

          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Nome
              </label>
              <input
                type="text"
                id="username"
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Digite seu nome"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-400"
              />
            </div>

            <div className="mb-6">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Senha
              </label>
              <input
                type="password"
                id="password"
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Digite sua senha"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-400"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-sky-600 text-white font-semibold p-3 rounded-lg hover:bg-sky-700 transition"
            >
              Entrar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
