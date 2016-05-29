

yp.Spot = function(loc) {
    this.loc = loc;
};

// ------------------------------------------------------------------
yp.Spot.prototype.SetupGfx = function(board) {
    var top = board.TopPx();
    var left = board.LeftPx();
    var radius = yp.TILE_SIZE / 2;
    
    var offsetX = this.loc.x * yp.TILE_SIZE + radius;
    var offsetY = this.loc.y * yp.TILE_SIZE + radius;
    
    var back = yp.snap.circle(left + offsetX,
                              top + offsetY,
                              radius/2);
                             
    back.attr("fill", "#3030FF");
};

yp.Spot.prototype.SetPixelPos = function(dir) {
    // look ahead
};


