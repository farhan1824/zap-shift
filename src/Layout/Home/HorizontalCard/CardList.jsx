import React from "react";
import HorizontalCard from "./HorizontalCard";

const CardList = ({ cardlistdata }) => {
    return (
        <div className="space-y-5 p-6">
            {cardlistdata.map((item) => (
                <HorizontalCard
                    key={item.id}
                    title={item.title}
                    description={item.description}
                    image={item.image}
                />
            ))}
        </div>
    );
};

export default CardList;