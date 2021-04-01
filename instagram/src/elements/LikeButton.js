import React from "react";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import FavoriteIcon from "@material-ui/icons/Favorite";
import IconButton from "@material-ui/core/IconButton";
import { realtime } from "../shared/firebase";
import { useSelector, useDispatch } from "react-redux";
import { actionCreators as LikeActions } from "../redux/modules/like";

const LikeButton = (props) => {
    const dispatch = useDispatch();
    const user_id = useSelector((state) => state.user.user.uid);
    const post_id = props.props.id;
    const [click, setClick] = React.useState();

    const addLike = () => {
        dispatch(LikeActions.addLikeFB(user_id, post_id));
        // 좋아요 표시
        realtime.ref(`like/${user_id}/${post_id}`).update({ like: false });
    };

    const deleteLike = () => {
        dispatch(LikeActions.deleteLikeFB(user_id, post_id));
        // 좋아요 표시
        realtime.ref(`like/${user_id}/${post_id}`).update({ like: true });
    };

    React.useEffect(() => {
        const notiDB = realtime.ref(`like/${user_id}/${post_id}`);
        notiDB.on("value", (snapshot) => {
            if (snapshot.val() === null) {
                // handleNotiAdd();
            } else {
                setClick(snapshot.val().like);
            }
        });
    }, [post_id, user_id]);

    return (
        <div>
            {click ? (
                <IconButton onClick={addLike}>
                    <FavoriteBorderIcon />
                </IconButton>
            ) : (
                <IconButton onClick={deleteLike}>
                    <FavoriteIcon />
                </IconButton>
            )}
        </div>
    );
};

// LikeButton.defaultProps = {
//     post_id: "",
//     contents: "귀여운 고양이네요!",
//     insert_dt: "2021-01-01 19:00:00",
// };

export default LikeButton;
