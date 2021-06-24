import React from "react";

import Navbar from "./Navbar";
import Feed from "./Feed";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    margin: {
        margin: theme.spacing(1),
    },
    bottom: {
        position: "fixed",
        bottom: theme.spacing(5),
        right: theme.spacing(5),
    },
    extendedIcon: {
        marginRight: theme.spacing(1),
    },
}));
const Home = () => {
    const classes = useStyles();
    return (
        <div>
            <Navbar />
            <Feed />
            <Fab color="primary" aria-label="add" className={classes.bottom}>
                <AddIcon />
            </Fab>
        </div>
    );
};

export default Home;
