let input = document.querySelector('[type=range]');
let dimension = input.value;

let reset = document.querySelector('#reset')
reset.addEventListener("click", resetGrid)



createGrid(dimension);

function createGrid(dimension){
    let grid = document.querySelector('.grid');
    if (grid === null){
        let main = document.querySelector('main')
        grid = document.createElement('div');
        grid.classList.add("grid");
        main.appendChild(grid);
    }
    grid.style["grid-template-columns"] = `repeat(${dimension}, 1fr)`;
    grid.style["grid-template-rows"] = `repeat(${dimension}, 1fr)`;
    for (let i = 1; i <= Math.pow(dimension, 2); i++) {
        let div = document.createElement('div');
        div.classList.add("default", "grid-item");
        div.id = `grid-item${i}`;
        div.addEventListener("mouseout", bringLight)
        grid.appendChild(div);
    }
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

input.addEventListener('change', function(e){
    dimension = e.target.value;
    deleteGrid();
    createGrid(dimension);
})


function bringLight(e) {
    let id = e.fromElement.id;
    let div;
    div = document.querySelector(`[id=${CSS.escape(id)}]`);
    div.style.backgroundColor = getRandomColor();
}

