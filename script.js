let input = document.querySelector('[type=range]');
input.addEventListener('change', changeDimension)

let erase = document.querySelector('#erase')
erase.addEventListener('click', changeMode)

let rainbow = document.querySelector('#rainbow')
rainbow.addEventListener('click', changeMode)

let colorBTN = document.querySelector('#color')
colorBTN.addEventListener('click', changeMode)

let reset = document.querySelector('#reset')
reset.addEventListener("click", resetGrid)

let colorPick = document.querySelector('#colorPick');
colorPick.addEventListener('input', setColor)
colorPick.addEventListener('input', changeMode)

let dimension = input.value;
let mode = "rainbow";
let color = '#000000';
let mouseDown = false

function createGrid(dimension){
    let grid = document.querySelector('.grid');
    if (grid === null){
        let main = document.querySelector('main')
        grid = document.createElement('div');
        grid.classList.add("grid");
        main.appendChild(grid);
    }
    grid.onmousedown = () => (mouseDown = true)
    grid.onmouseup = () => (mouseDown = false)
    grid.style["grid-template-columns"] = `repeat(${dimension}, 1fr)`;
    grid.style["grid-template-rows"] = `repeat(${dimension}, 1fr)`;
    for (let i = 1; i <= Math.pow(dimension, 2); i++) {
        let div = document.createElement('div');
        div.classList.add("default", "grid-item");
        div.id = `grid-item${i}`;
        div.addEventListener("mouseover", bringLight)
        div.addEventListener("mousedown", bringLight)
        grid.appendChild(div);
    }
}


function setColor(e){
    // mode = "color";
    color = e.target.value; 
}


function resetGrid(){
    let divs = document.querySelectorAll('.grid-item');
    divs.forEach((div) => {
        div.style.backgroundColor = '#FFFFFF';
    })
}


function deleteGrid(){
    const grid = document.querySelector('.grid');
    grid.remove();
}


function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}


function bringLight(e) {
    if( (e.type === 'mouseover') && !mouseDown)
        return;
    e.preventDefault();
    // let id = e.fromElement.id;
    // let div;
    // div = document.querySelector(`[id=${CSS.escape(id)}]`);
    if (mode === "rainbow")
        e.target.style.backgroundColor = getRandomColor();
    else if (mode === "color")
        e.target.style.backgroundColor = color;
    else if (mode === "erase")
        e.target.style.backgroundColor = '#FFFFFF'
}


function changeDimension(e){
    dimension = e.target.value;
    deleteGrid();
    createGrid(dimension);
}


function changeMode(e){
    if (e.srcElement.id === 'colorPick'){
        mode = "color";
        return 
    }
    mode = e.srcElement.id;
}

createGrid(dimension);
