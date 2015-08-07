<?php
$id = $_GET["id"];
$payload = file_get_contents('http://mydearnestapi-env.elasticbeanstalk.com/open_api/magazines/'.$id);
$json = json_decode($payload);


$titleText = $json->data->contents->title->text;
$titleImageString = $json->data->contents->title->image->_id;
$titleImage = 'http://image.ggumim.co.kr/unsafe/'.$titleImageString.'/'.$titleImageString;
?>

<!doctype html>
<html ng-app="homedecoApp">
    <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1">
		<meta name="google-site-verification" content="7sqJZttErhMhQMJzVkSpmwXqWdSL66rd6NF5L6au4_0" />
		<!-- facebook app link -->
		<meta property="al:android:url" content="mydearnest://view?msgType=12&id=<?=$id?>&postType=0">
	    <meta property="al:android:package" content="com.osquare.mydearnest">
	    <meta property="al:android:app_name" content="집꾸미기">
	    <meta property="al:ios:url" content="mydearnest://view?msgType=12&id=<?=$id?>&postType=0" />
	    <meta property="al:ios:app_store_id" content="992731402" />
	    <meta property="al:ios:app_name" content="집꾸미기" />

	    <meta property="og:title" content=" 집꾸미기 " />
	    <meta property="og:type" content="website" />
	    <meta property="og:description" content="<?=$titleText?>" />
	    <meta property="og:image" content="<?=$titleImage?>" />

        <title>집꾸미기</title>
        <link rel="shortcut icon" type="image/png" href="/favicon.png">
        <!-- <link rel="alternate" href="android-app://com.osquare.mydearnest/mydearnest/view"/> -->
        <link href="http://fonts.googleapis.com/css?family=Noto+Sans" rel="stylesheet" type="text/css">

        <link rel="stylesheet" href="css/reset.css">
        <link rel="stylesheet" href="css/common.css">
        <link rel="stylesheet" href="css/view.css">

        <script src="http://code.jquery.com/jquery-2.1.4.min.js"></script>
        <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.3.13/angular.min.js"></script>
        <script src="https://code.angularjs.org/1.3.13/angular-sanitize.min.js"></script>

        <script src="./js/ng-infinite-scroll.min.js"></script>
        <script src="./js/imagesloaded.pkgd.min.js"></script>
        <script src="./js/controllers.js"></script>
    </head>

    <body ng-controller="MagazineController">
        <div id="Header">
            <a id="HeaderLogoButton" href="./">
                <img id="HeaderLogo" height="30" src="./img/logo.png" alt="집꾸미기">
            </a>
        </div>
        <div id="HeaderToApp">
            <a id="HeaderAppLink" href="" ng-click="gotoApp();"
                class="magazineItem HeaderAppLink">
            </a>
        </div>
        <div id="ContentWrapper">
            <div id="Content">
                <div ng-bind-html="title" id="MagazineTitle"></div>
                <div ng-bind-html="content" id="MagazineContent"></div>
                <div id="MagazineImages">
                	<div class="magazineContainer" ng-repeat="page in pages">
                		<div class="magazineImage">
	                        <img src="http://image.ggumim.co.kr/unsafe/{{page.image._id}}/{{page.image._id}}" width="100%">
	                        <div class="imagePinWrapper" ng-style="{ top: pin.offset.y + '%', left: pin.offset.x + '%' }" ng-repeat="pin in page.pins">
	                            <a class="imagePinMobileLink" href="#">
	                                <img src="img/pin.png" height="20" class="imagePinMobile">
	                            </a>

	                            <img src="img/pin.png" height="26" class="imagePin">
	                            <div class="pinProductWrapper">
	                                <img src="{{pin.contents.image}}" height="120" class="pinProductImage">
	                                <div class="pinProductContent">
	                                    <div class="pinProductTitle">{{pin.contents.title}}</div>
	                                    <div class="pinProductPrice">{{pin.contents.price}}원</div>
	                                    <a href="{{pin.contents.link}}" class="pinProductButton">구매처로 이동</a>
	                               </div>
	                            </div>
	                        </div>
	                    </div>
	                    <div class="desc-for-magazineImage" ng-bind-html="bindText(page.article.text)">
	                          	<!-- {{page.article.text}} -->
                        </div>

                	</div>

                </div>
            </div>
        </div>

        <div id="ProductPopupOverlayWrapper">
            <div id="ProductPopupOverlay"></div>
            <div id="ProductPopupWrapper">
                <div id="ProductPopup">
                    <div id="ProductPopupHeader">
                        <a id="ProductPopupExit" href="#">
                            <img src="./img/exit.png" width="18" alt="X">
                        </a>
                    </div>
                    <div id="ProductPopupContent" class="clearfix">
                        <img id="ProductPopupImage" src="http://shopping.phinf.naver.net/main_7765758/7765758043.jpg">
                        <div id="ProductPopupText">
                            <div id="ProductPopupTitle"></div>
                            <div id="ProductPopupPrice"></div>
                        </div>
                        <a target="_blank" href="#" id="ProductPopupButton">구매처로 이동</a>
                    </div>
                </div>
            </div>
        </div>

		<applink></applink>
        <script>
  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

  ga('create', 'UA-39127715-5', 'auto');
  ga('send', 'pageview');
        </script>
    </body>
</html>
