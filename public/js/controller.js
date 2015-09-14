"use strict";function GetURLParameter(e){for(var t=window.location.search.substring(1),a=t.split("&"),n=0;n<a.length;n++){var r=a[n].split("=");if(r[0]==e)return r[1]}}var ResizeWindow=function(){var e=Math.floor($(window).width()/2)-1;$(window).width()<1024?($(".magazineItem:nth-child(1)").width($(window).width()),$(".magazineItem").slice(1).width(e)):($(".magazineItem:nth-child(2)").width($(window).width()),$(".magazineItem").slice(2).width(e)),$(".magazineItem").height(e)},PinClick=function(){var e=$(this).parent().find(".pinProductTitle").text(),t=$(this).parent().find(".pinProductPrice").text(),a=$(this).parent().find(".pinProductButton").attr("href"),n=$(this).parent().find(".pinProductImage").attr("src");return $("#ProductPopupTitle").text(e),$("#ProductPopupPrice").text(t),$("#ProductPopupButton").attr("href",a),$("#ProductPopupImage").attr("src",n),$("#ProductPopup").width("initial"),$("#ProductPopup").imagesLoaded(function(){$("#ProductPopupOverlayWrapper").addClass("active");var e=$("#ProductPopupOverlayWrapper").height()-$("#ProductPopup").height();if(100>e){var t=$("#ProductPopup").height()/$("#ProductPopup").width(),a=($("#ProductPopupOverlayWrapper").height()-60)/t;$("#ProductPopup").width(a+"px"),e=$("#ProductPopupOverlayWrapper").height()-$("#ProductPopup").height()}$("#ProductPopupWrapper").css("top",e/2+"px")}),!1},escapeHTML=function(e){return e.replace("&","&amp;").replace("<","&lt;").replace(">","&gt;").replace(/\n/gi,"<br>")},shareType=function(e){if(!e)return 19;var t={magazine:19,feed_self:5,feed_qa:24,furniture:16,interior:18,announce:8};return t[e]||19},gotoApp17=function(){{var e=GetURLParameter("id"),t=GetURLParameter("isShare"),a=new Date,n=navigator.userAgent.toLocaleLowerCase(),r=n.search("android")>-1,i=n.search("iphone")>-1,o=angular.element("#applink"),p="itms-apps://itunes.apple.com/kr/app/id992731402?mt=8",s="market://details?id=com.osquare.mydearnest",c="mydearnest://view?msgType="+shareType(t)+"&id="+e,d=c+"#Intent;scheme=mydearnest;package=com.osquare.mydearnest;end";n.search("chrome")>-1&&navigator.appVersion.match(/Chrome\/\d+.\d+/)[0].split("/")[1]>25}setTimeout(function(){new Date-a<4e3&&(r?o.attr("src",s):i&&location.replace(p))},3e3),r?o.attr("src",d):i&&o.attr("src",c)},gotoApp=function(){{var e=GetURLParameter("id"),t=GetURLParameter("isShare"),a=new Date,n=navigator.userAgent.toLocaleLowerCase(),r=n.search("android")>-1,i=n.search("iphone")>-1,o=angular.element("#applink"),p="itms-apps://itunes.apple.com/kr/app/id992731402?mt=8",s="market://details?id=com.osquare.mydearnest",c="mydearnest://view?msgType=12&postType=0",d="mydearnest://view?msgType=12&id="+e+"&postType=0",u="intent://move?position=0#Intent;scheme=mydearnest;package=com.osquare.mydearnest;end",l="intent://view?msgType=12&id="+e+"/#Intent;scheme=mydearnest;package=com.osquare.mydearnest;end";n.search("chrome")>-1&&navigator.appVersion.match(/Chrome\/\d+.\d+/)[0].split("/")[1]>25}return t&&"true"!==t?gotoApp17():(GetURLParameter("isMarket")&&(r?document.location.href=s:i&&location.replace(p)),void(t&&(setTimeout(function(){new Date-a<4e3&&(r?o.attr("src",s):i&&location.replace(p))},3e3),r?o.attr("src",e?l:u):i&&o.attr("src",e?d:c))))};$(document).ready(function(){$(window).resize(ResizeWindow),$("#ProductPopupExit,#ProductPopupOverlay").click(function(){$("#ProductPopupOverlayWrapper").removeClass("active")})});var API_URL="http://mydearnestapi-env.elasticbeanstalk.com/open_api/magazines",IMAGE_URL="http://image.ggumim.co.kr/unsafe/{id}/{id}",PageCount_URL="http://mydearnestapi-env.elasticbeanstalk.com/api/count/",homedecoApp=angular.module("homedecoApp",["ngSanitize","ui.router","infinite-scroll"]);homedecoApp.config(["$stateProvider","$urlRouterProvider","$locationProvider",function(e,t,a){t.otherwise("/"),a.html5Mode(!0),e.state("main",{url:"/",templateUrl:"../public/components/main.html",controller:"MagazineListController"}).state("detail",{url:"/view.php",templateUrl:"../public/components/detail.html",controller:"MagazineController"})}]).run(["$http",function(e){var t=GetURLParameter("referrer");e.put(PageCount_URL+"guest?referrer="+(t||""))}]),homedecoApp.controller("MagazineListController",["$scope","$http","$timeout",function(e,t,a){e.magazines=[],e.scroll_busy=!0,e.last_id=null,e.intentID=GetURLParameter("id"),gotoApp(),e.gotoApp=function(){location.href="?isShare=true"};var n=function(t){for(var n=0;n<t.data.length;n++){var r={id:t.data[n]._id,image_url:IMAGE_URL.replace(/{id}/gi,t.data[n].contents.title.image),text:escapeHTML(t.data[n].contents.title.text)};e.last_id=r.id,e.magazines.push(r)}t.data.length&&(e.scroll_busy=!1),a(ResizeWindow,0)};e.loadMore=function(){if(!e.scroll_busy){e.scroll_busy=!0;var a=API_URL+"?limit=10";e.last_id&&(a+="&current="+e.last_id),t.get(a).success(n)}},t.get(API_URL).success(n)}]),homedecoApp.controller("MagazineController",["$scope","$http","$timeout","$location",function(e,t,a){e.title="",e.content="",e.pages=[],e.intentID=GetURLParameter("id"),e.noBanner="true"===GetURLParameter("noBanner")?!0:!1,gotoApp(),e.gotoApp=function(){location.href="?isShare=true&id="+GetURLParameter("id")},angular.element("#HeaderAppLink").width($(window).width()).height($(window).width()/2),t.put(PageCount_URL+"page");var n=function(){$(".imagePinMobileLink").click(PinClick),$(".imagePinWrapper").hover(function(){var e=$(this).find(".pinProductImage").width()+$(this).find(".pinProductContent").width()+34;$(this).find(".pinProductWrapper").width(e)})},r=function(t){e.title=escapeHTML(t.data.contents.title.text),e.pages=angular.copy(t.data.contents.pages);for(var r=0;r<t.data.contents.pages.length;r++){e.pages[r].pins=[];for(var i=0;i<t.data.contents.pages[r].pins.length;i++)!t.data.contents.pages[r].pins[i].correct&&angular.isArray(t.data.contents.pages[r].pins[i].similars)&&t.data.contents.pages[r].pins[i].similars.length>0&&(t.data.contents.pages[r].pins[i].correct=t.data.contents.pages[r].pins[i].similars[0]),t.data.contents.pages[r].pins[i].correct&&(t.data.contents.pages[r].pins[i].correct.contents.image&&0!==t.data.contents.pages[r].pins[i].correct.contents.image.indexOf("http")&&(t.data.contents.pages[r].pins[i].correct.contents.image=IMAGE_URL.replace(/{id}/gi,t.data.contents.pages[r].pins[i].correct.contents.image)),e.pages[r].pins.push({offset:t.data.contents.pages[r].pins[i].offset,contents:t.data.contents.pages[r].pins[i].correct.contents}))}a(n,0)};e.bindText=function(e){return e?escapeHTML(e):void 0},t.get(API_URL+"/"+GetURLParameter("id")).success(r)}]);