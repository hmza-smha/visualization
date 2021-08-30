/**
 * this script is used for creating a graph as a 'GRID' in the FRONT-END
 * and initializing the nodes as objects;
 */

class Matrix {
    constructor(ROWS, COLS, node_size) {
        this.COLS = COLS;
        this.nodes = []; // nodes array represent all nodes;
        let id = 0;
        let container = document.getElementById('container');
        for (let i = 0; i < ROWS; i++) {
            for (let j = 0; j < COLS; j++) {
                // every node object has an 'id' property,
                // which is the same as id in the html element of that object,
                // so you can access the object either by id property or by html id element;
                this.nodes[id] = {
                    id: id,
                    x: i, // x and y represent the object's position in the grid,
                    y: j,
                    parent: -1, // parent used for the shortest path tree;
                    src: undefined,
                    dest: undefined,
                    block: false,
                    visited: false,
                    value: Infinity,
                    successors: [] // successors represent the 'neighbors' nodes;
                }

                // create and add the nodes to the container in HTML;
                let vertex = this.HTMLelement(id++, node_size);
                container.appendChild(vertex);
            }
            // add a 'br' after a ROW of nodes
            container.appendChild(document.createElement('br'));
        }
    }

    //nodes creator;
    HTMLelement(id, node_size) {
        let newNode = document.createElement('canvas');
        newNode.id = id;
        newNode.style.width = node_size + 'px';
        newNode.style.height = node_size + 'px';
        return newNode;
    }

    //this method used to get the left, right, up and bottom successors for a specific node;
    updateSuccessors(id) {
        let nodes = this.nodes;
        let cols = this.COLS;
        let n = nodes[id];
        let x = n.x;
        let rightNode = nodes[id + 1];
        let leftNode = nodes[id - 1];
        let upNode = nodes[id - cols];
        let bottomNode = nodes[id + cols];
        let leftX;
        let rightX;
        //if the n is a block node, so its out of the graph 'grid';
        if (n.block == true) {
            return;
        }
        if (rightNode != undefined) {
            rightX = rightNode.x;
            if (x == rightX && !rightNode.block) {
                n.successors.push(rightNode);
            }
        }
        if (leftNode != undefined) {
            leftX = leftNode.x;
            if (x == leftX && !leftNode.block) {
                n.successors.push(leftNode);
            }
        }
        if (upNode != undefined && !upNode.block) {
            n.successors.push(upNode);
        }
        if (bottomNode != undefined && !bottomNode.block) {
            n.successors.push(bottomNode);
        }
    }
    randomBlocks(src, dest) {
        let n;
        let V = this.nodes.length;
        let nodes = this.nodes;
        for (let i = 0; i < V / 3; i++) {
            n = Math.floor(Math.random() * V);
            if (n == src || n == dest || nodes[n].block) {
                continue;
            }
            nodes[n].block = true;
            document.getElementById(nodes[n].id).classList.add('blockNodeAnimation');
        }
    }
}