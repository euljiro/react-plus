import React, { useState } from "react";
import { Text, Grid, Input, Button } from "../elements";
import setCookie from "../shared/Cookie";

const Login = (props) => {
    const [id, setId] = React.useState("");
    const [pwd, setPwd] = React.useState("");

    const changeId = (e) => {
        setId(e.target.value);
    };

    const changePwd = (e) => {
        setPwd(e.target.value);
    };

    const login = () => {
        setCookie("user_id", id, 3);
        setCookie("user_pwd", pwd, 3);
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
