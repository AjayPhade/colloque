import React from "react";
import loading from "../images/loading.gif";

const Loading = () => {
    return (
        <div className="loader">
            <img src={loading} alt="Loading" />
        </div>
    );
};

export default Loading;
