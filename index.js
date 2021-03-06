const babel = require('@babel/core');
const through2 = require('through2');

module.exports = function(opts) {
    return () => through2.obj(function(file, encoding, cb) {
        if (file.isNull()) {
            // nothing to do
            return cb(null, file);
        }

        try {
            const result = babel.transform(file.contents.toString(), opts);

            file.contents = Buffer.from(result.code);
        } catch (err) {
            this.emit('spearhook:error', { err, file });
        }

        cb(null, file);
    });
};
