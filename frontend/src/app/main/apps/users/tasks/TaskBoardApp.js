import withReducer from 'app/store/withReducer';
import { useState } from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import withRouter from '@fuse/core/withRouter';
import { useDeepCompareEffect } from '@fuse/hooks';
import FusePageSimple from '@fuse/core/FusePageSimple';
import useThemeMediaQuery from '@fuse/hooks/useThemeMediaQuery';
import reducer from './store';
// import TaskBoardDialog from './TaskBoardDialog';
import TaskBoardList from './TaskBoardList';
import TaskBoardHeader from './TaskBoardHeader';
import { reorderCard, reorderList, resetBoard, getBoard, setBoardSearchText, resetBoardSearchText } from './store/boardSlice';
import ReviewDialog from 'src/app/main/apps/tools/review/ReviewDialog';
import { getPriorities } from 'src/app/main/apps/utilities/priorities/store/prioritiesSlice';
import { getAccounts } from 'src/app/main/apps/users/accounts/store/accountsSlice';
import { getStatuses } from 'src/app/main/apps/utilities/statuses/store/statusesSlice';

function TaskBoardApp(props) {
	const dispatch = useDispatch();
	const routeParams = useParams();
	const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));
	const project = routeParams?.project || null

	const userId = useSelector(({ user }) => user.username)
	const board = useSelector(({ taskBoardApp }) => taskBoardApp.board);
	const reviewDialog = useSelector(({ taskBoardApp }) => taskBoardApp.review.reviewDialog);
	const statuses = useSelector(({ taskBoardApp }) => taskBoardApp.status.entities);

	useDeepCompareEffect(() => {
		dispatch(getAccounts(routeParams));
		dispatch(getPriorities(routeParams));
		dispatch(getStatuses(routeParams));

		const params = {
			userId: userId
		}

		if (project) params.project = project;

		userId && dispatch(getBoard(params));

		return () => {
			dispatch(resetBoard());
		};
	}, [project, routeParams, userId]);

	function onDragEnd(result) {
		const { source, destination } = result;

		// dropped nowhere
		if (!destination) {
			return;
		}

		// did not move anywhere - can bail early
		if (source.droppableId === destination.droppableId && source.index === destination.index) {
			return;
		}

		// reordering list
		if (result.type === 'list') {
			dispatch(reorderList(result));
		}

		// reordering card
		if (result.type === 'card') {
			dispatch(reorderCard(result));
		}
	}

	if (!board) {
		return null;
	}

	return (
		<>
			<FusePageSimple
				header={<TaskBoardHeader project={project} />}
				content={
					<>
						{board?.lists && (
							<div className="flex flex-1 overflow-x-auto overflow-y-hidden h-full">
								<DragDropContext onDragEnd={onDragEnd}>
									<Droppable droppableId="list" type="list" direction="horizontal">
										{(provided) => (
											<div ref={provided.innerRef} className="flex py-16 md:py-24 px-8 md:px-12">
												{board?.lists.map((list, index) => (
													<TaskBoardList
														key={list.id}
														list={list}
														index={index}
													/>
												))}

												{provided.placeholder}

											</div>
										)}
									</Droppable>
								</DragDropContext>
							</div>
						)}
					</>
				}
				scroll={isMobile ? 'normal' : 'content'}
			/>
			<ReviewDialog
				reviewDialog={reviewDialog}
				statuses={statuses}
			/>
		</>
	);
}

export default withReducer('taskBoardApp', reducer)(withRouter(TaskBoardApp));


