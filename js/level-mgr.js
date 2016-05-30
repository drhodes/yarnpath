/*
 level manager.
*/

/*
    this.lvl = new yp.Level([ "o o o o o o ",
                              "o # o # # o",
                              "o s o o o o ",
                              "o o o # o o ",
                              "o o o # o o ",
                              "o o o o o o ",
                            ]);
*/

yp.LevelMgr = function(map) {
    this.lvl = new yp.Level(
        [ "# o # # ",
          "s o o o ",
          "# o # o ",
          "# o o o ",
        ]);
    this.SetupGfx();    
};

yp.LevelMgr.prototype.SetupGfx = function() {
    this.lvl.SetupGfx();
};

yp.LevelMgr.prototype.Remove = function() {
    this.lvl.Remove();
};
