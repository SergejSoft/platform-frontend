import * as React from "react";

interface IHiResImageProps {
  partialPath: string;
  className?: string;
  alt?: string;
  title?: string;
}

export const HiResImage: React.SFC<IHiResImageProps> = ({ partialPath, className, alt, title }) => {
  if (process.env.NODE_ENV === "test") {
    return <div />;
  }

  try {
    // @note: thanks to wonders of static analysis + webpack all images matching these paths will be part of the bundle
    const image = require("!file-loader?publicPath=/!../../assets/img/" + partialPath + ".png");
    const image2x = require("!file-loader?publicPath=/!../../assets/img/" +
      partialPath +
      "@2x.png");
    const image3x = require("!file-loader?publicPath=/!../../assets/img/" +
      partialPath +
      "@3x.png");
    return (
      <img
        src={image}
        srcSet={`${image} 1x, ${image2x} 2x, ${image3x} 3x`}
        className={className}
        alt={alt}
        title={title}
      />
    );
  } catch (e) {
    // we show error here. Otherwise react goes into loop
    // tslint:disable-next-line
    console.error(`Couldnt find image at path assets/img/${partialPath}.png"`);
    return <div />;
  }
};
