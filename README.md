# strcrypter

Encrypt and decrypt strings easily, no dependencies, using crypto.

## Installing

```bash
npm i strcrypter
```

### USAGE

```js
//random iv
const Crypter = require("strcrypter");
const key = Crypter.createKey();
const secret = "my secret";
let crypter = new Crypter({ key });
const encrypted = crypter.encrypt(secret);
console.log(encrypted);
crypter = new Crypter({ key, iv: encrypted.iv });
const decoded = crypter.decrypt(encrypted.data);
console.log(decoded);
```

```js
//set iv
const Crypter = require("strcrypter");
const key = Crypter.createKey();
const iv = Crypter.createKey();
const secret = "my secret";
const crypter = new Crypter({ key, iv });
const encrypted = crypter.encrypt(secret);
console.log(encrypted);
const decoded = crypter.decrypt(encrypted.data);
console.log(decoded);
```

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
