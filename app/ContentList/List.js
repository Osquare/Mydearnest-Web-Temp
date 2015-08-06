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
        var that = this;
        $.get(API_URL, function (data) {
            that.state.list = data.data;
        });
    },
    render: function () {
        var list = this.state.list;
        return (
            <Banner/>
            {
                list.map(function (data) {
                    var style = {
                        "background-image": 'url(' + data.image_url + ')'
                    };
                    return (
                        <a className="magazineItem" href="./view.php?id=" + {data.id} style={style}>
                            <div className="magazineItemGradient">
                                <div className="magazineItemText">
                                    {data.text}
                                </div>
                            </div>
                        </a>
                    );
                })
            }
        );
    }
});

module.exports = List;
