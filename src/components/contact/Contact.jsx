import React from 'react';
import Iframe from 'react-iframe';

const Faculty = [
    {
        post: 'Technical',
        name: 'Ms. Pinky Yadav',
        phone: { 0: '9650272703' },
    },
    {
        post: 'Literary',
        name: 'Ms. Mouloima Das',
        phone: { 0: '7011392342' },
    },
    {
        post: 'Cultural',
        name: 'Ms. Tanya Chauhan',
        phone: { 0: '7303600737' },
    },
    {
        post: 'Fine Arts',
        name: 'Ms. Richa Suryavanshi',
        phone: { 0: '9418216352' },
    },
    {
        post: 'Sports',
        name: 'Mr. Anuj Gangwar',
        phone: { 0: '6395497604' },
    },
    {
        post: 'SharkTank',
        name: 'Mr. Shalabh Saxena',
        phone: { 0: '9917930453' },
    },
    {
        post: 'Sponsor',
        name: 'Ms. Priyanka',
        phone: { 0: '9899168009' },
    },
];

const Student = [
    {
        post: 'Technical',
        name: 'Bhavya Shingari',
        phone: { 0: '8800109091' },
    },
    {
        post: 'Literary',
        name: 'Chetna',
        phone: { 0: '8076448301' },
    },
    {
        post: 'Sports',
        name: 'Gurdeep Kankarwal',
        phone: { 0: '9818583633' },
    },
    {
        post: 'Cultural & Fine arts',
        name: 'Pranav Banga',
        phone: { 0: '9354658539' },
    },
    {
        post: 'Sponsor',
        name: 'Gagan Aggarwal',
        phone: { 0: '8077472073', 1: 'https://wa.link/0656fd' },
    },
];

const Contact = () => {
    return (
        <section
            id="contact"
            className="w-full bg-transparent text-white flex justify-center items-center pb-10"
        >
            <div className="background flex min-h-[100vh] items-center justify-center w-full px-4 md:px-0 pb-8">
                <div className="form-container p-4 w-full max-w-[1200px] flex flex-wrap justify-center items-center">
                    <div className="form bg-transparent backdrop-blur-sm rounded-xl w-full shadow-[0px_0px_20px_10px_rgba(255,255,255,0.2)]">
                        <div className="form-header flex items-center py-[10px] px-[20px] bg-slate-500/30 backdrop-blur-sm rounded-t-xl h-12">
                            <div className="form-header-left w-1/2 flex justify-start">
                                <div className="close mx-1 inline-block w-3 h-3 rounded-full bg-rose-600 cursor-pointer"></div>
                                <div className="maximize mx-1 inline-block w-3 h-3 rounded-full bg-amber-300 cursor-pointer"></div>
                                <div className="minimize mx-1 inline-block w-3 h-3 rounded-full bg-green-700 cursor-pointer"></div>
                            </div>
                            <div className="flex w-1/2 justify-end">
                                <div className=" w-2 h-2 ml-1 rounded-full bg-slate-400"></div>
                                <div className=" w-2 h-2 ml-1 rounded-full bg-slate-400"></div>
                                <div className=" w-2 h-2 ml-1 rounded-full bg-slate-400"></div>
                            </div>
                        </div>
                        <div className="form-body flex flex-col md:flex-row p-4 md:p-8 lg:p-14 justify-center ">
                            <div className="form-body-item left flex flex-col w-full md:w-1/2">
                                <div className="app-title flex justify-center text-2xl md:text-4xl mb-4">
                                    <span>CONTACT</span>{' '}
                                    <span className="ml-2">US</span>
                                </div>
                                <div className="flex flex-col-reverse md:flex-col">
                                    <div className="form-map rounded-lg py-2 w-full">
                                        <div className="w-full h-[220px] md:w-[500px] md:h-[400px] mb-4">
                                            <Iframe
                                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3509.9285322116666!2d77.43729327549204!3d28.391226475797325!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cc396202390af%3A0xf7891d8025d636ed!2sEchelon%20Institute%20Of%20Technology!5e0!3m2!1sen!2sin!4v1727252557814!5m2!1sen!2sin"
                                                style={{ border: 0 }}
                                                allowFullScreen=""
                                                loading="lazy"
                                                referrerPolicy="no-referrer-when-downgrade"
                                                className="rounded-lg w-full h-full"
                                            />
                                        </div>
                                    </div>
                                    <div className="app-contact text-sm flex flex-col md:text-left">
                                        <p>Contact : +91 9999753763</p>
                                        <p>
                                            Email : echiesta@eitfaridabad.co.in
                                        </p>
                                        <p>
                                            Kheri-Manjhawali Road, Naharpar,
                                            Kabulpur Patti Mahtab, Faridabad,
                                            Haryana 121101
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="form-body-item w-full h-[60vh] md:w-1/2 flex flex-col justify-center p-4 md:p-0">
                                <h6 className="text-2xl font-heading shadow-heading border-b-2 border-red-600 mb-1">
                                    <span>Faculty </span>
                                    <span>Co-ordinators</span>
                                </h6>
                                <div className="table-container overflow-hidden relative h-2/4 p-4 ">
                                    <div className="animate-scroll overflow-x-auto">
                                        {/* Faculty Table */}
                                        <table className="w-full text-left bg-transparent border-collapse">
                                            <tbody className="text-sm md:text-base">
                                                {Faculty.map((item, index) => (
                                                    <tr
                                                        key={index}
                                                        className="hover:bg-slate-500/20 transition duration-300"
                                                    >
                                                        <td className="border-b border-white px-4 md:px-6 py-4">
                                                            {item.post}
                                                        </td>
                                                        <td className="border-b border-white px-4 md:px-6 py-4">
                                                            {item.name}
                                                        </td>
                                                        <td className="border-b border-white px-4 md:px-6 py-4">
                                                            <a
                                                                href={`${
                                                                    item
                                                                        .phone[1]
                                                                        ? item
                                                                              .phone[1]
                                                                        : 'tel:' +
                                                                          item
                                                                              .phone[0]
                                                                }`}
                                                                target="_blank"
                                                                className="text-blue-300 hover:text-blue-500"
                                                            >
                                                                {item.phone[0]}
                                                            </a>
                                                        </td>
                                                    </tr>
                                                ))}
                                                {/* Duplicate Content */}
                                                {Faculty.map((item, index) => (
                                                    <tr
                                                        key={
                                                            index +
                                                            Faculty.length
                                                        }
                                                        className="hover:bg-slate-500/20 transition duration-300"
                                                    >
                                                        <td className="border-b border-white px-4 md:px-6 py-4">
                                                            {item.post}
                                                        </td>
                                                        <td className="border-b border-white px-4 md:px-6 py-4">
                                                            {item.name}
                                                        </td>
                                                        <td className="border-b border-white px-4 md:px-6 py-4">
                                                            <a
                                                                href={`${
                                                                    item
                                                                        .phone[1]
                                                                        ? item
                                                                              .phone[1]
                                                                        : 'tel:' +
                                                                          item
                                                                              .phone[0]
                                                                }`}
                                                                target="_blank"
                                                                className="text-blue-300 hover:text-blue-500"
                                                            >
                                                                {item.phone[0]}
                                                            </a>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                <h6 className="text-2xl font-heading shadow-heading border-b-2 border-red-600 mb-1">
                                    <span>Student Coordinators</span>
                                </h6>
                                <div className="table-container overflow-hidden relative h-2/4 p-4">
                                    <div className="animate-scroll overflow-x-auto">
                                        {/* Student Table */}
                                        <table className="w-full text-left bg-transparent border-collapse">
                                            <tbody className="text-sm md:text-base">
                                                {Student.map((item, index) => (
                                                    <tr
                                                        key={index}
                                                        className="hover:bg-slate-500/20 transition duration-300"
                                                    >
                                                        <td className="border-b border-white px-4 md:px-6 py-4">
                                                            {item.post}
                                                        </td>
                                                        <td className="border-b border-white px-4 md:px-6 py-4">
                                                            {item.name}
                                                        </td>
                                                        <td className="border-b border-white px-4 md:px-6 py-4">
                                                            <a
                                                                href={`${
                                                                    item
                                                                        .phone[1]
                                                                        ? item
                                                                              .phone[1]
                                                                        : 'tel:' +
                                                                          item
                                                                              .phone[0]
                                                                }`}
                                                                target="_blank"
                                                                className="text-blue-300 hover:text-blue-500"
                                                            >
                                                                {item.phone[0]}
                                                            </a>
                                                        </td>
                                                    </tr>
                                                ))}
                                                {Student.map((item, index) => (
                                                    <tr
                                                        key={index}
                                                        className="hover:bg-slate-500/20 transition duration-300"
                                                    >
                                                        <td className="border-b border-white px-4 md:px-6 py-4">
                                                            {item.post}
                                                        </td>
                                                        <td className="border-b border-white px-4 md:px-6 py-4">
                                                            {item.name}
                                                        </td>
                                                        <td className="border-b border-white px-4 md:px-6 py-4">
                                                            <a
                                                                href={`${
                                                                    item
                                                                        .phone[1]
                                                                        ? item
                                                                              .phone[1]
                                                                        : 'tel:' +
                                                                          item
                                                                              .phone[0]
                                                                }`}
                                                                target="_blank"
                                                                className="text-blue-300 hover:text-blue-500"
                                                            >
                                                                {item.phone[0]}
                                                            </a>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <style>
                {`
                    .animate-scroll {
                        position: absolute;
                        top: 0;
                        width: 100%;
                        animation: scroll 10s linear infinite;
                    }

                    @keyframes scroll {
                        0% { transform: translateY(0); }
                        100% { transform: translateY(-50%); }
                    }
                `}
            </style>
        </section>
    );
};

export default Contact;
