// Uygulamanın söyleyebileceği tüm cümleleri JSON olarak yazar
const P = require('../www/phrases.js');
process.stdout.write(JSON.stringify(P.all(), null, 1));
