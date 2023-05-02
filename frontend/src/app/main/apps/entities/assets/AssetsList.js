import MaterialReactTable, {
	MRT_ShowHideColumnsButton,
	MRT_ToggleDensePaddingButton,
	MRT_ToggleFiltersButton,
	MRT_ToggleGlobalFilterButton

} from "material-react-table";
import React, { useEffect, useState } from 'react';
import { Box, Button } from '@mui/material';
import history from "@history";
import Icon from '@mui/material/Icon';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';
import Popover from '@mui/material/Popover';
import format from 'date-fns/format';
import { useParams, Link } from 'react-router-dom';
import { ExportToCsv } from 'export-to-csv';
import { CSVLink, CSVDownload } from "react-csv";
import {
	Edit as EditIcon,
	Delete as DeleteIcon,
} from '@mui/icons-material';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { useDispatch, useSelector } from 'react-redux';
import {
	selectAssets,
	removeAsset,
	removeAssets,
	openNewAssetDialog,
	openEditAssetDialog,
	openMultipleAssetDialog,
	openCsvCreateDialog,
	openCsvUpdateDialog
} from './store/assetsSlice';

function AssetsList(props) {
	const dispatch = useDispatch();
	const routeParams = useParams();
	const data = useSelector(selectAssets);
	const [isLoading, setIsLoding] = useState(true)
	const [uploadMenu, setUploadMenu] = useState(null);
	const downloadFileName = routeParams.uid.replace(':', "_") + '_assets.csv';
	const users = useSelector(({ assetsApp }) => assetsApp.users.entities)

	const [assets, setAssets] = useState([])

	const utilSteps = useSelector(({ assetsApp }) => assetsApp.utilsteps.entities)

	const stepHeaders = utilSteps && Object.values(utilSteps).map((row, index) => {
		return {
			id: row.name.toLowerCase().replace(' ', '_'),
			header: row.name,
			columns: [
				{
					id: `${row.name.toLowerCase().replace(' ', '_')}_status`,
					header: 'Status',
					accessorKey: `${row.name.toLowerCase().replace(' ', '_')}.status.name`
				},
				{
					id: `${row.name.toLowerCase().replace(' ', '_')}_users`,
					header: 'Users',
					accessorKey: `${row.name.toLowerCase().replace(' ', '_')}.users`,
					Cell     : ({ cell }) => (
						cell.getValue() ? (<AvatarGroup max={3}>
							{cell.getValue().map((userId, index) => (
								<Tooltip key={index} title={users && users[userId]?.username} placement="top">
									<Avatar key={index} src={users && users[userId]?.avatar} />
								</Tooltip>
							))}
						</AvatarGroup>) : null
					),   
				}
			]
		}
	}) || []

	useEffect(() =>{
		const entities = data.length > 0 && data.map( (row) => {
			row.steps.map((step) => {
				row = {
					...row,
					[step.name.toLowerCase().replace(' ', '_')] : step
				}
			})
			return row
		})
		setAssets(entities)
	},[data])
	
	const columns = React.useMemo(
		() => [
			{
				header: '#',
				accessorKey: 'uid',
				Cell: ({ row }) => (
					<Typography
						onClick={(event) => {
							event.preventDefault();
							history.push("/entity/asset/" + row.original.uid + "/overview");
						}}>
						{row.original.uid}
					</Typography>
				)
			},
			{
				header: 'Name',
				accessorKey: 'name',
			},
			{
				header: 'Asset Type',
				accessorKey: 'asset_type',
			},
			{
				header: 'Prefix',
				accessorKey: 'prefix',
			},
			{
				header: 'Client Name',
				accessorKey: 'client_name',
			},
			{
				header: 'Description',
				accessorKey: 'description',
			},
			{
				header: 'Created At',
				accessorKey: 'created_at',
				Cell: ({ row }) => (
					<span>{format(new Date(row.original.created_at), 'dd-MM-y hh:mm:ss')}</span>
				),
			},
			...stepHeaders
		],
		[stepHeaders, users]
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

	const uploadMenuClick = event => {
		setUploadMenu(event.currentTarget);
	};

	const uploadMenuClose = () => {
		setUploadMenu(null);
	};

	const [rowSelection, setRowSelection] = useState({});
	useEffect(() => {

		//do something when the row selection changes...

		console.info({ rowSelection });

	}, [rowSelection]);

	return (
		<div className="flex flex-1 flex-col justify-center">
			<MaterialReactTable
				columns={columns}
				data={assets}
				enableFullScreenToggle={false}
				enableColumnResizing
				enableColumnOrdering
				enablePinning
				enableRowSelection
				enableRowActions
				enableStickyheader
				initialState={{ density: 'compact' }}
				onRowSelectionChange={setRowSelection} //connect internal row selection state to your own
				// muiTableContainerProps={{ sx: { maxHeight: '400px' } }}
				state={{ isLoading: isLoading, showSkeletons: isLoading }}
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
								dispatch(openEditAssetDialog(row.original));
							}}
						>
							<EditIcon />
						</IconButton>
						{/* <IconButton
							color="error"
							onClick={(ev) => {
								ev.stopPropagation();
								dispatch(removeAsset(row.original.uid));
							}}
						>
							<DeleteIcon />
						</IconButton> */}
					</Box>
				)}

				positionToolbarAlertBanner="bottom" //show selected rows count on bottom assetbar				
				//add custom action buttons to top-left of top assetbar
				renderTopToolbarCustomActions={({ table }) => (
					<Box sx={{ display: 'flex', gap: '1rem', p: '4px' }}>
						<Button
							color="primary"
							onClick={(ev) => {
								ev.stopPropagation();
								dispatch(openNewAssetDialog());
							}}
							variant="contained"
						>
							Create New
						</Button>
						<Button
							color="error"
							disabled={!table.getIsSomeRowsSelected()}
							onClick={() => {
								const ids = table.getSelectedRowModel().rows.map(row => row.original.uid)
								dispatch(removeAssets(ids));
							}}
							variant="contained"
						>
							Delete Selected
						</Button>
						<Button
							color="primary"
							disabled={!table.getIsSomeRowsSelected()}
							onClick={() => {
								const ids = table.getSelectedRowModel().rows.map(row => row.original.uid)
								dispatch(openMultipleAssetDialog(ids));
							}}
							variant="contained"
						>
							Update Selected
						</Button>
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

						<Tooltip title="Upload From CSV">
							<IconButton
								onClick={uploadMenuClick}
								aria-label="open right sidebar"
							>
								<Icon>backup</Icon>
							</IconButton>
						</Tooltip>
						<Popover
							open={Boolean(uploadMenu)}
							anchorEl={uploadMenu}
							onClose={uploadMenuClose}
							anchorOrigin={{
								vertical: 'bottom',
								horizontal: 'center'
							}}
							transformOrigin={{
								vertical: 'top',
								horizontal: 'center'
							}}
							classes={{
								paper: 'py-8'
							}}
						>
							<>
								<MenuItem
									onClick={() => {
										dispatch(openCsvCreateDialog());
										uploadMenuClose();
									}}
								>
									<ListItemIcon className="min-w-40">
										<Icon>add_box</Icon>
									</ListItemIcon>
									<ListItemText primary="Bulk Create" />
								</MenuItem>
								<MenuItem
									onClick={() => {
										dispatch(openCsvUpdateDialog());
										uploadMenuClose();
									}}
								>
									<ListItemIcon className="min-w-40">
										<Icon>update</Icon>
									</ListItemIcon>
									<ListItemText primary="Bulk Update" />
								</MenuItem>
							</>
						</Popover>
						{/* <Tooltip title="Download Assets">
							<CSVLink data={data} filename={downloadFileName}>
								<IconButton>
									<Icon>get_app</Icon>
								</IconButton>
							</CSVLink>
						</Tooltip> */}

						<Tooltip title="Download Assets">
							<IconButton
								disabled={table.getPrePaginationRowModel().rows.length === 0}
								//export all rows, including from the next page, (still respects filtering and sorting)
								onClick={() =>
									handleExportRows(table.getPrePaginationRowModel().rows)
								}
							>
								<FileDownloadIcon />
							</IconButton>
						</Tooltip>
					</Box>
				)}
			/>
		</div>
	);
}

export default AssetsList;
