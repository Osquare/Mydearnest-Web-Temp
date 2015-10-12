"use strict";function GetURLParameter(e){for(var t=window.location.search.substring(1),a=t.split("&"),i=0;i<a.length;i++){var r=a[i].split("=");if(r[0]==e)return r[1]}}var ResizeWindow=function(){var e=Math.floor($(window).width()/2)-1;$(window).width()<1024?($(".magazineItem:nth-child(1)").width($(window).width()),$(".magazineItem").slice(1).width(e)):($(".magazineItem:nth-child(2)").width($(window).width()),$(".magazineItem").slice(2).width(e)),$(".magazineItem").height(e)},PinClick=function(){var e=$(this).parent().find(".pinProductTitle").text(),t=$(this).parent().find(".pinProductPrice").text(),a=$(this).parent().find(".pinProductButton").attr("href"),i=$(this).parent().find(".pinProductImage").attr("src");return $("#ProductPopupTitle").text(e),$("#ProductPopupPrice").text(t),$("#ProductPopupButton").attr("href",a),$("#ProductPopupImage").attr("src",i),$("#ProductPopup").width("initial"),$("#ProductPopup").imagesLoaded(function(){$("#ProductPopupOverlayWrapper").addClass("active");var e=$("#ProductPopupOverlayWrapper").height()-$("#ProductPopup").height();if(100>e){var t=$("#ProductPopup").height()/$("#ProductPopup").width(),a=($("#ProductPopupOverlayWrapper").height()-60)/t;$("#ProductPopup").width(a+"px"),e=$("#ProductPopupOverlayWrapper").height()-$("#ProductPopup").height()}$("#ProductPopupWrapper").css("top",e/2+"px")}),!1},escapeHTML=function(e){return e&&e.replace("&","&").replace("<","&lt;").replace(">","&gt;").replace(/\n/gi,"<br>")},shareType=function(e){if(!e)return 19;var t={magazine:19,feed_self:5,feed_qa:24,furniture:16,interior:18,announce:8};return t[e]||19},gotoApp17=function(){{var e=GetURLParameter("id"),t=GetURLParameter("isShare"),a=new Date,i=navigator.userAgent.toLocaleLowerCase(),r=i.search("android")>-1,o=i.search("iphone")>-1,n=angular.element("#applink"),p="itms-apps://itunes.apple.com/kr/app/id992731402?mt=8",d="market://details?id=com.osquare.mydearnest",s="mydearnest://view?msgType="+shareType(t)+"&id="+e,c=s+"#Intent;scheme=mydearnest;package=com.osquare.mydearnest;end";i.search("chrome")>-1&&navigator.appVersion.match(/Chrome\/\d+.\d+/)[0].split("/")[1]>25}setTimeout(function(){new Date-a<4e3&&(r?n.attr("src",d):o&&location.replace(p))},3e3),r?n.attr("src",c):o&&n.attr("src",s)};$(document).ready(function(){$(window).resize(ResizeWindow),$("#ProductPopupExit,#ProductPopupOverlay").click(function(){$("#ProductPopupOverlayWrapper").removeClass("active")})});var API_URL="http://api.ggumim.co.kr/1.7/magazines",IMAGE_URL="http://image.ggumim.co.kr/unsafe/{id}/{id}",PageCount_URL="http://api.ggumim.co.kr/api/count/",homedecoApp=angular.module("homedecoApp",["ngSanitize","ui.router","infinite-scroll"]);homedecoApp.config(["$stateProvider","$urlRouterProvider","$locationProvider",function(e,t,a){t.otherwise("/"),a.html5Mode(!0),e.state("main",{url:"/",templateUrl:"../public/components/main.html",controller:"MagazineListController"}).state("detail",{url:"/view.php",templateUrl:"../public/components/detail.html",controller:"MagazineController"})}]).run(["$http",function(e){var t=GetURLParameter("referrer");e.put(PageCount_URL+"guest?referrer="+(t||""))}]),homedecoApp.factory("DOMReady",[function(){return function(){$(window).resize(ResizeWindow),$("#ProductPopupExit,#ProductPopupOverlay").click(function(){$("#ProductPopupOverlayWrapper").removeClass("active")})}}]),homedecoApp.controller("MagazineListController",["$scope","$http","$timeout",function(e,t,a){e.magazines=[],e.scroll_busy=!0,e.last_id=null,e.intentID=GetURLParameter("id"),gotoApp17(),e.gotoApp=function(){location.href="?isShare=true"};var i=function(t){for(var i=0;i<t.data.length;i++){var r={id:t.data[i].mag_id,image_url:IMAGE_URL.replace(/{id}/gi,t.data[i].title_img.img_id),text:escapeHTML(t.data[i].title)};e.last_id=r.id,e.magazines.push(r)}t.data.length&&(e.scroll_busy=!1),a(ResizeWindow,0)};e.loadMore=function(){if(!e.scroll_busy){e.scroll_busy=!0;var a=API_URL+"?limit=10";e.last_id&&(a+="&current="+e.last_id),t.get(a).success(i)}},t.get(API_URL).success(i)}]),homedecoApp.controller("MagazineController",["$scope","$http","$timeout","DOMReady",function(e,t,a,i){function r(e){for(var t=[],a=0;a<e.length;a++)2===e[a].type&&t.push(e[a]);return t}function o(e){for(var t,a=0;a<e.length;a++)1===e[a].type&&(t=e[a]);return t}e.title="",e.pages=[],e.intentID=GetURLParameter("id"),e.noBanner="true"===GetURLParameter("noBanner")?!0:!1,gotoApp17(),e.gotoApp=function(){location.href="?isShare=true&id="+GetURLParameter("id")},angular.element("#HeaderAppLink").width($(window).width()).height($(window).width()/2),t.put(PageCount_URL+"page");var n=function(){$(".imagePinMobileLink").click(PinClick),$(".imagePinWrapper").hover(function(){var e=$(this).find(".pinProductImage").width()+$(this).find(".pinProductContent").width()+34;$(this).find(".pinProductWrapper").width(e)})},p=function(t){e.title=escapeHTML(t.data.title),e.pages=angular.copy(t.data.pages);for(var i=0;i<t.data.pages.length;i++){e.pages[i].tags=[];for(var p=0;p<t.data.pages[i].tags.length;p++)o(t.data.pages[i].tags[p].items)?(o(t.data.pages[i].tags[p].items).image=IMAGE_URL.replace(/{id}/gi,o(t.data.pages[i].tags[p].items).image.img_id),e.pages[i].tags.push(angular.extend(t.data.pages[i].tags[p],o(t.data.pages[i].tags[p].items)))):r(t.data.pages[i].tags[p].items).length>0&&(r(t.data.pages[i].tags[p].items)[0].image=IMAGE_URL.replace(/{id}/gi,r(t.data.pages[i].tags[p].items)[0].image.img_id),e.pages[i].tags.push(angular.extend(t.data.pages[i].tags[p],r(t.data.pages[i].tags[p].items)[0])))}a(n,0)};e.bindText=function(e){return e?escapeHTML(e):void 0},t.get(API_URL+"/"+GetURLParameter("id")).success(p),i()}]);