
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
  onParallelRateChange
}: RatesConfigProps) => {
  return (
    <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border-2 border-yellow-200 rounded-2xl p-4 shadow-lg">
      <div className="space-y-4">
        {/* BCV Rate */}
        <div className="space-y-2">
          <Label htmlFor="bcv-rate" className="text-sm font-semibold text-gray-800">
            Tasa BCV (Oficial)
          </Label>
          <div className="relative">
            <Input
              id="bcv-rate"
              type="number"
              step="0.01"
              value={bcvRate}
              onChange={(e) => onBcvRateChange(Number(e.target.value))}
              className="text-right pr-12 bg-white border-2 border-yellow-300 focus:border-yellow-500 rounded-xl h-10 text-base font-bold"
            />
            <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm font-semibold text-gray-600">
              Bs/$
            </span>
          </div>
        </div>

        {/* Parallel Rate */}
        <div className="space-y-2">
          <Label htmlFor="parallel-rate" className="text-sm font-semibold text-gray-800">
            Tasa Paralelo
          </Label>
          <div className="relative">
            <Input
              id="parallel-rate"
              type="number"
              step="0.01"
              value={parallelRate}
              onChange={(e) => onParallelRateChange(Number(e.target.value))}
              className="text-right pr-12 bg-white border-2 border-orange-300 focus:border-orange-500 rounded-xl h-10 text-base font-bold"
            />
            <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm font-semibold text-gray-600">
              Bs/$
            </span>
          </div>
        </div>

        {/* Rate Difference Indicator */}
        <div className="p-3 bg-white rounded-xl border-2 border-gray-200 shadow-sm">
          <div className="text-sm text-gray-800 text-center">
            <span className="font-bold">Diferencia:</span> {(parallelRate - bcvRate).toFixed(2)} Bs/$ 
            <br />
            <span className="text-xs font-semibold">
              ({(((parallelRate - bcvRate) / bcvRate) * 100).toFixed(1)}% sobre BCV)
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RatesConfig;
