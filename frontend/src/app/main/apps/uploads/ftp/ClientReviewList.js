import MaterialReactTable from "material-react-table";
import React, { useEffect, useState } from 'react';
import { Box, Button } from '@mui/material';
import history from "@history";
import Icon from '@mui/material/Icon';
import IconButton from '@mui/material/IconButton';
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
import { selectClientReview, uploadClientReview } from './store/clientReviewSlice';

function ClientReviewList(props) {
	const dispatch = useDispatch();
	const routeParams = useParams();
	const data = useSelector(selectClientReview);
	const [isLoading, setIsLoding] = useState(true)

    const users = props.users;
	const statuses = props.statuses;
	const uploadPath = useSelector(({ clientReviewApp }) => clientReviewApp.clientReview.uploadPath);

	const columns = React.useMemo(
		() => [
			{
				header: '#',
				accessorKey: 'uid',
			},
			{
				header: "Step",
				accessorKey: "step",
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
				header: 'Status',
				accessorKey: 'status',
				Cell: ({ row }) => (
					<span>{statuses[row.original.status] && statuses[row.original.status].name}</span>
				),
			},
			{
				header: 'Published By',
				accessorKey: 'published_by',
				Cell: ({ row }) => (
					<span>{users[row.original.published_by] && users[row.original.published_by].username}</span>
				),
			},
			{
				header: 'Published At',
				accessorKey: 'created_at',
				Cell: ({ row }) => (
					<span>{row.original.created_at && format(new Date(row.original.created_at), 'dd-MM-y hh:mm:ss')}</span>
				),
			},
			{
				header: 'Message',
				Cell: ({ row }) => (
					<span>{row.original.message ? row.original.message : "In Progress"}</span>
				),
			},
		],
		[statuses, users]
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
				enableStickyheader
				initialState={{ density: 'compact' }}
				// muiTableContainerProps={{ sx: { maxHeight: '400px' } }}
				state={{ isLoading: isLoading}}
				positionToolbarAlertBanner="bottom" //show selected rows count on bottom assetbar				
				//add custom action buttons to top-left of top assetbar
				renderTopToolbarCustomActions={({ table }) => (
					<Box sx={{ display: 'flex', gap: '1rem', p: '4px' }}>
						<Button
							color="error"
							disabled={!table.getIsSomeRowsSelected()}
							onClick={() => {
								const uploadData = table.getSelectedRowModel().rows
								dispatch(uploadClientReview(uploadData));
							}}
							variant="contained"
						>
							Upload Selected
						</Button>
					</Box>
				)}
			/>
		</div>
	);
}

export default ClientReviewList;
