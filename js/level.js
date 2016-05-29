/*
 this defines a level.
 the char # is a block
 the char o is an open square
 the char s is the start place.
 
 spaces are removed.

    [ "o o o o o",
      "o # o o o",
      "o s o o o",
      "o o o o o",
      "o o o o o",
    ];
*/

yp.Level = function(map) {
    this.board = nil;
    this.startLoc = nil;
    this.spot = nil;
    this.setup(map);
}

yp.Level.prototype.setup = function(map) {
    if (map.length == 0) {
        throw Error("map has length zero, which is nonsense");
    }

    // remove all spaces from rows
    map_ = [];
    map.forEach(function(row) {
        map_.push(row.split(" ").join(""));
    });
    map = map_;
    console.log(map);
    
    // check to make sure all the row lengths are the same.
    rowLen = map[0].length;
    map.forEach(function(row) {
        if (row.length != rowLen) {
            throw Error("map has rows of different lengths");
        }
    });

    // construct a game board
    var w = rowLen;
    var h = map.length;
    this.board = new yp.Board(w, h);
    
    for (var row in map) {
        for (var col in map[row]) {
            var char = map[row][col];
            var tile = new yp.Tile(char);
            var loc = new yp.Loc(col, row);
            this.board.SetTile(loc, tile);
            if (tile.IsStartSquare()) {
                this.startLoc = loc;
            }
        }
    }

    this.spot = new yp.Spot(this.startLoc);
};

yp.Level.prototype.Width = function(dir) {
    return this.board.width;
};

yp.Level.prototype.Height = function(dir) {
    return this.board.height;
};

yp.Level.prototype.TileAt = function(x, y) {
    return this.board.GetTile(new yp.Loc(x, y));
};

yp.Level.prototype.move = function(dir) {
    // look ahead
    // 
};

yp.Level.prototype.MoveEast = function(dir) {
};

yp.Level.prototype.SetupGfx = function() {
    console.log("Level SetupGfx...");
    this.board.SetupGfx();
    this.spot.SetupGfx(this.board);
    // allocate some items
};

yp.Level.prototype.Delete = function() {
    // delete some items
};

yp.Level.prototype.Draw = function() {
    // Draw the level.
};
