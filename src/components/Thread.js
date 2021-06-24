import React, { useEffect, useState } from "react";
import { firestore } from "../firebase/config";
import Navbar from "./Navbar";
import { useParams } from "react-router";
import dateFormat from "./DateFormat";

const Thread = (props) => {
    const { id } = useParams();
    const [thread, setThread] = useState(null);
    const [facultyReplies, setFacultyReplies] = useState([]);
    const [studentReplies, setStudentReplies] = useState([]);
    const threadsRef = firestore.collection("threads");

    useEffect(() => {
        threadsRef.doc(id).onSnapshot(async (snap) => {
            const data = snap.data();
            setThread(data);

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
            {thread && (
                <div className="thread">
                    <div className="query">
                        <h1>{thread.query}</h1>
                        <h4>{thread.description}</h4>
                    </div>
                    <hr />
                    <div className="facultyResponses">
                        {facultyReplies.map((reply) => {
                            return (
                                <div>
                                    <p>{reply.content}</p>
                                    <p>{"replied by " + reply.facultyName}</p>
                                    <p>
                                        {dateFormat(reply.timestamp.toDate())}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                    <div className="studentResponses">
                        {studentReplies.map((reply) => {
                            return (
                                <div>
                                    <p>{reply.content}</p>
                                    <p>{"replied by " + reply.studentName}</p>
                                    <p>{reply.timestamp.toDate().toString()}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}{" "}
        </div>
    );
};

export default Thread;
