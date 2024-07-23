"use client";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { ProductCard } from "@/app/components/product-card";
import { IProductCard } from "@/app/models/product";

const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 1024 },
      items: 4
    },
    desktop: {
      breakpoint: { max: 1024, min: 768 },
      items: 4
    },
    tablet: {
      breakpoint: { max: 768, min: 464 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 2
    }
};

export function OtherProducts({ products }: { products: IProductCard[] })
{
    return (
        <Carousel
            responsive={responsive} 
            autoPlay={true}
            autoPlaySpeed={3000}
            arrows={true}
            swipeable={true}
            draggable={false}
        >
            {products.map((p, i) => (
              <div key={i} className="mx-2 h-full">
                <ProductCard {...{productProps: p}} />
              </div>
            ))}
        </Carousel>
    )
}