"use client";

import { useState, useEffect } from "react";
import { Code, Copy, Settings, Check } from "lucide-react";

export default function WidgetPage() {
  const [settings, setSettings] = useState({
    companyName: "",
    primaryColor: "#FF6B35",
    welcomeMessage:
      "Olá! Bem-vindo. Sou o Max, seu assistente virtual. Será um prazer ajudá-lo com seu pedido. Quais produtos você precisa hoje?",
    maxPersonality: "friendly",
  });

  const [widgetCode, setWidgetCode] = useState("");
  const [copied, setCopied] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Generate widget code
  const generateWidgetCode = () => {
    const code = `<!-- ProfitMax AI Widget -->
<div id="profitmax-widget"></div>
<script>
  (function() {
    var script = document.createElement('script');
    script.src = '${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/widget/embed.js';
    script.async = true;
    script.setAttribute('data-widget-id', 'YOUR_WIDGET_CODE');
    document.body.appendChild(script);
  })();
</script>
<!-- End ProfitMax AI Widget -->`;

    setWidgetCode(code);
  };

  useEffect(() => {
    generateWidgetCode();
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText(widgetCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const response = await fetch("/api/widget/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      });

      if (response.ok) {
        alert("Configurações salvas com sucesso!");
      }
    } catch (error) {
      console.error("Error saving settings:", error);
      alert("Erro ao salvar configurações");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Widget Max</h1>
        <p className="text-gray-600 mt-1">
          Configure e instale o Max no seu site
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Configuration Panel */}
        <div className="space-y-6">
          {/* Widget Settings */}
          <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
            <div className="flex items-center gap-2 mb-4">
              <Settings className="w-5 h-5 text-profitmax-orange" />
              <h2 className="text-xl font-semibold text-gray-900">
                Configurações do Widget
              </h2>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nome da Empresa
                </label>
                <input
                  type="text"
                  value={settings.companyName}
                  onChange={(e) =>
                    setSettings({ ...settings, companyName: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-profitmax-orange"
                  placeholder="Distribuidora ABC"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Cor Principal
                </label>
                <div className="flex gap-2">
                  <input
                    type="color"
                    value={settings.primaryColor}
                    onChange={(e) =>
                      setSettings({ ...settings, primaryColor: e.target.value })
                    }
                    className="h-10 w-20 border border-gray-300 rounded-lg cursor-pointer"
                  />
                  <input
                    type="text"
                    value={settings.primaryColor}
                    onChange={(e) =>
                      setSettings({ ...settings, primaryColor: e.target.value })
                    }
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-profitmax-orange"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Personalidade do Max
                </label>
                <select
                  value={settings.maxPersonality}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      maxPersonality: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-profitmax-orange"
                >
                  <option value="friendly">Amigável (Buddy, Boss)</option>
                  <option value="professional">Profissional</option>
                  <option value="casual">Casual</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Mensagem de Boas-vindas
                </label>
                <textarea
                  value={settings.welcomeMessage}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      welcomeMessage: e.target.value,
                    })
                  }
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-profitmax-orange"
                />
              </div>

              <button
                onClick={handleSave}
                disabled={isSaving}
                className="w-full px-6 py-3 bg-profitmax-orange text-white rounded-lg hover:bg-opacity-90 disabled:opacity-50"
              >
                {isSaving ? "Salvando..." : "Salvar Configurações"}
              </button>
            </div>
          </div>

          {/* Preview */}
          <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Prévia do Widget
            </h2>
            <div className="bg-gray-100 rounded-lg p-4 min-h-[300px] flex items-center justify-center">
              <div className="bg-white rounded-lg shadow-lg p-4 w-full max-w-sm">
                <div
                  className="flex items-center gap-3 pb-3 border-b"
                  style={{ borderColor: settings.primaryColor }}
                >
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold"
                    style={{ backgroundColor: settings.primaryColor }}
                  >
                    🤖
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Max</p>
                    <p className="text-xs text-green-600">● Online 24/7</p>
                  </div>
                </div>
                <div className="mt-4">
                  <div
                    className="inline-block max-w-[80%] p-3 rounded-lg text-white text-sm"
                    style={{ backgroundColor: settings.primaryColor }}
                  >
                    {settings.welcomeMessage}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Installation Code */}
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
            <div className="flex items-center gap-2 mb-4">
              <Code className="w-5 h-5 text-profitmax-orange" />
              <h2 className="text-xl font-semibold text-gray-900">
                Código de Instalação
              </h2>
            </div>

            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-600 mb-3">
                  Copie o código abaixo e cole no HTML do seu site, logo antes
                  do fechamento da tag <code>&lt;/body&gt;</code>
                </p>
                <div className="relative">
                  <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
                    <code>{widgetCode}</code>
                  </pre>
                  <button
                    onClick={handleCopy}
                    className="absolute top-2 right-2 px-3 py-1 bg-gray-700 hover:bg-gray-600 text-white rounded flex items-center gap-1 text-sm"
                  >
                    {copied ? (
                      <>
                        <Check className="w-4 h-4" />
                        Copiado!
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        Copiar
                      </>
                    )}
                  </button>
                </div>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <p className="text-sm text-yellow-800">
                  <strong>⚠️ Importante:</strong> Substitua{" "}
                  <code className="bg-yellow-100 px-1">YOUR_WIDGET_CODE</code>{" "}
                  pelo código único do seu widget.
                </p>
              </div>
            </div>
          </div>

          {/* Instructions */}
          <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              Como Instalar
            </h3>
            <ol className="space-y-3 text-sm text-gray-600">
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-profitmax-orange text-white rounded-full flex items-center justify-center text-xs font-bold">
                  1
                </span>
                <span>Configure as preferências do widget acima</span>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-profitmax-orange text-white rounded-full flex items-center justify-center text-xs font-bold">
                  2
                </span>
                <span>Clique em "Salvar Configurações"</span>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-profitmax-orange text-white rounded-full flex items-center justify-center text-xs font-bold">
                  3
                </span>
                <span>Copie o código de instalação</span>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-profitmax-orange text-white rounded-full flex items-center justify-center text-xs font-bold">
                  4
                </span>
                <span>
                  Cole o código no HTML do seu site, logo antes de{" "}
                  <code>&lt;/body&gt;</code>
                </span>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-profitmax-orange text-white rounded-full flex items-center justify-center text-xs font-bold">
                  5
                </span>
                <span>
                  Pronto! O Max estará disponível 24/7 no seu site
                </span>
              </li>
            </ol>
          </div>

          {/* Test Link */}
          <div className="bg-gradient-to-r from-profitmax-orange to-orange-600 rounded-lg shadow p-6 text-white">
            <h3 className="text-lg font-semibold mb-2">Testar o Widget</h3>
            <p className="text-sm mb-4 opacity-90">
              Veja como o Max interage com seus clientes
            </p>
            <a
              href="/widget"
              target="_blank"
              className="inline-block px-6 py-2 bg-white text-profitmax-orange font-semibold rounded-lg hover:bg-gray-100"
            >
              Abrir Demo do Widget
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
