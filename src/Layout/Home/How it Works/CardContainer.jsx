import React, { useEffect, useRef, useState } from "react";
import packetData from "../../../assets/data/services.json";
import Card from "./Card";

const CardContainer = () => {
    const trackRef = useRef(null);
    const [cards, setCards] = useState(packetData);
    const cardWidth = 280;
    const duration = 700;
    const delay = 3000;

    useEffect(() => {
        const interval = setInterval(() => {
            const track = trackRef.current;
            if (!track) return;

            // Animate left by one card
            track.style.transition = `transform ${duration}ms ease-in-out`;
            track.style.transform = `translateX(-${cardWidth}px)`;

            // After animation, move first card to end
            setTimeout(() => {
                track.style.transition = "none";
                track.style.transform = "translateX(0)";

                setCards((prev) => {
                    const [first, ...rest] = prev;
                    return [...rest, first];
                });
            }, duration);
        }, delay);

        return () => clearInterval(interval);
    }, []);

    return (
        <section className="w-full overflow-hidden py-8">
            <div
                ref={trackRef}
                className="flex gap-6"
            >
                <Card cards={cards} />
            </div>
        </section>
    );
};

export default CardContainer;