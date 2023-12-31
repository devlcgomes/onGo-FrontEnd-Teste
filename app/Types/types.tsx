export interface Customer {
  id?: string;
  name: string;
  idDocument: string;
}

export interface Product {
  id?: string;
  name: string;
}

export interface CustomModalProps {
  onCancel: () => void;
  onSave?: (customerId: string) => void;
  customers?: string[];
  onSelectCustomer?: (selectedCustomerId: string) => void;
}

export interface Inventory {
  inventoryId: string;
  customerId: string;
  customerName: string;
  inventory: Array<{
    id: string;
    name: string;
  }>;
}
