/**
 * Created by dllo on 17/2/13.
 */

//获取 crypto 模块
const crypto = require('crypto');
//定义对象的编码属性为 md5
const hash = crypto.createHash('md5');
//更新hash的内容为（内容）
hash.update('Hello, world!');
hash.update('Hello, nodejs!');
//计算所有传入数据的hash摘要并输出。（编码方式）可以为'hex', 'binary' 或者'base64'。
console.log(hash.digest('hex'));


//获取 crypto模块
const crypto = require('crypto');
//创建并返回一个hmac对象
const hmac = crypto.createHmac('sha256', 'secret-key');
//更新 hmac的内容
hmac.update('Hello, world!');
hmac.update('Hello, nodejs!');
//计算并输出所有传入的hmac摘要
console.log(hmac.digest('hex'));


//获取crypto模块
const crypto = require('crypto');
//创建方法
function aesEncrypt(data, key) {
    // 使用指定的算法和密钥创建并返回一个cipher对象。
    const cipher = crypto.createCipher('aes192', key);
    //使用制定的参数更新要加密的内容
    var crypted = cipher.update(data, 'utf8', 'hex');
    //返回所有剩余的加密内容
    crypted += cipher.final('hex');
    return crypted;
}

function aesDecrypt(encrypted, key) {
    //使用给定的算法和密钥创建并返回一个解密对象
    const decipher = crypto.createDecipher('aes192', key);
    //使用参数更新要解密的内容
    var decrypted = decipher.update(encrypted, 'hex', 'utf8');
    //返回全部剩余的已解密的明文，
    decrypted += decipher.final('utf8');
    return decrypted;
}
//定义内容
var data = 'Hello, this is a secret message!';
//定义密钥
var key = 'Password!';
//定义要加密的字符串
var encrypted = aesEncrypt(data, key);
//定义要解密的字符串
var decrypted = aesDecrypt(encrypted, key);
//输出结果
console.log('Plain text: ' + data);
console.log('Encrypted text: ' + encrypted);
console.log('Decrypted text: ' + decrypted);
//更新 hmac 的内容
hmac.update('Hello, world!');
hmac.update('Hello, nodejs!');
//输出
console.log(hmac.digest('hex'));


//获取 crypto 模块
const crypto = require('crypto');
//创建一个D-H密钥交换对象，并根据参数512的长度生成一个质数。默认为 2。
var ming = crypto.createDiffieHellman(512);
//生成秘钥和公钥，并返回指定格式的公钥。这个值必须传给其他部分。
var ming_keys = ming.generateKeys();
//用参数指明的编码方式返回D-H质数
var prime = ming.getPrime();
//用参数指明的编码方式返回D-H生成器
var generator = ming.getGenerator();
//输出密钥
console.log('Prime: ' + prime.toString('hex'));
console.log('Generator: ' + generator.toString('hex'));

// xiaohong's keys:
//使用传入的 prime和generator创建D-H秘钥交互对象。generator 可以是数字，字符串或Buffer。如果没有指定 generator，使用 2.prime可以是 'binary', 'hex', 或 'base64'。如果没有指定 prime_encoding， 则 Buffer 为 prime。
var hong = crypto.createDiffieHellman(prime, generator);
//生产密钥和公钥，返回制定格式的公钥。
var hong_keys = hong.generateKeys();


//交换和生成密钥
var ming_secret = ming.computeSecret(hong_keys);
var hong_secret = hong.computeSecret(ming_keys);


//输出密钥
console.log('Secret of Xiao Ming: ' + ming_secret.toString('hex'));
console.log('Secret of Xiao Hong: ' + hong_secret.toString('hex'));