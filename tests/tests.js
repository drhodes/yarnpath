
QUnit.test( "hello test", function( assert ) {
    assert.ok( 1 == "1", "Passed!" );
});

QUnit.test( "out of bounds test 1", function( assert ) {
    var brd = new yp.Board(3,10);
    var loc = new yp.Loc(0, 0);
    assert.ok( brd.GetBlock(loc) == 0  );
});

QUnit.test( "out of bounds test 2", function( assert ) {
    var brd = new yp.Board(3,10);
    var loc = new yp.Loc(2, 9);
    assert.ok( brd.GetBlock(loc) == 0  );
});


// -------------------------------------------------------
QUnit.test( "state machine 1", function( assert ) {
    var sm = new yp.StateMachine("asdf");
    sm.declareStates([
        "asdf"
    ]);
    assert.ok( sm.assertStateExists("asdf") == true);
});


QUnit.test( "state machine 2", function( assert ) {
    var sm = new yp.StateMachine("start");
    sm.declareStates([
        "start",
        "middle",
        "end",
        "zxcv"
    ]);

    sm.addTran("go", "start", "middle");
    sm.addTran("go", "middle", "end");
    sm.addTran("go", "end", "end");    
    assert.ok( sm.hasTrigger("go") == true);
});

QUnit.test( "state machine 3", function( assert ) {
    var sm = new yp.StateMachine("start");
    sm.declareStates([
        "start",
        "middle",
        "end",
        "zxcv"
    ]);
    sm.addTran("go", "start", "middle");
    sm.addTran("go", "middle", "end");
    sm.addTran("go", "end", "end");    
    sm.Fire("go");
    assert.ok( sm.curState == "middle");
});


QUnit.test( "state machine 4", function( assert ) {
    var sm = new yp.StateMachine("start");
    sm.declareStates([
        "start",
        "middle",
        "end",
        "zxcv"
    ]);
    sm.addTran("go", "start", "middle");
    sm.addTran("go", "middle", "end");
    sm.addTran("go", "end", "end");    
    sm.Fire("go"); sm.Fire("go"); sm.Fire("go"); sm.Fire("go"); sm.Fire("go");
    assert.ok( sm.curState == "end");
});


QUnit.test( "state machine 5", function( assert ) {
    var sm = new yp.StateMachine("start");
    sm.declareStates([
        "start",
        "middle",
        "end",
        "zxcv"
    ]);
    sm.addTrans([
        ["go", "start", "middle"],
        ["go", "middle", "end"],
        ["go", "end", "end"]
    ]);
    sm.Fire("go"); sm.Fire("go"); sm.Fire("go"); sm.Fire("go"); sm.Fire("go");
    assert.ok( sm.curState == "end");
});


