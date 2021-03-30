import React from "react";

import { BrowserRouter, Route, Switch, withRouter } from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";
import { history } from "../redux/configureStore";

import { Grid, Button, FaButton } from "../elements";
import Permit from "./Permit";
import PostList from "../pages/PostList";
import PostWrite from "../pages/PostWrite";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Header from "../components/Header";
import Search from "./Search";
import Notification from "../pages/Notification";
import "./App.css";

import { useDispatch, useSelector } from "react-redux";
import { actionCreators as userActions } from "../redux/modules/user";
import { apiKey } from "./firebase";
import PostDetail from "../pages/PostDetail";

function App() {
    const dispatch = useDispatch();
    const _session_key = `firebase:authUser:${apiKey}:[DEFAULT]`;
    const is_session = sessionStorage.getItem(_session_key) ? true : false;
    React.useEffect(() => {
        if (is_session) {
            dispatch(userActions.loginCheckFB());
        }
    }, []);

    const user_info = useSelector((state) => state.user.user);
    const is_login = sessionStorage.getItem(_session_key);

    if (is_login) {
        return (
            <div>
                <Grid>
                    <Header></Header>
                    <ConnectedRouter history={history}>
                        <Route path="/" exact component={PostList} />
                        <Route path="/login" exact component={Login} />
                        <Route path="/signup" exact component={Signup} />
                        <Route path="/detail" exact component={PostDetail} />
                        <Route path="/search" exact component={Search} />
                        <Route path="/noti" exact component={Notification} />
                        <Switch>
                            <Route
                                path="/"
                                exact
                                render={(props) => (
                                    <div>
                                        <FaButton /*history={this.props.history}*/ />
                                    </div>
                                )}
                            />
                            <Route path="/post/:id" component={PostWrite} />
                        </Switch>
                    </ConnectedRouter>
                </Grid>
            </div>
        );
    } else {
        return (
            <div>
                <Grid>
                    <Header></Header>
                    <ConnectedRouter history={history}>
                        <Route path="/" exact component={PostList} />
                        <Route path="/login" exact component={Login} />
                        <Route path="/signup" exact component={Signup} />
                    </ConnectedRouter>
                </Grid>
            </div>
        );
    }
}

export default withRouter(App);
