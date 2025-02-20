import React, { useContext, useEffect, useState } from "react";
import { sendEmail } from "../utils/emailService";
import { AppContext } from "../context/AppContext";
import { api } from "../service/api";

export const InputsClient = () => {
  const [orderStatus, setOrderStatus] = useState([]);
  const [paymentStatus, setPaymentStatus] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState([]);
  const { request, setRequest } = useContext(AppContext);
  const [formData, setFormData] = useState({
    clientName: "",
    phone: "",
    orderType: "Camisa",
    description: "",
    value: 0,
    orderStatusId: 3,

    paymentMethodId: 1,
    paymentStatusId: 1,
  });

  useEffect(() => {
    const fetchData = async () => {
      const [
        orderStatusResponse,
        paymentStatusResponse,
        paymentMethodResponse,
      ] = await Promise.all([
        api.get("/order/status"),
        api.get("/payments/status"),
        api.get("/payments/method"),
      ]);

      setOrderStatus(orderStatusResponse.data);
      setPaymentMethod(paymentMethodResponse.data);
      setPaymentStatus(paymentStatusResponse.data);
    };
    fetchData();
  }, []);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const getPaymentMethod = (id) => {
    const data = paymentMethod.find((status) => status.id == id);
    return data.label;
  };
  const getPaymentStatus = (id) => {
    console.log(id);
    const data = paymentStatus.find((method) => method.id == id);
    return data.label;
  };
  const getOrderStatus = (id) => {
    const data = orderStatus.find((status) => status.id == id);
    return data.label;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/order/", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      setRequest(res.data);
      console.log(request);
      sendEmail(
        formData.clientName,
        formData.phone,
        formData.orderType,
        formData.description,
        formData.value,
        getOrderStatus(formData.orderStatusId),
        getPaymentStatus(formData.paymentStatusId),
        getPaymentMethod(formData.paymentMethodId)
      );

      setFormData({
        clientName: "",
        phone: "",
        orderType: "",
        description: "",
        value: 0,
        orderStatusId: 3,
        paymentMethodId: 1,
        paymentStatusId: 1,
      });

      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen ">
      <form className="w-11/12 max-w-4xl bg-white shadow-xl rounded-lg p-8 md:p-12">
        <h2 className="text-3xl font-bold text-center text-sky-600 mb-8">
          Informações do Pedido
        </h2>

        {/* Cliente */}
        <div className="mb-8">
          <h3 className="text-2xl font-semibold text-gray-700 mb-4">Cliente</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input
              type="text"
              name="clientName"
              placeholder="Nome do Cliente"
              value={formData.clientName}
              onChange={handleChange}
              className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-400"
            />
            <input
              type="tel"
              name="phone"
              placeholder="Número de Telefone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-400"
            />
          </div>
        </div>

        {/* Produto */}
        <div className="mb-8">
          <h3 className="text-2xl font-semibold text-gray-700 mb-4">Produto</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <select
              name="orderType"
              value={formData.orderType}
              onChange={handleChange}
              className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-400"
            >
              <option value="Tipo de Produto">Tipo de Produto</option>
              <option value="Camisa">Camisa</option>
              <option value="Camiseta">Camiseta</option>
              <option value="Vestido de Gala">Vestido de Gala</option>
              <option value="Tapete">Tapete</option>
              <option value="Fato">Fato</option>
            </select>
            <input
              type="text"
              name="description"
              placeholder="Descrição do Produto"
              value={formData.description}
              onChange={handleChange}
              className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-400"
            />
          </div>
        </div>

        {/* Pagamentos */}
        <div className="mb-8">
          <h3 className="text-2xl font-semibold text-gray-700 mb-4">
            Pagamentos
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input
              type="number"
              name="value"
              placeholder="Preço"
              value={formData.value}
              onChange={handleChange}
              className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-400"
            />
            <select
              name="paymentMethodId"
              value={formData.paymentMethodId}
              onChange={handleChange}
              className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-400"
            >
              <option value="1">Dinheiro</option>
              <option value="2">Cartão</option>
              <option value="3">Transferência</option>
            </select>
          </div>
          <div className="mt-6">
            <h4 className="text-lg font-semibold text-gray-600 mb-2">
              Status do Pagamento
            </h4>
            <select
              name="paymentStatusId"
              value={formData.paymentStatusId}
              onChange={handleChange}
              className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-400"
            >
              <option value="1">Pendente</option>
              <option value="2">Pago</option>
            </select>
          </div>
        </div>

        {/* Botão de Envio */}
        <div className="text-center">
          <button
            onClick={handleSubmit}
            className="w-full bg-sky-500 text-white py-4 rounded-lg text-xl font-semibold hover:bg-sky-600 transition"
          >
            Salvar Informações
          </button>
        </div>
      </form>
    </div>
  );
};
