const startButton = document.getElementById('startButton');
const gridSizeDropdown = document.getElementById('gridSize');
const gridContainer = document.getElementById('grid');
const message = document.getElementById('message');

let timerInterval;
let hoverCount = 0;
let timer = 0;
let fredCell, walnutCell;

function createGrid(size) {
    gridContainer.innerHTML = '';
    gridContainer.style.gridTemplateColumns = `repeat(${size}, 50px)`;
    gridContainer.style.gridTemplateRows = `repeat(${size}, 50px)`;

    for (let i = 0; i < size * size; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.addEventListener('mouseover', () => handleHover(cell));
        gridContainer.appendChild(cell);
    }
}

function updateHoverCount() {
    const hoverCountElement = document.getElementById('hoverCount');
    hoverCountElement.textContent = `Hover Count: ${hoverCount}`;
}

function handleHover(cell) {
    if (!gridContainer.classList.contains('active')) return;

    if (cell.classList.contains('yellow')) {
        cell.classList.remove('yellow');
        cell.style.backgroundImage = '';
    } else {
        cell.classList.add('yellow');
        hoverCount++;
        updateHoverCount();
        if (cell.dataset.image === "fred") {
            cell.style.backgroundImage = "url('IMG/Fred.png')";
            cell.style.backgroundSize = 'contain';
            cell.style.backgroundRepeat = 'no-repeat';
            cell.style.backgroundPosition = 'center';
            setTimeout(() => {
                clearInterval(timerInterval);
                alert(`You didn't find Walnut but I love Pizza, Game Over. Timer: ${timer}s, Hover Count: ${hoverCount}`);
                resetGame();
            }, 100);
        } else if (cell.dataset.image === "walnut") {
            cell.style.backgroundImage = "url('IMG/Walnut.webp')";
            cell.style.backgroundSize = 'contain';
            cell.style.backgroundRepeat = 'no-repeat';
            cell.style.backgroundPosition = 'center';
            setTimeout(() => {
                clearInterval(timerInterval);
                alert(`You found the Walnut! Timer: ${timer}s, Hover Count: ${hoverCount}`);
                resetGame();
            }, 100);
        }
    }
}

function startGame() {
    const size = parseInt(gridSizeDropdown.value);
    createGrid(size);
    gridContainer.classList.add('active');
    message.textContent = 'Game started! Timer: 0s';
    hoverCount = 0;
    timer = 0;

    timerInterval = setInterval(() => {
        timer++;
        message.textContent = `Game started! Timer: ${timer}s`;
    }, 1000);

    placeImages(size);
}

function placeImages(size) {
    const cells = Array.from(gridContainer.children);
    fredCell = cells[Math.floor(Math.random() * cells.length)];
    walnutCell = cells[Math.floor(Math.random() * cells.length)];

    while (fredCell === walnutCell) {
        walnutCell = cells[Math.floor(Math.random() * cells.length)];
    }

    fredCell.dataset.image = "fred";
    walnutCell.dataset.image = "walnut";
}

function resetGame() {
    clearInterval(timerInterval);
    gridContainer.classList.remove('active');
    message.textContent = 'Grid deactivated, click on start to begin the game.';
}

function initialize() {
    const size = parseInt(gridSizeDropdown.value);
    gridContainer.innerHTML = ''; // Clear existing cells

    // Set explicit dimensions for the grid container
    gridContainer.style.display = 'grid';
    gridContainer.style.gridTemplateColumns = `repeat(${size}, 50px)`;
    gridContainer.style.gridTemplateRows = `repeat(${size}, 50px)`;
    gridContainer.style.width = `${size * 50}px`;
    gridContainer.style.height = `${size * 50}px`;
    gridContainer.style.border = '2px solid #ccc';

    for (let i = 0; i < size * size; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.style.width = '50px';
        cell.style.height = '50px';
        cell.style.border = '1px solid #ccc';
        gridContainer.appendChild(cell);
    }

    message.textContent = 'Grid initialized, select a size and press start to begin the game.';
    updateHoverCount();
}

gridSizeDropdown.addEventListener('change', initialize);
initialize();
startButton.addEventListener('click', startGame);
