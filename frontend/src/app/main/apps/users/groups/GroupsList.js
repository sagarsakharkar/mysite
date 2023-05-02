import MaterialReactTable, {
	MRT_ShowHideColumnsButton,
	MRT_ToggleDensePaddingButton,
	MRT_ToggleFiltersButton,
	MRT_ToggleGlobalFilterButton

} from "material-react-table";
import React, { useEffect, useState } from 'react';
import { Box, IconButton, Button } from '@mui/material';
import Icon from '@mui/material/Icon';
import format from 'date-fns/format';
import { ExportToCsv } from 'export-to-csv';
import {
	Edit as EditIcon,
	Delete as DeleteIcon,
} from '@mui/icons-material';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { useDispatch, useSelector } from 'react-redux';
import { openEditGroupDialog, removeGroup, selectGroups, removeGroups, openNewGroupDialog } from './store/groupsSlice';

function GroupsList(props) {
	const dispatch = useDispatch();
	const data = useSelector(selectGroups);
	const roleData = useSelector(({ groupsApp }) => groupsApp.roles.entities) || {}
	const roles = roleData && Object.values(roleData).map(row => row.name) || []
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
				header: 'Restricted Group',
				accessorKey: 'name',
				Cell: ({ cell }) => (
					<span>{roles && roles.includes(cell.getValue()) ? 'True' : 'False'}</span>
				)
			},
		],
		[roles]
	);

	useEffect(() => {
		setIsLoding(false)
	}, [data])

	const csvOptions = {
		fieldSeparator: ',',
		quoteStrings: '"',
		decimalSeparator: '.',
		showLabels: true,
		useBom: true,
		useKeysAsHeaders: false,
		headers: columns.map((c) => c.header),
	};

	const csvExporter = new ExportToCsv(csvOptions);

	const handleExportRows = (rows) => {
		csvExporter.generateCsv(data);
	};

	return (
		<div className="flex flex-1 flex-col justify-center">
			<MaterialReactTable
				columns={columns}
				data={data}
				enableFullScreenToggle={false}
				enableColumnResizing
				enableColumnOrdering
				enablePinning
				// enableRowSelection
				enableRowActions
				enableStickyheader
				initialState={{ density: 'compact' }}
				// muiTableContainerProps={{ sx: { maxHeight: '400px' } }}
				state={{ isLoading: isLoading }}
				displayColumnDefOptions={{
					'mrt-row-actions': {
						header: 'Actions', //change header text
						size: 100, //make actions column wider
					},
				}}
				renderRowActions={({ row, table }) => (
					<Box sx={{ display: 'flex', flexWrap: 'nowrap', gap: '8px' }}>
						{roles && roles.includes(row.original.name) ?
							'Resticted Group'
							: <>
								<IconButton
									color="textSecondary"
									onClick={(ev) => {
										ev.stopPropagation();
										dispatch(openEditGroupDialog(row.original));
									}}
								>
									<EditIcon />
								</IconButton>
								<IconButton
									color="error"
									onClick={(ev) => {
										ev.stopPropagation();
										dispatch(removeGroup(row.original.id));
									}}
								>
									<DeleteIcon />
								</IconButton>
							</>
						}
					</Box>
				)}

				positionToolbarAlertBanner="bottom" //show selected rows count on bottom groupbar				
				//add custom action buttons to top-left of top groupbar
				renderTopToolbarCustomActions={({ table }) => (
					<Box sx={{ display: 'flex', gap: '1rem', p: '4px' }}>
						<Button
							color="primary"
							onClick={(ev) => {
								ev.stopPropagation();
								dispatch(openNewGroupDialog());
							}}
							variant="contained"
						>
							Create
						</Button>
						{/* <Button
							color="error"
							disabled={!table.getIsSomeRowsSelected()}
							onClick={() => {
								const ids = table.getSelectedRowModel().rows.map(row => row.original.id)
								console.info(ids)
								dispatch(removeGroups(ids));
							}}
							variant="contained"
						>
							Delete Selected
						</Button> */}
					</Box>
				)}
				//customize built-in buttons in the top-right of top toolbar
				renderToolbarInternalActions={({ table }) => (
					<Box>

						{/* along-side built-in buttons in whatever order you want them */}
						<MRT_ToggleGlobalFilterButton table={table} />
						<MRT_ToggleFiltersButton table={table} />
						<MRT_ShowHideColumnsButton table={table} />
						{/* <MRT_ToggleDensePaddingButton table={table} /> */}
						{/* add custom button to print table  */}
						<IconButton
							disabled={table.getPrePaginationRowModel().rows.length === 0}
							//export all rows, including from the next page, (still respects filtering and sorting)
							onClick={() =>
								handleExportRows(table.getPrePaginationRowModel().rows)
							}
						>
							<FileDownloadIcon />
						</IconButton>
					</Box>
				)}
			/>
		</div>
	);
}

export default GroupsList;
