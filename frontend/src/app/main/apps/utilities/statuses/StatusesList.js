import MaterialReactTable from "material-react-table";
import React, { useEffect, useState } from 'react';
import { Box, IconButton, Button } from '@mui/material';
import {
	Edit as EditIcon,
	Delete as DeleteIcon,
} from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { openEditStatusDialog, removeStatus, selectStatuses, removeStatuses, openNewStatusDialog } from './store/statusesSlice';

function StatusesList(props) {
	const dispatch = useDispatch();
	const data = useSelector(selectStatuses);
	const [isLoading, setIsLoding] = useState(true)	
	const columns = React.useMemo(
		() => [
			{
				header: '#',
				accessorKey: 'id',
			},
			{
				header: 'Name',
				accessorKey: 'name',
			},
			{
				header: 'Color',
				accessorKey: 'color',
			},
			{
				header: 'Status Type',
				accessorKey: 'status_type',
			}
		],
		[]
	);

	useEffect(() => {
		setIsLoding(false)
	}, [data])

	return (
		<div className="flex flex-1 flex-col justify-center">
			<MaterialReactTable
				columns={columns}
				data={data}
				enableFullScreenToggle={false}
				enableColumnResizing
				enableColumnOrdering
				enablePinning
				enableRowSelection
				enableRowActions
				enableStickyHeader
				// initialState={{ showGlobalFilter: true }}
				// muiTableContainerProps={{ sx: { maxHeight: '400px' } }}
				state={{ isLoading: isLoading }}
				renderRowActions={({ row, table }) => (
					<Box sx={{ display: 'flex', flexWrap: 'nowrap', gap: '8px' }}>
						<IconButton
							color="textSecondary"
							onClick={(ev) => {
								ev.stopPropagation();
								dispatch(openEditStatusDialog(row.original));
							}}
						>
							<EditIcon />
						</IconButton>
						<IconButton
							color="error"
							onClick={(ev) => {
								ev.stopPropagation();
								dispatch(removeStatus(row.original.id));
							}}
						>
							<DeleteIcon />
						</IconButton>
					</Box>
				)}
				positionToolbarAlertBanner="bottom" //show selected rows count on bottom toolbar
				//add custom action buttons to top-left of top toolbar
				renderTopToolbarCustomActions={({ table }) => (
					<Box sx={{ display: 'flex', gap: '1rem', p: '4px' }}>
						<Button
							color="primary"
							onClick={(ev) => {
								ev.stopPropagation();
								dispatch(openNewStatusDialog());
							}}
							variant="contained"
						>
							Create
						</Button>
						<Button
							color="error"
							disabled={!table.getIsSomeRowsSelected()}
							onClick={() => {
								const ids = table.getSelectedRowModel().rows.map(row => row.original.id)
								console.info(ids)
								dispatch(removeStatuses(ids));
							}}
							variant="contained"
						>
							Delete Selected
						</Button>
					</Box>
				)}
			/>
		</div>
	);
}

export default StatusesList;
