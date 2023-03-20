const extensions = ['.js'];

console.log("required");

require('@swc/register')({
    jsc: {
        parser: {
            extensions,
            syntax: 'ecmascript',
            tsx: true,
            dynamicImport: true,
            exportDefaultFrom: true,
            importMeta: true,
            classPrivateProperty: true,
            classProperty: true,
            nullishCoalescing: true,
            optionalChaining: true,
            decorator: true,
            topLevelAwait: true,
        }
    },
});

