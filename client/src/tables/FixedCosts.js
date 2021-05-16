export const headCells = [
  { id: 'name', numeric: false, disablePadding: true, label: 'Fixed Cost Items' },
  { id: 'description', numeric: true, disablePadding: false, label: 'Description' },
  { id: 'total', numeric: true, disablePadding: false, label: 'Total $ Amount' },
];

export function createData(name, description, total) {
  return { name, description, total };
}

export const rows = [
  createData('Cupcake', 305, 3.7),
  createData('Donut', 452, 25.0),
  createData('Eclair', 262, 16.0),
];