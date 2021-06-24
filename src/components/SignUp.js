import React, { useState, useContext } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { FormControl, InputLabel, Select, MenuItem } from "@material-ui/core";

import { NavLink, Redirect } from "react-router-dom";
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
}));

const SignUp = ({ history }) => {
    const classes = useStyles();

    const [user, setUser] = useState({
        email: "",
        password: "",
        name: "",
        department: "CSE",
        year: 1,
        course: "",
        role: "student",
        threads: [],
        strikes: 0,
    });

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        await auth.signUp(user);
        history.push("/");
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
                                    <MenuItem value={"Civil"}>Civil</MenuItem>
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
                    </Grid>
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
};

export default withRouter(SignUp);
