exports.getNowTimeString = function () {
    const date = new Date(Date.now());
    date.setMinutes(date.getMinutes() - date.getTimezoneOffset());
    return date.toISOString();
}

function getStandardTime(divider) {
    const date = new Date(Date.now());
    if (divider) {
        date.setMinutes(date.getMinutes() - date.getTimezoneOffset() - divider);
    } else {
        date.setMinutes(date.getMinutes() - date.getTimezoneOffset());
    }
    return date;
}

exports.computeTimeDivider = function (type) {
    switch (parseInt(type)) {
        case 0:
            eTime = getStandardTime();
            sTime = getStandardTime(30);//最近30分钟
            break;
        case 1:
            eTime = getStandardTime();
            sTime = getStandardTime(60);//最近60分钟
            break;
        case 2:
            eTime = getStandardTime();
            sTime = getStandardTime(60 * 12);//最近12小时
            break;
        case 3:
            eTime = getStandardTime();
            sTime = getStandardTime(60 * 24);//最近24小时
            break;
        case 4:
            eTime = getStandardTime();
            sTime = getStandardTime(60 * 24 * 3);//最近3天
            break;
        case 5:
            eTime = getStandardTime();
            sTime = getStandardTime(60 * 24 * 7);//最近7天
            break;
        default:
            break;
    }
    return {
        sTime,
        eTime
    }
}
