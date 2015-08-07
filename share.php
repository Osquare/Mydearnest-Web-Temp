<?php
$id = $_GET["id"];


?>
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <meta property="og:title" content=" 집꾸미기 " />
	    <meta property="og:type" content="website" />
	    <meta property="og:description" content="<?=$titleText?>" />
	    <meta property="og:image" content="<?=$titleImage?>" />

        <title>집꾸미기</title>
        <link rel="shortcut icon" type="image/png" href="/favicon.png">
    </head>
    <body>
        앱으로 이동합니다.
        <script>
            alert("<?=$id?>");
        </script>
    </body>
</html>
