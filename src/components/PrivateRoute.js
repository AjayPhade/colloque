import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { AuthContext } from "./Auth";
import Loading from "./Loading";
import EmailVerify from "./EmailVerify";

const PrivateRoute = ({ component: RouteComponent, ...rest }) => {
    const { currentUser } = useContext(AuthContext);

    if (currentUser === "") return <Loading />;

    return (
        <Route
            {...rest}
            render={(routeProps) =>
                !!currentUser ? (
                    currentUser.emailVerified ? (
                        <RouteComponent {...routeProps} />
                    ) : (
                        <EmailVerify />
                    )
                ) : (
                    <Redirect to={"/login"} />
                )
            }
        />
    );
};

export default PrivateRoute;
