//https://cdn.jsdelivr.net/gh/mmkathurima/strftime/strftime.js
function formatDate(patternStr, date) {
    const twoDigitPad = x => String(x).padStart(2, '0');
    const dayOfWeekNames = [...Array(7).keys()].map(key => new Date(0, 0, key)
        .toLocaleString('en', { weekday: "long" }));
    const monthNames = [...Array(12).keys()].map(key => new Date(0, key)
        .toLocaleString('en', { month: 'long' }));

    if (!patternStr)
        patternStr = 'yyyy-MM-dd';

    if (!date)
        date = new Date();

    const day = date.getDate(),
        month = date.getMonth(),
        year = date.getFullYear(),
        hour = date.getHours(),
        minute = date.getMinutes(),
        second = date.getSeconds(),
        miliseconds = date.getMilliseconds(),
        h = hour % 12,
        hh = twoDigitPad(h),
        HH = twoDigitPad(hour),
        mm = twoDigitPad(minute),
        ss = twoDigitPad(second),
        aaa = hour < 12 ? 'AM' : 'PM',
        EEEE = dayOfWeekNames[date.getDay()],
        EEE = EEEE.substr(0, 3),
        dd = twoDigitPad(day),
        M = month + 1,
        MM = twoDigitPad(M),
        MMMM = monthNames[month],
        MMM = MMMM.substr(0, 3),
        yyyy = String(year),
        yy = yyyy.substr(2, 2);

    patternStr = patternStr.replace('hh', hh)
        .replace('h', String(h))
        .replace('HH', HH)
        .replace('H', String(hour))
        .replace('mm', mm)
        .replace('m', String(minute))
        .replace('ss', ss)
        .replace('s', String(second))
        .replace('S', String(miliseconds))
        .replace('dd', dd)
        .replace('d', String(day))
        .replace('EEEE', EEEE)
        .replace('EEE', EEE)
        .replace('yyyy', yyyy)
        .replace('yy', yy)
        .replace('aaa', aaa);

    if (patternStr.indexOf('MMM') > -1)
        patternStr = patternStr.replace('MMMM', MMMM).replace('MMM', MMM);
    else
        patternStr = patternStr.replace('MM', MM).replace('M', String(M));

    return patternStr;
}

function strftime(sFormat, date) {
    const nDay = date.getDay();
    const nDate = date.getDate();
    const nMonth = date.getMonth();
    const nYear = date.getFullYear();
    const nHour = date.getHours();
    const nTime = date.getTime();
    const aDays = [...Array(7).keys()].map(key =>
        new Date(0, 0, key).toLocaleString('en', { weekday: 'long' }));
    const aMonths = [...Array(12).keys()].map(key =>
        new Date(0, key).toLocaleString('en', { month: 'long' }));
    const aDayCount = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];
    const isLeapYear = () => (nYear % 4 === 0 && nYear % 100 !== 0) || nYear % 400 === 0;
    const getThursday = () => {
        const target = new Date(date);
        target.setDate(nDate - ((nDay + 6) % 7) + 3);
        return target;
    };
    const zeroPad = (nNum, nPad) => ((Math.pow(10, nPad) + nNum) + '').slice(1);

    return sFormat.replace(/%[a-z]+\b/gi, (sMatch) => {
        return (({
            '%a': aDays[nDay].slice(0, 3),
            '%A': aDays[nDay],
            '%b': aMonths[nMonth].slice(0, 3),
            '%B': aMonths[nMonth],
            '%c': date.toUTCString().replace(',', ''),
            '%C': Math.floor(nYear / 100),
            '%d': zeroPad(nDate, 2),
            '%e': nDate,
            '%F': (new Date(nTime - (date.getTimezoneOffset() * 60000))).toISOString().slice(0, 10),
            '%G': getThursday().getFullYear(),
            '%g': (getThursday().getFullYear() + '').slice(2),
            '%H': zeroPad(nHour, 2),
            '%I': zeroPad((nHour + 11) % 12 + 1, 2),
            '%j': zeroPad(aDayCount[nMonth] + nDate + ((nMonth > 1 && isLeapYear()) ? 1 : 0), 3),
            '%k': nHour,
            '%l': (nHour + 11) % 12 + 1,
            '%m': zeroPad(nMonth + 1, 2),
            '%n': nMonth + 1,
            '%M': zeroPad(date.getMinutes(), 2),
            '%p': (nHour < 12) ? 'AM' : 'PM',
            '%P': (nHour < 12) ? 'am' : 'pm',
            '%s': Math.round(nTime / 1000),
            '%S': zeroPad(date.getSeconds(), 2),
            '%u': nDay || 7,
            '%V': (() => {
                const target = getThursday();
                const n1stThu = target.valueOf();
                target.setMonth(0, 1);
                const nJan1 = target.getDay();
                if (nJan1 !== 4) target.setMonth(0, 1 + ((4 - nJan1) + 7) % 7);
                return zeroPad(1 + Math.ceil((n1stThu - target) / 604800000), 2);
            })(),
            '%w': nDay,
            '%x': date.toLocaleDateString(),
            '%X': date.toLocaleTimeString(),
            '%y': (nYear + '').slice(2),
            '%Y': nYear,
            '%z': date.toTimeString().replace(/.+GMT([+-]\d+).+/, '$1'),
            '%Z': date.toTimeString().replace(/.+\((.+?)\)$/, '$1'),
            '%Zs': new Intl.DateTimeFormat('default', {
                timeZoneName: 'short',
            }).formatToParts(date).find((oPart) => oPart.type === 'timeZoneName')?.value,
        }[sMatch] || '') + '') || sMatch;
    });
}
