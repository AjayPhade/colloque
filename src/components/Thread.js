import React from "react";
import { firestore } from "./firebase/config";

const Thread = (props) => {
    return (
        <div className="thread">
            <div className="query">
                <h2>{props.query}</h2>
                <h4>{props.desc}</h4>
            </div>
            <hr />
            <div className="facultyResponses">
                {props.facultyRespnses.map((facultyRespnse) => {})}
            </div>
            <div className="studentResponses">
                {props.facultyRespnses.map((facultyRespnse) => {})}
            </div>
        </div>
    );
};

export default thread;
