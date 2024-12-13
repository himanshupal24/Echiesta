import React from 'react';
import { PulseBubbleLoader } from 'react-loaders-kit';
// import Typed from "react-typed";
function Loader() {
    const loaderProps = {
        loading: true,
        size: 50,
        duration: 0.5,
        colors: ['#ffffff', '#ffffff', '#ffffff'],
    };

    return (
        <div className="fixed top-0 left-0 w-full h-full min-h-screen flex justify-center items-center z-[9999] bg-theme-black">
            <PulseBubbleLoader {...loaderProps} />
        </div>
    );
}

export default Loader;
