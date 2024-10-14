module.exports = {
    future: {
        v2_dev: true,
    },
    browserNodeBuiltinsPolyfill: {
        modules: {
            buffer: true, // Provide a JSPM polyfill
            fs: "empty", // Provide an empty polyfill
        },
        globals: {
            Buffer: true,
        },
    },
};