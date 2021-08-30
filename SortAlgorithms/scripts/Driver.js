let container = document.getElementsByClassName('container')[0];
let newArray = document.getElementById('new_array');
let bubbleSort = document.getElementById('bubble_sort');
let insertionSort = document.getElementById('insertion_sort');
let selectionSort = document.getElementById('selection_sort');
let startBtn = document.getElementById('start_btn');
let numOfNodes = 30;
let algo;
let speedOptions = document.getElementById('speed');
let sizeOptions = document.getElementById('size');
let stage = new Stage(numOfNodes);
let algorithm = new SortAlgorithms(stage);

function disableBtns() {
    newArray.disabled = true;
    bubbleSort.disabled = true;
    insertionSort.disabled = true;
    selectionSort.disabled = true;
    startBtn.disabled = true;
    speedOptions.disabled = true;
    sizeOptions.disabled = true;
    newArray.style.cursor = 'not-allowed';
    bubbleSort.style.cursor = 'not-allowed';
    insertionSort.style.cursor = 'not-allowed';
    selectionSort.style.cursor = 'not-allowed';
    startBtn.style.cursor = 'not-allowed';
    startBtn.style.color = 'red';
    speedOptions.style.cursor = 'not-allowed';
    sizeOptions.style.cursor = 'not-allowed';
}

function ableBtns() {
    newArray.disabled = false;
    bubbleSort.disabled = false;
    insertionSort.disabled = false;
    selectionSort.disabled = false;
    startBtn.disabled = false;
    speedOptions.disabled = false;
    sizeOptions.disabled = false;
    newArray.style.cursor = 'pointer';
    bubbleSort.style.cursor = 'pointer';
    insertionSort.style.cursor = 'pointer';
    selectionSort.style.cursor = 'pointer';
    startBtn.style.cursor = 'pointer';
    startBtn.style.color = '#1e9da1';
    speedOptions.style.cursor = 'pointer';
    sizeOptions.style.cursor = 'pointer';
}
sizeOptions.addEventListener('click', () => {
    let size = sizeOptions.value;

    if (size == 'none' || size == numOfNodes) {
        console.log("retrned");
        return;
    }
    container.innerHTML = '';
    numOfNodes = size;
    stage = new Stage(numOfNodes);
    algorithm = new SortAlgorithms(stage);
})

bubbleSort.addEventListener('click', () => {
    algo = 0;
    bubbleSort.style.borderBottom = '1px solid #1e9da1';
    insertionSort.style.borderBottom = 'none';
    selectionSort.style.borderBottom = 'none';
})

insertionSort.addEventListener('click', () => {
    algo = 1;
    insertionSort.style.borderBottom = '1px solid #1e9da1';
    selectionSort.style.borderBottom = 'none';
    bubbleSort.style.borderBottom = 'none';
})
selectionSort.addEventListener('click', () => {
    algo = 2;
    selectionSort.style.borderBottom = '1px solid #1e9da1';
    bubbleSort.style.borderBottom = 'none';
    insertionSort.style.borderBottom = 'none';
});

newArray.addEventListener('click', () => {
    container.innerHTML = '';
    algorithm = new SortAlgorithms(new Stage(numOfNodes));
});

startBtn.addEventListener('click', () => {
    let speed = speedOptions.value;
    switch (algo) {
        case 0:
            algorithm.bubbleSort(speed);
            break;
        case 1:
            algorithm.insertionSort(speed);
            break;
        case 2:
            algorithm.selectionSort(speed);
            break;
    }
});
window.onload = () => bubbleSort.click();