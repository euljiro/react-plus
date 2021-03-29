import React from "react";
import { withRouter } from "react-router";
import styled from "styled-components";
import { ThemeConsumer } from "styled-components";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";

const FaButton = (props) => {
    return (
        <BtnDisplay>
            <Fab
                color="primary"
                aria-label="add"
                onClick={() => {
                    props.history.push("/post");
                    console.log("hi");
                }}
            >
                <AddIcon />
            </Fab>
        </BtnDisplay>
    );
};

const BtnDisplay = styled.div`
    margin: 0px;
    top: auto;
    right: 40px;
    bottom: 40px;
    left: auto;
    position: fixed;
    z-index: 999;
`;

export default withRouter(FaButton);
