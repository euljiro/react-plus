import React, { useRef, useState } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";

import { Grid, Text, Button, Image, Input } from "../elements";
import { withRouter } from "react-router";
import "../shared/App.css";

import { actionCreators as postActions } from "../redux/modules/post";
import { useDispatch } from "react-redux";

const PostWrite = (props) => {
    const [img, setImage] = useState("");
    const [contents, setContents] = useState("");
    const dispatch = useDispatch();

    const onChange = (e) => {
        setImage(e.target.files[0]);
    };

    // const changePost = (e) => {
    //     setPost(e.target.value);
    // };

    const changeContents = (e) => {
        setContents(e.target.value);
    };

    const addPost = () => {
        dispatch(postActions.addPostFB(contents));
    };

    return (
        <div>
            <div className="input-style">
                <div className="file-input-style">
                    <label for="ex_file">사진 올리기</label>
                    <input type="file" onChange={onChange} id="ex_file" />
                </div>
                <Grid>
                    <Text margin="4px 0" size="14px">
                        미리보기
                    </Text>
                    <Image shape="rectangle" />
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
