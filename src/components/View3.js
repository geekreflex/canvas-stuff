import React from 'react';
import { Layer, Stage, Image } from 'react-konva';
import useImage from 'use-image';

const LionImage = () => {
  const [image] = useImage('https://konvajs.org/assets/lion.png');
  return <Image image={image} />;
};

const View3 = () => {
  const [image] = useImage('https://konvajs.org/assets/lion.png');

  return (
    <div>
      <Stage width={window.innerWidth} height={window.innerHeight}>
        <Layer>
          <LionImage />
          <Image x={100} y={100} draggable image={image} />
        </Layer>
      </Stage>
    </div>
  );
};

export default View3;
