import './style.scss'
import {addFadeIn, addCheck, AddBoardRows, awaitUserKnightPlacement, awaitUserEndPlacement ,animatePath} from './dom-functions.ts'
import getShortestPath from './bfs.ts';



AddBoardRows();
const lol = awaitUserKnightPlacement();
lol.then((res) => {
    const firstInstruct = document.getElementsByClassName("start-instruction")[0] as HTMLHeadingElement;
    const secondInstruct = document.getElementsByClassName("end-instruction")[0] as HTMLHeadingElement;
    addCheck(firstInstruct);
    addFadeIn(secondInstruct);
    const start: number[] = res;
    const end: Promise<number[]> = awaitUserEndPlacement();
    end.then((res) => {
        addCheck(secondInstruct);
        const path = getShortestPath(start, res);
        animatePath(path);
    });
}
);