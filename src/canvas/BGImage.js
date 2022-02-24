import React from 'react';
import { Image } from 'react-konva';
import useImage from 'use-image';

const BGImage = ({ imageUrl, onMouseDown }) => {
  const [image] = useImage(imageUrl);

  return (
    <Image image={image} width={400} height={600} onMouseDown={onMouseDown} />
  );
};

export default BGImage;
