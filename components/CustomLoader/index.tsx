import React from "react";
import Image from "next/image";
import AnimatedText from 'react-animated-text-content';

import {
    CircularProgress,
    Box,
    Typography,
} from "@mui/material";

const CustomLoader = () => {
    return (
        <div style={{ display: 'flex', flexDirection: "column", justifyContent: "center", alignItems: "center",height:"100vh" }}>
            <div style={{ display: "flex", alignItems: "center", marginTop: "0px" }}>
                <Image style={{ display: "block" }} width={150} height={30} src={"/logo.png"} alt="logo" title="Logo" />
            </div>
            <h1
                style={{
                    color: "text.dark",
                    fontStyle: "normal",
                    fontWeight: "400",
                    fontSize: "48px",
                    lineHeight: "36px",
                    marginTop: "90px",
                    letterSpacing: "0.15px",
                }}
            >
                {/* <AnimatedText
                    type="chars" // animate words or chars
                    animation={{
                        x: '200px',
                        y: '-20px',
                        scale: 1.1,
                        ease: 'ease-in-out',
                    }}
                    animationType="wave"
                    interval={0.15}
                    duration={0.5}
                    tag="p"
                    className="animated-paragraph"
                    includeWhiteSpaces
                    threshold={0.1}
                    rootMargin="20%"
                > */}
                    Project Management Software
                {/* </AnimatedText> */}
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