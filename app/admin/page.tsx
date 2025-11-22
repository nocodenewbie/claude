import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { Package, FileText, TrendingUp, DollarSign } from "lucide-react";

export default async function AdminDashboard() {
  const user = await currentUser();

  if (!user) {
    redirect("/sign-in");
  }

  // TODO: Fetch real stats from database
  const stats = {
    totalProducts: 0,
    totalQuotes: 0,
    totalRevenue: 0,
    conversionRate: 0,
  };

  const statCards = [
    {
      name: "Total de Produtos",
      value: stats.totalProducts,
      icon: Package,
      color: "bg-blue-500",
    },
    {
      name: "Pedidos",
      value: stats.totalQuotes,
      icon: FileText,
      color: "bg-green-500",
    },
    {
      name: "Faturamento",
      value: `R$ ${stats.totalRevenue.toLocaleString("pt-BR")}`,
      icon: DollarSign,
      color: "bg-profitmax-orange",
    },
    {
      name: "Taxa de Conversão",
      value: `${stats.conversionRate}%`,
      icon: TrendingUp,
      color: "bg-purple-500",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          Bem-vindo, {user.firstName || user.emailAddresses[0].emailAddress}!
        </h1>
        <p className="text-gray-600 mt-2">
          Gerencie seu assistente virtual de vendas Max
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.name}
              className="bg-white rounded-lg shadow p-6 border border-gray-200"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    {stat.name}
                  </p>
                  <p className="text-2xl font-bold text-gray-900 mt-2">
                    {stat.value}
                  </p>
                </div>
                <div className={`${stat.color} p-3 rounded-lg`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
        <h2 className="text-xl font-bold text-gray-900 mb-4">
          Primeiros Passos
        </h2>
        <div className="space-y-4">
          <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
            <div className="bg-profitmax-orange text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">
              1
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">
                Faça upload do seu catálogo
              </h3>
              <p className="text-sm text-gray-600 mt-1">
                Importe seus produtos via CSV para começar a vender
              </p>
            </div>
          </div>
          <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
            <div className="bg-profitmax-orange text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">
              2
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">
                Configure as regras de negociação
              </h3>
              <p className="text-sm text-gray-600 mt-1">
                Defina margens mínimas e descontos permitidos para o Max
              </p>
            </div>
          </div>
          <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
            <div className="bg-profitmax-orange text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">
              3
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">
                Instale o widget no seu site
              </h3>
              <p className="text-sm text-gray-600 mt-1">
                Copie o código do widget e cole no seu site para ativar o Max
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
