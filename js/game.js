

yp.Game = function() {
    this.gameStateM = nil;
    this.setupStateM();
};

yp.Game.prototype.setupStateM = function() {
    this.stateMach = new yp.StateMachine("loading-game");

    // The game start.  check to see if there is saved state in local
    // storage GAME STATES intro, level selection, level starting,
    // level playing, level stopping, 
    //
    this.stateMach.declareStates([
        "loading-game",
        "intro",
        "level-selection",
        "level-starting",
        "level-playing",
        "level-stopping",
    ]);
};
