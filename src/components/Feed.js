import React, { useEffect, useState, useContext } from "react";
import { firestore } from "../firebase/config";
import { fade, makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Chip from "@material-ui/core/Chip";
import { Button } from "@material-ui/core";
import InputBase from "@material-ui/core/InputBase";
import { TextField } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";

import FilterListIcon from "@material-ui/icons/FilterList";
import SearchIcon from "@material-ui/icons/Search";

import { withRouter } from "react-router";
import { AuthContext } from "./Auth";

import { getSubjects } from "../firebase/firestore";
import dateFormat from "./DateFormat";

const useStyles = makeStyles((theme) => ({
    root: {
        width: "90%",
        marginRight: "auto",
        marginLeft: "auto",
        textAlign: "center",
        backgroundColor: theme.palette.background.paper,
    },
    filter: {
        width: "100%",
        marginLeft: "3.3%",
        marginTop: "2%",
    },
    search: {
        position: "relative",
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        "&:hover": {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginLeft: 0,
        width: "100%",
        [theme.breakpoints.up("sm")]: {
            marginLeft: theme.spacing(1),
            width: "auto",
        },
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: "100%",
        position: "absolute",
        pointerEvents: "none",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    inputRoot: {
        color: "inherit",
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create("width"),
        width: "100%",
        [theme.breakpoints.up("sm")]: {
            width: "12ch",
            "&:focus": {
                width: "20ch",
            },
        },
    },
}));
const Feed = ({ history }) => {
    const threadsRef = firestore.collection("threads");
    const [threads, setThreads] = useState([]);
    const [filteredThreads, setFilteredThreads] = useState([]);
    const [subjects, setSubjects] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredSubject, setFilteredSubject] = useState("");

    const { currentUser, currentUserDetails } = useContext(AuthContext);

    useEffect(() => {
        threadsRef.onSnapshot(async (snap) => {
            const items = [];

            snap.forEach((thread) => {
                const id = thread.id;
                items.push({ ...thread.data(), id });
            });

            for (const item of items) {
                const student = await item.postedBy.get();
                item.studentName = student.data().name;
            }

            items.reverse();
            setThreads(items);
            setFilteredThreads(items);
            // console.log("threadsRef");
        });
    }, []);

    //get list of subjects to filter
    useEffect(async () => {
        if (currentUserDetails !== "") {
            // console.log(currentUserDetails);
            if (currentUser.photoURL === null) {
                setSubjects(await getSubjects(null));
            } else {
                setSubjects(currentUserDetails.subjects);
            }
        }
    }, [currentUserDetails]);

    const classes = useStyles();

    const openThread = (thread) => {
        history.push("/thread/" + thread.id);
    };

    useEffect(() => {
        filterThreads();
    }, [searchTerm, filteredSubject]);

    const filterThreads = () => {
        let temp = threads.filter((thread) => {
            return (
                thread.query.toLowerCase().includes(searchTerm.toLowerCase()) ||
                thread.description
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase())
            );
        });
        // console.log(temp);
        if (filteredSubject !== "")
            temp = temp.filter((thread) => {
                return thread.subject === filteredSubject;
            });
        setFilteredThreads(temp);
    };

    const filterSubject = (e) => {
        // console.log(e.target.textContent);
        setFilteredSubject(e.target.textContent);
    };

    const changeSearchTerm = (e) => {
        setSearchTerm(e.target.value);
    };

    return (
        <>
            <div className={classes.filter}>
                <div className={classes.search}>
                    <div className={classes.searchIcon}>
                        <SearchIcon />
                    </div>
                    <InputBase
                        placeholder="Search…"
                        classes={{
                            root: classes.inputRoot,
                            input: classes.inputInput,
                        }}
                        inputProps={{ "aria-label": "search" }}
                        onChange={changeSearchTerm}
                    />
                </div>
                <Autocomplete
                    id="subject"
                    options={subjects}
                    fullWidth
                    onChange={filterSubject}
                    getOptionLabel={(option) => option}
                    style={{ width: 300 }}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            margin="normal"
                            name="subject"
                            fullWidth
                            label="Subject"
                            variant="outlined"
                        />
                    )}
                />
            </div>
            <List component="nav" className={classes.root} aria-label="threads">
                {filteredThreads.map((thread) => {
                    return (
                        thread.isVerified && (
                            <ListItem
                                button
                                divider
                                alignItems="flex-start"
                                onClick={() => {
                                    openThread(thread);
                                }}
                                key={thread.id}
                            >
                                <ListItemText
                                    primary={thread.query}
                                    secondary={
                                        <div>
                                            asked by{" "}
                                            {thread.anonymous
                                                ? "Anonymous"
                                                : thread.studentName}
                                            <p style={{ color: "gray" }}>
                                                {dateFormat(
                                                    thread.timestamp.toDate()
                                                )}
                                            </p>
                                            <Chip
                                                style={{
                                                    float: "right",
                                                    marginTop: "-0.4rem",
                                                }}
                                                label={thread.subject}
                                            />
                                        </div>
                                    }
                                />
                            </ListItem>
                        )
                    );
                })}
            </List>
        </>
    );
};

export default withRouter(Feed);
