<?php

	$doc = new DOMDocument();
	// isMobile대신 공사중이라 잠시 타겟수정중.
	if (isMobile()) {
		$doc->loadHTMLFile("index_mobile.html");
		echo $doc->saveHTML();		
	} else {
		$doc->loadHTMLFile("index_web.html");
		echo $doc->saveHTML();	
	}
	
	function isMobile(){
        $arr_browser = array ("iphone", "android", "ipod", "iemobile", "mobile", "lgtelecom", "ppc", "symbianos", "blackberry", "ipad");
        $httpUserAgent = strtolower($_SERVER['HTTP_USER_AGENT']);
        // 기본값으로 모바일 브라우저가 아닌것으로 간주함
        $mobile_browser = false;
        // 모바일브라우저에 해당하는 문자열이 있는 경우 $mobile_browser 를 true로 설정
        for($indexi = 0 ; $indexi < count($arr_browser) ; $indexi++){
            if(strpos($httpUserAgent, $arr_browser[$indexi]) == true){
                $mobile_browser = true;
                break;
            }
        }
        return $mobile_browser;
	}
	
	function isAdmin() {
		$arr_browser = array ("mydearnest");
        $httpUserAgent = strtolower($_SERVER['HTTP_USER_AGENT']);
        // 기본값으로 모바일 브라우저가 아닌것으로 간주함
        $mobile_browser = false;
        // 모바일브라우저에 해당하는 문자열이 있는 경우 $mobile_browser 를 true로 설정
        for($indexi = 0 ; $indexi < count($arr_browser) ; $indexi++){
            if(strpos($httpUserAgent, $arr_browser[$indexi]) == true){
                $mobile_browser = true;
                break;
            }
        }
        return $mobile_browser;
	}
?>
