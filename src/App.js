import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import { AuthProvider } from "./components/Auth";
import PrivateRoute from "./components/PrivateRoute";
import Home from "./components/Home";
import Thread from "./components/Thread";
import Ask from "./components/Ask";
import MyProfile from "./components/MyProfile";

const App = () => {
    return (
        <AuthProvider>
            <Router>
                <Switch>
                    <Route exact path="/login">
                        <SignIn />
                    </Route>
                    <Route exact path="/signup">
                        <SignUp />
                    </Route>
                    <PrivateRoute exact path="/" component={Home} />
                    <PrivateRoute path="/thread/:id" component={Thread} />
                    <PrivateRoute path="/ask" component={Ask} />
                    <PrivateRoute path="/profile" component={MyProfile} />
                </Switch>
            </Router>
        </AuthProvider>
    );
};

export default App;

//admin pass: admin1234
