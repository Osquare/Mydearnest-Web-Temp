<?php 
    header("Status: 301 Moved Permanently");
    header("Location: http://anthology.ggumim.co.kr/redirect?". $_SERVER['QUERY_STRING']);
    exit;
?>
