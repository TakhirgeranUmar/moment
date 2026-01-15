import { module, test } from '../qunit';
import moment from '../../moment';

module('locale:ce');

test('format', function (assert) {
    var b = moment([2026, 0, 14, 15, 25]); // 14 января 2026, среда
    var a = [
        ['dddd, YYYY [ш.] D MMMM, HH:mm', 'кхаара, 2026 ш. 14 январь, 15:25'],
        ['LL', '2026 ш. 14 январь'],
        ['L', '2026.14.01'],
        ['LT', '15:25'],
        ['MMMM', 'январь']
    ];
    var i;
    for (i = 0; i < a.length; i++) {
        assert.equal(b.format(a[i][0]), a[i][1], 'format ' + a[i][0] + ' should be ' + a[i][1]);
    }
});

test('calendar', function (assert) {
    assert.equal(moment().subtract({ d: 1 }).calendar().split(' ')[0], 'Селхана', 'yesterday');
    assert.equal(moment().calendar().split(' ')[0], 'Тахана', 'today');
    assert.equal(moment().add({ d: 1 }).calendar().split(' ')[0], 'Кхана', 'tomorrow');
});

test('relative time', function (assert) {
    assert.equal(moment.duration({ m: 1 }).humanize(), 'минот', 'a minute');
    assert.equal(moment.duration({ m: 5 }).humanize(), '5 минот', '5 minutes');
    assert.equal(moment.duration({ d: 1 }).humanize(), 'де', 'a day');
});

test('meridiem', function (assert) {
    assert.equal(moment([2026, 0, 14, 2]).format('A'), 'буьйсана', 'night');
    assert.equal(moment([2026, 0, 14, 8]).format('A'), 'Ӏуьйранна', 'morning');
    assert.equal(moment([2026, 0, 14, 15]).format('A'), 'дийнахь', 'afternoon');
    assert.equal(moment([2026, 0, 14, 21]).format('A'), 'суьйранна', 'evening');
});
