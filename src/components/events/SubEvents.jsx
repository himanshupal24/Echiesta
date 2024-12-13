import EVENTS from '../../data/events.json';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SubEvents = () => {
    const [subEvents, setSubEvents] = useState([]);
    const [title, setTitle] = useState();
    const [selectedSubEvent, setSelectedSubEvent] = useState(null); // State to track the selected sub-event
    const [isDialogOpen, setIsDialogOpen] = useState(false); // State to track dialog visibility
    const navigate = useNavigate();

    useEffect(() => {
        const storedCategory = localStorage.getItem('category');

        if (storedCategory) {
            // Find the event based on the stored category (event ID)
            const selectedEvent = EVENTS.find(
                (event) => event.id === storedCategory
            );

            if (selectedEvent) {
                setTitle(selectedEvent.title.split(' ')[0]);
                setSubEvents(selectedEvent.subEvents); // Set subEvents for the found event
            }
        }
    }, []);

    // Function to handle "More Details" button click
    const handleMoreDetails = (subEvent) => {
        setSelectedSubEvent(subEvent); // Set the selected sub-event for the dialog
        setIsDialogOpen(true); // Open the dialog
    };

    // Function to handle closing the dialog
    const handleCloseDialog = () => {
        setIsDialogOpen(false); // Close the dialog
    };

    const handleClick = (subEvent) => {
        setSelectedSubEvent(subEvent);
        navigate('/registration');
    };

    return (
        <div className="p-8">
            <h1 className="text-6xl text-white font-heading shadow-heading border-b-2 border-red-600 text-center mb-8">
                <span className="text-red-500">{title} </span>
                Ev<span className="text-red-500">en</span>ts
            </h1>

            {subEvents.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 ">
                    {subEvents.map((subEvent, index) => (
                        <div
                            key={index}
                            className="bg-gray-800 text-white p-6 rounded-lg shadow-md flex flex-col align-top"
                            data-aos="fade-up"
                            data-aos-delay={`${index * 100}`}
                        >
                            <h2 className="text-2xl font-bold mb-4">
                                {subEvent.title || subEvent.name}
                            </h2>
                            {subEvent.description && (
                                <p className="mb-4">{subEvent.description}</p>
                            )}
                            {subEvent.entryFees && (
                                <p className="mb-2">
                                    <strong>Entry Fees:</strong>{' '}
                                    {subEvent.entryFees}
                                </p>
                            )}
                            {subEvent.cashPrize && (
                                <p className="mb-2">
                                    <strong>Cash Prize:</strong>{' '}
                                    {`₹ ${subEvent.cashPrize['1st Prize']}`}
                                </p>
                            )}
                            {subEvent.Participation && (
                                <p className="mb-4">
                                    <strong>Participation:</strong>{' '}
                                    {subEvent.Participation}
                                </p>
                            )}

                            {/* Check for subSubEvents */}
                            {/* Check for subSubEvents */}
                            {subEvent.subSubEvents ? (
                                subEvent.subSubEvents.length > 0 && (
                                    <div className="mt-4">
                                        <h3 className="text-xl font-semibold">
                                            {subEvent.EventTitle}
                                        </h3>
                                        {subEvent.subSubEvents.map(
                                            (subSubEvent, subIndex) => (
                                                <div
                                                    key={subIndex}
                                                    className="bg-gray-700 p-4 rounded-lg mt-2"
                                                >
                                                    <h4 className="text-lg font-bold">
                                                        {subSubEvent.name}
                                                    </h4>
                                                    <p>
                                                        Entry Fees:{' '}
                                                        {subSubEvent.entryFees}
                                                    </p>
                                                    <p>
                                                        Participation:{' '}
                                                        {
                                                            subSubEvent.Participation
                                                        }
                                                    </p>
                                                    <div className="flex justify-between mt-2 space-x-2">
                                                        <button
                                                            onClick={() =>
                                                                handleMoreDetails(
                                                                    subSubEvent
                                                                )
                                                            }
                                                            className="bg-red-600 text-white px-4 py-2 md:px-6 md:py-3 text-sm md:text-base rounded-lg w-full sm:w-auto"
                                                        >
                                                            More Details
                                                        </button>
                                                        <button
                                                            onClick={() =>
                                                                handleClick(
                                                                    subSubEvent
                                                                )
                                                            }
                                                            className="bg-red-600 text-white px-4 py-2 md:px-6 md:py-3 text-sm md:text-base rounded-lg w-full sm:w-auto"
                                                        >
                                                            Register
                                                        </button>
                                                    </div>
                                                </div>
                                            )
                                        )}
                                    </div>
                                )
                            ) : (
                                <div className="flex justify-between mt-auto space-x-2">
                                    <button
                                        onClick={() =>
                                            handleMoreDetails(subEvent)
                                        }
                                        className="bg-red-600 text-white px-4 py-2 md:px-6 md:py-3 text-sm md:text-base rounded-lg w-full sm:w-auto"
                                    >
                                        More Details
                                    </button>
                                    <button
                                        onClick={() => handleClick(subEvent)}
                                        className="bg-red-600 text-white px-4 py-2 md:px-6 md:py-3 text-sm md:text-base rounded-lg w-full sm:w-auto"
                                    >
                                        Register
                                    </button>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-center text-xl text-white">
                    No Sub Events Available
                </p>
            )}

            {isDialogOpen && selectedSubEvent && (
                <div className="fixed inset-0 flex items-center justify-center z-[1000] bg-black bg-opacity-50">
                    <div className="h-4/5 p-6 md:p-10 w-11/12 md:w-2/3 lg:w-1/2 xl:w-1/3 bg-gray-800 rounded-lg text-white max-h-[90vh] overflow-y-auto">
                        <h1 className="text-2xl md:text-4xl lg:text-5xl font-heading border-b-2 border-red-600 text-center mb-4 lg:mb-6">
                            {selectedSubEvent.name.split(' ')[0]}{' '}
                            <span className="text-red-500">
                                {selectedSubEvent.name.split(' ')[1]}
                            </span>{' '}
                            Event
                        </h1>
                        <div className="h-4/5 overflow-y-scroll">
                            <h1 className="text-xl md:text-2xl lg:text-3xl font-bold mb-4">
                                Details
                            </h1>
                            {selectedSubEvent.Dates && (
                                <p className="mb-2">
                                    <strong>Date:</strong>{' '}
                                    {selectedSubEvent.Dates}
                                </p>
                            )}
                            {selectedSubEvent.venue && (
                                <p className="mb-2">
                                    <strong>Venue:</strong>{' '}
                                    {selectedSubEvent.venue}
                                </p>
                            )}
                            {selectedSubEvent.time && (
                                <p className="mb-2">
                                    <strong>Timings:</strong>{' '}
                                    {selectedSubEvent.time}
                                </p>
                            )}
                            {selectedSubEvent.entryFees && (
                                <p className="mb-2">
                                    <strong>Entry Fees:</strong>{' '}
                                    {selectedSubEvent.entryFees}
                                </p>
                            )}
                            {selectedSubEvent.TeamSize && (
                                <p className="mb-4">
                                    <strong>Participants:</strong>{' '}
                                    {selectedSubEvent.TeamSize}
                                    {selectedSubEvent.Reserve && (
                                        <strong>
                                            {' '}
                                            + {selectedSubEvent.Reserve} reserve
                                        </strong>
                                    )}
                                </p>
                            )}
                            {selectedSubEvent.cashPrize && (
                                <div className="mb-2">
                                    <strong>Cash Prizes:</strong>
                                    <ul>
                                        {Object.keys(
                                            selectedSubEvent.cashPrize
                                        ).map((prizeKey, idx) => (
                                            <li key={idx}>
                                                {prizeKey}: ₹{' '}
                                                {
                                                    selectedSubEvent.cashPrize[
                                                        prizeKey
                                                    ]
                                                }
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                            {selectedSubEvent.details && (
                                <div className="mt-4 text-left">
                                    {selectedSubEvent.details
                                        .teamComposition && (
                                        <p>
                                            <strong>Team Composition:</strong>{' '}
                                            {
                                                selectedSubEvent.details
                                                    .teamComposition
                                            }
                                        </p>
                                    )}
                                    {selectedSubEvent.details.scoring && (
                                        <p>
                                            <strong>Scoring:</strong>{' '}
                                            {selectedSubEvent.details.scoring}
                                        </p>
                                    )}
                                    {selectedSubEvent.details.gameDuration && (
                                        <p>
                                            <strong>Game Duration:</strong>{' '}
                                            {
                                                selectedSubEvent.details
                                                    .gameDuration
                                            }
                                        </p>
                                    )}
                                </div>
                            )}
                            {selectedSubEvent.members && (
                                <p className="mb-4">
                                    <strong>Members:</strong>{' '}
                                    {selectedSubEvent.members}
                                </p>
                            )}
                        </div>
                        <div className="flex justify-center mt-6">
                            <button
                                onClick={handleCloseDialog}
                                className="bg-white text-black px-4 py-2 rounded-lg"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SubEvents;
