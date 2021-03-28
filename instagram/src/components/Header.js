import React from "react";
import { Grid, Text, Button } from "../elements";

const Header = (props) => {
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
