import React from "react";
import { Grid } from "../elements";
import Post from "../components/Post";
import { useSelector, useDispatch } from "react-redux";
import { actionCreators as postActions } from "../redux/modules/post";

const PostList = (props) => {
    const dispatch = useDispatch();
    const post_list = useSelector((store) => store.post.list);
    const user_info = useSelector((state) => state.user.user);

    React.useEffect(() => {
        dispatch(postActions.getPostFB());
    }, [dispatch]);

    return (
        <React.Fragment>
            {post_list.map((p, idx) => {
                if (p.user_info.user_id === user_info?.uid) {
                    return (
                        <Grid bg="#ffffff" margin="8px 0px" key={p.id} margin="60px 0">
                            <Post {...p} is_me />
                        </Grid>
                    );
                } else {
                    return (
                        <Grid key={p.id} bg="#ffffff">
                            <Post {...p} />
                        </Grid>
                    );
                }
            })}
        </React.Fragment>
    );
};

export default PostList;
