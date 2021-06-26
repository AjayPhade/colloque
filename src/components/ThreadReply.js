import React from "react";

import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

import { auth } from "../firebase/config";

const useStyles = makeStyles({
    root: {
        minWidth: 275,
    },
    bullet: {
        display: "inline-block",
        margin: "0 2px",
        transform: "scale(0.8)",
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
});

function ThreadReply(props) {
    const classes = useStyles();
    return (
        <Card variant="outlined" className={classes.root + " card"}>
            <CardContent>
                <Typography component="h1">
                    <pre>{props.content}</pre>
                </Typography>
            </CardContent>
            <CardActions className="cardactions">
                <div>
                    <Typography className={classes.title} color="textSecondary">
                        {props.anonymous ? "Anonymous" : props.name}
                    </Typography>
                    <Typography
                        className={classes.title}
                        color="textSecondary"
                        component="p"
                    >
                        {props.date}
                    </Typography>
                </div>
                {props.email === auth.currentUser.email &&
                    props.type === "faculty" && (
                        <Button
                            variant="contained"
                            color="primary"
                            size="small"
                            className="requestCall"
                        >
                            Request Video Call
                        </Button>
                    )}
            </CardActions>
        </Card>
    );
}

export default ThreadReply;
