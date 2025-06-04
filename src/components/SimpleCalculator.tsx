
import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Trash2, Plus } from 'lucide-react';

interface SimpleArticle {
  id: string;
  quantity: number;
  name: string;
  normalPrice: number;
  totalBs: number;
}

interface SimpleCalculatorProps {
  bcvRate: number;
}

const SimpleCalculator = ({ bcvRate }: SimpleCalculatorProps) => {
  const [articles, setArticles] = useState<SimpleArticle[]>([
    { id: '1', quantity: 1, name: 'producto', normalPrice: 10, totalBs: 0 }
  ]);

  // Calculate totals
  const calculateTotalBs = (article: SimpleArticle) => {
    return article.normalPrice * bcvRate;
  };

  // Update calculations when rate or articles change
  useEffect(() => {
    setArticles(prevArticles => 
      prevArticles.map(article => ({
        ...article,
        totalBs: calculateTotalBs(article)
      }))
    );
  }, [bcvRate]);

  const updateArticle = (id: string, field: keyof SimpleArticle, value: any) => {
    setArticles(prevArticles =>
      prevArticles.map(article => {
        if (article.id === id) {
          const updated = { ...article, [field]: value };
          return { ...updated, totalBs: calculateTotalBs(updated) };
        }
        return article;
      })
    );
  };

  const addArticle = () => {
    const newId = (articles.length + 1).toString();
    const newArticle: SimpleArticle = {
      id: newId,
      quantity: 1,
      name: '',
      normalPrice: 0,
      totalBs: 0
    };
    setArticles([...articles, newArticle]);
  };

  const removeArticle = (id: string) => {
    setArticles(articles.filter(article => article.id !== id));
  };

  const grandTotalNormal = articles.reduce((sum, article) => sum + (article.normalPrice * article.quantity), 0);
  const grandTotalBs = articles.reduce((sum, article) => sum + (article.totalBs * article.quantity), 0);
  const totalArticles = articles.reduce((sum, article) => sum + article.quantity, 0);

  return (
    <Card className="p-4 md:p-8 bg-white shadow-2xl border-0 rounded-3xl">
      {/* Header - Mobile optimized */}
      <div className="mb-6 md:mb-8">
        <div className="flex flex-col md:flex-row items-center justify-between mb-4 md:mb-6 gap-4">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 text-center md:text-left">Calculadora Simple</h2>
          <div className="px-4 md:px-6 py-2 md:py-3 rounded-2xl shadow-lg" style={{ backgroundColor: '#a6ce39' }}>
            <span className="font-bold text-white text-base md:text-lg">BCV: {bcvRate.toFixed(2)}</span>
          </div>
        </div>
        
        <div className="text-white p-3 md:p-4 rounded-2xl mb-4 md:mb-6 shadow-lg" style={{ background: 'linear-gradient(135deg, #a6ce39, #8bc34a)' }}>
          <h3 className="text-xl md:text-2xl font-bold text-center">VENTA SIMPLE</h3>
        </div>
      </div>

      {/* Mobile-first Table */}
      <div className="overflow-x-auto rounded-2xl border border-gray-200 shadow-lg mb-4">
        <table className="w-full min-w-[600px]">
          {/* Header Row */}
          <thead>
            <tr className="bg-gradient-to-r from-gray-50 to-gray-100">
              <th className="p-2 md:p-4 text-xs md:text-sm font-bold text-white rounded-tl-2xl" style={{ backgroundColor: '#a6ce39' }}>LIMPIAR</th>
              <th className="bg-blue-500 p-2 md:p-4 text-xs md:text-sm font-bold text-white">CANT</th>
              <th className="bg-blue-500 p-2 md:p-4 text-xs md:text-sm font-bold text-white">ARTÍCULO</th>
              <th className="bg-blue-500 p-2 md:p-4 text-xs md:text-sm font-bold text-white">Precio Normal ($)</th>
              <th className="bg-blue-500 p-2 md:p-4 text-xs md:text-sm font-bold text-white">TOTAL Normal ($)</th>
              <th className="p-2 md:p-4 text-xs md:text-sm font-bold text-white rounded-tr-2xl" style={{ backgroundColor: '#a6ce39' }}>TOTAL Bolívares</th>
            </tr>
          </thead>

          {/* Data Rows */}
          <tbody>
            {articles.map((article, index) => (
              <tr key={article.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                <td className="p-2 md:p-3 text-center border-b border-gray-200">
                  <Button
                    onClick={() => removeArticle(article.id)}
                    variant="outline"
                    size="sm"
                    className="h-8 w-8 p-0 rounded-full border-2 hover:bg-red-50 hover:border-red-300 transition-all duration-200 active:scale-95"
                  >
                    <Trash2 className="w-3 h-3 md:w-4 md:h-4 text-red-500" />
                  </Button>
                </td>
                <td className="p-2 md:p-3 border-b border-gray-200">
                  <Input
                    type="number"
                    value={article.quantity}
                    onChange={(e) => updateArticle(article.id, 'quantity', Number(e.target.value))}
                    className="h-10 text-center text-sm md:text-base font-semibold rounded-xl border-2 focus:border-blue-400"
                  />
                </td>
                <td className="p-2 md:p-3 border-b border-gray-200">
                  <Input
                    type="text"
                    value={article.name}
                    onChange={(e) => updateArticle(article.id, 'name', e.target.value)}
                    className="h-10 text-sm md:text-base font-medium rounded-xl border-2 focus:border-blue-400"
                  />
                </td>
                <td className="p-2 md:p-3 border-b border-gray-200">
                  <Input
                    type="number"
                    step="0.01"
                    value={article.normalPrice}
                    onChange={(e) => updateArticle(article.id, 'normalPrice', Number(e.target.value))}
                    className="h-10 text-center text-sm md:text-base font-semibold rounded-xl border-2 focus:border-blue-400"
                  />
                </td>
                <td className="p-2 md:p-4 text-center text-sm md:text-base font-bold border-b border-gray-200 bg-gray-50">
                  {(article.normalPrice * article.quantity).toFixed(2)} $
                </td>
                <td className="p-2 md:p-4 text-center text-sm md:text-base font-bold border-b border-gray-200" style={{ backgroundColor: 'rgba(166, 206, 57, 0.2)' }}>
                  {(article.totalBs * article.quantity).toFixed(0)} Bs
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Article Button - Mobile optimized */}
      <div className="flex justify-center mb-6 md:mb-8">
        <Button
          onClick={addArticle}
          className="flex items-center gap-3 text-white hover:shadow-lg transition-all duration-200 px-6 md:px-8 py-3 md:py-4 text-base font-semibold rounded-2xl active:scale-95"
          style={{ backgroundColor: '#a6ce39' }}
        >
          <Plus className="w-5 h-5" />
          Agregar Artículo
        </Button>
      </div>

      {/* Totals Summary - Mobile responsive grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
        {/* Total Articles */}
        <Card className="p-4 md:p-6 rounded-2xl shadow-lg border-0" style={{ background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)' }}>
          <div className="text-center text-white">
            <h3 className="text-base md:text-lg font-semibold mb-2">Total Artículos</h3>
            <p className="text-2xl md:text-3xl font-bold">{totalArticles}</p>
          </div>
        </Card>

        {/* Total Dollars */}
        <Card className="p-4 md:p-6 rounded-2xl shadow-lg border-0" style={{ background: 'linear-gradient(135deg, #10b981, #059669)' }}>
          <div className="text-center text-white">
            <h3 className="text-base md:text-lg font-semibold mb-2">Total Dólares</h3>
            <p className="text-2xl md:text-3xl font-bold">${grandTotalNormal.toFixed(2)}</p>
          </div>
        </Card>

        {/* Total Bolivares */}
        <Card className="p-4 md:p-6 rounded-2xl shadow-lg border-0" style={{ background: 'linear-gradient(135deg, #a6ce39, #8bc34a)' }}>
          <div className="text-center text-white">
            <h3 className="text-base md:text-lg font-semibold mb-2">Total Bolívares</h3>
            <p className="text-2xl md:text-3xl font-bold">{grandTotalBs.toFixed(0)} Bs</p>
          </div>
        </Card>
      </div>
    </Card>
  );
};

export default SimpleCalculator;
