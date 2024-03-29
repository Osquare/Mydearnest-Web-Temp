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
$titleText = "당신을 위한 인테리어 전문 앱 \n 집꾸미기를 소개합니다~";
$titleImageString = "";
$titleImage = "http://ggumim.co.kr/public/img/og_main.png";
$payloadURL = "";
$payload = null;
$json = null;

if($type) {
    switch ($type) {
        case 'magazine':
            $payloadURL = 'http://api.ggumim.co.kr/1.7/magazines/'.$id;
            getContent($payloadURL, $payload, $json);            
            $titleText = $json->data->title;
            $titleImageString = $json->data->title_img->img_id;
        break;
        case 'feed_self':
			$payloadURL = 'http://api.ggumim.co.kr/1.7/feeds/'.$id.'?type=5';
            getContent($payloadURL, $payload, $json);            
            $titleText = $json->data->text;
            $titleImageString = $json->data->images[0]->img_id;
        break;
        case 'feed_qa':
			$payloadURL = 'http://api.ggumim.co.kr/1.7/feeds/'.$id.'?type=24';
            getContent($payloadURL, $payload, $json);            
            $titleText = $json->data->text;
            $titleImageString = $json->data->images[0]->img_id;
        break;
        case 'furniture':
			$payloadURL = 'http://api.ggumim.co.kr/1.7/furnitures/'.$id;
            getContent($payloadURL, $payload, $json);            
            $titleText = $json->data->model;
            $titleImageString = $json->data->image->img_id;
        break;
        case 'interior':
			$payloadURL = 'http://api.ggumim.co.kr/1.7/interiors/'.$id;
            getContent($payloadURL, $payload, $json);            
            $titleText = '집꾸미기 인테리어 사진 ';
            $titleImageString = $json->data->image->img_id;
        break;
        default:

    }
} 

$titleImage = empty($titleImageString) ? "$titleImage" :
	'http://image.ggumim.co.kr/unsafe/'.$titleImageString.'/'.$titleImageString;
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <base href="/" />
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>집꾸미기</title>
    <link rel="shortcut icon" type="image/png" href="/public/img/favicon.png">

    <!-- iOS -->
    <meta property="al:ios:url" content="mydearnest://view?msgType=19" />
    <meta property="al:ios:app_store_id" content="992731402" />
    <meta property="al:ios:app_name" content=" 집꾸미기 " />

    <!-- Android -->
    <meta property="al:android:url" content="mydearnest://view?msgType=19" />
    <meta property="al:android:package" content="com.osquare.mydearnest" />
    <meta property="al:android:app_name" content="집꾸미기" />

    <meta property="og:title" content=" 집꾸미기 " />
    <meta property="og:type" content="website" />
    <meta property="og:description" content="<?=$titleText?>" />
    <meta property="og:image" content="<?=$titleImage?>" />

    <link rel="stylesheet" href="public/css/reset.css">

    <script src="http://code.jquery.com/jquery-1.11.2.min.js"></script>
    <script src="public/js/byposting_cpc_sdk.js"></script>
    <script src="public/js/imagesloaded.pkgd.min.js"></script>
</head>
<body ng-app="homedecoApp">
    <!-- Application Header -->
    <app-header></app-header>

    <!-- Banner for App Link -->
    <banner></banner>

    <!-- Views -->
    <div data-ui-view=""></div>

    <!-- Item Layer -->
    <item-layer></item-layer>
    <script src="./dist/bundle0042.js"></script>
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