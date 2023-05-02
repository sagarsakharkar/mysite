import FuseUtils from '@fuse/utils';
import React from 'react';
import { darken, lighten } from '@mui/material/styles';
import { makeStyles, } from '@mui/styles';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { selectEmails, selectEmailById, updateEmailBoard } from './store/emailsSlice';

const useStyles = makeStyles((theme) => ({
    root: {
        margin: 'auto',
    },
    cardHeader: {
        padding: theme.spacing(1, 2),
    },
    list: {
        width: 'auto',
        minWidth: 360,
        height: 450,
        overflow: 'auto',
        backgroundColor: theme.palette.primary.dark,
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

export default function EmailList() {
    const dispatch = useDispatch();
    const classes = useStyles();
    const [checked, setChecked] = React.useState([]);
    const [left, setLeft] = React.useState([]);
    const [toList, setToList] = React.useState([]);
    const [ccList, setCcList] = React.useState([]);

    const leftChecked = intersection(checked, left);
    const toChecked = intersection(checked, toList);
    const ccChecked = intersection(checked, ccList);

    const emailBoard = useSelector(({ emailsApp }) => emailsApp.emails.board);
    const allUsers = useSelector(({ emailsApp }) => emailsApp.accounts.entities)

    const searchText = useSelector(({ emailsApp }) => emailsApp.emails.searchText);

	const [filteredData, setFilteredData] = useState(null);

	useEffect(() => {
		function getFilteredArray(entities, _searchText) {
			if (_searchText.length === 0) {
				return entities;
			}

			return FuseUtils.filterArrayByString([entities], _searchText);
		}

		if (emailBoard) {
			setFilteredData(getFilteredArray(emailBoard, searchText));
		}
	}, [emailBoard, searchText]);

    useEffect(() => {
        const to = []
        const cc = []
        if (allUsers) {
            const all = Object.values(allUsers).map(row => row.email)
            all.length > 0 && dispatch(updateEmailBoard({ all, to, cc }))
        }
    }, [allUsers])

    console.info(filteredData)

    useEffect(() =>{
        if (emailBoard){
            setLeft(emailBoard.all)
            setToList(emailBoard.to)
            setCcList(emailBoard.cc)
        }
    },[emailBoard])

    const handleToggle = (value) => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setChecked(newChecked);
    };

    const numberOfChecked = (items) => intersection(checked, items).length;

    const handleToggleAll = (items) => () => {
        if (numberOfChecked(items) === items.length) {
            setChecked(not(checked, items));
        } else {
            setChecked(union(checked, items));
        }
    };

    const handleCheckedTo = () => {
        const to = toList.concat(leftChecked)
        setToList(to);
        const all = not(left, leftChecked)
        setLeft(all);
        setChecked(not(checked, leftChecked));
        dispatch(updateEmailBoard({ all, to, cc:ccList }))
    };

    const handleCheckedCc = () => {
        const cc = ccList.concat(leftChecked)
        setCcList(cc);
        const all = not(left, leftChecked)
        setLeft(all);
        setChecked(not(checked, leftChecked));
        dispatch(updateEmailBoard({ all, to:toList, cc }))
    };

    const handleCheckedLeft = () => {
        const listToCc = toChecked.concat(ccChecked)
        const all = left.concat(listToCc)
        setLeft(all);
        const to = not(toList, toChecked)
        setToList(to);
        const cc = not(ccList, ccChecked)
        setCcList(cc);
        setChecked(not(checked, listToCc));
        dispatch(updateEmailBoard({ all, to, cc }))
    };

    const customList = (title, items) => (
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
                title={title}
                subheader={`${numberOfChecked(items)}/${items.length} selected`}
            />
            <Divider />
            <List className={classes.list} dense component="div" role="list">
                {items.map((value) => {
                    const labelId = `transfer-list-all-item-${value}-label`;

                    return (
                        <ListItem key={value} role="listitem" onClick={handleToggle(value)}>
                            <ListItemIcon>
                                <Checkbox
                                    checked={checked.indexOf(value) !== -1}
                                    tabIndex={-1}
                                    disableRipple
                                    inputProps={{ 'aria-labelledby': labelId }}
                                />
                            </ListItemIcon>
                            <ListItemText id={labelId} primary={value} />
                        </ListItem>
                    );
                })}
                <ListItem />
            </List>
        </Card>
    );

    return (
        <Grid
            container
            spacing={2}
            justifyContent="center"
            alignItems="center"
            className={classes.root}
        >
            <Grid item>{customList('All Users', left)}</Grid>
            <Grid item>
                <Grid container direction="column" alignItems="center">
                    <Button
                        variant="outlined"
                        size="small"
                        className={classes.button}
                        onClick={handleCheckedTo}
                        disabled={leftChecked.length === 0}
                        aria-label="move selected To List"
                    >
                        To
                    </Button>
                    <Button
                        variant="outlined"
                        size="small"
                        className={classes.button}
                        onClick={handleCheckedCc}
                        disabled={leftChecked.length === 0}
                        aria-label="move selected CC List"
                    >
                        CC
                    </Button>
                    <Button
                        variant="outlined"
                        size="small"
                        className={classes.button}
                        onClick={handleCheckedLeft}
                        disabled={toChecked.length === 0 && ccChecked.length == 0}
                        aria-label="move selected All Users"
                    >
                        &lt;
                    </Button>
                </Grid>
            </Grid>
            <Grid item>{customList('To List', toList)}</Grid>
            <Grid item>{customList('CC List', ccList)}</Grid>
        </Grid>
    );
}
