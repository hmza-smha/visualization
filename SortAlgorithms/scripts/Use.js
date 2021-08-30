function mark(i) {
    document.getElementById(i).style.backgroundColor = 'seagreen';
}

function mark2(i) {
    document.getElementById(i).style.backgroundColor = 'yellow';
}

function unmark(i) {
    document.getElementById(i).style.backgroundColor = '#eee';
}


function done(i) {
    document.getElementById(i).style.backgroundColor = 'springgreen';
}


async function sleep(time) {
    return new Promise(resolve => setTimeout(resolve, time));
}

function swapHeights(a, b) {
    let tmp = document.getElementById(a).style.height;
    document.getElementById(a).style.height = document.getElementById(b).style.height;
    document.getElementById(b).style.height = tmp;
}