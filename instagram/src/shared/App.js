import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { Grid } from "../elements";
import PostList from "../pages/PostList";
import Post from "../components/Post";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Header from "../components/Header";
import "./App.css";
import { history } from "../redux/configureStore";
import { ConnectedRouter } from "connected-react-router";

function App() {
    return (
        <Grid>
            <Header></Header>
            <ConnectedRouter history={history}>
                <Route path="/" exact component={PostList} />
                <Route path="/login" exact component={Login} />
                <Route path="/signup" exact component={Signup} />
                <Route path="/" exact component={Post} />
            </ConnectedRouter>
        </Grid>
    );
}

export default App;
