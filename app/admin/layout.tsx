import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import {
  LayoutDashboard,
  Package,
  Settings,
  FileText,
  Code,
  TrendingUp
} from "lucide-react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const navigation = [
    { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { name: "Produtos", href: "/admin/products", icon: Package },
    { name: "Regras de Negociação", href: "/admin/rules", icon: TrendingUp },
    { name: "Pedidos", href: "/admin/quotes", icon: FileText },
    { name: "Widget", href: "/admin/widget", icon: Code },
    { name: "Configurações", href: "/admin/settings", icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="fixed inset-y-0 left-0 w-64 bg-profitmax-dark shadow-lg">
        {/* Logo */}
        <div className="flex items-center justify-center h-16 px-4 bg-profitmax-light">
          <h1 className="text-2xl font-bold text-white">
            Profit<span className="text-profitmax-orange">Max</span>
            <sup className="text-xs">®</sup>
          </h1>
        </div>

        {/* Navigation */}
        <nav className="mt-8 px-4 space-y-2">
          {navigation.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                href={item.href}
                className="flex items-center gap-3 px-4 py-3 text-gray-300 hover:bg-profitmax-light hover:text-white rounded-lg transition-colors"
              >
                <Icon className="w-5 h-5" />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Main Content */}
      <div className="pl-64">
        {/* Top Bar */}
        <div className="h-16 bg-white shadow-sm flex items-center justify-between px-8">
          <h2 className="text-xl font-semibold text-gray-800">
            Admin Dashboard
          </h2>
          <UserButton afterSignOutUrl="/" />
        </div>

        {/* Page Content */}
        <main className="p-8">{children}</main>
      </div>
    </div>
  );
}
