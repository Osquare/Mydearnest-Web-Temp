var React = require('react'),
    $ = require('jquery');

var Banner = React.createClass({
    render: function () {
        return (
            <a id="HeaderAppLink" href="https://play.google.com/store/apps/details?id=com.osquare.mydearnest"
                className="magazineItem HeaderAppLink" target="_blank">
            </a>
        );
    }
});

module.exports = Banner;
