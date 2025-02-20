import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ClientCard } from "../components/ClientCard";
import { api } from "../service/api";

export const ClientDetails = () => {
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [orderStatus, setOrderStatus] = useState([]);
  const [paymentStatus, setPaymentStatus] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState([]);
  const [statusPedido, setStatusPedido] = useState("*");
  const [metodoPagamento, SetMetodoPagamento] = useState("*");
  const [statusPagamento, setStatusPagamento] = useState("*");
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
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await api.get(`/order/${id}`);
        setData(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchOrders();
    fetchData();
  }, [id]);

  const getPaymentMethod = (id) => {
    const data = paymentMethod.find((status) => status.id == id);
    return data.label;
  };
  const getPaymentStatus = (id) => {
    const data = paymentStatus.find((method) => method.id == id);
    return data.label;
  };
  const getOrderStatus = (id) => {
    const data = orderStatus.find((status) => status.id == id);
    return data.label;
  };
  const filteredOrders = data.filter((order) => {
    const matchesPaymentStatus =
      statusPagamento === "*" || statusPagamento == order.paymentStatusId;
    const matchesPaymentMethod =
      metodoPagamento === "*" || metodoPagamento == order.paymentMethodId;
    const matchesOrderStatus =
      statusPedido === "*" || statusPedido == order.order.orderStatusId;

    return matchesOrderStatus && matchesPaymentMethod && matchesPaymentStatus;
  });

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-11/12 max-w-6xl bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-3xl font-bold text-sky-600 text-center mb-6">
          Detalhes do Cliente
        </h2>
        {/* Barra de Pesquisa e Filtros */}
        <div className="flex  flex-col md:flex-row justify-center md:items-center gap-4 mb-6">
          <select
            value={statusPedido}
            onChange={(e) => setStatusPedido(e.target.value)}
            className="w-full md:w-1/4 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-400"
          >
            <option value="*">Status de Pedido</option>
            <option value="3">Pendente</option>
            <option value="1">Pronto</option>
            <option value="2">Entregue</option>
          </select>
          <select
            value={statusPagamento}
            onChange={(e) => setStatusPagamento(e.target.value)}
            className="w-full md:w-1/4 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-400"
          >
            <option value="*">Status de Pagamento</option>
            <option value="2">Pago</option>
            <option value="1">Pendente</option>
          </select>
          <select
            value={metodoPagamento}
            onChange={(e) => SetMetodoPagamento(e.target.value)}
            className="w-full md:w-1/4 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-400"
          >
            <option value="*">Metodo Pagamento</option>
            <option value="1">Dinheiro</option>
            <option value="2">Cartão</option>
            <option value="3">Tranferencia</option>
          </select>
        </div>
        <div className="overflow-y-auto flex  flex-col items-center justify-center  max-h-[80vh]">
          {filteredOrders.map((order) => (
            <ClientCard
              clientName={order.order.clientId.clientName}
              orderId={order.order.id}
              description={order.order.description}
              productType={order.order.type}
              entryDate={order.created_at}
              departureDate={order.updated_at}
              orderStatus={getOrderStatus(order.order.orderStatusId)}
              paymentMethod={getPaymentMethod(order.paymentMethodId)}
              paymentStatus={getPaymentStatus(order.paymentStatusId)}
              value={order.value}
              key={order.order.id}
            />
          ))}
        </div>
        <div className="flex border-t-2 w-full border-gray-600 text-gray-400 space-x-4">
          <h3>Serviços Prestados:</h3>
          <p>{data.length}</p>
        </div>
      </div>
    </div>
  );
};
