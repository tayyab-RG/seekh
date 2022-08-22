"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cookieParser = void 0;
function cookieParser(cookieString) {
    if (!cookieString)
        return {};
    let cookies = cookieString.split(';');
    cookies = cookies.map((elem) => {
        return elem.trim();
    });
    let obj = {};
    cookies.forEach((elem) => {
        let [key, value] = elem.split('=');
        obj[key] = value;
    });
    return obj;
}
exports.cookieParser = cookieParser;
