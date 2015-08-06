var React = require('react'),
	$ = require('jquery'),
	List = require('./ContentList/List');

var App = React.createClass({
	render: function  () {
		return (
			<div id="Content" className="magazineWrapper clearfix">
				<List />
			</div>
		);
	}
});

React.render(<App />, document.getElementById('ContentWrapper'));
