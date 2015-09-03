"use strict";function GetURLParameter(t){for(var e=window.location.search.substring(1),a=e.split("&"),n=0;n<a.length;n++){var i=a[n].split("=");if(i[0]==t)return i[1]}}var ResizeWindow=function(){var t=Math.floor($(window).width()/2)-1;$(window).width()<1024?($(".magazineItem:nth-child(1)").width($(window).width()),$(".magazineItem").slice(1).width(t)):($(".magazineItem:nth-child(2)").width($(window).width()),$(".magazineItem").slice(2).width(t)),$(".magazineItem").height(t)},PinClick=function(){var t=$(this).parent().find(".pinProductTitle").text(),e=$(this).parent().find(".pinProductPrice").text(),a=$(this).parent().find(".pinProductButton").attr("href"),n=$(this).parent().find(".pinProductImage").attr("src");return $("#ProductPopupTitle").text(t),$("#ProductPopupPrice").text(e),$("#ProductPopupButton").attr("href",a),$("#ProductPopupImage").attr("src",n),$("#ProductPopup").width("initial"),$("#ProductPopup").imagesLoaded(function(){$("#ProductPopupOverlayWrapper").addClass("active");var t=$("#ProductPopupOverlayWrapper").height()-$("#ProductPopup").height();if(100>t){var e=$("#ProductPopup").height()/$("#ProductPopup").width(),a=($("#ProductPopupOverlayWrapper").height()-60)/e;$("#ProductPopup").width(a+"px"),t=$("#ProductPopupOverlayWrapper").height()-$("#ProductPopup").height()}$("#ProductPopupWrapper").css("top",t/2+"px")}),!1},escapeHTML=function(t){return t.replace("&","&amp;").replace("<","&lt;").replace(">","&gt;").replace(/\n/gi,"<br>")},gotoApp=function(){var t=GetURLParameter("id"),e=new Date,a=navigator.userAgent.toLocaleLowerCase(),n=a.search("android")>-1,i=a.search("iphone")>-1,o=angular.element("#applink"),r="itms-apps://itunes.apple.com/kr/app/id992731402?mt=8",p="market://details?id=com.osquare.mydearnest",s="mydearnest://view?msgType=12&postType=0",c="mydearnest://view?msgType=12&id="+t+"&postType=0",d="mydearnest://move?position=0#Intent;scheme=mydearnest;package=com.osquare.mydearnest;end",l="intent://view?msgType=12&id="+t+"/#Intent;scheme=mydearnest;package=com.osquare.mydearnest;end",u=a.search("chrome")>-1&&navigator.appVersion.match(/Chrome\/\d+.\d+/)[0].split("/")[1]>25;GetURLParameter("isMarket")&&(n?document.location.href=p:i&&location.replace(r)),GetURLParameter("isShare")&&(setTimeout(function(){new Date-e<4e3&&(n?o.attr("src",p):i&&location.replace(r))},3e3),n?u?document.location.href=t?l:d:o.attr("src",t?l:d):i&&o.attr("src",t?c:s))};$(document).ready(function(){$(window).resize(ResizeWindow),$("#ProductPopupExit,#ProductPopupOverlay").click(function(){$("#ProductPopupOverlayWrapper").removeClass("active")})});var API_URL="http://mydearnestapi-env.elasticbeanstalk.com/open_api/magazines",IMAGE_URL="http://image.ggumim.co.kr/unsafe/{id}/{id}",PageCount_URL="http://mydearnestapi-env.elasticbeanstalk.com/api/count/",homedecoApp=angular.module("homedecoApp",["ngSanitize","ui.router","infinite-scroll"]);homedecoApp.config(["$stateProvider","$urlRouterProvider","$locationProvider",function(t,e,a){e.otherwise("/"),a.html5Mode(!0),t.state("main",{url:"/",templateUrl:"../components/main.html",controller:"MagazineListController"}).state("detail",{url:"/view.php",templateUrl:"../components/detail.html",controller:"MagazineController"})}]).run(["$http",function(t){var e=GetURLParameter("from");console.log("hello"),t.put(PageCount_URL+"guest?from="+e)}]),homedecoApp.controller("MagazineListController",["$scope","$http","$timeout",function(t,e,a){console.log("hello"),t.magazines=[],t.scroll_busy=!0,t.last_id=null,t.intentID=GetURLParameter("id"),gotoApp(),t.gotoApp=function(){location.href="?isShare=true"},addMagazines=function(e){for(var n=0;n<e.data.length;n++){var i={id:e.data[n]._id,image_url:IMAGE_URL.replace(/{id}/gi,e.data[n].contents.title.image),text:escapeHTML(e.data[n].contents.title.text)};t.last_id=i.id,t.magazines.push(i)}e.data.length&&(t.scroll_busy=!1),a(ResizeWindow,0)},t.loadMore=function(){if(!t.scroll_busy){t.scroll_busy=!0;var a=API_URL+"?limit=10";t.last_id&&(a+="&current="+t.last_id),e.get(a).success(addMagazines)}},e.get(API_URL).success(addMagazines)}]),homedecoApp.controller("MagazineController",["$scope","$http","$timeout","$location",function(t,e,a){t.title="",t.content="",t.pages=[],t.intentID=GetURLParameter("id"),t.noBanner="true"===GetURLParameter("noBanner")?!0:!1,gotoApp(),t.gotoApp=function(){location.href="?isShare=true&id="+GetURLParameter("id")},angular.element("#HeaderAppLink").width($(window).width()).height($(window).width()/2),e.put(PageCount_URL+"page"),pinClickSetting=function(){$(".imagePinMobileLink").click(PinClick),$(".imagePinWrapper").hover(function(){var t=$(this).find(".pinProductImage").width()+$(this).find(".pinProductContent").width()+34;$(this).find(".pinProductWrapper").width(t)})},init=function(e){t.title=escapeHTML(e.data.contents.title.text),t.pages=angular.copy(e.data.contents.pages);for(var n=0;n<e.data.contents.pages.length;n++){t.pages[n].pins=[];for(var i=0;i<e.data.contents.pages[n].pins.length;i++)!e.data.contents.pages[n].pins[i].correct&&angular.isArray(e.data.contents.pages[n].pins[i].similars)&&e.data.contents.pages[n].pins[i].similars.length>0&&(e.data.contents.pages[n].pins[i].correct=e.data.contents.pages[n].pins[i].similars[0]),e.data.contents.pages[n].pins[i].correct&&(e.data.contents.pages[n].pins[i].correct.contents.image&&0!==e.data.contents.pages[n].pins[i].correct.contents.image.indexOf("http")&&(e.data.contents.pages[n].pins[i].correct.contents.image=IMAGE_URL.replace(/{id}/gi,e.data.contents.pages[n].pins[i].correct.contents.image)),t.pages[n].pins.push({offset:e.data.contents.pages[n].pins[i].offset,contents:e.data.contents.pages[n].pins[i].correct.contents}))}a(pinClickSetting,0)},t.bindText=function(t){return t?escapeHTML(t):void 0},e.get(API_URL+"/"+GetURLParameter("id")).success(init)}]);