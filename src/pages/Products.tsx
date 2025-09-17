import { useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import { ColDef } from "ag-grid-community";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

interface Product {
  product_id: string;
  product_name: string;
  category_id: string;
  category_name: string;
  subcategory_id: string;
  subcategory_name: string;
  class_id?: string;
  class_name?: string;
  subclass_id?: string;
  subclass_name?: string;
}

export default function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const columnDefs: ColDef[] = [
    {
      field: "product_id",
      headerName: "Product ID",
      width: 120,
      pinned: "left",
    },
    {
      field: "product_name", 
      headerName: "Product Name",
      width: 200,
      pinned: "left",
    },
    {
      field: "category_name",
      headerName: "Category",
      width: 150,
    },
    {
      field: "subcategory_name",
      headerName: "Subcategory", 
      width: 150,
    },
    {
      field: "class_name",
      headerName: "Class",
      width: 120,
    },
    {
      field: "subclass_name",
      headerName: "Subclass",
      width: 120,
    },
    {
      field: "category_id",
      headerName: "Category ID",
      width: 120,
    },
    {
      field: "subcategory_id", 
      headerName: "Subcategory ID",
      width: 140,
    },
  ];

  const defaultColDef: ColDef = {
    sortable: true,
    filter: true,
    resizable: true,
  };

  const fetchProducts = async () => {
    try {
      setLoading(true);
      
      const { data, error } = await supabase.rpc('get_products_hierarchy');
      
      if (error) throw error;
      
      setProducts(data || []);
    } catch (error: any) {
      console.error('Error fetching products:', error);
      toast.error('Error loading products: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Products Catalog</h1>
        <p className="text-muted-foreground">
          Complete catalog of products with hierarchy information
        </p>
      </div>

      <div className="border rounded-lg overflow-hidden bg-card">
        <div 
          className="ag-theme-alpine h-[600px] w-full"
          style={{
            '--ag-foreground-color': 'hsl(var(--foreground))',
            '--ag-background-color': 'hsl(var(--background))',
            '--ag-header-foreground-color': 'hsl(var(--foreground))',
            '--ag-header-background-color': 'hsl(var(--muted))',
            '--ag-odd-row-background-color': 'hsl(var(--muted) / 0.5)',
            '--ag-border-color': 'hsl(var(--border))',
          } as React.CSSProperties}
        >
          <AgGridReact
            rowData={products}
            columnDefs={columnDefs}
            defaultColDef={defaultColDef}
            pagination={true}
            paginationPageSize={50}
            animateRows={true}
            enableCellTextSelection={true}
            rowSelection="multiple"
          />
        </div>
      </div>

      <div className="text-sm text-muted-foreground">
        Total products: {products.length}
      </div>
    </div>
  );
}