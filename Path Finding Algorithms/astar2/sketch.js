var rows = 40;
var cols = 40;
var rows_thic;
var cols_thic;
var grid = new Array(cols);
var openSet;
var closedSet = [];
var start, goal;
var path = [];

function heuristic_cost(spot1, spot2){
    // euclidian distance
    distance = dist(spot1.i, spot1.j, spot2.i, spot2.j);
    return distance
}
function setup(){
    //Setting up the environment.
    createCanvas(300, 300);
    rows_thic = width/(rows);
    cols_thic = height/(cols);
    for (let i = 0;i<cols;i++){
        grid[i]=new Array(rows);
    }
    
    for (let i = 0;i<cols;i++){
        for(let j = 0;j<rows;j++){
            grid[i][j] = new Spot(i, j, rows_thic, cols_thic);
        }
    }
    
    for (var i = 0; i < cols; i++) {
        for (var j = 0; j < rows; j++) {
          grid[i][j].get_neighbors(grid);
        }
    }
    
    start = grid[0][0];
    start.g = 0;
    
    goal = grid[cols-1][rows-1];
    
    start.h = heuristic_cost(start, goal);
    start.f = start.g + start.h;
    
    start.wall = false;
    goal.wall = false;
    openSet = new pqueue();
    openSet.push(start);
}

function draw() {
    if(openSet.length>0){
        var current = openSet.pop();
        if(current == goal){
            console.log('done');
            noLoop();
        }
        
        closedSet.push(current);
        var neighbors = current.neighbors;
        for (var i = 0; i < neighbors.length; i++) {
            var neighbor = neighbors[i]
            if(!closedSet.includes(neighbor) && !neighbor.wall){
                
                var tempG = current.g + heuristic_cost(neighbor, current);
                var newPath = false;
                if(!openSet.data.includes(neighbor)){
                    neighbor.g = tempG;
                    newPath = true;
                    openSet.push(neighbor);
                } else {
                    neighbor.g = tempG;
                    newPath = true;
                }
                if(newPath){
                    neighbor.h = heuristic_cost(neighbor, goal);
                    neighbor.f = neighbor.g + neighbor.h;
                    neighbor.previous = current;
                }
                 
        } 
    } } else{
        //code for no path
        console.log('no path');
        noLoop();
        return;
        
    }
    background(255);
    for (let i = 0;i<cols;i++){
        for(let j = 0;j<rows;j++){
            grid[i][j].show();
        }
    }
        
    for (let i = 0; i<closedSet.length;i++){
        closedSet[i].show(color(255, 0, 0, 50));
    }
    for (let i = 0; i<openSet.length;i++){
        openSet.data[i].show(color(0, 255, 0, 50));
    }
    
    path = [];
    while(current.previous){
        path.push(current);
        current = current.previous;
    }
    path.push(current);
    
    noFill();
    stroke(255, 0, 200);
    strokeWeight(rows_thic/4);
    beginShape();
    for (var i = 0; i < path.length; i++) {
        vertex(path[i].i * rows_thic + rows_thic / 2, path[i].j * cols_thic + cols_thic / 2);
    }
    endShape();

}