define(['plugins/router', "durandal/app"], function (router, app) {
    return {
        router: router,

        search: function() {
            app.showMessage("Not Implemented", "Error");
        },

        activate: function () {
            router.map([
                { route: '', moduleId: 'viewmodels/home', title: "Home", nav: true },
                {route:'about', moduleId: 'viewmodels/about',title:"About", nav:true},
                {"route":"create","moduleId":"viewmodels/create","title":"Create Spot","nav":false},
                /*{durandal:routes}*/
            ]).buildNavigationModel();
            
            return router.activate();
        }
    };
});