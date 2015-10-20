/**
 * Created by youngmoon on 10/20/15.
 */

var appname = "\uc9d1\uafb8\ubbf8\uae30 : \uc778\ud14c\ub9ac\uc5b4\uc758 \uc2dc\uc791";
var applink = "mydearnest://";  // id = nil
var fallback_url = "http://ggumim.co.kr/";
var android_package_name = null;


document.ontouchmove = function(event){
    event.preventDefault();
}



function show_buttons ()
{
    var message = document.getElementById('message');
    var buttons = document.getElementById('buttons');
    message.style.display = 'none';
    buttons.style.display = 'block';
}

/* Deprecated, but keeping for now */
var MESSAGE_ATTEMPTING = appname + ": Attempting to deeplink via " + applink;
var MESSAGE_CLEANUP_REQUIRED = appname + ": You’ve been deeplinked directly into the app!  Feel free to close this browser window.";
var MESSAGE_FALLING_BACK = appname + ": Loading website";
function set_message (msg)
{
    show_buttons();
}




if (location.hash != "" && location.search.indexOf("__deeplinkme_hash=") == -1) {
    fragment = encodeURIComponent(location.hash.substring(1))
    joiner = location.search != "" ? '&' : '?'
    dehashed_url = location.href.replace(/#.*/, joiner + '__deeplinkme_hash=' + fragment)
    location.replace(dehashed_url)
}
else {


    //// CONFIGURATION
    launch_timeout  = 1500;
    margin_of_error = 500;
    close_delay     = 1000;
    close_interval  = 3000;


    if (history.replaceState) {
        history.replaceState({}, "App Launched!  Welcome Back!",
            "/launch/cleanup"
            + "?appname="              + encodeURIComponent(appname)
            + "&applink="              + encodeURIComponent(applink)
            + "&fallback_url="         + encodeURIComponent(fallback_url)
            + "&android_package_name=" + encodeURIComponent(android_package_name)
            + "&app_logo_url="         + encodeURIComponent("")
            + "&launcher_text="        + encodeURIComponent("App \uc73c\ub85c \uc5f0\uacb0 \uc911 \uc785\ub2c8\ub2e4.")
        )
    }

    var has_safari = navigator.userAgent.indexOf('Safari/')  > -1;
    var is_ios9    = navigator.userAgent.indexOf('iPhone OS 9_')  > -1;

    var i = document.getElementById('i');
    launched_at = Date.now();
    setTimeout(function() {
        arrived_at = Date.now();
        if (arrived_at - launched_at > launch_timeout + margin_of_error) {
            set_message(MESSAGE_CLEANUP_REQUIRED);
            if (history.length > 1) {
                history.back();
            }
            else {
                setTimeout( function(){ close() }, close_delay);
                setInterval(function(){ close() }, close_interval);
            }
        } else {
            set_message(MESSAGE_FALLING_BACK);
            if (has_safari || true)
                location.replace(fallback_url);
        }
    }, launch_timeout);

    // Launch!
    if (has_safari && ! is_ios9) i.src = applink;
    else location.assign(applink);

}
