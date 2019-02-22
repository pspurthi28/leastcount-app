const CookieParser = {
    getCookieJson : () => {
        let cookieJson = {};
        let allcookieString = document.cookie;
        let cookies = allcookieString.split(";");
        cookies.forEach(cookie => {
            let entry = cookie.split("=");
            cookieJson[entry[0]] = entry[1];
        });
        return cookieJson;
    }
};

export default CookieParser;