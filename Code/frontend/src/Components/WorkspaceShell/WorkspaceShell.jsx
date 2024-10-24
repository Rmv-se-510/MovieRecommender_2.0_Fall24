import { Grid2 } from "@mui/material";
import React from "react";

export default function WorkspaceShell(props) {
    return (
        <Grid2 className="workspace-shell">
            {props.children}
        </Grid2>)
}
