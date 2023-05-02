import List from '@mui/material/List';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { getClientReview, setUploadPath, setReviewComponent } from './store/clientReviewSlice';

import { getEpisodes } from 'src/app/main/apps/entities/episodes/store/episodesSlice';
import { getSteps } from 'src/app/main/apps/entities/steps/store/stepsSlice';
import { getShots } from 'src/app/main/apps/entities/shots/store/shotsSlice';
import { getAssets } from 'src/app/main/apps/entities/assets/store/assetsSlice';
import { getUtilSteps } from 'src/app/main/apps/utilities/steps/store/stepsSlice';

import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import _ from '@lodash';

const icon = <CheckBoxOutlineBlankIcon fontSize="large" />;
const checkedIcon = <CheckBoxIcon fontSize="large" />;

function ClientReviewSidebar(props) {
	const dispatch = useDispatch();
	const routeParams = useParams();

	const episodeIds = props.episodeIds;
	const stepIds = props.stepIds;
	const projects = useSelector(({ fuse }) => fuse.projects.ids);
	const utilSteps = props.utilSteps;
	const statuses = props.statuses
	const stepAssetTypes = props.stepAssetTypes

	const [episode, setEpisode] = useState(null)
	const [entity, setEntity] = useState([])
	const [entities, setEntities] = useState([])
	const [project, setProject] = useState(null)
	const [step, setStep] = useState(null)
	console.info(stepAssetTypes)

	const entityTypes = ["Asset", "Shot", "Sequence"]
	const [entityType, setEntityType] = useState(null)

	const [assetType, setAssetType] = useState(null)
	const [component, setComponent] = useState(null)
	
	const [assetTypes, setAssetTypes] = useState([])
	const [components, setComponents] = useState([])

	const status = statuses && _.find(Object.values(statuses), {"name": "Internal Approved"})

	const pathDate = moment().format('YYYY/MM_MMM/YYYYMMDD')

	function resetFormData() {
		setEpisode(null)
		setAssetType(null)
		setStep(null)
		setEntities([])
		setEntity([])
		setAssetType(null)
		setComponent(null)
	}

	useEffect(() => {
		if (['Sequence', 'Shot'].includes(entityType) && project) {
			const projectParams = {
				uid: project,
				entity: 'project'
			}
			project && dispatch(getEpisodes(projectParams));
		}
	}, [entityType, project])

	useEffect(() => {
		setEntities(stepIds)
	}, [stepIds])

	useEffect(() => {
		{/* Get Util Steps from entity Type like 'Asset' or 'shot' */ }
		setStep(null)
		const params = {
			entity: entityType
		}
		entityType && dispatch(getUtilSteps(params));
	}, [entityType])

	useEffect(() => {
		{/* Filter Step Asset Types and set Asset Types like Shaders, Review, Comp Out */ }
		console.info(step)
		step && setAssetTypes(step.step_asset_type.map(rw => stepAssetTypes[rw]))
	}, [step])

	useEffect(() => {
		setEntities([])
		setEntity([])
		setAssetType(null)
		setComponent(null)
		if (step && project){
			const params = {
				project: project,
				name: step.name,
				status: status.id
			}
			if (episode) params['episode'] = episode ;
			dispatch(getSteps(params));
		}
		
	}, [step, episode]);

	useEffect(() =>{
		if (step && project){			
			const uploadPath = '/ASE/01prj/' + project.toUpperCase() + '/06_clientReview/upload/'+ pathDate + '/' + step.name + '/'
			dispatch(setUploadPath(uploadPath))
		} else {
			dispatch(setUploadPath(''))
		}

	}, [step, project])

	function canBeSubmitted() {
		return (entity.length > 0 && assetType && component)
	}

	return (
		<div className="p-0 lg:p-16 lg:ltr:pr-4 lg:rtl:pl-4">
			<div className="p-4">
				<Button
					variant="contained"
					color="primary"
					className="w-full"
					onClick={ev => dispatch(getClientReview({
						'step__in': entity.join(','),
						'asset_type': assetType.name,
						'status': status.id,
					}))}
					disabled={!canBeSubmitted()}
				>
					Search
				</Button>
			</div>
			<div className="p-8">
					<Paper className="rounded-0 shadow-none lg:rounded-8 lg:shadow">
						<List>
							<div className="p-8 flex flex-col justify-center">
								<Autocomplete
									value={project}
									onChange={(event, newValue) => {
										setProject(newValue)
										resetFormData()
									}}
									disableClearable
									// getOptionLabel={option => option.code}
									id="project"
									options={projects}
									renderInput={(params) => <TextField {...params} label="Project" required variant="outlined" />}
								/>
							</div>
							{/* entityTypes = ["Asset", "Shot", "Sequence"] */}
							<div className="p-8 flex flex-col justify-center">
								<Autocomplete
									value={entityType}
									onChange={(event, newValue) => {
										setEntityType(newValue)
										resetFormData()
									}}
									disableClearable
									id="entityType"
									options={entityTypes}
									renderInput={(params) => <TextField {...params} label="Entity" required variant="outlined" />}
								/>
							</div>
							<div className="p-8 flex flex-col justify-center">
								<Autocomplete
									value={step}
									onChange={(event, newValue) => {
										setStep(newValue)
									}}
									disableClearable
									getOptionLabel={option => option.name}
									id="step"
									options={utilSteps && Object.values(utilSteps)}
									renderInput={(params) => <TextField {...params} label="Step" required variant="outlined" />}
								/>
							</div>
							{entityType && ['Sequence', 'Shot'].includes(entityType) && (
								<>
									<div className="p-8 flex flex-col justify-center">
										<Autocomplete
											value={episode}
											onChange={(event, newValue) => {
												setEpisode(newValue)
											}}
											disableClearable
											getOptionLabel={option => option.split(':').slice(1).join('_')}
											id="episode"
											options={episodeIds}
											renderInput={(params) => <TextField {...params} label="Episode" required variant="outlined" />}
										/>
									</div>
								</>
							)}
							<div className="p-8 flex flex-col justify-center">
								<Autocomplete
									multiple
									limitTags={1}
									value={entity}
									onChange={(event, newValue) => {
										setEntity(newValue)
									}}
									// disableClearable
									disableCloseOnSelect
									// isOptionEqualToValue={(option, value) => option === value}
									// renderOption={(option, { selected }) => (
									// 	<li>
									// 		<Checkbox
									// 			icon={icon}
									// 			checkedIcon={checkedIcon}
									// 			style={{ marginRight: 4 }}
									// 			checked={selected}
									// 		/>
									// 		{option.split(':').slice(1, -1).join('_')}
									// 	</li>
									// )}
									getOptionLabel={option => option.split(':').slice(1,-1).join('_')}
									id={entityType}
									options={entities}
									renderInput={(params) => <TextField {...params} label={entityType} required variant="outlined" />}
								/>

							</div>

							{/* assetTypes = ["Geometry", "Review"] */}
							<div className="p-8 flex flex-col justify-center">
								<Autocomplete
									value={assetType}
									onChange={(event, newValue) => {
										setAssetType(newValue)
										setComponents(newValue.components)
									}}
									disableClearable
									getOptionLabel={option => option.name}
									id="assetType"
									options={assetTypes}
									renderInput={(params) => <TextField {...params} label="Asset Type" required variant="outlined" />}
								/>
							</div>
							{/* components = ["mov", "review_img", "review_mov"] */}
							<div className="p-8 flex flex-col justify-center">
								<Autocomplete
									value={component}
									onChange={(event, newValue) => {
										setComponent(newValue)
										dispatch(setReviewComponent(newValue))
									}}
									disableClearable
									id="component"
									options={components}
									renderInput={(params) => <TextField {...params} label="Component" required variant="outlined" />}
								/>
							</div>
							



							

						</List>
					</Paper>
			</div>
		</div>
	);
}

export default ClientReviewSidebar;
