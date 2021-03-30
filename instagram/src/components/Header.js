import React from "react";
import { Grid, Text, Button } from "../elements";
import { setCookie, deleteCookie, getCookie } from "../shared/Cookie";
import { useSelector, useDispatch } from "react-redux";
import user, { actionCreators as userActions } from "../redux/modules/user";
import { history } from "../redux/configureStore";
import { apiKey } from "../shared/firebase";
const Header = (props) => {
    const dispatch = useDispatch();
    const is_login = useSelector((state) => state.user.is_login);
    const _session_key = `firebase:authUser:${apiKey}:[DEFAULT]`;
    const is_session = sessionStorage.getItem(_session_key) ? true : false;
    console.log(is_session);
    if (is_login && is_session) {
        return (
            <React.Fragment>
                <Grid is_flex padding="4px 16px" width="460px">
                    <Grid>
                        <Text margin="0" size="24px" bold>
                            gggggg
                        </Text>
                    </Grid>
                    <Grid is_flex>
                        <Button
                            text="내 정보"
                            _onClick={() => {
                                console.log("mypage!");
                            }}
                        />
                        <Button
                            text="알림"
                            _onClick={() => {
                                console.log("noti!");
                            }}
                        />
                        <Button
                            text="로그아웃"
                            _onClick={() => {
                                dispatch(userActions.logOUT({}));
                            }}
                        />
                    </Grid>
                </Grid>
            </React.Fragment>
        );
    }

    return (
        <Grid is_flex padding="4px 16px" width="460px">
            <Grid>
                <Button
                    text="메인"
                    _onClick={() => {
                        history.push("/");
                    }}
                >
                    gggggg
                </Button>
            </Grid>
            <Grid is_flex>
                <Button
                    text="로그인"
                    _onClick={() => {
                        history.push("/login");
                    }}
                />
                <Button
                    text="회원가입"
                    _onClick={() => {
                        history.push("/signup");
                    }}
                />
            </Grid>
        </Grid>
    );
};

Header.defaultProps = {};

export default Header;
