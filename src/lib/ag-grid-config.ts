import { GridOptions } from 'ag-grid-community';

// Common AG Grid configuration
export const commonAgGridConfig: Partial<GridOptions> = {
  defaultColDef: {
    sortable: true,
    filter: true,
    resizable: true
  },
  animateRows: true,
  headerHeight: 40,
  rowHeight: 30,
  
  pagination: true,
  paginationPageSize: 10,
  paginationPageSizeSelector: [5, 10, 20, 50],
  statusBar: {
    statusPanels: [
      { statusPanel: 'agFilteredRowCountComponent', align: 'left' },
      { statusPanel: 'agSelectedRowCountComponent', align: 'left' },
      { statusPanel: 'agAggregationComponent', align: 'right' }
    ]
  }
};

// Configuration for pivot tables (no pagination)
export const pivotTableConfig: Partial<GridOptions> = {
  ...commonAgGridConfig,
  pagination: false,
  statusBar: {
    statusPanels: [
      { statusPanel: 'agTotalRowCountComponent', align: 'left' },
      { statusPanel: 'agFilteredRowCountComponent', align: 'left' },
      { statusPanel: 'agSelectedRowCountComponent', align: 'left' },
      { statusPanel: 'agAggregationComponent', align: 'right' }
    ]
  }
};

// Configure AG Grid - Community version only
export const configureAGGrid = () => {
  // Community version doesn't require license configuration
};

// Default grid options that match the application theme
export const defaultGridOptions = {
  pagination: true,
  paginationPageSize: 20,
  suppressMenuHide: true,
  enableCellTextSelection: true,
  ensureDomOrder: true,
  animateRows: true,
  rowSelection: 'single' as const,
  suppressRowClickSelection: true,
  enableRangeSelection: true,
  suppressCopyRowsToClipboard: false,
  enableCharts: false,
  enableRangeHandle: true,
  enableFillHandle: true,

  // ✅ Row classes: alternate rows + highlight on focus or selection
  getRowClass: (params: any) => {
    const classes = [];

    // Alternate row coloring
    if (params.node.rowIndex % 2 === 0) {
      classes.push('ag-row-even');
    } else {
      classes.push('ag-row-odd');
    }

    // Highlight if selected
    if (params.node.isSelected()) {
      classes.push('ag-row-selected');
    }

    // Highlight if focused (keyboard or click focus)
    if (
      params.api.getFocusedCell() &&
      params.api.getFocusedCell()!.rowIndex === params.node.rowIndex
    ) {
      classes.push('ag-row-focused');
    }

    return classes;
  },

  defaultColDef: {
    sortable: true,
    filter: true,
    resizable: true,
    floatingFilter: false,
    suppressMenu: false,
  },
  onCellFocused: (params: any) => {
    params.api.refreshCells({ force: true });
  }
};

// Common container styles
export const agGridContainerStyles = "h-[600px] border border-gray-200 rounded-lg shadow-lg";



