function strftime(date, patternStr) {
    const twoDigitPad = x => String(x).padStart(2, 0);
    const dayOfWeekNames = [...Array(7).keys()].map(key => new Date(0, 0, key).toLocaleString('en', { weekday: "long" }));
    const monthNames = [...Array(12).keys()].map(key => new Date(0, key).toLocaleString('en', { month: 'long' }));

    if (!patternStr) 
        patternStr = 'yyyy-MM-dd';
    
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
        yyyy = year + "",
        yy = yyyy.substr(2, 2)
    ;
    // checks to see if month name will be used
    patternStr = patternStr.replace('hh', hh)
      .replace('h', h).replace('HH', HH)
      .replace('H', hour).replace('mm', mm)
      .replace('m', minute).replace('ss', ss)
      .replace('s', second).replace('S', miliseconds)
      .replace('dd', dd).replace('d', day)
      .replace('EEEE', EEEE).replace('EEE', EEE)
      .replace('yyyy', yyyy).replace('yy', yy)
      .replace('aaa', aaa);
    if (patternStr.indexOf('MMM') > -1) {
        patternStr = patternStr
          .replace('MMMM', MMMM)
          .replace('MMM', MMM);
    }
    else {
        patternStr = patternStr.replace('MM', MM)
          .replace('M', M);
    }
    return patternStr;
}