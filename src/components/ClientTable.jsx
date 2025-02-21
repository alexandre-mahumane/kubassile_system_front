import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../service/api";

export const ClientReportTable = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [clients, setClients] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const response = await api.get("/client/");

      setClients(response.data);
    };

    fetchData();
  }, []);

  const filteredClients = clients.filter((client) => {
    const registrationDate = new Date(client.createdAt);
    const matchesName = client.clientName
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const isAfterStartDate = startDate
      ? registrationDate >= new Date(startDate)
      : true;
    const isBeforeEndDate = endDate
      ? registrationDate <= new Date(endDate)
      : true;

    return matchesName && isAfterStartDate && isBeforeEndDate;
  });

  const handleClientClick = (clientId) => {
    navigate(`/client/${clientId}`);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-11/12 max-w-6xl bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-3xl font-bold text-sky-600 text-center mb-6">
          Relatório de Clientes
        </h2>

        <div className="flex flex-col md:flex-row md:items-center gap-4 mb-6">
          <input
            type="text"
            placeholder="Pesquisar pelo nome do cliente"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full md:w-1/2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-400"
          />
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

        <div className="overflow-y-auto max-h-[60vh]">
          <table className="table-auto w-full border-collapse border border-gray-300">
            <thead className="bg-sky-500 text-white sticky top-0">
              <tr>
                <th className="p-4 text-left">Nome</th>
                <th className="p-4 text-left">Contato</th>
                <th className="p-4 text-left">Data de Cadastro</th>
              </tr>
            </thead>
            <tbody>
              {filteredClients.map((client) => (
                <tr
                  key={client.id}
                  className="hover:bg-gray-100 border-t border-gray-300"
                >
                  <td
                    className="p-4 text-sky-600 cursor-pointer underline"
                    onClick={() => handleClientClick(client.id)}
                  >
                    {client.clientName}
                  </td>
                  <td className="p-4">{client.phone}</td>
                  <td className="p-4">{client.createdAt}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
