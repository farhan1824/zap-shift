const HorizontalCard = ({ title, description, image }) => {
    return (
        <div className="flex flex-col sm:flex-row items-stretch rounded-lg overflow-hidden bg-white text-black">

            {/* Left Image */}
            <div className="flex-shrink-0">
                <img
                    src={image}
                    alt={title}
                    className="w-full sm:w-48 h-48 object-cover"
                />
            </div>

            {/* Dotted vertical divider */}
            <div className="hidden sm:block w-px bg-[repeating-linear-gradient(to_bottom,theme(colors.gray.300)_0_2px,transparent_2px_6px)] mx-4" />

            {/* Right content */}
            <div className="flex-1 p-4 flex flex-col justify-center">
                <h3 className="text-lg font-semibold mb-2 ">{title}</h3>
                <p className="">{description}</p>
            </div>
        </div>
    );
};

export default HorizontalCard;