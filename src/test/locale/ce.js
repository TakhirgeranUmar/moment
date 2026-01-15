import { module, test } from '../qunit';
import moment from '../../moment';

module('locale:ce');

test('format', function (assert) {
    var b = moment([2026, 0, 14, 15, 25]); // 2026 14 январь, кхаара
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
    
    // Testing Last Week / Next Week prefixes
    assert.equal(moment(now).subtract({ d: 7 }).calendar().split(' ')[0], 'Хьалхара', 'last week');
    assert.equal(moment(now).add({ d: 7 }).calendar().split(' ')[0], 'РогӀера', 'next week');
});

test('relative time future', function (assert) {
    // Testing J-class (йаьлча)
    assert.equal(moment().add({ s: 10 }).fromNow(), 'масех секунд йаьлча', 'a few seconds (J-class)');
    assert.equal(moment().add({ s: 45 }).fromNow(), 'минот йаьлча', 'in a minute (J-class)');
    assert.equal(moment().add({ m: 5 }).fromNow(), '5 минот йаьлча', 'in 5 minutes (J-class)');
    
    // Testing D-class (даьлча)
    assert.equal(moment().add({ h: 1 }).fromNow(), 'сахьт даьлча', 'in an hour (D-class)');
    assert.equal(moment().add({ d: 5 }).fromNow(), '5 де даьлча', 'in 5 days (D-class)');
    assert.equal(moment().add({ w: 1 }).fromNow(), 'кӀира даьлча', 'in a week (D-class)');
    
    // Testing B-class (баьлча)
    assert.equal(moment().add({ M: 1 }).fromNow(), 'бутт баьлча', 'in a month (B-class)');
});

test('relative time past', function (assert) {
    assert.equal(moment().subtract({ s: 10 }).fromNow(), 'масех секунд хьалха', 'a few seconds ago');
    assert.equal(moment().subtract({ m: 1 }).fromNow(), 'минот хьалха', 'a minute ago');
    assert.equal(moment().subtract({ m: 5 }).fromNow(), '5 минот хьалха', '5 minutes ago');
    assert.equal(moment().subtract({ h: 1 }).fromNow(), 'сахьт хьалха', 'an hour ago');
    assert.equal(moment().subtract({ d: 1 }).fromNow(), 'де хьалха', 'a day ago');
});

test('meridiem', function (assert) {
    assert.equal(moment([2026, 0, 14, 2]).format('A'), 'буьйса', 'night');
    assert.equal(moment([2026, 0, 14, 8]).format('A'), 'Ӏуьйре', 'morning');
    assert.equal(moment([2026, 0, 14, 15]).format('A'), 'де', 'afternoon');
    assert.equal(moment([2026, 0, 14, 21]).format('A'), 'суьйре', 'evening');
});
