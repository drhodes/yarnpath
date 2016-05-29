


yp.Game = function() {
    yp.GAME_SIZE = 640;
    
    // MAIN FUNCTION --------------------------------------------
    console.log("init game");
    
    // global, init snap.
    yp.snap = Snap("#svg");
    
    
    this.sm = new yp.StateMachine("loading-game");
    this.setupStateM();    
    this.levelMgr = new yp.LevelMgr();
};

yp.Game.prototype.setupStateM = function() {
    // The game start.  check to see if there is saved state in local
    // storage GAME STATES intro, level selection, level starting,
    // level playing, level stopping, 
    //
    this.sm.declareStates([
        "loading-game",
        "intro",
        "level-selection",
        "level-starting",
        "level-playing",
        "level-stopping",
    ]);
};


