import React, { useState } from "react";
import Upload from "../shared/Upload";
import { history } from "../redux/configureStore";

import { Grid, Text, Button, Image, Input } from "../elements";
import "../shared/App.css";

import { actionCreators as postActions } from "../redux/modules/post";
import { actionCreators as imageActions } from "../redux/modules/image";
import { useDispatch, useSelector } from "react-redux";

const PostWrite = (props) => {
    const dispatch = useDispatch();
    const preview = useSelector((state) => state.image.preview);
    const post_list = useSelector((state) => state.post.list);
    const post_id = props.match.params.id;

    const is_edit = post_id ? true : false;
    let _post = is_edit ? post_list.find((p) => p.id === post_id) : null;
    const [contents, setContents] = useState(_post ? _post.contents : "");

    React.useEffect(() => {
        if (is_edit && !_post) {
            history.goBack();
            return;
        }
        if (is_edit) {
            dispatch(imageActions.setPreview(_post.image_url));
        }
    }, []);

    const changeContents = (e) => {
        setContents(e.target.value);
    };

    const addPost = (history) => {
        dispatch(postActions.addPostFB(contents));
    };

    const editPost = () => {
        dispatch(postActions.editPostFB(post_id, { contents: contents }));
    };

    return (
        <div>
            <div className="input-style">
                <Grid>
                    <Upload />
                    <Text margin="4px 0" size="14px">
                        미리보기
                    </Text>
                    <Image
                        shape="rectangle"
                        src={
                            preview
                                ? preview
                                : "https://pbs.twimg.com/profile_images/497135574243766273/zNjKQH4r.png"
                        }
                    />
                    "
                </Grid>
                <Input
                    label="게시글"
                    placeholder="게시글을 입력해주세요"
                    value={contents}
                    _onChange={changeContents}
                />
                {is_edit ? (
                    <button className="list-btn" onClick={editPost}>
                        수정하기
                    </button>
                ) : (
                    <button className="list-btn" onClick={addPost}>
                        포스팅하기
                    </button>
                )}

                <button
                    className="list-cancle-btn"
                    onClick={() => {
                        props.history.goBack();
                    }}
                >
                    취소
                </button>
            </div>
        </div>
    );
};

export default PostWrite;
