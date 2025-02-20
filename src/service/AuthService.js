import { api } from "./api";

let acessToken = "";
export const login = async (username, password) => {
  try {
    const response = await api.post("/auth/login", { username, password });
    const token = response.data.token;
    localStorage.setItem("accessToken", token);
    console.log("Token: " + token);
    return token;
  } catch (error) {
    console.log(error);
    return null;
  }
};

// Função de refresh de token
export const refreshToken = async () => {
  try {
    console.log("Token atual: " + getAcessToken());
    const response = await api.post("/auth/refresh-token");
    const newToken = response.data.token;
    localStorage.setItem("accessToken", newToken); // Atualiza o token no localStorage
    return newToken;
  } catch (error) {
    console.log(error);
    return null;
  }
};

// Função de logout
export const logout = async () => {
  await api.post("/auth/logout");
  localStorage.removeItem("accessToken"); // Remove o token do localStorage ao fazer logout
};

export const getAcessToken = () => acessToken;
