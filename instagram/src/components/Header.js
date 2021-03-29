import React from "react";
import { Grid, Text, Button } from "../elements";
import { setCookie, deleteCookie, getCookie } from "../shared/Cookie";
import { useSelector, useDispatch } from "react-redux";
import user, { actionCreators as userActions } from "../redux/modules/user";

const Header = (props) => {
    const dispatch = useDispatch();
    const is_login = useSelector((state) => state.user.is_login);

    // React.useEffect(() => {
    //     let cookie = getCookie("user_id");
    //     console.log(cookie);
    //     if (cookie) {
    //         setIsLogin(true);
    //     } else {
    //         setIsLogin(false);
    //     }
    // });

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
                <Text margin="0" size="24px" bold>
                    gggggg
                </Text>
            </Grid>
            <Grid is_flex>
                <Button
                    text="로그인"
                    _onClick={() => {
                        console.log("login!");
                    }}
                />
                <Button
                    text="회원가입"
                    _onClick={() => {
                        console.log("login!");
                    }}
                />
            </Grid>
        </Grid>
    );
};

Header.defaultProps = {};

export default Header;
