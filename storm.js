var request = require('request');

/*
** Constructor.  Create state in the object
*/
Log = function(access_token, project_id) {
    this.access_token = access_token;
    this.project_id = project_id;
    this.url = 'https://api.splunkstorm.com/1/inputs/http';
}

/* 
** Send log data to Storm
*/
Log.prototype.send = function(eventtext, sourcetype, host, source) {
    sourcetype = typeof sourcetype !== 'undefined' ? sourcetype : 'syslog';

    params = { 'project' : this.project_id,
                'sourcetype' : sourcetype };
    if (typeof host !== 'undefined') {
        params['host'] = host;
    }
    if (typeof source !== 'undefined') {
        params['source'] = source;
    }
    
    var urlarr = [ ];
    for (var key in params) {
        urlarr.push(encodeURIComponent(key) + '=' + encodeURIComponent(params[key]));
    }
    var url = this.url + '?' + urlarr.join('&');
    
    var options = {
        url: url,
        method: 'POST',
        body: eventtext,
        headers: {
            Authorization: "Basic " + new Buffer(this.access_token + ":").toString("base64")
        }
    };
    
    console.log("options: ", options);
    try {
        console.log("Making HTTP request");
        request(options, function(err, response, data) {
            var statusCode = (response ? response.statusCode : 500) || 500;
            var headers = (response ? response.headers : {}) || {};
            console.log("Request came back.  Statuscode: ", statusCode);
            console.log("Proxy response: ", data || JSON.stringify(err));
        });
    }
    catch (ex) {
        console.log("Caught exception: ", ex)
    }
}

exports.Log = Log;