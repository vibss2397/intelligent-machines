var rows = 30;
var cols = 30;
var rows_thic;
var cols_thic;
var grid = new Array(cols);
var q;
var start,destination;
var temp;
var color_arr = [];

function distance_function(spot1, spot2){
    return dist(spot1.x, spot1.y, spot2.x, spot2.y);
}
function setup(){
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
    
    for (let i = 0;i<cols;i++){
        for(let j = 0;j<rows;j++){
            grid[i][j].get_neighbors(grid);
        }
    }
    
    q = new pqueue();
    start = grid[0][0];
    destination = grid[rows-1][cols-1];
    start.wall = false;
    destination.wall = false;
    start.dist = 0;
    q.push(start);
    
}

function draw() {
    if(q.length>0){
        temp = q.pop();
        if(temp == destination){
            console.log('hogo');
            noLoop();
        } 
        if(!temp.wall){
            for(var i =0; i<temp.neighbors.length;i++){
                var neighbor = temp.neighbors[i];
                distance = temp.dist + distance_function(temp, neighbor);
                if(distance<neighbor.dist){
                    neighbor.dist = distance;
                    neighbor.prev=temp;
                    q.push(neighbor);
                }
            } 
        }
        
    } else{
        // no path exists
        console.log('no path exists!');
        noLoop();
        return;
    }
    background(255); 
    for (let i = 0;i<cols;i++){
        for(let j = 0;j<rows;j++){
            grid[i][j].show();
        }
    }
    
    for (let i = 0;i<q.length;i++){
        q.data[i].show(color(0, 255, 0, 50));
    }
    
    path = [];
    while(temp.prev){
        path.push(temp);
        temp = temp.prev;
        color_arr.push(temp);
    }
    path.push(temp);

    
    noFill();
    stroke(255, 0, 200);
    strokeWeight(rows_thic/4);
    beginShape();
    for (var i = 0; i < path.length; i++) {
        vertex(path[i].x * rows_thic + rows_thic / 2, path[i].y * cols_thic + cols_thic);
    }
    endShape();
    
}