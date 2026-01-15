import { module, test } from '../qunit';
import moment from '../../moment';

module('locale:ce');

test('parse', function (assert) {
    var tests = 'январь_янв._февраль_февр._март_мар._апрель_апр._май_май_июнь_июнь_июль_июль_август_авг._сентябрь_сент._октябрь_окт._ноябрь_нояб._декабрь_дек.'.split('_'),
        i;
    function makeTest(i) {
        assert.equal(moment(tests[i], 'MMMM').month(), i, tests[i] + ' should be month ' + (i + 1));
    }
    for (i = 0; i < 12; i++) {
        makeTest(i);
    }
});

test('format', function (assert) {
    var a = [
            ['dddd, YYYY [ш.] D MMMM, HH:mm', 'оршот, 2026 ш. 12 январехь, 15:25'],
            ['LL', '2026 ш. 12 январехь'],
            ['L', '2026.12.01'],
            ['LT', '15:25']
        ],
        b = moment([2026, 0, 12, 15, 25]),
        i;
    for (i = 0; i < a.length; i++) {
        assert.equal(b.format(a[i][0]), a[i][1], 'usage ' + a[i][0]);
    }
});

test('calendar yesterday', function (assert) {
    assert.equal(moment().subtract({ d: 1 }).calendar().split(' ')[0], 'Селхана', 'yesterday');
});

test('calendar today', function (assert) {
    assert.equal(moment().calendar().split(' ')[0], 'Тахана', 'today');
});

test('calendar tomorrow', function (assert) {
    assert.equal(moment().add({ d: 1 }).calendar().split(' ')[0], 'Кхана', 'tomorrow');
});
