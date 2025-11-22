import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-profitmax-dark via-profitmax-light to-profitmax-dark">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center space-y-8">
          {/* Logo/Brand */}
          <h1 className="text-6xl font-bold text-white">
            Profit<span className="text-profitmax-orange">Max</span>
            <sup className="text-2xl">®</sup> AI
          </h1>

          {/* Tagline */}
          <p className="text-2xl text-gray-300 max-w-3xl mx-auto">
            Transforme seu site em um canal de vendas B2B automatizado e eficiente
          </p>

          {/* Description */}
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Um assistente virtual que trabalha 24 horas por dia, 7 dias por semana,
            diretamente no seu site
          </p>

          {/* CTA Buttons */}
          <div className="flex gap-4 justify-center mt-12">
            <Link
              href="/admin"
              className="px-8 py-4 bg-profitmax-orange text-white text-lg font-semibold rounded-lg hover:bg-opacity-90 transition-all"
            >
              Acessar Dashboard
            </Link>
            <Link
              href="/widget"
              className="px-8 py-4 bg-white text-profitmax-dark text-lg font-semibold rounded-lg hover:bg-gray-100 transition-all"
            >
              Ver Demo do Max
            </Link>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-8 mt-20 max-w-5xl mx-auto">
            <div className="bg-white bg-opacity-10 backdrop-blur-lg p-6 rounded-lg">
              <div className="text-4xl mb-4">🤖</div>
              <h3 className="text-xl font-bold text-white mb-2">Vendedor Virtual 24/7</h3>
              <p className="text-gray-300">
                Max simula o melhor representante comercial humano
              </p>
            </div>

            <div className="bg-white bg-opacity-10 backdrop-blur-lg p-6 rounded-lg">
              <div className="text-4xl mb-4">💰</div>
              <h3 className="text-xl font-bold text-white mb-2">Negociação Dinâmica</h3>
              <p className="text-gray-300">
                Controle total sobre margens e descontos oferecidos
              </p>
            </div>

            <div className="bg-white bg-opacity-10 backdrop-blur-lg p-6 rounded-lg">
              <div className="text-4xl mb-4">📈</div>
              <h3 className="text-xl font-bold text-white mb-2">Aumento de Lucro</h3>
              <p className="text-gray-300">
                Mais vendas e maior controle sobre margens
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
