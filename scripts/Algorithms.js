class Algorithms {
    constructor(Matrix, src, dest) {
        this.matrix = Matrix;
        this.nodes = matrix.nodes;
        this.checkedInOrder = []; // checkedInOrderInOrder represent the 'order' of visited nodes, used for animations;
        this.nodes[src].src = src;
        this.nodes[src].value = 0; // source node value 'distance' always 0;
        this.nodes[dest].dest = dest;
    }

    dijkstra() {
        let numOfNodes = this.nodes.length;
        for (let i = 0; i < numOfNodes; i++) {
            let u = this.minDistanceNode(this.nodes);
            // if u is the target node, then the find is successful;
            // if the method returnes the Infinity value of u, so we got the
            // Infinity value (which is the default value) and the target dosen't has been reached,
            // so destination cannot be reached;
            // else continue searching;

            if (u.dest == dest) {
                return;
            } else if (u.value == Infinity) {
                console.log("destination cannot be reached");
                return;
            } else {
                this.checkedInOrder[i] = u.id;
            }
            u.visited = true;
            this.matrix.updateSuccessors(u.id); // set the successors of the picked node 'u';
            let neighbors = u.successors;
            // apply relaxation for all successors nodes;
            for (let v in neighbors) {
                if (!neighbors[v].visited && u.value + 1 < neighbors[v].value) {
                    neighbors[v].value = u.value + 1;
                    neighbors[v].parent = u;
                }
            }
        }
    }
    minDistanceNode(nodes) {
        let n;
        let min = Infinity;
        for (let i in nodes) {
            if (!nodes[i].visited && nodes[i].value <= min) {
                min = nodes[i].value;
                n = nodes[i];
            }
        }
        return n;
    }


    aStar() {
        let list = [];
        let nodes = this.nodes;
        nodes[src].H = Math.abs(nodes[src].x - nodes[dest].x) + Math.abs(nodes[src].y - nodes[dest].y);
        nodes[src].F = nodes[src].H;
        list.push(nodes[src]);
        let count = 0;
        let finishIn = list.length;
        while (finishIn != 0) {
            let cur = this.getMinFInList(list, nodes[dest]);
            // if cur is undefined, then target cannot be reached;
            if (cur == undefined) {
                console.log('destination can not be reached');
                return;
            }
            list.splice(list.indexOf(cur), 1); //delete the picked node from the list;
            if (cur.dest == dest) {
                return;
            } else {
                this.checkedInOrder[count++] = cur.id;
            }
            let neighbors = cur.successors;
            this.matrix.updateSuccessors(cur.id); // get the neighbors of the node;
            for (let i in neighbors) {
                if (neighbors[i].value > cur.value + 1) {
                    neighbors[i].value = cur.value + 1;
                    neighbors[i].F = neighbors[i].value + neighbors[i].H;
                    neighbors[i].parent = cur;
                    // push neighbors to the list (if not exist), to be updated;
                    if (!list.includes(neighbors[i])) {
                        list.push(neighbors[i]);
                    }
                }
            }
        }
    }

    // this method calculate the H value of all neighbors one by one,
    // then calculate F value, and pick the minimum F;
    getMinFInList(list, goalNode) {
        let min = Infinity;
        let curNode;
        let node;
        for (let i in list) {
            curNode = list[i];
            curNode.H = Math.abs(curNode.x - goalNode.x) + Math.abs(curNode.y - goalNode.y);
            curNode.F = curNode.H + curNode.value;
            if (curNode.F < min) {
                min = curNode.F;
                node = curNode;
            }
        }
        return node;
    }

    bsetFS() {
        let nodes = this.nodes;
        let list = []; // list represent the nodes which is not updated yet;
        // calculate the heuristic value for the src;
        nodes[src].H = Math.abs(nodes[src].x - nodes[dest].x) + Math.abs(nodes[src].y - nodes[dest].y);
        list.push(nodes[src]);
        let count = 0;
        let finishIn = list.length;
        while (finishIn != 0) {
            let cur = this.getMinHInList(list, nodes[dest]);
            cur.visited = true;
            // if list is empty;
            if (cur == undefined) {
                console.log("destination can not be found!");
                return;
            } else if (cur.dest == dest) {
                return;
            } else {
                this.checkedInOrder[count++] = cur.id;
            }
            this.matrix.updateSuccessors(cur.id);
            let neighbors = cur.successors;
            for (let i in neighbors) {
                list.push(neighbors[i]);
            }
            list.splice(list.indexOf(cur), 1); //delete the picked node from the list;
        }
    }

    // this method calculate the H value of all neighbors one by one,
    // and pick the minimum H;
    getMinHInList(list, goalNode) {
        let min = Infinity;
        let curNode;
        let node;
        for (let i in list) {
            curNode = list[i];
            curNode.H = Math.abs(curNode.x - goalNode.x) + Math.abs(curNode.y - goalNode.y);
            if (curNode.H < min && !curNode.visited) {
                min = curNode.H;
                node = curNode;
            }
        }
        return node;
    }
    breadthFS() {
        let queue = [];
        queue.push(this.nodes[src]);
        let count = 0;
        let s;
        while (queue.length != 0) {
            s = queue.shift();
            if (s.dest == dest) {
                return;
            }
            this.checkedInOrder[count++] = s.id;
            this.matrix.updateSuccessors(s.id);
            let neighbors = s.successors;
            for (let i in neighbors) {
                if (neighbors[i].visited == false) {
                    neighbors[i].visited = true;
                    queue.push(neighbors[i]);
                }
            }
        }
    }
    depthFS() {
        let stack = [];
        stack.push(this.nodes[src]);
        let count = 0;
        let s;
        while (stack.length != 0) {
            s = stack.pop();
            if (s.dest == dest) {
                console.log("successful");
                return;
            }
            if (s.visited == false) {
                this.checkedInOrder[count++] = s.id;
                s.visited = true;
            }
            this.matrix.updateSuccessors(s.id);
            let neighbors = s.successors;
            for (let i in neighbors) {
                if (neighbors[i].visited == false)
                    stack.push(neighbors[i]);
            }
        }
    }
}