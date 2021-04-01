import React from "react";
import "../shared/App.css";

import { Notifications } from "@material-ui/icons";
import { Badge } from "@material-ui/core";

import { realtime } from "../shared/firebase";
import { useSelector } from "react-redux";

const NotiBadge = (props) => {
    const [is_read, setIsRead] = React.useState("");
    const user_id = useSelector((state) => state.user.user.uid);

    const notiCheck = () => {
        const notiDB = realtime.ref(`noti/${user_id}`);
        notiDB.update({ read: true });
        props._onClick();
    };

    React.useEffect(() => {
        const notiDB = realtime.ref(`noti/${user_id}`);
        notiDB.on("value", (snapshot) => {
            setIsRead(snapshot.val().read);
        });
        return () => notiDB.off();
    }, []);

    return (
        <React.Fragment>
            <div className="BadgeMargin">
                <Badge invisible={is_read} color="primary" onClick={notiCheck} variant="dot">
                    <Notifications />
                </Badge>
            </div>
        </React.Fragment>
    );
};

NotiBadge.defaultProps = {
    _onClick: () => {},
};

export default NotiBadge;
