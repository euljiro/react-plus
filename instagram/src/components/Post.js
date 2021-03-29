import React, { useRef, useState } from "react";
import axiof from "axios";

import { makeStyles } from "@material-ui/core/styles";
import styled from "styled-components";

import { Grid, Text, Button, Image } from "../elements";
import TextField from "@material-ui/core/TextField";
import { withRouter } from "react-router";
import "../shared/App.css";

import { actionCreators as userActions } from "../redux/modules/user";
import { useDispatch } from "react-redux";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
    textField: {
        width: "225px",
        marginTop: "40px",
    },
}));

const Post = (props) => {
    const classes = useStyles();
    const textRef = useRef();
    const [img, setImage] = useState("");
    const [post, setPost] = useState("");
    const dispatch = useDispatch();

    const onChange = (e) => {
        setImage(e.target.files[0]);
    };

    const changePost = (e) => {
        setPost(e.target.value);
    };

    // const onClick = async () => {
    //     const formData = new FormData();
    //     formData.append("file", img);
    //     return axios.post("/post", formData).then((res) => {
    //         alert("성공");
    //     });
    // };

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
                <TextField
                    id="outlined-basic"
                    label="일정"
                    onChange={changePost}
                    inputRef={textRef}
                    variant="outlined"
                    className={classes.textField}
                />
                <button className="list-btn" onClick={console.log("plus")}>
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

export default withRouter(Post);
