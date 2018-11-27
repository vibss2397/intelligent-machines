function Spot(i, j, w, h){
    this.x = i;
    this.y = j;
    this.w = w;
    this.h = h;
    this.dist = 999999;
    this.prev = 0;
    this.neighbors = [];
    this.isred = false;
    this.wall = false;
    if(random(1)<0.4){
        this.wall = true;
    }
    this.get_neighbors = function(grid){
        var i = this.x;
        var j = this.y;
        if (i < cols - 1) {
          this.neighbors.push(grid[i + 1][j]);
        }
        if (i > 0) {
          this.neighbors.push(grid[i - 1][j]);
        }
        if (j < rows - 1) {
          this.neighbors.push(grid[i][j + 1]);
        }
        if (j > 0) {
          this.neighbors.push(grid[i][j - 1]);
        }
        if (i > 0 && j > 0) {
            this.neighbors.push(grid[i - 1][j - 1]);
        }
        if (i < cols - 1 && j > 0) {
            this.neighbors.push(grid[i + 1][j - 1]);
        }
        if (i > 0 && j < rows - 1) {
            this.neighbors.push(grid[i - 1][j + 1]);
        }
        if (i < cols - 1 && j < rows - 1) {
            this.neighbors.push(grid[i + 1][j + 1]);
        }
    }
    
    this.show = function(col){
        if(this.wall){
            fill(color(0));
            noStroke();
            ellipse(this.x * this.w + this.w / 2, this.y * this.h + this.h / 2, this.w / 3, this.h / 3);
        }
        else if(col){
            fill(col);
            rect(this.x * this.w, this.y * this.h, this.w, this.h); }
        
    } 
}