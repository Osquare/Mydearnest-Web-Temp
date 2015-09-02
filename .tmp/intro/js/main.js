$(function() {
  updateAndroidMarketLinks();
  // some more core here ... 

  function updateAndroidMarketLinks()
  {
    var ua = navigator.userAgent.toLowerCase();
    if (0 <= ua.indexOf("android")) {
      // we have android
      $(".btnDownload.android").each(function() {
        this.href = this.href.replace(/^http:\/\/market\.android\.com\//,
          "market://");
      });
    }
  }
});