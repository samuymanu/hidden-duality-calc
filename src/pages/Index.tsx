
import { useState } from 'react';
import { Calculator, DollarSign } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import CalculatorProfile from '@/components/CalculatorProfile';
import RatesConfig from '@/components/RatesConfig';

const Index = () => {
  const [activeProfile, setActiveProfile] = useState<'perfil1' | 'perfil2'>('perfil1');
  const [showRatesConfig, setShowRatesConfig] = useState(false);
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

        {/* Profile Selector */}
        <Card className="mb-6 p-4 bg-white shadow-lg">
          <div className="flex items-center justify-between">
            <div className="flex gap-4">
              <Button
                onClick={() => setActiveProfile('perfil1')}
                variant={activeProfile === 'perfil1' ? 'default' : 'outline'}
                className="flex items-center gap-2"
              >
                <Calculator className="w-4 h-4" />
                Perfil 1
              </Button>
              <Button
                onClick={() => setActiveProfile('perfil2')}
                variant={activeProfile === 'perfil2' ? 'default' : 'outline'}
                className="flex items-center gap-2"
              >
                <DollarSign className="w-4 h-4" />
                Perfil 2
              </Button>
            </div>
            
            <Button
              onClick={() => setShowRatesConfig(!showRatesConfig)}
              variant="outline"
              size="sm"
              className="text-xs"
            >
              {showRatesConfig ? 'Ocultar Tasas' : 'Configurar Tasas'}
            </Button>
          </div>
        </Card>

        {/* Rates Configuration (Hidden by default) */}
        {showRatesConfig && (
          <RatesConfig
            bcvRate={bcvRate}
            parallelRate={parallelRate}
            onBcvRateChange={setBcvRate}
            onParallelRateChange={setParallelRate}
            onClose={() => setShowRatesConfig(false)}
          />
        )}

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
