//! moment.js locale configuration
//! locale : Chechen [ce]

import moment from '../moment';

/**
 * Handles relative time formatting using Chechen grammatical gender classes (J, D, B).
 * For the future ("in X minutes"), it adds class-specific suffixes: йаьлча, даьлча, баьлча.
 * For the past ("X ago"), it returns the base noun, and moment adds 'хьалха'.
 */
function relativeTimeWithPlural(number, withoutSuffix, key, isFuture) {
    var format = {
        s: 'масех секунд',
        ss: 'секунд',
        m: 'минот',
        mm: 'минот',
        h: 'сахьт',
        hh: 'сахьт',
        d: 'де',
        dd: 'де',
        w: 'кӀира',
        ww: 'кӀира',
        M: 'бутт',
        MM: 'бутт',
        y: 'шо',
        yy: 'шо',
    };

    // Use only the noun for single units (s, m, h, d, w, M, y)
    var isSingle = /^(s|m|h|d|w|M|y)$/.test(key);
    var result = isSingle ? format[key] : number + ' ' + format[key];

    // Suffixes are only applied for FUTURE time (e.g., "in 5 minutes")
    if (isFuture) {
        if (key === 'M' || key === 'MM') {
            return result + ' баьлча'; // Class B (months)
        } else if (/^(h|hh|d|dd|w|ww|y|yy)$/.test(key)) {
            return result + ' даьлча'; // Class D (hours, days, weeks, years)
        } else {
            return result + ' йаьлча'; // Class J (seconds, minutes)
        }
    }

    return result;
}

var monthsParse = [
    /^янв/i, /^фев/i, /^мар/i, /^апр/i, /^ма[й]/i, /^июн/i,
    /^июл/i, /^авг/i, /^сен/i, /^окт/i, /^ноя/i, /^дек/i,
];

export default moment.defineLocale('ce', {
    months: 'январь_февраль_март_апрель_май_июнь_июль_август_сентябрь_октябрь_ноябрь_декабрь'.split('_'),
    monthsShort: 'янв._февр._мар._апр._май_июнь_июль_авг._сент._окт._нояб._дек.'.split('_'),
    weekdays: 'кӀиранде_оршот_шинара_кхаара_йеара_пӀераска_шот'.split('_'),
    weekdaysShort: 'кӀир_орш_шин_кхар_йеа_пӀер_шот'.split('_'),
    weekdaysMin: 'кӀир_орш_шин_кхар_йеа_пӀер_шот'.split('_'),
    monthsParse: monthsParse,
    longMonthsParse: monthsParse,
    shortMonthsParse: monthsParse,

    monthsRegex: /^(январь|январан|январехь|янв\.?|февраль|февралан|февралехь|февр?\.?|март|мартан|мартехь|мар\.?|апрель|апрелан|апрелехь|апр\.?|май|майан|майхь|июнь|июнан|июнехь|июн\.?|июль|июлан|июлехь|июл\.?|август|августан|августехь|авг\.?|сентябрь|сентябран|сентябрехь|сент?\.?|октябрь|октябран|октябрехь|окт\.?|ноябрь|ноябран|ноябрехь|нояб?\.?|декабрь|декабран|декабрехь|дек\.?)/i,
    monthsShortRegex: /^(январь|январан|январехь|янв\.?|февраль|февралан|февралехь|февр?\.?|март|мартан|мартехь|мар\.?|апрель|апрелан|апрелехь|апр\.?|май|майан|майхь|июнь|июнан|июнехь|июн\.?|июль|июлан|июлехь|июл\.?|август|августан|августехь|авг\.?|сентябрь|сентябран|сентябрехь|сент?\.?|октябрь|октябран|октябрехь|окт\.?|ноябрь|ноябран|ноябрехь|нояб?\.?|декабрь|декабран|декабрехь|дек\.?)/i,
    monthsStrictRegex: /^(январь|январан|январехь|февраль|февралан|февралехь|март|мартан|мартехь|апрель|апрелан|апрелехь|май|майан|майхь|июнь|июнан|июнехь|июль|июлан|июлехь|август|августан|августехь|сентябрь|сентябран|сентябрехь|октябрь|октябран|октябрехь|ноябрь|ноябран|ноябрехь|декабрь|декабран|декабрехь)/i,
    monthsShortStrictRegex: /^(янв\.?|февр?\.?|март?\.?|апр\.?|май\.?|июн\.?|июл\.?|авг\.?|сент?\.?|окт\.?|нояб?\.?|дек\.?)/i,

    longDateFormat: {
        LT: 'H:mm',
        LTS: 'H:mm:ss',
        L: 'YYYY.DD.MM',
        LL: 'YYYY [ш.] D MMMM',
        LLL: 'YYYY [ш.] D MMMM, H:mm',
        LLLL: 'dddd, YYYY [ш.] D MMMM, H:mm',
    },
    calendar: {
        sameDay: '[Тахана] LT',
        nextDay: '[Кхана] LT',
        lastDay: '[Селхана] LT',
        nextWeek: function (now) {
            return (now.week() !== this.week()) ? '[РогӀера] dddd, LT' : 'dddd, LT';
        },
        lastWeek: function (now) {
            return (now.week() !== this.week()) ? '[Хьалхара] dddd, LT' : 'dddd, LT';
        },
        sameElse: 'L',
    },
    relativeTime: {
        future: '%s', 
        past: '%s хьалха',
        s: relativeTimeWithPlural,
        ss: relativeTimeWithPlural,
        m: relativeTimeWithPlural,
        mm: relativeTimeWithPlural,
        h: relativeTimeWithPlural,
        hh: relativeTimeWithPlural,
        d: relativeTimeWithPlural,
        dd: relativeTimeWithPlural,
        w: relativeTimeWithPlural,
        ww: relativeTimeWithPlural,
        M: relativeTimeWithPlural,
        MM: relativeTimeWithPlural,
        y: relativeTimeWithPlural,
        yy: relativeTimeWithPlural,
    },
    meridiemParse: /буьйса|Ӏуьйре|де|суьйре/i,
    isPM: function (input) {
        return /^(де|суьйре)$/.test(input);
    },
    meridiem: function (hour, minute, isLower) {
        if (hour < 4) {
            return 'буьйса';
        } else if (hour < 12) {
            return 'Ӏуьйре';
        } else if (hour < 17) {
            return 'де';
        } else {
            return 'суьйре';
        }
    },
    dayOfMonthOrdinalParse: /\d{1,2}/,
    ordinal: function (number) {
        return number;
    },
    week: {
        dow: 1, // Monday is the first day of the week.
        doy: 4, // The week that contains Jan 4th is the first week of the year.
    },
});
