const secp = require("ethereum-cryptography/secp256k1");
const { toHex } = require("ethereum-cryptography/utils");
const { keccak256 } = require("ethereum-cryptography/keccak");

const privateKey = secp.secp256k1.utils.randomPrivateKey();

console.log(`Private Key :${toHex(privateKey)}`);

const publicKey = secp.secp256k1.getPublicKey(privateKey);
console.log(`Public Key :${toHex(publicKey)}`);

//Remove 1 byte
const Sliced = publicKey.slice(1);
// console.log(toHex(Sliced));

//Hash of remaining bytes
const keccak = keccak256(Sliced);

//Last 20 bytes of 32 bytes hash is address
const address = toHex(keccak).slice(-20);
console.log(`Address :${address}`);
