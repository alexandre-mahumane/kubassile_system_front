import { useEffect, useState } from "react";
import { EditOrderModal } from "./OderModal";
import { api } from "../service/api";

export const OrderTable = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusPedido, setStatusPedido] = useState("Todos");
  const [statusPagamento, setStatusPagamento] = useState("Todos");
  const [metodoPagamento, SetMetodoPagamento] = useState("Todos");

  const [orders, setOrders] = useState([]);
  const [OrderStatus, setOrderStatus] = useState([]);
  const [paymentStatus, setPaymentStatus] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState([]);

  const [editMode, setEditMode] = useState(false);
  const [currentOrder, setCurrentOrder] = useState({
    id: null,
    clientName: "",
    phone: "",
    orderType: "",
    description: "",
    value: 0,
    orderStatusId: null,
    paymentMethodId: null,
    paymentStatusId: null,
  });

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
      await api.get("/order/").then((response) => {
        console.log(response.data);
        setOrders(response.data);
      });
    };
    fetchData();
    fetchOrders();
  }, []);

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

  const handleEdit = (id) => {
    const orderToEdit = orders.find((order) => order.order.id === id);
    if (orderToEdit) {
      setCurrentOrder({
        id: orderToEdit.order.id,
        clientName: orderToEdit.order.clientId.clientName,
        phone: orderToEdit.order.clientId.phone,
        orderType: orderToEdit.order.type,
        description: orderToEdit.order.description,
        value: orderToEdit.value,
        orderStatusId: orderToEdit.order.orderStatusId,
        paymentMethodId: orderToEdit.paymentMethodId,
        paymentStatusId: orderToEdit.paymentStatusId,
      });
      setEditMode(true);
    }
  };

  const handleSave = () => {
    api
      .put(`/order/${currentOrder.id}`, currentOrder)
      .then(() => {
        setEditMode(false);
        setCurrentOrder(null);
        fetchData();
        window.location.reload();
      })
      .catch((error) => {
        console.log(currentOrder);
        console.error("Erro ao salvar os dados: ", error);
        alert("Erro ao salvar os dados.", currentOrder);
      });
  };

  const filteredOders = orders.filter((order) => {
    const matchName = order.order.clientId.clientName
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchPaymentStatus =
      statusPagamento === "Todos" || order.paymentStatusId == statusPagamento;
    const matchOrderStatus =
      statusPedido === "Todos" || order.order.orderStatusId == statusPedido;
    const matchPaymentMethod =
      metodoPagamento === "Todos" || order.paymentMethodId == metodoPagamento;

    return (
      matchName && matchPaymentStatus && matchOrderStatus && matchPaymentMethod
    );
  });
  return (
    <div className="flex flex-col items-center justify-center min-h-screen ">
      <div className="w-full px-6 bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-3xl font-bold text-sky-600 text-center mb-6">
          Tabela de Pedidos
        </h2>

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
          <select
            value={metodoPagamento}
            onChange={(e) => SetMetodoPagamento(e.target.value)}
            className="w-full md:w-1/4 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-400"
          >
            <option value="Todos">Metodo Pagamento</option>
            <option value="1">Dinheiro</option>
            <option value="2">Cartão</option>
            <option value="3">Tranferencia</option>
          </select>
        </div>

        <div className="overflow-y-auto max-h-96">
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
                <th className="p-4 text-left">Data de Saída</th>
                <th className="p-4 text-left">Ações</th>
              </tr>
            </thead>
            <tbody>
              {filteredOders.reverse().map((orders) => (
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
                    {getOrderStatus(orders.order.orderStatusId) !== "Pendente"
                      ? orders.updated_at
                      : "Ainda não entregue"}
                  </td>
                  <td className="p-4">
                    <button
                      onClick={() => handleEdit(orders.order.id)}
                      className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                    >
                      Editar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {editMode && (
        <EditOrderModal
          currentOrder={currentOrder}
          setCurrentOrder={setCurrentOrder}
          handleSave={handleSave}
          handleClose={() => {
            setEditMode(false);
            setCurrentOrder(null);
          }}
          OrderStatus={OrderStatus}
          paymentStatus={paymentStatus}
          paymentMethod={paymentMethod}
        />
      )}
    </div>
  );
};
