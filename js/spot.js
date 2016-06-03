

yp.Spot = function(loc) {
    this.loc = loc;
    this.circle = nil;
    this.matrix = new Snap.Matrix();
};

// ------------------------------------------------------------------
yp.Spot.prototype.SetupGfx = function(board) {
    var top = board.TopPx();
    var left = board.LeftPx();
    var radius = yp.TILE_SIZE / 2;
    
    var offsetX = this.loc.x * yp.TILE_SIZE + radius;
    var offsetY = this.loc.y * yp.TILE_SIZE + radius;
    
    this.circle = yp.snap.circle(left + offsetX,
                              top + offsetY,
                              radius/2);
                             
    this.circle.attr("fill", "#3030FF");
};

yp.Spot.prototype.Remove = function(board) {
    console.log("removing spot.");
    if (this.circle != nil) {
        this.circle.remove();
    }
};

yp.Spot.prototype.ToFront = function() {
    this.circle.attr({"z-index": 1});
};


yp.Spot.prototype.SetPixelPos = function(dir) {
    // look ahead
};

yp.Spot.prototype.MoveTo = function(deltaX, deltaY, callback) {
    this.matrix.translate(deltaX, deltaY);    
    this.circle.animate({transform: this.matrix}, 100, callback); 
};

