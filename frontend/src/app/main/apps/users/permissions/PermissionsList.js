import MaterialReactTable, {
	MRT_ShowHideColumnsButton,
	MRT_ToggleDensePaddingButton,
	MRT_ToggleFiltersButton,
	MRT_ToggleGlobalFilterButton

} from "material-react-table";
import React, { useEffect, useState } from 'react';
import { Box, IconButton, Button } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import format from 'date-fns/format';
import { ExportToCsv } from 'export-to-csv';
import {
	Edit as EditIcon,
	Delete as DeleteIcon,
} from '@mui/icons-material';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { useDispatch, useSelector } from 'react-redux';
import { toggleInSelectedPerm, selectPermissions, setRolePermissions } from './store/permissionsSlice';
import { updateGroup } from 'src/app/main/apps/users/groups/store/groupsSlice';

function PermissionsList(props) {
	const dispatch = useDispatch();
	const permissions = useSelector(selectPermissions);
	const selectedIds = useSelector(({ permissionsApp }) => permissionsApp.permissions.selectedIds);
	const groups = useSelector(({ permissionsApp }) => permissionsApp.groups.entities) || {}
	const roles = groups && Object.values(groups)
	const exclude_perm = ['auth', 'admin', 'contenttypes', 'sessions', 'academy']
	const [isLoading, setIsLoding] = useState(true)
	const [data, setData] = useState([])
	const [role, setRole] = useState(null)
	const columns = React.useMemo(
		() => [
			{
				header: 'Application',
				accessorKey: 'app_model',
			},
			{
				header: "View",
				accessorKey: "view",
				Cell: ({ row }) => (
					<div className="flex items-center">
						<Checkbox
							onClick={(event) => {
								event.stopPropagation();
							}}
							checked={selectedIds.includes(row.original.view.id)}
							onChange={() => dispatch(toggleInSelectedPerm(row.original.view.id))}
						/>
					</div>
				)
			},
			{
				header: "Add",
				accessorKey: "add",
				Cell: ({ row }) => {
					return (<Checkbox
						onClick={(event) => {
							event.stopPropagation();
						}}
						checked={selectedIds.includes(row.original.add.id)}
						onChange={() => dispatch(toggleInSelectedPerm(row.original.add.id))}
					/>
					)
				},
			},
			{
				header: "Change",
				accessorKey: "change",
				Cell: ({ row }) => {
					return (<Checkbox
						onClick={(event) => {
							event.stopPropagation();
						}}
						checked={selectedIds.includes(row.original.change.id)}
						onChange={() => dispatch(toggleInSelectedPerm(row.original.change.id))}
					/>
					)
				},
			},
			{
				header: "Delete",
				accessorKey: "delete",
				Cell: ({ row }) => {
					return (<Checkbox
						onClick={(event) => {
							event.stopPropagation();
						}}
						checked={selectedIds.includes(row.original.delete.id)}
						onChange={() => dispatch(toggleInSelectedPerm(row.original.delete.id))}
					/>
					)
				},

			}
		],
		[selectedIds]
	);

	useEffect(() => {
		setIsLoding(false)
	}, [data])

	useEffect(() => {
		role ? dispatch(setRolePermissions(role.permissions)) : dispatch(setRolePermissions([])) 
	},[role])

	useEffect(() => {
		const group = permissions.reduce((r, item) => {
			if (!exclude_perm.includes(item.content_type.app_label)) {
				const app_model = item.content_type.app_label + '_' + item.content_type.model
				// console.log("a", r[app_model])
				if (r[app_model]) {
					r[app_model][item.codename.split('_')[0]] = { id: item.id, name: item.name }
				} else {
					r[app_model] = { app_model: app_model }
					r[app_model][item.codename.split('_')[0]] = { id: item.id, name: item.name }
				}
			}
			return r

		}, {})

		// console.info(group)
		const arr = Object.keys(group).map((id) => group[id]);
		setData(arr)
	}, [permissions])

	const csvOptions = {
		fieldSeparator: ',',
		quoteStrings: '"',
		decimalSeparator: '.',
		showLabels: true,
		useBom: true,
		useKeysAsheaders: false,
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
				// enableColumnOrdering
				// enablePinning
				// enableRowSelection
				// enableRowActions
				enableStickyheader
				initialState={{ density: 'compact' }}
				// muiTableContainerProps={{ sx: { maxHeight: '400px' } }}
				state={{ isLoading: isLoading }}
				positionToolbarAlertBanner="bottom" //show selected rows count on bottom permissionbar				
				//add custom action buttons to top-left of top permissionbar
				renderTopToolbarCustomActions={({ table }) => (
					<Box sx={{ display: 'flex', gap: '1rem', p: '4px' }}>
						<Autocomplete
							value={role}
							onChange={(event, newValue) => {
								setRole(newValue)
							}}
							disableClearable
							getOptionLabel={option => option.name}
							id="role"
							options={roles}
							sx={{ width: 300, }}
							renderInput={(params) => <TextField {...params} label="Role" variant="outlined" />}
						/>
						<Button
							variant="contained"
							color="primary"
							className="w-full"
							onClick={ev => dispatch(updateGroup(
								{
									id: role.id,
									permissions: selectedIds
								}
							))}
							disabled={!role || !selectedIds.length}
						>
							Save Changes
						</Button>

					</Box>
				)}
				//customize built-in buttons in the top-right of top toolbar
				renderToolbarInternalActions={({ table }) => (
					<Box>

						{/* along-side built-in buttons in whatever order you want them */}
						<MRT_ToggleGlobalFilterButton table={table} />
						{/* <MRT_ToggleFiltersButton table={table} />		 */}
						{/* <MRT_ShowHideColumnsButton table={table} /> */}
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

export default PermissionsList;
