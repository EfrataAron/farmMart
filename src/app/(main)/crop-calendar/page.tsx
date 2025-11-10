'use client';

import { useState } from 'react';
import { Calendar, Bell, Sprout } from 'lucide-react';

interface CropInfo {
  name: string;
  plantingMonths: string[];
  harvestMonths: string[];
  duration: string;
  tips: string;
}

const crops: CropInfo[] = [
  {
    name: 'Tomatoes',
    plantingMonths: ['Mar', 'Apr', 'Sep', 'Oct'],
    harvestMonths: ['Jun', 'Jul', 'Dec', 'Jan'],
    duration: '70-90 days',
    tips: 'Plant after last frost. Needs full sun and regular watering.',
  },
  {
    name: 'Maize',
    plantingMonths: ['Mar', 'Apr', 'Oct', 'Nov'],
    harvestMonths: ['Jul', 'Aug', 'Feb', 'Mar'],
    duration: '90-120 days',
    tips: 'Plant when soil temperature is above 15°C. Requires good drainage.',
  },
  {
    name: 'Beans',
    plantingMonths: ['Mar', 'Apr', 'Sep', 'Oct'],
    harvestMonths: ['Jun', 'Jul', 'Dec', 'Jan'],
    duration: '60-90 days',
    tips: 'Fast-growing crop. Plant in warm soil with moderate water.',
  },
  {
    name: 'Cabbage',
    plantingMonths: ['Feb', 'Mar', 'Aug', 'Sep'],
    harvestMonths: ['May', 'Jun', 'Nov', 'Dec'],
    duration: '80-100 days',
    tips: 'Prefers cool weather. Needs consistent moisture.',
  },
  {
    name: 'Carrots',
    plantingMonths: ['Jan', 'Feb', 'Jul', 'Aug'],
    harvestMonths: ['Apr', 'May', 'Oct', 'Nov'],
    duration: '70-80 days',
    tips: 'Needs loose, well-drained soil. Thin seedlings early.',
  },
  {
    name: 'Potatoes',
    plantingMonths: ['Feb', 'Mar', 'Aug', 'Sep'],
    harvestMonths: ['Jun', 'Jul', 'Dec', 'Jan'],
    duration: '90-120 days',
    tips: 'Plant in cool weather. Hill soil around plants as they grow.',
  },
];

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export default function CropCalendarPage() {
  const [selectedMonth, setSelectedMonth] = useState(new Date().toLocaleString('default', { month: 'short' }));
  const [reminders, setReminders] = useState<string[]>([]);

  const cropsToPlant = crops.filter((crop) => crop.plantingMonths.includes(selectedMonth));
  const cropsToHarvest = crops.filter((crop) => crop.harvestMonths.includes(selectedMonth));

  const toggleReminder = (cropName: string) => {
    if (reminders.includes(cropName)) {
      setReminders(reminders.filter((name) => name !== cropName));
    } else {
      setReminders([...reminders, cropName]);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center gap-3 mb-2">
        <Calendar className="text-orange-600" size={32} />
        <h1 className="text-3xl font-bold">Crop Planting Calendar</h1>
      </div>
      <p className="text-gray-600 mb-8">Plan your planting and harvesting schedule</p>

      {/* Month Selector */}
      <div className="grid grid-cols-6 md:grid-cols-12 gap-2 mb-8">
        {months.map((month) => (
          <button
            key={month}
            onClick={() => setSelectedMonth(month)}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              selectedMonth === month
                ? 'bg-orange-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {month}
          </button>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Planting Section */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center gap-2 mb-4">
            <Sprout className="text-orange-600" size={24} />
            <h2 className="text-xl font-semibold">Plant in {selectedMonth}</h2>
          </div>
          {cropsToPlant.length > 0 ? (
            <div className="space-y-4">
              {cropsToPlant.map((crop) => (
                <div key={crop.name} className="border-l-4 border-orange-500 pl-4 py-2">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-lg">{crop.name}</h3>
                    <button
                      onClick={() => toggleReminder(crop.name)}
                      className={`p-1 rounded ${
                        reminders.includes(crop.name)
                          ? 'text-yellow-500'
                          : 'text-gray-400 hover:text-yellow-500'
                      }`}
                      title="Set reminder"
                    >
                      <Bell size={20} fill={reminders.includes(crop.name) ? 'currentColor' : 'none'} />
                    </button>
                  </div>
                  <p className="text-sm text-gray-600 mb-1">Duration: {crop.duration}</p>
                  <p className="text-sm text-gray-700">{crop.tips}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No crops recommended for planting this month</p>
          )}
        </div>

        {/* Harvesting Section */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-2xl">🌾</span>
            <h2 className="text-xl font-semibold">Harvest in {selectedMonth}</h2>
          </div>
          {cropsToHarvest.length > 0 ? (
            <div className="space-y-4">
              {cropsToHarvest.map((crop) => (
                <div key={crop.name} className="border-l-4 border-yellow-500 pl-4 py-2">
                  <h3 className="font-semibold text-lg mb-1">{crop.name}</h3>
                  <p className="text-sm text-gray-600">
                    Planted in: {crop.plantingMonths.join(', ')}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No crops ready for harvest this month</p>
          )}
        </div>
      </div>

      {/* Active Reminders */}
      {reminders.length > 0 && (
        <div className="mt-8 bg-yellow-50 p-6 rounded-lg">
          <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
            <Bell className="text-yellow-600" size={20} />
            Active Reminders ({reminders.length})
          </h3>
          <div className="flex flex-wrap gap-2">
            {reminders.map((cropName) => (
              <span
                key={cropName}
                className="bg-yellow-200 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium"
              >
                {cropName}
              </span>
            ))}
          </div>
          <p className="text-sm text-gray-600 mt-3">
            💡 Tip: Enable browser notifications to get alerts when it&apos;s time to plant!
          </p>
        </div>
      )}

      {/* Full Year Overview */}
      <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Year-Round Planting Guide</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2 px-4">Crop</th>
                {months.map((month) => (
                  <th key={month} className="text-center py-2 px-2">{month}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {crops.map((crop) => (
                <tr key={crop.name} className="border-b hover:bg-gray-50">
                  <td className="py-2 px-4 font-medium">{crop.name}</td>
                  {months.map((month) => (
                    <td key={month} className="text-center py-2 px-2">
                      {crop.plantingMonths.includes(month) && (
                        <span className="inline-block w-3 h-3 bg-orange-500 rounded-full" title="Plant"></span>
                      )}
                      {crop.harvestMonths.includes(month) && (
                        <span className="inline-block w-3 h-3 bg-yellow-500 rounded-full ml-1" title="Harvest"></span>
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex gap-4 mt-4 text-sm">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 bg-orange-500 rounded-full"></span>
            <span>Planting</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 bg-yellow-500 rounded-full"></span>
            <span>Harvesting</span>
          </div>
        </div>
      </div>
    </div>
  );
}

