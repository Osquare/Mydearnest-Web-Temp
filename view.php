<?php
$id = $_GET["id"];
$payload = file_get_contents('http://api.ggumim.co.kr/1.7/magazines/'.$id);
$json = json_decode($payload);


$titleText = $json->data->title;
$titleImageString = $json->data->title_img->img_id;
$titleImage = 'http://image.ggumim.co.kr/unsafe/'.$titleImageString.'/'.$titleImageString;
?>

<!doctype html>
<html>
    <head>
        <base href="/" />
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1">
	    <meta property="og:title" content=" 집꾸미기 " />
	    <meta property="og:type" content="website" />
	    <meta property="og:description" content="<?=$titleText?>" />
	    <meta property="og:image" content="<?=$titleImage?>" />

        <title>집꾸미기</title>
        <link rel="shortcut icon" type="image/png" href="/favicon.png">
        <!-- <link rel="alternate" href="android-app://com.osquare.mydearnest/mydearnest/view"/> -->
        <link href="http://fonts.googleapis.com/css?family=Noto+Sans" rel="stylesheet" type="text/css">

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

        <script src="./dist/bundle0035.js"></script>
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
