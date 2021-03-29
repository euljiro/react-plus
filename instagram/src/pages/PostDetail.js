import React from "react";
import PostList from "./PostList";
import CommentList from "../components/CommentList";
import CommentWrite from "../components/CommentWrite";

const PostDetail = (props) => {
    return (
        <React.Fragment>
            <PostList />
            <CommentWrite />
            <CommentList />
        </React.Fragment>
    );
};

export default PostDetail;
