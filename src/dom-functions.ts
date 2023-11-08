function AddBoardRows() {
    const board = document.getElementsByClassName("board")[0];


    //board rows
    for (let i = 7; i >= 0; i--) {
        const newRow: HTMLTableRowElement = document.createElement("tr");
        const rowHeader: HTMLTableCellElement = document.createElement("th");
        rowHeader.scope = "row";
        rowHeader.classList.add("board-side-header");
        rowHeader.innerHTML = i.toString();
        newRow.appendChild(rowHeader);

        for (let j = 0; j <= 7; j++) {
            const cell: HTMLTableCellElement = document.createElement("td");
            cell.classList.add("chess-space");
            cell.id = `${j}${i}`;
            newRow.append(cell);
        }

        board.appendChild(newRow);
    }

    //last numbered row
    const lastRow: HTMLTableRowElement = document.createElement("tr");
    for (let i = -1; i <= 7; i++) {

        const cell = document.createElement("th");
        cell.scope = "col";
        if (i === -1)
            cell.innerHTML = "";
        else
            cell.innerHTML = i.toString();
        cell.classList.add("board-row-header");
        lastRow.appendChild(cell);
    }
    board.appendChild(lastRow);
}

function addKnight(cell: HTMLTableCellElement): void {
    cell.innerHTML = "&#x2658;";
}

function removeKnight(cell: HTMLTableCellElement): void {
    cell.innerHTML = "";
}

function awaitUserKnightPlacement(): Promise<number[]>{
    const board = document.getElementsByClassName("board")[0] as HTMLTableElement;
    const rows = board.getElementsByTagName("tr");
    let id: Promise<number[]> = new Promise(function (resolve, reject) {
        for (let i = 0; i < rows.length; i++) {
            const cells = rows[i].getElementsByTagName("td");
            for (let j = 0; j < cells.length; j++) {
                cells[j].addEventListener("click", () => {
                    addKnight(cells[j])
                    removeKnightStartClickListeners();
                    resolve(convertIDToNumArray(cells[j].id));
                });

            }
        }
    })
    return id;

}

function awaitUserEndPlacement(): Promise<number[]>{
    const board = document.getElementsByClassName("board")[0] as HTMLTableElement;
    const rows = board.getElementsByTagName("tr");
    let id: Promise<number[]> = new Promise(function (resolve, reject) {
        for (let i = 0; i < rows.length; i++) {
            const cells = rows[i].getElementsByTagName("td");
            for (let j = 0; j < cells.length; j++) {
                cells[j].addEventListener("mouseenter", () => {
                    cells[j].classList.add("endGoalHover");
                });
                cells[j].addEventListener("mouseleave", ()=>{
                    cells[j].classList.remove("endGoalHover");
                });
                cells[j].addEventListener("click",()=>{
                    removeKnightStartClickListeners();
                    resolve(convertIDToNumArray(cells[j].id));
 
                });
            }
        }
    })
    return id;


}

function convertIDToNumArray(cellID:string):number[]{
    let ret = [];
    if(cellID.length === 2){
        ret.push(Number(cellID.charAt(0)));
        ret.push(Number(cellID.charAt(1)));
    }
    return ret;
}

function removeKnightStartClickListeners(): void {
    const board = document.getElementsByClassName("board")[0] as HTMLTableElement;
    const rows = board.getElementsByTagName("tr");
    for (let i = 0; i < rows.length; i++) {
        const cells = rows[i].getElementsByTagName("td");
        for (let j = 0; j < cells.length; j++) {
            cells[j].replaceWith(cells[j].cloneNode(true));
        }
    }
}

function addCheck(instruction:HTMLHeadingElement):void{
    const text = instruction.innerText;
    instruction.innerHTML = `&#10003; <s> ${text}</s>`;
}

function addFadeIn(instruction:HTMLHeadingElement):void{
    instruction.className = "start-instruction";
}

function animatePath(path:number[][]):void{
   for(let i=0; i<path.length; ++i){
       const eleID = path[i][0].toString() + path[i][1].toString();
       const space = document.getElementById(eleID);
       space?.classList.add("shrink-text");     
   }
}

export { addFadeIn, AddBoardRows, awaitUserKnightPlacement, awaitUserEndPlacement, addCheck, animatePath};