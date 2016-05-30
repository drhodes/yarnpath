
yp.Tile = function(char) {
    yp.TILE_SIZE = 60;
    // -------------------------------------------------------

    // the char # is a block
    // the char o is an open square
    // the char s is the start place.
    this.isStartSquare = false;
    this.kind = nil;
    this.rect = nil;
    this.dot = nil;
    
    if (char === "#") {
        this.kind = "block";
    } else if (char === "o") {
        this.kind = "square";
    } else if (char === "s") {
        this.kind = "square";
        this.isStartSquare = true;
    }

    this.callbackOnClick = "callback needs to be initialized.";
};

yp.Tile.prototype.IsStartSquare = function() {
    return this.isStartSquare;
};

yp.Tile.prototype.IsBlock = function() {
    return this.kind == "block";
};

yp.Tile.prototype.SetCallbackOnClick = function(f) {
    console.log("setting callback");
    this.callbackOnClick = f;
    // need to wait until snap elements are initialized before
    // callback can be assigned
};

yp.Tile.prototype.SetupGfx = function(x, y) {
    this.rect = yp.snap.rect(x+1, y+1, yp.TILE_SIZE-1, yp.TILE_SIZE-1);
    if (this.IsBlock()) {
        this.rect.attr("fill", "#333");
    } else {
        this.rect.attr("fill", "#BBB");
        this.dot = yp.snap.circle(x+yp.TILE_SIZE/2,
                                  y+yp.TILE_SIZE/2,
                                  yp.TILE_SIZE/12
                                 );
        this.dot.attr("fill", "#B0b0b0");
    }
    this.rect.attr("stroke", "#FFF");

    // assign callbacks
    this.rect.node.onclick = this.callback;
    
    if (this.dot != nil) {
        this.dot.node.onclick = this.callbackOnClick;
    }

    if (!this.IsBlock()) {
        var that = this;
        this.rect.mouseover(function() {
            that.rect.attr("fill", "#AAA");
        });
        this.rect.mouseout(function() {
            that.rect.attr("fill", "#BBB"); 
        });
        this.dot.mouseover(function() {
            that.rect.attr("fill", "#AAA");
        });
        this.dot.mouseout(function() {
            that.rect.attr("fill", "#BBB"); 
        });
    }    
};


yp.Tile.prototype.Remove = function() {
    console.log("removing tile");
    this.rect.remove();
    if (this.dot != nil) {
        this.dot.remove();
    }
};
