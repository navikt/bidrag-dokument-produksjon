module.exports = {
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