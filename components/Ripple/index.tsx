import React, { useState, useLayoutEffect } from "react";
import { RippleContainer } from "./Ripple.styled";

interface RippleProps {
    duration: number;
    color: string;
}

interface RippleObject {
    x: number;
    y: number;
    size: number;
}

const useDebouncedRippleCleanUp = (rippleCount: number, duration: number, cleanUpFunction: () => void) => {
    useLayoutEffect(() => {
        let bounce: NodeJS.Timeout | null = null;
        if (rippleCount > 0) {
            clearTimeout(bounce!);

            bounce = setTimeout(() => {
                cleanUpFunction();
                clearTimeout(bounce!);
            }, duration * 4);
        }

        return () => clearTimeout(bounce!);
    }, [rippleCount, duration, cleanUpFunction]);
};

const Ripple: React.FC<RippleProps> = ({ duration = 850, color = "#fff" }) => {
    const [rippleArray, setRippleArray] = useState<RippleObject[]>([]);

    useDebouncedRippleCleanUp(rippleArray.length, duration, () => {
        setRippleArray([]);
    });

    const addRipple = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        const rippleContainer = event.currentTarget.getBoundingClientRect();
        const size = rippleContainer.width > rippleContainer.height ? rippleContainer.width : rippleContainer.height;
        const x = event.pageX - rippleContainer.x - size / 2;
        const y = event.pageY - rippleContainer.y - size / 2;
        const newRipple: RippleObject = {
            x,
            y,
            size,
        };

        setRippleArray([...rippleArray, newRipple]);
    };

    return (
        // @ts-ignore
        <RippleContainer duration={duration} color={color} onMouseDown={addRipple}>
            {rippleArray.length > 0 &&
                rippleArray.map((ripple, index) => {
                    return (
                        <span
                            key={"span" + index}
                            style={{
                                top: ripple.y,
                                left: ripple.x,
                                width: ripple.size,
                                height: ripple.size,
                            }}
                        />
                    );
                })}
        </RippleContainer>
    );
};

export default Ripple;
