import { useState, useEffect } from 'react'
import styles from './Snakes.module.css'
import Box from './Box/Box'



const Snakes = (props) => {

    let [board, setBoard] = useState([]);
    const [gridRowSize, setGridRowSize] = useState();
    const [gridColumnSize, setGridColumnSize] = useState();
    const [boxSize, setBoxSize] = useState(0);
    const [snake, setSnake] = useState([])

    useEffect(() => {
        setUpBoard();
    }, [])

    useEffect(() => {

    }, [snake]);

    function setUpBoard() {
        const BOXSIZE = 40;
        setBoxSize(BOXSIZE);

        let windowWidth = window.innerWidth;
        let windowHeight = window.innerHeight;

        let wRoundDigit = window.screen.width % BOXSIZE;
        let hRoundDigit = window.screen.height % BOXSIZE;

        let width = Math.floor((windowWidth - wRoundDigit) / BOXSIZE);
        let height = Math.floor((windowHeight - hRoundDigit) / BOXSIZE);

        setGridRowSize(width);
        setGridColumnSize(height);

        let board = Array(width).fill().map(() => Array(height).fill(0));

        board = initSnake(board, width - 5, height - 5, 10);

        setBoard(board);

    }

    function initSnake(board, x, y, length) {
        let snake = []
        let tempBoard = [...board];

        let i = 0;
        while (i < length) {
            snake.push({ x: x, y: y + i });
            i++;
        }
        setSnake(snake);
        return tempBoard;
    }

    function keyDownEvent(evt) {
        let tempSnake = [];
        switch (evt.key) {
            case 'ArrowUp':
                console.log(snake);
                tempSnake = moveUp([...snake]);
                if (tempSnake.length !== 0)
                    setSnake(tempSnake);
                return;
            case 'ArrowDown':
                tempSnake = moveDown([...snake]);
                if (tempSnake.length !== 0)
                    setSnake(tempSnake);
                return;
            case 'ArrowLeft':
                tempSnake = moveLeft([...snake]);
                if (tempSnake.length !== 0)
                    setSnake(tempSnake);
                return;
            case 'ArrowRight':
                tempSnake = moveRight([...snake]);
                if (tempSnake.length !== 0)
                    setSnake(tempSnake);
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
        let tempSnake = snake;
        let newY = tempSnake[0].y === 0 ? gridColumnSize - 1 : tempSnake[0].y - 1;
        let x = tempSnake[0].x;
        if (!alreadySnakePresent(x, newY)) {
            tempSnake.unshift({ x: x, y: newY });
            tempSnake.pop();
        } else {
            return [];
        }

        return tempSnake;
    }

    function moveDown(snake) {
        let tempSnake = snake;
        let newY = tempSnake[0].y === gridColumnSize - 1 ? 0 : tempSnake[0].y + 1;
        let x = tempSnake[0].x;
        if (!alreadySnakePresent(x, newY)) {
            tempSnake.unshift({ x: x, y: newY });
            tempSnake.pop();
        } else {
            return [];
        }

        return tempSnake;
    }
    function moveLeft(snake) {
        let tempSnake = snake;
        let newX = tempSnake[0].x === 0 ? gridRowSize - 1 : tempSnake[0].x - 1;
        let y = tempSnake[0].y;
        if (!alreadySnakePresent(newX, y)) {
            tempSnake.unshift({ x: newX, y: y });
            tempSnake.pop();
        } else {
            return [];
        }
        return tempSnake;
    }
    function moveRight(snake) {
        let tempSnake = snake;
        let newX = tempSnake[0].x === gridRowSize - 1 ? 0 : tempSnake[0].x + 1;
        let y = tempSnake[0].y;
        if (!alreadySnakePresent(newX, y)) {
            tempSnake.unshift({ x: newX, y: y });
            tempSnake.pop();
        } else {
            return [];
        }
        return tempSnake;
    }

    return (
        <div className={styles.board} onKeyDown={keyDownEvent} tabIndex="0">
            {
                board && board.map((row, rowIndex) => {
                    return (
                        <div key={rowIndex} className={styles.row} >
                            {
                                row.map((col, colIndex) => {
                                    return (
                                        <Box key={colIndex} row={rowIndex} col={colIndex} snake={snake} className={styles.column} boxSize={boxSize} color={col === 1 && 'white'}></Box>
                                    )
                                })
                            }
                        </div>
                    )
                })
            }
        </div>
    )
}

export default Snakes;