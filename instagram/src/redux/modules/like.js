import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { firestore, realtime } from "../../shared/firebase";
import { actionCreators as postActions } from "./post";
import firebase from "firebase/app";

const ADD_LIKE = "ADD_LIKE";
const DELETE_LIKE = "DELETE_LIKE";

const addLike = createAction(ADD_LIKE, (post_id, is_like = null) => ({ post_id, is_like }));
const deleteLike = createAction(DELETE_LIKE, (post_id) => ({ post_id }));

const initialState = {
    like: false,
};

const addLikeFB = (post_id) => {
    return function (dispatch, getState, { history }) {
        if (!getState().user.user) {
            return;
        }
        const postDB = firestore.collection("post");
        const user_info = getState().user.user.uid;

        let like = {
            post_id: post_id,
            user_id: user_info.uid,
            user_name: user_info.user_name,
        };

        const increment = firebase.firestore.FieldValue.increment(1);

        postDB
            .doc(post_id)
            .update({ like_cnt: increment })
            .then((_post) => {
                dispatch(addLike(post_id, like));

                if (_post) {
                    dispatch(
                        postActions.editPost(post_id, {
                            like_cnt: parseInt(post_id.like_cnt) + 1,
                        })
                    );
                    const likeDB = realtime.ref(`/like/${post_id.user_info.user_id}`).push();
                    likeDB.update({ like: false });
                }
            });
    };
};

const deleteLikeFB = (post_id, user_id) => {
    return function (dispatch, getState, { history }) {
        const postDB = firestore.collection("post");
        const post = getState().post.list.find((l) => l.id === post_id);
        const user_info = getState().user.user;

        let like = {
            post_id: post_id,
            user_id: user_info.uid,
            user_name: user_info.user_name,
        };

        const increment = firebase.firestore.FieldValue.increment(-1);

        postDB
            .doc(post_id)
            .update({ like_cnt: increment })
            .then((_post) => {
                dispatch(addLike(post_id, like));

                if (post) {
                    dispatch(
                        postActions.editPost(post_id, {
                            like_cnt: parseInt(post.like_cnt) - 1,
                        })
                    );
                    const likeDB = realtime.ref(`/like/${post_id.user_info.user_id}/list`).push();
                    likeDB.update({ like: false });
                }
            });
    };
};

const actionCreators = {
    addLikeFB,
    deleteLikeFB,
};

export { actionCreators };
