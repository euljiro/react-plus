import React from "react";
import Post from "../components/Post";
import { useSelector, useDispatch } from "react-redux";
import { actionCreators as postActions } from "../redux/modules/post";

const PostList = (props) => {
    const dispatch = useDispatch();
    const post_list = useSelector((state) => state.post.list);
    const user_info = useSelector((state) => state.user.user);

    React.useEffect(() => {
        dispatch(postActions.getPostFB());
    }, []);

    return (
        <React.Fragment>
            {post_list.map((p, idx) => {
                if (p !== 0) {
                    //옵서녈 체이닝
                    if (p.user_info.user_id === user_info?.uid) {
                        return <Post key={p.id} {...p} is_me />;
                    } else {
                        return <Post key={p.id} {...p} />;
                    }
                }
            })}
        </React.Fragment>
    );
};

export default PostList;
