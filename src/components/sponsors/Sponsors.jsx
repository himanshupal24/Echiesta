const Sponsors = ({ images, speed }) => {
    return (
        <section
            id="sponsors"
            className="bg-transparent backdrop-blur-md pl-10 pr-10 w-full flex flex-col items-center pt-10 pb-10 text-white h-[60vh]"
        >
            <h1 className="text-6xl font-heading shadow-heading border-b-2 border-red-600 mb-4">
                <span>O</span>
                <span className="text-red-500 font-heading">u</span>
                {'r '}
                <span>Sp</span>
                <span className="text-red-500 font-heading">ons</span>
                {'ors & '}
                <span>St</span>
                <span className="text-red-500 font-heading">al</span>
                {'ls '}
            </h1>
            <div className="relative w-full overflow-hidden h-full flex items-center">
                <div className="absolute flex">
                    {/* First section of images */}
                    <section
                        className="flex animate-swipe"
                        style={{ '--speed': `${speed}ms` }}
                    >
                        {images.map(({ id, image, title, link }) =>
                            image ? (
                                <a
                                    href={link}
                                    target="_blank"
                                    className="flex-shrink-0  flex flex-col items-center self-end"
                                    key={id}
                                >
                                    <img
                                        loading="lazy"
                                        src={image}
                                        alt={id}
                                        className="max-w-[180px]  object-cover px-3 mx-5 rounded-lg"
                                    />
                                    <span className="text-white font-heading tracking-[2px] mt-4">
                                        {title}
                                    </span>
                                </a>
                            ) : (
                                <div
                                    key={id}
                                    className="h-full w-[20vw] text-6xl flex items-center justify-center"
                                >
                                    <span className="w-2/4 text-white font-heading underline">
                                        {title}
                                    </span>
                                </div>
                            )
                        )}
                    </section>
                    {/* First section of images */}
                    <section
                        className="flex animate-swipe"
                        style={{ '--speed': `${speed}ms` }}
                    >
                        {images.map(({ id, image, title, link }) =>
                            image ? (
                                <a
                                    href={link}
                                    target="_blank"
                                    className="flex-shrink-0  flex flex-col items-center self-end"
                                    key={id}
                                >
                                    <img
                                        loading="lazy"
                                        src={image}
                                        alt={id}
                                        className="max-w-[180px]  object-cover px-3 mx-5 rounded-lg"
                                    />
                                    <span className="text-white font-heading tracking-[2px] mt-4">
                                        {title}
                                    </span>
                                </a>
                            ) : (
                                <div
                                    key={id}
                                    className="h-full w-[20vw] text-6xl flex items-center justify-center"
                                >
                                    <span className="w-2/4 text-white font-heading underline">
                                        {title}
                                    </span>
                                </div>
                            )
                        )}
                    </section>
                    {/* First section of images */}
                    <section
                        className="flex animate-swipe"
                        style={{ '--speed': `${speed}ms` }}
                    >
                        {images.map(({ id, image, title, link }) =>
                            image ? (
                                <a
                                    href={link}
                                    target="_blank"
                                    className="flex-shrink-0  flex flex-col items-center self-end"
                                    key={id}
                                >
                                    <img
                                        loading="lazy"
                                        src={image}
                                        alt={id}
                                        className="max-w-[180px]  object-cover px-3 mx-5 rounded-lg"
                                    />
                                    <span className="text-white font-heading tracking-[2px] mt-4">
                                        {title}
                                    </span>
                                </a>
                            ) : (
                                <div
                                    key={id}
                                    className="h-full w-[20vw] text-6xl flex items-center justify-center"
                                >
                                    <span className="w-2/4 text-white font-heading underline">
                                        {title}
                                    </span>
                                </div>
                            )
                        )}
                    </section>
                </div>
            </div>
        </section>
    );
};

export default Sponsors;
