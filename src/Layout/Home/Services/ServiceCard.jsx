import React from "react";
import * as FiIcons from "react-icons/fi";

const ServiceCard = ({ services }) => {
    return (
        <>
            {services.map((service) => {
                const Icon = FiIcons[service.icon];

                return (
                    <div
                        key={service.id}
                        className="bg-white p-6 shadow-sm text-center
             transition-all duration-500 ease-in-out
             hover:shadow-lg hover:bg-[#e5f182] hover:rounded-2xl"
                    >
                        <div
                            className="w-16 h-16 mx-auto mb-4 flex items-center justify-center rounded-full
                         bg-linear-to-br from-[#caeb66] to-black
                         transition-transform duration-500 ease-in-out
                         group-hover:scale-110"
                        >
                            {Icon && <Icon size={28} className="text-white" />}
                        </div>

                        <h3 className="text-lg text-black font-extrabold mb-2 transition-colors duration-500 ease-in-out
                           group-hover:text-gray-900">
                            {service.title}
                        </h3>

                        <p className="text-sm text-gray-600 w-4/6 mx-auto text-center">
                            {service.description}
                        </p>
                    </div>
                );
            })}
        </>
    );
};

export default ServiceCard;