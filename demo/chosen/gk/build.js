({
    name: 'custom',
    baseUrl: './',
    optimize: 'uglify2',
    //optimize: 'none',
    exclude: [],
    paths: {
        requireLib: 'require'
    },
    mainConfigFile: 'custom.js',
    out: 'jquery.gk-0.5.custom.min.js',
    // A function that if defined will be called for every file read in the
    // build that is done to trace JS dependencies.
    // Remove references to console.log(...)
    onBuildRead: function (moduleName, path, contents) {
        return contents;
        // return contents.replace(/console.log(.*);/g, '');
    }
})