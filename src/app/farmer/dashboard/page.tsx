
"use client";

import { FiFilter } from "react-icons/fi";
import { FaChartLine, FaMoneyBillWave, FaClipboardList } from "react-icons/fa";
import {BarChart,Bar,XAxis,YAxis,Tooltip,ResponsiveContainer,LineChart,Line,CartesianGrid,PieChart,Pie,Cell} from "recharts";
//  Dummy data 
const topProducts = [
  { name: "Maize", value: 120 },
  { name: "Beans", value: 98 },
  { name: "Tomatoes", value: 75 },
  { name: "Onions", value: 60 },
  { name: "Carrots", value: 45 },
];

const productsSoldData = [
  { name: "Maize", sold: 1200 },
  { name: "Beans", sold: 980 },
  { name: "Tomatoes", sold: 750 },
  { name: "Onions", sold: 600 },
  { name: "Carrots", sold: 450 },
];

const salesTrendData = [
  { month: "Jan", sales: 100 },
  { month: "Feb", sales: 200 },
  { month: "Mar", sales: 150 },
  { month: "Apr", sales: 250 },
  { month: "May", sales: 180 },
];

const ratingsData = [
  { name: "Excellent", value: 400 },
  { name: "Good", value: 300 },
  { name: "Average", value: 200 },
  { name: "Poor", value: 100 },
];

const COLORS = ["#00C49F", "#0088FE", "#FFBB28", "#FF8042"];
export default function FarmerDashboardContent() {
  return (
    <>
{/* Dashboard Title + Filter */}
       <section className="flex justify-between items-center px-6 py-4 bg-white shadow-sm w-full max-w-screen-xl mx-auto">
  <h2 className="text-xl font-semibold text-gray-800">
    Farmer Dashboard
  </h2>
  <button className="flex items-center gap-1 px-4 py-2 bg-gray-200 text-gray-800 rounded-md shadow hover:bg-gray-300">
  This week <FiFilter className="ml-1" />
</button>

</section>
      {/*  Stat Cards Section with icons */}
      <section className="flex flex-wrap gap-4 px-6 py-2 bg-white max-w-screen-xl mx-auto">
        {[
          { label: "Total products", value: "4537", icon: null },
          { label: "Revenue", value: "$657", icon: <FaChartLine /> },
          { label: "Profit margin", value: "56%", icon: <FaMoneyBillWave /> },
          { label: "Orders", value: "764", icon: <FaClipboardList /> },
        ].map((stat, i) => (
          <div
            key={i}
            className="bg-gray-200 rounded-md shadow p-4 w-48"
          >
            <p className="text-sm font-semibold mb-1 flex items-center gap-1">
              {stat.icon} {stat.label}
            </p>
            <p className="text-xl font-bold">{stat.value}</p>
          </div>
        ))}
      </section>
      <section className="px-6 pb-4 pt-6 flex flex-col gap-4 max-w-screen-xl mx-auto">
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    {/*  Top Selling Products */}
    <div className="bg-white p-2 rounded-md shadow">
      <h3 className="text-sm font-semibold text-gray-800 mb-2">
        Top Selling Products
      </h3>
      <div className="h-[120px]">
        <ResponsiveContainer width="103%" height="103%">
          <BarChart data={topProducts}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#4ade80" /> 
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>

    {/*  Products Sold */}
    <div className="bg-white p-2 rounded-md shadow">
      <h3 className="text-sm font-semibold text-gray-800 mb-2">
        Products Sold
      </h3>
      <div className="h-[120px]">
        <ResponsiveContainer width="103%" height="103%">
          <BarChart data={productsSoldData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="sold" fill="#f59e0b" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  </div>

  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    {/*  Sales Trend */}
    <div className="bg-white p-2 rounded-md shadow">
      <h3 className="text-sm font-semibold text-gray-800 mb-2">
        Sales Trend
      </h3>
      <div className="h-[120px]">
        <ResponsiveContainer width="103%" height="103%">
          <LineChart data={salesTrendData}>
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
            <Line
              type="monotone"
              dataKey="sales"
              stroke="#3b82f6"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>

    {/*  Customer Ratings */}
    <div className="bg-white p-2 rounded-md shadow">
      <h3 className="text-sm font-semibold text-gray-800 mb-2">
        Customer Ratings
      </h3>
      <div className="h-[200px]">
        <ResponsiveContainer width="103%" height="103%">
          <PieChart>
            <Pie
              data={ratingsData}
              cx="50%"
              cy="50%"
              outerRadius={70}  
              dataKey="value"
              label
            >
              {ratingsData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  </div>
</section>
{/*  Inventory Metrics Table */}
<section className="px-6 pb-6 max-w-screen-xl mx-auto">
  <div className="grid grid-cols-1 gap-4">
    <div className="bg-white rounded-md shadow w-full overflow-x-auto">
      <h3 className="text-sm font-semibold text-gray-800 px-4 py-3 border-b">
        Inventory Metrics
      </h3>
      <div className="w-full overflow-x-auto">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-4 py-2 font-medium text-gray-700">Product</th>
              <th className="px-4 py-2 font-medium text-gray-700">In Stock</th>
              <th className="px-4 py-2 font-medium text-gray-700">Sold</th>
              <th className="px-4 py-2 font-medium text-gray-700">Reorder Level</th>
              <th className="px-4 py-2 font-medium text-gray-700">Supplier</th>
              <th className="px-4 py-2 font-medium text-gray-700">Last Restock</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {[
              { product: "Maize", inStock: 500, sold: 1200, reorder: 200, supplier: "AgriCo", restock: "2024-06-10" },
              { product: "Beans", inStock: 300, sold: 980, reorder: 150, supplier: "Farmers Hub", restock: "2024-06-15" },
              { product: "Tomatoes", inStock: 200, sold: 750, reorder: 100, supplier: "FreshFields", restock: "2024-06-18" },
              { product: "Onions", inStock: 180, sold: 600, reorder: 80, supplier: "GreenMarket", restock: "2024-06-12" },
              { product: "Carrots", inStock: 150, sold: 450, reorder: 70, supplier: "VeggiePro", restock: "2024-06-14" },
              { product: "Cabbage", inStock: 220, sold: 500, reorder: 90, supplier: "AgriCo", restock: "2024-06-16" },
              { product: "Spinach", inStock: 140, sold: 350, reorder: 60, supplier: "GreenMarket", restock: "2024-06-17" },
            ].map((item, i) => (
              <tr key={i} className="hover:bg-gray-50">
                <td className="px-4 py-2">{item.product}</td>
                <td className="px-4 py-2">{item.inStock}</td>
                <td className="px-4 py-2">{item.sold}</td>
                <td className="px-4 py-2">{item.reorder}</td>
                <td className="px-4 py-2">{item.supplier}</td>
                <td className="px-4 py-2">{item.restock}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
</section>
    </>
  );
}

