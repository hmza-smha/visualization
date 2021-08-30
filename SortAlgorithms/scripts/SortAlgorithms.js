class SortAlgorithms {
    constructor(Stage) {
        this.nodesHeights = Stage.nodesHeights;
        this.len = this.nodesHeights.length;
    }
    async bubbleSort(time) {
        let tmp;
        disableBtns();
        for (let i = 0; i < this.len; i++) {
            for (let j = 0; j < this.len - i - 1; j++) {
                mark(j);
                mark(j + 1);
                await sleep(time);
                unmark(j);
                unmark(j + 1);
                if (this.nodesHeights[j] > this.nodesHeights[j + 1]) {
                    tmp = this.nodesHeights[j];
                    this.nodesHeights[j] = this.nodesHeights[j + 1];
                    this.nodesHeights[j + 1] = tmp;
                    swapHeights(j, j + 1);
                }
            }
            done(this.len - i - 1);
        }
        ableBtns();
    };
    async selectionSort(time) {
        disableBtns();
        for (let i = 0; i < this.len; i++) {
            let min = i;
            for (let j = i + 1; j < this.len; j++) {
                mark2(min);
                mark(j);
                await sleep(time);
                unmark(min);
                unmark(j);
                if (this.nodesHeights[min] > this.nodesHeights[j]) {
                    min = j;
                }
            }
            if (min !== i) {
                let tmp = this.nodesHeights[i];
                this.nodesHeights[i] = this.nodesHeights[min];
                this.nodesHeights[min] = tmp;
                swapHeights(i, min);
            }
            done(i);
        }
        ableBtns();
    }
    async insertionSort(time) {
        disableBtns();
        for (let i = 0; i < this.len; ++i) {
            let j = i;
            while (j >= 0 && this.nodesHeights[j] > this.nodesHeights[j + 1]) {
                mark(j);
                mark(j + 1);
                await sleep(time);
                unmark(j);
                unmark(j + 1);
                let tmp = this.nodesHeights[j];
                this.nodesHeights[j] = this.nodesHeights[j + 1];
                this.nodesHeights[j + 1] = tmp;
                swapHeights(j, j + 1);
                j -= 1;
            }
        }
        for (let counter = 0; counter < this.len; ++counter) {
            done(counter);
        }
        ableBtns();
    }
}