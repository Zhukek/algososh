export const reverseStringBySteps = (value: string) => {
    let arr = value.split('');
    const result = [];
    const middle = Math.ceil(value.length / 2)
    for (let i = 0; i < middle; i++) {
      const changeElements = [i, value.length - 1 - i]
      const buffer = value[changeElements[0]];
      
      arr[changeElements[0]] = arr[changeElements[1]]
      arr[changeElements[1]] = buffer
      result.push([...arr])
    };
    return result
} 