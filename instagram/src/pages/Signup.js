import React from "react";
import { Grid, Text, Input, Button } from "../elements";
import { useDispatch } from "react-redux";
import { actionCreators as userActions } from "../redux/modules/user";

const Signup = (props) => {
    const dispatch = useDispatch();
    const [id, setId] = React.useState("");
    const [pwd, setPwd] = React.useState("");
    const [pwd_check, setPwdCheck] = React.useState("");
    const [user_name, setUserName] = React.useState("");

    const signup = () => {
        if (id === "" || pwd === "" || user_name === "") {
            window.alert("입력되지 않은 부분이 있습니다.");
            return;
        }
        if (pwd !== pwd_check) {
            window.alert("비밀번호가 일치하지 않습니다");
            return;
        }
        dispatch(userActions.signupFB(id, pwd, user_name));
    };

    return (
        <Grid padding="16px">
            <Text size="32px" bold>
                회원가입
            </Text>
            <Grid padding="16px 0">
                <Input
                    label="아이디"
                    placeholder="아이디를 입력해주세요"
                    _onChange={(e) => {
                        setId(e.target.value);
                    }}
                />
            </Grid>
            <Grid padding="16px 0">
                <Input
                    label="닉네임"
                    placeholder="닉네임을 입력해주세요"
                    type="password"
                    _onChange={(e) => {
                        setUserName(e.target.value);
                    }}
                />
            </Grid>
            <Grid padding="16px 0">
                <Input
                    label="비밀번호"
                    placeholder="비밀번호를 입력해주세요"
                    type="paasword"
                    _onChange={(e) => {
                        setPwd(e.target.value);
                    }}
                />
            </Grid>
            <Grid padding="16px 0">
                <Input
                    label="비밀번호 확인"
                    placeholder="비밀번호를 입력해주세요"
                    _onChange={(e) => {
                        setPwdCheck(e.target.value);
                    }}
                />
            </Grid>
            <Grid padding="16px 0">
                <Button text="회원가입하기" _onClick={signup} />
            </Grid>
        </Grid>
    );
};

Signup.defaultProps = {};

export default Signup;
