"use client";

import { useState } from "react";
import { Plus, TrendingUp, Edit, Trash2 } from "lucide-react";

interface NegotiationRule {
  id: string;
  name: string;
  type: string;
  minMargin: number;
  maxDiscount: number;
  active: boolean;
  priority: number;
}

export default function RulesPage() {
  const [rules, setRules] = useState<NegotiationRule[]>([]);
  const [isCreating, setIsCreating] = useState(false);

  const [newRule, setNewRule] = useState({
    name: "",
    type: "volume",
    minMargin: 10,
    maxDiscount: 15,
    volumeRanges: [
      { min: 0, max: 50, discount: 2 },
      { min: 51, max: 200, discount: 5 },
      { min: 201, max: 999999, discount: 8 },
    ],
  });

  const handleCreateRule = async () => {
    try {
      const response = await fetch("/api/rules", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newRule),
      });

      if (response.ok) {
        alert("Regra criada com sucesso!");
        setIsCreating(false);
        window.location.reload();
      }
    } catch (error) {
      console.error("Error creating rule:", error);
      alert("Erro ao criar regra");
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Regras de Negociação
          </h1>
          <p className="text-gray-600 mt-1">
            Configure as faixas de desconto que o Max pode utilizar
          </p>
        </div>
        <button
          onClick={() => setIsCreating(!isCreating)}
          className="flex items-center gap-2 px-4 py-2 bg-profitmax-orange text-white rounded-lg hover:bg-opacity-90"
        >
          <Plus className="w-5 h-5" />
          <span>Nova Regra</span>
        </button>
      </div>

      {/* Info Box */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h3 className="font-semibold text-blue-900 mb-2">
          Como funcionam as regras?
        </h3>
        <ul className="text-sm text-blue-800 space-y-1 list-disc list-inside">
          <li>
            <strong>Margem Mínima:</strong> O Max nunca oferecerá descontos que
            reduzam sua margem abaixo deste valor
          </li>
          <li>
            <strong>Desconto Máximo:</strong> Limite de desconto que o Max pode
            oferecer
          </li>
          <li>
            <strong>Por Volume:</strong> Descontos baseados na quantidade total
            do pedido
          </li>
          <li>
            <strong>Por Categoria:</strong> Descontos específicos para
            categorias de produtos
          </li>
        </ul>
      </div>

      {/* Create Form */}
      {isCreating && (
        <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Criar Nova Regra
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nome da Regra
              </label>
              <input
                type="text"
                value={newRule.name}
                onChange={(e) =>
                  setNewRule({ ...newRule, name: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-profitmax-orange"
                placeholder="Ex: Desconto por Volume"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tipo de Regra
              </label>
              <select
                value={newRule.type}
                onChange={(e) =>
                  setNewRule({ ...newRule, type: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-profitmax-orange"
              >
                <option value="volume">Por Volume</option>
                <option value="category">Por Categoria</option>
                <option value="client">Por Cliente</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Margem Mínima (%)
              </label>
              <input
                type="number"
                value={newRule.minMargin}
                onChange={(e) =>
                  setNewRule({ ...newRule, minMargin: Number(e.target.value) })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-profitmax-orange"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Desconto Máximo (%)
              </label>
              <input
                type="number"
                value={newRule.maxDiscount}
                onChange={(e) =>
                  setNewRule({
                    ...newRule,
                    maxDiscount: Number(e.target.value),
                  })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-profitmax-orange"
              />
            </div>
          </div>

          {/* Volume Ranges */}
          {newRule.type === "volume" && (
            <div className="mt-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Faixas de Desconto por Volume
              </h3>
              <div className="space-y-3">
                {newRule.volumeRanges.map((range, index) => (
                  <div key={index} className="flex gap-3 items-center">
                    <input
                      type="number"
                      value={range.min}
                      onChange={(e) => {
                        const newRanges = [...newRule.volumeRanges];
                        newRanges[index].min = Number(e.target.value);
                        setNewRule({ ...newRule, volumeRanges: newRanges });
                      }}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg"
                      placeholder="Min"
                    />
                    <span className="text-gray-500">até</span>
                    <input
                      type="number"
                      value={range.max}
                      onChange={(e) => {
                        const newRanges = [...newRule.volumeRanges];
                        newRanges[index].max = Number(e.target.value);
                        setNewRule({ ...newRule, volumeRanges: newRanges });
                      }}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg"
                      placeholder="Max"
                    />
                    <span className="text-gray-500">=</span>
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        value={range.discount}
                        onChange={(e) => {
                          const newRanges = [...newRule.volumeRanges];
                          newRanges[index].discount = Number(e.target.value);
                          setNewRule({ ...newRule, volumeRanges: newRanges });
                        }}
                        className="w-20 px-3 py-2 border border-gray-300 rounded-lg"
                      />
                      <span className="text-gray-500">%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="flex gap-3 mt-6">
            <button
              onClick={handleCreateRule}
              className="px-6 py-2 bg-profitmax-orange text-white rounded-lg hover:bg-opacity-90"
            >
              Criar Regra
            </button>
            <button
              onClick={() => setIsCreating(false)}
              className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
            >
              Cancelar
            </button>
          </div>
        </div>
      )}

      {/* Rules List */}
      <div className="bg-white rounded-lg shadow border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">
            Regras Configuradas
          </h2>
        </div>

        <div className="divide-y divide-gray-200">
          {rules.length === 0 ? (
            <div className="p-12 text-center">
              <TrendingUp className="w-12 h-12 text-gray-400 mx-auto mb-3" />
              <p className="text-lg font-medium text-gray-500">
                Nenhuma regra configurada
              </p>
              <p className="text-sm text-gray-400 mt-1">
                Crie sua primeira regra de negociação
              </p>
            </div>
          ) : (
            rules.map((rule) => (
              <div key={rule.id} className="p-6 hover:bg-gray-50">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {rule.name}
                      </h3>
                      <span
                        className={`px-2 py-1 text-xs rounded-full ${
                          rule.active
                            ? "bg-green-100 text-green-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {rule.active ? "Ativa" : "Inativa"}
                      </span>
                      <span className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">
                        {rule.type === "volume"
                          ? "Volume"
                          : rule.type === "category"
                          ? "Categoria"
                          : "Cliente"}
                      </span>
                    </div>
                    <div className="mt-2 text-sm text-gray-600">
                      <span className="font-medium">Margem Mínima:</span>{" "}
                      {rule.minMargin}% |{" "}
                      <span className="font-medium">Desconto Máximo:</span>{" "}
                      {rule.maxDiscount}%
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button className="p-2 text-gray-600 hover:text-profitmax-orange">
                      <Edit className="w-5 h-5" />
                    </button>
                    <button className="p-2 text-gray-600 hover:text-red-600">
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
