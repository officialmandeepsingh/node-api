const models = require("../../models");

const dateTimeConvertor = (req, res, next) => {
    const dateParam = req.params['date']
    const timezoneParam = req.params['timezone']

    const currdate = new Date(dateParam)
    let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    let monthName = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
    const finalDate= ''+days[currdate.getDay()]+' '+monthName[currdate.getMonth()]+' '+currdate.getDate()+', '+currdate.getUTCFullYear() + ', '+currdate.getHours()+':'+currdate.getMinutes()+':'+currdate.getSeconds();
    res.json({
        status: 200,
        message: "Execute",
        data: {
            dateTimeUTC: dateParam,
            timezone: timezoneParam,
            dateTimeLocal: finalDate,
            timezoneOffset: currdate.getTimezoneOffset()
        }
    })
}

module.exports = dateTimeConvertor