require("net");
var $iKjJo$tls = require("tls");
var $iKjJo$http = require("http");
var $iKjJo$https = require("https");
var $iKjJo$events = require("events");
require("assert");
var $iKjJo$util = require("util");
var $iKjJo$os = require("os");
var $iKjJo$path = require("path");
var $iKjJo$fs = require("fs");

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
parcelRequire.register("gSOQh", function(module, exports) {

module.exports = (parcelRequire("86RRO"));

});
parcelRequire.register("86RRO", function(module, exports) {

$parcel$export(module.exports, "httpOverHttp", () => $5e78ab2521f6f07b$export$25cbd437c61a3835, (v) => $5e78ab2521f6f07b$export$25cbd437c61a3835 = v);
$parcel$export(module.exports, "httpsOverHttp", () => $5e78ab2521f6f07b$export$c06e3df7111bae43, (v) => $5e78ab2521f6f07b$export$c06e3df7111bae43 = v);
$parcel$export(module.exports, "httpOverHttps", () => $5e78ab2521f6f07b$export$5d50e36ef656139f, (v) => $5e78ab2521f6f07b$export$5d50e36ef656139f = v);
$parcel$export(module.exports, "httpsOverHttps", () => $5e78ab2521f6f07b$export$212d6605025321cc, (v) => $5e78ab2521f6f07b$export$212d6605025321cc = v);
$parcel$export(module.exports, "debug", () => $5e78ab2521f6f07b$export$1c9f709888824e05, (v) => $5e78ab2521f6f07b$export$1c9f709888824e05 = v);
var $5e78ab2521f6f07b$export$25cbd437c61a3835;
var $5e78ab2521f6f07b$export$c06e3df7111bae43;
var $5e78ab2521f6f07b$export$5d50e36ef656139f;
var $5e78ab2521f6f07b$export$212d6605025321cc;
var $5e78ab2521f6f07b$export$1c9f709888824e05;
'use strict';







$5e78ab2521f6f07b$export$25cbd437c61a3835 = $5e78ab2521f6f07b$var$httpOverHttp;
$5e78ab2521f6f07b$export$c06e3df7111bae43 = $5e78ab2521f6f07b$var$httpsOverHttp;
$5e78ab2521f6f07b$export$5d50e36ef656139f = $5e78ab2521f6f07b$var$httpOverHttps;
$5e78ab2521f6f07b$export$212d6605025321cc = $5e78ab2521f6f07b$var$httpsOverHttps;
function $5e78ab2521f6f07b$var$httpOverHttp(options) {
    var agent = new $5e78ab2521f6f07b$var$TunnelingAgent(options);
    agent.request = $iKjJo$http.request;
    return agent;
}
function $5e78ab2521f6f07b$var$httpsOverHttp(options) {
    var agent = new $5e78ab2521f6f07b$var$TunnelingAgent(options);
    agent.request = $iKjJo$http.request;
    agent.createSocket = $5e78ab2521f6f07b$var$createSecureSocket;
    agent.defaultPort = 443;
    return agent;
}
function $5e78ab2521f6f07b$var$httpOverHttps(options) {
    var agent = new $5e78ab2521f6f07b$var$TunnelingAgent(options);
    agent.request = $iKjJo$https.request;
    return agent;
}
function $5e78ab2521f6f07b$var$httpsOverHttps(options) {
    var agent = new $5e78ab2521f6f07b$var$TunnelingAgent(options);
    agent.request = $iKjJo$https.request;
    agent.createSocket = $5e78ab2521f6f07b$var$createSecureSocket;
    agent.defaultPort = 443;
    return agent;
}
function $5e78ab2521f6f07b$var$TunnelingAgent(options1) {
    var self = this;
    self.options = options1 || {};
    self.proxyOptions = self.options.proxy || {};
    self.maxSockets = self.options.maxSockets || $iKjJo$http.Agent.defaultMaxSockets;
    self.requests = [];
    self.sockets = [];
    self.on('free', function onFree(socket, host, port, localAddress) {
        var options = $5e78ab2521f6f07b$var$toOptions(host, port, localAddress);
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
$iKjJo$util.inherits($5e78ab2521f6f07b$var$TunnelingAgent, $iKjJo$events.EventEmitter);
$5e78ab2521f6f07b$var$TunnelingAgent.prototype.addRequest = function addRequest(req, host, port, localAddress) {
    var self = this;
    var options = $5e78ab2521f6f07b$var$mergeOptions({
        request: req
    }, self.options, $5e78ab2521f6f07b$var$toOptions(host, port, localAddress));
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
$5e78ab2521f6f07b$var$TunnelingAgent.prototype.createSocket = function createSocket(options, cb) {
    var self = this;
    var placeholder = {};
    self.sockets.push(placeholder);
    var connectOptions = $5e78ab2521f6f07b$var$mergeOptions({}, self.proxyOptions, {
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
    $5e78ab2521f6f07b$var$debug('making CONNECT request');
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
            $5e78ab2521f6f07b$var$debug('tunneling socket could not be established, statusCode=%d', res.statusCode);
            socket.destroy();
            var error = new Error("tunneling socket could not be established, statusCode=" + res.statusCode);
            error.code = 'ECONNRESET';
            options.request.emit('error', error);
            self.removeSocket(placeholder);
            return;
        }
        if (head.length > 0) {
            $5e78ab2521f6f07b$var$debug('got illegal response body from proxy');
            socket.destroy();
            var error = new Error('got illegal response body from proxy');
            error.code = 'ECONNRESET';
            options.request.emit('error', error);
            self.removeSocket(placeholder);
            return;
        }
        $5e78ab2521f6f07b$var$debug('tunneling connection has established');
        self.sockets[self.sockets.indexOf(placeholder)] = socket;
        return cb(socket);
    }
    function onError(cause) {
        connectReq.removeAllListeners();
        $5e78ab2521f6f07b$var$debug('tunneling socket could not be established, cause=%s\n', cause.message, cause.stack);
        var error = new Error("tunneling socket could not be established, cause=" + cause.message);
        error.code = 'ECONNRESET';
        options.request.emit('error', error);
        self.removeSocket(placeholder);
    }
};
$5e78ab2521f6f07b$var$TunnelingAgent.prototype.removeSocket = function removeSocket(socket1) {
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
function $5e78ab2521f6f07b$var$createSecureSocket(options, cb) {
    var self = this;
    $5e78ab2521f6f07b$var$TunnelingAgent.prototype.createSocket.call(self, options, function(socket) {
        var hostHeader = options.request.getHeader('host');
        var tlsOptions = $5e78ab2521f6f07b$var$mergeOptions({}, self.options, {
            socket: socket,
            servername: hostHeader ? hostHeader.replace(/:.*$/, '') : options.host
        });
        // 0 is dummy port for v0.6
        var secureSocket = $iKjJo$tls.connect(0, tlsOptions);
        self.sockets[self.sockets.indexOf(socket)] = secureSocket;
        cb(secureSocket);
    });
}
function $5e78ab2521f6f07b$var$toOptions(host, port, localAddress) {
    if (typeof host === 'string') return {
        host: host,
        port: port,
        localAddress: localAddress
    };
    return host; // for v0.11 or later
}
function $5e78ab2521f6f07b$var$mergeOptions(target) {
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
var $5e78ab2521f6f07b$var$debug;
if (process.env.NODE_DEBUG && /\btunnel\b/.test(process.env.NODE_DEBUG)) $5e78ab2521f6f07b$var$debug = function() {
    var args = Array.prototype.slice.call(arguments);
    if (typeof args[0] === 'string') args[0] = 'TUNNEL: ' + args[0];
    else args.unshift('TUNNEL:');
    console.error.apply(console, args);
};
else $5e78ab2521f6f07b$var$debug = function() {};
$5e78ab2521f6f07b$export$1c9f709888824e05 = $5e78ab2521f6f07b$var$debug; // for test

});


parcelRequire.register("lQr2O", function(module, exports) {
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

*/ var $fe736ebb159df203$var$styles = {};
module.exports = $fe736ebb159df203$var$styles;
var $fe736ebb159df203$var$codes = {
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
Object.keys($fe736ebb159df203$var$codes).forEach(function(key) {
    var val = $fe736ebb159df203$var$codes[key];
    var style = $fe736ebb159df203$var$styles[key] = [];
    style.open = '\u001b[' + val[0] + 'm';
    style.close = '\u001b[' + val[1] + 'm';
});

});

parcelRequire.register("hLGnk", function(module, exports) {
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


var $c71at = parcelRequire("c71at");
var $cef7b2478dbf35c0$var$env = process.env;
var $cef7b2478dbf35c0$var$forceColor = void 0;
if ($c71at('no-color') || $c71at('no-colors') || $c71at('color=false')) $cef7b2478dbf35c0$var$forceColor = false;
else if ($c71at('color') || $c71at('colors') || $c71at('color=true') || $c71at('color=always')) $cef7b2478dbf35c0$var$forceColor = true;
if ('FORCE_COLOR' in $cef7b2478dbf35c0$var$env) $cef7b2478dbf35c0$var$forceColor = $cef7b2478dbf35c0$var$env.FORCE_COLOR.length === 0 || parseInt($cef7b2478dbf35c0$var$env.FORCE_COLOR, 10) !== 0;
function $cef7b2478dbf35c0$var$translateLevel(level) {
    if (level === 0) return false;
    return {
        level: level,
        hasBasic: true,
        has256: level >= 2,
        has16m: level >= 3
    };
}
function $cef7b2478dbf35c0$var$supportsColor(stream) {
    if ($cef7b2478dbf35c0$var$forceColor === false) return 0;
    if ($c71at('color=16m') || $c71at('color=full') || $c71at('color=truecolor')) return 3;
    if ($c71at('color=256')) return 2;
    if (stream && !stream.isTTY && $cef7b2478dbf35c0$var$forceColor !== true) return 0;
    var min = $cef7b2478dbf35c0$var$forceColor ? 1 : 0;
    if (process.platform === 'win32') {
        // Node.js 7.5.0 is the first version of Node.js to include a patch to
        // libuv that enables 256 color output on Windows. Anything earlier and it
        // won't work. However, here we target Node.js 8 at minimum as it is an LTS
        // release, and Node.js 7 is not. Windows 10 build 10586 is the first
        // Windows release that supports 256 colors. Windows 10 build 14931 is the
        // first release that supports 16m/TrueColor.
        var osRelease = $iKjJo$os.release().split('.');
        if (Number(process.versions.node.split('.')[0]) >= 8 && Number(osRelease[0]) >= 10 && Number(osRelease[2]) >= 10586) return Number(osRelease[2]) >= 14931 ? 3 : 2;
        return 1;
    }
    if ('CI' in $cef7b2478dbf35c0$var$env) {
        if ([
            'TRAVIS',
            'CIRCLECI',
            'APPVEYOR',
            'GITLAB_CI'
        ].some(function(sign) {
            return sign in $cef7b2478dbf35c0$var$env;
        }) || $cef7b2478dbf35c0$var$env.CI_NAME === 'codeship') return 1;
        return min;
    }
    if ('TEAMCITY_VERSION' in $cef7b2478dbf35c0$var$env) return /^(9\.(0*[1-9]\d*)\.|\d{2,}\.)/.test($cef7b2478dbf35c0$var$env.TEAMCITY_VERSION) ? 1 : 0;
    if ('TERM_PROGRAM' in $cef7b2478dbf35c0$var$env) {
        var version = parseInt(($cef7b2478dbf35c0$var$env.TERM_PROGRAM_VERSION || '').split('.')[0], 10);
        switch($cef7b2478dbf35c0$var$env.TERM_PROGRAM){
            case 'iTerm.app':
                return version >= 3 ? 3 : 2;
            case 'Hyper':
                return 3;
            case 'Apple_Terminal':
                return 2;
        }
    }
    if (/-256(color)?$/i.test($cef7b2478dbf35c0$var$env.TERM)) return 2;
    if (/^screen|^xterm|^vt100|^rxvt|color|ansi|cygwin|linux/i.test($cef7b2478dbf35c0$var$env.TERM)) return 1;
    if ('COLORTERM' in $cef7b2478dbf35c0$var$env) return 1;
    if ($cef7b2478dbf35c0$var$env.TERM === 'dumb') return min;
    return min;
}
function $cef7b2478dbf35c0$var$getSupportLevel(stream) {
    var level = $cef7b2478dbf35c0$var$supportsColor(stream);
    return $cef7b2478dbf35c0$var$translateLevel(level);
}
module.exports = {
    supportsColor: $cef7b2478dbf35c0$var$getSupportLevel,
    stdout: $cef7b2478dbf35c0$var$getSupportLevel(process.stdout),
    stderr: $cef7b2478dbf35c0$var$getSupportLevel(process.stderr)
};

});
parcelRequire.register("c71at", function(module, exports) {
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


parcelRequire.register("7yHOw", function(module, exports) {
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

parcelRequire.register("a2kWw", function(module, exports) {
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

parcelRequire.register("boGNT", function(module, exports) {
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

parcelRequire.register("eDqjO", function(module, exports) {
module.exports = function(colors) {
    return function(letter, i, exploded) {
        return i % 2 === 0 ? letter : colors.inverse(letter);
    };
};

});

parcelRequire.register("JVmaW", function(module, exports) {
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

parcelRequire.register("eIKEo", function(module, exports) {
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

'use strict';
var $591ec71c2966bf8f$exports = {};
"use strict";
var $591ec71c2966bf8f$var$__createBinding = $591ec71c2966bf8f$exports && $591ec71c2966bf8f$exports.__createBinding || (Object.create ? function(o, m, k, k2) {
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
var $591ec71c2966bf8f$var$__setModuleDefault = $591ec71c2966bf8f$exports && $591ec71c2966bf8f$exports.__setModuleDefault || (Object.create ? function(o, v) {
    Object.defineProperty(o, "default", {
        enumerable: true,
        value: v
    });
} : function(o, v) {
    o["default"] = v;
});
var $591ec71c2966bf8f$var$__importStar = $591ec71c2966bf8f$exports && $591ec71c2966bf8f$exports.__importStar || function(mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) {
        for(var k in mod)if (k !== "default" && Object.hasOwnProperty.call(mod, k)) $591ec71c2966bf8f$var$__createBinding(result, mod, k);
    }
    $591ec71c2966bf8f$var$__setModuleDefault(result, mod);
    return result;
};
var $591ec71c2966bf8f$var$__awaiter = $591ec71c2966bf8f$exports && $591ec71c2966bf8f$exports.__awaiter || function(thisArg, _arguments, P, generator) {
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
Object.defineProperty($591ec71c2966bf8f$exports, "__esModule", {
    value: true
});
$591ec71c2966bf8f$exports.getIDToken = $591ec71c2966bf8f$exports.getState = $591ec71c2966bf8f$exports.saveState = $591ec71c2966bf8f$exports.group = $591ec71c2966bf8f$exports.endGroup = $591ec71c2966bf8f$exports.startGroup = $591ec71c2966bf8f$exports.info = $591ec71c2966bf8f$exports.notice = $591ec71c2966bf8f$exports.warning = $591ec71c2966bf8f$exports.error = $591ec71c2966bf8f$exports.debug = $591ec71c2966bf8f$exports.isDebug = $591ec71c2966bf8f$exports.setFailed = $591ec71c2966bf8f$exports.setCommandEcho = $591ec71c2966bf8f$exports.setOutput = $591ec71c2966bf8f$exports.getBooleanInput = $591ec71c2966bf8f$exports.getMultilineInput = $591ec71c2966bf8f$exports.getInput = $591ec71c2966bf8f$exports.addPath = $591ec71c2966bf8f$exports.setSecret = $591ec71c2966bf8f$exports.exportVariable = $591ec71c2966bf8f$exports.ExitCode = void 0;
var $758ba8cf478b882c$exports = {};
"use strict";
var $758ba8cf478b882c$var$__createBinding = $758ba8cf478b882c$exports && $758ba8cf478b882c$exports.__createBinding || (Object.create ? function(o, m, k, k2) {
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
var $758ba8cf478b882c$var$__setModuleDefault = $758ba8cf478b882c$exports && $758ba8cf478b882c$exports.__setModuleDefault || (Object.create ? function(o, v) {
    Object.defineProperty(o, "default", {
        enumerable: true,
        value: v
    });
} : function(o, v) {
    o["default"] = v;
});
var $758ba8cf478b882c$var$__importStar = $758ba8cf478b882c$exports && $758ba8cf478b882c$exports.__importStar || function(mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) {
        for(var k in mod)if (k !== "default" && Object.hasOwnProperty.call(mod, k)) $758ba8cf478b882c$var$__createBinding(result, mod, k);
    }
    $758ba8cf478b882c$var$__setModuleDefault(result, mod);
    return result;
};
Object.defineProperty($758ba8cf478b882c$exports, "__esModule", {
    value: true
});
$758ba8cf478b882c$exports.issue = $758ba8cf478b882c$exports.issueCommand = void 0;

const $758ba8cf478b882c$var$os = $758ba8cf478b882c$var$__importStar($iKjJo$os);
var $eb4feaad92270349$exports = {};
"use strict";
// We use any as a valid input type
/* eslint-disable @typescript-eslint/no-explicit-any */ Object.defineProperty($eb4feaad92270349$exports, "__esModule", {
    value: true
});
$eb4feaad92270349$exports.toCommandProperties = $eb4feaad92270349$exports.toCommandValue = void 0;
/**
 * Sanitizes an input into a string so it can be passed into issueCommand safely
 * @param input input to sanitize into a string
 */ function $eb4feaad92270349$var$toCommandValue(input) {
    if (input === null || input === undefined) return '';
    else if (typeof input === 'string' || input instanceof String) return input;
    return JSON.stringify(input);
}
$eb4feaad92270349$exports.toCommandValue = $eb4feaad92270349$var$toCommandValue;
/**
 *
 * @param annotationProperties
 * @returns The command properties to send with the actual annotation command
 * See IssueCommandProperties: https://github.com/actions/runner/blob/main/src/Runner.Worker/ActionCommandManager.cs#L646
 */ function $eb4feaad92270349$var$toCommandProperties(annotationProperties) {
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
$eb4feaad92270349$exports.toCommandProperties = $eb4feaad92270349$var$toCommandProperties;


/**
 * Commands
 *
 * Command Format:
 *   ::name key=value,key=value::message
 *
 * Examples:
 *   ::warning::This is the message
 *   ::set-env name=MY_VAR::some value
 */ function $758ba8cf478b882c$var$issueCommand(command, properties, message) {
    const cmd = new $758ba8cf478b882c$var$Command(command, properties, message);
    process.stdout.write(cmd.toString() + $758ba8cf478b882c$var$os.EOL);
}
$758ba8cf478b882c$exports.issueCommand = $758ba8cf478b882c$var$issueCommand;
function $758ba8cf478b882c$var$issue(name, message = '') {
    $758ba8cf478b882c$var$issueCommand(name, {}, message);
}
$758ba8cf478b882c$exports.issue = $758ba8cf478b882c$var$issue;
const $758ba8cf478b882c$var$CMD_STRING = '::';
class $758ba8cf478b882c$var$Command {
    constructor(command, properties, message){
        if (!command) command = 'missing.command';
        this.command = command;
        this.properties = properties;
        this.message = message;
    }
    toString() {
        let cmdStr = $758ba8cf478b882c$var$CMD_STRING + this.command;
        if (this.properties && Object.keys(this.properties).length > 0) {
            cmdStr += ' ';
            let first = true;
            for(const key in this.properties)if (this.properties.hasOwnProperty(key)) {
                const val = this.properties[key];
                if (val) {
                    if (first) first = false;
                    else cmdStr += ',';
                    cmdStr += `${key}=${$758ba8cf478b882c$var$escapeProperty(val)}`;
                }
            }
        }
        cmdStr += `${$758ba8cf478b882c$var$CMD_STRING}${$758ba8cf478b882c$var$escapeData(this.message)}`;
        return cmdStr;
    }
}
function $758ba8cf478b882c$var$escapeData(s) {
    return $eb4feaad92270349$exports.toCommandValue(s).replace(/%/g, '%25').replace(/\r/g, '%0D').replace(/\n/g, '%0A');
}
function $758ba8cf478b882c$var$escapeProperty(s) {
    return $eb4feaad92270349$exports.toCommandValue(s).replace(/%/g, '%25').replace(/\r/g, '%0D').replace(/\n/g, '%0A').replace(/:/g, '%3A').replace(/,/g, '%2C');
}


var $0e9de075bc48fb7c$exports = {};
"use strict";
// For internal use, subject to change.
var $0e9de075bc48fb7c$var$__createBinding = $0e9de075bc48fb7c$exports && $0e9de075bc48fb7c$exports.__createBinding || (Object.create ? function(o, m, k, k2) {
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
var $0e9de075bc48fb7c$var$__setModuleDefault = $0e9de075bc48fb7c$exports && $0e9de075bc48fb7c$exports.__setModuleDefault || (Object.create ? function(o, v) {
    Object.defineProperty(o, "default", {
        enumerable: true,
        value: v
    });
} : function(o, v) {
    o["default"] = v;
});
var $0e9de075bc48fb7c$var$__importStar = $0e9de075bc48fb7c$exports && $0e9de075bc48fb7c$exports.__importStar || function(mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) {
        for(var k in mod)if (k !== "default" && Object.hasOwnProperty.call(mod, k)) $0e9de075bc48fb7c$var$__createBinding(result, mod, k);
    }
    $0e9de075bc48fb7c$var$__setModuleDefault(result, mod);
    return result;
};
Object.defineProperty($0e9de075bc48fb7c$exports, "__esModule", {
    value: true
});
$0e9de075bc48fb7c$exports.issueCommand = void 0;

// We use any as a valid input type
/* eslint-disable @typescript-eslint/no-explicit-any */ const $0e9de075bc48fb7c$var$fs = $0e9de075bc48fb7c$var$__importStar($iKjJo$fs);

const $0e9de075bc48fb7c$var$os = $0e9de075bc48fb7c$var$__importStar($iKjJo$os);

function $0e9de075bc48fb7c$var$issueCommand(command, message) {
    const filePath = process.env[`GITHUB_${command}`];
    if (!filePath) throw new Error(`Unable to find environment variable for file command ${command}`);
    if (!$0e9de075bc48fb7c$var$fs.existsSync(filePath)) throw new Error(`Missing file at path: ${filePath}`);
    $0e9de075bc48fb7c$var$fs.appendFileSync(filePath, `${$eb4feaad92270349$exports.toCommandValue(message)}${$0e9de075bc48fb7c$var$os.EOL}`, {
        encoding: 'utf8'
    });
}
$0e9de075bc48fb7c$exports.issueCommand = $0e9de075bc48fb7c$var$issueCommand;




const $591ec71c2966bf8f$var$os = $591ec71c2966bf8f$var$__importStar($iKjJo$os);

const $591ec71c2966bf8f$var$path = $591ec71c2966bf8f$var$__importStar($iKjJo$path);
var $4e6fc5b4d6bb9fa0$exports = {};
"use strict";
var $4e6fc5b4d6bb9fa0$var$__awaiter = $4e6fc5b4d6bb9fa0$exports && $4e6fc5b4d6bb9fa0$exports.__awaiter || function(thisArg, _arguments, P, generator) {
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
Object.defineProperty($4e6fc5b4d6bb9fa0$exports, "__esModule", {
    value: true
});
$4e6fc5b4d6bb9fa0$exports.OidcClient = void 0;
var $0034b3a5e07c3af0$exports = {};
"use strict";
Object.defineProperty($0034b3a5e07c3af0$exports, "__esModule", {
    value: true
});


var $837ea8d053e9aa19$exports = {};
"use strict";
Object.defineProperty($837ea8d053e9aa19$exports, "__esModule", {
    value: true
});
function $837ea8d053e9aa19$var$getProxyUrl(reqUrl) {
    let usingSsl = reqUrl.protocol === 'https:';
    let proxyUrl;
    if ($837ea8d053e9aa19$var$checkBypass(reqUrl)) return proxyUrl;
    let proxyVar;
    if (usingSsl) proxyVar = process.env['https_proxy'] || process.env['HTTPS_PROXY'];
    else proxyVar = process.env['http_proxy'] || process.env['HTTP_PROXY'];
    if (proxyVar) proxyUrl = new URL(proxyVar);
    return proxyUrl;
}
$837ea8d053e9aa19$exports.getProxyUrl = $837ea8d053e9aa19$var$getProxyUrl;
function $837ea8d053e9aa19$var$checkBypass(reqUrl) {
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
$837ea8d053e9aa19$exports.checkBypass = $837ea8d053e9aa19$var$checkBypass;


let $0034b3a5e07c3af0$var$tunnel;
var $0034b3a5e07c3af0$var$HttpCodes;
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
})($0034b3a5e07c3af0$var$HttpCodes = $0034b3a5e07c3af0$exports.HttpCodes || ($0034b3a5e07c3af0$exports.HttpCodes = {}));
var $0034b3a5e07c3af0$var$Headers;
(function(Headers) {
    Headers["Accept"] = "accept";
    Headers["ContentType"] = "content-type";
})($0034b3a5e07c3af0$var$Headers = $0034b3a5e07c3af0$exports.Headers || ($0034b3a5e07c3af0$exports.Headers = {}));
var $0034b3a5e07c3af0$var$MediaTypes;
(function(MediaTypes) {
    MediaTypes["ApplicationJson"] = "application/json";
})($0034b3a5e07c3af0$var$MediaTypes = $0034b3a5e07c3af0$exports.MediaTypes || ($0034b3a5e07c3af0$exports.MediaTypes = {}));
/**
 * Returns the proxy URL, depending upon the supplied url and proxy environment variables.
 * @param serverUrl  The server URL where the request will be sent. For example, https://api.github.com
 */ function $0034b3a5e07c3af0$var$getProxyUrl(serverUrl) {
    let proxyUrl = $837ea8d053e9aa19$exports.getProxyUrl(new URL(serverUrl));
    return proxyUrl ? proxyUrl.href : '';
}
$0034b3a5e07c3af0$exports.getProxyUrl = $0034b3a5e07c3af0$var$getProxyUrl;
const $0034b3a5e07c3af0$var$HttpRedirectCodes = [
    $0034b3a5e07c3af0$var$HttpCodes.MovedPermanently,
    $0034b3a5e07c3af0$var$HttpCodes.ResourceMoved,
    $0034b3a5e07c3af0$var$HttpCodes.SeeOther,
    $0034b3a5e07c3af0$var$HttpCodes.TemporaryRedirect,
    $0034b3a5e07c3af0$var$HttpCodes.PermanentRedirect
];
const $0034b3a5e07c3af0$var$HttpResponseRetryCodes = [
    $0034b3a5e07c3af0$var$HttpCodes.BadGateway,
    $0034b3a5e07c3af0$var$HttpCodes.ServiceUnavailable,
    $0034b3a5e07c3af0$var$HttpCodes.GatewayTimeout
];
const $0034b3a5e07c3af0$var$RetryableHttpVerbs = [
    'OPTIONS',
    'GET',
    'DELETE',
    'HEAD'
];
const $0034b3a5e07c3af0$var$ExponentialBackoffCeiling = 10;
const $0034b3a5e07c3af0$var$ExponentialBackoffTimeSlice = 5;
class $0034b3a5e07c3af0$var$HttpClientError extends Error {
    constructor(message, statusCode){
        super(message);
        this.name = 'HttpClientError';
        this.statusCode = statusCode;
        Object.setPrototypeOf(this, $0034b3a5e07c3af0$var$HttpClientError.prototype);
    }
}
$0034b3a5e07c3af0$exports.HttpClientError = $0034b3a5e07c3af0$var$HttpClientError;
class $0034b3a5e07c3af0$var$HttpClientResponse {
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
$0034b3a5e07c3af0$exports.HttpClientResponse = $0034b3a5e07c3af0$var$HttpClientResponse;
function $0034b3a5e07c3af0$var$isHttps(requestUrl) {
    let parsedUrl = new URL(requestUrl);
    return parsedUrl.protocol === 'https:';
}
$0034b3a5e07c3af0$exports.isHttps = $0034b3a5e07c3af0$var$isHttps;

class $0034b3a5e07c3af0$var$HttpClient {
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
        additionalHeaders[$0034b3a5e07c3af0$var$Headers.Accept] = this._getExistingOrDefaultHeader(additionalHeaders, $0034b3a5e07c3af0$var$Headers.Accept, $0034b3a5e07c3af0$var$MediaTypes.ApplicationJson);
        let res = await this.get(requestUrl, additionalHeaders);
        return this._processResponse(res, this.requestOptions);
    }
    async postJson(requestUrl, obj, additionalHeaders = {}) {
        let data = JSON.stringify(obj, null, 2);
        additionalHeaders[$0034b3a5e07c3af0$var$Headers.Accept] = this._getExistingOrDefaultHeader(additionalHeaders, $0034b3a5e07c3af0$var$Headers.Accept, $0034b3a5e07c3af0$var$MediaTypes.ApplicationJson);
        additionalHeaders[$0034b3a5e07c3af0$var$Headers.ContentType] = this._getExistingOrDefaultHeader(additionalHeaders, $0034b3a5e07c3af0$var$Headers.ContentType, $0034b3a5e07c3af0$var$MediaTypes.ApplicationJson);
        let res = await this.post(requestUrl, data, additionalHeaders);
        return this._processResponse(res, this.requestOptions);
    }
    async putJson(requestUrl, obj, additionalHeaders = {}) {
        let data = JSON.stringify(obj, null, 2);
        additionalHeaders[$0034b3a5e07c3af0$var$Headers.Accept] = this._getExistingOrDefaultHeader(additionalHeaders, $0034b3a5e07c3af0$var$Headers.Accept, $0034b3a5e07c3af0$var$MediaTypes.ApplicationJson);
        additionalHeaders[$0034b3a5e07c3af0$var$Headers.ContentType] = this._getExistingOrDefaultHeader(additionalHeaders, $0034b3a5e07c3af0$var$Headers.ContentType, $0034b3a5e07c3af0$var$MediaTypes.ApplicationJson);
        let res = await this.put(requestUrl, data, additionalHeaders);
        return this._processResponse(res, this.requestOptions);
    }
    async patchJson(requestUrl, obj, additionalHeaders = {}) {
        let data = JSON.stringify(obj, null, 2);
        additionalHeaders[$0034b3a5e07c3af0$var$Headers.Accept] = this._getExistingOrDefaultHeader(additionalHeaders, $0034b3a5e07c3af0$var$Headers.Accept, $0034b3a5e07c3af0$var$MediaTypes.ApplicationJson);
        additionalHeaders[$0034b3a5e07c3af0$var$Headers.ContentType] = this._getExistingOrDefaultHeader(additionalHeaders, $0034b3a5e07c3af0$var$Headers.ContentType, $0034b3a5e07c3af0$var$MediaTypes.ApplicationJson);
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
        let maxTries = this._allowRetries && $0034b3a5e07c3af0$var$RetryableHttpVerbs.indexOf(verb) != -1 ? this._maxRetries + 1 : 1;
        let numTries = 0;
        let response;
        while(numTries < maxTries){
            response = await this.requestRaw(info, data);
            // Check if it's an authentication challenge
            if (response && response.message && response.message.statusCode === $0034b3a5e07c3af0$var$HttpCodes.Unauthorized) {
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
            while($0034b3a5e07c3af0$var$HttpRedirectCodes.indexOf(response.message.statusCode) != -1 && this._allowRedirects && redirectsRemaining > 0){
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
            if ($0034b3a5e07c3af0$var$HttpResponseRetryCodes.indexOf(response.message.statusCode) == -1) // If not a retry code, return immediately instead of retrying
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
            let res = new $0034b3a5e07c3af0$var$HttpClientResponse(msg);
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
        info.httpModule = usingSsl ? $iKjJo$https : $iKjJo$http;
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
        let proxyUrl = $837ea8d053e9aa19$exports.getProxyUrl(parsedUrl);
        let useProxy = proxyUrl && proxyUrl.hostname;
        if (this._keepAlive && useProxy) agent = this._proxyAgent;
        if (this._keepAlive && !useProxy) agent = this._agent;
        // if agent is already assigned use that agent.
        if (!!agent) return agent;
        const usingSsl = parsedUrl.protocol === 'https:';
        let maxSockets = 100;
        if (!!this.requestOptions) maxSockets = this.requestOptions.maxSockets || $iKjJo$http.globalAgent.maxSockets;
        if (useProxy) {
            // If using proxy, need tunnel
            if (!$0034b3a5e07c3af0$var$tunnel) $0034b3a5e07c3af0$var$tunnel = (parcelRequire("gSOQh"));
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
            if (usingSsl) tunnelAgent = overHttps ? $0034b3a5e07c3af0$var$tunnel.httpsOverHttps : $0034b3a5e07c3af0$var$tunnel.httpsOverHttp;
            else tunnelAgent = overHttps ? $0034b3a5e07c3af0$var$tunnel.httpOverHttps : $0034b3a5e07c3af0$var$tunnel.httpOverHttp;
            agent = tunnelAgent(agentOptions);
            this._proxyAgent = agent;
        }
        // if reusing agent across request and tunneling agent isn't assigned create a new agent
        if (this._keepAlive && !agent) {
            const options = {
                keepAlive: this._keepAlive,
                maxSockets: maxSockets
            };
            agent = usingSsl ? new $iKjJo$https.Agent(options) : new $iKjJo$http.Agent(options);
            this._agent = agent;
        }
        // if not using private agent and tunnel agent isn't setup then use global agent
        if (!agent) agent = usingSsl ? $iKjJo$https.globalAgent : $iKjJo$http.globalAgent;
        if (usingSsl && this._ignoreSslError) // we don't want to set NODE_TLS_REJECT_UNAUTHORIZED=0 since that will affect request for entire process
        // http.RequestOptions doesn't expose a way to modify RequestOptions.agent.options
        // we have to cast it to any and change it directly
        agent.options = Object.assign(agent.options || {}, {
            rejectUnauthorized: false
        });
        return agent;
    }
    _performExponentialBackoff(retryNumber) {
        retryNumber = Math.min($0034b3a5e07c3af0$var$ExponentialBackoffCeiling, retryNumber);
        const ms = $0034b3a5e07c3af0$var$ExponentialBackoffTimeSlice * Math.pow(2, retryNumber);
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
            if (statusCode == $0034b3a5e07c3af0$var$HttpCodes.NotFound) resolve(response);
            let obj;
            let contents;
            // get the result from the body
            try {
                contents = await res.readBody();
                if (contents && contents.length > 0) {
                    if (options && options.deserializeDates) obj = JSON.parse(contents, $0034b3a5e07c3af0$var$HttpClient.dateTimeDeserializer);
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
                let err = new $0034b3a5e07c3af0$var$HttpClientError(msg, statusCode);
                err.result = response.result;
                reject(err);
            } else resolve(response);
        });
    }
}
$0034b3a5e07c3af0$exports.HttpClient = $0034b3a5e07c3af0$var$HttpClient;


var $118a8eff2ce7da73$exports = {};
"use strict";
Object.defineProperty($118a8eff2ce7da73$exports, "__esModule", {
    value: true
});
class $118a8eff2ce7da73$var$BasicCredentialHandler {
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
$118a8eff2ce7da73$exports.BasicCredentialHandler = $118a8eff2ce7da73$var$BasicCredentialHandler;
class $118a8eff2ce7da73$var$BearerCredentialHandler {
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
$118a8eff2ce7da73$exports.BearerCredentialHandler = $118a8eff2ce7da73$var$BearerCredentialHandler;
class $118a8eff2ce7da73$var$PersonalAccessTokenCredentialHandler {
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
$118a8eff2ce7da73$exports.PersonalAccessTokenCredentialHandler = $118a8eff2ce7da73$var$PersonalAccessTokenCredentialHandler;



class $4e6fc5b4d6bb9fa0$var$OidcClient {
    static createHttpClient(allowRetry = true, maxRetry = 10) {
        const requestOptions = {
            allowRetries: allowRetry,
            maxRetries: maxRetry
        };
        return new $0034b3a5e07c3af0$exports.HttpClient('actions/oidc-client', [
            new $118a8eff2ce7da73$exports.BearerCredentialHandler($4e6fc5b4d6bb9fa0$var$OidcClient.getRequestToken())
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
        return $4e6fc5b4d6bb9fa0$var$__awaiter(this, void 0, void 0, function*() {
            const httpclient = $4e6fc5b4d6bb9fa0$var$OidcClient.createHttpClient();
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
        return $4e6fc5b4d6bb9fa0$var$__awaiter(this, void 0, void 0, function*() {
            try {
                // New ID Token is requested from action service
                let id_token_url = $4e6fc5b4d6bb9fa0$var$OidcClient.getIDTokenUrl();
                if (audience) {
                    const encodedAudience = encodeURIComponent(audience);
                    id_token_url = `${id_token_url}&audience=${encodedAudience}`;
                }
                $591ec71c2966bf8f$exports.debug(`ID token url is ${id_token_url}`);
                const id_token = yield $4e6fc5b4d6bb9fa0$var$OidcClient.getCall(id_token_url);
                $591ec71c2966bf8f$exports.setSecret(id_token);
                return id_token;
            } catch (error) {
                throw new Error(`Error message: ${error.message}`);
            }
        });
    }
}
$4e6fc5b4d6bb9fa0$exports.OidcClient = $4e6fc5b4d6bb9fa0$var$OidcClient;


/**
 * The code to exit an action
 */ var $591ec71c2966bf8f$var$ExitCode;
(function(ExitCode) {
    /**
     * A code indicating that the action was successful
     */ ExitCode[ExitCode["Success"] = 0] = "Success";
    /**
     * A code indicating that the action was a failure
     */ ExitCode[ExitCode["Failure"] = 1] = "Failure";
})($591ec71c2966bf8f$var$ExitCode = $591ec71c2966bf8f$exports.ExitCode || ($591ec71c2966bf8f$exports.ExitCode = {}));
//-----------------------------------------------------------------------
// Variables
//-----------------------------------------------------------------------
/**
 * Sets env variable for this action and future actions in the job
 * @param name the name of the variable to set
 * @param val the value of the variable. Non-string values will be converted to a string via JSON.stringify
 */ // eslint-disable-next-line @typescript-eslint/no-explicit-any
function $591ec71c2966bf8f$var$exportVariable(name, val) {
    const convertedVal = $eb4feaad92270349$exports.toCommandValue(val);
    process.env[name] = convertedVal;
    const filePath = process.env['GITHUB_ENV'] || '';
    if (filePath) {
        const delimiter = '_GitHubActionsFileCommandDelimeter_';
        const commandValue = `${name}<<${delimiter}${$591ec71c2966bf8f$var$os.EOL}${convertedVal}${$591ec71c2966bf8f$var$os.EOL}${delimiter}`;
        $0e9de075bc48fb7c$exports.issueCommand('ENV', commandValue);
    } else $758ba8cf478b882c$exports.issueCommand('set-env', {
        name: name
    }, convertedVal);
}
$591ec71c2966bf8f$exports.exportVariable = $591ec71c2966bf8f$var$exportVariable;
/**
 * Registers a secret which will get masked from logs
 * @param secret value of the secret
 */ function $591ec71c2966bf8f$var$setSecret(secret) {
    $758ba8cf478b882c$exports.issueCommand('add-mask', {}, secret);
}
$591ec71c2966bf8f$exports.setSecret = $591ec71c2966bf8f$var$setSecret;
/**
 * Prepends inputPath to the PATH (for this action and future actions)
 * @param inputPath
 */ function $591ec71c2966bf8f$var$addPath(inputPath) {
    const filePath = process.env['GITHUB_PATH'] || '';
    if (filePath) $0e9de075bc48fb7c$exports.issueCommand('PATH', inputPath);
    else $758ba8cf478b882c$exports.issueCommand('add-path', {}, inputPath);
    process.env['PATH'] = `${inputPath}${$591ec71c2966bf8f$var$path.delimiter}${process.env['PATH']}`;
}
$591ec71c2966bf8f$exports.addPath = $591ec71c2966bf8f$var$addPath;
/**
 * Gets the value of an input.
 * Unless trimWhitespace is set to false in InputOptions, the value is also trimmed.
 * Returns an empty string if the value is not defined.
 *
 * @param     name     name of the input to get
 * @param     options  optional. See InputOptions.
 * @returns   string
 */ function $591ec71c2966bf8f$var$getInput(name, options) {
    const val = process.env[`INPUT_${name.replace(/ /g, '_').toUpperCase()}`] || '';
    if (options && options.required && !val) throw new Error(`Input required and not supplied: ${name}`);
    if (options && options.trimWhitespace === false) return val;
    return val.trim();
}
$591ec71c2966bf8f$exports.getInput = $591ec71c2966bf8f$var$getInput;
/**
 * Gets the values of an multiline input.  Each value is also trimmed.
 *
 * @param     name     name of the input to get
 * @param     options  optional. See InputOptions.
 * @returns   string[]
 *
 */ function $591ec71c2966bf8f$var$getMultilineInput(name, options) {
    const inputs = $591ec71c2966bf8f$var$getInput(name, options).split('\n').filter((x)=>x !== ''
    );
    return inputs;
}
$591ec71c2966bf8f$exports.getMultilineInput = $591ec71c2966bf8f$var$getMultilineInput;
/**
 * Gets the input value of the boolean type in the YAML 1.2 "core schema" specification.
 * Support boolean input list: `true | True | TRUE | false | False | FALSE` .
 * The return value is also in boolean type.
 * ref: https://yaml.org/spec/1.2/spec.html#id2804923
 *
 * @param     name     name of the input to get
 * @param     options  optional. See InputOptions.
 * @returns   boolean
 */ function $591ec71c2966bf8f$var$getBooleanInput(name, options) {
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
    const val = $591ec71c2966bf8f$var$getInput(name, options);
    if (trueValue.includes(val)) return true;
    if (falseValue.includes(val)) return false;
    throw new TypeError(`Input does not meet YAML 1.2 "Core Schema" specification: ${name}\n` + `Support boolean input list: \`true | True | TRUE | false | False | FALSE\``);
}
$591ec71c2966bf8f$exports.getBooleanInput = $591ec71c2966bf8f$var$getBooleanInput;
/**
 * Sets the value of an output.
 *
 * @param     name     name of the output to set
 * @param     value    value to store. Non-string values will be converted to a string via JSON.stringify
 */ // eslint-disable-next-line @typescript-eslint/no-explicit-any
function $591ec71c2966bf8f$var$setOutput(name, value) {
    process.stdout.write($591ec71c2966bf8f$var$os.EOL);
    $758ba8cf478b882c$exports.issueCommand('set-output', {
        name: name
    }, value);
}
$591ec71c2966bf8f$exports.setOutput = $591ec71c2966bf8f$var$setOutput;
/**
 * Enables or disables the echoing of commands into stdout for the rest of the step.
 * Echoing is disabled by default if ACTIONS_STEP_DEBUG is not set.
 *
 */ function $591ec71c2966bf8f$var$setCommandEcho(enabled) {
    $758ba8cf478b882c$exports.issue('echo', enabled ? 'on' : 'off');
}
$591ec71c2966bf8f$exports.setCommandEcho = $591ec71c2966bf8f$var$setCommandEcho;
//-----------------------------------------------------------------------
// Results
//-----------------------------------------------------------------------
/**
 * Sets the action status to failed.
 * When the action exits it will be with an exit code of 1
 * @param message add error issue message
 */ function $591ec71c2966bf8f$var$setFailed(message) {
    process.exitCode = $591ec71c2966bf8f$var$ExitCode.Failure;
    $591ec71c2966bf8f$var$error(message);
}
$591ec71c2966bf8f$exports.setFailed = $591ec71c2966bf8f$var$setFailed;
//-----------------------------------------------------------------------
// Logging Commands
//-----------------------------------------------------------------------
/**
 * Gets whether Actions Step Debug is on or not
 */ function $591ec71c2966bf8f$var$isDebug() {
    return process.env['RUNNER_DEBUG'] === '1';
}
$591ec71c2966bf8f$exports.isDebug = $591ec71c2966bf8f$var$isDebug;
/**
 * Writes debug message to user log
 * @param message debug message
 */ function $591ec71c2966bf8f$var$debug(message) {
    $758ba8cf478b882c$exports.issueCommand('debug', {}, message);
}
$591ec71c2966bf8f$exports.debug = $591ec71c2966bf8f$var$debug;
/**
 * Adds an error issue
 * @param message error issue message. Errors will be converted to string via toString()
 * @param properties optional properties to add to the annotation.
 */ function $591ec71c2966bf8f$var$error(message, properties = {}) {
    $758ba8cf478b882c$exports.issueCommand('error', $eb4feaad92270349$exports.toCommandProperties(properties), message instanceof Error ? message.toString() : message);
}
$591ec71c2966bf8f$exports.error = $591ec71c2966bf8f$var$error;
/**
 * Adds a warning issue
 * @param message warning issue message. Errors will be converted to string via toString()
 * @param properties optional properties to add to the annotation.
 */ function $591ec71c2966bf8f$var$warning(message, properties = {}) {
    $758ba8cf478b882c$exports.issueCommand('warning', $eb4feaad92270349$exports.toCommandProperties(properties), message instanceof Error ? message.toString() : message);
}
$591ec71c2966bf8f$exports.warning = $591ec71c2966bf8f$var$warning;
/**
 * Adds a notice issue
 * @param message notice issue message. Errors will be converted to string via toString()
 * @param properties optional properties to add to the annotation.
 */ function $591ec71c2966bf8f$var$notice(message, properties = {}) {
    $758ba8cf478b882c$exports.issueCommand('notice', $eb4feaad92270349$exports.toCommandProperties(properties), message instanceof Error ? message.toString() : message);
}
$591ec71c2966bf8f$exports.notice = $591ec71c2966bf8f$var$notice;
/**
 * Writes info to log with console.log.
 * @param message info message
 */ function $591ec71c2966bf8f$var$info(message) {
    process.stdout.write(message + $591ec71c2966bf8f$var$os.EOL);
}
$591ec71c2966bf8f$exports.info = $591ec71c2966bf8f$var$info;
/**
 * Begin an output group.
 *
 * Output until the next `groupEnd` will be foldable in this group
 *
 * @param name The name of the output group
 */ function $591ec71c2966bf8f$var$startGroup(name) {
    $758ba8cf478b882c$exports.issue('group', name);
}
$591ec71c2966bf8f$exports.startGroup = $591ec71c2966bf8f$var$startGroup;
/**
 * End an output group.
 */ function $591ec71c2966bf8f$var$endGroup() {
    $758ba8cf478b882c$exports.issue('endgroup');
}
$591ec71c2966bf8f$exports.endGroup = $591ec71c2966bf8f$var$endGroup;
/**
 * Wrap an asynchronous function call in a group.
 *
 * Returns the same type as the function itself.
 *
 * @param name The name of the group
 * @param fn The function to wrap in the group
 */ function $591ec71c2966bf8f$var$group(name, fn) {
    return $591ec71c2966bf8f$var$__awaiter(this, void 0, void 0, function*() {
        $591ec71c2966bf8f$var$startGroup(name);
        let result;
        try {
            result = yield fn();
        } finally{
            $591ec71c2966bf8f$var$endGroup();
        }
        return result;
    });
}
$591ec71c2966bf8f$exports.group = $591ec71c2966bf8f$var$group;
//-----------------------------------------------------------------------
// Wrapper action state
//-----------------------------------------------------------------------
/**
 * Saves state for current action, the state can only be retrieved by this action's post job execution.
 *
 * @param     name     name of the state to store
 * @param     value    value to store. Non-string values will be converted to a string via JSON.stringify
 */ // eslint-disable-next-line @typescript-eslint/no-explicit-any
function $591ec71c2966bf8f$var$saveState(name, value) {
    $758ba8cf478b882c$exports.issueCommand('save-state', {
        name: name
    }, value);
}
$591ec71c2966bf8f$exports.saveState = $591ec71c2966bf8f$var$saveState;
/**
 * Gets the value of an state set by this action's main execution.
 *
 * @param     name     name of the state to get
 * @returns   string
 */ function $591ec71c2966bf8f$var$getState(name) {
    return process.env[`STATE_${name}`] || '';
}
$591ec71c2966bf8f$exports.getState = $591ec71c2966bf8f$var$getState;
function $591ec71c2966bf8f$var$getIDToken(aud) {
    return $591ec71c2966bf8f$var$__awaiter(this, void 0, void 0, function*() {
        return yield $4e6fc5b4d6bb9fa0$exports.OidcClient.getIDToken(aud);
    });
}
$591ec71c2966bf8f$exports.getIDToken = $591ec71c2966bf8f$var$getIDToken;


var $0bbe80c48fbd6962$exports = {};
'use strict';
var $5f1ad5cdab3056e0$exports = {};
$5f1ad5cdab3056e0$exports = JSON.parse("{\"Public Domain\":[\"CC0-1.0\",\"PDDL-1.0\",\"SAX-PD\",\"Unlicense\"],\"Permissive\":[\"AFL-1.1\",\"AFL-1.2\",\"AFL-2.0\",\"AFL-2.1\",\"AFL-3.0\",\"Apache-1.0\",\"Apache-1.1\",\"Apache-2.0\",\"Artistic-2.0\",\"BSD-2-Clause\",\"BSD-3-Clause\",\"BSD-3-Clause-Attribution\",\"BSD-3-Clause-Clear\",\"BSD-2-Clause-FreeBSD\",\"BSD-3-Clause-LBNL\",\"BSD-2-Clause-NetBSD\",\"BSD-3-Clause-No-Nuclear-License\",\"BSD-3-Clause-No-Nuclear-License-2014\",\"BSD-3-Clause-No-Nuclear-Warranty\",\"BSD-4-Clause\",\"BSD-4-Clause-UC\",\"DSDP\",\"ECL-2.0\",\"ISC\",\"MIT\",\"X11\",\"WTFPL\",\"OLDAP-2.2.2\",\"OLDAP-1.1\",\"OLDAP-1.2\",\"OLDAP-1.3\",\"OLDAP-1.4\",\"OLDAP-2.0\",\"OLDAP-2.0.1\",\"OLDAP-2.1\",\"OLDAP-2.2\",\"OLDAP-2.2.1\",\"OLDAP-2.3\",\"OLDAP-2.4\",\"OLDAP-2.5\",\"OLDAP-2.6\",\"OLDAP-2.7\",\"OLDAP-2.8\",\"PHP-3.0\",\"PHP-3.01\",\"Python-2.0\",\"Zlib\",\"zlib-acknowledgement\",\"XFree86-1.1\",\"W3C-20150513\",\"W3C-19980720\",\"W3C\",\"OpenSSL\",\"Naumen\",\"JasPer-2.0\",\"EFL-1.0\",\"EFL-2.0\",\"MIT-advertising\",\"MIT-enna\",\"MIT-CMU\",\"APSL-1.0\",\"Beerware\",\"CECILL-1.0\",\"CECILL-1.1\",\"CECILL-2.0\",\"CECILL-2.1\",\"CECILL-B\",\"CNRI-Jython\",\"CNRI-Python\",\"CNRI-Python-GPL-Compatible\",\"Condor-1.1\",\"MIT-feh\",\"FTL\",\"ICU\",\"Ruby\",\"Sendmail\",\"iMatix\",\"xinetd\",\"ZPL-1.1\",\"ZPL-2.0\",\"ZPL-2.1\",\"TCL\"],\"Weakly Protective\":[\"LGPL-2.0\",\"LGPL-2.1\",\"LGPL-2.1+\",\"LGPL-3.0\",\"LGPL-3.0+\",\"MPL-2.0\",\"MPL-1.0\",\"MPL-1.1\",\"MPL-2.0-no-copyleft-exception\",\"CDDL-1.0\",\"CDDL-1.1\",\"MS-PL\",\"Sleepycat\",\"ClArtistic\",\"Artistic-1.0\",\"Artistic-1.0-Perl\",\"Artistic-1.0-cl8\",\"APSL-1.1\",\"APSL-1.2\",\"APSL-2.0\",\"LPPL-1.0\",\"LPPL-1.1\",\"LPPL-1.2\",\"LPPL-1.3a\",\"LPPL-1.3c\",\"CPAL-1.0\",\"CATOSL-1.1\",\"CUA-OPL-1.0\",\"ErlPL-1.1\",\"gSOAP-1.3b\",\"IPL-1.0\",\"NASA-1.3\",\"NOSL\",\"Nokia\",\"RHeCos-1.1\",\"RSCPL\",\"SugarCRM-1.1.3\",\"SISSL\",\"SISSL-1.2\",\"SPL-1.0\",\"Zimbra-1.3\",\"Zimbra-1.4\",\"BitTorrent-1.0\",\"BitTorrent-1.1\",\"CECILL-C\",\"Motosoto\",\"MS-LRL\",\"Watcom-1.0\",\"YPL-1.0\",\"YPL-1.1\",\"Interbase-1.0\"],\"Strongly Protective\":[\"CPL-1.0\",\"GPL-1.0\",\"GPL-3.0\",\"GPL-3.0+\",\"GPL-2.0\",\"GPL-2.0+\",\"MS-RL\",\"ODbL-1.0\",\"OSL-1.0\",\"OSL-1.1\",\"OSL-2.0\",\"OSL-2.1\",\"OSL-3.0\",\"RPL-1.1\",\"RPL-1.5\",\"APL-1.0\",\"EPL-1.0\",\"EPL-2.0\",\"EUPL-1.0\",\"EUPL-1.1\",\"IPA\",\"Vim\"],\"Network Protective\":[\"AGPL-1.0\",\"AGPL-3.0\",\"AGPL-3.0-only\",\"AGPL-3.0-or-later\",\"AGPL-1.0-only\",\"AGPL-1.0-or-later\"],\"Uncategorized\":[\"0BSD\",\"AAL\",\"Abstyles\",\"Adobe-2006\",\"Adobe-Glyph\",\"ADSL\",\"Afmparse\",\"Aladdin\",\"AMDPLPA\",\"AML\",\"AMPAS\",\"ANTLR-PD\",\"APAFML\",\"Bahyph\",\"Barr\",\"Borceux\",\"BSD-Protection\",\"BSD-Source-Code\",\"BSL-1.0\",\"bzip2-1.0.5\",\"bzip2-1.0.6\",\"Caldera\",\"CC-BY-1.0\",\"CC-BY-2.0\",\"CC-BY-2.5\",\"CC-BY-3.0\",\"CC-BY-4.0\",\"CC-BY-NC-1.0\",\"CC-BY-NC-2.0\",\"CC-BY-NC-2.5\",\"CC-BY-NC-3.0\",\"CC-BY-NC-4.0\",\"CC-BY-NC-ND-1.0\",\"CC-BY-NC-ND-2.0\",\"CC-BY-NC-ND-2.5\",\"CC-BY-NC-ND-3.0\",\"CC-BY-NC-ND-4.0\",\"CC-BY-NC-SA-1.0\",\"CC-BY-NC-SA-2.0\",\"CC-BY-NC-SA-2.5\",\"CC-BY-NC-SA-3.0\",\"CC-BY-NC-SA-4.0\",\"CC-BY-ND-1.0\",\"CC-BY-ND-2.0\",\"CC-BY-ND-2.5\",\"CC-BY-ND-3.0\",\"CC-BY-ND-4.0\",\"CC-BY-SA-1.0\",\"CC-BY-SA-2.0\",\"CC-BY-SA-2.5\",\"CC-BY-SA-3.0\",\"CC-BY-SA-4.0\",\"CPOL-1.02\",\"Crossword\",\"CrystalStacker\",\"Cube\",\"curl\",\"D-FSL-1.0\",\"diffmark\",\"DOC\",\"Dotseqn\",\"dvipdfm\",\"ECL-1.0\",\"eGenix\",\"Entessa\",\"EUDatagrid\",\"Eurosym\",\"Fair\",\"Frameworx-1.0\",\"FreeImage\",\"FSFAP\",\"FSFUL\",\"FSFULLR\",\"GFDL-1.1\",\"GFDL-1.2\",\"GFDL-1.3\",\"Giftware\",\"GL2PS\",\"Glide\",\"Glulxe\",\"gnuplot\",\"HaskellReport\",\"HPND\",\"IBM-pibs\",\"IJG\",\"ImageMagick\",\"Imlib2\",\"Info-ZIP\",\"Intel\",\"Intel-ACPI\",\"JSON\",\"LAL-1.2\",\"LAL-1.3\",\"Latex2e\",\"Leptonica\",\"LGPLLR\",\"Libpng\",\"libtiff\",\"LiLiQ-P-1.1\",\"LiLiQ-R-1.1\",\"LiLiQ-Rplus-1.1\",\"LPL-1.0\",\"LPL-1.02\",\"MakeIndex\",\"MirOS\",\"MITNFA\",\"mpich2\",\"MTLL\",\"Multics\",\"Mup\",\"NBPL-1.0\",\"NCSA\",\"Net-SNMP\",\"NetCDF\",\"Newsletr\",\"NGPL\",\"NLOD-1.0\",\"NLPL\",\"Noweb\",\"NPL-1.0\",\"NPL-1.1\",\"NPOSL-3.0\",\"NRL\",\"NTP\",\"Nunit\",\"OCCT-PL\",\"OCLC-2.0\",\"OFL-1.0\",\"OFL-1.1\",\"OGTSL\",\"OML\",\"OPL-1.0\",\"OSET-PL-2.1\",\"Plexus\",\"PostgreSQL\",\"psfrag\",\"psutils\",\"Qhull\",\"QPL-1.0\",\"Rdisc\",\"RPSL-1.0\",\"RSA-MD\",\"Saxpath\",\"SCEA\",\"SGI-B-1.0\",\"SGI-B-1.1\",\"SGI-B-2.0\",\"SimPL-2.0\",\"SMLNJ\",\"SMPPL\",\"SNIA\",\"Spencer-86\",\"Spencer-94\",\"Spencer-99\",\"SWL\",\"TCP-wrappers\",\"TMate\",\"TORQUE-1.1\",\"TOSL\",\"Unicode-DFS-2015\",\"Unicode-DFS-2016\",\"Unicode-TOU\",\"UPL-1.0\",\"VOSTROM\",\"VSL-1.0\",\"Wsuipa\",\"Xerox\",\"Xnet\",\"xpp\",\"XSkat\",\"Zed\",\"Zend-2.0\"]}");


var $e564ab77b57c5e33$exports = {};
var $2b72ef21e0b31700$exports = {};
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

*/ var $2b72ef21e0b31700$var$colors = {};
$2b72ef21e0b31700$exports = $2b72ef21e0b31700$var$colors;
$2b72ef21e0b31700$var$colors.themes = {};


var $2b72ef21e0b31700$var$ansiStyles = $2b72ef21e0b31700$var$colors.styles = (parcelRequire("lQr2O"));
var $2b72ef21e0b31700$var$defineProps = Object.defineProperties;
var $2b72ef21e0b31700$var$newLineRegex = new RegExp(/[\r\n]+/g);

$2b72ef21e0b31700$var$colors.supportsColor = (parcelRequire("hLGnk")).supportsColor;
if (typeof $2b72ef21e0b31700$var$colors.enabled === 'undefined') $2b72ef21e0b31700$var$colors.enabled = $2b72ef21e0b31700$var$colors.supportsColor() !== false;
$2b72ef21e0b31700$var$colors.enable = function() {
    $2b72ef21e0b31700$var$colors.enabled = true;
};
$2b72ef21e0b31700$var$colors.disable = function() {
    $2b72ef21e0b31700$var$colors.enabled = false;
};
$2b72ef21e0b31700$var$colors.stripColors = $2b72ef21e0b31700$var$colors.strip = function(str) {
    return ('' + str).replace(/\x1B\[\d+m/g, '');
};
// eslint-disable-next-line no-unused-vars
var $2b72ef21e0b31700$var$stylize = $2b72ef21e0b31700$var$colors.stylize = function stylize(str, style) {
    if (!$2b72ef21e0b31700$var$colors.enabled) return str + '';
    var styleMap = $2b72ef21e0b31700$var$ansiStyles[style];
    // Stylize should work for non-ANSI styles, too
    if (!styleMap && style in $2b72ef21e0b31700$var$colors) // Style maps like trap operate as functions on strings;
    // they don't have properties like open or close.
    return $2b72ef21e0b31700$var$colors[style](str);
    return styleMap.open + str + styleMap.close;
};
var $2b72ef21e0b31700$var$matchOperatorsRe = /[|\\{}()[\]^$+*?.]/g;
var $2b72ef21e0b31700$var$escapeStringRegexp = function(str) {
    if (typeof str !== 'string') throw new TypeError('Expected a string');
    return str.replace($2b72ef21e0b31700$var$matchOperatorsRe, '\\$&');
};
function $2b72ef21e0b31700$var$build(_styles) {
    var builder1 = function builder() {
        return $2b72ef21e0b31700$var$applyStyle.apply(builder, arguments);
    };
    builder1._styles = _styles;
    // __proto__ is used because we must return a function, but there is
    // no way to create a function with a different prototype.
    builder1.__proto__ = $2b72ef21e0b31700$var$proto;
    return builder1;
}
var $2b72ef21e0b31700$var$styles = function() {
    var ret = {};
    $2b72ef21e0b31700$var$ansiStyles.grey = $2b72ef21e0b31700$var$ansiStyles.gray;
    Object.keys($2b72ef21e0b31700$var$ansiStyles).forEach(function(key) {
        $2b72ef21e0b31700$var$ansiStyles[key].closeRe = new RegExp($2b72ef21e0b31700$var$escapeStringRegexp($2b72ef21e0b31700$var$ansiStyles[key].close), 'g');
        ret[key] = {
            get: function() {
                return $2b72ef21e0b31700$var$build(this._styles.concat(key));
            }
        };
    });
    return ret;
}();
var $2b72ef21e0b31700$var$proto = $2b72ef21e0b31700$var$defineProps(function colors() {}, $2b72ef21e0b31700$var$styles);
function $2b72ef21e0b31700$var$applyStyle() {
    var args = Array.prototype.slice.call(arguments);
    var str = args.map(function(arg) {
        // Use weak equality check so we can colorize null/undefined in safe mode
        if (arg != null && arg.constructor === String) return arg;
        else return $iKjJo$util.inspect(arg);
    }).join(' ');
    if (!$2b72ef21e0b31700$var$colors.enabled || !str) return str;
    var newLinesPresent = str.indexOf('\n') != -1;
    var nestedStyles = this._styles;
    var i = nestedStyles.length;
    while(i--){
        var code = $2b72ef21e0b31700$var$ansiStyles[nestedStyles[i]];
        str = code.open + str.replace(code.closeRe, code.open) + code.close;
        if (newLinesPresent) str = str.replace($2b72ef21e0b31700$var$newLineRegex, function(match) {
            return code.close + match + code.open;
        });
    }
    return str;
}
$2b72ef21e0b31700$var$colors.setTheme = function(theme) {
    if (typeof theme === 'string') {
        console.log("colors.setTheme now only accepts an object, not a string.  If you are trying to set a theme from a file, it is now your (the caller's) responsibility to require the file.  The old syntax looked like colors.setTheme(__dirname + '/../themes/generic-logging.js'); The new syntax looks like colors.setTheme(require(__dirname + '/../themes/generic-logging.js'));");
        return;
    }
    for(var style1 in theme)(function(style) {
        $2b72ef21e0b31700$var$colors[style] = function(str) {
            if (typeof theme[style] === 'object') {
                var out = str;
                for(var i in theme[style])out = $2b72ef21e0b31700$var$colors[theme[style][i]](out);
                return out;
            }
            return $2b72ef21e0b31700$var$colors[theme[style]](str);
        };
    })(style1);
};
function $2b72ef21e0b31700$var$init() {
    var ret = {};
    Object.keys($2b72ef21e0b31700$var$styles).forEach(function(name) {
        ret[name] = {
            get: function() {
                return $2b72ef21e0b31700$var$build([
                    name
                ]);
            }
        };
    });
    return ret;
}
var $2b72ef21e0b31700$var$sequencer = function sequencer(map, str) {
    var exploded = str.split('');
    exploded = exploded.map(map);
    return exploded.join('');
};

// custom formatter methods
$2b72ef21e0b31700$var$colors.trap = (parcelRequire("7yHOw"));

$2b72ef21e0b31700$var$colors.zalgo = (parcelRequire("a2kWw"));
// maps
$2b72ef21e0b31700$var$colors.maps = {};

$2b72ef21e0b31700$var$colors.maps.america = (parcelRequire("boGNT"))($2b72ef21e0b31700$var$colors);

$2b72ef21e0b31700$var$colors.maps.zebra = (parcelRequire("eDqjO"))($2b72ef21e0b31700$var$colors);

$2b72ef21e0b31700$var$colors.maps.rainbow = (parcelRequire("JVmaW"))($2b72ef21e0b31700$var$colors);

$2b72ef21e0b31700$var$colors.maps.random = (parcelRequire("eIKEo"))($2b72ef21e0b31700$var$colors);
for(var $2b72ef21e0b31700$var$map in $2b72ef21e0b31700$var$colors.maps)(function(map) {
    $2b72ef21e0b31700$var$colors[map] = function(str) {
        return $2b72ef21e0b31700$var$sequencer($2b72ef21e0b31700$var$colors.maps[map], str);
    };
})($2b72ef21e0b31700$var$map);
$2b72ef21e0b31700$var$defineProps($2b72ef21e0b31700$var$colors, $2b72ef21e0b31700$var$init());


$e564ab77b57c5e33$exports = $2b72ef21e0b31700$exports;





const /** @private */ $0bbe80c48fbd6962$var$licenseTypes = {
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
*/ /** @private */ $0bbe80c48fbd6962$var$license_type = function(license) {
    // license = license ? license.replace('+', '') : licenseTypes.unlicensed;
    // gives false positives try MMIT
    // license = correctedLicense(license);
    if (!license) // console.log('NO license found:', license);
    return $0bbe80c48fbd6962$var$licenseTypes.unlicensed;
    else if ($5f1ad5cdab3056e0$exports[$0bbe80c48fbd6962$var$licenseTypes.publicDomain].indexOf(license) >= 0) return $0bbe80c48fbd6962$var$licenseTypes.publicDomain;
    else if ($5f1ad5cdab3056e0$exports[$0bbe80c48fbd6962$var$licenseTypes.permissive].indexOf(license) >= 0) return $0bbe80c48fbd6962$var$licenseTypes.permissive;
    else if ($5f1ad5cdab3056e0$exports[$0bbe80c48fbd6962$var$licenseTypes.weaklyProtective].indexOf(license) >= 0) return $0bbe80c48fbd6962$var$licenseTypes.weaklyProtective;
    else if ($5f1ad5cdab3056e0$exports[$0bbe80c48fbd6962$var$licenseTypes.stronglyProtectivee].indexOf(license) >= 0) return $0bbe80c48fbd6962$var$licenseTypes.stronglyProtectivee;
    else if ($5f1ad5cdab3056e0$exports[$0bbe80c48fbd6962$var$licenseTypes.networkProtective].indexOf(license) >= 0) return $0bbe80c48fbd6962$var$licenseTypes.networkProtective;
    else // console.log('Unknown license type:', license);
    return $0bbe80c48fbd6962$var$licenseTypes.unknown;
}, /** @private */ $0bbe80c48fbd6962$var$forward_compatiblity = function(pkgLicenseType, moduleLicenseType) {
    switch(moduleLicenseType){
        case $0bbe80c48fbd6962$var$licenseTypes.unlicensed:
            return false;
        case $0bbe80c48fbd6962$var$licenseTypes.unknown:
            return false;
        case $0bbe80c48fbd6962$var$licenseTypes.publicDomain:
            return [
                $0bbe80c48fbd6962$var$licenseTypes.unlicensed,
                $0bbe80c48fbd6962$var$licenseTypes.unknown,
                $0bbe80c48fbd6962$var$licenseTypes.publicDomain,
                $0bbe80c48fbd6962$var$licenseTypes.permissive,
                $0bbe80c48fbd6962$var$licenseTypes.weaklyProtective,
                $0bbe80c48fbd6962$var$licenseTypes.stronglyProtectivee,
                $0bbe80c48fbd6962$var$licenseTypes.networkProtective
            ].indexOf(pkgLicenseType) >= 0;
        case $0bbe80c48fbd6962$var$licenseTypes.permissive:
            return [
                $0bbe80c48fbd6962$var$licenseTypes.unlicensed,
                $0bbe80c48fbd6962$var$licenseTypes.permissive,
                $0bbe80c48fbd6962$var$licenseTypes.weaklyProtective,
                $0bbe80c48fbd6962$var$licenseTypes.stronglyProtectivee,
                $0bbe80c48fbd6962$var$licenseTypes.networkProtective
            ].indexOf(pkgLicenseType) >= 0;
        case $0bbe80c48fbd6962$var$licenseTypes.weaklyProtective:
            return [
                $0bbe80c48fbd6962$var$licenseTypes.unlicensed,
                $0bbe80c48fbd6962$var$licenseTypes.weaklyProtective,
                $0bbe80c48fbd6962$var$licenseTypes.stronglyProtectivee,
                $0bbe80c48fbd6962$var$licenseTypes.networkProtective
            ].indexOf(pkgLicenseType) >= 0;
        case $0bbe80c48fbd6962$var$licenseTypes.stronglyProtectivee:
            return [
                $0bbe80c48fbd6962$var$licenseTypes.unlicensed,
                $0bbe80c48fbd6962$var$licenseTypes.stronglyProtectivee,
                $0bbe80c48fbd6962$var$licenseTypes.networkProtective
            ].indexOf(pkgLicenseType) >= 0;
        case $0bbe80c48fbd6962$var$licenseTypes.networkProtective:
            return [
                $0bbe80c48fbd6962$var$licenseTypes.unlicensed,
                $0bbe80c48fbd6962$var$licenseTypes.networkProtective
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
 */ /** @private */ function $0bbe80c48fbd6962$var$checkProgress(progress, total, incompat, output, cb) {
    progress++;
    if (progress === total) {
        if (incompat) {
            output.push('');
            output.push($e564ab77b57c5e33$exports.red('License issues found'));
            output.push('');
            // console.log(output.join(os.EOL));
            cb(null, false, output.join($iKjJo$os.EOL));
        } else {
            output.push('');
            output.push($e564ab77b57c5e33$exports.green('No license issues found'));
            output.push('');
            // console.log(output.join(os.EOL));
            cb(null, true, output.join($iKjJo$os.EOL));
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
 * var lcc = require('license-compatibility-checker');
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
 */ function $0bbe80c48fbd6962$var$check(pathOfPackageJson, dirs, cb) {
    let incompat = false, pkg = JSON.parse($iKjJo$fs.readFileSync(pathOfPackageJson, 'utf-8')), output = [], noLicenseStr = $e564ab77b57c5e33$exports.red('No license'), pkgLicense = pkg.license ? typeof pkg.license === 'string' || pkg.license instanceof String ? pkg.license : pkg.license.type || pkgLicense : pkgLicense;
    pkgLicense = pkgLicense ? pkgLicense : pkg.licenses && pkg.licenses[0] && pkg.licenses[0].type ? typeof pkg.licenses[0].type === 'string' || pkg.licenses[0].type instanceof String ? pkg.licenses[0].type : pkg.licenses.type || pkgLicense : pkgLicense;
    let pkgLicenseType = $0bbe80c48fbd6962$var$license_type(pkgLicense);
    output.push($e564ab77b57c5e33$exports.yellow('Checking', $e564ab77b57c5e33$exports.blue(pkgLicense ? pkgLicense : noLicenseStr), `(${pkgLicenseType})`, 'of', `${pkg.name}@${pkg.version}`, $iKjJo$os.EOL, 'in', $e564ab77b57c5e33$exports.blue($iKjJo$path.resolve(pathOfPackageJson)), $iKjJo$os.EOL, 'against', `${$e564ab77b57c5e33$exports.blue($iKjJo$path.resolve(pathOfPackageJson, '..'))}'s modules:`));
    output.push('');
    let pkgCompatiblityString;
    if (pkgLicenseType === $0bbe80c48fbd6962$var$licenseTypes.unknown || pkgLicenseType === $0bbe80c48fbd6962$var$licenseTypes.unlicensed) // incompat = true;
    pkgCompatiblityString = 'possibly incompatible';
    else pkgCompatiblityString = 'incompatible';
    let progress = 0, total = dirs.length;
    dirs.forEach((dir)=>{
        let packageJsonFile = $iKjJo$path.join(dir, 'package.json');
        try {
            $iKjJo$fs.accessSync(packageJsonFile);
            const data = $iKjJo$fs.readFileSync(packageJsonFile);
            console.log('Checking', `${packageJsonFile}; file`, progress + 1, 'of', total);
            let modulePkg = JSON.parse(data), moduleLicense = modulePkg.license ? typeof modulePkg.license === 'string' || modulePkg.license instanceof String ? modulePkg.license : modulePkg.license.type || null : null;
            moduleLicense = moduleLicense ? moduleLicense : modulePkg.licenses && modulePkg.licenses[0] && modulePkg.licenses[0].type ? typeof modulePkg.licenses[0].type === 'string' || modulePkg.licenses[0].type instanceof String ? modulePkg.licenses[0].type : pkg.licenses.type || moduleLicense : moduleLicense;
            let moduleLicenseType = $0bbe80c48fbd6962$var$license_type(moduleLicense);
            if (moduleLicenseType === $0bbe80c48fbd6962$var$licenseTypes.unknown || moduleLicenseType === $0bbe80c48fbd6962$var$licenseTypes.unlicensed) // incompat = true;
            output.push(`${modulePkg.name}@${modulePkg.version} ${$e564ab77b57c5e33$exports.red(moduleLicense ? moduleLicense : noLicenseStr)} ${$e564ab77b57c5e33$exports.yellow(`(${moduleLicenseType}) - ${$e564ab77b57c5e33$exports.red('possibly incompatible')} with ${$e564ab77b57c5e33$exports.blue(pkgLicense ? pkgLicense : noLicenseStr)} (${pkgLicenseType})`)}`);
            else if (!$0bbe80c48fbd6962$var$forward_compatiblity(pkgLicenseType, moduleLicenseType)) {
                incompat = true;
                output.push(`${modulePkg.name}@${modulePkg.version} ${$e564ab77b57c5e33$exports.red(moduleLicense)} ${$e564ab77b57c5e33$exports.yellow(`(${moduleLicenseType}) - ${$e564ab77b57c5e33$exports.red(pkgCompatiblityString)} with ${$e564ab77b57c5e33$exports.blue(pkgLicense ? pkgLicense : noLicenseStr)} (${pkgLicenseType})`)}`);
            } else output.push(`${modulePkg.name}@${modulePkg.version} ${$e564ab77b57c5e33$exports.green(moduleLicense)} ${$e564ab77b57c5e33$exports.yellow(`(${moduleLicenseType}) -`, `${$e564ab77b57c5e33$exports.green('compatible')} with ${$e564ab77b57c5e33$exports.blue(pkgLicense ? pkgLicense : noLicenseStr)} (${pkgLicenseType})`)}`);
            progress = $0bbe80c48fbd6962$var$checkProgress(progress, total, incompat, output, cb);
        } catch (err) {
            console.log(err);
            progress = $0bbe80c48fbd6962$var$checkProgress(progress, total, incompat, output, cb);
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
 * var lcc = require('license-compatibility-checker');
 * var path = require('path');
 * var output = lcc.checkSync(path.join(process.cwd(),'package.json'), path.join(process.cwd(),"node_modules"));
 * if (output) console.log(output);
 */ function $0bbe80c48fbd6962$var$checkSync(pathOfPackageJson, modules) {
    let x = function(err, passed, output) {
        // return new LicenseCheck(err, passed, output);
        return {
            'err': err,
            'passed': passed,
            'output': output
        };
    };
    $0bbe80c48fbd6962$var$check(pathOfPackageJson, modules, x);
    return x;
}
$0bbe80c48fbd6962$exports = {
    /* Check for licenses issues of the given project.json compared (flat) to a folder of node_modules. */ 'check': $0bbe80c48fbd6962$var$check,
    /* Check for licenses issues of the given project.json compared (flat) to a folder of node_modules. Synchronous version. */ 'checkSync': $0bbe80c48fbd6962$var$checkSync
};




// const updateNotifier = require('update-notifier');
// updateNotifier({ pkg }).notify();
const $90a31be4d153cc88$var$readdirRecursiveSync = (dir1, maxDepth, depth)=>{
    if (depth && depth > (maxDepth || 10)) return [];
    const list = $iKjJo$fs.readdirSync(dir1).map((v)=>$iKjJo$path.resolve(dir1, v)
    );
    let pending = list.filter((v)=>$iKjJo$fs.statSync(v).isDirectory()
    );
    if (pending.length <= 0) return list.filter((v)=>$iKjJo$fs.statSync(v).isFile()
    );
    else {
        pending.forEach((dir)=>$90a31be4d153cc88$var$readdirRecursiveSync(dir, maxDepth || 10, depth ? depth + 1 : 1).forEach((v)=>list.push(v)
            )
        );
        return list.filter((v)=>$iKjJo$fs.statSync(v).isFile()
        );
    }
}, $90a31be4d153cc88$var$returnCode = (()=>{
    try {
        const root = $iKjJo$path.resolve(process.cwd(), $591ec71c2966bf8f$exports.getInput('project-root'));
        if (!$iKjJo$fs.existsSync(root)) throw new Error(`Invalid Path ${root}!`);
        const pkg = $iKjJo$path.resolve(root, 'package.json');
        if (!$iKjJo$fs.existsSync(pkg)) throw new Error('Cannot find package.json at %s!', pkg);
        console.log('Checking for Packages at %s...', root);
        const entries = [], files = $90a31be4d153cc88$var$readdirRecursiveSync(root).filter((file)=>[
                'package.json'
            ].includes(file.split('\\').join('/').split('/').pop().toLowerCase())
        ).map((v)=>$iKjJo$path.join(v, '..')
        ).filter((v1)=>{
            v1 = v1.split('\\').join('/').split('/');
            return v1.filter((v)=>!v.startsWith('.')
            ).length === v1.length;
        })// eslint-disable-next-line no-confusing-arrow
        .filter((v)=>entries.includes(v) ? false : entries.push(v) ? true : true
        );
        console.log('Checking %s Direrctories...', files.length.toString());
        $0bbe80c48fbd6962$exports.check(pkg, files, (err, passed, output)=>{
            if (err) throw err;
            else if (passed) console.log('Passed!\nOutput:\n', output);
            else {
                console.error('Did not pass!\nOutput:\n', output);
                throw new Error('Did not pass!');
            }
        });
    } catch (error) {
        $591ec71c2966bf8f$exports.setFailed(error.message);
        throw error;
    }
})() ?? 0;
if ($90a31be4d153cc88$var$returnCode !== 0) $591ec71c2966bf8f$exports.setFailed('See Log for error');
process.exit($90a31be4d153cc88$var$returnCode);


//# sourceMappingURL=index.js.map
