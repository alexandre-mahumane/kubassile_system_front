import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import { api } from "../service/api";

export const ReportsTable = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusPedido, setStatusPedido] = useState("Todos");
  const [statusPagamento, setStatusPagamento] = useState("Todos");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [orders, setOrders] = useState([]);
  const [OrderStatus, setOrderStatus] = useState([]);
  const [paymentStatus, setPaymentStatus] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState([]);
  const { request } = useContext(AppContext);
  const fetchData = async () => {
    const [orderStatusResponse, paymentStatusResponse, paymentMethodResponse] =
      await Promise.all([
        api.get("/order/status"),
        api.get("/payments/status"),
        api.get("/payments/method"),
      ]);

    setOrderStatus(orderStatusResponse.data);
    setPaymentMethod(paymentMethodResponse.data);
    setPaymentStatus(paymentStatusResponse.data);
  };

  setTimeout(() => {
    window.location.reload();
  }, 10000);
  useEffect(() => {
    const fetchOrders = async () => {
      const response = await api.get(`/order/`);
      setOrders(response.data);
    };
    fetchData();
    fetchOrders();
  }, [request]);

  const getOrderStatus = (id) => {
    if (OrderStatus.length > 0) {
      const status = OrderStatus.find((status) => status.id == id);
      return status.label;
    }
  };
  const getPaymentStatus = (id) => {
    if (paymentStatus.length > 0) {
      const status = paymentStatus.find((status) => status.id == id);
      return status.label;
    }
  };
  const getPaymentMethod = (id) => {
    if (paymentMethod.length > 0) {
      const status = paymentMethod.find((status) => status.id == id);
      return status.label;
    }
  };

  const filteredOrders = orders.filter((order) => {
    const matchName = order.order.clientId.clientName
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchPaymentStatus =
      statusPagamento === "Todos" || order.paymentStatusId == statusPagamento;
    const matchOrderStatus =
      statusPedido === "Todos" || order.order.orderStatusId == statusPedido;

    const isAfterStartDate = startDate
      ? new Date(order.created_at) >= new Date(startDate)
      : true;

    const isBeforeEndDate = endDate
      ? new Date(order.created_at) <= new Date(endDate)
      : true;
    return (
      matchName &&
      matchPaymentStatus &&
      matchOrderStatus &&
      isAfterStartDate &&
      isBeforeEndDate
    );
  });
  // Filtrar pedidos por critérios
  // const filteredOrders = orders.filter((order) => {
  //   const orderDate = new Date(order.dataEntrada);
  //   const matchesName = order.cliente
  //     .toLowerCase()
  //     .includes(searchTerm.toLowerCase());
  //   const matchesPedido =
  //     statusPedido === "Todos" || order.statusPedido === statusPedido;
  //   const matchesPagamento =
  //     statusPagamento === "Todos" || order.statusPagamento === statusPagamento;
  // const isAfterStartDate = startDate
  //   ? orderDate >= new Date(startDate)
  //   : true;
  // const isBeforeEndDate = endDate ? orderDate <= new Date(endDate) : true;

  //   return (
  //     matchesName &&
  //     matchesPedido &&
  //     matchesPagamento &&
  //     isAfterStartDate &&
  //     isBeforeEndDate
  //   );
  // });

  // Estatísticas
  const totalValor = filteredOrders.reduce(
    (acc, order) => acc + order.value,
    0
  );
  const totalServicos = filteredOrders.length;
  const servicosProntos = filteredOrders.filter(
    (order) => order.order.orderStatusId === 1
  ).length;
  const servicosPendentes = filteredOrders.filter(
    (order) => order.order.orderStatusId === 3
  ).length;
  const servicosPagos = filteredOrders.filter(
    (order) => order.paymentStatusId === 2
  ).length;
  const servicosNaoPagos = filteredOrders.filter(
    (order) => order.paymentStatusId === 1
  ).length;

  return (
    <div className="flex flex-col px-6 items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-3xl font-bold text-sky-600 text-center mb-6">
          Relatório de Serviços
        </h2>

        {/* Filtros e Pesquisa */}
        <div className="flex flex-col md:flex-row md:items-center gap-4 mb-6">
          <input
            type="text"
            placeholder="Pesquisar pelo nome do cliente"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full md:w-1/3 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-400"
          />
          <select
            value={statusPedido}
            onChange={(e) => setStatusPedido(e.target.value)}
            className="w-full md:w-1/4 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-400"
          >
            <option value="Todos">Todos os Status de Pedido</option>
            <option value="3">Pendente</option>
            <option value="1">Pronto</option>
            <option value="2">Entregue</option>
          </select>
          <select
            value={statusPagamento}
            onChange={(e) => setStatusPagamento(e.target.value)}
            className="w-full md:w-1/4 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-400"
          >
            <option value="Todos">Todos os Status de Pagamento</option>
            <option value="2">Pago</option>
            <option value="1">Pendente</option>
          </select>
          <div className="flex flex-col">
            <label className="text-gray-700">Data Inicial</label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-400"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-gray-700">Data Final</label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-400"
            />
          </div>
        </div>

        {/* Tabela */}
        <div className="overflow-y-auto max-h-[60vh]">
          <table className="table-auto w-full border-collapse border border-gray-300">
            <thead className="bg-sky-500 text-white sticky top-0">
              <tr>
                <th className="p-4 text-left">Cliente</th>
                <th className="p-4 text-left">Celular</th>
                <th className="p-4 text-left">Pedido</th>
                <th className="p-4 text-left">Valor</th>
                <th className="p-4 text-left">Status do Pedido</th>
                <th className="p-4 text-left">Status do Pagamento</th>
                <th className="p-4 text-left">Metodo do Pagamento</th>
                <th className="p-4 text-left">Data de Entrada</th>
                <th className="p-4 text-left">Data de Entrega</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.reverse().map((orders) => (
                <tr
                  key={orders.order.id}
                  className="hover:bg-gray-100 border-t border-gray-300"
                >
                  <td className="p-4">{orders.order.clientId.clientName}</td>
                  <td className="p-4">{orders.order.clientId.phone}</td>
                  <td className="p-4">{orders.order.type}</td>
                  <td className="p-4">{orders.value}</td>
                  <td
                    className={`p-4 ${
                      getOrderStatus(orders.order.orderStatusId) === "Pendente"
                        ? "text-yellow-500"
                        : getOrderStatus(orders.order.orderStatusId) ===
                          "Pronto"
                        ? "text-blue-500"
                        : "text-green-500"
                    }`}
                  >
                    {getOrderStatus(orders.order.orderStatusId)}
                  </td>
                  <td
                    className={`p-4 ${
                      getPaymentStatus(orders.paymentStatusId) === "Realizado"
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  >
                    {getPaymentStatus(orders.paymentStatusId)}
                  </td>
                  <td className="p-4 ">
                    {getPaymentStatus(orders.paymentStatusId) === "Realizado"
                      ? getPaymentMethod(orders.paymentMethodId)
                      : "--"}
                  </td>
                  <td className="p-4">{orders.created_at}</td>
                  <td className="p-4">
                    {orders.updated_at
                      ? orders.updated_at
                      : "Ainda não entregue"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Estatísticas */}
        <div className="mt-6 border-t border-gray-300 pt-6">
          <h3 className="text-2xl font-semibold text-gray-700 mb-4">
            Estatísticas
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
            <div className="p-4 bg-sky-100 rounded-lg text-center">
              <h4 className="text-lg font-medium text-gray-700">Valor Total</h4>
              <p className="text-2xl font-bold text-sky-600">
                MZN {totalValor}
              </p>
            </div>
            <div className="p-4 bg-green-100 rounded-lg text-center">
              <h4 className="text-lg font-medium text-gray-700">
                Serviços Feitos
              </h4>
              <p className="text-2xl font-bold text-green-600">
                {totalServicos}
              </p>
            </div>
            <div className="p-4 bg-blue-100 rounded-lg text-center">
              <h4 className="text-lg font-medium text-gray-700">
                Serviços Prontos
              </h4>
              <p className="text-2xl font-bold text-blue-600">
                {servicosProntos}
              </p>
            </div>
            <div className="p-4 bg-yellow-100 rounded-lg text-center">
              <h4 className="text-lg font-medium text-gray-700">Pendentes</h4>
              <p className="text-2xl font-bold text-yellow-600">
                {servicosPendentes}
              </p>
            </div>
            <div className="p-4 bg-green-100 rounded-lg text-center">
              <h4 className="text-lg font-medium text-gray-700">Pagos</h4>
              <p className="text-2xl font-bold text-green-600">
                {servicosPagos}
              </p>
            </div>
            <div className="p-4 bg-red-100 rounded-lg text-center">
              <h4 className="text-lg font-medium text-gray-700">Não Pagos</h4>
              <p className="text-2xl font-bold text-red-600">
                {servicosNaoPagos}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
