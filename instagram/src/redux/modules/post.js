import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { firestore } from "../../shared/firebase";

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
    list: [
        {
            user_info: {
                id: 0,
                user_name: "nick",
                user_profile: "https://mean0images.s3.ap-northeast-2.amazonaws.com/4.jpeg",
            },
            image_url: "https://mean0images.s3.ap-northeast-2.amazonaws.com/4.jpeg",
            contents: "고양이네요",
            comment_cnt: 5,
            insert_dt: "2021-03-27",
        },
    ],
};

const getPostFB = () => {
    return function (dispatch, getState, { history }) {
        const postDB = firestore.collection("post");
        postDB.get().then((docs) => {
            let post_list = [];
            docs.forEach((doc) => {
                console.log(doc.id, doc.date());
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
            console.log(post_list);
            dispatch(setPost(post_list));
        });
    };
};

//Reducer
export default handleActions(
    {
        [SET_POST]: (state, action) => produce(state, (draft) => {}),
        [ADD_POST]: (state, action) => produce(state, (draft) => {}),
    },
    initialState
);

const actionCreators = {
    setPost,
    addPost,
    getPostFB,
};

export { actionCreators };
