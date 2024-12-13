import React, { useState } from 'react';

const EventSchedule = () => {
    const [activeDay, setActiveDay] = useState(null);
    const [activeCategory, setActiveCategory] = useState(null);

    const toggleDay = (day) => {
        setActiveDay(activeDay === day ? null : day);
        setActiveCategory(null); // Reset category when changing the day
    };
    const toggleCategory = (category) => {
        setActiveCategory(activeCategory === category ? null : category);
    };

    const days = [
        {
            title: 'Day 1 - Friday, 15-11-2024',
            events: [
                {
                    category: 'Sports Prelims',
                    items: [
                        {
                            sn: 1,
                            name: 'Volleyball',
                            time: '10:00 AM Onwards',
                            venue: 'Sports Ground',
                        },
                        {
                            sn: 2,
                            name: 'Basketball',
                            time: '10:00 AM Onwards',
                            venue: 'Sports Ground',
                        },
                        {
                            sn: 3,
                            name: 'Kabaddi',
                            time: '10:00 AM Onwards',
                            venue: 'Sports Ground',
                        },
                        {
                            sn: 4,
                            name: 'Table Tennis',
                            time: '10:00 AM Onwards',
                            venue: 'Sports Ground',
                        },
                    ],
                },
                {
                    category: 'Sports Prelims & Finals',
                    items: [
                        {
                            sn: 1,
                            name: 'Long Jump',
                            time: '11:00 AM Onwards',
                            venue: 'Sports Ground',
                        },
                        {
                            sn: 2,
                            name: 'High Jump',
                            time: '11:30 AM Onwards',
                            venue: 'Sports Ground',
                        },
                        {
                            sn: 3,
                            name: 'Discus Throw',
                            time: '12:00 AM Onwards',
                            venue: 'Sports Ground',
                        },
                        {
                            sn: 4,
                            name: 'Shot Put',
                            time: '12:30 AM Onwards',
                            venue: 'Sports Ground',
                        },
                        {
                            sn: 5,
                            name: 'Javelin Throw',
                            time: '01:30 AM Onwards',
                            venue: 'Sports Ground',
                        },
                        {
                            sn: 6,
                            name: 'Carrom',
                            time: '11:00 AM Onwards',
                            venue: 'Sports Ground',
                        },
                        {
                            sn: 7,
                            name: 'Chess',
                            time: '11:00 AM Onwards',
                            venue: 'Sports Ground',
                        },
                    ],
                },
                {
                    category: 'Freshers Party & Kavi Sammelan',
                    items: [
                        {
                            sn: 1,
                            name: 'Freshers Party',
                            time: '10:00 AM Onwards',
                            venue: 'Stage-2 (Echelon Square)',
                        },
                        {
                            sn: 2,
                            name: 'Kavi Sammelan',
                            time: '04:00 PM Onwards',
                            venue: 'Stage-2 (Echelon Square)',
                        },
                    ],
                },
            ],
        },
        {
            title: 'Day 2 - Saturday, 16-11-2024',
            events: [
                {
                    category: 'Rhythm & Riffs',
                    items: [
                        {
                            sn: 1,
                            name: 'Bands',
                            time: '11:00 AM',
                            venue: 'Main stage',
                        },
                        {
                            sn: 2,
                            name: 'Instrumental Music',
                            time: '1:00 PM',
                            venue: 'Main stage',
                        },
                        {
                            sn: 3,
                            name: 'Solo Singing',
                            time: '11:00 AM',
                            venue: 'Stage-2 (Echelon Square)',
                        },
                        {
                            sn: 4,
                            name: 'Duet Singing',
                            time: '12:00 PM',
                            venue: 'Stage-2 (Echelon Square)',
                        },
                        {
                            sn: 5,
                            name: 'Rap',
                            time: '1:00 PM',
                            venue: 'Stage-2 (Echelon Square)',
                        },
                    ],
                },
                {
                    category: 'Creative Canvas',
                    items: [
                        {
                            sn: 1,
                            name: 'Sketch/Painting',
                            time: '11:00 AM',
                            venue: 'Hawa Mahal',
                        },
                        {
                            sn: 2,
                            name: 'Face Painting',
                            time: '12:00 PM',
                            venue: 'Hawa Mahal',
                        },
                        {
                            sn: 3,
                            name: 'T-shirt Painting',
                            time: '2:00 PM',
                            venue: 'Hawa Mahal',
                        },
                        {
                            sn: 4,
                            name: 'Trash to Treasure',
                            time: '3:00 PM',
                            venue: 'Hawa Mahal',
                        },
                        {
                            sn: 5,
                            name: 'Rangoli',
                            time: '1:00 PM',
                            venue: 'Notice Board Area',
                        },
                    ],
                },
                {
                    category: 'Literary',
                    items: [
                        {
                            sn: 1,
                            name: 'Debate',
                            time: '10:00 AM',
                            venue: 'Seminar Hall',
                        },
                        {
                            sn: 2,
                            name: 'Declamation',
                            time: '11:30 AM',
                            venue: 'Seminar Hall',
                        },
                        {
                            sn: 3,
                            name: 'Poetry',
                            time: '12:30 PM',
                            venue: 'Seminar Hall',
                        },
                        {
                            sn: 4,
                            name: 'JAM',
                            time: '1:30 PM',
                            venue: 'Seminar Hall',
                        },
                        {
                            sn: 5,
                            name: 'Ad Mad Show',
                            time: '3:00 PM',
                            venue: 'Seminar Hall',
                        },
                        {
                            sn: 6,
                            name: 'Narrative Nexus (Hindi & English)',
                            time: '11:00 AM',
                            venue: 'G-12',
                        },
                        {
                            sn: 7,
                            name: 'The Change Makers Challenge',
                            time: 'End of Day 1',
                            venue: 'Online Submission',
                        },
                    ],
                },
                {
                    category: 'Technical Events',
                    items: [
                        {
                            sn: 1,
                            name: 'Roborace (Hurdles)',
                            time: '10:00 AM',
                            venue: 'ECE Lab',
                        },
                        {
                            sn: 2,
                            name: 'Roborace (Line Followers)',
                            time: '11:30 AM',
                            venue: 'ECE Lab',
                        },
                        {
                            sn: 3,
                            name: 'Hacksplash 2.0',
                            time: '10:00 AM',
                            venue: 'G-29 / F-37',
                        },
                        {
                            sn: 4,
                            name: 'Coding Battle',
                            time: '10:00 AM',
                            venue: 'CSE Lab S-15',
                        },
                        {
                            sn: 5,
                            name: 'Lan Gaming',
                            time: '10:00 AM',
                            venue: 'CSE Lab S-17',
                        },
                        {
                            sn: 6,
                            name: 'Tech Talk',
                            time: '11:30 AM',
                            venue: 'G-29 / F-37',
                        },
                    ],
                },
                {
                    category: 'Sports (Finals)',
                    items: [
                        {
                            sn: 1,
                            name: 'Volleyball',
                            time: '10:00 AM to 12:00 PM',
                            venue: 'Sports Ground',
                        },
                        {
                            sn: 2,
                            name: 'Basketball',
                            time: '10:00 AM to 12:00 PM',
                            venue: 'Sports Ground',
                        },
                        {
                            sn: 3,
                            name: 'Kabaddi',
                            time: '10:00 AM to 12:00 PM',
                            venue: 'Sports Ground',
                        },
                        {
                            sn: 4,
                            name: 'Table Tennis',
                            time: '10:00 AM to 12:00 PM',
                            venue: 'Sports Ground',
                        },
                    ],
                },
                {
                    category: 'Fashionscape',
                    items: [
                        {
                            sn: 1,
                            name: 'Fashion Show',
                            time: '3:00 PM',
                            venue: 'Main Stage',
                        },
                    ],
                },
                {
                    category: 'EDM Night',
                    items: [
                        {
                            sn: 1,
                            name: 'EDM Night',
                            time: '6:00 PM',
                            venue: 'Main Stage',
                        },
                    ],
                },
            ],
        },
        {
            title: 'Day 3 - Sunday, 17-11-2024',
            events: [
                {
                    category: 'Rhythm & Movement',
                    items: [
                        {
                            sn: 1,
                            name: 'Solo Dance',
                            time: '10:00 AM',
                            venue: 'Stage-2 (Echelon Square)',
                        },
                        {
                            sn: 2,
                            name: 'Duo Dance',
                            time: '11:00 AM',
                            venue: 'Main stage',
                        },
                        {
                            sn: 3,
                            name: 'Group Dance',
                            time: '12:00 PM',
                            venue: 'Main stage',
                        },
                        {
                            sn: 4,
                            name: 'Solo Battle',
                            time: '1:00 PM',
                            venue: 'Main stage',
                        },
                        {
                            sn: 5,
                            name: 'Group Battle',
                            time: '2:00 PM',
                            venue: 'Main stage',
                        },
                    ],
                },
                {
                    category: 'Curtain Call',
                    items: [
                        {
                            sn: 1,
                            name: 'Monologue',
                            time: '1:00 PM',
                            venue: 'Stage-2 (Echelon Square)',
                        },
                        {
                            sn: 2,
                            name: 'Nukkad Natika',
                            time: '3:00 PM',
                            venue: 'Ground',
                        },
                        {
                            sn: 3,
                            name: 'Stage Play',
                            time: '4:00 PM',
                            venue: 'Main stage',
                        },
                    ],
                },
                {
                    category: 'Raso-Vaisa',
                    items: [
                        {
                            sn: 1,
                            name: 'Fireless Flavour (Cooking without fire)',
                            time: '11:00 AM',
                            venue: 'G-22',
                        },
                        {
                            sn: 2,
                            name: 'Masterchef Showdown (Cooking on Fire)',
                            time: '1:00 PM',
                            venue: 'Chemistry Lab',
                        },
                    ],
                },
                {
                    category: 'Technical Events',
                    items: [
                        {
                            sn: 1,
                            name: 'Shark Tank',
                            time: '10:00 AM',
                            venue: 'G-29 / F-37',
                        },
                        {
                            sn: 2,
                            name: 'Ideathon',
                            time: '11:00 AM',
                            venue: 'G-29 / F-37',
                        },
                        {
                            sn: 3,
                            name: 'Technical Quiz',
                            time: '12:00 PM',
                            venue: 'G-29 / F-37',
                        },
                        {
                            sn: 4,
                            name: 'Arduino Project Battle',
                            time: '1:00 PM',
                            venue: 'G-29 / F-37',
                        },
                        {
                            sn: 5,
                            name: 'Technology for a Better World',
                            time: '2:00 PM',
                            venue: 'G-29 / F-37',
                        },
                    ],
                },
                {
                    category: 'Capture & Create',
                    items: [
                        {
                            sn: 1,
                            name: 'Snap & Showcase',
                            time: '12:00 Midnight',
                            venue: 'echiesta@eitfaridabad.co.in',
                        },
                        {
                            sn: 2,
                            name: 'Reel & Reveal',
                            time: '12:00 Midnight',
                            venue: 'echiesta@eitfaridabad.co.in',
                        },
                    ],
                },
                {
                    category: 'Runway of Knowledge',
                    items: [
                        {
                            sn: 1,
                            name: 'Fashion Show (Faculty)',
                            time: '6:30 PM',
                            venue: 'Main stage',
                        },
                    ],
                },
                {
                    category: 'Star Night with Aastha Gill',
                    items: [
                        {
                            sn: 1,
                            name: 'Star Night',
                            time: '7:00 PM',
                            venue: 'Main stage',
                        },
                    ],
                },
            ],
        },
    ];

    return (
        <div className="p-4 sm:p-8 bg-transparent">
            <h1 className="text-5xl mb-4 font-bold" data-aos="fade-right">
                <span>EC</span>
                <span>
                    H<span className="text-red-600">IE</span>STA
                </span>
                <span>-</span>
                <span className="text-red-600">2K</span>
                <span>24</span>
                <br className="sm:hidden" />
                <span> EVE</span>
                <span>
                    NT<span className="text-red-600"> SCHE</span>DULS
                </span>
            </h1>

            <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0">
                {days.map((day, index) => (
                    <div key={index} className="w-full md:w-1/3">
                        <button
                            onClick={() => toggleDay(index)}
                            className={`w-full text-left p-3 sm:p-4 bg-red-600 text-white font-semibold rounded-lg transition-colors ${
                                activeDay === index ? 'bg-red-700' : ''
                            }`}
                        >
                            {day.title}
                        </button>
                        {activeDay === index && (
                            <div className="mt-2 p-3 sm:p-4 rounded-lg shadow-md bg-opacity-50 bg-gray-800">
                                {day.events.map((event, eventIndex) => (
                                    <div key={eventIndex} className="mb-4">
                                        <button
                                            onClick={() =>
                                                toggleCategory(eventIndex)
                                            }
                                            className="w-full text-left p-2 sm:p-3 font-semibold bg-red-700 text-white rounded-lg mb-2"
                                        >
                                            {event.category}
                                        </button>
                                        {activeCategory === eventIndex && (
                                            <div className="overflow-x-auto">
                                                <table className="w-full text-left border border-red-200 text-sm sm:text-base">
                                                    <thead>
                                                        <tr className="bg-red-200 text-red-700">
                                                            <th className="py-1 px-2 sm:py-2 sm:px-4 border">
                                                                S.N.
                                                            </th>
                                                            <th className="py-1 px-2 sm:py-2 sm:px-4 border">
                                                                Event
                                                            </th>
                                                            <th className="py-1 px-2 sm:py-2 sm:px-4 border">
                                                                Time
                                                            </th>
                                                            <th className="py-1 px-2 sm:py-2 sm:px-4 border">
                                                                Venue
                                                            </th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {event.items.map(
                                                            (
                                                                item,
                                                                itemIndex
                                                            ) => (
                                                                <tr
                                                                    key={
                                                                        itemIndex
                                                                    }
                                                                    className="hover:bg-red-700 text-white"
                                                                >
                                                                    <td className="py-1 px-2 sm:py-2 sm:px-4 border">
                                                                        {
                                                                            item.sn
                                                                        }
                                                                    </td>
                                                                    <td className="py-1 px-2 sm:py-2 sm:px-4 border">
                                                                        {
                                                                            item.name
                                                                        }
                                                                    </td>
                                                                    <td className="py-1 px-2 sm:py-2 sm:px-4 border">
                                                                        {
                                                                            item.time
                                                                        }
                                                                    </td>
                                                                    <td className="py-1 px-2 sm:py-2 sm:px-4 border">
                                                                        {
                                                                            item.venue
                                                                        }
                                                                    </td>
                                                                </tr>
                                                            )
                                                        )}
                                                    </tbody>
                                                </table>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default EventSchedule;
