"use client";

import { useState } from "react";
import { Upload, Download, Plus, Search } from "lucide-react";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("/api/products/upload", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const result = await response.json();
        alert(`${result.count} produtos importados com sucesso!`);
        // Refresh products list
        window.location.reload();
      } else {
        alert("Erro ao importar produtos");
      }
    } catch (error) {
      console.error("Upload error:", error);
      alert("Erro ao fazer upload do arquivo");
    } finally {
      setIsUploading(false);
    }
  };

  const downloadTemplate = () => {
    const csvContent =
      "name,description,sku,category,costPrice,sellPrice,unit,stock\n" +
      "Produto Exemplo,Descrição do produto,SKU123,Alimentos,10.50,15.00,un,100\n" +
      "Outro Produto,Outra descrição,SKU456,Bebidas,5.00,8.50,un,200";

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "template_produtos.csv";
    a.click();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Produtos</h1>
          <p className="text-gray-600 mt-1">
            Gerencie seu catálogo de produtos
          </p>
        </div>
      </div>

      {/* Upload Section */}
      <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Importar Produtos
        </h2>
        <div className="flex flex-col md:flex-row gap-4">
          <label className="flex-1 cursor-pointer">
            <input
              type="file"
              accept=".csv"
              onChange={handleFileUpload}
              className="hidden"
              disabled={isUploading}
            />
            <div className="flex items-center justify-center gap-2 px-6 py-3 bg-profitmax-orange text-white rounded-lg hover:bg-opacity-90 transition-all">
              <Upload className="w-5 h-5" />
              <span>{isUploading ? "Importando..." : "Fazer Upload de CSV"}</span>
            </div>
          </label>
          <button
            onClick={downloadTemplate}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-all"
          >
            <Download className="w-5 h-5" />
            <span>Baixar Template</span>
          </button>
        </div>
        <p className="text-sm text-gray-500 mt-3">
          Formato aceito: CSV com as colunas: name, description, sku, category,
          costPrice, sellPrice, unit, stock
        </p>
      </div>

      {/* Products List */}
      <div className="bg-white rounded-lg shadow border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-900">
              Lista de Produtos
            </h2>
            <div className="flex gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Buscar produtos..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-profitmax-orange"
                />
              </div>
              <button className="flex items-center gap-2 px-4 py-2 bg-profitmax-orange text-white rounded-lg hover:bg-opacity-90">
                <Plus className="w-5 h-5" />
                <span>Novo Produto</span>
              </button>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Produto
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  SKU
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Categoria
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Preço Custo
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Preço Venda
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Estoque
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {products.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center">
                    <div className="flex flex-col items-center justify-center text-gray-500">
                      <Package className="w-12 h-12 mb-3" />
                      <p className="text-lg font-medium">
                        Nenhum produto cadastrado
                      </p>
                      <p className="text-sm mt-1">
                        Faça upload de um CSV para começar
                      </p>
                    </div>
                  </td>
                </tr>
              ) : (
                products.map((product: any) => (
                  <tr key={product.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {product.name}
                        </div>
                        <div className="text-sm text-gray-500">
                          {product.description}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {product.sku}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {product.category}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      R$ {product.costPrice.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      R$ {product.sellPrice.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {product.stock} {product.unit}
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
