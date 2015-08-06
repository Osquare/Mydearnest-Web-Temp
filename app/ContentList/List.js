var React = require('react'),
    $ = require('jquery'),
    Banner = require('../banner/Banner'),
    API_URL = 'http://mydearnestapi-env.elasticbeanstalk.com/open_api/magazines',
    IMAGE_URL = 'http://image.ggumim.co.kr/unsafe/{id}/{id}';

var escapeHTML = function(text) {
    return text.replace('&', '&amp;').replace('<', '&lt;').replace('>', '&gt;').replace(/\n/gi, '<br>');
};

var List = React.createClass({
    getInitialState: function () {
        return {
            list: []
        };
    },
    componentDidMount: function () {
        var that = this;
        $.get(API_URL, function (data) {
            that.setState({
                list: data.data
            });
        });
    },
    render: function () {
        var list = this.state.list;
        return (
            <div>
                <Banner/>
                {
                    list.map(function (data) {
                        var data = {
                            id: data._id,
                            image_url: IMAGE_URL.replace(/{id}/gi, data.contents.title.image),
                            text: escapeHTML(data.contents.title.text)
                        };
                        var href = './view.php?id=' + data.id;
                        var style = {
                            "background-image": 'url(' + data.image_url + ')'
                        };
                        return (
                            <a className="magazineItem" href={href} style={style}>
                                <div className="magazineItemGradient">
                                    <div className="magazineItemText">
                                        {data.text}
                                    </div>
                                </div>
                            </a>
                        );
                    })
                }
            </div>
        );
    }
});

module.exports = List;
