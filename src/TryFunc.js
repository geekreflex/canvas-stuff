import React, { useState } from 'react';
import { Stage, Layer, Rect, Text } from 'react-konva';

const TryFunc = () => {
  const [items, setItems] = useState([
    {
      type: 'text',
      data: {
        text: 'type here',
        x: 50,
        y: 80,
        fontSize: 20,
        draggable: true,
        width: 200,
      },
    },
    {
      type: 'rect',
      data: {
        x: 100,
        y: 100,
        width: 100,
        height: 100,
        fill: 'red',
      },
    },
  ]);

  return (
    <div>
      <Stage width={400} height={500}>
        <Layer>
          {items.map((item) => {
            if (item.type === 'rect') {
              return <Rect draggable {...item.data} />;
            } else if (item.type === 'text') {
              return <Text draggable {...item.data} />;
            }
          })}
        </Layer>
      </Stage>
    </div>
  );
};

export default TryFunc;
