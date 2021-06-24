import React, { useEffect, useState } from "react";
import { firestore } from "../firebase/config";
import { useParams } from "react-router";

import Navbar from "./Navbar";
import dateFormat from "./DateFormat";
import ThreadReply from "./ThreadReply";

function Thread() {
    const { id } = useParams();
    const [threadPoster, setThreadPoster] = useState(null);
    const [thread, setThread] = useState(null);
    const [facultyReplies, setFacultyReplies] = useState([]);
    const [studentReplies, setStudentReplies] = useState([]);
    const threadsRef = firestore.collection("threads");

    useEffect(() => {
        threadsRef.doc(id).onSnapshot(async (snap) => {
            const data = snap.data();
            setThread(data);

            await data.postedBy.get().then((snap) => {
                setThreadPoster(snap.data());
                console.log(snap.data());
            });

            var items = [];

            data.facultyReplies.forEach((reply) => {
                items.push(reply);
            });

            for (const item of items) {
                const faculty = await item.repliedBy.get();
                console.log(faculty.data());
                item.facultyName = faculty.data().name;
            }
            setFacultyReplies(items);

            items = [];
            data.studentReplies.forEach((reply) => {
                items.push(reply);
            });

            for (const item of items) {
                const student = await item.repliedBy.get();
                console.log(student.data());
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
                                    {threadPoster.name}
                                </p>
                                <p style={{ color: "gray" }}>
                                    {dateFormat(thread.timestamp.toDate())}
                                </p>
                            </div>
                        </div>
                        <p>{thread.description}</p>
                    </div>
                    <hr />
                    <h2>Faculty Replies</h2>
                    <div className="facultyResponses">
                        {facultyReplies.map((reply) => {
                            return (
                                <ThreadReply
                                    content={reply.content}
                                    date={dateFormat(reply.timestamp.toDate())}
                                    name={reply.facultyName}
                                    type={"faculty"}
                                    email={threadPoster.email}
                                />
                            );
                        })}
                    </div>
                    <h2>Student Replies</h2>
                    <div className="studentResponses">
                        {studentReplies.map((reply) => {
                            return (
                                <ThreadReply
                                    content={reply.content}
                                    date={dateFormat(reply.timestamp.toDate())}
                                    name={reply.studentName}
                                    type={"student"}
                                    email={threadPoster.email}
                                />
                            );
                        })}
                    </div>
                </div>
            )}{" "}
        </div>
    );
}

export default Thread;
