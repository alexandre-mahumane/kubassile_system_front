export const ClientCard = ({
  clientName,
  orderId,
  productType,
  description,
  orderStatus,
  entryDate,
  departureDate,
  paymentMethod,
  value,
  paymentStatus,
}) => {
  return (
    <div className="text-gray-400  border-t-2 border-b-2 border-gray-200 w-[46rem] h-fit p-4 bg-gray-50">
      <div className="flex justify-between">
        <div>
          <div className="flex space-x-6">
            <h4>Nome do Cliente: </h4>
            <p>{clientName}</p>
          </div>

          <div className="flex space-x-6">
            <h4>Id do pedido: </h4>
            <p>{orderId}</p>
          </div>
          <div className="flex space-x-6">
            <h4>Produto(s): </h4>
            <p>{productType}</p>
          </div>
          <div className="flex space-x-6">
            <h4>Descricao: </h4>
            <p>{description}</p>
          </div>
          <div className="flex space-x-6">
            <h4>Status do Pedido: </h4>
            <p>{orderStatus}</p>
          </div>
          <div className="flex space-x-6">
            <h4>Data de Entrada: </h4>
            <p>{entryDate}</p>
          </div>
          <div className="flex space-x-6">
            <h4>Data de Saida: </h4>
            <p>{orderStatus != "Entregue" ? " " : departureDate}</p>
          </div>
        </div>

        <div>
          <div className="flex space-x-6">
            <h4>Metodo de Pagamento: </h4>
            <p>{paymentMethod}</p>
          </div>
          <div className="flex space-x-6">
            <h4>Status do Pagamento: </h4>
            <p>{paymentStatus}</p>
          </div>
          <div className="flex space-x-6">
            <h4>Valor a pagar: </h4>
            <p>{value}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
