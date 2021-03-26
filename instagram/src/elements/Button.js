import React from "react";
import styled from "styled-components";

const Button = (props) => {
    const { text, _onClick } = props;

    return (
        <React.Fragment>
            <ButtonStyle onClick={_onClick}>{text}</ButtonStyle>
        </React.Fragment>
    );
};

Button.defaultProps = {
    text: "text",
    _onClick: () => {},
};

const ButtonStyle = styled.button`
    width:100%;
    background-color: #212121;
    color: #fff;
    padding 20px 0;
    box-sizing: border-box;
    border:none;
`;

export default Button;
