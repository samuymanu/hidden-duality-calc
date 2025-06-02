
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
    <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border-2 border-yellow-200 rounded-2xl p-6 shadow-lg">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* BCV Rate - Always shown */}
        <div className="space-y-3">
          <Label htmlFor="bcv-rate" className="text-base font-semibold text-gray-800">
            Tasa BCV (Oficial)
          </Label>
          <div className="relative">
            <Input
              id="bcv-rate"
              type="number"
              step="0.01"
              value={bcvRate}
              onChange={(e) => onBcvRateChange(Number(e.target.value))}
              className="text-right pr-16 bg-white border-2 border-yellow-300 focus:border-yellow-500 rounded-xl h-12 text-lg font-bold"
            />
            <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-base font-semibold text-gray-600">
              Bs/$
            </span>
          </div>
          <p className="text-sm text-gray-700 font-medium">
            Tasa oficial del Banco Central de Venezuela
          </p>
        </div>

        {/* Parallel Rate - Only for Perfil 1 */}
        {activeProfile === 'perfil1' && (
          <div className="space-y-3">
            <Label htmlFor="parallel-rate" className="text-base font-semibold text-gray-800">
              Tasa Paralelo
            </Label>
            <div className="relative">
              <Input
                id="parallel-rate"
                type="number"
                step="0.01"
                value={parallelRate}
                onChange={(e) => onParallelRateChange(Number(e.target.value))}
                className="text-right pr-16 bg-white border-2 border-orange-300 focus:border-orange-500 rounded-xl h-12 text-lg font-bold"
              />
              <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-base font-semibold text-gray-600">
                Bs/$
              </span>
            </div>
            <p className="text-sm text-gray-700 font-medium">
              Tasa de cambio del mercado paralelo
            </p>
          </div>
        )}
      </div>

      {/* Rate Difference Indicator - Only for Perfil 1 */}
      {activeProfile === 'perfil1' && (
        <div className="mt-6 p-4 bg-white rounded-xl border-2 border-gray-200 shadow-sm">
          <div className="text-base text-gray-800">
            <span className="font-bold">Diferencia:</span> {(parallelRate - bcvRate).toFixed(2)} Bs/$ 
            <span className="ml-3 text-sm font-semibold">
              ({(((parallelRate - bcvRate) / bcvRate) * 100).toFixed(1)}% sobre BCV)
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default RatesConfig;
