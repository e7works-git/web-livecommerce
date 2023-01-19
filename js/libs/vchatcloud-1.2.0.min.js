! function(n, e) {
    if ("object" == typeof exports && "object" == typeof module)
        module.exports = e();
    else if ("function" == typeof define && define.amd)
        define([], e);
    else {
        var t = e();
        for (var r in t)
            ("object" == typeof exports ? exports : n)[r] = t[r]
    }
}(self, (function() {
    return (() => {
        var n = {
                187: n => {
                    "use strict";
                    var e, t = "object" == typeof Reflect ? Reflect : null,
                        r = t && "function" == typeof t.apply ? t.apply : function(n, e, t) {
                            return Function.prototype.apply.call(n, e, t)
                        };
                    e = t && "function" == typeof t.ownKeys ? t.ownKeys : Object.getOwnPropertySymbols ? function(n) {
                            return Object.getOwnPropertyNames(n).concat(Object.getOwnPropertySymbols(n))
                        } :
                        function(n) {
                            return Object.getOwnPropertyNames(n)
                        };
                    var i = Number.isNaN || function(n) {
                        return n != n
                    };

                    function o() {
                        o.init.call(this)
                    }
                    n.exports = o,
                        n.exports.once = function(n, e) {
                            return new Promise((function(t, r) {
                                function i(t) {
                                    n.removeListener(e, o),
                                        r(t)
                                }

                                function o() {
                                    "function" == typeof n.removeListener && n.removeListener("error", i),
                                        t([].slice.call(arguments))
                                }
                                h(n, e, o, {
                                        once: !0
                                    }),
                                    "error" !== e && function(n, e, t) {
                                        "function" == typeof n.on && h(n, "error", e, t)
                                    }(n, i, {
                                        once: !0
                                    })
                            }))
                        },
                        o.EventEmitter = o,
                        o.prototype.l = void 0,
                        o.prototype.h = 0,
                        o.prototype.g = void 0;
                    var c = 10;

                    function a(n) {
                        if ("function" != typeof n)
                            throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof n)
                    }

                    function s(n) {
                        return void 0 === n.g ? o.defaultMaxListeners : n.g
                    }

                    function u(n, e, t, r) {
                        var i, o, c, u;
                        if (a(t),
                            void 0 === (o = n.l) ? (o = n.l = Object.create(null),
                                n.h = 0) : (void 0 !== o.newListener && (n.emit("newListener", e, t.listener ? t.listener : t),
                                    o = n.l),
                                c = o[e]),
                            void 0 === c)
                            c = o[e] = t,
                            ++n.h;
                        else if ("function" == typeof c ? c = o[e] = r ? [t, c] : [c, t] : r ? c.unshift(t) : c.push(t),
                            (i = s(n)) > 0 && c.length > i && !c.warned) {
                            c.warned = !0;
                            var f = new Error("Possible EventEmitter memory leak detected. " + c.length + " " + String(e) + " listeners added. Use emitter.setMaxListeners() to increase limit");
                            f.name = "MaxListenersExceededWarning",
                                f.emitter = n,
                                f.type = e,
                                f.count = c.length,
                                u = f,
                                console && console.warn && console.warn(u)
                        }
                        return n
                    }

                    function f() {
                        if (!this.fired)
                            return this.target.removeListener(this.type, this.wrapFn),
                                this.fired = !0,
                                0 === arguments.length ? this.listener.call(this.target) : this.listener.apply(this.target, arguments)
                    }

                    function l(n, e, t) {
                        var r = {
                                fired: !1,
                                wrapFn: void 0,
                                target: n,
                                type: e,
                                listener: t
                            },
                            i = f.bind(r);
                        return i.listener = t,
                            r.wrapFn = i,
                            i
                    }

                    function d(n, e, t) {
                        var r = n.l;
                        if (void 0 === r)
                            return [];
                        var i = r[e];
                        return void 0 === i ? [] : "function" == typeof i ? t ? [i.listener || i] : [i] : t ? function(n) {
                            for (var e = new Array(n.length), t = 0; t < e.length; ++t)
                                e[t] = n[t].listener || n[t];
                            return e
                        }(i) : v(i, i.length)
                    }

                    function m(n) {
                        var e = this.l;
                        if (void 0 !== e) {
                            var t = e[n];
                            if ("function" == typeof t)
                                return 1;
                            if (void 0 !== t)
                                return t.length
                        }
                        return 0
                    }

                    function v(n, e) {
                        for (var t = new Array(e), r = 0; r < e; ++r)
                            t[r] = n[r];
                        return t
                    }

                    function h(n, e, t, r) {
                        if ("function" == typeof n.on)
                            r.once ? n.once(e, t) : n.on(e, t);
                        else {
                            if ("function" != typeof n.addEventListener)
                                throw new TypeError('The "emitter" argument must be of type EventEmitter. Received type ' + typeof n);
                            n.addEventListener(e, (function i(o) {
                                r.once && n.removeEventListener(e, i),
                                    t(o)
                            }))
                        }
                    }
                    Object.defineProperty(o, "defaultMaxListeners", {
                            enumerable: !0,
                            get: function() {
                                return c
                            },
                            set: function(n) {
                                if ("number" != typeof n || n < 0 || i(n))
                                    throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' + n + ".");
                                c = n
                            }
                        }),
                        o.init = function() {
                            void 0 !== this.l && this.l !== Object.getPrototypeOf(this).l || (this.l = Object.create(null),
                                    this.h = 0),
                                this.g = this.g || void 0
                        },
                        o.prototype.setMaxListeners = function(n) {
                            if ("number" != typeof n || n < 0 || i(n))
                                throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received ' + n + ".");
                            return this.g = n,
                                this
                        },
                        o.prototype.getMaxListeners = function() {
                            return s(this)
                        },
                        o.prototype.emit = function(n) {
                            for (var e = [], t = 1; t < arguments.length; t++)
                                e.push(arguments[t]);
                            var i = "error" === n,
                                o = this.l;
                            if (void 0 !== o)
                                i = i && void 0 === o.error;
                            else if (!i)
                                return !1;
                            if (i) {
                                var c;
                                if (e.length > 0 && (c = e[0]),
                                    c instanceof Error)
                                    throw c;
                                var a = new Error("Unhandled error." + (c ? " (" + c.message + ")" : ""));
                                throw a.context = c,
                                    a
                            }
                            var s = o[n];
                            if (void 0 === s)
                                return !1;
                            if ("function" == typeof s)
                                r(s, this, e);
                            else {
                                var u = s.length,
                                    f = v(s, u);
                                for (t = 0; t < u; ++t)
                                    r(f[t], this, e)
                            }
                            return !0
                        },
                        o.prototype.addListener = function(n, e) {
                            return u(this, n, e, !1)
                        },
                        o.prototype.on = o.prototype.addListener,
                        o.prototype.prependListener = function(n, e) {
                            return u(this, n, e, !0)
                        },
                        o.prototype.once = function(n, e) {
                            return a(e),
                                this.on(n, l(this, n, e)),
                                this
                        },
                        o.prototype.prependOnceListener = function(n, e) {
                            return a(e),
                                this.prependListener(n, l(this, n, e)),
                                this
                        },
                        o.prototype.removeListener = function(n, e) {
                            var t, r, i, o, c;
                            if (a(e),
                                void 0 === (r = this.l))
                                return this;
                            if (void 0 === (t = r[n]))
                                return this;
                            if (t === e || t.listener === e)
                                0 == --this.h ? this.l = Object.create(null) : (delete r[n],
                                    r.removeListener && this.emit("removeListener", n, t.listener || e));
                            else if ("function" != typeof t) {
                                for (i = -1,
                                    o = t.length - 1; o >= 0; o--)
                                    if (t[o] === e || t[o].listener === e) {
                                        c = t[o].listener,
                                            i = o;
                                        break
                                    }
                                if (i < 0)
                                    return this;
                                0 === i ? t.shift() : function(n, e) {
                                        for (; e + 1 < n.length; e++)
                                            n[e] = n[e + 1];
                                        n.pop()
                                    }(t, i),
                                    1 === t.length && (r[n] = t[0]),
                                    void 0 !== r.removeListener && this.emit("removeListener", n, c || e)
                            }
                            return this
                        },
                        o.prototype.off = o.prototype.removeListener,
                        o.prototype.removeAllListeners = function(n) {
                            var e, t, r;
                            if (void 0 === (t = this.l))
                                return this;
                            if (void 0 === t.removeListener)
                                return 0 === arguments.length ? (this.l = Object.create(null),
                                        this.h = 0) : void 0 !== t[n] && (0 == --this.h ? this.l = Object.create(null) : delete t[n]),
                                    this;
                            if (0 === arguments.length) {
                                var i, o = Object.keys(t);
                                for (r = 0; r < o.length; ++r)
                                    "removeListener" !== (i = o[r]) && this.removeAllListeners(i);
                                return this.removeAllListeners("removeListener"),
                                    this.l = Object.create(null),
                                    this.h = 0,
                                    this
                            }
                            if ("function" == typeof(e = t[n]))
                                this.removeListener(n, e);
                            else if (void 0 !== e)
                                for (r = e.length - 1; r >= 0; r--)
                                    this.removeListener(n, e[r]);
                            return this
                        },
                        o.prototype.listeners = function(n) {
                            return d(this, n, !0)
                        },
                        o.prototype.rawListeners = function(n) {
                            return d(this, n, !1)
                        },
                        o.listenerCount = function(n, e) {
                            return "function" == typeof n.listenerCount ? n.listenerCount(e) : m.call(n, e)
                        },
                        o.prototype.listenerCount = m,
                        o.prototype.eventNames = function() {
                            return this.h > 0 ? e(this.l) : []
                        }
                },
                692: n => {
                    var e = n.exports = {
                        v: [{
                            name: "version",
                            reg: /^(\d*)$/
                        }],
                        o: [{
                            name: "origin",
                            reg: /^(\S*) (\d*) (\d*) (\S*) IP(\d) (\S*)/,
                            names: ["username", "sessionId", "sessionVersion", "netType", "ipVer", "address"],
                            format: "%s %s %d %s IP%d %s"
                        }],
                        s: [{
                            name: "name"
                        }],
                        i: [{
                            name: "description"
                        }],
                        u: [{
                            name: "uri"
                        }],
                        e: [{
                            name: "email"
                        }],
                        p: [{
                            name: "phone"
                        }],
                        z: [{
                            name: "timezones"
                        }],
                        r: [{
                            name: "repeats"
                        }],
                        t: [{
                            name: "timing",
                            reg: /^(\d*) (\d*)/,
                            names: ["start", "stop"],
                            format: "%d %d"
                        }],
                        c: [{
                            name: "connection",
                            reg: /^IN IP(\d) (\S*)/,
                            names: ["version", "ip"],
                            format: "IN IP%d %s"
                        }],
                        b: [{
                            push: "bandwidth",
                            reg: /^(TIAS|AS|CT|RR|RS):(\d*)/,
                            names: ["type", "limit"],
                            format: "%s:%s"
                        }],
                        m: [{
                            reg: /^(\w*) (\d*) ([\w/]*)(?: (.*))?/,
                            names: ["type", "port", "protocol", "payloads"],
                            format: "%s %d %s %s"
                        }],
                        a: [{
                            push: "rtp",
                            reg: /^rtpmap:(\d*) ([\w\-.]*)(?:\s*\/(\d*)(?:\s*\/(\S*))?)?/,
                            names: ["payload", "codec", "rate", "encoding"],
                            format: function(n) {
                                return n.encoding ? "rtpmap:%d %s/%s/%s" : n.rate ? "rtpmap:%d %s/%s" : "rtpmap:%d %s"
                            }
                        }, {
                            push: "fmtp",
                            reg: /^fmtp:(\d*) ([\S| ]*)/,
                            names: ["payload", "config"],
                            format: "fmtp:%d %s"
                        }, {
                            name: "control",
                            reg: /^control:(.*)/,
                            format: "control:%s"
                        }, {
                            name: "rtcp",
                            reg: /^rtcp:(\d*)(?: (\S*) IP(\d) (\S*))?/,
                            names: ["port", "netType", "ipVer", "address"],
                            format: function(n) {
                                return null != n.address ? "rtcp:%d %s IP%d %s" : "rtcp:%d"
                            }
                        }, {
                            push: "rtcpFbTrrInt",
                            reg: /^rtcp-fb:(\*|\d*) trr-int (\d*)/,
                            names: ["payload", "value"],
                            format: "rtcp-fb:%s trr-int %d"
                        }, {
                            push: "rtcpFb",
                            reg: /^rtcp-fb:(\*|\d*) ([\w-_]*)(?: ([\w-_]*))?/,
                            names: ["payload", "type", "subtype"],
                            format: function(n) {
                                return null != n.subtype ? "rtcp-fb:%s %s %s" : "rtcp-fb:%s %s"
                            }
                        }, {
                            push: "ext",
                            reg: /^extmap:(\d+)(?:\/(\w+))?(?: (urn:ietf:params:rtp-hdrext:encrypt))? (\S*)(?: (\S*))?/,
                            names: ["value", "direction", "encrypt-uri", "uri", "config"],
                            format: function(n) {
                                return "extmap:%d" + (n.direction ? "/%s" : "%v") + (n["encrypt-uri"] ? " %s" : "%v") + " %s" + (n.config ? " %s" : "")
                            }
                        }, {
                            name: "extmapAllowMixed",
                            reg: /^(extmap-allow-mixed)/
                        }, {
                            push: "crypto",
                            reg: /^crypto:(\d*) ([\w_]*) (\S*)(?: (\S*))?/,
                            names: ["id", "suite", "config", "sessionConfig"],
                            format: function(n) {
                                return null != n.sessionConfig ? "crypto:%d %s %s %s" : "crypto:%d %s %s"
                            }
                        }, {
                            name: "setup",
                            reg: /^setup:(\w*)/,
                            format: "setup:%s"
                        }, {
                            name: "connectionType",
                            reg: /^connection:(new|existing)/,
                            format: "connection:%s"
                        }, {
                            name: "mid",
                            reg: /^mid:([^\s]*)/,
                            format: "mid:%s"
                        }, {
                            name: "msid",
                            reg: /^msid:(.*)/,
                            format: "msid:%s"
                        }, {
                            name: "ptime",
                            reg: /^ptime:(\d*(?:\.\d*)*)/,
                            format: "ptime:%d"
                        }, {
                            name: "maxptime",
                            reg: /^maxptime:(\d*(?:\.\d*)*)/,
                            format: "maxptime:%d"
                        }, {
                            name: "direction",
                            reg: /^(sendrecv|recvonly|sendonly|inactive)/
                        }, {
                            name: "icelite",
                            reg: /^(ice-lite)/
                        }, {
                            name: "iceUfrag",
                            reg: /^ice-ufrag:(\S*)/,
                            format: "ice-ufrag:%s"
                        }, {
                            name: "icePwd",
                            reg: /^ice-pwd:(\S*)/,
                            format: "ice-pwd:%s"
                        }, {
                            name: "fingerprint",
                            reg: /^fingerprint:(\S*) (\S*)/,
                            names: ["type", "hash"],
                            format: "fingerprint:%s %s"
                        }, {
                            push: "candidates",
                            reg: /^candidate:(\S*) (\d*) (\S*) (\d*) (\S*) (\d*) typ (\S*)(?: raddr (\S*) rport (\d*))?(?: tcptype (\S*))?(?: generation (\d*))?(?: network-id (\d*))?(?: network-cost (\d*))?/,
                            names: ["foundation", "component", "transport", "priority", "ip", "port", "type", "raddr", "rport", "tcptype", "generation", "network-id", "network-cost"],
                            format: function(n) {
                                var e = "candidate:%s %d %s %d %s %d typ %s";
                                return e += null != n.raddr ? " raddr %s rport %d" : "%v%v",
                                    e += null != n.tcptype ? " tcptype %s" : "%v",
                                    null != n.generation && (e += " generation %d"),
                                    e += null != n["network-id"] ? " network-id %d" : "%v",
                                    e += null != n["network-cost"] ? " network-cost %d" : "%v"
                            }
                        }, {
                            name: "endOfCandidates",
                            reg: /^(end-of-candidates)/
                        }, {
                            name: "remoteCandidates",
                            reg: /^remote-candidates:(.*)/,
                            format: "remote-candidates:%s"
                        }, {
                            name: "iceOptions",
                            reg: /^ice-options:(\S*)/,
                            format: "ice-options:%s"
                        }, {
                            push: "ssrcs",
                            reg: /^ssrc:(\d*) ([\w_-]*)(?::(.*))?/,
                            names: ["id", "attribute", "value"],
                            format: function(n) {
                                var e = "ssrc:%d";
                                return null != n.attribute && (e += " %s",
                                        null != n.value && (e += ":%s")),
                                    e
                            }
                        }, {
                            push: "ssrcGroups",
                            reg: /^ssrc-group:([\x21\x23\x24\x25\x26\x27\x2A\x2B\x2D\x2E\w]*) (.*)/,
                            names: ["semantics", "ssrcs"],
                            format: "ssrc-group:%s %s"
                        }, {
                            name: "msidSemantic",
                            reg: /^msid-semantic:\s?(\w*) (\S*)/,
                            names: ["semantic", "token"],
                            format: "msid-semantic: %s %s"
                        }, {
                            push: "groups",
                            reg: /^group:(\w*) (.*)/,
                            names: ["type", "mids"],
                            format: "group:%s %s"
                        }, {
                            name: "rtcpMux",
                            reg: /^(rtcp-mux)/
                        }, {
                            name: "rtcpRsize",
                            reg: /^(rtcp-rsize)/
                        }, {
                            name: "sctpmap",
                            reg: /^sctpmap:([\w_/]*) (\S*)(?: (\S*))?/,
                            names: ["sctpmapNumber", "app", "maxMessageSize"],
                            format: function(n) {
                                return null != n.maxMessageSize ? "sctpmap:%s %s %s" : "sctpmap:%s %s"
                            }
                        }, {
                            name: "xGoogleFlag",
                            reg: /^x-google-flag:([^\s]*)/,
                            format: "x-google-flag:%s"
                        }, {
                            push: "rids",
                            reg: /^rid:([\d\w]+) (\w+)(?: ([\S| ]*))?/,
                            names: ["id", "direction", "params"],
                            format: function(n) {
                                return n.params ? "rid:%s %s %s" : "rid:%s %s"
                            }
                        }, {
                            push: "imageattrs",
                            reg: new RegExp("^imageattr:(\\d+|\\*)[\\s\\t]+(send|recv)[\\s\\t]+(\\*|\\[\\S+\\](?:[\\s\\t]+\\[\\S+\\])*)(?:[\\s\\t]+(recv|send)[\\s\\t]+(\\*|\\[\\S+\\](?:[\\s\\t]+\\[\\S+\\])*))?"),
                            names: ["pt", "dir1", "attrs1", "dir2", "attrs2"],
                            format: function(n) {
                                return "imageattr:%s %s %s" + (n.dir2 ? " %s %s" : "")
                            }
                        }, {
                            name: "simulcast",
                            reg: new RegExp("^simulcast:(send|recv) ([a-zA-Z0-9\\-_~;,]+)(?:\\s?(send|recv) ([a-zA-Z0-9\\-_~;,]+))?$"),
                            names: ["dir1", "list1", "dir2", "list2"],
                            format: function(n) {
                                return "simulcast:%s %s" + (n.dir2 ? " %s %s" : "")
                            }
                        }, {
                            name: "simulcast_03",
                            reg: /^simulcast:[\s\t]+([\S+\s\t]+)$/,
                            names: ["value"],
                            format: "simulcast: %s"
                        }, {
                            name: "framerate",
                            reg: /^framerate:(\d+(?:$|\.\d+))/,
                            format: "framerate:%s"
                        }, {
                            name: "sourceFilter",
                            reg: /^source-filter: *(excl|incl) (\S*) (IP4|IP6|\*) (\S*) (.*)/,
                            names: ["filterMode", "netType", "addressTypes", "destAddress", "srcList"],
                            format: "source-filter: %s %s %s %s %s"
                        }, {
                            name: "bundleOnly",
                            reg: /^(bundle-only)/
                        }, {
                            name: "label",
                            reg: /^label:(.+)/,
                            format: "label:%s"
                        }, {
                            name: "sctpPort",
                            reg: /^sctp-port:(\d+)$/,
                            format: "sctp-port:%s"
                        }, {
                            name: "maxMessageSize",
                            reg: /^max-message-size:(\d+)$/,
                            format: "max-message-size:%s"
                        }, {
                            push: "tsRefClocks",
                            reg: /^ts-refclk:([^\s=]*)(?:=(\S*))?/,
                            names: ["clksrc", "clksrcExt"],
                            format: function(n) {
                                return "ts-refclk:%s" + (null != n.clksrcExt ? "=%s" : "")
                            }
                        }, {
                            name: "mediaClk",
                            reg: /^mediaclk:(?:id=(\S*))? *([^\s=]*)(?:=(\S*))?(?: *rate=(\d+)\/(\d+))?/,
                            names: ["id", "mediaClockName", "mediaClockValue", "rateNumerator", "rateDenominator"],
                            format: function(n) {
                                var e = "mediaclk:";
                                return e += null != n.id ? "id=%s %s" : "%v%s",
                                    e += null != n.mediaClockValue ? "=%s" : "",
                                    e += null != n.rateNumerator ? " rate=%s" : "",
                                    e += null != n.rateDenominator ? "/%s" : ""
                            }
                        }, {
                            name: "keywords",
                            reg: /^keywds:(.+)$/,
                            format: "keywds:%s"
                        }, {
                            name: "content",
                            reg: /^content:(.+)/,
                            format: "content:%s"
                        }, {
                            name: "bfcpFloorCtrl",
                            reg: /^floorctrl:(c-only|s-only|c-s)/,
                            format: "floorctrl:%s"
                        }, {
                            name: "bfcpConfId",
                            reg: /^confid:(\d+)/,
                            format: "confid:%s"
                        }, {
                            name: "bfcpUserId",
                            reg: /^userid:(\d+)/,
                            format: "userid:%s"
                        }, {
                            name: "bfcpFloorId",
                            reg: /^floorid:(.+) (?:m-stream|mstrm):(.+)/,
                            names: ["id", "mStream"],
                            format: "floorid:%s mstrm:%s"
                        }, {
                            push: "invalid",
                            names: ["value"]
                        }]
                    };
                    Object.keys(e).forEach((function(n) {
                        e[n].forEach((function(n) {
                            n.reg || (n.reg = /(.*)/),
                                n.format || (n.format = "%s")
                        }))
                    }))
                },
                766: (n, e, t) => {
                    var r = t(962);
                    t(776),
                        e.Qc = r.parse,
                        r.parseParams,
                        r.parseFmtpConfig,
                        r.parsePayloads,
                        r.parseRemoteCandidates,
                        r.parseImageAttributes,
                        r.parseSimulcastStreamList
                },
                962: (n, e, t) => {
                    var r = function(n) {
                            return String(Number(n)) === n ? Number(n) : n
                        },
                        i = function(n, e, t) {
                            var i = n.name && n.names;
                            n.push && !e[n.push] ? e[n.push] = [] : i && !e[n.name] && (e[n.name] = {});
                            var o = n.push ? {} : i ? e[n.name] : e;
                            ! function(n, e, t, i) {
                                if (i && !t)
                                    e[i] = r(n[1]);
                                else
                                    for (var o = 0; o < t.length; o += 1)
                                        null != n[o + 1] && (e[t[o]] = r(n[o + 1]))
                            }(t.match(n.reg), o, n.names, n.name),
                            n.push && e[n.push].push(o)
                        },
                        o = t(692),
                        c = RegExp.prototype.test.bind(/^([a-z])=(.*)/);
                    e.parse = function(n) {
                        var e = {},
                            t = [],
                            r = e;
                        return n.split(/(\r\n|\r|\n)/).filter(c).forEach((function(n) {
                                var e = n[0],
                                    c = n.slice(2);
                                "m" === e && (t.push({
                                        rtp: [],
                                        fmtp: []
                                    }),
                                    r = t[t.length - 1]);
                                for (var a = 0; a < (o[e] || []).length; a += 1) {
                                    var s = o[e][a];
                                    if (s.reg.test(c))
                                        return i(s, r, c)
                                }
                            })),
                            e.media = t,
                            e
                    };
                    var a = function(n, e) {
                        var t = e.split(/=(.+)/, 2);
                        return 2 === t.length ? n[t[0]] = r(t[1]) : 1 === t.length && e.length > 1 && (n[t[0]] = void 0),
                            n
                    };
                    e.parseParams = function(n) {
                            return n.split(/;\s?/).reduce(a, {})
                        },
                        e.parseFmtpConfig = e.parseParams,
                        e.parsePayloads = function(n) {
                            return n.toString().split(" ").map(Number)
                        },
                        e.parseRemoteCandidates = function(n) {
                            for (var e = [], t = n.split(" ").map(r), i = 0; i < t.length; i += 3)
                                e.push({
                                    component: t[i],
                                    ip: t[i + 1],
                                    port: t[i + 2]
                                });
                            return e
                        },
                        e.parseImageAttributes = function(n) {
                            return n.split(" ").map((function(n) {
                                return n.substring(1, n.length - 1).split(",").reduce(a, {})
                            }))
                        },
                        e.parseSimulcastStreamList = function(n) {
                            return n.split(";").map((function(n) {
                                return n.split(",").map((function(n) {
                                    var e, t = !1;
                                    return "~" !== n[0] ? e = r(n) : (e = r(n.substring(1, n.length)),
                                        t = !0), {
                                        scid: e,
                                        paused: t
                                    }
                                }))
                            }))
                        }
                },
                776: (n, e, t) => {
                    var r = t(692),
                        i = /%[sdv%]/g,
                        o = function(n) {
                            var e = 1,
                                t = arguments,
                                r = t.length;
                            return n.replace(i, (function(n) {
                                if (e >= r)
                                    return n;
                                var i = t[e];
                                switch (e += 1,
                                    n) {
                                    case "%%":
                                        return "%";
                                    case "%s":
                                        return String(i);
                                    case "%d":
                                        return Number(i);
                                    case "%v":
                                        return ""
                                }
                            }))
                        },
                        c = function(n, e, t) {
                            var r = [n + "=" + (e.format instanceof Function ? e.format(e.push ? t : t[e.name]) : e.format)];
                            if (e.names)
                                for (var i = 0; i < e.names.length; i += 1) {
                                    var c = e.names[i];
                                    e.name ? r.push(t[e.name][c]) : r.push(t[e.names[i]])
                                }
                            else
                                r.push(t[e.name]);
                            return o.apply(null, r)
                        },
                        a = ["v", "o", "s", "i", "u", "e", "p", "c", "b", "t", "r", "z", "a"],
                        s = ["i", "c", "b", "a"];
                    n.exports = function(n, e) {
                        e = e || {},
                            null == n.version && (n.version = 0),
                            null == n.name && (n.name = " "),
                            n.media.forEach((function(n) {
                                null == n.payloads && (n.payloads = "")
                            }));
                        var t = e.outerOrder || a,
                            i = e.innerOrder || s,
                            o = [];
                        return t.forEach((function(e) {
                                r[e].forEach((function(t) {
                                    t.name in n && null != n[t.name] ? o.push(c(e, t, n)) : t.push in n && null != n[t.push] && n[t.push].forEach((function(n) {
                                        o.push(c(e, t, n))
                                    }))
                                }))
                            })),
                            n.media.forEach((function(n) {
                                o.push(c("m", r.m[0], n)),
                                    i.forEach((function(e) {
                                        r[e].forEach((function(t) {
                                            t.name in n && null != n[t.name] ? o.push(c(e, t, n)) : t.push in n && null != n[t.push] && n[t.push].forEach((function(n) {
                                                o.push(c(e, t, n))
                                            }))
                                        }))
                                    }))
                            })),
                            o.join("\r\n") + "\r\n"
                    }
                }
            },
            e = {};

        function t(r) {
            var i = e[r];
            if (void 0 !== i)
                return i.exports;
            var o = e[r] = {
                exports: {}
            };
            return n[r](o, o.exports, t),
                o.exports
        }
        t.d = (n, e) => {
                for (var r in e)
                    t.o(e, r) && !t.o(n, r) && Object.defineProperty(n, r, {
                        enumerable: !0,
                        get: e[r]
                    })
            },
            t.o = (n, e) => Object.prototype.hasOwnProperty.call(n, e),
            t.r = n => {
                "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(n, Symbol.toStringTag, {
                        value: "Module"
                    }),
                    Object.defineProperty(n, "S", {
                        value: !0
                    })
            };
        var r = {};
        return (() => {
                "use strict";
                t.r(r),
                    t.d(r, {
                        Channel: () => c,
                        VChatCloud: () => P
                    });
                var n, e = t(187),
                    i = (n = function(e, t) {
                            return n = Object.setPrototypeOf || {
                                __proto__: []
                            }
                            instanceof Array && function(n, e) {
                                    n.__proto__ = e
                                } ||

                                function(n, e) {
                                    for (var t in e)
                                        Object.prototype.hasOwnProperty.call(e, t) && (n[t] = e[t])
                                },
                                n(e, t)
                        },
                        function(e, t) {
                            if ("function" != typeof t && null !== t)
                                throw new TypeError("Class extends value " + String(t) + " is not a constructor or null");

                            function r() {
                                this.constructor = e
                            }
                            n(e, t),
                                e.prototype = null === t ? Object.create(t) : (r.prototype = t.prototype,
                                    new r)
                        }
                    ),
                    o = function(n, e) {
                        var t = {};
                        for (var r in n)
                            Object.prototype.hasOwnProperty.call(n, r) && e.indexOf(r) < 0 && (t[r] = n[r]);
                        if (null != n && "function" == typeof Object.getOwnPropertySymbols) {
                            var i = 0;
                            for (r = Object.getOwnPropertySymbols(n); i < r.length; i++)
                                e.indexOf(r[i]) < 0 && Object.prototype.propertyIsEnumerable.call(n, r[i]) && (t[r[i]] = n[r[i]])
                        }
                        return t
                    },
                    c = function(n) {
                        function e() {
                            var e = n.call(this) || this;
                            return e.nickName = "",
                                e.roomId = "",
                                e.roomName = "",
                                e.clientKey = "",
                                e.grade = "user",
                                e.resultCode = 0,
                                e.users = {},
                                e
                        }
                        return i(e, n),
                            e.prototype.hasOwnPropertiy = function(n) {
                                throw new Error("Method not implemented.")
                            },
                            e.prototype.onNotifyMessage = function(n) {
                                return n
                            },
                            e.prototype.onNotifyWhisper = function(n) {
                                return n
                            },
                            e.prototype.onNotifyNotice = function(n) {
                                return n
                            },
                            e.prototype.onNotifyCustom = function(n) {
                                return n
                            },
                            e.prototype.onNotifyLocation = function(n) {
                                return n
                            },
                            e.prototype.onNotifyJoinUser = function(n) {
                                n.currentUserCount,
                                    n.joinCount,
                                    n.roomId;
                                var e = o(n, ["currentUserCount", "joinCount", "roomId"]);
                                return n.clientKey && (this.users[n.clientKey] = e),
                                    n
                            },
                            e.prototype.onNotifyLeaveUser = function(n) {
                                return n.clientKey && delete this.users[n.clientKey],
                                    n
                            },
                            e.prototype.onNotifyKickUser = function(n) {
                                return n.clientKey && delete this.users[n.clientKey],
                                    n
                            },
                            e.prototype.onNotifyUnkickUser = function(n) {
                                return n
                            },
                            e.prototype.onNotifyMuteUser = function(n) {
                                return n
                            },
                            e.prototype.onNotifyUnmuteUser = function(n) {
                                return n
                            },
                            e.prototype.onPersonalKickUser = function(n) {
                                return n
                            },
                            e.prototype.onPersonalMuteUser = function(n) {
                                return n
                            },
                            e.prototype.onPersonalUnmuteUser = function(n) {
                                return n
                            },
                            e.prototype.onPersonalDuplicateUser = function(n) {
                                return n
                            },
                            e.prototype.onPersonalInvite = function(n) {
                                return console.error(n),
                                    n
                            },
                            e.prototype.onDisconnected = function() {},
                            e.prototype.sendMessage = function(n, e) {
                                n.message && this.send("c2s.send.message", Object.assign({
                                    nickName: this.nickName,
                                    roomId: this.roomId,
                                    clientKey: this.clientKey,
                                    mimeType: "text",
                                    grade: this.grade || "user"
                                }, n), e)
                            },
                            e.prototype.sendNotice = function(n, e) {
                                this.sendMessage(Object.assign({}, n, {
                                    messageType: "notice"
                                }), e)
                            },
                            e.prototype.sendWhisper = function(n, e) {
                                n.receivedClientKey && n.message && this.send("c2s.whisper.message", Object.assign({
                                    nickName: this.nickName,
                                    roomId: this.roomId,
                                    clientKey: this.clientKey,
                                    mimeType: "text",
                                    grade: this.grade || "user"
                                }, n), e)
                            },
                            e.prototype.sendCustom = function(n, e) {
                                n.message && this.send("c2s.sendcustom", Object.assign({
                                    nickName: this.nickName,
                                    roomId: this.roomId,
                                    clientKey: this.clientKey,
                                    mimeType: "text",
                                    grade: this.grade || "user"
                                }, n), e)
                            },
                            e.prototype.sendLocation = function(n, e) {
                                n.location && this.send("c2s.send.location", Object.assign({
                                    roomId: this.roomId,
                                    clientKey: this.clientKey,
                                    grade: this.grade,
                                    location: [0, 0, 0]
                                }, n), e)
                            },
                            e.prototype.getAllUserList = function(n) {
                                var e = this;
                                this.send("c2s.clientlist", {
                                    roomId: this.roomId
                                }, (function(t, r) {
                                    r.clientlist && (e.users = r.clientlist.reduce((function(n, e) {
                                            return n[e.clientKey] = e,
                                                n
                                        }), {})),
                                        "function" == typeof n && n(t, r.clientlist)
                                }))
                            },
                            e.prototype.muteUser = function(n, e) {
                                n.clientKey && this.send("c2s.mute.user", Object.assign({
                                    roomId: this.roomId
                                }, n), e)
                            },
                            e.prototype.unmuteUser = function(n, e) {
                                n.clientKey && this.send("c2s.unmute.user", Object.assign({
                                    roomId: this.roomId
                                }, n), e)
                            },
                            e.prototype.kickUser = function(n, e) {
                                n.clientKey && this.send("c2s.kick.user", Object.assign({
                                    roomId: this.roomId
                                }, n), e)
                            },
                            e.prototype.unkickUser = function(n, e) {
                                n.clientKey && this.send("c2s.unkick.user", Object.assign({
                                    roomId: this.roomId
                                }, n), e)
                            },
                            e.prototype.sendInvite = function(n, e) {
                                n.clientKey && n.roomId && this.send("c2s.invite", {
                                    roomId: this.roomId,
                                    clientKey: n.clientKey,
                                    inviteRoomId: n.roomId
                                }, e)
                            },
                            e.prototype.setRTCLocalMedia = function(n) {},
                            e.prototype.setRTCRemoteMedia = function(n, e) {},
                            e.prototype.toggleRTCAudioControl = function(n) {},
                            e.prototype.toggleRTCVideoControl = function(n) {},
                            e.prototype.toggleRTCMedia = function(n) {},
                            e
                    }(e.EventEmitter);

                function a() {
                    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (function(n, e) {
                        return e = 16 * Math.random(),
                            ("y" == n ? 3 & e | 8 : 0 | e).toString(16)
                    }))
                }

                function s(n) {
                    try {
                        return "string" == typeof n ? !!JSON.parse(n) : s(JSON.stringify(n))
                    } catch (n) {
                        return !1
                    }
                }
                String.prototype.hashCode = function() {
                    return this.split("").reduce((function(n, e) {
                        return (n = (n << 5) - n + e.charCodeAt(0)) & n
                    }), 0)
                };
                var u, f = t(766),
                    l = function() {
                        var n = function(e, t) {
                            return n = Object.setPrototypeOf || {
                                __proto__: []
                            }
                            instanceof Array && function(n, e) {
                                    n.__proto__ = e
                                } ||

                                function(n, e) {
                                    for (var t in e)
                                        Object.prototype.hasOwnProperty.call(e, t) && (n[t] = e[t])
                                },
                                n(e, t)
                        };
                        return function(e, t) {
                            if ("function" != typeof t && null !== t)
                                throw new TypeError("Class extends value " + String(t) + " is not a constructor or null");

                            function r() {
                                this.constructor = e
                            }
                            n(e, t),
                                e.prototype = null === t ? Object.create(t) : (r.prototype = t.prototype,
                                    new r)
                        }
                    }(),
                    d = function(n, e) {
                        var t = {};
                        for (var r in n)
                            Object.prototype.hasOwnProperty.call(n, r) && e.indexOf(r) < 0 && (t[r] = n[r]);
                        if (null != n && "function" == typeof Object.getOwnPropertySymbols) {
                            var i = 0;
                            for (r = Object.getOwnPropertySymbols(n); i < r.length; i++)
                                e.indexOf(r[i]) < 0 && Object.prototype.propertyIsEnumerable.call(n, r[i]) && (t[r[i]] = n[r[i]])
                        }
                        return t
                    },
                    m = function(n) {
                        var e = "function" == typeof Symbol && Symbol.iterator,
                            t = e && n[e],
                            r = 0;
                        if (t)
                            return t.call(n);
                        if (n && "number" == typeof n.length)
                            return {
                                next: function() {
                                    return n && r >= n.length && (n = void 0), {
                                        value: n && n[r++],
                                        done: !n
                                    }
                                }
                            };
                        throw new TypeError(e ? "Object is not iterable." : "Symbol.iterator is not defined.")
                    },
                    v = function(n, e) {
                        var t = "function" == typeof Symbol && n[Symbol.iterator];
                        if (!t)
                            return n;
                        var r, i, o = t.call(n),
                            c = [];
                        try {
                            for (;
                                (void 0 === e || e-- > 0) && !(r = o.next()).done;)
                                c.push(r.value)
                        } catch (n) {
                            i = {
                                error: n
                            }
                        } finally {
                            try {
                                r && !r.done && (t = o.return) && t.call(o)
                            } finally {
                                if (i)
                                    throw i.error
                            }
                        }
                        return c
                    },
                    h = function(n, e, t) {
                        if (t || 2 === arguments.length)
                            for (var r, i = 0, o = e.length; i < o; i++)
                                !r && i in e || (r || (r = Array.prototype.slice.call(e, 0, i)),
                                    r[i] = e[i]);
                        return n.concat(r || Array.prototype.slice.call(e))
                    },
                    p = function(n) {
                        return n.split(" ").map((function(n, e, t) {
                            return e ? n.charAt(0).toUpperCase() + n.slice(1) : n
                        })).join("")
                    },
                    g = {
                        iceServers: [{
                            urls: "stun:stun.l.google.com:19302"
                        }],
                        constraints: {
                            audio: {},
                            video: {}
                        },
                        enable: {
                            audio: 3,
                            video: 3,
                            share: 1
                        }
                    },
                    y = {},
                    b = {};

                function w(n, e) {
                    var t, r;
                    try {
                        for (var i = m(Object.entries(b)), o = i.next(); !o.done; o = i.next()) {
                            var c = v(o.value, 2),
                                a = (c[0],
                                    c[1].getTransceivers()[n]);
                            a.direction = "sendrecv",
                                a.sender.replaceTrack(e)
                        }
                    } catch (n) {
                        t = {
                            error: n
                        }
                    } finally {
                        try {
                            o && !o.done && (r = i.return) && r.call(i)
                        } finally {
                            if (t)
                                throw t.error
                        }
                    }
                }
                var S = function(n) {
                        function e(e, t, r) {
                            void 0 === r && (r = {});
                            var i = n.call(this) || this,
                                o = i;
                            if (g = Object.assign(g, r),
                                i.O = e,
                                t.on("streamchanged", (function(n) {
                                    var e = p("rtc ".concat(n.target, " stream ").concat(n.stream ? "append" : "remove")),
                                        r = {
                                            type: e,
                                            target: n.stream,
                                            clientKey: n.client,
                                            client: t.users[n.client]
                                        };

                                    t.emit(e, r);
                                    var i, o = {
                                        target: n.target,
                                        client: n.client,
                                        stream: n.stream,
                                        track: null,
                                        enable: !1
                                    };
                                    t.emit("trackchanged", Object.assign(o, {
                                            track: (i = n.stream ? n.stream.getVideoTracks() : []) && i.length ? i[0] : {
                                                kind: "video"
                                            },
                                            enable: !!i.length
                                        })),
                                        t.emit("trackchanged", Object.assign(o, {
                                            track: (i = n.stream ? n.stream.getAudioTracks() : []) && i.length ? i[0] : {
                                                kind: "audio"
                                            },
                                            enable: !!i.length
                                        }))
                                })),
                                t.on("trackchanged", (function(n) {
                                    var e = p("rtc ".concat(n.target, " ").concat(n.track.kind, " changed")),
                                        r = {
                                            type: e,
                                            target: n.track,
                                            stream: n.stream,
                                            clientKey: n.client,
                                            enable: n.enable
                                        };
                                    "video" == n.track.kind && (r.share = n.track.getSettings && !n.track.getSettings().width),

                                        t.emit(e, r)
                                })),
                                g.enable) {
                                var l = function(n, e, t) {
                                    if (n && u) {
                                        var r = u.getTracks().filter((function(e) {
                                            return n == e.kind
                                        }));
                                        if (r.length)
                                            return e || r.forEach((function(n) {
                                                u.removeTrack(n),
                                                    n.stop()
                                            }));
                                        o.createMediaStream({
                                            mode: "force",
                                            audio: "audio" == n,
                                            video: "video" == n
                                        }).then((function(e) {
                                            var t = e.getTracks()[0];
                                            x && w("audio" == n ? 0 : 1, t),
                                                t && u.addTrack(t)
                                        }))
                                    }
                                };
                                if (g.enable.audio && (c.prototype.toggleRTCAudioControl = function(n) {
                                        return l.call(this, "audio", n, !1)
                                    }),
                                    g.enable.video && (c.prototype.toggleRTCVideoControl = function(n) {
                                        return l.call(this, "video", n, !1)
                                    }),
                                    (g.enable.audio || g.enable.video) && (c.prototype.setRTCLocalMedia = function(n) {
                                            n && (n.srcObject = this.localStream,
                                                n.muted = !0)
                                        },
                                        c.prototype.setRTCRemoteMedia = function(n, e) {
                                            var t;
                                            if (n) {
                                                var r = null === (t = b[e]) || void 0 === t ? void 0 : t.getRemoteStreams();
                                                r && r.length && (n.srcObject = r[0]),
                                                    n.onloadeddata = function(e) {
                                                        return n.play()
                                                    }
                                            }
                                        }
                                    ),
                                    g.enable.share) {
                                    var d = null,
                                        m = null;
                                    if (c.prototype.toggleRTCMedia = function(n) {
                                            if (!(1 & g.enable.share) || (null != (e = navigator.userAgent).match(/iPhone|iPod|Android|Windows CE|BlackBerry|Symbian|Windows Phone|webOS|Opera Mini|Opera Mobi|POLARIS|IEMobile|lgtelecom|nokia|SonyEricsson/i) || null != e.match(/LG|SAMSUNG|Samsung/)))
                                                return null == n || n.call(null, "media", !1),
                                                    console.log("screen share is not available");
                                            var e;
                                            u && (d ? (delete y.share,
                                                u.getTracks().filter((function(n) {
                                                    return d[n.kind] == n.id
                                                })).forEach((function(n) {
                                                    u.removeTrack(n),
                                                        n.stop()
                                                })),
                                                d = null,
                                                m = Object.assign({
                                                    mode: "force"
                                                }, m ? {
                                                    video: !1,
                                                    audio: !1
                                                } : g.constraints, m || {}),
                                                o.createMediaStream(m).then((function(e) {
                                                    e.getTracks().forEach((function(n) {
                                                            w("audio" == n.kind ? 0 : 1, n),
                                                                u.addTrack(n)
                                                        })),
                                                        null == n || n.call(null, "media", !0)
                                                })).catch((function(e) {
                                                    null == n || n.call(null, "share", !1)
                                                })),
                                                m = null) : navigator.mediaDevices.getDisplayMedia({
                                                video: !0,
                                                audio: !0
                                            }).then((function(e) {
                                                e.getTracks().length && (m = u.getTracks().reduce((function(n, e) {
                                                        return n[e.kind] = !!e.id,
                                                            n
                                                    }), {}),
                                                    u.getVideoTracks().forEach((function(n) {
                                                        u.removeTrack(n),
                                                            n.stop()
                                                    })),
                                                    d = e.getTracks().reduce((function(n, e) {
                                                        return n[e.kind] = e.id,
                                                            n
                                                    }), {}),
                                                    e.getTracks().forEach((function(e) {
                                                        w("audio" == e.kind ? 0 : 1, e),
                                                            u.addTrack(e),
                                                            null == n || n.call(null, "share", !0)
                                                    })))
                                            })).catch((function(e) {
                                                null == n || n.call(null, "media", !1)
                                            })))
                                        },
                                        7 & g.enable.share) {
                                        var S = ["video/mp4;codecs=vp9", "video/mp4;codecs=vp8", "video/mp4", "video/webm"].reduce((function(n, e, t, r) {
                                            return !n && MediaRecorder.isTypeSupported(e) && (n = e),
                                                n
                                        }), "");
                                        t.on("startrecord", (function(n) {
                                            var e, r = null;
                                            if (!(r = n instanceof MediaStream ? n : n instanceof HTMLMediaElement ? (r = r || n.captureStream && n.captureStream()) || n.mozCaptureStream && n.mozCaptureStream() : (null === (e = b[n.clientKey]) || void 0 === e ? void 0 : e.getRemoteStreams()[0]) || (t.clientKey == n.clientKey ? u : null)))
                                                return console.warn("capture is not supported");
                                            var i, o = [];
                                            try {
                                                i = new MediaRecorder(r, {
                                                    mimeType: S
                                                })
                                            } catch (n) {
                                                return void console.error(n)
                                            }
                                            i.onstart = function(n) {
                                                    o = [],
                                                        t.emit("recording", "start", i)
                                                },
                                                i.onstop = function(n) {
                                                    t.emit("recording", "stop", i);
                                                    var e = new Blob(o, {
                                                            type: "video/mp4"
                                                        }),
                                                        r = window.URL.createObjectURL(e),
                                                        c = document.createElement("a");
                                                    c.href = r,
                                                        c.download = "test.mp4",
                                                        c.click(),
                                                        c.remove(),
                                                        window.URL.revokeObjectURL(r)
                                                },
                                                i.ondataavailable = function(n) {
                                                    return o.push(n.data)
                                                },
                                                t.emit("recording", "ready", i)
                                        }))
                                    }
                                }
                            }
                            var O, x = 0;
                            void 0 === t.localStream && Object.defineProperty(t, "localStream", {
                                    get: function() {
                                        return u
                                    },
                                    set: function(n) {
                                        var e;
                                        if (u || n)
                                            for (var r in u && (u.getTracks().forEach((function(n) {
                                                            n.stop(),
                                                                u.removeTrack(n),
                                                                delete y[n.id]
                                                        })),
                                                        u = null),
                                                    x = null == (u = n) ? void 0 : u.getTracks().length,
                                                    n && (n.getTracks().reduce((function(e, r) {
                                                            return r.onended = function(e) {
                                                                    return t.emit("trackchanged", {
                                                                        target: "local",
                                                                        client: t.clientKey,
                                                                        stream: n,
                                                                        track: e.target,
                                                                        enable: !1
                                                                    })
                                                                },
                                                                e[r.id] = r.kind + ":media",
                                                                e
                                                        }), y),
                                                        e = n.removeTrack,
                                                        n.removeTrack = function(r) {
                                                            e.call(n, r),
                                                                t.emit("trackchanged", {
                                                                    target: "local",
                                                                    client: t.clientKey,
                                                                    stream: n,
                                                                    track: r,
                                                                    enable: !1
                                                                })
                                                        },
                                                        function(e) {
                                                            n.addTrack = function(r) {
                                                                e.call(n, r),
                                                                    t.emit("trackchanged", {
                                                                        target: "local",
                                                                        client: t.clientKey,
                                                                        stream: n,
                                                                        track: r,
                                                                        enable: !0
                                                                    })
                                                            }
                                                        }(n.addTrack)),
                                                    t.emit("streamchanged", {
                                                        target: "local",
                                                        client: t.clientKey,
                                                        stream: n
                                                    }),
                                                    b) {
                                                var i, o = b[r];
                                                n && n.getTracks().forEach((function(e, t, r) {
                                                    (i = o.getSenders().find((function(n) {
                                                        return n.track && n.track.kind === e.kind
                                                    }))) ? i.replaceTrack(e): o.addTrack(e, n)
                                                }))
                                            }
                                    }
                                }),
                                e.registerHandler("rtc.join/" + t.roomId, (function(n, e) {
                                    var r = e.headers.caller;
                                    if (t.clientKey != r && !b[r]) {
                                        var i = b[r] = o.createPeerConnection(t, r);
                                        o.createMediaStream({
                                            video: !!(2 & g.enable.video),
                                            audio: !!(2 & g.enable.audio)
                                        }).then((function(n) {
                                            u || (t.localStream = n),
                                                n ? i.addStream(n) : i.onnegotiationneeded(new Event(null))
                                        }))
                                    }
                                })),
                                e.registerHandler("rtc.offer/" + t.clientKey, (function(n, r) {
                                    var i = r.headers.caller;
                                    if (t.clientKey != i) {
                                        r.headers.uinfo && (r.headers.uinfo = JSON.parse(r.headers.uinfo)),
                                            t.users[i] || (t.users[i] = {
                                                clientKey: i,
                                                grade: r.headers.grade,
                                                nickName: r.headers.nick,
                                                userInfo: r.headers.uinfo
                                            });
                                        var c = b[i] || (b[i] = o.createPeerConnection(t, i));
                                        c.setRemoteDescription(new RTCSessionDescription(r.body)).then((function() {
                                            o.createMediaStream({
                                                    video: !!(2 & g.enable.video),
                                                    audio: !!(2 & g.enable.audio)
                                                }).then((function(n) {
                                                    u || (t.localStream = n),
                                                        c.getLocalStreams().find((function(n) {
                                                            return n.id == u.id
                                                        })) || (c.getLocalStreams().length ? n.getTracks().forEach((function(e) {
                                                            var t;
                                                            (t = c.getSenders().find((function(n) {
                                                                return n.track && n.track.kind === e.kind
                                                            }))) || (t = c.getSenders().find((function(n) {
                                                                return !n.track
                                                            }))) ? t.replaceTrack(e): c.addTrack(e, n)
                                                        })) : c.addStream(n))
                                                })),
                                                f.Qc(r.body.sdp).media.reduce((function(n, e, t, r) {
                                                    return n |= "audio" == e.type && "recvonly" != e.direction && 1,
                                                        n |= "video" == e.type && "recvonly" != e.direction && 2
                                                }), 0) || t.emit("streamchanged", {
                                                    target: "remote",
                                                    client: i,
                                                    stream: new MediaStream
                                                })
                                        })).then((function() {
                                            return c.createAnswer()
                                        })).then((function(n) {
                                            return c.setLocalDescription(n)
                                        })).then((function() {
                                            e.send("rtc.answer/" + i, c.localDescription, {
                                                caller: t.clientKey,
                                                nick: t.nickName,
                                                grade: t.grade,
                                                uinfo: JSON.stringify(t.userInfo)
                                            })
                                        })).catch((function(n) {
                                            console.error(n)
                                        }))
                                    }
                                })),
                                e.registerHandler("rtc.answer/" + t.clientKey, (function(n, e) {
                                    if (t.clientKey != e.headers.caller) {
                                        var r = e.headers.caller;
                                        e.headers.uinfo && (e.headers.uinfo = JSON.parse(e.headers.uinfo)),
                                            t.users[r] || (t.users[r] = {
                                                clientKey: r,
                                                grade: e.headers.grade,
                                                nickName: e.headers.nick,
                                                userInfo: e.headers.uinfo
                                            }),
                                            (b[r] || (b[r] = o.createPeerConnection(t, r))).setRemoteDescription(e.body),
                                            f.Qc(e.body.sdp).media.reduce((function(n, e, t, r) {
                                                return n |= "audio" == e.type && "inactive" != e.direction && 1,
                                                    n |= "video" == e.type && "inactive" != e.direction && 2
                                            }), 0) || t.emit("streamchanged", {
                                                target: "remote",
                                                client: r,
                                                stream: new MediaStream
                                            })
                                    }
                                })),
                                e.registerHandler("rtc.candidate/" + t.clientKey, (function(n, e) {
                                    t.clientKey != e.headers.caller && b[e.headers.caller].addIceCandidate(new RTCIceCandidate(e.body))
                                })),
                                O = t.onNotifyLeaveUser,
                                t.onNotifyLeaveUser = function(n) {
                                    var e;
                                    n && (e = b[n.clientKey]) && (t.emit("streamchanged", {
                                                target: "remote",
                                                client: n.clientKey,
                                                stream: null
                                            }),
                                            e.close(),
                                            delete b[n.clientKey]),
                                        O && O.apply(t, arguments)
                                },
                                function(n) {
                                    t.onDisconnected = function() {
                                        n && n.apply(t, arguments),
                                            o.close(t)
                                    }
                                }(t.onDisconnected),
                                i.on("call", (function(n) {
                                    o.createMediaStream(n || {
                                        mode: "media"
                                    }).then((function(n) {
                                        t.localStream = n
                                    })).then((function() {
                                        e.publish("rtc.join/" + t.roomId, {}, {
                                            caller: t.clientKey
                                        })
                                    }))
                                }));
                            var j = function(n, e) {
                                n.forEach((function(n) {
                                    var t, r;
                                    "open" == (null === (t = n.dataChannel) || void 0 === t ? void 0 : t.readyState) && (null === (r = n.dataChannel) || void 0 === r || r.send(e))
                                }))
                            };
                            return t.srtc || Object.defineProperty(t, "srtc", {
                                    value: function(n, e) {
                                        var r;
                                        if (r = e instanceof RTCPeerConnection ? [e] : "*" == e ? Object.values(b) : Object.keys(b).filter((function(n) {
                                                return !e || n == e
                                            })).reduce((function(n, e) {
                                                return n.push(b[e]),
                                                    n
                                            }), []).filter((function(n) {
                                                return n.dataChannel && "open" == n.dataChannel.readyState
                                            })),
                                            void 0 !== n && r.length)
                                            if (n instanceof File) {
                                                if (0 === n.size)
                                                    return console.log("file is empty");
                                                var i = {
                                                    type: "file",
                                                    from: t.clientKey,
                                                    hash: null,
                                                    name: n.name,
                                                    mime: n.type,
                                                    size: n.size
                                                };
                                                i.hash = a();
                                                var o = 0,
                                                    c = new FileReader;
                                                c.addEventListener("error", (function(n) {
                                                        return console.error("Error reading file:", n)
                                                    })),
                                                    c.addEventListener("abort", (function(n) {
                                                        return console.log("File reading aborted:", n)
                                                    })),
                                                    c.addEventListener("load", (function(e) {
                                                        var t, c;
                                                        i = Object.assign(i, {
                                                                offset: o,
                                                                data: btoa(String.fromCharCode.apply(String, h([], v(new Uint8Array(null === (t = e.target) || void 0 === t ? void 0 : t.result)), !1)))
                                                            }),
                                                            j(r, JSON.stringify(i)),
                                                            (o += (null === (c = e.target) || void 0 === c ? void 0 : c.result).byteLength) < n.size && u(o)
                                                    }));
                                                var u = function(e) {
                                                    return c.readAsArrayBuffer(n.slice(o, e + 16384))
                                                };
                                                u(0)
                                            } else
                                                s(n) ? j(r, JSON.stringify(Object.assign({
                                                    type: "json",
                                                    from: t.clientKey,
                                                    hash: null
                                                }, n))) : j(r, JSON.stringify({
                                                    type: "text",
                                                    from: t.clientKey,
                                                    hash: null,
                                                    data: n
                                                }))
                                    },
                                    writable: !1
                                }),
                                i
                        }
                        return l(e, n),
                            e.prototype.createPeerConnection = function(n, e) {
                                var t = this.O,
                                    r = this,
                                    i = new RTCPeerConnection({
                                        iceServers: g.iceServers
                                    });
                                return i.onicecandidate = function(r) {
                                        r.candidate && t.send("rtc.candidate/" + e, r.candidate.toJSON(), {
                                            caller: n.clientKey
                                        })
                                    },
                                    i.onaddstream = function(t) {

                                        n.emit("streamchanged", {
                                            target: "remote",
                                            client: e,
                                            stream: t.stream
                                        })
                                    },
                                    i.ontrack = function(t) {
                                        var r = t.transceiver,
                                            i = (t.track,
                                                v(t.streams, 1)[0]);
                                        d(t, ["transceiver", "track", "streams"]);
                                        r.receiver.track.onunmute = function(t) {
                                                return n.emit("trackchanged", {
                                                    target: "remote",
                                                    client: e,
                                                    stream: i,
                                                    track: t.target,
                                                    enable: !0
                                                })
                                            },
                                            r.receiver.track.onmute = function(t) {
                                                return n.emit("trackchanged", {
                                                    target: "remote",
                                                    client: e,
                                                    stream: i,
                                                    track: t.target,
                                                    enable: !1
                                                })
                                            }
                                    },
                                    i.onremovetrack = function(n) {

                                    },
                                    i.onremovestream = function(n) {

                                    },
                                    i.oniceconnectionstatechange = function(t) {
                                        switch (t.target.iceConnectionState) {
                                            case "closed":
                                            case "failed":
                                            case "disconnected":
                                                r.hangup(n, e)
                                        }
                                    },
                                    i.onnegotiationneeded = function(r) {

                                        i.createOffer({
                                            offerToReceiveAudio: !!(1 & g.enable.audio),
                                            offerToReceiveVideo: !!(1 & g.enable.video),
                                            voiceActivityDetection: !0,
                                            iceRestart: !1
                                        }).then((function(n) {
                                            return i.setLocalDescription(n)
                                        })).then((function() {
                                            t.send("rtc.offer/" + e, i.localDescription, {
                                                caller: n.clientKey,
                                                nick: n.nickName,
                                                grade: n.grade,
                                                uinfo: JSON.stringify(n.userInfo)
                                            })
                                        })).catch((function(n) {
                                            console.error(n)
                                        }))
                                    },
                                    i.ondatachannel = function(t) {
                                        t.type && console.warn(e, t.type, t);
                                        var r = t.channel,
                                            o = {};
                                        r.onmessage = function(e) {
                                                var t = JSON.parse(e.data);
                                                if ("file" == t.type) {
                                                    var r = t.hash,
                                                        i = t.offset,
                                                        c = t.data,
                                                        a = d(t, ["hash", "offset", "data"]);
                                                    c = Uint8Array.from(atob(c), (function(n) {
                                                            return n.charCodeAt(0)
                                                        })),
                                                        0 == i && (o[r] = Object.assign(a, {
                                                            data: new Uint8Array(t.size)
                                                        })),
                                                        o[r].data.set(c, i),
                                                        i + c.byteLength == t.size && (o[r].data = new Blob([o[r].data], {
                                                                type: t.mime
                                                            }),
                                                            n.emit("receivedata", o[r]),
                                                            delete o[r])
                                                } else
                                                    console.log(t)
                                            },
                                            r.onopen = function(n) {},
                                            i.hasOwnProperty("dataChannel") || Object.defineProperty(i, "dataChannel", {
                                                get: function() {
                                                    return r
                                                }
                                            })
                                    },
                                    r.createDataChannel(i),
                                    i
                            },
                            e.prototype.createDataChannel = function(n) {
                                var e = n.createDataChannel("data", {
                                    negotiated: !0,
                                    id: 0
                                });
                                n.ondatachannel && n.ondatachannel(new RTCDataChannelEvent("", {
                                    channel: e
                                }))
                            },
                            e.prototype.createMediaStream = function(n) {
                                return new Promise((function(e, t) {
                                    if (u && (!n || "force" != n.mode))
                                        return e(u);
                                    var r, i, o, c, a = null;
                                    n && "display" == n.mode ? a = navigator.mediaDevices.getDisplayMedia({
                                            video: !0
                                        }) : (r = n.video,
                                            i = n.audio,
                                            n = {
                                                video: !(null != r && !r || !(1 & g.enable.video)) && (null !== (o = r) && void 0 !== o ? o : g.constraints.video),
                                                audio: !(null != i && !i || !(1 & g.enable.audio)) && (null !== (c = i) && void 0 !== c ? c : g.constraints.audio)
                                            },
                                            a = navigator.mediaDevices.getUserMedia(n)),
                                        a.then((function(n) {
                                            e(n)
                                        })).catch((function(n) {
                                            switch (e(new MediaStream),
                                                n.name) {
                                                case "NotFoundError":
                                                    console.warn("Unable to open your call because no camera and/or microphone were found.");
                                                    break;
                                                case "SecurityError":
                                                case "PermissionDeniedError":
                                                    break;
                                                default:
                                                    console.error("Error opening your camera and/or microphone: " + n.message)
                                            }
                                        }))
                                }))
                            },
                            e.prototype.hangup = function(n, e) {
                                var t, r;
                                if (e && (r = b[e])) {
                                    try {
                                        n.emit("streamchanged", {
                                            target: "remote",
                                            client: e,
                                            stream: null
                                        })
                                    } catch (n) {}
                                    n.srtc("bye!", r),
                                        null === (t = r.dataChannel) || void 0 === t || t.close(),
                                        r.close(),
                                        delete b[e]
                                }
                            },
                            e.prototype.close = function(n) {
                                if (b)
                                    for (var e in b)
                                        this.hangup(n, e);
                                u && u.getTracks().forEach((function(n) {
                                    return n.stop()
                                }));
                                try {
                                    n.emit("streamchanged", {
                                        target: "local",
                                        client: n.clientKey,
                                        stream: null
                                    })
                                } catch (n) {}
                                u = null,
                                    b = {},
                                    delete this.O
                            },
                            e.isAvailable = function() {
                                return !!navigator.mediaDevices && !!window.RTCPeerConnection
                            },
                            e
                    }(e.EventEmitter),
                    O = function(n, e) {
                        var t = {};
                        for (var r in n)
                            Object.prototype.hasOwnProperty.call(n, r) && e.indexOf(r) < 0 && (t[r] = n[r]);
                        if (null != n && "function" == typeof Object.getOwnPropertySymbols) {
                            var i = 0;
                            for (r = Object.getOwnPropertySymbols(n); i < r.length; i++)
                                e.indexOf(r[i]) < 0 && Object.prototype.propertyIsEnumerable.call(n, r[i]) && (t[r[i]] = n[r[i]])
                        }
                        return t
                    };

                function x(n, e) {
                    if (n) {
                        if (!e)
                            return n;
                        for (var t in n)
                            n.hasOwnProperty(t) && void 0 === e[t] && (e[t] = n[t])
                    }
                    return e || {}
                }
                var j = {
                        url: null,
                        serviceId: null
                    },
                    I = {},
                    k = null,
                    E = 3e3,
                    R = null,
                    N = !1,
                    T = 0,
                    A = null,
                    _ = 1 / 0,
                    C = 1e3,
                    M = 5e3,
                    L = 2,
                    D = .5,
                    P = function() {
                        function n(n, e, t) {
                            this.channels = {},
                                this.defaultHeaders = null,
                                this.j = 3,
                                this.I = {},
                                this.k = {},
                                j = Object.assign({
                                    url: window.VCHATCLOUD_SERVER || "https://vchatcloud.com:9001/eventbus"
                                }, n),
                                k = e,
                                E = (I = t || {}).vertxbus_ping_interval || 3e3,
                                R = null,
                                _ = I.vertxbus_reconnect_attempts_max || 1 / 0,
                                C = I.vertxbus_reconnect_delay_min || 1e3,
                                M = I.vertxbus_reconnect_delay_max || 5e3,
                                L = I.vertxbus_reconnect_exponent || 2,
                                D = I.vertxbus_randomization_factor || .5
                        }
                        return n.prototype.onerror = function(n) {},
                            n.prototype.send = function(n, e, t, r) {
                                if (1 != this.j)
                                    throw new Error("INVALID_STATE_ERR");
                                "function" == typeof t && (r = t,
                                    t = {});
                                var i = {
                                    type: "send",
                                    address: n,
                                    headers: x(this.defaultHeaders, t),
                                    body: e,
                                    replyAddress: null
                                };
                                r && (this.I[i.replyAddress = a()] = r),
                                    this.O.send(JSON.stringify(i))
                            },
                            n.prototype.publish = function(n, e, t) {
                                if (1 != this.j)
                                    throw new Error("INVALID_STATE_ERR");
                                e = {
                                        type: "publish",
                                        address: n,
                                        headers: x(this.defaultHeaders, t),
                                        body: e
                                    },
                                    this.O.send(JSON.stringify(e))
                            },
                            n.prototype.registerHandler = function(n, e, t) {
                                if (1 != this.j)
                                    throw new Error("INVALID_STATE_ERR");
                                "function" == typeof e && (t = e,
                                        e = {}),
                                    this.k[n] || (this.k[n] = [],
                                        this.O.send(JSON.stringify({
                                            type: "register",
                                            address: n,
                                            headers: x(this.defaultHeaders, e)
                                        }))),
                                    this.k[n].push(t)
                            },
                            n.prototype.unregisterHandler = function(n, e, t) {
                                if (1 != this.j)
                                    throw new Error("INVALID_STATE_ERR");
                                var r = this.k[n];
                                if (r) {
                                    "function" == typeof e && (t = e,
                                        e = {});
                                    var i = r.indexOf(t); -
                                    1 != i && (r.splice(i, 1),
                                        0 === r.length && (this.O.send(JSON.stringify({
                                                type: "unregister",
                                                address: n,
                                                headers: x(this.defaultHeaders, e)
                                            })),
                                            delete this.k[n]))
                                }
                            },
                            n.prototype.disconnect = function(n) {
                                var e = this;
                                switch (this.j) {
                                    case 2:
                                        e.onclose = n;
                                        break;
                                    case 3:
                                        n && n.call(e, {
                                            code: 10108,
                                            message: "CHANNLE_ALREADY_DISCONNECTED"
                                        }, null);
                                        break;
                                    default:
                                        this.j = 2,
                                            this.enableReconnect(!1),
                                            this.O.close(),
                                            e.onclose = n
                                }
                            },
                            n.prototype.enablePing = function(n) {
                                var e = this;
                                if (n) {
                                    var t = function() {
                                        return e.O.send(JSON.stringify({
                                            type: "ping"
                                        }))
                                    };
                                    E > 0 && (t(),
                                        R = setInterval(t, E))
                                } else
                                    R && (clearInterval(R),
                                        R = null)
                            },
                            n.prototype.enableReconnect = function(n) {
                                N = n, !n && A && (clearTimeout(A),
                                    A = null,
                                    T = 0)
                            },
                            n.prototype.connect = function(n) {
                                1 != this.j ? (J.call(this, I),
                                    this.onopen = n) : n.call(this)
                            },
                            n.prototype.joinChannel = function(n, e) {
                                return this.clientKey && !n.clientKey && (n.clientKey = this.clientKey),
                                    this.R(n, e, null, !1)
                            },
                            n.prototype.openChannel = function(n, e) {
                                if (1 != this.j)
                                    throw new Error("INVALID_STATE_ERR");
                                var t = "string" == typeof n ? {
                                    roomId: n
                                } : n;
                                if (!t.roomId || !t.roomId.match(/[a-zA-Z0-9]{4,}/))
                                    throw new Error("INVALID_ROOMID_ERR");
                                this.send("c2s.open", Object.assign({
                                    userId: j.serviceId,
                                    clientKey: this.clientKey,
                                    endDt: null,
                                    isPossibleDup: !0,
                                    webrtc: 0
                                }, t), e || function(n, e, t) {})
                            },
                            n.prototype.closeChannel = function(n, e) {
                                if (1 != this.j)
                                    throw new Error("INVALID_STATE_ERR");
                                var t = "string" == typeof n ? {
                                    roomId: n
                                } : n;
                                if (!t.roomId || !t.roomId.match(/[a-zA-Z0-9]{4,}/))
                                    throw new Error("INVALID_ROOMID_ERR");
                                this.send("c2s.close", Object.assign({
                                    userId: j.serviceId,
                                    clientKey: this.clientKey
                                }, t), e || function(n, e, t) {})
                            },
                            n.prototype.R = function(n, e, t, r) {
                                void 0 === r && (r = !1);
                                var i, o = this,
                                    a = new c;
                                if (t)
                                    a = t;
                                else {
                                    if ((i = this.channels[n.roomId]) && 0 == i.resultCode)
                                        return console.log("already connected...."),
                                            null;
                                    o.channels[n.roomId] = a,
                                        Object.keys(n).forEach((function(e) {
                                            return Object.defineProperty(a, e, {
                                                value: n[e]
                                            })
                                        })),
                                        Object.defineProperty(a, "send", {
                                            value: function(n, e, t) {
                                                var r = this;
                                                o.send.call(o, n, e, t ? function(n, e, i) {
                                                        return t.call(r, n, e ? e.body : null)
                                                    } :
                                                    null)
                                            },
                                            writable: !1
                                        })
                                }
                                return 1 != this.j ? (J.call(this, I),
                                        o.onopen = function() {
                                            return o.R(n, e, a, r)
                                        }
                                    ) : (this.channels[n.roomId] = a,
                                        r = !1,
                                        this.send("c2s.join", n, (function(n, t, r) {
                                            if (n)
                                                e && e.apply(o, [n, null]),
                                                o.enableReconnect(!1);
                                            else {
                                                var i = t.body,
                                                    c = i.webrtc,
                                                    s = i.roomName,
                                                    u = i.history,
                                                    f = O(i, ["webrtc", "roomName", "history"]);
                                                if (a.roomName = s,
                                                    f.hasOwnProperty("retryCount") && (T = f.retryCount || 0),
                                                    e && e.call(o, null, u),
                                                    o.enableReconnect(!0),
                                                    c && window.RTCPeerConnection)
                                                    new S(o, a, Object.assign({}, k, {
                                                        iceServers: f.iceServers || [{
                                                            urls: "stun:stun.l.google.com:19302"
                                                        }],
                                                        enable: {
                                                            audio: c >> 0 & 7,
                                                            video: c >> 3 & 7,
                                                            share: c >> 6 & 7
                                                        }
                                                    })).emit("call")
                                            }
                                        }))),
                                    a
                            },
                            n.uuid = function() {
                                return a()
                            },
                            n
                    }();

                function J(n) {
                    var e = this;
                    e.O = new SockJS(j.url, {
                            abc: 1
                        }, n),
                        e.j = 0,
                        e.k = {},
                        e.channels = {},
                        e.I = {},
                        e.O.onopen = function() {
                            e.enablePing(!0),
                                e.j = 1,
                                e.onopen && e.onopen(),
                                A && (T = 0,
                                    e.onreconnect && e.onreconnect())
                        },
                        e.O.onclose = function(n) {
                            e.j = 3,
                                R && clearInterval(R),
                                N && T < _ && (e.O = null,
                                    A = setTimeout(J.bind(e), function() {
                                        var n = C * Math.pow(L, T);
                                        if (D) {
                                            var e = Math.random(),
                                                t = Math.floor(e * D * n);
                                            n = 0 == (1 & Math.floor(10 * e)) ? n - t : n + t
                                        }
                                        return 0 | Math.min(n, M)
                                    }()),
                                    ++T),
                                Object.values(e.channels).forEach((function(n, e, t) {
                                    n.resultCode = 3,
                                        n.onDisconnected && n.onDisconnected()
                                })),
                                e.onclose && e.onclose(n)
                        },
                        e.O.onmessage = function(n) {
                            var t, r, i, o = JSON.parse(n.data);
                            if (o.replyAddress && Object.defineProperty(o, "reply", {
                                    value: function(n, t, r) {
                                        return e.send(o.replyAddress, n, t, r)
                                    }
                                }),
                                e.k[o.address])
                                e.k[o.address].forEach((function(n) {
                                    "err" === o.type ? n({
                                        code: o.failureCode,
                                        type: o.failureType,
                                        message: o.message
                                    }) : n(null, o)
                                }));
                            else if (e.I[o.address]) {
                                var c = e.I[o.address];
                                delete e.I[o.address],
                                    "err" === o.type ? c({
                                        code: o.failureCode,
                                        type: o.failureType,
                                        message: o.message
                                    }) : c(null, o)
                            } else if ("err" === o.type)
                                e.onerror(o);
                            else if (o.address && (n = o.address.match(/s2c\.([^\/]*)(?:\/([^\/]*))?(?:\/([^\/]*))?/)) && (t = e.channels[n[2]]) && (r = "on" + n[1].replace(/[.]?(.{1})([^.]*)/g, (function(n, e, t) {
                                    return e.toUpperCase() + t
                                }))) && (n = t[r])) {
                                if (o.body.returncode && (console.error("change[" + o.address + "]"),
                                        o.body = o.body.data),
                                    i = (t.__proto__ || Object.getPrototypeOf(t))[r])
                                    (i !== t[r] ? t[r] : function() {}).call(t, i.call(t, o.body));
                                else
                                    n.call(t, o.body)
                            } else
                                try {
                                    console.warn("No handler found for message: ", o)
                                } catch (n) {}
                        }
                }
            })(),
            r
    })()
}));