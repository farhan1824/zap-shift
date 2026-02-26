import customerReview from "../../../assets/customer-top.png"
import { Reviews } from './Reviews';

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export const CutomerReview = ({ customerservice }) => {
    // console.log(customerservice);
    return (
        <div className="flex flex-col gap-6 items-center justify-center text-center text-black">
            <img src={customerReview} alt="" />

            <h1 className="text-5xl font-bold">
                What our customers are saying
            </h1>

            <p className="font-thin w-2/3">
                Enhance posture, mobility, and well-being effortlessly with Posture Pro.
                Achieve proper alignment, reduce pain, and strengthen your body with ease!
            </p>

            {/* Carousel */}
            <div className="w-full flex justify-center mt-10">
                <Swiper
                    modules={[Navigation, Pagination]}
                    slidesPerView={3}
                    centeredSlides
                    spaceBetween={80}
                    loop
                    navigation
                    pagination={{ clickable: true }}
                    className="max-w-6xl"
                >
                    {customerservice.map((item) => (
                        <SwiperSlide key={item.id}>
                            {({ isActive }) => (
                                <div
                                    className={`transition-all duration-300 ${isActive
                                        ? "scale-100 blur-0 opacity-100"
                                        : "scale-90 blur-sm opacity-60"
                                        }`}
                                >
                                    <Reviews
                                        name={item.name}
                                        designation={item.designation}
                                        image={item.imageUrl}
                                        review={item.review}
                                    />
                                </div>
                            )}
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    )
}