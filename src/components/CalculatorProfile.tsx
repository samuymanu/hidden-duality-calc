
import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Trash2, Plus } from 'lucide-react';

interface Article {
  id: string;
  quantity: number;
  name: string;
  normalPrice: number;
  totalBs: number;
  recaDollars: number;
}

interface CalculatorProfileProps {
  profile: 'perfil1' | 'perfil2';
  bcvRate: number;
  parallelRate: number;
}

const CalculatorProfile = ({ profile, bcvRate, parallelRate }: CalculatorProfileProps) => {
  const [articles, setArticles] = useState<Article[]>([
    { id: '1', quantity: 1, name: 'bicicleta', normalPrice: 10, totalBs: 0, recaDollars: 0 }
  ]);

  // Calculate totals
  const calculateTotals = (article: Article) => {
    const totalBs = article.normalPrice * bcvRate * parallelRate / bcvRate;
    const recaDollars = totalBs / bcvRate;
    return { totalBs, recaDollars };
  };

  // Update calculations when rates or articles change
  useEffect(() => {
    setArticles(prevArticles => 
      prevArticles.map(article => {
        const { totalBs, recaDollars } = calculateTotals(article);
        return { ...article, totalBs, recaDollars };
      })
    );
  }, [bcvRate, parallelRate]);

  const updateArticle = (id: string, field: keyof Article, value: any) => {
    setArticles(prevArticles =>
      prevArticles.map(article => {
        if (article.id === id) {
          const updated = { ...article, [field]: value };
          const { totalBs, recaDollars } = calculateTotals(updated);
          return { ...updated, totalBs, recaDollars };
        }
        return article;
      })
    );
  };

  const addArticle = () => {
    const newId = (articles.length + 1).toString();
    const newArticle: Article = {
      id: newId,
      quantity: 1,
      name: '',
      normalPrice: 0,
      totalBs: 0,
      recaDollars: 0
    };
    setArticles([...articles, newArticle]);
  };

  const removeArticle = (id: string) => {
    setArticles(articles.filter(article => article.id !== id));
  };

  const grandTotalNormal = articles.reduce((sum, article) => sum + (article.normalPrice * article.quantity), 0);
  const grandTotalBs = articles.reduce((sum, article) => sum + (article.totalBs * article.quantity), 0);
  const grandTotalReca = articles.reduce((sum, article) => sum + (article.recaDollars * article.quantity), 0);
  const totalArticles = articles.reduce((sum, article) => sum + article.quantity, 0);

  return (
    <Card className="p-6 bg-white shadow-xl">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-gray-800">
            {profile === 'perfil1' ? 'Perfil Comercial' : 'Perfil Profesional'}
          </h2>
          <div className="bg-yellow-400 px-4 py-2 rounded-lg">
            <span className="font-bold text-gray-800">BCV: {bcvRate.toFixed(2)}</span>
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-3 rounded-lg mb-4">
          <h3 className="text-xl font-bold text-center">VENTA</h3>
        </div>
      </div>

      {/* Excel-like Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          {/* Header Row */}
          <thead>
            <tr>
              <th className="bg-cyan-400 border border-gray-300 p-2 text-sm font-bold">LIMPIAR</th>
              <th className="bg-blue-400 border border-gray-300 p-2 text-sm font-bold text-white">CANT</th>
              <th className="bg-blue-400 border border-gray-300 p-2 text-sm font-bold text-white">ARTÍCULO</th>
              <th className="bg-blue-400 border border-gray-300 p-2 text-sm font-bold text-white">Normal</th>
              <th className="bg-blue-400 border border-gray-300 p-2 text-sm font-bold text-white">TOTAL Normal</th>
              <th className="bg-green-400 border border-gray-300 p-2 text-sm font-bold">TOTAL Bolívar</th>
              <th className="bg-yellow-400 border border-gray-300 p-2 text-sm font-bold">RECA $</th>
            </tr>
          </thead>

          {/* Data Rows */}
          <tbody>
            {articles.map((article) => (
              <tr key={article.id}>
                <td className="border border-gray-300 p-1 text-center">
                  <Button
                    onClick={() => removeArticle(article.id)}
                    variant="outline"
                    size="sm"
                    className="h-6 w-6 p-0"
                  >
                    <Trash2 className="w-3 h-3" />
                  </Button>
                </td>
                <td className="border border-gray-300 p-1">
                  <Input
                    type="number"
                    value={article.quantity}
                    onChange={(e) => updateArticle(article.id, 'quantity', Number(e.target.value))}
                    className="h-8 text-center text-sm"
                  />
                </td>
                <td className="border border-gray-300 p-1">
                  <Input
                    type="text"
                    value={article.name}
                    onChange={(e) => updateArticle(article.id, 'name', e.target.value)}
                    className="h-8 text-sm"
                  />
                </td>
                <td className="border border-gray-300 p-1">
                  <Input
                    type="number"
                    step="0.01"
                    value={article.normalPrice}
                    onChange={(e) => updateArticle(article.id, 'normalPrice', Number(e.target.value))}
                    className="h-8 text-center text-sm"
                  />
                </td>
                <td className="border border-gray-300 p-2 text-center text-sm bg-gray-50">
                  {(article.normalPrice * article.quantity).toFixed(1)} $
                </td>
                <td className="border border-gray-300 p-2 text-center text-sm bg-gray-50">
                  {(article.totalBs * article.quantity).toFixed(0)} Bs
                </td>
                <td className="border border-gray-300 p-2 text-center text-sm bg-yellow-100">
                  {(article.recaDollars * article.quantity).toFixed(1)} $
                </td>
              </tr>
            ))}
          </tbody>

          {/* Totals Row */}
          <tfoot>
            <tr>
              <td className="border border-gray-300 p-2 text-center font-bold bg-gray-200">
                Total Artículos
              </td>
              <td className="border border-gray-300 p-2 text-center font-bold bg-gray-100">
                {totalArticles}
              </td>
              <td className="border border-gray-300 p-2"></td>
              <td className="border border-gray-300 p-2"></td>
              <td className="border border-gray-300 p-2 text-center font-bold bg-green-400">
                TOTAL
              </td>
              <td className="border border-gray-300 p-2 text-center font-bold bg-green-400">
                TOTAL Bolívar
              </td>
              <td className="border border-gray-300 p-2 text-center font-bold bg-yellow-400">
                Total Dólares
              </td>
            </tr>
            <tr>
              <td className="border border-gray-300 p-2"></td>
              <td className="border border-gray-300 p-2"></td>
              <td className="border border-gray-300 p-2"></td>
              <td className="border border-gray-300 p-2"></td>
              <td className="border border-gray-300 p-2 text-center font-bold text-lg">
                {grandTotalNormal.toFixed(1)} $
              </td>
              <td className="border border-gray-300 p-2 text-center font-bold text-lg">
                {grandTotalBs.toFixed(0)} Bs
              </td>
              <td className="border border-gray-300 p-2 text-center font-bold text-lg bg-yellow-300">
                {grandTotalReca.toFixed(1)} $
              </td>
            </tr>
          </tfoot>
        </table>
      </div>

      {/* Add Article Button */}
      <div className="mt-4 flex justify-center">
        <Button
          onClick={addArticle}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700"
        >
          <Plus className="w-4 h-4" />
          Agregar Artículo
        </Button>
      </div>
    </Card>
  );
};

export default CalculatorProfile;
