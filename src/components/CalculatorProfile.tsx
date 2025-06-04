
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
    <Card className="p-6 bg-white shadow-2xl border-0 rounded-3xl">
      {/* BCV Rate Display */}
      <div className="flex justify-center mb-6">
        <div className="bg-yellow-400 px-4 py-2 rounded-xl shadow-lg">
          <span className="font-bold text-gray-900 text-base">BCV: {bcvRate.toFixed(2)}</span>
        </div>
      </div>

      {/* Items List - Bigger size */}
      <div className="space-y-4 mb-6">
        {articles.map((article, index) => (
          <Card key={article.id} className="p-4 bg-gray-50 rounded-2xl border-2 border-gray-200">
            <div className="grid grid-cols-12 gap-3 items-center">
              {/* Delete Button */}
              <div className="col-span-2">
                <Button
                  onClick={() => removeArticle(article.id)}
                  variant="outline"
                  size="sm"
                  disabled={articles.length === 1}
                  className="h-10 w-10 p-0 rounded-full border-2 hover:bg-red-50 hover:border-red-300 transition-all duration-200 active:scale-95"
                >
                  <Trash2 className="w-4 h-4 text-red-500" />
                </Button>
              </div>

              {/* Quantity - Integer only */}
              <div className="col-span-3">
                <Input
                  type="number"
                  min="1"
                  step="1"
                  value={article.quantity || ''}
                  onChange={(e) => {
                    const value = parseInt(e.target.value) || 1;
                    updateArticle(article.id, 'quantity', value);
                  }}
                  className="h-12 text-center text-base font-semibold rounded-xl border-2 focus:border-blue-400"
                  placeholder="Cant."
                />
              </div>

              {/* Price - Bigger input */}
              <div className="col-span-7">
                <Input
                  type="number"
                  step="0.01"
                  value={article.price || ''}
                  onChange={(e) => updateArticle(article.id, 'price', Number(e.target.value) || 0)}
                  className="h-12 text-center text-base font-semibold rounded-xl border-2 focus:border-blue-400"
                  placeholder="Precio $"
                />
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Add Article Button - Bigger */}
      <div className="flex justify-center mb-8">
        <Button
          onClick={addArticle}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white hover:shadow-lg transition-all duration-200 px-8 py-4 text-lg font-semibold rounded-2xl active:scale-95"
        >
          <Plus className="w-6 h-6" />
          Agregar Artículo
        </Button>
      </div>

      {/* Totals Summary - Bigger cards */}
      <div className="grid grid-cols-2 gap-4">
        {/* Total Quantity */}
        <Card className="p-5 rounded-2xl shadow-lg border-0" style={{ background: 'linear-gradient(135deg, #06b6d4, #0891b2)' }}>
          <div className="text-center text-white">
            <h3 className="text-base font-semibold mb-2">Cantidad Total</h3>
            <p className="text-3xl font-bold">{totalQuantity}</p>
          </div>
        </Card>

        {/* Total Price */}
        <Card className="p-5 rounded-2xl shadow-lg border-0" style={{ background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)' }}>
          <div className="text-center text-white">
            <h3 className="text-base font-semibold mb-2">Total $</h3>
            <p className="text-3xl font-bold">${grandTotalPrice.toFixed(1)}</p>
          </div>
        </Card>

        {/* Total Bolivares */}
        <Card className="p-5 rounded-2xl shadow-lg border-0" style={{ background: 'linear-gradient(135deg, #10b981, #059669)' }}>
          <div className="text-center text-white">
            <h3 className="text-base font-semibold mb-2">Total Bolívares</h3>
            <p className="text-3xl font-bold">{grandTotalBs.toFixed(0)} Bs</p>
          </div>
        </Card>

        {/* Total RECA */}
        <Card className="p-5 rounded-2xl shadow-lg border-0" style={{ background: 'linear-gradient(135deg, #eab308, #ca8a04)' }}>
          <div className="text-center text-white">
            <h3 className="text-base font-semibold mb-2">Total RECA</h3>
            <p className="text-3xl font-bold">${grandTotalReca.toFixed(1)}</p>
          </div>
        </Card>
      </div>
    </Card>
  );
};

export default CalculatorProfile;
