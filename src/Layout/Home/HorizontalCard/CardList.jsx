import React from "react";
import HorizontalCard from "./HorizontalCard";
import data from "../../../assets/data/data.json";

const CardList = () => {
    return (
        <div className="space-y-5 p-6">
            {data.map((item) => (
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