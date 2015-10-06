<?php

// magazine : 19 
// feed_self : 5 
// feed_qa : 24 
// furniture : 16 
// interior : 18
// announce: 8
function getContent($payloadURL, &$body, &$result) {
    $body = file_get_contents($payloadURL);
    $result = json_decode($body);
}
$id = $_GET["id"];
$type = $_GET["isShare"];
$titleText = "집꾸미기";
$titleImageString = "";
$titleImage = "";
$payloadURL = "";
$payload = null;
$json = null;

if($type) {
    switch $type {
        case 'magazine':
            $payloadURL = 'http://api.ggumim.co.kr/1.7/magazines/'.$id;
            getContent($payloadURL, $payload, $json);            
            $titleText = $json->data->title;
            $titleImageString = $json->data->title_img->img_id;
        break;
        case 'feed_self':

        break;
        case 'feed_qa':

        break;
        case 'furniture':

        break;
        case 'interior':

        break;
        case 'announce':

        break;
        default:

    }
} else {
    return;
}

$titleImage = 'http://image.ggumim.co.kr/unsafe/'.$titleImageString.'/'.$titleImageString;
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <base href="/" />
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="google-site-verification" content="7sqJZttErhMhQMJzVkSpmwXqWdSL66rd6NF5L6au4_0" />
    <title>집꾸미기</title>
    <link rel="shortcut icon" type="image/png" href="/favicon.png">

    <!-- facebook app link -->
    <meta property="al:android:url" content="mydearnest://view?msgType=12">
    <meta property="al:android:package" content="com.osquare.mydearnest">
    <meta property="al:android:app_name" content="집꾸미기">
    <meta property="al:ios:url" content="mydearnest://view" />
    <meta property="al:ios:app_store_id" content="992731402" />
    <meta property="al:ios:app_name" content="집꾸미기" />

    <meta property="og:title" content=" 집꾸미기 " />
    <meta property="og:type" content="website" />
    <meta property="og:description" content="당신을 위한 인테리어 전문 앱 \n 집꾸미기를 소개합니다~" />
    <meta property="og:image" content="public/img/og_main.png" />

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

        ga('create', 'UA-67997647-1', 'auto');
        ga('send', 'pageview');
    </script>
</body>
</html>