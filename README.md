# Landing Page Boilerplate
This is a basic project set up to create a landing page boilerplate. Includes posting via AJAX, google analytics, foundation and compiles via grunt.

## Usage
- From the directory run `bundle install`
- Run `grunt` to automatically watch and compile sass and inject it into the browser using [Browser sync](https://github.com/shakyShane/grunt-browser-sync) (also syncs html changes, scrolls, clicks and form inputs)
- Edit CSS and HTML as you wish
- Run `grunt dist` to compile

## Customising 
- Basic scss options are available at `app/styles/sass/partials/_vars.scss`
- Add your own Google Analytics ID in `app/includes/ga.html` (will only compile in dist)
- Change the body copy
- Change the mailchimp url
- Change the twitter post url (don't forget to use `%20` instead of spaces)
- Run `grunt dist` at the end and it will:
	- [Clean](https://github.com/gruntjs/grunt-contrib-clean) the dist folder
	- [processhtml](https://github.com/dciccale/grunt-processhtml) to include partials and switch out file links
	- [Sass](https://github.com/gruntjs/grunt-contrib-sass) compiles to css
	- [uglify](https://github.com/gruntjs/grunt-contrib-uglify) concatenates and minifies the JS
	- [uncss](https://github.com/addyosmani/grunt-uncss) scans the html files and removes any unused css classes (to avoid bloat from frameworks like foundation)
	- [htmlmin](https://github.com/gruntjs/grunt-contrib-htmlmin) minifies the html

## Help using Grunt
- [Grunt Boilerplate](http://integralist.co.uk/Grunt-Boilerplate.html)
- [Using Grunts Config API](http://integralist.co.uk/Using-Grunts-Config-API.html)