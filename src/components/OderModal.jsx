import React from "react";

export const EditOrderModal = ({
  currentOrder,
  setCurrentOrder,
  handleSave,
  handleClose,
  OrderStatus,
  paymentStatus,
  paymentMethod,
}) => {
  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-1/2">
        <h2 className="text-2xl font-bold mb-4">Editar Pedido</h2>
        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            value={currentOrder.clientName}
            onChange={(e) =>
              setCurrentOrder({
                ...currentOrder,
                clientName: e.target.value,
              })
            }
            className="p-3 border border-gray-300 rounded-lg w-full"
            placeholder="Nome do Cliente"
          />
          <input
            type="text"
            value={currentOrder.phone}
            onChange={(e) =>
              setCurrentOrder({
                ...currentOrder,
                phone: e.target.value,
              })
            }
            className="p-3 border border-gray-300 rounded-lg w-full"
            placeholder="Telefone"
          />
          <input
            type="text"
            value={currentOrder.orderType}
            onChange={(e) =>
              setCurrentOrder({
                ...currentOrder,
                orderType: e.target.value,
              })
            }
            className="p-3 border border-gray-300 rounded-lg w-full"
            placeholder="Tipo de Pedido"
          />
          <input
            type="text"
            value={currentOrder.description}
            onChange={(e) =>
              setCurrentOrder({
                ...currentOrder,
                description: e.target.value,
              })
            }
            className="p-3 border border-gray-300 rounded-lg w-full"
            placeholder="Descrição"
          />
          <input
            type="number"
            value={currentOrder.value}
            onChange={(e) =>
              setCurrentOrder({
                ...currentOrder,
                value: e.target.value,
              })
            }
            className="p-3 border border-gray-300 rounded-lg w-full"
            placeholder="Valor"
          />
          <select
            value={currentOrder.orderStatusId}
            onChange={(e) =>
              setCurrentOrder({
                ...currentOrder,
                orderStatusId: e.target.value,
              })
            }
            className="p-3 border border-gray-300 rounded-lg w-full"
          >
            {OrderStatus.map((status) => (
              <option key={status.id} value={status.id}>
                {status.label}
              </option>
            ))}
          </select>
          <select
            value={currentOrder.paymentStatusId}
            onChange={(e) =>
              setCurrentOrder({
                ...currentOrder,
                paymentStatusId: e.target.value,
              })
            }
            className="p-3 border border-gray-300 rounded-lg w-full"
          >
            {paymentStatus.map((status) => (
              <option key={status.id} value={status.id}>
                {status.label}
              </option>
            ))}
          </select>
          <select
            value={currentOrder.paymentMethodId}
            onChange={(e) =>
              setCurrentOrder({
                ...currentOrder,
                paymentMethodId: e.target.value,
              })
            }
            className="p-3 border border-gray-300 rounded-lg w-full"
          >
            {paymentMethod.map((method) => (
              <option key={method.id} value={method.id}>
                {method.label}
              </option>
            ))}
          </select>
        </div>
        <div className="flex justify-end mt-4">
          <button
            onClick={handleClose}
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 mr-2"
          >
            Cancelar
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Salvar
          </button>
        </div>
      </div>
    </div>
  );
};
