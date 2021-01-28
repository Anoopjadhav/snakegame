import { useEffect, useState } from 'react';

const SnakeBody = (props) => {
   
    useEffect(() => {
      
    }, []);

    return (
        <div className={props.className} style={{ 'width': props.boxSize + 'px', 'height': props.boxSize + 'px', 'backgroundColor': props.color, top : props.yPos, left:props.xPos}}></div>
    )
}

export default SnakeBody;