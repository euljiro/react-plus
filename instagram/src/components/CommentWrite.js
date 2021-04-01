import React from "react";
import { Grid, Input, Button } from "../elements";
import comment, { actionCreators as commentActions } from "../redux/modules/comment";
import { useDispatch } from "react-redux";
import { values } from "lodash";

const CommentWrite = (props) => {
    const dispatch = useDispatch();

    const { post_id } = props;
    const [comment_text, setCommentText] = React.useState("");

    const write = () => {
        if (comment_text === "") {
            window.alert("댓글을 입력해주세요!");
            return;
        }
        console.log(comment_text);
        // 파이어스토어에 추가합니다.
        dispatch(commentActions.addCommentFB(post_id, comment_text));
        // 입력된 텍스트는 지우기!
        setCommentText("");
    };
    console.log(comment_text);
    return (
        <React.Fragment>
            <Grid padding="16px" is_flex>
                <Input
                    type="text"
                    label="게시글"
                    placeholder="게시글을 입력해주세요"
                    value={comment_text}
                    _onChange={(e) => {
                        setCommentText(e.target.value);
                    }}
                    onSubmit={write}
                />
                <Button width="50px" margin="0px 2px 0px 2px" _onClick={write}>
                    작성
                </Button>
            </Grid>
        </React.Fragment>
    );
};

CommentWrite.defaultProps = {
    post_id: "",
};

export default CommentWrite;
