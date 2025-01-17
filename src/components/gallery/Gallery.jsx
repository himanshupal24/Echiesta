import React, { useState } from 'react';
import data from '../../data/gallery.json';
import { ReactComponent as CloseIcon } from '../../assets/icons/close-icon.svg';

// Lazy load the GalleryItem component
const GalleryItem = React.lazy(() => import('./GalleryItem'));

const Gallery = () => {
    const [open, setOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState('');

    const handleOpen = (imgSrc) => {
        setOpen(true);
        setSelectedImage(imgSrc);
    };

    const handleClose = () => {
        setOpen(false);
        setSelectedImage('');
    };

    return (
        <section
            id="gallery"
            className="min-h-screen w-full bg-transparent text-white flex flex-col justify-center items-center py-16 pl-16"
        >
            <div className="pb-12">
                <h1 className="text-6xl font-heading shadow-heading border-b-2 border-red-600">
                    GLIMPSES<span className="text-red-500"> OF</span> ECHIESTA
                </h1>
            </div>

            <div className="gallery">
                {data.map((item, idx) => (
                    <GalleryItem
                        key={idx.toString()}
                        data={{
                            ...item,
                            lazyLoading: true, // Pass as a prop to enable lazy loading
                        }}
                        onClickHandler={() => handleOpen(item.url)}
                    />
                ))}
            </div>

            {/* Conditionally render modal only when open */}
            {open && (
                <div className="modal open">
                    <div className="fixed top-[10px] right-[10px] p-2">
                        <CloseIcon
                            width={30}
                            height={30}
                            className="cursor-pointer"
                            onClick={handleClose}
                        />
                    </div>

                    <img src={selectedImage} alt="" loading="lazy" />
                </div>
            )}
        </section>
    );
};

export default Gallery;
