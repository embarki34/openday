
import React, { useState, useEffect } from 'react';

interface Cell {
  isMine: boolean;
  isRevealed: boolean;
  neighborMines: number;
  isFlagged: boolean;
}

const RetroMinesweeper: React.FC = () => {
  const [grid, setGrid] = useState<Cell[][]>([]);
  const [gameOver, setGameOver] = useState(false);
  const [win, setWin] = useState(false);
  const [timer, setTimer] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [flaggedMines, setFlaggedMines] = useState(0);

  const rows = 9;
  const cols = 9;
  const mines = 10;

  useEffect(() => {
    initializeGrid();
  },);  

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRunning) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  const initializeGrid = () => {
    const newGrid: Cell[][] = Array(rows).fill(null).map(() => 
      Array(cols).fill(null).map(() => ({
        isMine: false,
        isRevealed: false,
        neighborMines: 0,
        isFlagged: false
      }))
    );

    // Place mines
    let minesPlaced = 0;
    while (minesPlaced < mines) {
      const row = Math.floor(Math.random() * rows);
      const col = Math.floor(Math.random() * cols);
      if (!newGrid[row][col].isMine) {
        newGrid[row][col].isMine = true;
        minesPlaced++;
      }
    }

    // Calculate neighbor mines
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        newGrid[i][j].neighborMines = countNeighborMines(newGrid, i, j);
      }
    }

    setGrid(newGrid);
    setTimer(0);
    setIsRunning(false);
    setFlaggedMines(0);
  };

  const countNeighborMines = (grid: Cell[][], row: number, col: number) => {
    let count = 0;
    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        if (i === 0 && j === 0) continue;
        const newRow = row + i;
        const newCol = col + j;
        if (newRow >= 0 && newRow < rows && newCol >= 0 && newCol < cols) {
          if (grid[newRow][newCol].isMine) count++;
        }
      }
    }
    return count;
  };

  const revealCell = (row: number, col: number) => {
    if (gameOver || win || grid[row][col].isRevealed || grid[row][col].isFlagged) return;

    const newGrid = [...grid];
    if (newGrid[row][col].isMine) {
      setGameOver(true);
      revealAllMines();
    } else {
      newGrid[row][col].isRevealed = true;
      if (newGrid[row][col].neighborMines === 0) {
        revealNeighbors(newGrid, row, col);
      }
    }
    setGrid(newGrid);
    checkWin();
  };

  const revealNeighbors = (grid: Cell[][], row: number, col: number) => {
    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        if (i === 0 && j === 0) continue;
        const newRow = row + i;
        const newCol = col + j;
        if (newRow >= 0 && newRow < rows && newCol >= 0 && newCol < cols) {
          if (!grid[newRow][newCol].isRevealed && !grid[newRow][newCol].isFlagged) {
            grid[newRow][newCol].isRevealed = true;
            if (grid[newRow][newCol].neighborMines === 0) {
              revealNeighbors(grid, newRow, newCol);
            }
          }
        }
      }
    }
  };

  const toggleFlag = (row: number, col: number) => {
    if (gameOver || win || grid[row][col].isRevealed) return;
    const newGrid = [...grid];
    newGrid[row][col].isFlagged = !newGrid[row][col].isFlagged;
    setGrid(newGrid);
    setFlaggedMines(prevFlagged => newGrid[row][col].isFlagged ? prevFlagged + 1 : prevFlagged - 1);
  };

  const revealAllMines = () => {
    const newGrid = grid.map(row => row.map(cell => 
      cell.isMine ? { ...cell, isRevealed: true } : cell
    ));
    setGrid(newGrid);
  };

  const checkWin = () => {
    const win = grid.every(row => 
      row.every(cell => 
        (cell.isMine && !cell.isRevealed) || (!cell.isMine && cell.isRevealed)
      )
    );
    if (win) {
      setWin(true);
      setIsRunning(false);
    }
  };

  const resetGame = () => {
    setGameOver(false);
    setWin(false);
    initializeGrid();
  };

  const startGame = () => {
    if (!isRunning) {
      setIsRunning(true);
    }
  };

  const getCellContent = (cell: Cell) => {
    if (cell.isRevealed) {
      if (cell.isMine) {
        return '💣';
      } else if (cell.neighborMines > 0) {
        return cell.neighborMines;
      }
    } else if (cell.isFlagged) {
      return '🚩';
    }
    return '';
  };

  const getCellColor = (cell: Cell) => {
    if (cell.isRevealed && cell.neighborMines > 0) {
      const colors = ['blue', 'green', 'red', 'purple', 'maroon', 'turquoise', 'black', 'gray'];
      return colors[cell.neighborMines - 1];
    }
    return 'black';
  };

  return (
    <div className="p-4 bg-[#c0c0c0] inline-block">
      <div className="mb-4 flex justify-between items-center">
        <div className="bg-black text-red-600 p-2 w-16 text-center font-bold">
          {timer.toString().padStart(3, '0')}
        </div>
        <button 
          onClick={resetGame} 
          className="px-4 py-2 bg-[#c0c0c0] border-t-2 border-l-2 border-[#ffffff] border-b-2 border-r-2 border-[#808080] active:border-t-2 active:border-l-2 active:border-[#808080] active:border-b-2 active:border-r-2 active:border-[#ffffff]"
        >
          🙂
        </button>
        <div className="bg-black text-red-600 p-2 w-16 text-center font-bold">
          {(mines - flaggedMines).toString().padStart(3, '0')}
        </div>
      </div>
      <div className="grid grid-cols-9 gap-1 bg-[#c0c0c0] p-4 border-t-4 border-l-4 border-[#808080] border-b-4 border-r-4 border-[#ffffff]">
        {grid.map((row, i) => 
          row.map((cell, j) => (
            <button
              key={`${i}-${j}`}
              className={`w-8 h-8 flex items-center justify-center text-sm font-bold
                ${cell.isRevealed 
                  ? 'bg-[#c0c0c0] border border-[#808080]' 
                  : 'bg-[#c0c0c0] border-t-2 border-l-2 border-[#ffffff] border-b-2 border-r-2 border-[#808080]'}`}
              onClick={() => {
                startGame();
                revealCell(i, j);
              }}
              onContextMenu={(e) => {
                e.preventDefault();
                startGame();
                toggleFlag(i, j);
              }}
              style={{ color: getCellColor(cell) }}
            >
              {getCellContent(cell)}
            </button>
          ))
        )}
      </div>
      {(gameOver || win) && (
        <div className="mt-4 text-center font-bold">
          {gameOver ? 'Game Over!' : 'You Win!'}
        </div>
      )}
    </div>
  );
};

export default RetroMinesweeper;