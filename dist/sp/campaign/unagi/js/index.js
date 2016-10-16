this.inazumatv = this.inazumatv || {},
function(a) {
  "use strict";
  var b = a.document
    , c = a.inazumatv
    , d = c.jq.ExternalJQ
    , e = a.jQuery;
  d.install("SmoothScroll", e),
  d.install("Easing"),
  e(b).ready(function() {
    e(".smoothing").smoothScroll({
      easing: "quart",
      speed: 360
    }),
    e(b.body).on("click", ".mov-modal", function(b) {
      b.stopPropagation(),
      b.preventDefault();
      var c = {
        margin: 0,
        padding: 0,
        autoScale: !1,
        scrolling: "no",
        overlayOpacity: .9,
        overlayColor: "#000",
        aspectRatio: 0,
        fitToView: 0,
        autoSize: 0,
        width: 288,
        height: 162
      };
      c.type = "iframe";
      c.href = this.href.replace("youtu.be/", "www.youtube.com/embed/");
      e.fancybox(c)
    })
  })
}(window);
