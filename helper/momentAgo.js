const moment = require('moment')
moment.updateLocale('en', {
    relativeTime : {
        future: "in %s",
        past:   "%s ago",
        s  : 'a few seconds',
        ss : '%d seconds',
        m:  "a minute",
        mm: "%d minutes",
        h:  "1 hour", //this is the setting that you need to change
        hh: "%d hours",
        d:  "a day",
        dd: "%d days",
        w:  "a week",
        ww: "%d weeks",
        M:  "1 month", //change this for month
        MM: "%d months",
        y:  "a year",
        yy: "%d years"
    }
});

function momentsAgo(createdAt){
    return moment(createdAt).fromNow()
}

module.exports = momentsAgo