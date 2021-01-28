import { useState, useEffect, useRef } from 'react'
import styles from './Snakes.module.css'
import Box from './Box/Box'
import SnakeBody from './SnakeBody/SnakeBody'

const TIMER_INCREMENT = 100;
const SNAKE_DEFAULT_LENGTH = 10;
const BOXSIZE = 20;

const Snakes = (props) => {

    let [board, setBoard] = useState([]);
    const [gridRowSize, setGridRowSize] = useState();
    const [gridColumnSize, setGridColumnSize] = useState();
    const [boxSize, setBoxSize] = useState(0);
    const [snake, setSnake] = useState([])
    const [direction, setDirection] = useState('');
    let firstSnakeSetup = useRef();
    let clock = useRef();

    useEffect(() => {
        setUpBoard();
        firstSnakeSetup.current = false;
    }, []);

    useEffect(() => {
        if (snake !== undefined && snake.length > 0 && !firstSnakeSetup.current) {
            console.log('FIRST INIT SNAKE')
            firstSnakeSetup.current = true;
        }
    }, [snake])


    useEffect(() => {
        if (clock.current)
            clearInterval(clock.current);

        clock.current = setInterval(() => {
            keepMoving(direction)
        }, TIMER_INCREMENT);

    }, [direction, snake])

    function keepMoving(direction) {
        console.log('moving in direction -' + direction);
        switch (direction) {
            case 'up':
                console.log('moving up');
                moveUp([...snake]);
                break;
            case 'down':
                console.log('moving down');
                moveDown([...snake]);
                break;
            case 'left':
                console.log('moving left');
                moveLeft([...snake]);
                break;
            case 'right':
                console.log('moving right');
                moveRight([...snake]);
                break;
            default: break;;
        }
    }
    function getInMultiplesOfBoxSize(value, boxSize) {
        let minusDigit = value % boxSize;
        let roundedNumber = value - minusDigit;
        return roundedNumber;
    }

    function setUpBoard() {
      
        setBoxSize(BOXSIZE);

        let windowWidth = window.innerWidth;
        let windowHeight = window.innerHeight;

        let width = getInMultiplesOfBoxSize(windowWidth, BOXSIZE);
        let height = getInMultiplesOfBoxSize(windowHeight, BOXSIZE);

        console.log(width, height);

        setGridRowSize(width);
        setGridColumnSize(height);

        initSnake(SNAKE_DEFAULT_LENGTH, width, height, BOXSIZE);
    }

    function initSnake(length, width, height, boxSize) {

        let snake = [];

        let xPos = getInMultiplesOfBoxSize(Math.floor((Math.random() * ((width - boxSize) % width))), boxSize);
        let yPos = getInMultiplesOfBoxSize(Math.floor((Math.random() * ((height - boxSize) % height))), boxSize);

        console.log(xPos, yPos)

        let i = 0;
        while (i < length) {
            let y = (yPos + (boxSize * i))
            snake.push({ x: xPos, y: y });
            i++;
        }
        setSnake(snake);
    }

    function keyDownEvent(evt) {

        console.log(evt.key);
        switch (evt.key) {
            case 'ArrowUp':
                setDirection('up');
                // moveUp([...snake]);
                return;
            case 'ArrowDown':
                setDirection('down');
                // moveDown([...snake]);
                return;
            case 'ArrowLeft':
                setDirection('left');
                // moveLeft([...snake]);
                return;
            case 'ArrowRight':
                setDirection('right');
                // moveRight([...snake]);
                return;
            default: return;
        }
    }
    function alreadySnakePresent(x, y) {
        for (let i = 0; i < snake.length; i++) {
            if (snake[i].x === x && snake[i].y === y) return true;
        }
        return false;
    }
    function moveUp(snake) {
        console.log(snake[0]);
        let tempSnake = snake;
        let newY = tempSnake[0].y === 0 ? gridColumnSize : tempSnake[0].y - boxSize;
        let x = tempSnake[0].x;
        if (!alreadySnakePresent(x, newY)) {
            tempSnake.unshift({ x: x, y: newY });
            tempSnake.pop();
            setSnake(tempSnake);
        }
    }

    function moveDown(snake) {
        console.log(snake[0]);
        let tempSnake = snake;
        let newY = tempSnake[0].y === gridColumnSize ? 0 : tempSnake[0].y + boxSize;
        let x = tempSnake[0].x;
        if (!alreadySnakePresent(x, newY)) {
            tempSnake.unshift({ x: x, y: newY });
            tempSnake.pop();
            setSnake(tempSnake);
        }


    }
    function moveLeft(snake) {
        console.log(snake[0]);
        let tempSnake = snake;
        let newX = tempSnake[0].x === 0 ? gridRowSize : tempSnake[0].x - boxSize;
        let y = tempSnake[0].y;
        if (!alreadySnakePresent(newX, y)) {
            tempSnake.unshift({ x: newX, y: y });
            tempSnake.pop();
            setSnake(tempSnake);
        }
    }
    function moveRight(snake) {
        console.log(snake[0]);
        let tempSnake = snake;
        let newX = tempSnake[0].x === gridRowSize ? 0 : tempSnake[0].x + boxSize;
        let y = tempSnake[0].y;
        if (!alreadySnakePresent(newX, y)) {
            tempSnake.unshift({ x: newX, y: y });
            tempSnake.pop();
            setSnake(tempSnake);
        }
    }

    return (
        <div className={styles.board} onKeyDown={keyDownEvent} tabIndex="0">
            <div className={styles.playground} style={{ 'width': gridRowSize, 'height': gridColumnSize }}>
                {snake && snake.map((ele, index) => {
                    return (
                        <SnakeBody xPos={ele.x} yPos={ele.y} className={styles.snakeBody} boxSize={boxSize} key={index} color="white"></SnakeBody>
                    )
                })}
            </div>
        </div>
    )
}

export default Snakes;