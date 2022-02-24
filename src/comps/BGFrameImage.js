import React from 'react';
import { Image } from 'react-konva';
import useImage from 'use-image';

const BGFrameImage = ({ imageUrl, onMouseDown }) => {
  const [image] = useImage(imageUrl);

  return (
    <Image width={300} height={550} image={image} onMouseDown={onMouseDown} />
  );
};

export default BGFrameImage;
