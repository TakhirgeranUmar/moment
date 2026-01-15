//! moment.js локалан конфигураци
//! locale : Chechen [ce]

import moment from '../moment';

function plural(word, num) {
    var forms = word.split('_');
    return num % 10 === 1 && num % 100 !== 11
        ? forms[0]
        : num % 10 >= 2 && num % 10 <= 4 && (num % 100 < 10 || num % 100 >= 20)
          ? forms[1]
          : forms[2];
}
function relativeTimeWithPlural(number, withoutSuffix, key) {
    var format = {
        ss: withoutSuffix ? 'секунд' : 'секунд',
        mm: withoutSuffix ? 'минот' : 'минот',
        hh: 'сахьт',
        dd: 'де',
        ww: 'кӀира',
        MM: 'бутт',
        yy: 'шо',
    };
    if (key === 'm') {
        return withoutSuffix ? 'минот' : 'минот';
    } else {
        return number + ' ' + plural(format[key], +number);
    }
}
var monthsParse = [
    /^янв/i,
    /^фев/i,
    /^мар/i,
    /^апр/i,
    /^ма[й]/i,
    /^июн/i,
    /^июл/i,
    /^авг/i,
    /^сен/i,
    /^окт/i,
    /^ноя/i,
    /^дек/i,
];

// months:
// Both 'format' and 'standalone' use the Nominative case (халхарниг дожар).
// While Chechen grammar often uses the Locative case (январехь) for dates, 
// the Nominative (январь) is chosen here as the primary display format for 
// better consistency across calendar interfaces and digital displays.
export default moment.defineLocale('ce', {
    months: {
        format: 'январь_февраль_март_апрель_май_июнь_июль_август_сентябрь_октябрь_ноябрь_декабрь'.split(
            '_'
        ),
        standalone:
            'январь_февраль_март_апрель_май_июнь_июль_август_сентябрь_октябрь_ноябрь_декабрь'.split(
                '_'
            ),
    },
    monthsShort: {
        // CLDR-ца иза "июл." а, "июнь" а ду, амма хӀун маьӀна ду элп тӀадам тӀе хийцарх?
        format: 'янв._февр._мар._апр._май_июнь_июль_авг._сент._окт._нояб._дек.'.split(
            '_'
        ),
        standalone:
            'янв._февр._март_апр._май_июнь_июль_авг._сент._окт._нояб._дек.'.split(
                '_'
            ),
    },
    weekdays: {
        standalone:
            'кӀиранде_оршот_шинара_кхаара_йеара_пӀераска_шот'.split(
                '_'
            ),
        format: 'кӀирандийнахь_оршотдийнахь_шинариндийнахь_кхаариндийнахь_йеарадийнахь_пӀераскандийнахь_шотдийнахь'.split(
            '_'
        ),
        isFormat: /\[ ?[] ?(?:дӀайаханчу|рогӀерчу|хӀинца)? ?] ?dddd/,
    },
    weekdaysShort: 'кӀир_орш_шин_кхар_йеа_пӀер_шот'.split('_'),
    weekdaysMin: 'кӀир_орш_шин_кхар_йеа_пӀер_шот'.split('_'),
    monthsParse: monthsParse,
    longMonthsParse: monthsParse,
    shortMonthsParse: monthsParse,

// monthsRegex: matches full names in multiple cases (Nominative, Genitive, Locative),
    // and abbreviations (3-4 letters) with or without dots.
    // This ensures the parser correctly identifies months regardless of the case ending used.
    monthsRegex:
        /^(январь|январан|январехь|янв\.?|февраль|февралан|февралехь|февр?\.?|март|мартан|мартехь|мар\.?|апрель|апрелан|апрелехь|апр\.?|май|майан|майхь|июнь|июнан|июнехь|июн\.?|июль|июлан|июлехь|июл\.?|август|августан|августехь|авг\.?|сентябрь|сентябран|сентябрехь|сент?\.?|октябрь|октябран|октябрехь|окт\.?|ноябрь|ноябран|ноябрехь|нояб?\.?|декабрь|декабран|декабрехь|дек\.?)/i,

// monthsShortRegex: copy of the above to ensure consistent month identification
    monthsShortRegex:
        /^(январь|январан|январехь|янв\.?|февраль|февралан|февралехь|февр?\.?|март|мартан|мартехь|мар\.?|апрель|апрелан|апрелехь|апр\.?|май|майан|майхь|июнь|июнан|июнехь|июн\.?|июль|июлан|июлехь|июл\.?|август|августан|августехь|авг\.?|сентябрь|сентябран|сентябрехь|сент?\.?|октябрь|октябран|октябрехь|окт\.?|ноябрь|ноябран|ноябрехь|нояб?\.?|декабрь|декабран|декабрехь|дек\.?)/i,

    // monthsStrictRegex: matches only full names in various cases
    monthsStrictRegex:
        /^(январь|январан|январехь|февраль|февралан|февралехь|март|мартан|мартехь|апрель|апрелан|апрелехь|май|майан|майхь|июнь|июнан|июнехь|июль|июлан|июлехь|август|августан|августехь|сентябрь|сентябран|сентябрехь|октябрь|октябран|октябрехь|ноябрь|ноябран|ноябрехь|декабрь|декабран|декабрехь)/i,

// monthsShortStrictRegex: matches only abbreviated forms (with or without dots).
    // This is used when the parser expects a short month format specifically.
    monthsShortStrictRegex:
        /^(янв\.?|февр?\.?|март?\.?|апр\.?|май\.?|июн\.?|июл\.?|авг\.?|сент?\.?|окт\.?|нояб?\.?|дек\.?)/i,
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
            if (now.week() !== this.week()) {
                switch (this.day()) {
                    case 0:
                        return '[PoгӀepa] dddd, LT';
                    case 1:
                    case 2:
                    case 4:
                        return '[PoгӀepa] dddd, LT';
                    case 3:
                    case 5:
                    case 6:
                        return '[PoгӀepa] dddd, LT';
                }
            } else {
                if (this.day() === 2) {
                    return '[] dddd, [] LT';
                } else {
                    return '[] dddd, [] LT';
                }
            }
        },
        lastWeek: function (now) {
            if (now.week() !== this.week()) {
                switch (this.day()) {
                    case 0:
                        return '[ДӀайаханчу] dddd, LT';
                    case 1:
                    case 2:
                    case 4:
                        return '[ДӀайаханчу] dddd, LT';
                    case 3:
                    case 5:
                    case 6:
                        return '[ДӀайаханчу] dddd, LT';
                }
            } else {
                if (this.day() === 2) {
                    return '[] dddd, [] LT';
                } else {
                    return '[] dddd, [] LT';
                }
            }
        },
        sameElse: 'L',
    },
    relativeTime: {
        future: '%s йисина хан',
        past: '%s хьалха',
        s: 'масех секунд',
        ss: relativeTimeWithPlural,
        m: relativeTimeWithPlural,
        mm: relativeTimeWithPlural,
        h: 'сахьт',
        hh: relativeTimeWithPlural,
        d: 'де',
        dd: relativeTimeWithPlural,
        w: 'кӀира',
        ww: relativeTimeWithPlural,
        M: 'бутт',
        MM: relativeTimeWithPlural,
        y: 'шо',
        yy: relativeTimeWithPlural,
    },
    meridiemParse: /буьйсана|Ӏуьйранна|дийнахь|суьйранна/i,
    isPM: function (input) {
        return /^(дийнахь|суьйранна)$/.test(input);
    },
    meridiem: function (hour, minute, isLower) {
        if (hour < 4) {
            return 'буьйсана';
        } else if (hour < 12) {
            return 'Ӏуьйранна';
        } else if (hour < 17) {
            return 'дийнахь';
        } else {
            return 'суьйранна';
        }
    },
    dayOfMonthOrdinalParse: /\d{1,2}-(||)/,
    ordinal: function (number, period) {
        switch (period) {
            case 'M':
            case 'd':
            case 'DDD':
                return number + '';
            case 'D':
                return number + '';
            case 'w':
            case 'W':
                return number + '';
            default:
                return number;
        }
    },
    week: {
        dow: 1, // Monday is the first day of the week.
        doy: 4, // The week that contains Jan 4th is the first week of the year.
    },
});
