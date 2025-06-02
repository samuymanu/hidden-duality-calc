
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface RatesConfigProps {
  bcvRate: number;
  parallelRate: number;
  onBcvRateChange: (rate: number) => void;
  onParallelRateChange: (rate: number) => void;
  activeProfile: 'perfil1' | 'perfil2';
}

const RatesConfig = ({
  bcvRate,
  parallelRate,
  onBcvRateChange,
  onParallelRateChange,
  activeProfile
}: RatesConfigProps) => {
  return (
    <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-lg p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* BCV Rate - Always shown */}
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

        {/* Parallel Rate - Only for Perfil 1 */}
        {activeProfile === 'perfil1' && (
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
        )}
      </div>

      {/* Rate Difference Indicator - Only for Perfil 1 */}
      {activeProfile === 'perfil1' && (
        <div className="mt-4 p-3 bg-white rounded-lg border">
          <div className="text-sm text-gray-600">
            <span className="font-medium">Diferencia:</span> {(parallelRate - bcvRate).toFixed(2)} Bs/$ 
            <span className="ml-2 text-xs">
              ({(((parallelRate - bcvRate) / bcvRate) * 100).toFixed(1)}% sobre BCV)
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default RatesConfig;
