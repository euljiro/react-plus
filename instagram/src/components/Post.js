import React from "react";
import { Grid, Image, Text } from "../elements";

const Post = (props) => {
    return (
        <div>
            <Grid is_flex>
                <Image shape="circle" src={props.user_info.user_profile} />
                <Text bold>{props.user_info.user_name}</Text>
                <Text>{props.insert_dt}</Text>
            </Grid>
            <Grid>
                <Image shape="rectangle" src={props.image_url} />
            </Grid>
            <Grid padding="16px">
                <Text>{props.contents}</Text>
            </Grid>
            <Grid padding="16px">
                <Text>댓글 {props.comment_cnt}개</Text>
            </Grid>
        </div>
    );
};

//필수 프롭스를 담아두면 데이터가 없어서 나는 오류를 방지할 수 있다!
Post.defaultProps = {
    user_info: {
        user_name: "yl",
        user_profile:
            "https://img.webmd.com/dtmcms/live/webmd/consumer_assets/site_images/article_thumbnails/other/cat_relaxing_on_patio_other/1800x1200_cat_relaxing_on_patio_other.jpg",
    },
    img_url:
        "https://img.webmd.com/dtmcms/live/webmd/consumer_assets/site_images/article_thumbnails/other/cat_relaxing_on_patio_other/1800x1200_cat_relaxing_on_patio_other.jpg",
    contents: "cat~",
    comment_cnt: 10,
    insert_dt: "2021-03-27 10:10:10",
};

export default Post;
