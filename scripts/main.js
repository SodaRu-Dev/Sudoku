import { checkBox } from "./functions.js";

let defaultRow = [0,0,0,0,0,0,0,0,0];

let sudokuArray = [];
for(let i=0; i<9; i++){
	sudokuArray.push([...defaultRow]);
}


// Sudoku Generator
const generateRandomSudoku = () => {
    sudokuArray.forEach((row, index) => {
        for(let col = 0; col < 9; col++){
            // Start off with array of available numbers
            let availableNumbers = [1,2,3,4,5,6,7,8,9];
            let rowIndex = index // Current Row Index
            let colIndex = col;    // Current Column Index
        
            // ================  SECTION (BOX) ================ 
            // Check what is allowable in the section
            availableNumbers = checkBox(rowIndex, colIndex, availableNumbers, sudokuArray)
            
            // See if one number remains
            if(availableNumbers.length == 1){
                // break out and assign the number
                sudokuArray[index][col] = availableNumbers[0];
                continue
            }
            
            // ================ ROW ================ 
            // Check what is allowable in the row
            availableNumbers = availableNumbers.filter(number => row.every(col => col !== number))

            if(availableNumbers.length == 1){
                // break out and assign the number
                sudokuArray[index][col] = availableNumbers[0];
            continue
            }
            
            // ================  COLUMN ================ 
            // Check what is allowable in the column
            availableNumbers = availableNumbers.filter(number => sudokuArray.every(row => row[col] !== number))
            
            if(availableNumbers.length == 1){
                // break out and assign the number
                sudokuArray[index][col] = availableNumbers[0];
            continue
            }
            
            // ================ FINAL ================ 
            // With the remaining possible numbers to use, randomly select one and insert it
            sudokuArray[index][col] = availableNumbers[Math.floor(Math.random()*availableNumbers.length)]
        }
    })
}
generateRandomSudoku()

const displaySudoku = (finalArray) => {
    finalArray.forEach(row => {
        for(let i=0; i<9; i++){
            let currentRow = document.getElementById(`Row${i+1}`)
            let newColumn = document.createElement("div");
            let colValue = document.createTextNode(`${row[i]}`)
            
            newColumn.appendChild(colValue);
            newColumn.classList.add("sudokuColumn")
            currentRow.appendChild(newColumn);
        }
    })
}

displaySudoku(sudokuArray);