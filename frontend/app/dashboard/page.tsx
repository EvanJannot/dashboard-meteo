import LineChartComponent from '@/components/charts/LineChart';
import BarChartComponent from '@/components/charts/BarChart';
import PieChartComponent from '@/components/charts/PieChart';

export default function DashboardPage() {
  return (
    <div className="p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <div className="shadow-lg rounded-lg bg-white p-4">
        <h2 className="text-xl font-bold mb-4">Sales Over Time</h2>
        <LineChartComponent />
      </div>
      <div className="shadow-lg rounded-lg bg-white p-4">
        <h2 className="text-xl font-bold mb-4">Revenue by Month</h2>
        <BarChartComponent />
      </div>
      <div className="shadow-lg rounded-lg bg-white p-4">
        <h2 className="text-xl font-bold mb-4">Customer Segments</h2>
        <PieChartComponent />
      </div>
    </div>
  );
}
