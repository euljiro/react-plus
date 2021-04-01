import React from "react";
import { withRouter } from "react-router";
import styled from "styled-components";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import { history } from "../redux/configureStore";

const FaButton = (props) => {
    return (
        <BtnDisplay>
            <Fab
                color="primary"
                aria-label="add"
                onClick={() => {
                    history.push("/post");
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
