import React from "react";
import { Button } from "../elements/index";
import { storage } from "../shared/firebase";
import { actionCreators as imageActions } from "../redux/modules/image";
import { useDispatch, useSelector } from "react-redux";

const Upload = (props) => {
    const filenInput = React.useRef();
    const dispatch = useDispatch();
    const is_uploading = useSelector((state) => state.image.uploading);

    const selectFile = (e) => {
        console.log(filenInput.current.files[0]);
        //미리보기 파일 reader 내장함수
        const reader = new FileReader();
        const file = filenInput.current.files[0];
        reader.readAsDataURL(file);

        reader.onloadend = () => {
            console.log(reader.result);
            dispatch(imageActions.setPreview(reader.result));
        };
    };

    return (
        <React.Fragment>
            <div className="file-input-style">
                <label for="ex_file">사진 올리기</label>
                <input
                    type="file"
                    id="ex_file"
                    onChange={selectFile}
                    ref={filenInput}
                    disabled={is_uploading}
                />
            </div>
        </React.Fragment>
    );
};

export default Upload;
