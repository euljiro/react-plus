import React from "react";
import { Grid, Text, Image } from "../elements";
import { history } from "../redux/configureStore";

const Card = (props) => {
    const { image_url, user_name, post_id } = props;

    return (
        <Grid
            padding="16px"
            is_flex
            bg="#fff"
            margin="16px 0"
            _onClick={() => {
                history.push(`/postDetail/${post_id}`);
            }}
        >
            <Grid width="auto" margin="0px 8px 0px 0px">
                <Image shape="square" size="80" image_url={image_url} />
            </Grid>
            <Grid>
                <Text>
                    <b>{user_name}</b>님이 댓글을 달았어요
                </Text>
            </Grid>
        </Grid>
    );
};

Card.defaultProps = {
    image_url: "",
    user_name: "illy",
    post_id: null,
};

export default Card;
