import React from "react";
import { auth } from "../firebase/config";

const Home = () => {
    return (
        <div>
            <button onClick={() => auth.signOut()}>Sign Out</button>
        </div>
    );
};

export default Home;
