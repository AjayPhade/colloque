import React, { useState, useEffect } from "react";
import { TextField } from "@material-ui/core";
import Switch from "@material-ui/core/Switch";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { addThread, getSubjects } from "../firebase/firestore";
import { auth, firestore } from "../firebase/config";

import Navbar from "./Navbar";
import { Button } from "@material-ui/core";

function Ask() {
    const [thread, setThread] = useState({
        query: "",
        description: "",
        anonymous: false,
        facultyReplies: [],
        studentReplies: [],
        timestamp: null,
        isOpen: true,
        isVerified: true,
        postedBy: null,
        subject: "",
    });

    const [subjects, setSubjects] = useState([]);

    useEffect(async () => {
        setSubjects(await getSubjects(null));
    }, []);

    const handleChange = (e) => {
        if (e.target.name === "anonymous")
            setThread({ ...thread, [e.target.name]: e.target.checked });
        else setThread({ ...thread, [e.target.name]: e.target.value });
    };

    return (
        <div>
            <Navbar />
            <form className="askForm">
                <TextField
                    fullWidth
                    onChange={handleChange}
                    id="query"
                    name="query"
                    label="Query Title"
                    variant="outlined"
                    margin="normal"
                />

                <TextField
                    name="description"
                    id="description"
                    label="Query Description"
                    multiline
                    onChange={handleChange}
                    fullWidth
                    rows={8}
                    variant="outlined"
                    margin="normal"
                />
                <Autocomplete
                    id="subject"
                    options={subjects}
                    fullWidth
                    onChange={(event, value) => {
                        if (value) setThread({ ...thread, subject: value });
                        else setThread({ ...thread, subject: "" });
                    }}
                    getOptionLabel={(option) => option}
                    style={{ width: 300 }}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            margin="normal"
                            name="subject"
                            fullWidth
                            label="Subject"
                            variant="outlined"
                        />
                    )}
                />
                <p>
                    Post Anonymously{" "}
                    <Switch
                        name="anonymous"
                        onChange={handleChange}
                        color="primary"
                    />
                </p>
                <Button
                    color="primary"
                    variant="contained"
                    onClick={() => {
                        addThread(thread);
                    }}
                >
                    Post
                </Button>
            </form>
        </div>
    );
}

export default Ask;
