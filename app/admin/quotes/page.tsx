"use client";

import { useState } from "react";
import { FileText, Eye, Download, Filter } from "lucide-react";

interface Quote {
  id: string;
  customerName: string;
  customerEmail: string;
  status: string;
  totalAmount: number;
  finalAmount: number;
  createdAt: string;
  items: any[];
}

export default function QuotesPage() {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [filter, setFilter] = useState("all");

  const statusColors: Record<string, string> = {
    pending: "bg-yellow-100 text-yellow-800",
    processing: "bg-blue-100 text-blue-800",
    completed: "bg-green-100 text-green-800",
    cancelled: "bg-red-100 text-red-800",
  };

  const statusLabels: Record<string, string> = {
    pending: "Pendente",
    processing: "Em Processamento",
    completed: "Concluído",
    cancelled: "Cancelado",
  };

  const stats = {
    total: quotes.length,
    pending: quotes.filter((q) => q.status === "pending").length,
    processing: quotes.filter((q) => q.status === "processing").length,
    completed: quotes.filter((q) => q.status === "completed").length,
    totalRevenue: quotes.reduce((sum, q) => sum + q.finalAmount, 0),
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Pedidos</h1>
          <p className="text-gray-600 mt-1">
            Gerencie os pedidos recebidos pelo Max
          </p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="bg-white rounded-lg shadow p-4 border border-gray-200">
          <p className="text-sm font-medium text-gray-600">Total de Pedidos</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">
            {stats.total}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow p-4 border border-gray-200">
          <p className="text-sm font-medium text-gray-600">Pendentes</p>
          <p className="text-2xl font-bold text-yellow-600 mt-1">
            {stats.pending}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow p-4 border border-gray-200">
          <p className="text-sm font-medium text-gray-600">Em Processamento</p>
          <p className="text-2xl font-bold text-blue-600 mt-1">
            {stats.processing}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow p-4 border border-gray-200">
          <p className="text-sm font-medium text-gray-600">Concluídos</p>
          <p className="text-2xl font-bold text-green-600 mt-1">
            {stats.completed}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow p-4 border border-gray-200">
          <p className="text-sm font-medium text-gray-600">Faturamento</p>
          <p className="text-2xl font-bold text-profitmax-orange mt-1">
            R$ {stats.totalRevenue.toLocaleString("pt-BR")}
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow p-4 border border-gray-200">
        <div className="flex items-center gap-4">
          <Filter className="w-5 h-5 text-gray-600" />
          <div className="flex gap-2">
            <button
              onClick={() => setFilter("all")}
              className={`px-4 py-2 rounded-lg text-sm font-medium ${
                filter === "all"
                  ? "bg-profitmax-orange text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Todos
            </button>
            <button
              onClick={() => setFilter("pending")}
              className={`px-4 py-2 rounded-lg text-sm font-medium ${
                filter === "pending"
                  ? "bg-profitmax-orange text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Pendentes
            </button>
            <button
              onClick={() => setFilter("processing")}
              className={`px-4 py-2 rounded-lg text-sm font-medium ${
                filter === "processing"
                  ? "bg-profitmax-orange text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Em Processamento
            </button>
            <button
              onClick={() => setFilter("completed")}
              className={`px-4 py-2 rounded-lg text-sm font-medium ${
                filter === "completed"
                  ? "bg-profitmax-orange text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Concluídos
            </button>
          </div>
        </div>
      </div>

      {/* Quotes List */}
      <div className="bg-white rounded-lg shadow border border-gray-200">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Cliente
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Valor Total
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Data
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {quotes.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center">
                    <div className="flex flex-col items-center justify-center text-gray-500">
                      <FileText className="w-12 h-12 mb-3" />
                      <p className="text-lg font-medium">
                        Nenhum pedido recebido ainda
                      </p>
                      <p className="text-sm mt-1">
                        Os pedidos do Max aparecerão aqui
                      </p>
                    </div>
                  </td>
                </tr>
              ) : (
                quotes.map((quote) => (
                  <tr key={quote.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      #{quote.id.slice(0, 8)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {quote.customerName || "N/A"}
                        </div>
                        <div className="text-sm text-gray-500">
                          {quote.customerEmail || "N/A"}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 py-1 text-xs rounded-full ${
                          statusColors[quote.status]
                        }`}
                      >
                        {statusLabels[quote.status]}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          R$ {quote.finalAmount.toLocaleString("pt-BR")}
                        </div>
                        {quote.totalAmount !== quote.finalAmount && (
                          <div className="text-xs text-gray-500 line-through">
                            R$ {quote.totalAmount.toLocaleString("pt-BR")}
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(quote.createdAt).toLocaleDateString("pt-BR")}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <div className="flex gap-2">
                        <button className="text-profitmax-orange hover:text-orange-700">
                          <Eye className="w-5 h-5" />
                        </button>
                        <button className="text-gray-600 hover:text-gray-900">
                          <Download className="w-5 h-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
