import React from 'react';
import EventSchedule from '../EventSchedule/EventSchedule';

const Content = () => {
    return (
        <section
            id="about"
            className="w-full text-white content-bg pl-2 md:pt-16"
        >
            <div className="py-8 md:p-8 pr-4 !pl-16">
                <h1 className="text-5xl mb-4 font-bold" data-aos="fade-right">
                    <span>A</span>
                    <span className="text-4xl">
                        B<span className="text-red-600">OU</span>T
                    </span>
                    <br className="sm:hidden" />
                    <span> ECHI</span>
                    <span className="text-red-600">ESTA</span>
                    <span>-</span>
                    <span className="text-red-600">2K</span>24
                </h1>

                <div className="flex flex-col lg:flex-row">
                    <div className="grow py-4" data-aos="fade-up">
                        <p className="text-lg md:text-xl text-justify pr-2">
                            Echiesta is the much-anticipated annual
                            techno-cultural festival that brings together the
                            best of technology, culture, and creativity. It is a
                            unique confluence of technical prowess and artistic
                            expression, aimed at fostering innovation and
                            celebrating diverse talents. Echiesta is more than
                            just an event—it is a platform where students,
                            innovators, and creators come together to showcase
                            their skills, exchange ideas, and participate in a
                            wide array of competitions, workshops, and
                            performances.
                        </p>
                    </div>

                    <div
                        className="grow md:p-4 flex justify-center"
                        data-aos="fade-left"
                    >
                        {/* Add any additional content or image here if needed */}
                    </div>
                </div>

                {/* Event Schedule Section */}
                <div data-aos="fade-up">
                    <EventSchedule />
                </div>
            </div>
        </section>
    );
};

export default Content;
