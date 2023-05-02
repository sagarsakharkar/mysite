import { useForm } from '@fuse/hooks';
import { makeStyles } from '@mui/styles';
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
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import Checkbox from '@mui/material/Checkbox';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Divider from '@mui/material/Divider';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import React, { useCallback, useEffect } from 'react';
import diff from 'object-diff';
import { useDispatch, useSelector } from 'react-redux';
import {
	removeStep,
	updateStep,
	addStep,
	closeNewStepDialog,
	closeEditStepDialog,
} from './store/stepsSlice';

const defaultFormState = {
	name: '',
	entity: '',
	step_asset_type: [],
};

const useStyles = makeStyles((theme) => ({
	root: {
		margin: 'auto',
	},
	cardHeader: {
		padding: theme.spacing(1, 2),
	},
	list: {
		width: 400,
		height: 200,
		backgroundColor: theme.palette.background.paper,
		overflow: 'auto',
	},
	button: {
		margin: theme.spacing(0.5, 0),
	},
}));

function not(a, b) {
	return a.filter((value) => b.indexOf(value) === -1);
}

function intersection(a, b) {
	return a.filter((value) => b.indexOf(value) !== -1);
}

function union(a, b) {
	return [...a, ...not(b, a)];
}

function StepDialog(props) {
	const classes = useStyles();
	const dispatch = useDispatch();
	const stepDialog = useSelector(({ stepsApp }) => stepsApp.steps.stepDialog);
	const stepAssets = useSelector(({ stepsApp }) => stepsApp.stepAsset.entities);
	const items = useSelector(({ stepsApp }) => stepsApp.stepAsset.ids);

	const { form, handleChange, setForm, setInForm } = useForm(defaultFormState);

	const initDialog = useCallback(() => {
		if (stepDialog.type === 'edit' && stepDialog.data) {
			setForm({ ...stepDialog.data });
		}

		if (stepDialog.type === 'new') {
			setForm({
				...defaultFormState,
				...stepDialog.data,
			});
		}
	}, [stepDialog.data, stepDialog.type, setForm]);

	useEffect(() => {
		/**
		 * After Dialog Open
		 */
		if (stepDialog.props.open) {
			initDialog();
		}
	}, [stepDialog.props.open, initDialog]);

	function closeComposeDialog() {
		stepDialog.type === 'edit'
			? dispatch(closeEditStepDialog())
			: dispatch(closeNewStepDialog())
	}

	function canBeSubmitted() {
		return (
			form.name.length > 1
		);
	}

	function handleSubmit(event) {
		event.preventDefault();

		if (stepDialog.type === 'new') {
			dispatch(addStep(form));
		} else {
			const changedValues = diff(stepDialog.data, form)
			changedValues.id = form.id
			dispatch(updateStep(changedValues));
		}
		closeComposeDialog();
	}

	const handleToggleAll = (items) => () => {
		if (numberOfChecked(items) === items.length) {
			setInForm("step_asset_type", not(form.step_asset_type, items));
		} else {
			setInForm("step_asset_type", union(form.step_asset_type, items));
		}
	};

	const numberOfChecked = (items) => intersection(form.step_asset_type, items).length;

	const handleToggle = (value) => () => {
		const currentIndex = form.step_asset_type.indexOf(value);
		const newChecked = [...form.step_asset_type];

		if (currentIndex === -1) {
			newChecked.push(value);
		} else {
			newChecked.splice(currentIndex, 1);
		}

		setInForm("step_asset_type", newChecked);
	};

	return (
		<Dialog
			classes={{
				paper: 'm-24 rounded-8'
			}}
			{...stepDialog.props}
			onClose={closeComposeDialog}
			fullWidth
			maxWidth="xs"
		>
			<AppBar position="static" className="shadow-md">
				<Toolbar className="flex w-full">
					<Typography variant="subtitle1" color="inherit">
						{stepDialog.type === 'new' ? 'New Step' : 'Edit Step'}
					</Typography>
				</Toolbar>
			</AppBar>
			<form noValidate onSubmit={handleSubmit} className="flex flex-col md:overflow-hidden">
				<DialogContent classes={{ root: 'p-24' }}>
						<>
							<div className="flex">
								<TextField
									className="mb-24"
									label="Name"
									autoFocus
									id="name"
									name="name"
									value={form.name}
									onChange={handleChange}
									variant="outlined"
									required
									fullWidth
								/>
							</div>

							<div className="flex">
								<TextField
									className="mb-24"
									label="Entity"
									id="entity"
									name="entity"
									value={form.entity}
									onChange={handleChange}
									variant="outlined"
									fullWidth
								/>
							</div>
							<div className="flex">
								<TextField
									className="mb-24"
									label="Short Name"
									id="short_name"
									name="short_name"
									value={form.short_name}
									onChange={handleChange}
									variant="outlined"
									fullWidth
								/>
							</div>

							<div className="flex flex-1 justify-between">
							<Card>
								<CardHeader
									className={classes.cardHeader}
									avatar={
										<Checkbox
											onClick={handleToggleAll(items)}
											checked={numberOfChecked(items) === items.length && items.length !== 0}
											indeterminate={numberOfChecked(items) !== items.length && numberOfChecked(items) !== 0}
											disabled={items.length === 0}
											inputProps={{ 'aria-label': 'all items selected' }}
										/>
									}
									title={`Asset Types (${numberOfChecked(items)}/${items.length} selected)`}
									subheader={
										<p>{stepAssets && form.step_asset_type.map(rw => stepAssets[rw].name).join(', ')}</p>
									}
								/>
								<Divider />
								<List className={classes.list} dense component="div" role="list">
									{items.map((value) => {
										const labelId = `transfer-list-all-item-${value}-label`;

										return (
											<ListItem key={value} role="listitem" button onClick={handleToggle(value)}>
												<ListItemIcon>
													<Checkbox
														checked={form.step_asset_type.indexOf(value) !== -1}
														tabIndex={-1}
														disableRipple
														inputProps={{ 'aria-labelledby': labelId }}
													/>
												</ListItemIcon>
												<ListItemText id={labelId} primary={stepAssets && stepAssets[value].name} />
											</ListItem>
										);
									})}
									<ListItem />
								</List>
							</Card>
						</div>
						</>
			

				</DialogContent>

				<DialogActions className="justify-between pl-16">

					<Button
						variant="contained"
						color="primary"
						onClick={handleSubmit}
						type="submit"
						disabled={!canBeSubmitted()}
					>
						{stepDialog.type === 'new' ? 'Add' : 'Save'}
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

export default StepDialog;
