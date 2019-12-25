// Copyright 2011 Google Inc. All Rights Reserved.
(function() {
    var m, aa = function(a) {
        var b = 0;
        return function() {
            return b < a.length ? {
                done: !1,
                value: a[b++]
            } : {
                done: !0
            }
        }
    }, ba = function(a) {
        var b = "undefined" != typeof Symbol && Symbol.iterator && a[Symbol.iterator];
        return b ? b.call(a) : {
            next: aa(a)
        }
    }, ca = function(a) {
        if (!(a instanceof Array)) {
            a = ba(a);
            for (var b, c = []; !(b = a.next()).done; )
                c.push(b.value);
            a = c
        }
        return a
    }, da = "function" == typeof Object.create ? Object.create : function(a) {
        var b = function() {};
        b.prototype = a;
        return new b
    }
    , ea;
    if ("function" == typeof Object.setPrototypeOf)
        ea = Object.setPrototypeOf;
    else {
        var fa;
        a: {
            var ha = {
                ce: !0
            }
              , ia = {};
            try {
                ia.__proto__ = ha;
                fa = ia.ce;
                break a
            } catch (a) {}
            fa = !1
        }
        ea = fa ? function(a, b) {
            a.__proto__ = b;
            if (a.__proto__ !== b)
                throw new TypeError(a + " is not extensible");
            return a
        }
        : null
    }
    var ka = ea
      , p = function(a, b) {
        a.prototype = da(b.prototype);
        a.prototype.constructor = a;
        if (ka)
            ka(a, b);
        else
            for (var c in b)
                if ("prototype" != c)
                    if (Object.defineProperties) {
                        var d = Object.getOwnPropertyDescriptor(b, c);
                        d && Object.defineProperty(a, c, d)
                    } else
                        a[c] = b[c];
        a.wa = b.prototype
    }
      , la = "function" == typeof Object.defineProperties ? Object.defineProperty : function(a, b, c) {
        a != Array.prototype && a != Object.prototype && (a[b] = c.value)
    }
      , ma = "undefined" != typeof window && window === this ? this : "undefined" != typeof global && null != global ? global : this
      , na = function(a, b) {
        if (b) {
            var c = ma;
            a = a.split(".");
            for (var d = 0; d < a.length - 1; d++) {
                var e = a[d];
                e in c || (c[e] = {});
                c = c[e]
            }
            a = a[a.length - 1];
            d = c[a];
            b = b(d);
            b != d && null != b && la(c, a, {
                configurable: !0,
                writable: !0,
                value: b
            })
        }
    }
      , oa = function(a, b, c) {
        if (null == a)
            throw new TypeError("The 'this' value for String.prototype." + c + " must not be null or undefined");
        if (b instanceof RegExp)
            throw new TypeError("First argument to String.prototype." + c + " must not be a regular expression");
        return a + ""
    };
    na("Array.prototype.find", function(a) {
        return a ? a : function(b, c) {
            a: {
                var d = this;
                d instanceof String && (d = String(d));
                for (var e = d.length, f = 0; f < e; f++) {
                    var g = d[f];
                    if (b.call(c, g, f, d)) {
                        b = g;
                        break a
                    }
                }
                b = void 0
            }
            return b
        }
    });
    na("String.prototype.repeat", function(a) {
        return a ? a : function(b) {
            var c = oa(this, null, "repeat");
            if (0 > b || 1342177279 < b)
                throw new RangeError("Invalid count value");
            b |= 0;
            for (var d = ""; b; )
                if (b & 1 && (d += c),
                b >>>= 1)
                    c += c;
            return d
        }
    });
    var pa = function() {
        pa = function() {}
        ;
        ma.Symbol || (ma.Symbol = qa)
    }
      , ra = function(a, b) {
        this.g = a;
        la(this, "description", {
            configurable: !0,
            writable: !0,
            value: b
        })
    };
    ra.prototype.toString = function() {
        return this.g
    }
    ;
    var qa = function() {
        function a(c) {
            if (this instanceof a)
                throw new TypeError("Symbol is not a constructor");
            return new ra("jscomp_symbol_" + (c || "") + "_" + b++,c)
        }
        var b = 0;
        return a
    }()
      , ta = function() {
        pa();
        var a = ma.Symbol.iterator;
        a || (a = ma.Symbol.iterator = ma.Symbol("Symbol.iterator"));
        "function" != typeof Array.prototype[a] && la(Array.prototype, a, {
            configurable: !0,
            writable: !0,
            value: function() {
                return sa(aa(this))
            }
        });
        ta = function() {}
    }
      , sa = function(a) {
        ta();
        a = {
            next: a
        };
        a[ma.Symbol.iterator] = function() {
            return this
        }
        ;
        return a
    }
      , ua = function(a, b) {
        ta();
        a instanceof String && (a += "");
        var c = 0
          , d = {
            next: function() {
                if (c < a.length) {
                    var e = c++;
                    return {
                        value: b(e, a[e]),
                        done: !1
                    }
                }
                d.next = function() {
                    return {
                        done: !0,
                        value: void 0
                    }
                }
                ;
                return d.next()
            }
        };
        d[Symbol.iterator] = function() {
            return d
        }
        ;
        return d
    };
    na("Array.prototype.keys", function(a) {
        return a ? a : function() {
            return ua(this, function(b) {
                return b
            })
        }
    });
    na("Array.prototype.values", function(a) {
        return a ? a : function() {
            return ua(this, function(b, c) {
                return c
            })
        }
    });
    var va = function(a, b) {
        return Object.prototype.hasOwnProperty.call(a, b)
    }
      , wa = "function" == typeof Object.assign ? Object.assign : function(a, b) {
        for (var c = 1; c < arguments.length; c++) {
            var d = arguments[c];
            if (d)
                for (var e in d)
                    va(d, e) && (a[e] = d[e])
        }
        return a
    }
    ;
    na("Object.assign", function(a) {
        return a || wa
    });
    na("Object.is", function(a) {
        return a ? a : function(b, c) {
            return b === c ? 0 !== b || 1 / b === 1 / c : b !== b && c !== c
        }
    });
    na("Array.prototype.includes", function(a) {
        return a ? a : function(b, c) {
            var d = this;
            d instanceof String && (d = String(d));
            var e = d.length;
            c = c || 0;
            for (0 > c && (c = Math.max(c + e, 0)); c < e; c++) {
                var f = d[c];
                if (f === b || Object.is(f, b))
                    return !0
            }
            return !1
        }
    });
    na("String.prototype.includes", function(a) {
        return a ? a : function(b, c) {
            return -1 !== oa(this, b, "includes").indexOf(b, c || 0)
        }
    });
    na("WeakMap", function(a) {
        function b() {}
        function c(k) {
            var l = typeof k;
            return "object" === l && null !== k || "function" === l
        }
        function d(k) {
            if (!va(k, f)) {
                var l = new b;
                la(k, f, {
                    value: l
                })
            }
        }
        function e(k) {
            var l = Object[k];
            l && (Object[k] = function(n) {
                if (n instanceof b)
                    return n;
                d(n);
                return l(n)
            }
            )
        }
        if (function() {
            if (!a || !Object.seal)
                return !1;
            try {
                var k = Object.seal({})
                  , l = Object.seal({})
                  , n = new a([[k, 2], [l, 3]]);
                if (2 != n.get(k) || 3 != n.get(l))
                    return !1;
                n["delete"](k);
                n.set(l, 4);
                return !n.has(k) && 4 == n.get(l)
            } catch (u) {
                return !1
            }
        }())
            return a;
        var f = "$jscomp_hidden_" + Math.random();
        e("freeze");
        e("preventExtensions");
        e("seal");
        var g = 0
          , h = function(k) {
            this.g = (g += Math.random() + 1).toString();
            if (k) {
                k = ba(k);
                for (var l; !(l = k.next()).done; )
                    l = l.value,
                    this.set(l[0], l[1])
            }
        };
        h.prototype.set = function(k, l) {
            if (!c(k))
                throw Error("Invalid WeakMap key");
            d(k);
            if (!va(k, f))
                throw Error("WeakMap key fail: " + k);
            k[f][this.g] = l;
            return this
        }
        ;
        h.prototype.get = function(k) {
            return c(k) && va(k, f) ? k[f][this.g] : void 0
        }
        ;
        h.prototype.has = function(k) {
            return c(k) && va(k, f) && va(k[f], this.g)
        }
        ;
        h.prototype["delete"] = function(k) {
            return c(k) && va(k, f) && va(k[f], this.g) ? delete k[f][this.g] : !1
        }
        ;
        return h
    });
    na("Map", function(a) {
        if (function() {
            if (!a || "function" != typeof a || !a.prototype.entries || "function" != typeof Object.seal)
                return !1;
            try {
                var h = Object.seal({
                    x: 4
                })
                  , k = new a(ba([[h, "s"]]));
                if ("s" != k.get(h) || 1 != k.size || k.get({
                    x: 4
                }) || k.set({
                    x: 4
                }, "t") != k || 2 != k.size)
                    return !1;
                var l = k.entries()
                  , n = l.next();
                if (n.done || n.value[0] != h || "s" != n.value[1])
                    return !1;
                n = l.next();
                return n.done || 4 != n.value[0].x || "t" != n.value[1] || !l.next().done ? !1 : !0
            } catch (u) {
                return !1
            }
        }())
            return a;
        ta();
        var b = new WeakMap
          , c = function(h) {
            this.h = {};
            this.g = f();
            this.size = 0;
            if (h) {
                h = ba(h);
                for (var k; !(k = h.next()).done; )
                    k = k.value,
                    this.set(k[0], k[1])
            }
        };
        c.prototype.set = function(h, k) {
            h = 0 === h ? 0 : h;
            var l = d(this, h);
            l.list || (l.list = this.h[l.id] = []);
            l.na ? l.na.value = k : (l.na = {
                next: this.g,
                Ia: this.g.Ia,
                head: this.g,
                key: h,
                value: k
            },
            l.list.push(l.na),
            this.g.Ia.next = l.na,
            this.g.Ia = l.na,
            this.size++);
            return this
        }
        ;
        c.prototype["delete"] = function(h) {
            h = d(this, h);
            return h.na && h.list ? (h.list.splice(h.index, 1),
            h.list.length || delete this.h[h.id],
            h.na.Ia.next = h.na.next,
            h.na.next.Ia = h.na.Ia,
            h.na.head = null,
            this.size--,
            !0) : !1
        }
        ;
        c.prototype.clear = function() {
            this.h = {};
            this.g = this.g.Ia = f();
            this.size = 0
        }
        ;
        c.prototype.has = function(h) {
            return !!d(this, h).na
        }
        ;
        c.prototype.get = function(h) {
            return (h = d(this, h).na) && h.value
        }
        ;
        c.prototype.entries = function() {
            return e(this, function(h) {
                return [h.key, h.value]
            })
        }
        ;
        c.prototype.keys = function() {
            return e(this, function(h) {
                return h.key
            })
        }
        ;
        c.prototype.values = function() {
            return e(this, function(h) {
                return h.value
            })
        }
        ;
        c.prototype.forEach = function(h, k) {
            for (var l = this.entries(), n; !(n = l.next()).done; )
                n = n.value,
                h.call(k, n[1], n[0], this)
        }
        ;
        c.prototype[Symbol.iterator] = c.prototype.entries;
        var d = function(h, k) {
            var l = k && typeof k;
            "object" == l || "function" == l ? b.has(k) ? l = b.get(k) : (l = "" + ++g,
            b.set(k, l)) : l = "p_" + k;
            var n = h.h[l];
            if (n && va(h.h, l))
                for (h = 0; h < n.length; h++) {
                    var u = n[h];
                    if (k !== k && u.key !== u.key || k === u.key)
                        return {
                            id: l,
                            list: n,
                            index: h,
                            na: u
                        }
                }
            return {
                id: l,
                list: n,
                index: -1,
                na: void 0
            }
        }
          , e = function(h, k) {
            var l = h.g;
            return sa(function() {
                if (l) {
                    for (; l.head != h.g; )
                        l = l.Ia;
                    for (; l.next != l.head; )
                        return l = l.next,
                        {
                            done: !1,
                            value: k(l)
                        };
                    l = null
                }
                return {
                    done: !0,
                    value: void 0
                }
            })
        }
          , f = function() {
            var h = {};
            return h.Ia = h.next = h.head = h
        }
          , g = 0;
        return c
    });
    na("Promise", function(a) {
        function b() {
            this.g = null
        }
        function c(g) {
            return g instanceof e ? g : new e(function(h) {
                h(g)
            }
            )
        }
        if (a)
            return a;
        b.prototype.h = function(g) {
            if (null == this.g) {
                this.g = [];
                var h = this;
                this.l(function() {
                    h.w()
                })
            }
            this.g.push(g)
        }
        ;
        var d = ma.setTimeout;
        b.prototype.l = function(g) {
            d(g, 0)
        }
        ;
        b.prototype.w = function() {
            for (; this.g && this.g.length; ) {
                var g = this.g;
                this.g = [];
                for (var h = 0; h < g.length; ++h) {
                    var k = g[h];
                    g[h] = null;
                    try {
                        k()
                    } catch (l) {
                        this.o(l)
                    }
                }
            }
            this.g = null
        }
        ;
        b.prototype.o = function(g) {
            this.l(function() {
                throw g;
            })
        }
        ;
        var e = function(g) {
            this.h = 0;
            this.l = void 0;
            this.g = [];
            var h = this.o();
            try {
                g(h.resolve, h.reject)
            } catch (k) {
                h.reject(k)
            }
        };
        e.prototype.o = function() {
            function g(l) {
                return function(n) {
                    k || (k = !0,
                    l.call(h, n))
                }
            }
            var h = this
              , k = !1;
            return {
                resolve: g(this.D),
                reject: g(this.w)
            }
        }
        ;
        e.prototype.D = function(g) {
            if (g === this)
                this.w(new TypeError("A Promise cannot resolve to itself"));
            else if (g instanceof e)
                this.F(g);
            else {
                a: switch (typeof g) {
                case "object":
                    var h = null != g;
                    break a;
                case "function":
                    h = !0;
                    break a;
                default:
                    h = !1
                }
                h ? this.M(g) : this.A(g)
            }
        }
        ;
        e.prototype.M = function(g) {
            var h = void 0;
            try {
                h = g.then
            } catch (k) {
                this.w(k);
                return
            }
            "function" == typeof h ? this.G(h, g) : this.A(g)
        }
        ;
        e.prototype.w = function(g) {
            this.C(2, g)
        }
        ;
        e.prototype.A = function(g) {
            this.C(1, g)
        }
        ;
        e.prototype.C = function(g, h) {
            if (0 != this.h)
                throw Error("Cannot settle(" + g + ", " + h + "): Promise already settled in state" + this.h);
            this.h = g;
            this.l = h;
            this.H()
        }
        ;
        e.prototype.H = function() {
            if (null != this.g) {
                for (var g = 0; g < this.g.length; ++g)
                    f.h(this.g[g]);
                this.g = null
            }
        }
        ;
        var f = new b;
        e.prototype.F = function(g) {
            var h = this.o();
            g.Mb(h.resolve, h.reject)
        }
        ;
        e.prototype.G = function(g, h) {
            var k = this.o();
            try {
                g.call(h, k.resolve, k.reject)
            } catch (l) {
                k.reject(l)
            }
        }
        ;
        e.prototype.then = function(g, h) {
            function k(x, w) {
                return "function" == typeof x ? function(C) {
                    try {
                        l(x(C))
                    } catch (G) {
                        n(G)
                    }
                }
                : w
            }
            var l, n, u = new e(function(x, w) {
                l = x;
                n = w
            }
            );
            this.Mb(k(g, l), k(h, n));
            return u
        }
        ;
        e.prototype["catch"] = function(g) {
            return this.then(void 0, g)
        }
        ;
        e.prototype.Mb = function(g, h) {
            function k() {
                switch (l.h) {
                case 1:
                    g(l.l);
                    break;
                case 2:
                    h(l.l);
                    break;
                default:
                    throw Error("Unexpected state: " + l.h);
                }
            }
            var l = this;
            null == this.g ? f.h(k) : this.g.push(k)
        }
        ;
        e.resolve = c;
        e.reject = function(g) {
            return new e(function(h, k) {
                k(g)
            }
            )
        }
        ;
        e.race = function(g) {
            return new e(function(h, k) {
                for (var l = ba(g), n = l.next(); !n.done; n = l.next())
                    c(n.value).Mb(h, k)
            }
            )
        }
        ;
        e.all = function(g) {
            var h = ba(g)
              , k = h.next();
            return k.done ? c([]) : new e(function(l, n) {
                function u(C) {
                    return function(G) {
                        x[C] = G;
                        w--;
                        0 == w && l(x)
                    }
                }
                var x = []
                  , w = 0;
                do
                    x.push(void 0),
                    w++,
                    c(k.value).Mb(u(x.length - 1), n),
                    k = h.next();
                while (!k.done)
            }
            )
        }
        ;
        return e
    });
    na("Math.trunc", function(a) {
        return a ? a : function(b) {
            b = Number(b);
            if (isNaN(b) || Infinity === b || -Infinity === b || 0 === b)
                return b;
            var c = Math.floor(Math.abs(b));
            return 0 > b ? -c : c
        }
    });
    na("Array.prototype.fill", function(a) {
        return a ? a : function(b, c, d) {
            var e = this.length || 0;
            0 > c && (c = Math.max(0, e + c));
            if (null == d || d > e)
                d = e;
            d = Number(d);
            0 > d && (d = Math.max(0, e + d));
            for (c = Number(c || 0); c < d; c++)
                this[c] = b;
            return this
        }
    });
    na("Array.from", function(a) {
        return a ? a : function(b, c, d) {
            c = null != c ? c : function(h) {
                return h
            }
            ;
            var e = []
              , f = "undefined" != typeof Symbol && Symbol.iterator && b[Symbol.iterator];
            if ("function" == typeof f) {
                b = f.call(b);
                for (var g = 0; !(f = b.next()).done; )
                    e.push(c.call(d, f.value, g++))
            } else
                for (f = b.length,
                g = 0; g < f; g++)
                    e.push(c.call(d, b[g], g));
            return e
        }
    });
    na("Object.entries", function(a) {
        return a ? a : function(b) {
            var c = [], d;
            for (d in b)
                va(b, d) && c.push([d, b[d]]);
            return c
        }
    });
    var xa = xa || {}
      , q = this || self
      , r = function(a, b, c) {
        a = a.split(".");
        c = c || q;
        a[0]in c || "undefined" == typeof c.execScript || c.execScript("var " + a[0]);
        for (var d; a.length && (d = a.shift()); )
            a.length || void 0 === b ? c[d] && c[d] !== Object.prototype[d] ? c = c[d] : c = c[d] = {} : c[d] = b
    }
      , Aa = function() {
        if (null === ya)
            a: {
                var a = q.document;
                if ((a = a.querySelector && a.querySelector("script[nonce]")) && (a = a.nonce || a.getAttribute("nonce")) && za.test(a)) {
                    ya = a;
                    break a
                }
                ya = ""
            }
        return ya
    }
      , za = /^[\w+/_-]+[=]{0,2}$/
      , ya = null
      , Ba = function(a, b) {
        a = a.split(".");
        b = b || q;
        for (var c = 0; c < a.length; c++)
            if (b = b[a[c]],
            null == b)
                return null;
        return b
    }
      , Ca = function() {}
      , Da = function(a) {
        a.uc = void 0;
        a.B = function() {
            return a.uc ? a.uc : a.uc = new a
        }
    }
      , Ea = function(a) {
        var b = typeof a;
        if ("object" == b)
            if (a) {
                if (a instanceof Array)
                    return "array";
                if (a instanceof Object)
                    return b;
                var c = Object.prototype.toString.call(a);
                if ("[object Window]" == c)
                    return "object";
                if ("[object Array]" == c || "number" == typeof a.length && "undefined" != typeof a.splice && "undefined" != typeof a.propertyIsEnumerable && !a.propertyIsEnumerable("splice"))
                    return "array";
                if ("[object Function]" == c || "undefined" != typeof a.call && "undefined" != typeof a.propertyIsEnumerable && !a.propertyIsEnumerable("call"))
                    return "function"
            } else
                return "null";
        else if ("function" == b && "undefined" == typeof a.call)
            return "object";
        return b
    }
      , Fa = function(a) {
        return "array" == Ea(a)
    }
      , Ga = function(a) {
        var b = Ea(a);
        return "array" == b || "object" == b && "number" == typeof a.length
    }
      , t = function(a) {
        return "function" == Ea(a)
    }
      , Ha = function(a) {
        var b = typeof a;
        return "object" == b && null != a || "function" == b
    }
      , Ia = "closure_uid_" + (1E9 * Math.random() >>> 0)
      , Ja = 0
      , Ka = function(a, b, c) {
        return a.call.apply(a.bind, arguments)
    }
      , La = function(a, b, c) {
        if (!a)
            throw Error();
        if (2 < arguments.length) {
            var d = Array.prototype.slice.call(arguments, 2);
            return function() {
                var e = Array.prototype.slice.call(arguments);
                Array.prototype.unshift.apply(e, d);
                return a.apply(b, e)
            }
        }
        return function() {
            return a.apply(b, arguments)
        }
    }
      , Ma = function(a, b, c) {
        Function.prototype.bind && -1 != Function.prototype.bind.toString().indexOf("native code") ? Ma = Ka : Ma = La;
        return Ma.apply(null, arguments)
    }
      , Na = function(a, b) {
        var c = Array.prototype.slice.call(arguments, 1);
        return function() {
            var d = c.slice();
            d.push.apply(d, arguments);
            return a.apply(this, d)
        }
    }
      , v = Date.now || function() {
        return +new Date
    }
      , y = function(a, b) {
        function c() {}
        c.prototype = b.prototype;
        a.wa = b.prototype;
        a.prototype = new c;
        a.prototype.constructor = a
    };
    var Oa;
    var Pa = function(a, b) {
        if ("string" === typeof a)
            return "string" !== typeof b || 1 != b.length ? -1 : a.indexOf(b, 0);
        for (var c = 0; c < a.length; c++)
            if (c in a && a[c] === b)
                return c;
        return -1
    }
      , z = function(a, b, c) {
        for (var d = a.length, e = "string" === typeof a ? a.split("") : a, f = 0; f < d; f++)
            f in e && b.call(c, e[f], f, a)
    }
      , Qa = function(a, b) {
        for (var c = "string" === typeof a ? a.split("") : a, d = a.length - 1; 0 <= d; --d)
            d in c && b.call(void 0, c[d], d, a)
    }
      , Ra = function(a, b) {
        for (var c = a.length, d = [], e = 0, f = "string" === typeof a ? a.split("") : a, g = 0; g < c; g++)
            if (g in f) {
                var h = f[g];
                b.call(void 0, h, g, a) && (d[e++] = h)
            }
        return d
    }
      , Sa = function(a, b) {
        for (var c = a.length, d = Array(c), e = "string" === typeof a ? a.split("") : a, f = 0; f < c; f++)
            f in e && (d[f] = b.call(void 0, e[f], f, a));
        return d
    }
      , Ta = function(a, b, c) {
        var d = c;
        z(a, function(e, f) {
            d = b.call(void 0, d, e, f, a)
        });
        return d
    }
      , Ua = function(a, b) {
        for (var c = a.length, d = "string" === typeof a ? a.split("") : a, e = 0; e < c; e++)
            if (e in d && b.call(void 0, d[e], e, a))
                return !0;
        return !1
    }
      , Wa = function(a, b) {
        b = Va(a, b, void 0);
        return 0 > b ? null : "string" === typeof a ? a.charAt(b) : a[b]
    }
      , Va = function(a, b, c) {
        for (var d = a.length, e = "string" === typeof a ? a.split("") : a, f = 0; f < d; f++)
            if (f in e && b.call(c, e[f], f, a))
                return f;
        return -1
    }
      , Xa = function(a, b) {
        for (var c = "string" === typeof a ? a.split("") : a, d = a.length - 1; 0 <= d; d--)
            if (d in c && b.call(void 0, c[d], d, a))
                return d;
        return -1
    }
      , Ya = function(a, b) {
        return 0 <= Pa(a, b)
    }
      , $a = function(a, b) {
        b = Pa(a, b);
        var c;
        (c = 0 <= b) && Array.prototype.splice.call(a, b, 1);
        return c
    }
      , ab = function(a, b) {
        var c = 0;
        Qa(a, function(d, e) {
            b.call(void 0, d, e, a) && 1 == Array.prototype.splice.call(a, e, 1).length && c++
        })
    }
      , bb = function(a) {
        return Array.prototype.concat.apply([], arguments)
    }
      , cb = function(a) {
        var b = a.length;
        if (0 < b) {
            for (var c = Array(b), d = 0; d < b; d++)
                c[d] = a[d];
            return c
        }
        return []
    }
      , db = function(a) {
        for (var b = {}, c = 0, d = 0; d < a.length; ) {
            var e = a[d++];
            var f = e;
            f = Ha(f) ? "o" + (f[Ia] || (f[Ia] = ++Ja)) : (typeof f).charAt(0) + f;
            Object.prototype.hasOwnProperty.call(b, f) || (b[f] = !0,
            a[c++] = e)
        }
        a.length = c
    }
      , fb = function(a, b) {
        a.sort(b || eb)
    }
      , eb = function(a, b) {
        return a > b ? 1 : a < b ? -1 : 0
    }
      , gb = function(a) {
        for (var b = [], c = 0; c < a; c++)
            b[c] = "";
        return b
    };
    var ib = function(a) {
        return Sa(a, function(b) {
            b = b.toString(16);
            return 1 < b.length ? b : "0" + b
        }).join("")
    };
    var jb = function(a) {
        return function() {
            return a
        }
    }
      , kb = function(a) {
        var b = !1, c;
        return function() {
            b || (c = a(),
            b = !0);
            return c
        }
    }
      , lb = function(a) {
        var b = a;
        return function() {
            if (b) {
                var c = b;
                b = null;
                c()
            }
        }
    }
      , nb = function(a) {
        var b = 0
          , c = !1
          , d = []
          , e = function() {
            b = 0;
            c && (c = !1,
            f())
        }
          , f = function() {
            b = q.setTimeout(e, 1E3);
            a.apply(void 0, d)
        };
        return function(g) {
            d = arguments;
            b ? c = !0 : f()
        }
    };
    var ob = function(a, b, c) {
        for (var d in a)
            b.call(c, a[d], d, a)
    }
      , pb = function(a, b) {
        var c = {}, d;
        for (d in a)
            b.call(void 0, a[d], d, a) && (c[d] = a[d]);
        return c
    }
      , rb = function(a) {
        var b = qb, c;
        for (c in b)
            if (a.call(void 0, b[c], c, b))
                return !0;
        return !1
    }
      , ub = function(a) {
        var b = tb, c;
        for (c in b)
            if (!a.call(void 0, b[c], c, b))
                return !1;
        return !0
    }
      , vb = function(a) {
        var b = [], c = 0, d;
        for (d in a)
            b[c++] = a[d];
        return b
    }
      , wb = function(a) {
        var b = [], c = 0, d;
        for (d in a)
            b[c++] = d;
        return b
    }
      , xb = function(a, b) {
        var c = Ga(b)
          , d = c ? b : arguments;
        for (c = c ? 0 : 1; c < d.length; c++) {
            if (null == a)
                return;
            a = a[d[c]]
        }
        return a
    }
      , yb = function(a, b) {
        return null !== a && b in a
    }
      , Ab = function(a) {
        var b = zb, c;
        for (c in b)
            if (a.call(void 0, b[c], c, b))
                return c
    }
      , Bb = function(a) {
        for (var b in a)
            return !1;
        return !0
    }
      , Cb = function(a) {
        for (var b in a)
            delete a[b]
    }
      , Db = function(a, b, c) {
        return null !== a && b in a ? a[b] : c
    }
      , Eb = "constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ")
      , Fb = function(a, b) {
        for (var c, d, e = 1; e < arguments.length; e++) {
            d = arguments[e];
            for (c in d)
                a[c] = d[c];
            for (var f = 0; f < Eb.length; f++)
                c = Eb[f],
                Object.prototype.hasOwnProperty.call(d, c) && (a[c] = d[c])
        }
    };
    var Ib = function(a, b) {
        this.g = a === Gb && b || "";
        this.h = Hb
    };
    Ib.prototype.Ua = !0;
    Ib.prototype.Ma = function() {
        return this.g
    }
    ;
    var Jb = function(a) {
        return a instanceof Ib && a.constructor === Ib && a.h === Hb ? a.g : "type_error:Const"
    }
      , Kb = function(a) {
        return new Ib(Gb,a)
    }
      , Hb = {}
      , Gb = {};
    var Nb = function(a, b) {
        this.g = a === Lb && b || "";
        this.h = Mb
    };
    Nb.prototype.Ua = !0;
    Nb.prototype.Ma = function() {
        return this.g.toString()
    }
    ;
    Nb.prototype.sc = !0;
    Nb.prototype.lc = function() {
        return 1
    }
    ;
    var Ob = function(a) {
        if (a instanceof Nb && a.constructor === Nb && a.h === Mb)
            return a.g;
        Ea(a);
        return "type_error:TrustedResourceUrl"
    }
      , Mb = {}
      , Pb = function(a) {
        return new Nb(Lb,a)
    }
      , Lb = {};
    var Qb = function(a, b) {
        var c = a.length - b.length;
        return 0 <= c && a.indexOf(b, c) == c
    }
      , Rb = function(a) {
        return /^[\s\xa0]*$/.test(a)
    }
      , Tb = String.prototype.trim ? function(a) {
        return a.trim()
    }
    : function(a) {
        return /^[\s\xa0]*([\s\S]*?)[\s\xa0]*$/.exec(a)[1]
    }
      , ac = function(a, b) {
        if (b)
            a = a.replace(Ub, "&amp;").replace(Vb, "&lt;").replace(Wb, "&gt;").replace(Xb, "&quot;").replace(Yb, "&#39;").replace(Zb, "&#0;");
        else {
            if (!$b.test(a))
                return a;
            -1 != a.indexOf("&") && (a = a.replace(Ub, "&amp;"));
            -1 != a.indexOf("<") && (a = a.replace(Vb, "&lt;"));
            -1 != a.indexOf(">") && (a = a.replace(Wb, "&gt;"));
            -1 != a.indexOf('"') && (a = a.replace(Xb, "&quot;"));
            -1 != a.indexOf("'") && (a = a.replace(Yb, "&#39;"));
            -1 != a.indexOf("\x00") && (a = a.replace(Zb, "&#0;"))
        }
        return a
    }
      , Ub = /&/g
      , Vb = /</g
      , Wb = />/g
      , Xb = /"/g
      , Yb = /'/g
      , Zb = /\x00/g
      , $b = /[\x00&<>"']/
      , A = function(a, b) {
        return -1 != a.toLowerCase().indexOf(b.toLowerCase())
    }
      , cc = function(a, b) {
        var c = 0;
        a = Tb(String(a)).split(".");
        b = Tb(String(b)).split(".");
        for (var d = Math.max(a.length, b.length), e = 0; 0 == c && e < d; e++) {
            var f = a[e] || ""
              , g = b[e] || "";
            do {
                f = /(\d*)(\D*)(.*)/.exec(f) || ["", "", "", ""];
                g = /(\d*)(\D*)(.*)/.exec(g) || ["", "", "", ""];
                if (0 == f[0].length && 0 == g[0].length)
                    break;
                c = bc(0 == f[1].length ? 0 : parseInt(f[1], 10), 0 == g[1].length ? 0 : parseInt(g[1], 10)) || bc(0 == f[2].length, 0 == g[2].length) || bc(f[2], g[2]);
                f = f[3];
                g = g[3]
            } while (0 == c)
        }
        return c
    }
      , bc = function(a, b) {
        return a < b ? -1 : a > b ? 1 : 0
    };
    /*

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/
    var fc = function(a, b) {
        this.g = a === dc && b || "";
        this.h = ec
    };
    fc.prototype.Ua = !0;
    fc.prototype.Ma = function() {
        return this.g.toString()
    }
    ;
    fc.prototype.sc = !0;
    fc.prototype.lc = function() {
        return 1
    }
    ;
    var gc = function(a) {
        if (a instanceof fc && a.constructor === fc && a.h === ec)
            return a.g;
        Ea(a);
        return "type_error:SafeUrl"
    }
      , hc = /^(?:(?:https?|mailto|ftp):|[^:/?#]*(?:[/?#]|$))/i
      , ic = function(a) {
        if (a instanceof fc)
            return a;
        a = "object" == typeof a && a.Ua ? a.Ma() : String(a);
        hc.test(a) || (a = "about:invalid#zClosurez");
        return new fc(dc,a)
    }
      , ec = {}
      , dc = {};
    var jc;
    a: {
        var kc = q.navigator;
        if (kc) {
            var lc = kc.userAgent;
            if (lc) {
                jc = lc;
                break a
            }
        }
        jc = ""
    }
    var B = function(a) {
        return -1 != jc.indexOf(a)
    };
    var mc = function() {
        return B("Trident") || B("MSIE")
    }
      , nc = function() {
        return B("Firefox") || B("FxiOS")
    }
      , pc = function() {
        return B("Safari") && !(oc() || B("Coast") || B("Opera") || B("Edge") || B("Edg/") || B("OPR") || nc() || B("Silk") || B("Android"))
    }
      , oc = function() {
        return (B("Chrome") || B("CriOS")) && !B("Edge")
    };
    var rc = function() {
        this.g = "";
        this.l = qc;
        this.h = null
    };
    rc.prototype.sc = !0;
    rc.prototype.lc = function() {
        return this.h
    }
    ;
    rc.prototype.Ua = !0;
    rc.prototype.Ma = function() {
        return this.g.toString()
    }
    ;
    var sc = function(a) {
        if (a instanceof rc && a.constructor === rc && a.l === qc)
            return a.g;
        Ea(a);
        return "type_error:SafeHtml"
    }
      , qc = {}
      , uc = function(a, b) {
        var c = new rc;
        c.g = a;
        c.h = b;
        return c
    };
    uc("<!DOCTYPE html>", 0);
    uc("", 0);
    uc("<br>", 0);
    var vc = function(a, b) {
        a.src = Ob(b);
        (b = Aa()) && a.setAttribute("nonce", b)
    };
    var wc = function(a) {
        return decodeURIComponent(a.replace(/\+/g, " "))
    }
      , xc = function(a) {
        return a = ac(a, void 0)
    }
      , yc = function(a, b) {
        a.length > b && (a = a.substring(0, b - 3) + "...");
        return a
    }
      , zc = String.prototype.repeat ? function(a, b) {
        return a.repeat(b)
    }
    : function(a, b) {
        return Array(b + 1).join(a)
    }
      , Ac = function(a) {
        return null == a ? "" : String(a)
    }
      , Bc = 2147483648 * Math.random() | 0
      , Cc = function(a) {
        return String(a).replace(/\-([a-z])/g, function(b, c) {
            return c.toUpperCase()
        })
    }
      , Dc = function() {
        return "googleAvInapp".replace(/([A-Z])/g, "-$1").toLowerCase()
    }
      , Ec = function(a) {
        return a.replace(/(^|[\s]+)([a-z])/g, function(b, c, d) {
            return c + d.toUpperCase()
        })
    };
    var Fc = function() {
        return B("iPhone") && !B("iPod") && !B("iPad")
    }
      , Gc = function() {
        return Fc() || B("iPad") || B("iPod")
    };
    var Hc = function(a) {
        Hc[" "](a);
        return a
    };
    Hc[" "] = Ca;
    var Ic = function(a, b) {
        try {
            return Hc(a[b]),
            !0
        } catch (c) {}
        return !1
    }
      , Kc = function(a, b) {
        var c = Jc;
        return Object.prototype.hasOwnProperty.call(c, a) ? c[a] : c[a] = b(a)
    };
    var Lc = B("Opera"), Mc = mc(), Nc = B("Edge"), Oc = B("Gecko") && !(A(jc, "WebKit") && !B("Edge")) && !(B("Trident") || B("MSIE")) && !B("Edge"), Pc = A(jc, "WebKit") && !B("Edge"), Qc = B("Macintosh"), Rc = B("Android"), Sc = Fc(), Tc = B("iPad"), Uc = B("iPod"), Vc = Gc(), Wc = function() {
        var a = q.document;
        return a ? a.documentMode : void 0
    }, Xc;
    a: {
        var Yc = ""
          , Zc = function() {
            var a = jc;
            if (Oc)
                return /rv:([^\);]+)(\)|;)/.exec(a);
            if (Nc)
                return /Edge\/([\d\.]+)/.exec(a);
            if (Mc)
                return /\b(?:MSIE|rv)[: ]([^\);]+)(\)|;)/.exec(a);
            if (Pc)
                return /WebKit\/(\S+)/.exec(a);
            if (Lc)
                return /(?:Version)[ \/]?(\S+)/.exec(a)
        }();
        Zc && (Yc = Zc ? Zc[1] : "");
        if (Mc) {
            var $c = Wc();
            if (null != $c && $c > parseFloat(Yc)) {
                Xc = String($c);
                break a
            }
        }
        Xc = Yc
    }
    var ad = Xc, Jc = {}, bd = function(a) {
        return Kc(a, function() {
            return 0 <= cc(ad, a)
        })
    }, cd;
    cd = q.document && Mc ? Wc() : void 0;
    var dd = nc()
      , ed = Fc() || B("iPod")
      , fd = B("iPad")
      , gd = B("Android") && !(oc() || nc() || B("Opera") || B("Silk"))
      , hd = oc()
      , id = pc() && !Gc();
    var jd = {}
      , kd = null
      , ld = function(a, b) {
        void 0 === b && (b = 0);
        if (!kd) {
            kd = {};
            for (var c = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789".split(""), d = ["+/=", "+/", "-_=", "-_.", "-_"], e = 0; 5 > e; e++) {
                var f = c.concat(d[e].split(""));
                jd[e] = f;
                for (var g = 0; g < f.length; g++) {
                    var h = f[g];
                    void 0 === kd[h] && (kd[h] = g)
                }
            }
        }
        b = jd[b];
        c = [];
        for (d = 0; d < a.length; d += 3) {
            var k = a[d]
              , l = (e = d + 1 < a.length) ? a[d + 1] : 0;
            h = (f = d + 2 < a.length) ? a[d + 2] : 0;
            g = k >> 2;
            k = (k & 3) << 4 | l >> 4;
            l = (l & 15) << 2 | h >> 6;
            h &= 63;
            f || (h = 64,
            e || (l = 64));
            c.push(b[g], b[k], b[l] || "", b[h] || "")
        }
        return c.join("")
    };
    var md = 0
      , nd = 0;
    var od = function() {
        this.g = []
    };
    od.prototype.length = function() {
        return this.g.length
    }
    ;
    od.prototype.end = function() {
        var a = this.g;
        this.g = [];
        return a
    }
    ;
    var pd = function(a, b) {
        for (; 127 < b; )
            a.g.push(b & 127 | 128),
            b >>>= 7;
        a.g.push(b)
    }
      , qd = function(a, b) {
        a.g.push(b >>> 0 & 255);
        a.g.push(b >>> 8 & 255);
        a.g.push(b >>> 16 & 255);
        a.g.push(b >>> 24 & 255)
    };
    var rd = function() {
        this.h = [];
        this.l = 0;
        this.g = new od
    };
    rd.prototype.reset = function() {
        this.h = [];
        this.g.end();
        this.l = 0
    }
    ;
    var sd = function(a, b, c) {
        if (null != c) {
            pd(a.g, 8 * b);
            a = a.g;
            var d = c;
            c = 0 > d;
            d = Math.abs(d);
            b = d >>> 0;
            d = Math.floor((d - b) / 4294967296);
            d >>>= 0;
            c && (d = ~d >>> 0,
            b = (~b >>> 0) + 1,
            4294967295 < b && (b = 0,
            d++,
            4294967295 < d && (d = 0)));
            md = b;
            nd = d;
            c = md;
            for (b = nd; 0 < b || 127 < c; )
                a.g.push(c & 127 | 128),
                c = (c >>> 7 | b << 25) >>> 0,
                b >>>= 7;
            a.g.push(c)
        }
    };
    var td = function() {}
      , ud = "function" == typeof Uint8Array
      , xd = function(a, b, c) {
        a.h = null;
        b || (b = []);
        a.C = void 0;
        a.o = -1;
        a.g = b;
        a: {
            if (b = a.g.length) {
                --b;
                var d = a.g[b];
                if (!(null === d || "object" != typeof d || Fa(d) || ud && d instanceof Uint8Array)) {
                    a.w = b - a.o;
                    a.l = d;
                    break a
                }
            }
            a.w = Number.MAX_VALUE
        }
        a.A = {};
        if (c)
            for (b = 0; b < c.length; b++)
                d = c[b],
                d < a.w ? (d += a.o,
                a.g[d] = a.g[d] || vd) : (wd(a),
                a.l[d] = a.l[d] || vd)
    }
      , vd = []
      , wd = function(a) {
        var b = a.w + a.o;
        a.g[b] || (a.l = a.g[b] = {})
    }
      , yd = function(a, b) {
        if (b < a.w) {
            b += a.o;
            var c = a.g[b];
            return c === vd ? a.g[b] = [] : c
        }
        if (a.l)
            return c = a.l[b],
            c === vd ? a.l[b] = [] : c
    }
      , zd = function(a, b) {
        a = yd(a, b);
        return null == a ? 0 : a
    }
      , Ad = function(a, b, c) {
        0 !== c ? b < a.w ? a.g[b + a.o] = c : (wd(a),
        a.l[b] = c) : a.g[b + a.o] = null;
        return a
    }
      , Cd = function(a) {
        if (a.h)
            for (var b in a.h) {
                var c = a.h[b];
                if (Fa(c))
                    for (var d = 0; d < c.length; d++)
                        c[d] && Bd(c[d]);
                else
                    c && Bd(c)
            }
    }
      , Bd = function(a) {
        Cd(a);
        return a.g
    };
    td.prototype.toString = function() {
        Cd(this);
        return this.g.toString()
    }
    ;
    td.prototype.clone = function() {
        return new this.constructor(Dd(Bd(this)))
    }
    ;
    var Dd = function(a) {
        if (Fa(a)) {
            for (var b = Array(a.length), c = 0; c < a.length; c++) {
                var d = a[c];
                null != d && (b[c] = "object" == typeof d ? Dd(d) : d)
            }
            return b
        }
        if (ud && a instanceof Uint8Array)
            return new Uint8Array(a);
        b = {};
        for (c in a)
            d = a[c],
            null != d && (b[c] = "object" == typeof d ? Dd(d) : d);
        return b
    };
    var Ed = document
      , D = window;
    var Fd = function(a) {
        xd(this, a, null)
    };
    y(Fd, td);
    var Hd = function(a) {
        xd(this, a, null)
    };
    y(Hd, td);
    var Id = function(a) {
        this.g = a || {
            cookie: ""
        }
    };
    m = Id.prototype;
    m.isEnabled = function() {
        return navigator.cookieEnabled
    }
    ;
    m.set = function(a, b, c, d, e, f) {
        if ("object" === typeof c) {
            var g = c.o;
            f = c.w;
            e = c.g;
            d = c.h;
            c = c.l
        }
        if (/[;=\s]/.test(a))
            throw Error('Invalid cookie name "' + a + '"');
        if (/[;\r\n]/.test(b))
            throw Error('Invalid cookie value "' + b + '"');
        void 0 === c && (c = -1);
        e = e ? ";domain=" + e : "";
        d = d ? ";path=" + d : "";
        f = f ? ";secure" : "";
        c = 0 > c ? "" : 0 == c ? ";expires=" + (new Date(1970,1,1)).toUTCString() : ";expires=" + (new Date(v() + 1E3 * c)).toUTCString();
        this.g.cookie = a + "=" + b + e + d + c + f + (null != g ? ";samesite=" + g : "")
    }
    ;
    m.get = function(a, b) {
        for (var c = a + "=", d = (this.g.cookie || "").split(";"), e = 0, f; e < d.length; e++) {
            f = Tb(d[e]);
            if (0 == f.lastIndexOf(c, 0))
                return f.substr(c.length);
            if (f == a)
                return ""
        }
        return b
    }
    ;
    m.Ba = function() {
        return Jd(this).keys
    }
    ;
    m.ka = function() {
        return Jd(this).values
    }
    ;
    m.isEmpty = function() {
        return !this.g.cookie
    }
    ;
    m.clear = function() {
        for (var a = Jd(this).keys, b = a.length - 1; 0 <= b; b--) {
            var c = a[b];
            this.get(c);
            this.set(c, "", 0, void 0, void 0)
        }
    }
    ;
    var Jd = function(a) {
        a = (a.g.cookie || "").split(";");
        for (var b = [], c = [], d, e, f = 0; f < a.length; f++)
            e = Tb(a[f]),
            d = e.indexOf("="),
            -1 == d ? (b.push(""),
            c.push(e)) : (b.push(e.substring(0, d)),
            c.push(e.substring(d + 1)));
        return {
            keys: b,
            values: c
        }
    }
      , Kd = new Id("undefined" == typeof document ? null : document);
    var Ld = function(a) {
        return (a = (new Id(a)).get("DATA_USE_CONSENT", "")) ? a : null
    }
      , Md = function(a) {
        var b = (b = (new Id(a)).get("FCCDCF", "")) ? b : null;
        try {
            var c = b ? new Fd(b ? JSON.parse(b) : null) : null
        } catch (d) {
            c = null
        }
        if (!c)
            return Ld(a);
        c.h || (c.h = {});
        c.h[3] || (b = yd(c, 3)) && (c.h[3] = new Hd(b));
        c = c.h[3];
        if (!c || null == yd(c, 1))
            return Ld(a);
        a = yd(c, 2);
        b = Date.now();
        if (a) {
            if (b < a || b > a + 33696E6)
                return null
        } else
            return null;
        return yd(c, 1)
    };
    var Od = function(a) {
        xd(this, a, Nd)
    };
    y(Od, td);
    var Nd = [1, 2, 3, 4];
    try {
        (new self.OffscreenCanvas(0,0)).getContext("2d")
    } catch (a) {}
    var Pd = !Mc || 9 <= Number(cd)
      , Qd = Mc || Lc || Pc;
    var Rd = function(a, b) {
        this.x = void 0 !== a ? a : 0;
        this.y = void 0 !== b ? b : 0
    };
    m = Rd.prototype;
    m.clone = function() {
        return new Rd(this.x,this.y)
    }
    ;
    m.ceil = function() {
        this.x = Math.ceil(this.x);
        this.y = Math.ceil(this.y);
        return this
    }
    ;
    m.floor = function() {
        this.x = Math.floor(this.x);
        this.y = Math.floor(this.y);
        return this
    }
    ;
    m.round = function() {
        this.x = Math.round(this.x);
        this.y = Math.round(this.y);
        return this
    }
    ;
    m.scale = function(a, b) {
        this.x *= a;
        this.y *= "number" === typeof b ? b : a;
        return this
    }
    ;
    var E = function(a, b) {
        this.width = a;
        this.height = b
    };
    m = E.prototype;
    m.clone = function() {
        return new E(this.width,this.height)
    }
    ;
    m.aspectRatio = function() {
        return this.width / this.height
    }
    ;
    m.isEmpty = function() {
        return !(this.width * this.height)
    }
    ;
    m.ceil = function() {
        this.width = Math.ceil(this.width);
        this.height = Math.ceil(this.height);
        return this
    }
    ;
    m.floor = function() {
        this.width = Math.floor(this.width);
        this.height = Math.floor(this.height);
        return this
    }
    ;
    m.round = function() {
        this.width = Math.round(this.width);
        this.height = Math.round(this.height);
        return this
    }
    ;
    m.scale = function(a, b) {
        this.width *= a;
        this.height *= "number" === typeof b ? b : a;
        return this
    }
    ;
    var Ud = function(a) {
        return a ? new Sd(Td(a)) : Oa || (Oa = new Sd)
    }
      , Vd = function() {
        var a = document;
        return a.querySelectorAll && a.querySelector ? a.querySelectorAll("SCRIPT") : a.getElementsByTagName("SCRIPT")
    }
      , Xd = function(a, b) {
        ob(b, function(c, d) {
            c && "object" == typeof c && c.Ua && (c = c.Ma());
            "style" == d ? a.style.cssText = c : "class" == d ? a.className = c : "for" == d ? a.htmlFor = c : Wd.hasOwnProperty(d) ? a.setAttribute(Wd[d], c) : 0 == d.lastIndexOf("aria-", 0) || 0 == d.lastIndexOf("data-", 0) ? a.setAttribute(d, c) : a[d] = c
        })
    }
      , Wd = {
        cellpadding: "cellPadding",
        cellspacing: "cellSpacing",
        colspan: "colSpan",
        frameborder: "frameBorder",
        height: "height",
        maxlength: "maxLength",
        nonce: "nonce",
        role: "role",
        rowspan: "rowSpan",
        type: "type",
        usemap: "useMap",
        valign: "vAlign",
        width: "width"
    }
      , Yd = function(a) {
        a = a.document;
        a = "CSS1Compat" == a.compatMode ? a.documentElement : a.body;
        return new E(a.clientWidth,a.clientHeight)
    }
      , Zd = function(a) {
        var b = a.scrollingElement ? a.scrollingElement : Pc || "CSS1Compat" != a.compatMode ? a.body || a.documentElement : a.documentElement;
        a = a.parentWindow || a.defaultView;
        return Mc && bd("10") && a.pageYOffset != b.scrollTop ? new Rd(b.scrollLeft,b.scrollTop) : new Rd(a.pageXOffset || b.scrollLeft,a.pageYOffset || b.scrollTop)
    }
      , F = function(a) {
        return a ? a.parentWindow || a.defaultView : window
    }
      , be = function(a, b, c) {
        var d = arguments
          , e = document
          , f = String(d[0])
          , g = d[1];
        if (!Pd && g && (g.name || g.type)) {
            f = ["<", f];
            g.name && f.push(' name="', xc(g.name), '"');
            if (g.type) {
                f.push(' type="', xc(g.type), '"');
                var h = {};
                Fb(h, g);
                delete h.type;
                g = h
            }
            f.push(">");
            f = f.join("")
        }
        f = $d(e, f);
        g && ("string" === typeof g ? f.className = g : Fa(g) ? f.className = g.join(" ") : Xd(f, g));
        2 < d.length && ae(e, f, d);
        return f
    }
      , ae = function(a, b, c) {
        function d(g) {
            g && b.appendChild("string" === typeof g ? a.createTextNode(g) : g)
        }
        for (var e = 2; e < c.length; e++) {
            var f = c[e];
            !Ga(f) || Ha(f) && 0 < f.nodeType ? d(f) : z(ce(f) ? cb(f) : f, d)
        }
    }
      , $d = function(a, b) {
        b = String(b);
        "application/xhtml+xml" === a.contentType && (b = b.toLowerCase());
        return a.createElement(b)
    }
      , de = function(a) {
        a && a.parentNode && a.parentNode.removeChild(a)
    }
      , ee = function(a) {
        var b;
        if (Qd && !(Mc && bd("9") && !bd("10") && q.SVGElement && a instanceof q.SVGElement) && (b = a.parentElement))
            return b;
        b = a.parentNode;
        return Ha(b) && 1 == b.nodeType ? b : null
    }
      , fe = function(a, b) {
        if (!a || !b)
            return !1;
        if (a.contains && 1 == b.nodeType)
            return a == b || a.contains(b);
        if ("undefined" != typeof a.compareDocumentPosition)
            return a == b || !!(a.compareDocumentPosition(b) & 16);
        for (; b && a != b; )
            b = b.parentNode;
        return b == a
    }
      , Td = function(a) {
        return 9 == a.nodeType ? a : a.ownerDocument || a.document
    }
      , ge = function(a) {
        try {
            return a.contentWindow || (a.contentDocument ? F(a.contentDocument) : null)
        } catch (b) {}
        return null
    }
      , ce = function(a) {
        if (a && "number" == typeof a.length) {
            if (Ha(a))
                return "function" == typeof a.item || "string" == typeof a.item;
            if (t(a))
                return "function" == typeof a.item
        }
        return !1
    }
      , he = function(a, b) {
        a && (a = a.parentNode);
        for (var c = 0; a; ) {
            if (b(a))
                return a;
            a = a.parentNode;
            c++
        }
        return null
    }
      , Sd = function(a) {
        this.g = a || q.document || document
    };
    Sd.prototype.createElement = function(a) {
        return $d(this.g, a)
    }
    ;
    Sd.prototype.appendChild = function(a, b) {
        a.appendChild(b)
    }
    ;
    Sd.prototype.contains = fe;
    var je = function(a) {
        ie();
        return Pb(a)
    }
      , ie = Ca;
    var le = function() {
        return !ke() && (B("iPod") || B("iPhone") || B("Android") || B("IEMobile"))
    }
      , ke = function() {
        return B("iPad") || B("Android") && !B("Mobile") || B("Silk")
    };
    var me = /^(?:([^:/?#.]+):)?(?:\/\/(?:([^/?#]*)@)?([^/#?]*?)(?::([0-9]+))?(?=[/#?]|$))?([^?#]+)?(?:\?([^#]*))?(?:#([\s\S]*))?$/
      , ne = function(a, b) {
        if (a) {
            a = a.split("&");
            for (var c = 0; c < a.length; c++) {
                var d = a[c].indexOf("=")
                  , e = null;
                if (0 <= d) {
                    var f = a[c].substring(0, d);
                    e = a[c].substring(d + 1)
                } else
                    f = a[c];
                b(f, e ? wc(e) : "")
            }
        }
    }
      , oe = /#|$/
      , pe = function(a, b) {
        var c = a.search(oe);
        a: {
            var d = 0;
            for (var e = b.length; 0 <= (d = a.indexOf(b, d)) && d < c; ) {
                var f = a.charCodeAt(d - 1);
                if (38 == f || 63 == f)
                    if (f = a.charCodeAt(d + e),
                    !f || 61 == f || 38 == f || 35 == f)
                        break a;
                d += e + 1
            }
            d = -1
        }
        if (0 > d)
            return null;
        e = a.indexOf("&", d);
        if (0 > e || e > c)
            e = c;
        d += b.length + 1;
        return wc(a.substr(d, e - d))
    };
    var qe = function(a) {
        try {
            return !!a && null != a.location.href && Ic(a, "foo")
        } catch (b) {
            return !1
        }
    }
      , re = function(a, b) {
        if (a)
            for (var c in a)
                Object.prototype.hasOwnProperty.call(a, c) && b.call(void 0, a[c], c, a)
    }
      , se = /https?:\/\/[^\/]+/
      , te = function(a) {
        return (a = se.exec(a)) && a[0] || ""
    }
      , ue = function() {
        var a = q;
        var b = void 0 === b ? !0 : b;
        try {
            for (var c = null; c != a; c = a,
            a = a.parent)
                switch (a.location.protocol) {
                case "https:":
                    return !0;
                case "file:":
                    return b;
                case "http:":
                    return !1
                }
        } catch (d) {}
        return !0
    }
      , we = function() {
        var a = ve;
        if (!a)
            return "";
        var b = /.*[&#?]google_debug(=[^&]*)?(&.*)?$/;
        try {
            var c = b.exec(decodeURIComponent(a));
            if (c)
                return c[1] && 1 < c[1].length ? c[1].substring(1) : "true"
        } catch (d) {}
        return ""
    }
      , xe = function(a, b) {
        try {
            return !(!a.frames || !a.frames[b])
        } catch (c) {
            return !1
        }
    };
    var ye = function(a) {
        var b = document;
        try {
            var c = Md(b);
            var d = c ? new Od(c ? JSON.parse(c) : null) : null
        } catch (e) {
            d = null
        }
        if (!d)
            return 0;
        b = yd(d, 7);
        if (null == b ? b : b)
            return 4;
        if (6048E5 < v() - (yd(d, 5) || 0))
            return 0;
        if (a) {
            if (Ya(yd(d, 3), a))
                return 2;
            if (Ya(yd(d, 4), a))
                return 3
        }
        return 1
    };
    var ze = {
        hh: 1,
        uh: 2,
        Wg: 3
    };
    var H = function(a, b, c, d) {
        this.top = a;
        this.right = b;
        this.bottom = c;
        this.left = d
    };
    H.prototype.h = function() {
        return this.right - this.left
    }
    ;
    H.prototype.g = function() {
        return this.bottom - this.top
    }
    ;
    H.prototype.clone = function() {
        return new H(this.top,this.right,this.bottom,this.left)
    }
    ;
    H.prototype.contains = function(a) {
        return this && a ? a instanceof H ? a.left >= this.left && a.right <= this.right && a.top >= this.top && a.bottom <= this.bottom : a.x >= this.left && a.x <= this.right && a.y >= this.top && a.y <= this.bottom : !1
    }
    ;
    var Ae = function(a, b) {
        return a == b ? !0 : a && b ? a.top == b.top && a.right == b.right && a.bottom == b.bottom && a.left == b.left : !1
    };
    H.prototype.ceil = function() {
        this.top = Math.ceil(this.top);
        this.right = Math.ceil(this.right);
        this.bottom = Math.ceil(this.bottom);
        this.left = Math.ceil(this.left);
        return this
    }
    ;
    H.prototype.floor = function() {
        this.top = Math.floor(this.top);
        this.right = Math.floor(this.right);
        this.bottom = Math.floor(this.bottom);
        this.left = Math.floor(this.left);
        return this
    }
    ;
    H.prototype.round = function() {
        this.top = Math.round(this.top);
        this.right = Math.round(this.right);
        this.bottom = Math.round(this.bottom);
        this.left = Math.round(this.left);
        return this
    }
    ;
    var Be = function(a, b, c) {
        b instanceof Rd ? (a.left += b.x,
        a.right += b.x,
        a.top += b.y,
        a.bottom += b.y) : (a.left += b,
        a.right += b,
        "number" === typeof c && (a.top += c,
        a.bottom += c));
        return a
    };
    H.prototype.scale = function(a, b) {
        b = "number" === typeof b ? b : a;
        this.left *= a;
        this.right *= a;
        this.top *= b;
        this.bottom *= b;
        return this
    }
    ;
    var Ce = function(a, b, c, d) {
        this.left = a;
        this.top = b;
        this.width = c;
        this.height = d
    };
    Ce.prototype.clone = function() {
        return new Ce(this.left,this.top,this.width,this.height)
    }
    ;
    var De = function(a) {
        return new H(a.top,a.left + a.width,a.top + a.height,a.left)
    };
    m = Ce.prototype;
    m.contains = function(a) {
        return a instanceof Rd ? a.x >= this.left && a.x <= this.left + this.width && a.y >= this.top && a.y <= this.top + this.height : this.left <= a.left && this.left + this.width >= a.left + a.width && this.top <= a.top && this.top + this.height >= a.top + a.height
    }
    ;
    m.ceil = function() {
        this.left = Math.ceil(this.left);
        this.top = Math.ceil(this.top);
        this.width = Math.ceil(this.width);
        this.height = Math.ceil(this.height);
        return this
    }
    ;
    m.floor = function() {
        this.left = Math.floor(this.left);
        this.top = Math.floor(this.top);
        this.width = Math.floor(this.width);
        this.height = Math.floor(this.height);
        return this
    }
    ;
    m.round = function() {
        this.left = Math.round(this.left);
        this.top = Math.round(this.top);
        this.width = Math.round(this.width);
        this.height = Math.round(this.height);
        return this
    }
    ;
    m.scale = function(a, b) {
        b = "number" === typeof b ? b : a;
        this.left *= a;
        this.width *= a;
        this.top *= b;
        this.height *= b;
        return this
    }
    ;
    var Fe = function(a, b) {
        if ("string" === typeof b)
            (b = Ee(a, b)) && (a.style[b] = void 0);
        else
            for (var c in b) {
                var d = a
                  , e = b[c]
                  , f = Ee(d, c);
                f && (d.style[f] = e)
            }
    }
      , Ge = {}
      , Ee = function(a, b) {
        var c = Ge[b];
        if (!c) {
            var d = Cc(b);
            c = d;
            void 0 === a.style[d] && (d = (Pc ? "Webkit" : Oc ? "Moz" : Mc ? "ms" : Lc ? "O" : null) + Ec(d),
            void 0 !== a.style[d] && (c = d));
            Ge[b] = c
        }
        return c
    }
      , He = function(a, b) {
        var c = a.style[Cc(b)];
        return "undefined" !== typeof c ? c : a.style[Ee(a, b)] || ""
    }
      , Ie = function(a) {
        try {
            var b = a.getBoundingClientRect()
        } catch (c) {
            return {
                left: 0,
                top: 0,
                right: 0,
                bottom: 0
            }
        }
        Mc && a.ownerDocument.body && (a = a.ownerDocument,
        b.left -= a.documentElement.clientLeft + a.body.clientLeft,
        b.top -= a.documentElement.clientTop + a.body.clientTop);
        return b
    }
      , Je = function(a) {
        var b = Td(a)
          , c = new Rd(0,0);
        var d = b ? Td(b) : document;
        d = !Mc || 9 <= Number(cd) || "CSS1Compat" == Ud(d).g.compatMode ? d.documentElement : d.body;
        if (a == d)
            return c;
        a = Ie(a);
        b = Zd(Ud(b).g);
        c.x = a.left + b.x;
        c.y = a.top + b.y;
        return c
    }
      , Ke = function(a, b) {
        var c = new Rd(0,0)
          , d = F(Td(a));
        if (!Ic(d, "parent"))
            return c;
        do {
            if (d == b)
                var e = Je(a);
            else
                e = Ie(a),
                e = new Rd(e.left,e.top);
            c.x += e.x;
            c.y += e.y
        } while (d && d != b && d != d.parent && (a = d.frameElement) && (d = d.parent));return c
    }
      , Le = function(a) {
        var b = a.offsetWidth
          , c = a.offsetHeight
          , d = Pc && !b && !c;
        return (void 0 === b || d) && a.getBoundingClientRect ? (a = Ie(a),
        new E(a.right - a.left,a.bottom - a.top)) : new E(b,c)
    };
    var Me = kb(function() {
        var a = !1;
        try {
            var b = Object.defineProperty({}, "passive", {
                get: function() {
                    a = !0
                }
            });
            q.addEventListener("test", null, b)
        } catch (c) {}
        return a
    });
    function Ne(a) {
        return a ? a.passive && Me() ? a : a.capture || !1 : !1
    }
    var Oe = function(a, b, c, d) {
        return a.addEventListener ? (a.addEventListener(b, c, Ne(d)),
        !0) : !1
    }
      , Pe = function(a, b, c) {
        a.removeEventListener && a.removeEventListener(b, c, Ne(void 0))
    }
      , Qe = function(a) {
        var b = void 0 === b ? {} : b;
        if (t(window.CustomEvent))
            var c = new CustomEvent("rum_blp",b);
        else
            c = document.createEvent("CustomEvent"),
            c.initCustomEvent("rum_blp", !!b.bubbles, !!b.cancelable, b.detail);
        a.dispatchEvent(c)
    };
    var Re = function(a) {
        a = void 0 === a ? q : a;
        var b = a.context || a.AMP_CONTEXT_DATA;
        if (!b)
            try {
                b = a.parent.context || a.parent.AMP_CONTEXT_DATA
            } catch (c) {}
        try {
            if (b && b.pageViewId && b.canonicalUrl)
                return b
        } catch (c) {}
        return null
    };
    var Se = function(a, b) {
        a.google_image_requests || (a.google_image_requests = []);
        var c = a.document.createElement("img");
        c.src = b;
        a.google_image_requests.push(c)
    };
    var Te = /^((market|itms|intent|itms-appss):\/\/)/i;
    var Ue = !!window.google_async_iframe_id
      , Ve = Ue && window.parent || window
      , Ye = function() {
        if (Ue && !qe(Ve)) {
            var a = "." + Ed.domain;
            try {
                for (; 2 < a.split(".").length && !qe(Ve); )
                    Ed.domain = a = a.substr(a.indexOf(".") + 1),
                    Ve = window.parent
            } catch (b) {}
            qe(Ve) || (Ve = window)
        }
        return Ve
    };
    Pb(Jb(Kb("//fonts.googleapis.com/css")));
    var Ze = function(a, b, c) {
        c = void 0 === c ? {} : c;
        this.error = a;
        this.context = b.context;
        this.msg = b.message || "";
        this.id = b.id || "jserror";
        this.meta = c
    }
      , $e = function(a) {
        return !!(a.error && a.meta && a.id)
    };
    var af = /^https?:\/\/(\w|-)+\.cdn\.ampproject\.(net|org)(\?|\/|$)/
      , ef = function(a) {
        a = a || bf();
        for (var b = new cf(q.location.href,q,!1), c = null, d = a.length - 1, e = d; 0 <= e; --e) {
            var f = a[e];
            !c && af.test(f.url) && (c = f);
            if (f.url && !f.wc) {
                b = f;
                break
            }
        }
        e = null;
        f = a.length && a[d].url;
        0 != b.depth && f && (e = a[d]);
        return new df(b,e,c)
    }
      , bf = function() {
        var a = q
          , b = []
          , c = null;
        do {
            var d = a;
            if (qe(d)) {
                var e = d.location.href;
                c = d.document && d.document.referrer || null
            } else
                e = c,
                c = null;
            b.push(new cf(e || "",d));
            try {
                a = d.parent
            } catch (f) {
                a = null
            }
        } while (a && d != a);d = 0;
        for (a = b.length - 1; d <= a; ++d)
            b[d].depth = a - d;
        d = q;
        if (d.location && d.location.ancestorOrigins && d.location.ancestorOrigins.length == b.length - 1)
            for (a = 1; a < b.length; ++a)
                e = b[a],
                e.url || (e.url = d.location.ancestorOrigins[a - 1] || "",
                e.wc = !0);
        return b
    }
      , df = function(a, b, c) {
        this.g = a;
        this.h = b;
        this.l = c
    }
      , cf = function(a, b, c) {
        this.url = a;
        this.la = b;
        this.wc = !!c;
        this.depth = null
    };
    var ff = function() {
        this.h = "&";
        this.o = !1;
        this.l = {};
        this.w = 0;
        this.g = []
    }
      , gf = function(a, b) {
        var c = {};
        c[a] = b;
        return [c]
    }
      , jf = function(a, b, c, d, e) {
        var f = [];
        re(a, function(g, h) {
            (g = hf(g, b, c, d, e)) && f.push(h + "=" + g)
        });
        return f.join(b)
    }
      , hf = function(a, b, c, d, e) {
        if (null == a)
            return "";
        b = b || "&";
        c = c || ",$";
        "string" == typeof c && (c = c.split(""));
        if (a instanceof Array) {
            if (d = d || 0,
            d < c.length) {
                for (var f = [], g = 0; g < a.length; g++)
                    f.push(hf(a[g], b, c, d + 1, e));
                return f.join(c[d])
            }
        } else if ("object" == typeof a)
            return e = e || 0,
            2 > e ? encodeURIComponent(jf(a, b, c, d, e + 1)) : "...";
        return encodeURIComponent(String(a))
    }
      , kf = function(a, b, c) {
        a.g.push(b);
        a.l[b] = c
    }
      , lf = function(a, b, c, d) {
        a.g.push(b);
        a.l[b] = gf(c, d)
    }
      , nf = function(a, b, c) {
        b = b + "//pagead2.googlesyndication.com" + c;
        var d = mf(a) - c.length;
        if (0 > d)
            return "";
        a.g.sort(function(n, u) {
            return n - u
        });
        c = null;
        for (var e = "", f = 0; f < a.g.length; f++)
            for (var g = a.g[f], h = a.l[g], k = 0; k < h.length; k++) {
                if (!d) {
                    c = null == c ? g : c;
                    break
                }
                var l = jf(h[k], a.h, ",$");
                if (l) {
                    l = e + l;
                    if (d >= l.length) {
                        d -= l.length;
                        b += l;
                        e = a.h;
                        break
                    }
                    a.o && (e = d,
                    l[e - 1] == a.h && --e,
                    b += l.substr(0, e),
                    e = a.h,
                    d = 0);
                    c = null == c ? g : c
                }
            }
        a = "";
        null != c && (a = e + "trn=" + c);
        return b + a + ""
    }
      , mf = function(a) {
        var b = 1, c;
        for (c in a.l)
            b = c.length > b ? c.length : b;
        return 3997 - b - a.h.length - 1
    };
    var of = function() {
        var a = void 0 === a ? D : a;
        this.h = "http:" === a.location.protocol ? "http:" : "https:";
        this.g = Math.random()
    }
      , rf = function() {
        var a = pf
          , b = qf.google_srt;
        0 <= b && 1 >= b && (a.g = b)
    }
      , sf = function(a, b, c, d, e) {
        if ((d ? a.g : Math.random()) < (e || .01))
            try {
                if (c instanceof ff)
                    var f = c;
                else
                    f = new ff,
                    re(c, function(h, k) {
                        var l = f
                          , n = l.w++;
                        kf(l, n, gf(k, h))
                    });
                var g = nf(f, a.h, "/pagead/gen_204?id=" + b + "&");
                g && Se(q, g)
            } catch (h) {}
    };
    var tf = null;
    var uf = function() {
        var a = q.performance;
        return a && a.now && a.timing ? Math.floor(a.now() + a.timing.navigationStart) : v()
    }
      , vf = function() {
        var a = void 0 === a ? q : a;
        return (a = a.performance) && a.now ? a.now() : null
    }
      , wf = function(a) {
        var b = q.performance;
        return b && b.timing && b.timing[a] || 0
    }
      , xf = function() {
        var a = Math.min(wf("domLoading") || Infinity, wf("domInteractive") || Infinity);
        return Infinity == a ? Math.max(wf("responseEnd"), wf("navigationStart")) : a
    };
    var yf = function(a, b, c, d, e) {
        this.label = a;
        this.type = b;
        this.value = c;
        this.duration = void 0 === d ? 0 : d;
        this.uniqueId = Math.random();
        this.slotId = e
    };
    var zf = q.performance
      , Af = !!(zf && zf.mark && zf.measure && zf.clearMarks)
      , Bf = kb(function() {
        var a;
        if (a = Af) {
            var b;
            if (null === tf) {
                tf = "";
                try {
                    a = "";
                    try {
                        a = q.top.location.hash
                    } catch (c) {
                        a = q.location.hash
                    }
                    a && (tf = (b = a.match(/\bdeid=([\d,]+)/)) ? b[1] : "")
                } catch (c) {}
            }
            b = tf;
            a = !!b.indexOf && 0 <= b.indexOf("1337")
        }
        return a
    })
      , Cf = function(a, b) {
        this.events = [];
        this.g = b || q;
        var c = null;
        b && (b.google_js_reporting_queue = b.google_js_reporting_queue || [],
        this.events = b.google_js_reporting_queue,
        c = b.google_measure_js_timing);
        this.h = Bf() || (null != c ? c : Math.random() < a)
    };
    Cf.prototype.C = function() {
        this.h = !1;
        this.events != this.g.google_js_reporting_queue && (Bf() && z(this.events, Df),
        this.events.length = 0)
    }
    ;
    Cf.prototype.H = function(a) {
        !this.h || 2048 < this.events.length || this.events.push(a)
    }
    ;
    var Df = function(a) {
        a && zf && Bf() && (zf.clearMarks("goog_" + a.label + "_" + a.uniqueId + "_start"),
        zf.clearMarks("goog_" + a.label + "_" + a.uniqueId + "_end"))
    };
    Cf.prototype.start = function(a, b) {
        if (!this.h)
            return null;
        var c = vf() || uf();
        a = new yf(a,b,c);
        b = "goog_" + a.label + "_" + a.uniqueId + "_start";
        zf && Bf() && zf.mark(b);
        return a
    }
    ;
    Cf.prototype.end = function(a) {
        if (this.h && "number" === typeof a.value) {
            var b = vf() || uf();
            a.duration = b - a.value;
            b = "goog_" + a.label + "_" + a.uniqueId + "_end";
            zf && Bf() && zf.mark(b);
            this.H(a)
        }
    }
    ;
    var Ff = function() {
        var a = Ef;
        this.l = pf;
        this.A = "jserror";
        this.o = !0;
        this.h = null;
        this.C = this.Ha;
        this.g = void 0 === a ? null : a;
        this.w = !1
    };
    m = Ff.prototype;
    m.pinger = function() {
        return this.l
    }
    ;
    m.dc = function(a) {
        this.h = a
    }
    ;
    m.Qc = function(a) {
        this.A = a
    }
    ;
    m.Rc = function(a) {
        this.o = a
    }
    ;
    m.Sc = function(a) {
        this.w = a
    }
    ;
    m.Xa = function(a, b, c) {
        try {
            if (this.g && this.g.h) {
                var d = this.g.start(a.toString(), 3);
                var e = b();
                this.g.end(d)
            } else
                e = b()
        } catch (g) {
            b = this.o;
            try {
                Df(d);
                var f = new Ze(g,{
                    message: Gf(g)
                });
                b = this.C(a, f, void 0, c)
            } catch (h) {
                this.Ha(217, h)
            }
            if (!b)
                throw g;
        }
        return e
    }
    ;
    m.Mc = function(a, b, c, d) {
        var e = this;
        return function(f) {
            for (var g = [], h = 0; h < arguments.length; ++h)
                g[h - 0] = arguments[h];
            return e.Xa(a, function() {
                return b.apply(c, g)
            }, d)
        }
    }
    ;
    m.Ha = function(a, b, c, d, e) {
        e = e || this.A;
        try {
            var f = new ff;
            f.o = !0;
            lf(f, 1, "context", a);
            $e(b) || (b = new Ze(b,{
                message: Gf(b)
            }));
            b.msg && lf(f, 2, "msg", b.msg.substring(0, 512));
            var g = b.meta || {};
            if (this.h)
                try {
                    this.h(g)
                } catch (k) {}
            if (d)
                try {
                    d(g)
                } catch (k) {}
            kf(f, 3, [g]);
            var h = ef();
            h.h && lf(f, 4, "top", h.h.url || "");
            lf(f, 5, "url", h.g.url || "");
            sf(this.l, e, f, this.w, c)
        } catch (k) {
            try {
                sf(this.l, e, {
                    context: "ecmserr",
                    rctx: a,
                    msg: Gf(k),
                    url: h && h.g.url
                }, this.w, c)
            } catch (l) {}
        }
        return this.o
    }
    ;
    var Gf = function(a) {
        var b = a.toString();
        a.name && -1 == b.indexOf(a.name) && (b += ": " + a.name);
        a.message && -1 == b.indexOf(a.message) && (b += ": " + a.message);
        if (a.stack) {
            a = a.stack;
            var c = b;
            try {
                -1 == a.indexOf(c) && (a = c + "\n" + a);
                for (var d; a != d; )
                    d = a,
                    a = a.replace(/((https?:\/..*\/)[^\/:]*:\d+(?:.|\n)*)\2/, "$1");
                b = a.replace(/\n */g, "\n")
            } catch (e) {
                b = c
            }
        }
        return b
    };
    var Hf = function() {
        this.h = "jserror";
        this.l = !1;
        this.g = null;
        this.o = !1;
        this.A = Math.random();
        this.w = this.Ha
    };
    m = Hf.prototype;
    m.Qc = function(a) {
        this.h = a
    }
    ;
    m.dc = function(a) {
        this.g = a
    }
    ;
    m.Rc = function(a) {
        this.l = a
    }
    ;
    m.Sc = function(a) {
        this.o = a
    }
    ;
    m.Ha = function(a, b, c, d, e) {
        e = void 0 === e ? this.h : e;
        if ((this.o ? this.A : Math.random()) > (void 0 === c ? .01 : c))
            return this.l;
        $e(b) || (b = new Ze(b,{
            context: a,
            id: e
        }));
        if (d || this.g)
            b.meta = {},
            this.g && this.g(b.meta),
            d && d(b.meta);
        q.google_js_errors = q.google_js_errors || [];
        q.google_js_errors.push(b);
        q.error_rep_loaded || (b = q.document,
        a = b.createElement("script"),
        vc(a, je(q.location.protocol + "//pagead2.googlesyndication.com/pagead/js/err_rep.js")),
        (b = b.getElementsByTagName("script")[0]) && b.parentNode && b.parentNode.insertBefore(a, b),
        q.error_rep_loaded = !0);
        return this.l
    }
    ;
    m.Xa = function(a, b, c) {
        try {
            var d = b()
        } catch (e) {
            if (!this.w(a, e, .01, c, this.h))
                throw e;
        }
        return d
    }
    ;
    m.Mc = function(a, b, c, d) {
        var e = this;
        return function(f) {
            for (var g = [], h = 0; h < arguments.length; ++h)
                g[h - 0] = arguments[h];
            return e.Xa(a, function() {
                return b.apply(c, g)
            }, d)
        }
    }
    ;
    var pf, If, Jf, qf = Ye(), Ef = new Cf(1,qf);
    (function() {
        pf = new of;
        "number" !== typeof qf.google_srt && (qf.google_srt = Math.random());
        rf();
        If = new Ff;
        If.dc(function(b) {
            var c = D.jerExpIds;
            if (Fa(c) && 0 !== c.length) {
                var d = b.eid;
                d ? (c = [].concat(ca(d.split(",")), ca(c)),
                db(c),
                b.eid = c.join(",")) : b.eid = c.join(",")
            }
            Jf && (b.jc = Jf);
            (c = D.jerUserAgent) && (b.useragent = c)
        });
        If.Sc(!0);
        "complete" == qf.document.readyState ? qf.google_measure_js_timing || Ef.C() : Ef.h && Oe(qf, "load", function() {
            qf.google_measure_js_timing || Ef.C()
        });
        var a = Ed.currentScript;
        Jf = a ? a.dataset.jc : ""
    }
    )();
    var Kf = function(a) {
        for (var b = 0, c = a, d = 0; a && a != a.parent; )
            a = a.parent,
            d++,
            qe(a) && (c = a,
            b = d);
        return {
            la: c,
            level: b
        }
    };
    var Lf = function() {
        this.S = {}
    }
      , Of = function() {
        if (Mf)
            var a = Mf;
        else {
            a = ((a = Re()) ? qe(a.master) ? a.master : null : null) || Ye();
            var b = a.google_persistent_state_async;
            a = null != b && "object" == typeof b && null != b.S && "object" == typeof b.S ? Mf = b : a.google_persistent_state_async = Mf = new Lf
        }
        b = Ye();
        var c = Re(b);
        c ? ((c = c || Re()) ? (b = c.pageViewId,
        c = c.clientId,
        "string" === typeof c && (b += c.replace(/\D/g, "").substr(0, 6))) : b = null,
        b = +b) : (b = Kf(b).la,
        (c = b.google_global_correlator) || (b.google_global_correlator = c = 1 + Math.floor(Math.random() * Math.pow(2, 43))),
        b = c);
        c = Nf[7] || "google_ps_7";
        a = a.S;
        var d = a[c];
        a = void 0 === d ? a[c] = b : d;
        return a
    }
      , Mf = null
      , Pf = {}
      , Nf = (Pf[8] = "google_prev_ad_formats_by_region",
    Pf[9] = "google_prev_ad_slotnames_by_region",
    Pf);
    var Sf = function(a) {
        var b = [];
        Qf(new Rf, a, b);
        return b.join("")
    }
      , Rf = function() {}
      , Qf = function(a, b, c) {
        if (null == b)
            c.push("null");
        else {
            if ("object" == typeof b) {
                if (Fa(b)) {
                    var d = b;
                    b = d.length;
                    c.push("[");
                    for (var e = "", f = 0; f < b; f++)
                        c.push(e),
                        Qf(a, d[f], c),
                        e = ",";
                    c.push("]");
                    return
                }
                if (b instanceof String || b instanceof Number || b instanceof Boolean)
                    b = b.valueOf();
                else {
                    c.push("{");
                    e = "";
                    for (d in b)
                        Object.prototype.hasOwnProperty.call(b, d) && (f = b[d],
                        "function" != typeof f && (c.push(e),
                        Tf(d, c),
                        c.push(":"),
                        Qf(a, f, c),
                        e = ","));
                    c.push("}");
                    return
                }
            }
            switch (typeof b) {
            case "string":
                Tf(b, c);
                break;
            case "number":
                c.push(isFinite(b) && !isNaN(b) ? String(b) : "null");
                break;
            case "boolean":
                c.push(String(b));
                break;
            case "function":
                c.push("null");
                break;
            default:
                throw Error("Unknown type: " + typeof b);
            }
        }
    }
      , Uf = {
        '"': '\\"',
        "\\": "\\\\",
        "/": "\\/",
        "\b": "\\b",
        "\f": "\\f",
        "\n": "\\n",
        "\r": "\\r",
        "\t": "\\t",
        "\x0B": "\\u000b"
    }
      , Vf = /\uffff/.test("\uffff") ? /[\\"\x00-\x1f\x7f-\uffff]/g : /[\\"\x00-\x1f\x7f-\xff]/g
      , Tf = function(a, b) {
        b.push('"', a.replace(Vf, function(c) {
            var d = Uf[c];
            d || (d = "\\u" + (c.charCodeAt(0) | 65536).toString(16).substr(1),
            Uf[c] = d);
            return d
        }), '"')
    };
    var Wf = function() {
        this.g = null;
        this.h = "missing-id"
    }
      , Yf = function(a) {
        var b = null;
        try {
            b = document.getElementsByClassName("lima-exp-data")
        } catch (c) {
            return Xf("missing-element", a.h),
            a.g = "",
            null
        }
        if (1 < b.length)
            return Xf("multiple-elements", a.h),
            a.g = "",
            null;
        b = b[0];
        return b ? b.innerHTML : (Xf("missing-element", a.h),
        a.g = "",
        null)
    }
      , $f = function() {
        var a = Zf
          , b = Yf(a);
        if (null !== b)
            if (/^\s*$/.test(b) ? 0 : /^[\],:{}\s\u2028\u2029]*$/.test(b.replace(/\\["\\\/bfnrtu]/g, "@").replace(/(?:"[^"\\\n\r\u2028\u2029\x00-\x08\x0a-\x1f]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)[\s\u2028\u2029]*(?=:|,|]|}|$)/g, "]").replace(/(?:^|:|,)(?:[\s\u2028\u2029]*\[)+/g, ""))) {
                var c = JSON.parse(b);
                b = c.experimentFlags;
                c = c.binaryIdentifier;
                var d = "string" === typeof c;
                d && (a.h = c);
                "string" !== typeof b ? (Xf("missing-flags", a.h),
                a.g = "") : (d || Xf("missing-binary-id", a.h),
                a.g = b)
            } else
                Xf("invalid-json", a.h),
                a.g = ""
    };
    Wf.prototype.reset = function() {
        this.g = null;
        this.h = "missing-id"
    }
    ;
    var ag = function(a, b, c) {
        this.id = a;
        this.L = b;
        this.g = c;
        this.jb = !1
    }
      , bg = function() {
        this.g = []
    }
      , cg = function() {
        this.g = new Map;
        this.h = !1;
        this.o = new bg;
        this.w = new ag(0,0,!1);
        this.l = [this.o]
    }
      , I = function(a) {
        var b = dg;
        if (b.h || b.g.has(a.id) || null == a.L && null == a.control)
            return b.w;
        var c = b.o;
        if (null != a.control)
            for (var d = ba(b.l), e = d.next(); !e.done; e = d.next()) {
                if (e = e.value,
                e.g.includes(a.control)) {
                    c = e;
                    break
                }
            }
        else
            null != a.xc && (c = a.xc);
        d = 0;
        null != a.control ? d = a.control.L : null != a.L && (d = a.L);
        a = new ag(a.id,d,!!a.wh);
        c.g.push(a);
        b.l.includes(c) || b.l.push(c);
        b.g.set(a.id, a);
        return a
    }
      , eg = function() {
        var a = dg;
        return [].concat(ca(a.g.keys())).filter(function(b) {
            b = this.g.get(b);
            return b.jb || b.g
        }, a)
    }
      , fg = function(a) {
        var b = dg;
        b.h || (a.g(b.l, b.g),
        b.h = !0)
    };
    cg.prototype.reset = function() {
        for (var a = ba(this.g), b = a.next(); !b.done; b = a.next())
            b = ba(b.value),
            b.next(),
            b.next().value.jb = !1;
        this.h = !1
    }
    ;
    var dg = new cg;
    var gg = function() {};
    gg.prototype.g = function(a) {
        a = ba(a);
        for (var b = a.next(); !b.done; b = a.next()) {
            var c = 0
              , d = Math.floor(1E3 * Math.random());
            b = ba(b.value.g);
            for (var e = b.next(); !e.done; e = b.next())
                if (e = e.value,
                c += e.L,
                d < c) {
                    e.jb = !0;
                    break
                }
        }
    }
    ;
    var hg = function(a) {
        this.h = a
    };
    hg.prototype.g = function(a, b) {
        a = ba(this.h);
        for (var c = a.next(); !c.done; c = a.next())
            if (c = b.get(c.value))
                c.jb = !0
    }
    ;
    var ig = function(a) {
        return {
            visible: 1,
            hidden: 2,
            prerender: 3,
            preview: 4,
            unloaded: 5
        }[a.visibilityState || a.webkitVisibilityState || a.mozVisibilityState || ""] || 0
    }
      , jg = function(a) {
        var b;
        a.visibilityState ? b = "visibilitychange" : a.mozVisibilityState ? b = "mozvisibilitychange" : a.webkitVisibilityState && (b = "webkitvisibilitychange");
        return b
    };
    var kg = function(a) {
        a = a._google_rum_ns_ = a._google_rum_ns_ || {};
        return a.pq = a.pq || []
    };
    var lg = function(a, b, c) {
        re(b, function(d, e) {
            var f = c && c[e];
            !d && 0 !== d || f || (a += "&" + encodeURIComponent(e) + "=" + encodeURIComponent(String(d)),
            c && (c[e] = !0))
        });
        return a
    }
      , sg = function(a, b, c, d, e, f, g, h) {
        f = void 0 === f ? Infinity : f;
        g = void 0 === g ? !1 : g;
        Cf.call(this, a, h);
        var k = this;
        this.M = 0;
        this.K = f;
        this.aa = b;
        this.N = c;
        this.$ = d;
        this.ma = e;
        this.Y = !("csi.gstatic.com" !== this.N || !this.g.navigator || !this.g.navigator.sendBeacon);
        this.w = {};
        this.J = {};
        this.g.performance && this.g.performance.now || mg(this, "dat", 1);
        this.g.navigator && this.g.navigator.deviceMemory && mg(this, "dmc", this.g.navigator.deviceMemory);
        this.V = !g;
        this.O = function() {
            k.g.setTimeout(function() {
                return ng(k)
            }, 1100)
        }
        ;
        this.ra = [];
        this.Z = function() {
            og(k, 1)
        }
        ;
        this.P = function() {
            og(k, 2)
        }
        ;
        this.pa = nb(function() {
            ng(k)
        });
        this.Aa = function() {
            var n = k.g.document;
            (null != n.hidden ? n.hidden : null != n.mozHidden ? n.mozHidden : null != n.webkitHidden && n.webkitHidden) && k.pa()
        }
        ;
        this.D = this.g.setTimeout(function() {
            return ng(k)
        }, 5E3);
        this.A = {};
        this.o = b.length + c.length + d.length + e.length + 3;
        this.l = 0;
        z(this.events, function(n) {
            return pg(k, n)
        });
        this.G = [];
        a = kg(this.g);
        var l = function(n) {
            var u = n[0];
            n = n[1];
            var x = u.length + n.length + 2;
            8E3 < k.o + k.l + x && ng(k);
            k.G.push([u, n]);
            k.l += x;
            6E3 <= k.o + k.l && ng(k);
            return 0
        };
        z(a, function(n) {
            return l(n)
        });
        a.length = 0;
        a.push = l;
        qg(this);
        rg(this)
    };
    p(sg, Cf);
    var rg = function(a) {
        "complete" === a.g.document.readyState ? a.g.setTimeout(function() {
            return ng(a)
        }, 0) : Oe(a.g, "load", a.O);
        var b = jg(a.g.document);
        "undefined" !== typeof b && Oe(a.g, b, a.Aa);
        Oe(a.g, "unload", a.Z);
        Oe(a.g, "pagehide", a.P)
    }
      , mg = function(a, b, c) {
        c = String(c);
        a.o = null != a.w[b] ? a.o + (c.length - a.w[b].length) : a.o + (b.length + c.length + 2);
        a.w[b] = c
    }
      , tg = function(a) {
        null != a.w.uet && (a.o -= 3 + a.w.uet.length + 2,
        delete a.w.uet)
    }
      , ug = function(a, b, c, d, e) {
        e = void 0 === e ? "" : e;
        var f = null == a.A[b] ? b.length + c.length + 2 : d ? c.length + e.length : c.length - a.A[b].length;
        8E3 < a.o + a.l + f && (ng(a),
        f = b.length + c.length + 2);
        a.A[b] = d && null != a.A[b] ? a.A[b] + ("" + e + c) : c;
        a.l += f;
        6E3 <= a.o + a.l && ng(a)
    }
      , ng = function(a) {
        if (a.h && a.V) {
            try {
                if (a.l) {
                    var b = a.A;
                    a.M++;
                    var c = vg(a, b);
                    b = !1;
                    try {
                        b = a.Y && a.g.navigator && a.g.navigator.sendBeacon(c, null)
                    } catch (d) {
                        a.Y = !1
                    }
                    b || Se(a.g, c);
                    qg(a);
                    a.M === a.K && a.C()
                }
            } catch (d) {
                (new Hf).Ha(358, d)
            }
            a.A = {};
            a.l = 0;
            a.events.length = 0;
            a.g.clearTimeout(a.D);
            a.D = 0
        }
    }
      , vg = function(a, b) {
        var c = a.aa + "//" + a.N + a.$ + a.ma
          , d = {};
        c = lg(c, a.w, d);
        c = lg(c, b, d);
        a.g.google_timing_params && (c = lg(c, a.g.google_timing_params, d),
        a.g.google_timing_params = void 0);
        z(a.G, function(e) {
            var f = ba(e);
            e = f.next().value;
            f = f.next().value;
            var g = {};
            c = lg(c, (g[e] = f,
            g))
        });
        a.G.length = 0;
        return c
    }
      , qg = function(a) {
        mg(a, "puid", (a.M + 1).toString(36) + "~" + v().toString(36))
    }
      , pg = function(a, b) {
        var c = "met." + b.type
          , d = "number" === typeof b.value ? Math.round(b.value).toString(36) : b.value
          , e = Math.round(b.duration);
        b = "" + b.label + (null != b.slotId ? "_" + b.slotId : "") + ("." + d) + (0 < e ? "_" + e.toString(36) : "");
        ug(a, c, b, !0, "~")
    };
    sg.prototype.H = function(a) {
        this.h && this.M < this.K && (Cf.prototype.H.call(this, a),
        pg(this, a))
    }
    ;
    sg.prototype.F = function() {
        this.V = !0;
        ng(this)
    }
    ;
    sg.prototype.C = function() {
        Cf.prototype.C.call(this);
        this.g.clearTimeout(this.D);
        this.l = this.D = 0;
        this.A = {};
        Cb(this.J);
        Cb(this.w);
        Pe(this.g, "load", this.O);
        Pe(this.g, "unload", this.Z);
        Pe(this.g, "pagehide", this.P)
    }
    ;
    var og = function(a, b) {
        mg(a, "uet", b);
        z(a.ra, function(c) {
            try {
                c()
            } catch (d) {}
        });
        Qe(a.g);
        ng(a);
        tg(a)
    };
    var J = function() {
        this.g = new sg(1,"https:","csi.gstatic.com","/csi?v=2&s=","ima",void 0,!0);
        var a = Of();
        null != a && mg(this.g, "c", a)
    };
    J.prototype.F = function() {
        // disable to access `csi.gstatic.com`
        //this.g.F()
    }
    ;
    var wg = function(a, b, c) {
        if (null != c) {
            a = a.g;
            var d = b + "=" + c;
            a.J[d] || (ug(a, b, c, !1),
            1E3 > d.length && (a.J[d] = !0))
        }
    }
      , xg = function(a, b) {
        a = a.g;
        var c = uf() - 0;
        a.h && a.H(new yf(b,4,c,0,void 0))
    };
    Da(J);
    var yg = function(a, b) {
        this.h = a;
        this.l = b
    };
    p(yg, hg);
    yg.prototype.g = function(a, b) {
        hg.prototype.g.call(this, a, b);
        var c = [];
        a = [];
        for (var d = ba(this.h), e = d.next(); !e.done; e = d.next())
            e = e.value,
            b.get(e) ? c.push(e) : a.push(e);
        b = c.map(String).join(",");
        a = a.map(String).join(",");
        wg(J.B(), "sei", b);
        wg(J.B(), "nsei", a);
        wg(J.B(), "bi", this.l)
    }
    ;
    var zg = function() {
        Wf.apply(this, arguments)
    };
    p(zg, Wf);
    var Xf = function(a, b) {
        var c = J.B();
        wg(c, "eee", a);
        wg(c, "bi", b)
    };
    Da(zg);
    function Ag() {
        return Bg.split(",").map(function(a) {
            return parseInt(a, 10)
        }).filter(function(a) {
            return !isNaN(a)
        })
    }
    ;var Eg = new bg;
    I({
        id: 418572103,
        L: 0
    });
    I({
        id: 420706097,
        L: 10
    });
    I({
        id: 420706098,
        L: 10
    });
    I({
        id: 21061786,
        L: 10
    });
    I({
        id: 21061817,
        L: 10
    });
    I({
        id: 21061824,
        L: 50
    });
    I({
        id: 21061888,
        L: 10
    });
    I({
        id: 21061893,
        L: 10
    });
    I({
        id: 21062100,
        L: 0
    });
    I({
        id: 21063062,
        L: 0
    });
    I({
        id: 420706109,
        L: 10
    });
    I({
        id: 420706110,
        L: 10
    });
    I({
        id: 21062347,
        L: 0
    });
    I({
        id: 21063070,
        L: 0
    });
    I({
        id: 21063072,
        L: 0
    });
    I({
        id: 21063100,
        L: 0
    });
    I({
        id: 420706116,
        L: 0
    });
    I({
        id: 420706105,
        L: 10
    });
    I({
        id: 420706106,
        L: 10
    });
    I({
        id: 75259402,
        L: 10
    });
    I({
        id: 75259403,
        L: 10
    });
    I({
        id: 21064018,
        L: 0
    });
    I({
        id: 21064020,
        L: 0
    });
    I({
        id: 21064022,
        L: 0
    });
    I({
        id: 21064024,
        L: 0
    });
    I({
        id: 21064075,
        L: 0
    });
    I({
        id: 21064201,
        L: 50
    });
    var Fg = I({
        id: 210640812,
        L: 10
    });
    I({
        id: 420706142,
        L: 0
    });
    I({
        id: 21064347,
        L: 0
    });
    I({
        id: 21064362,
        L: 0
    });
    I({
        id: 324123050,
        L: 50
    });
    I({
        id: 324123051,
        L: 50
    });
    I({
        id: 370204079,
        L: 10,
        xc: Eg
    });
    I({
        id: 72811302,
        L: 0
    });
    I({
        id: 72811303,
        L: 0
    });
    I({
        id: 72811304,
        L: 0
    });
    I({
        id: 72811305,
        L: 0
    });
    I({
        id: 72811306,
        L: 0
    });
    I({
        id: 72811307,
        L: 0
    });
    I({
        id: 21064565,
        L: 0
    });
    I({
        id: 668123728,
        L: 20,
        xc: Eg
    });
    I({
        id: 21064567,
        L: 0
    });
    I({
        id: 21064572,
        L: 10
    });
    I({
        id: 21064573,
        L: 10
    });
    I({
        id: 40819804,
        L: 10
    });
    I({
        id: 40819805,
        L: 10
    });
    I({
        id: 504733020,
        L: 10
    });
    var Gg = I({
        id: 50433021,
        L: 10
    });
    I({
        id: 418572006,
        L: 10
    });
    if ("undefined" === typeof window.v8_flag_map) {
        var Zf = zg.B();
        null === Zf.g && $f();
        var Bg = Zf.g, Hg;
        null === Zf.g && $f();
        Hg = Zf.h;
        if (Bg) {
            var Ig = new yg(Ag(),Hg);
            fg(Ig)
        }
    }
    ;dg.reset();
    fg(new gg);
    q.console && "function" === typeof q.console.log && Ma(q.console.log, q.console);
    var Jg = function(a) {
        for (var b = [], c = a = F(a.ownerDocument); c != a.top; c = c.parent)
            if (c.frameElement)
                b.push(c.frameElement);
            else
                break;
        return b
    };
    var Kg = !Mc || 9 <= Number(cd)
      , Lg = Mc && !bd("9")
      , Mg = function() {
        if (!q.addEventListener || !Object.defineProperty)
            return !1;
        var a = !1
          , b = Object.defineProperty({}, "passive", {
            get: function() {
                a = !0
            }
        });
        try {
            q.addEventListener("test", Ca, b),
            q.removeEventListener("test", Ca, b)
        } catch (c) {}
        return a
    }();
    var K = function() {
        this.M = this.M;
        this.H = this.H
    };
    K.prototype.M = !1;
    K.prototype.fb = function() {
        return this.M
    }
    ;
    K.prototype.W = function() {
        this.M || (this.M = !0,
        this.R())
    }
    ;
    var Pg = function(a, b) {
        Ng(a, Na(Og, b))
    }
      , Ng = function(a, b) {
        a.M ? b() : (a.H || (a.H = []),
        a.H.push(b))
    };
    K.prototype.R = function() {
        if (this.H)
            for (; this.H.length; )
                this.H.shift()()
    }
    ;
    var Og = function(a) {
        a && "function" == typeof a.W && a.W()
    };
    var Qg = function(a, b) {
        this.type = a;
        this.g = this.target = b;
        this.Hd = !0
    };
    Qg.prototype.l = function() {
        this.Hd = !1
    }
    ;
    var Sg = function(a, b) {
        Qg.call(this, a ? a.type : "");
        this.relatedTarget = this.g = this.target = null;
        this.button = this.screenY = this.screenX = this.clientY = this.clientX = 0;
        this.key = "";
        this.metaKey = this.shiftKey = this.altKey = this.ctrlKey = !1;
        this.state = null;
        this.pointerId = 0;
        this.pointerType = "";
        this.h = null;
        if (a) {
            var c = this.type = a.type
              , d = a.changedTouches && a.changedTouches.length ? a.changedTouches[0] : null;
            this.target = a.target || a.srcElement;
            this.g = b;
            (b = a.relatedTarget) ? Oc && (Ic(b, "nodeName") || (b = null)) : "mouseover" == c ? b = a.fromElement : "mouseout" == c && (b = a.toElement);
            this.relatedTarget = b;
            d ? (this.clientX = void 0 !== d.clientX ? d.clientX : d.pageX,
            this.clientY = void 0 !== d.clientY ? d.clientY : d.pageY,
            this.screenX = d.screenX || 0,
            this.screenY = d.screenY || 0) : (this.clientX = void 0 !== a.clientX ? a.clientX : a.pageX,
            this.clientY = void 0 !== a.clientY ? a.clientY : a.pageY,
            this.screenX = a.screenX || 0,
            this.screenY = a.screenY || 0);
            this.button = a.button;
            this.key = a.key || "";
            this.ctrlKey = a.ctrlKey;
            this.altKey = a.altKey;
            this.shiftKey = a.shiftKey;
            this.metaKey = a.metaKey;
            this.pointerId = a.pointerId || 0;
            this.pointerType = "string" === typeof a.pointerType ? a.pointerType : Rg[a.pointerType] || "";
            this.state = a.state;
            this.h = a;
            a.defaultPrevented && this.l()
        }
    };
    y(Sg, Qg);
    var Rg = {
        2: "touch",
        3: "pen",
        4: "mouse"
    };
    Sg.prototype.l = function() {
        Sg.wa.l.call(this);
        var a = this.h;
        if (a.preventDefault)
            a.preventDefault();
        else if (a.returnValue = !1,
        Lg)
            try {
                if (a.ctrlKey || 112 <= a.keyCode && 123 >= a.keyCode)
                    a.keyCode = -1
            } catch (b) {}
    }
    ;
    var Tg = "closure_listenable_" + (1E6 * Math.random() | 0)
      , Ug = function(a) {
        return !(!a || !a[Tg])
    }
      , Vg = 0;
    var Wg = function(a, b, c, d, e) {
        this.listener = a;
        this.g = null;
        this.src = b;
        this.type = c;
        this.capture = !!d;
        this.Qb = e;
        this.key = ++Vg;
        this.ib = this.Lb = !1
    }
      , Xg = function(a) {
        a.ib = !0;
        a.listener = null;
        a.g = null;
        a.src = null;
        a.Qb = null
    };
    var Yg = function(a) {
        this.src = a;
        this.g = {};
        this.h = 0
    };
    Yg.prototype.add = function(a, b, c, d, e) {
        var f = a.toString();
        a = this.g[f];
        a || (a = this.g[f] = [],
        this.h++);
        var g = Zg(a, b, d, e);
        -1 < g ? (b = a[g],
        c || (b.Lb = !1)) : (b = new Wg(b,this.src,f,!!d,e),
        b.Lb = c,
        a.push(b));
        return b
    }
    ;
    var $g = function(a, b) {
        var c = b.type;
        c in a.g && $a(a.g[c], b) && (Xg(b),
        0 == a.g[c].length && (delete a.g[c],
        a.h--))
    }
      , ah = function(a, b, c, d, e) {
        a = a.g[b.toString()];
        b = -1;
        a && (b = Zg(a, c, d, e));
        return -1 < b ? a[b] : null
    }
      , Zg = function(a, b, c, d) {
        for (var e = 0; e < a.length; ++e) {
            var f = a[e];
            if (!f.ib && f.listener == b && f.capture == !!c && f.Qb == d)
                return e
        }
        return -1
    };
    var bh = "closure_lm_" + (1E6 * Math.random() | 0)
      , ch = {}
      , dh = 0
      , fh = function(a, b, c, d, e) {
        if (d && d.once)
            return eh(a, b, c, d, e);
        if (Fa(b)) {
            for (var f = 0; f < b.length; f++)
                fh(a, b[f], c, d, e);
            return null
        }
        c = gh(c);
        return Ug(a) ? a.T(b, c, Ha(d) ? !!d.capture : !!d, e) : hh(a, b, c, !1, d, e)
    }
      , hh = function(a, b, c, d, e, f) {
        if (!b)
            throw Error("Invalid event type");
        var g = Ha(e) ? !!e.capture : !!e
          , h = ih(a);
        h || (a[bh] = h = new Yg(a));
        c = h.add(b, c, d, g, f);
        if (c.g)
            return c;
        d = jh();
        c.g = d;
        d.src = a;
        d.listener = c;
        if (a.addEventListener)
            Mg || (e = g),
            void 0 === e && (e = !1),
            a.addEventListener(b.toString(), d, e);
        else if (a.attachEvent)
            a.attachEvent(kh(b.toString()), d);
        else if (a.addListener && a.removeListener)
            a.addListener(d);
        else
            throw Error("addEventListener and attachEvent are unavailable.");
        dh++;
        return c
    }
      , jh = function() {
        var a = lh
          , b = Kg ? function(c) {
            return a.call(b.src, b.listener, c)
        }
        : function(c) {
            c = a.call(b.src, b.listener, c);
            if (!c)
                return c
        }
        ;
        return b
    }
      , eh = function(a, b, c, d, e) {
        if (Fa(b)) {
            for (var f = 0; f < b.length; f++)
                eh(a, b[f], c, d, e);
            return null
        }
        c = gh(c);
        return Ug(a) ? a.l.add(String(b), c, !0, Ha(d) ? !!d.capture : !!d, e) : hh(a, b, c, !0, d, e)
    }
      , mh = function(a, b, c, d, e) {
        if (Fa(b))
            for (var f = 0; f < b.length; f++)
                mh(a, b[f], c, d, e);
        else
            d = Ha(d) ? !!d.capture : !!d,
            c = gh(c),
            Ug(a) ? a.Da(b, c, d, e) : a && (a = ih(a)) && (b = ah(a, b, c, d, e)) && nh(b)
    }
      , nh = function(a) {
        if ("number" !== typeof a && a && !a.ib) {
            var b = a.src;
            if (Ug(b))
                $g(b.l, a);
            else {
                var c = a.type
                  , d = a.g;
                b.removeEventListener ? b.removeEventListener(c, d, a.capture) : b.detachEvent ? b.detachEvent(kh(c), d) : b.addListener && b.removeListener && b.removeListener(d);
                dh--;
                (c = ih(b)) ? ($g(c, a),
                0 == c.h && (c.src = null,
                b[bh] = null)) : Xg(a)
            }
        }
    }
      , kh = function(a) {
        return a in ch ? ch[a] : ch[a] = "on" + a
    }
      , ph = function(a, b, c, d) {
        var e = !0;
        if (a = ih(a))
            if (b = a.g[b.toString()])
                for (b = b.concat(),
                a = 0; a < b.length; a++) {
                    var f = b[a];
                    f && f.capture == c && !f.ib && (f = oh(f, d),
                    e = e && !1 !== f)
                }
        return e
    }
      , oh = function(a, b) {
        var c = a.listener
          , d = a.Qb || a.src;
        a.Lb && nh(a);
        return c.call(d, b)
    }
      , lh = function(a, b) {
        if (a.ib)
            return !0;
        if (!Kg) {
            var c = b || Ba("window.event");
            b = new Sg(c,this);
            var d = !0;
            if (!(0 > c.keyCode || void 0 != c.returnValue)) {
                a: {
                    var e = !1;
                    if (0 == c.keyCode)
                        try {
                            c.keyCode = -1;
                            break a
                        } catch (g) {
                            e = !0
                        }
                    if (e || void 0 == c.returnValue)
                        c.returnValue = !0
                }
                c = [];
                for (e = b.g; e; e = e.parentNode)
                    c.push(e);
                a = a.type;
                for (e = c.length - 1; 0 <= e; e--) {
                    b.g = c[e];
                    var f = ph(c[e], a, !0, b);
                    d = d && f
                }
                for (e = 0; e < c.length; e++)
                    b.g = c[e],
                    f = ph(c[e], a, !1, b),
                    d = d && f
            }
            return d
        }
        return oh(a, new Sg(b,this))
    }
      , ih = function(a) {
        a = a[bh];
        return a instanceof Yg ? a : null
    }
      , qh = "__closure_events_fn_" + (1E9 * Math.random() >>> 0)
      , gh = function(a) {
        if (t(a))
            return a;
        a[qh] || (a[qh] = function(b) {
            return a.handleEvent(b)
        }
        );
        return a[qh]
    };
    var L = function() {
        K.call(this);
        this.l = new Yg(this);
        this.rb = this;
        this.ma = null
    };
    y(L, K);
    L.prototype[Tg] = !0;
    m = L.prototype;
    m.addEventListener = function(a, b, c, d) {
        fh(this, a, b, c, d)
    }
    ;
    m.removeEventListener = function(a, b, c, d) {
        mh(this, a, b, c, d)
    }
    ;
    m.dispatchEvent = function(a) {
        var b, c = this.ma;
        if (c)
            for (b = []; c; c = c.ma)
                b.push(c);
        c = this.rb;
        var d = a.type || a;
        if ("string" === typeof a)
            a = new Qg(a,c);
        else if (a instanceof Qg)
            a.target = a.target || c;
        else {
            var e = a;
            a = new Qg(d,c);
            Fb(a, e)
        }
        e = !0;
        if (b)
            for (var f = b.length - 1; 0 <= f; f--) {
                var g = a.g = b[f];
                e = rh(g, d, !0, a) && e
            }
        g = a.g = c;
        e = rh(g, d, !0, a) && e;
        e = rh(g, d, !1, a) && e;
        if (b)
            for (f = 0; f < b.length; f++)
                g = a.g = b[f],
                e = rh(g, d, !1, a) && e;
        return e
    }
    ;
    m.R = function() {
        L.wa.R.call(this);
        if (this.l) {
            var a = this.l, b = 0, c;
            for (c in a.g) {
                for (var d = a.g[c], e = 0; e < d.length; e++)
                    ++b,
                    Xg(d[e]);
                delete a.g[c];
                a.h--
            }
        }
        this.ma = null
    }
    ;
    m.T = function(a, b, c, d) {
        return this.l.add(String(a), b, !1, c, d)
    }
    ;
    m.Da = function(a, b, c, d) {
        var e = this.l;
        a = String(a).toString();
        if (a in e.g) {
            var f = e.g[a];
            b = Zg(f, b, c, d);
            -1 < b && (Xg(f[b]),
            Array.prototype.splice.call(f, b, 1),
            0 == f.length && (delete e.g[a],
            e.h--))
        }
    }
    ;
    var rh = function(a, b, c, d) {
        b = a.l.g[String(b)];
        if (!b)
            return !0;
        b = b.concat();
        for (var e = !0, f = 0; f < b.length; ++f) {
            var g = b[f];
            if (g && !g.ib && g.capture == c) {
                var h = g.listener
                  , k = g.Qb || g.src;
                g.Lb && $g(a.l, g);
                e = !1 !== h.call(k, d) && e
            }
        }
        return e && 0 != d.Hd
    };
    var sh = function(a, b) {
        L.call(this);
        this.h = a || 1;
        this.g = b || q;
        this.o = Ma(this.kg, this);
        this.w = v()
    };
    y(sh, L);
    m = sh.prototype;
    m.yb = !1;
    m.xa = null;
    m.setInterval = function(a) {
        this.h = a;
        this.xa && this.yb ? (this.stop(),
        this.start()) : this.xa && this.stop()
    }
    ;
    m.kg = function() {
        if (this.yb) {
            var a = v() - this.w;
            0 < a && a < .8 * this.h ? this.xa = this.g.setTimeout(this.o, this.h - a) : (this.xa && (this.g.clearTimeout(this.xa),
            this.xa = null),
            this.dispatchEvent("tick"),
            this.yb && (this.stop(),
            this.start()))
        }
    }
    ;
    m.start = function() {
        this.yb = !0;
        this.xa || (this.xa = this.g.setTimeout(this.o, this.h),
        this.w = v())
    }
    ;
    m.stop = function() {
        this.yb = !1;
        this.xa && (this.g.clearTimeout(this.xa),
        this.xa = null)
    }
    ;
    m.R = function() {
        sh.wa.R.call(this);
        this.stop();
        delete this.g
    }
    ;
    var th = function(a, b, c) {
        if (t(a))
            c && (a = Ma(a, c));
        else if (a && "function" == typeof a.handleEvent)
            a = Ma(a.handleEvent, a);
        else
            throw Error("Invalid listener argument");
        return 2147483647 < Number(b) ? -1 : q.setTimeout(a, b || 0)
    };
    var uh = function() {
        return Math.round(v() / 1E3)
    }
      , vh = function(a) {
        var b = window.performance && window.performance.timing && window.performance.timing.domLoading && 0 < window.performance.timing.domLoading ? Math.round(window.performance.timing.domLoading / 1E3) : null;
        return null != b ? b : null != a ? a : uh()
    };
    var wh = function() {
        this.h = -1
    };
    var xh = function() {
        this.g = {};
        return this
    };
    xh.prototype.set = function(a, b) {
        this.g[a] = b
    }
    ;
    var yh = function(a, b) {
        a.g.eb = Db(a.g, "eb", 0) | b
    };
    xh.prototype.get = function(a) {
        return Db(this.g, a, null)
    }
    ;
    var zh = null
      , Ah = function() {
        this.g = {};
        this.h = 0
    }
      , Bh = function(a, b) {
        this.A = a;
        this.o = !0;
        this.h = b
    };
    Bh.prototype.getName = function() {
        return this.A
    }
    ;
    Bh.prototype.g = function() {
        return this.h
    }
    ;
    Bh.prototype.l = function() {
        return String(this.h)
    }
    ;
    var Ch = function(a, b) {
        Bh.call(this, String(a), b);
        this.w = a;
        this.h = !!b
    };
    y(Ch, Bh);
    Ch.prototype.l = function() {
        return this.h ? "1" : "0"
    }
    ;
    var Dh = function(a, b) {
        Bh.call(this, a, b)
    };
    y(Dh, Bh);
    Dh.prototype.l = function() {
        return this.h ? Math.round(this.h.top) + "." + Math.round(this.h.left) + "." + (Math.round(this.h.top) + Math.round(this.h.height)) + "." + (Math.round(this.h.left) + Math.round(this.h.width)) : ""
    }
    ;
    var Eh = function(a) {
        if (a.match(/^-?[0-9]+\.-?[0-9]+\.-?[0-9]+\.-?[0-9]+$/)) {
            a = a.split(".");
            var b = Number(a[0])
              , c = Number(a[1]);
            return new Dh("",new Ce(c,b,Number(a[3]) - c,Number(a[2]) - b))
        }
        return new Dh("",new Ce(0,0,0,0))
    }
      , Fh = function() {
        zh || (zh = new Ah);
        return zh
    }
      , Gh = function(a, b) {
        a.g[b.getName()] = b
    };
    var Hh = function(a) {
        var b = new Ce(-Number.MAX_VALUE / 2,-Number.MAX_VALUE / 2,Number.MAX_VALUE,Number.MAX_VALUE)
          , c = new Ce(0,0,0,0);
        if (!a || 0 == a.length)
            return c;
        for (var d = 0; d < a.length; d++) {
            a: {
                var e = b;
                var f = a[d]
                  , g = Math.max(e.left, f.left)
                  , h = Math.min(e.left + e.width, f.left + f.width);
                if (g <= h) {
                    var k = Math.max(e.top, f.top);
                    f = Math.min(e.top + e.height, f.top + f.height);
                    if (k <= f) {
                        e.left = g;
                        e.top = k;
                        e.width = h - g;
                        e.height = f - k;
                        e = !0;
                        break a
                    }
                }
                e = !1
            }
            if (!e)
                return c
        }
        return b
    }
      , Ih = function(a, b) {
        var c = a.getBoundingClientRect();
        a = Ke(a, b);
        return new Ce(Math.round(a.x),Math.round(a.y),Math.round(c.right - c.left),Math.round(c.bottom - c.top))
    }
      , Jh = function(a, b, c) {
        if (b && c) {
            a: {
                var d = Math.max(b.left, c.left);
                var e = Math.min(b.left + b.width, c.left + c.width);
                if (d <= e) {
                    var f = Math.max(b.top, c.top)
                      , g = Math.min(b.top + b.height, c.top + c.height);
                    if (f <= g) {
                        d = new Ce(d,f,e - d,g - f);
                        break a
                    }
                }
                d = null
            }
            e = d ? d.height * d.width : 0;
            f = d ? b.height * b.width : 0;
            d = d && f ? Math.round(e / f * 100) : 0;
            Gh(a, new Bh("vp",d));
            d && 0 < d ? (e = De(b),
            f = De(c),
            e = e.top >= f.top && e.top < f.bottom) : e = !1;
            Gh(a, new Ch(512,e));
            d && 0 < d ? (e = De(b),
            f = De(c),
            e = e.bottom <= f.bottom && e.bottom > f.top) : e = !1;
            Gh(a, new Ch(1024,e));
            d && 0 < d ? (e = De(b),
            f = De(c),
            e = e.left >= f.left && e.left < f.right) : e = !1;
            Gh(a, new Ch(2048,e));
            d && 0 < d ? (b = De(b),
            c = De(c),
            c = b.right <= c.right && b.right > c.left) : c = !1;
            Gh(a, new Ch(4096,c))
        }
    };
    var Kh = function(a, b) {
        var c = 0;
        xb(F(), "ima", "video", "client", "tagged") && (c = 1);
        var d = null;
        a && (d = a());
        if (d) {
            a = Fh();
            a.g = {};
            var e = new Ch(32,!0);
            e.o = !1;
            Gh(a, e);
            e = F().document;
            e = e.visibilityState || e.webkitVisibilityState || e.mozVisibilityState || e.msVisibilityState || "";
            Gh(a, new Ch(64,"hidden" != e.toLowerCase().substring(e.length - 6) ? !0 : !1));
            try {
                var f = F().top;
                try {
                    var g = !!f.location.href || "" === f.location.href
                } catch (n) {
                    g = !1
                }
                if (g) {
                    var h = Jg(d);
                    var k = h && 0 != h.length ? "1" : "0"
                } else
                    k = "2"
            } catch (n) {
                k = "2"
            }
            Gh(a, new Ch(256,"2" == k));
            Gh(a, new Ch(128,"1" == k));
            h = g = F().top;
            "2" == k && (h = F());
            f = Ih(d, h);
            Gh(a, new Dh("er",f));
            try {
                var l = h.document && !h.document.body ? null : Yd(h || window)
            } catch (n) {
                l = null
            }
            l ? (h = Zd(Ud(h.document).g),
            Gh(a, new Ch(16384,!!h)),
            l = h ? new Ce(h.x,h.y,l.width,l.height) : null) : l = null;
            Gh(a, new Dh("vi",l));
            if (l && "1" == k) {
                k = Jg(d);
                d = [];
                for (h = 0; h < k.length; h++)
                    (e = Ih(k[h], g)) && d.push(e);
                d.push(l);
                l = Hh(d)
            }
            Jh(a, f, l);
            a.h && (k = uh() - a.h,
            Gh(a, new Bh("ts",k)));
            a.h = uh()
        } else
            a = Fh(),
            a.g = {},
            a.h = uh(),
            Gh(a, new Ch(32,!1));
        this.l = a;
        this.g = new xh;
        this.g.set("ve", 4);
        c && yh(this.g, 1);
        xb(F(), "ima", "video", "client", "crossdomainTag") && yh(this.g, 4);
        xb(F(), "ima", "video", "client", "sdkTag") && yh(this.g, 8);
        xb(F(), "ima", "video", "client", "jsTag") && yh(this.g, 2);
        b && Db(b, "fullscreen", !1) && yh(this.g, 16);
        this.h = b = null;
        if (c && (c = xb(F(), "ima", "video", "client"),
        c.getEData)) {
            this.h = c.getEData();
            if (c = xb(F(), "ima", "video", "client", "getLastSnapshotFromTop"))
                if (a = c())
                    this.h.extendWithDataFromTopIframe(a.tagstamp, a.playstamp, a.lactstamp),
                    c = this.l,
                    b = a.er,
                    a = a.vi,
                    b && a && (b = Eh(b).g(),
                    a = Eh(a).g(),
                    k = null,
                    Db(c.g, "er", null) && (k = Db(c.g, "er", null).g(),
                    k.top += b.top,
                    k.left += b.left,
                    Gh(c, new Dh("er",k))),
                    Db(c.g, "vi", null) && (l = Db(c.g, "vi", null).g(),
                    l.top += b.top,
                    l.left += b.left,
                    d = [],
                    d.push(l),
                    d.push(b),
                    d.push(a),
                    b = Hh(d),
                    Jh(c, k, b),
                    Gh(c, new Dh("vi",a))));
            a: {
                if (this.h) {
                    if (this.h.getTagLoadTimestamp) {
                        b = this.h.getTagLoadTimestamp();
                        break a
                    }
                    if (this.h.getTimeSinceTagLoadSeconds) {
                        b = this.h.getTimeSinceTagLoadSeconds();
                        break a
                    }
                }
                b = null
            }
        }
        this.g.set("td", uh() - vh(b))
    };
    var Lh = new sh(200)
      , Mh = function(a, b) {
        try {
            var c = new Kh(a,b);
            a = [];
            var d = Number(c.g.get("eb"))
              , e = c.g.g;
            "eb"in e && delete e.eb;
            var f, g = c.g;
            e = [];
            for (var h in g.g)
                e.push(h + g.g[h]);
            (f = e.join("_")) && a.push(f);
            if (c.h) {
                var k = c.h.serialize();
                k && a.push(k)
            }
            var l, n = c.l;
            f = d;
            g = [];
            f || (f = 0);
            for (var u in n.g) {
                var x = n.g[u];
                if (x instanceof Ch)
                    x.g() && (f |= x.w);
                else {
                    var w, C = n.g[u];
                    (w = C.o ? C.l() : "") && g.push(u + w)
                }
            }
            g.push("eb" + String(f));
            (l = g.join("_")) && a.push(l);
            c.g.set("eb", d);
            return a.join("_")
        } catch (G) {
            return "tle;" + yc(G.name, 12) + ";" + yc(G.message, 40)
        }
    }
      , Nh = function(a, b) {
        fh(Lh, "tick", function() {
            var c = Mh(b);
            a(c)
        });
        Lh.start();
        Lh.dispatchEvent("tick")
    };
    var Oh;
    Oh = ["av.key", "js", "unreleased"].slice(-1)[0];
    var Ph = [0, 2, 1]
      , Qh = null;
    document.addEventListener && document.addEventListener("mousedown", function(a) {
        Qh = a
    }, !0);
    window.mb = function(a) {
        if (a) {
            var b;
            if (b = window.event || Qh) {
                var c;
                (c = b.which ? 1 << Ph[b.which - 1] : b.button) && b.shiftKey && (c |= 8);
                c && b.altKey && (c |= 16);
                c && b.ctrlKey && (c |= 32);
                b = c
            } else
                b = null;
            if (c = b)
                if (window.css)
                    window.css(a.id, "mb", c, void 0, void 0);
                else if (a) {
                    b = a.href;
                    var d = b.indexOf("&mb=");
                    if (0 > d)
                        c = b + "&mb=" + c;
                    else {
                        d += 4;
                        var e = b.indexOf("&", d);
                        c = 0 <= e ? b.substring(0, d) + c + b.substring(e) : b.substring(0, d) + c
                    }
                    a.href = 2E3 < c.length ? b : c
                }
        }
    }
    ;
    var Rh = function(a, b, c) {
        try {
            a && (b = b.top);
            var d = void 0;
            var e = b;
            c = void 0 === c ? !1 : c;
            a && null !== e && e != e.top && (e = e.top);
            try {
                d = (void 0 === c ? 0 : c) ? (new E(e.innerWidth,e.innerHeight)).round() : Yd(e || window).round()
            } catch (k) {
                d = new E(-12245933,-12245933)
            }
            a = d;
            var f = Zd(Ud(b.document).g);
            if (-12245933 == a.width) {
                var g = a.width;
                var h = new H(g,g,g,g)
            } else
                h = new H(f.y,f.x + a.width,f.y + a.height,f.x);
            return h
        } catch (k) {
            return new H(-12245933,-12245933,-12245933,-12245933)
        }
    };
    var Sh = function(a) {
        var b = {};
        z(a, function(c) {
            var d = c.event
              , e = b[d];
            b.hasOwnProperty(d) ? null !== e && (c.h(e) || (b[d] = null)) : b[d] = c
        });
        ab(a, function(c) {
            return null === b[c.event]
        })
    };
    var Th = {
        NONE: 0,
        zg: 1
    };
    var Uh = function() {
        this.X = 0;
        this.g = !1;
        this.h = -1;
        this.Va = !1;
        this.ha = 0
    };
    Uh.prototype.isVisible = function() {
        return this.Va ? .3 <= this.X : .5 <= this.X
    }
    ;
    var M = {
        yg: 0,
        Dg: 1
    }
      , Vh = {
        370204018: 0,
        370204019: 1,
        370204052: 2,
        370204026: 0,
        370204027: 1,
        370204053: 2
    }
      , Wh = {
        668123728: 0,
        668123729: 1
    }
      , Xh = {
        44710341: 0,
        44710342: 1
    }
      , Yh = {
        NONE: 0,
        Pg: 1,
        Gg: 2
    }
      , Zh = {
        480596784: 0,
        480596785: 1,
        21063355: 2
    }
      , $h = {
        42530094: 0,
        42530095: 1
    }
      , ai = {
        42530173: 0,
        42530174: 1
    }
      , bi = {
        370204078: 0,
        370204079: 1,
        370204080: 0,
        370204081: 1
    }
      , ci = {
        44710407: 0,
        44710408: 1
    };
    var di = function() {
        this.h = null;
        this.o = !1;
        this.w = null
    }
      , O = function(a) {
        a.o = !0;
        return a
    }
      , ei = function(a, b) {
        a.w = void 0 === b ? null : b
    }
      , fi = function(a, b) {
        a.w && z(b, function(c) {
            c = a.w[c];
            void 0 !== c && a.l(c)
        })
    };
    di.prototype.g = function() {
        return this.h
    }
    ;
    var gi = function(a) {
        di.call(this);
        this.A = a
    };
    p(gi, di);
    gi.prototype.l = function(a) {
        var b;
        if (!(b = null !== this.h)) {
            a: {
                b = this.A;
                for (c in b)
                    if (b[c] == a) {
                        var c = !0;
                        break a
                    }
                c = !1
            }
            b = !c
        }
        b || (this.h = a)
    }
    ;
    var hi = function() {
        di.call(this)
    };
    p(hi, di);
    hi.prototype.l = function(a) {
        null === this.h && "string" === typeof a && (this.h = a)
    }
    ;
    var ii = function() {
        this.g = {};
        this.l = !0;
        this.h = {}
    };
    ii.prototype.enable = function() {
        this.l = !0
    }
    ;
    ii.prototype.isEnabled = function() {
        return this.l
    }
    ;
    ii.prototype.reset = function() {
        this.g = {};
        this.l = !0;
        this.h = {}
    }
    ;
    var P = function(a, b, c) {
        a.g[b] || (a.g[b] = new gi(c));
        return a.g[b]
    }
      , ji = function(a, b, c) {
        (a = a.g[b]) && a.l(c)
    }
      , ki = function(a, b) {
        if (yb(a.h, b))
            return a.h[b];
        if (a = a.g[b])
            return a.g()
    }
      , li = function(a) {
        var b = {}
          , c = pb(a.g, function(d) {
            return d.o
        });
        ob(c, function(d, e) {
            d = void 0 !== a.h[e] ? String(a.h[e]) : d.o && null !== d.h ? String(d.h) : "";
            0 < d.length && (b[e] = d)
        }, a);
        return b
    }
      , mi = function(a) {
        a = li(a);
        var b = [];
        ob(a, function(c, d) {
            d in Object.prototype || "undefined" != typeof c && b.push([d, ":", c].join(""))
        });
        return b
    }
      , ni = function(a) {
        var b = Q.B().I;
        b.l && z(vb(b.g), function(c) {
            return fi(c, a)
        })
    };
    var oi = !Mc && !pc();
    var pi = function() {
        this.g = this.Pa = null
    };
    var qi = function() {};
    qi.prototype.now = function() {
        return 0
    }
    ;
    qi.prototype.h = function() {
        return 0
    }
    ;
    qi.prototype.l = function() {
        return 0
    }
    ;
    qi.prototype.g = function() {
        return 0
    }
    ;
    var si = function() {
        if (!ri())
            throw Error();
    };
    p(si, qi);
    var ri = function() {
        return !(!D || !D.performance)
    };
    si.prototype.now = function() {
        return ri() && D.performance.now ? D.performance.now() : qi.prototype.now.call(this)
    }
    ;
    si.prototype.h = function() {
        return ri() && D.performance.memory ? D.performance.memory.totalJSHeapSize || 0 : qi.prototype.h.call(this)
    }
    ;
    si.prototype.l = function() {
        return ri() && D.performance.memory ? D.performance.memory.usedJSHeapSize || 0 : qi.prototype.l.call(this)
    }
    ;
    si.prototype.g = function() {
        return ri() && D.performance.memory ? D.performance.memory.jsHeapSizeLimit || 0 : qi.prototype.g.call(this)
    }
    ;
    var ti = function() {};
    ti.prototype.isVisible = function() {
        return 1 === ig(Ed)
    }
    ;
    var ui = function(a, b) {
        this.g = a;
        this.depth = b
    }
      , wi = function(a) {
        a = a || bf();
        var b = Math.max(a.length - 1, 0)
          , c = ef(a);
        a = c.g;
        var d = c.h
          , e = c.l
          , f = [];
        c = function(h, k) {
            return null == h ? k : h
        }
        ;
        e && f.push(new ui([e.url, e.wc ? 2 : 0],c(e.depth, 1)));
        d && d != e && f.push(new ui([d.url, 2],0));
        a.url && a != e && f.push(new ui([a.url, 0],c(a.depth, b)));
        var g = Sa(f, function(h, k) {
            return f.slice(0, f.length - k)
        });
        !a.url || (e || d) && a != e || (d = te(a.url)) && g.push([new ui([d, 1],c(a.depth, b))]);
        g.push([]);
        return Sa(g, function(h) {
            return vi(b, h)
        })
    };
    function vi(a, b) {
        var c = Ta(b, function(e, f) {
            return Math.max(e, f.depth)
        }, -1)
          , d = gb(c + 2);
        d[0] = a;
        z(b, function(e) {
            return d[e.depth + 1] = e.g
        });
        return d
    }
    var xi = function() {
        var a = wi();
        return Sa(a, function(b) {
            return hf(b)
        })
    };
    var yi = function() {
        this.h = new ti;
        this.g = ri() ? new si : new qi
    }
      , Ai = function() {
        zi();
        var a = D.document;
        return !!(a && a.body && a.body.getBoundingClientRect && t(D.setInterval) && t(D.clearInterval) && t(D.setTimeout) && t(D.clearTimeout))
    };
    yi.prototype.setInterval = function(a, b) {
        return D.setInterval(a, b)
    }
    ;
    yi.prototype.clearInterval = function(a) {
        D.clearInterval(a)
    }
    ;
    yi.prototype.setTimeout = function(a, b) {
        return D.setTimeout(a, b)
    }
    ;
    yi.prototype.clearTimeout = function(a) {
        D.clearTimeout(a)
    }
    ;
    var Bi = function(a) {
        zi();
        var b = Ye() || D;
        Se(b, a)
    }
      , Ci = function() {
        zi();
        return xi()
    };
    Da(yi);
    var Di = function() {};
    Di.prototype.getContext = function() {
        if (!this.g) {
            if (!D)
                throw Error("Context has not been set and window is undefined.");
            this.g = yi.B()
        }
        return this.g
    }
    ;
    Da(Di);
    var zi = function() {
        return Di.B().getContext()
    };
    var Ei = function(a) {
        xd(this, a, null)
    };
    y(Ei, td);
    var Fi = function(a) {
        this.o = a;
        this.g = -1;
        this.h = this.l = 0
    }
      , Gi = function(a, b) {
        return function(c) {
            for (var d = [], e = 0; e < arguments.length; ++e)
                d[e - 0] = arguments[e];
            if (-1 < a.g)
                return b.apply(null, ca(d));
            try {
                return a.g = a.o.g.now(),
                b.apply(null, ca(d))
            } finally {
                a.l += a.o.g.now() - a.g,
                a.g = -1,
                a.h += 1
            }
        }
    };
    var Hi = function(a, b) {
        this.h = a;
        this.l = b;
        this.g = new Fi(a)
    };
    var Q = function() {
        this.o = void 0;
        this.l = this.C = 0;
        this.U = "ns";
        this.A = -1;
        this.I = new ii;
        ei(O(P(this.I, "mv", Yh)), Zh);
        P(this.I, "omid", M);
        O(P(this.I, "epoh", M));
        O(P(this.I, "epph", M));
        ei(O(P(this.I, "umt", M)), Wh);
        ei(O(P(this.I, "gmpd", M)), Xh);
        ei(O(P(this.I, "sel", M)), Vh);
        ei(O(P(this.I, "imams", M)), $h);
        this.I.h.imams = 1;
        ei(P(this.I, "imar", M), ai);
        this.I.h.imar = 1;
        O(P(this.I, "phel", M));
        O(P(this.I, "phell", M));
        O(P(this.I, "oseid", ze));
        O(P(this.I, "xdi", M));
        O(P(this.I, "amp", M));
        O(P(this.I, "prf", M));
        O(P(this.I, "gtx", M));
        O(P(this.I, "mvp_lv", M));
        ei(O(P(this.I, "lvio", M)), bi);
        P(this.I, "xosd", M);
        this.I.h.xosd = 1;
        this.I.h.mxd = 1;
        ei(O(P(this.I, "etl", M)), ci);
        O(P(this.I, "msp", M));
        O(P(this.I, "eocm", M));
        this.g = new Hi(zi(),this.I);
        this.w = this.h = !1
    };
    Q.prototype.Lc = function(a) {
        if ("string" === typeof a && 0 != a.length) {
            var b = this.I;
            if (b.l) {
                a = a.split("&");
                for (var c = a.length - 1; 0 <= c; c--) {
                    var d = a[c].split("=")
                      , e = d[0];
                    d = 1 < d.length ? parseInt(d[1], 10) : 1;
                    isNaN(d) || (e = b.g[e]) && e.l(d)
                }
            }
        }
    }
    ;
    Da(Q);
    var Ii = function() {
        var a = "https:";
        D && D.location && "http:" === D.location.protocol && (a = "http:");
        this.h = a;
        this.g = .01;
        this.l = Math.random()
    }
      , Ji = function(a, b, c, d, e) {
        if ((d ? a.l : Math.random()) < (e || a.g))
            try {
                if (c instanceof ff)
                    var f = c;
                else
                    f = new ff,
                    re(c, function(h, k) {
                        var l = f
                          , n = l.w++;
                        kf(l, n, gf(k, h))
                    });
                var g = nf(f, a.h, "/pagead/gen_204?id=" + b + "&");
                g && Bi(g)
            } catch (h) {}
    };
    var Mi = function() {
        var a = Ki;
        this.l = Li;
        this.A = "jserror";
        this.o = !0;
        this.h = null;
        this.C = this.Ha;
        this.g = void 0 === a ? null : a;
        this.w = !1
    };
    m = Mi.prototype;
    m.pinger = function() {
        return this.l
    }
    ;
    m.dc = function(a) {
        this.h = a
    }
    ;
    m.Qc = function(a) {
        this.A = a
    }
    ;
    m.Rc = function(a) {
        this.o = a
    }
    ;
    m.Sc = function(a) {
        this.w = a
    }
    ;
    m.Xa = function(a, b, c) {
        var d = this;
        return Gi(Q.B().g.g, function() {
            try {
                if (d.g && d.g.h) {
                    var e = d.g.start(a.toString(), 3);
                    var f = b();
                    d.g.end(e)
                } else
                    f = b()
            } catch (k) {
                var g = d.o;
                try {
                    Df(e);
                    var h = new Ni(Oi(k));
                    g = d.C(a, h, void 0, c)
                } catch (l) {
                    d.Ha(217, l)
                }
                if (!g)
                    throw k;
            }
            return f
        })()
    }
    ;
    m.Mc = function(a, b, c, d) {
        var e = this;
        return Gi(Q.B().g.g, function(f) {
            for (var g = [], h = 0; h < arguments.length; ++h)
                g[h - 0] = arguments[h];
            return e.Xa(a, function() {
                return b.apply(c, g)
            }, d)
        })
    }
    ;
    m.Ha = function(a, b, c, d, e) {
        e = e || this.A;
        try {
            var f = new ff;
            f.o = !0;
            lf(f, 1, "context", a);
            $e(b) || (b = new Ni(Oi(b)));
            b.msg && lf(f, 2, "msg", b.msg.substring(0, 512));
            var g = b.meta || {};
            if (this.h)
                try {
                    this.h(g)
                } catch (k) {}
            if (d)
                try {
                    d(g)
                } catch (k) {}
            kf(f, 3, [g]);
            var h = ef();
            h.h && lf(f, 4, "top", h.h.url || "");
            lf(f, 5, "url", h.g.url || "");
            Ji(this.l, e, f, this.w, c)
        } catch (k) {
            try {
                Ji(this.l, e, {
                    context: "ecmserr",
                    rctx: a,
                    msg: Oi(k),
                    url: h && h.g.url
                }, this.w, c)
            } catch (l) {}
        }
        return this.o
    }
    ;
    var Oi = function(a) {
        var b = a.toString();
        a.name && -1 == b.indexOf(a.name) && (b += ": " + a.name);
        a.message && -1 == b.indexOf(a.message) && (b += ": " + a.message);
        if (a.stack) {
            a = a.stack;
            var c = b;
            try {
                -1 == a.indexOf(c) && (a = c + "\n" + a);
                for (var d; a != d; )
                    d = a,
                    a = a.replace(/((https?:\/..*\/)[^\/:]*:\d+(?:.|\n)*)\2/, "$1");
                b = a.replace(/\n */g, "\n")
            } catch (e) {
                b = c
            }
        }
        return b
    }
      , Ni = function(a) {
        Ze.call(this, Error(a), {
            message: a
        })
    };
    p(Ni, Ze);
    var Li, Pi, Ki = new Cf(1,Ye()), Qi = function() {
        var a = Ye();
        a && "undefined" != typeof a.google_measure_js_timing && (a.google_measure_js_timing || Ki.C())
    };
    (function() {
        Li = new Ii;
        Pi = new Mi;
        var a = Ye();
        a && a.document && ("complete" == a.document.readyState ? Qi() : Ki.h && Oe(a, "load", function() {
            Qi()
        }))
    }
    )();
    var Ri = function(a) {
        Pi.dc(function(b) {
            z(a, function(c) {
                c(b)
            })
        })
    }
      , Si = function(a, b) {
        return Pi.Xa(a, b, void 0)
    }
      , Ti = function(a, b, c, d) {
        return Pi.Mc(a, b, c, d)
    }
      , Ui = function(a, b, c, d) {
        Pi.Ha(a, b, c, d)
    };
    var Vi = v(), Wi = -1, Xi = -1, Yi, Zi = -1, $i = !1, R = function() {
        return v() - Vi
    }, aj = function() {
        var a = Q.B().o
          , b = 0 <= Xi ? R() - Xi : -1
          , c = $i ? R() - Wi : -1
          , d = 0 <= Zi ? R() - Zi : -1;
        if (947190542 == a)
            return 100;
        if (79463069 == a)
            return 200;
        a = [2E3, 4E3];
        var e = [250, 500, 1E3];
        Ui(637, Error(), .001);
        var f = b;
        -1 != c && c < b && (f = c);
        for (b = 0; b < a.length; ++b)
            if (f < a[b]) {
                var g = e[b];
                break
            }
        void 0 === g && (g = e[a.length]);
        return -1 != d && 1500 < d && 4E3 > d ? 500 : g
    };
    var bj = {
        currentTime: 1,
        duration: 2,
        isVpaid: 4,
        volume: 8,
        isYouTube: 16,
        isPlaying: 32
    }
      , zb = {
        hc: "start",
        FIRST_QUARTILE: "firstquartile",
        MIDPOINT: "midpoint",
        THIRD_QUARTILE: "thirdquartile",
        COMPLETE: "complete",
        Zd: "metric",
        gc: "pause",
        Wc: "resume",
        SKIPPED: "skip",
        VIEWABLE_IMPRESSION: "viewable_impression",
        $d: "mute",
        ae: "unmute",
        FULLSCREEN: "fullscreen",
        Wd: "exitfullscreen",
        Vc: "bufferstart",
        Uc: "bufferfinish",
        Xd: "fully_viewable_audible_half_duration_impression",
        Yd: "measurable_impression",
        Sd: "abandon",
        Vd: "engagedview",
        IMPRESSION: "impression",
        Td: "creativeview",
        LOADED: "loaded",
        ih: "progress",
        wg: "close",
        xg: "collapse",
        Zg: "overlay_resize",
        $g: "overlay_unmeasurable_impression",
        ah: "overlay_unviewable_impression",
        eh: "overlay_viewable_immediate_impression",
        bh: "overlay_viewable_end_of_session_impression",
        Ud: "custom_metric_viewable"
    }
      , cj = "start firstquartile midpoint thirdquartile resume loaded".split(" ")
      , dj = ["start", "firstquartile", "midpoint", "thirdquartile"]
      , ej = ["abandon"]
      , fj = {
        th: -1,
        hc: 0,
        FIRST_QUARTILE: 1,
        MIDPOINT: 2,
        THIRD_QUARTILE: 3,
        COMPLETE: 4,
        Zd: 5,
        gc: 6,
        Wc: 7,
        SKIPPED: 8,
        VIEWABLE_IMPRESSION: 9,
        $d: 10,
        ae: 11,
        FULLSCREEN: 12,
        Wd: 13,
        Xd: 14,
        Yd: 15,
        Sd: 16,
        Vd: 17,
        IMPRESSION: 18,
        Td: 19,
        LOADED: 20,
        Ud: 21,
        Vc: 22,
        Uc: 23
    };
    var tb = {
        pg: "addEventListener",
        Hg: "getMaxSize",
        Ig: "getScreenSize",
        Jg: "getState",
        Kg: "getVersion",
        jh: "removeEventListener",
        Qg: "isViewable"
    }
      , gj = function(a) {
        var b = a !== a.top
          , c = a.top === Kf(a).la
          , d = -1
          , e = 0;
        if (b && c && a.top.mraid) {
            d = 3;
            var f = a.top.mraid
        } else
            d = (f = a.mraid) ? b ? c ? 2 : 1 : 0 : -1;
        f && (f.IS_GMA_SDK || (e = 2),
        ub(function(g) {
            return t(f[g])
        }) || (e = 1));
        return {
            ya: f,
            Nb: e,
            Jd: d
        }
    };
    var hj = function(a) {
        return (a = a.document) && t(a.elementFromPoint)
    };
    if (Ed && Ed.URL) {
        var ij, ve = Ed.URL;
        ij = !!ve && 0 < we().length;
        Pi.Rc(!ij)
    }
    var jj = function(a, b, c, d) {
        var e = void 0 === e ? !1 : e;
        c = Ti(d, c);
        Oe(a, b, c, {
            capture: e
        });
        return c
    };
    function kj(a, b, c, d) {
        if (!a)
            return {
                value: d,
                done: !1
            };
        d = b(d, a);
        var e = c(d, a);
        return !e && Ic(a, "parentElement") ? kj(ee(a), b, c, d) : {
            done: e,
            value: d
        }
    }
    var lj = function(a, b, c, d) {
        if (!a)
            return d;
        d = kj(a, b, c, d);
        if (!d.done)
            try {
                var e = Td(a)
                  , f = e && F(e);
                return lj(f && f.frameElement, b, c, d.value)
            } catch (g) {}
        return d.value
    };
    function mj(a) {
        var b = !Mc || bd(8);
        return lj(a, function(c, d) {
            c = Ic(d, "style") && d.style && He(d, "visibility");
            return {
                hidden: "hidden" === c,
                visible: b && "visible" === c
            }
        }, function(c) {
            return c.hidden || c.visible
        }, {
            hidden: !1,
            visible: !1
        }).hidden
    }
    var nj = function(a) {
        return lj(a, function(b, c) {
            return !(!Ic(c, "style") || !c.style || "none" !== He(c, "display"))
        }, function(b) {
            return b
        }, !1) ? !0 : mj(a)
    }
      , oj = function(a) {
        return new H(a.top,a.right,a.bottom,a.left)
    }
      , pj = function(a) {
        var b = a.top || 0
          , c = a.left || 0;
        return new H(b,c + (a.width || 0),b + (a.height || 0),c)
    }
      , qj = function(a) {
        return null != a && 0 <= a && 1 >= a
    };
    function rj() {
        var a = jc;
        return a ? Ua("Android TV;AppleTV;Apple TV;GoogleTV;HbbTV;NetCast.TV;Opera TV;POV_TV;SMART-TV;SmartTV;TV Store;AmazonWebAppPlatform;MiBOX".split(";"), function(b) {
            return A(a, b)
        }) || A(a, "OMI/") && !A(a, "XiaoMi/") ? !0 : A(a, "Presto") && A(a, "Linux") && !A(a, "X11") && !A(a, "Android") && !A(a, "Mobi") : !1
    }
    function sj() {
        var a = jc;
        return A(a, "AppleTV") || A(a, "Apple TV") || A(a, "CFNetwork") || A(a, "tvOS")
    }
    function tj() {
        var a = jc;
        return A(a, "sdk_google_atv_x86") || A(a, "Android TV")
    }
    function uj() {
        return A(jc, "CrKey") || A(jc, "PlayStation") || A(jc, "Roku") || rj() || A(jc, "Xbox") || sj() || tj()
    }
    ;var S = function() {
        this.M = !1;
        this.h = !qe(D.top);
        this.C = ke() || le();
        var a = bf();
        a = 0 < a.length && null != a[a.length - 1] && null != a[a.length - 1].url ? ((a = a[a.length - 1].url.match(me)[3] || null) ? decodeURI(a) : a) || "" : "";
        this.F = a;
        this.g = new H(0,0,0,0);
        this.w = new E(0,0);
        this.o = new E(0,0);
        this.H = new H(0,0,0,0);
        this.G = null;
        this.A = 0;
        this.D = !1;
        this.l = !(!D || !gj(D).ya);
        vj(this)
    }
      , wj = function(a, b) {
        b && b.screen && (a.w = new E(b.screen.width,b.screen.height))
    }
      , xj = function(a, b) {
        var c = a.g ? new E(a.g.h(),a.g.g()) : new E(0,0);
        b = void 0 === b ? D : b;
        null !== b && b != b.top && (b = b.top);
        var d = 0
          , e = 0;
        try {
            var f = b.document
              , g = f.body
              , h = f.documentElement;
            if ("CSS1Compat" == f.compatMode && h.scrollHeight)
                d = h.scrollHeight != c.height ? h.scrollHeight : h.offsetHeight,
                e = h.scrollWidth != c.width ? h.scrollWidth : h.offsetWidth;
            else {
                var k = h.scrollHeight
                  , l = h.scrollWidth
                  , n = h.offsetHeight
                  , u = h.offsetWidth;
                h.clientHeight != n && (k = g.scrollHeight,
                l = g.scrollWidth,
                n = g.offsetHeight,
                u = g.offsetWidth);
                k > c.height ? k > n ? (d = k,
                e = l) : (d = n,
                e = u) : k < n ? (d = k,
                e = l) : (d = n,
                e = u)
            }
            var x = new E(e,d)
        } catch (w) {
            x = new E(-12245933,-12245933)
        }
        a.o = x
    }
      , vj = function(a) {
        D && D.document && (a.H = Rh(!1, D, a.C),
        a.g = Rh(!0, D, a.C),
        a.G = a.g,
        xj(a, D),
        wj(a, D))
    }
      , yj = function() {
        var a = S.B();
        if (0 < a.A || a.D)
            return !0;
        a = zi().h.isVisible();
        var b = 0 === ig(Ed);
        return a || b
    };
    Da(S);
    var zj = new H(0,0,0,0);
    function Aj(a, b) {
        try {
            try {
                var c = oj(a.getBoundingClientRect())
            } catch (k) {
                c = new H(0,0,0,0)
            }
            var d = c.right - c.left
              , e = c.bottom - c.top
              , f = Ke(a, b)
              , g = f.x
              , h = f.y;
            return new H(Math.round(h),Math.round(g + d),Math.round(h + e),Math.round(g))
        } catch (k) {
            return zj.clone()
        }
    }
    function Bj(a, b) {
        return a.left <= b.right && b.left <= a.right && a.top <= b.bottom && b.top <= a.bottom ? new H(Math.max(a.top, b.top),Math.min(a.right, b.right),Math.min(a.bottom, b.bottom),Math.max(a.left, b.left)) : new H(0,0,0,0)
    }
    function Cj(a, b) {
        b = Dj(b);
        return 0 === b ? 0 : Dj(a) / b
    }
    function Dj(a) {
        return Math.max(a.bottom - a.top, 0) * Math.max(a.right - a.left, 0)
    }
    function Ej(a, b) {
        if (!a || !b)
            return !1;
        for (var c = 0; null !== a && 100 > c++; ) {
            if (a === b)
                return !0;
            try {
                if (a = ee(a) || a) {
                    var d = Td(a)
                      , e = d && F(d)
                      , f = e && e.frameElement;
                    f && (a = f)
                }
            } catch (g) {
                break
            }
        }
        return !1
    }
    function Fj(a, b, c) {
        if (!a || !b)
            return !1;
        b = Be(a.clone(), -b.left, -b.top);
        a = (b.left + b.right) / 2;
        b = (b.top + b.bottom) / 2;
        var d = Ye();
        qe(d.top) && d.top && d.top.document && (d = d.top);
        if (!hj(d))
            return !1;
        a = d.document.elementFromPoint(a, b);
        if (!a)
            return !1;
        b = (b = (b = Td(c)) && b.defaultView && b.defaultView.frameElement) && Ej(b, a);
        d = a === c;
        a = !d && a && he(a, function(e) {
            return e === c
        });
        return !(b || d || a)
    }
    function Gj(a, b, c, d) {
        return S.B().h ? !1 : 0 >= a.h() || 0 >= a.g() ? !0 : c && d ? Si(208, function() {
            return Fj(a, b, c)
        }) : !1
    }
    ;var Hj = function(a, b, c) {
        var d = new H(0,0,0,0);
        this.time = a;
        this.volume = null;
        this.l = b;
        this.g = d;
        this.h = c
    };
    var Ij = function(a, b, c, d, e, f, g) {
        this.H = a;
        this.A = b;
        this.h = c;
        this.w = d;
        this.C = e;
        this.g = f;
        this.o = g
    };
    Ij.prototype.l = function() {
        return this.H
    }
    ;
    var Jj = function(a, b) {
        return b ? Math.max(a.w, a.C) : a.w
    };
    var Kj = function(a) {
        this.l = a;
        this.h = 0;
        this.g = null
    };
    Kj.prototype.cancel = function() {
        zi().clearTimeout(this.g);
        this.g = null
    }
    ;
    var Lj = function(a) {
        var b = zi();
        a.g = b.setTimeout(Gi(Q.B().g.g, Ti(143, function() {
            a.h++;
            a.l.aa()
        })), aj())
    };
    var Mj = function(a, b, c) {
        this.la = a;
        this.ra = void 0 === c ? "na" : c;
        this.A = [];
        this.F = !1;
        this.w = new Hj(-1,!0,this);
        this.g = this;
        this.M = b;
        this.G = this.pa = this.D = !1;
        this.N = "uk";
        this.V = !1;
        this.o = !0
    };
    m = Mj.prototype;
    m.zd = function() {
        return this.bc()
    }
    ;
    m.bc = function() {
        return !1
    }
    ;
    m.Fc = function() {
        return this.F = !0
    }
    ;
    m.Za = function() {
        return this.g.N
    }
    ;
    m.zb = function() {
        return this.g.G
    }
    ;
    var Oj = function(a, b, c) {
        if (!a.G || (void 0 === c ? 0 : c))
            a.G = !0,
            a.N = b,
            a.M = 0,
            a.g != a || Nj(a)
    };
    Mj.prototype.getName = function() {
        return this.g.ra
    }
    ;
    Mj.prototype.La = function() {
        return this.g.O()
    }
    ;
    Mj.prototype.O = function() {
        return {}
    }
    ;
    Mj.prototype.Fa = function() {
        return this.g.M
    }
    ;
    var Pj = function(a, b) {
        Ya(a.A, b) || (a.A.push(b),
        b.$a(a.g),
        b.Oa(a.w),
        b.Ca() && (a.D = !0))
    };
    Mj.prototype.Y = function() {
        var a = S.B();
        a.g = Rh(!0, this.la, a.C)
    }
    ;
    Mj.prototype.Z = function() {
        wj(S.B(), this.la)
    }
    ;
    Mj.prototype.Aa = function() {
        xj(S.B(), this.la)
    }
    ;
    Mj.prototype.P = function() {
        return this.w.g
    }
    ;
    var Qj = function(a) {
        a = a.g;
        a.Z();
        a.Y();
        var b = S.B();
        b.H = Rh(!1, a.la, b.C);
        a.Aa();
        a.w.g = a.P()
    };
    Mj.prototype.aa = function() {}
    ;
    var Rj = function(a, b) {
        a.g != a ? Rj(a.g, b) : a.o !== b && (a.o = b,
        Nj(a))
    };
    Mj.prototype.vc = function() {
        return this.g.o
    }
    ;
    var Sj = function(a) {
        a.D = a.A.length ? Ua(a.A, function(b) {
            return b.Ca()
        }) : !1
    };
    Mj.prototype.l = function() {
        return this.w
    }
    ;
    var Tj = function(a) {
        var b = cb(a.A);
        z(b, function(c) {
            c.Oa(a.w)
        })
    }
      , Nj = function(a) {
        var b = cb(a.A);
        z(b, function(c) {
            c.$a(a.g)
        });
        a.g != a || Tj(a)
    };
    m = Mj.prototype;
    m.$a = function(a) {
        var b = this.g
          , c = a.Fa();
        this.g = c >= this.M ? a : this;
        b !== this.g ? (this.o = this.g.o,
        Nj(this)) : this.o !== this.g.o && (this.o = this.g.o,
        Nj(this))
    }
    ;
    m.Oa = function(a) {
        if (a.h === this.g) {
            var b;
            if (!(b = this.pa)) {
                b = this.w;
                var c = this.D;
                b = !(a && (void 0 === c || !c || b.volume == a.volume) && b.l == a.l && Ae(b.g, a.g))
            }
            this.w = a;
            b && Tj(this)
        }
    }
    ;
    m.Ca = function() {
        return this.D
    }
    ;
    m.W = function() {
        this.V = !0
    }
    ;
    m.fb = function() {
        return this.V
    }
    ;
    var Uj = function(a, b, c, d) {
        this.element = a;
        this.g = new H(0,0,0,0);
        this.w = new H(0,0,0,0);
        this.h = b;
        this.I = c;
        this.G = d;
        this.F = !1;
        this.timestamp = -1;
        this.o = new Ij(b.l(),this.g,new H(0,0,0,0),0,0,R(),0)
    };
    m = Uj.prototype;
    m.Bc = function() {
        return !0
    }
    ;
    m.Cc = function() {}
    ;
    m.Kb = function() {
        this.element && (this.g = Aj(this.element, this.h.g.la))
    }
    ;
    m.bd = function() {
        this.w = this.h.l().g
    }
    ;
    m.Ea = function() {
        this.Kb();
        this.o = new Ij(this.h.l(),this.g,this.o.h,this.o.w,this.o.C,R(),this.o.o)
    }
    ;
    m.W = function() {
        if (!this.fb()) {
            var a = this.h;
            $a(a.A, this);
            a.D && this.Ca() && Sj(a);
            this.F = !0
        }
    }
    ;
    m.fb = function() {
        return this.F
    }
    ;
    m.La = function() {
        return this.h.La()
    }
    ;
    m.Fa = function() {
        return this.h.Fa()
    }
    ;
    m.Za = function() {
        return this.h.Za()
    }
    ;
    m.zb = function() {
        return this.h.zb()
    }
    ;
    m.$a = function() {}
    ;
    m.Oa = function() {
        this.Ea()
    }
    ;
    m.Ca = function() {
        return this.G
    }
    ;
    var Vj = function(a) {
        this.w = !1;
        this.g = a;
        this.o = Ca
    };
    m = Vj.prototype;
    m.Fa = function() {
        return this.g.Fa()
    }
    ;
    m.Za = function() {
        return this.g.Za()
    }
    ;
    m.zb = function() {
        return this.g.zb()
    }
    ;
    m.create = function(a, b, c) {
        var d = null;
        this.g && (d = this.ac(a, b, c),
        Pj(this.g, d));
        return d
    }
    ;
    m.Ac = function() {
        return this.gb()
    }
    ;
    m.gb = function() {
        return !1
    }
    ;
    m.xd = function(a) {
        return this.g.Fc() ? (Pj(this.g, this),
        this.o = a,
        !0) : !1
    }
    ;
    m.$a = function(a) {
        0 == a.Fa() && this.o(a.Za(), this)
    }
    ;
    m.Oa = function() {}
    ;
    m.Ca = function() {
        return !1
    }
    ;
    m.W = function() {
        this.w = !0
    }
    ;
    m.fb = function() {
        return this.w
    }
    ;
    m.La = function() {
        return {}
    }
    ;
    var Wj = function(a, b, c) {
        this.l = void 0 === c ? 0 : c;
        this.h = a;
        this.g = null == b ? "" : b
    }
      , Xj = function(a) {
        switch (Math.trunc(a.l)) {
        case -16:
            return -16;
        case -8:
            return -8;
        case 0:
            return 0;
        case 8:
            return 8;
        case 16:
            return 16;
        default:
            return 16
        }
    }
      , Yj = function(a, b) {
        return a.l < b.l ? !0 : a.l > b.l ? !1 : a.h < b.h ? !0 : a.h > b.h ? !1 : typeof a.g < typeof b.g ? !0 : typeof a.g > typeof b.g ? !1 : a.g < b.g
    };
    var Zj = function() {
        this.l = 0;
        this.g = [];
        this.h = !1
    };
    Zj.prototype.add = function(a, b, c) {
        ++this.l;
        a = new Wj(a,b,c);
        this.g.push(new Wj(a.h,a.g,a.l + this.l / 4096));
        this.h = !0;
        return this
    }
    ;
    var ak = function(a, b) {
        z(b.g, function(c) {
            a.add(c.h, c.g, Xj(c))
        })
    }
      , bk = function(a, b) {
        var c = void 0 === c ? 0 : c;
        var d = void 0 === d ? !0 : d;
        re(b, function(e, f) {
            d && void 0 === e || a.add(f, e, c)
        });
        return a
    }
      , dk = function(a) {
        var b = ck;
        a.h && (fb(a.g, function(c, d) {
            return Yj(d, c) ? 1 : Yj(c, d) ? -1 : 0
        }),
        a.h = !1);
        return Ta(a.g, function(c, d) {
            d = b(d);
            return "" + c + ("" != c && "" != d ? "&" : "") + d
        }, "")
    };
    var ck = function(a) {
        var b = a.h;
        a = a.g;
        return "" === a ? b : "boolean" === typeof a ? a ? b : "" : Fa(a) ? 0 === a.length ? b : b + "=" + a.join() : b + "=" + (Ya(["mtos", "tos", "p"], b) ? a : encodeURIComponent(a))
    };
    var ek = function(a) {
        var b = void 0 === b ? !0 : b;
        this.g = new Zj;
        void 0 !== a && ak(this.g, a);
        b && this.g.add("v", Oh, -16)
    };
    ek.prototype.toString = function() {
        var a = "//pagead2.googlesyndication.com//pagead/gen_204"
          , b = dk(this.g);
        0 < b.length && (a += "?" + b);
        return a
    }
    ;
    var fk = function(a) {
        var b = []
          , c = [];
        ob(a, function(d, e) {
            if (!(e in Object.prototype) && "undefined" != typeof d)
                switch (Fa(d) && (d = d.join(",")),
                d = [e, "=", d].join(""),
                e) {
                case "adk":
                case "r":
                case "tt":
                case "error":
                case "mtos":
                case "tos":
                case "p":
                case "bs":
                case "aio":
                case "nio":
                case "iem":
                    b.unshift(d);
                    break;
                case "req":
                case "url":
                case "referrer":
                case "iframe_loc":
                    c.push(d);
                    break;
                default:
                    b.push(d)
                }
        });
        return b.concat(c)
    }
      , gk = function() {
        if (Oh && "unreleased" !== Oh)
            return Oh
    }
      , hk = function(a) {
        var b = void 0 === b ? 4E3 : b;
        a = a.toString();
        if (!/&v=[^&]+/.test(a)) {
            var c = gk();
            a = c ? a + "&v=" + encodeURIComponent(c) : a
        }
        a = a.substring(0, b);
        Bi(a)
    };
    var ik = function() {
        this.g = 0
    };
    Da(ik);
    var jk = function(a, b, c) {
        z(a.h, function(d) {
            var e = a.g;
            if (!d.g && (d.l(b, c),
            d.o())) {
                d.g = !0;
                var f = d.h()
                  , g = new Zj;
                g.add("id", "av-js");
                g.add("type", "verif");
                g.add("vtype", d.w);
                d = ik.B();
                g.add("i", d.g++);
                g.add("adk", e);
                bk(g, f);
                e = new ek(g);
                hk(e)
            }
        })
    };
    var kk = function() {
        this.h = this.l = this.o = this.g = 0
    }
      , lk = function(a, b, c, d) {
        b && (a.g += c,
        a.h += c,
        a.o += c,
        a.l = Math.max(a.l, a.o));
        if (void 0 === d ? !b : d)
            a.o = 0
    };
    var mk = [1, .75, .5, .3, 0]
      , nk = function(a) {
        this.h = a = void 0 === a ? mk : a;
        this.g = Sa(this.h, function() {
            return new kk
        })
    }
      , pk = function(a, b) {
        return ok(a, function(c) {
            return c.g
        }, void 0 === b ? !0 : b)
    }
      , rk = function(a, b) {
        return qk(a, b, function(c) {
            return c.g
        })
    }
      , sk = function(a, b) {
        return ok(a, function(c) {
            return c.l
        }, void 0 === b ? !0 : b)
    }
      , tk = function(a, b) {
        return qk(a, b, function(c) {
            return c.l
        })
    }
      , uk = function(a, b) {
        return qk(a, b, function(c) {
            return c.h
        })
    }
      , vk = function(a) {
        z(a.g, function(b) {
            b.h = 0
        })
    }
      , wk = function(a, b, c, d, e, f, g) {
        g = void 0 === g ? !0 : g;
        c = f ? Math.min(b, c) : c;
        for (f = 0; f < a.h.length; f++) {
            var h = a.h[f]
              , k = 0 < c && c >= h;
            h = !(0 < b && b >= h) || d;
            lk(a.g[f], g && k, e, !g || h)
        }
    }
      , ok = function(a, b, c) {
        a = Sa(a.g, function(d) {
            return b(d)
        });
        return c ? a : xk(a)
    }
      , qk = function(a, b, c) {
        var d = Xa(a.h, function(e) {
            return b <= e
        });
        return -1 == d ? 0 : c(a.g[d])
    }
      , xk = function(a) {
        return Sa(a, function(b, c, d) {
            return 0 < c ? d[c] - d[c - 1] : d[c]
        })
    };
    var yk = function() {
        this.l = new nk;
        this.V = new kk;
        this.F = this.C = -1;
        this.$ = 1E3;
        this.aa = new nk([1, .9, .8, .7, .6, .5, .4, .3, .2, .1, 0]);
        this.N = this.G = -1
    }
      , zk = function(a, b) {
        return sk(a.l, void 0 === b ? !0 : b)
    };
    yk.prototype.J = function(a, b, c, d) {
        this.C = -1 != this.C ? Math.min(this.C, b.X) : b.X;
        this.F = Math.max(this.F, b.X);
        this.G = -1 != this.G ? Math.min(this.G, b.ha) : b.ha;
        this.N = Math.max(this.N, b.ha);
        wk(this.aa, b.ha, c.ha, b.g, a, d);
        wk(this.l, b.X, c.X, b.g, a, d);
        c = d || c.Va != b.Va ? c.isVisible() && b.isVisible() : c.isVisible();
        b = !b.isVisible() || b.g;
        lk(this.V, c, a, b)
    }
    ;
    yk.prototype.Wa = function() {
        return this.V.l >= this.$
    }
    ;
    var Ak = new H(0,0,0,0)
      , Bk = function(a, b, c) {
        K.call(this);
        this.position = Ak.clone();
        this.Wb = this.Pb();
        this.yc = -2;
        this.lg = v();
        this.Md = -1;
        this.Db = b;
        this.Cb = null;
        this.Ob = -1 != b;
        this.Eb = null;
        this.opacity = -1;
        this.ig = c;
        this.Od = this.Xb = Ca;
        this.ia = new pi;
        this.ia.Pa = a;
        this.ia.g = a;
        this.Ga = !1;
        this.Sa = {
            Hc: null,
            Gc: null
        };
        this.Id = !0;
        this.Ib = null;
        this.bb = !1;
        Q.B().C++;
        this.sd = 0;
        this.ba = this.qc();
        this.Kd = -1;
        this.U = null;
        this.fc = new H(0,0,0,0);
        a = this.I = new ii;
        P(a, "od", Th);
        O(P(a, "opac", M));
        P(a, "ue", M);
        O(P(a, "gcm", M));
        P(a, "cm", M);
        a.h.cm = 1;
        O(P(a, "xcm", M));
        O(P(a, "sela", M));
        O(P(a, "sbeos", M));
        O(P(a, "prf", M));
        O(P(a, "mwt", M));
        O(P(a, "lcs", M));
        P(a, "iogeo", M);
        O(P(a, "osddt", M));
        (a = this.ia.Pa) && a.getAttribute && !/-[a-z]/.test("googleAvInapp") && (oi && a.dataset ? "googleAvInapp"in a.dataset : a.hasAttribute ? a.hasAttribute("data-" + Dc()) : a.getAttribute("data-" + Dc())) && (S.B().l = !0);
        1 == this.ig ? ji(this.I, "od", 1) : ji(this.I, "od", 0)
    };
    p(Bk, K);
    m = Bk.prototype;
    m.R = function() {
        this.ia.g && (this.Sa.Hc && (Pe(this.ia.g, "mouseover", this.Sa.Hc),
        this.Sa.Hc = null),
        this.Sa.Gc && (Pe(this.ia.g, "mouseout", this.Sa.Gc),
        this.Sa.Gc = null));
        this.Ib && this.Ib.W();
        this.U && this.U.W();
        delete this.Wb;
        delete this.Xb;
        delete this.Od;
        delete this.ia.Pa;
        delete this.ia.g;
        delete this.Sa;
        delete this.Ib;
        delete this.U;
        delete this.I;
        K.prototype.R.call(this)
    }
    ;
    m.sa = function() {
        return this.U ? this.U.g : this.position
    }
    ;
    m.Lc = function(a) {
        Q.B().Lc(a)
    }
    ;
    m.Ca = function() {
        return !1
    }
    ;
    m.Pb = function() {
        return new yk
    }
    ;
    m.oa = function() {
        return this.Wb
    }
    ;
    var Ck = function(a, b) {
        b != a.bb && (a.bb = b,
        a = S.B(),
        b ? a.A++ : 0 < a.A && a.A--)
    };
    Bk.prototype.zc = function() {}
    ;
    Bk.prototype.Pd = function() {}
    ;
    var Dk = function(a, b, c) {
        var d = a.ba.ha
          , e = c ? a.ba.X : a.sd
          , f = a.sa();
        a.fc && !Ae(a.fc, new H(0,0,0,0)) && (e = Be(a.fc.clone(), f.left, f.top));
        a.ob(f, e, b, c, !1, {}, a.xb(b), d)
    }
      , Ek = function(a, b) {
        b = b.create(a.ia.g, a.I, a.Ca());
        if (b = null != b && b.Bc() ? b : null)
            a.U = b
    }
      , Fk = function(a, b, c) {
        if (!a.Cb || -1 === b.g || -1 === a.Cb.g)
            return 0;
        a = b.g - a.Cb.g;
        return a > c ? 0 : a
    };
    Bk.prototype.od = function(a) {
        return Fk(this, a, 1E4)
    }
    ;
    var Gk = function(a, b, c) {
        if (a.U) {
            a.U.Ea();
            var d = a.U.o
              , e = d.l()
              , f = e.g;
            if (null != d.h) {
                var g = d.A;
                a.Eb = new Rd(g.left - f.left,g.top - f.top);
                a.fc = d.h
            }
            f = Jj(d, a.Hb());
            g = {};
            null !== e.volume && (g.volume = e.volume);
            var h = Q.B().I;
            e = Ua([], function(k) {
                return 1 === ki(h, k)
            }) || 1 === ki(a.I, "osddt");
            "nis" == a.U.getName() && (e = !0);
            "gsv" == a.U.getName() && (e = !0);
            e ? (e = a.od(d),
            a.Cb = d,
            a.ob(a.sa(), f, b, c, !1, g, e, d.o)) : a.ob(a.sa(), f, b, c, !1, g, a.xb(b), d.o)
        }
    }
      , Hk = function(a) {
        if (a.Ob && a.Ib) {
            var b = 1 == ki(a.I, "od")
              , c = S.B().g
              , d = a.Ib
              , e = a.U ? a.U.getName() : Q.B().U
              , f = new E(c.h(),c.g());
            c = a.Hb();
            a = {
                jg: e,
                Eb: a.Eb,
                og: f,
                Hb: c,
                X: a.ba.X,
                mg: b
            };
            if (b = d.l) {
                b.Ea();
                e = b.o;
                f = e.l().g;
                var g = null
                  , h = null;
                null != e.h && f && (g = e.A,
                g = new Rd(g.left - f.left,g.top - f.top),
                h = new E(f.right - f.left,f.bottom - f.top));
                e = Jj(e, c);
                c = {
                    jg: b.getName(),
                    Eb: g,
                    og: h,
                    Hb: c,
                    mg: !1,
                    X: e
                }
            } else
                c = null;
            c && jk(d, a, c)
        }
    };
    m = Bk.prototype;
    m.ob = function(a, b, c, d, e, f, g, h) {
        if (!this.Ga) {
            "number" !== typeof b && (this.Eb = new Rd(a.left - b.left,a.top - b.top));
            if (this.Ob) {
                f = this.kc(a, b, d, f, h);
                e = e && this.ba.X >= (this.Va() ? .3 : .5);
                this.Tc(g, f, e);
                this.Db = c;
                0 < f.X && -1 === this.Kd && (this.Kd = c);
                -1 == this.Md && this.Wa() && (this.Md = c);
                if (-2 == this.yc)
                    try {
                        a: if (b = "number" === typeof b ? null : b,
                        a && a != Ak && 0 != Dj(this.sa())) {
                            var k = S.B();
                            if (!b) {
                                if (!k.g) {
                                    var l = -1;
                                    break a
                                }
                                b = new H(0,k.g.h(),k.g.g(),0)
                            }
                            l = b.h && 0 < b.h() && b.g && 0 < b.g() ? this.wb(a, b) : -1
                        } else
                            l = -1;
                        this.yc = l
                    } catch (n) {
                        Ui(207, n)
                    }
                this.ba = f;
                d && (this.ba.X = 0)
            }
            this.Xb(this)
        }
    }
    ;
    m.Tc = function(a, b, c) {
        this.oa().J(a, b, this.ba, c)
    }
    ;
    m.qc = function() {
        return new Uh
    }
    ;
    m.kc = function(a, b, c, d, e) {
        e = void 0 === e ? -1 : e;
        d = this.qc();
        d.g = c;
        c = zi().h;
        c = 0 === ig(Ed) ? -1 : c.isVisible() ? 0 : 1;
        d.h = c;
        if ("number" === typeof b)
            d.X = this.wb(b),
            d.ha = e;
        else {
            d.X = this.wb(a, b);
            var f;
            0 <= e ? f = e : f = d.X * Dj(a) / (D.screen.height * D.screen.width);
            d.ha = f
        }
        d.Va = this.Va();
        return d
    }
    ;
    m.pd = function(a, b) {
        if (-1 == this.Db)
            return 0;
        a = a - this.Db || 1;
        return a > b ? 1 : a
    }
    ;
    m.xb = function(a) {
        return this.pd(a, 1E4)
    }
    ;
    m.wb = function(a, b) {
        if (0 === this.opacity && 1 === ki(this.I, "opac"))
            return 0;
        if ("number" === typeof a)
            return a;
        a = Bj(a, b);
        var c = 1 == ki(this.I, "od");
        if (0 >= Dj(this.sa()) || Gj(a, b, this.ia.g, c))
            return 0;
        c = Dj(a) / Dj(this.sa());
        b = Cj(a, b);
        return this.Hb() ? Math.max(c, b) : c
    }
    ;
    m.Va = function() {
        return !1
    }
    ;
    m.Hb = function() {
        return !1
    }
    ;
    var Ik = function(a, b, c, d) {
        if (d)
            a.position = d;
        else {
            b = c ? b : b.top;
            a.position = Ak.clone();
            try {
                a.ia.g && (a.position = Aj(a.ia.g, b))
            } catch (e) {}
        }
    };
    Bk.prototype.ua = function() {
        return 0
    }
    ;
    Bk.prototype.Wa = function() {
        return this.Wb.Wa()
    }
    ;
    var Jk = function(a, b) {
        b = Math.pow(10, b);
        return Math.floor(a * b) / b
    }
      , Kk = function(a) {
        a.Db = -1;
        a.Cb = null;
        a.zc(R())
    }
      , Lk = function(a, b) {
        Q.B();
        if (b = void 0 === b ? Ca : b)
            a.Od = b
    };
    var Mk = "StopIteration"in q ? q.StopIteration : {
        message: "StopIteration",
        stack: ""
    }
      , Nk = function() {};
    Nk.prototype.next = function() {
        throw Mk;
    }
    ;
    Nk.prototype.Jb = function() {
        return this
    }
    ;
    var Ok = function(a) {
        if (a instanceof Nk)
            return a;
        if ("function" == typeof a.Jb)
            return a.Jb(!1);
        if (Ga(a)) {
            var b = 0
              , c = new Nk;
            c.next = function() {
                for (; ; ) {
                    if (b >= a.length)
                        throw Mk;
                    if (b in a)
                        return a[b++];
                    b++
                }
            }
            ;
            return c
        }
        throw Error("Not implemented");
    }
      , Pk = function(a, b) {
        if (Ga(a))
            try {
                z(a, b, void 0)
            } catch (c) {
                if (c !== Mk)
                    throw c;
            }
        else {
            a = Ok(a);
            try {
                for (; ; )
                    b.call(void 0, a.next(), void 0, a)
            } catch (c) {
                if (c !== Mk)
                    throw c;
            }
        }
    };
    var Qk = function() {
        this.o = this.g = this.l = this.h = this.w = 0
    }
      , Rk = function(a) {
        var b = {};
        var c = v() - a.w;
        b = (b.ptlt = c,
        b);
        (c = a.h) && (b.pnk = c);
        (c = a.l) && (b.pnc = c);
        (c = a.o) && (b.pnmm = c);
        (a = a.g) && (b.pns = a);
        return b
    };
    var Sk = function() {
        Uh.call(this);
        this.l = !1;
        this.volume = void 0;
        this.w = !1;
        this.o = -1
    };
    p(Sk, Uh);
    var Tk = function(a) {
        return qj(a.volume) && .1 <= a.volume
    };
    var Uk = function() {
        var a = {};
        this.h = (a.vs = [1, 0],
        a.vw = [0, 1],
        a.am = [2, 2],
        a.a = [4, 4],
        a.f = [8, 8],
        a.bm = [16, 16],
        a.b = [32, 32],
        a.avw = [0, 64],
        a.avs = [64, 0],
        a.pv = [256, 256],
        a.gdr = [0, 512],
        a.p = [0, 1024],
        a.r = [0, 2048],
        a.m = [0, 4096],
        a.um = [0, 8192],
        a.ef = [0, 16384],
        a.s = [0, 32768],
        a.pmx = [0, 16777216],
        a);
        this.g = {};
        for (var b in this.h)
            0 < this.h[b][1] && (this.g[b] = 0);
        this.l = 0
    }
      , Vk = function(a, b) {
        var c = a.h[b]
          , d = c[1];
        a.l += c[0];
        0 < d && 0 == a.g[b] && (a.g[b] = 1)
    }
      , Xk = function(a) {
        return Wk(a, wb(a.h))
    }
      , Wk = function(a, b) {
        var c = 0, d;
        for (d in a.g)
            Ya(b, d) && 1 == a.g[d] && (c += a.h[d][1],
            a.g[d] = 2);
        return c
    }
      , Yk = function(a) {
        var b = 0, c;
        for (c in a.g) {
            var d = a.g[c];
            if (1 == d || 2 == d)
                b += a.h[c][1]
        }
        return b
    };
    var Zk = function() {
        this.h = this.l = 0
    };
    Zk.prototype.g = function() {
        return this.l
    }
    ;
    var $k = function(a, b, c) {
        32 <= b || (a.h & 1 << b && !c ? a.l &= ~(1 << b) : a.h & 1 << b || !c || (a.l |= 1 << b),
        a.h |= 1 << b)
    };
    var al = function() {
        yk.call(this);
        this.g = new kk;
        this.P = this.M = this.K = 0;
        this.H = -1;
        this.ma = new kk;
        this.w = new kk;
        this.h = new nk;
        this.A = this.o = -1;
        this.D = new kk;
        this.$ = 2E3;
        this.O = new Zk;
        this.Z = new Zk;
        this.Y = new Zk
    };
    p(al, yk);
    var bl = function(a, b, c) {
        var d = a.P;
        $i || c || -1 == a.H || (d += b - a.H);
        return d
    };
    al.prototype.J = function(a, b, c, d) {
        if (!b.w) {
            yk.prototype.J.call(this, a, b, c, d);
            var e = Tk(b) && Tk(c)
              , f = .5 <= (d ? Math.min(b.X, c.X) : c.X);
            qj(b.volume) && (this.o = -1 != this.o ? Math.min(this.o, b.volume) : b.volume,
            this.A = Math.max(this.A, b.volume));
            f && (this.K += a,
            this.M += e ? a : 0);
            wk(this.h, b.X, c.X, b.g, a, d, e);
            lk(this.g, !0, a);
            lk(this.w, e, a);
            lk(this.D, c.l, a);
            lk(this.ma, e && !f, a);
            a = Math.floor(b.o / 1E3);
            $k(this.O, a, b.isVisible());
            $k(this.Z, a, 1 <= b.X);
            $k(this.Y, a, Tk(b))
        }
    }
    ;
    var cl = function() {
        this.g = !1
    };
    var dl = function(a, b) {
        this.g = !1;
        this.o = a;
        this.H = b;
        this.h = 0
    };
    p(dl, cl);
    var el = function(a, b) {
        return a.l(b) ? (b = a.H.report(a.o, b),
        a.h |= b,
        0 == b) : !1
    };
    dl.prototype.l = function() {
        return !0
    }
    ;
    dl.prototype.w = function() {
        return !1
    }
    ;
    dl.prototype.getId = function() {
        var a = this
          , b = Ab(function(c) {
            return c == a.o
        });
        return fj[b].toString()
    }
    ;
    dl.prototype.toString = function() {
        var a = "";
        this.w() && (a += "c");
        this.g && (a += "s");
        0 < this.h && (a += ":" + this.h);
        return this.getId() + a
    }
    ;
    var fl = new H(0,0,0,0)
      , gl = {}
      , hl = (gl.firstquartile = 0,
    gl.midpoint = 1,
    gl.thirdquartile = 2,
    gl.complete = 3,
    gl)
      , il = function(a, b, c, d, e, f) {
        e = void 0 === e ? null : e;
        f = void 0 === f ? [] : f;
        Bk.call(this, b, c, d);
        this.$ = 0;
        this.o = {};
        this.ea = new Uk;
        this.ud = {};
        this.ga = "";
        this.Qa = null;
        this.md = !1;
        this.g = [];
        this.C = e;
        this.D = f;
        this.w = null;
        this.A = -1;
        this.pa = this.J = void 0;
        this.K = this.O = 0;
        this.Y = -1;
        this.ad = this.tb = !1;
        this.pb = this.kd = 0;
        this.ra = !1;
        this.gd = -1;
        this.V = this.F = this.h = 0;
        this.qd = this.ma = -1;
        this.jd = 0;
        this.$c = new nk;
        this.Z = this.Aa = this.aa = 0;
        this.sb = -1;
        this.rb = 0;
        this.G = !1;
        this.da = 0;
        this.qb = !1;
        this.N = Ca;
        this.P = [this.Pb()];
        this.ue = 2;
        b = S.B();
        Ik(this, a, b.h);
        this.Ya = {};
        this.Ya.pause = "p";
        this.Ya.resume = "r";
        this.Ya.skip = "s";
        this.Ya.mute = "m";
        this.Ya.unmute = "um";
        this.Ya.exitfullscreen = "ef";
        this.l = null
    };
    p(il, Bk);
    il.prototype.Ca = function() {
        return !0
    }
    ;
    var jl = function(a, b, c) {
        a.da = 1;
        a.o = {};
        a.o.firstquartile = !1;
        a.o.midpoint = !1;
        a.o.thirdquartile = !1;
        a.o.complete = !1;
        a.o.pause = !1;
        a.o.skip = !1;
        a.o.viewable_impression = !1;
        a.$ = 0;
        c || (a.oa().H = b)
    };
    il.prototype.Nd = function() {
        if (this.C) {
            var a = this.C;
            a.g || (a.g = el(a, this))
        }
    }
    ;
    il.prototype.zc = function(a) {
        var b = this
          , c = a - this.gd;
        this.ra && 1E3 >= c || (c = Ba("ima.bridge.getNativeViewability"),
        t(c) && (c(this.ga, function(d) {
            b.ra = !1;
            b.G && (b.qb = !0);
            Bb(d) && b.rb++;
            b.Pd(d)
        }),
        this.ra = !0,
        this.gd = a))
    }
    ;
    var kl = function(a) {
        return void 0 === a ? a : Number(a) ? Jk(a, 3) : 0
    };
    m = il.prototype;
    m.Pd = function(a) {
        var b = a.opt_nativeViewBounds || {}
          , c = a.opt_nativeViewVisibleBounds || {}
          , d = a.opt_nativeTime || -1
          , e = a.opt_nativeVolume;
        b = new H(b.top || 0,b.left + b.width || 0,b.top + b.height || 0,b.left || 0);
        a = a.opt_nativeViewHidden ? fl.clone() : new H(c.top || 0,c.left + c.width || 0,c.top + c.height || 0,c.left || 0);
        c = {};
        if ("n" == this.w || "ml" == this.w)
            c.volume = e;
        this.position = b;
        this.ob(b, a, d, !1, !0, c, this.xb(d), -1)
    }
    ;
    m.od = function(a) {
        return Fk(this, a, Math.max(1E4, this.A / 3))
    }
    ;
    m.xb = function(a) {
        return 2 == this.da ? 0 : Bk.prototype.pd.call(this, a, Math.max(1E4, this.A / 3))
    }
    ;
    m.ob = function(a, b, c, d, e, f, g, h) {
        var k = this
          , l = this.N(this) || {};
        Fb(l, f);
        this.A = l.duration || this.A;
        this.J = l.isVpaid || this.J;
        this.pa = l.isYouTube || this.pa;
        f = ll(this, c);
        1 === ml(this) && (g = f);
        Bk.prototype.ob.call(this, a, b, c, d, e, l, g, h);
        this.C && this.C.g && z(this.D, function(n) {
            n.g || (n.g = el(n, k))
        })
    }
    ;
    m.Tc = function(a, b, c) {
        Bk.prototype.Tc.call(this, a, b, c);
        nl(this).J(a, b, this.ba, c);
        this.ad = Tk(this.ba) && Tk(b);
        -1 == this.Y && this.tb && (this.Y = this.oa().g.g);
        this.ea.l = 0;
        a = this.Wa();
        b.isVisible() && Vk(this.ea, "vs");
        a && Vk(this.ea, "vw");
        qj(b.volume) && Vk(this.ea, "am");
        Tk(b) && Vk(this.ea, "a");
        this.bb && Vk(this.ea, "f");
        -1 != b.h && (Vk(this.ea, "bm"),
        1 == b.h && Vk(this.ea, "b"));
        Tk(b) && b.isVisible() && Vk(this.ea, "avs");
        this.ad && a && Vk(this.ea, "avw");
        0 < b.X && Vk(this.ea, "pv");
        ol(this, this.oa().g.g, !0) && Vk(this.ea, "gdr");
        2E3 <= tk(this.oa().l, 1) && Vk(this.ea, "pmx")
    }
    ;
    m.Pb = function() {
        return new al
    }
    ;
    m.oa = function() {
        return this.Wb
    }
    ;
    var nl = function(a, b) {
        var c;
        null != b && b < a.P.length ? c = b : c = a.P.length - 1;
        return a.P[c]
    };
    il.prototype.qc = function() {
        return new Sk
    }
    ;
    il.prototype.kc = function(a, b, c, d, e) {
        a = Bk.prototype.kc.call(this, a, b, c, d, void 0 === e ? -1 : e);
        a.l = this.bb;
        a.w = 2 == this.da;
        a.volume = d.volume;
        qj(a.volume) || (this.kd++,
        b = this.ba,
        qj(b.volume) && (a.volume = b.volume));
        d = d.currentTime;
        a.o = void 0 !== d && 0 <= d ? d : -1;
        return a
    }
    ;
    var ml = function(a) {
        var b = !!ki(Q.B().I, "umt");
        return a.J || !b && !a.pa ? 0 : 1
    }
      , ll = function(a, b) {
        b = a.xb(b);
        var c = a.N(a) || {};
        c = void 0 !== c.currentTime ? c.currentTime : a.O;
        var d = c - a.O
          , e = 0;
        0 <= d ? (a.K += b,
        a.Z += Math.max(b - d, 0),
        e = Math.min(d, a.K)) : a.Aa += Math.abs(d);
        0 != d && (a.K = 0);
        -1 == a.sb && 0 < d && (a.sb = 0 <= Zi ? R() - Zi : -1);
        a.O = c;
        return e
    };
    il.prototype.wb = function(a, b) {
        return this.G ? 0 : this.bb ? 1 : Bk.prototype.wb.call(this, a, b)
    }
    ;
    il.prototype.ua = function() {
        return 1
    }
    ;
    il.prototype.getDuration = function() {
        return this.A
    }
    ;
    var pl = function(a, b) {
        Ua(a.D, function(c) {
            return c.o == b.o
        }) || a.D.push(b)
    }
      , ol = function(a, b, c) {
        return 15E3 <= b ? !0 : a.tb ? (void 0 === c ? 0 : c) ? !0 : ql(a.A) ? b >= a.A / 2 : ql(a.Y) ? b >= a.Y : !1 : !1
    }
      , ql = function(a) {
        return 1 == ki(Q.B().I, "gmpd") ? 0 < a : -1 != a
    }
      , rl = function(a) {
        var b = {}
          , c = S.B();
        b.insideIframe = c.h;
        b.unmeasurable = a.Ga;
        b.position = a.sa();
        b.exposure = a.ba.X;
        b.documentSize = c.o;
        b.viewportSize = new E(c.g.h(),c.g.g());
        null != a.l && (b.presenceData = a.l);
        b.screenShare = a.ba.ha;
        return b
    }
      , sl = function(a) {
        var b = Jk(a.ba.X, 2)
          , c = a.ea.l
          , d = a.ba
          , e = nl(a)
          , f = kl(e.o)
          , g = kl(e.A)
          , h = kl(d.volume)
          , k = Jk(e.C, 2)
          , l = Jk(e.F, 2)
          , n = Jk(d.X, 2)
          , u = Jk(e.G, 2)
          , x = Jk(e.N, 2);
        d = Jk(d.ha, 2);
        a = a.sa().clone();
        a.round();
        e = zk(e, !1);
        return {
            ng: b,
            Ab: c,
            Yb: f,
            Tb: g,
            ub: h,
            Zb: k,
            Ub: l,
            X: n,
            $b: u,
            Vb: x,
            ha: d,
            position: a,
            cc: e
        }
    }
      , ul = function(a, b) {
        tl(a.g, b, function() {
            return {
                ng: 0,
                Ab: void 0,
                Yb: -1,
                Tb: -1,
                ub: -1,
                Zb: -1,
                Ub: -1,
                X: -1,
                $b: -1,
                Vb: -1,
                ha: -1,
                position: void 0,
                cc: []
            }
        });
        a.g[b] = sl(a)
    }
      , tl = function(a, b, c) {
        for (var d = a.length; d < b + 1; )
            a.push(c()),
            d++
    }
      , xl = function(a, b, c) {
        var d = a.ud[b];
        if (null != d)
            return d;
        d = vl(a, b);
        var e = Ab(function(f) {
            return f == b
        });
        c = wl(a, d, d, c, hl[zb[e]]);
        "fully_viewable_audible_half_duration_impression" == b && (c.std = "csm",
        c.ic = Wk(a.ea, ["gdr"]));
        return c
    }
      , yl = function(a, b, c) {
        var d = [b];
        if (a != b || c != b)
            d.unshift(a),
            d.push(c);
        return d
    }
      , wl = function(a, b, c, d, e) {
        if (a.Ga)
            return {
                "if": 0
            };
        var f = a.sa().clone();
        f.round();
        var g = S.B()
          , h = Q.B()
          , k = a.oa()
          , l = {};
        l["if"] = g.h ? 1 : void 0;
        l.sdk = a.w ? a.w : void 0;
        l.t = a.lg;
        l.p = [f.top, f.left, f.bottom, f.right];
        l.tos = pk(k.l, !1);
        l.mtos = zk(k);
        l.mcvt = k.V.l;
        l.ps = void 0;
        f = bl(k, R(), 2 == a.da);
        l.vht = f;
        l.mut = k.ma.l;
        l.a = kl(a.ba.volume);
        l.mv = kl(k.A);
        l.fs = a.bb ? 1 : 0;
        l.ft = k.D.g;
        l.at = k.w.g;
        l.as = .1 <= k.o ? 1 : 0;
        l.atos = pk(k.h);
        l.ssb = pk(k.aa, !1);
        l.amtos = sk(k.h);
        l.uac = a.kd;
        l.vpt = k.g.g;
        "nio" == h.U && (l.nio = 1,
        l.avms = "nio");
        l.gmm = "4";
        l.gdr = ol(a, k.g.g, !0) ? 1 : 0;
        l.efpf = a.ue;
        0 < a.rb && (l.nnut = a.rb);
        l.tcm = ml(a);
        l.nmt = a.Aa;
        l.bt = a.Z;
        l.pst = a.sb;
        l.vpaid = a.J;
        l.dur = a.A;
        l.vmtime = a.O;
        l.is = a.ea.l;
        1 <= a.g.length && (l.i0 = a.g[0].Ab,
        l.a0 = [a.g[0].ub],
        l.c0 = [a.g[0].X],
        l.ss0 = [a.g[0].ha],
        f = a.g[0].position,
        l.p0 = f ? [f.top, f.left, f.bottom, f.right] : void 0);
        2 <= a.g.length && (l.i1 = a.g[1].Ab,
        l.a1 = yl(a.g[1].Yb, a.g[1].ub, a.g[1].Tb),
        l.c1 = yl(a.g[1].Zb, a.g[1].X, a.g[1].Ub),
        l.ss1 = yl(a.g[1].$b, a.g[1].ha, a.g[1].Vb),
        f = a.g[1].position,
        l.p1 = f ? [f.top, f.left, f.bottom, f.right] : void 0,
        l.mtos1 = a.g[1].cc);
        3 <= a.g.length && (l.i2 = a.g[2].Ab,
        l.a2 = yl(a.g[2].Yb, a.g[2].ub, a.g[2].Tb),
        l.c2 = yl(a.g[2].Zb, a.g[2].X, a.g[2].Ub),
        l.ss2 = yl(a.g[2].$b, a.g[2].ha, a.g[2].Vb),
        f = a.g[2].position,
        l.p2 = f ? [f.top, f.left, f.bottom, f.right] : void 0,
        l.mtos2 = a.g[2].cc);
        4 <= a.g.length && (l.i3 = a.g[3].Ab,
        l.a3 = yl(a.g[3].Yb, a.g[3].ub, a.g[3].Tb),
        l.c3 = yl(a.g[3].Zb, a.g[3].X, a.g[3].Ub),
        l.ss3 = yl(a.g[3].$b, a.g[3].ha, a.g[3].Vb),
        f = a.g[3].position,
        l.p3 = f ? [f.top, f.left, f.bottom, f.right] : void 0,
        l.mtos3 = a.g[3].cc);
        l.cs = Yk(a.ea);
        b && (l.ic = Xk(a.ea),
        l.dvpt = k.g.h,
        l.dvs = uk(k.l, .5),
        l.dfvs = uk(k.l, 1),
        l.davs = uk(k.h, .5),
        l.dafvs = uk(k.h, 1),
        c && (k.g.h = 0,
        vk(k.l),
        vk(k.h)),
        a.Wa() && (l.dtos = k.K,
        l.dav = k.M,
        l.dtoss = a.$ + 1,
        c && (k.K = 0,
        k.M = 0,
        a.$++)),
        l.dat = k.w.h,
        l.dft = k.D.h,
        c && (k.w.h = 0,
        k.D.h = 0));
        l.ps = [g.o.width, g.o.height];
        l.bs = [g.g.h(), g.g.g()];
        l.scs = [g.w.width, g.w.height];
        l.dom = g.F;
        a.pb && (l.vds = a.pb);
        if (0 < a.D.length || a.C)
            b = cb(a.D),
            a.C && b.push(a.C),
            l.pings = Sa(b, function(n) {
                return n.toString()
            });
        b = Sa(Ra(a.D, function(n) {
            return n.w()
        }), function(n) {
            return n.getId()
        });
        db(b);
        l.ces = b;
        a.h && (l.vmer = a.h);
        a.F && (l.vmmk = a.F);
        a.V && (l.vmiec = a.V);
        l.avms = a.U ? a.U.getName() : Q.B().U;
        a.U && Fb(l, a.U.La());
        "exc" == h.U && (l.femt = a.ma,
        l.femvt = a.qd,
        l.emc = a.jd,
        l.emb = pk(a.$c, !1),
        l.emuc = a.aa,
        l.avms = "exc");
        d ? (l.c = Jk(a.ba.X, 2),
        l.ss = Jk(a.ba.ha, 2)) : l.tth = R() - Yi;
        l.mc = Jk(k.F, 2);
        l.nc = Jk(k.C, 2);
        l.mv = kl(k.A);
        l.nv = kl(k.o);
        l.lte = Jk(a.yc, 2);
        d = nl(a, e);
        zk(k);
        l.qmtos = zk(d);
        l.qnc = Jk(d.C, 2);
        l.qmv = kl(d.A);
        l.qnv = kl(d.o);
        l.qas = .1 <= d.o ? 1 : 0;
        l.qi = a.ga;
        l.avms || (l.avms = "geo");
        l.psm = k.O.h;
        l.psv = k.O.g();
        l.psfv = k.Z.g();
        l.psa = k.Y.g();
        h = mi(h.I);
        h.length && (l.veid = h);
        a.l && Fb(l, Rk(a.l));
        return l
    }
      , vl = function(a, b) {
        if (Ya(ej, b))
            return !0;
        var c = a.o[b];
        return void 0 !== c ? (a.o[b] = !0,
        !c) : !1
    };
    var zl = v()
      , Cl = function() {
        this.g = {};
        var a = F();
        Al(this, a, document);
        var b = Bl();
        try {
            if ("1" == b) {
                for (var c = a.parent; c != a.top; c = c.parent)
                    Al(this, c, c.document);
                Al(this, a.top, a.top.document)
            }
        } catch (d) {}
    }
      , Bl = function() {
        var a = document.documentElement;
        try {
            if (!qe(F().top))
                return "2";
            var b = []
              , c = F(a.ownerDocument);
            for (a = c; a != c.top; a = a.parent)
                if (a.frameElement)
                    b.push(a.frameElement);
                else
                    break;
            return b && 0 != b.length ? "1" : "0"
        } catch (d) {
            return "2"
        }
    }
      , Al = function(a, b, c) {
        jj(c, "mousedown", function() {
            return Dl(a)
        }, 301);
        jj(b, "scroll", function() {
            return El(a)
        }, 302);
        jj(c, "touchmove", function() {
            return Fl(a)
        }, 303);
        jj(c, "mousemove", function() {
            return Gl(a)
        }, 304);
        jj(c, "keydown", function() {
            return Hl(a)
        }, 305)
    }
      , Dl = function(a) {
        ob(a.g, function(b) {
            1E5 < b.l || ++b.l
        })
    }
      , El = function(a) {
        ob(a.g, function(b) {
            1E5 < b.g || ++b.g
        })
    }
      , Fl = function(a) {
        ob(a.g, function(b) {
            1E5 < b.g || ++b.g
        })
    }
      , Hl = function(a) {
        ob(a.g, function(b) {
            1E5 < b.h || ++b.h
        })
    }
      , Gl = function(a) {
        ob(a.g, function(b) {
            1E5 < b.o || ++b.o
        })
    };
    var Il = function() {
        this.g = [];
        this.h = []
    }
      , Jl = function(a, b) {
        return Wa(a.g, function(c) {
            return c.ga == b
        })
    }
      , Kl = function(a, b) {
        return b ? Wa(a.g, function(c) {
            return c.ia.Pa == b
        }) : null
    }
      , Ll = function(a, b) {
        return Wa(a.h, function(c) {
            return 2 == c.ua() && c.ga == b
        })
    }
      , Nl = function() {
        var a = Ml;
        return 0 == a.g.length ? a.h : 0 == a.h.length ? a.g : bb(a.h, a.g)
    };
    Il.prototype.reset = function() {
        this.g = [];
        this.h = []
    }
    ;
    var Ol = function(a, b) {
        a = 1 == b.ua() ? a.g : a.h;
        var c = Va(a, function(d) {
            return d == b
        });
        return -1 != c ? (a.splice(c, 1),
        b.U && b.U.Cc(),
        b.W(),
        !0) : !1
    }
      , Pl = function(a) {
        var b = Ml;
        if (Ol(b, a)) {
            switch (a.ua()) {
            case 0:
                var c = function() {
                    return null
                };
            case 2:
                c = function() {
                    return Ll(b, a.ga)
                }
                ;
                break;
            case 1:
                c = function() {
                    return Jl(b, a.ga)
                }
            }
            for (var d = c(); d; d = c())
                Ol(b, d)
        }
    }
      , Ql = function(a) {
        var b = Ml;
        a = Ra(a, function(c) {
            return !Kl(b, c.ia.Pa)
        });
        b.g.push.apply(b.g, ca(a))
    }
      , Rl = function(a) {
        var b = Ml
          , c = [];
        z(a, function(d) {
            Ua(b.g, function(e) {
                return e.ia.Pa === d.ia.Pa && e.ga === d.ga
            }) || (b.g.push(d),
            c.push(d))
        })
    };
    Da(Il);
    var Ml = Il.B();
    var Sl = function() {
        this.g = this.h = null
    }
      , Tl = function(a, b) {
        if (null == a.h)
            return !1;
        var c = function(d, e) {
            b(d, e)
        };
        a.g = Wa(a.h, function(d) {
            return null != d && d.Ac()
        });
        a.g && (a.g.xd(c) ? Qj(a.g.g) : b(a.g.g.Za(), a.g));
        return null != a.g
    };
    Da(Sl);
    var Ul = function(a, b, c, d) {
        Uj.call(this, a, b, c, d)
    };
    p(Ul, Uj);
    Ul.prototype.D = function(a) {
        var b = 1 == ki(this.I, "od");
        return Gj(a, this.w, this.element, b)
    }
    ;
    Ul.prototype.cd = function() {
        var a = this.h.l();
        this.timestamp = -1 === a.time ? R() : a.time
    }
    ;
    Ul.prototype.Ea = function() {
        this.cd();
        this.Kb();
        this.bd();
        var a = Bj(this.g, this.w);
        var b = a.top >= a.bottom || a.left >= a.right ? new H(0,0,0,0) : a;
        a = this.h.l();
        var c = 0
          , d = 0
          , e = 0;
        0 < (this.g.bottom - this.g.top) * (this.g.right - this.g.left) && (this.D(b) ? b = new H(0,0,0,0) : (c = S.B().w,
        e = new H(0,c.height,c.width,0),
        c = Cj(b, this.g),
        d = Cj(b, S.B().g),
        e = Cj(b, e)));
        b = b.top >= b.bottom || b.left >= b.right ? new H(0,0,0,0) : Be(b, -this.g.left, -this.g.top);
        this.o = new Ij(a,this.g,b,c,d,this.timestamp,e)
    }
    ;
    Ul.prototype.getName = function() {
        return this.h.getName()
    }
    ;
    var Wl = function(a) {
        a = Vl(a);
        Vj.call(this, a.length ? a[a.length - 1] : new Mj(D,0));
        this.l = a;
        this.h = null
    };
    p(Wl, Vj);
    m = Wl.prototype;
    m.getName = function() {
        return (this.h ? this.h : this.g).getName()
    }
    ;
    m.La = function() {
        return (this.h ? this.h : this.g).La()
    }
    ;
    m.Fa = function() {
        return (this.h ? this.h : this.g).Fa()
    }
    ;
    m.xd = function(a) {
        var b = !1;
        z(this.l, function(c) {
            c.Fc() && (b = !0)
        });
        b && (this.o = a,
        Pj(this.g, this));
        return b
    }
    ;
    m.W = function() {
        z(this.l, function(a) {
            a.W()
        });
        Vj.prototype.W.call(this)
    }
    ;
    m.Ac = function() {
        return Ua(this.l, function(a) {
            return a.zd()
        })
    }
    ;
    m.gb = function() {
        return Ua(this.l, function(a) {
            return a.bc()
        })
    }
    ;
    m.ac = function(a, b, c) {
        return new Ul(a,this.g,b,c)
    }
    ;
    m.Oa = function(a) {
        this.h = a.h
    }
    ;
    var Vl = function(a) {
        if (!a.length)
            return [];
        a = Ra(a, function(c) {
            return null != c && c.zd()
        });
        for (var b = 1; b < a.length; b++)
            Pj(a[b - 1], a[b]);
        return a
    };
    var Xl = function(a, b, c, d) {
        Uj.call(this, a, b, c, d);
        this.M = this.H = null
    };
    p(Xl, Ul);
    Xl.prototype.Bc = function() {
        var a = this;
        this.M || (this.M = R());
        if (Si(298, function() {
            return Yl(a)
        }))
            return !0;
        Oj(this.h, "msf");
        return !1
    }
    ;
    var $l = function(a, b) {
        try {
            if (b.length) {
                a.H || (a.H = R());
                var c = Zl(b)
                  , d = Ke(a.element, a.h.g.la)
                  , e = d.x
                  , f = d.y;
                a.g = new H(Math.round(f),Math.round(e) + c.boundingClientRect.width,Math.round(f) + c.boundingClientRect.height,Math.round(e));
                var g = oj(c.intersectionRect);
                a.w = Be(g, a.g.left - g.left, a.g.top - g.top)
            }
        } catch (h) {
            a.Cc(),
            Ui(299, h)
        }
    }
      , Zl = function(a) {
        return Ta(a, function(b, c) {
            return b.time > c.time ? b : c
        }, a[0])
    };
    Xl.prototype.Kb = function() {}
    ;
    Xl.prototype.D = function() {
        return !1
    }
    ;
    Xl.prototype.bd = function() {}
    ;
    Xl.prototype.La = function() {
        var a = {};
        return Object.assign(this.h.La(), (a.niot_obs = this.M,
        a.niot_cbk = this.H,
        a))
    }
    ;
    var am = {
        threshold: [0, .3, .5, .75, 1]
    }
      , bm = function(a, b, c, d) {
        Xl.call(this, a, b, c, d);
        this.A = this.C = this.l = null
    };
    p(bm, Xl);
    bm.prototype.getName = function() {
        return "nio"
    }
    ;
    bm.prototype.Cc = function() {
        if (this.l && this.element)
            try {
                this.l.unobserve(this.element),
                this.C ? (this.C.unobserve(this.element),
                this.C = null) : this.A && (this.A.disconnect(),
                this.A = null)
            } catch (a) {}
    }
    ;
    var cm = function(a) {
        return a.l && a.l.takeRecords ? a.l.takeRecords() : []
    }
      , Yl = function(a) {
        if (!a.element)
            return !1;
        var b = a.element
          , c = a.h.g.la
          , d = Q.B().g.g;
        a.l = new c.IntersectionObserver(Gi(d, function(e) {
            return $l(a, e)
        }),am);
        d = Gi(d, function() {
            a.l.unobserve(b);
            a.l.observe(b);
            $l(a, cm(a))
        });
        c.ResizeObserver ? (a.C = new c.ResizeObserver(d),
        a.C.observe(b)) : c.MutationObserver && (a.A = new q.MutationObserver(d),
        a.A.observe(b, {
            attributes: !0,
            childList: !0,
            characterData: !0,
            subtree: !0
        }));
        a.l.observe(b);
        $l(a, cm(a));
        return !0
    };
    bm.prototype.Ea = function() {
        var a = cm(this);
        0 < a.length && $l(this, a);
        Xl.prototype.Ea.call(this)
    }
    ;
    var dm = function(a) {
        a = void 0 === a ? D : a;
        Vj.call(this, new Mj(a,2))
    };
    p(dm, Vj);
    dm.prototype.getName = function() {
        return "nio"
    }
    ;
    dm.prototype.gb = function() {
        return "exc" !== Q.B().U && !S.B().l && null != this.g.g.la.IntersectionObserver
    }
    ;
    dm.prototype.ac = function(a, b, c) {
        return new bm(a,this.g,b,c)
    }
    ;
    var fm = function() {
        var a = em();
        Mj.call(this, D.top, a, "geo")
    };
    p(fm, Mj);
    fm.prototype.P = function() {
        return S.B().g
    }
    ;
    fm.prototype.bc = function() {
        var a = em();
        this.M !== a && (this.g != this && a > this.g.M && (this.g = this,
        Nj(this)),
        this.M = a);
        return 2 == a
    }
    ;
    var em = function() {
        Q.B();
        var a = S.B();
        return a.h || a.l ? 0 : 2
    };
    Da(fm);
    var gm = function() {};
    Da(gm);
    var hm = function(a, b, c) {
        K.call(this);
        this.o = null != c ? Ma(a, c) : a;
        this.l = b;
        this.h = Ma(this.ag, this);
        this.g = []
    };
    y(hm, K);
    m = hm.prototype;
    m.kb = !1;
    m.Gb = 0;
    m.Ta = null;
    m.ld = function(a) {
        this.g = arguments;
        this.Ta || this.Gb ? this.kb = !0 : im(this)
    }
    ;
    m.stop = function() {
        this.Ta && (q.clearTimeout(this.Ta),
        this.Ta = null,
        this.kb = !1,
        this.g = [])
    }
    ;
    m.pause = function() {
        this.Gb++
    }
    ;
    m.resume = function() {
        this.Gb--;
        this.Gb || !this.kb || this.Ta || (this.kb = !1,
        im(this))
    }
    ;
    m.R = function() {
        hm.wa.R.call(this);
        this.stop()
    }
    ;
    m.ag = function() {
        this.Ta = null;
        this.kb && !this.Gb && (this.kb = !1,
        im(this))
    }
    ;
    var im = function(a) {
        a.Ta = th(a.h, a.l);
        a.o.apply(null, a.g)
    };
    var jm = function() {
        this.done = !1;
        this.g = {
            de: 0,
            Xc: 0,
            Oc: 0,
            hd: 0,
            tc: -1,
            fe: 0,
            ee: 0,
            ge: 0
        };
        this.D = this.o = this.C = this.w = this.H = null;
        this.F = !1;
        this.h = null;
        this.G = 0;
        this.l = new Kj(this)
    }
      , km = function() {
        var a = Q.B().U;
        return "nio" === a || "aio" === a || "omid" === a
    }
      , nm = function() {
        var a = lm;
        if (!a.F) {
            a.F = !0;
            if (!a.H && !km()) {
                var b = Ti(137, function(c) {
                    for (var d = [], e = 0; e < arguments.length; ++e)
                        d[e - 0] = arguments[e];
                    return a.A.apply(a, ca(d))
                });
                a.w = new hm(b,100);
                a.H = jj(D, "scroll", function(c) {
                    for (var d = [], e = 0; e < arguments.length; ++e)
                        d[e - 0] = arguments[e];
                    null !== a.w && a.w.ld.apply(a.w, ca(d))
                }, 138)
            }
            a.C || km() || (b = Ti(140, function(c) {
                for (var d = [], e = 0; e < arguments.length; ++e)
                    d[e - 0] = arguments[e];
                return a.A.apply(a, ca(d))
            }),
            a.o = new hm(b,100),
            a.C = jj(D, "resize", function(c) {
                for (var d = [], e = 0; e < arguments.length; ++e)
                    d[e - 0] = arguments[e];
                null !== a.o && a.o.ld.apply(a.o, ca(d))
            }, 141));
            mm(a, function(c) {
                for (var d = [], e = 0; e < arguments.length; ++e)
                    d[e - 0] = arguments[e];
                return a.M.apply(a, ca(d))
            });
            a.M()
        }
    };
    jm.prototype.A = function() {
        om(this, Nl(), !1)
    }
    ;
    jm.prototype.aa = function() {
        om(this, Nl(), !1)
    }
    ;
    var pm = function() {
        gm.B();
        var a = Sl.B();
        null != a.g && a.g.g ? Qj(a.g.g) : vj(S.B())
    }
      , om = function(a, b, c) {
        if (!a.done && (a.l.cancel(),
        0 != b.length)) {
            a.h = null;
            try {
                pm();
                var d = R()
                  , e = Q.B();
                e.A = d;
                if (null != Sl.B().g)
                    for (e = 0; e < b.length; e++)
                        Gk(b[e], d, c);
                else
                    switch (e.U) {
                    case "exc":
                        for (e = 0; e < b.length; e++)
                            Dk(b[e], d, c);
                        break;
                    case "nis":
                        for (e = 0; e < b.length; e++)
                            b[e].zc(d)
                    }
                for (e = 0; e < b.length; e++)
                    Hk(b[e]);
                a.g.Oc += R() - d;
                ++a.g.hd
            } finally {
                c ? z(b, function(f) {
                    f.ba.X = 0
                }) : Lj(a.l)
            }
        }
    }
      , mm = function(a, b) {
        if (!a.D) {
            b = Ti(142, b);
            zi();
            var c = jg(Ed);
            c && Oe(Ed, c, b, {
                capture: !1
            }) && (a.D = b)
        }
    };
    jm.prototype.M = function() {
        var a = yj()
          , b = R();
        a ? ($i || (Wi = b,
        z(Ml.g, function(c) {
            var d = c.oa();
            d.P = bl(d, b, 1 != c.da)
        })),
        $i = !0) : (this.G = qm(this, b),
        $i = !1,
        Yi = b,
        z(Ml.g, function(c) {
            c.Ob && (c.oa().H = b)
        }));
        om(this, Nl(), !a)
    }
    ;
    var rm = function() {
        var a = Sl.B();
        if (null != a.g) {
            var b = a.g;
            z(Nl(), function(c) {
                return Ek(c, b)
            })
        }
    }
      , qm = function(a, b) {
        a = a.G;
        $i && (a += b - Wi);
        return a
    }
      , sm = function(a) {
        var b = lm;
        a = void 0 === a ? function() {
            return {}
        }
        : a;
        Pi.Qc("av-js");
        Li.g = .01;
        Ri([function(c) {
            var d = Q.B()
              , e = {};
            e = (e.bin = d.l,
            e.type = "error",
            e);
            d = li(d.I);
            if (!b.h) {
                var f = D.document
                  , g = 0 <= Xi ? R() - Xi : -1
                  , h = R();
                -1 == b.g.tc && (g = h);
                var k = S.B()
                  , l = Q.B()
                  , n = li(l.I)
                  , u = Nl();
                try {
                    if (0 < u.length) {
                        var x = k.g;
                        x && (n.bs = [x.h(), x.g()]);
                        var w = k.o;
                        w && (n.ps = [w.width, w.height]);
                        D.screen && (n.ss = [D.screen.width, D.screen.height])
                    } else
                        n.url = encodeURIComponent(D.location.href.substring(0, 512)),
                        f.referrer && (n.referrer = encodeURIComponent(f.referrer.substring(0, 512)));
                    n.tt = g;
                    n.pt = Xi;
                    n.bin = l.l;
                    switch (Q.B().U) {
                    case "iem":
                        n.iem = 1;
                        break;
                    case "aio":
                        n.aio = 1;
                        break;
                    case "nio":
                        n.nio = 1
                    }
                    void 0 !== D.google_osd_load_pub_page_exp && (n.olpp = D.google_osd_load_pub_page_exp);
                    n.deb = [1, b.g.de, b.g.Xc, b.g.Oc, b.g.hd, b.g.tc, 0, b.l.h, b.g.fe, b.g.ee, b.g.ge].join("-");
                    n.tvt = qm(b, h);
                    k.l && (n.inapp = 1);
                    if (null !== D && D != D.top) {
                        0 < u.length && (n.iframe_loc = encodeURIComponent(D.location.href.substring(0, 512)));
                        var C = k.H;
                        n.is = [C.h(), C.g()]
                    }
                } catch (Sb) {
                    n.error = 1
                }
                b.h = n
            }
            w = b.h;
            x = {};
            for (var G in w)
                x[G] = w[G];
            G = Q.B().g;
            if (1 == ki(G.l, "prf")) {
                w = new Ei;
                C = G.g;
                f = 0;
                -1 < C.g && (f = C.o.g.now() - C.g);
                w = Ad(w, 1, C.l + f);
                C = G.g;
                w = Ad(w, 5, -1 < C.g ? C.h + 1 : C.h);
                w = Ad(w, 2, G.h.g.l());
                w = Ad(w, 3, G.h.g.h());
                C = Ad(w, 4, G.h.g.g());
                G = {};
                w = new rd;
                f = yd(C, 1);
                f = null == f ? f : +f;
                f = null == f ? 0 : f;
                if (0 !== f && (g = f,
                null != g)) {
                    pd(w.g, 9);
                    f = w.g;
                    k = g;
                    k = (g = 0 > k ? 1 : 0) ? -k : k;
                    if (0 === k)
                        nd = 0 < 1 / k ? 0 : 2147483648,
                        md = 0;
                    else if (isNaN(k))
                        nd = 2147483647,
                        md = 4294967295;
                    else if (1.7976931348623157E308 < k)
                        nd = (g << 31 | 2146435072) >>> 0,
                        md = 0;
                    else if (2.2250738585072014E-308 > k)
                        k /= Math.pow(2, -1074),
                        nd = (g << 31 | k / 4294967296) >>> 0,
                        md = k >>> 0;
                    else {
                        l = k;
                        h = 0;
                        if (2 <= l)
                            for (; 2 <= l && 1023 > h; )
                                h++,
                                l /= 2;
                        else
                            for (; 1 > l && -1022 < h; )
                                l *= 2,
                                h--;
                        k *= Math.pow(2, -h);
                        nd = (g << 31 | h + 1023 << 20 | 1048576 * k & 1048575) >>> 0;
                        md = 4503599627370496 * k >>> 0
                    }
                    qd(f, md);
                    qd(f, nd)
                }
                f = zd(C, 2);
                0 !== f && null != f && sd(w, 2, f);
                f = zd(C, 3);
                0 !== f && null != f && sd(w, 3, f);
                f = zd(C, 4);
                0 !== f && null != f && sd(w, 4, f);
                f = zd(C, 5);
                if (0 !== f && null != f && null != f)
                    if (pd(w.g, 40),
                    C = w.g,
                    0 <= f)
                        pd(C, f);
                    else {
                        for (g = 0; 9 > g; g++)
                            C.g.push(f & 127 | 128),
                            f >>= 7;
                        C.g.push(1)
                    }
                C = new Uint8Array(w.l + w.g.length());
                g = w.h;
                h = g.length;
                for (k = f = 0; k < h; k++)
                    l = g[k],
                    C.set(l, f),
                    f += l.length;
                g = w.g.end();
                C.set(g, f);
                w.h = [C];
                G = (G.pf = ld(C),
                G)
            } else
                G = {};
            Fb(x, G);
            Fb(c, e, d, x, a());
            if (e = gk())
                d = {},
                Fb(c, (d.v = encodeURIComponent(e),
                d))
        }
        ])
    };
    Da(jm);
    var lm = jm.B();
    var tm = null
      , um = ""
      , vm = !1
      , wm = function() {
        var a = tm || D;
        if (!a)
            return "";
        var b = [];
        if (!a.location || !a.location.href)
            return "";
        b.push("url=" + encodeURIComponent(a.location.href.substring(0, 512)));
        a.document && a.document.referrer && b.push("referrer=" + encodeURIComponent(a.document.referrer.substring(0, 512)));
        return b.join("&")
    };
    var xm = function(a) {
        return function(b) {
            return void 0 === b[a] ? 0 : b[a]
        }
    }
      , zm = function() {
        var a = [0, 2, 4];
        return function(b) {
            b = b.tos;
            if (Fa(b)) {
                for (var c = Array(b.length), d = 0; d < b.length; d++)
                    c[d] = 0 < d ? c[d - 1] + b[d] : b[d];
                return void 0 !== a ? ym(c, a) : c
            }
        }
    }
      , Am = function(a, b, c, d) {
        c = void 0 === c ? !0 : c;
        d = void 0 === d ? function() {
            return !0
        }
        : d;
        return function(e) {
            var f = e[a];
            if (Fa(f) && d(e))
                return ym(f, b, c)
        }
    }
      , Bm = function(a, b) {
        return function(c) {
            return b(c) ? c[a] : void 0
        }
    }
      , Cm = function(a) {
        return function(b) {
            for (var c = 0; c < a.length; c++)
                if (a[c] === b.e || void 0 === a[c] && !b.hasOwnProperty("e"))
                    return !0;
            return !1
        }
    }
      , ym = function(a, b, c) {
        return void 0 === c || c ? Ra(a, function(d, e) {
            return Ya(b, e)
        }) : Sa(b, function(d, e, f) {
            return a.slice(0 < e ? f[e - 1] + 1 : 0, d + 1).reduce(function(g, h) {
                return g + h
            }, 0)
        })
    };
    var Dm = Cm([void 0, 1, 2, 3, 4, 8, 16])
      , Em = Cm([void 0, 4, 8, 16])
      , Fm = {
        sv: "sv",
        cb: "cb",
        e: "e",
        nas: "nas",
        msg: "msg",
        "if": "if",
        sdk: "sdk",
        p: "p",
        p0: Bm("p0", Em),
        p1: Bm("p1", Em),
        p2: Bm("p2", Em),
        p3: Bm("p3", Em),
        tos: "tos",
        mtos: "mtos",
        mtos1: Am("mtos1", [0, 2, 4], !1, Em),
        mtos2: Am("mtos2", [0, 2, 4], !1, Em),
        mtos3: Am("mtos3", [0, 2, 4], !1, Em),
        mcvt: "mcvt",
        ps: "ps",
        scs: "scs",
        bs: "bs",
        vht: "vht",
        mut: "mut",
        a: "a",
        a0: Bm("a0", Em),
        a1: Bm("a1", Em),
        a2: Bm("a2", Em),
        a3: Bm("a3", Em),
        ft: "ft",
        dft: "dft",
        at: "at",
        dat: "dat",
        as: "as",
        vpt: "vpt",
        gmm: "gmm",
        std: "std",
        efpf: "efpf",
        swf: "swf",
        nio: "nio",
        px: "px",
        nnut: "nnut",
        vmer: "vmer",
        vmmk: "vmmk",
        vmiec: "vmiec",
        nmt: "nmt",
        tcm: "tcm",
        bt: "bt",
        pst: "pst",
        vpaid: "vpaid",
        dur: "dur",
        vmtime: "vmtime",
        dtos: "dtos",
        dtoss: "dtoss",
        dvs: "dvs",
        dfvs: "dfvs",
        dvpt: "dvpt",
        fmf: "fmf",
        vds: "vds",
        is: "is",
        i0: "i0",
        i1: "i1",
        i2: "i2",
        i3: "i3",
        ic: "ic",
        cs: "cs",
        c: "c",
        c0: Bm("c0", Em),
        c1: Bm("c1", Em),
        c2: Bm("c2", Em),
        c3: Bm("c3", Em),
        mc: "mc",
        nc: "nc",
        mv: "mv",
        nv: "nv",
        qmt: Bm("qmtos", Dm),
        qnc: Bm("qnc", Dm),
        qmv: Bm("qmv", Dm),
        qnv: Bm("qnv", Dm),
        raf: "raf",
        rafc: "rafc",
        lte: "lte",
        ces: "ces",
        tth: "tth",
        femt: "femt",
        femvt: "femvt",
        emc: "emc",
        emuc: "emuc",
        emb: "emb",
        avms: "avms",
        nvat: "nvat",
        qi: "qi",
        psm: "psm",
        psv: "psv",
        psfv: "psfv",
        psa: "psa",
        pnk: "pnk",
        pnc: "pnc",
        pnmm: "pnmm",
        pns: "pns",
        ptlt: "ptlt",
        pngs: "pings",
        veid: "veid",
        ssb: "ssb",
        ss0: Bm("ss0", Em),
        ss1: Bm("ss1", Em),
        ss2: Bm("ss2", Em),
        ss3: Bm("ss3", Em),
        dc_rfl: "urlsigs",
        obd: "obd",
        omidp: "omidp",
        omidr: "omidr",
        omidv: "omidv",
        omida: "omida",
        omids: "omids"
    }
      , Gm = {
        c: xm("c"),
        at: "at",
        atos: Am("atos", [0, 2, 4]),
        ta: function(a, b) {
            return function(c) {
                if (void 0 === c[a])
                    return b
            }
        }("tth", "1"),
        a: "a",
        dur: "dur",
        p: "p",
        tos: zm(),
        j: "dom",
        mtos: Am("mtos", [0, 2, 4]),
        gmm: "gmm",
        gdr: "gdr",
        ss: xm("ss"),
        vsv: jb("w2"),
        t: "t"
    }
      , Hm = {
        atos: "atos",
        amtos: "amtos",
        avt: Am("atos", [2]),
        davs: "davs",
        dafvs: "dafvs",
        dav: "dav",
        ss: xm("ss"),
        t: "t"
    }
      , Im = {
        a: "a",
        tos: zm(),
        at: "at",
        c: xm("c"),
        mtos: Am("mtos", [0, 2, 4]),
        dur: "dur",
        fs: "fs",
        p: "p",
        vpt: "vpt",
        vsv: jb("ias_w2"),
        dom: "dom",
        gmm: "gmm",
        gdr: "gdr",
        t: "t"
    }
      , Jm = {
        tos: zm(),
        at: "at",
        c: xm("c"),
        mtos: Am("mtos", [0, 2, 4]),
        p: "p",
        vpt: "vpt",
        vsv: jb("dv_w4"),
        gmm: "gmm",
        gdr: "gdr",
        dom: "dom",
        t: "t",
        mv: "mv",
        qmpt: Am("qmtos", [0, 2, 4]),
        qvs: function(a, b) {
            return function(c) {
                var d = c[a];
                if ("number" === typeof d)
                    return Sa(b, function(e) {
                        return 0 < d && d >= e ? 1 : 0
                    })
            }
        }("qnc", [1, .5, 0]),
        qmv: "qmv",
        qa: "qas",
        a: "a"
    };
    var Lm = function(a, b) {
        var c = {
            sv: "817",
            cb: "j"
        };
        c.nas = Ml.g.length;
        c.msg = a;
        void 0 !== b && (a = Km(b)) && (c.e = fj[a]);
        return c
    }
      , Mm = function(a) {
        return 0 == a.lastIndexOf("custom_metric_viewable", 0)
    }
      , Km = function(a) {
        var b = Mm(a) ? "custom_metric_viewable" : a.toLowerCase();
        return Ab(function(c) {
            return c == b
        })
    };
    var Nm = {
        Eg: "visible",
        rg: "audible",
        ph: "time",
        rh: "timetype"
    }
      , Om = {
        visible: function(a) {
            return /^(100|[0-9]{1,2})$/.test(a)
        },
        audible: function(a) {
            return "0" == a || "1" == a
        },
        timetype: function(a) {
            return "mtos" == a || "tos" == a
        },
        time: function(a) {
            return /^(100|[0-9]{1,2})%$/.test(a) || /^([0-9])+ms$/.test(a)
        }
    }
      , Pm = function() {
        this.g = void 0;
        this.h = !1;
        this.l = 0;
        this.o = -1;
        this.w = "tos"
    }
      , Qm = function(a) {
        try {
            var b = a.split(",");
            return b.length > wb(Nm).length ? null : Ta(b, function(c, d) {
                d = d.toLowerCase().split("=");
                if (2 != d.length || void 0 === Om[d[0]] || !Om[d[0]](d[1]))
                    throw Error("Entry (" + d[0] + ", " + d[1] + ") is invalid.");
                c[d[0]] = d[1];
                return c
            }, {})
        } catch (c) {
            return null
        }
    }
      , Rm = function(a, b) {
        if (void 0 == a.g)
            return 0;
        switch (a.w) {
        case "mtos":
            return a.h ? tk(b.h, a.g) : tk(b.l, a.g);
        case "tos":
            return a.h ? rk(b.h, a.g) : rk(b.l, a.g)
        }
        return 0
    };
    var Sm = function(a, b, c, d) {
        dl.call(this, b, d);
        this.C = a;
        this.A = c
    };
    p(Sm, dl);
    Sm.prototype.getId = function() {
        return this.C
    }
    ;
    Sm.prototype.w = function() {
        return !0
    }
    ;
    Sm.prototype.l = function(a) {
        var b = a.oa()
          , c = a.getDuration();
        return Ua(this.A, function(d) {
            if (void 0 != d.g)
                var e = Rm(d, b);
            else
                b: {
                    switch (d.w) {
                    case "mtos":
                        e = d.h ? b.w.l : b.g.g;
                        break b;
                    case "tos":
                        e = d.h ? b.w.g : b.g.g;
                        break b
                    }
                    e = 0
                }
            0 == e ? d = !1 : (d = -1 != d.l ? d.l : void 0 !== c && 0 < c ? d.o * c : -1,
            d = -1 != d && e >= d);
            return d
        })
    }
    ;
    var Tm = function(a) {
        dl.call(this, "fully_viewable_audible_half_duration_impression", a)
    };
    p(Tm, dl);
    Tm.prototype.l = function(a) {
        var b = rk(a.oa().h, 1);
        return ol(a, b)
    }
    ;
    var Um = function(a, b) {
        dl.call(this, a, b)
    };
    p(Um, dl);
    Um.prototype.l = function(a) {
        return a.oa().Wa()
    }
    ;
    var Vm = function() {
        this.h = this.o = this.A = this.w = this.l = this.g = ""
    };
    var Wm = function() {}
      , Xm = function(a, b, c, d, e) {
        var f = {};
        if (void 0 !== a)
            if (null != b)
                for (var g in b) {
                    var h = b[g];
                    g in Object.prototype || null != h && (t(h) ? f[g] = h(a) : f[g] = a[h])
                }
            else
                Fb(f, a);
        void 0 !== c && Fb(f, c);
        a = dk(bk(new Zj, f));
        0 < a.length && void 0 !== d && void 0 !== e && (e = e(a),
        a += "&" + d + "=" + e);
        return a
    };
    var Ym = function() {};
    p(Ym, Wm);
    Ym.prototype.g = function(a) {
        var b = new Vm;
        b.g = Xm(a, Fm);
        b.l = Xm(a, Hm);
        return b
    }
    ;
    var Zm = new H(0,0,0,0)
      , $m = function(a, b, c) {
        Uj.call(this, null, a, b, c);
        this.A = a.vc()
    };
    p($m, Ul);
    m = $m.prototype;
    m.Bc = function() {
        this.l();
        return !0
    }
    ;
    m.Oa = function() {
        Ul.prototype.Ea.call(this)
    }
    ;
    m.cd = function() {}
    ;
    m.Kb = function() {}
    ;
    m.Ea = function() {
        this.l();
        Ul.prototype.Ea.call(this)
    }
    ;
    m.$a = function(a) {
        a = a.vc();
        a !== this.A && (a ? this.l() : (S.B().g = new H(0,0,0,0),
        this.g = new H(0,0,0,0),
        this.w = new H(0,0,0,0),
        this.timestamp = -1));
        this.A = a
    }
    ;
    var an = function(a, b, c) {
        $m.call(this, a, b, c)
    };
    p(an, $m);
    an.prototype.l = function() {
        var a = Ba("ima.admob.getViewability")
          , b = ki(this.I, "queryid");
        t(a) && b && a(b)
    }
    ;
    an.prototype.getName = function() {
        return "gsv"
    }
    ;
    var bn = function(a) {
        a = void 0 === a ? D : a;
        Vj.call(this, new Mj(a,2))
    };
    p(bn, Vj);
    bn.prototype.getName = function() {
        return "gsv"
    }
    ;
    bn.prototype.gb = function() {
        var a = S.B();
        Q.B();
        return a.l && !1
    }
    ;
    bn.prototype.ac = function(a, b, c) {
        return new an(this.g,b,c)
    }
    ;
    var cn = function(a, b, c) {
        $m.call(this, a, b, c)
    };
    p(cn, $m);
    cn.prototype.l = function() {
        var a = this
          , b = Ba("ima.bridge.getNativeViewability")
          , c = ki(this.I, "queryid");
        t(b) && c && b(c, function(d) {
            var e = d.opt_nativeViewVisibleBounds || {}
              , f = d.opt_nativeViewHidden;
            a.g = pj(d.opt_nativeViewBounds || {});
            var g = a.h.l();
            g.g = f ? Zm.clone() : pj(e);
            a.timestamp = d.opt_nativeTime || -1;
            S.B().g = g.g;
            d = d.opt_nativeVolume;
            void 0 !== d && (g.volume = d)
        })
    }
    ;
    cn.prototype.getName = function() {
        return "nis"
    }
    ;
    var dn = function(a) {
        a = void 0 === a ? D : a;
        Vj.call(this, new Mj(a,2))
    };
    p(dn, Vj);
    dn.prototype.Ac = function() {
        return 1 === ki(Q.B().I, "imams") && this.gb()
    }
    ;
    dn.prototype.getName = function() {
        return "nis"
    }
    ;
    dn.prototype.gb = function() {
        var a = S.B();
        Q.B();
        return a.l && !1
    }
    ;
    dn.prototype.ac = function(a, b, c) {
        return new cn(this.g,b,c)
    }
    ;
    var en = function() {
        Mj.call(this, D, 2, "mraid");
        this.$ = 0;
        this.J = this.K = !1;
        this.C = null;
        this.h = gj(this.la);
        this.w.g = new H(0,0,0,0);
        this.ma = !1
    };
    p(en, Mj);
    en.prototype.bc = function() {
        return null != this.h.ya
    }
    ;
    en.prototype.O = function() {
        var a = {};
        this.$ && (a.mraid = this.$);
        this.K && (a.mlc = 1);
        a.mtop = this.h.Jd;
        this.C && (a.mse = this.C);
        this.ma && (a.msc = 1);
        a.mcp = this.h.Nb;
        return a
    }
    ;
    en.prototype.H = function(a, b) {
        for (var c = [], d = 1; d < arguments.length; ++d)
            c[d - 1] = arguments[d];
        try {
            return this.h.ya[a].apply(this.h.ya, c)
        } catch (e) {
            Ui(538, e, .01, function(f) {
                f.method = a
            })
        }
    }
    ;
    var fn = function(a, b, c) {
        a.H("addEventListener", b, c)
    };
    en.prototype.Fc = function() {
        var a = this;
        if (this.F)
            return !this.zb();
        this.F = !0;
        if (2 === this.h.Nb)
            return this.C = "ng",
            Oj(this, "w"),
            !1;
        if (1 === this.h.Nb)
            return this.C = "mm",
            Oj(this, "w"),
            !1;
        var b;
        if (b = 1 != ki(Q.B().I, "mxd")) {
            a: switch (this.h.Jd) {
            case 0:
            case 3:
                b = !0;
                break a;
            default:
                b = !1
            }
            b = !b
        }
        if (b)
            return this.C = "if",
            Oj(this, "w"),
            !1;
        S.B().D = !0;
        this.la.document.readyState && "complete" == this.la.document.readyState ? gn(this) : jj(this.la, "load", function() {
            zi().setTimeout(Ti(292, function() {
                return gn(a)
            }), 100)
        }, 292);
        return !0
    }
    ;
    var gn = function(a) {
        Q.B().w = !!a.H("isViewable");
        fn(a, "viewableChange", hn);
        "loading" === a.H("getState") ? fn(a, "ready", jn) : kn(a)
    }
      , kn = function(a) {
        "string" === typeof a.h.ya.AFMA_LIDAR ? (a.K = !0,
        ln(a)) : (a.h.Nb = 3,
        a.C = "nc",
        Oj(a, "w"))
    }
      , ln = function(a) {
        a.J = !1;
        zi().setTimeout(Ti(524, function() {
            a.J || (mn(a),
            Ui(540, Error()),
            a.C = "mt",
            Oj(a, "w"))
        }), 500);
        nn(a);
        fn(a, a.h.ya.AFMA_LIDAR, on)
    }
      , nn = function(a) {
        var b = 1 == ki(Q.B().I, "sneio")
          , c = void 0 !== a.h.ya.AFMA_LIDAR_EXP_1
          , d = void 0 !== a.h.ya.AFMA_LIDAR_EXP_2;
        (b = b && d) && (a.h.ya.AFMA_LIDAR_EXP_2 = !0);
        c && (a.h.ya.AFMA_LIDAR_EXP_1 = !b)
    }
      , mn = function(a) {
        a.H("removeEventListener", a.h.ya.AFMA_LIDAR, on);
        a.K = !1
    };
    en.prototype.Y = function() {
        var a = S.B()
          , b = pn(this, "getMaxSize");
        a.g = new H(0,b.width,b.height,0)
    }
    ;
    en.prototype.Z = function() {
        S.B().w = pn(this, "getScreenSize")
    }
    ;
    var pn = function(a, b) {
        if ("loading" === a.H("getState"))
            return new E(-1,-1);
        b = a.H(b);
        if (!b)
            return new E(-1,-1);
        a = parseInt(b.width, 10);
        b = parseInt(b.height, 10);
        return isNaN(a) || isNaN(b) ? new E(-1,-1) : new E(a,b)
    };
    en.prototype.W = function() {
        mn(this);
        Mj.prototype.W.call(this)
    }
    ;
    var jn = function() {
        try {
            var a = en.B();
            a.H("removeEventListener", "ready", jn);
            kn(a)
        } catch (b) {
            Ui(541, b)
        }
    }
      , on = function(a, b) {
        try {
            var c = en.B();
            c.J = !0;
            var d = a ? new H(a.y,a.x + a.width,a.y + a.height,a.x) : new H(0,0,0,0);
            var e = R()
              , f = yj();
            var g = new Hj(e,f,c);
            g.g = d;
            g.volume = b;
            c.Oa(g)
        } catch (h) {
            Ui(542, h)
        }
    }
      , hn = function(a) {
        var b = Q.B()
          , c = en.B();
        a && !b.w && (b.w = !0,
        c.ma = !0,
        1 == ki(Q.B().I, "msp") && c.C && Oj(c, "w", !0))
    };
    Da(en);
    var rn = function() {
        this.l = this.N = !1;
        this.g = null;
        this.o = new Ym;
        this.h = null;
        var a = {};
        this.J = (a.start = this.se,
        a.firstquartile = this.ne,
        a.midpoint = this.pe,
        a.thirdquartile = this.te,
        a.complete = this.le,
        a.pause = this.Kc,
        a.resume = this.Gd,
        a.skip = this.re,
        a.viewable_impression = this.Na,
        a.mute = this.nb,
        a.unmute = this.nb,
        a.fullscreen = this.oe,
        a.exitfullscreen = this.me,
        a.fully_viewable_audible_half_duration_impression = this.Na,
        a.measurable_impression = this.Na,
        a.abandon = this.Kc,
        a.engagedview = this.Na,
        a.impression = this.Na,
        a.creativeview = this.Na,
        a.progress = this.nb,
        a.custom_metric_viewable = this.Na,
        a.bufferstart = this.Kc,
        a.bufferfinish = this.Gd,
        a);
        a = {};
        this.P = (a.overlay_resize = this.qe,
        a.abandon = this.rc,
        a.close = this.rc,
        a.collapse = this.rc,
        a.overlay_unmeasurable_impression = function(b) {
            return xl(b, "overlay_unmeasurable_impression", yj())
        }
        ,
        a.overlay_viewable_immediate_impression = function(b) {
            return xl(b, "overlay_viewable_immediate_impression", yj())
        }
        ,
        a.overlay_unviewable_impression = function(b) {
            return xl(b, "overlay_unviewable_impression", yj())
        }
        ,
        a.overlay_viewable_end_of_session_impression = function(b) {
            return xl(b, "overlay_viewable_end_of_session_impression", yj())
        }
        ,
        a);
        Q.B().l = 3;
        qn(this)
    };
    rn.prototype.A = function(a) {
        Ck(a, !1);
        Pl(a)
    }
    ;
    rn.prototype.C = function() {}
    ;
    var sn = function(a, b, c, d) {
        b = a.M(null, d, !0, b);
        b.w = c;
        b.Xb = function(e) {
            a.D(e)
        }
        ;
        Ql([b]);
        return b
    };
    rn.prototype.M = function(a, b, c, d) {
        this.h || (this.h = this.fd());
        b = c ? b : -1;
        null == this.h || this.l ? a = new il(D,a,b,7) : (c = this.h,
        a = new il(D,a,b,7,new dl("measurable_impression",this.h),[new Um("viewable_impression",c), new Tm(c)]));
        a.ga = d;
        d = a.I;
        d.g.queryid || (d.g.queryid = new hi);
        ji(a.I, "queryid", a.ga);
        a.Lc("");
        return a
    }
    ;
    var tn = function(a, b, c) {
        Sh(b);
        var d = a.h;
        z(b, function(e) {
            var f = Sa(e.g, function(g) {
                var h = Qm(g);
                if (null == h)
                    g = null;
                else if (g = new Pm,
                null != h.visible && (g.g = h.visible / 100),
                null != h.audible && (g.h = 1 == h.audible),
                null != h.time) {
                    var k = "mtos" == h.timetype ? "mtos" : "tos"
                      , l = Qb(h.time, "%") ? "%" : "ms";
                    h = parseInt(h.time, 10);
                    "%" == l && (h /= 100);
                    "ms" == l ? (g.l = h,
                    g.o = -1) : (g.l = -1,
                    g.o = h);
                    g.w = void 0 === k ? "tos" : k
                }
                return g
            });
            Ua(f, function(g) {
                return null == g
            }) || pl(c, new Sm(e.id,e.event,f,d))
        })
    }
      , un = function() {
        var a = [];
        S.B();
        var b = Q.B();
        "exc" != b.U && a.push(fm.B());
        ki(b.I, "mvp_lv") && a.push(en.B());
        var c = [new bn, new dn];
        if ("exc" != b.U) {
            var d = 1 == ki(b.I, "lvio");
            b = 1 == ki(b.I, "etl");
            (d || b) && c.push(new dm(D))
        }
        c.push(new Wl(a));
        return c
    }
      , wn = function(a) {
        if (!a.N) {
            a.N = !0;
            try {
                var b = R()
                  , c = Q.B()
                  , d = S.B();
                Xi = b;
                c.o = 79463069;
                "o" !== a.g && (tm = Kf(D).la);
                if (1 === ki(c.I, "imams") || "nis" !== c.U)
                    if (Ai()) {
                        lm.g.Xc = 0;
                        lm.g.tc = R() - b;
                        var e = un()
                          , f = Sl.B();
                        f.h = e;
                        Tl(f, function() {
                            vn()
                        }) ? lm.done || (rm(),
                        Pj(f.g.g, a),
                        nm()) : d.h && "exc" !== c.U ? vn() : nm()
                    } else
                        vm = !0
            } catch (g) {
                throw Ml.reset(),
                g;
            }
        }
    }
      , xn = function(a) {
        lm.l.cancel();
        um = a;
        lm.done = !0
    }
      , yn = function(a) {
        var b = Q.B();
        if (a.g)
            return a.g;
        var c = Sl.B().g;
        if (c)
            switch (c.getName()) {
            case "nis":
                a.g = "n";
                break;
            case "gsv":
                a.g = "m"
            }
        else
            switch (b.U) {
            case "nis":
                a.g = "n"
            }
        a.g || (a.g = "h");
        return a.g
    }
      , zn = function(a, b, c) {
        if (null == a.h)
            return b.pb |= 4,
            !1;
        a = a.h.report(c, b);
        b.pb |= a;
        return 0 == a
    };
    rn.prototype.$a = function(a) {
        switch (a.Fa()) {
        case 0:
            if (a = Sl.B().g)
                a = a.g,
                $a(a.A, this),
                a.D && this.Ca() && Sj(a);
            vn();
            break;
        case 2:
            nm()
        }
    }
    ;
    rn.prototype.Oa = function() {}
    ;
    rn.prototype.Ca = function() {
        return !1
    }
    ;
    var vn = function() {
        var a = [new dm(D)]
          , b = Sl.B();
        b.h = a;
        Tl(b, function() {
            xn("i")
        }) ? lm.done || (rm(),
        nm()) : xn("i")
    };
    rn.prototype.O = function(a, b) {
        a.Ga = !0;
        switch (a.ua()) {
        case 1:
            An(this, a, b);
            break;
        case 2:
            this.Nc(a)
        }
        this.Pc(a)
    }
    ;
    var An = function(a, b, c) {
        if (!b.md) {
            var d = xl(b, "start", yj());
            a = a.o.g(d).g;
            var e = {};
            e.r = c;
            e.v = "817v";
            ne(a, function(f, g) {
                return e[f] = "mtos" == f || "tos" == f ? g : encodeURIComponent(g)
            });
            c = wm();
            ne(c, function(f, g) {
                return e[f] = encodeURIComponent(g)
            });
            e.id = "lidarvf";
            c = "//pagead2.googlesyndication.com/pagead/gen_204?" + dk(bk(new Zj, e));
            hk(c);
            b.md = !0
        }
    };
    m = rn.prototype;
    m.se = function(a) {
        ul(a, 0);
        return xl(a, "start", yj())
    }
    ;
    m.nb = function(a, b, c) {
        om(lm, [a], !yj());
        return this.Na(a, b, c)
    }
    ;
    m.Na = function(a, b, c) {
        return xl(a, c, yj())
    }
    ;
    m.ne = function(a) {
        return Bn(a, "firstquartile", 1)
    }
    ;
    m.pe = function(a) {
        a.tb = !0;
        return Bn(a, "midpoint", 2)
    }
    ;
    m.te = function(a) {
        return Bn(a, "thirdquartile", 3)
    }
    ;
    m.le = function(a) {
        var b = Bn(a, "complete", 4);
        0 != a.da && (a.da = 3);
        return b
    }
    ;
    var Bn = function(a, b, c) {
        om(lm, [a], !yj());
        ul(a, c);
        4 != c && tl(a.P, c, a.Pb);
        return xl(a, b, yj())
    };
    m = rn.prototype;
    m.Gd = function(a, b, c) {
        b = yj();
        if (2 == a.da && !b) {
            var d = R();
            a.oa().H = d
        }
        om(lm, [a], !b);
        2 == a.da && (a.da = 1);
        return xl(a, c, b)
    }
    ;
    m.re = function(a, b) {
        b = this.nb(a, b || {}, "skip");
        0 != a.da && (a.da = 3);
        return b
    }
    ;
    m.oe = function(a, b) {
        Ck(a, !0);
        return this.nb(a, b || {}, "fullscreen")
    }
    ;
    m.me = function(a, b) {
        Ck(a, !1);
        return this.nb(a, b || {}, "exitfullscreen")
    }
    ;
    m.Kc = function(a, b, c) {
        b = a.oa();
        var d = R();
        b.P = bl(b, d, 1 != a.da);
        om(lm, [a], !yj());
        1 == a.da && (a.da = 2);
        return xl(a, c, yj())
    }
    ;
    m.qe = function(a) {
        om(lm, [a], !yj());
        return a.h()
    }
    ;
    m.rc = function(a) {
        om(lm, [a], !yj());
        this.Fd(a);
        0 != a.da && (a.da = 3);
        return a.h()
    }
    ;
    var Cn = function(a, b, c) {
        if (0 == b.da) {
            "i" != um && (lm.done = !1);
            var d = Sl.B();
            null != d.g && Ek(b, d.g);
            Lk(b, function(e) {
                for (var f = [], g = 0; g < arguments.length; ++g)
                    f[g - 0] = arguments[g];
                return a.O.apply(a, ca(f))
            });
            b.ia.Pa && gm.B();
            c = void 0 !== c ? c.opt_nativeTime : void 0;
            Zi = c = "number" === typeof c ? c : R();
            b.Ob = !0;
            d = yj();
            jl(b, c, d);
            om(lm, [b], !d)
        }
    }
      , qn = function(a) {
        sm(function() {
            var b = Dn();
            null != a.g && (b.sdk = a.g);
            b.avms = Q.B().U;
            return b
        })
    }
      , En = function(a, b, c, d) {
        var e = Kl(Ml, c);
        null !== e && e.ga !== b && (a.A(e),
        e = null);
        e || (b = a.M(c, R(), !1, b),
        (c = Sl.B().g) && Ek(b, c),
        b.Xb = Ma(a.D, a),
        0 == Ml.h.length && (Q.B().o = 79463069),
        Rl([b]),
        nm(),
        e = b,
        e.w = yn(a),
        d && (e.Qa = d));
        return e
    };
    rn.prototype.D = function() {}
    ;
    var Gn = function(a, b) {
        b.F = 0;
        for (var c in bj)
            null == a[c] && (b.F |= bj[c]);
        Fn(a, "currentTime");
        Fn(a, "duration")
    };
    m = rn.prototype;
    m.Nc = function() {}
    ;
    m.Fd = function() {}
    ;
    m.wd = function() {}
    ;
    m.Pc = function() {}
    ;
    m.fd = function() {}
    ;
    var Fn = function(a, b) {
        var c = a[b];
        void 0 !== c && 0 < c && (a[b] = Math.floor(1E3 * c))
    }
      , Dn = function() {
        var a = S.B()
          , b = {};
        return b.sv = "817",
        b["if"] = a.h ? "1" : "0",
        b.nas = String(Ml.g.length),
        b
    };
    var Hn = v()
      , In = !1
      , Jn = !1
      , Kn = !1
      , Ln = function(a) {
        return !a || "function" !== typeof a || 0 > String(Function.prototype.toString).indexOf("[native code]") ? !1 : 0 <= String(a).indexOf("[native code]") && !0 || !1
    }
      , Mn = function(a) {
        return !!(1 << a & Hn)
    }
      , Nn = [function(a) {
        return !(!a.chrome || !a.chrome.webstore)
    }
    , function(a) {
        return !!a.document.documentMode
    }
    , function(a) {
        return !!a.document.fonts.ready
    }
    , function() {
        return Mn(0)
    }
    , function(a) {
        return !!a.ActiveXObject
    }
    , function(a) {
        return !!a.chrome
    }
    , function(a) {
        return !!a.navigator.serviceWorker
    }
    , function(a) {
        return !!a.opera
    }
    , function(a) {
        return !!a.sidebar
    }
    , function() {
        return !+"\v1"
    }
    , function() {
        return Mn(1)
    }
    , function(a) {
        return !a.ActiveXObject
    }
    , function(a) {
        return "-ms-ime-align"in a.document.documentElement.style
    }
    , function(a) {
        return "-ms-scroll-limit"in a.document.documentElement.style
    }
    , function(a) {
        return "-webkit-font-feature-settings"in a.document.body.style
    }
    , function() {
        return Mn(2)
    }
    , function(a) {
        return "ActiveXObject"in a
    }
    , function(a) {
        return "MozAppearance"in a.document.documentElement.style
    }
    , function(a) {
        return "_phantom"in a
    }
    , function(a) {
        return "callPhantom"in a
    }
    , function(a) {
        return "content"in a.document.createElement("template")
    }
    , function(a) {
        return "getEntriesByType"in a.performance
    }
    , function() {
        return Mn(3)
    }
    , function(a) {
        return "image-rendering"in a.document.body.style
    }
    , function(a) {
        return "object-fit"in a.document.body.style
    }
    , function(a) {
        return "open"in a.document.createElement("details")
    }
    , function(a) {
        return "orientation"in a.screen
    }
    , function(a) {
        return "performance"in a
    }
    , function(a) {
        return "shape-image-threshold"in a.document.body.style
    }
    , function() {
        return Mn(4)
    }
    , function(a) {
        return "srcset"in a.document.createElement("img")
    }
    , function() {
        return Jn
    }
    , function() {
        return Kn
    }
    , function() {
        return Mn(5)
    }
    , function(a) {
        a = a.document.createElement("div");
        a.style.width = "1px";
        a.style.width = "-webkit-min-content";
        a.style.width = "min-content";
        return "1px" != a.style.width
    }
    , function(a) {
        a = a.document.createElement("div");
        a.style.width = "1px";
        a.style.width = "calc(1px - 1px)";
        a.style.width = "-webkit-calc(1px - 1px)";
        return "1px" != a.style.width
    }
    , function() {
        var a = !1;
        eval('var DummyFunction1 = function(x){ "use strict"; var a = 12; b = a + x*35; }');
        try {
            DummyFunction1()
        } catch (b) {
            a = !0
        }
        return a
    }
    , function() {
        var a = !1;
        try {
            DummyFunction2()
        } catch (b) {
            a = !0
        }
        return a
    }
    , function() {
        return !1
    }
    , function() {
        return Mn(6)
    }
    , function(a) {
        var b = a.document.createElement("canvas");
        b.width = b.height = 1;
        b = b.getContext("2d");
        b.globalCompositeOperation = "multiply";
        b.fillStyle = "rgb(0,255,255)";
        b.fillRect(0, 0, 1, 1);
        b.fill();
        b.fillStyle = "rgb(255,255,0)";
        b.fillRect(0, 0, 1, 1);
        b.fill();
        b = b.getImageData(0, 0, 1, 1).data;
        return b[0] == b[2] && b[1] == b[3] || Ln(a.navigator.vibrate)
    }
    , function(a) {
        a = a.document.createElement("canvas");
        a.width = a.height = 1;
        a = a.getContext("2d");
        a.globalCompositeOperation = "multiply";
        a.fillStyle = "rgb(0,255,255)";
        a.fillRect(0, 0, 1, 1);
        a.fill();
        a.fillStyle = "rgb(255,255,0)";
        a.fillRect(0, 0, 1, 1);
        a.fill();
        a = a.getImageData(0, 0, 1, 1).data;
        return a[0] == a[2] && a[1] == a[3]
    }
    , function(a) {
        return Ln(a.document.createElement("div").matches)
    }
    , function(a) {
        a = a.document.createElement("input");
        a.setAttribute("type", "range");
        return "text" !== a.type
    }
    , function(a) {
        return a.CSS.supports("image-rendering", "pixelated")
    }
    , function(a) {
        return a.CSS.supports("object-fit", "contain")
    }
    , function() {
        return Mn(7)
    }
    , function(a) {
        return a.CSS.supports("object-fit", "inherit")
    }
    , function(a) {
        return a.CSS.supports("shape-image-threshold", "0.9")
    }
    , function(a) {
        return a.CSS.supports("word-break", "keep-all")
    }
    , function() {
        return eval("1 == [for (item of [1,2,3]) item][0]")
    }
    , function(a) {
        return Ln(a.CSS.supports)
    }
    , function() {
        return Ln(Intl.Collator)
    }
    , function(a) {
        return Ln(a.document.createElement("dialog").show)
    }
    , function() {
        return Mn(8)
    }
    , function(a) {
        return Ln(a.document.createElement("div").animate([{
            transform: "scale(1)",
            easing: "ease-in"
        }, {
            transform: "scale(1.3)",
            easing: "ease-in"
        }], {
            duration: 1300,
            iterations: 1
        }).reverse)
    }
    , function(a) {
        return Ln(a.document.createElement("div").animate)
    }
    , function(a) {
        return Ln(a.document.documentElement.webkitRequestFullScreen)
    }
    , function(a) {
        return Ln(a.navigator.getBattery)
    }
    , function(a) {
        return Ln(a.navigator.permissions.query)
    }
    , function() {
        return !1
    }
    , function() {
        return Mn(9)
    }
    , function() {
        return Ln(webkitRequestAnimationFrame)
    }
    , function(a) {
        return Ln(a.BroadcastChannel.call)
    }
    , function(a) {
        return Ln(a.FontFace)
    }
    , function(a) {
        return Ln(a.Gamepad)
    }
    , function() {
        return Mn(10)
    }
    , function(a) {
        return Ln(a.MutationEvent)
    }
    , function(a) {
        return Ln(a.MutationObserver)
    }
    , function(a) {
        return Ln(a.crypto.getRandomValues)
    }
    , function(a) {
        return Ln(a.document.body.createShadowRoot)
    }
    , function(a) {
        return Ln(a.document.body.webkitCreateShadowRoot)
    }
    , function(a) {
        return Ln(a.fetch)
    }
    , function() {
        return Mn(11)
    }
    , function(a) {
        return Ln(a.navigator.serviceWorker.register)
    }
    , function(a) {
        return Ln(a.navigator.webkitGetGamepads)
    }
    , function(a) {
        return Ln(a.speechSynthesis.speak)
    }
    , function(a) {
        return Ln(a.webkitRTCPeerConnection)
    }
    , function(a) {
        return a.CSS.supports("--fake-var", "0")
    }
    , function() {
        return Mn(12)
    }
    , function(a) {
        return a.CSS.supports("cursor", "grab")
    }
    , function(a) {
        return a.CSS.supports("cursor", "zoom-in")
    }
    , function(a) {
        return a.CSS.supports("image-orientation", "270deg")
    }
    , function() {
        return Mn(13)
    }
    , function(a) {
        return a.CSS.supports("position", "sticky")
    }
    , function(a) {
        return void 0 === a.document.createElement("style").scoped
    }
    , function(a) {
        return a.performance.getEntriesByType("resource")instanceof Array
    }
    , function() {
        return "undefined" == typeof InstallTrigger
    }
    , function() {
        return "object" == typeof (new Intl.Collator).resolvedOptions()
    }
    , function(a) {
        return "boolean" == typeof a.navigator.onLine
    }
    , function() {
        return Mn(14)
    }
    , function(a) {
        return "undefined" == typeof a.navigator.yh
    }
    , function(a) {
        return "number" == typeof a.performance.now()
    }
    , function() {
        return 0 == (new Uint16Array(1))[0]
    }
    , function(a) {
        return -1 == a.ActiveXObject.toString().indexOf("native")
    }
    , function(a) {
        return -1 == Object.prototype.toString.call(a.HTMLElement).indexOf("Constructor")
    }
    ]
      , On = [function(a) {
        a = a.document.createElement("div");
        var b = null
          , c = ["{45EA75A0-A269-11D1-B5BF-0000F8051515}", "{3AF36230-A269-11D1-B5BF-0000F8051515}", "{89820200-ECBD-11CF-8B85-00AA005B4383}"];
        try {
            a.style.behavior = "url(#default#clientcaps)"
        } catch (e) {}
        for (var d = 0; d < c.length; d++) {
            try {
                b = a.getComponentVersion(c[d], "componentid").replace(/,/g, ".")
            } catch (e) {}
            if (b)
                return b.split(".")[0]
        }
        return !1
    }
    , function() {
        return (new Date).getTimezoneOffset()
    }
    , function(a) {
        return (a.innerWidth || a.document.documentElement.clientWidth || a.document.body.clientWidth) / (a.innerHeight || a.document.documentElement.clientHeight || a.document.body.clientHeight)
    }
    , function(a) {
        return (a.outerWidth || a.document && a.document.body && a.document.body.offsetWidth) / (a.outerHeight || a.document && a.document.body && a.document.body.offsetHeight)
    }
    , function(a) {
        return a.screen.availWidth / a.screen.availHeight
    }
    , function(a) {
        return a.screen.width / a.screen.height
    }
    ]
      , Pn = [function(a) {
        return a.navigator.userAgent
    }
    , function(a) {
        return a.navigator.platform
    }
    , function(a) {
        return a.navigator.vendor
    }
    ]
      , Rn = function() {
        try {
            Qn()
        } catch (d) {}
        var a = "a=1&b=" + Hn + "&"
          , b = []
          , c = 99;
        z(Nn, function(d, e) {
            var f = !1;
            try {
                f = d(D)
            } catch (g) {}
            b[e / 32 >>> 0] |= f << e % 32
        });
        z(b, function(d, e) {
            a += String.fromCharCode(c + e) + "=" + (d >>> 0).toString(16) + "&"
        });
        c = 105;
        z(On, function(d) {
            var e = "false";
            try {
                e = d(D)
            } catch (f) {}
            a += String.fromCharCode(c++) + "=" + e + "&"
        });
        z(Pn, function(d) {
            var e = "";
            try {
                var f = d(D);
                d = [];
                for (var g = 0, h = 0; h < f.length; h++) {
                    var k = f.charCodeAt(h);
                    255 < k && (d[g++] = k & 255,
                    k >>= 8);
                    d[g++] = k
                }
                e = ld(d, 3)
            } catch (l) {}
            a += String.fromCharCode(c++) + "=" + e + "&"
        });
        return a.slice(0, -1)
    }
      , Qn = function() {
        if (!In) {
            var a = function() {
                Jn = !0;
                D.document.removeEventListener("webdriver-evaluate", a, !0)
            };
            D.document.addEventListener("webdriver-evaluate", a, !0);
            var b = function() {
                Kn = !0;
                D.document.removeEventListener("webdriver-evaluate-response", b, !0)
            };
            D.document.addEventListener("webdriver-evaluate-response", b, !0);
            In = !0
        }
    };
    var Sn = function() {
        this.h = 64;
        this.g = Array(4);
        this.w = Array(this.h);
        this.o = this.l = 0;
        this.reset()
    };
    y(Sn, wh);
    Sn.prototype.reset = function() {
        this.g[0] = 1732584193;
        this.g[1] = 4023233417;
        this.g[2] = 2562383102;
        this.g[3] = 271733878;
        this.o = this.l = 0
    }
    ;
    var Tn = function(a, b, c) {
        c || (c = 0);
        var d = Array(16);
        if ("string" === typeof b)
            for (var e = 0; 16 > e; ++e)
                d[e] = b.charCodeAt(c++) | b.charCodeAt(c++) << 8 | b.charCodeAt(c++) << 16 | b.charCodeAt(c++) << 24;
        else
            for (e = 0; 16 > e; ++e)
                d[e] = b[c++] | b[c++] << 8 | b[c++] << 16 | b[c++] << 24;
        b = a.g[0];
        c = a.g[1];
        e = a.g[2];
        var f = a.g[3];
        var g = b + (f ^ c & (e ^ f)) + d[0] + 3614090360 & 4294967295;
        b = c + (g << 7 & 4294967295 | g >>> 25);
        g = f + (e ^ b & (c ^ e)) + d[1] + 3905402710 & 4294967295;
        f = b + (g << 12 & 4294967295 | g >>> 20);
        g = e + (c ^ f & (b ^ c)) + d[2] + 606105819 & 4294967295;
        e = f + (g << 17 & 4294967295 | g >>> 15);
        g = c + (b ^ e & (f ^ b)) + d[3] + 3250441966 & 4294967295;
        c = e + (g << 22 & 4294967295 | g >>> 10);
        g = b + (f ^ c & (e ^ f)) + d[4] + 4118548399 & 4294967295;
        b = c + (g << 7 & 4294967295 | g >>> 25);
        g = f + (e ^ b & (c ^ e)) + d[5] + 1200080426 & 4294967295;
        f = b + (g << 12 & 4294967295 | g >>> 20);
        g = e + (c ^ f & (b ^ c)) + d[6] + 2821735955 & 4294967295;
        e = f + (g << 17 & 4294967295 | g >>> 15);
        g = c + (b ^ e & (f ^ b)) + d[7] + 4249261313 & 4294967295;
        c = e + (g << 22 & 4294967295 | g >>> 10);
        g = b + (f ^ c & (e ^ f)) + d[8] + 1770035416 & 4294967295;
        b = c + (g << 7 & 4294967295 | g >>> 25);
        g = f + (e ^ b & (c ^ e)) + d[9] + 2336552879 & 4294967295;
        f = b + (g << 12 & 4294967295 | g >>> 20);
        g = e + (c ^ f & (b ^ c)) + d[10] + 4294925233 & 4294967295;
        e = f + (g << 17 & 4294967295 | g >>> 15);
        g = c + (b ^ e & (f ^ b)) + d[11] + 2304563134 & 4294967295;
        c = e + (g << 22 & 4294967295 | g >>> 10);
        g = b + (f ^ c & (e ^ f)) + d[12] + 1804603682 & 4294967295;
        b = c + (g << 7 & 4294967295 | g >>> 25);
        g = f + (e ^ b & (c ^ e)) + d[13] + 4254626195 & 4294967295;
        f = b + (g << 12 & 4294967295 | g >>> 20);
        g = e + (c ^ f & (b ^ c)) + d[14] + 2792965006 & 4294967295;
        e = f + (g << 17 & 4294967295 | g >>> 15);
        g = c + (b ^ e & (f ^ b)) + d[15] + 1236535329 & 4294967295;
        c = e + (g << 22 & 4294967295 | g >>> 10);
        g = b + (e ^ f & (c ^ e)) + d[1] + 4129170786 & 4294967295;
        b = c + (g << 5 & 4294967295 | g >>> 27);
        g = f + (c ^ e & (b ^ c)) + d[6] + 3225465664 & 4294967295;
        f = b + (g << 9 & 4294967295 | g >>> 23);
        g = e + (b ^ c & (f ^ b)) + d[11] + 643717713 & 4294967295;
        e = f + (g << 14 & 4294967295 | g >>> 18);
        g = c + (f ^ b & (e ^ f)) + d[0] + 3921069994 & 4294967295;
        c = e + (g << 20 & 4294967295 | g >>> 12);
        g = b + (e ^ f & (c ^ e)) + d[5] + 3593408605 & 4294967295;
        b = c + (g << 5 & 4294967295 | g >>> 27);
        g = f + (c ^ e & (b ^ c)) + d[10] + 38016083 & 4294967295;
        f = b + (g << 9 & 4294967295 | g >>> 23);
        g = e + (b ^ c & (f ^ b)) + d[15] + 3634488961 & 4294967295;
        e = f + (g << 14 & 4294967295 | g >>> 18);
        g = c + (f ^ b & (e ^ f)) + d[4] + 3889429448 & 4294967295;
        c = e + (g << 20 & 4294967295 | g >>> 12);
        g = b + (e ^ f & (c ^ e)) + d[9] + 568446438 & 4294967295;
        b = c + (g << 5 & 4294967295 | g >>> 27);
        g = f + (c ^ e & (b ^ c)) + d[14] + 3275163606 & 4294967295;
        f = b + (g << 9 & 4294967295 | g >>> 23);
        g = e + (b ^ c & (f ^ b)) + d[3] + 4107603335 & 4294967295;
        e = f + (g << 14 & 4294967295 | g >>> 18);
        g = c + (f ^ b & (e ^ f)) + d[8] + 1163531501 & 4294967295;
        c = e + (g << 20 & 4294967295 | g >>> 12);
        g = b + (e ^ f & (c ^ e)) + d[13] + 2850285829 & 4294967295;
        b = c + (g << 5 & 4294967295 | g >>> 27);
        g = f + (c ^ e & (b ^ c)) + d[2] + 4243563512 & 4294967295;
        f = b + (g << 9 & 4294967295 | g >>> 23);
        g = e + (b ^ c & (f ^ b)) + d[7] + 1735328473 & 4294967295;
        e = f + (g << 14 & 4294967295 | g >>> 18);
        g = c + (f ^ b & (e ^ f)) + d[12] + 2368359562 & 4294967295;
        c = e + (g << 20 & 4294967295 | g >>> 12);
        g = b + (c ^ e ^ f) + d[5] + 4294588738 & 4294967295;
        b = c + (g << 4 & 4294967295 | g >>> 28);
        g = f + (b ^ c ^ e) + d[8] + 2272392833 & 4294967295;
        f = b + (g << 11 & 4294967295 | g >>> 21);
        g = e + (f ^ b ^ c) + d[11] + 1839030562 & 4294967295;
        e = f + (g << 16 & 4294967295 | g >>> 16);
        g = c + (e ^ f ^ b) + d[14] + 4259657740 & 4294967295;
        c = e + (g << 23 & 4294967295 | g >>> 9);
        g = b + (c ^ e ^ f) + d[1] + 2763975236 & 4294967295;
        b = c + (g << 4 & 4294967295 | g >>> 28);
        g = f + (b ^ c ^ e) + d[4] + 1272893353 & 4294967295;
        f = b + (g << 11 & 4294967295 | g >>> 21);
        g = e + (f ^ b ^ c) + d[7] + 4139469664 & 4294967295;
        e = f + (g << 16 & 4294967295 | g >>> 16);
        g = c + (e ^ f ^ b) + d[10] + 3200236656 & 4294967295;
        c = e + (g << 23 & 4294967295 | g >>> 9);
        g = b + (c ^ e ^ f) + d[13] + 681279174 & 4294967295;
        b = c + (g << 4 & 4294967295 | g >>> 28);
        g = f + (b ^ c ^ e) + d[0] + 3936430074 & 4294967295;
        f = b + (g << 11 & 4294967295 | g >>> 21);
        g = e + (f ^ b ^ c) + d[3] + 3572445317 & 4294967295;
        e = f + (g << 16 & 4294967295 | g >>> 16);
        g = c + (e ^ f ^ b) + d[6] + 76029189 & 4294967295;
        c = e + (g << 23 & 4294967295 | g >>> 9);
        g = b + (c ^ e ^ f) + d[9] + 3654602809 & 4294967295;
        b = c + (g << 4 & 4294967295 | g >>> 28);
        g = f + (b ^ c ^ e) + d[12] + 3873151461 & 4294967295;
        f = b + (g << 11 & 4294967295 | g >>> 21);
        g = e + (f ^ b ^ c) + d[15] + 530742520 & 4294967295;
        e = f + (g << 16 & 4294967295 | g >>> 16);
        g = c + (e ^ f ^ b) + d[2] + 3299628645 & 4294967295;
        c = e + (g << 23 & 4294967295 | g >>> 9);
        g = b + (e ^ (c | ~f)) + d[0] + 4096336452 & 4294967295;
        b = c + (g << 6 & 4294967295 | g >>> 26);
        g = f + (c ^ (b | ~e)) + d[7] + 1126891415 & 4294967295;
        f = b + (g << 10 & 4294967295 | g >>> 22);
        g = e + (b ^ (f | ~c)) + d[14] + 2878612391 & 4294967295;
        e = f + (g << 15 & 4294967295 | g >>> 17);
        g = c + (f ^ (e | ~b)) + d[5] + 4237533241 & 4294967295;
        c = e + (g << 21 & 4294967295 | g >>> 11);
        g = b + (e ^ (c | ~f)) + d[12] + 1700485571 & 4294967295;
        b = c + (g << 6 & 4294967295 | g >>> 26);
        g = f + (c ^ (b | ~e)) + d[3] + 2399980690 & 4294967295;
        f = b + (g << 10 & 4294967295 | g >>> 22);
        g = e + (b ^ (f | ~c)) + d[10] + 4293915773 & 4294967295;
        e = f + (g << 15 & 4294967295 | g >>> 17);
        g = c + (f ^ (e | ~b)) + d[1] + 2240044497 & 4294967295;
        c = e + (g << 21 & 4294967295 | g >>> 11);
        g = b + (e ^ (c | ~f)) + d[8] + 1873313359 & 4294967295;
        b = c + (g << 6 & 4294967295 | g >>> 26);
        g = f + (c ^ (b | ~e)) + d[15] + 4264355552 & 4294967295;
        f = b + (g << 10 & 4294967295 | g >>> 22);
        g = e + (b ^ (f | ~c)) + d[6] + 2734768916 & 4294967295;
        e = f + (g << 15 & 4294967295 | g >>> 17);
        g = c + (f ^ (e | ~b)) + d[13] + 1309151649 & 4294967295;
        c = e + (g << 21 & 4294967295 | g >>> 11);
        g = b + (e ^ (c | ~f)) + d[4] + 4149444226 & 4294967295;
        b = c + (g << 6 & 4294967295 | g >>> 26);
        g = f + (c ^ (b | ~e)) + d[11] + 3174756917 & 4294967295;
        f = b + (g << 10 & 4294967295 | g >>> 22);
        g = e + (b ^ (f | ~c)) + d[2] + 718787259 & 4294967295;
        e = f + (g << 15 & 4294967295 | g >>> 17);
        g = c + (f ^ (e | ~b)) + d[9] + 3951481745 & 4294967295;
        a.g[0] = a.g[0] + b & 4294967295;
        a.g[1] = a.g[1] + (e + (g << 21 & 4294967295 | g >>> 11)) & 4294967295;
        a.g[2] = a.g[2] + e & 4294967295;
        a.g[3] = a.g[3] + f & 4294967295
    }
      , Un = function(a, b) {
        if (void 0 === c)
            var c = b.length;
        for (var d = c - a.h, e = a.w, f = a.l, g = 0; g < c; ) {
            if (0 == f)
                for (; g <= d; )
                    Tn(a, b, g),
                    g += a.h;
            if ("string" === typeof b)
                for (; g < c; ) {
                    if (e[f++] = b.charCodeAt(g++),
                    f == a.h) {
                        Tn(a, e);
                        f = 0;
                        break
                    }
                }
            else
                for (; g < c; )
                    if (e[f++] = b[g++],
                    f == a.h) {
                        Tn(a, e);
                        f = 0;
                        break
                    }
        }
        a.l = f;
        a.o += c
    };
    var Vn = function() {
        this.h = null
    };
    p(Vn, Ym);
    Vn.prototype.g = function(a) {
        var b = Ym.prototype.g.call(this, a);
        var c = Hn = v();
        var d = Mn(5);
        c = (Jn ? !d : d) ? c | 2 : c & -3;
        d = Mn(2);
        c = (Kn ? !d : d) ? c | 8 : c & -9;
        c = {
            s1: (c >>> 0).toString(16)
        };
        this.h || (this.h = Rn());
        b.w = this.h;
        b.A = Xm(a, Gm, c, "h", Wn("kArwaWEsTs"));
        b.o = Xm(a, Im, {}, "h", Wn("b96YPMzfnx"));
        b.h = Xm(a, Jm, {}, "h", Wn("yb8Wev6QDg"));
        return b
    }
    ;
    var Wn = function(a) {
        return function(b) {
            var c = new Sn;
            Un(c, b + a);
            var d = Array((56 > c.l ? c.h : 2 * c.h) - c.l);
            d[0] = 128;
            for (b = 1; b < d.length - 8; ++b)
                d[b] = 0;
            var e = 8 * c.o;
            for (b = d.length - 8; b < d.length; ++b)
                d[b] = e & 255,
                e /= 256;
            Un(c, d);
            d = Array(16);
            for (b = e = 0; 4 > b; ++b)
                for (var f = 0; 32 > f; f += 8)
                    d[e++] = c.g[b] >>> f & 255;
            return ib(d).slice(-8)
        }
    };
    var Xn = function(a, b) {
        this.h = a;
        this.l = b
    };
    Xn.prototype.report = function(a, b) {
        var c = this.g(b);
        if (t(c)) {
            var d = {};
            d = (d.sv = "817",
            d.cb = "j",
            d.e = Yn(a),
            d);
            var e = xl(b, a, yj());
            Fb(d, e);
            b.ud[a] = e;
            d = 2 == b.ua() ? fk(d).join("&") : this.l.g(d).g;
            try {
                return c(b.ga, d, a),
                0
            } catch (f) {
                return 2
            }
        } else
            return 1
    }
    ;
    var Yn = function(a) {
        var b = Mm(a) ? "custom_metric_viewable" : a;
        a = Ab(function(c) {
            return c == b
        });
        return fj[a]
    };
    Xn.prototype.g = function() {
        return Ba(this.h)
    }
    ;
    var Zn = function(a, b, c) {
        Xn.call(this, a, b);
        this.o = c
    };
    p(Zn, Xn);
    Zn.prototype.g = function(a) {
        if (!a.Qa)
            return Xn.prototype.g.call(this, a);
        if (this.o[a.Qa])
            return function() {}
            ;
        Ui(393, Error());
        return null
    }
    ;
    var $n = function() {
        rn.call(this);
        this.H = void 0;
        this.G = null;
        this.F = !1;
        this.w = {};
        this.K = 0;
        this.o = new Vn
    };
    p($n, rn);
    $n.prototype.C = function(a, b) {
        var c = this
          , d = Q.B()
          , e = Sl.B();
        if (null != e.g)
            switch (e.g.getName()) {
            case "nis":
                var f = ao(this, a, b);
                break;
            case "gsv":
                f = bo(this, a, b)
            }
        else
            switch (d.U) {
            case "nis":
                f = ao(this, a, b);
                break;
            case "exc":
                f = co(this, a)
            }
        f || (b.opt_overlayAdElement ? f = void 0 : b.opt_adElement ? f = En(this, a, b.opt_adElement, b.opt_osdId) : f = Jl(Ml, a) || void 0);
        f && 1 == f.ua() && (f.N == Ca && (f.N = function(g) {
            return c.wd(g)
        }
        ),
        eo(this, f, b));
        return f
    }
    ;
    var eo = function(a, b, c) {
        c = c.opt_configurable_tracking_events;
        null != a.h && Fa(c) && tn(a, c, b)
    };
    $n.prototype.wd = function(a) {
        a.h = 0;
        a.V = 0;
        if ("h" == a.w || "n" == a.w) {
            if (Q.B().h)
                var b = Ba("ima.bridge.getVideoMetadata");
            else if (a.Qa && fo(this)) {
                var c = this.w[a.Qa];
                c ? b = function(e) {
                    return go(c, e)
                }
                : null !== c && Ui(379, Error())
            } else
                b = Ba("ima.common.getVideoMetadata");
            if (t(b))
                try {
                    var d = b(a.ga)
                } catch (e) {
                    a.h |= 4
                }
            else
                a.h |= 2
        } else if ("b" == a.w)
            if (b = Ba("ytads.bulleit.getVideoMetadata"),
            t(b))
                try {
                    d = b(a.ga)
                } catch (e) {
                    a.h |= 4
                }
            else
                a.h |= 2;
        else if ("ml" == a.w)
            if (b = Ba("ima.common.getVideoMetadata"),
            t(b))
                try {
                    d = b(a.ga)
                } catch (e) {
                    a.h |= 4
                }
            else
                a.h |= 2;
        else
            a.h |= 1;
        a.h || (void 0 === d ? a.h |= 8 : null === d ? a.h |= 16 : Bb(d) ? a.h |= 32 : null != d.errorCode && (a.V = d.errorCode,
        a.h |= 64));
        null == d && (d = {});
        Gn(d, a);
        qj(d.volume) && qj(this.H) && (d.volume *= this.H);
        return d
    }
    ;
    var bo = function(a, b, c) {
        var d = Jl(Ml, b);
        d || (d = c.opt_nativeTime || -1,
        d = sn(a, b, yn(a), d),
        c.opt_osdId && (d.Qa = c.opt_osdId));
        return d
    }
      , ao = function(a, b, c) {
        var d = Jl(Ml, b);
        d || (d = sn(a, b, "n", c.opt_nativeTime || -1),
        d.G = S.B().M);
        return d
    }
      , co = function(a, b) {
        var c = Jl(Ml, b);
        c || (c = sn(a, b, "h", -1));
        return c
    };
    $n.prototype.fd = function() {
        if (fo(this))
            return new Zn("ima.common.triggerExternalActivityEvent",this.o,this.w);
        var a = ho(this);
        return null != a ? new Xn(a,this.o) : null
    }
    ;
    var ho = function(a) {
        var b = Q.B();
        switch (yn(a)) {
        case "b":
            return "ytads.bulleit.triggerExternalActivityEvent";
        case "n":
            return "ima.bridge.triggerExternalActivityEvent";
        case "h":
            if (b.h)
                return "ima.bridge.triggerExternalActivityEvent";
        case "m":
        case "ml":
            return "ima.common.triggerExternalActivityEvent"
        }
        return null
    };
    $n.prototype.Nc = function(a) {
        !a.g && a.Ga && zn(this, a, "overlay_unmeasurable_impression") && (a.g = !0)
    }
    ;
    $n.prototype.Fd = function(a) {
        a.Id && (a.Wa() ? zn(this, a, "overlay_viewable_end_of_session_impression") : zn(this, a, "overlay_unviewable_impression"),
        a.Id = !1)
    }
    ;
    var io = function(a, b, c, d) {
        c = void 0 === c ? {} : c;
        var e = {};
        Fb(e, {
            opt_adElement: void 0,
            opt_fullscreen: void 0
        }, c);
        if (e.opt_bounds)
            return a.o.g(Lm("ol", d));
        if (void 0 !== d)
            if (void 0 !== Km(d))
                if (vm)
                    b = Lm("ue", d);
                else if (wn(a),
                "i" == um)
                    b = Lm("i", d),
                    b["if"] = 0;
                else if (b = a.C(b, e)) {
                    b: {
                        "i" == um && (b.Ga = !0,
                        a.Pc(b));
                        c = e.opt_fullscreen;
                        void 0 !== c && Ck(b, !!c);
                        var f;
                        if (c = !S.B().l && !uj())
                            zi(),
                            c = 0 === ig(Ed);
                        if (f = c) {
                            switch (b.ua()) {
                            case 1:
                                An(a, b, "pv");
                                break;
                            case 2:
                                a.Nc(b)
                            }
                            xn("pv")
                        }
                        c = d.toLowerCase();
                        !f && Ya(cj, c) && Cn(a, b, e);
                        0 != b.da && Ya(dj, c) && (b.Ga || a.l || b.Nd());
                        (f = b.Ya[c]) && Vk(b.ea, f);
                        switch (b.ua()) {
                        case 1:
                            var g = Mm(c) ? a.J.custom_metric_viewable : a.J[c];
                            break;
                        case 2:
                            g = a.P[c]
                        }
                        if (g && (d = g.call(a, b, e, d),
                        void 0 !== d)) {
                            e = Lm(void 0, c);
                            Fb(e, d);
                            d = e;
                            break b
                        }
                        d = void 0
                    }
                    3 == b.da && a.A(b);
                    b = d
                } else
                    b = Lm("nf", d);
            else
                b = void 0;
        else
            vm ? b = Lm("ue") : (b = a.C(b, e)) ? (d = Lm(),
            Fb(d, wl(b, !0, !1, !1)),
            b = d) : b = Lm("nf");
        return "string" === typeof b ? a.o.g(void 0) : a.o.g(b)
    }
      , jo = function(a, b, c) {
        a = S.B();
        if (a.M != b)
            if (a.M = b,
            a = Sl.B().g)
                Rj(a.g, !b);
            else {
                var d = Ua(Ml.g, function(e) {
                    return e.qb
                });
                z(Ml.g, function(e) {
                    if (!b && !d) {
                        var f = Q.B().I
                          , g = ["imar"].some(function(h) {
                            return 1 === ki(f, h)
                        });
                        e.U && "nis" === e.U.getName() && (g = !0);
                        e.U && "gsv" == e.U.getName() && (g = !0);
                        g ? Kk(e) : e.Db = c
                    }
                    e.G = b;
                    e.qb = !1
                })
            }
    };
    $n.prototype.D = function(a) {
        this.l && 1 == a.ua() && ko(this, a)
    }
    ;
    $n.prototype.Pc = function(a) {
        this.l && 1 == a.ua() && ko(this, a)
    }
    ;
    var ko = function(a, b) {
        var c;
        if (b.Qa && fo(a)) {
            var d = a.w[b.Qa];
            d ? c = function(f, g) {
                lo(d, f, g)
            }
            : null !== d && Ui(379, Error())
        } else
            c = Ba("ima.common.triggerViewabilityMeasurementUpdate");
        if (t(c)) {
            var e = rl(b);
            e.nativeVolume = a.H;
            c(b.ga, e)
        }
    }
      , mo = function(a, b, c) {
        a.w[b] = c
    }
      , fo = function(a) {
        return Q.B().h || "h" != yn(a) && "m" != yn(a) ? !1 : 0 != a.K
    };
    $n.prototype.M = function(a, b, c, d) {
        a = rn.prototype.M.call(this, a, b, c, d);
        this.F && (b = this.G,
        null == a.l && (a.l = new Qk),
        b.g[a.ga] = a.l,
        a.l.w = zl);
        return a
    }
    ;
    $n.prototype.A = function(a) {
        a && 1 == a.ua() && this.F && delete this.G.g[a.ga];
        return rn.prototype.A.call(this, a)
    }
    ;
    var no = function(a) {
        var b = {};
        return b.viewability = a.g,
        b.googleViewability = a.l,
        b.moatInit = a.w,
        b.moatViewability = a.A,
        b.integralAdsViewability = a.o,
        b.doubleVerifyViewability = a.h,
        b
    }
      , oo = function(a, b, c) {
        c = void 0 === c ? {} : c;
        a = io($n.B(), b, c, a);
        return no(a)
    };
    Da($n);
    var po = new Vm;
    po.w = "stopped";
    po.g = "stopped";
    po.l = "stopped";
    po.A = "stopped";
    po.o = "stopped";
    po.h = "stopped";
    Object.freeze(po);
    var qo = Ti(193, oo, void 0, Dn);
    r("Goog_AdSense_Lidar_sendVastEvent", qo, void 0);
    var ro = Ti(194, function(a, b) {
        b = void 0 === b ? {} : b;
        a = io($n.B(), a, b);
        return no(a)
    });
    r("Goog_AdSense_Lidar_getViewability", ro, void 0);
    var so = Ti(195, function() {
        return Ci()
    });
    r("Goog_AdSense_Lidar_getUrlSignalsArray", so, void 0);
    var to = Ti(196, function() {
        return Sf(Ci())
    });
    r("Goog_AdSense_Lidar_getUrlSignalsList", to, void 0);
    var uo = function(a, b) {
        this.h = {};
        this.g = [];
        this.o = this.l = 0;
        var c = arguments.length;
        if (1 < c) {
            if (c % 2)
                throw Error("Uneven number of arguments");
            for (var d = 0; d < c; d += 2)
                this.set(arguments[d], arguments[d + 1])
        } else if (a)
            if (a instanceof uo)
                for (c = a.Ba(),
                d = 0; d < c.length; d++)
                    this.set(c[d], a.get(c[d]));
            else
                for (d in a)
                    this.set(d, a[d])
    };
    uo.prototype.ka = function() {
        vo(this);
        for (var a = [], b = 0; b < this.g.length; b++)
            a.push(this.h[this.g[b]]);
        return a
    }
    ;
    uo.prototype.Ba = function() {
        vo(this);
        return this.g.concat()
    }
    ;
    uo.prototype.isEmpty = function() {
        return 0 == this.l
    }
    ;
    uo.prototype.clear = function() {
        this.h = {};
        this.o = this.l = this.g.length = 0
    }
    ;
    var xo = function(a, b) {
        wo(a.h, b) && (delete a.h[b],
        a.l--,
        a.o++,
        a.g.length > 2 * a.l && vo(a))
    }
      , vo = function(a) {
        if (a.l != a.g.length) {
            for (var b = 0, c = 0; b < a.g.length; ) {
                var d = a.g[b];
                wo(a.h, d) && (a.g[c++] = d);
                b++
            }
            a.g.length = c
        }
        if (a.l != a.g.length) {
            var e = {};
            for (c = b = 0; b < a.g.length; )
                d = a.g[b],
                wo(e, d) || (a.g[c++] = d,
                e[d] = 1),
                b++;
            a.g.length = c
        }
    };
    m = uo.prototype;
    m.get = function(a, b) {
        return wo(this.h, a) ? this.h[a] : b
    }
    ;
    m.set = function(a, b) {
        wo(this.h, a) || (this.l++,
        this.g.push(a),
        this.o++);
        this.h[a] = b
    }
    ;
    m.forEach = function(a, b) {
        for (var c = this.Ba(), d = 0; d < c.length; d++) {
            var e = c[d]
              , f = this.get(e);
            a.call(b, f, e, this)
        }
    }
    ;
    m.clone = function() {
        return new uo(this)
    }
    ;
    m.Jb = function(a) {
        vo(this);
        var b = 0
          , c = this.o
          , d = this
          , e = new Nk;
        e.next = function() {
            if (c != d.o)
                throw Error("The map has changed since the iterator was created");
            if (b >= d.g.length)
                throw Mk;
            var f = d.g[b++];
            return a ? f : d.h[f]
        }
        ;
        return e
    }
    ;
    var wo = function(a, b) {
        return Object.prototype.hasOwnProperty.call(a, b)
    };
    var yo = function(a) {
        if (a.ka && "function" == typeof a.ka)
            return a.ka();
        if ("string" === typeof a)
            return a.split("");
        if (Ga(a)) {
            for (var b = [], c = a.length, d = 0; d < c; d++)
                b.push(a[d]);
            return b
        }
        return vb(a)
    }
      , zo = function(a, b) {
        if (a.forEach && "function" == typeof a.forEach)
            a.forEach(b, void 0);
        else if (Ga(a) || "string" === typeof a)
            z(a, b, void 0);
        else {
            if (a.Ba && "function" == typeof a.Ba)
                var c = a.Ba();
            else if (a.ka && "function" == typeof a.ka)
                c = void 0;
            else if (Ga(a) || "string" === typeof a) {
                c = [];
                for (var d = a.length, e = 0; e < d; e++)
                    c.push(e)
            } else
                c = wb(a);
            d = yo(a);
            e = d.length;
            for (var f = 0; f < e; f++)
                b.call(void 0, d[f], c && c[f], a)
        }
    };
    var Ao = function(a, b) {
        this.g = this.C = this.o = "";
        this.H = null;
        this.w = this.l = "";
        this.A = !1;
        var c;
        a instanceof Ao ? (this.A = void 0 !== b ? b : a.A,
        Bo(this, a.o),
        this.C = a.C,
        this.g = a.g,
        Co(this, a.H),
        this.l = a.l,
        Do(this, a.h.clone()),
        this.w = a.w) : a && (c = String(a).match(me)) ? (this.A = !!b,
        Bo(this, c[1] || "", !0),
        this.C = Eo(c[2] || ""),
        this.g = Eo(c[3] || "", !0),
        Co(this, c[4]),
        this.l = Eo(c[5] || "", !0),
        Do(this, c[6] || "", !0),
        this.w = Eo(c[7] || "")) : (this.A = !!b,
        this.h = new Fo(null,this.A))
    };
    Ao.prototype.toString = function() {
        var a = []
          , b = this.o;
        b && a.push(Go(b, Ho, !0), ":");
        var c = this.g;
        if (c || "file" == b)
            a.push("//"),
            (b = this.C) && a.push(Go(b, Ho, !0), "@"),
            a.push(encodeURIComponent(String(c)).replace(/%25([0-9a-fA-F]{2})/g, "%$1")),
            c = this.H,
            null != c && a.push(":", String(c));
        if (c = this.l)
            this.g && "/" != c.charAt(0) && a.push("/"),
            a.push(Go(c, "/" == c.charAt(0) ? Io : Jo, !0));
        (c = this.h.toString()) && a.push("?", c);
        (c = this.w) && a.push("#", Go(c, Ko));
        return a.join("")
    }
    ;
    Ao.prototype.resolve = function(a) {
        var b = this.clone()
          , c = !!a.o;
        c ? Bo(b, a.o) : c = !!a.C;
        c ? b.C = a.C : c = !!a.g;
        c ? b.g = a.g : c = null != a.H;
        var d = a.l;
        if (c)
            Co(b, a.H);
        else if (c = !!a.l) {
            if ("/" != d.charAt(0))
                if (this.g && !this.l)
                    d = "/" + d;
                else {
                    var e = b.l.lastIndexOf("/");
                    -1 != e && (d = b.l.substr(0, e + 1) + d)
                }
            e = d;
            if (".." == e || "." == e)
                d = "";
            else if (-1 != e.indexOf("./") || -1 != e.indexOf("/.")) {
                d = 0 == e.lastIndexOf("/", 0);
                e = e.split("/");
                for (var f = [], g = 0; g < e.length; ) {
                    var h = e[g++];
                    "." == h ? d && g == e.length && f.push("") : ".." == h ? ((1 < f.length || 1 == f.length && "" != f[0]) && f.pop(),
                    d && g == e.length && f.push("")) : (f.push(h),
                    d = !0)
                }
                d = f.join("/")
            } else
                d = e
        }
        c ? b.l = d : c = "" !== a.h.toString();
        c ? Do(b, a.h.clone()) : c = !!a.w;
        c && (b.w = a.w);
        return b
    }
    ;
    Ao.prototype.clone = function() {
        return new Ao(this)
    }
    ;
    var Bo = function(a, b, c) {
        a.o = c ? Eo(b, !0) : b;
        a.o && (a.o = a.o.replace(/:$/, ""))
    }
      , Co = function(a, b) {
        if (b) {
            b = Number(b);
            if (isNaN(b) || 0 > b)
                throw Error("Bad port number " + b);
            a.H = b
        } else
            a.H = null
    }
      , Do = function(a, b, c) {
        b instanceof Fo ? (a.h = b,
        Lo(a.h, a.A)) : (c || (b = Go(b, Mo)),
        a.h = new Fo(b,a.A))
    }
      , No = function(a, b, c) {
        a.h.set(b, c);
        return a
    }
      , Eo = function(a, b) {
        return a ? b ? decodeURI(a.replace(/%25/g, "%2525")) : decodeURIComponent(a) : ""
    }
      , Go = function(a, b, c) {
        return "string" === typeof a ? (a = encodeURI(a).replace(b, Oo),
        c && (a = a.replace(/%25([0-9a-fA-F]{2})/g, "%$1")),
        a) : null
    }
      , Oo = function(a) {
        a = a.charCodeAt(0);
        return "%" + (a >> 4 & 15).toString(16) + (a & 15).toString(16)
    }
      , Ho = /[#\/\?@]/g
      , Jo = /[#\?:]/g
      , Io = /[#\?]/g
      , Mo = /[#\?@]/g
      , Ko = /#/g
      , Fo = function(a, b) {
        this.h = this.g = null;
        this.l = a || null;
        this.o = !!b
    }
      , Po = function(a) {
        a.g || (a.g = new uo,
        a.h = 0,
        a.l && ne(a.l, function(b, c) {
            a.add(wc(b), c)
        }))
    };
    Fo.prototype.add = function(a, b) {
        Po(this);
        this.l = null;
        a = Qo(this, a);
        var c = this.g.get(a);
        c || this.g.set(a, c = []);
        c.push(b);
        this.h += 1;
        return this
    }
    ;
    var Ro = function(a, b) {
        Po(a);
        b = Qo(a, b);
        wo(a.g.h, b) && (a.l = null,
        a.h -= a.g.get(b).length,
        xo(a.g, b))
    };
    Fo.prototype.clear = function() {
        this.g = this.l = null;
        this.h = 0
    }
    ;
    Fo.prototype.isEmpty = function() {
        Po(this);
        return 0 == this.h
    }
    ;
    var So = function(a, b) {
        Po(a);
        b = Qo(a, b);
        return wo(a.g.h, b)
    };
    m = Fo.prototype;
    m.forEach = function(a, b) {
        Po(this);
        this.g.forEach(function(c, d) {
            z(c, function(e) {
                a.call(b, e, d, this)
            }, this)
        }, this)
    }
    ;
    m.Ba = function() {
        Po(this);
        for (var a = this.g.ka(), b = this.g.Ba(), c = [], d = 0; d < b.length; d++)
            for (var e = a[d], f = 0; f < e.length; f++)
                c.push(b[d]);
        return c
    }
    ;
    m.ka = function(a) {
        Po(this);
        var b = [];
        if ("string" === typeof a)
            So(this, a) && (b = bb(b, this.g.get(Qo(this, a))));
        else {
            a = this.g.ka();
            for (var c = 0; c < a.length; c++)
                b = bb(b, a[c])
        }
        return b
    }
    ;
    m.set = function(a, b) {
        Po(this);
        this.l = null;
        a = Qo(this, a);
        So(this, a) && (this.h -= this.g.get(a).length);
        this.g.set(a, [b]);
        this.h += 1;
        return this
    }
    ;
    m.get = function(a, b) {
        if (!a)
            return b;
        a = this.ka(a);
        return 0 < a.length ? String(a[0]) : b
    }
    ;
    m.toString = function() {
        if (this.l)
            return this.l;
        if (!this.g)
            return "";
        for (var a = [], b = this.g.Ba(), c = 0; c < b.length; c++) {
            var d = b[c]
              , e = encodeURIComponent(String(d));
            d = this.ka(d);
            for (var f = 0; f < d.length; f++) {
                var g = e;
                "" !== d[f] && (g += "=" + encodeURIComponent(String(d[f])));
                a.push(g)
            }
        }
        return this.l = a.join("&")
    }
    ;
    m.clone = function() {
        var a = new Fo;
        a.l = this.l;
        this.g && (a.g = this.g.clone(),
        a.h = this.h);
        return a
    }
    ;
    var Qo = function(a, b) {
        b = String(b);
        a.o && (b = b.toLowerCase());
        return b
    }
      , Lo = function(a, b) {
        b && !a.o && (Po(a),
        a.l = null,
        a.g.forEach(function(c, d) {
            var e = d.toLowerCase();
            d != e && (Ro(this, d),
            Ro(this, e),
            0 < c.length && (this.l = null,
            this.g.set(Qo(this, e), cb(c)),
            this.h += c.length))
        }, a));
        a.o = b
    };
    var To = "://secure-...imrworldwide.com/ ://cdn.imrworldwide.com/ ://aksecure.imrworldwide.com/ ://[^.]*.moatads.com ://youtube[0-9]+.moatpixel.com ://pm.adsafeprotected.com/youtube ://pm.test-adsafeprotected.com/youtube ://e[0-9]+.yt.srs.doubleverify.com www.google.com/pagead/xsul www.youtube.com/pagead/slav".split(" ")
      , Uo = /\bocr\b/
      , Vo = 0
      , Wo = {}
      , Xo = function(a) {
        if (Rb(Ac(a)))
            return !1;
        if (0 <= a.indexOf("://pagead2.googlesyndication.com/pagead/gen_204?id=yt3p&sr=1&"))
            return !0;
        try {
            var b = new Ao(a)
        } catch (c) {
            return null != Wa(To, function(d) {
                return 0 < a.search(d)
            })
        }
        return b.w.match(Uo) ? !0 : null != Wa(To, function(c) {
            return null != a.match(c)
        })
    }
      , ap = function(a) {
        if (a && (a = Yo(a),
        !Rb(a))) {
            var b = 'javascript:"<body><img src=\\""+' + a + '+"\\"></body>"';
            Zo(function(c) {
                $o(c ? b : 'javascript:"<body><object data=\\""+' + a + '+"\\" type=\\"text/html\\" width=1 height=1 style=\\"visibility:hidden;\\"></body>"')
            })
        }
    }
      , $o = function(a) {
        var b = be("IFRAME", {
            src: a,
            style: "display:none"
        });
        a = Td(b).body;
        var c = th(function() {
            nh(d);
            de(b)
        }, 15E3);
        var d = eh(b, ["load", "error"], function() {
            th(function() {
                q.clearTimeout(c);
                de(b)
            }, 5E3)
        });
        a.appendChild(b)
    }
      , Zo = function(a) {
        var b = Wo.imageLoadingEnabled;
        if (null != b)
            a(b);
        else {
            var c = !1;
            bp(function(d, e) {
                delete Wo[e];
                c || (c = !0,
                null == Wo.imageLoadingEnabled && (Wo.imageLoadingEnabled = d),
                a(d))
            })
        }
    }
      , bp = function(a) {
        var b = new Image
          , c = "" + Vo++;
        Wo[c] = b;
        b.onload = function() {
            clearTimeout(d);
            a(!0, c)
        }
        ;
        var d = setTimeout(function() {
            a(!1, c)
        }, 300);
        b.src = "data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="
    }
      , cp = function(a) {
        if (a) {
            var b = $d(document, "OBJECT");
            b.data = a;
            b.width = "1";
            b.height = "1";
            b.style.visibility = "hidden";
            var c = "" + Vo++;
            Wo[c] = b;
            b.onload = b.onerror = function() {
                delete Wo[c]
            }
            ;
            document.body.appendChild(b)
        }
    }
      , dp = function(a) {
        if (a) {
            var b = new Image
              , c = "" + Vo++;
            Wo[c] = b;
            b.onload = b.onerror = function() {
                delete Wo[c]
            }
            ;
            b.src = a
        }
    }
      , fp = function(a) {
        a && Zo(function(b) {
            b ? dp(a) : cp(a)
        })
    }
      , Yo = function(a) {
        a instanceof fc || (a = "object" == typeof a && a.Ua ? a.Ma() : String(a),
        hc.test(a) || (a = "about:invalid#zClosurez"),
        a = new fc(dc,a));
        var b = gc(a);
        if ("about:invalid#zClosurez" === b)
            return "";
        if (b instanceof rc)
            a = b;
        else {
            var c = "object" == typeof b;
            a = null;
            c && b.sc && (a = b.lc());
            b = ac(c && b.Ua ? b.Ma() : String(b));
            a = uc(b, a)
        }
        a = sc(a).toString();
        return encodeURIComponent(String(Sf(a)))
    };
    var gp = "ad_type vpos mridx pos vad_type videoad_start_delay".split(" ");
    var hp = function(a) {
        var b = a.Ka
          , c = void 0 === a.za ? !1 : a.za;
        this.A = a.Ra;
        this.g = b;
        this.w = c
    };
    var ip = ["*.youtu.be", "*.youtube.com"]
      , jp = "ad.doubleclick.net bid.g.doubleclick.net ggpht.com google.co.uk google.com googleads.g.doubleclick.net googleads4.g.doubleclick.net googleadservices.com googlesyndication.com googleusercontent.com gstatic.com gvt1.com prod.google.com pubads.g.doubleclick.net s0.2mdn.net static.doubleclick.net surveys.g.doubleclick.net youtube.com ytimg.com".split(" ")
      , kp = ["c.googlesyndication.com"];
    function lp(a, b) {
        b = void 0 === b ? window.location.protocol : b;
        var c = !1;
        if (mp(a, kp))
            c = !1;
        else {
            var d;
            if (d = !np(a))
                if (null == a)
                    d = !1;
                else {
                    d = a;
                    if (np(a))
                        b: {
                            try {
                                var e = new Ao(a);
                                if ("gcache" == e.o) {
                                    var f = e.h.get("url");
                                    if (f && !Rb(Ac(f))) {
                                        d = f;
                                        break b
                                    }
                                }
                            } catch (g) {}
                            d = a
                        }
                    d = op(d)
                }
            d ? c = !0 : "https:" == b && mp(a, jp) && (c = !0)
        }
        if (c) {
            b = new Ao(a);
            if ("https" == b.o)
                return a;
            wg(J.B(), "htp", "1");
            Bo(b, "https");
            return b.toString()
        }
        return a
    }
    function np(a) {
        if (!a)
            return !1;
        try {
            var b = new Ao(a);
            return "gcache" == b.o && !!b.h.get("url")
        } catch (c) {
            return !1
        }
    }
    function mp(a, b) {
        return (new RegExp("^https?://([a-z0-9-]{1,63}\\.)*(" + b.join("|").replace(/\./g, "\\.") + ")(:[0-9]+)?([/?#]|$)","i")).test(a)
    }
    function op(a) {
        try {
            var b = (new Ao(a)).g;
            b = b.replace(/^www./i, "");
            return ip.some(function(c) {
                return pp(c, b)
            })
        } catch (c) {
            return !1
        }
    }
    function pp(a, b) {
        if (Rb(Ac(b)))
            return !1;
        a = a.toLowerCase();
        b = b.toLowerCase();
        return "*." == a.substr(0, 2) ? (a = a.substr(2),
        a.length > b.length ? !1 : b.substr(-a.length) == a && (b.length == a.length || "." == b.charAt(b.length - a.length - 1))) : a == b
    }
    ;var qp = function(a) {
        var b = a.Rd
          , c = a.Zc
          , d = a.Qd
          , e = a.Yc;
        hp.call(this, {
            Ra: a.Ra,
            Ka: a.Ka,
            height: a.height,
            width: a.width,
            za: void 0 === a.za ? !1 : a.za
        });
        this.o = b;
        this.l = c;
        this.C = d;
        this.h = e
    };
    p(qp, hp);
    qp.prototype.getVideoUrl = function() {
        return this.o
    }
    ;
    var rp = function(a) {
        var b = a.td;
        hp.call(this, {
            Ra: a.Ra,
            Ka: a.Ka,
            height: a.height,
            width: a.width,
            za: void 0 === a.za ? !1 : a.za
        });
        this.h = b
    };
    p(rp, hp);
    var sp = function() {
        this.g = v()
    };
    sp.prototype.reset = function() {
        this.g = v()
    }
    ;
    var tp = function(a) {
        var b = v();
        a = a.g + 5E3 - b;
        return 0 < a ? a : 0
    };
    var up = function(a) {
        return (a = a.exec(jc)) ? a[1] : ""
    };
    (function() {
        if (dd)
            return up(/Firefox\/([0-9.]+)/);
        if (Mc || Nc || Lc)
            return ad;
        if (hd)
            return Gc() ? up(/CriOS\/([0-9.]+)/) : up(/Chrome\/([0-9.]+)/);
        if (id && !Gc())
            return up(/Version\/([0-9.]+)/);
        if (ed || fd) {
            var a = /Version\/(\S+).*Mobile\/(\S+)/.exec(jc);
            if (a)
                return a[1] + "." + a[2]
        } else if (gd)
            return (a = up(/Android\s+([0-9.]+)/)) ? a : up(/Version\/([0-9.]+)/);
        return ""
    }
    )();
    var vp = /OS (\S+) like/
      , wp = /Android ([\d\.]+)/;
    function xp(a, b) {
        a = (a = a.exec(jc)) ? a[1] : "";
        a = a.replace(/_/g, ".");
        return 0 <= cc(a, b)
    }
    var yp = function() {
        return Qc && "ontouchstart"in document.documentElement
    }
      , zp = function(a) {
        return Vc && xp(vp, a)
    }
      , Ap = function(a) {
        return (a = void 0 === a ? null : a) && t(a.getAttribute) ? a.getAttribute("playsinline") ? !0 : !1 : !1
    };
    var Bp = function() {
        if (!Mc)
            return !1;
        try {
            return new ActiveXObject("MSXML2.DOMDocument"),
            !0
        } catch (a) {
            return !1
        }
    }
      , Cp = Mc && Bp();
    var Dp = function(a) {
        K.call(this);
        this.o = a;
        this.h = {}
    };
    y(Dp, K);
    var Ep = [];
    Dp.prototype.T = function(a, b, c, d) {
        return Fp(this, a, b, c, d)
    }
    ;
    var Fp = function(a, b, c, d, e, f) {
        Fa(c) || (c && (Ep[0] = c.toString()),
        c = Ep);
        for (var g = 0; g < c.length; g++) {
            var h = fh(b, c[g], d || a.handleEvent, e || !1, f || a.o || a);
            if (!h)
                break;
            a.h[h.key] = h
        }
        return a
    }
      , Hp = function(a, b, c, d) {
        Gp(a, b, c, d, void 0)
    }
      , Gp = function(a, b, c, d, e, f) {
        if (Fa(c))
            for (var g = 0; g < c.length; g++)
                Gp(a, b, c[g], d, e, f);
        else
            (b = eh(b, c, d || a.handleEvent, e, f || a.o || a)) && (a.h[b.key] = b)
    };
    Dp.prototype.Da = function(a, b, c, d, e) {
        if (Fa(b))
            for (var f = 0; f < b.length; f++)
                this.Da(a, b[f], c, d, e);
        else
            c = c || this.handleEvent,
            d = Ha(d) ? !!d.capture : !!d,
            e = e || this.o || this,
            c = gh(c),
            d = !!d,
            b = Ug(a) ? ah(a.l, String(b), c, d, e) : a ? (a = ih(a)) ? ah(a, b, c, d, e) : null : null,
            b && (nh(b),
            delete this.h[b.key])
    }
    ;
    var Ip = function(a) {
        ob(a.h, function(b, c) {
            this.h.hasOwnProperty(c) && nh(b)
        }, a);
        a.h = {}
    };
    Dp.prototype.R = function() {
        Dp.wa.R.call(this);
        Ip(this)
    }
    ;
    Dp.prototype.handleEvent = function() {
        throw Error("EventHandler.handleEvent not implemented");
    }
    ;
    var Jp = function() {};
    Jp.prototype.g = null;
    Jp.prototype.getOptions = function() {
        var a;
        (a = this.g) || (a = {},
        Kp(this) && (a[0] = !0,
        a[1] = !0),
        a = this.g = a);
        return a
    }
    ;
    var Lp, Mp = function() {};
    y(Mp, Jp);
    var Np = function(a) {
        return (a = Kp(a)) ? new ActiveXObject(a) : new XMLHttpRequest
    }
      , Kp = function(a) {
        if (!a.h && "undefined" == typeof XMLHttpRequest && "undefined" != typeof ActiveXObject) {
            for (var b = ["MSXML2.XMLHTTP.6.0", "MSXML2.XMLHTTP.3.0", "MSXML2.XMLHTTP", "Microsoft.XMLHTTP"], c = 0; c < b.length; c++) {
                var d = b[c];
                try {
                    return new ActiveXObject(d),
                    a.h = d
                } catch (e) {}
            }
            throw Error("Could not create ActiveXObject. ActiveX might be disabled, or MSXML might not be installed");
        }
        return a.h
    };
    Lp = new Mp;
    var Op = function(a) {
        L.call(this);
        this.headers = new uo;
        this.G = a || null;
        this.h = !1;
        this.F = this.g = null;
        this.N = "";
        this.w = 0;
        this.o = this.K = this.A = this.J = !1;
        this.D = 0;
        this.C = null;
        this.Z = "";
        this.O = this.P = !1
    };
    y(Op, L);
    var Pp = /^https?$/i
      , Qp = ["POST", "PUT"]
      , Rp = function(a, b) {
        a.D = Math.max(0, b)
    };
    Op.prototype.send = function(a, b, c, d) {
        if (this.g)
            throw Error("[goog.net.XhrIo] Object is active with another request=" + this.N + "; newUri=" + a);
        b = b ? b.toUpperCase() : "GET";
        this.N = a;
        this.w = 0;
        this.J = !1;
        this.h = !0;
        this.g = this.G ? Np(this.G) : Np(Lp);
        this.F = this.G ? this.G.getOptions() : Lp.getOptions();
        this.g.onreadystatechange = Ma(this.Y, this);
        try {
            this.K = !0,
            this.g.open(b, String(a), !0),
            this.K = !1
        } catch (f) {
            Sp(this);
            return
        }
        a = c || "";
        var e = this.headers.clone();
        d && zo(d, function(f, g) {
            e.set(g, f)
        });
        d = Wa(e.Ba(), Tp);
        c = q.FormData && a instanceof q.FormData;
        !Ya(Qp, b) || d || c || e.set("Content-Type", "application/x-www-form-urlencoded;charset=utf-8");
        e.forEach(function(f, g) {
            this.g.setRequestHeader(g, f)
        }, this);
        this.Z && (this.g.responseType = this.Z);
        "withCredentials"in this.g && this.g.withCredentials !== this.P && (this.g.withCredentials = this.P);
        try {
            Up(this),
            0 < this.D && ((this.O = Vp(this.g)) ? (this.g.timeout = this.D,
            this.g.ontimeout = Ma(this.V, this)) : this.C = th(this.V, this.D, this)),
            this.A = !0,
            this.g.send(a),
            this.A = !1
        } catch (f) {
            Sp(this)
        }
    }
    ;
    var Vp = function(a) {
        return Mc && bd(9) && "number" === typeof a.timeout && void 0 !== a.ontimeout
    }
      , Tp = function(a) {
        return "content-type" == a.toLowerCase()
    };
    Op.prototype.V = function() {
        "undefined" != typeof xa && this.g && (this.w = 8,
        this.dispatchEvent("timeout"),
        this.abort(8))
    }
    ;
    var Sp = function(a) {
        a.h = !1;
        a.g && (a.o = !0,
        a.g.abort(),
        a.o = !1);
        a.w = 5;
        Wp(a);
        Xp(a)
    }
      , Wp = function(a) {
        a.J || (a.J = !0,
        a.dispatchEvent("complete"),
        a.dispatchEvent("error"))
    };
    Op.prototype.abort = function(a) {
        this.g && this.h && (this.h = !1,
        this.o = !0,
        this.g.abort(),
        this.o = !1,
        this.w = a || 7,
        this.dispatchEvent("complete"),
        this.dispatchEvent("abort"),
        Xp(this))
    }
    ;
    Op.prototype.R = function() {
        this.g && (this.h && (this.h = !1,
        this.o = !0,
        this.g.abort(),
        this.o = !1),
        Xp(this, !0));
        Op.wa.R.call(this)
    }
    ;
    Op.prototype.Y = function() {
        this.fb() || (this.K || this.A || this.o ? Yp(this) : this.$())
    }
    ;
    Op.prototype.$ = function() {
        Yp(this)
    }
    ;
    var Yp = function(a) {
        if (a.h && "undefined" != typeof xa && (!a.F[1] || 4 != Zp(a) || 2 != $p(a)))
            if (a.A && 4 == Zp(a))
                th(a.Y, 0, a);
            else if (a.dispatchEvent("readystatechange"),
            4 == Zp(a)) {
                a.h = !1;
                try {
                    var b = $p(a);
                    a: switch (b) {
                    case 200:
                    case 201:
                    case 202:
                    case 204:
                    case 206:
                    case 304:
                    case 1223:
                        var c = !0;
                        break a;
                    default:
                        c = !1
                    }
                    var d;
                    if (!(d = c)) {
                        var e;
                        if (e = 0 === b) {
                            var f = String(a.N).match(me)[1] || null;
                            if (!f && q.self && q.self.location) {
                                var g = q.self.location.protocol;
                                f = g.substr(0, g.length - 1)
                            }
                            e = !Pp.test(f ? f.toLowerCase() : "")
                        }
                        d = e
                    }
                    d ? (a.dispatchEvent("complete"),
                    a.dispatchEvent("success")) : (a.w = 6,
                    Wp(a))
                } finally {
                    Xp(a)
                }
            }
    }
      , Xp = function(a, b) {
        if (a.g) {
            Up(a);
            var c = a.g
              , d = a.F[0] ? Ca : null;
            a.g = null;
            a.F = null;
            b || a.dispatchEvent("ready");
            try {
                c.onreadystatechange = d
            } catch (e) {}
        }
    }
      , Up = function(a) {
        a.g && a.O && (a.g.ontimeout = null);
        a.C && (q.clearTimeout(a.C),
        a.C = null)
    };
    Op.prototype.vc = function() {
        return !!this.g
    }
    ;
    var Zp = function(a) {
        return a.g ? a.g.readyState : 0
    }
      , $p = function(a) {
        try {
            return 2 < Zp(a) ? a.g.status : -1
        } catch (b) {
            return -1
        }
    }
      , aq = function(a) {
        try {
            return a.g ? a.g.responseText : ""
        } catch (b) {
            return ""
        }
    }
      , bq = function(a, b) {
        if (a.g && 4 == Zp(a))
            return a = a.g.getResponseHeader(b),
            null === a ? void 0 : a
    };
    var cq = function() {};
    cq.prototype.get = function(a, b) {
        return dq(a, b)
    }
    ;
    var dq = function(a, b) {
        return eq(a, !0, b).then(function(c) {
            return Promise.resolve(c)
        }, function(c) {
            return c instanceof Error && 6 == c.message ? eq(a, !1, b) : Promise.reject(c)
        })
    }
      , eq = function(a, b, c) {
        var d = new Op;
        d.P = b;
        Rp(d, tp(c));
        var e = new Dp;
        return new Promise(function(f, g) {
            Hp(e, d, "success", function() {
                try {
                    var h = d.g ? d.g.responseXML : null
                } catch (x) {
                    h = null
                }
                if (null == h)
                    if (h = aq(d),
                    "undefined" != typeof DOMParser) {
                        var k = new DOMParser;
                        ie();
                        h = uc(h, null);
                        h = k.parseFromString(sc(h), "application/xml")
                    } else if (Cp) {
                        k = new ActiveXObject("MSXML2.DOMDocument");
                        k.resolveExternals = !1;
                        k.validateOnParse = !1;
                        try {
                            k.setProperty("ProhibitDTD", !0),
                            k.setProperty("MaxXMLSize", 2048),
                            k.setProperty("MaxElementDepth", 256)
                        } catch (x) {}
                        k.loadXML(h);
                        h = k
                    } else
                        throw Error("Your browser does not support loading xml documents");
                k = Fg.jb || Fg.g;
                var l;
                if (l = h && h.documentElement)
                    (l = h.documentElement) && "VAST" != !l.nodeName ? (l = l.getAttribute("version")) ? (l = parseInt(l, 10),
                    l = null == l || isNaN(l) ? null : l) : l = null : l = null,
                    l = null == l || 2 > l || 4 < l ? !1 : !0;
                if (!l && k) {
                    k = {
                        vastUrl: a.substring(0, 200),
                        responseText: aq(d).substring(0, 200),
                        status: $p(d),
                        contentType: bq(d, "Content-Type"),
                        acao: bq(d, "Access-Control-Allow-Origin"),
                        acac: bq(d, "Access-Control-Allow-Credentials"),
                        origin: window.location.origin
                    };
                    l = J.B();
                    for (var n = ba(Object.keys(k)), u = n.next(); !u.done; u = n.next())
                        u = u.value,
                        wg(l, u, k[u])
                }
                f(h);
                e.W();
                d.W()
            });
            Hp(e, d, ["error", "timeout"], function() {
                g(Error(d.w));
                e.W();
                d.W()
            });
            d.send(lp(a), "GET", void 0)
        }
        )
    };
    var fq = function(a) {
        var b = {};
        a.split(",").forEach(function(c) {
            var d = c.split("=");
            2 == d.length && (c = Tb(d[0]),
            d = Tb(d[1]),
            0 < c.length && (b[c] = d))
        });
        return b
    }
      , gq = function(a) {
        var b = "af am ar_eg ar_sa ar_xb ar be bg bn ca cs da de_at de_cn de el en_au en_ca en_gb en_ie en_in en_sg en_xa en_xc en_za en es_419 es_ar es_bo es_cl es_co es_cr es_do es_ec es_gt es_hn es_mx es_ni es_pa es_pe es_pr es_py es_sv es_us es_uy es_ve es et eu fa fi fil fr_ca fr_ch fr gl gsw gu he hi hr hu id in is it iw ja kn ko ln lo lt lv ml mo mr ms nb ne nl no pl pt_br pt_pt pt ro ru sk sl sr_latn sr sv sw ta te th tl tr uk ur vi zh_cn zh_hk zh_tw zh zu".split(" ");
        if (!a)
            return null;
        a = a.toLowerCase().replace("-", "_");
        if (b.includes(a))
            return a;
        a = (a = a.match(/^\w{2,3}([-_]|$)/)) ? a[0].replace(/[_-]/g, "") : "";
        return b.includes(a) ? a : null
    };
    function hq(a, b) {
        for (var c = [], d = 1; d < arguments.length; ++d)
            c[d - 1] = arguments[d];
        return new (Function.prototype.bind.apply(a, [null].concat(ca(c))))
    }
    ;function iq() {
        Kd.set("GoogleAdServingTest", "Good");
        var a = "Good" == Kd.get("GoogleAdServingTest");
        a && (Kd.get("GoogleAdServingTest"),
        Kd.set("GoogleAdServingTest", "", 0, void 0, void 0));
        return a
    }
    ;var jq = {
        sg: "autoplayDisallowed",
        tg: "beginFullscreen",
        ug: "canPlay",
        vg: "canPlayThrough",
        CLICK: "click",
        DURATION_CHANGE: "durationChange",
        Ag: "end",
        Bg: "endFullscreen",
        Cg: "error",
        Fg: "focusSkipButton",
        Tg: "loadStart",
        LOADED: "loaded",
        Ug: "mediaLoadTimeout",
        Vg: "mediaPlaybackTimeout",
        gc: "pause",
        fh: "play",
        kh: "seeked",
        lh: "seeking",
        mh: "skip",
        nh: "skipShown",
        hc: "start",
        sh: "timeUpdate",
        qh: "timedMetadata",
        be: "volumeChange",
        vh: "waiting"
    };
    var kq = function() {};
    function lq() {
        return !!window.MediaSource
    }
    ;var mq = function(a, b, c) {
        var d = new kq;
        this.url = a;
        this.mimeType = b;
        this.g = c;
        this.h = void 0 === d ? null : d
    };
    var oq = function(a, b, c, d, e) {
        K.call(this);
        this.$ = a;
        this.F = new Ao(b.url);
        this.h = c;
        this.l = e;
        this.G = b.g;
        this.Z = d;
        (this.J = b.h) || Ro(this.F.h, "alr");
        wg(J.B(), "sl_dv" + this.l, (null != this.J).toString());
        this.K = !this.J;
        this.V = 0;
        this.g = new XMLHttpRequest;
        this.C = this.Y = this.A = this.o = 0;
        this.O = .1;
        this.w = [];
        this.D = !1;
        this.P = this.N = null;
        nq(this)
    };
    p(oq, K);
    var nq = function(a) {
        a.N = fh(a.g, "load", function() {
            pq(a);
            if (a.K) {
                var b = a.g.responseText;
                a.D = !b || b.length < a.G;
                a.C = 0;
                xg(J.B(), "sl_cc" + a.l + "-" + a.A);
                a.A++;
                qq(a)
            }
        });
        a.P = fh(a.g, "progress", function() {
            pq(a)
        });
        a.g.addEventListener("error", function() {
            xg(J.B(), "sl_ec" + a.l + "-" + a.o)
        });
        a.h.addEventListener("updateend", function() {
            a.h.buffered.length && (a.Y = a.h.buffered.end(0),
            a.D && !a.h.updating && a.o == a.A && (xg(J.B(), "sl_lc" + a.l),
            a.Z()))
        });
        a.h.addEventListener("update", function() {
            a.w.length && !a.h.updating && a.h.appendBuffer(a.w.shift())
        });
        a.h.addEventListener("error", function() {
            xg(J.B(), "msb_err" + a.l)
        });
        rq(a)
    }
      , rq = function(a) {
        xg(J.B(), "sl_rc" + a.l + "-" + a.o);
        var b = a.o * a.G;
        b = No(a.F, "range", b + "-" + (b + a.G - 1)).toString();
        a.g.open("get", b);
        a.g.overrideMimeType("text/plain; charset=x-user-defined");
        a.g.send(null);
        a.o++
    }
      , pq = function(a) {
        if (!a.K) {
            var b = a.g.getResponseHeader("content-type");
            if (b && 0 <= b.indexOf("text/plain")) {
                a.g.readyState == XMLHttpRequest.DONE && (a.F = new Ao(a.g.response),
                a.o = 0,
                a.A = 0,
                a.V++,
                rq(a));
                return
            }
            a.K = !0;
            xg(J.B(), "sl_redc" + a.l);
            wg(J.B(), "sl_tr" + a.l, a.V.toString())
        }
        Ro(a.F.h, "alr");
        if (a.g.readyState == XMLHttpRequest.LOADING || a.g.readyState == XMLHttpRequest.DONE) {
            b = a.g.response;
            for (var c = new Uint8Array(b.length - a.C), d = 0; d < c.length; d++)
                c[d] = b.charCodeAt(d + a.C) & 255;
            a.C = b.length;
            b = c.buffer;
            0 < b.byteLength && (a.h.updating || a.w.length ? a.w.push(b) : a.h.appendBuffer(b))
        }
    }
      , qq = function(a) {
        var b = a.A == a.o && !a.h.updating && !a.w.length;
        !a.D && b && a.$.currentTime >= a.O && (a.O = a.Y + .1,
        rq(a))
    };
    oq.prototype.R = function() {
        nh(this.N);
        nh(this.P);
        K.prototype.R.call(this)
    }
    ;
    var tq = function(a, b) {
        K.call(this);
        var c = this;
        this.A = a;
        this.D = b;
        this.h = new MediaSource;
        this.C = [];
        this.l = [];
        this.g = this.w = null;
        this.o = !1;
        this.h.addEventListener("sourceopen", function() {
            return sq(c)
        })
    };
    p(tq, K);
    var sq = function(a) {
        xg(J.B(), "msmsw_oso");
        a.w = fh(a.A, "timeupdate", function() {
            if (!a.o)
                for (var e = ba(a.l), f = e.next(); !f.done; f = e.next())
                    qq(f.value)
        });
        for (var b = 0; b < a.D.length; b++) {
            var c = a.D[b];
            wg(J.B(), "msmsw_mime" + b, c.mimeType);
            wg(J.B(), "msmsw_cs" + b, c.mimeType);
            var d = a.h.addSourceBuffer(c.mimeType);
            d ? (a.C.push(d),
            c = hq(oq, a.A, c, d, function() {
                a: if (!a.o) {
                    for (var e = ba(a.l), f = e.next(); !f.done; f = e.next())
                        if (f = f.value,
                        !f.D || f.h.updating || f.w.length)
                            break a;
                    a.h.endOfStream();
                    a.o = !0;
                    nh(a.w)
                }
            }, b),
            a.l.push(c)) : xg(J.B(), "msmsw_sbf" + b)
        }
        wg(J.B(), "msmsw_ns", a.C.length.toString())
    };
    tq.prototype.R = function() {
        this.g && window.URL.revokeObjectURL(this.g);
        for (var a = ba(this.l), b = a.next(); !b.done; b = a.next())
            b.value.W();
        nh(this.w);
        K.prototype.R.call(this)
    }
    ;
    var uq = function() {
        throw Error("Do not instantiate directly");
    };
    uq.prototype.g = null;
    uq.prototype.getContent = function() {
        return this.content
    }
    ;
    uq.prototype.toString = function() {
        return this.content
    }
    ;
    var vq = function() {
        uq.call(this)
    };
    y(vq, uq);
    var wq = function(a) {
        function b(c) {
            this.content = c
        }
        b.prototype = a.prototype;
        return function(c, d) {
            c = new b(String(c));
            void 0 !== d && (c.g = d);
            return c
        }
    }(vq);
    var xq = function() {
        if (window.MutationObserver) {
            var a = [];
            (new MutationObserver(function() {
                a.forEach(function(b) {
                    return b()
                });
                a = []
            }
            )).observe(document.createTextNode(""), {
                characterData: !0
            })
        }
    };
    "function" === typeof Promise && -1 < String(Promise).indexOf("[native code]") || xq();
    var yq = function(a) {
        L.call(this);
        this.g = a || "goog_" + Bc++;
        this.o = []
    };
    y(yq, L);
    yq.prototype.h = !1;
    yq.prototype.connect = function() {
        for (this.h = !0; 0 != this.o.length; ) {
            var a = this.o.shift();
            this.sendMessage(a.name, a.type, a.data)
        }
    }
    ;
    yq.prototype.send = function(a, b, c) {
        this.h ? this.sendMessage(a, b, c) : this.o.push({
            name: a,
            type: b,
            data: c
        })
    }
    ;
    var zq = function(a, b, c, d, e) {
        Qg.call(this, a);
        this.ca = b;
        this.fa = c;
        this.Rb = d;
        this.Dd = e
    };
    y(zq, Qg);
    zq.prototype.toString = function() {
        return ""
    }
    ;
    var Aq = function(a, b) {
        L.call(this);
        this.o = a;
        this.A = b;
        this.h = this.o.currentTime;
        this.g = new sh(250);
        Pg(this, this.g);
        this.w = new Dp(this);
        Pg(this, this.w);
        Fp(this.w, this.g, "tick", this.C, !1, this)
    };
    p(Aq, L);
    Aq.prototype.sa = function() {
        return this.h
    }
    ;
    Aq.prototype.start = function() {
        Bq(this);
        this.g.start()
    }
    ;
    Aq.prototype.stop = function() {
        this.g.stop()
    }
    ;
    Aq.prototype.C = function() {
        var a = this.o.currentTime;
        a != this.sa() && (this.h = a,
        Bq(this))
    }
    ;
    var Bq = function(a) {
        a.A.send("contentTimeUpdate", "contentTimeUpdate", {
            currentTime: a.sa()
        })
    };
    var Cq = function(a) {
        this.g = a
    };
    Cq.prototype.getContent = function() {
        return this.g.content
    }
    ;
    Cq.prototype.h = function() {
        return this.g.contentType
    }
    ;
    Cq.prototype.o = function() {
        return this.g.size.width
    }
    ;
    Cq.prototype.l = function() {
        return this.g.size.height
    }
    ;
    var Dq = function(a) {
        return (a = a.g.backupCompanions) ? a.map(function(b) {
            return new Cq(b)
        }) : []
    };
    var Eq = function(a, b) {
        this.h = a;
        this.g = b
    };
    Eq.prototype.o = function() {
        return this.h
    }
    ;
    Eq.prototype.l = function() {
        return this.g
    }
    ;
    var Fq = function() {
        this.g = []
    };
    var Gq = !1
      , Hq = function(a) {
        if (a = a.match(/[\d]+/g))
            a.length = 3
    };
    (function() {
        if (navigator.plugins && navigator.plugins.length) {
            var a = navigator.plugins["Shockwave Flash"];
            if (a && (Gq = !0,
            a.description)) {
                Hq(a.description);
                return
            }
            if (navigator.plugins["Shockwave Flash 2.0"]) {
                Gq = !0;
                return
            }
        }
        if (navigator.mimeTypes && navigator.mimeTypes.length && (a = navigator.mimeTypes["application/x-shockwave-flash"],
        Gq = !(!a || !a.enabledPlugin))) {
            Hq(a.enabledPlugin.description);
            return
        }
        if ("undefined" != typeof ActiveXObject) {
            try {
                var b = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.7");
                Gq = !0;
                Hq(b.GetVariable("$version"));
                return
            } catch (c) {}
            try {
                b = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.6");
                Gq = !0;
                return
            } catch (c) {}
            try {
                b = new ActiveXObject("ShockwaveFlash.ShockwaveFlash"),
                Gq = !0,
                Hq(b.GetVariable("$version"))
            } catch (c) {}
        }
    }
    )();
    var Iq = Gq;
    var Jq = function(a, b) {
        b = void 0 === b ? null : b;
        this.l = a;
        this.h = null != b ? b : new Fq;
        this.g = null != this.h.g ? this.h.g : []
    }
      , Mq = function(a, b) {
        var c = [];
        b.forEach(function(d) {
            !Rb(d.getContent()) && (isNaN(d.g.sequenceNumber) || isNaN(d.g.masterSequenceNumber) || d.g.masterSequenceNumber == d.g.sequenceNumber) && Kq(a, d) ? c.push(d) : (d = Lq(a, d),
            null != d && !Rb(d.getContent()) && c.push(d))
        });
        return c
    }
      , Kq = function(a, b) {
        var c;
        if (c = "Flash" != b.h() || Iq)
            c = b.g.adSlotId,
            c = 0 == a.g.length ? !0 : null != c ? a.g.includes(c) : !1;
        c ? (b = b.g.size,
        a = a.l,
        a = a == b || a && b && a.width == b.width && a.height == b.height ? !0 : !1) : a = !1;
        return a
    }
      , Lq = function(a, b) {
        b = Dq(b);
        return null == b ? null : b.find(function(c) {
            return Kq(a, c)
        }) || null
    };
    var Nq = function() {
        this.A = 1;
        this.l = -1;
        this.g = 1;
        this.w = this.o = 0;
        this.h = !1
    };
    m = Nq.prototype;
    m.Ee = function() {
        return this.A
    }
    ;
    m.Be = function() {
        return this.l
    }
    ;
    m.ze = function() {
        return this.g
    }
    ;
    m.Ce = function() {
        return this.o
    }
    ;
    m.De = function() {
        return this.w
    }
    ;
    m.Ae = function() {
        return this.h
    }
    ;
    var T = function(a) {
        this.g = a
    };
    T.prototype.h = function() {
        return this.g.adId
    }
    ;
    T.prototype.l = function() {
        return this.g.creativeAdId
    }
    ;
    T.prototype.o = function() {
        return this.g.creativeId
    }
    ;
    var Oq = function(a) {
        return a.g.adQueryId
    };
    m = T.prototype;
    m.Ie = function() {
        return this.g.adSystem
    }
    ;
    m.Je = function() {
        return this.g.advertiserName
    }
    ;
    m.Ke = function() {
        return this.g.apiFramework
    }
    ;
    m.ff = function() {
        return this.g.adWrapperIds
    }
    ;
    m.hf = function() {
        return this.g.adWrapperCreativeIds
    }
    ;
    m.gf = function() {
        return this.g.adWrapperSystems
    }
    ;
    m.isLinear = function() {
        return this.g.linear
    }
    ;
    m.jf = function() {
        return this.g.skippable
    }
    ;
    m.Me = function() {
        return this.g.contentType
    }
    ;
    m.Oe = function() {
        return this.g.description
    }
    ;
    m.Ue = function() {
        return this.g.title
    }
    ;
    m.getDuration = function() {
        return this.g.duration
    }
    ;
    m.cf = function() {
        return this.g.vastMediaWidth
    }
    ;
    m.bf = function() {
        return this.g.vastMediaHeight
    }
    ;
    m.df = function() {
        return this.g.width
    }
    ;
    m.Pe = function() {
        return this.g.height
    }
    ;
    m.Xe = function() {
        return this.g.uiElements
    }
    ;
    m.Re = function() {
        return this.g.minSuggestedDuration
    }
    ;
    m.He = function() {
        var a = this.g.adPodInfo
          , b = new Nq;
        b.o = a.podIndex;
        b.w = a.timeOffset;
        b.A = a.totalAds;
        b.g = a.adPosition;
        b.h = a.isBumper;
        b.l = a.maxDuration;
        return b
    }
    ;
    m.Le = function(a, b, c) {
        var d = this.g.companions.map(function(e) {
            return new Cq(e)
        });
        return Mq(new Jq(new E(a,b),c), d)
    }
    ;
    m.Ve = function() {
        return fq(Ac(this.g.traffickingParameters))
    }
    ;
    m.We = function() {
        return this.g.traffickingParameters
    }
    ;
    m.af = function() {
        return this.g.vastMediaBitrate
    }
    ;
    m.Qe = function() {
        return this.g.mediaUrl
    }
    ;
    m.Te = function() {
        return this.g.surveyUrl
    }
    ;
    m.Ne = function() {
        return this.g.dealId
    }
    ;
    m.$e = function() {
        return (this.g.universalAdIds || []).map(function(a) {
            return new Eq(a.adIdValue,a.adIdRegistry)
        })
    }
    ;
    m.Ze = function() {
        return this.g.universalAdIdValue
    }
    ;
    m.Ye = function() {
        return this.g.universalAdIdRegistry
    }
    ;
    m.Se = function() {
        return this.g.skipTimeOffset
    }
    ;
    m.kf = function() {
        return this.g.disableUi
    }
    ;
    var Pq = function(a, b, c) {
        this.l = b;
        this.h = c;
        this.o = a
    };
    y(Pq, Error);
    m = Pq.prototype;
    m.we = function() {
        return this.g
    }
    ;
    m.xe = function() {
        return this.l
    }
    ;
    m.ve = function() {
        return this.h
    }
    ;
    m.je = function() {
        return 1E3 > this.h ? this.h : 900
    }
    ;
    m.ye = function() {
        return this.o
    }
    ;
    m.toString = function() {
        return "AdError " + this.h + ": " + this.l + (null != this.g ? " Caused by: " + this.g : "")
    }
    ;
    var Qq = function(a) {
        if (null == a.errorCode || null == a.errorMessage || null == a.type)
            return null;
        for (var b = new Pq(a.type,a.errorMessage,a.errorCode), c = b, d = a.innerError, e = 0; 3 > e; ++e)
            if (d instanceof Object) {
                var f = new Pq(d.type,d.errorMessage,d.errorCode);
                c = c.g = f;
                d = d.innerError
            } else {
                null != d && (c.g = Error(a.innerError));
                break
            }
        return b
    };
    var Rq = function(a, b) {
        Qg.call(this, "adError");
        this.h = a;
        this.o = b ? b : null
    };
    y(Rq, Qg);
    Rq.prototype.w = function() {
        return this.h
    }
    ;
    Rq.prototype.A = function() {
        return this.o
    }
    ;
    var U = {}
      , Sq = (U.creativeView = "creativeview",
    U.start = "start",
    U.midpoint = "midpoint",
    U.firstQuartile = "firstquartile",
    U.thirdQuartile = "thirdquartile",
    U.complete = "complete",
    U.mute = "mute",
    U.unmute = "unmute",
    U.pause = "pause",
    U.rewind = "rewind",
    U.resume = "resume",
    U.fullscreen = "fullscreen",
    U.exitFullscreen = "exitfullscreen",
    U.expand = "expand",
    U.collapse = "collapse",
    U.close = "close",
    U.acceptInvitation = "acceptinvitation",
    U.userInteraction = "userInteraction",
    U.adCanPlay = "adCanPlay",
    U.adStarted = "adStarted",
    U.abandon = "abandon",
    U.acceptInvitationLinear = "acceptinvitationlinear",
    U.engagedView = "engagedview",
    U.instreamAdComplete = "instreamAdComplete",
    U.skipShown = "skipshown",
    U.skippableStateChanged = "skippableStateChanged",
    U.skip = "skip",
    U.progress = "progress",
    U.publisher_invoked_skip = "PUBLISHER_INVOKED_SKIP",
    U.annotation_start = "annotation_start",
    U.annotation_click = "annotation_click",
    U.annotation_close = "annotation_close",
    U.cta_annotation_shown = "cta_annotation_shown",
    U.cta_annotation_clicked = "cta_annotation_clicked",
    U.cta_annotation_closed = "cta_annotation_closed",
    U.replay = "replay",
    U.stop = "stop",
    U.autoplayDisallowed = "autoplayDisallowed",
    U.error = "error",
    U.mediaLoadTimeout = "mediaLoadTimeout",
    U.linearChanged = "linearChanged",
    U.click = "click",
    U.contentPauseRequested = "contentPauseRequested",
    U.contentResumeRequested = "contentResumeRequested",
    U.discardAdBreak = "discardAdBreak",
    U.updateAdsRenderingSettings = "updateAdsRenderingSettings",
    U.durationChange = "durationChange",
    U.expandedChanged = "expandedChanged",
    U.autoClose = "autoClose",
    U.userClose = "userClose",
    U.userRecall = "userRecall",
    U.prefetched = "prefetched",
    U.loaded = "loaded",
    U.init = "init",
    U.allAdsCompleted = "allAdsCompleted",
    U.adMetadata = "adMetadata",
    U.adBreakReady = "adBreakReady",
    U.adBreakFetchError = "adBreakFetchError",
    U.log = "log",
    U.volumeChange = "volumeChange",
    U.companionBackfill = "companionBackfill",
    U.companionInitialized = "companionInitialized",
    U.companionImpression = "companionImpression",
    U.companionClick = "companionClick",
    U.impression = "impression",
    U.interaction = "interaction",
    U.adProgress = "adProgress",
    U.adBuffering = "adBuffering",
    U.trackingUrlPinged = "trackingUrlPinged",
    U.measurable_impression = "measurable_impression",
    U.custom_metric_viewable = "custom_metric_viewable",
    U.viewable_impression = "viewable_impression",
    U.fully_viewable_audible_half_duration_impression = "fully_viewable_audible_half_duration_impression",
    U.overlay_resize = "overlay_resize",
    U.overlay_unmeasurable_impression = "overlay_unmeasurable_impression",
    U.overlay_unviewable_impression = "overlay_unviewable_impression",
    U.overlay_viewable_immediate_impression = "overlay_viewable_immediate_impression",
    U.overlay_viewable_end_of_session_impression = "overlay_viewable_end_of_session_impression",
    U.externalActivityEvent = "externalActivityEvent",
    U.adEvent = "adEvent",
    U.configure = "configure",
    U.remainingTime = "remainingTime",
    U.destroy = "destroy",
    U.resize = "resize",
    U.volume = "volume",
    U.sendAbandonUrls = "sendAbandonUrls",
    U.authorIconClicked = "videoAuthorIconClicked",
    U.authorNameClicked = "videoAuthorClicked",
    U.videoClicked = "videoClicked",
    U.videoIconClicked = "videoIconClicked",
    U.learnMoreClicked = "videoLearnMoreClicked",
    U.muteClicked = "videoMuteClicked",
    U.titleClicked = "videoTitleClicked",
    U.skipShown = "SKIP_SHOWN",
    U.videoSkipClicked = "SKIPPED",
    U.unmuteClicked = "videoUnmuteClicked",
    U.vpaidEvent = "vpaidEvent",
    U.show_ad = "show_ad",
    U.video_card_endcap_collapse = "video_card_endcap_collapse",
    U.video_card_endcap_dismiss = "video_card_endcap_dismiss",
    U.video_card_endcap_impression = "video_card_endcap_impression",
    U.mediaUrlPinged = "mediaUrlPinged",
    U.breakStart = "breakstart",
    U.breakEnd = "breakend",
    U.omidReady = "omidReady",
    U.omidUnavailable = "omidUnavailable",
    U.omidAdSessionCompleted = "omidAdSessionCompleted",
    U.omidAdSessionAbandoned = "omidAdSessionAbandoned",
    U.verificationNotExecuted = "verificationNotExecuted",
    U.loadStart = "loadStart",
    U.seeked = "seeked",
    U.seeking = "seeking",
    U);
    var Tq = function(a, b, c) {
        b = void 0 === b ? null : b;
        c = void 0 === c ? null : c;
        Qg.call(this, a);
        this.A = b;
        this.w = null != c ? c : null
    };
    y(Tq, Qg);
    Tq.prototype.C = function() {
        return this.A
    }
    ;
    Tq.prototype.H = function() {
        return this.w
    }
    ;
    var Uq = function(a) {
        this.g = a
    };
    Uq.prototype.h = function() {
        return this.g
    }
    ;
    var Vq = function() {
        this.loadVideoTimeout = 8E3;
        this.autoAlign = !0;
        this.bitrate = -1;
        this.uiElements = null;
        this.enablePreloading = this.disableClickThrough = !1;
        this.mimeTypes = null;
        this.useStyledNonLinearAds = this.useStyledLinearAds = this.useLearnMoreButton = this.restoreCustomPlaybackStateOnAdBreakComplete = !1;
        this.playAdsAfterTime = -1;
        this.useVideoAdUi = !0;
        this.disableUi = !1
    }
      , Wq = function(a, b) {
        var c = {};
        Object.assign(c, a);
        b && (c.useClickElement = !1,
        c.disableClickThrough = !0);
        return c
    };
    var Xq = function(a) {
        this.g = a
    }
      , $q = function() {
        var a = Yq(V);
        return Zq(a, "disableExperiments")
    }
      , Zq = function(a, b) {
        return yb(a.g, b) && (a = a.g[b],
        "boolean" === typeof a) ? a : !1
    }
      , ar = function(a) {
        if (yb(a.g, "forceExperimentIds")) {
            a = a.g.forceExperimentIds;
            var b = []
              , c = 0;
            Fa(a) && a.forEach(function(d) {
                "number" === typeof d && (b[c++] = d)
            });
            return b
        }
        return null
    };
    var W = function() {
        this.w = "always";
        this.H = 4;
        this.G = 1;
        this.g = 0;
        this.h = !0;
        this.A = "en";
        this.N = !1;
        this.D = this.M = "";
        this.F = null;
        this.Y = this.O = -1;
        this.V = this.K = this.J = "";
        this.o = !1;
        this.l = !0;
        try {
            this.aa = wi(void 0)[0]
        } catch (a) {}
    }
      , br = function(a) {
        a = Ac(a);
        Rb(a) || (a = a.substring(0, 20));
        return a
    };
    m = W.prototype;
    m.Gf = function(a) {
        this.w = a
    }
    ;
    m.xf = function() {
        return this.w
    }
    ;
    m.Mf = function(a) {
        this.H = a
    }
    ;
    m.Af = function() {
        return this.H
    }
    ;
    m.Pf = function(a) {
        this.P = a
    }
    ;
    m.Df = function() {
        return this.P
    }
    ;
    m.Qf = function(a) {
        "boolean" === typeof a && (this.G = a ? 1 : 0)
    }
    ;
    m.Rf = function(a) {
        this.G = a
    }
    ;
    m.Ff = function(a) {
        this.h = a
    }
    ;
    m.Ef = function() {
        return this.h
    }
    ;
    m.Kf = function(a) {
        this.N = a
    }
    ;
    m.Bb = function() {
        return this.N
    }
    ;
    m.Lf = function(a) {
        if (a = gq(a))
            this.A = a
    }
    ;
    m.ie = function() {
        return this.A
    }
    ;
    m.Nf = function(a) {
        this.M = br(a)
    }
    ;
    m.Bf = function() {
        return this.M
    }
    ;
    m.Of = function(a) {
        this.D = br(a)
    }
    ;
    m.Cf = function() {
        return this.D
    }
    ;
    var Yq = function(a) {
        if (null == a.F) {
            var b = {};
            var c = (new Ao(F().location.href)).h;
            if (So(c, "tcnfp"))
                try {
                    b = JSON.parse(c.get("tcnfp"))
                } catch (d) {}
            a.F = new Xq(b)
        }
        return a.F
    };
    W.prototype.Z = function(a) {
        this.O = a
    }
    ;
    W.prototype.$ = function(a) {
        this.Y = a
    }
    ;
    var er = function() {
        var a = V;
        cr();
        a.J = dr[1] || ""
    }
      , fr = function() {
        var a = V;
        cr();
        a.V = dr[6] || ""
    }
      , gr = function() {
        var a = V;
        cr();
        a.K = dr[4] || ""
    };
    m = W.prototype;
    m.If = function(a) {
        this.o = a
    }
    ;
    m.yf = function() {
        return this.o
    }
    ;
    m.Hf = function(a) {
        this.l = a
    }
    ;
    m.Jf = function() {}
    ;
    m.zf = function() {
        return !0
    }
    ;
    var V = new W;
    var hr = "abort canplay canplaythrough durationchange emptied loadstart loadeddata loadedmetadata progress ratechange seeked seeking stalled suspend waiting".split(" ");
    var ir = function(a, b, c) {
        this.l = a;
        this.g = Math.min(Math.max(b || 0, 0), 1);
        this.h = null != c ? c : !0
    };
    ir.prototype.getId = function() {
        return this.l
    }
    ;
    var jr = function(a) {
        this.l = a;
        this.h = new uo;
        this.g = null
    };
    jr.prototype.getId = function() {
        return this.l
    }
    ;
    var kr = function(a) {
        var b = Math.random()
          , c = 0
          , d = a.h.ka();
        d.forEach(function(h) {
            c += h.g
        });
        var e = 1 < c ? c : 1;
        a.g = null;
        for (var f = 0, g = 0; g < d.length; ++g)
            if (f += d[g].g,
            f / e >= b) {
                a.g = d[g];
                break
            }
    };
    var lr = function() {
        return null != q.G_testRunner
    };
    var or = function() {
        this.h = !1;
        this.g = new uo;
        X(this, "GvnExternalLayer", 31061774, .01);
        X(this, "GvnExternalLayer", 31061775, .01);
        X(this, "GvnExternalLayer", 651800007, .01);
        X(this, "GvnExternalLayer", 651800008, .01);
        X(this, "GvnExternalLayer", 44710986, .05);
        X(this, "GvnExternalLayer", 44710987, .05);
        X(this, "ActiveViewExternalLayer", 42530094, .05);
        X(this, "ActiveViewExternalLayer", 42530095, .05);
        X(this, "ActiveViewExternalLayer", 42530173, .01);
        X(this, "ActiveViewExternalLayer", 42530174, .01);
        X(this, "GvnExternalLayer", 44710216, .01);
        X(this, "GvnExternalLayer", 44710217, .01);
        X(this, "ActiveViewExternalLayer", 668123728, .01);
        X(this, "ActiveViewExternalLayer", 668123729, .01);
        X(this, "ActiveViewExternalLayer", 44710341, .01);
        X(this, "ActiveViewExternalLayer", 44710342, .01);
        X(this, "ActiveViewExternalLayer", 370204080, .001);
        X(this, "ActiveViewExternalLayer", 370204081, .001);
        X(this, "ActiveViewExternalLayer", 44710407, .01);
        X(this, "ActiveViewExternalLayer", 44710408, .01);
        X(this, "GvnExternalLayer", 504733015, 0);
        X(this, "GvnExternalLayer", 504733016, 0);
        X(this, "GvnExternalLayer", 189176E3, .05);
        X(this, "GvnExternalLayer", 189176001, .05);
        X(this, "GvnExternalLayer", 40819802, .01);
        X(this, "GvnExternalLayer", 40819803, .01);
        X(this, "GvnExternalLayer", 420706136, .01);
        X(this, "GvnExternalLayer", 420706137, .01);
        X(this, "GvnExternalLayer", 420706138, .01);
        X(this, "GvnExternalLayer", 420706139, .01);
        X(this, "GvnExternalLayer", 420706140, .01);
        X(this, "GvnExternalLayer", 420706141, .01);
        mr(this);
        var a = Yq(V);
        a = ar(a);
        null != a && (this.h = !0,
        nr(this, a.map(String)))
    }
      , pr = ["ActiveViewExternalLayer"]
      , qr = null
      , rr = function() {
        qr || (qr = new or);
        return qr
    }
      , X = function(a, b, c, d) {
        Rb(Ac(b)) || isNaN(c) || 0 >= c || (c = new ir(c,d),
        sr(a, b).h.set(c.getId(), c))
    }
      , mr = function(a) {
        $q() || a.g.ka().forEach(function(b) {
            kr(b)
        })
    }
      , tr = function(a, b, c, d) {
        isNaN(b) || 0 >= b || Rb(Ac(c)) || (a.h = !0,
        d = null != d ? d : !0,
        sr(a, c).g = new ir(b,0,d))
    }
      , nr = function(a, b) {
        b.forEach(function(c) {
            tr(a, Number(c), "FORCED_PUB_EXP_LAYER_" + c, void 0)
        })
    }
      , ur = function() {
        var a = {};
        rr().g.ka().forEach(function(b) {
            var c = b.g;
            if (c) {
                var d = {};
                d.experimentId = c.getId();
                d.shouldReport = c.h;
                a[b.getId()] = d
            } else
                a[b.getId()] = {}
        });
        return a
    }
      , vr = function(a, b) {
        return a.h || ($q() ? 0 : !lr()) ? a.g.ka().some(function(c) {
            return !!c.g && c.g.getId() == b
        }) : !1
    }
      , wr = function() {
        var a = rr();
        if (!a.h && ($q() || lr()))
            return "";
        var b = [];
        a.g.ka().forEach(function(c) {
            (c = c.g) && c.h && b.push(c.getId())
        });
        a = eg();
        return b.concat(a).sort().join(",")
    }
      , sr = function(a, b) {
        var c = a.g.get(b);
        null == c && (c = new jr(b),
        a.g.set(b, c));
        return c
    }
      , xr = function() {
        var a = []
          , b = rr();
        pr.forEach(function(c) {
            (c = (c = sr(b, c)) ? c.g : null) && a.push(c.getId())
        });
        return a
    };
    var yr = function(a) {
        this.lb = this.gdprApplies = "";
        vr(rr(), 44710217) && (this.gdprApplies = a.gdprApplies || "",
        this.lb = a.tcString || "")
    };
    var Br = function() {
        var a = "h.3.355.3";
        null != zr && (a += "/n." + zr,
        null != Ar && (a += "/" + Ar));
        return a
    }
      , Ar = null
      , Cr = null
      , zr = null;
    vr(rr(), 504733016);
    var Dr = null;
    new function(a, b, c) {
        c = void 0 === c ? {} : c;
        new yr(c)
    }
    ;
    var Er = function(a) {
        var b = Yq(V);
        return b && Zq(b, "forceCustomPlayback") || V.Bb() || (Vc || Tc || yp()) && (!Tc && !yp() && !zp(10) || !a) || Rc && (!Rc || !xp(wp, 4)) ? !0 : uj() ? !(Gg.jb || Gg.g) : !1
    }
      , Fr = function(a) {
        return null == a ? !1 : V.Bb() ? !0 : Vc || Tc || yp() ? Ap(a) ? Tc || yp() || zp(10) && V.o ? !1 : !0 : !0 : Rc && (!Rc || !xp(wp, 4)) || uj() ? !0 : !1
    }
      , Gr = function() {
        var a = Yq(V);
        return a && Zq(a, "disableOnScreenDetection") ? !1 : !sj()
    };
    function Hr(a) {
        a = lp(a, sj() ? "https" : window.location.protocol);
        if (sj())
            Ir(a);
        else
            try {
                a && (Xo(a) ? ap(a) : fp(a))
            } catch (b) {}
    }
    function Ir(a) {
        (new cq).get(a, new sp).then(function() {}, function() {})
    }
    ;var Jr = function(a, b) {
        this.message = a;
        this.g = b
    }
      , Kr = new Jr("Failed to initialize ad playback element before starting ad playback.",400)
      , Lr = new Jr("The provided {0} information: {1} is invalid.",1101)
      , Mr = function(a, b, c) {
        var d = void 0 === b ? null : b;
        if (!(d instanceof Pq)) {
            var e = a.g
              , f = a.message
              , g = Array.prototype.slice.call(arguments, 2);
            if (0 < g.length)
                for (var h = 0; h < g.length; h++)
                    f = f.replace(new RegExp("\\{" + h + "\\}","ig"), g[h]);
            e = new Pq("adPlayError",f,e);
            e.g = d;
            d = e
        }
        return d
    };
    var Nr = function() {
        var a = F()
          , b = document;
        return new Ao(a.parent == a ? a.location.href : b.referrer)
    }
      , Or = function(a, b) {
        No(a, "url", "");
        try {
            var c = 2083 - a.toString().length - 1;
            if (0 >= c)
                return a.toString();
            for (var d = b.slice(0, c), e = encodeURIComponent(d), f = c; 0 < f && e.length > c; )
                d = b.slice(0, f--),
                e = encodeURIComponent(d);
            No(a, "url", d)
        } catch (g) {}
        return a.toString()
    };
    var Pr = function() {
        this.g = .01 > Math.random();
        this.h = Math.floor(4503599627370496 * Math.random())
    };
    Pr.prototype.report = function(a, b, c) {
        b = void 0 === b ? {} : b;
        if (!lr() && (this.g || (void 0 === c ? 0 : c))) {
            b.lid = a;
            b.sdkv = Br();
            a = wr();
            Rb(Ac(a)) || (b.e = a);
            b = Qr(this, b);
            var d = new Ao("http://pagead2.googlesyndication.com/pagead/gen_204");
            ob(b, function(e, f) {
                No(d, f, null == e ? "" : "boolean" == typeof e ? e ? "t" : "f" : "" + e)
            }, this);
            b = Nr();
            Bo(d, b.o);
            b = d.toString();
            a = d.h.get("url");
            null != a && mc() && 2083 < b.length && (b = Or(d, a));
            Hr(b)
        }
    }
    ;
    var Qr = function(a, b) {
        b.id = "ima_html5";
        var c = Nr();
        b.c = a.h;
        b.domain = c.g;
        return b
    };
    Da(Pr);
    var Rr = function() {
        L.call(this);
        this.C = this.G = this.K = this.D = !1;
        this.h = 0;
        this.w = [];
        this.F = !1;
        this.O = this.N = Infinity;
        this.o = 0;
        this.A = new Dp(this);
        this.J = {}
    };
    p(Rr, L);
    var Tr = function(a, b) {
        null == b || a.D || (a.g = b,
        Sr(a),
        a.D = !0)
    }
      , Vr = function(a) {
        null != a.g && a.D && (Ur(a),
        a.D = !1,
        a.G = !1,
        a.C = !1,
        a.h = 0,
        a.w = [],
        a.F = !1)
    }
      , Sr = function(a) {
        Ur(a);
        !(a.g instanceof L) && "ontouchstart"in document.documentElement && Vc ? (a.J = {
            touchstart: Ma(a.$, a),
            touchmove: Ma(a.Y, a),
            touchend: Ma(a.Z, a)
        },
        ob(a.J, function(b, c) {
            this.g.addEventListener(c, b, !1)
        }, a)) : a.A.T(a.g, "click", a.V)
    }
      , Ur = function(a) {
        a.A.Da(a.g, "click", a.V);
        ob(a.J, function(b, c) {
            this.g.removeEventListener(c, b, !1)
        }, a);
        a.J = {}
    };
    Rr.prototype.$ = function(a) {
        this.G = !0;
        this.h = a.touches.length;
        this.o && (window.clearTimeout(this.o),
        this.o = 0,
        this.K = !0);
        (this.F = Wr(this, a.touches) || 1 != a.touches.length) ? this.O = this.N = Infinity : (this.N = a.touches[0].clientX,
        this.O = a.touches[0].clientY);
        a = a.touches;
        this.w = [];
        for (var b = 0; b < a.length; b++)
            this.w.push(a[b].identifier)
    }
    ;
    Rr.prototype.Y = function(a) {
        this.h = a.touches.length;
        if (!zp(8) || Math.pow(a.changedTouches[0].clientX - this.N, 2) + Math.pow(a.changedTouches[0].clientY - this.O, 2) > Math.pow(5, 2))
            this.C = !0
    }
    ;
    Rr.prototype.Z = function(a) {
        !this.G || 1 != this.h || this.C || this.K || this.F || !Wr(this, a.changedTouches) || (this.o = window.setTimeout(Ma(this.P, this), 300));
        this.h = a.touches.length;
        0 == this.h && (this.C = this.G = !1,
        this.w = []);
        this.K = !1
    }
    ;
    Rr.prototype.V = function() {
        this.P()
    }
    ;
    var Wr = function(a, b) {
        for (var c = 0; c < b.length; c++)
            if (a.w.includes(b[c].identifier))
                return !0;
        return !1
    };
    Rr.prototype.P = function() {
        this.o = 0;
        this.dispatchEvent(new Qg("click"))
    }
    ;
    Rr.prototype.R = function() {
        Vr(this);
        this.A.W();
        this.A = null;
        L.prototype.R.call(this)
    }
    ;
    var Xr = function(a, b) {
        yq.call(this, b);
        this.w = a;
        this.va = null;
        this.A = new Dp(this);
        this.A.T(F(), "message", this.C)
    };
    y(Xr, yq);
    var Yr = function(a) {
        if (null == a || "string" !== typeof a || 0 != a.lastIndexOf("ima://", 0))
            return null;
        a = a.substr(6);
        try {
            return JSON.parse(a)
        } catch (b) {
            return null
        }
    };
    Xr.prototype.sendMessage = function(a, b, c) {
        null != this.va && null != this.va.postMessage && this.va.postMessage(Zr(this, a, b, c), "*");
        null != this.va && null == this.va.postMessage && Pr.B().report(11)
    }
    ;
    Xr.prototype.R = function() {
        Og(this.A);
        this.va = null;
        Xr.wa.R.call(this)
    }
    ;
    Xr.prototype.C = function(a) {
        a = a.h;
        var b = Yr(a.data);
        if ($r(this, b)) {
            if (null == this.va)
                this.va = a.source,
                this.h || this.connect();
            else if (this.va != a.source)
                return;
            $r(this, b) && this.dispatchEvent(new zq(b.name,b.type,b.data || {},b.sid,a.origin))
        }
    }
    ;
    var Zr = function(a, b, c, d) {
        var e = {};
        e.name = b;
        e.type = c;
        null != d && (e.data = d);
        e.sid = a.g;
        e.channel = a.w;
        return "ima://" + Sf(e)
    }
      , $r = function(a, b) {
        if (null == b)
            return !1;
        var c = b.channel;
        if (null == c || c != a.w)
            return !1;
        b = b.sid;
        return null == b || "*" != a.g && b != a.g ? !1 : !0
    };
    var as = function(a, b) {
        L.call(this);
        this.w = a;
        this.o = b;
        this.g = {};
        this.h = new Dp(this);
        this.h.T(F(), "message", this.A)
    };
    y(as, L);
    as.prototype.send = function(a) {
        var b = a.h;
        this.g.hasOwnProperty(b) && this.g[b].send(a.type, a.ca, a.fa)
    }
    ;
    var cs = function(a, b, c, d) {
        a.g.hasOwnProperty(b) || (c = new Xr(b,c),
        a.h.T(c, a.w, function(e) {
            this.dispatchEvent(new bs(e.type,e.ca,e.fa,e.Rb,e.Dd,b))
        }),
        c.va = d,
        c.connect(),
        a.g[b] = c)
    };
    as.prototype.R = function() {
        this.h.W();
        for (var a in this.g)
            Og(this.g[a]);
        as.wa.R.call(this)
    }
    ;
    as.prototype.A = function(a) {
        a = a.h;
        var b = Yr(a.data);
        if (null != b) {
            var c = b.channel;
            if (this.o && !this.g.hasOwnProperty(c)) {
                var d = b.sid;
                cs(this, c, d, a.source);
                this.dispatchEvent(new bs(b.name,b.type,b.data || {},d,a.origin,c))
            }
        }
    }
    ;
    var bs = function(a, b, c, d, e, f) {
        zq.call(this, a, b, c, d, e);
        this.h = f
    };
    y(bs, zq);
    var es = function() {
        var a = Ba("google.ima.gptProxyInstance", F());
        if (null != a)
            return a;
        Dp.call(this);
        this.l = new as("gpt",!0);
        Pg(this, this.l);
        this.T(this.l, "gpt", this.A);
        this.g = null;
        ds() || F().top === F() || (this.g = new as("gpt",!1),
        Pg(this, this.g),
        this.T(this.g, "gpt", this.w))
    };
    y(es, Dp);
    var ds = function() {
        return !!Ba("googletag.cmd", F())
    }
      , fs = function() {
        var a = Ba("googletag.console", F());
        return null != a ? a : null
    };
    es.prototype.A = function(a) {
        var b = a.Dd
          , c = "//imasdk.googleapis.com".match(me);
        b = b.match(me);
        if (c[3] == b[3] && c[4] == b[4])
            if (null != this.g)
                cs(this.g, a.h, a.Rb, F().parent),
                null != this.g && this.g.send(a);
            else if (c = a.fa,
            null != c && void 0 !== c.scope) {
                b = c.scope;
                c = c.args;
                var d;
                if ("proxy" == b)
                    c = a.ca,
                    "isGptPresent" == c ? d = ds() : "isConsolePresent" == c && (d = null != fs());
                else if (ds())
                    if ("pubads" == b || "companionAds" == b) {
                        d = a.ca;
                        var e = F().googletag;
                        if (null != e && null != e[b] && (e = e[b](),
                        null != e && (d = e[d],
                        null != d)))
                            try {
                                var f = d.apply(e, c)
                            } catch (g) {}
                        d = f
                    } else if ("console" == b) {
                        if (f = fs(),
                        null != f && (e = f[a.ca],
                        null != e))
                            try {
                                e.apply(f, c)
                            } catch (g) {}
                    } else if (null === b) {
                        d = a.ca;
                        f = F();
                        if (["googleGetCompanionAdSlots", "googleSetCompanionAdContents"].includes(d) && (d = f[d],
                        null != d))
                            try {
                                e = d.apply(f, c)
                            } catch (g) {}
                        d = e
                    }
                void 0 !== d && (a.fa.returnValue = d,
                this.l.send(a))
            }
    }
    ;
    es.prototype.w = function(a) {
        this.l.send(a)
    }
    ;
    var gs = function(a, b) {
        if (a.g) {
            var c = a.g;
            Og(c.g[b]);
            delete c.g[b]
        }
        a.l && (a = a.l,
        Og(a.g[b]),
        delete a.g[b])
    };
    var hs = function() {
        L.call(this);
        this.g = null;
        this.D = new Dp(this);
        Pg(this, this.D);
        this.h = new Map;
        this.w = new Map;
        this.o = this.A = !1;
        this.C = null
    }, is;
    y(hs, L);
    var js = null
      , ks = function() {
        null == js && (js = new hs);
        return js
    };
    hs.prototype.Nd = function() {}
    ;
    var lo = function(a, b, c) {
        var d = {};
        d.queryId = b;
        d.viewabilityData = c;
        a.g && a.g.send("activityMonitor", "viewabilityMeasurement", d)
    };
    hs.prototype.destroy = function() {
        this.D.Da(this.g, "activityMonitor", this.F);
        this.o = !1;
        this.h.clear();
        this === is && (is = null)
    }
    ;
    hs.prototype.R = function() {
        this.destroy();
        hs.wa.R.call(this)
    }
    ;
    var ms = function(a) {
        if (null == a)
            return !1;
        if ((Sc || Uc) && null != a.webkitDisplayingFullscreen)
            return a.webkitDisplayingFullscreen;
        var b = window.screen.availWidth || window.screen.width
          , c = window.screen.availHeight || window.screen.height;
        a = ls(a);
        return 0 >= b - a.width && 42 >= c - a.height
    }
      , ls = function(a) {
        var b = {
            left: a.offsetLeft,
            top: a.offsetTop,
            width: a.offsetWidth,
            height: a.offsetHeight
        };
        try {
            t(a.getBoundingClientRect) && fe(Td(a), a) && (b = a.getBoundingClientRect())
        } catch (c) {}
        return b
    }
      , ns = function(a, b, c, d, e) {
        if (a.o) {
            e = e || {};
            d && null == e.opt_osdId && (e.opt_osdId = d);
            if (a.C)
                return a.C(b, c, e);
            if (a = d ? a.w.get(d) : V.C)
                null == e.opt_fullscreen && (e.opt_fullscreen = ms(a)),
                null == e.opt_adElement && (e.opt_adElement = a);
            return If.Xa(469, Na(oo, b, c, e), void 0) || {}
        }
        return {}
    }
      , os = function(a, b) {
        var c = rr()
          , d = String(Math.floor(1E9 * Math.random()));
        a.w.set(d, b);
        if (vr(c, 31061775))
            try {
                Nh(function(e) {
                    if (a.g) {
                        var f = {};
                        f.engagementString = e;
                        a.g.send("activityMonitor", "engagementData", f)
                    }
                }, function() {
                    return b
                })
            } catch (e) {}
        0 != V.g && mo($n.B(), d, a);
        return d
    }
      , ps = function(a, b, c) {
        if (c)
            a.h.get(c) == b && a.h["delete"](c);
        else {
            var d = [];
            a.h.forEach(function(e, f) {
                e == b && d.push(f)
            });
            d.forEach(a.h["delete"], a.h)
        }
    }
      , go = function(a, b) {
        a = a.h.get(b);
        return t(a) ? a() : {}
    }
      , qs = function(a) {
        if (t(window.Goog_AdSense_Lidar_getUrlSignalsArray)) {
            var b = {};
            b.pageSignals = window.Goog_AdSense_Lidar_getUrlSignalsArray();
            a.g.send("activityMonitor", "pageSignals", b)
        }
    };
    hs.prototype.F = function(a) {
        var b = a.fa
          , c = b.queryId
          , d = {}
          , e = null;
        d.eventId = b.eventId;
        switch (a.ca) {
        case "getPageSignals":
            qs(this);
            break;
        case "reportVastEvent":
            e = b.vastEvent;
            a = b.osdId;
            var f = {};
            f.opt_fullscreen = b.isFullscreen;
            b.isOverlay && (f.opt_bounds = b.overlayBounds);
            d.viewabilityData = ns(this, e, c, a, f);
            this.g.send("activityMonitor", "viewability", d);
            break;
        case "fetchAdTagUrl":
            c = {},
            c.eventId = b.eventId,
            a = b.osdId,
            yb(b, "isFullscreen") && (e = b.isFullscreen),
            yb(b, "loggingId") && (b = b.loggingId,
            c.loggingId = b,
            Pr.B().report(43, {
                step: "beforeLookup",
                logid: b,
                time: v()
            })),
            c.engagementString = rs(this, a, e),
            this.g && this.g.send("activityMonitor", "engagement", c)
        }
    }
    ;
    var rs = function(a, b, c) {
        var d = b ? a.w.get(b) : V.C;
        a = {};
        null != c && (a.fullscreen = c);
        c = "";
        try {
            c = Mh(function() {
                return d
            }, a)
        } catch (e) {
            c = "sdktle;" + yc(e.name, 12) + ";" + yc(e.message, 40)
        }
        return c
    };
    r("ima.common.getVideoMetadata", function(a) {
        return go(ks(), a)
    }, void 0);
    r("ima.common.triggerViewabilityMeasurementUpdate", function(a, b) {
        lo(ks(), a, b)
    }, void 0);
    ks();
    var ts = Mc ? Pb(Jb(Kb('javascript:""'))) : Pb(Jb(Kb("about:blank")));
    Ob(ts);
    var us = Mc ? Pb(Jb(Kb('javascript:""'))) : Pb(Jb(Kb("javascript:undefined")));
    Ob(us);
    var vs = function(a) {
        Qg.call(this, a)
    };
    p(vs, Qg);
    var ws = Pb(Jb(Kb("http://pagead2.googlesyndication.com/omsdk/releases/live/omsdk-v1.js")));
    function xs(a, b) {
        if (!b)
            throw Error("Value for " + a + " is undefined, null or blank.");
        if ("string" !== typeof b && !(b instanceof String))
            throw Error("Value for " + a + " is not a string.");
        if ("" === b.trim())
            throw Error("Value for " + a + " is empty string.");
    }
    function ys(a, b) {
        if (null == b)
            throw Error("Value for " + a + " is undefined or null");
    }
    function zs(a, b) {
        if (null == b)
            throw Error(a + " must not be null or undefined.");
        if ("number" !== typeof b || isNaN(b))
            throw Error("Value for " + a + " is not a number");
    }
    ;function As() {
        return /\d+\.\d+\.\d+(-.*)?/.test("1.2.21-google_20191111")
    }
    function Bs() {
        for (var a = ["1", "2", "21"], b = ["1", "0", "3"], c = 0; 3 > c; c++) {
            var d = parseInt(a[c], 10)
              , e = parseInt(b[c], 10);
            if (d > e)
                break;
            else if (d < e)
                return !1
        }
        return !0
    }
    ;var Cs = {
        LOADED: "loaded",
        hc: "start",
        FIRST_QUARTILE: "firstQuartile",
        MIDPOINT: "midpoint",
        THIRD_QUARTILE: "thirdQuartile",
        COMPLETE: "complete",
        gc: "pause",
        Wc: "resume",
        Vc: "bufferStart",
        Uc: "bufferFinish",
        SKIPPED: "skipped",
        be: "volumeChange",
        gh: "playerStateChange",
        qg: "adUserInteraction"
    };
    var Ds = function(a, b, c, d) {
        this.h = a;
        this.method = b;
        this.version = c;
        this.g = d
    }
      , Es = function(a) {
        return !!a && void 0 !== a.omid_message_guid && void 0 !== a.omid_message_method && void 0 !== a.omid_message_version && "string" === typeof a.omid_message_guid && "string" === typeof a.omid_message_method && "string" === typeof a.omid_message_version && (void 0 === a.omid_message_args || void 0 !== a.omid_message_args)
    }
      , Fs = function(a) {
        return new Ds(a.omid_message_guid,a.omid_message_method,a.omid_message_version,a.omid_message_args)
    }
      , Gs = function(a) {
        var b = {};
        b = (b.omid_message_guid = a.h,
        b.omid_message_method = a.method,
        b.omid_message_version = a.version,
        b);
        void 0 !== a.g && (b.omid_message_args = a.g);
        return b
    };
    var Hs = function(a) {
        this.h = a
    };
    function Is(a, b) {
        return a && (a[b] || (a[b] = {}))
    }
    function Js(a, b) {
        var c;
        if (c = void 0 === c ? "undefined" === typeof omidExports ? null : omidExports : c)
            a = a.split("."),
            a.slice(0, a.length - 1).reduce(Is, c)[a[a.length - 1]] = b
    }
    ;function Ks() {
        return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(a) {
            var b = 16 * Math.random() | 0;
            return "y" === a ? (b & 3 | 8).toString(16) : b.toString(16)
        })
    }
    ;function Ls(a) {
        for (var b = [], c = 0; c < arguments.length; ++c)
            b[c - 0] = arguments[c];
        Ms(function() {
            throw new (Function.prototype.bind.apply(Error, [null, "Could not complete the test successfully - "].concat(ca(b))));
        }, function() {
            return console.error.apply(console, ca(b))
        })
    }
    function Ms(a, b) {
        "undefined" !== typeof jasmine && jasmine ? a() : "undefined" !== typeof console && console && console.error && b()
    }
    ;var Ns = function(a) {
        try {
            return a.frames ? !!a.frames.omid_v1_present : !1
        } catch (b) {
            return !1
        }
    };
    var Os = function(a) {
        this.h = a;
        this.handleExportedMessage = Os.prototype.l.bind(this)
    };
    p(Os, Hs);
    Os.prototype.sendMessage = function(a, b) {
        b = void 0 === b ? this.h : b;
        if (!b)
            throw Error("Message destination must be defined at construction time or when sending the message.");
        b.handleExportedMessage(Gs(a), this)
    }
    ;
    Os.prototype.l = function(a, b) {
        Es(a) && this.g && this.g(Fs(a), b)
    }
    ;
    var Ps = eval("this")
      , Qs = function() {
        if ("undefined" !== typeof omidGlobal && omidGlobal)
            return omidGlobal;
        if ("undefined" !== typeof global && global)
            return global;
        if ("undefined" !== typeof window && window)
            return window;
        if ("undefined" !== typeof Ps && Ps)
            return Ps;
        throw Error("Could not determine global object context.");
    }();
    function Rs(a) {
        return null != a && "undefined" !== typeof a.top && null != a.top
    }
    function Ss(a) {
        if (a === Qs)
            return !1;
        try {
            if ("undefined" === typeof a.location.hostname)
                return !0
        } catch (b) {
            return !0
        }
        return !1
    }
    ;var Ts = function(a, b) {
        this.h = b = void 0 === b ? Qs : b;
        var c = this;
        a.addEventListener("message", function(d) {
            if ("object" === typeof d.data) {
                var e = d.data;
                Es(e) && d.source && c.g && c.g(Fs(e), d.source)
            }
        })
    };
    p(Ts, Hs);
    Ts.prototype.sendMessage = function(a, b) {
        b = void 0 === b ? this.h : b;
        if (!b)
            throw Error("Message destination must be defined at construction time or when sending the message.");
        b.postMessage(Gs(a), "*")
    }
    ;
    var Us = ["omid", "v1_SessionServiceCommunication"];
    function Vs(a) {
        return Us.reduce(function(b, c) {
            return b && b[c]
        }, a)
    }
    ;Js("OmidSessionClient.Partner", function(a, b) {
        xs("Partner.name", a);
        xs("Partner.version", b);
        this.name = a;
        this.version = b
    });
    Js("OmidSessionClient.VerificationScriptResource", function(a, b, c) {
        xs("VerificationScriptResource.resourceUrl", a);
        this.h = a;
        this.l = b;
        this.g = c
    });
    Js("OmidSessionClient.Context", function(a, b) {
        ys("Context.partner", a);
        this.g = a;
        this.h = b
    });
    var Ws = {
        sessionError: "reportError"
    }
      , Xs = Object.keys(Cs).map(function(a) {
        return Cs[a]
    })
      , Ys = ["impressionOccurred"]
      , Zs = function() {
        var a = void 0 === a ? Qs : a;
        this.g = a.omidSessionInterface
    };
    Zs.prototype.sendMessage = function(a, b, c) {
        "registerSessionObserver" == a && (c = [b]);
        Ws[a] && (a = Ws[a]);
        b = this.g;
        0 <= Ys.indexOf(a) && (b = b.adEvents);
        0 <= Xs.indexOf(a) && (b = b.videoEvents);
        b = b[a];
        if (!b)
            throw Error("Unrecognized method name: " + a + ".");
        b.apply(null, ca(c))
    }
    ;
    var bt = function(a, b, c) {
        ys("AdSession.context", a);
        this.C = a;
        if (!b) {
            var d;
            "undefined" === typeof d && "undefined" !== typeof window && window && (d = window);
            d = Rs(d) ? d : Qs;
            var e = void 0 === e ? Ns : e;
            a: {
                b = ba([d, Rs(d) ? d.top : Qs]);
                for (var f = b.next(); !f.done; f = b.next()) {
                    b: {
                        var g = d;
                        f = f.value;
                        var h = e;
                        if (!Ss(f))
                            try {
                                var k = Vs(f);
                                if (k) {
                                    var l = new Os(k);
                                    break b
                                }
                            } catch (n) {}
                        l = h(f) ? new Ts(g,f) : null
                    }
                    if (g = l) {
                        b = g;
                        break a
                    }
                }
                b = null
            }
        }
        this.h = b;
        this.H = c || new Zs;
        this.A = this.w = this.o = !1;
        this.l = {};
        this.h && (this.h.g = this.M.bind(this));
        this.g("setClientInfo", "1.2.21-google_20191111", this.C.g.name, this.C.g.version);
        $s(this, a.h);
        at(this)
    }
      , ct = function(a, b) {
        a.sendMessage("registerSessionObserver", b)
    };
    bt.prototype.error = function(a, b) {
        this.g("sessionError", a, b)
    }
    ;
    bt.prototype.g = function(a, b) {
        for (var c = [], d = 1; d < arguments.length; ++d)
            c[d - 1] = arguments[d];
        this.sendMessage.apply(this, [a, null].concat(ca(c)))
    }
    ;
    bt.prototype.sendMessage = function(a, b, c) {
        for (var d = [], e = 2; e < arguments.length; ++e)
            d[e - 2] = arguments[e];
        if (this.h)
            e = Ks(),
            b && (this.l[e] = b),
            d = new Ds(e,"SessionService." + a,"1.2.21-google_20191111",As() && Bs() ? d : JSON.stringify(d)),
            this.h.sendMessage(d);
        else if (null != this.H.g)
            try {
                this.H.sendMessage(a, b, d)
            } catch (f) {
                Ls("Failed to communicate with SessionInterface with error:"),
                Ls(f)
            }
    }
    ;
    bt.prototype.M = function(a) {
        var b = a.method
          , c = a.h;
        a = a.g;
        if ("response" === b && this.l[c]) {
            var d = As() && Bs() ? a ? a : [] : a && "string" === typeof a ? JSON.parse(a) : [];
            this.l[c].apply(this, d)
        }
        "error" === b && window.console && Ls(a)
    }
    ;
    var $s = function(a, b) {
        b && (b = b.map(function(c) {
            return {
                resourceUrl: c.h,
                vendorKey: c.l,
                verificationParameters: c.g
            }
        }),
        a.g("injectVerificationScriptResources", b))
    }
      , at = function(a) {
        ct(a, function(b) {
            "sessionStart" === b.type && (a.A = !0);
            "sessionFinish" === b.type && (a.A = !1)
        })
    };
    Js("OmidSessionClient.AdSession", bt);
    var dt = function() {
        L.call(this);
        this.g = new uo;
        this.h = null;
        this.o = new Map;
        this.w = new Dp(this);
        Pg(this, this.w);
        this.D = new Map;
        this.C = null;
        this.A = -1;
        Q.B().h = !0;
        Gr()
    };
    y(dt, L);
    var et = null
      , ft = function() {
        null == et && (et = new dt);
        return et
    }
      , gt = function(a, b) {
        var c = {};
        c.queryId = a;
        c.viewabilityString = b;
        ft().dispatchEvent(new vs("measurable_impression",null,c))
    }
      , ht = function(a, b) {
        var c = {};
        c.queryId = a;
        c.viewabilityString = b;
        ft().dispatchEvent(new vs("viewable_impression",null,c))
    }
      , it = function(a, b, c) {
        var d = {};
        d.queryId = a;
        d.viewabilityString = b;
        d.eventName = c;
        ft().dispatchEvent(new vs("externalActivityEvent",null,d))
    };
    dt.prototype.destroy = function() {
        this.w.Da(this.h, "activityMonitor", this.F);
        this.h = null
    }
    ;
    dt.prototype.F = function(a) {
        var b = a.fa;
        switch (a.ca) {
        case "appStateChanged":
            jo($n.B(), b.appState, b.nativeTime);
            break;
        case "externalActivityEvent":
            it(b.queryId, b.viewabilityString, b.eventName);
            break;
        case "measurableImpression":
            gt(b.queryId, b.viewabilityString);
            break;
        case "viewableImpression":
            ht(b.queryId, b.viewabilityString);
            break;
        case "engagementData":
            b = b.engagementString;
            ft().C = b;
            ft().A = v();
            break;
        case "viewability":
            a = b.queryId;
            var c = b.vastEvent;
            this.o.get(a) && "start" == c && this.o.get(a);
            a = b.eventId;
            window.clearTimeout(a);
            if (c = this.g.get(a))
                xo(this.g, a),
                c(b.viewabilityData);
            break;
        case "viewabilityMeasurement":
            var d = $n.B()
              , e = b.queryId;
            b = b.viewabilityData;
            c = Q.B();
            a = S.B();
            if ("exc" == c.U) {
                d.H = b.nativeVolume;
                c = b.exposure || 0;
                var f = b.unmeasurable;
                d = d.C(e, {});
                null != b.presenceData && (null === d.l && (d.l = new Qk),
                Fb(d.l, b.presenceData));
                -1 == d.ma && (d.ma = R(),
                d.qd = d.oa().g.g);
                d.aa += f ? 1 : 0;
                d.jd++;
                wk(d.$c, c, c, !1, 1, !1);
                e = b.insideIframe;
                void 0 !== e && 0 == e && (a.h = !1);
                d.Ga = f || d.Ga;
                b.position && Ik(d, D, a.h, new H(b.position.top,b.position.right,b.position.bottom,b.position.left));
                b.documentSize && (a.o = new E(b.documentSize.width,b.documentSize.height));
                b.viewportSize && (a.g = new H(0,b.viewportSize.width,b.viewportSize.height,0));
                b = b.screenShare;
                d.ba.X = Math.min(Math.max(c, 0), 1);
                d.sd = d.ba.X;
                d.ba.ha = Math.min(Math.max(b, 0), 1)
            }
            break;
        case "engagement":
            a = b.eventId,
            window.clearTimeout(a),
            c = this.g.get(a),
            Pr.B().g && (d = -1,
            this.G && (d = v() - this.G),
            e = !1,
            c || (e = !0),
            yb(b, "loggingId") && Pr.B().report(43, {
                step: "receivedResponse",
                time: v(),
                timeout: e,
                logid: b.loggingId,
                timediff: d
            })),
            c && (xo(this.g, a),
            c(b.engagementString))
        }
    }
    ;
    r("ima.bridge.getNativeViewability", function(a, b) {
        ft();
        b({})
    }, void 0);
    r("ima.bridge.getVideoMetadata", function(a) {
        return (a = ft().D.get(a)) ? a() : {}
    }, void 0);
    r("ima.bridge.triggerViewEvent", ht, void 0);
    r("ima.bridge.triggerMeasurableEvent", gt, void 0);
    r("ima.bridge.triggerExternalActivityEvent", it, void 0);
    Object.entries({
        "application/dash+xml": 1,
        "application/x-javascript": 2,
        "application/x-mpegurl": 3,
        "application/javascript": 4,
        "audio/ogg": 5,
        "audio/mp4": 6,
        "audio/mpeg": 7,
        "audio/wav": 8,
        "text/javascript": 9,
        "video/m4v": 10,
        "video/ogg": 11,
        "video/x-flv": 12,
        "video/3gpp": 13,
        "video/mpt2": 14,
        "video/mp4": 15,
        "video/mpeg": 16,
        "video/quicktime": 17,
        "video/webm": 18
    });
    Js("OmidSessionClient.AdEvents", function(a) {
        ys("AdEvents.adSession", a);
        try {
            if (a.o)
                throw Error("AdEvents already registered.");
            a.o = !0;
            a.g("registerAdEvents")
        } catch (b) {
            throw Error("AdSession already has an ad events instance registered");
        }
    });
    var jt = function(a) {
        ys("VideoEvents.adSession", a);
        try {
            if (a.w)
                throw Error("VideoEvents already registered.");
            a.w = !0;
            a.g("registerVideoEvents");
            this.g = a
        } catch (b) {
            throw Error("AdSession already has a video events instance registered");
        }
    };
    jt.prototype.loaded = function(a) {
        ys("VideoEvents.loaded.vastProperties", a);
        this.g.g("loaded", a)
    }
    ;
    jt.prototype.start = function(a, b) {
        zs("VideoEvents.start.duration", a);
        zs("VideoEvents.start.videoPlayerVolume", b);
        if (0 > b || 1 < b)
            throw Error("Value for VideoEvents.start.videoPlayerVolume is outside the range [0,1]");
        this.g.g("start", a, b)
    }
    ;
    jt.prototype.pause = function() {
        this.g.g("pause")
    }
    ;
    jt.prototype.resume = function() {
        this.g.g("resume")
    }
    ;
    Js("OmidSessionClient.VideoEvents", jt);
    var mt = function(a, b) {
        kt ? a.srcdoc = b : (a = a.contentWindow) && lt(a.document, b)
    }
      , kt = Pc && "srcdoc"in $d(document, "IFRAME")
      , lt = function(a, b) {
        a.open("text/html", "replace");
        a.write(b);
        a.close()
    };
    function nt(a) {
        return (a = ge(a)) && a.omidSessionInterface ? a.omidSessionInterface : null
    }
    function ot(a, b) {
        var c = be("IFRAME", {
            name: b,
            sandbox: "allow-scripts allow-same-origin",
            style: "display: none"
        });
        a.appendChild(c);
        a = "<script src=" + ws.Ma() + ">\x3c/script>";
        b = new Promise(function(d, e) {
            c.addEventListener("load", function() {
                nt(c) ? d(c) : e()
            })
        }
        );
        mt(c, a);
        return b
    }
    ;var pt = function(a, b) {
        L.call(this);
        this.h = nt(a);
        this.g = b
    };
    p(pt, L);
    var rt = function(a) {
        try {
            a.h.registerSessionObserver(function(b) {
                "sessionStart" == b.type ? qt(a, a.g) : "sessionFinish" == b.type && rt(a)
            })
        } catch (b) {
            a.dispatchEvent(new Event("error"))
        }
    }
      , qt = function(a, b) {
        try {
            a.h.setVideoElement(b)
        } catch (c) {
            a.dispatchEvent(new Event("error"))
        }
    };
    var wt = function(a, b, c) {
        K.call(this);
        var d = this;
        this.l = b;
        this.o = c;
        b = new Dp(this);
        Pg(this, b);
        this.w = "goog_" + Bc++;
        this.g = this.h = null;
        ot(a, this.w).then(function(e) {
            return void tt(d, e)
        })["catch"](function() {
            return void ut(d)
        });
        b.T(this.l, "adsManager", function(e) {
            "allAdsCompleted" == e.ca && vt(d)
        })
    };
    p(wt, K);
    var tt = function(a, b) {
        a.h = b;
        var c = {};
        c = (c.frameName = a.w,
        c);
        a.l.send("omid", "iframeReady", c);
        a.g = new pt(b,a.o);
        a.g.T("error", function() {
            return void ut(a)
        });
        rt(a.g)
    }
      , ut = function(a) {
        a.l.send("omid", "iframeFailed");
        a.W()
    }
      , vt = function(a) {
        setTimeout(function() {
            a.W()
        }, 3E3)
    };
    wt.prototype.R = function() {
        this.h && (de(this.h),
        this.h = null);
        K.prototype.R.call(this)
    }
    ;
    var xt = function(a) {
        this.g = a;
        this.l = "";
        this.h = -1;
        this.o = !1
    }
      , zt = function(a, b) {
        if (0 <= a.h) {
            var c = null == b ? function() {}
            : b
              , d = function() {
                yt(a, c);
                a.g.removeEventListener("loadedmetadata", d, !1)
            };
            a.g.addEventListener("loadedmetadata", d, !1);
            a.g.src = a.l;
            a.g.load()
        } else
            null != b && b()
    }
      , yt = function(a, b) {
        var c = 0 < a.g.seekable.length;
        a.o ? c ? (a.g.currentTime = a.h,
        At(a),
        b()) : setTimeout(function() {
            return yt(a, b)
        }, 100) : (At(a),
        b())
    }
      , At = function(a) {
        a.h = -1;
        a.l = "";
        a.o = !1
    };
    var Bt = function(a) {
        L.call(this);
        this.g = a;
        this.Y = null;
        this.w = new xt(a);
        this.A = 0;
        this.F = this.K = this.N = this.$ = this.D = !1;
        this.G = this.o = null;
        this.aa = new E(this.g.offsetWidth,this.g.offsetHeight);
        this.Z = ms(this.g);
        this.V = !1
    };
    p(Bt, L);
    Bt.prototype.pa = function() {
        var a = this.w;
        a.l = a.g.currentSrc;
        a.o = 0 < a.g.seekable.length;
        a.h = a.g.ended ? -1 : a.g.currentTime
    }
    ;
    Bt.prototype.P = function(a) {
        zt(this.w, a)
    }
    ;
    Bt.prototype.load = function(a, b) {
        var c = J.B()
          , d = parseInt(c.g.w.c, 10) / 2;
        null != d && mg(c.g, "slotId", d);
        J.B().F();
        xg(J.B(), "hvd_lc");
        Ct(this);
        this.N = !1;
        if (b)
            if (xg(J.B(), "hvd_ad"),
            b instanceof rp) {
                if (xg(J.B(), "hvd_mad"),
                b = b.h) {
                    xg(J.B(), "hvd_admu");
                    Dt(this, b);
                    return
                }
            } else if (b instanceof qp) {
                xg(J.B(), "hvd_dad");
                c = b.getVideoUrl();
                d = b.l;
                var e = b.C
                  , f = b.h
                  , g = b.A
                  , h = b.g;
                if (c && d && e && f && g && h && (xg(J.B(), "hvd_addu"),
                b.w)) {
                    xg(J.B(), "hvd_admse");
                    b = e + '; codecs="' + g + '"';
                    f = f + '; codecs="' + h + '"';
                    if (lq() && lq() && MediaSource.isTypeSupported(b) && lq() && MediaSource.isTypeSupported(f)) {
                        xg(J.B(), "hvd_ymse");
                        xg(J.B(), "hvd_mse");
                        this.Y = new tq(this.g,[new mq(c,b,35E4), new mq(d,f,82E3)]);
                        Pg(this, this.Y);
                        a = this.g;
                        b = this.Y;
                        b.g || (b.g = window.URL.createObjectURL(b.h));
                        b = b.g;
                        a.src = b;
                        this.g.load();
                        return
                    }
                    xg(J.B(), "hvd_nmse")
                }
            } else
                xg(J.B(), "hvd_uad");
        a ? Dt(this, a) : (xg(J.B(), "hvd_vn"),
        this.g.load())
    }
    ;
    var Dt = function(a, b) {
        xg(J.B(), "hvd_src");
        a.g.src = b;
        a.g.load()
    }
      , Et = function(a) {
        Ct(a);
        a.N = !1;
        a.g.src = "";
        a.g.load()
    };
    m = Bt.prototype;
    m.getVideoUrl = function() {
        return this.g.src
    }
    ;
    m.setVolume = function(a) {
        this.g.volume = a;
        this.g.muted = 0 == a ? !0 : !1
    }
    ;
    m.getVolume = function() {
        return this.isMuted() ? 0 : this.g.volume
    }
    ;
    m.play = function() {
        var a = this;
        this.V = !1;
        this.N || mc() ? (this.F = !1,
        this.o = this.g.play(),
        null != this.o && (this.G = null,
        this.o.then(function() {
            a.o = null;
            a.Cd(a.G);
            a.G = null
        })["catch"](function(b) {
            a.o = null;
            var c = "";
            null != b && null != b.name && (c = b.name);
            "AbortError" == c || "NotAllowedError" == c ? a.dispatchEvent("autoplayDisallowed") : a.Ec()
        }))) : this.F = !0
    }
    ;
    m.pause = function() {
        null == this.o && (this.V = !0,
        this.g.pause())
    }
    ;
    m.isMuted = function() {
        return this.g.muted
    }
    ;
    var Ft = function(a) {
        (Sc || Uc) && a.g.webkitDisplayingFullscreen && a.g.webkitExitFullscreen()
    };
    Bt.prototype.getCurrentTime = function() {
        return this.g.currentTime
    }
    ;
    Bt.prototype.getDuration = function() {
        return isNaN(this.g.duration) ? -1 : this.g.duration
    }
    ;
    Bt.prototype.R = function() {
        Gt(this);
        L.prototype.R.call(this)
    }
    ;
    var Ht = function(a) {
        Gt(a);
        a.h = new Dp(a);
        a.h.T(a.g, hr, a.ra);
        a.h.T(a.g, "ended", a.Vf);
        a.h.T(a.g, "webkitbeginfullscreen", a.Ic);
        a.h.T(a.g, "webkitendfullscreen", a.Bd);
        a.h.T(a.g, "loadedmetadata", a.Xf);
        a.h.T(a.g, "pause", a.$f);
        a.h.T(a.g, "playing", a.Cd);
        a.h.T(a.g, "timeupdate", a.Tf);
        a.h.T(a.g, "volumechange", a.dg);
        a.h.T(a.g, "error", a.Ec);
        a.h.T(a.g, gd || Vc && !zp(8) ? "loadeddata" : "canplay", a.Yf);
        a.J = new Rr;
        a.h.T(a.J, "click", a.Sf);
        Tr(a.J, a.g);
        a.O = new sh(1E3);
        a.h.T(a.O, "tick", a.Wf);
        a.O.start()
    }
      , Gt = function(a) {
        null != a.J && (Vr(a.J),
        a.J = null);
        null != a.O && a.O.W();
        null != a.h && (a.h.W(),
        a.h = null);
        Ct(a)
    }
      , Ct = function(a) {
        a.$ = !1;
        a.K = !1;
        a.D = !1;
        a.F = !1;
        a.A = 0;
        a.o = null;
        a.G = null;
        Og(a.C)
    };
    Bt.prototype.ra = function(a) {
        this.dispatchEvent(a.type)
    }
    ;
    var It = function(a, b) {
        a.K || (a.K = !0,
        a.dispatchEvent("start"),
        t(a.g.getAttribute) && a.g.getAttribute("playsinline"),
        Tc || yp() || zp(10) || tj() || A(jc, "Xbox") || (Sc || Uc ? 0 : (!Rc || Rc && xp(wp, 4)) && !uj()) || !Rc || Rc && xp(wp, 3) || (Sc || Uc) && !zp(4) || a.Ic(b))
    };
    m = Bt.prototype;
    m.Xf = function() {
        this.N = !0;
        this.F && this.play();
        this.F = !1
    }
    ;
    m.Yf = function() {
        this.$ || (this.$ = !0,
        this.dispatchEvent("loaded"))
    }
    ;
    m.Cd = function(a) {
        null != this.o ? this.G = a : (this.dispatchEvent("play"),
        Vc || Tc || yp() || gd || It(this, a))
    }
    ;
    m.Tf = function(a) {
        if (!this.K && (Vc || Tc || yp() || gd)) {
            if (0 >= this.getCurrentTime())
                return;
            if (gd && this.g.ended && 1 == this.getDuration()) {
                this.Ec(a);
                return
            }
            It(this, a)
        }
        if (Vc || A(jc, "Nintendo WiiU")) {
            if (1.5 < this.getCurrentTime() - this.A) {
                this.D = !0;
                this.g.currentTime = this.A;
                return
            }
            this.D = !1;
            this.getCurrentTime() > this.A && (this.A = this.getCurrentTime())
        }
        this.dispatchEvent("timeUpdate")
    }
    ;
    m.dg = function() {
        this.dispatchEvent("volumeChange")
    }
    ;
    m.$f = function() {
        if (this.K && Vc && !this.V && (2 > Jt(this) || this.D)) {
            this.C = new sh(250);
            this.h.T(this.C, "tick", this.Uf);
            this.C.start();
            var a = !0
        } else
            a = !1;
        a || this.o || this.dispatchEvent("pause")
    }
    ;
    m.Vf = function() {
        var a = !0;
        if (Vc || A(jc, "Nintendo WiiU"))
            a = this.A >= this.g.duration - 1.5;
        !this.D && a && this.dispatchEvent("end")
    }
    ;
    m.Ic = function() {
        this.dispatchEvent("beginFullscreen")
    }
    ;
    m.Bd = function() {
        this.dispatchEvent("endFullscreen")
    }
    ;
    m.Ec = function() {
        this.dispatchEvent("error")
    }
    ;
    m.Sf = function() {
        this.dispatchEvent("click")
    }
    ;
    m.Wf = function() {
        var a = new E(this.g.offsetWidth,this.g.offsetHeight)
          , b = ms(this.g);
        if (a.width != this.aa.width || a.height != this.aa.height)
            !this.Z && b ? this.Ic() : this.Z && !b && this.Bd(),
            this.aa = a,
            this.Z = b
    }
    ;
    m.Uf = function() {
        if (!this.g.ended && this.g.paused && (Vc || hd ? this.g.currentTime < this.g.duration : 1)) {
            var a = this.g.duration - this.g.currentTime
              , b = Jt(this);
            0 < b && (2 <= b || 2 > a) && (Og(this.C),
            this.play())
        } else
            Og(this.C)
    }
    ;
    var Jt = function(a) {
        var b;
        a: {
            for (b = a.g.buffered.length - 1; 0 <= b; ) {
                if (a.g.buffered.start(b) <= a.g.currentTime) {
                    b = a.g.buffered.end(b);
                    break a
                }
                b--
            }
            b = 0
        }
        return b - a.g.currentTime
    };
    var Kt = function(a, b, c, d) {
        K.call(this);
        this.o = a;
        this.l = b;
        this.g = c;
        this.C = d;
        this.h = new Dp(this);
        Pg(this, this.h);
        this.h.T(this.o, d, this.A)
    };
    p(Kt, K);
    var Nt = function(a, b) {
        var c = b.fa;
        switch (b.ca) {
        case "showVideo":
            Lt(a.l);
            break;
        case "hide":
            Mt(a.l);
            break;
        case "getPreloadDisplay":
        case "resizeAndPositionVideo":
            a = a.l.g;
            c = c.resizeAndPositionVideo;
            a.g.style.left = String(c.x);
            a.g.style.top = String(c.y);
            a.g.style.width = String(c.width);
            a.g.style.height = String(c.height);
            break;
        case "restoreSizeAndPositionVideo":
            c = a.l.g,
            c.g.style.width = "100%",
            c.g.style.height = "100%",
            c.g.style.left = "0",
            c.g.style.right = "0"
        }
    };
    Kt.prototype.A = function(a) {
        var b = a.fa;
        switch (a.ca) {
        case "activate":
            a = this.l;
            var c = this.g;
            a.g != c && a.h && a.o && a.l && (c.setVolume(a.g.getVolume()),
            c = a.g,
            a.g = a.l,
            a.l = c,
            c = a.h,
            a.h = a.o,
            a.o = c,
            Ot(a.o.g, !1));
            break;
        case "startTracking":
            a = this.g;
            c = this.w;
            this.h.T(a, vb(jq), c);
            this.h.T(a, hr, c);
            Ht(this.g);
            break;
        case "stopTracking":
            a = this.g;
            c = this.w;
            this.h.Da(a, vb(jq), c);
            this.h.Da(a, hr, c);
            Gt(this.g);
            break;
        case "exitFullscreen":
            Ft(this.g);
            break;
        case "play":
            this.g.play();
            break;
        case "pause":
            this.g.pause();
            break;
        case "load":
            Ht(this.g);
            a = this.g;
            c = b.videoUrl;
            var d = b.muxedMediaUrl
              , e = b.muxedMimeType
              , f = b.muxedAudioCodec
              , g = b.muxedVideoCodec
              , h = b.demuxedAudioUrl
              , k = b.demuxedVideoUrl
              , l = b.demuxedAudioMimeType
              , n = b.demuxedVideoMimeType
              , u = b.demuxedAudioCodec
              , x = b.demuxedVideoCodec;
            b = b.mseCompatible;
            var w = null;
            k && h && b && n && l && x && u && (w = new qp({
                Rd: k,
                Zc: h,
                Qd: n,
                Yc: l,
                Ra: x,
                Ka: u,
                height: null,
                width: null,
                za: b
            }));
            h = null;
            d && e && g && f && (h = new rp({
                td: d,
                mimeType: e,
                Ra: g,
                Ka: f,
                height: null,
                width: null,
                za: b
            }));
            w ? a.load(c, w) : h ? a.load(c, h) : a.load(c, null);
            break;
        case "unload":
            Et(this.g);
            break;
        case "setCurrentTime":
            this.g.g.currentTime = b.currentTime;
            break;
        case "setVolume":
            this.g.setVolume(b.volume)
        }
    }
    ;
    Kt.prototype.w = function(a) {
        var b = {};
        switch (a.type) {
        case "autoplayDisallowed":
            a = "autoplayDisallowed";
            break;
        case "beginFullscreen":
            a = "fullscreen";
            break;
        case "endFullscreen":
            a = "exitFullscreen";
            break;
        case "click":
            a = "click";
            break;
        case "end":
            a = "end";
            break;
        case "error":
            a = "error";
            break;
        case "loaded":
            a = "loaded";
            break;
        case "mediaLoadTimeout":
            a = "mediaLoadTimeout";
            break;
        case "pause":
            a = "pause";
            b.ended = this.g.g.ended;
            break;
        case "play":
            a = "play";
            break;
        case "skip":
            a = "skip";
            break;
        case "start":
            a = "start";
            b.volume = this.g.getVolume();
            break;
        case "timeUpdate":
            a = "timeupdate";
            b.currentTime = this.g.getCurrentTime();
            b.duration = this.g.getDuration();
            break;
        case "volumeChange":
            a = "volumeChange";
            b.volume = this.g.getVolume();
            break;
        case "loadedmetadata":
            a = a.type;
            b.duration = this.g.getDuration();
            break;
        case "abort":
        case "canplay":
        case "canplaythrough":
        case "durationchange":
        case "emptied":
        case "loadstart":
        case "loadeddata":
        case "progress":
        case "ratechange":
        case "seeked":
        case "seeking":
        case "stalled":
        case "suspend":
        case "waiting":
            a = a.type;
            break;
        default:
            return
        }
        this.o.send(this.C, a, b)
    }
    ;
    var Pt = function(a, b) {
        K.call(this);
        this.h = b;
        this.l = new Kt(a,b,this.h.g,"videoDisplay1");
        Pg(this, this.l);
        this.g = null;
        var c = this.h.l;
        null != c && (this.g = new Kt(a,b,c,"videoDisplay2"),
        Pg(this, this.g))
    };
    p(Pt, K);
    Pt.prototype.Dc = function() {}
    ;
    Pt.prototype.A = function(a) {
        Nt(this.l, a);
        this.g && Nt(this.g, a)
    }
    ;
    var Rt = function(a, b) {
        K.call(this);
        this.w = a;
        this.l = b;
        this.o = new Dp(this);
        Pg(this, this.o);
        this.g = this.l.g;
        null != this.g && (this.o.T(this.w, "videoDisplay1", this.bg),
        this.o.T(this.w, "videoDisplay2", this.ke),
        Qt(this, this.g, this.Fb));
        this.h = null
    };
    p(Rt, K);
    m = Rt.prototype;
    m.Dc = function(a) {
        this.g && St(this, this.g, this.Fb);
        this.g = a;
        Qt(this, this.g, this.Fb)
    }
    ;
    m.bg = function(a) {
        if (null != this.g) {
            var b = a.fa;
            switch (a.ca) {
            case "startTracking":
                Ht(this.g);
                break;
            case "stopTracking":
                Gt(this.g);
                break;
            case "exitFullscreen":
                Ft(this.g);
                break;
            case "play":
                this.g.play();
                break;
            case "pause":
                this.g.pause();
                break;
            case "load":
                Tt(this.g, b);
                break;
            case "unload":
                Et(this.g);
                break;
            case "setCurrentTime":
                this.g.g.currentTime = b.currentTime;
                break;
            case "setVolume":
                this.g.setVolume(b.volume)
            }
        }
    }
    ;
    m.ke = function(a) {
        if (null != this.h) {
            var b = a.fa;
            switch (a.ca) {
            case "startTracking":
                Ht(this.h);
                break;
            case "stopTracking":
                Gt(this.h);
                break;
            case "load":
                Tt(this.h, b)
            }
        }
    }
    ;
    m.Jc = function(a) {
        switch (a.type) {
        case "error":
            a = "error";
            break;
        case "loaded":
            a = "loaded";
            break;
        default:
            return
        }
        this.w.send("videoDisplay2", a, {})
    }
    ;
    m.Fb = function(a) {
        var b = {};
        switch (a.type) {
        case "autoplayDisallowed":
            a = "autoplayDisallowed";
            break;
        case "beginFullscreen":
            a = "fullscreen";
            break;
        case "endFullscreen":
            a = "exitFullscreen";
            break;
        case "click":
            a = "click";
            break;
        case "end":
            a = "end";
            break;
        case "error":
            a = "error";
            break;
        case "loaded":
            a = "loaded";
            break;
        case "mediaLoadTimeout":
            a = "mediaLoadTimeout";
            break;
        case "pause":
            a = "pause";
            b.ended = this.g.g.ended;
            break;
        case "play":
            a = "play";
            break;
        case "skip":
            a = "skip";
            break;
        case "start":
            a = "start";
            b.volume = this.g.getVolume();
            break;
        case "timeUpdate":
            a = "timeupdate";
            b.currentTime = this.g.getCurrentTime();
            b.duration = this.g.getDuration();
            break;
        case "volumeChange":
            a = "volumeChange";
            b.volume = this.g.getVolume();
            break;
        case "loadedmetadata":
            a = a.type;
            b.duration = this.g.getDuration();
            break;
        case "abort":
        case "canplay":
        case "canplaythrough":
        case "durationchange":
        case "emptied":
        case "loadstart":
        case "loadeddata":
        case "progress":
        case "ratechange":
        case "seeked":
        case "seeking":
        case "stalled":
        case "suspend":
        case "waiting":
            a = a.type;
            break;
        default:
            return
        }
        this.w.send("videoDisplay1", a, b)
    }
    ;
    var Qt = function(a, b, c) {
        a.o.T(b, vb(jq), c);
        a.o.T(b, hr, c)
    }
      , St = function(a, b, c) {
        a.o.Da(b, vb(jq), c);
        a.o.Da(b, hr, c)
    };
    Rt.prototype.A = function(a) {
        switch (a.ca) {
        case "showVideo":
            Lt(this.l);
            break;
        case "hide":
            Mt(this.l);
            break;
        case "getPreloadDisplay":
            null != this.g && null == this.h && (this.h = this.l.l,
            Qt(this, this.h, this.Jc),
            null == this.h ? Pr.B().report(112, {
                outer: !0,
                "null": !0
            }) : Pr.B().report(112, {
                outer: !0,
                "null": !1
            }));
            break;
        case "swapVideoDisplays":
            if (null != this.g && null != this.h) {
                St(this, this.g, this.Fb);
                St(this, this.h, this.Jc);
                a = this.l;
                if (a.h && a.o && a.l) {
                    a.l.setVolume(a.g.getVolume());
                    var b = a.g;
                    a.g = a.l;
                    a.l = b;
                    b = a.h;
                    a.h = a.o;
                    a.o = b;
                    b = a.H;
                    a = a.g;
                    b.F.Dc(a);
                    b.C && (b = b.C,
                    a = a.w.g,
                    b.o = a,
                    b.g && (b = b.g,
                    b.g = a,
                    qt(b, a)))
                }
                this.g = this.l.g;
                this.h = this.l.l;
                Qt(this, this.g, this.Fb);
                Qt(this, this.h, this.Jc)
            }
        }
    }
    ;
    var Tt = function(a, b) {
        var c = b.videoUrl
          , d = b.muxedMediaUrl
          , e = b.muxedMimeType
          , f = b.muxedAudioCodec
          , g = b.muxedVideoCodec
          , h = b.demuxedAudioUrl
          , k = b.demuxedVideoUrl
          , l = b.demuxedAudioMimeType
          , n = b.demuxedVideoMimeType
          , u = b.demuxedAudioCodec
          , x = b.demuxedVideoCodec;
        b = b.mseCompatible;
        var w = null;
        k && h && b && n && l && x && u && (w = new qp({
            Rd: k,
            Zc: h,
            Qd: n,
            Yc: l,
            Ra: x,
            Ka: u,
            height: null,
            width: null,
            za: b
        }));
        h = null;
        d && e && g && f && (h = new rp({
            td: d,
            mimeType: e,
            Ra: g,
            Ka: f,
            height: null,
            width: null,
            za: b
        }));
        w ? a.load(c, w) : h ? a.load(c, h) : a.load(c, null)
    };
    var Vt = function(a, b) {
        var c = Array.prototype.slice.call(arguments)
          , d = c.shift();
        if ("undefined" == typeof d)
            throw Error("[goog.string.format] Template required");
        return d.replace(/%([0\- \+]*)(\d+)?(\.(\d+))?([%sfdiu])/g, function(e, f, g, h, k, l, n, u) {
            if ("%" == l)
                return "%";
            var x = c.shift();
            if ("undefined" == typeof x)
                throw Error("[goog.string.format] Not enough arguments");
            arguments[0] = x;
            return Ut[l].apply(null, arguments)
        })
    }
      , Ut = {
        s: function(a, b, c) {
            return isNaN(c) || "" == c || a.length >= Number(c) ? a : a = -1 < b.indexOf("-", 0) ? a + zc(" ", Number(c) - a.length) : zc(" ", Number(c) - a.length) + a
        },
        f: function(a, b, c, d, e) {
            d = a.toString();
            isNaN(e) || "" == e || (d = parseFloat(a).toFixed(e));
            var f = 0 > Number(a) ? "-" : 0 <= b.indexOf("+") ? "+" : 0 <= b.indexOf(" ") ? " " : "";
            0 <= Number(a) && (d = f + d);
            if (isNaN(c) || d.length >= Number(c))
                return d;
            d = isNaN(e) ? Math.abs(Number(a)).toString() : Math.abs(Number(a)).toFixed(e);
            a = Number(c) - d.length - f.length;
            return d = 0 <= b.indexOf("-", 0) ? f + d + zc(" ", a) : f + zc(0 <= b.indexOf("0", 0) ? "0" : " ", a) + d
        },
        d: function(a, b, c, d, e, f, g, h) {
            return Ut.f(parseInt(a, 10), b, c, d, 0, f, g, h)
        }
    };
    Ut.i = Ut.d;
    Ut.u = Ut.d;
    var Xt = function(a, b) {
        L.call(this);
        this.w = new Dp(this);
        Pg(this, this.w);
        this.J = !1;
        this.G = "goog_" + Bc++;
        this.A = new uo;
        var c = this.G
          , d = (ue() ? "https:" : "http:") + Vt("./bridge3.355.3_en.html", V.A);
        a: {
            var e = window;
            try {
                do {
                    try {
                        if (0 == e.location.href.indexOf(d) || 0 == e.document.referrer.indexOf(d)) {
                            var f = !0;
                            break a
                        }
                    } catch (g) {}
                    e = e.parent
                } while (e != e.top)
            } catch (g) {}
            f = !1
        }
        f && (d += "?f=" + c);
        c = be("IFRAME", {
            src: d + "#" + c,
            allowFullscreen: !0,
            allow: "autoplay",
            style: "border:0; opacity:0; margin:0; padding:0; position:relative;"
        });
        Hp(this.w, c, "load", this.V);
        a.appendChild(c);
        this.g = c;
        this.o = Wt(this);
        this.D = b;
        this.h = null;
        if (c = vr(rr(), 651800008))
            try {
                console.log("IMA outer:newman")
            } catch (g) {}
        this.F = c ? new Pt(this.o,this.D) : new Rt(this.o,this.D);
        Pg(this, this.F);
        this.D.g && this.w.T(this.o, "displayContainer", this.N);
        this.w.T(this.o, "mouse", this.O);
        this.w.T(this.o, "touch", this.P);
        c = F();
        d = Ba("google.ima.gptProxyInstance", c);
        null != d ? c = d : (d = new es,
        r("google.ima.gptProxyInstance", d, c),
        c = d);
        this.K = c;
        vr(rr(), 504733016) && (this.C = new wt(a,this.o,b.g.w.g),
        Pg(this, this.C))
    };
    y(Xt, L);
    var Wt = function(a, b) {
        b = b || "*";
        var c = a.A.get(b);
        null == c && (c = new Xr(a.G,b),
        a.J && (c.va = ge(a.g),
        c.connect()),
        a.A.set(b, c));
        return c
    };
    Xt.prototype.R = function() {
        null !== this.h && (this.h.W(),
        this.h = null);
        this.A.forEach(function(a) {
            Og(a)
        });
        this.A.clear();
        gs(this.K, this.G);
        de(this.g);
        Xt.wa.R.call(this)
    }
    ;
    Xt.prototype.O = function(a) {
        var b = a.fa
          , c = Je(this.g)
          , d = document.createEvent("MouseEvent");
        d.initMouseEvent(a.ca, !0, !0, window, b.detail, b.screenX, b.screenY, b.clientX + c.x, b.clientY + c.y, b.ctrlKey, b.altKey, b.shiftKey, b.metaKey, b.button, null);
        this.g.dispatchEvent(d)
    }
    ;
    var Yt = function(a, b) {
        var c = Je(a.g)
          , d = !!("TouchEvent"in window && 0 < TouchEvent.length);
        b = b.map(function(e) {
            return d ? new Touch({
                identifier: e.identifier,
                target: a.g,
                clientX: e.clientX,
                clientY: e.clientY,
                screenX: e.screenX,
                screenY: e.screenY,
                pageX: e.pageX + c.x,
                pageY: e.pageY + c.y
            }) : document.createTouch(window, a.g, e.identifier, e.pageX + c.x, e.pageY + c.y, e.screenX, e.screenY)
        });
        return d ? b : document.createTouchList.apply(document, b)
    };
    Xt.prototype.P = function(a) {
        var b = a.fa
          , c = Je(this.g);
        if ("TouchEvent"in window && 0 < TouchEvent.length)
            b = {
                bubbles: !0,
                cancelable: !0,
                view: window,
                detail: b.detail,
                ctrlKey: b.ctrlKey,
                altKey: b.altKey,
                shiftKey: b.shiftKey,
                metaKey: b.metaKey,
                touches: Yt(this, b.touches),
                targetTouches: Yt(this, b.targetTouches),
                changedTouches: Yt(this, b.changedTouches)
            },
            a = new TouchEvent(a.ca,b),
            this.g.dispatchEvent(a);
        else {
            var d = document.createEvent("TouchEvent");
            d.initTouchEvent(a.ca, !0, !0, window, b.detail, b.screenX, b.screenY, b.clientX + c.x, b.clientY + c.y, b.ctrlKey, b.altKey, b.shiftKey, b.metaKey, Yt(this, b.touches), Yt(this, b.targetTouches), Yt(this, b.changedTouches), b.scale, b.rotation);
            this.g.dispatchEvent(d)
        }
    }
    ;
    Xt.prototype.N = function(a) {
        switch (a.ca) {
        case "showVideo":
            null == this.h ? (this.h = new Rr,
            this.w.T(this.h, "click", this.Y)) : Vr(this.h);
            Tr(this.h, Zt(this.D));
            break;
        case "hide":
            null !== this.h && (this.h.W(),
            this.h = null)
        }
        this.F.A(a)
    }
    ;
    Xt.prototype.Y = function() {
        this.o.send("displayContainer", "videoClick")
    }
    ;
    Xt.prototype.V = function() {
        var a = this;
        Cr = xf();
        Dr = uf();
        Pk(this.A.Jb(!1), function(b) {
            b.va = ge(a.g);
            b.connect()
        });
        this.J = !0
    }
    ;
    var au = function() {
        L.call(this);
        this.buffered = new $t;
        this.w = new $t;
        this.h = new Dp(this);
        this.src = this.o = "";
        this.A = !1;
        this.g = null;
        var a = Yq(V);
        if (a) {
            a: {
                if (yb(a.g, "videoElementMockDuration") && (a = a.g.videoElementMockDuration,
                "number" === typeof a))
                    break a;
                a = NaN
            }
            this.duration = a
        }
    };
    y(au, L);
    var bu = new uo
      , cu = function() {
        var a = ["video/mp4"]
          , b = ["video/ogg"]
          , c = new au;
        c.canPlayType = function(d) {
            return a.includes(d) ? "probably" : b.includes(d) ? "maybe" : ""
        }
        ;
        c.width = 0;
        c.height = 0;
        c.offsetWidth = 0;
        c.offsetHeight = 0;
        return c
    }
      , du = function(a) {
        this.endTime = a
    }
      , $t = function() {
        this.length = 0;
        this.g = []
    };
    $t.prototype.start = function() {
        return 0
    }
    ;
    $t.prototype.end = function(a) {
        return this.g[a].endTime
    }
    ;
    m = au.prototype;
    m.readyState = 0;
    m.currentTime = 0;
    m.duration = NaN;
    m.ab = !0;
    m.rd = !1;
    m.autoplay = !1;
    m.loop = !1;
    m.controls = !1;
    m.volume = 1;
    m.muted = !1;
    Object.defineProperty(au.prototype, "src", {
        get: function() {
            return au.prototype.o
        },
        set: function(a) {
            var b = au.prototype;
            b.A && null != b.g ? (b.g.reject(),
            b.g = null) : b.o = a
        }
    });
    m = au.prototype;
    m.Ja = null;
    m.Sb = 0;
    m.eg = 4;
    m.vb = null;
    m.ec = null;
    m.play = function() {
        this.rd && (this.currentTime = 0,
        this.dispatchEvent("timeupdate"));
        this.ab && (this.ab = !1,
        this.dispatchEvent("play"),
        this.readyState = this.eg,
        2 >= this.readyState ? this.dispatchEvent("waiting") : this.dispatchEvent("playing"));
        if (null === this.Ja || this.Ja.fb())
            this.Ja = new sh(10),
            this.Ja.T("tick", Ma(this.Ld, this));
        this.Sb = v();
        this.Ja.start();
        this.autoplay = !1;
        return null
    }
    ;
    m.pause = function() {
        this.autoplay = !1;
        this.ab || (this.Ja.stop(),
        this.ab = !0,
        this.dispatchEvent("timeupdate"),
        this.dispatchEvent("pause"))
    }
    ;
    m.load = function() {
        this.readyState = 0;
        this.ab = !0;
        this.dispatchEvent("loadstart");
        this.setProperty("duration", isNaN(this.duration) ? 10 + 20 * Math.random() : this.duration);
        var a = this.w;
        a.g.push(new du(this.duration));
        a.length = a.g.length;
        a = this.buffered;
        a.g.push(new du(this.duration));
        a.length = a.g.length;
        this.dispatchEvent("loadedmetadata");
        0 < this.currentTime && this.dispatchEvent("timeupdate");
        this.dispatchEvent("loadeddata");
        this.dispatchEvent("canplay");
        this.dispatchEvent("canplaythrough");
        this.dispatchEvent("progress")
    }
    ;
    m.setProperty = function(a, b) {
        switch (a) {
        case "currentTime":
            a = Number(b);
            this.dispatchEvent("seeking");
            this.currentTime = a;
            this.dispatchEvent("seeked");
            this.Ld();
            break;
        case "duration":
            this.duration = Number(b);
            this.dispatchEvent("durationchange");
            break;
        case "volume":
            this.volume = Number(b),
            this.dispatchEvent("volumechange")
        }
    }
    ;
    m.setAttribute = function(a, b) {
        null != a && bu.set(a, b)
    }
    ;
    m.getAttribute = function(a) {
        return bu.get(a)
    }
    ;
    m.Ld = function() {
        var a = v() - this.Sb
          , b = this.currentTime + a / 1E3;
        this.Sb += a;
        2 < this.readyState && (this.currentTime = Math.min(b, this.duration));
        this.dispatchEvent("timeupdate");
        this.currentTime == this.duration && (this.rd = this.ab = !0,
        this.Ja.stop(),
        this.dispatchEvent("ended"))
    }
    ;
    m.R = function() {
        this.Ja && this.Ja.W();
        this.h.W()
    }
    ;
    m.cg = function(a) {
        var b = null
          , c = null;
        switch (a.type) {
        case "loadeddata":
            b = "Loaded";
            break;
        case "playing":
            b = "Playing";
            c = "#00f";
            break;
        case "pause":
            b = "Paused";
            break;
        case "ended":
            b = "Ended",
            c = "#000"
        }
        b && this.ec && (this.ec.innerText = b);
        c && this.vb && (this.vb.style.backgroundColor = c)
    }
    ;
    var eu = function(a, b) {
        K.call(this);
        if (null == a || !fe(Td(a), a))
            throw Mr(Lr, null, "containerElement", "element");
        this.o = a;
        this.l = this.g = null;
        a = Yq(V);
        if (Zq(a, "useVideoElementMock")) {
            a = cu();
            var c = be("DIV", {
                style: "position:absolute;width:100%;height:100%;top:0px;left:0px;"
            });
            for (d in a)
                c[d] = a[d];
            a.vb = be("DIV", {
                style: "position:absolute;width:100%;height:100%;top:0px;left:0px;background-color:#000"
            });
            a.ec = be("P", {
                style: "position:absolute;top:25%;margin-left:10px;font-size:24px;color:#fff;"
            });
            a.vb.appendChild(a.ec);
            c.appendChild(a.vb);
            a.h.T(a, ["loadeddata", "playing", "pause", "ended"], a.cg);
            var d = c
        } else
            d = be("VIDEO", {
                style: "background-color:#000;position:absolute;width:100%;height:100%;left:0px;top:0px;",
                title: wq("Advertisement").toString()
            });
        d.setAttribute("webkit-playsinline", !0);
        d.setAttribute("playsinline", !0);
        this.h = d;
        this.g = be("DIV", {
            style: "display:none;"
        });
        this.o.appendChild(this.g);
        this.g.appendChild(this.h);
        b && (this.l = be("DIV", {
            style: "position:absolute;width:100%;height:100%;left:0px;top:0px"
        }),
        this.g.appendChild(this.l))
    };
    p(eu, K);
    eu.prototype.R = function() {
        de(this.g);
        K.prototype.R.call(this)
    }
    ;
    eu.prototype.show = function() {
        Ot(this.g, !0)
    }
    ;
    var Ot = function(a, b) {
        null != a && (a.style.display = b ? "block" : "none")
    };
    var hu = function(a, b, c) {
        if (null == a || !fe(Td(a), a))
            throw Mr(Lr, null, "containerElement", "element");
        this.A = b;
        this.$ = Fr(this.A || null);
        this.Z = Ap(this.A || null);
        this.V = String(Math.floor(1E9 * Math.random()));
        this.J = !1;
        this.F = a;
        this.N = null != b;
        V.g = 2;
        this.M = fu(b ? b : null);
        var d = be("DIV", {
            style: "position:absolute"
        });
        a.insertBefore(d, a.firstChild);
        this.w = d;
        this.h = null;
        gu(this) && b ? a = new Bt(b) : (this.h = new eu(this.w,!0),
        a = new Bt(this.h.h));
        this.g = a;
        this.l = this.o = null;
        a = Rc && !(Rc && xp(wp, 4));
        d = Sc || Uc;
        !this.h || gu(this) || !V.h || uj() || a || d || (this.o = new eu(this.w,!0),
        this.l = new Bt(this.o.h));
        this.C = c || null;
        this.P = null != this.C;
        gu(this) && b ? t(b.getBoundingClientRect) ? c = b : (c = this.w,
        V.C = c) : c = this.w;
        this.D = c;
        this.H = new Xt(this.w,this);
        this.O = new E(0,0);
        this.G = "";
        b && (b = b.src || b.currentSrc,
        b = b instanceof Ao ? b.clone() : new Ao(b,void 0),
        200 > b.toString().length ? this.G = b.toString() : 200 > b.g.length && (this.G = b.g));
        this.K = new Map;
        this.K.set("videoDisplay1", this.g);
        this.l && this.K.set("videoDisplay2", this.l)
    };
    hu.prototype.Y = function() {
        this.J = !0;
        if (null != this.h) {
            var a = this.h;
            a.h && a.h.load()
        }
        null != this.o && (a = this.o,
        a.h && a.h.load())
    }
    ;
    hu.prototype.destroy = function() {
        var a = this;
        this.A = null;
        Og(this.h);
        Og(this.o);
        Og(this.H);
        this.g.P(function() {
            return Og(a.g)
        });
        null != this.l && this.l.P(function() {
            return Og(a.l)
        });
        de(this.w)
    }
    ;
    var Lt = function(a) {
        null != a.h && a.h.show()
    }
      , Mt = function(a) {
        null != a.h && Ot(a.h.g, !1)
    }
      , Zt = function(a) {
        return a.P && a.C ? a.C : null != a.h ? a.h.l : null
    }
      , gu = function(a) {
        return Er(a.M) && a.N
    };
    hu.prototype.setSize = function(a, b) {
        var c = this.w;
        null != c && (-1 == a ? (c.style.right = "0",
        c.style.left = "0") : c.style.width = a + "px",
        -1 == b ? (c.style.bottom = "0",
        c.style.top = "0") : c.style.height = b + "px");
        c = this.H;
        c.g.width = -1 == a ? "100%" : a;
        c.g.height = -1 == b ? "100%" : b;
        c.g.offsetTop = c.g.offsetTop;
        this.O = new E(a,b)
    }
    ;
    var fu = function(a) {
        return null != a && t(a.getAttribute) && null != a.getAttribute("playsinline") ? !0 : !1
    };
    var iu = function(a, b) {
        b = void 0 === b ? null : b;
        Tq.call(this, "adMetadata", a);
        this.h = b
    };
    p(iu, Tq);
    iu.prototype.o = function() {
        return this.h
    }
    ;
    var ju = function(a, b, c) {
        L.call(this);
        this.h = a;
        this.g = null;
        this.J = this.G = "";
        this.K = 0;
        this.C = this.o = null;
        this.w = b;
        this.A = null;
        this.D = "";
        this.F = c
    };
    p(ju, L);
    ju.prototype.N = function(a) {
        try {
            var b = a.h.data;
            try {
                var c = JSON.parse(b)
            } catch (Cg) {
                return
            }
            var d = c.session;
            if (null != d && this.D == d)
                switch (c.type) {
                case "friendlyReady":
                    var e = ku(this);
                    if (null != e)
                        this.g = e,
                        this.G = e.currentSrc,
                        this.J = e.style.cssText,
                        this.K = e.currentTime;
                    else {
                        var f = this.h.F
                          , g = this.h.O;
                        var h = "border: 0; margin: 0; padding: 0; position: absolute; width:" + (g.width + "px; ");
                        h += "height:" + g.height + "px;";
                        this.g = be("VIDEO", {
                            style: h,
                            autoplay: !0
                        });
                        f.appendChild(this.g)
                    }
                    try {
                        var k = {};
                        if (null != e)
                            k.provided = "y";
                        else {
                            k.provided = "n";
                            var l = this.h.g;
                            if (l instanceof Bt) {
                                k.vidDisp = "y";
                                var n = l.w.g;
                                if (n instanceof HTMLVideoElement)
                                    var u = "y";
                                else {
                                    if (n instanceof Object) {
                                        a: {
                                            try {
                                                if ("function" === typeof n.play && "function" === typeof n.load && "function" === typeof n.pause && "undefined" != typeof n.currentTime) {
                                                    var x = !0;
                                                    break a
                                                }
                                            } catch (Cg) {}
                                            x = !1
                                        }
                                        var w = x ? "plr" : "obj"
                                    } else
                                        w = "n";
                                    u = w
                                }
                                k.vidElem = u
                            } else
                                k.vidDisp = null == l ? "0" : "n"
                        }
                        k.vdn = this.F;
                        Pr.B().report(88, k)
                    } catch (Cg) {}
                    var C = this.h.F;
                    e = "border: 0; margin: 0; padding: 0;position: absolute; ";
                    var G = this.g;
                    b: {
                        var Sb = Td(G);
                        if (Sb.defaultView && Sb.defaultView.getComputedStyle) {
                            var tc = Sb.defaultView.getComputedStyle(G, null);
                            if (tc) {
                                var We = tc.display || tc.getPropertyValue("display") || "";
                                break b
                            }
                        }
                        We = ""
                    }
                    if ("none" != (We || (G.currentStyle ? G.currentStyle.display : null) || G.style && G.style.display))
                        var Gd = Le(G);
                    else {
                        var Za = G.style
                          , Xe = Za.display
                          , N = Za.visibility
                          , sb = Za.position;
                        Za.visibility = "hidden";
                        Za.position = "absolute";
                        Za.display = "inline";
                        var Dg = Le(G);
                        Za.display = Xe;
                        Za.position = sb;
                        Za.visibility = N;
                        Gd = Dg
                    }
                    e += "width:" + Gd.width + "px; ";
                    e += "height:" + Gd.height + "px;";
                    this.C = be("DIV", {
                        style: e
                    });
                    C.appendChild(this.C);
                    try {
                        this.o.contentWindow.loader.initFriendly(this.g, this.C)
                    } catch (Cg) {
                        lu(this)
                    }
                    this.w.send("vpaid", "", b);
                    break;
                case "becameLinear":
                    this.g && !le() && !ke() && Fe(this.g, {
                        visibility: "visible"
                    });
                    this.w.send("vpaid", "", b);
                    break;
                case "becameNonlinear":
                    mu(this);
                    this.w.send("vpaid", "", b);
                    break;
                case "startAd":
                    C = {};
                    if (this.g) {
                        k = this.g.paused;
                        var ep = 0 < this.g.currentTime;
                        C.apl = ep && !k ? "1" : "0";
                        C.ip = k ? "1" : "0";
                        C.iavp = ep ? "1" : "0"
                    } else
                        C.apl = "n";
                    Pr.B().report(99, C);
                    this.w.send("vpaid", "", b);
                    null != ku(this) && Lt(this.h);
                    break;
                default:
                    this.w.send("vpaid", "", b)
                }
        } catch (Cg) {
            lu(this)
        }
    }
    ;
    var lu = function(a) {
        var b = {
            type: "error"
        };
        b.session = a.D;
        a = Sf(b);
        window.postMessage(a, "*")
    }
      , ku = function(a) {
        a = "videoDisplayUnknown" == a.F ? a.h.g : a.h.K.get(a.F);
        return a instanceof Bt && a.w.g instanceof HTMLVideoElement ? a.w.g : null
    }
      , mu = function(a) {
        a.g && !le() && !ke() && Fe(a.g, {
            visibility: "hidden"
        })
    };
    ju.prototype.R = function() {
        L.wa.R.call(this);
        Og(this.A);
        this.A = null;
        de(this.C);
        this.C = null;
        de(this.o);
        this.o = null;
        var a = ku(this);
        null != a ? (a.style.cssText = this.J,
        le() || ke() ? (a.src = this.G,
        a.currentTime = this.K) : (a.src = "",
        Mt(this.h))) : (de(this.g),
        this.g = null)
    }
    ;
    var nu = function(a, b) {
        K.call(this);
        this.l = a;
        this.h = b;
        this.g = new Map
    };
    p(nu, K);
    var ou = function(a, b) {
        try {
            var c = b.fa
              , d = c.session;
            switch (c.vpaidEventType) {
            case "createFriendlyIframe":
                b = "videoDisplayUnknown";
                c.videoDisplayName && (b = c.videoDisplayName);
                var e = c.session
                  , f = new ju(a.l,a.h,b);
                a.g.set(e, f);
                f.D = e;
                a = "about:self";
                Mc && (a = "");
                f.o = be("IFRAME", {
                    src: a,
                    allowtransparency: !0,
                    background: "transparent"
                });
                Fe(f.o, {
                    display: "none",
                    width: "0",
                    height: "0"
                });
                var g = f.h.F;
                g.appendChild(f.o);
                var h = g.ownerDocument
                  , k = h.defaultView || h.parentWindow;
                null == f.A && (f.A = new Dp(f));
                f.A.T(k, "message", f.N);
                var l = '<body><script src="//imasdk.googleapis.com/js/sdkloader/loader.js">\x3c/script><script>loader = new VPAIDLoader(false, "' + (f.D + '");\x3c/script></body>');
                if (hd || dd || Nc) {
                    var n = f.o.contentWindow;
                    n && lt(n.document, l)
                } else
                    mt(f.o, l);
                break;
            case "vpaidNonLinear":
                var u = a.g.get(d);
                u && mu(u);
                break;
            case "destroyFriendlyIframe":
                var x = a.g.get(d);
                x && (x.W(),
                a.g["delete"](d))
            }
        } catch (w) {
            Pr.B().report(125, {
                msg: w.message
            })
        }
    };
    nu.prototype.R = function() {
        this.g.forEach(function(a) {
            return a.W()
        })
    }
    ;
    var pu = function() {
        this.g = [];
        this.h = []
    };
    pu.prototype.isEmpty = function() {
        return 0 == this.g.length && 0 == this.h.length
    }
    ;
    pu.prototype.clear = function() {
        this.g = [];
        this.h = []
    }
    ;
    pu.prototype.contains = function(a) {
        return Ya(this.g, a) || Ya(this.h, a)
    }
    ;
    pu.prototype.ka = function() {
        for (var a = [], b = this.g.length - 1; 0 <= b; --b)
            a.push(this.g[b]);
        var c = this.h.length;
        for (b = 0; b < c; ++b)
            a.push(this.h[b]);
        return a
    }
    ;
    var Y = function(a, b, c, d, e, f, g) {
        L.call(this);
        var h = this;
        this.G = a;
        this.g = b;
        this.F = c;
        this.qb = e;
        this.w = new Vq;
        this.J = g;
        this.P = !1;
        this.N = 1;
        this.sb = d;
        this.aa = -1;
        this.o = this.h = null;
        this.D = new Aq({
            currentTime: 0
        },this.J);
        this.C = new pu;
        this.Aa = this.$ = !1;
        this.V = new Map;
        this.Y = this.pa = !1;
        this.ra = new nu(b,g);
        Pg(this, this.ra);
        this.K = f && null != this.g.C;
        this.O = function() {
            var k = h.g.g
              , l = k.getCurrentTime();
            k = k.getDuration();
            return {
                currentTime: l,
                duration: k,
                isPlaying: !0,
                volume: h.N
            }
        }
        ;
        this.Z = new Dp(this);
        this.Z.T(this.J, "adsManager", this.tb)
    };
    p(Y, L);
    Y.prototype.tb = function(a) {
        var b = this
          , c = a.ca
          , d = a.fa;
        switch (c) {
        case "error":
            qu(this);
            ru(this, d);
            break;
        case "contentPauseRequested":
            tu(this);
            uu(this, a.ca, a.fa);
            break;
        case "contentResumeRequested":
            vu(this, function() {
                return uu(b, c, d)
            });
            break;
        case "remainingTime":
            this.aa = d.remainingTime;
            break;
        case "skip":
            uu(this, c, d);
            break;
        case "log":
            uu(this, c, d, d.logData);
            break;
        case "companionBackfill":
            a = Ba("window.google_show_companion_ad");
            null != a && a();
            break;
        case "skipShown":
            this.P = !0;
            uu(this, c, d);
            break;
        case "interaction":
            uu(this, c, d, d.interactionData);
            break;
        case "vpaidEvent":
            ou(this.ra, a);
            break;
        case "skippableStateChanged":
            a = d.adData;
            null != a.skippable && (this.P = a.skippable);
            uu(this, c, d);
            break;
        case "volumeChange":
            a = d.adData;
            null != a && "number" === typeof a.volume && (this.N = a.volume);
            uu(this, c, d);
            break;
        case "firstQuartile":
            uu(this, Sq.firstQuartile, d);
            uu(this, c, d);
            break;
        case "thirdQuartile":
            uu(this, Sq.thirdQuartile, d);
            uu(this, c, d);
            break;
        default:
            uu(this, c, d)
        }
    }
    ;
    var uu = function(a, b, c, d) {
        if (null == c.companions) {
            var e = a.V.get(c.adId);
            c.companions = null != e ? e : []
        }
        var f = c.adData;
        if (e = null == f ? null : new T(f))
            a.h = e;
        switch (b) {
        case "adBreakReady":
        case "mediaUrlPinged":
            b = new Tq(b,null,c);
            break;
        case "adMetadata":
            b = null;
            null != c.adCuePoints && (b = new Uq(c.adCuePoints));
            b = new iu(e,b);
            break;
        case "allAdsCompleted":
            a.h = null;
            a.pa = !0;
            b = new Tq(b,e);
            break;
        case "contentPauseRequested":
            a.Y = !1;
            b = new Tq(b,e);
            break;
        case "contentResumeRequested":
            a.h = null;
            a.Y = !0;
            b = new Tq(b,e);
            break;
        case "loaded":
            a.aa = e.getDuration();
            Gr() && (d = a.G,
            c = a.qb,
            d.h.set(Oq(e), a.O),
            (0 != V.g ? $n.B().l : d.A) && ns(d, "loaded", Oq(e), c));
            null != f.gfpCookie && V.l && iq() && (d = f.gfpCookie,
            Kd.set("__gads", d.value, d.expires, d.path, d.domain),
            delete f.gfpCookie);
            b = new Tq(b,e,f);
            break;
        case "start":
            a.V.set(c.adId, c.companions);
            null != Zt(a.g) && (null == a.o ? (a.o = new Rr,
            a.Z.T(a.o, "click", a.Zf)) : Vr(a.o),
            Tr(a.o, Zt(a.g)));
            b = new Tq(b,e);
            break;
        case "complete":
            null != a.o && Vr(a.o);
            Gr() && ps(a.G, a.O, Oq(e));
            a.h = null;
            a.V["delete"](c.adId);
            b = new Tq(b,e);
            break;
        case "log":
            f = null;
            null != d && null != d.type ? (c = d.type,
            c = "adLoadError" == c || "adPlayError" == c) : c = !1;
            c && (f = {
                adError: Qq(d)
            });
            b = new Tq(b,e,f);
            break;
        case "interaction":
            b = new Tq(b,e,d);
            break;
        case "adProgress":
            b = new Tq(b,e,c);
            break;
        default:
            b = new Tq(b,e)
        }
        a.dispatchEvent(b);
        a.pa && a.Y && a.destroy()
    }
      , ru = function(a, b) {
        var c = new Rq(Qq(b));
        a.$ ? (a.dispatchEvent(c),
        Gr() && a.h && ps(a.G, a.O, Oq(a.h)),
        a.h = null) : a.C.h.push(c);
        a = {
            error: b.errorCode,
            vis: ig(document)
        };
        Pr.B().report(7, a)
    }
      , wu = function(a, b, c) {
        a.J.send("adsManager", b, c)
    }
      , vu = function(a, b) {
        qu(a, b)
    }
      , tu = function(a) {
        var b = a.g.g;
        gu(a.g) && a.w.restoreCustomPlaybackStateOnAdBreakComplete && null != b.pa && b.pa()
    }
      , qu = function(a, b) {
        var c = a.g.g;
        gu(a.g) && a.w.restoreCustomPlaybackStateOnAdBreakComplete && null != c.P ? c.P(b) : b && b()
    };
    m = Y.prototype;
    m.uf = function(a, b, c, d) {
        if (this.C.isEmpty()) {
            var e = this.g
              , f = null;
            e.A && null == d && (f = {
                vd: "setnull"
            });
            e.A && e.A === d && (f = {
                vd: "match"
            });
            if (e.A && e.A !== d) {
                f = Fr(d || null);
                var g = Ap(d || null);
                f = {
                    vd: "diff",
                    oc: e.$,
                    nc: f,
                    oi: e.Z,
                    ni: g
                }
            }
            !e.A && d && (f = {
                vd: "new"
            });
            f && (f.custVid = e.V,
            Pr.B().report(93, f));
            null != d && (e.M = fu(d),
            Er(e.M) && (e.N = !0,
            Og(e.h),
            Og(e.o),
            Og(e.l),
            e.h = null,
            e.o = null,
            e.l = null,
            Og(e.g),
            e.g = new Bt(d),
            t(d.getBoundingClientRect) ? e.D = d : (e.D = e.w,
            V.C = e.D),
            d = e.H,
            e = e.g,
            d.F.Dc(e),
            d.C && (d = d.C,
            e = e.w.g,
            d.o = e,
            d.g && (d = d.g,
            d.g = e,
            qt(d, e)))));
            this.$ = !0;
            this.yd(a, b, c);
            e = Wq(this.w, this.K);
            wu(this, "init", {
                adsRenderingSettings: e,
                width: a,
                height: b,
                viewMode: c
            })
        } else {
            for (; !this.C.isEmpty(); )
                b = a = this.C,
                0 == b.g.length && (b.g = b.h,
                b.g.reverse(),
                b.h = []),
                a = a.g.pop(),
                this.dispatchEvent(a);
            this.W()
        }
    }
    ;
    m.Ge = function() {
        return gu(this.g)
    }
    ;
    m.Fe = function() {
        return this.K
    }
    ;
    m.tf = function() {
        return this.aa
    }
    ;
    m.qf = function() {
        return this.P
    }
    ;
    m.he = function() {
        wu(this, "discardAdBreak")
    }
    ;
    m.wf = function(a) {
        if (null != a) {
            var b = this.w.bitrate
              , c = a.bitrate;
            Pr.B().report(96, {
                init: this.$ ? "1" : "0",
                start: this.Aa ? "1" : "0",
                old: b,
                "new": c,
                changed: b != c ? "1" : "0"
            });
            this.w = a;
            a = Wq(this.w, this.K);
            wu(this, "updateAdsRenderingSettings", {
                adsRenderingSettings: a
            })
        }
    }
    ;
    m.vf = function() {
        wu(this, "skip")
    }
    ;
    m.start = function() {
        if (this.F) {
            (Sc || Uc) && Pr.B().report(50, {
                customPlayback: gu(this.g)
            });
            this.g.J || Pr.B().report(26, {
                adtagurl: this.F,
                customPlayback: gu(this.g)
            });
            nj(this.g.w) && Pr.B().report(30, {
                adtagurl: this.F,
                customPlayback: gu(this.g)
            });
            var a = this.g.C, b = this.g.w, c;
            if (c = a && b && !nj(a))
                a = ls(a),
                b = ls(b),
                c = 0 < a.width && 0 < a.height && 0 < b.width && 0 < b.height && a.left <= b.left + b.width && b.left <= a.left + a.width && a.top <= b.top + b.height && b.top <= a.top + a.height;
            c && Pr.B().report(31, {
                adtagurl: this.F,
                customPlayback: gu(this.g)
            })
        }
        if (!this.g.J && !gu(this.g))
            throw Mr(Kr);
        b = this.g;
        b.P = this.K && null != b.C;
        this.g.H.g.style.opacity = 1;
        null != this.A && 1 == this.getVolume() && ("boolean" === typeof this.A.muted && this.A.muted ? this.setVolume(0) : "number" === typeof this.A.volume && (b = this.A.volume,
        0 <= b && 1 >= b && this.setVolume(this.A.volume)));
        this.Aa = !0;
        wu(this, "start")
    }
    ;
    m.Zf = function() {
        if (!this.w.disableClickThrough && null != this.h) {
            var a = this.h.g.clickThroughUrl;
            if (null != a) {
                var b = Kb("_blank");
                if (!Rb(Ac(a))) {
                    var c = a instanceof fc || !Te.test(a) ? a : new fc(dc,a);
                    a = window;
                    c = c instanceof fc ? c : ic(c);
                    (a || q).open(gc(c), b ? Jb(b) : "", "", void 0)
                }
            }
        }
    }
    ;
    m.yd = function(a, b, c) {
        this.g.setSize(a, b);
        wu(this, "resize", {
            width: a,
            height: b,
            viewMode: c
        })
    }
    ;
    m.stop = function() {
        wu(this, "stop")
    }
    ;
    m.nf = function() {
        wu(this, "expand")
    }
    ;
    m.mf = function() {
        wu(this, "collapse")
    }
    ;
    m.getVolume = function() {
        return this.N
    }
    ;
    m.setVolume = function(a) {
        this.N = a;
        this.g.g.setVolume(a);
        wu(this, "volume", {
            volume: a
        })
    }
    ;
    m.pause = function() {
        wu(this, "pause")
    }
    ;
    m.resume = function() {
        wu(this, "resume")
    }
    ;
    m.destroy = function() {
        this.W()
    }
    ;
    m.rf = function() {
        return this.sb
    }
    ;
    m.sf = function() {
        Pr.B().report(124, {
            api: "getCurrentAd"
        });
        return this.h
    }
    ;
    m.R = function() {
        wu(this, "destroy");
        null != this.o && this.o.W();
        this.Z.W();
        this.C.clear();
        this.D && (this.D.stop(),
        this.D.W());
        Gr() && ps(this.G, this.O);
        L.prototype.R.call(this)
    }
    ;
    m.lf = function() {
        Pr.B().report(124, {
            api: "clicked"
        });
        wu(this, "click")
    }
    ;
    var xu = function(a, b) {
        Qg.call(this, "adsManagerLoaded");
        this.h = a;
        this.o = b
    };
    p(xu, Qg);
    xu.prototype.w = function(a, b) {
        var c = this.h;
        c.A = a;
        null != a.currentTime && (c.D = new Aq(a,c.J),
        c.D.start());
        null != b && (c.w = b);
        return this.h
    }
    ;
    xu.prototype.A = function() {
        return this.o
    }
    ;
    var Z = function() {
        this.videoPlayMuted = this.videoPlayActivation = "unknown";
        this.videoContinuousPlay = "0";
        this.nonLinearAdSlotHeight = this.nonLinearAdSlotWidth = this.linearAdSlotHeight = this.linearAdSlotWidth = this.liveStreamPrefetchSeconds = 0;
        this.forceNonLinearFullSlot = !1;
        this.vastLoadTimeout = 5E3
    };
    Z.prototype.setAdWillAutoPlay = function(a) {
        this.videoPlayActivation = a ? "auto" : "click"
    }
    ;
    Z.prototype.setAdWillPlayMuted = function(a) {
        this.videoPlayMuted = a ? "muted" : "unmuted"
    }
    ;
    Z.prototype.setContinuousPlayback = function(a) {
        this.videoContinuousPlay = a ? "2" : "1"
    }
    ;
    var yu = function(a, b, c) {
        this.h = c;
        0 == b.length && (b = [[]]);
        this.g = b.map(function(d) {
            d = a.concat(d);
            for (var e = [], f = 0, g = 0; f < d.length; ) {
                var h = d[f++];
                if (128 > h)
                    e[g++] = String.fromCharCode(h);
                else if (191 < h && 224 > h) {
                    var k = d[f++];
                    e[g++] = String.fromCharCode((h & 31) << 6 | k & 63)
                } else if (239 < h && 365 > h) {
                    k = d[f++];
                    var l = d[f++]
                      , n = d[f++];
                    h = ((h & 7) << 18 | (k & 63) << 12 | (l & 63) << 6 | n & 63) - 65536;
                    e[g++] = String.fromCharCode(55296 + (h >> 10));
                    e[g++] = String.fromCharCode(56320 + (h & 1023))
                } else
                    k = d[f++],
                    l = d[f++],
                    e[g++] = String.fromCharCode((h & 15) << 12 | (k & 63) << 6 | l & 63)
            }
            return new RegExp(e.join(""))
        })
    };
    yu.prototype.match = function(a) {
        var b = this;
        return this.g.some(function(c) {
            c = a.match(c);
            return null == c ? !1 : !b.h || 1 <= c.length && "3.355.3" == c[1] || 2 <= c.length && "3.355.3" == c[2] ? !0 : !1
        })
    }
    ;
    var zu = [104, 116, 116, 112, 115, 63, 58, 47, 47, 105, 109, 97, 115, 100, 107, 92, 46, 103, 111, 111, 103, 108, 101, 97, 112, 105, 115, 92, 46, 99, 111, 109, 47, 106, 115, 47, 40, 115, 100, 107, 108, 111, 97, 100, 101, 114, 124, 99, 111, 114, 101, 41, 47]
      , Au = [104, 116, 116, 112, 115, 63, 58, 47, 47, 115, 48, 92, 46, 50, 109, 100, 110, 92, 46, 110, 101, 116, 47, 105, 110, 115, 116, 114, 101, 97, 109, 47, 104, 116, 109, 108, 53, 47]
      , Bu = [104, 116, 116, 112, 115, 63, 58, 47, 47, 105, 109, 97, 115, 100, 107, 92, 46, 103, 111, 111, 103, 108, 101, 97, 112, 105, 115, 92, 46, 99, 111, 109, 47, 112, 114, 101, 114, 101, 108, 101, 97, 115, 101, 47, 106, 115, 47, 91, 48, 45, 57, 93, 43, 92, 46, 91, 48, 45, 57, 92, 46, 93, 43, 47]
      , Cu = [[105, 109, 97, 51, 92, 46, 106, 115], [105, 109, 97, 51, 95, 100, 101, 98, 117, 103, 92, 46, 106, 115]]
      , Du = [[98, 114, 105, 100, 103, 101, 40, 91, 48, 45, 57, 93, 43, 92, 46, 91, 48, 45, 57, 92, 46, 93, 43, 41, 40, 95, 40, 91, 97, 45, 122, 48, 45, 57, 93, 41, 123, 50, 44, 51, 125, 41, 123, 48, 44, 50, 125, 92, 46, 104, 116, 109, 108], [98, 114, 105, 100, 103, 101, 40, 91, 48, 45, 57, 93, 43, 92, 46, 91, 48, 45, 57, 92, 46, 93, 43, 41, 95, 100, 101, 98, 117, 103, 40, 95, 40, 91, 97, 45, 122, 48, 45, 57, 93, 41, 123, 50, 44, 51, 125, 41, 123, 48, 44, 50, 125, 92, 46, 104, 116, 109, 108], [98, 114, 105, 100, 103, 101, 40, 95, 40, 91, 97, 45, 122, 48, 45, 57, 93, 41, 123, 50, 44, 51, 125, 41, 123, 48, 44, 50, 125, 92, 46, 104, 116, 109, 108]]
      , Eu = [[111, 117, 116, 115, 116, 114, 101, 97, 109, 92, 46, 106, 115], [111, 117, 116, 115, 116, 114, 101, 97, 109, 95, 100, 101, 98, 117, 103, 92, 46, 106, 115]]
      , Fu = new yu(zu,Cu,!1)
      , Gu = new yu(zu,Du,!0)
      , Hu = new yu(Au,Cu,!1)
      , Iu = new yu(Au,Du,!0)
      , Ju = new yu(Bu,Cu,!1)
      , Ku = new yu([104, 116, 116, 112, 115, 63, 58, 47, 47, 40, 112, 97, 103, 101, 97, 100, 50, 124, 116, 112, 99, 41, 92, 46, 103, 111, 111, 103, 108, 101, 115, 121, 110, 100, 105, 99, 97, 116, 105, 111, 110, 92, 46, 99, 111, 109, 47, 112, 97, 103, 101, 97, 100, 47, 40, 103, 97, 100, 103, 101, 116, 115, 124, 106, 115, 41, 47],[],!1)
      , Lu = new yu(zu,[[100, 97, 105, 95, 105, 102, 114, 97, 109, 101, 40, 91, 48, 45, 57, 93, 43, 92, 46, 91, 48, 45, 57, 92, 46, 93, 43, 41, 40, 95, 40, 91, 97, 45, 122, 48, 45, 57, 93, 41, 123, 50, 44, 51, 125, 41, 123, 48, 44, 50, 125, 92, 46, 104, 116, 109, 108], [100, 97, 105, 95, 105, 102, 114, 97, 109, 101, 40, 91, 48, 45, 57, 93, 43, 92, 46, 91, 48, 45, 57, 92, 46, 93, 43, 41, 95, 100, 101, 98, 117, 103, 40, 95, 40, 91, 97, 45, 122, 48, 45, 57, 93, 41, 123, 50, 44, 51, 125, 41, 123, 48, 44, 50, 125, 92, 46, 104, 116, 109, 108], [100, 97, 105, 95, 105, 102, 114, 97, 109, 101, 40, 95, 40, 91, 97, 45, 122, 48, 45, 57, 93, 41, 123, 50, 44, 51, 125, 41, 123, 48, 44, 50, 125, 92, 46, 104, 116, 109, 108]],!0)
      , Mu = new yu(zu,Eu,!1)
      , Nu = new yu(Bu,Eu,!1)
      , qb = {
        Ng: Fu,
        Lg: Gu,
        Sg: Hu,
        Rg: Iu,
        Og: Ju,
        oh: Ku,
        Mg: Lu,
        Xg: Mu,
        Yg: Nu
    };
    var Pu = function() {
        if (sj())
            return window.location.href;
        var a = ef()
          , b = a.h
          , c = a.g;
        a = a.l;
        var d = null;
        a && (d = Ou(a.url));
        return d ? d : b && b.url ? b.url : c && c.url ? c.url : ""
    }
      , Ou = function(a) {
        try {
            var b = new Ao(a);
            if (!b.g.includes(".cdn.ampproject.org"))
                return null;
            var c = b.l.split("/").slice(1)
              , d = "s" == c[1] && 3 > c.length;
            if (2 > c.length || d)
                return null;
            var e = "s" == c[1];
            c = e ? c.slice(2) : c.slice(1);
            var f = decodeURIComponent(c[0]) + "/";
            return e ? "https://" + f + c.slice(1).join("/") : "http://" + f + c.slice(1).join("/")
        } catch (g) {
            return null
        }
    }
      , Qu = function() {
        var a = F().location.ancestorOrigins;
        return a ? 0 < a.length && 200 > a[a.length - 1].length ? a[a.length - 1] : "" : null
    };
    var Ru = function() {
        var a = this;
        this.g = new Promise(function(b, c) {
            a.resolve = b;
            a.reject = c
        }
        )
    };
    var Su = function(a, b, c) {
        var d = "script";
        d = void 0 === d ? "" : d;
        var e = a.createElement("link");
        try {
            e.rel = "preload",
            e.href = A("preload", "stylesheet") ? Ob(b).toString() : b instanceof Nb ? Ob(b).toString() : b instanceof fc ? gc(b) : gc(ic(b))
        } catch (f) {
            return
        }
        d && (e.as = d);
        c && e.setAttribute("nonce", c);
        if (a = a.getElementsByTagName("head")[0])
            try {
                a.appendChild(e)
            } catch (f) {}
    };
    var Tu = /^\.google\.(com?\.)?[a-z]{2,3}$/, Uu = /\.(cn|com\.bi|do|sl|ba|by|ma|am)$/, Vu = q, Wu = function(a) {
        a = "https://adservice" + (a + "/adsid/integrator.js");
        var b = ["domain=" + encodeURIComponent(q.location.hostname)];
        dr[3] >= v() && b.push("adsid=" + encodeURIComponent(dr[1]));
        return a + "?" + b.join("&")
    }, dr, Xu, cr = function() {
        Vu = q;
        dr = Vu.googleToken = Vu.googleToken || {};
        var a = v();
        dr[1] && dr[3] > a && 0 < dr[2] || (dr[1] = "",
        dr[2] = -1,
        dr[3] = -1,
        dr[4] = "",
        dr[6] = "");
        Xu = Vu.googleIMState = Vu.googleIMState || {};
        a = Xu[1];
        Tu.test(a) && !Uu.test(a) || (Xu[1] = ".google.com");
        Fa(Xu[5]) || (Xu[5] = []);
        "boolean" !== typeof Xu[6] && (Xu[6] = !1);
        Fa(Xu[7]) || (Xu[7] = []);
        "number" !== typeof Xu[8] && (Xu[8] = 0)
    }, Yu = {
        pc: function() {
            return 0 < Xu[8]
        },
        fg: function() {
            Xu[8]++
        },
        gg: function() {
            0 < Xu[8] && Xu[8]--
        },
        hg: function() {
            Xu[8] = 0
        },
        xh: function() {
            return !1
        },
        nd: function() {
            return Xu[5]
        },
        dd: function(a) {
            try {
                a()
            } catch (b) {
                q.setTimeout(function() {
                    throw b;
                }, 0)
            }
        },
        Ed: function() {
            if (!Yu.pc()) {
                var a = q.document
                  , b = function(e) {
                    e = Wu(e);
                    a: {
                        try {
                            var f = Aa();
                            break a
                        } catch (g) {}
                        f = void 0
                    }
                    Su(a, e, f);
                    f = a.createElement("script");
                    f.type = "text/javascript";
                    f.onerror = function() {
                        return q.processGoogleToken({}, 2)
                    }
                    ;
                    e = je(e);
                    vc(f, e);
                    try {
                        (a.head || a.body || a.documentElement).appendChild(f),
                        Yu.fg()
                    } catch (g) {}
                }
                  , c = Xu[1];
                // disable to access `adservice.google.com/adsid/integrator.js`
                //b(c);
                ".google.com" != c && b(".google.com");
                b = {};
                var d = (b.newToken = "FBT",
                b);
                q.setTimeout(function() {
                    return q.processGoogleToken(d, 1)
                }, 1E3)
            }
        }
    }, Zu = function(a) {
        cr();
        var b = Vu.googleToken[5] || 0;
        a && (0 != b || dr[3] >= v() ? Yu.dd(a) : (Yu.nd().push(a),
        Yu.Ed()));
        dr[3] >= v() && dr[2] >= v() || Yu.Ed()
    }, $u = function(a) {
        q.processGoogleToken = q.processGoogleToken || function(b, c) {
            var d = b;
            d = void 0 === d ? {} : d;
            c = void 0 === c ? 0 : c;
            b = d.newToken || "";
            var e = "NT" == b
              , f = parseInt(d.freshLifetimeSecs || "", 10)
              , g = parseInt(d.validLifetimeSecs || "", 10)
              , h = d["1p_jar"] || "";
            d = d.pucrd || "";
            cr();
            1 == c ? Yu.hg() : Yu.gg();
            var k = Vu.googleToken = Vu.googleToken || {}
              , l = 0 == c && b && "string" === typeof b && !e && "number" === typeof f && 0 < f && "number" === typeof g && 0 < g && "string" === typeof h;
            e = e && !Yu.pc() && (!(dr[3] >= v()) || "NT" == dr[1]);
            var n = !(dr[3] >= v()) && 0 != c;
            if (l || e || n)
                e = v(),
                f = e + 1E3 * f,
                g = e + 1E3 * g,
                1E-5 > Math.random() && Se(q, "https://pagead2.googlesyndication.com/pagead/gen_204?id=imerr&err=" + c),
                k[5] = c,
                k[1] = b,
                k[2] = f,
                k[3] = g,
                k[4] = h,
                k[6] = d,
                cr();
            if (l || !Yu.pc()) {
                c = Yu.nd();
                for (b = 0; b < c.length; b++)
                    Yu.dd(c[b]);
                c.length = 0
            }
        }
        ;
        Zu(a)
    };
    var av = function() {
        this.g = window
    }
      , bv = function(a, b) {
        t(a.g.__uspapi) ? (a = a.g.__uspapi,
        a("getUSPData", 1, function(c, d) {
            b(d ? c : null)
        })) : b(null)
    };
    var cv = function() {
        this.lb = "tcunavailable"
    };
    var dv = function(a, b) {
        b = void 0 === b ? 500 : b;
        K.call(this);
        var c = this;
        this.g = a;
        this.h = null;
        this.l = new Map;
        this.w = 0;
        this.o = b;
        var d = function(e) {
            try {
                var f;
                "string" === typeof e.data ? f = JSON.parse(e.data) : f = e.data;
                var g = f.__tcfapiReturn;
                var h = g.returnValue;
                var k = g.success;
                var l = g.callId;
                c.l.has(l) && c.l.get(l)(h, k)
            } catch (n) {}
        };
        this.g.addEventListener("message", d, !1);
        Ng(this, function() {
            c.g.removeEventListener("message", d)
        })
    };
    p(dv, K);
    dv.prototype.R = function() {
        this.l.clear();
        delete this.l;
        delete this.g;
        delete this.h;
        K.prototype.R.call(this)
    }
    ;
    var fv = function(a) {
        return t(a.g.__tcfapi) ? !0 : null != ev(a)
    }
      , iv = function(a, b) {
        t(a.g.__tcfapi) ? gv(a, b) : null != ev(a) ? hv(a, b) : b(new cv)
    }
      , ev = function(a) {
        if (null != a.h)
            return a.h;
        for (var b = a.g; b; ) {
            try {
                if (b.frames.__tcfapiLocator)
                    return a.h = b
            } catch (c) {}
            if (b === window.top)
                break;
            b = b.parent
        }
        return null
    }
      , gv = function(a, b) {
        var c = new cv
          , d = lb(function() {
            return b(c)
        });
        (0,
        a.g.__tcfapi)("getTCData", 2, function(e, f) {
            c = jv(e, f);
            d()
        }, void 0);
        th(d, a.o)
    }
      , hv = function(a, b) {
        var c = new cv
          , d = lb(function() {
            return b(c)
        })
          , e = a.w++;
        a.l.set(e, function(g, h) {
            c = jv(g, h);
            d()
        });
        var f = {};
        a.h.postMessage((f.__tcfapiCall = {
            command: "getTCData",
            parameter: void 0,
            version: 2,
            callId: e
        },
        f), "*");
        th(d, a.o)
    }
      , jv = function(a, b) {
        var c = new cv;
        if (!b)
            return c;
        c.gdprApplies = a.gdprApplies;
        c.lb = a.lb;
        c.ed = a.ed;
        ["stub", "loading", "error"].includes(a.ed) && (c.lb = "tcunavailable");
        return c
    };
    (function() {
        if (!rb(function(e) {
            return e.match(F().location.href)
        })) {
            for (var a = Vd(), b = null, c = null, d = 0; d < a.length; d++)
                if (c = a[d],
                rb(function(e) {
                    return e.match(c.src)
                })) {
                    b = c;
                    break
                }
            //if (null == b)
            //    throw Error("IMA SDK is either not loaded from a google domain or is not a supported version.");
        }
    }
    )();
    var mv = function(a) {
        L.call(this);
        this.g = a;
        this.A = new Map;
        this.o = this.g.H;
        this.C = new Dp(this);
        this.F = new dv(window);
        this.G = new av;
        0 != V.g ? (this.h = new hs,
        Pg(this, this.h)) : this.h = ks();
        if (Gr()) {
            a = this.h;
            var b = Wt(this.o);
            if (!a.o) {
                a.g = b || null;
                a.g && (a.D.T(a.g, "activityMonitor", a.F),
                qs(a));
                /* disable to access `s0.2mdn.net/instream/video/client.js`
                if (!(q.ima && q.ima.video && q.ima.video.client && q.ima.video.client.tagged)) {
                    r("ima.video.client.sdkTag", !0, void 0);
                    var c = q.document;
                    b = $d(document, "SCRIPT");
                    var d = Pb(Jb(Kb("https://s0.2mdn.net/instream/video/client.js")));
                    vc(b, d);
                    b.async = !0;
                    b.type = "text/javascript";
                    c = c.getElementsByTagName("script")[0];
                    c.parentNode.insertBefore(b, c)
                }
                */
                b = xr();
                ni(b);
                $n.B().K = V.g;
                a.A = !0;
                $n.B().l = !0;
                a.C = (t(null),
                null);
                b = $n.B();
                c = "h" == yn(b) || "b" == yn(b);
                d = "exc" != Q.B().U;
                c && d && (b.F = !0,
                b.G = new Cl);
                a.o = !0
            }
            this.w = os(this.h, this.g.D)
        }
        kv();
        lv()
    };
    p(mv, L);
    mv.prototype.R = function() {
        this.C.W();
        var a = this.w;
        this.h.w["delete"](a);
        0 != V.g && ($n.B().w[a] = null);
        L.prototype.R.call(this)
    }
    ;
    mv.prototype.destroy = function() {
        this.W()
    }
    ;
    mv.prototype.N = function(a, b) {
        var c = this;
        vr(rr(), 44710217) ? nv(this, a, b) : uj() ? ov(this, a, b, null, null) : $u(function() {
            er();
            fr();
            gr();
            ov(c, a, b, null, null)
        })
    }
    ;
    var nv = function(a, b, c) {
        var d = [];
        if (!uj()) {
            var e = new Ru;
            d.push(e.g);
            $u(function() {
                er();
                fr();
                gr();
                e.resolve()
            })
        }
        var f = null;
        if (fv(a.F)) {
            var g = new Ru;
            d.push(g.g);
            iv(a.F, function(l) {
                f = l;
                g.resolve()
            })
        }
        var h = null;
        if (t(a.G.g.__uspapi)) {
            var k = new Ru;
            d.push(k.g);
            bv(a.G, function(l) {
                h = l;
                k.resolve()
            })
        }
        Promise.all(d).then(function() {
            ov(a, b, c, f, h)
        })
    }
      , ov = function(a, b, c, d, e) {
        var f = b.adTagUrl;
        f && Pr.B().report(8, {
            adtagurl: f,
            customPlayback: gu(a.g),
            customClick: null != a.g.C
        });
        var g = "goog_" + Bc++;
        a.A.set(g, c || null);
        f ? (c = /iu=\/(\d+)\//.exec(wc(f)),
        (c = c && 2 == c.length ? c[1] : null) || (c = Ac((new Ao(f)).h.get("client")),
        c = Rb(c) ? null : c)) : c = null;
        c = c || "";
        var h = ye(c);
        0 != h ? c = h : (h = q.top,
        c = xe(h, "googlefcInactive") ? 4 : c && xe(h, "googlefcPA-" + c) ? 2 : xe(h, "googlefcNPA") ? 3 : 0);
        h = {};
        d = (h.gfcPresent = (!!q.googlefc || xe(q.top, "googlefcPresent")) && 4 != c,
        h.gfcUserConsent = c,
        h.isGdprLoader = !1,
        h.gdprApplies = d ? d.gdprApplies : null,
        h.tcString = d ? d.lb : null,
        h.uspString = e ? e.uspString : null,
        h);
        e = {};
        if (V.l) {
            c = iq();
            if (e.isBrowserCookieEnabled = c)
                c = new Ao(f),
                h = c.l,
                c = Qb(c.g, "doubleclick.net") && (Rb(h) ? !1 : /\/gampad\/(live\/)?ads/.test(h));
            c && (c = Kd.get("__gads"),
            e.gfpCookieValue = Ac(c))
        }
        try {
            -1 != window.location.search.indexOf("goognewman=651800008") && (tr(rr(), 651800008, "GvnExternalLayer"),
            console && console.log && console.log("goognewman=651800008"))
        } catch (Dg) {}
        c = ur();
        h = {};
        h.limaExperimentIds = eg().sort().join(",");
        var k = a.D()
          , l = 0 != V.g ? $n.B().l : a.h.A;
        l = void 0 === l ? null : l;
        var n = {};
        null != l && (n.activeViewPushUpdates = l);
        n.activityMonitorMode = k.g;
        n.adsToken = k.J;
        n.autoPlayAdBreaks = k.h;
        n.companionBackfill = k.w;
        n.cookiesEnabled = k.l;
        n.disableCustomPlaybackForIOS10Plus = k.o;
        n.engagementDetection = !0;
        n.isFunctionalTest = !1;
        n.isVpaidAdapter = k.Bb();
        n["1pJar"] = k.K;
        n.numRedirects = k.H;
        n.pageCorrelator = k.O;
        n.persistentStateCorrelator = Of();
        n.playerType = k.M;
        n.playerVersion = k.D;
        n.ppid = k.P;
        n.privacyControls = k.V;
        n.reportMediaRequests = !1;
        n.streamCorrelator = k.Y;
        n.testingConfig = Yq(k).g;
        n.unloadAbandonPingEnabled = !0;
        n.urlSignals = k.aa;
        n.vpaidMode = k.G;
        k = {};
        k.contentMediaUrl = a.g.G;
        k.customClickTrackingProvided = null != a.g.C;
        a: {
            l = bf();
            l = ba(l);
            for (var u = l.next(); !u.done; u = l.next())
                if (u = u.value,
                u.url && u.url.includes("amp=1")) {
                    l = !0;
                    break a
                }
            l = null != window.context ? 0 < parseInt(window.context.ampcontextVersion, 10) : null != ef().l
        }
        k.isAmp = l;
        a: {
            try {
                var x = window.top.location.href
            } catch (Dg) {
                x = 2;
                break a
            }
            x = null == x ? 2 : x == window.document.location.href ? 0 : 1
        }
        k.iframeState = x;
        k.imaHostingDomain = window.document.domain;
        k.location = Pu();
        k.referrer = window.document.referrer;
        k.domLoadTime = Cr;
        k.sdkImplLoadTime = Dr;
        k.topOrigin = Qu();
        k.osdId = a.w;
        k.usesCustomVideoPlayback = gu(a.g);
        k.usesInlinePlayback = a.g.M;
        l = a.g.F;
        x = [];
        var w = u = "";
        if (null != l) {
            u = l;
            w = !0;
            w = void 0 === w ? !1 : w;
            for (var C = [], G = 0; u && 25 > G; ++G) {
                var Sb = "";
                void 0 !== w && w || (Sb = (Sb = 9 !== u.nodeType && u.id) ? "/" + Sb : "");
                a: {
                    if (u && u.nodeName && u.parentElement) {
                        var tc = u.nodeName.toString().toLowerCase();
                        for (var We = u.parentElement.childNodes, Gd = 0, Za = 0; Za < We.length; ++Za) {
                            var Xe = We[Za];
                            if (Xe.nodeName && Xe.nodeName.toString().toLowerCase() === tc) {
                                if (u === Xe) {
                                    tc = "." + Gd;
                                    break a
                                }
                                ++Gd
                            }
                        }
                    }
                    tc = ""
                }
                C.push((u.nodeName && u.nodeName.toString().toLowerCase()) + Sb + tc);
                u = u.parentElement
            }
            u = C.join();
            if (l) {
                l = (l = l.ownerDocument) && (l.defaultView || l.parentWindow) || null;
                w = [];
                if (l)
                    try {
                        var N = l.parent;
                        for (C = 0; N && N !== l && 25 > C; ++C) {
                            var sb = N.frames;
                            for (G = 0; G < sb.length; ++G)
                                if (l === sb[G]) {
                                    w.push(G);
                                    break
                                }
                            l = N;
                            N = l.parent
                        }
                    } catch (Dg) {}
                w = w.join()
            } else
                w = ""
        }
        x.push(u, w);
        if (null != f) {
            for (N = 0; N < gp.length - 1; ++N)
                x.push(pe(f, gp[N]) || "");
            f = pe(f, "videoad_start_delay");
            N = "";
            f && (f = parseInt(f, 10),
            N = 0 > f ? "postroll" : 0 == f ? "preroll" : "midroll");
            x.push(N)
        } else
            for (f = 0; f < gp.length; ++f)
                x.push("");
        f = x.join(":");
        N = f.length;
        if (0 == N)
            f = 0;
        else {
            sb = 305419896;
            for (x = 0; x < N; x++)
                sb ^= (sb << 5) + (sb >> 2) + f.charCodeAt(x) & 4294967295;
            f = 0 < sb ? sb : 4294967296 + sb
        }
        k.videoAdKey = f.toString();
        f = {};
        N = {};
        N.adsResponse = b.adsResponse;
        N.videoPlayActivation = b.videoPlayActivation;
        N.videoPlayMuted = b.videoPlayMuted;
        N.videoContinuousPlay = b.videoContinuousPlay;
        N.adTagUrl = b.adTagUrl;
        N.contentDuration = b.contentDuration;
        N.contentKeywords = b.contentKeywords;
        N.contentTitle = b.contentTitle;
        N.linearAdSlotWidth = b.linearAdSlotWidth;
        N.linearAdSlotHeight = b.linearAdSlotHeight;
        N.nonLinearAdSlotWidth = b.nonLinearAdSlotWidth;
        N.nonLinearAdSlotHeight = b.nonLinearAdSlotHeight;
        N.forceNonLinearFullSlot = b.forceNonLinearFullSlot;
        N.liveStreamPrefetchSeconds = b.liveStreamPrefetchSeconds;
        N.vastLoadTimeout = b.vastLoadTimeout;
        Object.assign(f, N);
        f.consentSettings = d;
        f.cookieSettings = e;
        f.experimentState = c;
        f.imalibExperiments = h;
        f.settings = n;
        f.videoEnvironment = k;
        b = Wt(a.o, g);
        a.C.T(b, "adsLoader", a.J);
        b.send("adsLoader", "requestAds", f)
    };
    mv.prototype.D = function() {
        return V
    }
    ;
    mv.prototype.K = function() {
        Wt(this.o).send("adsLoader", "contentComplete")
    }
    ;
    var kv = function() {
        !uj() && $u(function() {
            er();
            fr();
            gr()
        })
    };
    mv.prototype.J = function(a) {
        var b = a.ca;
        switch (b) {
        case "adsLoaded":
            b = a.fa;
            a = a.Rb;
            b = new Y(this.h,this.g,b.adTagUrl || "",b.adCuePoints,this.w,b.isCustomClickTrackingAllowed,Wt(this.o, a));
            this.dispatchEvent(new xu(b,pv(this, a)));
            break;
        case "error":
            b = a.fa;
            a = a.Rb;
            var c = Qq(b);
            this.dispatchEvent(new Rq(c,pv(this, a)));
            a = {
                error: b.errorCode,
                vis: ig(document)
            };
            Pr.B().report(7, a);
            break;
        case "trackingUrlPinged":
            this.dispatchEvent(new Tq(b,null,a.fa))
        }
    }
    ;
    var pv = function(a, b) {
        var c = a.A.get(b);
        a.A["delete"](b);
        return c
    }
      , lv = function() {
        var a = (window.location.origin || "null").trim()
          , b = "null" === a
          , c = window == window.top
          , d = !1;
        try {
            d = null != window.top.location.hostname
        } catch (f) {}
        var e = null != Array.from(document.body.getElementsByTagName("script")).find(function(f) {
            return f.src && f.src.includes("connatix")
        });
        Pr.B().report(121, {
            location: Pu(),
            top_origin: Qu(),
            origin: a,
            is_null: b,
            is_top: c,
            is_friendly_to_top: d,
            is_vpaid_adapter: V.Bb(),
            is_connatix_player: e
        })
    };
    T.prototype.getCompanionAds = T.prototype.Le;
    T.prototype.isLinear = T.prototype.isLinear;
    T.prototype.isSkippable = T.prototype.jf;
    T.prototype.isUiDisabled = T.prototype.kf;
    T.prototype.getAdId = T.prototype.h;
    T.prototype.getAdSystem = T.prototype.Ie;
    T.prototype.getAdvertiserName = T.prototype.Je;
    T.prototype.getApiFramework = T.prototype.Ke;
    T.prototype.getContentType = T.prototype.Me;
    T.prototype.getCreativeId = T.prototype.o;
    T.prototype.getCreativeAdId = T.prototype.l;
    T.prototype.getDescription = T.prototype.Oe;
    T.prototype.getTitle = T.prototype.Ue;
    T.prototype.getDuration = T.prototype.getDuration;
    T.prototype.getHeight = T.prototype.Pe;
    T.prototype.getWidth = T.prototype.df;
    T.prototype.getVastMediaHeight = T.prototype.bf;
    T.prototype.getVastMediaWidth = T.prototype.cf;
    T.prototype.getVastMediaBitrate = T.prototype.af;
    T.prototype.getWrapperCreativeIds = T.prototype.hf;
    T.prototype.getWrapperAdIds = T.prototype.ff;
    T.prototype.getWrapperAdSystems = T.prototype.gf;
    T.prototype.getTraffickingParameters = T.prototype.Ve;
    T.prototype.getTraffickingParametersString = T.prototype.We;
    T.prototype.getAdPodInfo = T.prototype.He;
    T.prototype.getUiElements = T.prototype.Xe;
    T.prototype.getMinSuggestedDuration = T.prototype.Re;
    T.prototype.getMediaUrl = T.prototype.Qe;
    T.prototype.getSurveyUrl = T.prototype.Te;
    T.prototype.getSkipTimeOffset = T.prototype.Se;
    T.prototype.getDealId = T.prototype.Ne;
    T.prototype.getUniversalAdIds = T.prototype.$e;
    T.prototype.getUniversalAdIdValue = T.prototype.Ze;
    T.prototype.getUniversalAdIdRegistry = T.prototype.Ye;
    Uq.prototype.getCuePoints = Uq.prototype.h;
    r("google.ima.AdCuePoints.PREROLL", 0, window);
    r("google.ima.AdCuePoints.POSTROLL", -1, window);
    r("google.ima.AdDisplayContainer", hu, window);
    hu.prototype.initialize = hu.prototype.Y;
    hu.prototype.destroy = hu.prototype.destroy;
    Nq.prototype.getPodIndex = Nq.prototype.Ce;
    Nq.prototype.getTimeOffset = Nq.prototype.De;
    Nq.prototype.getTotalAds = Nq.prototype.Ee;
    Nq.prototype.getMaxDuration = Nq.prototype.Be;
    Nq.prototype.getAdPosition = Nq.prototype.ze;
    Nq.prototype.getIsBumper = Nq.prototype.Ae;
    Eq.prototype.getAdIdValue = Eq.prototype.o;
    Eq.prototype.getAdIdRegistry = Eq.prototype.l;
    r("google.ima.AdError.ErrorCode.VIDEO_PLAY_ERROR", 400, window);
    r("google.ima.AdError.ErrorCode.FAILED_TO_REQUEST_ADS", 1005, window);
    r("google.ima.AdError.ErrorCode.REQUIRED_LISTENERS_NOT_ADDED", 900, window);
    r("google.ima.AdError.ErrorCode.VAST_LOAD_TIMEOUT", 301, window);
    r("google.ima.AdError.ErrorCode.VAST_NO_ADS_AFTER_WRAPPER", 303, window);
    r("google.ima.AdError.ErrorCode.VAST_MEDIA_LOAD_TIMEOUT", 402, window);
    r("google.ima.AdError.ErrorCode.VAST_TOO_MANY_REDIRECTS", 302, window);
    r("google.ima.AdError.ErrorCode.VAST_ASSET_MISMATCH", 403, window);
    r("google.ima.AdError.ErrorCode.VAST_LINEAR_ASSET_MISMATCH", 403, window);
    r("google.ima.AdError.ErrorCode.VAST_NONLINEAR_ASSET_MISMATCH", 503, window);
    r("google.ima.AdError.ErrorCode.VAST_ASSET_NOT_FOUND", 1007, window);
    r("google.ima.AdError.ErrorCode.VAST_UNSUPPORTED_VERSION", 102, window);
    r("google.ima.AdError.ErrorCode.VAST_SCHEMA_VALIDATION_ERROR", 101, window);
    r("google.ima.AdError.ErrorCode.VAST_TRAFFICKING_ERROR", 200, window);
    r("google.ima.AdError.ErrorCode.VAST_UNEXPECTED_LINEARITY", 201, window);
    r("google.ima.AdError.ErrorCode.VAST_UNEXPECTED_DURATION_ERROR", 202, window);
    r("google.ima.AdError.ErrorCode.VAST_WRAPPER_ERROR", 300, window);
    r("google.ima.AdError.ErrorCode.NONLINEAR_DIMENSIONS_ERROR", 501, window);
    r("google.ima.AdError.ErrorCode.COMPANION_REQUIRED_ERROR", 602, window);
    r("google.ima.AdError.ErrorCode.VAST_EMPTY_RESPONSE", 1009, window);
    r("google.ima.AdError.ErrorCode.UNSUPPORTED_LOCALE", 1011, window);
    r("google.ima.AdError.ErrorCode.INVALID_ARGUMENTS", 1101, window);
    r("google.ima.AdError.ErrorCode.UNKNOWN_AD_RESPONSE", 1010, window);
    r("google.ima.AdError.ErrorCode.UNKNOWN_ERROR", 900, window);
    r("google.ima.AdError.ErrorCode.OVERLAY_AD_PLAYING_FAILED", 500, window);
    r("google.ima.AdError.ErrorCode.AUTOPLAY_DISALLOWED", 1205, window);
    r("google.ima.AdError.ErrorCode.VIDEO_ELEMENT_USED", -1, window);
    r("google.ima.AdError.ErrorCode.VIDEO_ELEMENT_REQUIRED", -1, window);
    r("google.ima.AdError.ErrorCode.VAST_MEDIA_ERROR", -1, window);
    r("google.ima.AdError.ErrorCode.ADSLOT_NOT_VISIBLE", -1, window);
    r("google.ima.AdError.ErrorCode.OVERLAY_AD_LOADING_FAILED", -1, window);
    r("google.ima.AdError.ErrorCode.VAST_MALFORMED_RESPONSE", -1, window);
    r("google.ima.AdError.ErrorCode.COMPANION_AD_LOADING_FAILED", -1, window);
    r("google.ima.AdError.Type.AD_LOAD", "adLoadError", window);
    r("google.ima.AdError.Type.AD_PLAY", "adPlayError", window);
    Pq.prototype.getErrorCode = Pq.prototype.ve;
    Pq.prototype.getVastErrorCode = Pq.prototype.je;
    Pq.prototype.getInnerError = Pq.prototype.we;
    Pq.prototype.getMessage = Pq.prototype.xe;
    Pq.prototype.getType = Pq.prototype.ye;
    r("google.ima.AdErrorEvent.Type.AD_ERROR", "adError", window);
    Rq.prototype.getError = Rq.prototype.w;
    Rq.prototype.getUserRequestContext = Rq.prototype.A;
    r("google.ima.AdEvent.Type.CONTENT_RESUME_REQUESTED", "contentResumeRequested", window);
    r("google.ima.AdEvent.Type.CONTENT_PAUSE_REQUESTED", "contentPauseRequested", window);
    r("google.ima.AdEvent.Type.CLICK", "click", window);
    r("google.ima.AdEvent.Type.DURATION_CHANGE", "durationChange", window);
    r("google.ima.AdEvent.Type.EXPANDED_CHANGED", "expandedChanged", window);
    r("google.ima.AdEvent.Type.STARTED", "start", window);
    r("google.ima.AdEvent.Type.IMPRESSION", "impression", window);
    r("google.ima.AdEvent.Type.PAUSED", "pause", window);
    r("google.ima.AdEvent.Type.RESUMED", "resume", window);
    r("google.ima.AdEvent.Type.AD_PROGRESS", "adProgress", window);
    r("google.ima.AdEvent.Type.AD_BUFFERING", "adBuffering", window);
    r("google.ima.AdEvent.Type.FIRST_QUARTILE", "firstQuartile", window);
    r("google.ima.AdEvent.Type.MIDPOINT", "midpoint", window);
    r("google.ima.AdEvent.Type.THIRD_QUARTILE", "thirdQuartile", window);
    r("google.ima.AdEvent.Type.COMPLETE", "complete", window);
    r("google.ima.AdEvent.Type.USER_CLOSE", "userClose", window);
    r("google.ima.AdEvent.Type.LINEAR_CHANGED", "linearChanged", window);
    r("google.ima.AdEvent.Type.LOADED", "loaded", window);
    r("google.ima.AdEvent.Type.AD_CAN_PLAY", "adCanPlay", window);
    r("google.ima.AdEvent.Type.AD_METADATA", "adMetadata", window);
    r("google.ima.AdEvent.Type.AD_BREAK_READY", "adBreakReady", window);
    r("google.ima.AdEvent.Type.INTERACTION", "interaction", window);
    r("google.ima.AdEvent.Type.ALL_ADS_COMPLETED", "allAdsCompleted", window);
    r("google.ima.AdEvent.Type.SKIPPED", "skip", window);
    r("google.ima.AdEvent.Type.SKIPPABLE_STATE_CHANGED", "skippableStateChanged", window);
    r("google.ima.AdEvent.Type.LOG", "log", window);
    r("google.ima.AdEvent.Type.VIEWABLE_IMPRESSION", "viewable_impression", window);
    r("google.ima.AdEvent.Type.VOLUME_CHANGED", "volumeChange", window);
    r("google.ima.AdEvent.Type.VOLUME_MUTED", "mute", window);
    Tq.prototype.type = Tq.prototype.type;
    Tq.prototype.getAd = Tq.prototype.C;
    Tq.prototype.getAdData = Tq.prototype.H;
    iu.prototype.getAdCuePoints = iu.prototype.o;
    r("google.ima.AdsLoader", mv, window);
    mv.prototype.getSettings = mv.prototype.D;
    mv.prototype.requestAds = mv.prototype.N;
    mv.prototype.contentComplete = mv.prototype.K;
    mv.prototype.destroy = mv.prototype.destroy;
    r("google.ima.AdsManagerLoadedEvent.Type.ADS_MANAGER_LOADED", "adsManagerLoaded", window);
    xu.prototype.getAdsManager = xu.prototype.w;
    xu.prototype.getUserRequestContext = xu.prototype.A;
    r("google.ima.CompanionAdSelectionSettings", Fq, window);
    r("google.ima.CompanionAdSelectionSettings.CreativeType.IMAGE", "Image", void 0);
    r("google.ima.CompanionAdSelectionSettings.CreativeType.FLASH", "Flash", void 0);
    r("google.ima.CompanionAdSelectionSettings.CreativeType.ALL", "All", void 0);
    r("google.ima.CompanionAdSelectionSettings.ResourceType.HTML", "Html", void 0);
    r("google.ima.CompanionAdSelectionSettings.ResourceType.IFRAME", "IFrame", void 0);
    r("google.ima.CompanionAdSelectionSettings.ResourceType.STATIC", "Static", void 0);
    r("google.ima.CompanionAdSelectionSettings.ResourceType.ALL", "All", void 0);
    r("google.ima.CompanionAdSelectionSettings.SizeCriteria.IGNORE", "IgnoreSize", void 0);
    r("google.ima.CompanionAdSelectionSettings.SizeCriteria.SELECT_EXACT_MATCH", "SelectExactMatch", void 0);
    r("google.ima.CompanionAdSelectionSettings.SizeCriteria.SELECT_NEAR_MATCH", "SelectNearMatch", void 0);
    r("google.ima.CustomContentLoadedEvent.Type.CUSTOM_CONTENT_LOADED", "deprecated-event", window);
    r("ima.ImaSdkSettings", W, window);
    r("google.ima.settings", V, window);
    W.prototype.setCompanionBackfill = W.prototype.Gf;
    W.prototype.getCompanionBackfill = W.prototype.xf;
    W.prototype.setAutoPlayAdBreaks = W.prototype.Ff;
    W.prototype.isAutoPlayAdBreak = W.prototype.Ef;
    W.prototype.setPpid = W.prototype.Pf;
    W.prototype.getPpid = W.prototype.Df;
    W.prototype.setVpaidAllowed = W.prototype.Qf;
    W.prototype.setVpaidMode = W.prototype.Rf;
    W.prototype.setIsVpaidAdapter = W.prototype.Kf;
    W.prototype.isVpaidAdapter = W.prototype.Bb;
    W.prototype.setNumRedirects = W.prototype.Mf;
    W.prototype.getNumRedirects = W.prototype.Af;
    W.prototype.getLocale = W.prototype.ie;
    W.prototype.setLocale = W.prototype.Lf;
    W.prototype.getPlayerType = W.prototype.Bf;
    W.prototype.setPlayerType = W.prototype.Nf;
    W.prototype.getDisableFlashAds = W.prototype.zf;
    W.prototype.setDisableFlashAds = W.prototype.Jf;
    W.prototype.getPlayerVersion = W.prototype.Cf;
    W.prototype.setPlayerVersion = W.prototype.Of;
    W.prototype.setPageCorrelator = W.prototype.Z;
    W.prototype.setStreamCorrelator = W.prototype.$;
    W.prototype.setDisableCustomPlaybackForIOS10Plus = W.prototype.If;
    W.prototype.getDisableCustomPlaybackForIOS10Plus = W.prototype.yf;
    W.prototype.setCookiesEnabled = W.prototype.Hf;
    r("google.ima.ImaSdkSettings.CompanionBackfillMode.ALWAYS", "always", void 0);
    r("google.ima.ImaSdkSettings.CompanionBackfillMode.ON_MASTER_AD", "on_master_ad", void 0);
    r("google.ima.ImaSdkSettings.VpaidMode.DISABLED", 0, void 0);
    r("google.ima.ImaSdkSettings.VpaidMode.ENABLED", 1, void 0);
    r("google.ima.ImaSdkSettings.VpaidMode.INSECURE", 2, void 0);
    r("google.ima.AdsRenderingSettings", Vq, window);
    r("google.ima.AdsRenderingSettings.AUTO_SCALE", -1, window);
    r("google.ima.AdsRequest", Z, window);
    Z.prototype.adTagUrl = Z.prototype.adTagUrl;
    Z.prototype.adsResponse = Z.prototype.adsResponse;
    Z.prototype.nonLinearAdSlotHeight = Z.prototype.nonLinearAdSlotHeight;
    Z.prototype.nonLinearAdSlotWidth = Z.prototype.nonLinearAdSlotWidth;
    Z.prototype.linearAdSlotHeight = Z.prototype.linearAdSlotHeight;
    Z.prototype.linearAdSlotWidth = Z.prototype.linearAdSlotWidth;
    Z.prototype.setAdWillAutoPlay = Z.prototype.setAdWillAutoPlay;
    Z.prototype.setAdWillPlayMuted = Z.prototype.setAdWillPlayMuted;
    Z.prototype.setContinuousPlayback = Z.prototype.setContinuousPlayback;
    Z.prototype.contentDuration = Z.prototype.contentDuration;
    Z.prototype.contentKeywords = Z.prototype.contentKeywords;
    Z.prototype.contentTitle = Z.prototype.contentTitle;
    Z.prototype.vastLoadTimeout = Z.prototype.vastLoadTimeout;
    r("google.ima.VERSION", "3.355.3", void 0);
    r("google.ima.UiElements.AD_ATTRIBUTION", "adAttribution", void 0);
    r("google.ima.UiElements.COUNTDOWN", "countdown", void 0);
    r("google.ima.ViewMode.NORMAL", "normal", void 0);
    r("google.ima.ViewMode.FULLSCREEN", "fullscreen", void 0);
    Y.prototype.isCustomPlaybackUsed = Y.prototype.Ge;
    Y.prototype.isCustomClickTrackingUsed = Y.prototype.Fe;
    Y.prototype.destroy = Y.prototype.destroy;
    Y.prototype.init = Y.prototype.uf;
    Y.prototype.start = Y.prototype.start;
    Y.prototype.stop = Y.prototype.stop;
    Y.prototype.pause = Y.prototype.pause;
    Y.prototype.resume = Y.prototype.resume;
    Y.prototype.getCuePoints = Y.prototype.rf;
    Y.prototype.getCurrentAd = Y.prototype.sf;
    Y.prototype.getRemainingTime = Y.prototype.tf;
    Y.prototype.expand = Y.prototype.nf;
    Y.prototype.collapse = Y.prototype.mf;
    Y.prototype.getAdSkippableState = Y.prototype.qf;
    Y.prototype.resize = Y.prototype.yd;
    Y.prototype.skip = Y.prototype.vf;
    Y.prototype.getVolume = Y.prototype.getVolume;
    Y.prototype.setVolume = Y.prototype.setVolume;
    Y.prototype.discardAdBreak = Y.prototype.he;
    Y.prototype.updateAdsRenderingSettings = Y.prototype.wf;
    Y.prototype.clicked = Y.prototype.lf;
    Cq.prototype.getContent = Cq.prototype.getContent;
    Cq.prototype.getContentType = Cq.prototype.h;
    Cq.prototype.getHeight = Cq.prototype.l;
    Cq.prototype.getWidth = Cq.prototype.o;
}
)();
