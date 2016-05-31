


yp.Loc = function Loc(x, y) {
    if (typeof(x) != "number") {
        throw Error("got bad value for new Loc.x: " + typeof(x));
    }
    if (typeof(y) != "number") {
        throw Error("got bad value for new Loc.y: " + typeof(y));
    }
    this.x = x;
    this.y = y;
};

yp.Loc.prototype.Equal = function(loc) {
    return (this.x == loc.x) && (this.y == loc.y);
};
