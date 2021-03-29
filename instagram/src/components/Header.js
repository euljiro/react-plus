import React from "react";
import { Grid, Text, Button } from "../elements";
import { useSelector, useDispatch } from "react-redux";
import { actionCreators as userActions } from "../redux/modules/user";

import { Switch, withRouter } from "react-router";
import { apiKey } from "../shared/firebase";

const Header = (props) => {
    const dispatch = useDispatch();
    const user_info = useSelector((state) => state.user.user);
    const _session_key = `firebase:authUser:${apiKey}:[DEFAULT]`;
    const is_login = sessionStorage.getItem(_session_key);

    if (is_login) {
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
                                window.alert("로그아웃 되었습니다");
                                props.history.push("/");
                                dispatch(userActions.logoutFB({}));
                            }}
                        />
                    </Grid>
                </Grid>
            </React.Fragment>
        );
    } else {
        return (
            <Switch>
                <Grid is_flex padding="4px 16px" width="460px">
                    <Grid>
                        <Text margin="0" size="24px" bold>
                            gggggg
                        </Text>
                    </Grid>
                    <Grid is_flex>
                        <Button
                            text="로그인"
                            _onClick={() => {
                                props.history.push("/login");
                                console.log("login!");
                            }}
                        />

                        <Button
                            text="회원가입"
                            _onClick={() => {
                                props.history.push("./signup");
                                console.log("login!");
                            }}
                        />
                    </Grid>
                </Grid>
            </Switch>
        );
    }
};

Header.defaultProps = {};

export default withRouter(Header);
