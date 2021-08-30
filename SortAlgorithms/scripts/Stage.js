class Stage {
    constructor(n) {
        let container = document.getElementsByClassName('container')[0];
        let id = 0;
        let h;
        this.nodesHeights = [];
        for (let i = 0; i < n; i++) {
            h = Math.floor(Math.random() * 300) + 50;
            this.nodesHeights[id] = h;
            let newNode = this.createNode(h, id++);
            container.appendChild(newNode);
        }
    }
    createNode(h, id) {
        let newNode = document.createElement('canvas');
        newNode.style.height = h + 'px';
        newNode.id = id;
        return newNode;
    }
}