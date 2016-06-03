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

var IMPOSSIBLE_1 = [ "o o o o o o ",
                     "o # o # # o",
                     "o s o o o o ",
                     "o o o # o o ",
                     "o o o # o o ",
                     "o o o o o o ",
                   ];

var training1 = [
    "#o",
    "so",
];

var training2 = [
    "#oo",
    "s#o",
    "ooo",
];

var training3 = [
    "#oo",
    "soo",
    "#oo",
];

var training4 = [
    "#os",
    "ooo",
    "#oo",
];

var training = [
    "#so",
    "ooo",
    "#oo",
];

var training = [
    "#soo",
    "oooo",
    "#ooo",
    "#ooo",
];

var training = [
    "#soo",
    "oo#o",
    "#o#o",
    "#ooo",
];

var training = [
    "#soo",
    "oooo",
    "#o#o",
    "#ooo",
];


var training = [
    "#sooo",
    "#oooo",
    "#oooo",
    "#oo#o",
    "ooooo",
];

var training = [
    "#sooo",
    "##ooo",
    "###oo",
    "#oooo",
    "ooooo",
];

var training = [
    "#soooo",
    "##oooo",
    "###ooo",
    "##oooo",
    "oooooo",
    "oooooo",
];

var training = [
    "osooo",
    "o#ooo",
    "ooooo",
    "ooo#o",
    "ooooo",
];

var training = [
    "osooooo",
    "o#oo#oo",
    "ooooooo",
    "ooo#ooo",
    "o#ooooo",
    "ooooo#o",
    "ooooooo",
];

var training = [ // this is solvable.    
    "osoooooo",
    "o#oo#o#o",
    "oooooooo",
    "ooo#oooo",
    "o#oooooo",
    "ooooo#oo",
    "ooooo#oo",
    "oooooooo",
];

yp.LevelMgr = function(map) {
    this.lvl = nil;
    this.SetupLevel(training);
};

yp.LevelMgr.prototype.SetupLevel = function(map) {
    this.Remove();   
    this.lvl = new yp.Level(map);
    this.SetupGfx();
    this.txt = yp.snap.text(0, 50, "999").attr({
        fill: "#BBB",
        "font-family": "Montserrat",
        "font-size": "40px",
    });

    var m = new Snap.Matrix();
    m.translate(yp.GAME_SIZE/2 - this.txt.getBBox().width/2, 0);
    this.txt.animate({transform: m}, 500);
};

yp.LevelMgr.prototype.SetCallbackOnWin = function(f) {
    this.lvl.SetCallbackOnWin(f);
};

yp.LevelMgr.prototype.SetCallbackOnStuck = function(f) {
    this.lvl.SetCallbackOnStuck(f);
};

yp.LevelMgr.prototype.SetupGfx = function() {
    this.lvl.SetupGfx();
};

yp.LevelMgr.prototype.Remove = function() {
    if (this.lvl != nil) { this.lvl.Remove(); }
    if (this.txt != nil) { this.txt.remove(); }
};

