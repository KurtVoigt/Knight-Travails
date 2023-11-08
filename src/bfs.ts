type ChessSpace = {
    x: number,
    y: number,
    parent: ChessSpace | null,
    discovered: boolean,
};

type xy = {
    x: number,
    y: number,
}

class ChessArr {
    data: (ChessSpace)[][];
    constructor() {
        this.data = this.createBoard();
        console.log(this.data)
    }

    private createBoard() {
        const row = [];
        for (let i = 0; i < 8; i++) {
            const col: ChessSpace[] = [];
            for (let j = 0; j < 8; j++) {
                col.push({ x: i, y: j, parent: null, discovered: false });
            }
            row.push(col);
        }
        return row;
    }

    private getMoves(coord: ChessSpace): ChessSpace[] {
        const nextMoves: ChessSpace[] = [];
        const possibleMoves: xy[] =
            [{ x: 1, y: 2 }, { y: 1, x: 2 }, { x: 2, y: -1 }, { x: 1, y: -2 }, { x: -1, y: -2 },
            { x: -2, y: -1 }, { x: -2, y: 1 }, { x: -1, y: 2 },];
        console.log(coord);

        for (let i = 0; i < possibleMoves.length; i++) {
            if (coord.x + possibleMoves[i].x > 0 && coord.y + possibleMoves[i].y > 0
                && coord.x + possibleMoves[i].x < 8 && coord.y + possibleMoves[i].y < 8) {
                nextMoves.push(this.data[coord.x + possibleMoves[i].x][coord.y + possibleMoves[i].y]);
            }

        }
        return nextMoves;
    }

    private tracePath(node: ChessSpace, current: number[][]): number[][]{
        if (node.parent === null){
            current.unshift([node.x,node.y]);
            return current; 
        }
        else{
            current.unshift([node.x,node.y]);
            return this.tracePath(node.parent,current);  
        }
    }

    chessBFS(start: number[], end: number[]): number[][] {
        const discovered = new Queue();
        discovered.push(this.data[start[0]][start[1]]);
        this.data[start[0]][start[1]].discovered = true;

        while (!discovered.isEmpty()) {
            let currentSpace = discovered.pop();
            if (currentSpace) {
                if (currentSpace!.x === end[0] && currentSpace!.y === end[1]){
                    //need new data format to describe path
                    let arr: number[][] = [];
                    console.log(this.tracePath(currentSpace, arr)); 
                    return arr;
                }
                //create new coords from possible moves
                let children = this.getMoves(currentSpace) 
                for (let i = 0; i < children.length; i++) {
                    if (!children[i].discovered) {
                        children[i].parent = currentSpace;
                        discovered.push(children[i]);
                        children[i].discovered = true;
                    }
                }
            }
        }
        //will never come here but don't know how to stop TS complaining
        return [];

    }
}

class Queue {
    data: ChessSpace[];
    constructor() {
        this.data = [];
    }
    push(pushed: ChessSpace) {
        this.data.push(pushed);
    }
    pop() {
        return this.data.shift();
    }
    peek() {
        return this.data[0]
    }
    isEmpty() {
        if (this.data.length > 0)
            return false;
        else
        return true;
    }
}

export default function getShortestPath(start: number[], end: number[]): number[][]{
    const arr = new ChessArr();
    return arr.chessBFS(start, end);
}