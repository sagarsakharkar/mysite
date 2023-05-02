import Card from '@mui/material/Card';
import { styled } from '@mui/styles';
import FuseUtils from '@fuse/utils';
import CardContent from '@mui/material/CardContent';
import clsx from 'clsx';
import { useRef, useState, useEffect } from 'react';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import { useSelector } from 'react-redux';
import TaskBoardCard from './TaskBoardCard';
import TaskBoardListHeader from './TaskBoardListHeader';
import { selectBoardsSearchText } from './store/boardsSlice';

const StyledCard = styled(Card)(({ theme }) => ({
	transitionProperty: 'box-shadow',
	transitionDuration: theme.transitions.duration.short,
	transitionTimingFunction: theme.transitions.easing.easeInOut,
}));

function BoardList(props) {
	const contentScrollEl = useRef(null);
	const board = useSelector(({ taskBoardApp }) => taskBoardApp.board);
	const searchText = useSelector(selectBoardsSearchText);
	const cards = props.list.idCards
	const [filteredData, setFilteredData] = useState([]);

	function handleCardAdded() {
		contentScrollEl.current.scrollTop = contentScrollEl.current.scrollHeight;
	}

	useEffect(() => {
		function getFilteredArray(entities, _searchText) {
			if (_searchText.length === 0) {
				return cards;
			}
			return FuseUtils.filterArrayByString(cards, _searchText);
		}

		if (cards) {
			setFilteredData(getFilteredArray(cards, searchText));
		}
	}, [cards, searchText]);

	function handleCardAdded() {
		contentScrollEl.current.scrollTop = contentScrollEl.current.scrollHeight;
	}


	return (
		<Draggable draggableId={props.list.id} index={props.index} type="list">
			{(provided, snapshot) => (
				<div ref={provided.innerRef} {...provided.draggableProps}>
					<StyledCard
						sx={{
							backgroundColor: (theme) => theme.palette.background.default,
						}}
						className={clsx(
							snapshot.isDragging ? 'shadow-lg' : 'shadow-0',
							'w-256 sm:w-360 mx-8 max-h-full flex flex-col rounded-xl border'
						)}
						square
					>
						<TaskBoardListHeader
							list={props.list}
							// cardIds={props.list.idCards}
							className="border-b-1"
							handleProps={provided.dragHandleProps}
						/>

						<>
							<CardContent
								className="flex flex-col flex-1 flex-auto h-full min-h-0 w-full p-0 overflow-auto"
								ref={contentScrollEl}
							>
								<Droppable droppableId={props.list.id} type="card" direction="vertical">
									{(_provided) => (
										<div
											ref={_provided.innerRef}
											className="flex flex-col w-full h-full px-12 min-h-1"
										>
											{filteredData.map((card, index) => (
												<TaskBoardCard
													key={card.id}
													card={card}
													index={index}
													list={props.list}
												/>
											))}
											{_provided.placeholder}
										</div>
									)}
								</Droppable>
							</CardContent>
						</>

						{/* <div className="p-12">
              <BoardAddCard listId={listId} onCardAdded={handleCardAdded} />
            </div> */}
					</StyledCard>
				</div>
			)}
		</Draggable>
	);
}

export default BoardList;
