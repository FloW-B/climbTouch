requirejs.config({
    paths: {
        'text': '../bower_components/requirejs-text/text',
        'durandal': '../bower_components/durandal/js',
        'plugins': '../bower_components/durandal/js/plugins',
        'transitions': '../bower_components/durandal/js/transitions',
        'knockout': '../bower_components/knockout.js/knockout.debug',
        'jquery': '../bower_components/jquery/jquery',
        'koutils': '../bower_components/koutils/dist',
        'underscore': '../bower_components/underscore/underscore',
        'bootstrap': '../bower_components/bootstrap/dist/js/bootstrap',
        'modernizr': '../bower_components/modernizr/modernizr',
        'promise': '../bower_components/promise-ext/dist/promise',
        
    },
    shim: {
    bootstrap: {
            deps: ['jquery'],
            exports: 'jQuery'
        },
    modernizr: {
            exports: 'Modernizr'
        }
    }
});

define(['durandal/system', 'durandal/app', 'durandal/viewLocator', 'bootstrap'],  function (system, app, viewLocator) {
    //>>excludeStart("build", true);
    system.debug(true);
    //>>excludeEnd("build");

    app.title = "ClimbTouch";

    app.configurePlugins({
        router:true,
        dialog: true,
        widget: true
    });

    app.start().then(function() {
        // Replace 'viewmodels' in the moduleId with 'views' to locate the view.
        // Look for partial views in a 'views' folder in the root.
        viewLocator.useConvention();

        // Show the app by setting the root view model for our application with a transition.
        app.setRoot('viewmodels/shell');
    });
});