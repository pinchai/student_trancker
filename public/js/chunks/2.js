(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[2],{

/***/ "./node_modules/fflate/esm/browser.js":
/*!********************************************!*\
  !*** ./node_modules/fflate/esm/browser.js ***!
  \********************************************/
/*! exports provided: FlateErrorCode, Deflate, AsyncDeflate, deflate, deflateSync, Inflate, AsyncInflate, inflate, inflateSync, Gzip, AsyncGzip, gzip, gzipSync, Gunzip, AsyncGunzip, gunzip, gunzipSync, Zlib, AsyncZlib, zlib, zlibSync, Unzlib, AsyncUnzlib, unzlib, unzlibSync, compress, AsyncCompress, compressSync, Compress, Decompress, AsyncDecompress, decompress, decompressSync, DecodeUTF8, EncodeUTF8, strToU8, strFromU8, ZipPassThrough, ZipDeflate, AsyncZipDeflate, Zip, zip, zipSync, UnzipPassThrough, UnzipInflate, AsyncUnzipInflate, Unzip, unzip, unzipSync */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FlateErrorCode", function() { return FlateErrorCode; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Deflate", function() { return Deflate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AsyncDeflate", function() { return AsyncDeflate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "deflate", function() { return deflate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "deflateSync", function() { return deflateSync; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Inflate", function() { return Inflate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AsyncInflate", function() { return AsyncInflate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "inflate", function() { return inflate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "inflateSync", function() { return inflateSync; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Gzip", function() { return Gzip; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AsyncGzip", function() { return AsyncGzip; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "gzip", function() { return gzip; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "gzipSync", function() { return gzipSync; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Gunzip", function() { return Gunzip; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AsyncGunzip", function() { return AsyncGunzip; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "gunzip", function() { return gunzip; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "gunzipSync", function() { return gunzipSync; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Zlib", function() { return Zlib; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AsyncZlib", function() { return AsyncZlib; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "zlib", function() { return zlib; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "zlibSync", function() { return zlibSync; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Unzlib", function() { return Unzlib; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AsyncUnzlib", function() { return AsyncUnzlib; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "unzlib", function() { return unzlib; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "unzlibSync", function() { return unzlibSync; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "compress", function() { return gzip; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AsyncCompress", function() { return AsyncGzip; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "compressSync", function() { return gzipSync; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Compress", function() { return Gzip; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Decompress", function() { return Decompress; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AsyncDecompress", function() { return AsyncDecompress; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "decompress", function() { return decompress; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "decompressSync", function() { return decompressSync; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DecodeUTF8", function() { return DecodeUTF8; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EncodeUTF8", function() { return EncodeUTF8; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "strToU8", function() { return strToU8; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "strFromU8", function() { return strFromU8; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ZipPassThrough", function() { return ZipPassThrough; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ZipDeflate", function() { return ZipDeflate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AsyncZipDeflate", function() { return AsyncZipDeflate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Zip", function() { return Zip; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "zip", function() { return zip; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "zipSync", function() { return zipSync; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UnzipPassThrough", function() { return UnzipPassThrough; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UnzipInflate", function() { return UnzipInflate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AsyncUnzipInflate", function() { return AsyncUnzipInflate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Unzip", function() { return Unzip; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "unzip", function() { return unzip; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "unzipSync", function() { return unzipSync; });
// DEFLATE is a complex format; to read this code, you should probably check the RFC first:
// https://tools.ietf.org/html/rfc1951
// You may also wish to take a look at the guide I made about this program:
// https://gist.github.com/101arrowz/253f31eb5abc3d9275ab943003ffecad
// Some of the following code is similar to that of UZIP.js:
// https://github.com/photopea/UZIP.js
// However, the vast majority of the codebase has diverged from UZIP.js to increase performance and reduce bundle size.
// Sometimes 0 will appear where -1 would be more appropriate. This is because using a uint
// is better for memory in most engines (I *think*).
var ch2 = {};
var wk = (function (c, id, msg, transfer, cb) {
    var w = new Worker(ch2[id] || (ch2[id] = URL.createObjectURL(new Blob([
        c + ';addEventListener("error",function(e){e=e.error;postMessage({$e$:[e.message,e.code,e.stack]})})'
    ], { type: 'text/javascript' }))));
    w.onmessage = function (e) {
        var d = e.data, ed = d.$e$;
        if (ed) {
            var err = new Error(ed[0]);
            err['code'] = ed[1];
            err.stack = ed[2];
            cb(err, null);
        }
        else
            cb(null, d);
    };
    w.postMessage(msg, transfer);
    return w;
});

// aliases for shorter compressed code (most minifers don't do this)
var u8 = Uint8Array, u16 = Uint16Array, u32 = Uint32Array;
// fixed length extra bits
var fleb = new u8([0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 0, /* unused */ 0, 0, /* impossible */ 0]);
// fixed distance extra bits
// see fleb note
var fdeb = new u8([0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13, /* unused */ 0, 0]);
// code length index map
var clim = new u8([16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15]);
// get base, reverse index map from extra bits
var freb = function (eb, start) {
    var b = new u16(31);
    for (var i = 0; i < 31; ++i) {
        b[i] = start += 1 << eb[i - 1];
    }
    // numbers here are at max 18 bits
    var r = new u32(b[30]);
    for (var i = 1; i < 30; ++i) {
        for (var j = b[i]; j < b[i + 1]; ++j) {
            r[j] = ((j - b[i]) << 5) | i;
        }
    }
    return [b, r];
};
var _a = freb(fleb, 2), fl = _a[0], revfl = _a[1];
// we can ignore the fact that the other numbers are wrong; they never happen anyway
fl[28] = 258, revfl[258] = 28;
var _b = freb(fdeb, 0), fd = _b[0], revfd = _b[1];
// map of value to reverse (assuming 16 bits)
var rev = new u16(32768);
for (var i = 0; i < 32768; ++i) {
    // reverse table algorithm from SO
    var x = ((i & 0xAAAA) >>> 1) | ((i & 0x5555) << 1);
    x = ((x & 0xCCCC) >>> 2) | ((x & 0x3333) << 2);
    x = ((x & 0xF0F0) >>> 4) | ((x & 0x0F0F) << 4);
    rev[i] = (((x & 0xFF00) >>> 8) | ((x & 0x00FF) << 8)) >>> 1;
}
// create huffman tree from u8 "map": index -> code length for code index
// mb (max bits) must be at most 15
// TODO: optimize/split up?
var hMap = (function (cd, mb, r) {
    var s = cd.length;
    // index
    var i = 0;
    // u16 "map": index -> # of codes with bit length = index
    var l = new u16(mb);
    // length of cd must be 288 (total # of codes)
    for (; i < s; ++i) {
        if (cd[i])
            ++l[cd[i] - 1];
    }
    // u16 "map": index -> minimum code for bit length = index
    var le = new u16(mb);
    for (i = 0; i < mb; ++i) {
        le[i] = (le[i - 1] + l[i - 1]) << 1;
    }
    var co;
    if (r) {
        // u16 "map": index -> number of actual bits, symbol for code
        co = new u16(1 << mb);
        // bits to remove for reverser
        var rvb = 15 - mb;
        for (i = 0; i < s; ++i) {
            // ignore 0 lengths
            if (cd[i]) {
                // num encoding both symbol and bits read
                var sv = (i << 4) | cd[i];
                // free bits
                var r_1 = mb - cd[i];
                // start value
                var v = le[cd[i] - 1]++ << r_1;
                // m is end value
                for (var m = v | ((1 << r_1) - 1); v <= m; ++v) {
                    // every 16 bit value starting with the code yields the same result
                    co[rev[v] >>> rvb] = sv;
                }
            }
        }
    }
    else {
        co = new u16(s);
        for (i = 0; i < s; ++i) {
            if (cd[i]) {
                co[i] = rev[le[cd[i] - 1]++] >>> (15 - cd[i]);
            }
        }
    }
    return co;
});
// fixed length tree
var flt = new u8(288);
for (var i = 0; i < 144; ++i)
    flt[i] = 8;
for (var i = 144; i < 256; ++i)
    flt[i] = 9;
for (var i = 256; i < 280; ++i)
    flt[i] = 7;
for (var i = 280; i < 288; ++i)
    flt[i] = 8;
// fixed distance tree
var fdt = new u8(32);
for (var i = 0; i < 32; ++i)
    fdt[i] = 5;
// fixed length map
var flm = /*#__PURE__*/ hMap(flt, 9, 0), flrm = /*#__PURE__*/ hMap(flt, 9, 1);
// fixed distance map
var fdm = /*#__PURE__*/ hMap(fdt, 5, 0), fdrm = /*#__PURE__*/ hMap(fdt, 5, 1);
// find max of array
var max = function (a) {
    var m = a[0];
    for (var i = 1; i < a.length; ++i) {
        if (a[i] > m)
            m = a[i];
    }
    return m;
};
// read d, starting at bit p and mask with m
var bits = function (d, p, m) {
    var o = (p / 8) | 0;
    return ((d[o] | (d[o + 1] << 8)) >> (p & 7)) & m;
};
// read d, starting at bit p continuing for at least 16 bits
var bits16 = function (d, p) {
    var o = (p / 8) | 0;
    return ((d[o] | (d[o + 1] << 8) | (d[o + 2] << 16)) >> (p & 7));
};
// get end of byte
var shft = function (p) { return ((p + 7) / 8) | 0; };
// typed array slice - allows garbage collector to free original reference,
// while being more compatible than .slice
var slc = function (v, s, e) {
    if (s == null || s < 0)
        s = 0;
    if (e == null || e > v.length)
        e = v.length;
    // can't use .constructor in case user-supplied
    var n = new (v.BYTES_PER_ELEMENT == 2 ? u16 : v.BYTES_PER_ELEMENT == 4 ? u32 : u8)(e - s);
    n.set(v.subarray(s, e));
    return n;
};
/**
 * Codes for errors generated within this library
 */
var FlateErrorCode = {
    UnexpectedEOF: 0,
    InvalidBlockType: 1,
    InvalidLengthLiteral: 2,
    InvalidDistance: 3,
    StreamFinished: 4,
    NoStreamHandler: 5,
    InvalidHeader: 6,
    NoCallback: 7,
    InvalidUTF8: 8,
    ExtraFieldTooLong: 9,
    InvalidDate: 10,
    FilenameTooLong: 11,
    StreamFinishing: 12,
    InvalidZipData: 13,
    UnknownCompressionMethod: 14
};
// error codes
var ec = [
    'unexpected EOF',
    'invalid block type',
    'invalid length/literal',
    'invalid distance',
    'stream finished',
    'no stream handler',
    ,
    'no callback',
    'invalid UTF-8 data',
    'extra field too long',
    'date not in range 1980-2099',
    'filename too long',
    'stream finishing',
    'invalid zip data'
    // determined by unknown compression method
];
;
var err = function (ind, msg, nt) {
    var e = new Error(msg || ec[ind]);
    e.code = ind;
    if (Error.captureStackTrace)
        Error.captureStackTrace(e, err);
    if (!nt)
        throw e;
    return e;
};
// expands raw DEFLATE data
var inflt = function (dat, buf, st) {
    // source length
    var sl = dat.length;
    if (!sl || (st && st.f && !st.l))
        return buf || new u8(0);
    // have to estimate size
    var noBuf = !buf || st;
    // no state
    var noSt = !st || st.i;
    if (!st)
        st = {};
    // Assumes roughly 33% compression ratio average
    if (!buf)
        buf = new u8(sl * 3);
    // ensure buffer can fit at least l elements
    var cbuf = function (l) {
        var bl = buf.length;
        // need to increase size to fit
        if (l > bl) {
            // Double or set to necessary, whichever is greater
            var nbuf = new u8(Math.max(bl * 2, l));
            nbuf.set(buf);
            buf = nbuf;
        }
    };
    //  last chunk         bitpos           bytes
    var final = st.f || 0, pos = st.p || 0, bt = st.b || 0, lm = st.l, dm = st.d, lbt = st.m, dbt = st.n;
    // total bits
    var tbts = sl * 8;
    do {
        if (!lm) {
            // BFINAL - this is only 1 when last chunk is next
            final = bits(dat, pos, 1);
            // type: 0 = no compression, 1 = fixed huffman, 2 = dynamic huffman
            var type = bits(dat, pos + 1, 3);
            pos += 3;
            if (!type) {
                // go to end of byte boundary
                var s = shft(pos) + 4, l = dat[s - 4] | (dat[s - 3] << 8), t = s + l;
                if (t > sl) {
                    if (noSt)
                        err(0);
                    break;
                }
                // ensure size
                if (noBuf)
                    cbuf(bt + l);
                // Copy over uncompressed data
                buf.set(dat.subarray(s, t), bt);
                // Get new bitpos, update byte count
                st.b = bt += l, st.p = pos = t * 8, st.f = final;
                continue;
            }
            else if (type == 1)
                lm = flrm, dm = fdrm, lbt = 9, dbt = 5;
            else if (type == 2) {
                //  literal                            lengths
                var hLit = bits(dat, pos, 31) + 257, hcLen = bits(dat, pos + 10, 15) + 4;
                var tl = hLit + bits(dat, pos + 5, 31) + 1;
                pos += 14;
                // length+distance tree
                var ldt = new u8(tl);
                // code length tree
                var clt = new u8(19);
                for (var i = 0; i < hcLen; ++i) {
                    // use index map to get real code
                    clt[clim[i]] = bits(dat, pos + i * 3, 7);
                }
                pos += hcLen * 3;
                // code lengths bits
                var clb = max(clt), clbmsk = (1 << clb) - 1;
                // code lengths map
                var clm = hMap(clt, clb, 1);
                for (var i = 0; i < tl;) {
                    var r = clm[bits(dat, pos, clbmsk)];
                    // bits read
                    pos += r & 15;
                    // symbol
                    var s = r >>> 4;
                    // code length to copy
                    if (s < 16) {
                        ldt[i++] = s;
                    }
                    else {
                        //  copy   count
                        var c = 0, n = 0;
                        if (s == 16)
                            n = 3 + bits(dat, pos, 3), pos += 2, c = ldt[i - 1];
                        else if (s == 17)
                            n = 3 + bits(dat, pos, 7), pos += 3;
                        else if (s == 18)
                            n = 11 + bits(dat, pos, 127), pos += 7;
                        while (n--)
                            ldt[i++] = c;
                    }
                }
                //    length tree                 distance tree
                var lt = ldt.subarray(0, hLit), dt = ldt.subarray(hLit);
                // max length bits
                lbt = max(lt);
                // max dist bits
                dbt = max(dt);
                lm = hMap(lt, lbt, 1);
                dm = hMap(dt, dbt, 1);
            }
            else
                err(1);
            if (pos > tbts) {
                if (noSt)
                    err(0);
                break;
            }
        }
        // Make sure the buffer can hold this + the largest possible addition
        // Maximum chunk size (practically, theoretically infinite) is 2^17;
        if (noBuf)
            cbuf(bt + 131072);
        var lms = (1 << lbt) - 1, dms = (1 << dbt) - 1;
        var lpos = pos;
        for (;; lpos = pos) {
            // bits read, code
            var c = lm[bits16(dat, pos) & lms], sym = c >>> 4;
            pos += c & 15;
            if (pos > tbts) {
                if (noSt)
                    err(0);
                break;
            }
            if (!c)
                err(2);
            if (sym < 256)
                buf[bt++] = sym;
            else if (sym == 256) {
                lpos = pos, lm = null;
                break;
            }
            else {
                var add = sym - 254;
                // no extra bits needed if less
                if (sym > 264) {
                    // index
                    var i = sym - 257, b = fleb[i];
                    add = bits(dat, pos, (1 << b) - 1) + fl[i];
                    pos += b;
                }
                // dist
                var d = dm[bits16(dat, pos) & dms], dsym = d >>> 4;
                if (!d)
                    err(3);
                pos += d & 15;
                var dt = fd[dsym];
                if (dsym > 3) {
                    var b = fdeb[dsym];
                    dt += bits16(dat, pos) & ((1 << b) - 1), pos += b;
                }
                if (pos > tbts) {
                    if (noSt)
                        err(0);
                    break;
                }
                if (noBuf)
                    cbuf(bt + 131072);
                var end = bt + add;
                for (; bt < end; bt += 4) {
                    buf[bt] = buf[bt - dt];
                    buf[bt + 1] = buf[bt + 1 - dt];
                    buf[bt + 2] = buf[bt + 2 - dt];
                    buf[bt + 3] = buf[bt + 3 - dt];
                }
                bt = end;
            }
        }
        st.l = lm, st.p = lpos, st.b = bt, st.f = final;
        if (lm)
            final = 1, st.m = lbt, st.d = dm, st.n = dbt;
    } while (!final);
    return bt == buf.length ? buf : slc(buf, 0, bt);
};
// starting at p, write the minimum number of bits that can hold v to d
var wbits = function (d, p, v) {
    v <<= p & 7;
    var o = (p / 8) | 0;
    d[o] |= v;
    d[o + 1] |= v >>> 8;
};
// starting at p, write the minimum number of bits (>8) that can hold v to d
var wbits16 = function (d, p, v) {
    v <<= p & 7;
    var o = (p / 8) | 0;
    d[o] |= v;
    d[o + 1] |= v >>> 8;
    d[o + 2] |= v >>> 16;
};
// creates code lengths from a frequency table
var hTree = function (d, mb) {
    // Need extra info to make a tree
    var t = [];
    for (var i = 0; i < d.length; ++i) {
        if (d[i])
            t.push({ s: i, f: d[i] });
    }
    var s = t.length;
    var t2 = t.slice();
    if (!s)
        return [et, 0];
    if (s == 1) {
        var v = new u8(t[0].s + 1);
        v[t[0].s] = 1;
        return [v, 1];
    }
    t.sort(function (a, b) { return a.f - b.f; });
    // after i2 reaches last ind, will be stopped
    // freq must be greater than largest possible number of symbols
    t.push({ s: -1, f: 25001 });
    var l = t[0], r = t[1], i0 = 0, i1 = 1, i2 = 2;
    t[0] = { s: -1, f: l.f + r.f, l: l, r: r };
    // efficient algorithm from UZIP.js
    // i0 is lookbehind, i2 is lookahead - after processing two low-freq
    // symbols that combined have high freq, will start processing i2 (high-freq,
    // non-composite) symbols instead
    // see https://reddit.com/r/photopea/comments/ikekht/uzipjs_questions/
    while (i1 != s - 1) {
        l = t[t[i0].f < t[i2].f ? i0++ : i2++];
        r = t[i0 != i1 && t[i0].f < t[i2].f ? i0++ : i2++];
        t[i1++] = { s: -1, f: l.f + r.f, l: l, r: r };
    }
    var maxSym = t2[0].s;
    for (var i = 1; i < s; ++i) {
        if (t2[i].s > maxSym)
            maxSym = t2[i].s;
    }
    // code lengths
    var tr = new u16(maxSym + 1);
    // max bits in tree
    var mbt = ln(t[i1 - 1], tr, 0);
    if (mbt > mb) {
        // more algorithms from UZIP.js
        // TODO: find out how this code works (debt)
        //  ind    debt
        var i = 0, dt = 0;
        //    left            cost
        var lft = mbt - mb, cst = 1 << lft;
        t2.sort(function (a, b) { return tr[b.s] - tr[a.s] || a.f - b.f; });
        for (; i < s; ++i) {
            var i2_1 = t2[i].s;
            if (tr[i2_1] > mb) {
                dt += cst - (1 << (mbt - tr[i2_1]));
                tr[i2_1] = mb;
            }
            else
                break;
        }
        dt >>>= lft;
        while (dt > 0) {
            var i2_2 = t2[i].s;
            if (tr[i2_2] < mb)
                dt -= 1 << (mb - tr[i2_2]++ - 1);
            else
                ++i;
        }
        for (; i >= 0 && dt; --i) {
            var i2_3 = t2[i].s;
            if (tr[i2_3] == mb) {
                --tr[i2_3];
                ++dt;
            }
        }
        mbt = mb;
    }
    return [new u8(tr), mbt];
};
// get the max length and assign length codes
var ln = function (n, l, d) {
    return n.s == -1
        ? Math.max(ln(n.l, l, d + 1), ln(n.r, l, d + 1))
        : (l[n.s] = d);
};
// length codes generation
var lc = function (c) {
    var s = c.length;
    // Note that the semicolon was intentional
    while (s && !c[--s])
        ;
    var cl = new u16(++s);
    //  ind      num         streak
    var cli = 0, cln = c[0], cls = 1;
    var w = function (v) { cl[cli++] = v; };
    for (var i = 1; i <= s; ++i) {
        if (c[i] == cln && i != s)
            ++cls;
        else {
            if (!cln && cls > 2) {
                for (; cls > 138; cls -= 138)
                    w(32754);
                if (cls > 2) {
                    w(cls > 10 ? ((cls - 11) << 5) | 28690 : ((cls - 3) << 5) | 12305);
                    cls = 0;
                }
            }
            else if (cls > 3) {
                w(cln), --cls;
                for (; cls > 6; cls -= 6)
                    w(8304);
                if (cls > 2)
                    w(((cls - 3) << 5) | 8208), cls = 0;
            }
            while (cls--)
                w(cln);
            cls = 1;
            cln = c[i];
        }
    }
    return [cl.subarray(0, cli), s];
};
// calculate the length of output from tree, code lengths
var clen = function (cf, cl) {
    var l = 0;
    for (var i = 0; i < cl.length; ++i)
        l += cf[i] * cl[i];
    return l;
};
// writes a fixed block
// returns the new bit pos
var wfblk = function (out, pos, dat) {
    // no need to write 00 as type: TypedArray defaults to 0
    var s = dat.length;
    var o = shft(pos + 2);
    out[o] = s & 255;
    out[o + 1] = s >>> 8;
    out[o + 2] = out[o] ^ 255;
    out[o + 3] = out[o + 1] ^ 255;
    for (var i = 0; i < s; ++i)
        out[o + i + 4] = dat[i];
    return (o + 4 + s) * 8;
};
// writes a block
var wblk = function (dat, out, final, syms, lf, df, eb, li, bs, bl, p) {
    wbits(out, p++, final);
    ++lf[256];
    var _a = hTree(lf, 15), dlt = _a[0], mlb = _a[1];
    var _b = hTree(df, 15), ddt = _b[0], mdb = _b[1];
    var _c = lc(dlt), lclt = _c[0], nlc = _c[1];
    var _d = lc(ddt), lcdt = _d[0], ndc = _d[1];
    var lcfreq = new u16(19);
    for (var i = 0; i < lclt.length; ++i)
        lcfreq[lclt[i] & 31]++;
    for (var i = 0; i < lcdt.length; ++i)
        lcfreq[lcdt[i] & 31]++;
    var _e = hTree(lcfreq, 7), lct = _e[0], mlcb = _e[1];
    var nlcc = 19;
    for (; nlcc > 4 && !lct[clim[nlcc - 1]]; --nlcc)
        ;
    var flen = (bl + 5) << 3;
    var ftlen = clen(lf, flt) + clen(df, fdt) + eb;
    var dtlen = clen(lf, dlt) + clen(df, ddt) + eb + 14 + 3 * nlcc + clen(lcfreq, lct) + (2 * lcfreq[16] + 3 * lcfreq[17] + 7 * lcfreq[18]);
    if (flen <= ftlen && flen <= dtlen)
        return wfblk(out, p, dat.subarray(bs, bs + bl));
    var lm, ll, dm, dl;
    wbits(out, p, 1 + (dtlen < ftlen)), p += 2;
    if (dtlen < ftlen) {
        lm = hMap(dlt, mlb, 0), ll = dlt, dm = hMap(ddt, mdb, 0), dl = ddt;
        var llm = hMap(lct, mlcb, 0);
        wbits(out, p, nlc - 257);
        wbits(out, p + 5, ndc - 1);
        wbits(out, p + 10, nlcc - 4);
        p += 14;
        for (var i = 0; i < nlcc; ++i)
            wbits(out, p + 3 * i, lct[clim[i]]);
        p += 3 * nlcc;
        var lcts = [lclt, lcdt];
        for (var it = 0; it < 2; ++it) {
            var clct = lcts[it];
            for (var i = 0; i < clct.length; ++i) {
                var len = clct[i] & 31;
                wbits(out, p, llm[len]), p += lct[len];
                if (len > 15)
                    wbits(out, p, (clct[i] >>> 5) & 127), p += clct[i] >>> 12;
            }
        }
    }
    else {
        lm = flm, ll = flt, dm = fdm, dl = fdt;
    }
    for (var i = 0; i < li; ++i) {
        if (syms[i] > 255) {
            var len = (syms[i] >>> 18) & 31;
            wbits16(out, p, lm[len + 257]), p += ll[len + 257];
            if (len > 7)
                wbits(out, p, (syms[i] >>> 23) & 31), p += fleb[len];
            var dst = syms[i] & 31;
            wbits16(out, p, dm[dst]), p += dl[dst];
            if (dst > 3)
                wbits16(out, p, (syms[i] >>> 5) & 8191), p += fdeb[dst];
        }
        else {
            wbits16(out, p, lm[syms[i]]), p += ll[syms[i]];
        }
    }
    wbits16(out, p, lm[256]);
    return p + ll[256];
};
// deflate options (nice << 13) | chain
var deo = /*#__PURE__*/ new u32([65540, 131080, 131088, 131104, 262176, 1048704, 1048832, 2114560, 2117632]);
// empty
var et = /*#__PURE__*/ new u8(0);
// compresses data into a raw DEFLATE buffer
var dflt = function (dat, lvl, plvl, pre, post, lst) {
    var s = dat.length;
    var o = new u8(pre + s + 5 * (1 + Math.ceil(s / 7000)) + post);
    // writing to this writes to the output buffer
    var w = o.subarray(pre, o.length - post);
    var pos = 0;
    if (!lvl || s < 8) {
        for (var i = 0; i <= s; i += 65535) {
            // end
            var e = i + 65535;
            if (e >= s) {
                // write final block
                w[pos >> 3] = lst;
            }
            pos = wfblk(w, pos + 1, dat.subarray(i, e));
        }
    }
    else {
        var opt = deo[lvl - 1];
        var n = opt >>> 13, c = opt & 8191;
        var msk_1 = (1 << plvl) - 1;
        //    prev 2-byte val map    curr 2-byte val map
        var prev = new u16(32768), head = new u16(msk_1 + 1);
        var bs1_1 = Math.ceil(plvl / 3), bs2_1 = 2 * bs1_1;
        var hsh = function (i) { return (dat[i] ^ (dat[i + 1] << bs1_1) ^ (dat[i + 2] << bs2_1)) & msk_1; };
        // 24576 is an arbitrary number of maximum symbols per block
        // 424 buffer for last block
        var syms = new u32(25000);
        // length/literal freq   distance freq
        var lf = new u16(288), df = new u16(32);
        //  l/lcnt  exbits  index  l/lind  waitdx  bitpos
        var lc_1 = 0, eb = 0, i = 0, li = 0, wi = 0, bs = 0;
        for (; i < s; ++i) {
            // hash value
            // deopt when i > s - 3 - at end, deopt acceptable
            var hv = hsh(i);
            // index mod 32768    previous index mod
            var imod = i & 32767, pimod = head[hv];
            prev[imod] = pimod;
            head[hv] = imod;
            // We always should modify head and prev, but only add symbols if
            // this data is not yet processed ("wait" for wait index)
            if (wi <= i) {
                // bytes remaining
                var rem = s - i;
                if ((lc_1 > 7000 || li > 24576) && rem > 423) {
                    pos = wblk(dat, w, 0, syms, lf, df, eb, li, bs, i - bs, pos);
                    li = lc_1 = eb = 0, bs = i;
                    for (var j = 0; j < 286; ++j)
                        lf[j] = 0;
                    for (var j = 0; j < 30; ++j)
                        df[j] = 0;
                }
                //  len    dist   chain
                var l = 2, d = 0, ch_1 = c, dif = (imod - pimod) & 32767;
                if (rem > 2 && hv == hsh(i - dif)) {
                    var maxn = Math.min(n, rem) - 1;
                    var maxd = Math.min(32767, i);
                    // max possible length
                    // not capped at dif because decompressors implement "rolling" index population
                    var ml = Math.min(258, rem);
                    while (dif <= maxd && --ch_1 && imod != pimod) {
                        if (dat[i + l] == dat[i + l - dif]) {
                            var nl = 0;
                            for (; nl < ml && dat[i + nl] == dat[i + nl - dif]; ++nl)
                                ;
                            if (nl > l) {
                                l = nl, d = dif;
                                // break out early when we reach "nice" (we are satisfied enough)
                                if (nl > maxn)
                                    break;
                                // now, find the rarest 2-byte sequence within this
                                // length of literals and search for that instead.
                                // Much faster than just using the start
                                var mmd = Math.min(dif, nl - 2);
                                var md = 0;
                                for (var j = 0; j < mmd; ++j) {
                                    var ti = (i - dif + j + 32768) & 32767;
                                    var pti = prev[ti];
                                    var cd = (ti - pti + 32768) & 32767;
                                    if (cd > md)
                                        md = cd, pimod = ti;
                                }
                            }
                        }
                        // check the previous match
                        imod = pimod, pimod = prev[imod];
                        dif += (imod - pimod + 32768) & 32767;
                    }
                }
                // d will be nonzero only when a match was found
                if (d) {
                    // store both dist and len data in one Uint32
                    // Make sure this is recognized as a len/dist with 28th bit (2^28)
                    syms[li++] = 268435456 | (revfl[l] << 18) | revfd[d];
                    var lin = revfl[l] & 31, din = revfd[d] & 31;
                    eb += fleb[lin] + fdeb[din];
                    ++lf[257 + lin];
                    ++df[din];
                    wi = i + l;
                    ++lc_1;
                }
                else {
                    syms[li++] = dat[i];
                    ++lf[dat[i]];
                }
            }
        }
        pos = wblk(dat, w, lst, syms, lf, df, eb, li, bs, i - bs, pos);
        // this is the easiest way to avoid needing to maintain state
        if (!lst && pos & 7)
            pos = wfblk(w, pos + 1, et);
    }
    return slc(o, 0, pre + shft(pos) + post);
};
// CRC32 table
var crct = /*#__PURE__*/ (function () {
    var t = new Int32Array(256);
    for (var i = 0; i < 256; ++i) {
        var c = i, k = 9;
        while (--k)
            c = ((c & 1) && -306674912) ^ (c >>> 1);
        t[i] = c;
    }
    return t;
})();
// CRC32
var crc = function () {
    var c = -1;
    return {
        p: function (d) {
            // closures have awful performance
            var cr = c;
            for (var i = 0; i < d.length; ++i)
                cr = crct[(cr & 255) ^ d[i]] ^ (cr >>> 8);
            c = cr;
        },
        d: function () { return ~c; }
    };
};
// Alder32
var adler = function () {
    var a = 1, b = 0;
    return {
        p: function (d) {
            // closures have awful performance
            var n = a, m = b;
            var l = d.length | 0;
            for (var i = 0; i != l;) {
                var e = Math.min(i + 2655, l);
                for (; i < e; ++i)
                    m += n += d[i];
                n = (n & 65535) + 15 * (n >> 16), m = (m & 65535) + 15 * (m >> 16);
            }
            a = n, b = m;
        },
        d: function () {
            a %= 65521, b %= 65521;
            return (a & 255) << 24 | (a >>> 8) << 16 | (b & 255) << 8 | (b >>> 8);
        }
    };
};
;
// deflate with opts
var dopt = function (dat, opt, pre, post, st) {
    return dflt(dat, opt.level == null ? 6 : opt.level, opt.mem == null ? Math.ceil(Math.max(8, Math.min(13, Math.log(dat.length))) * 1.5) : (12 + opt.mem), pre, post, !st);
};
// Walmart object spread
var mrg = function (a, b) {
    var o = {};
    for (var k in a)
        o[k] = a[k];
    for (var k in b)
        o[k] = b[k];
    return o;
};
// worker clone
// This is possibly the craziest part of the entire codebase, despite how simple it may seem.
// The only parameter to this function is a closure that returns an array of variables outside of the function scope.
// We're going to try to figure out the variable names used in the closure as strings because that is crucial for workerization.
// We will return an object mapping of true variable name to value (basically, the current scope as a JS object).
// The reason we can't just use the original variable names is minifiers mangling the toplevel scope.
// This took me three weeks to figure out how to do.
var wcln = function (fn, fnStr, td) {
    var dt = fn();
    var st = fn.toString();
    var ks = st.slice(st.indexOf('[') + 1, st.lastIndexOf(']')).replace(/\s+/g, '').split(',');
    for (var i = 0; i < dt.length; ++i) {
        var v = dt[i], k = ks[i];
        if (typeof v == 'function') {
            fnStr += ';' + k + '=';
            var st_1 = v.toString();
            if (v.prototype) {
                // for global objects
                if (st_1.indexOf('[native code]') != -1) {
                    var spInd = st_1.indexOf(' ', 8) + 1;
                    fnStr += st_1.slice(spInd, st_1.indexOf('(', spInd));
                }
                else {
                    fnStr += st_1;
                    for (var t in v.prototype)
                        fnStr += ';' + k + '.prototype.' + t + '=' + v.prototype[t].toString();
                }
            }
            else
                fnStr += st_1;
        }
        else
            td[k] = v;
    }
    return [fnStr, td];
};
var ch = [];
// clone bufs
var cbfs = function (v) {
    var tl = [];
    for (var k in v) {
        if (v[k].buffer) {
            tl.push((v[k] = new v[k].constructor(v[k])).buffer);
        }
    }
    return tl;
};
// use a worker to execute code
var wrkr = function (fns, init, id, cb) {
    var _a;
    if (!ch[id]) {
        var fnStr = '', td_1 = {}, m = fns.length - 1;
        for (var i = 0; i < m; ++i)
            _a = wcln(fns[i], fnStr, td_1), fnStr = _a[0], td_1 = _a[1];
        ch[id] = wcln(fns[m], fnStr, td_1);
    }
    var td = mrg({}, ch[id][1]);
    return wk(ch[id][0] + ';onmessage=function(e){for(var k in e.data)self[k]=e.data[k];onmessage=' + init.toString() + '}', id, td, cbfs(td), cb);
};
// base async inflate fn
var bInflt = function () { return [u8, u16, u32, fleb, fdeb, clim, fl, fd, flrm, fdrm, rev, ec, hMap, max, bits, bits16, shft, slc, err, inflt, inflateSync, pbf, gu8]; };
var bDflt = function () { return [u8, u16, u32, fleb, fdeb, clim, revfl, revfd, flm, flt, fdm, fdt, rev, deo, et, hMap, wbits, wbits16, hTree, ln, lc, clen, wfblk, wblk, shft, slc, dflt, dopt, deflateSync, pbf]; };
// gzip extra
var gze = function () { return [gzh, gzhl, wbytes, crc, crct]; };
// gunzip extra
var guze = function () { return [gzs, gzl]; };
// zlib extra
var zle = function () { return [zlh, wbytes, adler]; };
// unzlib extra
var zule = function () { return [zlv]; };
// post buf
var pbf = function (msg) { return postMessage(msg, [msg.buffer]); };
// get u8
var gu8 = function (o) { return o && o.size && new u8(o.size); };
// async helper
var cbify = function (dat, opts, fns, init, id, cb) {
    var w = wrkr(fns, init, id, function (err, dat) {
        w.terminate();
        cb(err, dat);
    });
    w.postMessage([dat, opts], opts.consume ? [dat.buffer] : []);
    return function () { w.terminate(); };
};
// auto stream
var astrm = function (strm) {
    strm.ondata = function (dat, final) { return postMessage([dat, final], [dat.buffer]); };
    return function (ev) { return strm.push(ev.data[0], ev.data[1]); };
};
// async stream attach
var astrmify = function (fns, strm, opts, init, id) {
    var t;
    var w = wrkr(fns, init, id, function (err, dat) {
        if (err)
            w.terminate(), strm.ondata.call(strm, err);
        else {
            if (dat[1])
                w.terminate();
            strm.ondata.call(strm, err, dat[0], dat[1]);
        }
    });
    w.postMessage(opts);
    strm.push = function (d, f) {
        if (!strm.ondata)
            err(5);
        if (t)
            strm.ondata(err(4, 0, 1), null, !!f);
        w.postMessage([d, t = f], [d.buffer]);
    };
    strm.terminate = function () { w.terminate(); };
};
// read 2 bytes
var b2 = function (d, b) { return d[b] | (d[b + 1] << 8); };
// read 4 bytes
var b4 = function (d, b) { return (d[b] | (d[b + 1] << 8) | (d[b + 2] << 16) | (d[b + 3] << 24)) >>> 0; };
var b8 = function (d, b) { return b4(d, b) + (b4(d, b + 4) * 4294967296); };
// write bytes
var wbytes = function (d, b, v) {
    for (; v; ++b)
        d[b] = v, v >>>= 8;
};
// gzip header
var gzh = function (c, o) {
    var fn = o.filename;
    c[0] = 31, c[1] = 139, c[2] = 8, c[8] = o.level < 2 ? 4 : o.level == 9 ? 2 : 0, c[9] = 3; // assume Unix
    if (o.mtime != 0)
        wbytes(c, 4, Math.floor(new Date(o.mtime || Date.now()) / 1000));
    if (fn) {
        c[3] = 8;
        for (var i = 0; i <= fn.length; ++i)
            c[i + 10] = fn.charCodeAt(i);
    }
};
// gzip footer: -8 to -4 = CRC, -4 to -0 is length
// gzip start
var gzs = function (d) {
    if (d[0] != 31 || d[1] != 139 || d[2] != 8)
        err(6, 'invalid gzip data');
    var flg = d[3];
    var st = 10;
    if (flg & 4)
        st += d[10] | (d[11] << 8) + 2;
    for (var zs = (flg >> 3 & 1) + (flg >> 4 & 1); zs > 0; zs -= !d[st++])
        ;
    return st + (flg & 2);
};
// gzip length
var gzl = function (d) {
    var l = d.length;
    return ((d[l - 4] | d[l - 3] << 8 | d[l - 2] << 16) | (d[l - 1] << 24)) >>> 0;
};
// gzip header length
var gzhl = function (o) { return 10 + ((o.filename && (o.filename.length + 1)) || 0); };
// zlib header
var zlh = function (c, o) {
    var lv = o.level, fl = lv == 0 ? 0 : lv < 6 ? 1 : lv == 9 ? 3 : 2;
    c[0] = 120, c[1] = (fl << 6) | (fl ? (32 - 2 * fl) : 1);
};
// zlib valid
var zlv = function (d) {
    if ((d[0] & 15) != 8 || (d[0] >>> 4) > 7 || ((d[0] << 8 | d[1]) % 31))
        err(6, 'invalid zlib data');
    if (d[1] & 32)
        err(6, 'invalid zlib data: preset dictionaries not supported');
};
function AsyncCmpStrm(opts, cb) {
    if (!cb && typeof opts == 'function')
        cb = opts, opts = {};
    this.ondata = cb;
    return opts;
}
// zlib footer: -4 to -0 is Adler32
/**
 * Streaming DEFLATE compression
 */
var Deflate = /*#__PURE__*/ (function () {
    function Deflate(opts, cb) {
        if (!cb && typeof opts == 'function')
            cb = opts, opts = {};
        this.ondata = cb;
        this.o = opts || {};
    }
    Deflate.prototype.p = function (c, f) {
        this.ondata(dopt(c, this.o, 0, 0, !f), f);
    };
    /**
     * Pushes a chunk to be deflated
     * @param chunk The chunk to push
     * @param final Whether this is the last chunk
     */
    Deflate.prototype.push = function (chunk, final) {
        if (!this.ondata)
            err(5);
        if (this.d)
            err(4);
        this.d = final;
        this.p(chunk, final || false);
    };
    return Deflate;
}());

/**
 * Asynchronous streaming DEFLATE compression
 */
var AsyncDeflate = /*#__PURE__*/ (function () {
    function AsyncDeflate(opts, cb) {
        astrmify([
            bDflt,
            function () { return [astrm, Deflate]; }
        ], this, AsyncCmpStrm.call(this, opts, cb), function (ev) {
            var strm = new Deflate(ev.data);
            onmessage = astrm(strm);
        }, 6);
    }
    return AsyncDeflate;
}());

function deflate(data, opts, cb) {
    if (!cb)
        cb = opts, opts = {};
    if (typeof cb != 'function')
        err(7);
    return cbify(data, opts, [
        bDflt,
    ], function (ev) { return pbf(deflateSync(ev.data[0], ev.data[1])); }, 0, cb);
}
/**
 * Compresses data with DEFLATE without any wrapper
 * @param data The data to compress
 * @param opts The compression options
 * @returns The deflated version of the data
 */
function deflateSync(data, opts) {
    return dopt(data, opts || {}, 0, 0);
}
/**
 * Streaming DEFLATE decompression
 */
var Inflate = /*#__PURE__*/ (function () {
    /**
     * Creates an inflation stream
     * @param cb The callback to call whenever data is inflated
     */
    function Inflate(cb) {
        this.s = {};
        this.p = new u8(0);
        this.ondata = cb;
    }
    Inflate.prototype.e = function (c) {
        if (!this.ondata)
            err(5);
        if (this.d)
            err(4);
        var l = this.p.length;
        var n = new u8(l + c.length);
        n.set(this.p), n.set(c, l), this.p = n;
    };
    Inflate.prototype.c = function (final) {
        this.d = this.s.i = final || false;
        var bts = this.s.b;
        var dt = inflt(this.p, this.o, this.s);
        this.ondata(slc(dt, bts, this.s.b), this.d);
        this.o = slc(dt, this.s.b - 32768), this.s.b = this.o.length;
        this.p = slc(this.p, (this.s.p / 8) | 0), this.s.p &= 7;
    };
    /**
     * Pushes a chunk to be inflated
     * @param chunk The chunk to push
     * @param final Whether this is the final chunk
     */
    Inflate.prototype.push = function (chunk, final) {
        this.e(chunk), this.c(final);
    };
    return Inflate;
}());

/**
 * Asynchronous streaming DEFLATE decompression
 */
var AsyncInflate = /*#__PURE__*/ (function () {
    /**
     * Creates an asynchronous inflation stream
     * @param cb The callback to call whenever data is deflated
     */
    function AsyncInflate(cb) {
        this.ondata = cb;
        astrmify([
            bInflt,
            function () { return [astrm, Inflate]; }
        ], this, 0, function () {
            var strm = new Inflate();
            onmessage = astrm(strm);
        }, 7);
    }
    return AsyncInflate;
}());

function inflate(data, opts, cb) {
    if (!cb)
        cb = opts, opts = {};
    if (typeof cb != 'function')
        err(7);
    return cbify(data, opts, [
        bInflt
    ], function (ev) { return pbf(inflateSync(ev.data[0], gu8(ev.data[1]))); }, 1, cb);
}
/**
 * Expands DEFLATE data with no wrapper
 * @param data The data to decompress
 * @param out Where to write the data. Saves memory if you know the decompressed size and provide an output buffer of that length.
 * @returns The decompressed version of the data
 */
function inflateSync(data, out) {
    return inflt(data, out);
}
// before you yell at me for not just using extends, my reason is that TS inheritance is hard to workerize.
/**
 * Streaming GZIP compression
 */
var Gzip = /*#__PURE__*/ (function () {
    function Gzip(opts, cb) {
        this.c = crc();
        this.l = 0;
        this.v = 1;
        Deflate.call(this, opts, cb);
    }
    /**
     * Pushes a chunk to be GZIPped
     * @param chunk The chunk to push
     * @param final Whether this is the last chunk
     */
    Gzip.prototype.push = function (chunk, final) {
        Deflate.prototype.push.call(this, chunk, final);
    };
    Gzip.prototype.p = function (c, f) {
        this.c.p(c);
        this.l += c.length;
        var raw = dopt(c, this.o, this.v && gzhl(this.o), f && 8, !f);
        if (this.v)
            gzh(raw, this.o), this.v = 0;
        if (f)
            wbytes(raw, raw.length - 8, this.c.d()), wbytes(raw, raw.length - 4, this.l);
        this.ondata(raw, f);
    };
    return Gzip;
}());

/**
 * Asynchronous streaming GZIP compression
 */
var AsyncGzip = /*#__PURE__*/ (function () {
    function AsyncGzip(opts, cb) {
        astrmify([
            bDflt,
            gze,
            function () { return [astrm, Deflate, Gzip]; }
        ], this, AsyncCmpStrm.call(this, opts, cb), function (ev) {
            var strm = new Gzip(ev.data);
            onmessage = astrm(strm);
        }, 8);
    }
    return AsyncGzip;
}());

function gzip(data, opts, cb) {
    if (!cb)
        cb = opts, opts = {};
    if (typeof cb != 'function')
        err(7);
    return cbify(data, opts, [
        bDflt,
        gze,
        function () { return [gzipSync]; }
    ], function (ev) { return pbf(gzipSync(ev.data[0], ev.data[1])); }, 2, cb);
}
/**
 * Compresses data with GZIP
 * @param data The data to compress
 * @param opts The compression options
 * @returns The gzipped version of the data
 */
function gzipSync(data, opts) {
    if (!opts)
        opts = {};
    var c = crc(), l = data.length;
    c.p(data);
    var d = dopt(data, opts, gzhl(opts), 8), s = d.length;
    return gzh(d, opts), wbytes(d, s - 8, c.d()), wbytes(d, s - 4, l), d;
}
/**
 * Streaming GZIP decompression
 */
var Gunzip = /*#__PURE__*/ (function () {
    /**
     * Creates a GUNZIP stream
     * @param cb The callback to call whenever data is inflated
     */
    function Gunzip(cb) {
        this.v = 1;
        Inflate.call(this, cb);
    }
    /**
     * Pushes a chunk to be GUNZIPped
     * @param chunk The chunk to push
     * @param final Whether this is the last chunk
     */
    Gunzip.prototype.push = function (chunk, final) {
        Inflate.prototype.e.call(this, chunk);
        if (this.v) {
            var s = this.p.length > 3 ? gzs(this.p) : 4;
            if (s >= this.p.length && !final)
                return;
            this.p = this.p.subarray(s), this.v = 0;
        }
        if (final) {
            if (this.p.length < 8)
                err(6, 'invalid gzip data');
            this.p = this.p.subarray(0, -8);
        }
        // necessary to prevent TS from using the closure value
        // This allows for workerization to function correctly
        Inflate.prototype.c.call(this, final);
    };
    return Gunzip;
}());

/**
 * Asynchronous streaming GZIP decompression
 */
var AsyncGunzip = /*#__PURE__*/ (function () {
    /**
     * Creates an asynchronous GUNZIP stream
     * @param cb The callback to call whenever data is deflated
     */
    function AsyncGunzip(cb) {
        this.ondata = cb;
        astrmify([
            bInflt,
            guze,
            function () { return [astrm, Inflate, Gunzip]; }
        ], this, 0, function () {
            var strm = new Gunzip();
            onmessage = astrm(strm);
        }, 9);
    }
    return AsyncGunzip;
}());

function gunzip(data, opts, cb) {
    if (!cb)
        cb = opts, opts = {};
    if (typeof cb != 'function')
        err(7);
    return cbify(data, opts, [
        bInflt,
        guze,
        function () { return [gunzipSync]; }
    ], function (ev) { return pbf(gunzipSync(ev.data[0])); }, 3, cb);
}
/**
 * Expands GZIP data
 * @param data The data to decompress
 * @param out Where to write the data. GZIP already encodes the output size, so providing this doesn't save memory.
 * @returns The decompressed version of the data
 */
function gunzipSync(data, out) {
    return inflt(data.subarray(gzs(data), -8), out || new u8(gzl(data)));
}
/**
 * Streaming Zlib compression
 */
var Zlib = /*#__PURE__*/ (function () {
    function Zlib(opts, cb) {
        this.c = adler();
        this.v = 1;
        Deflate.call(this, opts, cb);
    }
    /**
     * Pushes a chunk to be zlibbed
     * @param chunk The chunk to push
     * @param final Whether this is the last chunk
     */
    Zlib.prototype.push = function (chunk, final) {
        Deflate.prototype.push.call(this, chunk, final);
    };
    Zlib.prototype.p = function (c, f) {
        this.c.p(c);
        var raw = dopt(c, this.o, this.v && 2, f && 4, !f);
        if (this.v)
            zlh(raw, this.o), this.v = 0;
        if (f)
            wbytes(raw, raw.length - 4, this.c.d());
        this.ondata(raw, f);
    };
    return Zlib;
}());

/**
 * Asynchronous streaming Zlib compression
 */
var AsyncZlib = /*#__PURE__*/ (function () {
    function AsyncZlib(opts, cb) {
        astrmify([
            bDflt,
            zle,
            function () { return [astrm, Deflate, Zlib]; }
        ], this, AsyncCmpStrm.call(this, opts, cb), function (ev) {
            var strm = new Zlib(ev.data);
            onmessage = astrm(strm);
        }, 10);
    }
    return AsyncZlib;
}());

function zlib(data, opts, cb) {
    if (!cb)
        cb = opts, opts = {};
    if (typeof cb != 'function')
        err(7);
    return cbify(data, opts, [
        bDflt,
        zle,
        function () { return [zlibSync]; }
    ], function (ev) { return pbf(zlibSync(ev.data[0], ev.data[1])); }, 4, cb);
}
/**
 * Compress data with Zlib
 * @param data The data to compress
 * @param opts The compression options
 * @returns The zlib-compressed version of the data
 */
function zlibSync(data, opts) {
    if (!opts)
        opts = {};
    var a = adler();
    a.p(data);
    var d = dopt(data, opts, 2, 4);
    return zlh(d, opts), wbytes(d, d.length - 4, a.d()), d;
}
/**
 * Streaming Zlib decompression
 */
var Unzlib = /*#__PURE__*/ (function () {
    /**
     * Creates a Zlib decompression stream
     * @param cb The callback to call whenever data is inflated
     */
    function Unzlib(cb) {
        this.v = 1;
        Inflate.call(this, cb);
    }
    /**
     * Pushes a chunk to be unzlibbed
     * @param chunk The chunk to push
     * @param final Whether this is the last chunk
     */
    Unzlib.prototype.push = function (chunk, final) {
        Inflate.prototype.e.call(this, chunk);
        if (this.v) {
            if (this.p.length < 2 && !final)
                return;
            this.p = this.p.subarray(2), this.v = 0;
        }
        if (final) {
            if (this.p.length < 4)
                err(6, 'invalid zlib data');
            this.p = this.p.subarray(0, -4);
        }
        // necessary to prevent TS from using the closure value
        // This allows for workerization to function correctly
        Inflate.prototype.c.call(this, final);
    };
    return Unzlib;
}());

/**
 * Asynchronous streaming Zlib decompression
 */
var AsyncUnzlib = /*#__PURE__*/ (function () {
    /**
     * Creates an asynchronous Zlib decompression stream
     * @param cb The callback to call whenever data is deflated
     */
    function AsyncUnzlib(cb) {
        this.ondata = cb;
        astrmify([
            bInflt,
            zule,
            function () { return [astrm, Inflate, Unzlib]; }
        ], this, 0, function () {
            var strm = new Unzlib();
            onmessage = astrm(strm);
        }, 11);
    }
    return AsyncUnzlib;
}());

function unzlib(data, opts, cb) {
    if (!cb)
        cb = opts, opts = {};
    if (typeof cb != 'function')
        err(7);
    return cbify(data, opts, [
        bInflt,
        zule,
        function () { return [unzlibSync]; }
    ], function (ev) { return pbf(unzlibSync(ev.data[0], gu8(ev.data[1]))); }, 5, cb);
}
/**
 * Expands Zlib data
 * @param data The data to decompress
 * @param out Where to write the data. Saves memory if you know the decompressed size and provide an output buffer of that length.
 * @returns The decompressed version of the data
 */
function unzlibSync(data, out) {
    return inflt((zlv(data), data.subarray(2, -4)), out);
}
// Default algorithm for compression (used because having a known output size allows faster decompression)

// Default algorithm for compression (used because having a known output size allows faster decompression)

/**
 * Streaming GZIP, Zlib, or raw DEFLATE decompression
 */
var Decompress = /*#__PURE__*/ (function () {
    /**
     * Creates a decompression stream
     * @param cb The callback to call whenever data is decompressed
     */
    function Decompress(cb) {
        this.G = Gunzip;
        this.I = Inflate;
        this.Z = Unzlib;
        this.ondata = cb;
    }
    /**
     * Pushes a chunk to be decompressed
     * @param chunk The chunk to push
     * @param final Whether this is the last chunk
     */
    Decompress.prototype.push = function (chunk, final) {
        if (!this.ondata)
            err(5);
        if (!this.s) {
            if (this.p && this.p.length) {
                var n = new u8(this.p.length + chunk.length);
                n.set(this.p), n.set(chunk, this.p.length);
            }
            else
                this.p = chunk;
            if (this.p.length > 2) {
                var _this_1 = this;
                var cb = function () { _this_1.ondata.apply(_this_1, arguments); };
                this.s = (this.p[0] == 31 && this.p[1] == 139 && this.p[2] == 8)
                    ? new this.G(cb)
                    : ((this.p[0] & 15) != 8 || (this.p[0] >> 4) > 7 || ((this.p[0] << 8 | this.p[1]) % 31))
                        ? new this.I(cb)
                        : new this.Z(cb);
                this.s.push(this.p, final);
                this.p = null;
            }
        }
        else
            this.s.push(chunk, final);
    };
    return Decompress;
}());

/**
 * Asynchronous streaming GZIP, Zlib, or raw DEFLATE decompression
 */
var AsyncDecompress = /*#__PURE__*/ (function () {
    /**
   * Creates an asynchronous decompression stream
   * @param cb The callback to call whenever data is decompressed
   */
    function AsyncDecompress(cb) {
        this.G = AsyncGunzip;
        this.I = AsyncInflate;
        this.Z = AsyncUnzlib;
        this.ondata = cb;
    }
    /**
     * Pushes a chunk to be decompressed
     * @param chunk The chunk to push
     * @param final Whether this is the last chunk
     */
    AsyncDecompress.prototype.push = function (chunk, final) {
        Decompress.prototype.push.call(this, chunk, final);
    };
    return AsyncDecompress;
}());

function decompress(data, opts, cb) {
    if (!cb)
        cb = opts, opts = {};
    if (typeof cb != 'function')
        err(7);
    return (data[0] == 31 && data[1] == 139 && data[2] == 8)
        ? gunzip(data, opts, cb)
        : ((data[0] & 15) != 8 || (data[0] >> 4) > 7 || ((data[0] << 8 | data[1]) % 31))
            ? inflate(data, opts, cb)
            : unzlib(data, opts, cb);
}
/**
 * Expands compressed GZIP, Zlib, or raw DEFLATE data, automatically detecting the format
 * @param data The data to decompress
 * @param out Where to write the data. Saves memory if you know the decompressed size and provide an output buffer of that length.
 * @returns The decompressed version of the data
 */
function decompressSync(data, out) {
    return (data[0] == 31 && data[1] == 139 && data[2] == 8)
        ? gunzipSync(data, out)
        : ((data[0] & 15) != 8 || (data[0] >> 4) > 7 || ((data[0] << 8 | data[1]) % 31))
            ? inflateSync(data, out)
            : unzlibSync(data, out);
}
// flatten a directory structure
var fltn = function (d, p, t, o) {
    for (var k in d) {
        var val = d[k], n = p + k, op = o;
        if (Array.isArray(val))
            op = mrg(o, val[1]), val = val[0];
        if (val instanceof u8)
            t[n] = [val, op];
        else {
            t[n += '/'] = [new u8(0), op];
            fltn(val, n, t, o);
        }
    }
};
// text encoder
var te = typeof TextEncoder != 'undefined' && /*#__PURE__*/ new TextEncoder();
// text decoder
var td = typeof TextDecoder != 'undefined' && /*#__PURE__*/ new TextDecoder();
// text decoder stream
var tds = 0;
try {
    td.decode(et, { stream: true });
    tds = 1;
}
catch (e) { }
// decode UTF8
var dutf8 = function (d) {
    for (var r = '', i = 0;;) {
        var c = d[i++];
        var eb = (c > 127) + (c > 223) + (c > 239);
        if (i + eb > d.length)
            return [r, slc(d, i - 1)];
        if (!eb)
            r += String.fromCharCode(c);
        else if (eb == 3) {
            c = ((c & 15) << 18 | (d[i++] & 63) << 12 | (d[i++] & 63) << 6 | (d[i++] & 63)) - 65536,
                r += String.fromCharCode(55296 | (c >> 10), 56320 | (c & 1023));
        }
        else if (eb & 1)
            r += String.fromCharCode((c & 31) << 6 | (d[i++] & 63));
        else
            r += String.fromCharCode((c & 15) << 12 | (d[i++] & 63) << 6 | (d[i++] & 63));
    }
};
/**
 * Streaming UTF-8 decoding
 */
var DecodeUTF8 = /*#__PURE__*/ (function () {
    /**
     * Creates a UTF-8 decoding stream
     * @param cb The callback to call whenever data is decoded
     */
    function DecodeUTF8(cb) {
        this.ondata = cb;
        if (tds)
            this.t = new TextDecoder();
        else
            this.p = et;
    }
    /**
     * Pushes a chunk to be decoded from UTF-8 binary
     * @param chunk The chunk to push
     * @param final Whether this is the last chunk
     */
    DecodeUTF8.prototype.push = function (chunk, final) {
        if (!this.ondata)
            err(5);
        final = !!final;
        if (this.t) {
            this.ondata(this.t.decode(chunk, { stream: true }), final);
            if (final) {
                if (this.t.decode().length)
                    err(8);
                this.t = null;
            }
            return;
        }
        if (!this.p)
            err(4);
        var dat = new u8(this.p.length + chunk.length);
        dat.set(this.p);
        dat.set(chunk, this.p.length);
        var _a = dutf8(dat), ch = _a[0], np = _a[1];
        if (final) {
            if (np.length)
                err(8);
            this.p = null;
        }
        else
            this.p = np;
        this.ondata(ch, final);
    };
    return DecodeUTF8;
}());

/**
 * Streaming UTF-8 encoding
 */
var EncodeUTF8 = /*#__PURE__*/ (function () {
    /**
     * Creates a UTF-8 decoding stream
     * @param cb The callback to call whenever data is encoded
     */
    function EncodeUTF8(cb) {
        this.ondata = cb;
    }
    /**
     * Pushes a chunk to be encoded to UTF-8
     * @param chunk The string data to push
     * @param final Whether this is the last chunk
     */
    EncodeUTF8.prototype.push = function (chunk, final) {
        if (!this.ondata)
            err(5);
        if (this.d)
            err(4);
        this.ondata(strToU8(chunk), this.d = final || false);
    };
    return EncodeUTF8;
}());

/**
 * Converts a string into a Uint8Array for use with compression/decompression methods
 * @param str The string to encode
 * @param latin1 Whether or not to interpret the data as Latin-1. This should
 *               not need to be true unless decoding a binary string.
 * @returns The string encoded in UTF-8/Latin-1 binary
 */
function strToU8(str, latin1) {
    if (latin1) {
        var ar_1 = new u8(str.length);
        for (var i = 0; i < str.length; ++i)
            ar_1[i] = str.charCodeAt(i);
        return ar_1;
    }
    if (te)
        return te.encode(str);
    var l = str.length;
    var ar = new u8(str.length + (str.length >> 1));
    var ai = 0;
    var w = function (v) { ar[ai++] = v; };
    for (var i = 0; i < l; ++i) {
        if (ai + 5 > ar.length) {
            var n = new u8(ai + 8 + ((l - i) << 1));
            n.set(ar);
            ar = n;
        }
        var c = str.charCodeAt(i);
        if (c < 128 || latin1)
            w(c);
        else if (c < 2048)
            w(192 | (c >> 6)), w(128 | (c & 63));
        else if (c > 55295 && c < 57344)
            c = 65536 + (c & 1023 << 10) | (str.charCodeAt(++i) & 1023),
                w(240 | (c >> 18)), w(128 | ((c >> 12) & 63)), w(128 | ((c >> 6) & 63)), w(128 | (c & 63));
        else
            w(224 | (c >> 12)), w(128 | ((c >> 6) & 63)), w(128 | (c & 63));
    }
    return slc(ar, 0, ai);
}
/**
 * Converts a Uint8Array to a string
 * @param dat The data to decode to string
 * @param latin1 Whether or not to interpret the data as Latin-1. This should
 *               not need to be true unless encoding to binary string.
 * @returns The original UTF-8/Latin-1 string
 */
function strFromU8(dat, latin1) {
    if (latin1) {
        var r = '';
        for (var i = 0; i < dat.length; i += 16384)
            r += String.fromCharCode.apply(null, dat.subarray(i, i + 16384));
        return r;
    }
    else if (td)
        return td.decode(dat);
    else {
        var _a = dutf8(dat), out = _a[0], ext = _a[1];
        if (ext.length)
            err(8);
        return out;
    }
}
;
// deflate bit flag
var dbf = function (l) { return l == 1 ? 3 : l < 6 ? 2 : l == 9 ? 1 : 0; };
// skip local zip header
var slzh = function (d, b) { return b + 30 + b2(d, b + 26) + b2(d, b + 28); };
// read zip header
var zh = function (d, b, z) {
    var fnl = b2(d, b + 28), fn = strFromU8(d.subarray(b + 46, b + 46 + fnl), !(b2(d, b + 8) & 2048)), es = b + 46 + fnl, bs = b4(d, b + 20);
    var _a = z && bs == 4294967295 ? z64e(d, es) : [bs, b4(d, b + 24), b4(d, b + 42)], sc = _a[0], su = _a[1], off = _a[2];
    return [b2(d, b + 10), sc, su, fn, es + b2(d, b + 30) + b2(d, b + 32), off];
};
// read zip64 extra field
var z64e = function (d, b) {
    for (; b2(d, b) != 1; b += 4 + b2(d, b + 2))
        ;
    return [b8(d, b + 12), b8(d, b + 4), b8(d, b + 20)];
};
// extra field length
var exfl = function (ex) {
    var le = 0;
    if (ex) {
        for (var k in ex) {
            var l = ex[k].length;
            if (l > 65535)
                err(9);
            le += l + 4;
        }
    }
    return le;
};
// write zip header
var wzh = function (d, b, f, fn, u, c, ce, co) {
    var fl = fn.length, ex = f.extra, col = co && co.length;
    var exl = exfl(ex);
    wbytes(d, b, ce != null ? 0x2014B50 : 0x4034B50), b += 4;
    if (ce != null)
        d[b++] = 20, d[b++] = f.os;
    d[b] = 20, b += 2; // spec compliance? what's that?
    d[b++] = (f.flag << 1) | (c < 0 && 8), d[b++] = u && 8;
    d[b++] = f.compression & 255, d[b++] = f.compression >> 8;
    var dt = new Date(f.mtime == null ? Date.now() : f.mtime), y = dt.getFullYear() - 1980;
    if (y < 0 || y > 119)
        err(10);
    wbytes(d, b, (y << 25) | ((dt.getMonth() + 1) << 21) | (dt.getDate() << 16) | (dt.getHours() << 11) | (dt.getMinutes() << 5) | (dt.getSeconds() >>> 1)), b += 4;
    if (c != -1) {
        wbytes(d, b, f.crc);
        wbytes(d, b + 4, c < 0 ? -c - 2 : c);
        wbytes(d, b + 8, f.size);
    }
    wbytes(d, b + 12, fl);
    wbytes(d, b + 14, exl), b += 16;
    if (ce != null) {
        wbytes(d, b, col);
        wbytes(d, b + 6, f.attrs);
        wbytes(d, b + 10, ce), b += 14;
    }
    d.set(fn, b);
    b += fl;
    if (exl) {
        for (var k in ex) {
            var exf = ex[k], l = exf.length;
            wbytes(d, b, +k);
            wbytes(d, b + 2, l);
            d.set(exf, b + 4), b += 4 + l;
        }
    }
    if (col)
        d.set(co, b), b += col;
    return b;
};
// write zip footer (end of central directory)
var wzf = function (o, b, c, d, e) {
    wbytes(o, b, 0x6054B50); // skip disk
    wbytes(o, b + 8, c);
    wbytes(o, b + 10, c);
    wbytes(o, b + 12, d);
    wbytes(o, b + 16, e);
};
/**
 * A pass-through stream to keep data uncompressed in a ZIP archive.
 */
var ZipPassThrough = /*#__PURE__*/ (function () {
    /**
     * Creates a pass-through stream that can be added to ZIP archives
     * @param filename The filename to associate with this data stream
     */
    function ZipPassThrough(filename) {
        this.filename = filename;
        this.c = crc();
        this.size = 0;
        this.compression = 0;
    }
    /**
     * Processes a chunk and pushes to the output stream. You can override this
     * method in a subclass for custom behavior, but by default this passes
     * the data through. You must call this.ondata(err, chunk, final) at some
     * point in this method.
     * @param chunk The chunk to process
     * @param final Whether this is the last chunk
     */
    ZipPassThrough.prototype.process = function (chunk, final) {
        this.ondata(null, chunk, final);
    };
    /**
     * Pushes a chunk to be added. If you are subclassing this with a custom
     * compression algorithm, note that you must push data from the source
     * file only, pre-compression.
     * @param chunk The chunk to push
     * @param final Whether this is the last chunk
     */
    ZipPassThrough.prototype.push = function (chunk, final) {
        if (!this.ondata)
            err(5);
        this.c.p(chunk);
        this.size += chunk.length;
        if (final)
            this.crc = this.c.d();
        this.process(chunk, final || false);
    };
    return ZipPassThrough;
}());

// I don't extend because TypeScript extension adds 1kB of runtime bloat
/**
 * Streaming DEFLATE compression for ZIP archives. Prefer using AsyncZipDeflate
 * for better performance
 */
var ZipDeflate = /*#__PURE__*/ (function () {
    /**
     * Creates a DEFLATE stream that can be added to ZIP archives
     * @param filename The filename to associate with this data stream
     * @param opts The compression options
     */
    function ZipDeflate(filename, opts) {
        var _this_1 = this;
        if (!opts)
            opts = {};
        ZipPassThrough.call(this, filename);
        this.d = new Deflate(opts, function (dat, final) {
            _this_1.ondata(null, dat, final);
        });
        this.compression = 8;
        this.flag = dbf(opts.level);
    }
    ZipDeflate.prototype.process = function (chunk, final) {
        try {
            this.d.push(chunk, final);
        }
        catch (e) {
            this.ondata(e, null, final);
        }
    };
    /**
     * Pushes a chunk to be deflated
     * @param chunk The chunk to push
     * @param final Whether this is the last chunk
     */
    ZipDeflate.prototype.push = function (chunk, final) {
        ZipPassThrough.prototype.push.call(this, chunk, final);
    };
    return ZipDeflate;
}());

/**
 * Asynchronous streaming DEFLATE compression for ZIP archives
 */
var AsyncZipDeflate = /*#__PURE__*/ (function () {
    /**
     * Creates a DEFLATE stream that can be added to ZIP archives
     * @param filename The filename to associate with this data stream
     * @param opts The compression options
     */
    function AsyncZipDeflate(filename, opts) {
        var _this_1 = this;
        if (!opts)
            opts = {};
        ZipPassThrough.call(this, filename);
        this.d = new AsyncDeflate(opts, function (err, dat, final) {
            _this_1.ondata(err, dat, final);
        });
        this.compression = 8;
        this.flag = dbf(opts.level);
        this.terminate = this.d.terminate;
    }
    AsyncZipDeflate.prototype.process = function (chunk, final) {
        this.d.push(chunk, final);
    };
    /**
     * Pushes a chunk to be deflated
     * @param chunk The chunk to push
     * @param final Whether this is the last chunk
     */
    AsyncZipDeflate.prototype.push = function (chunk, final) {
        ZipPassThrough.prototype.push.call(this, chunk, final);
    };
    return AsyncZipDeflate;
}());

// TODO: Better tree shaking
/**
 * A zippable archive to which files can incrementally be added
 */
var Zip = /*#__PURE__*/ (function () {
    /**
     * Creates an empty ZIP archive to which files can be added
     * @param cb The callback to call whenever data for the generated ZIP archive
     *           is available
     */
    function Zip(cb) {
        this.ondata = cb;
        this.u = [];
        this.d = 1;
    }
    /**
     * Adds a file to the ZIP archive
     * @param file The file stream to add
     */
    Zip.prototype.add = function (file) {
        var _this_1 = this;
        if (!this.ondata)
            err(5);
        // finishing or finished
        if (this.d & 2)
            this.ondata(err(4 + (this.d & 1) * 8, 0, 1), null, false);
        else {
            var f = strToU8(file.filename), fl_1 = f.length;
            var com = file.comment, o = com && strToU8(com);
            var u = fl_1 != file.filename.length || (o && (com.length != o.length));
            var hl_1 = fl_1 + exfl(file.extra) + 30;
            if (fl_1 > 65535)
                this.ondata(err(11, 0, 1), null, false);
            var header = new u8(hl_1);
            wzh(header, 0, file, f, u, -1);
            var chks_1 = [header];
            var pAll_1 = function () {
                for (var _i = 0, chks_2 = chks_1; _i < chks_2.length; _i++) {
                    var chk = chks_2[_i];
                    _this_1.ondata(null, chk, false);
                }
                chks_1 = [];
            };
            var tr_1 = this.d;
            this.d = 0;
            var ind_1 = this.u.length;
            var uf_1 = mrg(file, {
                f: f,
                u: u,
                o: o,
                t: function () {
                    if (file.terminate)
                        file.terminate();
                },
                r: function () {
                    pAll_1();
                    if (tr_1) {
                        var nxt = _this_1.u[ind_1 + 1];
                        if (nxt)
                            nxt.r();
                        else
                            _this_1.d = 1;
                    }
                    tr_1 = 1;
                }
            });
            var cl_1 = 0;
            file.ondata = function (err, dat, final) {
                if (err) {
                    _this_1.ondata(err, dat, final);
                    _this_1.terminate();
                }
                else {
                    cl_1 += dat.length;
                    chks_1.push(dat);
                    if (final) {
                        var dd = new u8(16);
                        wbytes(dd, 0, 0x8074B50);
                        wbytes(dd, 4, file.crc);
                        wbytes(dd, 8, cl_1);
                        wbytes(dd, 12, file.size);
                        chks_1.push(dd);
                        uf_1.c = cl_1, uf_1.b = hl_1 + cl_1 + 16, uf_1.crc = file.crc, uf_1.size = file.size;
                        if (tr_1)
                            uf_1.r();
                        tr_1 = 1;
                    }
                    else if (tr_1)
                        pAll_1();
                }
            };
            this.u.push(uf_1);
        }
    };
    /**
     * Ends the process of adding files and prepares to emit the final chunks.
     * This *must* be called after adding all desired files for the resulting
     * ZIP file to work properly.
     */
    Zip.prototype.end = function () {
        var _this_1 = this;
        if (this.d & 2) {
            this.ondata(err(4 + (this.d & 1) * 8, 0, 1), null, true);
            return;
        }
        if (this.d)
            this.e();
        else
            this.u.push({
                r: function () {
                    if (!(_this_1.d & 1))
                        return;
                    _this_1.u.splice(-1, 1);
                    _this_1.e();
                },
                t: function () { }
            });
        this.d = 3;
    };
    Zip.prototype.e = function () {
        var bt = 0, l = 0, tl = 0;
        for (var _i = 0, _a = this.u; _i < _a.length; _i++) {
            var f = _a[_i];
            tl += 46 + f.f.length + exfl(f.extra) + (f.o ? f.o.length : 0);
        }
        var out = new u8(tl + 22);
        for (var _b = 0, _c = this.u; _b < _c.length; _b++) {
            var f = _c[_b];
            wzh(out, bt, f, f.f, f.u, -f.c - 2, l, f.o);
            bt += 46 + f.f.length + exfl(f.extra) + (f.o ? f.o.length : 0), l += f.b;
        }
        wzf(out, bt, this.u.length, tl, l);
        this.ondata(null, out, true);
        this.d = 2;
    };
    /**
     * A method to terminate any internal workers used by the stream. Subsequent
     * calls to add() will fail.
     */
    Zip.prototype.terminate = function () {
        for (var _i = 0, _a = this.u; _i < _a.length; _i++) {
            var f = _a[_i];
            f.t();
        }
        this.d = 2;
    };
    return Zip;
}());

function zip(data, opts, cb) {
    if (!cb)
        cb = opts, opts = {};
    if (typeof cb != 'function')
        err(7);
    var r = {};
    fltn(data, '', r, opts);
    var k = Object.keys(r);
    var lft = k.length, o = 0, tot = 0;
    var slft = lft, files = new Array(lft);
    var term = [];
    var tAll = function () {
        for (var i = 0; i < term.length; ++i)
            term[i]();
    };
    var cbd = function (a, b) {
        mt(function () { cb(a, b); });
    };
    mt(function () { cbd = cb; });
    var cbf = function () {
        var out = new u8(tot + 22), oe = o, cdl = tot - o;
        tot = 0;
        for (var i = 0; i < slft; ++i) {
            var f = files[i];
            try {
                var l = f.c.length;
                wzh(out, tot, f, f.f, f.u, l);
                var badd = 30 + f.f.length + exfl(f.extra);
                var loc = tot + badd;
                out.set(f.c, loc);
                wzh(out, o, f, f.f, f.u, l, tot, f.m), o += 16 + badd + (f.m ? f.m.length : 0), tot = loc + l;
            }
            catch (e) {
                return cbd(e, null);
            }
        }
        wzf(out, o, files.length, cdl, oe);
        cbd(null, out);
    };
    if (!lft)
        cbf();
    var _loop_1 = function (i) {
        var fn = k[i];
        var _a = r[fn], file = _a[0], p = _a[1];
        var c = crc(), size = file.length;
        c.p(file);
        var f = strToU8(fn), s = f.length;
        var com = p.comment, m = com && strToU8(com), ms = m && m.length;
        var exl = exfl(p.extra);
        var compression = p.level == 0 ? 0 : 8;
        var cbl = function (e, d) {
            if (e) {
                tAll();
                cbd(e, null);
            }
            else {
                var l = d.length;
                files[i] = mrg(p, {
                    size: size,
                    crc: c.d(),
                    c: d,
                    f: f,
                    m: m,
                    u: s != fn.length || (m && (com.length != ms)),
                    compression: compression
                });
                o += 30 + s + exl + l;
                tot += 76 + 2 * (s + exl) + (ms || 0) + l;
                if (!--lft)
                    cbf();
            }
        };
        if (s > 65535)
            cbl(err(11, 0, 1), null);
        if (!compression)
            cbl(null, file);
        else if (size < 160000) {
            try {
                cbl(null, deflateSync(file, p));
            }
            catch (e) {
                cbl(e, null);
            }
        }
        else
            term.push(deflate(file, p, cbl));
    };
    // Cannot use lft because it can decrease
    for (var i = 0; i < slft; ++i) {
        _loop_1(i);
    }
    return tAll;
}
/**
 * Synchronously creates a ZIP file. Prefer using `zip` for better performance
 * with more than one file.
 * @param data The directory structure for the ZIP archive
 * @param opts The main options, merged with per-file options
 * @returns The generated ZIP archive
 */
function zipSync(data, opts) {
    if (!opts)
        opts = {};
    var r = {};
    var files = [];
    fltn(data, '', r, opts);
    var o = 0;
    var tot = 0;
    for (var fn in r) {
        var _a = r[fn], file = _a[0], p = _a[1];
        var compression = p.level == 0 ? 0 : 8;
        var f = strToU8(fn), s = f.length;
        var com = p.comment, m = com && strToU8(com), ms = m && m.length;
        var exl = exfl(p.extra);
        if (s > 65535)
            err(11);
        var d = compression ? deflateSync(file, p) : file, l = d.length;
        var c = crc();
        c.p(file);
        files.push(mrg(p, {
            size: file.length,
            crc: c.d(),
            c: d,
            f: f,
            m: m,
            u: s != fn.length || (m && (com.length != ms)),
            o: o,
            compression: compression
        }));
        o += 30 + s + exl + l;
        tot += 76 + 2 * (s + exl) + (ms || 0) + l;
    }
    var out = new u8(tot + 22), oe = o, cdl = tot - o;
    for (var i = 0; i < files.length; ++i) {
        var f = files[i];
        wzh(out, f.o, f, f.f, f.u, f.c.length);
        var badd = 30 + f.f.length + exfl(f.extra);
        out.set(f.c, f.o + badd);
        wzh(out, o, f, f.f, f.u, f.c.length, f.o, f.m), o += 16 + badd + (f.m ? f.m.length : 0);
    }
    wzf(out, o, files.length, cdl, oe);
    return out;
}
/**
 * Streaming pass-through decompression for ZIP archives
 */
var UnzipPassThrough = /*#__PURE__*/ (function () {
    function UnzipPassThrough() {
    }
    UnzipPassThrough.prototype.push = function (data, final) {
        this.ondata(null, data, final);
    };
    UnzipPassThrough.compression = 0;
    return UnzipPassThrough;
}());

/**
 * Streaming DEFLATE decompression for ZIP archives. Prefer AsyncZipInflate for
 * better performance.
 */
var UnzipInflate = /*#__PURE__*/ (function () {
    /**
     * Creates a DEFLATE decompression that can be used in ZIP archives
     */
    function UnzipInflate() {
        var _this_1 = this;
        this.i = new Inflate(function (dat, final) {
            _this_1.ondata(null, dat, final);
        });
    }
    UnzipInflate.prototype.push = function (data, final) {
        try {
            this.i.push(data, final);
        }
        catch (e) {
            this.ondata(e, null, final);
        }
    };
    UnzipInflate.compression = 8;
    return UnzipInflate;
}());

/**
 * Asynchronous streaming DEFLATE decompression for ZIP archives
 */
var AsyncUnzipInflate = /*#__PURE__*/ (function () {
    /**
     * Creates a DEFLATE decompression that can be used in ZIP archives
     */
    function AsyncUnzipInflate(_, sz) {
        var _this_1 = this;
        if (sz < 320000) {
            this.i = new Inflate(function (dat, final) {
                _this_1.ondata(null, dat, final);
            });
        }
        else {
            this.i = new AsyncInflate(function (err, dat, final) {
                _this_1.ondata(err, dat, final);
            });
            this.terminate = this.i.terminate;
        }
    }
    AsyncUnzipInflate.prototype.push = function (data, final) {
        if (this.i.terminate)
            data = slc(data, 0);
        this.i.push(data, final);
    };
    AsyncUnzipInflate.compression = 8;
    return AsyncUnzipInflate;
}());

/**
 * A ZIP archive decompression stream that emits files as they are discovered
 */
var Unzip = /*#__PURE__*/ (function () {
    /**
     * Creates a ZIP decompression stream
     * @param cb The callback to call whenever a file in the ZIP archive is found
     */
    function Unzip(cb) {
        this.onfile = cb;
        this.k = [];
        this.o = {
            0: UnzipPassThrough
        };
        this.p = et;
    }
    /**
     * Pushes a chunk to be unzipped
     * @param chunk The chunk to push
     * @param final Whether this is the last chunk
     */
    Unzip.prototype.push = function (chunk, final) {
        var _this_1 = this;
        if (!this.onfile)
            err(5);
        if (!this.p)
            err(4);
        if (this.c > 0) {
            var len = Math.min(this.c, chunk.length);
            var toAdd = chunk.subarray(0, len);
            this.c -= len;
            if (this.d)
                this.d.push(toAdd, !this.c);
            else
                this.k[0].push(toAdd);
            chunk = chunk.subarray(len);
            if (chunk.length)
                return this.push(chunk, final);
        }
        else {
            var f = 0, i = 0, is = void 0, buf = void 0;
            if (!this.p.length)
                buf = chunk;
            else if (!chunk.length)
                buf = this.p;
            else {
                buf = new u8(this.p.length + chunk.length);
                buf.set(this.p), buf.set(chunk, this.p.length);
            }
            var l = buf.length, oc = this.c, add = oc && this.d;
            var _loop_2 = function () {
                var _a;
                var sig = b4(buf, i);
                if (sig == 0x4034B50) {
                    f = 1, is = i;
                    this_1.d = null;
                    this_1.c = 0;
                    var bf = b2(buf, i + 6), cmp_1 = b2(buf, i + 8), u = bf & 2048, dd = bf & 8, fnl = b2(buf, i + 26), es = b2(buf, i + 28);
                    if (l > i + 30 + fnl + es) {
                        var chks_3 = [];
                        this_1.k.unshift(chks_3);
                        f = 2;
                        var sc_1 = b4(buf, i + 18), su_1 = b4(buf, i + 22);
                        var fn_1 = strFromU8(buf.subarray(i + 30, i += 30 + fnl), !u);
                        if (sc_1 == 4294967295) {
                            _a = dd ? [-2] : z64e(buf, i), sc_1 = _a[0], su_1 = _a[1];
                        }
                        else if (dd)
                            sc_1 = -1;
                        i += es;
                        this_1.c = sc_1;
                        var d_1;
                        var file_1 = {
                            name: fn_1,
                            compression: cmp_1,
                            start: function () {
                                if (!file_1.ondata)
                                    err(5);
                                if (!sc_1)
                                    file_1.ondata(null, et, true);
                                else {
                                    var ctr = _this_1.o[cmp_1];
                                    if (!ctr)
                                        file_1.ondata(err(14, 'unknown compression type ' + cmp_1, 1), null, false);
                                    d_1 = sc_1 < 0 ? new ctr(fn_1) : new ctr(fn_1, sc_1, su_1);
                                    d_1.ondata = function (err, dat, final) { file_1.ondata(err, dat, final); };
                                    for (var _i = 0, chks_4 = chks_3; _i < chks_4.length; _i++) {
                                        var dat = chks_4[_i];
                                        d_1.push(dat, false);
                                    }
                                    if (_this_1.k[0] == chks_3 && _this_1.c)
                                        _this_1.d = d_1;
                                    else
                                        d_1.push(et, true);
                                }
                            },
                            terminate: function () {
                                if (d_1 && d_1.terminate)
                                    d_1.terminate();
                            }
                        };
                        if (sc_1 >= 0)
                            file_1.size = sc_1, file_1.originalSize = su_1;
                        this_1.onfile(file_1);
                    }
                    return "break";
                }
                else if (oc) {
                    if (sig == 0x8074B50) {
                        is = i += 12 + (oc == -2 && 8), f = 3, this_1.c = 0;
                        return "break";
                    }
                    else if (sig == 0x2014B50) {
                        is = i -= 4, f = 3, this_1.c = 0;
                        return "break";
                    }
                }
            };
            var this_1 = this;
            for (; i < l - 4; ++i) {
                var state_1 = _loop_2();
                if (state_1 === "break")
                    break;
            }
            this.p = et;
            if (oc < 0) {
                var dat = f ? buf.subarray(0, is - 12 - (oc == -2 && 8) - (b4(buf, is - 16) == 0x8074B50 && 4)) : buf.subarray(0, i);
                if (add)
                    add.push(dat, !!f);
                else
                    this.k[+(f == 2)].push(dat);
            }
            if (f & 2)
                return this.push(buf.subarray(i), final);
            this.p = buf.subarray(i);
        }
        if (final) {
            if (this.c)
                err(13);
            this.p = null;
        }
    };
    /**
     * Registers a decoder with the stream, allowing for files compressed with
     * the compression type provided to be expanded correctly
     * @param decoder The decoder constructor
     */
    Unzip.prototype.register = function (decoder) {
        this.o[decoder.compression] = decoder;
    };
    return Unzip;
}());

var mt = typeof queueMicrotask == 'function' ? queueMicrotask : typeof setTimeout == 'function' ? setTimeout : function (fn) { fn(); };
function unzip(data, opts, cb) {
    if (!cb)
        cb = opts, opts = {};
    if (typeof cb != 'function')
        err(7);
    var term = [];
    var tAll = function () {
        for (var i = 0; i < term.length; ++i)
            term[i]();
    };
    var files = {};
    var cbd = function (a, b) {
        mt(function () { cb(a, b); });
    };
    mt(function () { cbd = cb; });
    var e = data.length - 22;
    for (; b4(data, e) != 0x6054B50; --e) {
        if (!e || data.length - e > 65558) {
            cbd(err(13, 0, 1), null);
            return tAll;
        }
    }
    ;
    var lft = b2(data, e + 8);
    if (lft) {
        var c = lft;
        var o = b4(data, e + 16);
        var z = o == 4294967295 || c == 65535;
        if (z) {
            var ze = b4(data, e - 12);
            z = b4(data, ze) == 0x6064B50;
            if (z) {
                c = lft = b4(data, ze + 32);
                o = b4(data, ze + 48);
            }
        }
        var fltr = opts && opts.filter;
        var _loop_3 = function (i) {
            var _a = zh(data, o, z), c_1 = _a[0], sc = _a[1], su = _a[2], fn = _a[3], no = _a[4], off = _a[5], b = slzh(data, off);
            o = no;
            var cbl = function (e, d) {
                if (e) {
                    tAll();
                    cbd(e, null);
                }
                else {
                    if (d)
                        files[fn] = d;
                    if (!--lft)
                        cbd(null, files);
                }
            };
            if (!fltr || fltr({
                name: fn,
                size: sc,
                originalSize: su,
                compression: c_1
            })) {
                if (!c_1)
                    cbl(null, slc(data, b, b + sc));
                else if (c_1 == 8) {
                    var infl = data.subarray(b, b + sc);
                    if (sc < 320000) {
                        try {
                            cbl(null, inflateSync(infl, new u8(su)));
                        }
                        catch (e) {
                            cbl(e, null);
                        }
                    }
                    else
                        term.push(inflate(infl, { size: su }, cbl));
                }
                else
                    cbl(err(14, 'unknown compression type ' + c_1, 1), null);
            }
            else
                cbl(null, null);
        };
        for (var i = 0; i < c; ++i) {
            _loop_3(i);
        }
    }
    else
        cbd(null, {});
    return tAll;
}
/**
 * Synchronously decompresses a ZIP archive. Prefer using `unzip` for better
 * performance with more than one file.
 * @param data The raw compressed ZIP file
 * @param opts The ZIP extraction options
 * @returns The decompressed files
 */
function unzipSync(data, opts) {
    var files = {};
    var e = data.length - 22;
    for (; b4(data, e) != 0x6054B50; --e) {
        if (!e || data.length - e > 65558)
            err(13);
    }
    ;
    var c = b2(data, e + 8);
    if (!c)
        return {};
    var o = b4(data, e + 16);
    var z = o == 4294967295 || c == 65535;
    if (z) {
        var ze = b4(data, e - 12);
        z = b4(data, ze) == 0x6064B50;
        if (z) {
            c = b4(data, ze + 32);
            o = b4(data, ze + 48);
        }
    }
    var fltr = opts && opts.filter;
    for (var i = 0; i < c; ++i) {
        var _a = zh(data, o, z), c_2 = _a[0], sc = _a[1], su = _a[2], fn = _a[3], no = _a[4], off = _a[5], b = slzh(data, off);
        o = no;
        if (!fltr || fltr({
            name: fn,
            size: sc,
            originalSize: su,
            compression: c_2
        })) {
            if (!c_2)
                files[fn] = slc(data, b, b + sc);
            else if (c_2 == 8)
                files[fn] = inflateSync(data.subarray(b, b + sc), new u8(su));
            else
                err(14, 'unknown compression type ' + c_2);
        }
    }
    return files;
}


/***/ }),

/***/ "./node_modules/read-excel-file/index.js":
/*!***********************************************!*\
  !*** ./node_modules/read-excel-file/index.js ***!
  \***********************************************/
/*! exports provided: default, readSheetNames, parseExcelDate, Integer, Email, URL */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_read_readXlsxFileBrowser_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/read/readXlsxFileBrowser.js */ "./node_modules/read-excel-file/modules/read/readXlsxFileBrowser.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _modules_read_readXlsxFileBrowser_js__WEBPACK_IMPORTED_MODULE_0__["default"]; });

/* harmony import */ var _modules_read_readSheetNamesBrowser_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/read/readSheetNamesBrowser.js */ "./node_modules/read-excel-file/modules/read/readSheetNamesBrowser.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "readSheetNames", function() { return _modules_read_readSheetNamesBrowser_js__WEBPACK_IMPORTED_MODULE_1__["default"]; });

/* harmony import */ var _modules_read_parseDate_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/read/parseDate.js */ "./node_modules/read-excel-file/modules/read/parseDate.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "parseExcelDate", function() { return _modules_read_parseDate_js__WEBPACK_IMPORTED_MODULE_2__["default"]; });

/* harmony import */ var _modules_types_Integer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/types/Integer.js */ "./node_modules/read-excel-file/modules/types/Integer.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Integer", function() { return _modules_types_Integer_js__WEBPACK_IMPORTED_MODULE_3__["default"]; });

/* harmony import */ var _modules_types_Email_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/types/Email.js */ "./node_modules/read-excel-file/modules/types/Email.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Email", function() { return _modules_types_Email_js__WEBPACK_IMPORTED_MODULE_4__["default"]; });

/* harmony import */ var _modules_types_URL_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/types/URL.js */ "./node_modules/read-excel-file/modules/types/URL.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "URL", function() { return _modules_types_URL_js__WEBPACK_IMPORTED_MODULE_5__["default"]; });









/***/ }),

/***/ "./node_modules/read-excel-file/modules/read/coordinates.js":
/*!******************************************************************!*\
  !*** ./node_modules/read-excel-file/modules/read/coordinates.js ***!
  \******************************************************************/
/*! exports provided: calculateDimensions, parseCellCoordinates */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "calculateDimensions", function() { return calculateDimensions; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "parseCellCoordinates", function() { return parseCellCoordinates; });
// Maps "A1"-like coordinates to `{ row, column }` numeric coordinates.
var LETTERS = ["", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
function calculateDimensions(cells) {
  var comparator = function comparator(a, b) {
    return a - b;
  };

  var allRows = cells.map(function (cell) {
    return cell.row;
  }).sort(comparator);
  var allCols = cells.map(function (cell) {
    return cell.column;
  }).sort(comparator);
  var minRow = allRows[0];
  var maxRow = allRows[allRows.length - 1];
  var minCol = allCols[0];
  var maxCol = allCols[allCols.length - 1];
  return [{
    row: minRow,
    column: minCol
  }, {
    row: maxRow,
    column: maxCol
  }];
} // Converts a letter coordinate to a digit coordinate.
// Examples: "A" -> 1, "B" -> 2, "Z" -> 26, "AA" -> 27, etc.

function columnLettersToNumber(columnLetters) {
  // `for ... of ...` would require Babel polyfill for iterating a string.
  var n = 0;
  var i = 0;

  while (i < columnLetters.length) {
    n *= 26;
    n += LETTERS.indexOf(columnLetters[i]);
    i++;
  }

  return n;
}

function parseCellCoordinates(coords) {
  // Coordinate examples: "AA2091", "R988", "B1".
  coords = coords.split(/(\d+)/);
  return [// Row.
  parseInt(coords[1]), // Column.
  columnLettersToNumber(coords[0].trim())];
}
//# sourceMappingURL=coordinates.js.map

/***/ }),

/***/ "./node_modules/read-excel-file/modules/read/dropEmptyColumns.js":
/*!***********************************************************************!*\
  !*** ./node_modules/read-excel-file/modules/read/dropEmptyColumns.js ***!
  \***********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return dropEmptyColumns; });
function _createForOfIteratorHelperLoose(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (it) return (it = it.call(o)).next.bind(it); if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; return function () { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function dropEmptyColumns(data) {
  var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      _ref$accessor = _ref.accessor,
      accessor = _ref$accessor === void 0 ? function (_) {
    return _;
  } : _ref$accessor,
      onlyTrimAtTheEnd = _ref.onlyTrimAtTheEnd;

  var i = data[0].length - 1;

  while (i >= 0) {
    var empty = true;

    for (var _iterator = _createForOfIteratorHelperLoose(data), _step; !(_step = _iterator()).done;) {
      var row = _step.value;

      if (accessor(row[i]) !== null) {
        empty = false;
        break;
      }
    }

    if (empty) {
      var j = 0;

      while (j < data.length) {
        data[j].splice(i, 1);
        j++;
      }
    } else if (onlyTrimAtTheEnd) {
      break;
    }

    i--;
  }

  return data;
}
//# sourceMappingURL=dropEmptyColumns.js.map

/***/ }),

/***/ "./node_modules/read-excel-file/modules/read/dropEmptyRows.js":
/*!********************************************************************!*\
  !*** ./node_modules/read-excel-file/modules/read/dropEmptyRows.js ***!
  \********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return dropEmptyRows; });
function _createForOfIteratorHelperLoose(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (it) return (it = it.call(o)).next.bind(it); if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; return function () { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function dropEmptyRows(data) {
  var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      rowMap = _ref.rowMap,
      _ref$accessor = _ref.accessor,
      accessor = _ref$accessor === void 0 ? function (_) {
    return _;
  } : _ref$accessor,
      onlyTrimAtTheEnd = _ref.onlyTrimAtTheEnd;

  // Drop empty rows.
  var i = data.length - 1;

  while (i >= 0) {
    // Check if the row is empty.
    var empty = true;

    for (var _iterator = _createForOfIteratorHelperLoose(data[i]), _step; !(_step = _iterator()).done;) {
      var cell = _step.value;

      if (accessor(cell) !== null) {
        empty = false;
        break;
      }
    } // Remove the empty row.


    if (empty) {
      data.splice(i, 1);

      if (rowMap) {
        rowMap.splice(i, 1);
      }
    } else if (onlyTrimAtTheEnd) {
      break;
    }

    i--;
  }

  return data;
}
//# sourceMappingURL=dropEmptyRows.js.map

/***/ }),

/***/ "./node_modules/read-excel-file/modules/read/getData.js":
/*!**************************************************************!*\
  !*** ./node_modules/read-excel-file/modules/read/getData.js ***!
  \**************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return getData; });
/* harmony import */ var _dropEmptyRows_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dropEmptyRows.js */ "./node_modules/read-excel-file/modules/read/dropEmptyRows.js");
/* harmony import */ var _dropEmptyColumns_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./dropEmptyColumns.js */ "./node_modules/read-excel-file/modules/read/dropEmptyColumns.js");
function _createForOfIteratorHelperLoose(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (it) return (it = it.call(o)).next.bind(it); if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; return function () { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }



function getData(sheet, options) {
  var dimensions = sheet.dimensions,
      cells = sheet.cells; // If the sheet is empty.

  if (cells.length === 0) {
    return [];
  }

  var _dimensions = _slicedToArray(dimensions, 2),
      leftTop = _dimensions[0],
      rightBottom = _dimensions[1]; // Don't discard empty rows or columns at the start.
  // https://github.com/catamphetamine/read-excel-file/issues/102
  // const colsCount = (rightBottom.column - leftTop.column) + 1
  // const rowsCount = (rightBottom.row - leftTop.row) + 1


  var colsCount = rightBottom.column;
  var rowsCount = rightBottom.row; // Initialize spreadsheet data structure.

  var data = new Array(rowsCount);
  var i = 0;

  while (i < rowsCount) {
    data[i] = new Array(colsCount);
    var j = 0;

    while (j < colsCount) {
      data[i][j] = null;
      j++;
    }

    i++;
  } // Fill in spreadsheet `data`.
  // (this code implies that `cells` aren't necessarily sorted by row and column:
  //  maybe that's not correct, this piece code was initially copy-pasted
  //  from some other library that used `XPath`)


  for (var _iterator = _createForOfIteratorHelperLoose(cells), _step; !(_step = _iterator()).done;) {
    var cell = _step.value;
    // Don't discard empty rows or columns at the start.
    // https://github.com/catamphetamine/read-excel-file/issues/102
    // const rowIndex = cell.row - leftTop.row
    // const columnIndex = cell.column - leftTop.column
    var rowIndex = cell.row - 1;
    var columnIndex = cell.column - 1; // Ignore the data in the cell if it's outside of the spreadsheet's "dimensions".

    if (columnIndex < colsCount && rowIndex < rowsCount) {
      data[rowIndex][columnIndex] = cell.value;
    }
  } // Fill in the row map.


  var rowMap = options.rowMap;

  if (rowMap) {
    var _i2 = 0;

    while (_i2 < data.length) {
      rowMap[_i2] = _i2;
      _i2++;
    }
  } // Drop empty columns or rows.


  data = Object(_dropEmptyRows_js__WEBPACK_IMPORTED_MODULE_0__["default"])(Object(_dropEmptyColumns_js__WEBPACK_IMPORTED_MODULE_1__["default"])(data, {
    onlyTrimAtTheEnd: true
  }), {
    onlyTrimAtTheEnd: true,
    rowMap: rowMap
  }); // Optionally transform data before applying `schema`.

  if (options.transformData) {
    data = options.transformData(data); // data = options.transformData(data, {
    //   dropEmptyRowsAndColumns(data) {
    //     return dropEmptyRows(dropEmptyColumns(data), { rowMap })
    //   }
    // })
  }

  return data;
}
//# sourceMappingURL=getData.js.map

/***/ }),

/***/ "./node_modules/read-excel-file/modules/read/isDateTimestamp.js":
/*!**********************************************************************!*\
  !*** ./node_modules/read-excel-file/modules/read/isDateTimestamp.js ***!
  \**********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return isDateTimestamp; });
function _createForOfIteratorHelperLoose(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (it) return (it = it.call(o)).next.bind(it); if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; return function () { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

// XLSX does have "d" type for dates, but it's not commonly used.
// Instead, it prefers using "n" type for storing dates as timestamps.
//
// Whether a numeric value is a number or a date timestamp, it sometimes could be
// detected by looking at the value "format" and seeing if it's a date-specific one.
// https://github.com/catamphetamine/read-excel-file/issues/3#issuecomment-395770777
//
// The list of generic numeric value "formats":
// https://xlsxwriter.readthedocs.io/format.html#format-set-num-format
//
function isDateTimestamp(styleId, styles, options) {
  if (styleId) {
    var style = styles[styleId];

    if (!style) {
      throw new Error("Cell style not found: ".concat(styleId));
    }

    if (!style.numberFormat) {
      return false;
    }

    if ( // Whether it's a "number format" that's conventionally used for storing date timestamps.
    BUILT_IN_DATE_NUMBER_FORMAT_IDS.indexOf(Number(style.numberFormat.id)) >= 0 || // Whether it's a "number format" that uses a "formatting template"
    // that the developer is certain is a date formatting template.
    options.dateFormat && style.numberFormat.template === options.dateFormat || // Whether the "smart formatting template" feature is not disabled
    // and it has detected that it's a date formatting template by looking at it.
    options.smartDateParser !== false && style.numberFormat.template && isDateTemplate(style.numberFormat.template)) {
      return true;
    }
  }
} // https://hexdocs.pm/xlsxir/number_styles.html

var BUILT_IN_DATE_NUMBER_FORMAT_IDS = [14, 15, 16, 17, 18, 19, 20, 21, 22, 27, 30, 36, 45, 46, 47, 50, 57]; // On some date formats, there's an "[$-414]" prefix.
// I don't have any idea what that is.
//
// https://stackoverflow.com/questions/4730152/what-indicates-an-office-open-xml-cell-contains-a-date-time-value
//
// Examples:
//
// * 27 (built-in format) "[$-404]e/m/d"
// * 164 (custom format) "[$-414]mmmm\ yyyy;@"
//

var DATE_FORMAT_WEIRD_PREFIX = /^\[\$-414\]/; // On some date formats, there's an ";@" postfix.
// I don't have any idea what that is.
// Examples:
//
// * 164 (custom format) "m/d/yyyy;@"
// * 164 (custom format) "[$-414]mmmm\ yyyy;@"
//

var DATE_FORMAT_WEIRD_POSTFIX = /;@$/;

function isDateTemplate(template) {
  // Date format tokens could be in upper case or in lower case.
  // There seems to be no single standard.
  // So lowercase the template first.
  template = template.toLowerCase(); // On some date formats, there's an "[$-414]" prefix.
  // I don't have any idea what that is. Trim it.

  template = template.replace(DATE_FORMAT_WEIRD_PREFIX, ''); // On some date formats, there's an ";@" postfix.
  // I don't have any idea what that is. Trim it.

  template = template.replace(DATE_FORMAT_WEIRD_POSTFIX, '');
  var tokens = template.split(/\W+/);

  for (var _iterator = _createForOfIteratorHelperLoose(tokens), _step; !(_step = _iterator()).done;) {
    var token = _step.value;

    if (DATE_TEMPLATE_TOKENS.indexOf(token) < 0) {
      return false;
    }
  }

  return true;
} // These tokens could be in upper case or in lower case.
// There seems to be no single standard, so using lower case.


var DATE_TEMPLATE_TOKENS = [// Seconds (min two digits). Example: "05".
'ss', // Minutes (min two digits). Example: "05". Could also be "Months". Weird.
'mm', // Hours. Example: "1".
'h', // Hours (min two digits). Example: "01".
'hh', // "AM" part of "AM/PM". Lowercased just in case.
'am', // "PM" part of "AM/PM". Lowercased just in case.
'pm', // Day. Example: "1"
'd', // Day (min two digits). Example: "01"
'dd', // Month (numeric). Example: "1".
'm', // Month (numeric, min two digits). Example: "01". Could also be "Minutes". Weird.
'mm', // Month (shortened month name). Example: "Jan".
'mmm', // Month (full month name). Example: "January".
'mmmm', // Two-digit year. Example: "20".
'yy', // Full year. Example: "2020".
'yyyy', // I don't have any idea what "e" means.
// It's used in "built-in" XLSX formats:
// * 27 '[$-404]e/m/d';
// * 36 '[$-404]e/m/d';
// * 50 '[$-404]e/m/d';
// * 57 '[$-404]e/m/d';
'e'];
//# sourceMappingURL=isDateTimestamp.js.map

/***/ }),

/***/ "./node_modules/read-excel-file/modules/read/parseCell.js":
/*!****************************************************************!*\
  !*** ./node_modules/read-excel-file/modules/read/parseCell.js ***!
  \****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return parseCell; });
/* harmony import */ var _parseCellValue_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./parseCellValue.js */ "./node_modules/read-excel-file/modules/read/parseCellValue.js");
/* harmony import */ var _coordinates_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./coordinates.js */ "./node_modules/read-excel-file/modules/read/coordinates.js");
/* harmony import */ var _xml_xlsx_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../xml/xlsx.js */ "./node_modules/read-excel-file/modules/xml/xlsx.js");
/* harmony import */ var _xml_dom_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../xml/dom.js */ "./node_modules/read-excel-file/modules/xml/dom.js");



 // Example of a `<c/>`ell element:
//
// <c>
//    <f>string</f> — formula.
//    <v>string</v> — formula pre-computed value.
//    <is>
//       <t>string</t> — an `inlineStr` string (rather than a "common string" from a dictionary).
//       <r>
//          <rPr>
//            ...
//          </rPr>
//          <t>string</t>
//       </r>
//       <rPh sb="1" eb="1">
//          <t>string</t>
//       </rPh>
//       <phoneticPr fontId="1"/>
//    </is>
//    <extLst>
//       <ext>
//          <!--any element-->
//       </ext>
//    </extLst>
// </c>
//

function parseCell(node, sheet, xml, values, styles, properties, options) {
  var coords = Object(_coordinates_js__WEBPACK_IMPORTED_MODULE_1__["parseCellCoordinates"])(node.getAttribute('r'));
  var valueElement = Object(_xml_xlsx_js__WEBPACK_IMPORTED_MODULE_2__["getCellValue"])(sheet, node); // For `xpath`, `value` can be `undefined` while for native `DOMParser` it's `null`.
  // So using `value && ...` instead of `if (value !== undefined) { ... }` here
  // for uniform compatibility with both `xpath` and native `DOMParser`.

  var value = valueElement && valueElement.textContent;
  var type;

  if (node.hasAttribute('t')) {
    type = node.getAttribute('t');
  }

  return {
    row: coords[0],
    column: coords[1],
    value: Object(_parseCellValue_js__WEBPACK_IMPORTED_MODULE_0__["default"])(value, type, {
      getInlineStringValue: function getInlineStringValue() {
        return Object(_xml_xlsx_js__WEBPACK_IMPORTED_MODULE_2__["getCellInlineStringValue"])(sheet, node);
      },
      getInlineStringXml: function getInlineStringXml() {
        return Object(_xml_dom_js__WEBPACK_IMPORTED_MODULE_3__["getOuterXml"])(node);
      },
      getStyleId: function getStyleId() {
        return node.getAttribute('s');
      },
      styles: styles,
      values: values,
      properties: properties,
      options: options
    })
  };
}
//# sourceMappingURL=parseCell.js.map

/***/ }),

/***/ "./node_modules/read-excel-file/modules/read/parseCellValue.js":
/*!*********************************************************************!*\
  !*** ./node_modules/read-excel-file/modules/read/parseCellValue.js ***!
  \*********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return parseCellValue; });
/* harmony import */ var _parseDate_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./parseDate.js */ "./node_modules/read-excel-file/modules/read/parseDate.js");
/* harmony import */ var _isDateTimestamp_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./isDateTimestamp.js */ "./node_modules/read-excel-file/modules/read/isDateTimestamp.js");

 // Parses a string `value` of a cell.

function parseCellValue(value, type, _ref) {
  var getInlineStringValue = _ref.getInlineStringValue,
      getInlineStringXml = _ref.getInlineStringXml,
      getStyleId = _ref.getStyleId,
      styles = _ref.styles,
      values = _ref.values,
      properties = _ref.properties,
      options = _ref.options;

  if (!type) {
    // Default cell type is "n" (numeric).
    // http://www.datypic.com/sc/ooxml/t-ssml_CT_Cell.html
    type = 'n';
  } // Available Excel cell types:
  // https://github.com/SheetJS/sheetjs/blob/19620da30be2a7d7b9801938a0b9b1fd3c4c4b00/docbits/52_datatype.md
  //
  // Some other document (seems to be old):
  // http://webapp.docx4java.org/OnlineDemo/ecma376/SpreadsheetML/ST_CellType.html
  //


  switch (type) {
    // XLSX tends to store all strings as "shared" (indexed) ones
    // using "s" cell type (for saving on strage space).
    // "str" cell type is then generally only used for storing
    // formula-pre-calculated cell values.
    case 'str':
      value = parseString(value, options);
      break;
    // Sometimes, XLSX stores strings as "inline" strings rather than "shared" (indexed) ones.
    // Perhaps the specification doesn't force it to use one or another.
    // Example: `<sheetData><row r="1"><c r="A1" s="1" t="inlineStr"><is><t>Test 123</t></is></c></row></sheetData>`.

    case 'inlineStr':
      value = getInlineStringValue();

      if (value === undefined) {
        throw new Error("Unsupported \"inline string\" cell value structure: ".concat(getInlineStringXml()));
      }

      value = parseString(value, options);
      break;
    // XLSX tends to store string values as "shared" (indexed) ones.
    // "Shared" strings is a way for an Excel editor to reduce
    // the file size by storing "commonly used" strings in a dictionary
    // and then referring to such strings by their index in that dictionary.
    // Example: `<sheetData><row r="1"><c r="A1" s="1" t="s"><v>0</v></c></row></sheetData>`.

    case 's':
      // If a cell has no value then there's no `<c/>` element for it.
      // If a `<c/>` element exists then it's not empty.
      // The `<v/>`alue is a key in the "shared strings" dictionary of the
      // XLSX file, so look it up in the `values` dictionary by the numeric key.
      var sharedStringIndex = Number(value);

      if (isNaN(sharedStringIndex)) {
        throw new Error("Invalid \"shared\" string index: ".concat(value));
      }

      if (sharedStringIndex >= values.length) {
        throw new Error("An out-of-bounds \"shared\" string index: ".concat(value));
      }

      value = values[sharedStringIndex];
      value = parseString(value, options);
      break;
    // Boolean (TRUE/FALSE) values are stored as either "1" or "0"
    // in cells of type "b".

    case 'b':
      if (value === '1') {
        value = true;
      } else if (value === '0') {
        value = false;
      } else {
        throw new Error("Unsupported \"boolean\" cell value: ".concat(value));
      }

      break;
    // XLSX specification seems to support cells of type "z":
    // blank "stub" cells that should be ignored by data processing utilities.

    case 'z':
      value = undefined;
      break;
    // XLSX specification also defines cells of type "e" containing a numeric "error" code.
    // It's not clear what that means though.
    // They also wrote: "and `w` property stores its common name".
    // It's unclear what they meant by that.

    case 'e':
      value = decodeError(value);
      break;
    // XLSX supports date cells of type "d", though seems like it (almost?) never
    // uses it for storing dates, preferring "n" numeric timestamp cells instead.
    // The value of a "d" cell is supposedly a string in "ISO 8601" format.
    // I haven't seen an XLSX file having such cells.
    // Example: `<sheetData><row r="1"><c r="A1" s="1" t="d"><v>2021-06-10T00:47:45.700Z</v></c></row></sheetData>`.

    case 'd':
      if (value === undefined) {
        break;
      }

      var parsedDate = new Date(value);

      if (isNaN(parsedDate.valueOf())) {
        throw new Error("Unsupported \"date\" cell value: ".concat(value));
      }

      value = parsedDate;
      break;
    // Numeric cells have type "n".

    case 'n':
      if (value === undefined) {
        break;
      }

      var isDateTimestampNumber = Object(_isDateTimestamp_js__WEBPACK_IMPORTED_MODULE_1__["default"])(getStyleId(), styles, options); // XLSX does have "d" type for dates, but it's not commonly used.
      // Instead, it prefers using "n" type for storing dates as timestamps.

      if (isDateTimestampNumber) {
        // Parse the number from string.
        value = parseNumberDefault(value); // Parse the number as a date timestamp.

        value = Object(_parseDate_js__WEBPACK_IMPORTED_MODULE_0__["default"])(value, properties);
      } else {
        // Parse the number from string.
        // Supports custom parsing function to work around javascript number encoding precision issues.
        // https://gitlab.com/catamphetamine/read-excel-file/-/issues/85
        value = (options.parseNumber || parseNumberDefault)(value);
      }

      break;

    default:
      throw new TypeError("Cell type not supported: ".concat(type));
  } // Convert empty values to `null`.


  if (value === undefined) {
    value = null;
  }

  return value;
} // Decodes numeric error code to a string code.
// https://github.com/SheetJS/sheetjs/blob/19620da30be2a7d7b9801938a0b9b1fd3c4c4b00/docbits/52_datatype.md

function decodeError(errorCode) {
  // While the error values are determined by the application,
  // the following are some example error values that could be used:
  switch (errorCode) {
    case 0x00:
      return '#NULL!';

    case 0x07:
      return '#DIV/0!';

    case 0x0F:
      return '#VALUE!';

    case 0x17:
      return '#REF!';

    case 0x1D:
      return '#NAME?';

    case 0x24:
      return '#NUM!';

    case 0x2A:
      return '#N/A';

    case 0x2B:
      return '#GETTING_DATA';

    default:
      // Such error code doesn't exist. I made it up.
      return "#ERROR_".concat(errorCode);
  }
}

function parseString(value, options) {
  // In some weird cases, a developer might want to disable
  // the automatic trimming of all strings.
  // For example, leading spaces might express a tree-like hierarchy.
  // https://github.com/catamphetamine/read-excel-file/pull/106#issuecomment-1136062917
  if (options.trim !== false) {
    value = value.trim();
  }

  if (value === '') {
    value = undefined;
  }

  return value;
} // Parses a number from string.
// Throws an error if the number couldn't be parsed.
// When parsing floating-point number, is affected by
// the javascript number encoding precision issues:
// https://www.youtube.com/watch?v=2gIxbTn7GSc
// https://www.avioconsulting.com/blog/overcoming-javascript-numeric-precision-issues


function parseNumberDefault(stringifiedNumber) {
  var parsedNumber = Number(stringifiedNumber);

  if (isNaN(parsedNumber)) {
    throw new Error("Invalid \"numeric\" cell value: ".concat(stringifiedNumber));
  }

  return parsedNumber;
}
//# sourceMappingURL=parseCellValue.js.map

/***/ }),

/***/ "./node_modules/read-excel-file/modules/read/parseCells.js":
/*!*****************************************************************!*\
  !*** ./node_modules/read-excel-file/modules/read/parseCells.js ***!
  \*****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return parseCells; });
/* harmony import */ var _parseCell_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./parseCell.js */ "./node_modules/read-excel-file/modules/read/parseCell.js");
/* harmony import */ var _xml_xlsx_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../xml/xlsx.js */ "./node_modules/read-excel-file/modules/xml/xlsx.js");


function parseCells(sheet, xml, values, styles, properties, options) {
  var cells = Object(_xml_xlsx_js__WEBPACK_IMPORTED_MODULE_1__["getCells"])(sheet);

  if (cells.length === 0) {
    return [];
  } // const mergedCells = getMergedCells(sheet)
  // for (const mergedCell of mergedCells) {
  //   const [from, to] = mergedCell.split(':').map(parseCellCoordinates)
  //   console.log('Merged Cell.', 'From:', from, 'To:', to)
  // }


  return cells.map(function (node) {
    return Object(_parseCell_js__WEBPACK_IMPORTED_MODULE_0__["default"])(node, sheet, xml, values, styles, properties, options);
  });
}
//# sourceMappingURL=parseCells.js.map

/***/ }),

/***/ "./node_modules/read-excel-file/modules/read/parseDate.js":
/*!****************************************************************!*\
  !*** ./node_modules/read-excel-file/modules/read/parseDate.js ***!
  \****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return parseExcelDate; });
// Parses an Excel Date ("serial") into a corresponding javascript Date in UTC+0 timezone.
// (with time equal to 00:00)
//
// https://www.pcworld.com/article/3063622/software/mastering-excel-date-time-serial-numbers-networkdays-datevalue-and-more.html
// "If you need to calculate dates in your spreadsheets,
//  Excel uses its own unique system, which it calls Serial Numbers".
//
function parseExcelDate(excelSerialDate, options) {
  // https://support.microsoft.com/en-gb/help/214330/differences-between-the-1900-and-the-1904-date-system-in-excel
  if (options && options.epoch1904) {
    excelSerialDate += 1462;
  } // "Excel serial date" is just
  // the count of days since `01/01/1900`
  // (seems that it may be even fractional).
  //
  // The count of days elapsed
  // since `01/01/1900` (Excel epoch)
  // till `01/01/1970` (Unix epoch).
  // Accounts for leap years
  // (19 of them, yielding 19 extra days).


  var daysBeforeUnixEpoch = 70 * 365 + 19; // An hour, approximately, because a minute
  // may be longer than 60 seconds, due to "leap seconds".
  //
  // Still, Javascript `Date` (and UNIX time in general) intentionally
  // drops the concept of "leap seconds" in order to make things simpler.
  // So it's fine.
  // https://stackoverflow.com/questions/53019726/where-are-the-leap-seconds-in-javascript
  //
  // "The JavaScript Date object specifically adheres to the concept of Unix Time
  //  (albeit with higher precision). This is part of the POSIX specification,
  //  and thus is sometimes called "POSIX Time". It does not count leap seconds,
  //  but rather assumes every day had exactly 86,400 seconds. You can read about
  //  this in section 20.3.1.1 of the current ECMAScript specification, which states:
  //
  //  "Time is measured in ECMAScript in milliseconds since 01 January, 1970 UTC.
  //   In time values leap seconds are ignored. It is assumed that there are exactly
  //   86,400,000 milliseconds per day."
  //
  //  The fact is, that the unpredictable nature of leap seconds makes them very
  //  difficult to work with in APIs. One can't generally pass timestamps around
  //  that need leap seconds tables to be interpreted correctly, and expect that
  //  one system will interpret them the same as another. For example, while your
  //  example timestamp 1483228826 is 2017-01-01T00:00:00Z on your system,
  //  it would be interpreted as 2017-01-01T00:00:26Z on POSIX based systems,
  //  or systems without leap second tables. So they aren't portable.
  //  Even on systems that have full updated tables, there's no telling what those
  //  tables will contain in the future (beyond the 6-month IERS announcement period),
  //  so I can't produce a future timestamp without risk that it may eventually change.
  //
  //  To be clear - to support leap seconds in a programming language, the implementation
  //  must go out of its way to do so, and must make tradeoffs that are not always acceptable.
  //  Though there are exceptions, the general position is to not support them - not because
  //  of any subversion or active countermeasures, but because supporting them properly is much,
  //  much harder."
  //
  // https://en.wikipedia.org/wiki/Unix_time#Leap_seconds
  // https://en.wikipedia.org/wiki/Leap_year
  // https://en.wikipedia.org/wiki/Leap_second
  //

  var hour = 60 * 60 * 1000;
  return new Date(Math.round((excelSerialDate - daysBeforeUnixEpoch) * 24 * hour));
}
//# sourceMappingURL=parseDate.js.map

/***/ }),

/***/ "./node_modules/read-excel-file/modules/read/parseDimensions.js":
/*!**********************************************************************!*\
  !*** ./node_modules/read-excel-file/modules/read/parseDimensions.js ***!
  \**********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return parseDimensions; });
/* harmony import */ var _coordinates_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./coordinates.js */ "./node_modules/read-excel-file/modules/read/coordinates.js");
/* harmony import */ var _xml_xlsx_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../xml/xlsx.js */ "./node_modules/read-excel-file/modules/xml/xlsx.js");
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }


 // `dimensions` defines the spreadsheet area containing all non-empty cells.
// https://docs.microsoft.com/en-us/dotnet/api/documentformat.openxml.spreadsheet.sheetdimension?view=openxml-2.8.1

function parseDimensions(sheet) {
  var dimensions = Object(_xml_xlsx_js__WEBPACK_IMPORTED_MODULE_1__["getDimensions"])(sheet);

  if (dimensions) {
    dimensions = dimensions.split(':').map(_coordinates_js__WEBPACK_IMPORTED_MODULE_0__["parseCellCoordinates"]).map(function (_ref) {
      var _ref2 = _slicedToArray(_ref, 2),
          row = _ref2[0],
          column = _ref2[1];

      return {
        row: row,
        column: column
      };
    }); // Sometimes there can be just a single cell as a spreadsheet's "dimensions".
    // For example, the default "dimensions" in Apache POI library is "A1",
    // meaning that only the first cell in the spreadsheet is used.
    //
    // A quote from Apache POI library:
    // "Single cell ranges are formatted like single cell references (e.g. 'A1' instead of 'A1:A1')."
    //

    if (dimensions.length === 1) {
      dimensions = [dimensions[0], dimensions[0]];
    }

    return dimensions;
  }
}
//# sourceMappingURL=parseDimensions.js.map

/***/ }),

/***/ "./node_modules/read-excel-file/modules/read/parseFilePaths.js":
/*!*********************************************************************!*\
  !*** ./node_modules/read-excel-file/modules/read/parseFilePaths.js ***!
  \*********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return parseFilePaths; });
/* harmony import */ var _xml_xlsx_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../xml/xlsx.js */ "./node_modules/read-excel-file/modules/xml/xlsx.js");

/**
 * Returns sheet file paths.
 * Seems that the correct place to look for the `sheetId` -> `filename` mapping
 * is `xl/_rels/workbook.xml.rels` file.
 * https://github.com/tidyverse/readxl/issues/104
 * @param  {string} content — `xl/_rels/workbook.xml.rels` file contents.
 * @param  {object} xml
 * @return {object}
 */

function parseFilePaths(content, xml) {
  // Example:
  // <Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  //   ...
  //   <Relationship
  //     Id="rId3"
  //     Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet"
  //     Target="worksheets/sheet1.xml"/>
  // </Relationships>
  var document = xml.createDocument(content);
  var filePaths = {
    sheets: {},
    sharedStrings: undefined,
    styles: undefined
  };

  var addFilePathInfo = function addFilePathInfo(relationship) {
    var filePath = relationship.getAttribute('Target');
    var fileType = relationship.getAttribute('Type');

    switch (fileType) {
      case 'http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles':
        filePaths.styles = getFilePath(filePath);
        break;

      case 'http://schemas.openxmlformats.org/officeDocument/2006/relationships/sharedStrings':
        filePaths.sharedStrings = getFilePath(filePath);
        break;

      case 'http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet':
        filePaths.sheets[relationship.getAttribute('Id')] = getFilePath(filePath);
        break;
    }
  };

  Object(_xml_xlsx_js__WEBPACK_IMPORTED_MODULE_0__["getRelationships"])(document).forEach(addFilePathInfo); // Seems like "sharedStrings.xml" is not required to exist.
  // For example, when the spreadsheet doesn't contain any strings.
  // https://github.com/catamphetamine/read-excel-file/issues/85
  // if (!filePaths.sharedStrings) {
  //   throw new Error('"sharedStrings.xml" file not found in the *.xlsx file')
  // }

  return filePaths;
}

function getFilePath(path) {
  // Normally, `path` is a relative path inside the ZIP archive,
  // like "worksheets/sheet1.xml", or "sharedStrings.xml", or "styles.xml".
  // There has been one weird case when file path was an absolute path,
  // like "/xl/worksheets/sheet1.xml" (specifically for sheets):
  // https://github.com/catamphetamine/read-excel-file/pull/95
  // Other libraries (like `xlsx`) and software (like Google Docs)
  // seem to support such absolute file paths, so this library does too.
  if (path[0] === '/') {
    return path.slice('/'.length);
  } // // Seems like a path could also be a URL.
  // // http://officeopenxml.com/anatomyofOOXML-xlsx.php
  // if (/^[a-z]+\:\/\//.test(path)) {
  //   return path
  // }


  return 'xl/' + path;
}
//# sourceMappingURL=parseFilePaths.js.map

/***/ }),

/***/ "./node_modules/read-excel-file/modules/read/parseProperties.js":
/*!**********************************************************************!*\
  !*** ./node_modules/read-excel-file/modules/read/parseProperties.js ***!
  \**********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return parseProperties; });
/* harmony import */ var _xml_xlsx_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../xml/xlsx.js */ "./node_modules/read-excel-file/modules/xml/xlsx.js");
 // I guess `xl/workbook.xml` file should always be present inside the *.xlsx archive.

function parseProperties(content, xml) {
  var book = xml.createDocument(content);
  var properties = {}; // Read `<workbookPr/>` element to detect whether dates are 1900-based or 1904-based.
  // https://support.microsoft.com/en-gb/help/214330/differences-between-the-1900-and-the-1904-date-system-in-excel
  // http://webapp.docx4java.org/OnlineDemo/ecma376/SpreadsheetML/workbookPr.html

  var workbookProperties = Object(_xml_xlsx_js__WEBPACK_IMPORTED_MODULE_0__["getWorkbookProperties"])(book);

  if (workbookProperties && workbookProperties.getAttribute('date1904') === '1') {
    properties.epoch1904 = true;
  } // Get sheets info (indexes, names, if they're available).
  // Example:
  // <sheets>
  //   <sheet
  //     xmlns:ns="http://schemas.openxmlformats.org/officeDocument/2006/relationships"
  //     name="Sheet1"
  //     sheetId="1"
  //     ns:id="rId3"/>
  // </sheets>
  // http://www.datypic.com/sc/ooxml/e-ssml_sheet-1.html


  properties.sheets = [];

  var addSheetInfo = function addSheetInfo(sheet) {
    if (sheet.getAttribute('name')) {
      properties.sheets.push({
        id: sheet.getAttribute('sheetId'),
        name: sheet.getAttribute('name'),
        relationId: sheet.getAttribute('r:id')
      });
    }
  };

  Object(_xml_xlsx_js__WEBPACK_IMPORTED_MODULE_0__["getSheets"])(book).forEach(addSheetInfo);
  return properties;
}
//# sourceMappingURL=parseProperties.js.map

/***/ }),

/***/ "./node_modules/read-excel-file/modules/read/parseSharedStrings.js":
/*!*************************************************************************!*\
  !*** ./node_modules/read-excel-file/modules/read/parseSharedStrings.js ***!
  \*************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return parseSharedStrings; });
/* harmony import */ var _xml_xlsx_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../xml/xlsx.js */ "./node_modules/read-excel-file/modules/xml/xlsx.js");

function parseSharedStrings(content, xml) {
  if (!content) {
    return [];
  }

  return Object(_xml_xlsx_js__WEBPACK_IMPORTED_MODULE_0__["getSharedStrings"])(xml.createDocument(content));
}
//# sourceMappingURL=parseSharedStrings.js.map

/***/ }),

/***/ "./node_modules/read-excel-file/modules/read/parseSheet.js":
/*!*****************************************************************!*\
  !*** ./node_modules/read-excel-file/modules/read/parseSheet.js ***!
  \*****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return parseSheet; });
/* harmony import */ var _parseCells_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./parseCells.js */ "./node_modules/read-excel-file/modules/read/parseCells.js");
/* harmony import */ var _parseDimensions_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./parseDimensions.js */ "./node_modules/read-excel-file/modules/read/parseDimensions.js");
/* harmony import */ var _coordinates_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./coordinates.js */ "./node_modules/read-excel-file/modules/read/coordinates.js");



function parseSheet(content, xml, values, styles, properties, options) {
  var sheet = xml.createDocument(content);
  var cells = Object(_parseCells_js__WEBPACK_IMPORTED_MODULE_0__["default"])(sheet, xml, values, styles, properties, options); // `dimensions` defines the spreadsheet area containing all non-empty cells.
  // https://docs.microsoft.com/en-us/dotnet/api/documentformat.openxml.spreadsheet.sheetdimension?view=openxml-2.8.1

  var dimensions = Object(_parseDimensions_js__WEBPACK_IMPORTED_MODULE_1__["default"])(sheet) || Object(_coordinates_js__WEBPACK_IMPORTED_MODULE_2__["calculateDimensions"])(cells);
  return {
    cells: cells,
    dimensions: dimensions
  };
}
//# sourceMappingURL=parseSheet.js.map

/***/ }),

/***/ "./node_modules/read-excel-file/modules/read/parseStyles.js":
/*!******************************************************************!*\
  !*** ./node_modules/read-excel-file/modules/read/parseStyles.js ***!
  \******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return parseStyles; });
/* harmony import */ var _xml_xlsx_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../xml/xlsx.js */ "./node_modules/read-excel-file/modules/xml/xlsx.js");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

 // http://officeopenxml.com/SSstyles.php
// Returns an array of cell styles.
// A cell style index is its ID.

function parseStyles(content, xml) {
  if (!content) {
    return {};
  } // https://social.msdn.microsoft.com/Forums/sqlserver/en-US/708978af-b598-45c4-a598-d3518a5a09f0/howwhen-is-cellstylexfs-vs-cellxfs-applied-to-a-cell?forum=os_binaryfile
  // https://www.office-forums.com/threads/cellxfs-cellstylexfs.2163519/


  var doc = xml.createDocument(content);
  var baseStyles = Object(_xml_xlsx_js__WEBPACK_IMPORTED_MODULE_0__["getBaseStyles"])(doc).map(parseCellStyle);
  var numberFormats = Object(_xml_xlsx_js__WEBPACK_IMPORTED_MODULE_0__["getNumberFormats"])(doc).map(parseNumberFormatStyle).reduce(function (formats, format) {
    // Format ID is a numeric index.
    // There're some standard "built-in" formats (in Excel) up to about `100`.
    formats[format.id] = format;
    return formats;
  }, []);

  var getCellStyle = function getCellStyle(xf) {
    if (xf.hasAttribute('xfId')) {
      return _objectSpread(_objectSpread({}, baseStyles[xf.xfId]), parseCellStyle(xf, numberFormats));
    }

    return parseCellStyle(xf, numberFormats);
  };

  return Object(_xml_xlsx_js__WEBPACK_IMPORTED_MODULE_0__["getCellStyles"])(doc).map(getCellStyle);
}

function parseNumberFormatStyle(numFmt) {
  return {
    id: numFmt.getAttribute('numFmtId'),
    template: numFmt.getAttribute('formatCode')
  };
} // http://www.datypic.com/sc/ooxml/e-ssml_xf-2.html


function parseCellStyle(xf, numFmts) {
  var style = {};

  if (xf.hasAttribute('numFmtId')) {
    var numberFormatId = xf.getAttribute('numFmtId'); // Built-in number formats don't have a `<numFmt/>` element in `styles.xml`.
    // https://hexdocs.pm/xlsxir/number_styles.html

    if (numFmts[numberFormatId]) {
      style.numberFormat = numFmts[numberFormatId];
    } else {
      style.numberFormat = {
        id: numberFormatId
      };
    }
  }

  return style;
}
//# sourceMappingURL=parseStyles.js.map

/***/ }),

/***/ "./node_modules/read-excel-file/modules/read/readSheetNamesBrowser.js":
/*!****************************************************************************!*\
  !*** ./node_modules/read-excel-file/modules/read/readSheetNamesBrowser.js ***!
  \****************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return readSheetNames; });
/* harmony import */ var _readXlsxFileBrowser_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./readXlsxFileBrowser.js */ "./node_modules/read-excel-file/modules/read/readXlsxFileBrowser.js");

/**
 * Reads the list of sheet names in an XLSX file in a web browser.
 * @param  {file} file - A file being uploaded in the browser.
 * @return {Promise} Resolves to an array of objects of shape `{ name: string }`.
 */

function readSheetNames(file) {
  return Object(_readXlsxFileBrowser_js__WEBPACK_IMPORTED_MODULE_0__["default"])(file, {
    getSheets: true
  }).then(function (sheets) {
    return sheets.map(function (sheet) {
      return sheet.name;
    });
  });
}
//# sourceMappingURL=readSheetNamesBrowser.js.map

/***/ }),

/***/ "./node_modules/read-excel-file/modules/read/readXlsx.js":
/*!***************************************************************!*\
  !*** ./node_modules/read-excel-file/modules/read/readXlsx.js ***!
  \***************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return readXlsx; });
/* harmony import */ var _parseProperties_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./parseProperties.js */ "./node_modules/read-excel-file/modules/read/parseProperties.js");
/* harmony import */ var _parseFilePaths_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./parseFilePaths.js */ "./node_modules/read-excel-file/modules/read/parseFilePaths.js");
/* harmony import */ var _parseStyles_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./parseStyles.js */ "./node_modules/read-excel-file/modules/read/parseStyles.js");
/* harmony import */ var _parseSharedStrings_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./parseSharedStrings.js */ "./node_modules/read-excel-file/modules/read/parseSharedStrings.js");
/* harmony import */ var _parseSheet_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./parseSheet.js */ "./node_modules/read-excel-file/modules/read/parseSheet.js");
/* harmony import */ var _getData_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./getData.js */ "./node_modules/read-excel-file/modules/read/getData.js");
function _createForOfIteratorHelperLoose(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (it) return (it = it.call(o)).next.bind(it); if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; return function () { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }






 // For an introduction in reading `*.xlsx` files see "The minimum viable XLSX reader":
// https://www.brendanlong.com/the-minimum-viable-xlsx-reader.html

/**
 * Reads an (unzipped) XLSX file structure into a 2D array of cells.
 * @param  {object} contents - A list of XML files inside XLSX file (which is a zipped directory).
 * @param  {number?} options.sheet - Workbook sheet id (`1` by default).
 * @param  {string?} options.dateFormat - Date format, e.g. "mm/dd/yyyy". Values having this format template set will be parsed as dates.
 * @param  {object} contents - A list of XML files inside XLSX file (which is a zipped directory).
 * @return {object} An object of shape `{ data, cells, properties }`. `data: string[][]` is an array of rows, each row being an array of cell values. `cells: string[][]` is an array of rows, each row being an array of cells. `properties: object` is the spreadsheet properties (e.g. whether date epoch is 1904 instead of 1900).
 */

function readXlsx(contents, xml) {
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  if (!options.sheet) {
    options = _objectSpread({
      sheet: 1
    }, options);
  }

  var getXmlFileContent = function getXmlFileContent(filePath) {
    if (!contents[filePath]) {
      throw new Error("\"".concat(filePath, "\" file not found inside the *.xlsx file zip archive"));
    }

    return contents[filePath];
  }; // Some Excel editors don't want to use standard naming scheme for sheet files.
  // https://github.com/tidyverse/readxl/issues/104


  var filePaths = Object(_parseFilePaths_js__WEBPACK_IMPORTED_MODULE_1__["default"])(getXmlFileContent('xl/_rels/workbook.xml.rels'), xml); // Default file path for "shared strings": "xl/sharedStrings.xml".

  var values = filePaths.sharedStrings ? Object(_parseSharedStrings_js__WEBPACK_IMPORTED_MODULE_3__["default"])(getXmlFileContent(filePaths.sharedStrings), xml) : []; // Default file path for "styles": "xl/styles.xml".

  var styles = filePaths.styles ? Object(_parseStyles_js__WEBPACK_IMPORTED_MODULE_2__["default"])(getXmlFileContent(filePaths.styles), xml) : {};
  var properties = Object(_parseProperties_js__WEBPACK_IMPORTED_MODULE_0__["default"])(getXmlFileContent('xl/workbook.xml'), xml); // A feature for getting the list of sheets in an Excel file.
  // https://github.com/catamphetamine/read-excel-file/issues/14

  if (options.getSheets) {
    return properties.sheets.map(function (_ref) {
      var name = _ref.name;
      return {
        name: name
      };
    });
  } // Find the sheet by name, or take the first one.


  var sheetId = getSheetId(options.sheet, properties.sheets); // If the sheet wasn't found then throw an error.
  // Example: "xl/worksheets/sheet1.xml".

  if (!sheetId || !filePaths.sheets[sheetId]) {
    throw createSheetNotFoundError(options.sheet, properties.sheets);
  } // Parse sheet data.


  var sheet = Object(_parseSheet_js__WEBPACK_IMPORTED_MODULE_4__["default"])(getXmlFileContent(filePaths.sheets[sheetId]), xml, values, styles, properties, options); // Get spreadsheet data.

  var data = Object(_getData_js__WEBPACK_IMPORTED_MODULE_5__["default"])(sheet, options); // Can return properties, if required.

  if (options.properties) {
    return {
      data: data,
      properties: properties
    };
  } // Return spreadsheet data.


  return data;
}

function getSheetId(sheet, sheets) {
  if (typeof sheet === 'number') {
    var _sheet = sheets[sheet - 1];
    return _sheet && _sheet.relationId;
  }

  for (var _iterator = _createForOfIteratorHelperLoose(sheets), _step; !(_step = _iterator()).done;) {
    var _sheet2 = _step.value;

    if (_sheet2.name === sheet) {
      return _sheet2.relationId;
    }
  }
}

function createSheetNotFoundError(sheet, sheets) {
  var sheetsList = sheets && sheets.map(function (sheet, i) {
    return "\"".concat(sheet.name, "\" (#").concat(i + 1, ")");
  }).join(', ');
  return new Error("Sheet ".concat(typeof sheet === 'number' ? '#' + sheet : '"' + sheet + '"', " not found in the *.xlsx file.").concat(sheets ? ' Available sheets: ' + sheetsList + '.' : ''));
}
//# sourceMappingURL=readXlsx.js.map

/***/ }),

/***/ "./node_modules/read-excel-file/modules/read/readXlsxFileBrowser.js":
/*!**************************************************************************!*\
  !*** ./node_modules/read-excel-file/modules/read/readXlsxFileBrowser.js ***!
  \**************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return readXlsxFile; });
/* harmony import */ var _xml_xmlBrowser_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../xml/xmlBrowser.js */ "./node_modules/read-excel-file/modules/xml/xmlBrowser.js");
/* harmony import */ var _unpackXlsxFileBrowser_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./unpackXlsxFileBrowser.js */ "./node_modules/read-excel-file/modules/read/unpackXlsxFileBrowser.js");
/* harmony import */ var _readXlsxFileContents_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./readXlsxFileContents.js */ "./node_modules/read-excel-file/modules/read/readXlsxFileContents.js");



/**
 * Reads XLSX file into a 2D array of cells in a browser.
 * @param  {file} file - A file being uploaded in the browser.
 * @param  {object?} options
 * @param  {(number|string)?} options.sheet - Excel document sheet to read. Defaults to `1`. Will only read this sheet and skip others.
 * @return {Promise} Resolves to a 2D array of cells: an array of rows, each row being an array of cells.
 */

function readXlsxFile(file) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  return Object(_unpackXlsxFileBrowser_js__WEBPACK_IMPORTED_MODULE_1__["default"])(file).then(function (entries) {
    return Object(_readXlsxFileContents_js__WEBPACK_IMPORTED_MODULE_2__["default"])(entries, _xml_xmlBrowser_js__WEBPACK_IMPORTED_MODULE_0__["default"], options);
  });
}
//# sourceMappingURL=readXlsxFileBrowser.js.map

/***/ }),

/***/ "./node_modules/read-excel-file/modules/read/readXlsxFileContents.js":
/*!***************************************************************************!*\
  !*** ./node_modules/read-excel-file/modules/read/readXlsxFileContents.js ***!
  \***************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return readXlsxFileContents; });
/* harmony import */ var _readXlsx_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./readXlsx.js */ "./node_modules/read-excel-file/modules/read/readXlsx.js");
/* harmony import */ var _schema_convertToJson_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./schema/convertToJson.js */ "./node_modules/read-excel-file/modules/read/schema/convertToJson.js");
/* harmony import */ var _schema_convertMapToSchema_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./schema/convertMapToSchema.js */ "./node_modules/read-excel-file/modules/read/schema/convertMapToSchema.js");
var _excluded = ["schema", "map"];

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }




function readXlsxFileContents(entries, xml, _ref) {
  var schema = _ref.schema,
      map = _ref.map,
      options = _objectWithoutProperties(_ref, _excluded);

  if (!schema && map) {
    schema = Object(_schema_convertMapToSchema_js__WEBPACK_IMPORTED_MODULE_2__["default"])(map);
  }

  var result = Object(_readXlsx_js__WEBPACK_IMPORTED_MODULE_0__["default"])(entries, xml, _objectSpread(_objectSpread({}, options), {}, {
    properties: schema || options.properties
  }));

  if (schema) {
    return Object(_schema_convertToJson_js__WEBPACK_IMPORTED_MODULE_1__["default"])(result.data, schema, _objectSpread(_objectSpread({}, options), {}, {
      properties: result.properties
    }));
  }

  return result;
}
//# sourceMappingURL=readXlsxFileContents.js.map

/***/ }),

/***/ "./node_modules/read-excel-file/modules/read/schema/convertMapToSchema.js":
/*!********************************************************************************!*\
  !*** ./node_modules/read-excel-file/modules/read/schema/convertMapToSchema.js ***!
  \********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return convertMapToSchema; });
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function convertMapToSchema(map) {
  var schema = {};

  for (var _i = 0, _Object$keys = Object.keys(map); _i < _Object$keys.length; _i++) {
    var key = _Object$keys[_i];
    var prop = map[key];
    var type = void 0;

    if (_typeof(prop) === 'object') {
      prop = Object.keys(map[key])[0];
      type = convertMapToSchema(map[key][prop]);
    }

    schema[key] = {
      prop: prop
    };

    if (type) {
      schema[key].type = type;
    }
  }

  return schema;
}
//# sourceMappingURL=convertMapToSchema.js.map

/***/ }),

/***/ "./node_modules/read-excel-file/modules/read/schema/convertToJson.js":
/*!***************************************************************************!*\
  !*** ./node_modules/read-excel-file/modules/read/schema/convertToJson.js ***!
  \***************************************************************************/
/*! exports provided: default, parseValue, getBlock, parseArray */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "parseValue", function() { return parseValue; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getBlock", function() { return getBlock; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "parseArray", function() { return parseArray; });
/* harmony import */ var _types_Number_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../types/Number.js */ "./node_modules/read-excel-file/modules/types/Number.js");
/* harmony import */ var _types_String_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../types/String.js */ "./node_modules/read-excel-file/modules/types/String.js");
/* harmony import */ var _types_Boolean_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../types/Boolean.js */ "./node_modules/read-excel-file/modules/types/Boolean.js");
/* harmony import */ var _types_Date_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../types/Date.js */ "./node_modules/read-excel-file/modules/types/Date.js");
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _createForOfIteratorHelperLoose(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (it) return (it = it.call(o)).next.bind(it); if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; return function () { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }





var DEFAULT_OPTIONS = {
  isColumnOriented: false
};
/**
 * Convert 2D array to nested objects.
 * If row oriented data, row 0 is dotted key names.
 * Column oriented data is transposed.
 * @param {any[][]} data - An array of rows, each row being an array of cells.
 * @param {object} schema
 * @return {object[]}
 */

/* harmony default export */ __webpack_exports__["default"] = (function (data, schema, options) {
  if (options) {
    options = _objectSpread(_objectSpread({}, DEFAULT_OPTIONS), options);
  } else {
    options = DEFAULT_OPTIONS;
  }

  var _options = options,
      isColumnOriented = _options.isColumnOriented,
      rowMap = _options.rowMap,
      ignoreEmptyRows = _options.ignoreEmptyRows;
  validateSchema(schema);

  if (isColumnOriented) {
    data = transpose(data);
  }

  var columns = data[0];
  var results = [];
  var errors = [];

  for (var i = 1; i < data.length; i++) {
    var result = read(schema, data[i], i, columns, errors, options);

    if (result !== null || ignoreEmptyRows === false) {
      results.push(result);
    }
  } // Correct error rows.


  if (rowMap) {
    for (var _iterator = _createForOfIteratorHelperLoose(errors), _step; !(_step = _iterator()).done;) {
      var error = _step.value;
      // Convert the `row` index in `data` to the
      // actual `row` index in the spreadsheet.
      // `- 1` converts row number to row index.
      // `+ 1` converts row index to row number.
      error.row = rowMap[error.row - 1] + 1;
    }
  }

  return {
    rows: results,
    errors: errors
  };
});

function read(schema, row, rowIndex, columns, errors, options) {
  var object = {};
  var isEmptyObject = true;

  var createError = function createError(_ref) {
    var column = _ref.column,
        value = _ref.value,
        errorMessage = _ref.error,
        reason = _ref.reason;
    var error = {
      error: errorMessage,
      row: rowIndex + 1,
      column: column,
      value: value
    };

    if (reason) {
      error.reason = reason;
    }

    if (schema[column].type) {
      error.type = schema[column].type;
    }

    return error;
  };

  var pendingRequiredChecks = [];

  var _loop = function _loop() {
    var key = _Object$keys[_i];
    var schemaEntry = schema[key];
    var isNestedSchema = _typeof(schemaEntry.type) === 'object' && !Array.isArray(schemaEntry.type);
    var rawValue = row[columns.indexOf(key)];

    if (rawValue === undefined) {
      rawValue = null;
    }

    var value = void 0;
    var error = void 0;
    var reason = void 0;

    if (isNestedSchema) {
      value = read(schemaEntry.type, row, rowIndex, columns, errors, options);
    } else {
      if (rawValue === null) {
        value = null;
      } else if (Array.isArray(schemaEntry.type)) {
        var notEmpty = false;
        var array = parseArray(rawValue).map(function (_value) {
          var result = parseValue(_value, schemaEntry, options);

          if (result.error) {
            value = _value;
            error = result.error;
            reason = result.reason;
          }

          if (result.value !== null) {
            notEmpty = true;
          }

          return result.value;
        });

        if (!error) {
          value = notEmpty ? array : null;
        }
      } else {
        var result = parseValue(rawValue, schemaEntry, options);
        error = result.error;
        reason = result.reason;
        value = error ? rawValue : result.value;
      }
    }

    if (!error && value === null) {
      if (typeof schemaEntry.required === 'function') {
        pendingRequiredChecks.push({
          column: key
        });
      } else if (schemaEntry.required === true) {
        error = 'required';
      }
    }

    if (error) {
      errors.push(createError({
        column: key,
        value: value,
        error: error,
        reason: reason
      }));
    } else {
      if (isEmptyObject && value !== null) {
        isEmptyObject = false;
      }

      if (value !== null || options.includeNullValues) {
        object[schemaEntry.prop] = value;
      }
    }
  };

  for (var _i = 0, _Object$keys = Object.keys(schema); _i < _Object$keys.length; _i++) {
    _loop();
  }

  if (isEmptyObject) {
    return null;
  }

  for (var _i2 = 0, _pendingRequiredCheck = pendingRequiredChecks; _i2 < _pendingRequiredCheck.length; _i2++) {
    var column = _pendingRequiredCheck[_i2].column;
    var required = schema[column].required(object);

    if (required) {
      errors.push(createError({
        column: column,
        value: null,
        error: 'required'
      }));
    }
  }

  return object;
}
/**
 * Converts textual value to a javascript typed value.
 * @param  {any} value
 * @param  {object} schemaEntry
 * @return {{ value: any, error: string }}
 */


function parseValue(value, schemaEntry, options) {
  if (value === null) {
    return {
      value: null
    };
  }

  var result;

  if (schemaEntry.parse) {
    result = parseCustomValue(value, schemaEntry.parse);
  } else if (schemaEntry.type) {
    result = parseValueOfType(value, // Supports parsing array types.
    // See `parseArray()` function for more details.
    // Example `type`: String[]
    // Input: 'Barack Obama, "String, with, colons", Donald Trump'
    // Output: ['Barack Obama', 'String, with, colons', 'Donald Trump']
    Array.isArray(schemaEntry.type) ? schemaEntry.type[0] : schemaEntry.type, options);
  } else {
    result = {
      value: value
    }; // throw new Error('Invalid schema entry: no .type and no .parse():\n\n' + JSON.stringify(schemaEntry, null, 2))
  } // If errored then return the error.


  if (result.error) {
    return result;
  }

  if (result.value !== null) {
    if (schemaEntry.oneOf && schemaEntry.oneOf.indexOf(result.value) < 0) {
      return {
        error: 'invalid',
        reason: 'unknown'
      };
    }

    if (schemaEntry.validate) {
      try {
        schemaEntry.validate(result.value);
      } catch (error) {
        return {
          error: error.message
        };
      }
    }
  }

  return result;
}
/**
 * Converts textual value to a custom value using supplied `.parse()`.
 * @param  {any} value
 * @param  {function} parse
 * @return {{ value: any, error: string }}
 */

function parseCustomValue(value, parse) {
  try {
    value = parse(value);

    if (value === undefined) {
      return {
        value: null
      };
    }

    return {
      value: value
    };
  } catch (error) {
    var result = {
      error: error.message
    };

    if (error.reason) {
      result.reason = error.reason;
    }

    return result;
  }
}
/**
 * Converts textual value to a javascript typed value.
 * @param  {any} value
 * @param  {} type
 * @return {{ value: (string|number|Date|boolean), error: string, reason?: string }}
 */


function parseValueOfType(value, type, options) {
  switch (type) {
    case String:
      return parseCustomValue(value, _types_String_js__WEBPACK_IMPORTED_MODULE_1__["default"]);

    case Number:
      return parseCustomValue(value, _types_Number_js__WEBPACK_IMPORTED_MODULE_0__["default"]);

    case Date:
      return parseCustomValue(value, function (value) {
        return Object(_types_Date_js__WEBPACK_IMPORTED_MODULE_3__["default"])(value, {
          properties: options.properties
        });
      });

    case Boolean:
      return parseCustomValue(value, _types_Boolean_js__WEBPACK_IMPORTED_MODULE_2__["default"]);

    default:
      if (typeof type === 'function') {
        return parseCustomValue(value, type);
      }

      throw new Error("Unsupported schema type: ".concat(type && type.name || type));
  }
}

function getBlock(string, endCharacter, startIndex) {
  var i = 0;
  var substring = '';
  var character;

  while (startIndex + i < string.length) {
    var _character = string[startIndex + i];

    if (_character === endCharacter) {
      return [substring, i];
    } else if (_character === '"') {
      var block = getBlock(string, '"', startIndex + i + 1);
      substring += block[0];
      i += '"'.length + block[1] + '"'.length;
    } else {
      substring += _character;
      i++;
    }
  }

  return [substring, i];
}
/**
 * Parses a string of comma-separated substrings into an array of substrings.
 * (the `export` is just for tests)
 * @param  {string} string — A string of comma-separated substrings.
 * @return {string[]} An array of substrings.
 */

function parseArray(string) {
  var blocks = [];
  var index = 0;

  while (index < string.length) {
    var _getBlock = getBlock(string, ',', index),
        _getBlock2 = _slicedToArray(_getBlock, 2),
        substring = _getBlock2[0],
        length = _getBlock2[1];

    index += length + ','.length;
    blocks.push(substring.trim());
  }

  return blocks;
} // Transpose a 2D array.
// https://stackoverflow.com/questions/17428587/transposing-a-2d-array-in-javascript

var transpose = function transpose(array) {
  return array[0].map(function (_, i) {
    return array.map(function (row) {
      return row[i];
    });
  });
};

function validateSchema(schema) {
  for (var _i3 = 0, _Object$keys2 = Object.keys(schema); _i3 < _Object$keys2.length; _i3++) {
    var key = _Object$keys2[_i3];
    var entry = schema[key];

    if (!entry.prop) {
      throw new Error("\"prop\" not defined for schema entry \"".concat(key, "\"."));
    }
  }
}
//# sourceMappingURL=convertToJson.js.map

/***/ }),

/***/ "./node_modules/read-excel-file/modules/read/unpackXlsxFileBrowser.js":
/*!****************************************************************************!*\
  !*** ./node_modules/read-excel-file/modules/read/unpackXlsxFileBrowser.js ***!
  \****************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return unpackXlsxFile; });
/* harmony import */ var fflate__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! fflate */ "./node_modules/fflate/esm/browser.js");

/**
 * Reads XLSX file in a browser.
 * @param  {(File|Blob|ArrayBuffer)} input - A `File` or an `ArrayBuffer`.
 * @return {Promise} Resolves to an object holding XLSX file entries.
 */

function unpackXlsxFile(input) {
  if (input instanceof File) {
    return input.arrayBuffer().then(unpackXlsxArrayBuffer);
  }

  if (input instanceof Blob) {
    return input.arrayBuffer().then(unpackXlsxArrayBuffer);
  }

  return unpackXlsxArrayBuffer(input);
}
/**
 * Reads XLSX file in a browser from an `ArrayBuffer`.
 * @param  {ArrayBuffer} input
 * @return {Promise} Resolves to an object holding XLSX file entries.
 */

function unpackXlsxArrayBuffer(arrayBuffer) {
  var archive = new Uint8Array(arrayBuffer);
  var contents = Object(fflate__WEBPACK_IMPORTED_MODULE_0__["unzipSync"])(archive);
  return Promise.resolve(getContents(contents)); // return new Promise((resolve, reject) => {
  // 	unzip(archive, (error, contents) => {
  // 		if (error) {
  // 			return reject(error)
  // 		}
  // 		return resolve(getContents(contents))
  // 	})
  // })
}

function getContents(contents) {
  var unzippedFiles = [];

  for (var _i = 0, _Object$keys = Object.keys(contents); _i < _Object$keys.length; _i++) {
    var key = _Object$keys[_i];
    unzippedFiles[key] = Object(fflate__WEBPACK_IMPORTED_MODULE_0__["strFromU8"])(contents[key]);
  }

  return unzippedFiles;
}
//# sourceMappingURL=unpackXlsxFileBrowser.js.map

/***/ }),

/***/ "./node_modules/read-excel-file/modules/types/Boolean.js":
/*!***************************************************************!*\
  !*** ./node_modules/read-excel-file/modules/types/Boolean.js ***!
  \***************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return BooleanType; });
/* harmony import */ var _InvalidError_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./InvalidError.js */ "./node_modules/read-excel-file/modules/types/InvalidError.js");

function BooleanType(value) {
  if (typeof value === 'boolean') {
    return value;
  }

  throw new _InvalidError_js__WEBPACK_IMPORTED_MODULE_0__["default"]('not_a_boolean');
}
//# sourceMappingURL=Boolean.js.map

/***/ }),

/***/ "./node_modules/read-excel-file/modules/types/Date.js":
/*!************************************************************!*\
  !*** ./node_modules/read-excel-file/modules/types/Date.js ***!
  \************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return DateType; });
/* harmony import */ var _read_parseDate_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../read/parseDate.js */ "./node_modules/read-excel-file/modules/read/parseDate.js");
/* harmony import */ var _InvalidError_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./InvalidError.js */ "./node_modules/read-excel-file/modules/types/InvalidError.js");


function DateType(value, _ref) {
  var properties = _ref.properties;

  // XLSX has no specific format for dates.
  // Sometimes a date can be heuristically detected.
  // https://github.com/catamphetamine/read-excel-file/issues/3#issuecomment-395770777
  if (value instanceof Date) {
    if (isNaN(value.valueOf())) {
      throw new _InvalidError_js__WEBPACK_IMPORTED_MODULE_1__["default"]('out_of_bounds');
    }

    return value;
  }

  if (typeof value === 'number') {
    if (isNaN(value)) {
      throw new _InvalidError_js__WEBPACK_IMPORTED_MODULE_1__["default"]('invalid_number');
    }

    if (!isFinite(value)) {
      throw new _InvalidError_js__WEBPACK_IMPORTED_MODULE_1__["default"]('out_of_bounds');
    }

    var date = Object(_read_parseDate_js__WEBPACK_IMPORTED_MODULE_0__["default"])(value, properties);

    if (isNaN(date.valueOf())) {
      throw new _InvalidError_js__WEBPACK_IMPORTED_MODULE_1__["default"]('out_of_bounds');
    }

    return date;
  }

  throw new _InvalidError_js__WEBPACK_IMPORTED_MODULE_1__["default"]('not_a_date');
}
//# sourceMappingURL=Date.js.map

/***/ }),

/***/ "./node_modules/read-excel-file/modules/types/Email.js":
/*!*************************************************************!*\
  !*** ./node_modules/read-excel-file/modules/types/Email.js ***!
  \*************************************************************/
/*! exports provided: default, isEmail */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Email; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isEmail", function() { return isEmail; });
/* harmony import */ var _InvalidError_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./InvalidError.js */ "./node_modules/read-excel-file/modules/types/InvalidError.js");

function Email(value) {
  if (typeof value === 'string') {
    if (isEmail(value)) {
      return value;
    }

    throw new _InvalidError_js__WEBPACK_IMPORTED_MODULE_0__["default"]('not_an_email');
  }

  throw new _InvalidError_js__WEBPACK_IMPORTED_MODULE_0__["default"]('not_a_string');
}
var regexp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
function isEmail(value) {
  return regexp.test(value);
}
//# sourceMappingURL=Email.js.map

/***/ }),

/***/ "./node_modules/read-excel-file/modules/types/Integer.js":
/*!***************************************************************!*\
  !*** ./node_modules/read-excel-file/modules/types/Integer.js ***!
  \***************************************************************/
/*! exports provided: default, isInteger */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Integer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isInteger", function() { return isInteger; });
/* harmony import */ var _InvalidError_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./InvalidError.js */ "./node_modules/read-excel-file/modules/types/InvalidError.js");
/* harmony import */ var _Number_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Number.js */ "./node_modules/read-excel-file/modules/types/Number.js");


function Integer(value) {
  value = Object(_Number_js__WEBPACK_IMPORTED_MODULE_1__["default"])(value);

  if (!isInteger(value)) {
    throw new _InvalidError_js__WEBPACK_IMPORTED_MODULE_0__["default"]('not_an_integer');
  }

  return value;
}
function isInteger(x) {
  // https://stackoverflow.com/questions/14636536/how-to-check-if-a-variable-is-an-integer-in-javascript
  return (x | 0) === x;
}
//# sourceMappingURL=Integer.js.map

/***/ }),

/***/ "./node_modules/read-excel-file/modules/types/InvalidError.js":
/*!********************************************************************!*\
  !*** ./node_modules/read-excel-file/modules/types/InvalidError.js ***!
  \********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return InvalidError; });
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _wrapNativeSuper(Class) { var _cache = typeof Map === "function" ? new Map() : undefined; _wrapNativeSuper = function _wrapNativeSuper(Class) { if (Class === null || !_isNativeFunction(Class)) return Class; if (typeof Class !== "function") { throw new TypeError("Super expression must either be null or a function"); } if (typeof _cache !== "undefined") { if (_cache.has(Class)) return _cache.get(Class); _cache.set(Class, Wrapper); } function Wrapper() { return _construct(Class, arguments, _getPrototypeOf(this).constructor); } Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } }); return _setPrototypeOf(Wrapper, Class); }; return _wrapNativeSuper(Class); }

function _construct(Parent, args, Class) { if (_isNativeReflectConstruct()) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _isNativeFunction(fn) { return Function.toString.call(fn).indexOf("[native code]") !== -1; }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var InvalidError = /*#__PURE__*/function (_Error) {
  _inherits(InvalidError, _Error);

  var _super = _createSuper(InvalidError);

  function InvalidError(reason) {
    var _this;

    _classCallCheck(this, InvalidError);

    _this = _super.call(this, 'invalid');
    _this.reason = reason;
    return _this;
  }

  return _createClass(InvalidError);
}( /*#__PURE__*/_wrapNativeSuper(Error));


//# sourceMappingURL=InvalidError.js.map

/***/ }),

/***/ "./node_modules/read-excel-file/modules/types/Number.js":
/*!**************************************************************!*\
  !*** ./node_modules/read-excel-file/modules/types/Number.js ***!
  \**************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return NumberType; });
/* harmony import */ var _InvalidError_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./InvalidError.js */ "./node_modules/read-excel-file/modules/types/InvalidError.js");

function NumberType(value) {
  // An XLSX file editing software might not always correctly
  // detect numeric values in string-type cells. Users won't bother
  // manually selecting a cell type, so the editing software has to guess
  // based on the user's input. One can assume that such auto-detection
  // might not always work.
  //
  // So, if a cell is supposed to be a numeric one, convert a string value to a number.
  //
  if (typeof value === 'string') {
    var stringifiedValue = value;
    value = Number(value);

    if (String(value) !== stringifiedValue) {
      throw new _InvalidError_js__WEBPACK_IMPORTED_MODULE_0__["default"]('not_a_number');
    }
  }

  if (typeof value !== 'number') {
    throw new _InvalidError_js__WEBPACK_IMPORTED_MODULE_0__["default"]('not_a_number');
  }

  if (isNaN(value)) {
    throw new _InvalidError_js__WEBPACK_IMPORTED_MODULE_0__["default"]('invalid_number');
  } // At this point, `value` can only be a number.
  //
  // The global `isFinite()` function filters out:
  // * NaN
  // * -Infinity
  // * Infinity
  //
  // All other values pass (including non-numbers).
  //


  if (!isFinite(value)) {
    throw new _InvalidError_js__WEBPACK_IMPORTED_MODULE_0__["default"]('out_of_bounds');
  }

  return value;
}
//# sourceMappingURL=Number.js.map

/***/ }),

/***/ "./node_modules/read-excel-file/modules/types/String.js":
/*!**************************************************************!*\
  !*** ./node_modules/read-excel-file/modules/types/String.js ***!
  \**************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return StringType; });
/* harmony import */ var _InvalidError_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./InvalidError.js */ "./node_modules/read-excel-file/modules/types/InvalidError.js");

function StringType(value) {
  if (typeof value === 'string') {
    return value;
  } // Excel tends to perform a forced automatic convertion of string-type values
  // to number-type ones when the user has input them. Otherwise, users wouldn't
  // be able to perform formula calculations on those cell values because users
  // won't bother manually choosing a "numeric" cell type for each cell, and
  // even if they did, choosing a "numeric" cell type every time wouldn't be an
  // acceptable "user experience".
  //
  // So, if a cell value is supposed to be a string and Excel has automatically
  // converted it to a number, perform a backwards conversion.
  //


  if (typeof value === 'number') {
    if (isNaN(value)) {
      throw new _InvalidError_js__WEBPACK_IMPORTED_MODULE_0__["default"]('invalid_number');
    } // The global `isFinite()` function filters out:
    // * NaN
    // * -Infinity
    // * Infinity
    //
    // All other values pass (including non-numbers).
    //


    if (!isFinite(value)) {
      throw new _InvalidError_js__WEBPACK_IMPORTED_MODULE_0__["default"]('out_of_bounds');
    }

    return String(value);
  }

  throw new _InvalidError_js__WEBPACK_IMPORTED_MODULE_0__["default"]('not_a_string');
}
//# sourceMappingURL=String.js.map

/***/ }),

/***/ "./node_modules/read-excel-file/modules/types/URL.js":
/*!***********************************************************!*\
  !*** ./node_modules/read-excel-file/modules/types/URL.js ***!
  \***********************************************************/
/*! exports provided: default, isURL */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return URL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isURL", function() { return isURL; });
/* harmony import */ var _InvalidError_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./InvalidError.js */ "./node_modules/read-excel-file/modules/types/InvalidError.js");

function URL(value) {
  if (typeof value === 'string') {
    if (isURL(value)) {
      return value;
    }

    throw new _InvalidError_js__WEBPACK_IMPORTED_MODULE_0__["default"]('not_a_url');
  }

  throw new _InvalidError_js__WEBPACK_IMPORTED_MODULE_0__["default"]('not_a_string');
} // URL regexp explanation:
//
// /^
//
// 	(?:
// 	  // Matches optional "http(s):" or "ftp:":
// 		(?:
// 			(?:https?|ftp):
// 		)?
//
// 	  // Matches "//" (required):
// 		\/\/
// 	)
//
// 	// Matches a valid non-local IP address:
// 	(?:
// 		(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])
// 		(?:
// 			\.
// 			(?:1?\d{1,2}|2[0-4]\d|25[0-5])
// 		){2}
// 		(?:
// 			\.
// 			(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4])
// 		)
//
// 	  // Or,
// 		|
//
// 	  // Matches an alpha-numeric domain name.
// 		(?:
// 			(?:
// 				[a-z0-9\u00a1-\uffff]
// 				[a-z0-9\u00a1-\uffff_-]{0,62}
// 			)?
// 			[a-z0-9\u00a1-\uffff]
// 			\.
// 		)*
// 		(?:
// 	    // Domain zone: "com", "net", etc (required):
// 			[a-z\u00a1-\uffff]{2,}
// 		)
// 	)
//
// 	// Matches a colon and a port number:
// 	(?::\d{2,5})?
//
// 	// Matches everything after the "origin":
// 	// * pathname
// 	// * query
// 	// * hash
// 	(?:[/?#]\S*)?
//
// $/i

var regexp = /^(?:(?:(?:https?|ftp):)?\/\/)(?:(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z0-9\u00a1-\uffff][a-z0-9\u00a1-\uffff_-]{0,62})?[a-z0-9\u00a1-\uffff]\.)*(?:[a-z\u00a1-\uffff]{2,}))(?::\d{2,5})?(?:[/?#]\S*)?$/i; // https://stackoverflow.com/questions/8667070/javascript-regular-expression-to-validate-url

function isURL(value) {
  return regexp.test(value);
}
//# sourceMappingURL=URL.js.map

/***/ }),

/***/ "./node_modules/read-excel-file/modules/xml/dom.js":
/*!*********************************************************!*\
  !*** ./node_modules/read-excel-file/modules/xml/dom.js ***!
  \*********************************************************/
/*! exports provided: findChild, findChildren, forEach, map, getTagName, getOuterXml */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "findChild", function() { return findChild; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "findChildren", function() { return findChildren; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "forEach", function() { return forEach; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "map", function() { return map; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getTagName", function() { return getTagName; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getOuterXml", function() { return getOuterXml; });
function findChild(node, tagName) {
  var i = 0;

  while (i < node.childNodes.length) {
    var childNode = node.childNodes[i]; // `nodeType: 1` means "Element".
    // https://www.w3schools.com/xml/prop_element_nodetype.asp

    if (childNode.nodeType === 1 && getTagName(childNode) === tagName) {
      return childNode;
    }

    i++;
  }
}
function findChildren(node, tagName) {
  var results = [];
  var i = 0;

  while (i < node.childNodes.length) {
    var childNode = node.childNodes[i]; // `nodeType: 1` means "Element".
    // https://www.w3schools.com/xml/prop_element_nodetype.asp

    if (childNode.nodeType === 1 && getTagName(childNode) === tagName) {
      results.push(childNode);
    }

    i++;
  }

  return results;
}
function forEach(node, tagName, func) {
  // if (typeof tagName === 'function') {
  // 	func = tagName
  // 	tagName = undefined
  // }
  var i = 0;

  while (i < node.childNodes.length) {
    var childNode = node.childNodes[i];

    if (tagName) {
      // `nodeType: 1` means "Element".
      // https://www.w3schools.com/xml/prop_element_nodetype.asp
      if (childNode.nodeType === 1 && getTagName(childNode) === tagName) {
        func(childNode, i);
      }
    } else {
      func(childNode, i);
    }

    i++;
  }
}
function map(node, tagName, func) {
  var results = [];
  forEach(node, tagName, function (node, i) {
    results.push(func(node, i));
  });
  return results;
}
var NAMESPACE_REG_EXP = /.+\:/;
function getTagName(element) {
  // For some weird reason, if an element is declared as,
  // for example, `<x:sheets/>`, then its `.tagName` will be
  // "x:sheets" instead of just "sheets".
  // https://gitlab.com/catamphetamine/read-excel-file/-/issues/25
  // Its not clear how to tell it to ignore any namespaces
  // when getting `.tagName`, so just replacing anything
  // before a colon, if any.
  return element.tagName.replace(NAMESPACE_REG_EXP, '');
} // This function is only used for occasional debug messages.

function getOuterXml(node) {
  // `nodeType: 1` means "Element".
  // https://www.w3schools.com/xml/prop_element_nodetype.asp
  if (node.nodeType !== 1) {
    return node.textContent;
  }

  var xml = '<' + getTagName(node);
  var j = 0;

  while (j < node.attributes.length) {
    xml += ' ' + node.attributes[j].name + '=' + '"' + node.attributes[j].value + '"';
    j++;
  }

  xml += '>';
  var i = 0;

  while (i < node.childNodes.length) {
    xml += getOuterXml(node.childNodes[i]);
    i++;
  }

  xml += '</' + getTagName(node) + '>';
  return xml;
}
//# sourceMappingURL=dom.js.map

/***/ }),

/***/ "./node_modules/read-excel-file/modules/xml/xlsx.js":
/*!**********************************************************!*\
  !*** ./node_modules/read-excel-file/modules/xml/xlsx.js ***!
  \**********************************************************/
/*! exports provided: getCells, getMergedCells, getCellValue, getCellInlineStringValue, getDimensions, getBaseStyles, getCellStyles, getNumberFormats, getSharedStrings, getWorkbookProperties, getRelationships, getSheets */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getCells", function() { return getCells; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getMergedCells", function() { return getMergedCells; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getCellValue", function() { return getCellValue; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getCellInlineStringValue", function() { return getCellInlineStringValue; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getDimensions", function() { return getDimensions; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getBaseStyles", function() { return getBaseStyles; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getCellStyles", function() { return getCellStyles; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getNumberFormats", function() { return getNumberFormats; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getSharedStrings", function() { return getSharedStrings; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getWorkbookProperties", function() { return getWorkbookProperties; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getRelationships", function() { return getRelationships; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getSheets", function() { return getSheets; });
/* harmony import */ var _dom_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dom.js */ "./node_modules/read-excel-file/modules/xml/dom.js");
 // Returns an array of cells,
// each element being an XML DOM element representing a cell.

function getCells(document) {
  var worksheet = document.documentElement;
  var sheetData = Object(_dom_js__WEBPACK_IMPORTED_MODULE_0__["findChild"])(worksheet, 'sheetData');
  var cells = [];
  Object(_dom_js__WEBPACK_IMPORTED_MODULE_0__["forEach"])(sheetData, 'row', function (row) {
    Object(_dom_js__WEBPACK_IMPORTED_MODULE_0__["forEach"])(row, 'c', function (cell) {
      cells.push(cell);
    });
  });
  return cells;
}
function getMergedCells(document) {
  var worksheet = document.documentElement;
  var mergedCells = Object(_dom_js__WEBPACK_IMPORTED_MODULE_0__["findChild"])(worksheet, 'mergeCells');
  var mergedCellsInfo = [];

  if (mergedCells) {
    Object(_dom_js__WEBPACK_IMPORTED_MODULE_0__["forEach"])(mergedCells, 'mergeCell', function (mergedCell) {
      mergedCellsInfo.push(mergedCell.getAttribute('ref'));
    });
  }

  return mergedCellsInfo;
}
function getCellValue(document, node) {
  return Object(_dom_js__WEBPACK_IMPORTED_MODULE_0__["findChild"])(node, 'v');
}
function getCellInlineStringValue(document, node) {
  if (node.firstChild && Object(_dom_js__WEBPACK_IMPORTED_MODULE_0__["getTagName"])(node.firstChild) === 'is' && node.firstChild.firstChild && Object(_dom_js__WEBPACK_IMPORTED_MODULE_0__["getTagName"])(node.firstChild.firstChild) === 't') {
    return node.firstChild.firstChild.textContent;
  }
}
function getDimensions(document) {
  var worksheet = document.documentElement;
  var dimensions = Object(_dom_js__WEBPACK_IMPORTED_MODULE_0__["findChild"])(worksheet, 'dimension');

  if (dimensions) {
    return dimensions.getAttribute('ref');
  }
}
function getBaseStyles(document) {
  var styleSheet = document.documentElement;
  var cellStyleXfs = Object(_dom_js__WEBPACK_IMPORTED_MODULE_0__["findChild"])(styleSheet, 'cellStyleXfs');

  if (cellStyleXfs) {
    return Object(_dom_js__WEBPACK_IMPORTED_MODULE_0__["findChildren"])(cellStyleXfs, 'xf');
  }

  return [];
}
function getCellStyles(document) {
  var styleSheet = document.documentElement;
  var cellXfs = Object(_dom_js__WEBPACK_IMPORTED_MODULE_0__["findChild"])(styleSheet, 'cellXfs');

  if (!cellXfs) {
    return [];
  }

  return Object(_dom_js__WEBPACK_IMPORTED_MODULE_0__["findChildren"])(cellXfs, 'xf');
}
function getNumberFormats(document) {
  var styleSheet = document.documentElement;
  var numberFormats = [];
  var numFmts = Object(_dom_js__WEBPACK_IMPORTED_MODULE_0__["findChild"])(styleSheet, 'numFmts');

  if (numFmts) {
    return Object(_dom_js__WEBPACK_IMPORTED_MODULE_0__["findChildren"])(numFmts, 'numFmt');
  }

  return [];
}
function getSharedStrings(document) {
  // An `<si/>` element can contain a `<t/>` (simplest case) or a set of `<r/>` ("rich formatting") elements having `<t/>`.
  // https://docs.microsoft.com/en-us/dotnet/api/documentformat.openxml.spreadsheet.sharedstringitem?redirectedfrom=MSDN&view=openxml-2.8.1
  // http://www.datypic.com/sc/ooxml/e-ssml_si-1.html
  var sst = document.documentElement;
  return Object(_dom_js__WEBPACK_IMPORTED_MODULE_0__["map"])(sst, 'si', function (string) {
    var t = Object(_dom_js__WEBPACK_IMPORTED_MODULE_0__["findChild"])(string, 't');

    if (t) {
      return t.textContent;
    }

    var value = '';
    Object(_dom_js__WEBPACK_IMPORTED_MODULE_0__["forEach"])(string, 'r', function (r) {
      value += Object(_dom_js__WEBPACK_IMPORTED_MODULE_0__["findChild"])(r, 't').textContent;
    });
    return value;
  });
}
function getWorkbookProperties(document) {
  var workbook = document.documentElement;
  return Object(_dom_js__WEBPACK_IMPORTED_MODULE_0__["findChild"])(workbook, 'workbookPr');
}
function getRelationships(document) {
  var relationships = document.documentElement;
  return Object(_dom_js__WEBPACK_IMPORTED_MODULE_0__["findChildren"])(relationships, 'Relationship');
}
function getSheets(document) {
  var workbook = document.documentElement;
  var sheets = Object(_dom_js__WEBPACK_IMPORTED_MODULE_0__["findChild"])(workbook, 'sheets');
  return Object(_dom_js__WEBPACK_IMPORTED_MODULE_0__["findChildren"])(sheets, 'sheet');
}
//# sourceMappingURL=xlsx.js.map

/***/ }),

/***/ "./node_modules/read-excel-file/modules/xml/xmlBrowser.js":
/*!****************************************************************!*\
  !*** ./node_modules/read-excel-file/modules/xml/xmlBrowser.js ***!
  \****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ({
  createDocument: function createDocument(content) {
    // if (!content) {
    // 	throw new Error('No *.xml content')
    // }
    // A weird bug: it won't parse XML unless it's trimmed.
    // https://github.com/catamphetamine/read-excel-file/issues/21
    return new DOMParser().parseFromString(content.trim(), 'text/xml');
  }
});
//# sourceMappingURL=xmlBrowser.js.map

/***/ })

}]);