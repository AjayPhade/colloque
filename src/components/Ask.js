import React from "react";
import { TextField } from "@material-ui/core";
import Switch from "@material-ui/core/Switch";
import Autocomplete from "@material-ui/lab/Autocomplete";

import { auth, firestore } from "../firebase/config";

import Navbar from "./Navbar";
import { Button } from "@material-ui/core";

function Ask() {
    return (
        <div>
            <Navbar />
            <form className="askForm">
                <TextField
                    fullWidth
                    id="query"
                    label="Query Title"
                    variant="outlined"
                    margin="normal"
                />

                <TextField
                    id="description"
                    label="Query Description"
                    multiline
                    fullWidth
                    rows={8}
                    variant="outlined"
                    margin="normal"
                />
                <Autocomplete
                    id="subject"
                    options={[{ subject: "Data Structures" }]}
                    fullWidth
                    getOptionLabel={(option) => option.subject}
                    style={{ width: 300 }}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            margin="normal"
                            fullWidth
                            label="Subject"
                            variant="outlined"
                        />
                    )}
                />
                <p>
                    Post Anonymously <Switch color="primary" />
                </p>
                <Button color="primary" variant="contained">
                    Post
                </Button>
            </form>
        </div>
    );
}

export default Ask;
