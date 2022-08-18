export function cookieParser(cookieString: string | undefined) {
    if (!cookieString) return {};

    let cookies = cookieString.split(';');
    cookies = cookies.map((elem) => {
        return elem.trim();
    });
    let obj: { [x: string]: string; } = {};
    cookies.forEach((elem: string) => {
        let [key, value] = elem.split('=');
        obj[key] = value;
    });
    return obj;
}