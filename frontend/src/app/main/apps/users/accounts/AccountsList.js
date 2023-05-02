import MaterialReactTable, {
	MRT_ShowHideColumnsButton,
	MRT_ToggleDensePaddingButton,
	MRT_ToggleFiltersButton,
	MRT_ToggleGlobalFilterButton

} from "material-react-table";
import React, { useEffect, useState } from 'react';
import { Box, IconButton, Button } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Icon from '@mui/material/Icon';
import format from 'date-fns/format';
import { ExportToCsv } from 'export-to-csv';
import {
	Edit as EditIcon,
	Delete as DeleteIcon,
} from '@mui/icons-material';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { useDispatch, useSelector } from 'react-redux';
import { openEditAccountDialog, openChangePasswordDialog, removeAccount, selectAccounts, removeAccounts, openNewAccountDialog } from './store/accountsSlice';
import AccountsMultiSelectMenu from "./AccountsMultiSelectMenu";

function AccountsList(props) {
	const dispatch = useDispatch();
	const data = useSelector(selectAccounts);
	const [isLoading, setIsLoding] = useState(true)
	const columns = React.useMemo(
		() => [
			{
				header: '#',
				accessorKey: 'id',
			},
			{
				header: 'Avatar',
				accessorKey: 'avatar',
				Cell: ({ row }) => {
					return <Avatar className="mx-8" alt={row.original.name} src={row.original.avatar} />;
				},
			},
			{
				header: 'First Name',
				accessorKey: 'first_name',
			},
			{
				header: 'Last Name',
				accessorKey: 'last_name',
			},
			{
				header: 'User Name',
				accessorKey: 'username',
			},
			{
				header: 'Role',
				accessorKey: 'role.name',
			},
			{
				header: 'Email',
				accessorKey: 'email',
			},
			{
				header: 'Active',
				accessorKey: 'is_active',
				Cell: ({ cell }) => (
					cell.getValue() ? (
						<Icon className="text-green text-20">check_circle</Icon>
					) : (
						<Icon className="text-red text-20">remove_circle</Icon>
					)
				)
			},
			{
				header: 'Joining Date',
				accessorKey: 'date_joined',
				Cell: ({ cell }) => (
					<span>{format(new Date(cell.getValue()), 'dd-MM-y hh:mm:ss')}</span>
				),
			},
			{
				header: 'Last Login',
				accessorKey: 'last_login',
				sortable: true,
				Cell: ({ cell }) => (
					<span>{cell.getValue() && format(new Date(cell.getValue()), 'dd-MM-y hh:mm:ss')}</span>
				),
			},
		],
		[]
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
				enableRowSelection
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
						<IconButton
							color="textSecondary"
							onClick={(ev) => {
								ev.stopPropagation();
								dispatch(openEditAccountDialog(row.original));
							}}
						>
							<EditIcon />
						</IconButton>
						<IconButton
							onClick={ev => {
								ev.stopPropagation();
								dispatch(openChangePasswordDialog(row.original));
							}}
						>
							<Icon>vpn_key</Icon>
						</IconButton>
						{/* <IconButton
							color="error"
							onClick={(ev) => {
								ev.stopPropagation();
								dispatch(removeAccount(row.original.id));
							}}
						>
							<DeleteIcon />
						</IconButton> */}
					</Box>
				)}

				positionToolbarAlertBanner="bottom" //show selected rows count on bottom accountbar				
				//add custom action buttons to top-left of top accountbar
				renderTopToolbarCustomActions={({ table }) => (
					<Box sx={{ display: 'flex', gap: '1rem', p: '4px' }}>
						<Button
							color="primary"
							onClick={(ev) => {
								ev.stopPropagation();
								dispatch(openNewAccountDialog());
							}}
							variant="contained"
						>
							Create
						</Button>
						<AccountsMultiSelectMenu
							selectedAccountIds={table.getSelectedRowModel().rows.map(row => row.original.id)}
						/>
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

export default AccountsList;
