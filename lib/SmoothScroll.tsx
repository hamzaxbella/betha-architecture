"use client";

import { ReactLenis as ReactLenisType } from "@studio-freight/react-lenis";
import React, { ReactNode } from "react";

interface SmoothscrollProps {
    children: ReactNode;
}

interface ReactLenisProps {
    root?: boolean;
    options?: {
        lerp?: number;
        wheelMultiplier?: number;
        smoothWheel?: boolean;
        smoothTouch?: boolean;
        syncTouch?: boolean;
    };
    style?: React.CSSProperties;
    children: ReactNode;
}

const ReactLenis = ReactLenisType as React.ComponentType<ReactLenisProps>;

function Smoothscroll({ children }: SmoothscrollProps) {
    const options = {
        lerp: 0.1,
        wheelMultiplier: 1,
        smoothWheel: true,
        smoothTouch: false,
        syncTouch: true
    };

    return (
        <ReactLenis root options={options} style={{ height: '100vh', overflowY: 'auto' }}>
            {children}
        </ReactLenis>
    );
}

export default Smoothscroll;