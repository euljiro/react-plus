import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { firestore } from "../../shared/firebase";
import moment from "moment";

const postDB = firestore.collection("post");
console.log(postDB);
//Action
const SET_POST = "SET_POST";
const ADD_POST = "ADD_POST";

//ActionCreator
const setPost = createAction(SET_POST, (post_list) => ({ post_list }));
const addPost = createAction(ADD_POST, (post_list) => ({ post_list }));

//initialState
// const initialState = {
//     list: [],
// };

const initialState = {
    post_list: [
        {
            user_info: {
                id: 0,
                user_name: "nick",
                user_profile: "https://mean0images.s3.ap-northeast-2.amazonaws.com/4.jpeg",
            },
            image_url: "https://mean0images.s3.ap-northeast-2.amazonaws.com/4.jpeg",
            contents: "고양이네요",
            comment_cnt: 5,
            insert_dt: moment().format("YYYY-MM-DD hh:mm:ss"),
        },
    ],
};

const initialPost = {
    image_url: "https://mean0images.s3.ap-northeast-2.amazonaws.com/4.jpeg",
    contents: "",
    comment_cnt: 0,
    insert_dt: moment().format("YYYY-MM-DD hh:mm:ss"),
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
                };
                post_list.push(post);
            });
            dispatch(setPost(post_list));
            console.log(setPost(post_list), "hhh");
        });
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
        postDB
            .add({ ...user_info, ..._post })
            .then((doc) => {
                // 아이디를 추가해요!
                let post = { user_info, ..._post, id: doc.id };
                dispatch(addPost(post));
                history.replace("/");
                console.log(post);
            })
            .catch((err) => {
                console.log("post 작성 실패!", err);
            });
    };
};

//Reducer
export default handleActions(
    {
        [SET_POST]: (state, action) =>
            produce(state, (draft) => {
                draft.list = action.payload.post_list;
            }),
        [ADD_POST]: (state, action) =>
            produce(state, (draft) => {
                draft.list.unshift(action.payload.post);
            }),
    },
    initialState
);

const actionCreators = {
    setPost,
    addPost,
    getPostFB,
    addPostFB,
};

export { actionCreators };