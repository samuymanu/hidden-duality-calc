
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header with CasaGil Branding */}
        <div className="mb-12 text-center">
          <div className="mb-6">
            <h1 className="text-6xl font-bold mb-4" style={{ color: '#a6ce39' }}>
              CasaGil
            </h1>
            <div className="w-40 h-1.5 mx-auto mb-6 rounded-full" style={{ backgroundColor: '#a6ce39' }}></div>
            <h2 className="text-3xl font-light text-gray-800 mb-2">
              Sistema de Calculadora de Ventas
            </h2>
            <p className="text-lg text-gray-600 font-medium">
              Gestión profesional de precios y conversiones
            </p>
          </div>
        </div>

        {/* Configuration Section - Ultra minimalist and discrete */}
        <div className="mb-8 flex justify-end">
          <div className="flex gap-2">
            {/* Profile Selector - More discrete */}
            <Card className="overflow-hidden shadow-sm border border-gray-200 rounded-xl">
              <div 
                className="px-3 py-2 cursor-pointer flex items-center gap-2 hover:bg-gray-50 transition-all duration-200 rounded-xl"
                onClick={() => setShowProfileSelector(!showProfileSelector)}
              >
                <Settings className="w-4 h-4 text-gray-500" />
                {showProfileSelector ? (
                  <ChevronUp className="w-3 h-3 text-gray-500" />
                ) : (
                  <ChevronDown className="w-3 h-3 text-gray-500" />
                )}
              </div>
              
              <div className={`transition-all duration-300 ease-in-out ${showProfileSelector ? 'max-h-32 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
                <div className="p-3 pt-0 flex gap-2">
                  <Button
                    onClick={() => setActiveProfile('perfil1')}
                    variant={activeProfile === 'perfil1' ? 'default' : 'outline'}
                    size="sm"
                    className={`flex items-center gap-1 text-xs font-medium rounded-lg transition-all duration-200 px-3 py-1.5 ${
                      activeProfile === 'perfil1' 
                        ? 'text-white shadow-md' 
                        : 'border text-gray-600 hover:bg-gray-50'
                    }`}
                    style={activeProfile === 'perfil1' ? { backgroundColor: '#a6ce39' } : {}}
                  >
                    <Calculator className="w-3 h-3" />
                    Comercial
                  </Button>
                  <Button
                    onClick={() => setActiveProfile('perfil2')}
                    variant={activeProfile === 'perfil2' ? 'default' : 'outline'}
                    size="sm"
                    className={`flex items-center gap-1 text-xs font-medium rounded-lg transition-all duration-200 px-3 py-1.5 ${
                      activeProfile === 'perfil2' 
                        ? 'text-white shadow-md' 
                        : 'border text-gray-600 hover:bg-gray-50'
                    }`}
                    style={activeProfile === 'perfil2' ? { backgroundColor: '#a6ce39' } : {}}
                  >
                    <DollarSign className="w-3 h-3" />
                    Simple
                  </Button>
                </div>
              </div>
            </Card>

            {/* Rates Configuration - More discrete */}
            <Card className="overflow-hidden shadow-sm border border-gray-200 rounded-xl">
              <div 
                className="px-3 py-2 cursor-pointer flex items-center gap-2 hover:bg-gray-50 transition-all duration-200 rounded-xl"
                onClick={() => setShowRatesConfig(!showRatesConfig)}
              >
                <span className="text-xs font-medium text-gray-600">$</span>
                {showRatesConfig ? (
                  <ChevronUp className="w-3 h-3 text-gray-500" />
                ) : (
                  <ChevronDown className="w-3 h-3 text-gray-500" />
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
