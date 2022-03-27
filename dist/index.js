require("net");
var $e6uBX$tls = require("tls");
var $e6uBX$http = require("http");
var $e6uBX$https = require("https");
var $e6uBX$events = require("events");
require("assert");
var $e6uBX$util = require("util");
var $e6uBX$os = require("os");
var $e6uBX$path = require("path");
var $e6uBX$fs = require("fs");

function $parcel$export(e, n, v, s) {
  Object.defineProperty(e, n, {get: v, set: s, enumerable: true, configurable: true});
}
var $parcel$global =
typeof globalThis !== 'undefined'
  ? globalThis
  : typeof self !== 'undefined'
  ? self
  : typeof window !== 'undefined'
  ? window
  : typeof global !== 'undefined'
  ? global
  : {};
var $parcel$modules = {};
var $parcel$inits = {};

var parcelRequire = $parcel$global["parcelRequire8f28"];
if (parcelRequire == null) {
  parcelRequire = function(id) {
    if (id in $parcel$modules) {
      return $parcel$modules[id].exports;
    }
    if (id in $parcel$inits) {
      var init = $parcel$inits[id];
      delete $parcel$inits[id];
      var module = {id: id, exports: {}};
      $parcel$modules[id] = module;
      init.call(module.exports, module, module.exports);
      return module.exports;
    }
    var err = new Error("Cannot find module '" + id + "'");
    err.code = 'MODULE_NOT_FOUND';
    throw err;
  };

  parcelRequire.register = function register(id, init) {
    $parcel$inits[id] = init;
  };

  $parcel$global["parcelRequire8f28"] = parcelRequire;
}
parcelRequire.register("fGJcE", function(module, exports) {

module.exports = (parcelRequire("d4Nvu"));

});
parcelRequire.register("d4Nvu", function(module, exports) {

$parcel$export(module.exports, "httpOverHttp", () => $98520d1c494a250f$export$25cbd437c61a3835, (v) => $98520d1c494a250f$export$25cbd437c61a3835 = v);
$parcel$export(module.exports, "httpsOverHttp", () => $98520d1c494a250f$export$c06e3df7111bae43, (v) => $98520d1c494a250f$export$c06e3df7111bae43 = v);
$parcel$export(module.exports, "httpOverHttps", () => $98520d1c494a250f$export$5d50e36ef656139f, (v) => $98520d1c494a250f$export$5d50e36ef656139f = v);
$parcel$export(module.exports, "httpsOverHttps", () => $98520d1c494a250f$export$212d6605025321cc, (v) => $98520d1c494a250f$export$212d6605025321cc = v);
$parcel$export(module.exports, "debug", () => $98520d1c494a250f$export$1c9f709888824e05, (v) => $98520d1c494a250f$export$1c9f709888824e05 = v);
var $98520d1c494a250f$export$25cbd437c61a3835;
var $98520d1c494a250f$export$c06e3df7111bae43;
var $98520d1c494a250f$export$5d50e36ef656139f;
var $98520d1c494a250f$export$212d6605025321cc;
var $98520d1c494a250f$export$1c9f709888824e05;
'use strict';







$98520d1c494a250f$export$25cbd437c61a3835 = $98520d1c494a250f$var$httpOverHttp;
$98520d1c494a250f$export$c06e3df7111bae43 = $98520d1c494a250f$var$httpsOverHttp;
$98520d1c494a250f$export$5d50e36ef656139f = $98520d1c494a250f$var$httpOverHttps;
$98520d1c494a250f$export$212d6605025321cc = $98520d1c494a250f$var$httpsOverHttps;
function $98520d1c494a250f$var$httpOverHttp(options) {
    var agent = new $98520d1c494a250f$var$TunnelingAgent(options);
    agent.request = $e6uBX$http.request;
    return agent;
}
function $98520d1c494a250f$var$httpsOverHttp(options) {
    var agent = new $98520d1c494a250f$var$TunnelingAgent(options);
    agent.request = $e6uBX$http.request;
    agent.createSocket = $98520d1c494a250f$var$createSecureSocket;
    agent.defaultPort = 443;
    return agent;
}
function $98520d1c494a250f$var$httpOverHttps(options) {
    var agent = new $98520d1c494a250f$var$TunnelingAgent(options);
    agent.request = $e6uBX$https.request;
    return agent;
}
function $98520d1c494a250f$var$httpsOverHttps(options) {
    var agent = new $98520d1c494a250f$var$TunnelingAgent(options);
    agent.request = $e6uBX$https.request;
    agent.createSocket = $98520d1c494a250f$var$createSecureSocket;
    agent.defaultPort = 443;
    return agent;
}
function $98520d1c494a250f$var$TunnelingAgent(options1) {
    var self = this;
    self.options = options1 || {};
    self.proxyOptions = self.options.proxy || {};
    self.maxSockets = self.options.maxSockets || $e6uBX$http.Agent.defaultMaxSockets;
    self.requests = [];
    self.sockets = [];
    self.on('free', function onFree(socket, host, port, localAddress) {
        var options = $98520d1c494a250f$var$toOptions(host, port, localAddress);
        for(var i = 0, len = self.requests.length; i < len; ++i){
            var pending = self.requests[i];
            if (pending.host === options.host && pending.port === options.port) {
                // Detect the request to connect same origin server,
                // reuse the connection.
                self.requests.splice(i, 1);
                pending.request.onSocket(socket);
                return;
            }
        }
        socket.destroy();
        self.removeSocket(socket);
    });
}
$e6uBX$util.inherits($98520d1c494a250f$var$TunnelingAgent, $e6uBX$events.EventEmitter);
$98520d1c494a250f$var$TunnelingAgent.prototype.addRequest = function addRequest(req, host, port, localAddress) {
    var self = this;
    var options = $98520d1c494a250f$var$mergeOptions({
        request: req
    }, self.options, $98520d1c494a250f$var$toOptions(host, port, localAddress));
    if (self.sockets.length >= this.maxSockets) {
        // We are over limit so we'll add it to the queue.
        self.requests.push(options);
        return;
    }
    // If we are under maxSockets create a new one.
    self.createSocket(options, function(socket) {
        socket.on('free', onFree);
        socket.on('close', onCloseOrRemove);
        socket.on('agentRemove', onCloseOrRemove);
        req.onSocket(socket);
        function onFree() {
            self.emit('free', socket, options);
        }
        function onCloseOrRemove(err) {
            self.removeSocket(socket);
            socket.removeListener('free', onFree);
            socket.removeListener('close', onCloseOrRemove);
            socket.removeListener('agentRemove', onCloseOrRemove);
        }
    });
};
$98520d1c494a250f$var$TunnelingAgent.prototype.createSocket = function createSocket(options, cb) {
    var self = this;
    var placeholder = {};
    self.sockets.push(placeholder);
    var connectOptions = $98520d1c494a250f$var$mergeOptions({}, self.proxyOptions, {
        method: 'CONNECT',
        path: options.host + ':' + options.port,
        agent: false,
        headers: {
            host: options.host + ':' + options.port
        }
    });
    if (options.localAddress) connectOptions.localAddress = options.localAddress;
    if (connectOptions.proxyAuth) {
        connectOptions.headers = connectOptions.headers || {};
        connectOptions.headers['Proxy-Authorization'] = 'Basic ' + new Buffer(connectOptions.proxyAuth).toString('base64');
    }
    $98520d1c494a250f$var$debug('making CONNECT request');
    var connectReq = self.request(connectOptions);
    connectReq.useChunkedEncodingByDefault = false; // for v0.6
    connectReq.once('response', onResponse); // for v0.6
    connectReq.once('upgrade', onUpgrade); // for v0.6
    connectReq.once('connect', onConnect); // for v0.7 or later
    connectReq.once('error', onError);
    connectReq.end();
    function onResponse(res) {
        // Very hacky. This is necessary to avoid http-parser leaks.
        res.upgrade = true;
    }
    function onUpgrade(res, socket, head) {
        // Hacky.
        process.nextTick(function() {
            onConnect(res, socket, head);
        });
    }
    function onConnect(res, socket, head) {
        connectReq.removeAllListeners();
        socket.removeAllListeners();
        if (res.statusCode !== 200) {
            $98520d1c494a250f$var$debug('tunneling socket could not be established, statusCode=%d', res.statusCode);
            socket.destroy();
            var error = new Error("tunneling socket could not be established, statusCode=" + res.statusCode);
            error.code = 'ECONNRESET';
            options.request.emit('error', error);
            self.removeSocket(placeholder);
            return;
        }
        if (head.length > 0) {
            $98520d1c494a250f$var$debug('got illegal response body from proxy');
            socket.destroy();
            var error = new Error('got illegal response body from proxy');
            error.code = 'ECONNRESET';
            options.request.emit('error', error);
            self.removeSocket(placeholder);
            return;
        }
        $98520d1c494a250f$var$debug('tunneling connection has established');
        self.sockets[self.sockets.indexOf(placeholder)] = socket;
        return cb(socket);
    }
    function onError(cause) {
        connectReq.removeAllListeners();
        $98520d1c494a250f$var$debug('tunneling socket could not be established, cause=%s\n', cause.message, cause.stack);
        var error = new Error("tunneling socket could not be established, cause=" + cause.message);
        error.code = 'ECONNRESET';
        options.request.emit('error', error);
        self.removeSocket(placeholder);
    }
};
$98520d1c494a250f$var$TunnelingAgent.prototype.removeSocket = function removeSocket(socket1) {
    var pos = this.sockets.indexOf(socket1);
    if (pos === -1) return;
    this.sockets.splice(pos, 1);
    var pending = this.requests.shift();
    if (pending) // If we have pending requests and a socket gets closed a new one
    // needs to be created to take over in the pool for the one that closed.
    this.createSocket(pending, function(socket) {
        pending.request.onSocket(socket);
    });
};
function $98520d1c494a250f$var$createSecureSocket(options, cb) {
    var self = this;
    $98520d1c494a250f$var$TunnelingAgent.prototype.createSocket.call(self, options, function(socket) {
        var hostHeader = options.request.getHeader('host');
        var tlsOptions = $98520d1c494a250f$var$mergeOptions({}, self.options, {
            socket: socket,
            servername: hostHeader ? hostHeader.replace(/:.*$/, '') : options.host
        });
        // 0 is dummy port for v0.6
        var secureSocket = $e6uBX$tls.connect(0, tlsOptions);
        self.sockets[self.sockets.indexOf(socket)] = secureSocket;
        cb(secureSocket);
    });
}
function $98520d1c494a250f$var$toOptions(host, port, localAddress) {
    if (typeof host === 'string') return {
        host: host,
        port: port,
        localAddress: localAddress
    };
    return host; // for v0.11 or later
}
function $98520d1c494a250f$var$mergeOptions(target) {
    for(var i = 1, len = arguments.length; i < len; ++i){
        var overrides = arguments[i];
        if (typeof overrides === 'object') {
            var keys = Object.keys(overrides);
            for(var j = 0, keyLen = keys.length; j < keyLen; ++j){
                var k = keys[j];
                if (overrides[k] !== undefined) target[k] = overrides[k];
            }
        }
    }
    return target;
}
var $98520d1c494a250f$var$debug;
if (process.env.NODE_DEBUG && /\btunnel\b/.test(process.env.NODE_DEBUG)) $98520d1c494a250f$var$debug = function() {
    var args = Array.prototype.slice.call(arguments);
    if (typeof args[0] === 'string') args[0] = 'TUNNEL: ' + args[0];
    else args.unshift('TUNNEL:');
    console.error.apply(console, args);
};
else $98520d1c494a250f$var$debug = function() {};
$98520d1c494a250f$export$1c9f709888824e05 = $98520d1c494a250f$var$debug; // for test

});


parcelRequire.register("48aqD", function(module, exports) {
/*
The MIT License (MIT)

Copyright (c) Sindre Sorhus <sindresorhus@gmail.com> (sindresorhus.com)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

*/ var $301fffb07a290251$var$styles = {};
module.exports = $301fffb07a290251$var$styles;
var $301fffb07a290251$var$codes = {
    reset: [
        0,
        0
    ],
    bold: [
        1,
        22
    ],
    dim: [
        2,
        22
    ],
    italic: [
        3,
        23
    ],
    underline: [
        4,
        24
    ],
    inverse: [
        7,
        27
    ],
    hidden: [
        8,
        28
    ],
    strikethrough: [
        9,
        29
    ],
    black: [
        30,
        39
    ],
    red: [
        31,
        39
    ],
    green: [
        32,
        39
    ],
    yellow: [
        33,
        39
    ],
    blue: [
        34,
        39
    ],
    magenta: [
        35,
        39
    ],
    cyan: [
        36,
        39
    ],
    white: [
        37,
        39
    ],
    gray: [
        90,
        39
    ],
    grey: [
        90,
        39
    ],
    brightRed: [
        91,
        39
    ],
    brightGreen: [
        92,
        39
    ],
    brightYellow: [
        93,
        39
    ],
    brightBlue: [
        94,
        39
    ],
    brightMagenta: [
        95,
        39
    ],
    brightCyan: [
        96,
        39
    ],
    brightWhite: [
        97,
        39
    ],
    bgBlack: [
        40,
        49
    ],
    bgRed: [
        41,
        49
    ],
    bgGreen: [
        42,
        49
    ],
    bgYellow: [
        43,
        49
    ],
    bgBlue: [
        44,
        49
    ],
    bgMagenta: [
        45,
        49
    ],
    bgCyan: [
        46,
        49
    ],
    bgWhite: [
        47,
        49
    ],
    bgGray: [
        100,
        49
    ],
    bgGrey: [
        100,
        49
    ],
    bgBrightRed: [
        101,
        49
    ],
    bgBrightGreen: [
        102,
        49
    ],
    bgBrightYellow: [
        103,
        49
    ],
    bgBrightBlue: [
        104,
        49
    ],
    bgBrightMagenta: [
        105,
        49
    ],
    bgBrightCyan: [
        106,
        49
    ],
    bgBrightWhite: [
        107,
        49
    ],
    // legacy styles for colors pre v1.0.0
    blackBG: [
        40,
        49
    ],
    redBG: [
        41,
        49
    ],
    greenBG: [
        42,
        49
    ],
    yellowBG: [
        43,
        49
    ],
    blueBG: [
        44,
        49
    ],
    magentaBG: [
        45,
        49
    ],
    cyanBG: [
        46,
        49
    ],
    whiteBG: [
        47,
        49
    ]
};
Object.keys($301fffb07a290251$var$codes).forEach(function(key) {
    var val = $301fffb07a290251$var$codes[key];
    var style = $301fffb07a290251$var$styles[key] = [];
    style.open = '\u001b[' + val[0] + 'm';
    style.close = '\u001b[' + val[1] + 'm';
});

});

parcelRequire.register("35O5W", function(module, exports) {
/*
The MIT License (MIT)

Copyright (c) Sindre Sorhus <sindresorhus@gmail.com> (sindresorhus.com)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

*/ 'use strict';


var $gRdw0 = parcelRequire("gRdw0");
var $2408b288641f8244$var$env = process.env;
var $2408b288641f8244$var$forceColor = void 0;
if ($gRdw0('no-color') || $gRdw0('no-colors') || $gRdw0('color=false')) $2408b288641f8244$var$forceColor = false;
else if ($gRdw0('color') || $gRdw0('colors') || $gRdw0('color=true') || $gRdw0('color=always')) $2408b288641f8244$var$forceColor = true;
if ('FORCE_COLOR' in $2408b288641f8244$var$env) $2408b288641f8244$var$forceColor = $2408b288641f8244$var$env.FORCE_COLOR.length === 0 || parseInt($2408b288641f8244$var$env.FORCE_COLOR, 10) !== 0;
function $2408b288641f8244$var$translateLevel(level) {
    if (level === 0) return false;
    return {
        level: level,
        hasBasic: true,
        has256: level >= 2,
        has16m: level >= 3
    };
}
function $2408b288641f8244$var$supportsColor(stream) {
    if ($2408b288641f8244$var$forceColor === false) return 0;
    if ($gRdw0('color=16m') || $gRdw0('color=full') || $gRdw0('color=truecolor')) return 3;
    if ($gRdw0('color=256')) return 2;
    if (stream && !stream.isTTY && $2408b288641f8244$var$forceColor !== true) return 0;
    var min = $2408b288641f8244$var$forceColor ? 1 : 0;
    if (process.platform === 'win32') {
        // Node.js 7.5.0 is the first version of Node.js to include a patch to
        // libuv that enables 256 color output on Windows. Anything earlier and it
        // won't work. However, here we target Node.js 8 at minimum as it is an LTS
        // release, and Node.js 7 is not. Windows 10 build 10586 is the first
        // Windows release that supports 256 colors. Windows 10 build 14931 is the
        // first release that supports 16m/TrueColor.
        var osRelease = $e6uBX$os.release().split('.');
        if (Number(process.versions.node.split('.')[0]) >= 8 && Number(osRelease[0]) >= 10 && Number(osRelease[2]) >= 10586) return Number(osRelease[2]) >= 14931 ? 3 : 2;
        return 1;
    }
    if ('CI' in $2408b288641f8244$var$env) {
        if ([
            'TRAVIS',
            'CIRCLECI',
            'APPVEYOR',
            'GITLAB_CI'
        ].some(function(sign) {
            return sign in $2408b288641f8244$var$env;
        }) || $2408b288641f8244$var$env.CI_NAME === 'codeship') return 1;
        return min;
    }
    if ('TEAMCITY_VERSION' in $2408b288641f8244$var$env) return /^(9\.(0*[1-9]\d*)\.|\d{2,}\.)/.test($2408b288641f8244$var$env.TEAMCITY_VERSION) ? 1 : 0;
    if ('TERM_PROGRAM' in $2408b288641f8244$var$env) {
        var version = parseInt(($2408b288641f8244$var$env.TERM_PROGRAM_VERSION || '').split('.')[0], 10);
        switch($2408b288641f8244$var$env.TERM_PROGRAM){
            case 'iTerm.app':
                return version >= 3 ? 3 : 2;
            case 'Hyper':
                return 3;
            case 'Apple_Terminal':
                return 2;
        }
    }
    if (/-256(color)?$/i.test($2408b288641f8244$var$env.TERM)) return 2;
    if (/^screen|^xterm|^vt100|^rxvt|color|ansi|cygwin|linux/i.test($2408b288641f8244$var$env.TERM)) return 1;
    if ('COLORTERM' in $2408b288641f8244$var$env) return 1;
    if ($2408b288641f8244$var$env.TERM === 'dumb') return min;
    return min;
}
function $2408b288641f8244$var$getSupportLevel(stream) {
    var level = $2408b288641f8244$var$supportsColor(stream);
    return $2408b288641f8244$var$translateLevel(level);
}
module.exports = {
    supportsColor: $2408b288641f8244$var$getSupportLevel,
    stdout: $2408b288641f8244$var$getSupportLevel(process.stdout),
    stderr: $2408b288641f8244$var$getSupportLevel(process.stderr)
};

});
parcelRequire.register("gRdw0", function(module, exports) {
/*
MIT License

Copyright (c) Sindre Sorhus <sindresorhus@gmail.com> (sindresorhus.com)

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies
of the Software, and to permit persons to whom the Software is furnished to do
so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/ 'use strict';
module.exports = function(flag, argv) {
    argv = argv || process.argv;
    var terminatorPos = argv.indexOf('--');
    var prefix = /^-{1,2}/.test(flag) ? '' : '--';
    var pos = argv.indexOf(prefix + flag);
    return pos !== -1 && (terminatorPos === -1 ? true : pos < terminatorPos);
};

});


parcelRequire.register("b7sUK", function(module, exports) {
module.exports = function runTheTrap(text, options) {
    var result = '';
    text = text || 'Run the trap, drop the bass';
    text = text.split('');
    var trap = {
        a: [
            '\u0040',
            '\u0104',
            '\u023a',
            '\u0245',
            '\u0394',
            '\u039b',
            '\u0414'
        ],
        b: [
            '\u00df',
            '\u0181',
            '\u0243',
            '\u026e',
            '\u03b2',
            '\u0e3f'
        ],
        c: [
            '\u00a9',
            '\u023b',
            '\u03fe'
        ],
        d: [
            '\u00d0',
            '\u018a',
            '\u0500',
            '\u0501',
            '\u0502',
            '\u0503'
        ],
        e: [
            '\u00cb',
            '\u0115',
            '\u018e',
            '\u0258',
            '\u03a3',
            '\u03be',
            '\u04bc',
            '\u0a6c'
        ],
        f: [
            '\u04fa'
        ],
        g: [
            '\u0262'
        ],
        h: [
            '\u0126',
            '\u0195',
            '\u04a2',
            '\u04ba',
            '\u04c7',
            '\u050a'
        ],
        i: [
            '\u0f0f'
        ],
        j: [
            '\u0134'
        ],
        k: [
            '\u0138',
            '\u04a0',
            '\u04c3',
            '\u051e'
        ],
        l: [
            '\u0139'
        ],
        m: [
            '\u028d',
            '\u04cd',
            '\u04ce',
            '\u0520',
            '\u0521',
            '\u0d69'
        ],
        n: [
            '\u00d1',
            '\u014b',
            '\u019d',
            '\u0376',
            '\u03a0',
            '\u048a'
        ],
        o: [
            '\u00d8',
            '\u00f5',
            '\u00f8',
            '\u01fe',
            '\u0298',
            '\u047a',
            '\u05dd',
            '\u06dd',
            '\u0e4f'
        ],
        p: [
            '\u01f7',
            '\u048e'
        ],
        q: [
            '\u09cd'
        ],
        r: [
            '\u00ae',
            '\u01a6',
            '\u0210',
            '\u024c',
            '\u0280',
            '\u042f'
        ],
        s: [
            '\u00a7',
            '\u03de',
            '\u03df',
            '\u03e8'
        ],
        t: [
            '\u0141',
            '\u0166',
            '\u0373'
        ],
        u: [
            '\u01b1',
            '\u054d'
        ],
        v: [
            '\u05d8'
        ],
        w: [
            '\u0428',
            '\u0460',
            '\u047c',
            '\u0d70'
        ],
        x: [
            '\u04b2',
            '\u04fe',
            '\u04fc',
            '\u04fd'
        ],
        y: [
            '\u00a5',
            '\u04b0',
            '\u04cb'
        ],
        z: [
            '\u01b5',
            '\u0240'
        ]
    };
    text.forEach(function(c) {
        c = c.toLowerCase();
        var chars = trap[c] || [
            ' '
        ];
        var rand = Math.floor(Math.random() * chars.length);
        if (typeof trap[c] !== 'undefined') result += trap[c][rand];
        else result += c;
    });
    return result;
};

});

parcelRequire.register("iOrog", function(module, exports) {
// please no
module.exports = function zalgo(text1, options1) {
    text1 = text1 || '   he is here   ';
    var soul = {
        'up': [
            '̍',
            '̎',
            '̄',
            '̅',
            '̿',
            '̑',
            '̆',
            '̐',
            '͒',
            '͗',
            '͑',
            '̇',
            '̈',
            '̊',
            '͂',
            '̓',
            '̈',
            '͊',
            '͋',
            '͌',
            '̃',
            '̂',
            '̌',
            '͐',
            '̀',
            '́',
            '̋',
            '̏',
            '̒',
            '̓',
            '̔',
            '̽',
            '̉',
            'ͣ',
            'ͤ',
            'ͥ',
            'ͦ',
            'ͧ',
            'ͨ',
            'ͩ',
            'ͪ',
            'ͫ',
            'ͬ',
            'ͭ',
            'ͮ',
            'ͯ',
            '̾',
            '͛',
            '͆',
            '̚', 
        ],
        'down': [
            '̖',
            '̗',
            '̘',
            '̙',
            '̜',
            '̝',
            '̞',
            '̟',
            '̠',
            '̤',
            '̥',
            '̦',
            '̩',
            '̪',
            '̫',
            '̬',
            '̭',
            '̮',
            '̯',
            '̰',
            '̱',
            '̲',
            '̳',
            '̹',
            '̺',
            '̻',
            '̼',
            'ͅ',
            '͇',
            '͈',
            '͉',
            '͍',
            '͎',
            '͓',
            '͔',
            '͕',
            '͖',
            '͙',
            '͚',
            '̣', 
        ],
        'mid': [
            '̕',
            '̛',
            '̀',
            '́',
            '͘',
            '̡',
            '̢',
            '̧',
            '̨',
            '̴',
            '̵',
            '̶',
            '͜',
            '͝',
            '͞',
            '͟',
            '͠',
            '͢',
            '̸',
            '̷',
            '͡',
            ' ҉', 
        ]
    };
    var all = [].concat(soul.up, soul.down, soul.mid);
    function randomNumber(range) {
        var r = Math.floor(Math.random() * range);
        return r;
    }
    function isChar(character) {
        var bool = false;
        all.filter(function(i) {
            bool = i === character;
        });
        return bool;
    }
    function heComes(text, options) {
        var result = '';
        var counts;
        var l;
        options = options || {};
        options['up'] = typeof options['up'] !== 'undefined' ? options['up'] : true;
        options['mid'] = typeof options['mid'] !== 'undefined' ? options['mid'] : true;
        options['down'] = typeof options['down'] !== 'undefined' ? options['down'] : true;
        options['size'] = typeof options['size'] !== 'undefined' ? options['size'] : 'maxi';
        text = text.split('');
        for(l in text){
            if (isChar(l)) continue;
            result = result + text[l];
            counts = {
                'up': 0,
                'down': 0,
                'mid': 0
            };
            switch(options.size){
                case 'mini':
                    counts.up = randomNumber(8);
                    counts.mid = randomNumber(2);
                    counts.down = randomNumber(8);
                    break;
                case 'maxi':
                    counts.up = randomNumber(16) + 3;
                    counts.mid = randomNumber(4) + 1;
                    counts.down = randomNumber(64) + 3;
                    break;
                default:
                    counts.up = randomNumber(8) + 1;
                    counts.mid = randomNumber(6) / 2;
                    counts.down = randomNumber(8) + 1;
                    break;
            }
            var arr = [
                'up',
                'mid',
                'down'
            ];
            for(var d in arr){
                var index = arr[d];
                for(var i = 0; i <= counts[index]; i++)if (options[index]) result = result + soul[index][randomNumber(soul[index].length)];
            }
        }
        return result;
    }
    // don't summon him
    return heComes(text1, options1);
};

});

parcelRequire.register("cQcx2", function(module, exports) {
module.exports = function(colors) {
    return function(letter, i, exploded) {
        if (letter === ' ') return letter;
        switch(i % 3){
            case 0:
                return colors.red(letter);
            case 1:
                return colors.white(letter);
            case 2:
                return colors.blue(letter);
        }
    };
};

});

parcelRequire.register("bxgLd", function(module, exports) {
module.exports = function(colors) {
    return function(letter, i, exploded) {
        return i % 2 === 0 ? letter : colors.inverse(letter);
    };
};

});

parcelRequire.register("1a5m0", function(module, exports) {
module.exports = function(colors) {
    // RoY G BiV
    var rainbowColors = [
        'red',
        'yellow',
        'green',
        'blue',
        'magenta'
    ];
    return function(letter, i, exploded) {
        if (letter === ' ') return letter;
        else return colors[rainbowColors[(i++) % rainbowColors.length]](letter);
    };
};

});

parcelRequire.register("lDR15", function(module, exports) {
module.exports = function(colors) {
    var available = [
        'underline',
        'inverse',
        'grey',
        'yellow',
        'red',
        'green',
        'blue',
        'white',
        'cyan',
        'magenta',
        'brightYellow',
        'brightRed',
        'brightGreen',
        'brightBlue',
        'brightWhite',
        'brightCyan',
        'brightMagenta'
    ];
    return function(letter, i, exploded) {
        return letter === ' ' ? letter : colors[available[Math.round(Math.random() * (available.length - 2))]](letter);
    };
};

});

parcelRequire.register("9eP0T", function(module, exports) {
module.exports = JSON.parse("[\"0BSD\",\"AAL\",\"ADSL\",\"AFL-1.1\",\"AFL-1.2\",\"AFL-2.0\",\"AFL-2.1\",\"AFL-3.0\",\"AGPL-1.0-only\",\"AGPL-1.0-or-later\",\"AGPL-3.0-only\",\"AGPL-3.0-or-later\",\"AMDPLPA\",\"AML\",\"AMPAS\",\"ANTLR-PD\",\"ANTLR-PD-fallback\",\"APAFML\",\"APL-1.0\",\"APSL-1.0\",\"APSL-1.1\",\"APSL-1.2\",\"APSL-2.0\",\"Abstyles\",\"Adobe-2006\",\"Adobe-Glyph\",\"Afmparse\",\"Aladdin\",\"Apache-1.0\",\"Apache-1.1\",\"Apache-2.0\",\"Artistic-1.0\",\"Artistic-1.0-Perl\",\"Artistic-1.0-cl8\",\"Artistic-2.0\",\"BSD-1-Clause\",\"BSD-2-Clause\",\"BSD-2-Clause-Patent\",\"BSD-2-Clause-Views\",\"BSD-3-Clause\",\"BSD-3-Clause-Attribution\",\"BSD-3-Clause-Clear\",\"BSD-3-Clause-LBNL\",\"BSD-3-Clause-Modification\",\"BSD-3-Clause-No-Military-License\",\"BSD-3-Clause-No-Nuclear-License\",\"BSD-3-Clause-No-Nuclear-License-2014\",\"BSD-3-Clause-No-Nuclear-Warranty\",\"BSD-3-Clause-Open-MPI\",\"BSD-4-Clause\",\"BSD-4-Clause-Shortened\",\"BSD-4-Clause-UC\",\"BSD-Protection\",\"BSD-Source-Code\",\"BSL-1.0\",\"BUSL-1.1\",\"Bahyph\",\"Barr\",\"Beerware\",\"BitTorrent-1.0\",\"BitTorrent-1.1\",\"BlueOak-1.0.0\",\"Borceux\",\"C-UDA-1.0\",\"CAL-1.0\",\"CAL-1.0-Combined-Work-Exception\",\"CATOSL-1.1\",\"CC-BY-1.0\",\"CC-BY-2.0\",\"CC-BY-2.5\",\"CC-BY-2.5-AU\",\"CC-BY-3.0\",\"CC-BY-3.0-AT\",\"CC-BY-3.0-DE\",\"CC-BY-3.0-NL\",\"CC-BY-3.0-US\",\"CC-BY-4.0\",\"CC-BY-NC-1.0\",\"CC-BY-NC-2.0\",\"CC-BY-NC-2.5\",\"CC-BY-NC-3.0\",\"CC-BY-NC-3.0-DE\",\"CC-BY-NC-4.0\",\"CC-BY-NC-ND-1.0\",\"CC-BY-NC-ND-2.0\",\"CC-BY-NC-ND-2.5\",\"CC-BY-NC-ND-3.0\",\"CC-BY-NC-ND-3.0-DE\",\"CC-BY-NC-ND-3.0-IGO\",\"CC-BY-NC-ND-4.0\",\"CC-BY-NC-SA-1.0\",\"CC-BY-NC-SA-2.0\",\"CC-BY-NC-SA-2.0-FR\",\"CC-BY-NC-SA-2.0-UK\",\"CC-BY-NC-SA-2.5\",\"CC-BY-NC-SA-3.0\",\"CC-BY-NC-SA-3.0-DE\",\"CC-BY-NC-SA-3.0-IGO\",\"CC-BY-NC-SA-4.0\",\"CC-BY-ND-1.0\",\"CC-BY-ND-2.0\",\"CC-BY-ND-2.5\",\"CC-BY-ND-3.0\",\"CC-BY-ND-3.0-DE\",\"CC-BY-ND-4.0\",\"CC-BY-SA-1.0\",\"CC-BY-SA-2.0\",\"CC-BY-SA-2.0-UK\",\"CC-BY-SA-2.1-JP\",\"CC-BY-SA-2.5\",\"CC-BY-SA-3.0\",\"CC-BY-SA-3.0-AT\",\"CC-BY-SA-3.0-DE\",\"CC-BY-SA-4.0\",\"CC-PDDC\",\"CC0-1.0\",\"CDDL-1.0\",\"CDDL-1.1\",\"CDL-1.0\",\"CDLA-Permissive-1.0\",\"CDLA-Permissive-2.0\",\"CDLA-Sharing-1.0\",\"CECILL-1.0\",\"CECILL-1.1\",\"CECILL-2.0\",\"CECILL-2.1\",\"CECILL-B\",\"CECILL-C\",\"CERN-OHL-1.1\",\"CERN-OHL-1.2\",\"CERN-OHL-P-2.0\",\"CERN-OHL-S-2.0\",\"CERN-OHL-W-2.0\",\"CNRI-Jython\",\"CNRI-Python\",\"CNRI-Python-GPL-Compatible\",\"COIL-1.0\",\"CPAL-1.0\",\"CPL-1.0\",\"CPOL-1.02\",\"CUA-OPL-1.0\",\"Caldera\",\"ClArtistic\",\"Community-Spec-1.0\",\"Condor-1.1\",\"Crossword\",\"CrystalStacker\",\"Cube\",\"D-FSL-1.0\",\"DOC\",\"DRL-1.0\",\"DSDP\",\"Dotseqn\",\"ECL-1.0\",\"ECL-2.0\",\"EFL-1.0\",\"EFL-2.0\",\"EPICS\",\"EPL-1.0\",\"EPL-2.0\",\"EUDatagrid\",\"EUPL-1.0\",\"EUPL-1.1\",\"EUPL-1.2\",\"Entessa\",\"ErlPL-1.1\",\"Eurosym\",\"FDK-AAC\",\"FSFAP\",\"FSFUL\",\"FSFULLR\",\"FTL\",\"Fair\",\"Frameworx-1.0\",\"FreeBSD-DOC\",\"FreeImage\",\"GD\",\"GFDL-1.1-invariants-only\",\"GFDL-1.1-invariants-or-later\",\"GFDL-1.1-no-invariants-only\",\"GFDL-1.1-no-invariants-or-later\",\"GFDL-1.1-only\",\"GFDL-1.1-or-later\",\"GFDL-1.2-invariants-only\",\"GFDL-1.2-invariants-or-later\",\"GFDL-1.2-no-invariants-only\",\"GFDL-1.2-no-invariants-or-later\",\"GFDL-1.2-only\",\"GFDL-1.2-or-later\",\"GFDL-1.3-invariants-only\",\"GFDL-1.3-invariants-or-later\",\"GFDL-1.3-no-invariants-only\",\"GFDL-1.3-no-invariants-or-later\",\"GFDL-1.3-only\",\"GFDL-1.3-or-later\",\"GL2PS\",\"GLWTPL\",\"GPL-1.0-only\",\"GPL-1.0-or-later\",\"GPL-2.0-only\",\"GPL-2.0-or-later\",\"GPL-3.0-only\",\"GPL-3.0-or-later\",\"Giftware\",\"Glide\",\"Glulxe\",\"HPND\",\"HPND-sell-variant\",\"HTMLTIDY\",\"HaskellReport\",\"Hippocratic-2.1\",\"IBM-pibs\",\"ICU\",\"IJG\",\"IPA\",\"IPL-1.0\",\"ISC\",\"ImageMagick\",\"Imlib2\",\"Info-ZIP\",\"Intel\",\"Intel-ACPI\",\"Interbase-1.0\",\"JPNIC\",\"JSON\",\"JasPer-2.0\",\"LAL-1.2\",\"LAL-1.3\",\"LGPL-2.0-only\",\"LGPL-2.0-or-later\",\"LGPL-2.1-only\",\"LGPL-2.1-or-later\",\"LGPL-3.0-only\",\"LGPL-3.0-or-later\",\"LGPLLR\",\"LPL-1.0\",\"LPL-1.02\",\"LPPL-1.0\",\"LPPL-1.1\",\"LPPL-1.2\",\"LPPL-1.3a\",\"LPPL-1.3c\",\"Latex2e\",\"Leptonica\",\"LiLiQ-P-1.1\",\"LiLiQ-R-1.1\",\"LiLiQ-Rplus-1.1\",\"Libpng\",\"Linux-OpenIB\",\"Linux-man-pages-copyleft\",\"MIT\",\"MIT-0\",\"MIT-CMU\",\"MIT-Modern-Variant\",\"MIT-advertising\",\"MIT-enna\",\"MIT-feh\",\"MIT-open-group\",\"MITNFA\",\"MPL-1.0\",\"MPL-1.1\",\"MPL-2.0\",\"MPL-2.0-no-copyleft-exception\",\"MS-PL\",\"MS-RL\",\"MTLL\",\"MakeIndex\",\"MirOS\",\"Motosoto\",\"MulanPSL-1.0\",\"MulanPSL-2.0\",\"Multics\",\"Mup\",\"NAIST-2003\",\"NASA-1.3\",\"NBPL-1.0\",\"NCGL-UK-2.0\",\"NCSA\",\"NGPL\",\"NIST-PD\",\"NIST-PD-fallback\",\"NLOD-1.0\",\"NLOD-2.0\",\"NLPL\",\"NOSL\",\"NPL-1.0\",\"NPL-1.1\",\"NPOSL-3.0\",\"NRL\",\"NTP\",\"NTP-0\",\"Naumen\",\"Net-SNMP\",\"NetCDF\",\"Newsletr\",\"Nokia\",\"Noweb\",\"O-UDA-1.0\",\"OCCT-PL\",\"OCLC-2.0\",\"ODC-By-1.0\",\"ODbL-1.0\",\"OFL-1.0\",\"OFL-1.0-RFN\",\"OFL-1.0-no-RFN\",\"OFL-1.1\",\"OFL-1.1-RFN\",\"OFL-1.1-no-RFN\",\"OGC-1.0\",\"OGDL-Taiwan-1.0\",\"OGL-Canada-2.0\",\"OGL-UK-1.0\",\"OGL-UK-2.0\",\"OGL-UK-3.0\",\"OGTSL\",\"OLDAP-1.1\",\"OLDAP-1.2\",\"OLDAP-1.3\",\"OLDAP-1.4\",\"OLDAP-2.0\",\"OLDAP-2.0.1\",\"OLDAP-2.1\",\"OLDAP-2.2\",\"OLDAP-2.2.1\",\"OLDAP-2.2.2\",\"OLDAP-2.3\",\"OLDAP-2.4\",\"OLDAP-2.5\",\"OLDAP-2.6\",\"OLDAP-2.7\",\"OLDAP-2.8\",\"OML\",\"OPL-1.0\",\"OPUBL-1.0\",\"OSET-PL-2.1\",\"OSL-1.0\",\"OSL-1.1\",\"OSL-2.0\",\"OSL-2.1\",\"OSL-3.0\",\"OpenSSL\",\"PDDL-1.0\",\"PHP-3.0\",\"PHP-3.01\",\"PSF-2.0\",\"Parity-6.0.0\",\"Parity-7.0.0\",\"Plexus\",\"PolyForm-Noncommercial-1.0.0\",\"PolyForm-Small-Business-1.0.0\",\"PostgreSQL\",\"Python-2.0\",\"QPL-1.0\",\"Qhull\",\"RHeCos-1.1\",\"RPL-1.1\",\"RPL-1.5\",\"RPSL-1.0\",\"RSA-MD\",\"RSCPL\",\"Rdisc\",\"Ruby\",\"SAX-PD\",\"SCEA\",\"SGI-B-1.0\",\"SGI-B-1.1\",\"SGI-B-2.0\",\"SHL-0.5\",\"SHL-0.51\",\"SISSL\",\"SISSL-1.2\",\"SMLNJ\",\"SMPPL\",\"SNIA\",\"SPL-1.0\",\"SSH-OpenSSH\",\"SSH-short\",\"SSPL-1.0\",\"SWL\",\"Saxpath\",\"Sendmail\",\"Sendmail-8.23\",\"SimPL-2.0\",\"Sleepycat\",\"Spencer-86\",\"Spencer-94\",\"Spencer-99\",\"SugarCRM-1.1.3\",\"TAPR-OHL-1.0\",\"TCL\",\"TCP-wrappers\",\"TMate\",\"TORQUE-1.1\",\"TOSL\",\"TU-Berlin-1.0\",\"TU-Berlin-2.0\",\"UCL-1.0\",\"UPL-1.0\",\"Unicode-DFS-2015\",\"Unicode-DFS-2016\",\"Unicode-TOU\",\"Unlicense\",\"VOSTROM\",\"VSL-1.0\",\"Vim\",\"W3C\",\"W3C-19980720\",\"W3C-20150513\",\"WTFPL\",\"Watcom-1.0\",\"Wsuipa\",\"X11\",\"XFree86-1.1\",\"XSkat\",\"Xerox\",\"Xnet\",\"YPL-1.0\",\"YPL-1.1\",\"ZPL-1.1\",\"ZPL-2.0\",\"ZPL-2.1\",\"Zed\",\"Zend-2.0\",\"Zimbra-1.3\",\"Zimbra-1.4\",\"Zlib\",\"blessing\",\"bzip2-1.0.5\",\"bzip2-1.0.6\",\"copyleft-next-0.3.0\",\"copyleft-next-0.3.1\",\"curl\",\"diffmark\",\"dvipdfm\",\"eGenix\",\"etalab-2.0\",\"gSOAP-1.3b\",\"gnuplot\",\"iMatix\",\"libpng-2.0\",\"libselinux-1.0\",\"libtiff\",\"mpich2\",\"psfrag\",\"psutils\",\"xinetd\",\"xpp\",\"zlib-acknowledgement\"]");

});

parcelRequire.register("8tSRU", function(module, exports) {
module.exports = JSON.parse("[\"AGPL-1.0\",\"AGPL-3.0\",\"BSD-2-Clause-FreeBSD\",\"BSD-2-Clause-NetBSD\",\"GFDL-1.1\",\"GFDL-1.2\",\"GFDL-1.3\",\"GPL-1.0\",\"GPL-2.0\",\"GPL-2.0-with-GCC-exception\",\"GPL-2.0-with-autoconf-exception\",\"GPL-2.0-with-bison-exception\",\"GPL-2.0-with-classpath-exception\",\"GPL-2.0-with-font-exception\",\"GPL-3.0\",\"GPL-3.0-with-GCC-exception\",\"GPL-3.0-with-autoconf-exception\",\"LGPL-2.0\",\"LGPL-2.1\",\"LGPL-3.0\",\"Nunit\",\"StandardML-NJ\",\"eCos-2.0\",\"wxWindows\"]");

});

'use strict';
var $b4a68537fcb7cf7e$exports = {};
"use strict";
var $b4a68537fcb7cf7e$var$__createBinding = $b4a68537fcb7cf7e$exports && $b4a68537fcb7cf7e$exports.__createBinding || (Object.create ? function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, {
        enumerable: true,
        get: function() {
            return m[k];
        }
    });
} : function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
});
var $b4a68537fcb7cf7e$var$__setModuleDefault = $b4a68537fcb7cf7e$exports && $b4a68537fcb7cf7e$exports.__setModuleDefault || (Object.create ? function(o, v) {
    Object.defineProperty(o, "default", {
        enumerable: true,
        value: v
    });
} : function(o, v) {
    o["default"] = v;
});
var $b4a68537fcb7cf7e$var$__importStar = $b4a68537fcb7cf7e$exports && $b4a68537fcb7cf7e$exports.__importStar || function(mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) {
        for(var k in mod)if (k !== "default" && Object.hasOwnProperty.call(mod, k)) $b4a68537fcb7cf7e$var$__createBinding(result, mod, k);
    }
    $b4a68537fcb7cf7e$var$__setModuleDefault(result, mod);
    return result;
};
var $b4a68537fcb7cf7e$var$__awaiter = $b4a68537fcb7cf7e$exports && $b4a68537fcb7cf7e$exports.__awaiter || function(thisArg, _arguments, P, generator) {
    function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
            resolve(value);
        });
    }
    return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
            try {
                step(generator.next(value));
            } catch (e) {
                reject(e);
            }
        }
        function rejected(value) {
            try {
                step(generator["throw"](value));
            } catch (e) {
                reject(e);
            }
        }
        function step(result) {
            result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty($b4a68537fcb7cf7e$exports, "__esModule", {
    value: true
});
$b4a68537fcb7cf7e$exports.getIDToken = $b4a68537fcb7cf7e$exports.getState = $b4a68537fcb7cf7e$exports.saveState = $b4a68537fcb7cf7e$exports.group = $b4a68537fcb7cf7e$exports.endGroup = $b4a68537fcb7cf7e$exports.startGroup = $b4a68537fcb7cf7e$exports.info = $b4a68537fcb7cf7e$exports.notice = $b4a68537fcb7cf7e$exports.warning = $b4a68537fcb7cf7e$exports.error = $b4a68537fcb7cf7e$exports.debug = $b4a68537fcb7cf7e$exports.isDebug = $b4a68537fcb7cf7e$exports.setFailed = $b4a68537fcb7cf7e$exports.setCommandEcho = $b4a68537fcb7cf7e$exports.setOutput = $b4a68537fcb7cf7e$exports.getBooleanInput = $b4a68537fcb7cf7e$exports.getMultilineInput = $b4a68537fcb7cf7e$exports.getInput = $b4a68537fcb7cf7e$exports.addPath = $b4a68537fcb7cf7e$exports.setSecret = $b4a68537fcb7cf7e$exports.exportVariable = $b4a68537fcb7cf7e$exports.ExitCode = void 0;
var $ad040737ba68245d$exports = {};
"use strict";
var $ad040737ba68245d$var$__createBinding = $ad040737ba68245d$exports && $ad040737ba68245d$exports.__createBinding || (Object.create ? function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, {
        enumerable: true,
        get: function() {
            return m[k];
        }
    });
} : function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
});
var $ad040737ba68245d$var$__setModuleDefault = $ad040737ba68245d$exports && $ad040737ba68245d$exports.__setModuleDefault || (Object.create ? function(o, v) {
    Object.defineProperty(o, "default", {
        enumerable: true,
        value: v
    });
} : function(o, v) {
    o["default"] = v;
});
var $ad040737ba68245d$var$__importStar = $ad040737ba68245d$exports && $ad040737ba68245d$exports.__importStar || function(mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) {
        for(var k in mod)if (k !== "default" && Object.hasOwnProperty.call(mod, k)) $ad040737ba68245d$var$__createBinding(result, mod, k);
    }
    $ad040737ba68245d$var$__setModuleDefault(result, mod);
    return result;
};
Object.defineProperty($ad040737ba68245d$exports, "__esModule", {
    value: true
});
$ad040737ba68245d$exports.issue = $ad040737ba68245d$exports.issueCommand = void 0;

const $ad040737ba68245d$var$os = $ad040737ba68245d$var$__importStar($e6uBX$os);
var $7dd6b3749fca90f0$exports = {};
"use strict";
// We use any as a valid input type
/* eslint-disable @typescript-eslint/no-explicit-any */ Object.defineProperty($7dd6b3749fca90f0$exports, "__esModule", {
    value: true
});
$7dd6b3749fca90f0$exports.toCommandProperties = $7dd6b3749fca90f0$exports.toCommandValue = void 0;
/**
 * Sanitizes an input into a string so it can be passed into issueCommand safely
 * @param input input to sanitize into a string
 */ function $7dd6b3749fca90f0$var$toCommandValue(input) {
    if (input === null || input === undefined) return '';
    else if (typeof input === 'string' || input instanceof String) return input;
    return JSON.stringify(input);
}
$7dd6b3749fca90f0$exports.toCommandValue = $7dd6b3749fca90f0$var$toCommandValue;
/**
 *
 * @param annotationProperties
 * @returns The command properties to send with the actual annotation command
 * See IssueCommandProperties: https://github.com/actions/runner/blob/main/src/Runner.Worker/ActionCommandManager.cs#L646
 */ function $7dd6b3749fca90f0$var$toCommandProperties(annotationProperties) {
    if (!Object.keys(annotationProperties).length) return {};
    return {
        title: annotationProperties.title,
        file: annotationProperties.file,
        line: annotationProperties.startLine,
        endLine: annotationProperties.endLine,
        col: annotationProperties.startColumn,
        endColumn: annotationProperties.endColumn
    };
}
$7dd6b3749fca90f0$exports.toCommandProperties = $7dd6b3749fca90f0$var$toCommandProperties;


/**
 * Commands
 *
 * Command Format:
 *   ::name key=value,key=value::message
 *
 * Examples:
 *   ::warning::This is the message
 *   ::set-env name=MY_VAR::some value
 */ function $ad040737ba68245d$var$issueCommand(command, properties, message) {
    const cmd = new $ad040737ba68245d$var$Command(command, properties, message);
    process.stdout.write(cmd.toString() + $ad040737ba68245d$var$os.EOL);
}
$ad040737ba68245d$exports.issueCommand = $ad040737ba68245d$var$issueCommand;
function $ad040737ba68245d$var$issue(name, message = '') {
    $ad040737ba68245d$var$issueCommand(name, {}, message);
}
$ad040737ba68245d$exports.issue = $ad040737ba68245d$var$issue;
const $ad040737ba68245d$var$CMD_STRING = '::';
class $ad040737ba68245d$var$Command {
    constructor(command, properties, message){
        if (!command) command = 'missing.command';
        this.command = command;
        this.properties = properties;
        this.message = message;
    }
    toString() {
        let cmdStr = $ad040737ba68245d$var$CMD_STRING + this.command;
        if (this.properties && Object.keys(this.properties).length > 0) {
            cmdStr += ' ';
            let first = true;
            for(const key in this.properties)if (this.properties.hasOwnProperty(key)) {
                const val = this.properties[key];
                if (val) {
                    if (first) first = false;
                    else cmdStr += ',';
                    cmdStr += `${key}=${$ad040737ba68245d$var$escapeProperty(val)}`;
                }
            }
        }
        cmdStr += `${$ad040737ba68245d$var$CMD_STRING}${$ad040737ba68245d$var$escapeData(this.message)}`;
        return cmdStr;
    }
}
function $ad040737ba68245d$var$escapeData(s) {
    return $7dd6b3749fca90f0$exports.toCommandValue(s).replace(/%/g, '%25').replace(/\r/g, '%0D').replace(/\n/g, '%0A');
}
function $ad040737ba68245d$var$escapeProperty(s) {
    return $7dd6b3749fca90f0$exports.toCommandValue(s).replace(/%/g, '%25').replace(/\r/g, '%0D').replace(/\n/g, '%0A').replace(/:/g, '%3A').replace(/,/g, '%2C');
}


var $3ae955b1f7f7a630$exports = {};
"use strict";
// For internal use, subject to change.
var $3ae955b1f7f7a630$var$__createBinding = $3ae955b1f7f7a630$exports && $3ae955b1f7f7a630$exports.__createBinding || (Object.create ? function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, {
        enumerable: true,
        get: function() {
            return m[k];
        }
    });
} : function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
});
var $3ae955b1f7f7a630$var$__setModuleDefault = $3ae955b1f7f7a630$exports && $3ae955b1f7f7a630$exports.__setModuleDefault || (Object.create ? function(o, v) {
    Object.defineProperty(o, "default", {
        enumerable: true,
        value: v
    });
} : function(o, v) {
    o["default"] = v;
});
var $3ae955b1f7f7a630$var$__importStar = $3ae955b1f7f7a630$exports && $3ae955b1f7f7a630$exports.__importStar || function(mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) {
        for(var k in mod)if (k !== "default" && Object.hasOwnProperty.call(mod, k)) $3ae955b1f7f7a630$var$__createBinding(result, mod, k);
    }
    $3ae955b1f7f7a630$var$__setModuleDefault(result, mod);
    return result;
};
Object.defineProperty($3ae955b1f7f7a630$exports, "__esModule", {
    value: true
});
$3ae955b1f7f7a630$exports.issueCommand = void 0;

// We use any as a valid input type
/* eslint-disable @typescript-eslint/no-explicit-any */ const $3ae955b1f7f7a630$var$fs = $3ae955b1f7f7a630$var$__importStar($e6uBX$fs);

const $3ae955b1f7f7a630$var$os = $3ae955b1f7f7a630$var$__importStar($e6uBX$os);

function $3ae955b1f7f7a630$var$issueCommand(command, message) {
    const filePath = process.env[`GITHUB_${command}`];
    if (!filePath) throw new Error(`Unable to find environment variable for file command ${command}`);
    if (!$3ae955b1f7f7a630$var$fs.existsSync(filePath)) throw new Error(`Missing file at path: ${filePath}`);
    $3ae955b1f7f7a630$var$fs.appendFileSync(filePath, `${$7dd6b3749fca90f0$exports.toCommandValue(message)}${$3ae955b1f7f7a630$var$os.EOL}`, {
        encoding: 'utf8'
    });
}
$3ae955b1f7f7a630$exports.issueCommand = $3ae955b1f7f7a630$var$issueCommand;




const $b4a68537fcb7cf7e$var$os = $b4a68537fcb7cf7e$var$__importStar($e6uBX$os);

const $b4a68537fcb7cf7e$var$path = $b4a68537fcb7cf7e$var$__importStar($e6uBX$path);
var $6d540a9f0658d304$exports = {};
"use strict";
var $6d540a9f0658d304$var$__awaiter = $6d540a9f0658d304$exports && $6d540a9f0658d304$exports.__awaiter || function(thisArg, _arguments, P, generator) {
    function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
            resolve(value);
        });
    }
    return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
            try {
                step(generator.next(value));
            } catch (e) {
                reject(e);
            }
        }
        function rejected(value) {
            try {
                step(generator["throw"](value));
            } catch (e) {
                reject(e);
            }
        }
        function step(result) {
            result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty($6d540a9f0658d304$exports, "__esModule", {
    value: true
});
$6d540a9f0658d304$exports.OidcClient = void 0;
var $ccefc1ce8da8664d$exports = {};
"use strict";
Object.defineProperty($ccefc1ce8da8664d$exports, "__esModule", {
    value: true
});


var $21092f7b84637719$exports = {};
"use strict";
Object.defineProperty($21092f7b84637719$exports, "__esModule", {
    value: true
});
function $21092f7b84637719$var$getProxyUrl(reqUrl) {
    let usingSsl = reqUrl.protocol === 'https:';
    let proxyUrl;
    if ($21092f7b84637719$var$checkBypass(reqUrl)) return proxyUrl;
    let proxyVar;
    if (usingSsl) proxyVar = process.env['https_proxy'] || process.env['HTTPS_PROXY'];
    else proxyVar = process.env['http_proxy'] || process.env['HTTP_PROXY'];
    if (proxyVar) proxyUrl = new URL(proxyVar);
    return proxyUrl;
}
$21092f7b84637719$exports.getProxyUrl = $21092f7b84637719$var$getProxyUrl;
function $21092f7b84637719$var$checkBypass(reqUrl) {
    if (!reqUrl.hostname) return false;
    let noProxy = process.env['no_proxy'] || process.env['NO_PROXY'] || '';
    if (!noProxy) return false;
    // Determine the request port
    let reqPort;
    if (reqUrl.port) reqPort = Number(reqUrl.port);
    else if (reqUrl.protocol === 'http:') reqPort = 80;
    else if (reqUrl.protocol === 'https:') reqPort = 443;
    // Format the request hostname and hostname with port
    let upperReqHosts = [
        reqUrl.hostname.toUpperCase()
    ];
    if (typeof reqPort === 'number') upperReqHosts.push(`${upperReqHosts[0]}:${reqPort}`);
    // Compare request host against noproxy
    for (let upperNoProxyItem of noProxy.split(',').map((x)=>x.trim().toUpperCase()
    ).filter((x)=>x
    )){
        if (upperReqHosts.some((x)=>x === upperNoProxyItem
        )) return true;
    }
    return false;
}
$21092f7b84637719$exports.checkBypass = $21092f7b84637719$var$checkBypass;


let $ccefc1ce8da8664d$var$tunnel;
var $ccefc1ce8da8664d$var$HttpCodes;
(function(HttpCodes) {
    HttpCodes[HttpCodes["OK"] = 200] = "OK";
    HttpCodes[HttpCodes["MultipleChoices"] = 300] = "MultipleChoices";
    HttpCodes[HttpCodes["MovedPermanently"] = 301] = "MovedPermanently";
    HttpCodes[HttpCodes["ResourceMoved"] = 302] = "ResourceMoved";
    HttpCodes[HttpCodes["SeeOther"] = 303] = "SeeOther";
    HttpCodes[HttpCodes["NotModified"] = 304] = "NotModified";
    HttpCodes[HttpCodes["UseProxy"] = 305] = "UseProxy";
    HttpCodes[HttpCodes["SwitchProxy"] = 306] = "SwitchProxy";
    HttpCodes[HttpCodes["TemporaryRedirect"] = 307] = "TemporaryRedirect";
    HttpCodes[HttpCodes["PermanentRedirect"] = 308] = "PermanentRedirect";
    HttpCodes[HttpCodes["BadRequest"] = 400] = "BadRequest";
    HttpCodes[HttpCodes["Unauthorized"] = 401] = "Unauthorized";
    HttpCodes[HttpCodes["PaymentRequired"] = 402] = "PaymentRequired";
    HttpCodes[HttpCodes["Forbidden"] = 403] = "Forbidden";
    HttpCodes[HttpCodes["NotFound"] = 404] = "NotFound";
    HttpCodes[HttpCodes["MethodNotAllowed"] = 405] = "MethodNotAllowed";
    HttpCodes[HttpCodes["NotAcceptable"] = 406] = "NotAcceptable";
    HttpCodes[HttpCodes["ProxyAuthenticationRequired"] = 407] = "ProxyAuthenticationRequired";
    HttpCodes[HttpCodes["RequestTimeout"] = 408] = "RequestTimeout";
    HttpCodes[HttpCodes["Conflict"] = 409] = "Conflict";
    HttpCodes[HttpCodes["Gone"] = 410] = "Gone";
    HttpCodes[HttpCodes["TooManyRequests"] = 429] = "TooManyRequests";
    HttpCodes[HttpCodes["InternalServerError"] = 500] = "InternalServerError";
    HttpCodes[HttpCodes["NotImplemented"] = 501] = "NotImplemented";
    HttpCodes[HttpCodes["BadGateway"] = 502] = "BadGateway";
    HttpCodes[HttpCodes["ServiceUnavailable"] = 503] = "ServiceUnavailable";
    HttpCodes[HttpCodes["GatewayTimeout"] = 504] = "GatewayTimeout";
})($ccefc1ce8da8664d$var$HttpCodes = $ccefc1ce8da8664d$exports.HttpCodes || ($ccefc1ce8da8664d$exports.HttpCodes = {}));
var $ccefc1ce8da8664d$var$Headers;
(function(Headers) {
    Headers["Accept"] = "accept";
    Headers["ContentType"] = "content-type";
})($ccefc1ce8da8664d$var$Headers = $ccefc1ce8da8664d$exports.Headers || ($ccefc1ce8da8664d$exports.Headers = {}));
var $ccefc1ce8da8664d$var$MediaTypes;
(function(MediaTypes) {
    MediaTypes["ApplicationJson"] = "application/json";
})($ccefc1ce8da8664d$var$MediaTypes = $ccefc1ce8da8664d$exports.MediaTypes || ($ccefc1ce8da8664d$exports.MediaTypes = {}));
/**
 * Returns the proxy URL, depending upon the supplied url and proxy environment variables.
 * @param serverUrl  The server URL where the request will be sent. For example, https://api.github.com
 */ function $ccefc1ce8da8664d$var$getProxyUrl(serverUrl) {
    let proxyUrl = $21092f7b84637719$exports.getProxyUrl(new URL(serverUrl));
    return proxyUrl ? proxyUrl.href : '';
}
$ccefc1ce8da8664d$exports.getProxyUrl = $ccefc1ce8da8664d$var$getProxyUrl;
const $ccefc1ce8da8664d$var$HttpRedirectCodes = [
    $ccefc1ce8da8664d$var$HttpCodes.MovedPermanently,
    $ccefc1ce8da8664d$var$HttpCodes.ResourceMoved,
    $ccefc1ce8da8664d$var$HttpCodes.SeeOther,
    $ccefc1ce8da8664d$var$HttpCodes.TemporaryRedirect,
    $ccefc1ce8da8664d$var$HttpCodes.PermanentRedirect
];
const $ccefc1ce8da8664d$var$HttpResponseRetryCodes = [
    $ccefc1ce8da8664d$var$HttpCodes.BadGateway,
    $ccefc1ce8da8664d$var$HttpCodes.ServiceUnavailable,
    $ccefc1ce8da8664d$var$HttpCodes.GatewayTimeout
];
const $ccefc1ce8da8664d$var$RetryableHttpVerbs = [
    'OPTIONS',
    'GET',
    'DELETE',
    'HEAD'
];
const $ccefc1ce8da8664d$var$ExponentialBackoffCeiling = 10;
const $ccefc1ce8da8664d$var$ExponentialBackoffTimeSlice = 5;
class $ccefc1ce8da8664d$var$HttpClientError extends Error {
    constructor(message, statusCode){
        super(message);
        this.name = 'HttpClientError';
        this.statusCode = statusCode;
        Object.setPrototypeOf(this, $ccefc1ce8da8664d$var$HttpClientError.prototype);
    }
}
$ccefc1ce8da8664d$exports.HttpClientError = $ccefc1ce8da8664d$var$HttpClientError;
class $ccefc1ce8da8664d$var$HttpClientResponse {
    constructor(message){
        this.message = message;
    }
    readBody() {
        return new Promise(async (resolve, reject)=>{
            let output = Buffer.alloc(0);
            this.message.on('data', (chunk)=>{
                output = Buffer.concat([
                    output,
                    chunk
                ]);
            });
            this.message.on('end', ()=>{
                resolve(output.toString());
            });
        });
    }
}
$ccefc1ce8da8664d$exports.HttpClientResponse = $ccefc1ce8da8664d$var$HttpClientResponse;
function $ccefc1ce8da8664d$var$isHttps(requestUrl) {
    let parsedUrl = new URL(requestUrl);
    return parsedUrl.protocol === 'https:';
}
$ccefc1ce8da8664d$exports.isHttps = $ccefc1ce8da8664d$var$isHttps;

class $ccefc1ce8da8664d$var$HttpClient {
    constructor(userAgent, handlers, requestOptions){
        this._ignoreSslError = false;
        this._allowRedirects = true;
        this._allowRedirectDowngrade = false;
        this._maxRedirects = 50;
        this._allowRetries = false;
        this._maxRetries = 1;
        this._keepAlive = false;
        this._disposed = false;
        this.userAgent = userAgent;
        this.handlers = handlers || [];
        this.requestOptions = requestOptions;
        if (requestOptions) {
            if (requestOptions.ignoreSslError != null) this._ignoreSslError = requestOptions.ignoreSslError;
            this._socketTimeout = requestOptions.socketTimeout;
            if (requestOptions.allowRedirects != null) this._allowRedirects = requestOptions.allowRedirects;
            if (requestOptions.allowRedirectDowngrade != null) this._allowRedirectDowngrade = requestOptions.allowRedirectDowngrade;
            if (requestOptions.maxRedirects != null) this._maxRedirects = Math.max(requestOptions.maxRedirects, 0);
            if (requestOptions.keepAlive != null) this._keepAlive = requestOptions.keepAlive;
            if (requestOptions.allowRetries != null) this._allowRetries = requestOptions.allowRetries;
            if (requestOptions.maxRetries != null) this._maxRetries = requestOptions.maxRetries;
        }
    }
    options(requestUrl, additionalHeaders) {
        return this.request('OPTIONS', requestUrl, null, additionalHeaders || {});
    }
    get(requestUrl, additionalHeaders) {
        return this.request('GET', requestUrl, null, additionalHeaders || {});
    }
    del(requestUrl, additionalHeaders) {
        return this.request('DELETE', requestUrl, null, additionalHeaders || {});
    }
    post(requestUrl, data, additionalHeaders) {
        return this.request('POST', requestUrl, data, additionalHeaders || {});
    }
    patch(requestUrl, data, additionalHeaders) {
        return this.request('PATCH', requestUrl, data, additionalHeaders || {});
    }
    put(requestUrl, data, additionalHeaders) {
        return this.request('PUT', requestUrl, data, additionalHeaders || {});
    }
    head(requestUrl, additionalHeaders) {
        return this.request('HEAD', requestUrl, null, additionalHeaders || {});
    }
    sendStream(verb, requestUrl, stream, additionalHeaders) {
        return this.request(verb, requestUrl, stream, additionalHeaders);
    }
    /**
     * Gets a typed object from an endpoint
     * Be aware that not found returns a null.  Other errors (4xx, 5xx) reject the promise
     */ async getJson(requestUrl, additionalHeaders = {}) {
        additionalHeaders[$ccefc1ce8da8664d$var$Headers.Accept] = this._getExistingOrDefaultHeader(additionalHeaders, $ccefc1ce8da8664d$var$Headers.Accept, $ccefc1ce8da8664d$var$MediaTypes.ApplicationJson);
        let res = await this.get(requestUrl, additionalHeaders);
        return this._processResponse(res, this.requestOptions);
    }
    async postJson(requestUrl, obj, additionalHeaders = {}) {
        let data = JSON.stringify(obj, null, 2);
        additionalHeaders[$ccefc1ce8da8664d$var$Headers.Accept] = this._getExistingOrDefaultHeader(additionalHeaders, $ccefc1ce8da8664d$var$Headers.Accept, $ccefc1ce8da8664d$var$MediaTypes.ApplicationJson);
        additionalHeaders[$ccefc1ce8da8664d$var$Headers.ContentType] = this._getExistingOrDefaultHeader(additionalHeaders, $ccefc1ce8da8664d$var$Headers.ContentType, $ccefc1ce8da8664d$var$MediaTypes.ApplicationJson);
        let res = await this.post(requestUrl, data, additionalHeaders);
        return this._processResponse(res, this.requestOptions);
    }
    async putJson(requestUrl, obj, additionalHeaders = {}) {
        let data = JSON.stringify(obj, null, 2);
        additionalHeaders[$ccefc1ce8da8664d$var$Headers.Accept] = this._getExistingOrDefaultHeader(additionalHeaders, $ccefc1ce8da8664d$var$Headers.Accept, $ccefc1ce8da8664d$var$MediaTypes.ApplicationJson);
        additionalHeaders[$ccefc1ce8da8664d$var$Headers.ContentType] = this._getExistingOrDefaultHeader(additionalHeaders, $ccefc1ce8da8664d$var$Headers.ContentType, $ccefc1ce8da8664d$var$MediaTypes.ApplicationJson);
        let res = await this.put(requestUrl, data, additionalHeaders);
        return this._processResponse(res, this.requestOptions);
    }
    async patchJson(requestUrl, obj, additionalHeaders = {}) {
        let data = JSON.stringify(obj, null, 2);
        additionalHeaders[$ccefc1ce8da8664d$var$Headers.Accept] = this._getExistingOrDefaultHeader(additionalHeaders, $ccefc1ce8da8664d$var$Headers.Accept, $ccefc1ce8da8664d$var$MediaTypes.ApplicationJson);
        additionalHeaders[$ccefc1ce8da8664d$var$Headers.ContentType] = this._getExistingOrDefaultHeader(additionalHeaders, $ccefc1ce8da8664d$var$Headers.ContentType, $ccefc1ce8da8664d$var$MediaTypes.ApplicationJson);
        let res = await this.patch(requestUrl, data, additionalHeaders);
        return this._processResponse(res, this.requestOptions);
    }
    /**
     * Makes a raw http request.
     * All other methods such as get, post, patch, and request ultimately call this.
     * Prefer get, del, post and patch
     */ async request(verb, requestUrl, data, headers) {
        if (this._disposed) throw new Error('Client has already been disposed.');
        let parsedUrl = new URL(requestUrl);
        let info = this._prepareRequest(verb, parsedUrl, headers);
        // Only perform retries on reads since writes may not be idempotent.
        let maxTries = this._allowRetries && $ccefc1ce8da8664d$var$RetryableHttpVerbs.indexOf(verb) != -1 ? this._maxRetries + 1 : 1;
        let numTries = 0;
        let response;
        while(numTries < maxTries){
            response = await this.requestRaw(info, data);
            // Check if it's an authentication challenge
            if (response && response.message && response.message.statusCode === $ccefc1ce8da8664d$var$HttpCodes.Unauthorized) {
                let authenticationHandler;
                for(let i = 0; i < this.handlers.length; i++)if (this.handlers[i].canHandleAuthentication(response)) {
                    authenticationHandler = this.handlers[i];
                    break;
                }
                if (authenticationHandler) return authenticationHandler.handleAuthentication(this, info, data);
                else // We have received an unauthorized response but have no handlers to handle it.
                // Let the response return to the caller.
                return response;
            }
            let redirectsRemaining = this._maxRedirects;
            while($ccefc1ce8da8664d$var$HttpRedirectCodes.indexOf(response.message.statusCode) != -1 && this._allowRedirects && redirectsRemaining > 0){
                const redirectUrl = response.message.headers['location'];
                if (!redirectUrl) break;
                let parsedRedirectUrl = new URL(redirectUrl);
                if (parsedUrl.protocol == 'https:' && parsedUrl.protocol != parsedRedirectUrl.protocol && !this._allowRedirectDowngrade) throw new Error('Redirect from HTTPS to HTTP protocol. This downgrade is not allowed for security reasons. If you want to allow this behavior, set the allowRedirectDowngrade option to true.');
                // we need to finish reading the response before reassigning response
                // which will leak the open socket.
                await response.readBody();
                // strip authorization header if redirected to a different hostname
                if (parsedRedirectUrl.hostname !== parsedUrl.hostname) {
                    for(let header in headers)// header names are case insensitive
                    if (header.toLowerCase() === 'authorization') delete headers[header];
                }
                // let's make the request with the new redirectUrl
                info = this._prepareRequest(verb, parsedRedirectUrl, headers);
                response = await this.requestRaw(info, data);
                redirectsRemaining--;
            }
            if ($ccefc1ce8da8664d$var$HttpResponseRetryCodes.indexOf(response.message.statusCode) == -1) // If not a retry code, return immediately instead of retrying
            return response;
            numTries += 1;
            if (numTries < maxTries) {
                await response.readBody();
                await this._performExponentialBackoff(numTries);
            }
        }
        return response;
    }
    /**
     * Needs to be called if keepAlive is set to true in request options.
     */ dispose() {
        if (this._agent) this._agent.destroy();
        this._disposed = true;
    }
    /**
     * Raw request.
     * @param info
     * @param data
     */ requestRaw(info, data) {
        return new Promise((resolve, reject)=>{
            let callbackForResult = function(err, res) {
                if (err) reject(err);
                resolve(res);
            };
            this.requestRawWithCallback(info, data, callbackForResult);
        });
    }
    /**
     * Raw request with callback.
     * @param info
     * @param data
     * @param onResult
     */ requestRawWithCallback(info, data, onResult) {
        let socket;
        if (typeof data === 'string') info.options.headers['Content-Length'] = Buffer.byteLength(data, 'utf8');
        let callbackCalled = false;
        let handleResult = (err, res)=>{
            if (!callbackCalled) {
                callbackCalled = true;
                onResult(err, res);
            }
        };
        let req = info.httpModule.request(info.options, (msg)=>{
            let res = new $ccefc1ce8da8664d$var$HttpClientResponse(msg);
            handleResult(null, res);
        });
        req.on('socket', (sock)=>{
            socket = sock;
        });
        // If we ever get disconnected, we want the socket to timeout eventually
        req.setTimeout(this._socketTimeout || 180000, ()=>{
            if (socket) socket.end();
            handleResult(new Error('Request timeout: ' + info.options.path), null);
        });
        req.on('error', function(err) {
            // err has statusCode property
            // res should have headers
            handleResult(err, null);
        });
        if (data && typeof data === 'string') req.write(data, 'utf8');
        if (data && typeof data !== 'string') {
            data.on('close', function() {
                req.end();
            });
            data.pipe(req);
        } else req.end();
    }
    /**
     * Gets an http agent. This function is useful when you need an http agent that handles
     * routing through a proxy server - depending upon the url and proxy environment variables.
     * @param serverUrl  The server URL where the request will be sent. For example, https://api.github.com
     */ getAgent(serverUrl) {
        let parsedUrl = new URL(serverUrl);
        return this._getAgent(parsedUrl);
    }
    _prepareRequest(method, requestUrl, headers) {
        const info = {};
        info.parsedUrl = requestUrl;
        const usingSsl = info.parsedUrl.protocol === 'https:';
        info.httpModule = usingSsl ? $e6uBX$https : $e6uBX$http;
        const defaultPort = usingSsl ? 443 : 80;
        info.options = {};
        info.options.host = info.parsedUrl.hostname;
        info.options.port = info.parsedUrl.port ? parseInt(info.parsedUrl.port) : defaultPort;
        info.options.path = (info.parsedUrl.pathname || '') + (info.parsedUrl.search || '');
        info.options.method = method;
        info.options.headers = this._mergeHeaders(headers);
        if (this.userAgent != null) info.options.headers['user-agent'] = this.userAgent;
        info.options.agent = this._getAgent(info.parsedUrl);
        // gives handlers an opportunity to participate
        if (this.handlers) this.handlers.forEach((handler)=>{
            handler.prepareRequest(info.options);
        });
        return info;
    }
    _mergeHeaders(headers) {
        const lowercaseKeys = (obj)=>Object.keys(obj).reduce((c, k)=>(c[k.toLowerCase()] = obj[k], c)
            , {})
        ;
        if (this.requestOptions && this.requestOptions.headers) return Object.assign({}, lowercaseKeys(this.requestOptions.headers), lowercaseKeys(headers));
        return lowercaseKeys(headers || {});
    }
    _getExistingOrDefaultHeader(additionalHeaders, header, _default) {
        const lowercaseKeys = (obj)=>Object.keys(obj).reduce((c, k)=>(c[k.toLowerCase()] = obj[k], c)
            , {})
        ;
        let clientHeader;
        if (this.requestOptions && this.requestOptions.headers) clientHeader = lowercaseKeys(this.requestOptions.headers)[header];
        return additionalHeaders[header] || clientHeader || _default;
    }
    _getAgent(parsedUrl) {
        let agent;
        let proxyUrl = $21092f7b84637719$exports.getProxyUrl(parsedUrl);
        let useProxy = proxyUrl && proxyUrl.hostname;
        if (this._keepAlive && useProxy) agent = this._proxyAgent;
        if (this._keepAlive && !useProxy) agent = this._agent;
        // if agent is already assigned use that agent.
        if (!!agent) return agent;
        const usingSsl = parsedUrl.protocol === 'https:';
        let maxSockets = 100;
        if (!!this.requestOptions) maxSockets = this.requestOptions.maxSockets || $e6uBX$http.globalAgent.maxSockets;
        if (useProxy) {
            // If using proxy, need tunnel
            if (!$ccefc1ce8da8664d$var$tunnel) $ccefc1ce8da8664d$var$tunnel = (parcelRequire("fGJcE"));
            const agentOptions = {
                maxSockets: maxSockets,
                keepAlive: this._keepAlive,
                proxy: {
                    ...(proxyUrl.username || proxyUrl.password) && {
                        proxyAuth: `${proxyUrl.username}:${proxyUrl.password}`
                    },
                    host: proxyUrl.hostname,
                    port: proxyUrl.port
                }
            };
            let tunnelAgent;
            const overHttps = proxyUrl.protocol === 'https:';
            if (usingSsl) tunnelAgent = overHttps ? $ccefc1ce8da8664d$var$tunnel.httpsOverHttps : $ccefc1ce8da8664d$var$tunnel.httpsOverHttp;
            else tunnelAgent = overHttps ? $ccefc1ce8da8664d$var$tunnel.httpOverHttps : $ccefc1ce8da8664d$var$tunnel.httpOverHttp;
            agent = tunnelAgent(agentOptions);
            this._proxyAgent = agent;
        }
        // if reusing agent across request and tunneling agent isn't assigned create a new agent
        if (this._keepAlive && !agent) {
            const options = {
                keepAlive: this._keepAlive,
                maxSockets: maxSockets
            };
            agent = usingSsl ? new $e6uBX$https.Agent(options) : new $e6uBX$http.Agent(options);
            this._agent = agent;
        }
        // if not using private agent and tunnel agent isn't setup then use global agent
        if (!agent) agent = usingSsl ? $e6uBX$https.globalAgent : $e6uBX$http.globalAgent;
        if (usingSsl && this._ignoreSslError) // we don't want to set NODE_TLS_REJECT_UNAUTHORIZED=0 since that will affect request for entire process
        // http.RequestOptions doesn't expose a way to modify RequestOptions.agent.options
        // we have to cast it to any and change it directly
        agent.options = Object.assign(agent.options || {}, {
            rejectUnauthorized: false
        });
        return agent;
    }
    _performExponentialBackoff(retryNumber) {
        retryNumber = Math.min($ccefc1ce8da8664d$var$ExponentialBackoffCeiling, retryNumber);
        const ms = $ccefc1ce8da8664d$var$ExponentialBackoffTimeSlice * Math.pow(2, retryNumber);
        return new Promise((resolve)=>setTimeout(()=>resolve()
            , ms)
        );
    }
    static dateTimeDeserializer(key, value) {
        if (typeof value === 'string') {
            let a = new Date(value);
            if (!isNaN(a.valueOf())) return a;
        }
        return value;
    }
    async _processResponse(res, options) {
        return new Promise(async (resolve, reject)=>{
            const statusCode = res.message.statusCode;
            const response = {
                statusCode: statusCode,
                result: null,
                headers: {}
            };
            // not found leads to null obj returned
            if (statusCode == $ccefc1ce8da8664d$var$HttpCodes.NotFound) resolve(response);
            let obj;
            let contents;
            // get the result from the body
            try {
                contents = await res.readBody();
                if (contents && contents.length > 0) {
                    if (options && options.deserializeDates) obj = JSON.parse(contents, $ccefc1ce8da8664d$var$HttpClient.dateTimeDeserializer);
                    else obj = JSON.parse(contents);
                    response.result = obj;
                }
                response.headers = res.message.headers;
            } catch (err) {
            // Invalid resource (contents not json);  leaving result obj null
            }
            // note that 3xx redirects are handled by the http layer.
            if (statusCode > 299) {
                let msg;
                // if exception/error in body, attempt to get better error
                if (obj && obj.message) msg = obj.message;
                else if (contents && contents.length > 0) // it may be the case that the exception is in the body message as string
                msg = contents;
                else msg = 'Failed request: (' + statusCode + ')';
                let err = new $ccefc1ce8da8664d$var$HttpClientError(msg, statusCode);
                err.result = response.result;
                reject(err);
            } else resolve(response);
        });
    }
}
$ccefc1ce8da8664d$exports.HttpClient = $ccefc1ce8da8664d$var$HttpClient;


var $3778da04dfe2ffac$exports = {};
"use strict";
Object.defineProperty($3778da04dfe2ffac$exports, "__esModule", {
    value: true
});
class $3778da04dfe2ffac$var$BasicCredentialHandler {
    constructor(username, password){
        this.username = username;
        this.password = password;
    }
    prepareRequest(options) {
        options.headers['Authorization'] = 'Basic ' + Buffer.from(this.username + ':' + this.password).toString('base64');
    }
    // This handler cannot handle 401
    canHandleAuthentication(response) {
        return false;
    }
    handleAuthentication(httpClient, requestInfo, objs) {
        return null;
    }
}
$3778da04dfe2ffac$exports.BasicCredentialHandler = $3778da04dfe2ffac$var$BasicCredentialHandler;
class $3778da04dfe2ffac$var$BearerCredentialHandler {
    constructor(token){
        this.token = token;
    }
    // currently implements pre-authorization
    // TODO: support preAuth = false where it hooks on 401
    prepareRequest(options) {
        options.headers['Authorization'] = 'Bearer ' + this.token;
    }
    // This handler cannot handle 401
    canHandleAuthentication(response) {
        return false;
    }
    handleAuthentication(httpClient, requestInfo, objs) {
        return null;
    }
}
$3778da04dfe2ffac$exports.BearerCredentialHandler = $3778da04dfe2ffac$var$BearerCredentialHandler;
class $3778da04dfe2ffac$var$PersonalAccessTokenCredentialHandler {
    constructor(token){
        this.token = token;
    }
    // currently implements pre-authorization
    // TODO: support preAuth = false where it hooks on 401
    prepareRequest(options) {
        options.headers['Authorization'] = 'Basic ' + Buffer.from('PAT:' + this.token).toString('base64');
    }
    // This handler cannot handle 401
    canHandleAuthentication(response) {
        return false;
    }
    handleAuthentication(httpClient, requestInfo, objs) {
        return null;
    }
}
$3778da04dfe2ffac$exports.PersonalAccessTokenCredentialHandler = $3778da04dfe2ffac$var$PersonalAccessTokenCredentialHandler;



class $6d540a9f0658d304$var$OidcClient {
    static createHttpClient(allowRetry = true, maxRetry = 10) {
        const requestOptions = {
            allowRetries: allowRetry,
            maxRetries: maxRetry
        };
        return new $ccefc1ce8da8664d$exports.HttpClient('actions/oidc-client', [
            new $3778da04dfe2ffac$exports.BearerCredentialHandler($6d540a9f0658d304$var$OidcClient.getRequestToken())
        ], requestOptions);
    }
    static getRequestToken() {
        const token = process.env['ACTIONS_ID_TOKEN_REQUEST_TOKEN'];
        if (!token) throw new Error('Unable to get ACTIONS_ID_TOKEN_REQUEST_TOKEN env variable');
        return token;
    }
    static getIDTokenUrl() {
        const runtimeUrl = process.env['ACTIONS_ID_TOKEN_REQUEST_URL'];
        if (!runtimeUrl) throw new Error('Unable to get ACTIONS_ID_TOKEN_REQUEST_URL env variable');
        return runtimeUrl;
    }
    static getCall(id_token_url) {
        var _a;
        return $6d540a9f0658d304$var$__awaiter(this, void 0, void 0, function*() {
            const httpclient = $6d540a9f0658d304$var$OidcClient.createHttpClient();
            const res = yield httpclient.getJson(id_token_url).catch((error)=>{
                throw new Error(`Failed to get ID Token. \n 
        Error Code : ${error.statusCode}\n 
        Error Message: ${error.result.message}`);
            });
            const id_token = (_a = res.result) === null || _a === void 0 ? void 0 : _a.value;
            if (!id_token) throw new Error('Response json body do not have ID Token field');
            return id_token;
        });
    }
    static getIDToken(audience) {
        return $6d540a9f0658d304$var$__awaiter(this, void 0, void 0, function*() {
            try {
                // New ID Token is requested from action service
                let id_token_url = $6d540a9f0658d304$var$OidcClient.getIDTokenUrl();
                if (audience) {
                    const encodedAudience = encodeURIComponent(audience);
                    id_token_url = `${id_token_url}&audience=${encodedAudience}`;
                }
                $b4a68537fcb7cf7e$exports.debug(`ID token url is ${id_token_url}`);
                const id_token = yield $6d540a9f0658d304$var$OidcClient.getCall(id_token_url);
                $b4a68537fcb7cf7e$exports.setSecret(id_token);
                return id_token;
            } catch (error) {
                throw new Error(`Error message: ${error.message}`);
            }
        });
    }
}
$6d540a9f0658d304$exports.OidcClient = $6d540a9f0658d304$var$OidcClient;


/**
 * The code to exit an action
 */ var $b4a68537fcb7cf7e$var$ExitCode;
(function(ExitCode) {
    /**
     * A code indicating that the action was successful
     */ ExitCode[ExitCode["Success"] = 0] = "Success";
    /**
     * A code indicating that the action was a failure
     */ ExitCode[ExitCode["Failure"] = 1] = "Failure";
})($b4a68537fcb7cf7e$var$ExitCode = $b4a68537fcb7cf7e$exports.ExitCode || ($b4a68537fcb7cf7e$exports.ExitCode = {}));
//-----------------------------------------------------------------------
// Variables
//-----------------------------------------------------------------------
/**
 * Sets env variable for this action and future actions in the job
 * @param name the name of the variable to set
 * @param val the value of the variable. Non-string values will be converted to a string via JSON.stringify
 */ // eslint-disable-next-line @typescript-eslint/no-explicit-any
function $b4a68537fcb7cf7e$var$exportVariable(name, val) {
    const convertedVal = $7dd6b3749fca90f0$exports.toCommandValue(val);
    process.env[name] = convertedVal;
    const filePath = process.env['GITHUB_ENV'] || '';
    if (filePath) {
        const delimiter = '_GitHubActionsFileCommandDelimeter_';
        const commandValue = `${name}<<${delimiter}${$b4a68537fcb7cf7e$var$os.EOL}${convertedVal}${$b4a68537fcb7cf7e$var$os.EOL}${delimiter}`;
        $3ae955b1f7f7a630$exports.issueCommand('ENV', commandValue);
    } else $ad040737ba68245d$exports.issueCommand('set-env', {
        name: name
    }, convertedVal);
}
$b4a68537fcb7cf7e$exports.exportVariable = $b4a68537fcb7cf7e$var$exportVariable;
/**
 * Registers a secret which will get masked from logs
 * @param secret value of the secret
 */ function $b4a68537fcb7cf7e$var$setSecret(secret) {
    $ad040737ba68245d$exports.issueCommand('add-mask', {}, secret);
}
$b4a68537fcb7cf7e$exports.setSecret = $b4a68537fcb7cf7e$var$setSecret;
/**
 * Prepends inputPath to the PATH (for this action and future actions)
 * @param inputPath
 */ function $b4a68537fcb7cf7e$var$addPath(inputPath) {
    const filePath = process.env['GITHUB_PATH'] || '';
    if (filePath) $3ae955b1f7f7a630$exports.issueCommand('PATH', inputPath);
    else $ad040737ba68245d$exports.issueCommand('add-path', {}, inputPath);
    process.env['PATH'] = `${inputPath}${$b4a68537fcb7cf7e$var$path.delimiter}${process.env['PATH']}`;
}
$b4a68537fcb7cf7e$exports.addPath = $b4a68537fcb7cf7e$var$addPath;
/**
 * Gets the value of an input.
 * Unless trimWhitespace is set to false in InputOptions, the value is also trimmed.
 * Returns an empty string if the value is not defined.
 *
 * @param     name     name of the input to get
 * @param     options  optional. See InputOptions.
 * @returns   string
 */ function $b4a68537fcb7cf7e$var$getInput(name, options) {
    const val = process.env[`INPUT_${name.replace(/ /g, '_').toUpperCase()}`] || '';
    if (options && options.required && !val) throw new Error(`Input required and not supplied: ${name}`);
    if (options && options.trimWhitespace === false) return val;
    return val.trim();
}
$b4a68537fcb7cf7e$exports.getInput = $b4a68537fcb7cf7e$var$getInput;
/**
 * Gets the values of an multiline input.  Each value is also trimmed.
 *
 * @param     name     name of the input to get
 * @param     options  optional. See InputOptions.
 * @returns   string[]
 *
 */ function $b4a68537fcb7cf7e$var$getMultilineInput(name, options) {
    const inputs = $b4a68537fcb7cf7e$var$getInput(name, options).split('\n').filter((x)=>x !== ''
    );
    return inputs;
}
$b4a68537fcb7cf7e$exports.getMultilineInput = $b4a68537fcb7cf7e$var$getMultilineInput;
/**
 * Gets the input value of the boolean type in the YAML 1.2 "core schema" specification.
 * Support boolean input list: `true | True | TRUE | false | False | FALSE` .
 * The return value is also in boolean type.
 * ref: https://yaml.org/spec/1.2/spec.html#id2804923
 *
 * @param     name     name of the input to get
 * @param     options  optional. See InputOptions.
 * @returns   boolean
 */ function $b4a68537fcb7cf7e$var$getBooleanInput(name, options) {
    const trueValue = [
        'true',
        'True',
        'TRUE'
    ];
    const falseValue = [
        'false',
        'False',
        'FALSE'
    ];
    const val = $b4a68537fcb7cf7e$var$getInput(name, options);
    if (trueValue.includes(val)) return true;
    if (falseValue.includes(val)) return false;
    throw new TypeError(`Input does not meet YAML 1.2 "Core Schema" specification: ${name}\n` + `Support boolean input list: \`true | True | TRUE | false | False | FALSE\``);
}
$b4a68537fcb7cf7e$exports.getBooleanInput = $b4a68537fcb7cf7e$var$getBooleanInput;
/**
 * Sets the value of an output.
 *
 * @param     name     name of the output to set
 * @param     value    value to store. Non-string values will be converted to a string via JSON.stringify
 */ // eslint-disable-next-line @typescript-eslint/no-explicit-any
function $b4a68537fcb7cf7e$var$setOutput(name, value) {
    process.stdout.write($b4a68537fcb7cf7e$var$os.EOL);
    $ad040737ba68245d$exports.issueCommand('set-output', {
        name: name
    }, value);
}
$b4a68537fcb7cf7e$exports.setOutput = $b4a68537fcb7cf7e$var$setOutput;
/**
 * Enables or disables the echoing of commands into stdout for the rest of the step.
 * Echoing is disabled by default if ACTIONS_STEP_DEBUG is not set.
 *
 */ function $b4a68537fcb7cf7e$var$setCommandEcho(enabled) {
    $ad040737ba68245d$exports.issue('echo', enabled ? 'on' : 'off');
}
$b4a68537fcb7cf7e$exports.setCommandEcho = $b4a68537fcb7cf7e$var$setCommandEcho;
//-----------------------------------------------------------------------
// Results
//-----------------------------------------------------------------------
/**
 * Sets the action status to failed.
 * When the action exits it will be with an exit code of 1
 * @param message add error issue message
 */ function $b4a68537fcb7cf7e$var$setFailed(message) {
    process.exitCode = $b4a68537fcb7cf7e$var$ExitCode.Failure;
    $b4a68537fcb7cf7e$var$error(message);
}
$b4a68537fcb7cf7e$exports.setFailed = $b4a68537fcb7cf7e$var$setFailed;
//-----------------------------------------------------------------------
// Logging Commands
//-----------------------------------------------------------------------
/**
 * Gets whether Actions Step Debug is on or not
 */ function $b4a68537fcb7cf7e$var$isDebug() {
    return process.env['RUNNER_DEBUG'] === '1';
}
$b4a68537fcb7cf7e$exports.isDebug = $b4a68537fcb7cf7e$var$isDebug;
/**
 * Writes debug message to user log
 * @param message debug message
 */ function $b4a68537fcb7cf7e$var$debug(message) {
    $ad040737ba68245d$exports.issueCommand('debug', {}, message);
}
$b4a68537fcb7cf7e$exports.debug = $b4a68537fcb7cf7e$var$debug;
/**
 * Adds an error issue
 * @param message error issue message. Errors will be converted to string via toString()
 * @param properties optional properties to add to the annotation.
 */ function $b4a68537fcb7cf7e$var$error(message, properties = {}) {
    $ad040737ba68245d$exports.issueCommand('error', $7dd6b3749fca90f0$exports.toCommandProperties(properties), message instanceof Error ? message.toString() : message);
}
$b4a68537fcb7cf7e$exports.error = $b4a68537fcb7cf7e$var$error;
/**
 * Adds a warning issue
 * @param message warning issue message. Errors will be converted to string via toString()
 * @param properties optional properties to add to the annotation.
 */ function $b4a68537fcb7cf7e$var$warning(message, properties = {}) {
    $ad040737ba68245d$exports.issueCommand('warning', $7dd6b3749fca90f0$exports.toCommandProperties(properties), message instanceof Error ? message.toString() : message);
}
$b4a68537fcb7cf7e$exports.warning = $b4a68537fcb7cf7e$var$warning;
/**
 * Adds a notice issue
 * @param message notice issue message. Errors will be converted to string via toString()
 * @param properties optional properties to add to the annotation.
 */ function $b4a68537fcb7cf7e$var$notice(message, properties = {}) {
    $ad040737ba68245d$exports.issueCommand('notice', $7dd6b3749fca90f0$exports.toCommandProperties(properties), message instanceof Error ? message.toString() : message);
}
$b4a68537fcb7cf7e$exports.notice = $b4a68537fcb7cf7e$var$notice;
/**
 * Writes info to log with console.log.
 * @param message info message
 */ function $b4a68537fcb7cf7e$var$info(message) {
    process.stdout.write(message + $b4a68537fcb7cf7e$var$os.EOL);
}
$b4a68537fcb7cf7e$exports.info = $b4a68537fcb7cf7e$var$info;
/**
 * Begin an output group.
 *
 * Output until the next `groupEnd` will be foldable in this group
 *
 * @param name The name of the output group
 */ function $b4a68537fcb7cf7e$var$startGroup(name) {
    $ad040737ba68245d$exports.issue('group', name);
}
$b4a68537fcb7cf7e$exports.startGroup = $b4a68537fcb7cf7e$var$startGroup;
/**
 * End an output group.
 */ function $b4a68537fcb7cf7e$var$endGroup() {
    $ad040737ba68245d$exports.issue('endgroup');
}
$b4a68537fcb7cf7e$exports.endGroup = $b4a68537fcb7cf7e$var$endGroup;
/**
 * Wrap an asynchronous function call in a group.
 *
 * Returns the same type as the function itself.
 *
 * @param name The name of the group
 * @param fn The function to wrap in the group
 */ function $b4a68537fcb7cf7e$var$group(name, fn) {
    return $b4a68537fcb7cf7e$var$__awaiter(this, void 0, void 0, function*() {
        $b4a68537fcb7cf7e$var$startGroup(name);
        let result;
        try {
            result = yield fn();
        } finally{
            $b4a68537fcb7cf7e$var$endGroup();
        }
        return result;
    });
}
$b4a68537fcb7cf7e$exports.group = $b4a68537fcb7cf7e$var$group;
//-----------------------------------------------------------------------
// Wrapper action state
//-----------------------------------------------------------------------
/**
 * Saves state for current action, the state can only be retrieved by this action's post job execution.
 *
 * @param     name     name of the state to store
 * @param     value    value to store. Non-string values will be converted to a string via JSON.stringify
 */ // eslint-disable-next-line @typescript-eslint/no-explicit-any
function $b4a68537fcb7cf7e$var$saveState(name, value) {
    $ad040737ba68245d$exports.issueCommand('save-state', {
        name: name
    }, value);
}
$b4a68537fcb7cf7e$exports.saveState = $b4a68537fcb7cf7e$var$saveState;
/**
 * Gets the value of an state set by this action's main execution.
 *
 * @param     name     name of the state to get
 * @returns   string
 */ function $b4a68537fcb7cf7e$var$getState(name) {
    return process.env[`STATE_${name}`] || '';
}
$b4a68537fcb7cf7e$exports.getState = $b4a68537fcb7cf7e$var$getState;
function $b4a68537fcb7cf7e$var$getIDToken(aud) {
    return $b4a68537fcb7cf7e$var$__awaiter(this, void 0, void 0, function*() {
        return yield $6d540a9f0658d304$exports.OidcClient.getIDToken(aud);
    });
}
$b4a68537fcb7cf7e$exports.getIDToken = $b4a68537fcb7cf7e$var$getIDToken;


var $04945d2fdf2733ca$exports = {};
'use strict';
var $2fac1a452ed7d733$exports = {};
$2fac1a452ed7d733$exports = JSON.parse("{\"Public Domain\":[\"CC0-1.0\",\"PDDL-1.0\",\"SAX-PD\",\"Unlicense\"],\"Permissive\":[\"AFL-1.1\",\"AFL-1.2\",\"AFL-2.0\",\"AFL-2.1\",\"AFL-3.0\",\"Apache-1.0\",\"Apache-1.1\",\"Apache-2.0\",\"Artistic-2.0\",\"BSD-2-Clause\",\"BSD-3-Clause\",\"BSD-3-Clause-Attribution\",\"BSD-3-Clause-Clear\",\"BSD-2-Clause-FreeBSD\",\"BSD-3-Clause-LBNL\",\"BSD-2-Clause-NetBSD\",\"BSD-3-Clause-No-Nuclear-License\",\"BSD-3-Clause-No-Nuclear-License-2014\",\"BSD-3-Clause-No-Nuclear-Warranty\",\"BSD-4-Clause\",\"BSD-4-Clause-UC\",\"DSDP\",\"ECL-2.0\",\"ISC\",\"MIT\",\"X11\",\"WTFPL\",\"OLDAP-2.2.2\",\"OLDAP-1.1\",\"OLDAP-1.2\",\"OLDAP-1.3\",\"OLDAP-1.4\",\"OLDAP-2.0\",\"OLDAP-2.0.1\",\"OLDAP-2.1\",\"OLDAP-2.2\",\"OLDAP-2.2.1\",\"OLDAP-2.3\",\"OLDAP-2.4\",\"OLDAP-2.5\",\"OLDAP-2.6\",\"OLDAP-2.7\",\"OLDAP-2.8\",\"PHP-3.0\",\"PHP-3.01\",\"Python-2.0\",\"Zlib\",\"zlib-acknowledgement\",\"XFree86-1.1\",\"W3C-20150513\",\"W3C-19980720\",\"W3C\",\"OpenSSL\",\"Naumen\",\"JasPer-2.0\",\"EFL-1.0\",\"EFL-2.0\",\"MIT-advertising\",\"MIT-enna\",\"MIT-CMU\",\"APSL-1.0\",\"Beerware\",\"CECILL-1.0\",\"CECILL-1.1\",\"CECILL-2.0\",\"CECILL-2.1\",\"CECILL-B\",\"CNRI-Jython\",\"CNRI-Python\",\"CNRI-Python-GPL-Compatible\",\"Condor-1.1\",\"MIT-feh\",\"FTL\",\"ICU\",\"Ruby\",\"Sendmail\",\"iMatix\",\"xinetd\",\"ZPL-1.1\",\"ZPL-2.0\",\"ZPL-2.1\",\"TCL\"],\"Weakly Protective\":[\"LGPL-2.0\",\"LGPL-2.1\",\"LGPL-2.1+\",\"LGPL-3.0\",\"LGPL-3.0+\",\"MPL-2.0\",\"MPL-1.0\",\"MPL-1.1\",\"MPL-2.0-no-copyleft-exception\",\"CDDL-1.0\",\"CDDL-1.1\",\"MS-PL\",\"Sleepycat\",\"ClArtistic\",\"Artistic-1.0\",\"Artistic-1.0-Perl\",\"Artistic-1.0-cl8\",\"APSL-1.1\",\"APSL-1.2\",\"APSL-2.0\",\"LPPL-1.0\",\"LPPL-1.1\",\"LPPL-1.2\",\"LPPL-1.3a\",\"LPPL-1.3c\",\"CPAL-1.0\",\"CATOSL-1.1\",\"CUA-OPL-1.0\",\"ErlPL-1.1\",\"gSOAP-1.3b\",\"IPL-1.0\",\"NASA-1.3\",\"NOSL\",\"Nokia\",\"RHeCos-1.1\",\"RSCPL\",\"SugarCRM-1.1.3\",\"SISSL\",\"SISSL-1.2\",\"SPL-1.0\",\"Zimbra-1.3\",\"Zimbra-1.4\",\"BitTorrent-1.0\",\"BitTorrent-1.1\",\"CECILL-C\",\"Motosoto\",\"MS-LRL\",\"Watcom-1.0\",\"YPL-1.0\",\"YPL-1.1\",\"Interbase-1.0\"],\"Strongly Protective\":[\"CPL-1.0\",\"GPL-1.0\",\"GPL-3.0\",\"GPL-3.0+\",\"GPL-2.0\",\"GPL-2.0+\",\"MS-RL\",\"ODbL-1.0\",\"OSL-1.0\",\"OSL-1.1\",\"OSL-2.0\",\"OSL-2.1\",\"OSL-3.0\",\"RPL-1.1\",\"RPL-1.5\",\"APL-1.0\",\"EPL-1.0\",\"EPL-2.0\",\"EUPL-1.0\",\"EUPL-1.1\",\"IPA\",\"Vim\"],\"Network Protective\":[\"AGPL-1.0\",\"AGPL-3.0\",\"AGPL-3.0-only\",\"AGPL-3.0-or-later\",\"AGPL-1.0-only\",\"AGPL-1.0-or-later\"],\"Uncategorized\":[\"0BSD\",\"AAL\",\"Abstyles\",\"Adobe-2006\",\"Adobe-Glyph\",\"ADSL\",\"Afmparse\",\"Aladdin\",\"AMDPLPA\",\"AML\",\"AMPAS\",\"ANTLR-PD\",\"APAFML\",\"Bahyph\",\"Barr\",\"Borceux\",\"BSD-Protection\",\"BSD-Source-Code\",\"BSL-1.0\",\"bzip2-1.0.5\",\"bzip2-1.0.6\",\"Caldera\",\"CC-BY-1.0\",\"CC-BY-2.0\",\"CC-BY-2.5\",\"CC-BY-3.0\",\"CC-BY-4.0\",\"CC-BY-NC-1.0\",\"CC-BY-NC-2.0\",\"CC-BY-NC-2.5\",\"CC-BY-NC-3.0\",\"CC-BY-NC-4.0\",\"CC-BY-NC-ND-1.0\",\"CC-BY-NC-ND-2.0\",\"CC-BY-NC-ND-2.5\",\"CC-BY-NC-ND-3.0\",\"CC-BY-NC-ND-4.0\",\"CC-BY-NC-SA-1.0\",\"CC-BY-NC-SA-2.0\",\"CC-BY-NC-SA-2.5\",\"CC-BY-NC-SA-3.0\",\"CC-BY-NC-SA-4.0\",\"CC-BY-ND-1.0\",\"CC-BY-ND-2.0\",\"CC-BY-ND-2.5\",\"CC-BY-ND-3.0\",\"CC-BY-ND-4.0\",\"CC-BY-SA-1.0\",\"CC-BY-SA-2.0\",\"CC-BY-SA-2.5\",\"CC-BY-SA-3.0\",\"CC-BY-SA-4.0\",\"CPOL-1.02\",\"Crossword\",\"CrystalStacker\",\"Cube\",\"curl\",\"D-FSL-1.0\",\"diffmark\",\"DOC\",\"Dotseqn\",\"dvipdfm\",\"ECL-1.0\",\"eGenix\",\"Entessa\",\"EUDatagrid\",\"Eurosym\",\"Fair\",\"Frameworx-1.0\",\"FreeImage\",\"FSFAP\",\"FSFUL\",\"FSFULLR\",\"GFDL-1.1\",\"GFDL-1.2\",\"GFDL-1.3\",\"Giftware\",\"GL2PS\",\"Glide\",\"Glulxe\",\"gnuplot\",\"HaskellReport\",\"HPND\",\"IBM-pibs\",\"IJG\",\"ImageMagick\",\"Imlib2\",\"Info-ZIP\",\"Intel\",\"Intel-ACPI\",\"JSON\",\"LAL-1.2\",\"LAL-1.3\",\"Latex2e\",\"Leptonica\",\"LGPLLR\",\"Libpng\",\"libtiff\",\"LiLiQ-P-1.1\",\"LiLiQ-R-1.1\",\"LiLiQ-Rplus-1.1\",\"LPL-1.0\",\"LPL-1.02\",\"MakeIndex\",\"MirOS\",\"MITNFA\",\"mpich2\",\"MTLL\",\"Multics\",\"Mup\",\"NBPL-1.0\",\"NCSA\",\"Net-SNMP\",\"NetCDF\",\"Newsletr\",\"NGPL\",\"NLOD-1.0\",\"NLPL\",\"Noweb\",\"NPL-1.0\",\"NPL-1.1\",\"NPOSL-3.0\",\"NRL\",\"NTP\",\"Nunit\",\"OCCT-PL\",\"OCLC-2.0\",\"OFL-1.0\",\"OFL-1.1\",\"OGTSL\",\"OML\",\"OPL-1.0\",\"OSET-PL-2.1\",\"Plexus\",\"PostgreSQL\",\"psfrag\",\"psutils\",\"Qhull\",\"QPL-1.0\",\"Rdisc\",\"RPSL-1.0\",\"RSA-MD\",\"Saxpath\",\"SCEA\",\"SGI-B-1.0\",\"SGI-B-1.1\",\"SGI-B-2.0\",\"SimPL-2.0\",\"SMLNJ\",\"SMPPL\",\"SNIA\",\"Spencer-86\",\"Spencer-94\",\"Spencer-99\",\"SWL\",\"TCP-wrappers\",\"TMate\",\"TORQUE-1.1\",\"TOSL\",\"Unicode-DFS-2015\",\"Unicode-DFS-2016\",\"Unicode-TOU\",\"UPL-1.0\",\"VOSTROM\",\"VSL-1.0\",\"Wsuipa\",\"Xerox\",\"Xnet\",\"xpp\",\"XSkat\",\"Zed\",\"Zend-2.0\"]}");


var $3a45484f07f4a447$exports = {};
var $5d09e9b09441750e$exports = {};
/*

The MIT License (MIT)

Original Library
  - Copyright (c) Marak Squires

Additional functionality
 - Copyright (c) Sindre Sorhus <sindresorhus@gmail.com> (sindresorhus.com)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

*/ var $5d09e9b09441750e$var$colors = {};
$5d09e9b09441750e$exports = $5d09e9b09441750e$var$colors;
$5d09e9b09441750e$var$colors.themes = {};


var $5d09e9b09441750e$var$ansiStyles = $5d09e9b09441750e$var$colors.styles = (parcelRequire("48aqD"));
var $5d09e9b09441750e$var$defineProps = Object.defineProperties;
var $5d09e9b09441750e$var$newLineRegex = new RegExp(/[\r\n]+/g);

$5d09e9b09441750e$var$colors.supportsColor = (parcelRequire("35O5W")).supportsColor;
if (typeof $5d09e9b09441750e$var$colors.enabled === 'undefined') $5d09e9b09441750e$var$colors.enabled = $5d09e9b09441750e$var$colors.supportsColor() !== false;
$5d09e9b09441750e$var$colors.enable = function() {
    $5d09e9b09441750e$var$colors.enabled = true;
};
$5d09e9b09441750e$var$colors.disable = function() {
    $5d09e9b09441750e$var$colors.enabled = false;
};
$5d09e9b09441750e$var$colors.stripColors = $5d09e9b09441750e$var$colors.strip = function(str) {
    return ('' + str).replace(/\x1B\[\d+m/g, '');
};
// eslint-disable-next-line no-unused-vars
var $5d09e9b09441750e$var$stylize = $5d09e9b09441750e$var$colors.stylize = function stylize(str, style) {
    if (!$5d09e9b09441750e$var$colors.enabled) return str + '';
    var styleMap = $5d09e9b09441750e$var$ansiStyles[style];
    // Stylize should work for non-ANSI styles, too
    if (!styleMap && style in $5d09e9b09441750e$var$colors) // Style maps like trap operate as functions on strings;
    // they don't have properties like open or close.
    return $5d09e9b09441750e$var$colors[style](str);
    return styleMap.open + str + styleMap.close;
};
var $5d09e9b09441750e$var$matchOperatorsRe = /[|\\{}()[\]^$+*?.]/g;
var $5d09e9b09441750e$var$escapeStringRegexp = function(str) {
    if (typeof str !== 'string') throw new TypeError('Expected a string');
    return str.replace($5d09e9b09441750e$var$matchOperatorsRe, '\\$&');
};
function $5d09e9b09441750e$var$build(_styles) {
    var builder1 = function builder() {
        return $5d09e9b09441750e$var$applyStyle.apply(builder, arguments);
    };
    builder1._styles = _styles;
    // __proto__ is used because we must return a function, but there is
    // no way to create a function with a different prototype.
    builder1.__proto__ = $5d09e9b09441750e$var$proto;
    return builder1;
}
var $5d09e9b09441750e$var$styles = function() {
    var ret = {};
    $5d09e9b09441750e$var$ansiStyles.grey = $5d09e9b09441750e$var$ansiStyles.gray;
    Object.keys($5d09e9b09441750e$var$ansiStyles).forEach(function(key) {
        $5d09e9b09441750e$var$ansiStyles[key].closeRe = new RegExp($5d09e9b09441750e$var$escapeStringRegexp($5d09e9b09441750e$var$ansiStyles[key].close), 'g');
        ret[key] = {
            get: function() {
                return $5d09e9b09441750e$var$build(this._styles.concat(key));
            }
        };
    });
    return ret;
}();
var $5d09e9b09441750e$var$proto = $5d09e9b09441750e$var$defineProps(function colors() {}, $5d09e9b09441750e$var$styles);
function $5d09e9b09441750e$var$applyStyle() {
    var args = Array.prototype.slice.call(arguments);
    var str = args.map(function(arg) {
        // Use weak equality check so we can colorize null/undefined in safe mode
        if (arg != null && arg.constructor === String) return arg;
        else return $e6uBX$util.inspect(arg);
    }).join(' ');
    if (!$5d09e9b09441750e$var$colors.enabled || !str) return str;
    var newLinesPresent = str.indexOf('\n') != -1;
    var nestedStyles = this._styles;
    var i = nestedStyles.length;
    while(i--){
        var code = $5d09e9b09441750e$var$ansiStyles[nestedStyles[i]];
        str = code.open + str.replace(code.closeRe, code.open) + code.close;
        if (newLinesPresent) str = str.replace($5d09e9b09441750e$var$newLineRegex, function(match) {
            return code.close + match + code.open;
        });
    }
    return str;
}
$5d09e9b09441750e$var$colors.setTheme = function(theme) {
    if (typeof theme === 'string') {
        console.log("colors.setTheme now only accepts an object, not a string.  If you are trying to set a theme from a file, it is now your (the caller's) responsibility to require the file.  The old syntax looked like colors.setTheme(__dirname + '/../themes/generic-logging.js'); The new syntax looks like colors.setTheme(require(__dirname + '/../themes/generic-logging.js'));");
        return;
    }
    for(var style1 in theme)(function(style) {
        $5d09e9b09441750e$var$colors[style] = function(str) {
            if (typeof theme[style] === 'object') {
                var out = str;
                for(var i in theme[style])out = $5d09e9b09441750e$var$colors[theme[style][i]](out);
                return out;
            }
            return $5d09e9b09441750e$var$colors[theme[style]](str);
        };
    })(style1);
};
function $5d09e9b09441750e$var$init() {
    var ret = {};
    Object.keys($5d09e9b09441750e$var$styles).forEach(function(name) {
        ret[name] = {
            get: function() {
                return $5d09e9b09441750e$var$build([
                    name
                ]);
            }
        };
    });
    return ret;
}
var $5d09e9b09441750e$var$sequencer = function sequencer(map, str) {
    var exploded = str.split('');
    exploded = exploded.map(map);
    return exploded.join('');
};

// custom formatter methods
$5d09e9b09441750e$var$colors.trap = (parcelRequire("b7sUK"));

$5d09e9b09441750e$var$colors.zalgo = (parcelRequire("iOrog"));
// maps
$5d09e9b09441750e$var$colors.maps = {};

$5d09e9b09441750e$var$colors.maps.america = (parcelRequire("cQcx2"))($5d09e9b09441750e$var$colors);

$5d09e9b09441750e$var$colors.maps.zebra = (parcelRequire("bxgLd"))($5d09e9b09441750e$var$colors);

$5d09e9b09441750e$var$colors.maps.rainbow = (parcelRequire("1a5m0"))($5d09e9b09441750e$var$colors);

$5d09e9b09441750e$var$colors.maps.random = (parcelRequire("lDR15"))($5d09e9b09441750e$var$colors);
for(var $5d09e9b09441750e$var$map in $5d09e9b09441750e$var$colors.maps)(function(map) {
    $5d09e9b09441750e$var$colors[map] = function(str) {
        return $5d09e9b09441750e$var$sequencer($5d09e9b09441750e$var$colors.maps[map], str);
    };
})($5d09e9b09441750e$var$map);
$5d09e9b09441750e$var$defineProps($5d09e9b09441750e$var$colors, $5d09e9b09441750e$var$init());


$3a45484f07f4a447$exports = $5d09e9b09441750e$exports;




var $f9a7e7ce5ac1f42c$exports = {};
'use strict';
var $3ac0252b8bad2590$exports = {};
'use strict';


var $3ac0252b8bad2590$var$licenses = [].concat((parcelRequire("9eP0T"))).concat((parcelRequire("8tSRU")));
var $c9288e72b41dd8f4$exports = {};
$c9288e72b41dd8f4$exports = JSON.parse("[\"389-exception\",\"Autoconf-exception-2.0\",\"Autoconf-exception-3.0\",\"Bison-exception-2.2\",\"Bootloader-exception\",\"Classpath-exception-2.0\",\"CLISP-exception-2.0\",\"DigiRule-FOSS-exception\",\"eCos-exception-2.0\",\"Fawkes-Runtime-exception\",\"FLTK-exception\",\"Font-exception-2.0\",\"freertos-exception-2.0\",\"GCC-exception-2.0\",\"GCC-exception-3.1\",\"gnu-javamail-exception\",\"GPL-3.0-linking-exception\",\"GPL-3.0-linking-source-exception\",\"GPL-CC-1.0\",\"i2p-gpl-java-exception\",\"Libtool-exception\",\"Linux-syscall-note\",\"LLVM-exception\",\"LZMA-exception\",\"mif-exception\",\"Nokia-Qt-exception-1.1\",\"OCaml-LGPL-linking-exception\",\"OCCT-exception-1.0\",\"OpenJDK-assembly-exception-1.0\",\"openvpn-openssl-exception\",\"PS-or-PDF-font-exception-20170817\",\"Qt-GPL-exception-1.0\",\"Qt-LGPL-exception-1.1\",\"Qwt-exception-1.0\",\"Swift-exception\",\"u-boot-exception-2.0\",\"Universal-FOSS-exception-1.0\",\"WxWindows-exception-3.1\"]");


$3ac0252b8bad2590$exports = function(source) {
    var index = 0;
    function hasMore() {
        return index < source.length;
    }
    // `value` can be a regexp or a string.
    // If it is recognized, the matching source string is returned and
    // the index is incremented. Otherwise `undefined` is returned.
    function read(value) {
        if (value instanceof RegExp) {
            var chars = source.slice(index);
            var match = chars.match(value);
            if (match) {
                index += match[0].length;
                return match[0];
            }
        } else if (source.indexOf(value, index) === index) {
            index += value.length;
            return value;
        }
    }
    function skipWhitespace() {
        read(/[ ]*/);
    }
    function operator() {
        var string;
        var possibilities = [
            'WITH',
            'AND',
            'OR',
            '(',
            ')',
            ':',
            '+'
        ];
        for(var i = 0; i < possibilities.length; i++){
            string = read(possibilities[i]);
            if (string) break;
        }
        if (string === '+' && index > 1 && source[index - 2] === ' ') throw new Error('Space before `+`');
        return string && {
            type: 'OPERATOR',
            string: string
        };
    }
    function idstring() {
        return read(/[A-Za-z0-9-.]+/);
    }
    function expectIdstring() {
        var string = idstring();
        if (!string) throw new Error('Expected idstring at offset ' + index);
        return string;
    }
    function documentRef() {
        if (read('DocumentRef-')) {
            var string = expectIdstring();
            return {
                type: 'DOCUMENTREF',
                string: string
            };
        }
    }
    function licenseRef() {
        if (read('LicenseRef-')) {
            var string = expectIdstring();
            return {
                type: 'LICENSEREF',
                string: string
            };
        }
    }
    function identifier() {
        var begin = index;
        var string = idstring();
        if ($3ac0252b8bad2590$var$licenses.indexOf(string) !== -1) return {
            type: 'LICENSE',
            string: string
        };
        else if ($c9288e72b41dd8f4$exports.indexOf(string) !== -1) return {
            type: 'EXCEPTION',
            string: string
        };
        index = begin;
    }
    // Tries to read the next token. Returns `undefined` if no token is
    // recognized.
    function parseToken() {
        // Ordering matters
        return operator() || documentRef() || licenseRef() || identifier();
    }
    var tokens = [];
    while(hasMore()){
        skipWhitespace();
        if (!hasMore()) break;
        var token = parseToken();
        if (!token) throw new Error('Unexpected `' + source[index] + '` at offset ' + index);
        tokens.push(token);
    }
    return tokens;
};


var $cf2f41458d9db1bd$exports = {};
'use strict';
// The ABNF grammar in the spec is totally ambiguous.
//
// This parser follows the operator precedence defined in the
// `Order of Precedence and Parentheses` section.
$cf2f41458d9db1bd$exports = function(tokens) {
    var index = 0;
    function hasMore() {
        return index < tokens.length;
    }
    function token() {
        return hasMore() ? tokens[index] : null;
    }
    function next() {
        if (!hasMore()) throw new Error();
        index++;
    }
    function parseOperator(operator) {
        var t = token();
        if (t && t.type === 'OPERATOR' && operator === t.string) {
            next();
            return t.string;
        }
    }
    function parseWith() {
        if (parseOperator('WITH')) {
            var t = token();
            if (t && t.type === 'EXCEPTION') {
                next();
                return t.string;
            }
            throw new Error('Expected exception after `WITH`');
        }
    }
    function parseLicenseRef() {
        // TODO: Actually, everything is concatenated into one string
        // for backward-compatibility but it could be better to return
        // a nice structure.
        var begin = index;
        var string = '';
        var t = token();
        if (t.type === 'DOCUMENTREF') {
            next();
            string += 'DocumentRef-' + t.string + ':';
            if (!parseOperator(':')) throw new Error('Expected `:` after `DocumentRef-...`');
        }
        t = token();
        if (t.type === 'LICENSEREF') {
            next();
            string += 'LicenseRef-' + t.string;
            return {
                license: string
            };
        }
        index = begin;
    }
    function parseLicense() {
        var t = token();
        if (t && t.type === 'LICENSE') {
            next();
            var node = {
                license: t.string
            };
            if (parseOperator('+')) node.plus = true;
            var exception = parseWith();
            if (exception) node.exception = exception;
            return node;
        }
    }
    function parseParenthesizedExpression() {
        var left = parseOperator('(');
        if (!left) return;
        var expr = parseExpression();
        if (!parseOperator(')')) throw new Error('Expected `)`');
        return expr;
    }
    function parseAtom() {
        return parseParenthesizedExpression() || parseLicenseRef() || parseLicense();
    }
    function makeBinaryOpParser(operator, nextParser) {
        return function parseBinaryOp() {
            var left = nextParser();
            if (!left) return;
            if (!parseOperator(operator)) return left;
            var right = parseBinaryOp();
            if (!right) throw new Error('Expected expression');
            return {
                left: left,
                conjunction: operator.toLowerCase(),
                right: right
            };
        };
    }
    var parseAnd = makeBinaryOpParser('AND', parseAtom);
    var parseExpression = makeBinaryOpParser('OR', parseAnd);
    var node1 = parseExpression();
    if (!node1 || hasMore()) throw new Error('Syntax error');
    return node1;
};


$f9a7e7ce5ac1f42c$exports = function(source) {
    return $cf2f41458d9db1bd$exports($3ac0252b8bad2590$exports(source));
};



var $4c634d58f8d330ba$exports = {};
var $c084d55693733913$export$dafeacbfe3530cd9;
var $c084d55693733913$export$b961576059b7aeb6;
var $c084d55693733913$export$9663ddc1cf085b32;
var $4e9f37185c9cb2a0$exports = {};
'use strict';
$4e9f37185c9cb2a0$exports = function(arr, predicate, ctx) {
    if (typeof Array.prototype.findIndex === 'function') return arr.findIndex(predicate, ctx);
    if (typeof predicate !== 'function') throw new TypeError('predicate must be a function');
    var list = Object(arr);
    var len = list.length;
    if (len === 0) return -1;
    for(var i = 0; i < len; i++){
        if (predicate.call(ctx, list[i], i, list)) return i;
    }
    return -1;
};



var $83800c614558c1d5$exports = {};
$83800c614558c1d5$exports = JSON.parse("[[\"AFL-1.1\",\"AFL-1.2\",\"AFL-2.0\",\"AFL-2.1\",\"AFL-3.0\"],[\"AGPL-1.0\",[\"AGPL-3.0\",\"AGPL-3.0-only\"]],[\"Apache-1.0\",\"Apache-1.1\",\"Apache-2.0\"],[\"APSL-1.0\",\"APSL-1.1\",\"APSL-1.2\",\"APSL-2.0\"],[\"Artistic-1.0\",\"Artistic-2.0\"],[\"BitTorrent-1.0\",\"BitTorrent-1.1\"],[\"CC-BY-1.0\",\"CC-BY-2.0\",\"CC-BY-2.5\",\"CC-BY-3.0\",\"CC-BY-4.0\"],[\"CC-BY-NC-1.0\",\"CC-BY-NC-2.0\",\"CC-BY-NC-2.5\",\"CC-BY-NC-3.0\",\"CC-BY-NC-4.0\"],[\"CC-BY-NC-ND-1.0\",\"CC-BY-NC-ND-2.0\",\"CC-BY-NC-ND-2.5\",\"CC-BY-NC-ND-3.0\",\"CC-BY-NC-ND-4.0\"],[\"CC-BY-NC-SA-1.0\",\"CC-BY-NC-SA-2.0\",\"CC-BY-NC-SA-2.5\",\"CC-BY-NC-SA-3.0\",\"CC-BY-NC-SA-4.0\"],[\"CC-BY-ND-1.0\",\"CC-BY-ND-2.0\",\"CC-BY-ND-2.5\",\"CC-BY-ND-3.0\",\"CC-BY-ND-4.0\"],[\"CC-BY-SA-1.0\",\"CC-BY-SA-2.0\",\"CC-BY-SA-2.5\",\"CC-BY-SA-3.0\",\"CC-BY-SA-4.0\"],[\"CDDL-1.0\",\"CDDL-1.1\"],[\"CECILL-1.0\",\"CECILL-1.1\",\"CECILL-2.0\"],[\"ECL-1.0\",\"ECL-2.0\"],[\"EFL-1.0\",\"EFL-2.0\"],[\"EPL-1.0\",\"EPL-2.0\"],[\"EUPL-1.0\",\"EUPL-1.1\"],[[\"GFDL-1.1\",\"GFDL-1.1-only\"],[\"GFDL-1.2\",\"GFDL-1.2-only\"],[\"GFDL-1.1-or-later\",\"GFDL-1.2-or-later\",\"GFDL-1.3\",\"GFDL-1.3-only\",\"GFDL-1.3-or-later\"]],[[\"GPL-1.0\",\"GPL-1.0-only\"],[\"GPL-2.0\",\"GPL-2.0-only\"],[\"GPL-1.0-or-later\",\"GPL-2.0-or-later\",\"GPL-3.0\",\"GPL-3.0-only\",\"GPL-3.0-or-later\"]],[[\"LGPL-2.0\",\"LGPL-2.0-only\"],[\"LGPL-2.1\",\"LGPL-2.1-only\"],[\"LGPL-2.0-or-later\",\"LGPL-2.1-or-later\",\"LGPL-3.0\",\"LGPL-3.0-only\",\"LGPL-3.0-or-later\"]],[\"LPL-1.0\",\"LPL-1.02\"],[\"LPPL-1.0\",\"LPPL-1.1\",\"LPPL-1.2\",\"LPPL-1.3a\",\"LPPL-1.3c\"],[\"MPL-1.0\",\"MPL-1.1\",\"MPL-2.0\"],[\"MPL-1.0\",\"MPL-1.1\",\"MPL-2.0-no-copyleft-exception\"],[\"NPL-1.0\",\"NPL-1.1\"],[\"OFL-1.0\",\"OFL-1.1\"],[\"OLDAP-1.1\",\"OLDAP-1.2\",\"OLDAP-1.3\",\"OLDAP-1.4\",\"OLDAP-2.0\",\"OLDAP-2.0.1\",\"OLDAP-2.1\",\"OLDAP-2.2\",\"OLDAP-2.2.1\",\"OLDAP-2.2.2\",\"OLDAP-2.3\",\"OLDAP-2.4\",\"OLDAP-2.5\",\"OLDAP-2.6\",\"OLDAP-2.7\",\"OLDAP-2.8\"],[\"OSL-1.0\",\"OSL-1.1\",\"OSL-2.0\",\"OSL-2.1\",\"OSL-3.0\"],[\"PHP-3.0\",\"PHP-3.01\"],[\"RPL-1.1\",\"RPL-1.5\"],[\"SGI-B-1.0\",\"SGI-B-1.1\",\"SGI-B-2.0\"],[\"YPL-1.0\",\"YPL-1.1\"],[\"ZPL-1.1\",\"ZPL-2.0\",\"ZPL-2.1\"],[\"Zimbra-1.3\",\"Zimbra-1.4\"],[\"bzip2-1.0.5\",\"bzip2-1.0.6\"]]");


var $c084d55693733913$var$notALicenseIdentifier = ' is not a simple license identifier';
var $c084d55693733913$var$rangeComparison = function(comparison) {
    return function(first, second) {
        var firstAST = $f9a7e7ce5ac1f42c$exports(first);
        if (!firstAST.hasOwnProperty('license')) throw new Error('"' + first + '"' + $c084d55693733913$var$notALicenseIdentifier);
        var secondAST = $f9a7e7ce5ac1f42c$exports(second);
        if (!secondAST.hasOwnProperty('license')) throw new Error('"' + second + '"' + $c084d55693733913$var$notALicenseIdentifier);
        return $83800c614558c1d5$exports.some(function(range) {
            var firstLicense = firstAST.license;
            var indexOfFirst = $4e9f37185c9cb2a0$exports(range, function(element) {
                return element === firstLicense || Array.isArray(element) && element.indexOf(firstLicense) !== -1;
            });
            if (indexOfFirst < 0) return false;
            var secondLicense = secondAST.license;
            var indexOfSecond = $4e9f37185c9cb2a0$exports(range, function(element) {
                return element === secondLicense || Array.isArray(element) && element.indexOf(secondLicense) !== -1;
            });
            if (indexOfSecond < 0) return false;
            return comparison(indexOfFirst, indexOfSecond);
        });
    };
};
$c084d55693733913$export$dafeacbfe3530cd9 = $c084d55693733913$var$rangeComparison(function(first, second) {
    return first > second;
});
$c084d55693733913$export$b961576059b7aeb6 = $c084d55693733913$var$rangeComparison(function(first, second) {
    return first < second;
});
$c084d55693733913$export$9663ddc1cf085b32 = $c084d55693733913$var$rangeComparison(function(first, second) {
    return first === second;
});




var $4c634d58f8d330ba$var$rangesAreCompatible = function(first, second) {
    return first.license === second.license || $83800c614558c1d5$exports.some(function(range) {
        return $4c634d58f8d330ba$var$licenseInRange(first.license, range) && $4c634d58f8d330ba$var$licenseInRange(second.license, range);
    });
};
function $4c634d58f8d330ba$var$licenseInRange(license, range) {
    return range.indexOf(license) !== -1 || range.some(function(element) {
        return Array.isArray(element) && element.indexOf(license) !== -1;
    });
}
var $4c634d58f8d330ba$var$identifierInRange = function(identifier, range) {
    return identifier.license === range.license || $c084d55693733913$export$dafeacbfe3530cd9(identifier.license, range.license) || $c084d55693733913$export$9663ddc1cf085b32(identifier.license, range.license);
};
var $4c634d58f8d330ba$var$licensesAreCompatible = function(first, second) {
    if (first.exception !== second.exception) return false;
    else if (second.hasOwnProperty('license')) {
        if (second.hasOwnProperty('plus')) {
            if (first.hasOwnProperty('plus')) // first+, second+
            return $4c634d58f8d330ba$var$rangesAreCompatible(first, second);
            else // first, second+
            return $4c634d58f8d330ba$var$identifierInRange(first, second);
        } else {
            if (first.hasOwnProperty('plus')) // first+, second
            return $4c634d58f8d330ba$var$identifierInRange(second, first);
            else // first, second
            return first.license === second.license;
        }
    }
};
function $4c634d58f8d330ba$var$normalizeGPLIdentifiers(argument) {
    var license = argument.license;
    if (license) {
        if ($4c634d58f8d330ba$var$endsWith(license, '-or-later')) {
            argument.license = license.replace('-or-later', '');
            argument.plus = true;
        } else if ($4c634d58f8d330ba$var$endsWith(license, '-only')) {
            argument.license = license.replace('-or-later', '');
            delete argument.plus;
        }
    } else if (argument.left && argument.right) {
        argument.left = $4c634d58f8d330ba$var$normalizeGPLIdentifiers(argument.left);
        argument.right = $4c634d58f8d330ba$var$normalizeGPLIdentifiers(argument.right);
    }
    return argument;
}
function $4c634d58f8d330ba$var$endsWith(string, substring) {
    return string.indexOf(substring) === string.length - substring.length;
}
function $4c634d58f8d330ba$var$licenseString(e) {
    if (e.hasOwnProperty('noassertion')) return 'NOASSERTION';
    if (e.license) return `${e.license}${e.plus ? '+' : ''}${e.exception ? ` WITH ${e.exception}` : ''}`;
}
// Expand the given expression into an equivalent array where each member is an array of licenses AND'd
// together and the members are OR'd together. For example, `(MIT OR ISC) AND GPL-3.0` expands to
// `[[GPL-3.0 AND MIT], [ISC AND MIT]]`. Note that within each array of licenses, the entries are
// normalized (sorted) by license name.
function $4c634d58f8d330ba$var$expand(expression) {
    return $4c634d58f8d330ba$var$sort($4c634d58f8d330ba$var$expandInner(expression));
}
// Flatten the given expression into an array of all licenses mentioned in the expression.
function $4c634d58f8d330ba$var$flatten(expression) {
    var expanded = $4c634d58f8d330ba$var$expandInner(expression);
    var flattened = expanded.reduce(function(result, clause) {
        return Object.assign(result, clause);
    }, {});
    return $4c634d58f8d330ba$var$sort([
        flattened
    ])[0];
}
function $4c634d58f8d330ba$var$expandInner(expression) {
    if (!expression.conjunction) return [
        {
            [$4c634d58f8d330ba$var$licenseString(expression)]: expression
        }
    ];
    if (expression.conjunction === 'or') return $4c634d58f8d330ba$var$expandInner(expression.left).concat($4c634d58f8d330ba$var$expandInner(expression.right));
    if (expression.conjunction === 'and') {
        var left = $4c634d58f8d330ba$var$expandInner(expression.left);
        var right = $4c634d58f8d330ba$var$expandInner(expression.right);
        return left.reduce(function(result, l) {
            right.forEach(function(r) {
                result.push(Object.assign({}, l, r));
            });
            return result;
        }, []);
    }
}
function $4c634d58f8d330ba$var$sort(licenseList) {
    var sortedLicenseLists = licenseList.filter(function(e) {
        return Object.keys(e).length;
    }).map(function(e) {
        return Object.keys(e).sort();
    });
    return sortedLicenseLists.map(function(list, i) {
        return list.map(function(license) {
            return licenseList[i][license];
        });
    });
}
function $4c634d58f8d330ba$var$isANDCompatible(one, two) {
    return one.every(function(o) {
        return two.some(function(t) {
            return $4c634d58f8d330ba$var$licensesAreCompatible(o, t);
        });
    });
}
function $4c634d58f8d330ba$var$satisfies(first, second) {
    var one = $4c634d58f8d330ba$var$expand($4c634d58f8d330ba$var$normalizeGPLIdentifiers($f9a7e7ce5ac1f42c$exports(first)));
    var two = $4c634d58f8d330ba$var$flatten($4c634d58f8d330ba$var$normalizeGPLIdentifiers($f9a7e7ce5ac1f42c$exports(second)));
    return one.some(function(o) {
        return $4c634d58f8d330ba$var$isANDCompatible(o, two);
    });
}
$4c634d58f8d330ba$exports = $4c634d58f8d330ba$var$satisfies;


const /** @private */ $04945d2fdf2733ca$var$licenseTypes = {
    'publicDomain': 'Public Domain',
    'permissive': 'Permissive',
    'weaklyProtective': 'Weakly Protective',
    'stronglyProtectivee': 'Strongly Protective',
    'networkProtective': 'Network Protective',
    'unknown': 'Unknown',
    'unlicensed': 'Unlicensed'
}, // var correct = require('spdx-correct');
/** @private */ /*
var correctedLicense = function(license) {
    return license ? correct(license) : licenseTypes.unlicensed;
};
*/ /** @private */ $04945d2fdf2733ca$var$license_type = function(license) {
    // license = license ? license.replace('+', '') : licenseTypes.unlicensed;
    // gives false positives try MMIT
    // license = correctedLicense(license);
    if (!license) // console.log('NO license found:', license);
    return $04945d2fdf2733ca$var$licenseTypes.unlicensed;
    else if ($2fac1a452ed7d733$exports[$04945d2fdf2733ca$var$licenseTypes.publicDomain].indexOf(license) >= 0) return $04945d2fdf2733ca$var$licenseTypes.publicDomain;
    else if ($2fac1a452ed7d733$exports[$04945d2fdf2733ca$var$licenseTypes.permissive].indexOf(license) >= 0) return $04945d2fdf2733ca$var$licenseTypes.permissive;
    else if ($2fac1a452ed7d733$exports[$04945d2fdf2733ca$var$licenseTypes.weaklyProtective].indexOf(license) >= 0) return $04945d2fdf2733ca$var$licenseTypes.weaklyProtective;
    else if ($2fac1a452ed7d733$exports[$04945d2fdf2733ca$var$licenseTypes.stronglyProtectivee].indexOf(license) >= 0) return $04945d2fdf2733ca$var$licenseTypes.stronglyProtectivee;
    else if ($2fac1a452ed7d733$exports[$04945d2fdf2733ca$var$licenseTypes.networkProtective].indexOf(license) >= 0) return $04945d2fdf2733ca$var$licenseTypes.networkProtective;
    else // console.log('Unknown license type:', license);
    return $04945d2fdf2733ca$var$licenseTypes.unknown;
}, /** @private */ $04945d2fdf2733ca$var$forward_compatiblity = function(pkgLicenseType, moduleLicenseType) {
    switch(moduleLicenseType){
        case $04945d2fdf2733ca$var$licenseTypes.unlicensed:
            return false;
        case $04945d2fdf2733ca$var$licenseTypes.unknown:
            return false;
        case $04945d2fdf2733ca$var$licenseTypes.publicDomain:
            return [
                $04945d2fdf2733ca$var$licenseTypes.unlicensed,
                $04945d2fdf2733ca$var$licenseTypes.unknown,
                $04945d2fdf2733ca$var$licenseTypes.publicDomain,
                $04945d2fdf2733ca$var$licenseTypes.permissive,
                $04945d2fdf2733ca$var$licenseTypes.weaklyProtective,
                $04945d2fdf2733ca$var$licenseTypes.stronglyProtectivee,
                $04945d2fdf2733ca$var$licenseTypes.networkProtective
            ].indexOf(pkgLicenseType) >= 0;
        case $04945d2fdf2733ca$var$licenseTypes.permissive:
            return [
                $04945d2fdf2733ca$var$licenseTypes.unlicensed,
                $04945d2fdf2733ca$var$licenseTypes.permissive,
                $04945d2fdf2733ca$var$licenseTypes.weaklyProtective,
                $04945d2fdf2733ca$var$licenseTypes.stronglyProtectivee,
                $04945d2fdf2733ca$var$licenseTypes.networkProtective
            ].indexOf(pkgLicenseType) >= 0;
        case $04945d2fdf2733ca$var$licenseTypes.weaklyProtective:
            return [
                $04945d2fdf2733ca$var$licenseTypes.unlicensed,
                $04945d2fdf2733ca$var$licenseTypes.weaklyProtective,
                $04945d2fdf2733ca$var$licenseTypes.stronglyProtectivee,
                $04945d2fdf2733ca$var$licenseTypes.networkProtective
            ].indexOf(pkgLicenseType) >= 0;
        case $04945d2fdf2733ca$var$licenseTypes.stronglyProtectivee:
            return [
                $04945d2fdf2733ca$var$licenseTypes.unlicensed,
                $04945d2fdf2733ca$var$licenseTypes.stronglyProtectivee,
                $04945d2fdf2733ca$var$licenseTypes.networkProtective
            ].indexOf(pkgLicenseType) >= 0;
        case $04945d2fdf2733ca$var$licenseTypes.networkProtective:
            return [
                $04945d2fdf2733ca$var$licenseTypes.unlicensed,
                $04945d2fdf2733ca$var$licenseTypes.networkProtective
            ].indexOf(pkgLicenseType) >= 0;
        default:
            // console.log('Unknown license',module_license,'('+moduleLicenseType+')');
            return false;
    }
};
/*
var https = require('https');

function getLicenses(callback) {
    return https.get({
        host: 'spdx.org',
        path: '/licenses/licenses.json'
    }, function(response) {
        var body = '';
        response.on('data', function(d) {
            body += d;
        });
        response.on('end', function() {
            // Data reception is done, do whatever with it!
            var parsed = JSON.parse(body);
            callback(parsed.licenses);
        });
    });
}
*/ /** @private */ /*
function compareLicenses(to) {
    getLicenses(function(licenses) {
        licenses.forEach(function(element, index, array) {
            if (!element.isDeprecatedLicenseId)
                console.log(element.licenseId + ' => ' + element.name, ' compatible: ', forward_compatiblity(to, element.licenseId));
            else
                console.log('DEPRECATED!', element.licenseId + ' -> ' + element.name, ' compatible:', forward_compatiblity(to, element.licenseId));
        });
    });
}
*/ // compareLicenses(pkg.license);
/**
 * Callback for license check.
 *
 * @callback licenseCheckCallback
 * @param {String} err - Information about the error.
 * @param {Boolean} passed - True if there were no license issues, otherwise false.
 * @param {string} output - Output to be printed to Console (including colors).
 */ /** @private */ function $04945d2fdf2733ca$var$checkProgress(progress, total, incompat, output, cb) {
    progress++;
    if (progress === total) {
        if (incompat) {
            output.push('');
            output.push($3a45484f07f4a447$exports.red('License issues found'));
            output.push('');
            // console.log(output.join(os.EOL));
            cb(null, false, output.join($e6uBX$os.EOL));
        } else {
            output.push('');
            output.push($3a45484f07f4a447$exports.green('No license issues found'));
            output.push('');
            // console.log(output.join(os.EOL));
            cb(null, true, output.join($e6uBX$os.EOL));
        }
    }
    return progress;
}
/**
 * @public
 * @function check
 * @description Check for licenses issues of the given project.json compared (flat) to a folder of node_modules
 * @param {string} pathOfPackageJson - The path of the package.json to check against
 * @param {string} dirs - List of node module directories
 * @param {licenseCheckCallback} cb - Callback for license check.
 * @example
 * var lcc = require('lcom');
 * var path = require('path');
 * lcc.check(path.join(process.cwd(),'package.json'), path.join(process.cwd(),"node_modules"), function(err, passed, output){
 *   if (err) console.log(err);
 *   else if (passed)
 *   {
 * 	   //No license issues found
 * 	   console.log(output);
 *   } else
 *   {
 * 	   //License issues found
 * 	   console.log(output);
 * 	   //process.exit(1);
 * 	   //or
 * 	   //throw new Error('License issues found');
 *   }
 * });
 */ function $04945d2fdf2733ca$var$check(pathOfPackageJson, dirs, cb) {
    let incompat = false, pkg = JSON.parse($e6uBX$fs.readFileSync(pathOfPackageJson, 'utf-8')), output = [], noLicenseStr = $3a45484f07f4a447$exports.red('No license'), pkgLicense = pkg.license ? typeof pkg.license === 'string' || pkg.license instanceof String ? pkg.license : pkg.license.type || pkgLicense : pkgLicense;
    pkgLicense = pkgLicense ? pkgLicense : pkg.licenses && pkg.licenses[0] && pkg.licenses[0].type ? typeof pkg.licenses[0].type === 'string' || pkg.licenses[0].type instanceof String ? pkg.licenses[0].type : pkg.licenses.type || pkgLicense : pkgLicense;
    let pkgLicenseType = $04945d2fdf2733ca$var$license_type(pkgLicense);
    output.push($3a45484f07f4a447$exports.yellow('Checking', $3a45484f07f4a447$exports.blue(pkgLicense ? pkgLicense : noLicenseStr), `(${pkgLicenseType})`, 'of', `${pkg.name}@${pkg.version}`, $e6uBX$os.EOL, 'in', $3a45484f07f4a447$exports.blue($e6uBX$path.resolve(pathOfPackageJson)), $e6uBX$os.EOL, 'against', `${$3a45484f07f4a447$exports.blue($e6uBX$path.resolve(pathOfPackageJson, '..'))}'s modules:`));
    output.push('');
    let pkgCompatiblityString;
    if (pkgLicenseType === $04945d2fdf2733ca$var$licenseTypes.unknown || pkgLicenseType === $04945d2fdf2733ca$var$licenseTypes.unlicensed) // incompat = true;
    pkgCompatiblityString = 'possibly incompatible';
    else pkgCompatiblityString = 'incompatible';
    let progress = 0, total = dirs.length;
    dirs.forEach((dir)=>{
        let packageJsonFile = $e6uBX$path.join(dir, 'package.json');
        try {
            $e6uBX$fs.accessSync(packageJsonFile);
            const data = $e6uBX$fs.readFileSync(packageJsonFile);
            console.log('Checking', `${packageJsonFile}; file`, progress + 1, 'of', total);
            let modulePkg = JSON.parse(data), moduleLicense = modulePkg.license ? typeof modulePkg.license === 'string' || modulePkg.license instanceof String ? modulePkg.license : modulePkg.license.type || null : null;
            moduleLicense = moduleLicense ? moduleLicense : modulePkg.licenses && modulePkg.licenses[0] && modulePkg.licenses[0].type ? typeof modulePkg.licenses[0].type === 'string' || modulePkg.licenses[0].type instanceof String ? modulePkg.licenses[0].type : pkg.licenses.type || moduleLicense : moduleLicense;
            let moduleLicenseType = $04945d2fdf2733ca$var$license_type(moduleLicense);
            let canFindSPDXLicense = false;
            try {
                $f9a7e7ce5ac1f42c$exports(moduleLicense);
                canFindSPDXLicense = true;
            } catch (e) {}
            if ((moduleLicenseType === $04945d2fdf2733ca$var$licenseTypes.unknown || moduleLicenseType === $04945d2fdf2733ca$var$licenseTypes.unlicensed) && !canFindSPDXLicense) // incompat = true;
            output.push(`${modulePkg.name}@${modulePkg.version} ${$3a45484f07f4a447$exports.red(moduleLicense ? moduleLicense : noLicenseStr)} ${$3a45484f07f4a447$exports.yellow(`(${moduleLicenseType}) - ${$3a45484f07f4a447$exports.red('possibly incompatible')} with ${$3a45484f07f4a447$exports.blue(pkgLicense ? pkgLicense : noLicenseStr)} (${pkgLicenseType})`)}`);
            else if (!$04945d2fdf2733ca$var$forward_compatiblity(pkgLicenseType, moduleLicenseType) && !$4c634d58f8d330ba$exports(pkgLicense, moduleLicense)) {
                incompat = true;
                output.push(`${modulePkg.name}@${modulePkg.version} ${$3a45484f07f4a447$exports.red(moduleLicense)} ${$3a45484f07f4a447$exports.yellow(`(${moduleLicenseType}) - ${$3a45484f07f4a447$exports.red(pkgCompatiblityString)} with ${$3a45484f07f4a447$exports.blue(pkgLicense ? pkgLicense : noLicenseStr)} (${pkgLicenseType})`)}`);
            } else output.push(`${modulePkg.name}@${modulePkg.version} ${$3a45484f07f4a447$exports.green(moduleLicense)} ${$3a45484f07f4a447$exports.yellow(`(${moduleLicenseType}) -`, `${$3a45484f07f4a447$exports.green('compatible')} with ${$3a45484f07f4a447$exports.blue(pkgLicense ? pkgLicense : noLicenseStr)} (${pkgLicenseType})`)}`);
            progress = $04945d2fdf2733ca$var$checkProgress(progress, total, incompat, output, cb);
        } catch (err) {
            console.log(err);
            progress = $04945d2fdf2733ca$var$checkProgress(progress, total, incompat, output, cb);
        }
    });
}
/*
 * @class LicenseCheck
 * @type {Object}
 * @property {Error} err - the Error object if any.
 * @property {Boolean} passed - ture if there were no license issues, flase otherwise.
 * @property {string} output - The resulting output (including colors) to be printed with console.log.
 * @param {Error} err - the Error object.
 * @param {Boolean} passed - ture if there were no license issues, flase otherwise.
 * @param {string} output - The resulting output (including colors) to be printed with console.log.
 */ /*
function LicenseCheck(err, passed, output) {
  return {
        err: err,
		passed: passed,
		output: output
    };
}
*/ /**
 * @typedef licenseCheck
 * @type {Object}
 * @property {Error} err - the Error object if any.
 * @property {Boolean} passed - ture if there were no license issues, flase otherwise.
 * @property {string} output - The resulting output (including colors) to be printed with console.log.
*/ /**
 * @public
 * @function checkSync
 * @description Check for licenses issues of the given project.json compared (flat) to a folder of node_modules. Synchronous version.
 * @param  {string} pathOfPackageJson - The path of the package.json to check against
 * @param  {string} modules - List of module directories
 * @returns {licenseCheck} Returns a custom Object
 * @example
 * const lcc = require('lcom');
 * const path = require('path');
 * const {output} = lcc.checkSync(path.join(process.cwd(),'package.json'), path.join(process.cwd(),"node_modules"));
 * if ({output}) console.log(output);
 */ function $04945d2fdf2733ca$var$checkSync(pathOfPackageJson, modules) {
    let x;
    $04945d2fdf2733ca$var$check(pathOfPackageJson, modules, (err, passed, output)=>x = {
            'err': err,
            'passed': passed,
            'output': output
        }
    );
    return x;
}
/**
 * @public @util
 * @function readdirRecursiveSync
 * @description Recursive readdirSync
 * @param {string} dir Directory to search in
 * @param {number} maxDepth Maximum Depth to check for files in
 * @param {number} depth Internal depth count
 * @returns All files (NOT DIRECTORIES) found in dir
 */ const $04945d2fdf2733ca$var$readdirRecursiveSync = (dir1, maxDepth, depth)=>{
    if (depth && depth > (maxDepth || 10)) return [];
    const list = $e6uBX$fs.readdirSync(dir1).map((v)=>$e6uBX$path.resolve(dir1, v)
    );
    let pending = list.filter((v)=>$e6uBX$fs.statSync(v).isDirectory()
    );
    if (pending.length <= 0) return list.filter((v)=>$e6uBX$fs.statSync(v).isFile()
    );
    else {
        pending.forEach((dir)=>$04945d2fdf2733ca$var$readdirRecursiveSync(dir, maxDepth || 10, depth ? depth + 1 : 1).forEach((v)=>list.push(v)
            )
        );
        return list.filter((v)=>$e6uBX$fs.statSync(v).isFile()
        );
    }
};
$04945d2fdf2733ca$exports = {
    /* Check for licenses issues of the given project.json compared (flat) to a folder of node_modules. */ 'check': $04945d2fdf2733ca$var$check,
    /* Check for licenses issues of the given project.json compared (flat) to a folder of node_modules. Synchronous version. */ 'checkSync': $04945d2fdf2733ca$var$checkSync,
    /* Utility */ 'util': {
        /**
     * @public @util
     * @function readdirRecursiveSync
     * @description Recursive readdirSync
     * @param {string} dir Directory to search in
     * @param {number} maxDepth Maximum Depth to check for files in
     * @param {number} depth Internal depth count
     * @returns All files (NOT DIRECTORIES) found in dir
     */ 'readdirRecursiveSync': $04945d2fdf2733ca$var$readdirRecursiveSync,
        /** Find all modules in a directory */ 'findModules': (dir)=>{
            const entries = [];
            const dirs = $04945d2fdf2733ca$var$readdirRecursiveSync(dir).filter((file)=>[
                    'package.json'
                ].includes(file.split('\\').join('/').split('/').pop().toLowerCase())
            ).map((v)=>$e6uBX$path.join(v, '..')
            ).filter((v1)=>{
                v1 = v1.split('\\').join('/').split('/');
                return v1.filter((v)=>!v.startsWith('.')
                ).length === v1.length;
            })// eslint-disable-next-line no-confusing-arrow
            .filter((v)=>entries.includes(v) ? false : entries.push(v) ? true : true
            );
            return dirs;
        }
    }
};




// const updateNotifier = require('update-notifier');
// updateNotifier({ pkg }).notify();
const $fbfdcf40ed37c352$var$readdirRecursiveSync = (dir1, maxDepth, depth)=>{
    if (depth && depth > (maxDepth || 10)) return [];
    const list = $e6uBX$fs.readdirSync(dir1).map((v)=>$e6uBX$path.resolve(dir1, v)
    );
    let pending = list.filter((v)=>$e6uBX$fs.statSync(v).isDirectory()
    );
    if (pending.length <= 0) return list.filter((v)=>$e6uBX$fs.statSync(v).isFile()
    );
    else {
        pending.forEach((dir)=>$fbfdcf40ed37c352$var$readdirRecursiveSync(dir, maxDepth || 10, depth ? depth + 1 : 1).forEach((v)=>list.push(v)
            )
        );
        return list.filter((v)=>$e6uBX$fs.statSync(v).isFile()
        );
    }
}, $fbfdcf40ed37c352$var$returnCode = (()=>{
    try {
        const root = $e6uBX$path.resolve(process.cwd(), $b4a68537fcb7cf7e$exports.getInput('project-root'));
        if (!$e6uBX$fs.existsSync(root)) throw new Error(`Invalid Path ${root}!`);
        const pkg = $e6uBX$path.resolve(root, 'package.json');
        if (!$e6uBX$fs.existsSync(pkg)) throw new Error('Cannot find package.json at %s!', pkg);
        console.log('Checking for Packages at %s...', root);
        const entries = [], files = $fbfdcf40ed37c352$var$readdirRecursiveSync(root).filter((file)=>[
                'package.json'
            ].includes(file.split('\\').join('/').split('/').pop().toLowerCase())
        ).map((v)=>$e6uBX$path.join(v, '..')
        ).filter((v1)=>{
            v1 = v1.split('\\').join('/').split('/');
            return v1.filter((v)=>!v.startsWith('.')
            ).length === v1.length;
        })// eslint-disable-next-line no-confusing-arrow
        .filter((v)=>entries.includes(v) ? false : entries.push(v) ? true : true
        );
        console.log('Checking %s Direrctories...', files.length.toString());
        $04945d2fdf2733ca$exports.check(pkg, files, (err, passed, output)=>{
            if (err) throw err;
            else if (passed) console.log('Passed!\nOutput:\n', output);
            else {
                console.error('Did not pass!\nOutput:\n', output);
                throw new Error('Did not pass!');
            }
        });
    } catch (error) {
        $b4a68537fcb7cf7e$exports.setFailed(error.message);
        throw error;
    }
})() ?? 0;
if ($fbfdcf40ed37c352$var$returnCode !== 0) $b4a68537fcb7cf7e$exports.setFailed('See Log for error');
process.exit($fbfdcf40ed37c352$var$returnCode);


//# sourceMappingURL=index.js.map
