const path = require('path');

module.exports = {
    // ...existing code...
    resolve: {
        fallback: {
            "path": require.resolve("path-browserify"),
            "assert": require.resolve("assert/"),
            "fs": require.resolve("browserify-fs")
        }
    },
    // ...existing code...
};
