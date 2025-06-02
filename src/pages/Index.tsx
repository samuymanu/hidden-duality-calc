
import { useState } from 'react';
import { Calculator, DollarSign, ChevronDown, ChevronUp, Settings } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import CalculatorProfile from '@/components/CalculatorProfile';
import RatesConfig from '@/components/RatesConfig';

const Index = () => {
  const [activeProfile, setActiveProfile] = useState<'perfil1' | 'perfil2'>('perfil1');
  const [showRatesConfig, setShowRatesConfig] = useState(false);
  const [showProfileSelector, setShowProfileSelector] = useState(false);
  const [bcvRate, setBcvRate] = useState(97.31);
  const [parallelRate, setParallelRate] = useState(105.50);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header with CasaGil Branding */}
        <div className="mb-8 text-center">
          <div className="mb-4">
            <h1 className="text-5xl font-bold text-white mb-2" style={{ color: '#a6ce39' }}>
              CasaGil
            </h1>
            <div className="w-32 h-1 mx-auto mb-4" style={{ backgroundColor: '#a6ce39' }}></div>
            <h2 className="text-2xl font-semibold text-gray-700">
              Sistema de Calculadora de Ventas
            </h2>
            <p className="text-gray-600 mt-2">
              Gestión profesional de precios y conversiones
            </p>
          </div>
        </div>

        {/* Configuration Section - Minimized */}
        <div className="mb-6 flex justify-end">
          <div className="flex gap-2">
            {/* Profile Selector - Very discrete */}
            <Card className="overflow-hidden" style={{ backgroundColor: 'rgba(166, 206, 57, 0.1)' }}>
              <div 
                className="p-3 cursor-pointer flex items-center gap-2 hover:bg-gray-50 transition-colors"
                onClick={() => setShowProfileSelector(!showProfileSelector)}
              >
                <Settings className="w-4 h-4 text-gray-600" />
                <span className="text-sm font-medium text-gray-700">Perfiles</span>
                {showProfileSelector ? (
                  <ChevronUp className="w-4 h-4 text-gray-600" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-gray-600" />
                )}
              </div>
              
              <div className={`transition-all duration-300 ease-in-out ${showProfileSelector ? 'max-h-32 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
                <div className="p-3 pt-0 flex gap-2">
                  <Button
                    onClick={() => setActiveProfile('perfil1')}
                    variant={activeProfile === 'perfil1' ? 'default' : 'outline'}
                    size="sm"
                    className="flex items-center gap-1 text-xs"
                    style={activeProfile === 'perfil1' ? { backgroundColor: '#a6ce39' } : {}}
                  >
                    <Calculator className="w-3 h-3" />
                    Comercial
                  </Button>
                  <Button
                    onClick={() => setActiveProfile('perfil2')}
                    variant={activeProfile === 'perfil2' ? 'default' : 'outline'}
                    size="sm"
                    className="flex items-center gap-1 text-xs"
                    style={activeProfile === 'perfil2' ? { backgroundColor: '#a6ce39' } : {}}
                  >
                    <DollarSign className="w-3 h-3" />
                    Simple
                  </Button>
                </div>
              </div>
            </Card>

            {/* Rates Configuration - Discrete */}
            <Card className="overflow-hidden" style={{ backgroundColor: 'rgba(166, 206, 57, 0.1)' }}>
              <div 
                className="p-3 cursor-pointer flex items-center gap-2 hover:bg-gray-50 transition-colors"
                onClick={() => setShowRatesConfig(!showRatesConfig)}
              >
                <span className="text-sm font-medium text-gray-700">Tasas</span>
                {showRatesConfig ? (
                  <ChevronUp className="w-4 h-4 text-gray-600" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-gray-600" />
                )}
              </div>
              
              <div className={`transition-all duration-300 ease-in-out ${showRatesConfig ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
                <div className="px-3 pb-3">
                  <RatesConfig
                    bcvRate={bcvRate}
                    parallelRate={parallelRate}
                    onBcvRateChange={setBcvRate}
                    onParallelRateChange={setParallelRate}
                    activeProfile={activeProfile}
                  />
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Active Calculator Profile */}
        <CalculatorProfile
          profile={activeProfile}
          bcvRate={bcvRate}
          parallelRate={parallelRate}
        />
      </div>
    </div>
  );
};

export default Index;
