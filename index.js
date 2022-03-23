import babel from '@babel/core';
import through2 from 'through2';

export default function(opts) {
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
