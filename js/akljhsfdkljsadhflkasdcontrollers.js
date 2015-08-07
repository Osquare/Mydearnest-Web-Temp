function GetURLParameter(sParam) {
    var sPageURL = window.location.search.substring(1);
    var sURLVariables = sPageURL.split('&');
    for (var i = 0; i < sURLVariables.length; i++) {
        var sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] == sParam) {
            return sParameterName[1];
        }
    }
};

ResizeWindow = function() {
    var width = Math.floor($(window).width()/2)-1;
    if ($(window).width() < 1024) {
    	$('.magazineItem:nth-child(1)').width($(window).width());
    	$('.magazineItem').slice(1).width(width);
    } else {
	    $('.magazineItem:nth-child(2)').width($(window).width());
	    $('.magazineItem').slice(2).width(width);
    }
    $('.magazineItem').height(width);
};

PinClick = function() {
    var title = $(this).parent().find('.pinProductTitle').text();
    var price = $(this).parent().find('.pinProductPrice').text();
    var link = $(this).parent().find('.pinProductButton').attr('href');
    var image = $(this).parent().find('.pinProductImage').attr('src');

    $('#ProductPopupTitle').text(title);
    $('#ProductPopupPrice').text(price);
    $('#ProductPopupButton').attr('href', link);
    $('#ProductPopupImage').attr('src', image);
    $('#ProductPopup').width('initial');

    $('#ProductPopup').imagesLoaded(function() {
        $('#ProductPopupOverlayWrapper').addClass('active');
        var position = $('#ProductPopupOverlayWrapper').height() - $('#ProductPopup').height();
        if (position < 100) {
            var ratio = $('#ProductPopup').height() / $('#ProductPopup').width();
            var width = ($('#ProductPopupOverlayWrapper').height() - 60) / ratio;
            $('#ProductPopup').width(width + 'px');
            position = $('#ProductPopupOverlayWrapper').height() - $('#ProductPopup').height();
        }
        $('#ProductPopupWrapper').css('top', (position/2) + 'px');
    });

    return false;
};

escapeHTML = function(text) {
    return text.replace('&', '&amp;').replace('<', '&lt;').replace('>', '&gt;').replace(/\n/gi, '<br>');
};

$(document).ready(function() {
    $(window).resize(ResizeWindow);

    $('#ProductPopupExit,#ProductPopupOverlay').click(function() {
        $('#ProductPopupOverlayWrapper').removeClass('active');
    });
});

var homedecoApp = angular.module('homedecoApp', ['ngSanitize', 'infinite-scroll']);
var API_URL = 'http://mydearnestapi-env.elasticbeanstalk.com/open_api/magazines';
var IMAGE_URL = 'http://image.ggumim.co.kr/unsafe/{id}/{id}';
var PageCount_URL = 'http://mydearnestapi-env.elasticbeanstalk.com/api/count/';

homedecoApp.controller('MagazineListController', ['$scope', '$http', '$timeout', function ($scope, $http, $timeout) {
    $scope.magazines = [];
    $scope.scroll_busy = true;
    $scope.last_id = null;
    $scope.intentID = GetURLParameter('id');

    // 앱링크
    if (/Android/i.test(navigator.userAgent)) {
    	var intentLink = "mydearnest://move?position=0#Intent;scheme=mydearnest;package=com.osquare.mydearnest;end";
		angular.element('.HeaderAppLink').attr('href', intentLink);
	} else if (/iPhone/i.test(navigator.userAgent)) {
		var intentLink = 'mydearnest://view?msgType=12&id='+ $scope.intentID +'&postType=0';
		angular.element('.HeaderAppLink').click(function(e) {
			e.preventDefault();
			$timeout(function() {
				var iframe = angular.element('<iframe></iframe>');
				iframe.attr('src', intentLink);
				iframe.appendTo('body');
				$timeout(function() {
					location.href = 'https://itunes.apple.com/kr/app/jibkkumigi/id992731402?mt=8';
				}, 500);
			}, 500);
		});
	}

    // Guest Count
	$http.put(PageCount_URL + 'guest');

    addMagazines = function(data) {
        for (var i = 0; i < data.data.length; i++) {
            var item = {
                id: data.data[i]._id,
                image_url: IMAGE_URL.replace(/{id}/gi, data.data[i].contents.title.image),
                text: escapeHTML(data.data[i].contents.title.text)
            };
            $scope.last_id = item.id;
            $scope.magazines.push(item);
        }
        if (data.data.length) {
            $scope.scroll_busy = false;
        }
        $timeout(ResizeWindow, 0);
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

homedecoApp.controller('MagazineController', ['$scope', '$http', '$timeout', '$location', function ($scope, $http, $timeout, $location) {
    $scope.title = '';
    $scope.content = '';
    $scope.pages = [];
    $scope.intentID = GetURLParameter('id');

    if (/Android/i.test(navigator.userAgent)) {
    	var intentLink = "mydearnest://move?position=0#Intent;scheme=mydearnest;package=com.osquare.mydearnest;end";
		angular.element('.HeaderAppLink').attr('href', intentLink);
	} else if (/iPhone/i.test(navigator.userAgent)) {
		var intentLink = 'mydearnest://view?msgType=12&id='+ $scope.intentID +'&postType=0';
		angular.element('.HeaderAppLink').click(function(e) {
			e.preventDefault();
			$timeout(function() {
				var iframe = angular.element('<iframe></iframe>');
				iframe.attr('src', intentLink);
				iframe.appendTo('body');
				$timeout(function() {
					location.href = 'https://itunes.apple.com/kr/app/jibkkumigi/id992731402?mt=8';
				}, 500);
			}, 500);
		});
	}

	angular.element('#HeaderAppLink').width($(window).width()).height($(window).width() / 2);

    // Page Count
	$http.put(PageCount_URL + 'page');

    pinClickSetting = function() {
        $('.imagePinMobileLink').click(PinClick);

        $('.imagePinWrapper').hover(function() {
            var width = $(this).find('.pinProductImage').width() + $(this).find('.pinProductContent').width() + 34;
            $(this).find('.pinProductWrapper').width(width);
        });
    };

    init = function(data) {
    	$scope.title = escapeHTML(data.data.contents.title.text);
        $scope.pages = angular.copy(data.data.contents.pages);

        for (var i = 0; i < data.data.contents.pages.length; i++) {
        	$scope.pages[i].pins = [];
            for (var j = 0; j < data.data.contents.pages[i].pins.length; j++) {
            	if (!data.data.contents.pages[i].pins[j].correct
            		&& angular.isArray(data.data.contents.pages[i].pins[j].similars)
            		&& data.data.contents.pages[i].pins[j].similars.length > 0) {
            		data.data.contents.pages[i].pins[j].correct = data.data.contents.pages[i].pins[j].similars[0];
        		}
            	if (data.data.contents.pages[i].pins[j].correct) {
            		if (data.data.contents.pages[i].pins[j].correct.contents.image
            			&& data.data.contents.pages[i].pins[j].correct.contents.image.indexOf('http') !== 0) {
            				data.data.contents.pages[i].pins[j].correct.contents.image =
            					IMAGE_URL.replace(/{id}/gi, data.data.contents.pages[i].pins[j].correct.contents.image);
        			}
            		$scope.pages[i].pins.push({
            			offset: data.data.contents.pages[i].pins[j].offset,
            			contents: data.data.contents.pages[i].pins[j].correct.contents
            		});
            	}
            }
        }

        $timeout(pinClickSetting, 0);
    };

    $scope.bindText = function (text) {
    	if (text) {
    		return escapeHTML(text);
    	};
    }

    $http.get(API_URL + '/' + GetURLParameter('id')).success(init);
}]);
homedecoApp.directive('applink', ['$timeout', '$window', function($timeout, $window) {
	return {
		restrict: 'E',
		template: '<iframe style="display:none;"></iframe>',
		link: function(scope, el, attr) {
            // 기본 변수 선언
            var id = GetURLParameter('id'),
                openAt = new Date,
                uagentLow = navigator.userAgent.toLocaleLowerCase(),
                isAndroid = uagentLow.search('android') > -1,
                isiPhone = uagentLow.search('iphone') > -1,
                iframe = el.find('iframe'),
                chrome25 = false,
                kitkatWebview = false,
                iMarket = 'http://itunes.apple.com/kr/app/jibkkumigi/id992731402?mt=8',
                AndMarket = 'market://details?id=com.osquare.mydearnest',
                iPhoneLink = 'mydearnest://view?msgType=12&postType=0',
                iPhoneLinkParam = 'mydearnest://view?msgType=12&id='+ id +'&postType=0',
                AndroidLink = 'mydearnest://move?position=0#Intent;scheme=mydearnest;package=com.osquare.mydearnest;end',
                AndroidLinkParam = "intent://view?msgType=12&id="+id+"&postType=0/#Intent;scheme=mydearnest;package=com.osquare.mydearnest;end";


            if (GetUrlParameter('isMarket')) {
                if (isAndroid) {
                    iframe.attr('src', AndMarket);
                } else if (isiPhone) {
                    location.replace(iMarket);
                }
            }

		    if (GetURLParameter('isShare')) {
	    	    $timeout(function () {
	    	    	if (new Date - openAt < 4000) {
	    	    		if (isAndroid) {
	    	    			iframe.attr('src', AndMarket);
	    	    		} else if (isiPhone) {
	    	    			location.replace(iMarket);
	    	    		}
	    	    	}
	    	    }, 3000);

		    	if (isAndroid) {
		    		chrome25 = uagentLow.search('chrome') > -1 && navigator.appVersion.match(/Chrome\/\d+.\d+/)[0].split('/')[1] > 25;
		    		kitkatWebview = uagentLow.indexOf('naver') !== -1 || uagentLow.indexOf('daum') !== -1;

		    		if (chrome25) {
		    			if (id) {
		    				document.location.href = AndroidLinkParam;
		    			} else {
		    				document.location.href = AndroidLink;
		    			}
		    		} else {
		    			iframe.attr('src', 'mydearnest://move?position=0#Intent;scheme=mydearnest;package=com.osquare.mydearnest;end');
		    		}
		    	} else if (isiPhone) {
		    		if (id) {
		    			iframe.attr('src', iPhoneLinkParam);
		    		} else {
		    			iframe.attr('src', iPhoneLink);
		    		}
		    	}
		    }
		}
	}
}]);
