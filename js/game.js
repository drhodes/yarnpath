
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
};

yp.Game.prototype.run = function() {
    // machine on .. beep boop.
    // YARN PATH VERSION 1.00 all splines reticulated.
    // beep boop boop beep.
    // initing state machines.
    // loading media.
    // checking local storage for progress.
    
};

yp.Game.prototype.loadGame = function() {
    // The game start. Check to see if there is saved state in local
    // storage
};
