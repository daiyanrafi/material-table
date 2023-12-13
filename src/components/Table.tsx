// components/Table.tsx
import React from 'react';
import { Table as MuiTable, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

interface Props {
  items: {
    id: number;
    column1: string;
    column2: string;
    column3: string;
    status: string;
  }[];
  columns: { id: string; label: string; minWidth: number; align?: 'left' | 'right' | 'center' }[];
}

const Table: React.FC<Props> = ({ items, columns }) => {
  return (
    <TableContainer component={Paper}>
      <MuiTable>
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <TableCell key={column.id} align={column.align || 'left'} style={{ minWidth: column.minWidth }}>
                {column.label}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {items.map((row) => (
            <TableRow key={row.id}>
              {columns.map((column) => (
                <TableCell key={column.id} align={column.align || 'left'}>
                  {column.id === 'status' ? (
                    <span style={{ color: getStatusColor(row[column.id] as string) }}>{row[column.id]}</span>
                  ) : (
                    row[column.id]
                  )}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </MuiTable>
    </TableContainer>
  );
};

const getStatusColor = (status: string): string => {
  switch (status) {
    case 'current':
      return 'red';
    case 'pending':
      return 'yellow';
    case 'hold-on':
      return 'pink';
    default:
      return 'black';
  }
};

export default Table;
