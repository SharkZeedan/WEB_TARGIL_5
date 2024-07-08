import { useEffect, useState, useRef } from "preact/hooks";
import { Swipe, Thumbnail, Image } from "./components/index.jsx";
import reactIcon from "./assets/preact.svg";

function App() {
    const [images, setImages] = useState([]);
    const [currentImage, setCurrentImage] = useState(null);
    const carouselRef = useRef(null);

    /* Fetch 20 images */
    useEffect(() => {
        async function loadImages() {
            const imagePromises = [];

            for (let i = 0; i < 20; i++) {
                const loadImage = async (index) => {
                    const thumbnailResponse = await fetch(`https://picsum.photos/id/${index}/150/150`);
                    const response = await fetch(`https://picsum.photos/id/${index}/1024/720`);
                    const thumbnailBlob = await thumbnailResponse.blob();
                    const blob = await response.blob();
                    return {
                        id: index,
                        src: URL.createObjectURL(blob),
                        thumbnail: URL.createObjectURL(thumbnailBlob),
                    };
                };
                imagePromises.push(loadImage(i));
            }

            const loadedImages = await Promise.all(imagePromises);
            setImages(loadedImages);
            setCurrentImage(loadedImages[0]);
        }

        if (images.length === 0) {
            loadImages().then(() => {
                console.log("Images loaded");
            });
        }
    }, []); // Empty dependency array to run once on mount

    /* Control the carousel scroll bar */
    useEffect(() => {
        if (currentImage) {
            const thumbnailElement = document.getElementById(`thumbnail-${currentImage.id}`);
            if (thumbnailElement) {
                thumbnailElement.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
            }
        }
    }, [currentImage]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 overflow-hidden">
            <div className="flex flex-col sm:flex-row justify-center gap-3 items-center">
                <h1 className="text-2xl sm:text-4xl font-bold text-center mb-2 sm:mb-4 mt-2 text-white">React Image Carousel By Team 1</h1>
                <Image src={reactIcon} alt="React Icon" className="w-10 h-10 sm:w-12 sm:h-12"/>
            </div>
            <div ref={carouselRef} className="flex overflow-x-scroll mb-4 p-2 bg-gray-600 rounded-lg shadow-md w-full min-h-[10vh]">
                {images.map((image) => {
                    const selected = currentImage && currentImage.id === image.id;
                    return (
                        <Thumbnail
                            key={image.id}
                            id={`thumbnail-${image.id}`}
                            src={image.thumbnail}
                            alt={`Image #${image.id} Thumbnail`}
                            onClick={() => setCurrentImage(image)}
                            className={`cursor-pointer m-2 p-1 border-2 rounded ${selected ? 'border-blue-500 opacity-100' : 'border-transparent opacity-20'}
                            min-h-[50px] w-20 h-20 sm:min-h-[75px] sm:w-24 sm:h-24 md:min-h-[100px] md:w-32 md:h-32`}
                        />
                    )
                })}
            </div>

            <div className="relative w-full max-w-5xl flex justify-center items-center">
                <Swipe
                    src="left"
                    onClick={() => {
                        if (currentImage && currentImage.id > 0) {
                            setCurrentImage(images[currentImage.id - 1]);
                        }
                    }}
                    className="absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2 cursor-pointer bg-gray-700 bg-opacity-70 p-2 rounded-full z-10"
                />
                {currentImage && (
                    <Image
                        src={currentImage.src}
                        alt={`Image #${currentImage.id} Full Image`}
                        className="shadow-lg w-full max-w-3xl h-auto"
                    />
                )}
                <Swipe
                    src="right"
                    onClick={() => {
                        if (currentImage && currentImage.id < images.length - 1) {
                            setCurrentImage(images[currentImage.id + 1]);
                        }
                    }}
                    className="absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 cursor-pointer bg-gray-700 bg-opacity-70 p-2 rounded-full z-10"
                />
            </div>
        </div>
    );
}

export default App;
