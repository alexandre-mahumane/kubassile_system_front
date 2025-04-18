import { api } from "./api";

let acessToken = "";

export const login = async (username, password) => {
  try {
    const response = await api.post("/auth/login", { username, password });
    const token = response.data.token;
    const role = response.data.role?.toUpperCase();

    console.log(username, password);
    localStorage.setItem("accessToken", token);
    acessToken = token;
    console.log("Token: " + token);

    if (role === "EMPLOYEE") {
      window.location.href = "/service";
    } else if (role === "ADMIN") {
      window.location.href = "/reports";
    }

    return token;
  } catch (error) {
    if (error.response && error.response.status === 401) {
      console.error("Credenciais inválidas. Verifique seu usuário e senha.");
    } else {
      console.error("Erro ao fazer login:", error.message);
    }
    return null;
  }
};

export const logout = async () => {
  await api.post("/auth/logout");
  localStorage.removeItem("accessToken");
};

export const getAcessToken = () => acessToken;
