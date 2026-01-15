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
        ['MMMM', 'январь'],
        ['dddd', 'кхаара']
    ];
    var i;
    for (i = 0; i < a.length; i++) {
        assert.equal(b.format(a[i][0]), a[i][1], 'format ' + a[i][0] + ' should be ' + a[i][1]);
    }
});

test('calendar', function (assert) {
    var now = moment([2026, 0, 14]); 
    assert.equal(moment(now).subtract({ d: 1 }).calendar().split(' ')[0], 'Селхана', 'yesterday');
    assert.equal(moment(now).calendar().split(' ')[0], 'Тахана', 'today');
    assert.equal(moment(now).add({ d: 1 }).calendar().split(' ')[0], 'Кхана', 'tomorrow');
    
    // Проверка Хьалхара / РогӀера
    assert.equal(moment(now).subtract({ d: 7 }).calendar().split(' ')[0], 'Хьалхара', 'last week');
    assert.equal(moment(now).add({ d: 7 }).calendar().split(' ')[0], 'РогӀера', 'next week');
});

test('relative time', function (assert) {
    assert.equal(moment.duration({ m: 1 }).humanize(), 'минот', 'a minute');
    assert.equal(moment.duration({ m: 5 }).humanize(), '5 минот', '5 minutes');
    assert.equal(moment.duration({ d: 1 }).humanize(), 'де', 'a day');
    assert.equal(moment.duration({ d: 5 }).humanize(), '5 де', '5 days');
    
    assert.equal(moment([2026, 0, 14]).from(moment([2026, 0, 14, 0, 5])), '5 минот хьалха', '5 minutes ago');
    assert.equal(moment([2026, 0, 14, 0, 5]).from(moment([2026, 0, 14])), '5 минот тӀаьхьа', 'in 5 minutes');
});

test('meridiem', function (assert) {
    assert.equal(moment([2026, 0, 14, 2]).format('A'), 'буьйса', 'night');
    assert.equal(moment([2026, 0, 14, 8]).format('A'), 'Ӏуьйре', 'morning');
    assert.equal(moment([2026, 0, 14, 15]).format('A'), 'де', 'afternoon');
    assert.equal(moment([2026, 0, 14, 21]).format('A'), 'суьйре', 'evening');
});
