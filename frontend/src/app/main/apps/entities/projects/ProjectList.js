import FuseUtils from '@fuse/utils';
import Typography from '@mui/material/Typography';
import React, { useEffect, useState } from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import Box from '@mui/material/Box';
import Icon from '@mui/material/Icon';
import IconButton from '@mui/material/IconButton';
import { useDispatch, useSelector } from 'react-redux';
import { selectProjects, openEditProjectDialog } from './store/projectsSlice';
import history from '@history';

function ProjectList(props) {
	const dispatch = useDispatch();
	// const projects = [];
	// const projects = useSelector(({ auth }) => auth.user.projects);
	const projects = useSelector(selectProjects);
	const searchText = useSelector(({ projectsApp }) => projectsApp.projects.searchText);

	const [filteredData, setFilteredData] = useState(null);

	useEffect(() => {
		function getFilteredArray(entities, _searchText) {
			if (_searchText.length === 0) {
				return entities;
			}
			return FuseUtils.filterArrayByString(entities, _searchText);
		}

		if (projects) {
			setFilteredData(getFilteredArray(projects, searchText));
		}
	}, [projects, searchText]);

	return !filteredData || filteredData.length === 0 ? (
		<div className="flex items-center justify-center w-full h-full">
			<Typography color="textSecondary" variant="h5">
				There are no projects!
			</Typography>
		</div>
	) : (
		<Box sx={{ overflowY: 'scroll' }}>
			<ImageList variant="masonry" cols={4} gap={8} className="p-4">
				{filteredData.map((item) => (
					<ImageListItem key={item.code}>
						<img
							src={item.thumbnail}
							alt={item.code}
							className="w-full rounded-16"
							onClick={() => history.push("/entity/project/" + item.uid + "/overview")}
							srcSet={item.thumbnail}
							loading="lazy"
						/>
						<ImageListItemBar
							title={item.code}
							actionIcon={
								<IconButton
									onClick={ev => dispatch(openEditProjectDialog(item))}
								>
									<Icon className="text-white opacity-75">edit</Icon>
								</IconButton>
							}
						/>
					</ImageListItem>
				))}
			</ImageList>
		</Box>
	);
}

export default ProjectList;
