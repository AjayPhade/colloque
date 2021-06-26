import React, { useState, useContext, useEffect } from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { FormControl, InputLabel, Select, MenuItem } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Chip from "@material-ui/core/Chip";
import Paper from "@material-ui/core/Paper";

import { getSubjects } from "../firebase/firestore";

import { NavLink, Redirect, useLocation } from "react-router-dom";
import { withRouter } from "react-router";

import * as auth from "../firebase/auth";
import { AuthContext } from "./Auth";
import Loading from "./Loading";

const useStyles = makeStyles((theme) => ({
    paper: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    avatar: {
        margin: theme.spacing(1),
        width: "150px",
    },
    form: {
        width: "100%", // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    root: {
        display: "flex",
        justifyContent: "center",
        flexWrap: "wrap",
        listStyle: "none",
        padding: theme.spacing(0.5),
        margin: 0,
    },
    chip: {
        margin: theme.spacing(0.5),
    },
}));

// A custom hook that builds on useLocation to parse
// the query string for you.
function useQuery() {
    return new URLSearchParams(useLocation().search);
}

function SignUp({ history }) {
    const classes = useStyles();
    const query = useQuery();
    const type = query.get("type");

    const [user, setUser] = useState({
        email: "",
        password: "",
        name: "",
        department: "CSE",
        year: 1,
        course: "",
        role: "student",
        threads: [],
        replies: [],
        strikes: 0,
        votes: [],
    });

    const [subjects, setSubjects] = useState([]);

    useEffect(async () => {
        setSubjects(
            await getSubjects({ type: "faculty", department: user.department })
        );
    }, []);

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await auth.signUp(user, type, checkedSubjects);
        history.push("/");
    };

    const [checkedSubjects, setCheckedSubjects] = useState([]);

    const addSubjectChip = (subject) => {
        if (!checkedSubjects.includes(subject))
            setCheckedSubjects([...checkedSubjects, subject]);
    };

    const handleDelete = (subjectToDelete) => () => {
        setCheckedSubjects((subjects) =>
            subjects.filter((subject) => subject !== subjectToDelete)
        );
    };

    const { currentUser } = useContext(AuthContext);

    if (currentUser) return <Redirect to="/" />;

    if (currentUser === "") return <Loading />;

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <img className={classes.avatar} src="./logo.png" />
                <form className={classes.form} noValidate>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                autoComplete="name"
                                name="name"
                                variant="outlined"
                                required
                                fullWidth
                                id="name"
                                label="Name"
                                autoFocus
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                onChange={handleChange}
                            />
                        </Grid>

                        {type !== "faculty" ? (
                            <Grid item xs={6}>
                                <FormControl variant="outlined" fullWidth>
                                    <InputLabel id="department">
                                        Department
                                    </InputLabel>
                                    <Select
                                        labelId="department"
                                        name="department"
                                        label="Department"
                                        fullWidth
                                        value={user.department}
                                        onChange={handleChange}
                                    >
                                        <MenuItem value={"CSE"}>
                                            Computer Science
                                        </MenuItem>
                                        <MenuItem value={"MECH"}>
                                            Mechanical
                                        </MenuItem>
                                        <MenuItem value={"Civil"}>
                                            Civil
                                        </MenuItem>
                                        <MenuItem value={"IT"}>
                                            Information Technology
                                        </MenuItem>
                                        <MenuItem value={"ELN"}>
                                            Electronics
                                        </MenuItem>
                                        <MenuItem value={"ENTC"}>
                                            Electronics and Telecommunications
                                        </MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                        ) : (
                            <Grid item xs={12}>
                                <FormControl variant="outlined" fullWidth>
                                    <InputLabel id="department">
                                        Department
                                    </InputLabel>
                                    <Select
                                        labelId="department"
                                        name="department"
                                        label="Department"
                                        fullWidth
                                        value={user.department}
                                        onChange={handleChange}
                                    >
                                        <MenuItem value={"CSE"}>
                                            Computer Science
                                        </MenuItem>
                                        <MenuItem value={"MECH"}>
                                            Mechanical
                                        </MenuItem>
                                        <MenuItem value={"Civil"}>
                                            Civil
                                        </MenuItem>
                                        <MenuItem value={"IT"}>
                                            Information Technology
                                        </MenuItem>
                                        <MenuItem value={"ELN"}>
                                            Electronics
                                        </MenuItem>
                                        <MenuItem value={"ENTC"}>
                                            Electronics and Telecommunications
                                        </MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                        )}

                        {type !== "faculty" && (
                            <Grid item xs={6}>
                                <FormControl variant="outlined" fullWidth>
                                    <InputLabel id="year">Year</InputLabel>
                                    <Select
                                        labelId="year"
                                        name="year"
                                        label="Year"
                                        fullWidth
                                        value={user.year}
                                        onChange={handleChange}
                                    >
                                        <MenuItem value={1}>First</MenuItem>
                                        <MenuItem value={2}>Second</MenuItem>
                                        <MenuItem value={3}>Third</MenuItem>
                                        <MenuItem value={4}>Fourth</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                        )}
                    </Grid>

                    {/* To select the subjects taught by faculty */}
                    {type === "faculty" && (
                        <div>
                            <Autocomplete
                                id="subject"
                                options={subjects}
                                fullWidth
                                onChange={(event, value) => {
                                    if (value) addSubjectChip(value);
                                }}
                                getOptionLabel={(option) => option}
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
                            <Paper component="ul" className={classes.root}>
                                {checkedSubjects.map((subject, index) => {
                                    let icon;

                                    return (
                                        <li key={index}>
                                            <Chip
                                                icon={icon}
                                                label={subject}
                                                onDelete={handleDelete(subject)}
                                                className={classes.chip}
                                            />
                                        </li>
                                    );
                                })}
                            </Paper>
                        </div>
                    )}

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={handleSubmit}
                    >
                        Sign Up
                    </Button>
                    <Grid container justify="flex-end">
                        <Grid item>
                            <NavLink to="/login">
                                Already have an account? Sign in
                            </NavLink>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </Container>
    );
}

export default withRouter(SignUp);
