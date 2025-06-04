
import { useState } from 'react';
import { DollarSign, ChevronDown, ChevronUp } from 'lucide-react';
import { Card } from '@/components/ui/card';
import CalculatorProfile from '@/components/CalculatorProfile';
import RatesConfig from '@/components/RatesConfig';

const Index = () => {
  const [showRatesConfig, setShowRatesConfig] = useState(false);
  const [bcvRate, setBcvRate] = useState(97.31);
  const [parallelRate, setParallelRate] = useState(105.50);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 p-3">
      <div className="max-w-md mx-auto">
        {/* Header with CasaGil Branding - Mobile optimized */}
        <div className="mb-6 text-center">
          <div className="mb-4">
            <h1 className="text-3xl font-bold mb-2" style={{ color: '#a6ce39' }}>
              CasaGil
            </h1>
            <div className="w-24 h-1 mx-auto mb-3 rounded-full" style={{ backgroundColor: '#a6ce39' }}></div>
            <h2 className="text-lg font-light text-gray-800 mb-1">
              Calculadora de Ventas
            </h2>
            <p className="text-sm text-gray-600 font-medium">
              Cálculo rápido de precios
            </p>
          </div>
        </div>

        {/* Rates Configuration - Mobile friendly */}
        <div className="mb-4 flex justify-center">
          <Card className="overflow-hidden shadow-sm border border-gray-200 rounded-2xl">
            <div 
              className="px-4 py-3 cursor-pointer flex items-center gap-2 hover:bg-gray-50 transition-all duration-200 rounded-2xl active:scale-95"
              onClick={() => setShowRatesConfig(!showRatesConfig)}
            >
              <DollarSign className="w-5 h-5 text-gray-500" />
              <span className="text-sm font-medium text-gray-600">Tasas</span>
              {showRatesConfig ? (
                <ChevronUp className="w-4 h-4 text-gray-500" />
              ) : (
                <ChevronDown className="w-4 h-4 text-gray-500" />
              )}
            </div>
            
            <div className={`transition-all duration-300 ease-in-out ${showRatesConfig ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
              <div className="px-4 pb-4">
                <RatesConfig
                  bcvRate={bcvRate}
                  parallelRate={parallelRate}
                  onBcvRateChange={setBcvRate}
                  onParallelRateChange={setParallelRate}
                  activeProfile="perfil1"
                />
              </div>
            </div>
          </Card>
        </div>

        {/* Calculator Profile */}
        <CalculatorProfile
          profile="perfil1"
          bcvRate={bcvRate}
          parallelRate={parallelRate}
        />
      </div>
    </div>
  );
};

export default Index;
