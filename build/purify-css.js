var purify = require('purify-css');
require('shelljs/global');

// purify style.css
exec('jekyll build', function(code, stdout, stderr) {
});

var content = [
    '_site/index.html',
    '_site/404.html',
    '_site/blog/index.html',
    '_site/research/index.html',
	'_site/life/index.html'
]
var css = ['static/css/style.css']

var options = {
    output: 'static/css/style-purify.css'
};

purify(content, css, options);
