// script for maze
var maze = initmaze(20, 10);
generatemaze(maze);
showmaze(maze);

function generatemaze(maze) {
    var initial = {
        x: rnd(maze.nx),
        y: rnd(maze.ny),
        dir: "0"
    }
    openmazeat(maze, initial);
    while(true) {
        var td = picktodo(maze);
        if (!td) return;
        openmazeat(maze, td);
        removetodo(maze, td);
    }
}

function picktodo(maze) {
    var tl = maze.todos.length;
    if (tl === 0) return null;
    var idx = rnd(tl);
    return maze.todos[idx];
}

function removetodo(maze, td) {
    var tl = maze.todos.length;
    var ar = [];
    for(var i = 0; i < tl; i++) {
        var t = maze.todos[i];
        if (!equals(t, td))
            ar.push(t);
    }    
    maze.todos = ar;
}

function equals(td1, td2) {
    return td1.x === td2.x && td1.y === td2.y;
}

function openmazeat(maze, td) {
    var x = td.x;
    var y = td.y;
    var dir = td.dir;
    var cell = maze.cells[y][x];
    cell.open = true;
    addtodo(maze, "N", x, y-1);
    addtodo(maze, "S", x, y+1);
    addtodo(maze, "E", x+1, y);
    addtodo(maze, "W", x-1, y);
    // TODO: set south/east to false
}

function addtodo(maze, dir, x, y) {
    if (x < 0 || y < 0) return;
    if (x >= maze.nx || y >= maze.ny) return;
    if (maze.cells[y][x].open) return;
    var candidate = {dir, x, y};
    maze.todos.push(candidate);
}

function initmaze(nx, ny) {
    var maze = {
        cells: [],
        todos: [],
        nx, ny
    };

    for(y=0; y<maze.ny; y++) {
        maze.cells[y] = [];
        for (x=0; x<maze.nx; x++) {
            maze.cells[y][x] = {
                south: true,
                east: true,
                open: false
            };
        }
    }

    return maze;
}

function logmaze(maze) {
    var r = ".";
    for (x=0; x<maze.nx; x++) 
        r += "_.";    
    for(y=0; y<maze.ny; y++) {
        r += "\n";
        var s = "|";
        var row = maze.cells[y];
        for (x=0; x<maze.nx; x++) {
            var cell = row[x];
            s += cell.south ? '_' : ' ';
            s += cell.east ? '|' : '.';
        }
        r += s;
    }
    return r;
}

function showmaze(maze) {
    var disp = logmaze(maze);
    var pre = document.getElementById('maze');
    pre.innerText = disp;
}

function rnd(n) {
    return Math.floor(Math.random() * n);
}