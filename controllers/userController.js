//Controller
var request = require('request');
var cheerio = require('cheerio');
var async = require('async');



var demo1 = function (req, res) {
    if (!Object.keys(req.query).length > 0) {
        res.json({
            data: "You did not pass anyting"
        })
    }

    var urls = Object.keys(req.query).map((val) => {
        if (!req.query[val].match(/^[a-zA-Z]+:\/\//)) {
            req.query[val] = 'http://' + req.query[val];
        }
        return req.query[val]
    });

    let arr = [];
    for (let index = 0; index < urls.length; index++) {
        request(urls[index], function (error, response, body) {
            if (error) {
                const webpage = {
                    title: `No Response`,
                    url: urls[index]
                }
                arr.push(webpage)
            }
            if (!error && response.statusCode == 200) {
                const $ = cheerio.load(body);
                const webpageTitle = $("title").text();
                const webpage = {
                    title: webpageTitle,
                    url: urls[index]
                }
                arr.push(webpage)
            }
            if (urls.length - 1 === index) {
                setTimeout(() => {
                    res.render('demo', { response: arr })

                }, 4000);
            }
        });
    }
}

var demo2 = function (req, res) {
    if (!Object.keys(req.query).length > 0) {
        res.json({
            data: "You did not pass anyting"
        })
    }
    var urls = Object.keys(req.query).map((val) => {
        if (!req.query[val].match(/^[a-zA-Z]+:\/\//)) {
            req.query[val] = 'http://' + req.query[val];
        }
        return req.query[val]
    });

    async.map(urls, function (url, callback) {
        request(url, function (error, response, body) {
            if (error) {
                const webpage = {
                    title: `No Response`,
                    url: url
                }
                callback(null, webpage)
            }
            if (!error && response.statusCode == 200) {
                const $ = cheerio.load(body);
                const webpageTitle = $("title").text();
                const webpage = {
                    title: webpageTitle,
                    url: url
                }
                callback(null, webpage)
            }
        });
    }, function (err, response) {
        res.render('demo', { response: response })
    })
}



var demo3 = function (req, res) {
    if (!Object.keys(req.query).length > 0) {
        res.json({
            data: "You did not pass anyting"
        })
    }

    var urls = Object.keys(req.query).map((val) => {
        if (!req.query[val].match(/^[a-zA-Z]+:\/\//)) {
            req.query[val] = 'http://' + req.query[val];
        }
        return req.query[val]
    });

    var promise = [];
    urls.map((url, key) => {
        promise[key] = new Promise(function (resolve, reject) {
            request(url, function (error, response, body) {
                if (error) {
                    const webpage = {
                        title: `No Response`,
                        url: url
                    }
                    resolve(webpage)
                }
                if (!error && response.statusCode == 200) {
                    const $ = cheerio.load(body);
                    const webpageTitle = $("title").text();
                    const webpage = {
                        title: webpageTitle,
                        url: url
                    }
                    resolve(webpage)
                }
            });
        })
    })

    Promise.all(promise).then(resp => {
        res.render('demo', { response: resp })
    })
}



module.exports = {
    demo1,
    demo2,
    demo3
}