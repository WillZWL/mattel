var elixir = require('laravel-elixir');
require('laravel-elixir-vueify');
require('laravel-elixir-livereload');

elixir(mix => {
    mix.sass('app.scss');
    mix.styles(['custom.css'], 'public/css/custom.css');
    mix.browserify('app.js');
    mix.browserify('custom.js');
    mix.browserify('auth.js', 'public/js/index.js');
    mix.version(['public/js/app.js']);
    mix.livereload();
});
