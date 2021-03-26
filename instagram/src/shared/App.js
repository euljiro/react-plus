import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { Grid } from "../elements";
import PostList from "../pages/PostList";
import Post from "../components/Post";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Header from "../components/Header";
import "./App.css";

function App() {
    return (
        <Grid>
            <Header></Header>
            <BrowserRouter>
                <Route path="/" exact component={PostList} />
                <Route path="/login" exact component={Login} />
                <Route path="/signup" exact component={Signup} />
                <Route path="/" exact component={Post} />
            </BrowserRouter>
        </Grid>
    );
}

export default App;
