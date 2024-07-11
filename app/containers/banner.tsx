"use client";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Image, { StaticImageData } from "next/image";

const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 1024 },
      items: 1
    },
    desktop: {
      breakpoint: { max: 1024, min: 768 },
      items: 1
    },
    tablet: {
      breakpoint: { max: 768, min: 464 },
      items: 1
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
};

export function BannerComponent({ images }: { images: StaticImageData[] })
{
    return (
        <Carousel
            deviceType={"desktop"}
            responsive={responsive} 
            infinite={true}
            autoPlay={true}
            autoPlaySpeed={3000}
            arrows={false}
            showDots={false}
            swipeable={false}
            draggable={false}
        >
            {images.map((pic, index) => (
                <div key={index}>
                    <Image src={pic} alt={`Banner ${index + 1}`} className="w-full" />
                </div>
            ))}
        </Carousel>
    )
}