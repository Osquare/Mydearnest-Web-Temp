/**
 * Created by youngmoon on 9/2/15.
 */

'use strict';





function BannerApplink () {
    var uagentLow = navigator.userAgent.toLocaleLowerCase(),
    isiPhone = uagentLow.search('iphone') > -1,
    isAndroid = uagentLow.search('android') > -1,
    iMarket = 'itms-apps://itunes.apple.com/kr/app/id992731402?mt=8',
    AndMarket = 'market://details?id=com.osquare.mydearnest',
    Link = getLink(),
    LinkAnd = Link + '#Intent;scheme=mydearnest;package=com.osquare.mydearnest;end',
    openAt = new Date,
    banner = angular.element('a#HeaderAppLink');
    
    if (isiPhone) banner.prop('href', iMarket);
    if (isAndroid) banner.prop('href', AndMarket);

  //banner.click(function () {
  //  setTimeout(function () {
  //    if (new Date - openAt < 4000) {
  //      if (isAndroid) {
  //        iframe.attr('src', AndMarket);
  //      } else if (isiPhone) {
  //        location.replace(iMarket);
  //      }
  //    }
  //  }, 3000);
  //});
}

var API_URL = 'http://api.ggumim.co.kr/1.7/magazines';
var IMAGE_URL = 'http://image.ggumim.co.kr/unsafe/{id}/{id}';
var PageCount_URL = 'http://api.ggumim.co.kr/api/count/';
var homedecoApp = angular.module('homedecoApp', [
  'ngSanitize',
  'ui.router',
  'infinite-scroll'
]);

homedecoApp
  .config(['$stateProvider', '$urlRouterProvider', '$locationProvider',
    function ($stateProvider, $urlRouterProvider, $locationProvider) {
      $urlRouterProvider.otherwise('/');
      $locationProvider.html5Mode(true);

      $stateProvider
        .state('main', {
          url: '/',
          templateUrl: '../public/components/main.html',
          controller: 'MagazineListController'
        })
        .state('detail', {
          url: '/view.php',
          templateUrl: '../public/components/detail.html',
          controller: 'MagazineController'
        });
    }])
  .run(['$http', function ($http) {
    var referrer = GetURLParameter('referrer');

    // Guest Count
    $http.put(PageCount_URL + 'guest?referrer=' + (referrer || ''));
  }]);

homedecoApp
  .factory('DOMReady', [function () {
    return function () {
      $(window).resize(ResizeWindow);
      $('#ProductPopupExit,#ProductPopupOverlay').click(function() {
        $('#ProductPopupOverlayWrapper').removeClass('active');
      });
      BannerApplink();
      ResizeWindow();
    };
  }]);

homedecoApp.controller('MagazineListController', ['$scope', '$http', '$timeout', 'DOMReady', function ($scope, $http, $timeout, DOMReady) {
  $scope.magazines = [];
  $scope.scroll_busy = true;
  $scope.last_id = null;
  $scope.intentID = GetURLParameter('id');

  if (GetURLParameter('isShare')) gotoApp17();

  var addMagazines = function(data) {
    for (var i = 0; i < data.data.length; i++) {
      var item = {
        id: data.data[i].mag_id,
        image_url: IMAGE_URL.replace(/{id}/gi, data.data[i].title_img.img_id),
        text: escapeHTML(data.data[i].title)
      };
      $scope.last_id = item.id;
      $scope.magazines.push(item);
    }
    if (data.data.length) {
      $scope.scroll_busy = false;
    }
    $timeout(ResizeWindow, 0);
    DOMReady();
  };

  $scope.loadMore = function() {
    if ($scope.scroll_busy) {
      return;
    }
    $scope.scroll_busy = true;
    var url = API_URL + '?limit=10';
    if ($scope.last_id) {
      url += '&current=' + $scope.last_id;
    }
    $http.get(url).success(addMagazines);
  };

  $http.get(API_URL).success(addMagazines);
}]);

homedecoApp.controller('MagazineController', ['$scope', '$http', '$timeout', 'DOMReady',
  function ($scope, $http, $timeout, DOMReady) {
    $scope.title = '';
    $scope.pages = [];
    $scope.intentID = GetURLParameter('id');
    $scope.noBanner = GetURLParameter('noBanner') === 'true' ? true : false;

    if (GetURLParameter('isShare')) gotoApp17();

    //angular.element('#HeaderAppLink').width($(window).width()).height($(window).width() / 2);

    // Page Count
    $http.put(PageCount_URL + 'page');

    var pinClickSetting = function() {
      $('.imagePinMobileLink').click(PinClick)

      $('.imagePinWrapper').hover(function() {
        var width = $(this).find('.pinProductImage').width() + $(this).find('.pinProductContent').width() + 34;
        $(this).find('.pinProductWrapper').width(width);
      });
    };

    var init = function(data) {
      $scope.title = escapeHTML(data.data.title);
      $scope.pages = angular.copy(data.data.pages);

      for (var i = 0; i < data.data.pages.length; i++) {
        $scope.pages[i].tags = [];
        for (var j = 0; j < data.data.pages[i].tags.length; j++) {
          if (getCorrect(data.data.pages[i].tags[j].items)) {
            getCorrect(data.data.pages[i].tags[j].items).image =
              IMAGE_URL.replace(/{id}/gi, getCorrect(data.data.pages[i].tags[j].items).image.img_id);

            $scope.pages[i].tags.push(angular.extend(data.data.pages[i].tags[j],
              getCorrect(data.data.pages[i].tags[j].items)));
          } else if (getSimilars(data.data.pages[i].tags[j].items).length > 0) {
            getSimilars(data.data.pages[i].tags[j].items)[0].image =
              IMAGE_URL.replace(/{id}/gi, getSimilars(data.data.pages[i].tags[j].items)[0].image.img_id);

            $scope.pages[i].tags.push(angular.extend(data.data.pages[i].tags[j],
              getSimilars(data.data.pages[i].tags[j].items)[0]));
          }
        }
        
        DOMReady();
      }


      $timeout(pinClickSetting, 0);
    };

    function getSimilars (items) {
      var result = [];
      for (var i = 0; i < items.length; i++) {
        if (items[i].type === 2) result.push(items[i]);
      }

      return result;
    }

    function getCorrect (items) {
      var result;
      for (var i = 0; i < items.length; i++) {
        if (items[i].type === 1) result = items[i];
      }

      return result;
    }

    $scope.bindText = function (text) {
      if (text) {
        return escapeHTML(text);
      }
    };

    $http.get(API_URL + '/' + GetURLParameter('id')).success(init);
  }]);
