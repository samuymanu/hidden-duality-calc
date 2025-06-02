
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

interface RatesConfigProps {
  bcvRate: number;
  parallelRate: number;
  onBcvRateChange: (rate: number) => void;
  onParallelRateChange: (rate: number) => void;
  onClose: () => void;
}

const RatesConfig = ({
  bcvRate,
  parallelRate,
  onBcvRateChange,
  onParallelRateChange,
  onClose
}: RatesConfigProps) => {
  return (
    <Card className="mb-6 p-6 bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold text-gray-800">Configuración de Tasas</h3>
        <Button
          onClick={onClose}
          variant="outline"
          size="sm"
          className="h-8 w-8 p-0"
        >
          <X className="w-4 h-4" />
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* BCV Rate */}
        <div className="space-y-2">
          <Label htmlFor="bcv-rate" className="text-sm font-medium text-gray-700">
            Tasa BCV (Oficial)
          </Label>
          <div className="relative">
            <Input
              id="bcv-rate"
              type="number"
              step="0.01"
              value={bcvRate}
              onChange={(e) => onBcvRateChange(Number(e.target.value))}
              className="text-right pr-12 bg-white border-yellow-300 focus:border-yellow-500"
            />
            <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm text-gray-500">
              Bs/$
            </span>
          </div>
          <p className="text-xs text-gray-600">
            Tasa oficial del Banco Central de Venezuela
          </p>
        </div>

        {/* Parallel Rate */}
        <div className="space-y-2">
          <Label htmlFor="parallel-rate" className="text-sm font-medium text-gray-700">
            Tasa Paralelo
          </Label>
          <div className="relative">
            <Input
              id="parallel-rate"
              type="number"
              step="0.01"
              value={parallelRate}
              onChange={(e) => onParallelRateChange(Number(e.target.value))}
              className="text-right pr-12 bg-white border-orange-300 focus:border-orange-500"
            />
            <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm text-gray-500">
              Bs/$
            </span>
          </div>
          <p className="text-xs text-gray-600">
            Tasa de cambio del mercado paralelo
          </p>
        </div>
      </div>

      {/* Rate Difference Indicator */}
      <div className="mt-4 p-3 bg-white rounded-lg border">
        <div className="text-sm text-gray-600">
          <span className="font-medium">Diferencia:</span> {(parallelRate - bcvRate).toFixed(2)} Bs/$ 
          <span className="ml-2 text-xs">
            ({(((parallelRate - bcvRate) / bcvRate) * 100).toFixed(1)}% sobre BCV)
          </span>
        </div>
      </div>
    </Card>
  );
};

export default RatesConfig;
