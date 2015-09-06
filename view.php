<?php
$id = $_GET["id"];
$payload = file_get_contents('http://mydearnestapi-env.elasticbeanstalk.com/open_api/magazines/'.$id);
$json = json_decode($payload);


$titleText = $json->data->contents->title->text;
$titleImageString = $json->data->contents->title->image->_id;
$titleImage = 'http://image.ggumim.co.kr/unsafe/'.$titleImageString.'/'.$titleImageString;
?>

<!doctype html>
<html>
    <head>
        <base href="/" />
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

        <link rel="stylesheet" href="public/css/reset.css">
        <link rel="stylesheet" href="public/css/common.css">
        <link rel="stylesheet" href="public/css/main.css">
        <link rel="stylesheet" href="public/css/view.css">

        <script src="http://code.jquery.com/jquery-1.11.2.min.js"></script>
        <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.3.13/angular.min.js"></script>
        <script src="public/js/ng-ui-router.js"></script>
        <script src="https://code.angularjs.org/1.2.14/angular-sanitize.min.js"></script>
        <script src="public/js/byposting_cpc_sdk.js"></script>
        <script src="public/js/ng-infinite-scroll.min.js"></script>
        <!-- <script src="./js/main.js"></script> -->
    </head>
    <body ng-app="homedecoApp">
        <div id="Header">
            <a id="HeaderLogoButton" href="./">
                <img id="HeaderLogo" height="30" src="./public/img/logo.png" alt="집꾸미기">
            </a>
        </div>
        <div ui-view=""></div>

        <iframe id="applink"></iframe>

        <script src="public/js/controller.js"></script>
        <script>
            (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
                        (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
                    m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
            })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

            ga('create', 'UA-57246452-1', 'auto');
            ga('send', 'pageview');
        </script>
    </body>
</html>
