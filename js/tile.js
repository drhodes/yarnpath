
yp.Tile = function(char, loc) {
    yp.TILE_SIZE = 60;
    yp.TILE_VISIT_EMPTY = 0; // a tile hasn't been visted
    yp.TILE_VISIT_H = 1; // spot passed through from side to side
    yp.TILE_VISIT_V = 2; // spot passed through vertically
    // -------------------------------------------------------

    // the char # is a block
    // the char o is an open square
    // the char s is the start place.
    this.loc = loc;
    this.isStartSquare = false;
    this.kind = nil;
    this.rect = nil;
    this.dot = nil;
    this.visitType = yp.TILE_VISIT_EMPTY;
    this.color = nil;

    
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


yp.Tile.prototype.VisitAs = function(visitType) {
    if (visitType < 1 || visitType > 2) {
        throw Error("Bad visit type: " + visitType);
    }
    this.visitType += visitType;
};

yp.Tile.prototype.VisitBlocked = function(visitType) {
    if (this.visitType == yp.TILE_VISIT_EMPTY) {
        return false;
    }
    if (this.visitType == visitType) {
        return true;
    }
    if (this.visitType > 2) {
        return true;
    }
    return false;
};

yp.Tile.prototype.IsStartSquare = function() {
    return this.isStartSquare;
};

yp.Tile.prototype.IsBlock = function() {
    return this.kind == "block";
};

yp.Tile.prototype.SetCallbackOnClick = function(f) {
    console.log("setting callback");

    var that = this;
    this.rect.node.onclick = function() {
        f(that);
    };
    
    if (this.dot != nil) {
        this.dot.node.onclick = function() {
            f(that);
        };
    }
};

yp.Tile.prototype.IsUnvisited = function(color) {
    return this.visitType == yp.TILE_VISIT_EMPTY;
};

yp.Tile.prototype.SetDotColor = function(color) {
    this.color = color;
    if (this.dot != nil) {
        this.dot.attr("fill", color);
    }
};

yp.Tile.prototype.CenterPx = function(color) {
    var bb = this.dot.getBBox();
    
    return {x: bb.x + bb.width/2,
            y: bb.y + bb.height/2};
}

yp.Tile.prototype.SetupGfx = function(x, y) {
    this.rect = yp.snap.rect(x+1, y+1, yp.TILE_SIZE-1, yp.TILE_SIZE-1);
    if (this.IsBlock()) {
        this.rect.attr("fill", "#333");
    } else {
        this.rect.attr("fill", "#BBB");
        this.dot = yp.snap.circle(x+yp.TILE_SIZE/2,
                                  y+yp.TILE_SIZE/2,
                                  yp.TILE_SIZE/30
                                 );
        this.dot.attr("fill", "#B0b0b0");
    }
    this.rect.attr("stroke", "#FFF");


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
