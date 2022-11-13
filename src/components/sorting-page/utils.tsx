export const swap = (index1: number, index2: number, arr: number[]) => {
    const buffer = arr[index1];
    arr[index1] = arr[index2];
    arr[index2] = buffer;
    return arr;
}

export const bubbleSortByStep = (type: 'asc' | 'desc', array: number[], bStep?: number, lStep?: number) => {
    let arr = [...array];
    let i = 0;
    while (i < arr.length - 1) {
      for (let n = 0; n < arr.length - 1 - i; n++) {
        if (type === 'asc' ? arr[n] > arr[n + 1] : arr[n] < arr[n + 1]) {
          swap(n, n + 1, arr)
        }
        if (i === bStep && n === lStep) {
            return [...arr];
        }
      }
      i++
    }
    return [...arr]
}

export const selectSortSteps = (type: 'asc' | 'desc', array: number[]) => {
    const result = []
    let arr = [...array]
    let i = 0;
    while (i < arr.length) {
        let selected = i;
        for(let n = i + 1; n < arr.length; n++) {
            if(type === 'asc' ? arr[selected] > arr[n] : arr[selected] < arr[n]) {
                selected = n;
            }
        }
        swap(i, selected, arr);
        result.push([...arr]);
        i++
    }
    return result
  }