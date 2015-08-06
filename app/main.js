var React = require('react'),
	$ = require('jquery'),
	Banner = require('./banner/Banner');

var App = React.createClass({
	render: function  () {
		return (
			<div id="Content" className="magazineWrapper clearfix">
				<Banner />
			</div>
		);
	}
});

React.render(<App />, document.getElementById('app'));
