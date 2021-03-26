import React from "react";
import { Text, Grid, Input, Button } from "../elements";

const Login = (props) => {
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
                        _onChange={() => {
                            console.log("아이디!");
                        }}
                    />
                </Grid>
                <Grid padding="16px 0">
                    <Input
                        label="비밀번호"
                        placeholder="비밀번호를 입력해주세요"
                        _onChange={() => {
                            console.log("비밀번호!");
                        }}
                    />
                </Grid>
                <Grid padding="16px 0">
                    <Button
                        text="로그인하기"
                        _onClick={() => {
                            console.log("login!");
                        }}
                    />
                </Grid>
            </Grid>
        </div>
    );
};

export default Login;
