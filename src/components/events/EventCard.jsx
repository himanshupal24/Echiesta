import React from 'react';
import { useNavigate } from 'react-router-dom';

const EventCard = ({ data }) => {
    const navigate = useNavigate();
    const handleClick = (id) => {
        localStorage.setItem('category', id);
        navigate(data.link);
    };

    return (
        <div className="p-4">
            <div
                className="flex flex-col bg-[#2B2D2F] rounded-md overflow-hidden"
                data-aos="fade-up"
            >
                <div className="flex flex-col sm:flex-row">
                    <div
                        className="shrink-0 sm:max-w-[45%] flex justify-center"
                        data-aos="fade-left"
                        data-aos-delay="200"
                    >
                        <img
                            src={`/events/${data.poster}`}
                            alt=""
                            className=""
                        />
                    </div>

                    <div
                        className="flex flex-col p-4"
                        data-aos="fade-right"
                        data-aos-delay="200"
                    >
                        <div className="text-center text-red-600 text-3xl pb-4">
                            {data.title}
                        </div>
                        <div className="text-white">{data.description}</div>
                    </div>
                </div>

                <div className="flex items-center py-6">
                    <div className="ml-5 grow flex justify-center text-sm md:text-base">
                        <p
                            className="grow"
                            data-aos="fade-down"
                            data-aos-delay="400"
                        >
                            <a
                                className="theme-btn"
                                target="_blank"
                                rel="noreferrer"
                                onClick={() => handleClick(data.id)}
                            >
                                Register
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EventCard;
