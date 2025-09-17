import { MetricCard } from "@/components/MetricCard";
import { HighChartCard } from "@/components/HighChartCard";
import { HistoryForecastChart } from "@/components/HistoryForecastChart";
import { FilterSection, ProductHierarchyItem } from "@/components/FilterSection";
import { LocationHierarchyItem } from "@/components/LocationFilterDialog";
import { CustomerItem } from "@/components/CustomerFilterDialog";
import {
  Package,
  Truck,
  Clock,
  AlertTriangle,
  TrendingUp,
  ShoppingCart,
  Users,
  DollarSign,
} from "lucide-react";

// Sample data for the dashboard
const inventoryData = [
  { name: "Jan", value: 400000 },
  { name: "Feb", value: 300000 },
  { name: "Mar", value: 200000 },
  { name: "Apr", value: 278000 },
  { name: "May", value: 189000 },
  { name: "Jun", value: 239000 },
  { name: "Jul", value: 349000 },
];

const orderData = [
  { name: "Week 1", value: 120 },
  { name: "Week 2", value: 98 },
  { name: "Week 3", value: 86 },
  { name: "Week 4", value: 99 },
  { name: "Week 5", value: 85 },
  { name: "Week 6", value: 65 },
];

const performanceData = [
  { name: "Q1", value: 85 },
  { name: "Q2", value: 92 },
  { name: "Q3", value: 88 },
  { name: "Q4", value: 95 },
];

const Index = () => {
  const handleProductFilterChange = (selection: ProductHierarchyItem | null) => {
    console.log('Product filter changed:', selection);
    // TODO: Apply filter to dashboard data
  };

  const handleLocationFilterChange = (location: LocationHierarchyItem | null) => {
    console.log('Location filter changed:', location);
    // Handle location filter changes for dashboard data
  };

  const handleCustomerFilterChange = (customer: CustomerItem | null) => {
    console.log('Customer filter changed:', customer);
    // Handle customer filter changes for dashboard data
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Supply Chain Dashboard</h1>
          <p className="text-muted-foreground">
            Monitor your supply chain performance and key metrics
          </p>
        </div>
        <div className="text-sm text-muted-foreground">
          Last updated: {new Date().toLocaleDateString()}
        </div>
      </div>

      {/* Filters Section */}
        <FilterSection 
          onProductFilterChange={handleProductFilterChange}
          onLocationFilterChange={handleLocationFilterChange}
          onCustomerFilterChange={handleCustomerFilterChange}
        />

      {/* Key Metrics Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="Total Inventory Value"
          value="$2.4M"
          change={12.5}
          changeLabel="vs last month"
          icon={Package}
          variant="success"
          subtitle="Across all locations"
        />
        <MetricCard
          title="Active Orders"
          value="1,284"
          change={-3.2}
          changeLabel="vs last week"
          icon={ShoppingCart}
          variant="warning"
          subtitle="In processing"
        />
        <MetricCard
          title="On-Time Delivery"
          value="94.2%"
          change={2.1}
          changeLabel="vs last month"
          icon={Truck}
          variant="success"
          subtitle="Performance rate"
        />
        <MetricCard
          title="Critical Alerts"
          value="7"
          change={-15.8}
          changeLabel="vs yesterday"
          icon={AlertTriangle}
          variant="destructive"
          subtitle="Require attention"
        />
      </div>



     
    </div>
  );
};

export default Index;
