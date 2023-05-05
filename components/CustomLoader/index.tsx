import React from "react";
import Image from "next/image";

import {
    CircularProgress
} from "@mui/material";

const CustomLoader = () => {
    return (
        <div style={{ display: 'flex', flexDirection: "column", justifyContent: "center", alignItems: "center", height: "100vh !important", backgroundColor: "white", paddingTop:"30vh" }}>
            <div style={{ display: "flex", alignItems: "center" }}>
                <Image style={{ display: "block" }} width={100} height={100} src={"/logocopy.png"} alt="logo" title="Logo" />
            </div>
            <h1
                style={{
                    color: "text.dark",
                    fontStyle: "normal",
                    fontWeight: "400",
                    fontSize: "45px",
                    lineHeight: "36px",
                    marginTop: "30px",
                    letterSpacing: "0.15px",
                }}
            >
                TaskEncher - Rev Up Tasks and Efficiency
            </h1>
            <div
                style={{
                    marginTop: "100px"
                }}
            >
                <CircularProgress color="primary" />
            </div>
        </div>
    )
}
export default CustomLoader;