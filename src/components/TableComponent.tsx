// components/TableComponent.tsx
import React from 'react';
import { TextField, Button, MenuItem, Select, FormControl, InputLabel, Grid } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Table } from './Table';
import TableState from '../interfaces/TableState';

const useStyles = makeStyles((theme) => ({
  formContainer: {
    margin: theme.spacing(2),
  },
  warning: {
    color: 'red',
  },
}));

const TableComponent: React.FC = () => {
  const classes = useStyles();

  const [state, setState] = React.useState<TableState>({
    items: [],
    newItem: {
      column1: '',
      column2: '',
      column3: '',
      status: '',
    },
    warning: '',
  });

  const columns = [
    { id: 'id', label: 'ID', minWidth: 50, align: 'center' },
    { id: 'column1', label: 'Name', minWidth: 100 },
    { id: 'column2', label: 'Address', minWidth: 100 },
    { id: 'column3', label: 'University', minWidth: 100 },
    { id: 'status', label: 'Status', minWidth: 100 },
  ];

  const addItem = () => {
    if (!state.newItem.column1 || !state.newItem.column2 || !state.newItem.column3) {
      setState((prev) => ({ ...prev, warning: 'Please fill in all the input boxes before adding an item.' }));
      return;
    }

    const newItemCopy = {
      id: state.items.length + 1,
      ...state.newItem,
    };

    setState((prev) => ({
      items: [...prev.items, newItemCopy],
      newItem: { column1: '', column2: '', column3: '', status: 'current' },
      warning: '',
    }));
  };

  const onInputChange = (columnName: keyof typeof state.newItem) => (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setState((prev) => ({ ...prev, newItem: { ...prev.newItem, [columnName]: event.target.value } }));
  };

//   const onStatusChange = (event: React.ChangeEvent<{ value: unknown }>) => {
//     setState((prev) => ({ ...prev, newItem: { ...prev.newItem, status: event.target.value as string } }));
//   };

// Change the type of 'event' parameter
// const onStatusChange = (event: React.ChangeEvent<{ value: unknown }>) => {
//     setState((prev) => ({ ...prev, newItem: { ...prev.newItem, status: event.target.value as string } }));
//   };

const onStatusChange = (event: any) => {
    setState((prev) => ({ ...prev, newItem: { ...prev.newItem, status: event.target.value as string } }));
  };
  
  

  return (
    <Grid container direction="column" alignItems="center" className={classes.formContainer}>
      <TextField label="Name" placeholder="Enter Your Name" value={state.newItem.column1} onChange={onInputChange('column1')} />
      <TextField label="Address" placeholder="Enter Your Address" value={state.newItem.column2} onChange={onInputChange('column2')} />
      <TextField label="University" placeholder="Enter Your University" value={state.newItem.column3} onChange={onInputChange('column3')} />

      <FormControl>
        <InputLabel>Status</InputLabel>
        <Select value={state.newItem.status} onChange={onStatusChange}>
          <MenuItem value="current">Current</MenuItem>
          <MenuItem value="pending">Pending</MenuItem>
          <MenuItem value="hold-on">Hold On</MenuItem>
        </Select>
      </FormControl>

      <Button variant="contained" color="primary" onClick={addItem}>
        Add Item
      </Button>

      {state.warning && <div className={classes.warning}>{state.warning}</div>}

      <Table items={state.items} columns={columns} />
    </Grid>
  );
};

export default TableComponent;
