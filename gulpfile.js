var elixir = require('laravel-elixir');
require('laravel-elixir-vueify');
require('laravel-elixir-livereload');

elixir(mix => {
    mix.sass('app.scss');
    mix.styles(['custom.css'], 'public/css/custom.css');
    mix.browserify('app.js');
    mix.browserify('custom.js');
    // combine jquery file upload scripts
    mix.scripts([
        "./node_modules/blueimp-file-upload/js/vendor/jquery.ui.widget.js",
        "./node_modules/blueimp-tmpl/js/tmpl.min.js",
        "./node_modules/blueimp-file-upload/js/jquery.fileupload.js",
        "./node_modules/blueimp-file-upload/js/jquery.fileupload-process.js",
        "./node_modules/blueimp-file-upload/js/jquery.fileupload-validate.js",
        "./node_modules/blueimp-file-upload/js/jquery.iframe-transport.js",
        "./node_modules/blueimp-file-upload/js/jquery.fileupload-ui.js"
    ], "public/js/jquery.fileupload.js");
    mix.version(['public/js/app.js']);
    mix.livereload();
});
