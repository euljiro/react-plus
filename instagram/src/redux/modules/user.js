import React from "react";
import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { setCookie, deleteCookie, getCookie } from "../../shared/Cookie";
import { auth } from "../../shared/firebase";

//Action type
const LOG_IN = "LOG_IN";
const LOG_OUT = "LOG_OUT";
const GET_USER = "GET_USER";
const SET_USER = "SET_USER";

//Action Creator
const logIN = createAction(LOG_IN, (user) => ({ user }));
const logOUT = createAction(LOG_OUT, (user) => ({ user }));
const getUser = createAction(GET_USER, (user) => ({ user }));
const setUser = createAction(SET_USER, (user) => ({ user }));

const actionCreators = {
    logIN,
    logOUT,
    getUser,
    setUser,
};

export { actionCreators };

//initial state
const initialState = {
    user: "hihihi",
    is_login: false,
};

const loginAction = (user) => {
    return function (dispatch, getState, { history }) {
        console.log(history);
        dispatch(setUser(user));
        history.push("/");
    };
};

//Reducer
export default handleActions(
    {
        [LOG_IN]: (state, action) =>
            produce(state, (draft) => {
                setCookie("is_login", "success");
                draft.user = action.payload.user;
                draft.is_login = true;
            }),
        [LOG_OUT]: (state, action) =>
            produce(state, (draft) => {
                deleteCookie("is_login");
                draft.user = null;
                draft.is_login = false;
            }),
        [GET_USER]: (state, action) => produce(state, (draft) => {}),
    },
    initialState
);
