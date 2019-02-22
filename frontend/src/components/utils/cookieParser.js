const CookieParser = {
    getCookieJson : () => {
        let cookieJson = {};
        let allcookieString = document.cookie;
        let cookies = allcookieString.split(";");
        cookies.forEach(cookie => {
            let entry = cookie.split("=");
            cookieJson[entry[0].replace(/\s/g, '')] = entry[1].replace(/\s/g, '');
        });
        return cookieJson;
    }
};

export default CookieParser;