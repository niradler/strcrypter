const Crypter = require("./index");

const key = Crypter.createKey();

const secret = "my secret";

let crypter = new Crypter({ key });

const encrypted = crypter.encrypt(secret);
console.log(encrypted);

crypter = new Crypter({ key, iv: encrypted.iv });

const decoded = crypter.decrypt(encrypted.data);
console.log(decoded);
