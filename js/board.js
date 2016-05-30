// ------------------------------------------------------------------
// Game board.
// 

yp.Board = function Board(w, h) {    
    console.log("init board...");
    this.width = w;
    this.height = h;
    this.tiles = [];
    this.startLoc = nil;
    this.spot = nil;
    // snap els
    this.rect = nil; // dark grey border
    this.back = nil; // background
    

    
    // init the blocks
    for (var i=0; i<w; i++) {
        this.tiles[i] = [];
        for (var j=0; j<h; j++) {
            var loc = new yp.Loc(i, j);
            this.tiles[i][j] = 0;
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

yp.Board.prototype.SizeInPixels = function() {
    // return the width of the board.
    return this.tiles.length * yp.TILE_SIZE;
};


yp.Board.prototype.SetTile = function(loc, val) {
    this.assertInRange(loc);
    this.tiles[loc.x][loc.y] = val;
};

yp.Board.prototype.setSpot = function(spot) {
    this.spot = spot;
};

yp.Board.prototype.GetTile = function(loc) {
    this.assertInRange(loc);
    return this.tiles[loc.x][loc.y];
};

yp.Board.prototype.TopPx = function(loc) {
    return yp.GAME_SIZE/2 - (this.SizeInPixels()/2);
};
yp.Board.prototype.LeftPx = function(loc) {
    return yp.GAME_SIZE/2 - (this.SizeInPixels()/2);
};

yp.Board.prototype.Remove = function() {
    for (var i=0; i<this.width; i++) {
        for (var j=0; j<this.height; j++) {
            this.tiles[i][j].Remove();            
        }
    }
    this.rect.remove();
    this.back.remove();
    this.spot.Remove();
    
};

// -----------------------------------------------------------------------------
yp.Board.prototype.SetupGfx = function() {
    console.log("Board SetupGfx...");
    this.rect = yp.snap.rect(0, 0, 640, 640);
    this.rect.attr("fill", "#505050");

    this.back = yp.snap.rect(this.TopPx(), this.LeftPx(),
                            this.SizeInPixels(), this.SizeInPixels());
    this.back.attr("fill", "#333");
    this.back.attr("stroke-width", 10);
    this.back.attr("stroke", "#333");
    
    for (var i=0; i<this.width; i++) {
        for (var j=0; j<this.height; j++) {
            this.tiles[i][j].SetupGfx(this.LeftPx() + i * yp.TILE_SIZE,
                                      this.TopPx() + j * yp.TILE_SIZE);
        }
    }
    
    this.spot.SetupGfx(this);
};


