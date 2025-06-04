
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
        {/* Rates Configuration - More prominent */}
        <div className="mb-4 flex justify-center">
          <Card className="overflow-hidden shadow-md border border-gray-200 rounded-2xl w-full">
            <div 
              className="px-5 py-4 cursor-pointer flex items-center justify-center gap-3 hover:bg-gray-50 transition-all duration-200 rounded-2xl active:scale-95"
              onClick={() => setShowRatesConfig(!showRatesConfig)}
            >
              <DollarSign className="w-6 h-6 text-gray-500" />
              <span className="text-base font-semibold text-gray-700">Configurar Tasas</span>
              {showRatesConfig ? (
                <ChevronUp className="w-5 h-5 text-gray-500" />
              ) : (
                <ChevronDown className="w-5 h-5 text-gray-500" />
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

        {/* Calculator Profile - Takes most of the screen */}
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
