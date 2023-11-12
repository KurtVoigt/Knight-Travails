import './style.scss'
import {clearBoard ,addFadeIn, addCheck, AddBoardRows, awaitUserKnightPlacement, awaitUserEndPlacement ,animatePath, resetHeader} from './dom-functions.ts'
import getShortestPath from './bfs.ts';



AddBoardRows();
round();
const resetButton = document.getElementsByClassName("reset-button")[0] as HTMLButtonElement;
resetButton.addEventListener("click",()=>{
    clearBoard();
    AddBoardRows();
    resetHeader();
    round();});

function round():void{
const input= awaitUserKnightPlacement();
input.then((res) => {
    const firstInstruct = document.getElementsByClassName("start-instruction")[0] as HTMLHeadingElement;
    const secondInstruct = document.getElementsByClassName("end-instruction")[0] as HTMLHeadingElement;
    addCheck(firstInstruct);
    addFadeIn(secondInstruct);
    const start: number[] = res;
    const end: Promise<number[]> = awaitUserEndPlacement();
    end.then((res) => {
        const resetButton = document.getElementsByClassName("reset-button")[0] as HTMLButtonElement;
        addCheck(secondInstruct);
        const path = getShortestPath(start, res);
        animatePath(path);
        addFadeIn(resetButton);
        
    });
}
);
}