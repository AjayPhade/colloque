import React from "react";
import { Button } from "@material-ui/core";
import { auth } from "../firebase/config";

const EmailVerify = () => {
    return (
        <div>
            <Button
                style={{ float: "right" }}
                variant="contained"
                color="secondary"
                onClick={() => auth.signOut()}
            >
                Sign Out
            </Button>

            <div className="emailVerify">
                <img src="./emailverify.png" />
            </div>
        </div>
    );
};

export default EmailVerify;
