import React from 'react';
import { PulseBubbleLoader } from 'react-loaders-kit';
// import Typed from "react-typed";
function Loader() {
    const loaderProps = {
        loading: true,
        size: 40,
        colors: ['#ffffff', '#ffffff', '#ffffff'],
    };

    return (
        <div className="fixed top-0 left-0 w-full h-full min-h-screen flex justify-center items-center z-[9999] bg-theme-black">
            <div className="flex flex-col items-center">
                <img
                    src="./logo_transparent.webp"
                    alt="loader"
                    className="w-2/4 mb-5"
                />
                <PulseBubbleLoader {...loaderProps} />
            </div>
        </div>
    );
}

export default Loader;
