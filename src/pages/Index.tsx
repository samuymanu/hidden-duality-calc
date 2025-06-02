
import { useState } from 'react';
import { Calculator, DollarSign, ChevronDown, ChevronUp } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import CalculatorProfile from '@/components/CalculatorProfile';
import RatesConfig from '@/components/RatesConfig';

const Index = () => {
  const [activeProfile, setActiveProfile] = useState<'perfil1' | 'perfil2'>('perfil1');
  const [showRatesConfig, setShowRatesConfig] = useState(false);
  const [showProfileSelector, setShowProfileSelector] = useState(true);
  const [bcvRate, setBcvRate] = useState(97.31);
  const [parallelRate, setParallelRate] = useState(105.50);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Calculadora Dual de Ventas
          </h1>
          <p className="text-gray-600">
            Sistema profesional de cálculo con tasas BCV y Paralelo
          </p>
        </div>

        {/* Profile Selector - Collapsible */}
        <Card className="mb-6 bg-white shadow-lg overflow-hidden">
          <div 
            className="p-4 cursor-pointer flex items-center justify-between hover:bg-gray-50 transition-colors"
            onClick={() => setShowProfileSelector(!showProfileSelector)}
          >
            <h3 className="text-lg font-semibold text-gray-800">Seleccionar Perfil</h3>
            {showProfileSelector ? (
              <ChevronUp className="w-5 h-5 text-gray-600" />
            ) : (
              <ChevronDown className="w-5 h-5 text-gray-600" />
            )}
          </div>
          
          <div className={`transition-all duration-300 ease-in-out ${showProfileSelector ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
            <div className="p-4 pt-0 flex gap-4">
              <Button
                onClick={() => setActiveProfile('perfil1')}
                variant={activeProfile === 'perfil1' ? 'default' : 'outline'}
                className="flex items-center gap-2"
              >
                <Calculator className="w-4 h-4" />
                Perfil 1 - Comercial
              </Button>
              <Button
                onClick={() => setActiveProfile('perfil2')}
                variant={activeProfile === 'perfil2' ? 'default' : 'outline'}
                className="flex items-center gap-2"
              >
                <DollarSign className="w-4 h-4" />
                Perfil 2 - Simple
              </Button>
            </div>
          </div>
        </Card>

        {/* Rates Configuration - Collapsible */}
        <Card className="mb-6 bg-white shadow-lg overflow-hidden">
          <div 
            className="p-4 cursor-pointer flex items-center justify-between hover:bg-gray-50 transition-colors"
            onClick={() => setShowRatesConfig(!showRatesConfig)}
          >
            <h3 className="text-lg font-semibold text-gray-800">Configuración de Tasas</h3>
            {showRatesConfig ? (
              <ChevronUp className="w-5 h-5 text-gray-600" />
            ) : (
              <ChevronDown className="w-5 h-5 text-gray-600" />
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
