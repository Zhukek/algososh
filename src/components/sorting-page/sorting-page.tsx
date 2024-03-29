import React, { SyntheticEvent, useEffect, useState } from "react";
import styles from './styles.module.css';
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { RadioInput } from "../ui/radio-input/radio-input";
import { Button } from "../ui/button/button";
import { Direction } from "../../types/direction";
import { Column } from "../ui/column/column";
import timeout from "../../services/timeout";
import { ElementStates } from "../../types/element-states";
import { bubbleSortByStep, selectSortSteps } from "./utils";

type TArrItem = {
  number: number;
  state: ElementStates
}

export const SortingPage: React.FC = () => {
  const [sortType, setSortType] = useState('select');
  const [array, setArray] = useState<TArrItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [type, setType] = useState('');

  useEffect(() => {
    generateArr();
  },[])

  const onChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setSortType((e.currentTarget as HTMLInputElement).value);
  }

  const generateArr = () => {
    const arr = getRandomArr();
    setArray(arr.map(item =>({
      number: item,
      state: ElementStates.Default
    })))
  }
  const getRandomArr = () => {
    return Array.from({length: Math.ceil((Math.random() * 14) + 3)}, () => Math.ceil(Math.random() * 100));
  }
  const resetArrState = () => {
    return [...array.map(item => ({
      number: item.number,
      state: ElementStates.Default
    }))]
  }

  const sort = (type: 'asc' | 'desc') => {
    setType(type)
    sortType === 'select' ?
    selectSort(type) :
    bubbleSort(type);
  }

  const bubbleSort = async (type: 'asc' | 'desc') => {
    setLoading(true);
    let arr = resetArrState();
    setArray([...arr])
    let i = 0;
    while (i < arr.length - 1) {
      for (let n = 0; n < arr.length - 1 - i; n++) {
        await timeout(200)
        arr[n].state = ElementStates.Changing;
        arr[n + 1].state = ElementStates.Changing;
        setArray([...arr]);
        await timeout(200)
        const numArray = bubbleSortByStep(type, array.map(item => item.number), i, n);
        arr = arr.map((item, index) => ({
          state: item.state,
          number: numArray[index]
        }))
        setArray([...arr])
        await timeout(200)
        arr[n].state = ElementStates.Default;
      }
      i++
      arr[arr.length - i].state = ElementStates.Modified
      setArray([...arr])
    }
    arr[0].state = ElementStates.Modified
    setArray([...arr]);
    setLoading(false);
    setType('');
  }

  const selectSort = async (type: 'asc' | 'desc') => {
    setLoading(true);
    const result = selectSortSteps(type, [...array.map(item => item.number)])
    let arr = resetArrState();
    setArray([...arr])
    let i = 0;
    while (i < arr.length) {
      let selected = i;
      arr[i].state = ElementStates.Changing;
      setArray([...arr]);
      for(let n = i + 1; n < arr.length; n++) {
        await timeout(300);
        arr[n].state = ElementStates.Changing;
        setArray([...arr]);
        if(type === 'asc' ? arr[selected].number > arr[n].number : arr[selected].number < arr[n].number) {
          await timeout(300)
          arr[selected].state = ElementStates.Default;
          selected = n
          setArray([...arr]);
        } else {
          await timeout(300)
          arr[n].state = ElementStates.Default;
          setArray([...arr]);
        }
      }
      await timeout(2000)
      arr = arr.map((item, index) => ({
        state: item.state,
        number: result[i][index]
      }))
      arr[selected].state = ElementStates.Default;
      arr[i].state = ElementStates.Modified;
      setArray([...arr]);
      i++
    }
    arr[0].state = ElementStates.Modified
    setArray([...arr]);
    setLoading(false);
    setType('');
  }

  return (
    <SolutionLayout title="Сортировка массива">
      <div className={styles.control}>
        <RadioInput disabled={loading} onChange={onChange} checked={'select' === sortType} value={'select'} label={'Выбор'} />
        <RadioInput disabled={loading} onChange={onChange} checked={'bubble' === sortType} value={'bubble'} label={'Пузырёк'} />
        <Button isLoader={type === 'asc'} text={'По возрастанию'} disabled={loading} sorting={Direction.Ascending} onClick={() => {sort('asc')}}/>
        <Button isLoader={type === 'desc'} text={'По убыванию'} disabled={loading} sorting={Direction.Descending} onClick={() => {sort('desc')}}/>
        <Button text={'Новый массив'} disabled={loading} onClick={generateArr}/>
      </div>
      <div className={styles.solution}>
        {
          array.map((item, index) => (
            <Column index={item.number} state={item.state} key={index} />
          ))
        }
      </div>
    </SolutionLayout>
  );
};
