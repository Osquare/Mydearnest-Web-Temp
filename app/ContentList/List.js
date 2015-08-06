var React = require('react'),
    $ = require('jquery'),
    Banner = require('../banner/Banner'),
    API_URL = 'http://mydearnestapi-env.elasticbeanstalk.com/open_api/magazines';

var List = React.createClass({
    getInitialState: function () {
        return {
            list: []
        };
    },
    componentDidMount: function () {
        $.get(API_URL, function (data) {
            console.log(data);
        });
    },
    render: function () {
        return (
            <Banner/>

        );
    }
});

module.exports = List;
