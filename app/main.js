var React = require('react'),
	$ = require('jquery');

var App = React.createClass({
	render: function  () {
		return (
			<div>
				Hello ?
			</div>
		);
	}
});

React.render(<App />, document.getElementById('app'));
