import crypto from 'crypto';
const alg = '82hs08s';
const pwd = 'hasu401';

export const hashKey= 'mundowapHash'

export const makeHash = (hashKey) =>{
    const chiper = crypto.createCipheriv(alg, pwd);
    const crypted = chiper.update(hashKey,'utf8','hex')
    return crypted;
}


export const makeDcrypt = () =>{
    const decipher = crypto.createCipheriv(alg,pwd);
    const plain = decipher.update(hashKey,'hex', 'utf8')
    return plain;
}
