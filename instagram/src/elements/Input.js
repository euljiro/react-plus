import React from "react";
import styled from "styled-components";
import { Text } from "./index";

const Input = (props) => {
    const { label, placeholder, _onChange } = props;

    return (
        <React.Fragment>
            <Text margin="0px">{label}</Text>
            <InputStyle placeholder={placeholder} onChange={_onChange}></InputStyle>
        </React.Fragment>
    );
};

Input.defaultProps = {
    label: "text",
    placeholder: "텍스트를 입력해주세요",
    _onChange: () => {},
};

const InputStyle = styled.input`
    border: 1px solid #666;
    width: 100%;
    padding: 20px 4px;
    box-sizing: border-box;
`;

export default Input;
