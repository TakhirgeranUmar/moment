//! moment.js locale configuration
//! locale : Chechen [ce]

import moment from '../moment';

/**
 * Handles relative time formatting using Chechen grammatical gender classes (J, D, B).
 * In Chechen, the future suffix (equivalent to "in X minutes") varies based on the noun:
 * - 'йаьлча' is used for class J nouns (seconds, minutes).
 * - 'даьлча' is used for class D nouns (hours, days, weeks, years).
 * - 'баьлча' is used for class B nouns (months).
 * For the past tense ("X ago"), the universal suffix 'хьалха' is used for all classes.
 */
function relativeTimeWithPlural(number, withoutSuffix, key, isFuture) {
    var format = {
        ss: 'секунд',
        mm: 'минот',
        hh: 'сахьт',
        dd: 'де',
        ww: 'кӀира',
        MM: 'бутт',
        yy: 'шо',
    };

    // Special case for a single minute in the future
    if (key === 'm') {
        return isFuture ? 'минот йаьлча' : 'минот';
    }

    var result = number + ' ' + format[key];

    // Apply the correct grammatical class suffix for future time
    if (isFuture) {
        if (key === 'MM') {
            result += ' баьлча'; // Class B (months)
        } else if (key === 'hh' || key === 'dd' || key === 'ww' || key === 'yy') {
            result += ' даьлча'; // Class D (hours, days, weeks, years)
        } else {
            result += ' йаьлча'; // Class J (seconds, minutes)
        }
    }

    return result;
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
        format: 'январь_февраль_март_апрель_май_июнь_июль_август_сентябрь_октябрь_ноябрь_декабрь'.split('_'),
        standalone: 'январь_февраль_март_апрель_май_июнь_июль_август_сентябрь_октябрь_ноябрь_декабрь'.split('_'),
    },
    monthsShort: {
        // According to CLDR, it should be "июль" and "июнь". 
        // We avoid unnecessary dots where the abbreviation is the same length as the full name.
        format: 'янв._февр._мар._апр._май_июнь_июль_авг._сент._окт._нояб._дек.'.split('_'),
        standalone: 'янв._февр._март_апр._май_июнь_июль_авг._сент._окт._нояб._дек.'.split('_'),
    },
    weekdays: {
        standalone: 'кӀиранде_оршот_шинара_кхаара_йеара_пӀераска_шот'.split('_'),
        format: 'кӀиранде_оршот_шинара_кхаара_йеара_пӀераска_шот'.split('_'),
        isFormat: /\[ ?[] ?(?:хьалхара|рогӀера|хӀинца)? ?] ?dddd/,
    },
    weekdaysShort: 'кӀир_орш_шин_кхар_йеа_пӀер_шот'.split('_'),
    weekdaysMin: 'кӀир_орш_шин_кхар_йеа_пӀер_шот'.split('_'),
    monthsParse: monthsParse,
    longMonthsParse: monthsParse,
    shortMonthsParse: monthsParse,

    // monthsRegex: matches full names in multiple cases (Nominative, Genitive, Locative),
    // and abbreviations (3-4 letters) with or without dots.
    monthsRegex: /^(январь|январан|январехь|янв\.?|февраль|февралан|февралехь|февр?\.?|март|мартан|мартехь|мар\.?|апрель|апрелан|апрелехь|апр\.?|май|майан|майхь|июнь|июнан|июнехь|июн\.?|июль|июлан|июлехь|июл\.?|август|августан|августехь|авг\.?|сентябрь|сентябран|сентябрехь|сент?\.?|октябрь|октябран|октябрехь|окт\.?|ноябрь|ноябран|ноябрехь|нояб?\.?|декабрь|декабран|декабрехь|дек\.?)/i,

    // monthsShortRegex: copy of the above to ensure consistent month identification
    monthsShortRegex: /^(январь|январан|январехь|янв\.?|февраль|февралан|февралехь|февр?\.?|март|мартан|мартехь|мар\.?|апрель|апрелан|апрелехь|апр\.?|май|майан|майхь|июнь|июнан|июнехь|июн\.?|июль|июлан|июлехь|июл\.?|август|августан|августехь|авг\.?|сентябрь|сентябран|сентябрехь|сент?\.?|октябрь|октябран|октябрехь|окт\.?|ноябрь|ноябран|ноябрехь|нояб?\.?|декабрь|декабран|декабрехь|дек\.?)/i,

    // monthsStrictRegex: matches only full names in various cases
    monthsStrictRegex: /^(январь|январан|январехь|февраль|февралан|февралехь|март|мартан|мартехь|апрель|апрелан|апрелехь|май|майан|майхь|июнь|июнан|июнехь|июль|июлан|июлехь|август|августан|августехь|сентябрь|сентябран|сентябрехь|октябрь|октябран|октябрехь|ноябрь|ноябран|ноябрехь|декабрь|декабран|декабрехь)/i,

    // monthsShortStrictRegex: matches only abbreviated forms (with or without dots).
    monthsShortStrictStrictRegex: /^(янв\.?|февр?\.?|март?\.?|апр\.?|май\.?|июн\.?|июл\.?|авг\.?|сент?\.?|окт\.?|нояб?\.?|дек\.?)/i,

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
                return '[РогӀера] dddd, LT';
            } else {
                return 'dddd, LT';
            }
        },
        lastWeek: function (now) {
            if (now.week() !== this.week()) {
                return '[Хьалхара] dddd, LT';
            } else {
                return 'dddd, LT';
            }
        },
        sameElse: 'L',
    },
    relativeTime: {
        // Future suffix is handled dynamically inside the relativeTimeWithPlural function
        future: '%s', 
        past: '%s хьалха',
        s: 'масех секунд йаьлча',
        ss: relativeTimeWithPlural,
        m: 'минот йаьлча',
        mm: relativeTimeWithPlural,
        h: 'сахьт даьлча',
        hh: relativeTimeWithPlural,
        d: 'де даьлча',
        dd: relativeTimeWithPlural,
        w: 'кӀира даьлча',
        ww: relativeTimeWithPlural,
        M: 'бутт баьлча',
        MM: relativeTimeWithPlural,
        y: 'шо даьлча',
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
