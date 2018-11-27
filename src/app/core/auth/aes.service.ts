import {Injectable} from '@angular/core';

import CryptoAes from 'crypto-aes-core';

@Injectable({providedIn: 'root'})
export class AesServerProvider {

    encrypt(encryptedData, AESKEY) {
        return CryptoAes.encrypt(encryptedData, AESKEY);
    }

    decrypt(encryptedData, AESKEY) {
        return CryptoAes.decrypt(encryptedData, AESKEY);
    }

    // 生成16位随机字符串函数
    randomString(len) {
        len = len || 16;
        let $chars = '0123456789abcdefghijklmnopqrstuvwxyz';
        /****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
        let maxPos = $chars.length;
        let randomStr = '';
        for (let i = 0; i < len; i++) {
            randomStr += $chars.charAt(Math.floor(Math.random() * maxPos));
        }
        return randomStr;
    }

    generateUUID() {
        var d = new Date().getTime();
        if (window.performance && typeof window.performance.now === "function") {
            d += performance.now(); //use high-precision timer if available
        }
        var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = (d + Math.random() * 16) % 16 | 0;
            d = Math.floor(d / 16);
            return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        });
        return uuid;
    }

}
