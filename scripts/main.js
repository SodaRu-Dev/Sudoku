let defaultRow = [0,0,0,0,0,0,0,0,0];

let sudokuArray = [];
for(let i=0; i<9; i++){
	sudokuArray.push([...defaultRow]);
}

const numRandomizer = (array) => array[Math.floor(Math.random()*array.length)];

const generateRandomSudoku = () => {
  sudokuArray.forEach((row, index) => {
    for(let i=0; i<9; i++){
    	// Start off with array of available numbers
    	let availableNumbers = [1,2,3,4,5,6,7,8,9];
      let currentRowIndex = sudokuArray.indexOf(row);
      let currentColIndex = i;
      
      // ================  SECTION (BOX) ================ 
      // Check what is allowable in the section
      let sectionStartRow = currentRowIndex - (currentRowIndex % 3)
      let sectionStartCol = currentColIndex - (currentColIndex % 3)
      
      // Check all rows and columns of the box
      for(let r = 0; r < 3; r++ ){
      	for(let c = 0; r < 3; c++){
        	let currentCellVal = sudokuArray[sectionStartRow+r][sectionStartCol+c]
        	availableNumbers = availableNumbers.filter(n => n !== currentCellVal)
        }
      }
      
      if(availableNumbers.length == 1){
      	// break out and assign the number
        sudokuArray[index][i] = availableNumbers[0];
	continue
      }
      
      // ================ ROW ================ 
	// Check what is allowable in the row
      availableNumbers = availableNumbers
      .filter(number => row.forEach(col => col !== number))

	if(availableNumbers.length == 1){
      	// break out and assign the number
      	sudokuArray[index][i] = availableNumbers[0];
	continue
      }
      
      // ================  COLUMN ================ 
  	// Check what is allowable in the column
      availableNumbers = availableNumbers
      .filter(number => sudokuArray.forEach(el => el[currentColIndex] !== number))
      
      if(availableNumbers.length == 1){
      	// break out and assign the number
        sudokuArray[index][i] = availableNumbers[0];
	continue
      }
      
      // ================ FINAL ================ 
      
      // With the remaining possible numbers to use, randomly select one and insert it
      sudokuArray[index][i] = numRandomizer(availableNumbers);
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