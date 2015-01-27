require.config({
    baseUrl: ".",
    paths: {
        'jquery': 'components/jquery/dist/jquery.min',
        'handlebars':'components/handlebars/handlebars.min',
        'bootstrap': 'components/bootstrap/dist/js/bootstrap',
        'ember': 'components/ember/ember.min',
        'forge': 'components/forge/forge'
    },
    shim: {
        'bootstrap': ['jquery'],
        'handlebars': ['bootstrap'],
        'ember': ['handlebars', 'forge']
    },

    // main application module
    deps: ["js/app.js"]
});