import { bubbleSortByStep, selectSortSteps, swap } from "./utils";

const ascSelect = [
    [1, 4, 9, 3, 5],
    [1, 3, 9, 4, 5],
    [1, 3, 4, 9, 5],
    [1, 3, 4, 5, 9],
    [1, 3, 4, 5, 9]
]
const descSelect = [
    [9, 1, 4, 3, 5],
    [9, 5, 4, 3, 1],
    [9, 5, 4, 3, 1],
    [9, 5, 4, 3, 1],
    [9, 5, 4, 3, 1]
]

it('Функция swap', () => {
    expect(swap(1,3,[0,1,2,3,4,5])).toEqual([0,3,2,1,4,5])
})

describe('Сортировка пузырьком', () => {
    it('Пустой массив', () => {
        expect(bubbleSortByStep('asc', [])).toEqual([])
    })

    it('С одним значением', () => {
        expect(bubbleSortByStep('asc', [3])).toEqual([3])
    })

    it('Сортировка asc', () => {
        expect(bubbleSortByStep('asc', [4,8,6,1,9,3])).toEqual([1,3,4,6,8,9])
    })

    it('Сортировка desc', () => {
        expect(bubbleSortByStep('desc', [4,8,6,1,9,3])).toEqual([9,8,6,4,3,1])
    })

    it('Сортировка по шагу', () => {
        expect(bubbleSortByStep('asc', [4,8,6,1,9,3], 2, 3)).toEqual([1,3,4,6,8,9])
    })
})

describe('Сортировка выбором', () => {
    it('Пустой массив', () => {
        expect(selectSortSteps('asc', [])).toEqual([])
    })

    it('С одним значением', () => {
        expect(selectSortSteps('asc', [3])).toEqual([[3]])
    })

    it('Сортировка asc', () => {
        expect(selectSortSteps('asc', [4,1,9,3,5])).toEqual(ascSelect)
    })

    it('Сортировка desc', () => {
        expect(selectSortSteps('desc', [4,1,9,3,5])).toEqual(descSelect)
    })
})
