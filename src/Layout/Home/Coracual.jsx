import React from 'react'
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import firstimage from "../../assets/banner/banner1.png"
import secondimage from "../../assets/banner/banner2.png"
import thridimage from "../../assets/banner/banner3.png"
export const Coracual = () => {
    return (
        <div>
            <Carousel autoPlay={true} infiniteLoop={true}>
                <div>
                    <img src={firstimage} />
                    {/* <p className="legend">Legend 1</p> */}
                </div>
                <div>
                    <img src={secondimage} />
                    {/* <p className="legend">Legend 2</p> */}
                </div>
                <div>
                    <img src={thridimage} />
                    {/* <p className="legend">Legend 3</p> */}
                </div>
            </Carousel>
        </div>
    )
}
