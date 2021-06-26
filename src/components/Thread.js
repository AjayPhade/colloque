import React, { useEffect, useState } from "react";
import { firestore } from "../firebase/config";
import { useParams } from "react-router";
import { TextField } from "@material-ui/core";
import Switch from "@material-ui/core/Switch";
import { Button } from "@material-ui/core";
import Navbar from "./Navbar";
import dateFormat from "./DateFormat";
import ThreadReply from "./ThreadReply";
import { addReply, decodeText } from "../firebase/firestore";

import { auth } from "../firebase/config";

function Thread() {
    const { id } = useParams();
    const [threadPoster, setThreadPoster] = useState(null);
    const [thread, setThread] = useState(null);
    const [facultyReplies, setFacultyReplies] = useState([]);
    const [studentReplies, setStudentReplies] = useState([]);
    const [reply, setReply] = useState({
        content: "",
        anonymous: false,
        isVerified: true,
        timestamp: null,
        repliedBy: null,
    });

    // console.log(auth.currentUser);
    const type = auth.currentUser.photoURL === null ? "students" : "faculty";

    const handleChange = (e) => {
        if (e.target.name === "anonymous")
            setReply({ ...reply, [e.target.name]: e.target.checked });
        else setReply({ ...reply, [e.target.name]: e.target.value });
    };
    const threadsRef = firestore.collection("threads");
    const closeThread = () => {
        threadsRef
            .doc(id)
            .update({ isOpen: false })
            .catch((error) => console.error(error));
    };

    useEffect(() => {
        threadsRef.doc(id).onSnapshot(async (snap) => {
            const data = snap.data();
            data.description = decodeText(data.description);
            setThread(data);

            await data.postedBy.get().then((snap) => {
                setThreadPoster(snap.data());
            });

            var items = [];

            data.facultyReplies.forEach((reply) => {
                items.push(reply);
            });

            for (const item of items) {
                const faculty = await item.repliedBy.get();
                item.content = decodeText(item.content);
                item.facultyName = faculty.data().name;
            }
            setFacultyReplies(items);

            items = [];
            data.studentReplies.forEach((reply) => {
                items.push(reply);
            });

            for (const item of items) {
                const student = await item.repliedBy.get();
                item.content = decodeText(item.content);
                item.studentName = student.data().name;
            }
            setStudentReplies(items);
        });
    }, []);
    return (
        <div>
            <Navbar />
            {thread && threadPoster && (
                <div className="thread">
                    <div className="query">
                        <div className="queryHead">
                            <h1 color="primary">{thread.query}</h1>
                            <div>
                                <p style={{ color: "gray" }}>
                                    {thread.anonymous
                                        ? "Anonymous"
                                        : threadPoster.name}
                                </p>
                                <p style={{ color: "gray" }}>
                                    {dateFormat(thread.timestamp.toDate())}
                                </p>
                            </div>
                        </div>
                        <p className="threadDesc">{thread.description}</p>
                    </div>
                    <hr />
                    <h2>Faculty Replies</h2>
                    {facultyReplies.length ? (
                        <div className="facultyResponses">
                            {facultyReplies.map((reply) => {
                                return (
                                    <ThreadReply
                                        content={reply.content}
                                        date={dateFormat(
                                            reply.timestamp.toDate()
                                        )}
                                        name={reply.facultyName}
                                        type={"faculty"}
                                        email={threadPoster.email}
                                    />
                                );
                            })}
                        </div>
                    ) : (
                        <div>
                            <h3 className="noreply">No Replies</h3>
                            <hr />
                        </div>
                    )}
                    <h2>Student Replies</h2>
                    {studentReplies.length ? (
                        <div className="studentResponses">
                            {studentReplies.map((reply) => {
                                return (
                                    reply.isVerified && (
                                        <ThreadReply
                                            content={reply.content}
                                            date={dateFormat(
                                                reply.timestamp.toDate()
                                            )}
                                            name={reply.studentName}
                                            type={"student"}
                                            email={threadPoster.email}
                                            anonymous={reply.anonymous}
                                        />
                                    )
                                );
                            })}
                        </div>
                    ) : (
                        <h3 className="noreply">No Replies</h3>
                    )}
                    <hr className="replydivider" />
                    {thread.isOpen ? (
                        <div>
                            <TextField
                                name="content"
                                id="content"
                                label="Add a reply"
                                multiline
                                onChange={handleChange}
                                fullWidth
                                rows={8}
                                variant="outlined"
                                margin="normal"
                            />
                            {type === "students" && (
                                <div>
                                    Reply Anonymously{" "}
                                    <Switch
                                        name="anonymous"
                                        onChange={handleChange}
                                        color="primary"
                                    />
                                </div>
                            )}
                            <Button
                                color="primary"
                                variant="contained"
                                onClick={() => {
                                    addReply(reply, type, id);
                                    document.getElementById("content").value =
                                        "";
                                }}
                            >
                                Reply
                            </Button>
                            {threadPoster.email === auth.currentUser.email && (
                                <Button
                                    color="secondary"
                                    variant="contained"
                                    onClick={closeThread}
                                    style={{ marginLeft: "1rem" }}
                                >
                                    Close Thread
                                </Button>
                            )}
                        </div>
                    ) : (
                        <h3
                            style={{
                                color: "red",
                                textAlign: "center",
                                marginTop: "1rem",
                            }}
                        >
                            Thread Closed
                        </h3>
                    )}
                </div>
            )}{" "}
        </div>
    );
}

export default Thread;
