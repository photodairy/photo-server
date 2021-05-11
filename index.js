'use strict';

const handler = require('./handler');


handler.app.listen(3000, () => {
    console.info('Listening on port 3000.');
});
