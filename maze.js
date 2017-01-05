// script for maze
var maze = initmaze(30, 40);
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
    addtodo(maze, "S", x    , y - 1);
    addtodo(maze, "N", x    , y + 1);
    addtodo(maze, "W", x + 1, y    );
    addtodo(maze, "E", x - 1, y    );
    // set south/east to false:
    switch(td.dir) {
        case "0":
            break;
        case "S":
            cell.south = false;
            break;
        case "N":
            maze.cells[y-1][x].south = false;
            break;
        case "W":
            maze.cells[y][x-1].east = false;
            break;
        case "E":
            cell.east = false;
            break;
    }
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

function makespan(classes) {
    const template = "<span class='x'></span>";
    return template.replace("x", classes);
}

function spanmaze(maze) {
    var n0 = rnd(maze.nx);
    var nn = rnd(maze.ny);
    var r = "";
    for(y=0; y<maze.ny; y++) {
        r += "<div>";
        var row = maze.cells[y];
        for (x=0; x<maze.nx; x++) {
            let s = "";
            var cell = row[x];
            s += (x === 0)                                      ? 'w ' : '';
            s += (y === 0 && n0 !== x)                          ? 'n ' : '';
            s += (cell.south) && !(nn === x && y+1 === maze.ny) ? 's ' : '';
            s += (cell.east)                                    ? 'e ' : '';
            r += makespan(s);
        }
        r += "</div>\n";
    }
    return r;
}

function logmaze(maze) {
    var r = " ";
    for (x=0; x<maze.nx; x++) 
        r += "__";    
    for(y=0; y<maze.ny; y++) {
        r += "\n";
        var s = "|";
        var row = maze.cells[y];
        for (x=0; x<maze.nx; x++) {
            var cell = row[x];
            s += cell.south ? '_' : ' ';
            s += cell.east ? '|' : '_';
        }
        r += s;
    }
    return r;
}

function showmaze(maze) {
    var spans = spanmaze(maze);
    var div = document.getElementById('maze');
    div.innerHTML = spans;
}

function rnd(n) {
    return Math.floor(Math.random() * n);
}