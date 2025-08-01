import React, { useEffect, useRef, useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { Link } from "react-router-dom";

// 1.58.00
const NewArrivals = () => {
    const scrollRef = useRef(null);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(false);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);

    const newArrivals = [
        {
            _id: "1",
            name: "Stylish Jacket",
            price: 120,
            images: [
                {
                    url: "https://picsum.photos/500/500/?random=1",
                    altText: "Style Jacket",
                },
            ],
        },
        {
            _id: "2",
            name: "Stylish Jacket",
            price: 120,
            images: [
                {
                    url: "https://picsum.photos/500/500/?random=2",
                    altText: "Style Jacket",
                },
            ],
        },
        {
            _id: "3",
            name: "Stylish Jacket",
            price: 120,
            images: [
                {
                    url: "https://picsum.photos/500/500/?random=3",
                    altText: "Style Jacket",
                },
            ],
        },
        {
            _id: "4",
            name: "Stylish Jacket",
            price: 120,
            images: [
                {
                    url: "https://picsum.photos/500/500/?random=4",
                    altText: "Style Jacket",
                },
            ],
        },
        {
            _id: "5",
            name: "Stylish Jacket",
            price: 120,
            images: [
                {
                    url: "https://picsum.photos/500/500/?random=5",
                    altText: "Style Jacket",
                },
            ],
        },
        {
            _id: "6",
            name: "Stylish Jacket",
            price: 120,
            images: [
                {
                    url: "https://picsum.photos/500/500/?random=6",
                    altText: "Style Jacket",
                },
            ],
        },
        {
            _id: "7",
            name: "Stylish Jacket",
            price: 120,
            images: [
                {
                    url: "https://picsum.photos/500/500/?random=7",
                    altText: "Style Jacket",
                },
            ],
        },
        {
            _id: "8",
            name: "Stylish Jacket",
            price: 120,
            images: [
                {
                    url: "https://picsum.photos/500/500/?random=8",
                    altText: "Style Jacket",
                },
            ],
        },
        {
            _id: "9",
            name: "Stylish Jacket",
            price: 120,
            images: [
                {
                    url: "https://picsum.photos/500/500/?random=9",
                    altText: "Style Jacket",
                },
            ],
        },
    ];

    const handleMouseDown = (e) => {
        setIsDragging(true);
        setStartX(e.pageX - scrollRef.current.offsetLeft); // Corrected to 'offsetLeft'
        setScrollLeft(scrollRef.current.scrollLeft);
    };

    const handleMouseMove = (e) => {
        if (!isDragging) return; // Only move if the user is dragging
        const x = e.pageX - scrollRef.current.offsetLeft; // Corrected to 'offsetLeft'
        const walk = x - startX; // Calculate how far the mouse has moved

        scrollRef.current.scrollLeft = scrollLeft - walk; // Scroll the container accordingly
    };

    const handleMouseUpOrLeave = () => {
        setIsDragging(false); // Stop dragging when the mouse is released or leaves the element
    };

    const scroll = (direction) => {
        const scrollAmount = direction === "left" ? -300 : 300;
        scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    };

    // update scroll buttons
    const updateScrollButtons = () => {
        const container = scrollRef.current;
        if (container) {
            const leftScroll = container.scrollLeft;
            const rightScrollable =
                container.scrollWidth >= leftScroll + container.clientWidth + 2;

            // Enable or disable left and right buttons
            setCanScrollLeft(leftScroll > 0);
            setCanScrollRight(rightScrollable);
        }
        // console.log({
        //     scrollLeft: container.scrollLeft,
        //     clientWidth: container.clientWidth,
        //     containerScrollWidth: container.scrollWidth,
        //     offSetLeft: scrollRef.current.offSetLeft,
        // });
    };

    useEffect(() => {
        const container = scrollRef.current;
        if (container) {
            container.addEventListener("scroll", updateScrollButtons);
            updateScrollButtons(); // Calls once to set initial state
        }
        // Cleanup on unmount
        return () => {
            if (container) {
                container.removeEventListener("scroll", updateScrollButtons);
            }
        };
    }, []);

    return (
        <section className="py-16 px-4 lg:px-0">
            <div className="container mx-auto text-center mb-10 relative">
                <h2 className="text-3xl font-bold mb-4">Exlpore New Arrivals</h2>
                <p className="text-lg text-gray-600 mb-8">
                    Discover the latest tyles strainght off the runway, freshly added to
                    keep your wardrobe on cuttig edge of fashion.
                </p>

                {/* Scroll Button */}
                <div className="absolute right-0 bottom-[-30px] flex space-x-2">
                    <button
                        onClick={() => scroll("left")}
                        disabled={!canScrollLeft}
                        className={`p-2 rounded border ${
                            canScrollLeft
                                ? "bg-white text-black"
                                : "bg-gray-200 text-gray-400 cursor-not-allowed"
                        }`}
                    >
                        <FiChevronLeft className="text-2xl" />
                    </button>
                    <button
                        onClick={() => scroll("right")}
                        disabled={!canScrollRight}
                        className={`p-2 rounded border ${
                            canScrollRight
                                ? "bg-white text-black"
                                : "bg-gray-200 text-gray-400 cursor-not-allowed"
                        }`}
                    >
                        <FiChevronRight className="text-2xl" />
                    </button>
                </div>
            </div>

            {/* Scrollable Content */}
            <div
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUpOrLeave}
                onMouseLeave={handleMouseUpOrLeave}
                ref={scrollRef}
                className={`scrollable-container container mx-auto overflow-x-scroll flex space-x-6 relative ${isDragging ? "cursor-grabbing" : "cursor-grab"}`}
            >
                {newArrivals.map((product) => (
                    <div
                        key={product._id}
                        className="min-w-[100%] sm:min-w-[50%] lg:min-w-[30%] relative"
                    >
                        <img
                            src={product.images[0]?.url}
                            alt={product.images[0]?.altText || product.name}
                            className="w-full h-[500px] object-cover rounded-lg"
                            draggable="false"
                        />
                        <div className="absolute bottom-0 left-0 right-0 bg-opacity-50 backdrop-blur-md text-white p-4 rounded-lg">
                            <Link to={`/product/${product._id}`} className="block">
                                <h4 className="font-medium">{product.name}</h4>
                                <p className="mt-1">{product.price}</p>
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default NewArrivals;
