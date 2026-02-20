import React from "react";
import * as FaIcons from "react-icons/fi";

const Card = ({ cards }) => {
    return (
        <>
            {cards.map((card, index) => {
                const Icon = FaIcons[card.icon];

                return (
                    <div
                        key={index}
                        className="w-65 shrink-0 rounded-xl border border-gray-200 bg-white text-black p-6 shadow-sm hover:shadow-md transition-shadow"
                    >
                        <div className="mb-4 text-[#caeb66]">
                            {Icon && <Icon size={32} />}
                        </div>

                        <h3 className="font-semibold mb-2 inline-block">
                            {card.title}
                        </h3>

                        <p className="text-sm font-light">
                            {card.description}
                        </p>
                    </div>
                );
            })}
        </>
    );
};

export default Card;