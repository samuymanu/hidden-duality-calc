
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
    <Card className="p-8 bg-white shadow-2xl border-0 rounded-3xl">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold text-gray-900">Calculadora Simple</h2>
          <div className="px-6 py-3 rounded-2xl shadow-lg" style={{ backgroundColor: '#a6ce39' }}>
            <span className="font-bold text-white text-lg">BCV: {bcvRate.toFixed(2)}</span>
          </div>
        </div>
        
        <div className="text-white p-4 rounded-2xl mb-6 shadow-lg" style={{ background: 'linear-gradient(135deg, #a6ce39, #8bc34a)' }}>
          <h3 className="text-2xl font-bold text-center">VENTA SIMPLE</h3>
        </div>
      </div>

      {/* Modern Table */}
      <div className="overflow-hidden rounded-2xl border border-gray-200 shadow-lg">
        <table className="w-full">
          {/* Header Row */}
          <thead>
            <tr className="bg-gradient-to-r from-gray-50 to-gray-100">
              <th className="p-4 text-sm font-bold text-gray-700 rounded-tl-2xl" style={{ backgroundColor: '#a6ce39', color: 'white' }}>LIMPIAR</th>
              <th className="bg-blue-500 p-4 text-sm font-bold text-white">CANT</th>
              <th className="bg-blue-500 p-4 text-sm font-bold text-white">ARTÍCULO</th>
              <th className="bg-blue-500 p-4 text-sm font-bold text-white">Precio Normal ($)</th>
              <th className="bg-blue-500 p-4 text-sm font-bold text-white">TOTAL Normal ($)</th>
              <th className="p-4 text-sm font-bold text-white rounded-tr-2xl" style={{ backgroundColor: '#a6ce39' }}>TOTAL Bolívares</th>
            </tr>
          </thead>

          {/* Data Rows */}
          <tbody>
            {articles.map((article, index) => (
              <tr key={article.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                <td className="p-3 text-center border-b border-gray-200">
                  <Button
                    onClick={() => removeArticle(article.id)}
                    variant="outline"
                    size="sm"
                    className="h-8 w-8 p-0 rounded-full border-2 hover:bg-red-50 hover:border-red-300 transition-all duration-200"
                  >
                    <Trash2 className="w-4 h-4 text-red-500" />
                  </Button>
                </td>
                <td className="p-3 border-b border-gray-200">
                  <Input
                    type="number"
                    value={article.quantity}
                    onChange={(e) => updateArticle(article.id, 'quantity', Number(e.target.value))}
                    className="h-10 text-center text-base font-semibold rounded-xl border-2 focus:border-blue-400"
                  />
                </td>
                <td className="p-3 border-b border-gray-200">
                  <Input
                    type="text"
                    value={article.name}
                    onChange={(e) => updateArticle(article.id, 'name', e.target.value)}
                    className="h-10 text-base font-medium rounded-xl border-2 focus:border-blue-400"
                  />
                </td>
                <td className="p-3 border-b border-gray-200">
                  <Input
                    type="number"
                    step="0.01"
                    value={article.normalPrice}
                    onChange={(e) => updateArticle(article.id, 'normalPrice', Number(e.target.value))}
                    className="h-10 text-center text-base font-semibold rounded-xl border-2 focus:border-blue-400"
                  />
                </td>
                <td className="p-4 text-center text-base font-bold border-b border-gray-200 bg-gray-50">
                  {(article.normalPrice * article.quantity).toFixed(2)} $
                </td>
                <td className="p-4 text-center text-base font-bold border-b border-gray-200" style={{ backgroundColor: 'rgba(166, 206, 57, 0.2)' }}>
                  {(article.totalBs * article.quantity).toFixed(0)} Bs
                </td>
              </tr>
            ))}
          </tbody>

          {/* Totals Row */}
          <tfoot>
            <tr className="bg-gray-100">
              <td className="p-4 text-center font-bold text-gray-800">
                Total Artículos
              </td>
              <td className="p-4 text-center font-bold text-lg text-gray-900">
                {totalArticles}
              </td>
              <td className="p-4"></td>
              <td className="p-4"></td>
              <td className="p-4 text-center font-bold bg-blue-500 text-white rounded-bl-lg">
                TOTAL DÓLARES
              </td>
              <td className="p-4 text-center font-bold text-white rounded-br-lg" style={{ backgroundColor: '#a6ce39' }}>
                TOTAL BOLÍVARES
              </td>
            </tr>
            <tr className="bg-gray-50">
              <td className="p-4"></td>
              <td className="p-4"></td>
              <td className="p-4"></td>
              <td className="p-4"></td>
              <td className="p-4 text-center font-bold text-xl text-gray-900">
                {grandTotalNormal.toFixed(2)} $
              </td>
              <td className="p-4 text-center font-bold text-xl text-gray-900">
                {grandTotalBs.toFixed(0)} Bs
              </td>
            </tr>
          </tfoot>
        </table>
      </div>

      {/* Add Article Button */}
      <div className="mt-8 flex justify-center">
        <Button
          onClick={addArticle}
          className="flex items-center gap-3 text-white hover:shadow-lg transition-all duration-200 px-8 py-4 text-base font-semibold rounded-2xl"
          style={{ backgroundColor: '#a6ce39' }}
        >
          <Plus className="w-5 h-5" />
          Agregar Artículo
        </Button>
      </div>
    </Card>
  );
};

export default SimpleCalculator;
