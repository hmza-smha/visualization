/**
 * THE DRIVER CODE;
 */
let matrix = new Matrix(26, 71, 20);
let src;
let dest;
let clearBoard = true;
let hold = false;
let theAlgorithm = 'dijkstra';
let container = document.getElementById('container');
let instruction = document.getElementById('instruction');
let randomBlocksBtn = document.getElementById('random_blocks_btn');
let clearBtn = document.getElementById('clear_btn');
let runBtn = document.getElementById('run_btn');
let slider = document.getElementById('speed');
let aglorithmName = document.getElementById('algorithm_name');
let randomBlocksExist = false;
clearBtn.addEventListener('click', function() {
    instruction.innerHTML = "pick a start node!";
    if (src != undefined)
        matrix.nodes[src].src = undefined;
    if (dest != undefined)
        matrix.nodes[dest].dest = undefined;
    dest = src = undefined;
    // re-initialize the objects;
    let V = matrix.nodes.length;
    for (let i = 0; i < V; i++) {
        matrix.nodes[i].parent = -1;
        matrix.nodes[i].block = false;
        matrix.nodes[i].visited = false;
        matrix.nodes[i].value = Infinity;
        matrix.nodes[i].successors = [];
        // delete the animation for all objects;
        document.getElementById(i).className = "";
    }
    clearBoard = true;
    randomBlocksExist = false;
});

randomBlocksBtn.addEventListener('click', function() {
    if (!clearBoard || randomBlocksExist) {
        clearBtn.click();
    }
    matrix.randomBlocks(src, dest);
    randomBlocksExist = true;
});

runBtn.addEventListener('click', function() {
    if (clearBoard == false) {
        alert("Error: Board is not clear!");
        return;
    }
    if (src == undefined) {
        instruction.innerHTML = "pick a start node!";
        return;
    }
    if (dest == undefined) {
        instruction.innerHTML = "pick a target node!";
        return;
    }
    let algo = new Algorithms(matrix, src, dest);
    let checkNodesInOrder;
    let lastNode;
    unableBtns();
    if (theAlgorithm == 'astar') {
        algo.aStar();
    } else if (theAlgorithm == 'dijkstra') {
        algo.dijkstra();
    } else if (theAlgorithm == 'bfs') {
        algo.bsetFS();
    } else if (theAlgorithm == 'breadthfs') {
        algo.breadthFS();
    } else if (theAlgorithm == 'dfs') {
        algo.depthFS();
    }
    checkNodesInOrder = algo.checkedInOrder;
    lastNode = checkNodesInOrder.length - 1;
    let speed = slider.value;
    for (let i in checkNodesInOrder) {
        setTimeout(() => {
            //apply animation for visited nodes;
            document.getElementById(checkNodesInOrder[i]).classList.add('node_visited');
            // if we reach the target node, apply animation for the shortestpath;
            if (i == lastNode) {
                let cur = matrix.nodes[dest].id;
                while (cur != undefined) {
                    if (cur == src || cur == dest) {
                        cur = matrix.nodes[cur].parent.id;
                        continue;
                    }
                    document.getElementById(cur).classList.add('pathNodeAnimation');
                    cur = matrix.nodes[cur].parent.id;
                }
                instruction.innerHTML = "clear the board and run again!";
                ableBtns();
            }
        }, (speed) * i);
    }
});

function unableBtns() {
    clearBoard = false;
    clearBtn.disabled = true;
    clearBtn.style.cursor = 'not-allowed';
    clearBtn.style.opacity = '0.5';
    runBtn.disabled = true;
    runBtn.style.cursor = 'not-allowed';
    runBtn.style.backgroundColor = 'red';
    randomBlocksBtn.disabled = true;
    randomBlocksBtn.style.cursor = 'not-allowed';
    randomBlocksBtn.style.opacity = '0.5';
    slider.disabled = true;
    slider.style.cursor = 'not-allowed';
}

function ableBtns() {
    clearBtn.disabled = false;
    clearBtn.style.cursor = 'pointer';
    clearBtn.style.opacity = '1';
    runBtn.disabled = false;
    runBtn.style.cursor = 'pointer';
    runBtn.style.backgroundColor = 'teal';
    randomBlocksBtn.style.opacity = '1';
    randomBlocksBtn.disabled = false;
    randomBlocksBtn.style.cursor = 'pointer';
    slider.disabled = false;
    slider.style.cursor = 'pointer';
}

//picking the algorithm;
document.getElementById('dijkstra').addEventListener('click', function() {
    aglorithmName.innerHTML = 'Dijkstra algorithm!';
    theAlgorithm = 'dijkstra';
});
document.getElementById('astar').addEventListener('click', function() {
    aglorithmName.innerHTML = 'A* algorithm!';
    theAlgorithm = 'astar';
});
document.getElementById('bfs').addEventListener('click', function() {
    aglorithmName.innerHTML = 'Bset-First-search algorithm';
    theAlgorithm = 'bfs';
});
document.getElementById('breadthfs').addEventListener('click', function() {
    aglorithmName.innerHTML = 'Breadth-First-search algorithm';
    theAlgorithm = 'breadthfs';
});
document.getElementById('dfs').addEventListener('click', function() {
    aglorithmName.innerHTML = 'Depth-First-search algorithm';
    theAlgorithm = 'dfs';
});

// in the container:
// the first click is for the start,
// the second click is for the destenation,
// the mouseover while mouse is down is for draw blocks;
container.addEventListener('mousedown', function(element) {
    let e = element.target.id;
    if (matrix.nodes[e].block) {
        return;
    }
    if (src == undefined && e != 'container') {
        src = e;
        instruction.innerHTML = "pick a target node!";
        document.getElementById(src).classList.add('start_node');
    } else if (dest == undefined && e != 'container') {
        dest = e;
        document.getElementById(dest).classList.add('target_node');
        instruction.innerHTML = "draw blocks and run the algorithm!";
    } else if (e != 'container') {
        hold = true; // mouse is down;
    }
});
container.addEventListener('mouseup', function() {
    hold = false; // mouse is up;
});
container.addEventListener('mouseover', function(element) {
    // if mouse is down;
    if (hold) {
        let e = element.target.id;
        if (e != 'container' && e != src && e != dest) {
            if (matrix.nodes[e].block == false && clearBoard) {
                matrix.nodes[e].block = true;
                document.getElementById(e).classList.add('blockNodeAnimation');
            }
        }
    }
});