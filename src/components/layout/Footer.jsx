import React from 'react';

const Footer = () => {
    return (
        <footer className="w-full bg-gray-800 text-white flex justify-center items-center absolute bottom-0 left-0 z-[1]">
            <div className="text-m py-3">
                <span>Designed & developed by</span>{' '}
                <a
                    href="https://www.linkedin.com/in/himanshupal24"
                    target="blank"
                    className="font-bold text-red-400 hover:text-blue-500"
                >
                    Himanshu Pal
                </a>{' '}
                ,{' '}
                <a
                    href="https://www.linkedin.com/in/jai47"
                    target="blank"
                    className="font-bold text-red-400 hover:text-blue-500"
                >
                    Jai
                </a>{' '}
                &{' '}
                <a
                    href="https://www.linkedin.com/in/thevedanshgupta/"
                    target="blank"
                    className="font-bold text-red-400 hover:text-blue-500"
                >
                    Vedansh
                </a>
            </div>
        </footer>
    );
};

export default Footer;
