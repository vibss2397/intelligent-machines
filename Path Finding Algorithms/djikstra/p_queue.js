function pqueue() {
    this.data = [];
    this.length = this.data.length;
    
    
    this.push = function(item) {
        var contain = false; 
  
        for (let i = 0; i < this.data.length; i++) { 
            if (this.data[i].f > item.f) { 
            // Once the correct location is found it is 
            // enqueued 
            this.data.splice(i, 0, item); 
            contain = true; 
            break; 
            } 
        } 
  
        if (!contain) { 
            this.data.push(item); 
        }
        this.length = this.data.length;
    }
    
    this.peek = function() {
        return this.data[0];
    }
    
    this.pop = function() {        
        var a = this.data.shift();  
        this.length = this.data.length;
        return a;
    }
    
}