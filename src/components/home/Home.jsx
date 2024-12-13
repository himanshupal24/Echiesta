import React, { lazy, useCallback, useMemo, Suspense } from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';
import { useMediaQuery } from 'react-responsive';
import { useNavigate } from 'react-router-dom';

// Lazy load components
const Events = lazy(() => import('../events/Events'));
const Content = lazy(() => import('../about/Content'));
const Alumni = lazy(() => import('../alumni/Alumni'));
const Gallery = lazy(() => import('../gallery/Gallery'));
const Sponsors = lazy(() => import('../sponsors/Sponsors'));
const Contact = lazy(() => import('../contact/Contact'));
const Footer = lazy(() => import('../layout/Footer'));
const Loader = lazy(() => import('../loader/Loader'));

// Carousel items and configuration
const items = [
    {
        img: '/gallery/2.webp',
        imgSm: '/gallery/12.webp',
        title1: 'Echiesta: Unleashing Talent, ',
        title2: 'Technology, and Triumph!',
        subtitle: 'Where Innovation Meets Culture and Sports',
        subtitle2: '15TH, 16TH , 17TH NOV 2K24',
    },
    {
        img: '/gallery/4.webp',
        imgSm: '/gallery/13.webp',
        title1: 'WITNESS THE',
        title2: 'GRAND FEST',
        subtitle: 'Echelon Institute of Technology',
        subtitle2: '15TH, 16TH , 17TH NOV 2K24',
    },
    {
        img: '/gallery/2.webp',
        imgSm: '/gallery/14.webp',
        title1: 'Echiesta: Unleashing Talent, ',
        title2: 'Technology, and Triumph!',
        subtitle: 'Where Innovation Meets Culture and Sports',
        subtitle2: '15TH, 16TH , 17TH NOV 2K24',
    },
];

const config = {
    showArrows: true,
    showStatus: false,
    showThumbs: false,
    showIndicators: false,
    swipeable: false, // Enable swipe for better mobile experience
    autoPlay: true,
    infiniteLoop: true,
    interval: 3000,
    stopOnHover: false, // Avoid stopping autoplay on hover
};

const Home = () => {
    const isMobile = useMediaQuery({ query: `(max-width: 760px)` });
    const navigate = useNavigate();

    // Memoize navigation to avoid re-creating function on re-renders
    const handlePasses = useCallback(() => {
        navigate('/concert');
    }, [navigate]);

    // Memoize sponsor images to prevent unnecessary re-renders
    const sponsors = useMemo(
        () => [
            {
                id: 'C1',
                title: 'Creative Partner',
            },
            {
                id: 'L1',
                image: '/sponsors/l1.webp',
                title: 'Inluv with Resin',
                link: 'https://www.inluvwithresin.com/',
            },
            {
                id: 'L2',
                image: '/sponsors/l2.webp',
                title: 'Wrapping Studio',
                link: 'https://wrappingstudio.in/',
            },
            {
                id: 'C2',
                title: 'Culinary Hardware Partner',
            },
            { id: 'L3', image: '/sponsors/l3.webp', title: 'Kvalit', link: '' },

            {
                id: 'C3',
                title: 'Fashion partner',
            },
            {
                id: 'L4',
                image: '/sponsors/l4.webp',
                title: 'Maximum',
                link: 'https://maps.app.goo.gl/s2LAFe72vN9CD1Bx8',
            },
            {
                id: 'L5',
                image: '/sponsors/l5.webp',
                title: 'Sant Heartland',
                link: 'https://www.instagram.com/santheartland/',
            },
            {
                id: 'L6',
                image: '/sponsors/l6.webp',
                title: 'Streeism',
                link: 'https://www.instagram.com/streeism_/',
            },

            {
                id: 'C4',
                title: 'Fittness Partner',
            },
            { id: 'L7', image: '/sponsors/l7.webp', title: '', link: '' },
            {
                id: 'L8',
                image: '/sponsors/l8.webp',
                title: 'Revive Nutrition',
                link: 'https://www.instagram.com/revive_nutrition07/',
            },
            {
                id: 'L9',
                image: '/sponsors/l9.webp',
                title: 'Revive Nutrition',
                link: 'https://www.instagram.com/revive_nutrition07/',
            },

            {
                id: 'C5',
                title: 'Food Stalls',
            },
            {
                id: 'L10',
                image: '/sponsors/l10.webp',
                title: 'Adzone Communication',
                link: 'https://adzonecommunications.com/',
            },
            {
                id: 'L11',
                image: '/sponsors/l11.webp',
                title: 'AR Foods',
                link: '',
            },
            {
                id: 'L12',
                image: '/sponsors/l12.webp',
                title: 'Chamchaa',
                link: '',
            },
            {
                id: 'L13',
                image: '/sponsors/l13.webp',
                title: 'Devine Delights',
                link: '',
            },
            {
                id: 'L14',
                image: '/sponsors/l14.webp',
                title: 'Hostel Wala Adda',
                link: '',
            },
            {
                id: 'L15',
                image: '/sponsors/l15.webp',
                title: 'Pizza Hut',
                link: '',
            },
            {
                id: 'L16',
                image: '/sponsors/l16.webp',
                title: 'Pizza N Burger Hub',
                link: '',
            },
            {
                id: 'L17',
                image: '/sponsors/l17.webp',
                title: 'Sip It! Flex It',
                link: '',
            },
            {
                id: 'L18',
                image: '/sponsors/l18.webp',
                title: 'Surbhi Bakery',
                link: '',
            },
            {
                id: 'L19',
                image: '/sponsors/l19.webp',
                title: 'Tariwala Restaurant',
                link: '',
            },
            {
                id: 'L20',
                image: '/sponsors/l20.webp',
                title: 'Virat Cocolates and Gifts',
                link: '',
            },

            {
                id: 'C6',
                title: 'Gaming Partner',
            },
            {
                id: 'L21',
                image: '/sponsors/l21.webp',
                title: "Addy's Arena",
                link: '',
            },

            {
                id: 'C7',
                title: 'Healthcare Partners',
            },
            {
                id: 'L22',
                image: '/sponsors/l22.webp',
                title: 'Akshom Hospital',
                link: '',
            },
            {
                id: 'L23',
                image: '/sponsors/l23.webp',
                title: 'Santosh Hospital',
                link: '',
            },

            {
                id: 'C8',
                title: 'Technical Partner',
            },
            {
                id: 'L24',
                image: '/sponsors/l24.webp',
                title: 'GTT Barclays',
                link: '',
            },
            {
                id: 'L25',
                image: '/sponsors/l25.webp',
                title: 'CETPA',
                link: '',
            },
            {
                id: 'L26',
                image: '/sponsors/l26.webp',
                title: 'CISCO Academy',
                link: '',
            },
            {
                id: 'L27',
                image: '/sponsors/l27.webp',
                title: 'Edunet',
                link: '',
            },
            {
                id: 'L28',
                image: '/sponsors/l28.webp',
                title: 'IBM Skill Build',
                link: '',
            },
            {
                id: 'L29',
                image: '/sponsors/l29.webp',
                title: 'NIIT Foundation',
                link: '',
            },
            { id: 'L30', image: '/sponsors/l30.webp', title: 'SPi', link: '' },
            { id: 'L31', image: '/sponsors/l31.webp', title: 'TCS', link: '' },
            {
                id: 'L32',
                image: '/sponsors/l32.webp',
                title: 'Zenith',
                link: '',
            },
        ],
        []
    );

    return (
        <>
            <section id="home" className="w-full text-white bg-theme-black">
                <Carousel {...config}>
                    {items.map((item, idx) => (
                        <div className="relative" key={idx.toString()}>
                            <img
                                src={isMobile ? item.imgSm : item.img}
                                alt=""
                                className="h-[80vh] md:h-[calc(100vh-50px)] object-fit w-full"
                            />

                            {/* Text overlay */}
                            {item.title1 && (
                                <div className="absolute top-0 left-0 w-full h-full flex flex-col items-start justify-center pl-6 md:pl-24 bg-black bg-opacity-50">
                                    <p className="text-3xl md:text-6xl font-thin tracking-widest leading-tight">
                                        <span className="font-extrabold">
                                            {item.title1.split(' ')[0]}
                                        </span>
                                        {item.title1.slice(
                                            item.title1.indexOf(' ')
                                        )}
                                    </p>
                                    {item.title2 && (
                                        <p className="text-2xl md:text-5xl font-thin tracking-widest leading-tight pt-4 md:pt-8">
                                            {item.title2}
                                        </p>
                                    )}
                                    {item.subtitle && (
                                        <p className="pt-4 md:pt-8 text-lg md:text-2xl text-left pr-2">
                                            {item.subtitle}
                                        </p>
                                    )}
                                    {item.subtitle2 && (
                                        <p className="pt-2 md:pt-4 text-lg md:text-2xl text-left pr-2">
                                            {item.subtitle2}
                                        </p>
                                    )}

                                    <button
                                        onClick={handlePasses}
                                        className="bg-red-600 text-white px-10 py-5 mt-5 ml-10 rounded-lg"
                                    >
                                        Get Concert Passes
                                    </button>
                                </div>
                            )}
                        </div>
                    ))}
                </Carousel>
            </section>

            {/* Suspense for lazy-loaded sections */}
            <Suspense fallback={<Loader />}>
                <Events />
                <Content />
                <Alumni />
                <Gallery />
                <Sponsors images={sponsors} speed={50000} />
                <Contact />
                <Footer />
            </Suspense>
        </>
    );
};

export default Home;
