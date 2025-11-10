'use client';

import { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TrendingUp, TrendingDown } from 'lucide-react';

const cropData = {
  tomatoes: [
    { month: 'Jan', price: 45, year: 2024 },
    { month: 'Feb', price: 50, year: 2024 },
    { month: 'Mar', price: 48, year: 2024 },
    { month: 'Apr', price: 52, year: 2024 },
    { month: 'May', price: 55, year: 2024 },
    { month: 'Jun', price: 60, year: 2024 },
    { month: 'Jul', price: 58, year: 2024 },
    { month: 'Aug', price: 62, year: 2024 },
    { month: 'Sep', price: 65, year: 2024 },
    { month: 'Oct', price: 63, year: 2024 },
    { month: 'Nov', price: 68, year: 2024 },
    { month: 'Dec', price: 70, year: 2024 },
  ],
  maize: [
    { month: 'Jan', price: 30, year: 2024 },
    { month: 'Feb', price: 32, year: 2024 },
    { month: 'Mar', price: 35, year: 2024 },
    { month: 'Apr', price: 33, year: 2024 },
    { month: 'May', price: 38, year: 2024 },
    { month: 'Jun', price: 40, year: 2024 },
    { month: 'Jul', price: 42, year: 2024 },
    { month: 'Aug', price: 45, year: 2024 },
    { month: 'Sep', price: 43, year: 2024 },
    { month: 'Oct', price: 48, year: 2024 },
    { month: 'Nov', price: 50, year: 2024 },
    { month: 'Dec', price: 52, year: 2024 },
  ],
  beans: [
    { month: 'Jan', price: 80, year: 2024 },
    { month: 'Feb', price: 85, year: 2024 },
    { month: 'Mar', price: 82, year: 2024 },
    { month: 'Apr', price: 88, year: 2024 },
    { month: 'May', price: 90, year: 2024 },
    { month: 'Jun', price: 95, year: 2024 },
    { month: 'Jul', price: 92, year: 2024 },
    { month: 'Aug', price: 98, year: 2024 },
    { month: 'Sep', price: 100, year: 2024 },
    { month: 'Oct', price: 105, year: 2024 },
    { month: 'Nov', price: 102, year: 2024 },
    { month: 'Dec', price: 110, year: 2024 },
  ],
};

export default function PriceTrendsPage() {
  const [selectedCrop, setSelectedCrop] = useState<keyof typeof cropData>('tomatoes');
  const data = cropData[selectedCrop];
  
  const currentPrice = data[data.length - 1].price;
  const previousPrice = data[data.length - 2].price;
  const priceChange = ((currentPrice - previousPrice) / previousPrice) * 100;
  const isIncreasing = priceChange > 0;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-2">Crop Price Trends</h1>
      <p className="text-gray-600 mb-8">Track historical prices and make informed selling decisions</p>

      {/* Crop Selector */}
      <div className="flex gap-4 mb-8">
        {Object.keys(cropData).map((crop) => (
          <button
            key={crop}
            onClick={() => setSelectedCrop(crop as keyof typeof cropData)}
            className={`px-6 py-3 rounded-lg font-medium capitalize transition-colors ${
              selectedCrop === crop
                ? 'bg-orange-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {crop}
          </button>
        ))}
      </div>

      {/* Price Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <p className="text-gray-600 mb-2">Current Price</p>
          <p className="text-3xl font-bold text-orange-600">KSh {currentPrice}/kg</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <p className="text-gray-600 mb-2">Monthly Change</p>
          <div className="flex items-center gap-2">
            {isIncreasing ? (
              <TrendingUp className="text-orange-600" size={24} />
            ) : (
              <TrendingDown className="text-red-600" size={24} />
            )}
            <p className={`text-3xl font-bold ${isIncreasing ? 'text-orange-600' : 'text-red-600'}`}>
              {priceChange.toFixed(1)}%
            </p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <p className="text-gray-600 mb-2">Recommendation</p>
          <p className="text-lg font-semibold">
            {isIncreasing ? '📈 Good time to sell' : '⏳ Consider waiting'}
          </p>
        </div>
      </div>

      {/* Chart */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4 capitalize">{selectedCrop} Price History (2024)</h2>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis label={{ value: 'Price (KSh/kg)', angle: -90, position: 'insideLeft' }} />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="price" stroke="#16a34a" strokeWidth={2} name="Price (KSh/kg)" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Insights */}
      <div className="mt-8 bg-blue-50 p-6 rounded-lg">
        <h3 className="text-lg font-semibold mb-3">💡 Market Insights</h3>
        <ul className="space-y-2 text-gray-700">
          <li>• Prices typically peak during off-season months</li>
          <li>• Consider storage options if prices are currently low</li>
          <li>• Monitor weather forecasts as they impact supply and demand</li>
          <li>• Diversify crops to reduce price volatility risk</li>
        </ul>
      </div>
    </div>
  );
}

