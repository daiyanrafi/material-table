// interfaces/TableState.tsx
interface TableState {
    items: {
      id: number;
      column1: string;
      column2: string;
      column3: string;
      status: string;
    }[];
    newItem: {
      column1: string;
      column2: string;
      column3: string;
      status: string;
    };
    warning: string;
  }
  
  export default TableState;
  