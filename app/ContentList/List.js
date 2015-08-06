var React = require('react'),
    $ = require('jquery'),
    Banner = require('../banner/Banner');

var List = React.createClass({
    getInitialState: function () {
        return {
            list: []
        };
    },
    componentDidMount: function () {
        $.get()
    },
    render: function () {
        return (
            <Banner/>

        );
    }
});

module.exports = List;
