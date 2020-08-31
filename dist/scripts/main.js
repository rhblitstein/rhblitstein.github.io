function initUI() {
  function e(e) {
    e.preventDefault();
    var n = document.getElementById("page--about-me"),
      s = document.getElementById(this.getAttribute("data-anchor")),
      o = this.parentNode,
      l = null;
    (helpers.scrollManual = !1),
      (helpers.lastProgScroll = !1),
      t(
        s,
        600,
        "easeOutQuint",
        function () {
          for (var e = 0; e < helpers.page__anchor.length; e++)
            helpers.removeClass(helpers.page__anchor[e].parentNode, "active");
          helpers.addClass(o, "active"),
            clearTimeout(l),
            (l = setTimeout(function () {
              helpers.scrollManual = !0;
            }, 100));
        },
        n
      );
  }
  function t(e) {
    function t() {
      var e = Date.now(),
        d = Math.min(1, (e - a) / n),
        c = r[s](d);
      return (
        (l.scrollTop = c * (h - i) + i),
        l.scrollTop === h ? void o() : void requestAnimationFrame(t)
      );
    }
    var n =
        arguments.length <= 1 || void 0 === arguments[1] ? 200 : arguments[1],
      s =
        arguments.length <= 2 || void 0 === arguments[2]
          ? "linear"
          : arguments[2],
      o = arguments[3],
      l = arguments[4],
      r = {
        linear: function (e) {
          return e;
        },
        easeInQuad: function (e) {
          return e * e;
        },
        easeOutQuad: function (e) {
          return e * (2 - e);
        },
        easeInOutQuad: function (e) {
          return e < 0.5 ? 2 * e * e : -1 + (4 - 2 * e) * e;
        },
        easeInCubic: function (e) {
          return e * e * e;
        },
        easeOutCubic: function (e) {
          return --e * e * e + 1;
        },
        easeInOutCubic: function (e) {
          return e < 0.5
            ? 4 * e * e * e
            : (e - 1) * (2 * e - 2) * (2 * e - 2) + 1;
        },
        easeInQuart: function (e) {
          return e * e * e * e;
        },
        easeOutQuart: function (e) {
          return 1 - --e * e * e * e;
        },
        easeInOutQuart: function (e) {
          return e < 0.5 ? 8 * e * e * e * e : 1 - 8 * --e * e * e * e;
        },
        easeInQuint: function (e) {
          return e * e * e * e * e;
        },
        easeOutQuint: function (e) {
          return 1 + --e * e * e * e * e;
        },
        easeInOutQuint: function (e) {
          return e < 0.5
            ? 16 * e * e * e * e * e
            : 1 + 16 * --e * e * e * e * e;
        },
      },
      i = l.scrollTop,
      a = Date.now(),
      d = Math.max(l.clientHeight, l.offsetHeight, l.scrollHeight),
      c =
        window.innerHeight ||
        document.documentElement.clientHeight ||
        document.getElementsByTagName("body")[0].clientHeight,
      h = d - e.offsetTop < c ? d - c : e.offsetTop;
    t();
  }
  helpers.addClass(document.getElementById("ui"), "load"),
    [].forEach.call(["game", "linkedin", "twitter", "codepen", "cv"], function (
      e,
      t,
      n
    ) {
      helpers.addClass(document.getElementsByClassName(e)[0], "load");
    }),
    (helpers.page = document.getElementsByTagName("BODY")[0]),
    (helpers.playground__nav = document.getElementById("playground__nav")),
    (helpers.page__nav = document.getElementById("page__nav")),
    (helpers.page__anchor = document.getElementsByClassName("page__anchor")),
    document
      .getElementsByClassName("game")[0]
      .addEventListener(helpers.touchClick, function (e) {
        e.preventDefault(),
          helpers.removeClass(helpers.page, "active-inner"),
          helpers.removeClass(helpers.page, "active-inner--second"),
          helpers.removeClass(helpers.page__nav, "load");
      }),
    document
      .getElementsByClassName("about-me")[0]
      .addEventListener(helpers.touchClick, function (t) {
        if (
          (t.preventDefault(),
          helpers.hasClass(helpers.page, "active-inner--second") &&
            helpers.removeClass(helpers.page, "active-inner--second"),
          !helpers.hasClass(helpers.page, "active-inner"))
        ) {
          if (
            (helpers.addClass(helpers.page, "active-inner"),
            helpers.addClass(helpers.page__nav, "load"),
            !helpers.scrollToListenerSet)
          ) {
            for (var n = 0; n < helpers.page__anchor.length; n++)
              helpers.page__anchor[n].addEventListener(helpers.touchClick, e);
            helpers.scrollToListenerSet = !0;
          }
          resetPong();
        }
      }),
    document
      .getElementsByClassName("codepen")[0]
      .addEventListener(helpers.touchClick, function (t) {
        if ((t.preventDefault(), helpers.scrollToListenerSet)) {
          for (var n = 0; n < helpers.page__anchor.length; n++)
            helpers.page__anchor[n].removeEventListener(helpers.touchClick, e);
          helpers.scrollToListenerSet = !1;
        }
        helpers.hasClass(helpers.page, "active-inner") &&
          helpers.removeClass(helpers.page, "active-inner"),
          helpers.hasClass(helpers.page, "active-inner--second") ||
            (helpers.addClass(helpers.page, "active-inner--second"),
            resetPong());
      }),
    (helpers.scrollersOBJS = {
      intro: document.getElementById("about-me__intro"),
      current: document.getElementById("about-me__projects"),
      clients: document.getElementById("about-me__experience"),
      project: document.getElementById("about-me__project"),
      hobbies: document.getElementById("about-me__hobbies"),
      downloadcv: document.getElementById("about-me__downloadcv"),
      page__section_1: document.getElementById("page__section-1"),
      page__section_2: document.getElementById("page__section-2"),
      page__section_3: document.getElementById("page__section-3"),
      page__section_4: document.getElementById("page__section-4"),
    }),
    document
      .getElementById("page--about-me")
      .addEventListener("scroll", helpers.pageScrollListener);
}
var helpers = {
  supports: function () {
    var e = document.createElement("div"),
      t = "Khtml Ms O Moz Webkit".split(" "),
      n = t.length;
    return function (s) {
      if (s in e.style) return !0;
      for (
        s = s.replace(/^[a-z]/, function (e) {
          return e.toUpperCase();
        });
        n--;

      )
        if (t[n] + s in e.style) return !0;
      return !1;
    };
  },
  touchClick:
    "ontouchstart" in window ||
    (window.DocumentTouch && document instanceof DocumentTouch)
      ? "touchstart"
      : "click",
  hasClass: function (e, t) {
    return e.classList
      ? e.classList.contains(t)
      : !!e.className.match(new RegExp("(\\s|^)" + t + "(\\s|$)"));
  },
  addClass: function (e, t) {
    e.classList
      ? e.classList.add(t)
      : helpers.hasClass(e, t) || (e.className += " " + t);
  },
  removeClass: function (e, t) {
    if (e.classList) e.classList.remove(t);
    else if (helpers.hasClass(e, t)) {
      var n = new RegExp("(\\s|^)" + t + "(\\s|$)");
      e.className = e.className.replace(n, " ");
    }
  },
  pfx: ["webkit", "moz", "MS", "o", ""],
  prefixedEvent: function (e, t, n) {
    for (var s = 0; s < helpers.pfx.length; s++)
      helpers.pfx[s] || (t = t.toLowerCase()),
        e.addEventListener(helpers.pfx[s] + t, n, !1);
  },
  clearScoreAnimation: function () {
    helpers.removeClass(helpers.scorePlayerDom[0], "flash"),
      helpers.removeClass(helpers.scoreComputerDom[0], "flash");
  },
  animateScore: function (e, t) {
    (e.style.webkitAnimationName = t),
      (e.style.MozAnimationName = t),
      (e.style.msAnimationName = t),
      (e.style.OAnimationName = t),
      (e.style.animationName = t);
  },
  scoreComputerDom: null,
  scorePlayerDom: null,
  preloadImages: function (e, t) {
    function n(e, t) {
      var n = new Image();
      (n.src = e), (n.onload = t);
    }
    var s = 0,
      o = e.length;
    e.forEach(function (e) {
      n(e, function () {
        s++, s == o && t();
      });
    });
  },
  btns__key_sx: null,
  btns__key_dx: null,
  btn__reset: null,
  page: null,
  playground__nav: null,
  page__nav: null,
  page__anchor: null,
  isElementInViewport: function (e, t) {
    "function" == typeof jQuery && e instanceof jQuery && (e = e[0]);
    var n = e.getBoundingClientRect();
    return (
      n.top >= 0 &&
      n.left >= 0 &&
      n.bottom - t <=
        (window.innerHeight || document.documentElement.clientHeight) &&
      n.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  },
  onVisibilityChange: function (e, t) {
    return function () {};
  },
  whichTransitionEvent: function (e) {
    var t,
      n = document.createElement("fakeelement"),
      s = {
        transition: "transitionend",
        OTransition: "oTransitionEnd",
        MozTransition: "transitionend",
        WebkitTransition: "webkitTransitionEnd",
      },
      o = {
        animation: "animationend",
        OTransition: "oAnimationEnd",
        MozAnimation: "animationend",
        WebkitAnimation: "webkitAnimationEnd",
      },
      l = {};
    l = "animation" === e ? o : s;
    for (t in l) if (void 0 !== n.style[t]) return l[t];
  },
  resetPong: null,
  page_about_me_cover: null,
  page_codepen_cover: null,
  pageScrollListener: function () {
    if (
      (helpers.isElementInViewport(
        helpers.scrollersOBJS.intro.children[0],
        150
      ) &&
        (helpers.hasClass(helpers.scrollersOBJS.intro, "visible") ||
          helpers.addClass(helpers.scrollersOBJS.intro, "visible")),
      helpers.isElementInViewport(helpers.scrollersOBJS.current, 150) &&
        (helpers.hasClass(helpers.scrollersOBJS.current, "visible") ||
          helpers.addClass(helpers.scrollersOBJS.current, "visible")),
      helpers.isElementInViewport(helpers.scrollersOBJS.clients, 150) &&
        (helpers.hasClass(helpers.scrollersOBJS.clients, "visible") ||
          helpers.addClass(helpers.scrollersOBJS.clients, "visible")),
      helpers.isElementInViewport(helpers.scrollersOBJS.project, 150) &&
        (helpers.hasClass(helpers.scrollersOBJS.project, "visible") ||
          helpers.addClass(helpers.scrollersOBJS.project, "visible")),
      helpers.isElementInViewport(helpers.scrollersOBJS.downloadcv, 150) &&
        (helpers.hasClass(helpers.scrollersOBJS.downloadcv, "visible") ||
          helpers.addClass(helpers.scrollersOBJS.downloadcv, "visible")),
      helpers.isElementInViewport(helpers.scrollersOBJS.hobbies, 150) &&
        !helpers.hasClass(helpers.scrollersOBJS.hobbies, "visible") &&
        helpers.addClass(helpers.scrollersOBJS.hobbies, "visible"),
      helpers.scrollManual)
    )
      for (var e = 0; e < helpers.page__anchor.length; e++)
        helpers.removeClass(helpers.page__anchor[e].parentNode, "active");
  },
  scrollersOBJS: {
    intro: null,
    current: null,
    clients: null,
    project: null,
    hobbies: null,
    downloadcv: null,
    page__section_1: null,
    page__section_2: null,
    page__section_3: null,
    page__section_4: null,
  },
  scrollToListenerSet: !1,
  scrollManual: !0,
};
document.addEventListener("DOMContentLoaded", function () {
  "touchstart" === helpers.touchClick &&
    (helpers.addClass(document.getElementsByTagName("BODY")[0], "touchy"),
    document
      .getElementById("latest-project__media")
      .removeChild(document.getElementById("latest-project__video"))),
    function () {
      var e, t, n, s, o, l, r, i, a, d, c, h, p, u, m, g, _, v, f, y, w, E;
      (f = {
        background: "#ececeb",
        background_stop_1: "#fcfcfc",
        background_stop_2: "#ddd",
        paddle_color: "#2A363B",
        ball_color: "#2A363B",
      }),
        (n = 60),
        (y = 1),
        (v =
          window.innerWidth ||
          document.documentElement.clientWidth ||
          document.getElementsByTagName("body"[0]).clientWidth),
        (d =
          window.innerHeight ||
          document.documentElement.clientHeight ||
          document.getElementsByTagName("body"[0]).clientHeight),
        (w = document.getElementById("playground__nav")),
        (E = document.getElementsByClassName("hashtag")[0]),
        (helpers.btns__key_sx = document.getElementById("key-sx")),
        (helpers.btns__key_dx = document.getElementById("key-dx")),
        (helpers.btn__reset = document.getElementById("key-reset")),
        (controlsTouch = document.getElementById("controls-touch"));
      var C = document.getElementById("score");
      (helpers.scoreComputerDom = C.getElementsByClassName("sx")),
        (helpers.scorePlayerDom = C.getElementsByClassName("dx")),
        helpers.prefixedEvent(
          helpers.scorePlayerDom[0],
          "AnimationEnd",
          helpers.clearScoreAnimation
        ),
        helpers.prefixedEvent(
          helpers.scoreComputerDom[0],
          "AnimationEnd",
          helpers.clearScoreAnimation
        ),
        (u = 0),
        (m = 0),
        (helpers.scoreComputerDom[0].innerHTML = u),
        (helpers.scorePlayerDom[0].innerHTML = m),
        (canvas = document.getElementById("canvas")),
        (canvas.width = v),
        (canvas.height = d),
        (a = canvas.getContext("2d")),
        (l =
          window.requestAnimationFrame ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame ||
          function (e) {
            window.setTimeout(e, 1e3 / n);
          }),
        (s = function (e, t, n, s) {
          (this.x = e),
            (this.y = t),
            (this.width = n),
            (this.height = s),
            (this.x_speed = 0),
            (this.y_speed = 0);
        }),
        (t = function () {
          this.paddle = new s(Math.floor(v / 2 - 25), 10, 50, 10);
        }),
        (o = function () {
          this.paddle = new s(Math.floor(v / 2 - 25), d - 20, 50, 10);
        }),
        (e = function (e, t) {
          (this.x = e), (this.y = t), (this.x_speed = 0), (this.y_speed = 3);
        }),
        (h = new o()),
        (i = new t()),
        (r = new e(v / 2, d / 2)),
        (c = {}),
        (touchDown = {}),
        (handleWindowResize = function () {
          a.save(),
            a.scale(y, y),
            (v =
              window.innerWidth ||
              document.documentElement.clientWidth ||
              document.getElementsByTagName("body"[0]).clientWidth),
            (d =
              window.innerHeight ||
              document.documentElement.clientHeight ||
              document.getElementsByTagName("body"[0]).clientHeight),
            (canvas.width = v),
            (canvas.height = d),
            a.webkitBackingStorePixelRatio < 2 &&
              (y = window.devicePixelRatio || 1),
            (h = new o()),
            (i = new t()),
            (r = new e(v / 2, d / 2)),
            a.restore();
        });
      var b = function (e, t) {
        (37 == e || (39 == e && !t) || t) &&
          (helpers.hasClass(w, "playing")
            ? (helpers.btn__reset.innerHTML = helpers.btn__reset.getAttribute(
                "data-pause"
              ))
            : helpers.addClass(w, "playing"));
      };
      (resetPong = function () {
        (r.x_speed = 0),
          (r.y_speed = 3),
          (r.x = v / 2),
          (r.y = d / 2),
          (h.paddle = new s(Math.floor(v / 2 - 25), d - 20, 50, 10)),
          i.paddle.move(0, 0),
          (E.href =
            E.getAttribute("data-url") +
            m +
            "-" +
            u +
            "+vs.+mr.pong+%23madein1980+"),
          helpers.addClass(E.children[0], "bounce");
      }),
        (p = function () {
          var e = a.createRadialGradient(v / 2, d / 2, v / 4, v / 2, d / 2, v);
          e.addColorStop(0, f.background_stop_1),
            e.addColorStop(1, f.background_stop_2),
            (a.fillStyle = e),
            a.fillRect(0, 0, v, d),
            h.render(),
            i.render(),
            r.render();
        }),
        (_ = function () {
          h.update(), i.update(r), r.update(h.paddle, i.paddle);
        }),
        (g = function () {
          _(), p(), l(g);
        }),
        (s.prototype.render = function () {
          (a.fillStyle = f.paddle_color),
            a.fillRect(this.x, this.y, this.width, this.height);
        }),
        (s.prototype.touchmove = function (e, t) {
          (this.x = e),
            (this.x_speed = 4),
            (this.y_speed = t),
            this.x < 0
              ? ((this.x = 0), (this.x_speed = 0))
              : this.x + this.width > v &&
                ((this.x = v - this.width), (this.x_speed = 0));
        }),
        (s.prototype.move = function (e, t) {
          (this.x += e),
            (this.y += t),
            (this.x_speed = e),
            (this.y_speed = t),
            this.x < 0
              ? ((this.x = 0), (this.x_speed = 0))
              : this.x + this.width > v &&
                ((this.x = v - this.width), (this.x_speed = 0));
        }),
        (t.prototype.render = function () {
          this.paddle.render();
        }),
        (t.prototype.update = function (e) {
          var t, n;
          (n = e.x),
            (t = -(this.paddle.x + this.paddle.width / 2 - n)),
            t < 0 && t < -4 ? (t = -5) : t > 0 && t > 4 && (t = 5),
            this.paddle.move(t, 0),
            this.paddle.x < 0
              ? (this.paddle.x = 0)
              : this.paddle.x + this.paddle.width > v &&
                (this.paddle.x = v - this.paddle.width);
        }),
        (o.prototype.render = function () {
          this.paddle.render();
        }),
        (o.prototype.update = function () {
          var e, t;
          for (e in c)
            (t = Number(e)),
              37 === t
                ? this.paddle.move(-4, 0)
                : 39 === t
                ? this.paddle.move(4, 0)
                : this.paddle.move(0, 0);
          for (touch in touchDown)
            (t = Number(touch)),
              delete touchDown[t],
              this.paddle.touchmove(t, 0);
        }),
        (e.prototype.render = function () {
          a.beginPath(), a.fillRect(this.x, this.y, 10, 10);
        }),
        (e.prototype.update = function (e, t) {
          var n, s, o, l;
          (this.x += this.x_speed),
            (this.y += this.y_speed),
            (o = this.x - 5),
            (l = this.y - 5),
            (n = this.x + 5),
            (s = this.y + 5),
            this.x - 5 < 0
              ? ((this.x = 5), (this.x_speed = -this.x_speed))
              : this.x + 5 > v &&
                ((this.x = v - 5), (this.x_speed = -this.x_speed)),
            (this.y < 0 || this.y > d) &&
              (this.y < 0
                ? (m++,
                  m > 99 && (m = 0),
                  helpers.addClass(helpers.scorePlayerDom[0], "flash"),
                  (helpers.scorePlayerDom[0].innerHTML = m))
                : this.y > d &&
                  (u++,
                  u > 99 && (u = 0),
                  helpers.addClass(helpers.scoreComputerDom[0], "flash"),
                  (helpers.scoreComputerDom[0].innerHTML = u)),
              (this.x_speed = 0),
              (this.y_speed = 3),
              (this.x = v / 2),
              (this.y = d / 2)),
            l > d / 2
              ? l < e.y + e.height &&
                s > e.y &&
                o < e.x + e.width &&
                n > e.x &&
                ((this.y_speed = -3),
                (this.x_speed += e.x_speed / 2),
                (this.y += this.y_speed))
              : l < t.y + t.height &&
                s > t.y &&
                o < t.x + t.width &&
                n > t.x &&
                ((this.y_speed = 3),
                (this.x_speed += t.x_speed / 2),
                (this.y += this.y_speed));
        }),
        a &&
          (l(g),
          window.addEventListener("resize", handleWindowResize),
          controlsTouch.addEventListener(
            "touchend",
            function (e) {
              touchDown = {};
            },
            !1
          ),
          controlsTouch.addEventListener(
            "touchmove",
            function (e) {
              var t = e.targetTouches[0].pageX;
              e.targetTouches[0].pageY;
              (touchDown[t] = !0), b(t, !0);
            },
            !1
          ),
          document.body.addEventListener(
            "touchstart",
            function (e) {
              e.target == controlsTouch && e.preventDefault();
            },
            !1
          ),
          document.body.addEventListener(
            "touchend",
            function (e) {
              e.target == controlsTouch && e.preventDefault();
            },
            !1
          ),
          document.body.addEventListener(
            "touchmove",
            function (e) {
              e.target == controlsTouch && e.preventDefault();
            },
            !1
          ),
          window.addEventListener("keydown", function (e) {
            helpers.hasClass(helpers.page, "active-inner") ||
              ((c[e.keyCode] = !0), b(e.keyCode, !1));
          }),
          window.addEventListener("keyup", function (e) {
            helpers.hasClass(helpers.page, "active-inner") ||
              delete c[e.keyCode];
          }),
          ["touchend", "click"].forEach(function (e) {
            helpers.btn__reset.addEventListener(e, function (e) {
              e.preventDefault(), resetPong();
            });
          }),
          handleWindowResize());
    }.call(this);
}),
  window.addEventListener
    ? window.addEventListener("load", initUI, !1)
    : window.attachEvent && window.attachEvent("onload", initUI);
