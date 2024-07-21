"use client";
import React from "react";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import "@/app/styles/image-gallery-custom.css";

interface ImagesGalleryProps {
  images: string[];
}

export class ImagesGallery extends React.Component<ImagesGalleryProps> {
  render() {
    const { images } = this.props;
    return (
      <ImageGallery 
        items={images.map((i: string) => ({ original: i, thumbnail: i }))} 
        showPlayButton={false}
        renderLeftNav={(onClick, disabled) => (
          <button
            type="button"
            className={`image-gallery-custom-left-nav ${disabled ? 'opacity-50 cursor-not-allowed' : 'opacity-100 cursor-pointer'}`}
            onClick={onClick}
            disabled={disabled}
          >
            &#10094;
          </button>
        )}
        renderRightNav={(onClick, disabled) => (
          <button
            type="button"
            className={`image-gallery-custom-right-nav ${disabled ? 'opacity-50 cursor-not-allowed' : 'opacity-100 cursor-pointer'}`}
            onClick={onClick}
            disabled={disabled}
          >
            &#10095;
          </button>
        )}
      />
    );
  }
}
