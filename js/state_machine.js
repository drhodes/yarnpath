// -------------------------------------------------------
// it's a state machine

yp.StateMachine = function(startState) {
    this.curState = startState;
    this.states = [startState];
    this.trans = [];
    this.callbacks = [];
};


yp.StateMachine.prototype.hasTrigger = function(trigger) {
    return this.trans[trigger] !== undefined;
};

// states :: [string]
yp.StateMachine.prototype.declareStates = function(states) {
    this.states = states;
};

yp.StateMachine.prototype.assertStateExists = function(state) {
    if (this.states.indexOf(state) == -1) {
        throw Error("State doesn't exist: " + state);
    }
    return true;
};

// :: [(Trigger, State, State)] -> void
yp.StateMachine.prototype.addTrans = function(transitions) {
    var that = this;
    transitions.forEach(function(t) {
        that.addTran(t[0], t[1], t[2]);
    });
}

yp.StateMachine.prototype.addTran = function(trigger, fromState, toState) {
    this.assertStateExists(fromState); 
    this.assertStateExists(toState);

    // if a trigger doesn't exists
    if (!this.hasTrigger(trigger)) {
        this.trans[trigger] = {};
    }

    // check if trigger contains a fromStates already
    // if so then a transition is being clobbered.
    if (this.trans[trigger][fromState] !== undefined) {
        throw Error(["can't redefine state transition",
                     {trigger : trigger,
                      fromState: fromState,
                      toState: toState }]);
    } else {
        this.trans[trigger][fromState] = toState;
    }
};

yp.StateMachine.prototype.Fire = function(trigger) {
    if (this.hasTrigger(trigger)) {
        var next = this.trans[trigger][this.curState];
        this.assertStateExists(next);
        this.curState = next;
    } else {
        throw Error("Trigger doesn't exist: " + trigger);
    }
};

