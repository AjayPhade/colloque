import React from "react";
import loading from "../images/loading.gif";

const Loading = () => {
    return (
        <div className="loader">
            <img src={loading} />
        </div>
    );
};

export default Loading;
