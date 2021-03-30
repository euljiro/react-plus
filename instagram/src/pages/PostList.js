import React from "react";
import Post from "../components/Post";
import { useSelector, useDispatch } from "react-redux";
import { actionCreators as postActions } from "../redux/modules/post";

const PostList = (props) => {
    const dispatch = useDispatch();
    const post_list = useSelector((state) => state.post.list);

    React.useEffect(() => {
        dispatch(postActions.getPostFB());
        console.log(post_list);
    }, []);

    return (
        <React.Fragment>
            {post_list.map((p, idx) => {
                if (p !== 0) {
                    return <Post key={p} {...p} />;
                }
            })}
        </React.Fragment>
    );
};

export default PostList;
