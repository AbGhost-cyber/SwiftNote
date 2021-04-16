import moment from "moment"

var time = 1618548040423;
var date = new Date()
 var s = moment(date).fromNow("yyyy:mm:dd:hh:mm:a")
 console.log(s);

