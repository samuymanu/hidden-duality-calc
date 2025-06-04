
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
    <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-xl p-3 shadow-sm">
      <div className="space-y-3">
        {/* BCV Rate - Smaller */}
        <div className="space-y-1">
          <Label htmlFor="bcv-rate" className="text-xs font-semibold text-gray-800">
            Tasa BCV (Oficial)
          </Label>
          <div className="relative">
            <Input
              id="bcv-rate"
              type="number"
              step="0.01"
              value={bcvRate}
              onChange={(e) => onBcvRateChange(Number(e.target.value))}
              className="text-right pr-10 bg-white border border-yellow-300 focus:border-yellow-500 rounded-lg h-8 text-sm font-bold"
            />
            <span className="absolute right-2 top-1/2 transform -translate-y-1/2 text-xs font-semibold text-gray-600">
              Bs/$
            </span>
          </div>
        </div>

        {/* Parallel Rate - Smaller */}
        <div className="space-y-1">
          <Label htmlFor="parallel-rate" className="text-xs font-semibold text-gray-800">
            Tasa Paralelo
          </Label>
          <div className="relative">
            <Input
              id="parallel-rate"
              type="number"
              step="0.01"
              value={parallelRate}
              onChange={(e) => onParallelRateChange(Number(e.target.value))}
              className="text-right pr-10 bg-white border border-orange-300 focus:border-orange-500 rounded-lg h-8 text-sm font-bold"
            />
            <span className="absolute right-2 top-1/2 transform -translate-y-1/2 text-xs font-semibold text-gray-600">
              Bs/$
            </span>
          </div>
        </div>

        {/* Rate Difference Indicator - Smaller */}
        <div className="p-2 bg-white rounded-lg border border-gray-200 shadow-sm">
          <div className="text-xs text-gray-800 text-center">
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
