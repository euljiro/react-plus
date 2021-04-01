import React from "react";
import Post from "../components/Post";
import CommentList from "../components/CommentList";
import CommentWrite from "../components/CommentWrite";
import { useSelector, useDispatch } from "react-redux";
import { actionCreators as postActions } from "../redux/modules/post";

const PostDetail = (props) => {
    const dispatch = useDispatch();
    const id = props.match.params.id;

    const user_info = useSelector((state) => state.user.user);
    const post_list = useSelector((store) => store.post.list);

    const post_idx = post_list.findIndex((p) => p.id === id);
    const post_data = post_list[post_idx];

    const [post] = React.useState(post_data);
    const [comment, setComment] = React.useState("");

    const write = () => {
        if (comment === "") {
            window.alert("댓글을 입력해주세요");
            return;
        }
    };

    React.useEffect(() => {
        dispatch(postActions.getOnePostFB(id));
    }, [dispatch, id]);

    return (
        <>
            {post && <Post {...post} is_me={post.user_info.user_id === user_info.uid} />}
            {/* <button type="button" class={post.like === null ? "likeDis"} */}
            <CommentWrite
                post_id={id}
                _onClick={write}
                _onChange={(e) => {
                    setComment(e.target.value);
                }}
            />
            <CommentList post_id={id} />
        </>
    );
};

export default PostDetail;
