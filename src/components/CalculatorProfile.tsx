
import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Trash2, Plus } from 'lucide-react';

interface Article {
  id: string;
  quantity: number;
  price: number;
  totalBs: number;
  recaDollars: number;
}

interface CalculatorProfileProps {
  profile: 'perfil1' | 'perfil2';
  bcvRate: number;
  parallelRate: number;
}

const CalculatorProfile = ({ bcvRate, parallelRate }: CalculatorProfileProps) => {
  const [articles, setArticles] = useState<Article[]>([
    { id: '1', quantity: 1, price: 0, totalBs: 0, recaDollars: 0 }
  ]);

  // Calculate totals
  const calculateTotals = (article: Article) => {
    const totalBs = article.price * parallelRate;
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
      price: 0,
      totalBs: 0,
      recaDollars: 0
    };
    setArticles([...articles, newArticle]);
  };

  const removeArticle = (id: string) => {
    if (articles.length > 1) {
      setArticles(articles.filter(article => article.id !== id));
    }
  };

  const grandTotalPrice = articles.reduce((sum, article) => sum + (article.price * article.quantity), 0);
  const grandTotalBs = articles.reduce((sum, article) => sum + (article.totalBs * article.quantity), 0);
  const grandTotalReca = articles.reduce((sum, article) => sum + (article.recaDollars * article.quantity), 0);
  const totalQuantity = articles.reduce((sum, article) => sum + article.quantity, 0);

  return (
    <Card className="p-4 bg-white shadow-2xl border-0 rounded-3xl">
      {/* Header */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-xl font-bold text-gray-900">Calculadora</h2>
          <div className="bg-yellow-400 px-3 py-1 rounded-xl shadow-lg">
            <span className="font-bold text-gray-900 text-sm">BCV: {bcvRate.toFixed(2)}</span>
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-3 rounded-2xl mb-4 shadow-lg">
          <h3 className="text-lg font-bold text-center">VENTA</h3>
        </div>
      </div>

      {/* Simplified Items List */}
      <div className="space-y-3 mb-4">
        {articles.map((article, index) => (
          <Card key={article.id} className="p-3 bg-gray-50 rounded-2xl border-2 border-gray-200">
            <div className="grid grid-cols-12 gap-2 items-center">
              {/* Delete Button */}
              <div className="col-span-2">
                <Button
                  onClick={() => removeArticle(article.id)}
                  variant="outline"
                  size="sm"
                  disabled={articles.length === 1}
                  className="h-8 w-8 p-0 rounded-full border-2 hover:bg-red-50 hover:border-red-300 transition-all duration-200 active:scale-95"
                >
                  <Trash2 className="w-3 h-3 text-red-500" />
                </Button>
              </div>

              {/* Quantity */}
              <div className="col-span-3">
                <Input
                  type="number"
                  value={article.quantity}
                  onChange={(e) => updateArticle(article.id, 'quantity', Number(e.target.value))}
                  className="h-10 text-center text-sm font-semibold rounded-xl border-2 focus:border-blue-400"
                  placeholder="Cant."
                />
              </div>

              {/* Price */}
              <div className="col-span-7">
                <Input
                  type="number"
                  step="0.01"
                  value={article.price}
                  onChange={(e) => updateArticle(article.id, 'price', Number(e.target.value))}
                  className="h-10 text-center text-sm font-semibold rounded-xl border-2 focus:border-blue-400"
                  placeholder="Precio $"
                />
              </div>
            </div>

            {/* Results */}
            <div className="mt-2 grid grid-cols-3 gap-2 text-xs">
              <div className="text-center p-2 bg-blue-100 rounded-lg">
                <div className="font-semibold text-blue-800">Total $</div>
                <div className="font-bold">{(article.price * article.quantity).toFixed(1)}</div>
              </div>
              <div className="text-center p-2 bg-green-100 rounded-lg">
                <div className="font-semibold text-green-800">Bolívares</div>
                <div className="font-bold">{(article.totalBs * article.quantity).toFixed(0)}</div>
              </div>
              <div className="text-center p-2 bg-yellow-100 rounded-lg">
                <div className="font-semibold text-yellow-800">RECA $</div>
                <div className="font-bold">{(article.recaDollars * article.quantity).toFixed(1)}</div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Add Article Button */}
      <div className="flex justify-center mb-6">
        <Button
          onClick={addArticle}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white hover:shadow-lg transition-all duration-200 px-6 py-3 text-base font-semibold rounded-2xl active:scale-95"
        >
          <Plus className="w-5 h-5" />
          Agregar Artículo
        </Button>
      </div>

      {/* Totals Summary */}
      <div className="grid grid-cols-2 gap-3">
        {/* Total Quantity */}
        <Card className="p-4 rounded-2xl shadow-lg border-0" style={{ background: 'linear-gradient(135deg, #06b6d4, #0891b2)' }}>
          <div className="text-center text-white">
            <h3 className="text-sm font-semibold mb-1">Cantidad Total</h3>
            <p className="text-2xl font-bold">{totalQuantity}</p>
          </div>
        </Card>

        {/* Total Price */}
        <Card className="p-4 rounded-2xl shadow-lg border-0" style={{ background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)' }}>
          <div className="text-center text-white">
            <h3 className="text-sm font-semibold mb-1">Total $</h3>
            <p className="text-2xl font-bold">${grandTotalPrice.toFixed(1)}</p>
          </div>
        </Card>

        {/* Total Bolivares */}
        <Card className="p-4 rounded-2xl shadow-lg border-0" style={{ background: 'linear-gradient(135deg, #10b981, #059669)' }}>
          <div className="text-center text-white">
            <h3 className="text-sm font-semibold mb-1">Total Bolívares</h3>
            <p className="text-2xl font-bold">{grandTotalBs.toFixed(0)} Bs</p>
          </div>
        </Card>

        {/* Total RECA */}
        <Card className="p-4 rounded-2xl shadow-lg border-0" style={{ background: 'linear-gradient(135deg, #eab308, #ca8a04)' }}>
          <div className="text-center text-white">
            <h3 className="text-sm font-semibold mb-1">Total RECA</h3>
            <p className="text-2xl font-bold">${grandTotalReca.toFixed(1)}</p>
          </div>
        </Card>
      </div>
    </Card>
  );
};

export default CalculatorProfile;
