import React, { useEffect, useState } from "react";
import { firestore } from "../firebase/config";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Chip from "@material-ui/core/Chip";

import { withRouter } from "react-router";

const useStyles = makeStyles((theme) => ({
    root: {
        width: "90%",
        marginRight: "auto",
        marginLeft: "auto",
        textAlign: "center",
        backgroundColor: theme.palette.background.paper,
    },
}));
const Feed = ({ history }) => {
    const threadsRef = firestore.collection("threads");
    const [threads, setThreads] = useState([]);

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

            setThreads(items);
        });
    }, [threadsRef]);

    const classes = useStyles();

    const openThread = (thread) => {
        history.push("/thread/" + thread.id);
    };

    return (
        <div>
            <List component="nav" className={classes.root} aria-label="threads">
                {threads.map((thread) => {
                    return (
                        thread.isVerified && (
                            <ListItem
                                button
                                divider
                                alignItems="flex-start"
                                onClick={() => {
                                    openThread(thread);
                                }}
                            >
                                <ListItemText
                                    primary={thread.query}
                                    secondary={
                                        <div>
                                            <p>
                                                asked by{" "}
                                                {thread.anonymous
                                                    ? "Anonymous"
                                                    : thread.studentName}
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
        </div>
    );
};

export default withRouter(Feed);
