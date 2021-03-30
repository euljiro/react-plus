import React, { useState } from "react";

import axios from "axios";
import Upload from "../shared/Upload";

import { Grid, Text, Button, Image, Input } from "../elements";
import { withRouter } from "react-router";
import "../shared/App.css";

import { actionCreators as postActions } from "../redux/modules/post";
import { useDispatch, useSelector } from "react-redux";

const PostWrite = (props) => {
    const [contents, setContents] = useState("");
    const dispatch = useDispatch();
    const preview = useSelector((state) => state.image.preview);

    const changeContents = (e) => {
        setContents(e.target.value);
    };

    const addPost = (history) => {
        dispatch(postActions.addPostFB(contents));
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
                    _onChange={changeContents}
                />
                <button className="list-btn" onClick={addPost}>
                    포스팅하기
                </button>
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

export default withRouter(PostWrite);
