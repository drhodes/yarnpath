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
    this.lines = [];
    
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
    
    this.SetupCallbacks();
    this.spot.SetupGfx(this);
    this.markDots();
};

yp.Board.prototype.isTileLineOfSight = function(loc) {
    // if the tile is in line sight of spot, then true.
    if (this.tiles[loc.x][loc.y].IsBlock()) {
        // the way is blocked
        return false;
    }
    
    if (this.spot.loc.Equal(loc)) {
        // this is the tile the spot is on. base case.
        return true;
    }
    
    if (this.spot.loc.x == loc.x) {
        // share same column.
        if (loc.y > this.spot.loc.y) {
            // walk up to where the spot is.
            return this.isTileLineOfSight(new yp.Loc(loc.x, loc.y-1));
        }
        if (loc.y < this.spot.loc.y) {
            // walk down to where the spot is.
            return this.isTileLineOfSight(new yp.Loc(loc.x, loc.y+1));
        }
    }
    
    if (this.spot.loc.y == loc.y) {
        // share same row.
        if (loc.x > this.spot.loc.x) {
            // walk left to where the spot is.
            return this.isTileLineOfSight(new yp.Loc(loc.x-1, loc.y));
        }
        if (loc.x < this.spot.loc.x) {
            // walk right to where the spot is.
            return this.isTileLineOfSight(new yp.Loc(loc.x+1, loc.y));
        }
    }
    return false;
};

yp.Board.prototype.markDots = function() {
    // tiles that are unblocked rook moves should be marked green.
    for (var i=0; i<this.width; i++) {
        for (var j=0; j<this.height; j++) {
            var tile = this.tiles[i][j];
            if (this.isTileLineOfSight(new yp.Loc(i, j))) {
                tile.SetDotColor("#FFF");
            } else {
                tile.SetDotColor("#BBB");
            }
        }
    }
};


yp.Board.prototype.drawLineFrom = function(src, dst) {
    console.log(src);
    console.log(dst);
    var srcTile = this.tiles[src.x][src.y];
    var dstTile = this.tiles[dst.x][dst.y];
    var px1 = srcTile.CenterPx();
    var px2 = dstTile.CenterPx();
    var line = yp.snap.line(px1.x, px1.y, px2.x, px2.y);
    line.attr("stroke-width", 3);
    line.attr("stroke", "blue");
    console.log(line);
    this.lines.push(line);
};

yp.Board.prototype.MoveTo = function(dst) {
    if (this.isTileLineOfSight(dst)) {
        this.drawLineFrom(this.spot.loc, dst);

        var srcPx = this.tiles[this.spot.loc.x][this.spot.loc.y].CenterPx();
        var dstPx = this.tiles[dst.x][dst.y].CenterPx();

        var dx = dstPx.x - srcPx.x;
        var dy = dstPx.y - srcPx.y;
        this.spot.MoveTo(dx, dy);
    } else {
        // do nothing.
    }
    this.spot.loc = dst;
    this.markDots();
}

yp.Board.prototype.SetupCallbacks = function() {
    for (var i=0; i<this.width; i++) {
        for (var j=0; j<this.height; j++) {
            var tile = this.tiles[i][j];
            var that = this;
            tile.SetCallbackOnClick(function(innerTile) {                
                console.log(innerTile.loc);
                that.MoveTo(innerTile.loc);
            });
        }
    }
};
