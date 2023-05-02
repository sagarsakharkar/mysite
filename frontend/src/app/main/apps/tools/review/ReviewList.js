import MaterialReactTable from "material-react-table";
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import IconButton from '@mui/material/IconButton';
import { Box, Button } from '@mui/material';
import Typography from '@mui/material/Typography';
import { useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ImageCard from 'app/shared-components/image/ImageCard';
import { openApproveReviewDialog, openRejectReviewDialog, selectReviews } from './store/reviewSlice';
import format from 'date-fns/format';

function ReviewsList(props) {
	const dispatch = useDispatch();
	const routeParams = useParams();

	const data = useSelector(selectReviews);
	const users = useSelector(({ reviewApp }) => reviewApp.users.entities);
	const statuses = useSelector(({ reviewApp }) => reviewApp.status.entities);

	const [isLoading, setIsLoding] = useState(true)

	const columns = React.useMemo(
		() => [
			{
				header: '#',
				accessorKey: 'uid',
			},
			{
				header: 'Status',
				accessorKey: 'status',
				Cell: ({ row }) => (
					<span>{statuses[row.original.status] && statuses[row.original.status].name}</span>
				),
			},
			{
				header: 'Description',
				accessorKey: 'description',
			},
			{
				header: 'Published By',
				accessorKey: 'published_by',
				Cell: ({ row }) => (
					<span>
						{
							users[row.original.published_by] && users[row.original.published_by].username || 
							users[row.original.created_by] && users[row.original.created_by].username
						}
					</span>
				),
			},
			{
				header: 'Published At',
				accessorKey: 'published_at',
				Cell: ({ row }) => (
					<span>
						{
							row.original.published_at && format(new Date(row.original.published_at), 'dd-MM-y hh:mm:ss') ||
							row.original.created_at && format(new Date(row.original.created_at), 'dd-MM-y hh:mm:ss')
							}
					</span>
				),
			},
		],
		[users, statuses]
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
								dispatch(openApproveReviewDialog(row.original));
							}}
						>
							<FuseSvgIcon className="text-48" size={24} color="action">heroicons-outline:thumb-up</FuseSvgIcon>
						</IconButton>
						<IconButton
							color="error"
							onClick={(ev) => {
								ev.stopPropagation();
								dispatch(openRejectReviewDialog(row.original));
							}}
						>
							<FuseSvgIcon className="text-48" size={24} color="action">heroicons-outline:thumb-down</FuseSvgIcon>
						</IconButton>
					</Box>
				)}

				positionToolbarAlertBanner="bottom" //show selected rows count on bottom assetbar				
				//add custom action buttons to top-left of top assetbar
				renderTopToolbarCustomActions={({ table }) => (
					<Box sx={{ display: 'flex', gap: '1rem', p: '4px' }}>
						<Button
							color="primary"
							disabled={!table.getIsSomeRowsSelected()}
							onClick={() => {
								const ids = table.getSelectedRowModel().rows.map(row => row.original.uid)
								dispatch(openApproveReviewDialog(ids));
							}}
							variant="contained"
						>
							Approve Selected
						</Button>
						<Button
							color="error"
							disabled={!table.getIsSomeRowsSelected()}
							onClick={() => {
								const ids = table.getSelectedRowModel().rows.map(row => row.original.uid)
								dispatch(openRejectReviewDialog(ids));
							}}
							variant="contained"
						>
							Reject Selected
						</Button>
					</Box>
				)}
			/>
		</div>
	);
}

export default ReviewsList;
