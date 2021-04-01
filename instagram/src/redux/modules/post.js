import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { firestore, storage } from "../../shared/firebase";
import { actionCreators as imageActions } from "./image";
import moment from "moment";

//Action
const SET_POST = "SET_POST";
const ADD_POST = "ADD_POST";
const EDIT_POST = "EDIT_POST";
const DELETE_POST = "DELETE_POST";

//ActionCreator
const setPost = createAction(SET_POST, (post_list) => ({ post_list }));
const addPost = createAction(ADD_POST, (post) => ({ post }));
const editPost = createAction(EDIT_POST, (post_id, post) => ({ post_id, post }));
const deletePost = createAction(DELETE_POST, (post_id, post) => ({ post_id, post }));

const initialState = {
    list: [],
};

const initialPost = {
    id: "",
    user_info: {
        user_name: "",
        user_profile: "https://mean0images.s3.ap-northeast-2.amazonaws.com/4.jpeg",
    },
    image_url: "https://mean0images.s3.ap-northeast-2.amazonaws.com/4.jpeg",
    contents: "고양이네요",
    comment_cnt: "0",
    insert_dt: moment().format("YYYY-MM-DD hh:mm:ss"),
    like_cnt: "0",
};

const getPostFB = () => {
    return function (dispatch, getState, { history }) {
        const postDB = firestore.collection("post");
        postDB.get().then((docs) => {
            let post_list = [];
            docs.forEach((doc) => {
                let _post = doc.data();
                let post = {
                    id: doc.id,
                    user_info: {
                        user_name: _post.user_name,
                        user_propfile: _post.user_propfile,
                        user_id: _post.user_id,
                    },
                    contents: _post.contents,
                    image_url: _post.image_url,
                    comment_cnt: _post.comment_cnt,
                    insert_dt: _post.insert_dt,
                    like_cnt: _post.like_cnt,
                };
                post_list.push(post);
            });
            dispatch(setPost(post_list));
        });
    };
};

const getOnePostFB = (id) => {
    return function (dispatch, getState, { history }) {
        const postDB = firestore.collection("post");
        postDB
            .doc(id)
            .get()
            .then((doc) => {
                let _post = doc.data();

                if (!_post) {
                    return;
                }

                let post = Object.keys(_post).reduce(
                    (acc, cur) => {
                        if (cur.indexOf("user_") !== -1) {
                            return {
                                ...acc,
                                user_info: { ...acc.user_info, [cur]: _post[cur] },
                            };
                        }
                        return { ...acc, [cur]: _post[cur] };
                    },
                    { id: doc.id, user_info: {} }
                );

                dispatch(setPost([post], { start: null, next: null, size: 3 }));
            });
    };
};

const editPostFB = (post_id = null, post = {}) => {
    return function (dispatch, getState, { history }) {
        if (!post_id) {
            console.log("게시물 정보가 없어요!");
            return;
        }

        const _image = getState().image.preview;

        const _post_idx = getState().post.list.findIndex((p) => p.id === post_id);
        const _post = getState().post.list[_post_idx];
        console.log(_post);

        const postDB = firestore.collection("post");

        if (_image === _post.image_url) {
            postDB
                .doc(post_id)
                .update(post)
                .then((doc) => {
                    dispatch(editPost(post_id, { ...post }));
                    history.replace("/");
                });

            return;
        } else {
            const user_id = getState().user.user.uid;
            const _upload = storage
                .ref(`images/${user_id}_${new Date().getTime()}`)
                .putString(_image, "data_url");

            _upload.then((snapshot) => {
                snapshot.ref
                    .getDownloadURL()
                    .then((url) => {
                        console.log(url);

                        return url;
                    })
                    .then((url) => {
                        postDB
                            .doc(post_id)
                            .update({ ...post, image_url: url })
                            .then((doc) => {
                                dispatch(editPost(post_id, { ...post, image_url: url }));
                                history.replace("/");
                            });
                    })
                    .catch((err) => {
                        window.alert("앗! 이미지 업로드에 문제가 있어요!");
                        console.log("앗! 이미지 업로드에 문제가 있어요!", err);
                    });
            });
        }
    };
};

const addPostFB = (contents = "") => {
    return function (dispatch, getState, { history }) {
        const postDB = firestore.collection("post");

        const _user = getState().user.user;
        const user_info = {
            user_name: _user.user_name,
            user_id: _user.uid,
            user_profile: _user.user_profile,
        };

        const _post = {
            ...initialPost,
            contents: contents,
            insert_dt: moment().format("YYYY-MM-DD hh:mm:ss"),
        };

        const _image = getState().image.preview;

        const _upload = storage
            .ref(`images/${user_info.user_id}_${new Date().getTime()}`)
            .putString(_image, "data_url");
        _upload
            .then((snapshot) => {
                snapshot.ref
                    .getDownloadURL()
                    .then((url) => {
                        dispatch(imageActions.uploadImage(url));
                        return url;
                    })
                    .then((url) => {
                        postDB
                            .add({ ...user_info, ..._post, image_url: url })
                            .then((doc) => {
                                // 아이디를 추가해요!
                                let post = { user_info, ..._post, id: doc.id, image_url: url };
                                dispatch(addPost(post));
                                history.replace("/");
                            })
                            .catch((err) => {
                                console.log("post 작성 실패!", err);
                            });
                    });
            })
            .catch((err) => {
                window.alert("이미지 업로드 실패");
                console.log(err);
            });
    };
};

const deletePostFB = (post_id, post) => {
    return function (dispatch, getState, { history }) {
        const delDB = firestore.collection("post");
        delDB
            .doc(post_id)
            .delete()
            .then(() => {
                window.alert("포스트가 삭제되었습니다");
                dispatch(deletePost(post_id));
                console.log(delDB, "delete");
                window.location.reload();
            })
            .catch((error) => {
                console.log(error);
            });
    };
};

//Reducer
export default handleActions(
    {
        [SET_POST]: (state, action) =>
            produce(state, (draft) => {
                draft.list.push(...action.payload.post_list);

                // post_id가 같은 중복 항목을 제거합시다! :)
                draft.list = draft.list.reduce((acc, cur) => {
                    // findIndex로 누산값(cur)에 현재값이 이미 들어있나 확인해요!
                    // 있으면? 덮어쓰고, 없으면? 넣어주기!
                    if (acc.findIndex((a) => a.id === cur.id) === -1) {
                        return [...acc, cur];
                    } else {
                        acc[acc.findIndex((a) => a.id === cur.id)] = cur;
                        return acc;
                    }
                }, []);

                // paging이 있을 때만 넣기
                if (action.payload.paging) {
                    draft.paging = action.payload.paging;
                }
                draft.is_loading = false;
            }),
        [ADD_POST]: (state, action) =>
            produce(state, (draft) => {
                draft.list.unshift(action.payload.post);
            }),
        [EDIT_POST]: (state, action) =>
            produce(state, (draft) => {
                let idx = draft.list.findIndex((p) => p.id === action.payload.post_id);
                draft.list[idx] = { ...draft.list[idx], ...action.payload.post };
            }),
    },
    initialState
);

const actionCreators = {
    setPost,
    addPost,
    getPostFB,
    addPostFB,
    editPostFB,
    editPost,
    getOnePostFB,
    deletePostFB,
};

export { actionCreators };
