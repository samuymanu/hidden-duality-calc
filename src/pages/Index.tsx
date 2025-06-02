
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

        {/* Configuration Section - Ultra minimalist */}
        <div className="mb-8 flex justify-end">
          <div className="flex gap-3">
            {/* Profile Selector */}
            <Card className="overflow-hidden shadow-lg border-0 rounded-2xl" style={{ backgroundColor: 'rgba(166, 206, 57, 0.08)' }}>
              <div 
                className="p-4 cursor-pointer flex items-center gap-3 hover:bg-white/50 transition-all duration-200 rounded-2xl"
                onClick={() => setShowProfileSelector(!showProfileSelector)}
              >
                <Settings className="w-5 h-5 text-gray-700" />
                <span className="text-sm font-semibold text-gray-800">Perfiles</span>
                {showProfileSelector ? (
                  <ChevronUp className="w-4 h-4 text-gray-600" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-gray-600" />
                )}
              </div>
              
              <div className={`transition-all duration-300 ease-in-out ${showProfileSelector ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
                <div className="p-4 pt-0 flex gap-3">
                  <Button
                    onClick={() => setActiveProfile('perfil1')}
                    variant={activeProfile === 'perfil1' ? 'default' : 'outline'}
                    size="sm"
                    className={`flex items-center gap-2 text-sm font-medium rounded-xl transition-all duration-200 ${
                      activeProfile === 'perfil1' 
                        ? 'text-white shadow-lg' 
                        : 'border-2 text-gray-700 hover:bg-gray-50'
                    }`}
                    style={activeProfile === 'perfil1' ? { backgroundColor: '#a6ce39' } : {}}
                  >
                    <Calculator className="w-4 h-4" />
                    Comercial
                  </Button>
                  <Button
                    onClick={() => setActiveProfile('perfil2')}
                    variant={activeProfile === 'perfil2' ? 'default' : 'outline'}
                    size="sm"
                    className={`flex items-center gap-2 text-sm font-medium rounded-xl transition-all duration-200 ${
                      activeProfile === 'perfil2' 
                        ? 'text-white shadow-lg' 
                        : 'border-2 text-gray-700 hover:bg-gray-50'
                    }`}
                    style={activeProfile === 'perfil2' ? { backgroundColor: '#a6ce39' } : {}}
                  >
                    <DollarSign className="w-4 h-4" />
                    Simple
                  </Button>
                </div>
              </div>
            </Card>

            {/* Rates Configuration */}
            <Card className="overflow-hidden shadow-lg border-0 rounded-2xl" style={{ backgroundColor: 'rgba(166, 206, 57, 0.08)' }}>
              <div 
                className="p-4 cursor-pointer flex items-center gap-3 hover:bg-white/50 transition-all duration-200 rounded-2xl"
                onClick={() => setShowRatesConfig(!showRatesConfig)}
              >
                <span className="text-sm font-semibold text-gray-800">Tasas</span>
                {showRatesConfig ? (
                  <ChevronUp className="w-4 h-4 text-gray-600" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-gray-600" />
                )}
              </div>
              
              <div className={`transition-all duration-300 ease-in-out ${showRatesConfig ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
                <div className="px-4 pb-4">
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
