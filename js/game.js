
yp.Game = function() {
    yp.GAME_SIZE = 512;
    
    // MAIN FUNCTION --------------------------------------------
    console.log("init game");
    
    // global, init snap.
    yp.snap = Snap("#svg");
    
    this.sm = new yp.StateMachine("Game", "loading-game");
    this.setupStateM();
    this.run();
};

yp.Game.prototype.setupStateM = function() {
    // GAME STATES intro, level selection, level starting,
    // level playing, level stopping, 
    //
    this.sm.declareStates([
        "loading-game",
        "checking-progress",        
        "intro",
        "level-starting",
        "level-playing",
        "level-stopping",
    ]);


    var that=this;
    this.sm.addTran("done-loading", "loading-game", "checking-progress",
                    function() { that.runCheckingProgress(); });
    // this.sm.addTran("done-checking", "checking-progress", "intro",
    //                 function() { that.runIntro(); });
    this.sm.addTran("done-checking", "checking-progress", "level-playing",
                    function() { that.runLevelStarting(); });

    this.sm.addTran("game-over", "level-playing", "level-playing",
                    function() { that.runLevelStarting(); });
    
    window.onload = function () {
        that.sm.Fire("done-loading");
        that.sm.LogState();
    };
};

yp.Game.prototype.runCheckingProgress = function() {
    // checking local storage for progress.
    console.log(localStorage);
    this.sm.Fire("done-checking");
};

yp.Game.prototype.runLevelStarting = function() {
    if (this.levelMgr != nil) {
        this.levelMgr.Remove();
    }
    this.levelMgr = new yp.LevelMgr();
    
    var that= this;
    this.levelMgr.SetCallbackOnWin(function() {
        that.sm.Fire("game-over");
    });
    this.levelMgr.SetCallbackOnStuck(function() {
        console.log("GAME OVER MAN");
        that.sm.Fire("game-over");
    });    
};

yp.Game.prototype.run = function() {
    // machine on .. beep boop.
    // YARN PATH VERSION 1.00 all splines reticulated.
    // beep boop boop beep.
    // initing state machines.
    // loading media.
    this.sm.LogState();    
};

yp.Game.prototype.loadGame = function() {
    // The game start. Check to see if there is saved state in local
    // storage
};
