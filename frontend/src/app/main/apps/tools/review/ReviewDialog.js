import { useForm } from '@fuse/hooks';
import FuseUtils from '@fuse/utils/FuseUtils';
import AppBar from '@mui/material/AppBar';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Icon from '@mui/material/Icon';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import diff from 'object-diff';
import { useDispatch, useSelector } from 'react-redux';
import {
	addReview,
	processReview,
	closeApproveReviewDialog,
	closeRejectReviewDialog,
	closeSendReviewDialog
} from './store/reviewSlice';
import ImageUpload from 'app/shared-components/upload/ImageUpload';
// import { removeCard, updateCard } from 'app/main/apps/users/taskboard/store/cardSlice';

const defaultFormState = {
	uid: '',
	message: '',
	description: '',
};

function ReviewDialog(props) {
	const dispatch = useDispatch();
	const reviewDialog = props.reviewDialog;

	const { form, handleChange, setForm, resetForm, setInForm } = useForm(defaultFormState);
	const routeParams = useParams();
	const [files, setFiles] = useState([])

	const statuses = props.statuses;
	const [statusId, setStatusId] = useState(null)
	const [selectedRowIds, setSelectedRowIds] = useState([])

	const initDialog = useCallback(() => {
		resetForm()
		setFiles([])
		if (Array.isArray(reviewDialog.data)) {
			setSelectedRowIds(reviewDialog.data)
		} else {
			setSelectedRowIds([])
			setForm({ ...defaultFormState, ...reviewDialog.data });
		}

	}, [reviewDialog.data, setForm]);

	useEffect(() => {
		/**
		 * After Dialog Open
		 */
		if (reviewDialog.props.open) {
			initDialog();
		}
	}, [reviewDialog.props.open, initDialog]);

	useEffect(() => {
		let statusName = 'Internal Approved'
		if (routeParams.review_type) {
			const statusType = routeParams.review_type.charAt(0).toUpperCase() + routeParams.review_type.slice(1)
			if (routeParams.action == 'Approve') {
				statusName = statusType + ' Approved'
			} else {
				statusName = statusType + ' Reject'
			}

		} else {
			statusName = 'Pending Internal Review'
		}

		if (Object.values(statuses).length > 0) {
			const status = Object.values(statuses).filter(item => item.name === statusName)
			// console.error(status, statusName, statuses)
			status && setStatusId(status[0].id)
		}

	}, [statuses, routeParams])
	function closeComposeDialog() {
		reviewDialog.type === 'Send'
			? dispatch(closeSendReviewDialog())
			: reviewDialog.type === 'Reject'
				? dispatch(closeRejectReviewDialog())
				: dispatch(closeApproveReviewDialog())
	}

	function canBeSubmitted() {
		return (
			(reviewDialog.type === 'Send') ? files.length > 0 && form.description.length > 10 : form.message.length > 10
		);
	}

	function handleSubmit(event) {
		event.preventDefault();
		if (reviewDialog.type === 'Send') {
			// dispatch(removeCard(form.id))			
			form.files = files
			form.status = statusId
			delete form.uid
			console.error(form)
			dispatch(addReview(form))
		} else if (selectedRowIds.length > 0) {
			selectedRowIds.map(item => {
				const changedValues = {
					id: item,
					message: form.message,
					status: statusId,
					review_type: routeParams.review_type,
					action: reviewDialog.type,
					files: files
				}
				dispatch(processReview(changedValues));
			})

		} else {
			const changedValues = diff(reviewDialog.data, form)
			changedValues.id = form.uid
			changedValues.files = files
			changedValues.status = statusId
			changedValues.review_type = routeParams.review_type
			changedValues.action = reviewDialog.type

			dispatch(processReview(changedValues));
		}
		closeComposeDialog();
	}

	return (
		<Dialog
			classes={{
				paper: 'm-24 rounded-8'
			}}
			{...reviewDialog.props}
			onClose={closeComposeDialog}
			fullWidth
			maxWidth="xs"
		>
			<AppBar position="static" className="shadow-md">
				<Toolbar className="flex w-full">
					<Typography variant="subtitle1" color="inherit">
						{reviewDialog.type + ' Version'}
					</Typography>
				</Toolbar>
			</AppBar>
			<form noValidate onSubmit={handleSubmit} className="flex flex-col md:overflow-hidden">
				<DialogContent classes={{ root: 'p-24' }}>
					<>
						{reviewDialog.type !== 'Approve' && (<ImageUpload setFiles={setFiles} files={files} multiple={true} />)}
						{reviewDialog.type === 'Send' ? (<><div className="flex">
							<TextField
								className="mb-24"
								label="Task"
								autoFocus
								id="uid"
								name="uid"
								value={form.task}
								onChange={handleChange}
								variant="outlined"
								disabled
								fullWidth
							/>
						</div>

							<div className="flex">
								<TextField
									className="mb-24"
									label={`${reviewDialog.type} Message`}
									id="description"
									name="description"
									value={form.description}
									onChange={handleChange}
									variant="outlined"
									fullWidth
								/>
							</div></>) : (<>

								{selectedRowIds.length === 0 && (<div className="flex">
									<TextField
										className="mb-24"
										label="Version"
										autoFocus
										id="uid"
										name="uid"
										value={form.uid}
										onChange={handleChange}
										variant="outlined"
										disabled
										fullWidth
									/>
								</div>)}

								<div className="flex">
									<TextField
										className="mb-24"
										label={`${reviewDialog.type} Message`}
										id="message"
										name="message"
										value={form.message}
										onChange={handleChange}
										variant="outlined"
										fullWidth
									/>
								</div></>)
						}

					</>


				</DialogContent>

				<DialogActions className="justify-between pl-16">

					<Button
						variant="contained"
						color="primary"
						onClick={handleSubmit}
						type="submit"
						startIcon={
							reviewDialog.type === 'Approve' 
							? <Icon>thumb_up</Icon> 
							: reviewDialog.type === 'Reject' 
							? <Icon>thumb_down</Icon> : <Icon>send</Icon> 
						}
						disabled={!canBeSubmitted()}
					>
						{reviewDialog.type}
					</Button>

					<IconButton
						onClick={closeComposeDialog}
					>
						<Icon>close</Icon>
					</IconButton>
				</DialogActions>
			</form>
		</Dialog>
	);
}

export default ReviewDialog;
