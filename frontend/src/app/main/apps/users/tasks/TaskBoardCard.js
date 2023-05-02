import _ from '@lodash';
import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import Icon from '@mui/material/Icon';
import Button from '@mui/material/Button';
import { makeStyles } from '@mui/styles';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import StopCircleOutlineIcon from '@mui/icons-material/StopCircleOutlined';
import SendOutlined from '@mui/icons-material/SendOutlined';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { Link, withRouter, useParams } from 'react-router-dom';
import clsx from 'clsx';
import moment from 'moment';
import React, { useCallback, useEffect, useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { useDispatch, useSelector } from 'react-redux';
import { openCardDialog } from './store/cardSlice';
import { updateTaskUser, updateTask } from 'src/app/main/apps/entities/tasks/store/tasksSlice';
import { updateStep } from 'src/app/main/apps/entities/steps/store/stepsSlice';
import { openSendReviewDialog } from 'src/app/main/apps/tools/review/store/reviewSlice';

const useStyles = makeStyles(theme => ({
	card: {
		transitionProperty: 'box-shadow',
		transitionDuration: theme.transitions.duration.short,
		transitionTimingFunction: theme.transitions.easing.easeInOut
	}
}));

function TaskBoardCard(props) {
	const dispatch = useDispatch();
	const routeParams = useParams();

	const board = useSelector(({ taskBoardApp }) => taskBoardApp.board);
	const priorities = useSelector(({ taskBoardApp }) => taskBoardApp.priority.entities)
	const users = useSelector(({ taskBoardApp }) => taskBoardApp.user.entities)
	const statuses = useSelector(({ taskBoardApp }) => taskBoardApp.status.entities)
	const userId = useSelector(({ user }) => user.id)

	const project = routeParams && routeParams.projectId

	const classes = useStyles(props);
	const { card, index } = props;
	// const commentsCount = getCommentsCount(card);
	const commentsCount = 2;

	const priority = priorities && priorities[card.priority]
	const step_status = statuses && statuses[card.step_status]
	const bidHours = card && parseFloat(card.bid_days) * 8
	const due = card && moment(card.assign_date).add(bidHours, "hours")
	const duration = card && card.duration || 0

	const [status, setStatus] = useState(card && statuses && statuses[card.status] && statuses[card.status].name || 'Stopped')

	function handleCardClick(ev, _card) {
		ev.preventDefault();
		dispatch(openCardDialog(_card));
	}

	function handleTaskAction(event, status) {
		event.preventDefault();

		const userStatus = _.find(Object.values(statuses), { name: status }) || {}
		const taskStatus = _.find(Object.values(statuses), { name: 'In Progress' }) || {}

		const changedValues = {
			id: card.id,
			status: userStatus.id
		}
		if (status === 'Started') {
			changedValues['start_date'] = moment()
		} else {
			changedValues['stop_date'] = moment()
		}
		if (step_status.name === 'Ready To Start') {
			changedValues['step_status'] = taskStatus.id
		}
		dispatch(updateTaskUser(changedValues));
		setStatus(status)

		const taskData = {
			id: card.task,
			status: taskStatus.id
		}
		dispatch(updateTask(taskData))

		if (step_status.name === 'Ready To Start') {
			taskData['id'] = card.step
			dispatch(updateStep(taskData))

			// const source = {
			// 	index: index,
			// 	droppableId: 'readyToStart'
			// }
			// const destination = {
			// 	index: 0,
			// 	droppableId: 'inProgress'
			// }
			// dispatch(reorderCard({source, destination}))
		}
		// const params = {
		// 	project: project,
		// 	userId: userId
		// }
		// dispatch(getBoard(params));
		// return () => {
		// 	dispatch(resetBoard());
		// };
	}

	function getCommentsCount(_card) {
		return _.sum(_card.activities.map(x => (x.type === 'comment' ? 1 : 0)));
	}

	return (
		<Draggable draggableId={card.id} index={index} type="card">
			{(provided, snapshot) => (
				<div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
					<Card
						className={clsx(
							classes.card,
							snapshot.isDragging ? 'shadow-lg' : 'shadow-0',
							'w-full mb-16 rounded-4 cursor-pointer border-1'
						)}

					>
						{/* {board.settings.cardCoverImages && card.idAttachmentCover !== '' && (
							<img
								className="block"
								src={_.find(card.attachments, { id: card.idAttachmentCover }).src}
								alt="card cover"
							/>
						)} */}

						<div className="p-16 pb-0">

							<div className="flex flex-wrap mb-8 -mx-4 justify-between">
								{priority && (<Tooltip title={priority.name}>
									<div style={{
										backgroundColor: priority.color,
									}} className={clsx('w-32  h-6 rounded-6 mx-4 mb-6')} />

								</Tooltip>)}
								{step_status && (<Tooltip title={step_status.name}>
									<div style={{
										backgroundColor: step_status.color,
									}} className={clsx('w-48  h-6 rounded-6 mx-4 mb-6')} />

								</Tooltip>)}
							</div>

							<Tooltip title={card.step}>
								<div className="flex justify-between">
									<Typography className="font-600 mb-12" onClick={ev => handleCardClick(ev, card)}>{card.step && card.step.split(':').reverse()[0]}</Typography>
									<Typography className="font-600 mb-12" onClick={ev => handleCardClick(ev, card)}>{card.task && card.task.split(':').reverse()[0]}</Typography>
								</div>

							</Tooltip>
							<div className="flex items-center mb-12 -mx-4">
								<Typography className="font-600 mb-12" onClick={ev => handleCardClick(ev, card)}>{card.step && card.step.split(':').slice(1, -1).join(':')}</Typography>
							</div>
							{(due || bidHours > 0) && (
								<div className="flex items-center mb-12 -mx-4">
									{due && (
										<div
											className={clsx(
												'flex items-center px-8 py-4 mx-4 rounded-sm',
												moment() > due
													? 'bg-red text-white'
													: 'bg-green text-white'
											)}
										>
											<Icon className="text-16">access_time</Icon>
											<span className="mx-4">{due.format('MMM Do YY')}</span>
										</div>
									)}

									{bidHours > 0 && (
										<div
											className={clsx(
												'flex items-center px-8 py-4 mx-4 rounded-sm',
												duration < bidHours
													? 'bg-green text-white'
													: 'bg-grey-700 text-white'
											)}
										>
											<Icon className="text-16">check_circle</Icon>
											<span className="mx-4">{`${duration}/${bidHours}`}</span>
										</div>
									)}
								</div>
							)}

							{/* {card.idMembers.length > 0 && (
								<div className="flex flex-wrap mb-12 -mx-4">
									{card.idMembers.map(id => {
										const member = users[id];
										return (
											<Tooltip title={member && member.username} key={id}>
												<Avatar className="mx-4 w-32 h-32" src={member && member.avatar} />
											</Tooltip>
										);
									})}
									<div />
								</div>
							)} */}
						</div>

						<div className="flex justify-between h-48 px-16 border-t-1">
							<div className="flex items-center -mx-6">
								{status == 'Stopped' ? (<Button
									variant="contained"
									onClick={ev => handleTaskAction(ev, 'Started')}
									color="primary"
									className="normal-case bg-green text-white">
									<StopCircleOutlineIcon />
									<span className="px-8">Stop</span>
								</Button>)
									: (<Button
										variant="contained"
										onClick={ev => handleTaskAction(ev, 'Stopped')}
										color="primary"
										className="normal-case bg-red text-white">
										<PlayCircleOutlineIcon />
										<span className="px-8">Start</span>
									</Button>)}


							</div>
							{step_status && !step_status.name.endsWith('Review') && (<div className="flex items-center -mx-6">
								<Button
									variant="contained"
									onClick={ev => {
										ev.stopPropagation();
										dispatch(openSendReviewDialog(card));
									}}
									className="normal-case"
									color="primary"
								>

									<SendOutlined />
									<span className="px-8">Send</span>
								</Button>
							</div>)}

							<div className="flex items-center justify-end -mx-6">
								{card.attachments && (
									<span className="flex items-center mx-6">
										<Icon className="text-18" color="action">
											attachment
										</Icon>
										<Typography className="mx-8" color="textSecondary">
											{card.attachments.length}
										</Typography>
									</span>
								)}
								{commentsCount > 0 && (
									<span className="flex items-center mx-6">
										<Icon className="text-18" color="action">
											comment
										</Icon>
										<Typography className="mx-8" color="textSecondary">
											{commentsCount}
										</Typography>
									</span>
								)}
							</div>
						</div>
					</Card>
				</div>
			)}
		</Draggable>
	);
}

export default TaskBoardCard;
