import { useEffect, useState } from 'react';
import Snakes from '../Snakes';
import styles from './Box.module.css'

const Box = (props) => {
    let [color,setColor] = useState();

    function checkIfSnakeBox(x, y) {
        for(let i=0;i<props.snake.length;i++){
            if(props.snake[i].x === x && props.snake[i].y=== y){
                return true;
            }
        }
      return false;
    }

    useEffect(() => {
        let val = checkIfSnakeBox(props.row, props.col);
        if(val){
            setColor('white');
        }else 
            setColor('');
    }, [props.snake]);

    return (
        <div className={props.className} style={{ 'width': props.boxSize + 'px', 'height': props.boxSize + 'px', 'backgroundColor': color }}></div>
    )
}

export default Box;