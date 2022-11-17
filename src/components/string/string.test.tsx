import { reverseStringBySteps } from './utils';

const even = 'abcdef'
const odd = 'abcde'
const single = 'a'

const evenResult = [
    ['f', 'b', 'c', 'd', 'e', 'a'],
    ['f', 'e', 'c', 'd', 'b', 'a'],
    ['f', 'e', 'd', 'c', 'b', 'a']
]
const oddResult = [
    ['e', 'b', 'c', 'd', 'a'],
    ['e', 'd', 'c', 'b', 'a'],
    ['e', 'd', 'c', 'b', 'a']
]

describe('Разворот строки', () => {
    it('С четным кол-вом символов', () => {
        expect(reverseStringBySteps(even)).toEqual(evenResult)
    })

    it('С нечетным кол-вом символов', () => {
        expect(reverseStringBySteps(odd)).toEqual(oddResult)
    })

    it('С одним символом', () => {
        expect(reverseStringBySteps(single)).toEqual([['a']])
    })

    it('Пустой строки', () => {
        expect(reverseStringBySteps('')).toEqual([])
    })
})