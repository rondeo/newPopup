import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Checkbox from "@material-ui/core/Checkbox";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import { fontSize } from "@material-ui/system";

const useStyles = makeStyles(theme => ({
    root: {
        margin: "auto"
    },
    paper: {
        width: 110,
        height: 190,
        overflow: "auto",
        padding: 0
    },
    button: {
        minWidth: "2em !important",
        padding: 0,
        margin: "0",
        marginBottom: "0.5em !important"
    },
    ListItemIcon: {
        minWidth: "16px !important"
    },
    checkBox: {
        margin: "0 4px",
        padding: "0",
        width: "16px !important",
        height: "16px !important",
        fontSize: "12px !important"
    }
}));

function not(a, b) {
    return a.filter(value => b.indexOf(value) === -1);
}

function intersection(a, b) {
    return a.filter(value => b.indexOf(value) !== -1);
}




export default function TransferList() {
    const classes = useStyles();
    const [checked, setChecked] = React.useState([]);
    const [left, setLeft] = React.useState([
        "EUR/USD",
        "GBP/USD",
        "AUD/USD",
        "CAD/USD"
    ]);
    const [right, setRight] = React.useState([
        "USD/JPY",
        "USD/RUB",
        "XAU/USD",
        "XAG/USD",
        "GBP/CAD",
        "SEK/USD",
        "TRY/USD",
        "CHY/USD",
        "AMZ/USD",
        "GBP/JPY",
        "AUD/JPY",
        "NZD/JPY",
    ]);

    const leftChecked = intersection(checked, left);
    const rightChecked = intersection(checked, right);

    const handleToggle = value => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setChecked(newChecked);
    };

    const handleAllRight = () => {
        setRight(right.concat(left));
        setLeft([]);
    };

    const handleCheckedRight = () => {
        setRight(right.concat(leftChecked));
        setLeft(not(left, leftChecked));
        setChecked(not(checked, leftChecked));
    };

    const handleCheckedLeft = () => {
        setLeft(left.concat(rightChecked));
        setRight(not(right, rightChecked));
        setChecked(not(checked, rightChecked));
    };

    const handleAllLeft = () => {
        setLeft(left.concat(right));
        setRight([]);
    };

    const customList = items => (
        <Paper className={classes.paper}>
            <List dense component="div" role="list">
                {items.map(value => {
                    const labelId = `transfer-list-item-${value}-label`;

                    return (
                        <ListItem
                            key={value}
                            role="listitem"
                            button
                            onClick={handleToggle(value)}
                            style={{
                                margin: "0",
                                padding: "0",
                                fontSize: "12px !important"
                            }}
                        >
                            <ListItemIcon className={classes.ListItemIcon}>
                                <Checkbox
                                    checked={checked.indexOf(value) !== -1}
                                    tabIndex={-1}
                                    disableRipple
                                    inputProps={{ "aria-labelledby": labelId }}
                                    className={classes.checkBox}
                                />
                            </ListItemIcon>
                            <ListItemText
                                style={{
                                    margin: "0",
                                    padding: "0",
                                    fontSize: "12px !important"
                                }}
                                id={labelId}
                                primary={value}
                            />
                        </ListItem>
                    );
                })}
                <ListItem />
            </List>
        </Paper>
    );

    return (
        <Grid
            container
            spacing={2}
            justify="center"
            alignItems="center"
            className={classes.root}
        >
            <Grid item>
                <span>отображаются</span>
                {customList(left)}
            </Grid>
            <Grid item>
                <Grid container direction="column" alignItems="center">
                    <Button
                        variant="outlined"
                        size="small"
                        className={classes.button}
                        onClick={handleAllRight}
                        disabled={left.length === 0}
                        aria-label="move all right"
                    >
                        ≫
                    </Button>
                    <Button
                        variant="outlined"
                        size="small"
                        className={classes.button}
                        onClick={handleCheckedRight}
                        disabled={leftChecked.length === 0}
                        aria-label="move selected right"
                    >
                        &gt;
                    </Button>
                    <Button
                        variant="outlined"
                        size="small"
                        className={classes.button}
                        onClick={handleCheckedLeft}
                        disabled={rightChecked.length === 0}
                        aria-label="move selected left"
                    >
                        &lt;
                    </Button>
                    <Button
                        variant="outlined"
                        size="small"
                        className={classes.button}
                        onClick={handleAllLeft}
                        disabled={right.length === 0}
                        aria-label="move all left"
                    >
                        ≪
                    </Button>
                </Grid>
            </Grid>
            <Grid item>
                <span>не отображаются</span>
                {customList(right)}
            </Grid>
        </Grid>
    );
}
