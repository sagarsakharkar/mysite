import React from 'react';
import { makeStyles } from '@mui/styles';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import IconButton from '@mui/material/IconButton';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  imageList: {
    flexWrap: 'nowrap',
    
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: 'translateZ(0)',
  },
  title: {
    color: theme.palette.primary.light,
  },
  titleBar: {
    background:
      'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
  },
}));

/**
 * The example data is structured as follows:
 *
 * import image from 'path/to/image.jpg';
 * [etc...]
 *
 * const itemData = [
 *   {
 *     img: image,
 *     title: 'Image',
 *     author: 'author',
 *   },
 *   {
 *     [etc...]
 *   },
 * ];
 */
export default function SingleLineImageList(props) {
  const classes = useStyles();
  const itemData = props.itemData

  return (
    <div className={classes.root}>
      <ImageList className={classes.imageList} cols={4}>
        {itemData.map((item) => (
          <ImageListItem key={item.id}>
            {/* <img src={item.url} alt={item.name}/> */}
            <img src={"http://localhost:8000"+item.url} alt={item.name}/>
            <ImageListItemBar
              title={item.name}
              classes={{
                root: classes.titleBar,
                title: classes.title,
              }}
            //   actionIcon={
            //     <IconButton aria-label={`star ${item.name}`}>
            //       <StarBorderIcon className={classes.title} />
            //     </IconButton>
            //   }
            />
          </ImageListItem>
        ))}
      </ImageList>
    </div>
  );
}