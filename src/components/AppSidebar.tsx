import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarHeader } from "@/components/ui/sidebar";
import { Target, TrendingUp, Users, Home, Settings, Database, BarChart3, Package, ShoppingCart, ChartScatter, FileText, Calendar, Bell, Building2, Tag, UserPlus, Activity, Brain, Warehouse, Rocket, GitBranch, Network, TrendingDown, ArrowLeftRight, UserCheck, Factory, AlertTriangle, Truck, BellRing, Shield, ChevronDown, ChevronRight, Wrench } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { useUserRole } from "@/hooks/useUserRole";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
interface CompanyConfig {
  company_name: string;
  company_logo: string;
}
const items = [
  {
    title: "Análisis post game",
    url: "/kpi-dashboard",
    icon: Target
  },
  {
    title: "Demand Workbench",
    url: "/demand-workbench",
    icon: Wrench
  },
  {
  title: "Pronóstico de Demanda",
  url: "/demand-forecast",
  icon: TrendingUp
},
{
  title: "Análisis del plan comercial",
  url: "/commercial-collaboration",
  icon: Users
}, {
  title: "KAM - Plan comercial",
  url: "/forecast-collaboration",
  icon: Users
}

/*, {
  title: "Analítica",
  url: "/advanced-reports",
  icon: BarChart3
}*/];

// Fulfillment items
const fulfillmentItems = [
  , {
    title: "Red de Suministro",
    url: "/supply-network",
    icon: Network
  }, 
  
  
  {
    title: "Gestión de Compras",
    url: "/purchase-management",
    icon: ShoppingCart
  },  {
    title: "Análisis Sell-Through",
    url: "/sell-through-analytics",
    icon: TrendingDown
  },
  {
    title: "Análisis What-If",
    url: "/what-if-analysis",
    icon: Brain
  },
  {
    title: 'Revisión de Políticas de Inventario',
    url: '/inventory-policy-review',
    icon: Database
  },
  {
    title: 'Planificación de Suministro',
    url: '/replenishment-dashboard',
    icon: Package
  },
  {
    title: 'Configuración de Alertas',
    url: '/alert-configuration',
    icon: BellRing
  },
  {
    title: 'Alertas Activas',
    url: '/active-alerts',
    icon: AlertTriangle
  },
  {
    title: 'Dashboard de Excepciones',
    url: '/exception-dashboard',
    icon: Shield
  },
  {
    title: 'Parámetros de Órdenes de Compra',
    url: '/purchase-order-parameters',
    icon: Settings
  }
];

/*
// NPI items
const npiItems = [{
  title: "NPI Dashboard",
  url: "/npi-dashboard",
  icon: Rocket
}, {
  title: "NPI Milestones",
  url: "/npi-milestones",
  icon: Target
}, {
  title: "NPI Scenarios",
  url: "/npi-scenarios",
  icon: GitBranch
}, {
  title: "NPI Analytics",
  url: "/npi-analytics",
  icon: BarChart3
}];
*/
// Admin-only items
const adminItems = [{
  title: "Productos",
  url: "/products-catalog",
  icon: Tag
}, {
  title: "Ventas",
  url: "/historydataview",
  icon: ChartScatter
},{
  title: "Clientes",
  url: "/customers-catalog",
  icon: Users
}, {
  title: "Inventarios",
  url: "/inventory-catalog",
  icon: Package
}, {
  title: "Cedis",
  url: "/locations-catalog",
  icon: Building2
}, {
  title: "Red",
  url: "/red",
  icon: Network
}, {
  title: "Gestión de Usuarios",
  url: "/user-management",
  icon: UserPlus
}, {
  title: "Roles de Usuario",
  url: "/user-roles",
  icon: UserPlus
}, {
  title: "Asignaciones de Usuario",
  url: "/user-assignments",
  icon: UserCheck
} ,{
  title: "Configuración de la Compañía",
  url: "/company-config",
  icon: Building2
}];
export function AppSidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const {
    isAdministrator,
    loading
  } = useUserRole();
  const [companyConfig, setCompanyConfig] = useState<CompanyConfig | null>(null);
  const [collapsedSections, setCollapsedSections] = useState({
    planificacion: false,
    fulfillment: false,
    administracion: false
  });
  const allItems = isAdministrator ? [...items, ...adminItems] : items;

  const toggleSection = (section: keyof typeof collapsedSections) => {
    setCollapsedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };
  useEffect(() => {
    const fetchCompanyConfig = async () => {
      try {
        const {
          data,
          error
        } = await supabase
        .schema('m8_schema' as any)
        .from('company_config' as any).select('company_name, company_logo').limit(1).single();
        if (error) {
          console.error('Error fetching company config:', error);
          return;
        }
        if (data) {
          setCompanyConfig(data);
        }
      } catch (error) {
        console.error('Error fetching company config:', error);
      }
    };
    fetchCompanyConfig();
  }, []);
  if (loading) {
    return <Sidebar className="border-r border-gray-200 bg-white">
        <SidebarHeader className="border-b border-gray-200" style={{
        backgroundColor: '#f3f4f6'
      }}>
          <div className="flex items-center gap-2 px-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-white font-semibold text-sm">
              M8
            </div>
            <span className="font-semibold text-gray-900">Platform</span>
          </div>
        </SidebarHeader>
        <SidebarContent className="bg-white">
          <div className="p-4">Cargando...</div>
        </SidebarContent>
      </Sidebar>;
  }
  return <Sidebar className="border-r border-gray-200 bg-white">
      <SidebarHeader className="border-b border-gray-200" style={{
      backgroundColor: '#f3f4f6'
    }}>
        <div className="flex items-center gap-2 px-2">
          {companyConfig?.company_logo ? <img src={companyConfig.company_logo} alt={companyConfig.company_name || 'Company Logo'} onError={e => {
          console.error('Error loading company logo:', companyConfig.company_logo);
          e.currentTarget.style.display = 'none';
          // Show fallback
          const fallback = e.currentTarget.nextElementSibling as HTMLElement;
          if (fallback) fallback.style.display = 'flex';
        }} className="h-10w-10 object-contain rounded-lg" /> : <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-white font-semibold text-sm">
              M8
            </div>}
          <div className="hidden h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-white font-semibold text-sm">
            M8
          </div>
          
        </div>
      </SidebarHeader>
      <SidebarContent className="bg-white">
        <SidebarGroup>
          <div 
            className="flex items-center justify-between cursor-pointer hover:bg-gray-50 px-2 py-1 rounded-md "
            onClick={() => toggleSection('planificacion')}
          >
            <SidebarGroupLabel className="text-gray-600 font-semibold font-medium">
              Planificación
            </SidebarGroupLabel>
            {collapsedSections.planificacion ? (
              <ChevronRight className="h-4 w-4 text-gray-500" />
            ) : (
              <ChevronDown className="h-4 w-4 text-gray-500" />
            )}
          </div>
          {!collapsedSections.planificacion && (
            <SidebarGroupContent>
              <SidebarMenu>
                {items.map(item => <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton onClick={() => navigate(item.url)} isActive={location.pathname === item.url} className="w-full justify-start text-gray-700 hover:text-gray-900 hover:bg-gray-100 data-[active=true]:bg-blue-50 data-[active=true]:text-blue-900 data-[active=true]:border-r-2 data-[active=true]:border-blue-600">
                      <item.icon className="h-4 w-4" />
                      <span className="font-medium">{item.title}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>)}
              </SidebarMenu>
            </SidebarGroupContent>
          )}
        </SidebarGroup>

        <SidebarGroup>
          <div 
            className="flex items-center justify-between cursor-pointer hover:bg-gray-50 px-2 py-1 rounded-md"
            onClick={() => toggleSection('fulfillment')}
          >
            <SidebarGroupLabel className="text-gray-600 font-semibold">
              Fulfillment
            </SidebarGroupLabel>
            {collapsedSections.fulfillment ? (
              <ChevronRight className="h-4 w-4 text-gray-500" />
            ) : (
              <ChevronDown className="h-4 w-4 text-gray-500" />
            )}
          </div>
          {!collapsedSections.fulfillment && (
            <SidebarGroupContent>
              <SidebarMenu>
                {fulfillmentItems.map(item => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton 
                      onClick={() => navigate(item.url)} 
                      isActive={location.pathname === item.url} 
                      className="w-full justify-start text-gray-700 hover:text-gray-900 hover:bg-green-100 data-[active=true]:bg-green-100 data-[active=true]:text-green-900 data-[active=true]:border-r-2 data-[active=true]:border-green-600"
                    >
                      <item.icon className="h-4 w-4" />
                      <span className="font-medium">{item.title}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          )}
        </SidebarGroup>

        {isAdministrator && <SidebarGroup>
            <div 
              className="flex items-center justify-between cursor-pointer hover:bg-gray-50 px-2 py-1 rounded-md"
              onClick={() => toggleSection('administracion')}
            >
              <SidebarGroupLabel className="text-gray-600 font-semibold">
                Administración
              </SidebarGroupLabel>
              {collapsedSections.administracion ? (
                <ChevronRight className="h-4 w-4 text-gray-500" />
              ) : (
                <ChevronDown className="h-4 w-4 text-gray-500" />
              )}
            </div>
            {!collapsedSections.administracion && (
              <SidebarGroupContent>
                <SidebarMenu>
                  {adminItems.map(item => <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton onClick={() => navigate(item.url)} isActive={location.pathname === item.url} className="w-full justify-start text-gray-700 hover:text-gray-900 hover:bg-orange-100 data-[active=true]:bg-orange-100 data-[active=true]:text-orange-900 data-[active=true]:border-r-2 data-[active=true]:border-orange-600">
                        <item.icon className="h-4 w-4" />
                        <span className="font-medium">{item.title}</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>)}
                </SidebarMenu>
              </SidebarGroupContent>
            )}
          </SidebarGroup>}
      </SidebarContent>
    </Sidebar>;
}
