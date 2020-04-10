const crypto = require("crypto");

const IV_LENGTH = 16;

const ALGORITHM = "aes-256-cbc";

class Crypter {
  constructor(opt) {
    if (!opt.key) throw new Error("missing encryption key.");
    this.algorithm = opt.algorithm || ALGORITHM;
    this.key = Crypter.hash(opt.key);
    this.iv = opt.iv || Crypter.createKey(IV_LENGTH);
  }

  encrypt(str) {
    const cipher = crypto.createCipheriv(
      ALGORITHM,
      this.key,
      Buffer.from(this.iv, "hex")
    );

    let encrypted = cipher.update(str);
    encrypted = Buffer.concat([encrypted, cipher.final()]);

    return {
      algorithm: this.algorithm,
      iv: this.iv,
      data: encrypted.toString("hex"),
    };
  }

  decrypt(str) {
    const decipher = crypto.createDecipheriv(
      this.algorithm,
      Buffer.from(this.key),
      Buffer.from(this.iv, "hex")
    );

    let decryptedString = decipher.update(Buffer.from(str, "hex"));
    decryptedString = Buffer.concat([decryptedString, decipher.final()]);

    return {
      algorithm: this.algorithm,
      iv: this.iv,
      data: decryptedString.toString("utf8"),
    };
  }

  static hash(key) {
    return crypto.createHash("md5").update(key).digest("hex");
  }

  static createKey(length = IV_LENGTH) {
    return crypto.randomBytes(length).toString("hex");
  }
}

module.exports = Crypter;
