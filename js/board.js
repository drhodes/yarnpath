
// Game board.
// 


yp.Board = function Board(w, h) {
    this.width = w;
    this.height = h;
    this.blocks = [];
    
    // init the blocks
    for (var i=0; i<w; i++) {
        this.blocks[i] = [];
        for (var j=0; j<h; j++) {
            var loc = new yp.Loc(i, j);
            this.blocks[i][j] = 0;
        }
    }
};

yp.Board.prototype.assertInRange = function(loc) {
    if (loc.x < 0 ||
        loc.x > this.width-1 ||
        loc.y < 0 ||
        loc.y > this.height-1) {
        throw Error("Location out of range");
    }
};

yp.Board.prototype.SetBlock = function(loc, val) {
    this.aAssertInRange(loc);
    this.blocks[loc.x][loc.y] = val;
};

yp.Board.prototype.GetBlock = function(loc) {
    this.assertInRange(loc);
    return this.blocks[loc.x][loc.y];
};



