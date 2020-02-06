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
    let eTime, sTime, divider;
    switch (parseInt(type)) {
        case 0:
            eTime = getStandardTime();
            sTime = getStandardTime(30);//最近30分钟
            divider = 1000 * 60 * 5; //间隔设置为5分钟
            break;
        case 1:
            eTime = getStandardTime();
            sTime = getStandardTime(60);//最近60分钟
            divider = 1000 * 60 * 10; //间隔设置为10分钟
            break;
        case 2:
            eTime = getStandardTime();
            sTime = getStandardTime(60 * 12);//最近12小时
            divider = 1000 * 60 * 60 * 2; //间隔设置为60分钟（2个小时）
            break;
        case 3:
            eTime = getStandardTime();
            sTime = getStandardTime(60 * 24);//最近24小时
            divider = 1000 * 60 * 60 * 4; //间隔设置为4小时
            break;
        case 4:
            eTime = getStandardTime();
            sTime = getStandardTime(60 * 24 * 3);//最近3天
            divider = 1000 * 60 * 60 * 12; //间隔设置为12小时
            break;
        case 5:
            eTime = getStandardTime();
            sTime = getStandardTime(60 * 24 * 7);//最近7天
            divider = 1000 * 60 * 60 * 24; //间隔设置为1天
            break;
        default:
            break;
    }
    return {
        sTime,
        eTime,
        divider
    }
}