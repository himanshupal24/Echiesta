import React from 'react';
import { ReactComponent as FBIcon } from '../../assets/icons/facebook.svg';
import { ReactComponent as LinkedInIcon } from '../../assets/icons/linkedin.svg';
import { ReactComponent as YTIcon } from '../../assets/icons/youtube.svg';

import { ReactComponent as InstaIcon } from '../../assets/icons/instaicon.svg';

// use ref - https://cseunitedmain.gtsb.io/

const FloatingSocialIcons = () => {
    return (
        <aside className="fixed bottom-0 left-0 text-white z-[99]">
            <ul className="flex flex-col h-[60vh] items-center left-icons-container justify-end contsact-icons-container">
                <li>
                    <a
                        href="https://www.facebook.com/share/v/SE6ZoGcCBsidtF7L/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="decoration-none contact-icons"
                    >
                        <FBIcon width={35} height={35} color="#ff0000" />
                    </a>
                </li>
                <li>
                    <a
                        href="https://www.linkedin.com/feed/update/urn:li:activity:7244562906082615296 "
                        target="_blank"
                        rel="noopener noreferrer"
                        className="decoration-none contact-icons"
                    >
                        <LinkedInIcon width={35} height={35} color="#ff0000" />
                    </a>
                </li>
                <li>
                    <a
                        href="https://youtube.com/shorts/lIv1DtTzBuI?feature=share"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="decoration-none contact-icons"
                    >
                        <YTIcon width={35} height={35} color="#ff0000" />
                    </a>
                </li>
                {/* <li>
          <a
            href="https://wa.me/918910304203?text=Hello"
            target="_blank"
            rel="noopener noreferrer"
            className="decoration-none contact-icons"
          >
            <WAIcon width={38} height={38} color="#ff0000" />
          </a>
        </li> */}
                <li>
                    <a
                        href="https://www.instagram.com/p/DAU59pnNxdM/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="decoration-none contact-icons"
                    >
                        <InstaIcon width={35} height={35} color="#ff0000" />
                    </a>
                </li>
            </ul>
        </aside>
    );
};

export default FloatingSocialIcons;
