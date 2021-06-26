import React from "react";
import { useState } from "react";

import {
    Box,
    Button,
    Card,
    CardContent,
    CardHeader,
    Divider,
    Grid,
    TextField,
} from "@material-ui/core";

import Navbar from "./Navbar";

import { auth } from "../firebase/config";

function MyProfile(props) {
    const [user, setUser] = useState({
        name: auth.currentUser.displayName,
        email: auth.currentUser.email,
        department: "",
        year: "",
        role: "",
    });

    const handleChange = (event) => {
        setUser({
            ...user,
            [event.target.name]: event.target.value,
        });
    };

    return (
        <div>
            <Navbar />
            <form autoComplete="off" noValidate {...props}>
                <Card variant="outlined">
                    <CardHeader
                        // subheader="Edit Profile"
                        title="My Profile"
                    />
                    <Divider />
                    <CardContent>
                        <Grid container spacing={3}>
                            <Grid item md={6} xs={12}>
                                <TextField
                                    fullWidth
                                    label="Name"
                                    name="name"
                                    onChange={handleChange}
                                    value={user.name}
                                    variant="outlined"
                                    InputProps={{ readOnly: true }}
                                />
                            </Grid>
                            <Grid item md={6} xs={12}>
                                <TextField
                                    fullWidth
                                    label="Email Address"
                                    name="email"
                                    onChange={handleChange}
                                    value={user.email}
                                    variant="outlined"
                                    InputProps={{ readOnly: true }}
                                />
                            </Grid>
                            <Grid item md={6} xs={12}>
                                <TextField
                                    fullWidth
                                    label="Department"
                                    name="department"
                                    onChange={handleChange}
                                    value={user.department}
                                    variant="outlined"
                                    InputProps={{ readOnly: true }}
                                />
                            </Grid>
                            <Grid item md={6} xs={12}>
                                <TextField
                                    fullWidth
                                    label="Year"
                                    name="year"
                                    onChange={handleChange}
                                    value={user.year}
                                    variant="outlined"
                                    InputProps={{ readOnly: true }}
                                />
                            </Grid>
                            <Grid item md={6} xs={12}>
                                <TextField
                                    fullWidth
                                    label="Role"
                                    name="role"
                                    onChange={handleChange}
                                    value={user.role}
                                    variant="outlined"
                                    disabled
                                />
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            </form>
        </div>
    );
}

export default MyProfile;
