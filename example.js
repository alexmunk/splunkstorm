var api_key = 'API_KEY';
var project_id = 'PROJECT_ID';

var storm = require('./storm');
var log = new storm.Log(api_key, project_id);
log.send("Mar 8 2012 21:37:00 MST test log data", undefined, "syslog");

var testobj = { 'testdata' : 'value', 'someotherfield' : 'someothervalue' };
log.send(JSON.stringify(testobj));
