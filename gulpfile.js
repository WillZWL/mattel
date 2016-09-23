var elixir = require('laravel-elixir');
require('laravel-elixir-vueify');
require('laravel-elixir-livereload');
// require('laravel-elixir-vue');

/*
 |--------------------------------------------------------------------------
 | Elixir Asset Management
 |--------------------------------------------------------------------------
 |
 | Elixir provides a clean, fluent API for defining some basic Gulp tasks
 | for your Laravel application. By default, we are compiling the Sass
 | file for our application, as well as publishing vendor resources.
 |
 */

elixir(mix => {
    mix.sass('app.scss');
    mix.styles(['custom.css'], 'public/css/custom.css');
    // mix.copy('./node_modules/bootstrap/dist/fonts/', 'public/fonts/');
    // mix.copy('./node_modules/font-awesome/fonts', 'public/fonts/');
    // mix.copy('./node_modules/jquery/dist/jquery.min.js', 'public/js/jquery.min.js');
    mix.browserify('app.js');
    mix.browserify('custom.js');
    mix.browserify('auth/index.js', 'public/js/index.js');
    mix.version(['public/js/app.js', 'public/js/custom.js']);
    mix.livereload();
});
