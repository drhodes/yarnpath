
yp.Tile = function(char) {
    yp.TILE_SIZE = 60;
    // -------------------------------------------------------

    // the char # is a block
    // the char o is an open square
    // the char s is the start place.
    this.isStartSquare = false;
    this.kind = nil;
    this.rect = nil;
    
    if (char === "#") {
        this.kind = "block";
    } else if (char === "o") {
        this.kind = "square";
    } else if (char === "s") {
        this.kind = "square";
        this.isStartSquare = true;
    }
};


yp.Tile.prototype.IsStartSquare = function() {
    return this.isStartSquare;
};

yp.Tile.prototype.IsBlock = function() {
    return this.kind == "block";
};

yp.Tile.prototype.SetupGfx = function(x, y) {
    this.rect = yp.snap.rect(x+1, y+1, yp.TILE_SIZE-1, yp.TILE_SIZE-1);
    if (this.IsBlock()) {
        this.rect.attr("fill", "#333");
    } else {
        this.rect.attr("fill", "#BBBBBB");
    }
    this.rect.attr("stroke", "#FFF");

};


