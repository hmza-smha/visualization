let content = document.getElementById('content');
let num = document.getElementById('num');
let next = document.getElementById('next');
let skip = document.getElementById('skip');
let tutorialImg = document.getElementById('tutorial_img');
let navBar = document.getElementsByTagName('nav')[0];
let page1 = "Welcome to<br><span id='title'>Shortest Path Finding Visualizer</span><span id='hint'>This short tutorial will help you to use this application!</span>";
let pic1 = "images/path4.png";
let page2 = "<span id='title'>What is Shortest Path Finding Visualizer?</span><span id='hint'>At its core, a pathfinding algorithm seeks to find the shortest path between two points, this applicatoin visualizes a various pathfinding algorithms in action.</span>";
let pic2 = "images/dir.jpg";
let page3 = "<span id='title'>In the grid</span><span id='hint'>The first click is for <i>start</i> node, the second click is for <i>target</i> node <br> then you can draw <i> walls.</i> </span>";
let pic3 = "images/srcdestblocks.png";
let page4 = "<span id='title'>Algorithms</span><span id='hint'>Pick the algorithm that you want to visualize it, the default is <i> Dijkstra algorithm.</i></span>";
let pic4 = "images/algo.png";
let page5 = "<span id='title'>Run the algorithm</span><span id='hint'>Press the button bellow to see the algorithm in action.</span>";
let pic5 = "images/runbtn.png";
let page6 = "<span id='title'>instructions</span><span id='hint'>In the middle of the window you will find some instructions to help you.</span>";
let pic6 = "images/instructions.png";
let numOfPages = 1;
window.onload = function() {
    content.innerHTML = page1;
    tutorialImg.src = pic1;
    num.innerHTML = "1/6"
    navBar.style.opacity = '0.2';
}
next.addEventListener('click', function() {
    numOfPages++;
    switch (numOfPages) {
        case 2:
            content.innerHTML = page2;
            tutorialImg.src = pic2;
            num.innerHTML = "2/6"
            break;
        case 3:
            content.innerHTML = page3;
            tutorialImg.src = pic3;
            num.innerHTML = "3/6"
            break;
        case 4:
            content.innerHTML = page4;
            tutorialImg.src = pic4;
            num.innerHTML = "4/6"
            break;
        case 5:
            content.innerHTML = page5;
            tutorialImg.src = pic5;
            num.innerHTML = "5/6"
            break;
        case 6:
            content.innerHTML = page6;
            tutorialImg.src = pic6;
            num.innerHTML = "6/6"
            next.innerHTML = "finish...";
            break;
        case 7:
            skip.click();
    }
})
skip.addEventListener('click', function() {
    document.getElementsByClassName('tutorial')[0].style.display = 'none';
    navBar.style.opacity = '1';
})