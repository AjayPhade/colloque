import React, { useEffect, useState } from "react";
import { firestore } from "../firebase/config";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Chip from "@material-ui/core/Chip";

const useStyles = makeStyles((theme) => ({
    root: {
        width: "90%",
        marginRight: "auto",
        marginLeft: "auto",
        textAlign: "center",
        backgroundColor: theme.palette.background.paper,
    },
}));
const Feed = () => {
    const threadsRef = firestore.collection("threads");
    const [threads, setThreads] = useState([]);

    useEffect(() => {
        threadsRef.onSnapshot((snap) => {
            const items = [];

            snap.forEach(async (thread) => {
                thread = thread.data();

                await thread.postedBy.get().then((res) => {
                    thread = { ...thread, studentName: res.data().name };
                });

                console.log("threadddddddd:", thread);
                items.push(thread);
            });

            console.log("Items:", items);
            setThreads(items);
        });
    }, []);

    const classes = useStyles();

    return (
        <div>
            <List component="nav" className={classes.root} aria-label="threads">
                {threads.map((thread) => {
                    console.log("Thread", thread, thread.studentName);
                    return (
                        <ListItem button divider alignItems="flex-start">
                            <ListItemText
                                primary={thread.query}
                                secondary={
                                    <div>
                                        asked by {thread.studentName}
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
                    );
                })}
            </List>
        </div>
    );
};

export default Feed;
