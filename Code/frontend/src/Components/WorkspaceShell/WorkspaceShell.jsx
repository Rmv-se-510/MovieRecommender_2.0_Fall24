import { Container } from "@mui/material";
import React from "react";

export default function WorkspaceShell(props) {
    const themeProps = {
        position: "relative",
        top: "64px",
        bottom: "0",
        left: "64px",
        width: "$calc(100vw - 64px)",
        height: "100vh",
        paddingLeft: "0.5rem",
        paddingRight: "0.5rem",
    }
    if (props.isLoginPage) {
        themeProps.left = "0";
        themeProps.width = "0";
        themeProps.paddingLeft = "0 !important";
        themeProps.paddingRight = "0 !important";
        themeProps.marginRight = "0 !important";
        themeProps.marginLeft = "0 !important";
    }
    return (
        <Container sx={(theme) => (themeProps)}>
            {props.isLoginPage ? (
                <div className="login-bg">
                    {props.children}
                </div>
            ) : (
                <div className="App">
                    {props.children}
                </div>
            )}
        </Container>
    );

}
