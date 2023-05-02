import React, { useMemo } from "react";
import MaterialReactTable from "material-react-table";
import { useDispatch, useSelector } from 'react-redux';
import { Box, IconButton, Button } from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material';

const UtilityTable = (props) => {
  //should be memoized or stable
  const columns = props.columns;
  const data = props.data;

  return <MaterialReactTable
    columns={columns}
    data={data}
    enableFullScreenToggle={false}
    enableColumnResizing
    enableColumnOrdering
    enablePinning
    enableColumnFilters={false}
    enableDensityToggle={false}
    enableStickyHeader
    initialState={{ showGlobalFilter: true, density: 'compact' }}
    muiTableContainerProps={{ sx: { maxHeight: '400px' } }}
  />;
};

export default UtilityTable;
