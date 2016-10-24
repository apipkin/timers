var Beep = require('beepbeep');
var args = require('yargs').argv;

var timers = [];
var rounds = 3;
var setDelay = 3;


if (Array.isArray(args._) && args._.length) {
    timers = args._.filter(x => (typeof x === 'number'));
}

if (args.rounds && typeof args.rounds === 'number') {
    rounds = args.rounds;
}

if (args.delay && typeof args.delay === 'number') {
    setDelay = args.delay;
}

if (args._.length === 0) {
    timers = [45, 30, 15];
    makeTimers();
}


function makeTimers () {
    var _timers = [];

    var i = 0;
    var len = timers.length;

    for (var i = 0; i < len; i++) {
        for (var j = 0; j < rounds; j++) {
            _timers.push(timers[i]);
        }
    }

    timers = _timers;
}



var runTimer = () => {
    console.log('runTimer', timers[0]);

    setTimeout(() => {
        Beep();
        console.log('beep');
        nextTimer();
    }, timers.shift() * 1000);
};

var nextTimer = () => {
    Beep();
    setTimeout(() => { 
        if (timers.length) {
            runTimer();
        }
    }, setDelay * 1000);
};


runTimer();