import React from "react";
import styled from "styled-components";

const Grid = (props) => {
    //default 프롭스를 가져오자
    const { is_flex, width, margin, padding, bg, children } = props;

    const styles = {
        is_flex: is_flex,
        width: width,
        margin: margin,
        padding: padding,
        bg: bg,
    };

    return (
        <div>
            <GridBox {...styles}>{children}</GridBox>
        </div>
    );
};

Grid.defalutProps = {
    children: null,
    is_flex: false,
    width: "100%",
    padding: false,
    margin: false,
    bg: false,
};

const GridBox = styled.div`
    width: ${(props) => props.width};
    height: 100%;
    box-sizing: border-box;
    ${(props) => (props.padding ? `padding: ${props.padding};` : "")}
    ${(props) => (props.margin ? `margin: ${props.margin};` : "")}
    ${(props) => (props.bg ? `background-color: ${props.bg};` : "")}
    ${(props) =>
        props.is_flex ? `display:flex; align-items:center; justify-content:space-between;` : ""}
`;

export default Grid;
