import React, { useState } from "react";
import { Text, Grid, Input, Button } from "../elements";
import { setCookie, deleteCookie, getCookie } from "../shared/Cookie";
import { actionCreators as userActions } from "../redux/modules/user";
import { useDispatch } from "react-redux";

const Login = (props) => {
    const dispatch = useDispatch();
    const [id, setId] = React.useState("");
    const [pwd, setPwd] = React.useState("");

    const changeId = (e) => {
        setId(e.target.value);
    };

    const changePwd = (e) => {
        setPwd(e.target.value);
    };

    const login = () => {
        dispatch(userActions.logIN({ user_name: "kekeke" }));
    };

    const loginAction = (user) => {
        return function (dispatch, getState, { history }) {
            dispatch(login(user));
            history.push("/");
        };
    };

    return (
        <div>
            <Grid padding="16px">
                <Text size="32px" bold>
                    로그인
                </Text>
                <Grid padding="16px 0">
                    <Input
                        label="아이디"
                        placeholder="아이디를 입력해주세요"
                        value={id}
                        _onChange={changeId}
                    />
                </Grid>
                <Grid padding="16px 0">
                    <Input
                        label="비밀번호"
                        placeholder="비밀번호를 입력해주세요"
                        value={pwd}
                        _onChange={changePwd}
                    />
                </Grid>
                <Grid padding="16px 0">
                    <Button
                        text="로그인하기"
                        _onClick={() => {
                            login();
                        }}
                    />
                </Grid>
            </Grid>
        </div>
    );
};

export default Login;
