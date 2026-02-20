import React from "react";
import Marquee from "react-fast-marquee";

// Import your logos
import Brand1 from "../../assets/brands/amazon_vector.png";
import Brand2 from "../../assets/brands/amazon.png";
import Brand3 from "../../assets/brands/casio.png";
import Brand4 from "../../assets/brands/moonstar.png";
import Brand5 from "../../assets/brands/randstad.png";
import Brand6 from "../../assets/brands/star.png";
import Brand7 from "../../assets/brands/start_people.png";

const LogoCarousel = () => {
    const logos = [Brand1, Brand2, Brand3, Brand4, Brand5, Brand6, Brand7];

    return (
        <section className="py-8 bg-transparent">
            <Marquee
                gradient={false}
                speed={50}
                pauseOnHover={true}
            >
                {logos.map((logo, index) => (
                    <div
                        key={index}
                        className="mx-8 flex items-center justify-center"
                    >
                        <img
                            src={logo}
                            alt={`Brand ${index + 1}`}
                            className="h-3.5 w-auto object-contain"
                        />
                    </div>
                ))}
            </Marquee>
        </section>
    );
};

export default LogoCarousel;