const path = require('path');

module.exports = {
    // ...existing code...
    resolve: {
        fallback: {
            "stream": require.resolve("stream-browserify"),
            "path": require.resolve("path-browserify"),
            "assert": require.resolve("assert/"),
        }
    },
    // ...existing code...
};
