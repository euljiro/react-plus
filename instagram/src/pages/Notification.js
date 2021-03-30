import React from "react";
import react from "react";
import { Grid, Text, Image } from "../elements/index";
import Card from "../components/Card";

const Notification = (props) => {
    let noti = [
        {
            user_name: "illy",
            post_id: "post1",
            image_url:
                "https://img.webmd.com/dtmcms/live/webmd/consumer_assets/site_images/article_thumbnails/other/cat_relaxing_on_patio_other/1800x1200_cat_relaxing_on_patio_other.jpg",
        },
        {
            user_name: "illy",
            post_id: "post2",
            image_url:
                "https://img.webmd.com/dtmcms/live/webmd/consumer_assets/site_images/article_thumbnails/other/cat_relaxing_on_patio_other/1800x1200_cat_relaxing_on_patio_other.jpg",
        },
        {
            user_name: "illy",
            post_id: "post3",
            image_url:
                "https://img.webmd.com/dtmcms/live/webmd/consumer_assets/site_images/article_thumbnails/other/cat_relaxing_on_patio_other/1800x1200_cat_relaxing_on_patio_other.jpg",
        },
        {
            user_name: "illy",
            post_id: "post4",
            image_url:
                "https://img.webmd.com/dtmcms/live/webmd/consumer_assets/site_images/article_thumbnails/other/cat_relaxing_on_patio_other/1800x1200_cat_relaxing_on_patio_other.jpg",
        },
    ];

    return (
        <React.Fragment>
            <Grid padding="16px" bg="#efefef">
                {noti.map((n) => {
                    return <Card key={n.post_id} />;
                })}
            </Grid>
        </React.Fragment>
    );
};

export default Notification;
