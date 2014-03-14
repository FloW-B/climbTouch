define(["jquery","knockout", "durandal/app", "durandal/system"], function ($,ko, app, system,http) {
    var
        // Public Properties

        isLoading = ko.observable(false),
      

        // Private Properties
        messageTitle = "Application Message",
        message = "Hello from your application",

        url = "http://climbtouch.com/api/spot/",

        qs = {
            tags: "mount sites",
            tagmode: "any",
            format:"json"
        },

        // Lifecycle Methods
        activate = function activate() {
            isLoading(true);

            $.get(url).then(function (response) {
          
                sites(response);

                isLoading(false);
            });
        },

        deactivate = function deactivate() {

        };

    return {
        isLoading: isLoading,
        activate: activate,
        deactivate: deactivate,
        sites: sites,
    };
});
