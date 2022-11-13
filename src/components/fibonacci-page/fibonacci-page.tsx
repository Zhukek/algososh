import React, { SyntheticEvent, useState } from "react";
import { Circle } from "../ui/circle/circle";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Button } from "../ui/button/button";
import { Input } from "../ui/input/input";
import styles from './styles.module.css';
import timeout from '../../services/timeout';

export const FibonacciPage: React.FC = () => {
  const [value, setValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [array, setArray] = useState<number[]>([])

  const onChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setValue(e.currentTarget.value)
  }

  const onSubmit: React.FormEventHandler<HTMLFormElement> =async (e) => {
    e.preventDefault();
    setLoading(true);
    setArray([])
    const arr = getFibonacciNumbers(Number(value));
    for (let i = 0; i < arr.length; i++) {
      await timeout(500)
      setArray(v => [...v,arr[i]])
    }
    

    setLoading(false);
  }

  const getFibonacciNumbers = (num: number) => {
    const arr: number[] = [1];
    for (let i = 1; i <= num; i++) {
      if (i === 1) {
        arr.push(1)
      } else {
        const nextNumber = arr[i - 2] + arr[i - 1]
        arr.push(nextNumber)
      }
    }
    return arr
  }

  return (
    <SolutionLayout title="Последовательность Фибоначчи">
      <form onSubmit={onSubmit} className={styles.wrapper}>
        <Input max={19} type="number" value={value} onChange={onChange}/>
        <Button disabled={Number(value) <= 0 || Number(value) > 19} isLoader={loading} type={'submit'} text={'Развернуть'}/>
        <p className={styles.sign}>Максимальное число — 19</p>
      </form>
      <div className={styles.solution} id='solution'>
        {
          array.map((element, index) => (
            <Circle index={index} letter={`${element}`} key={index}/>
          ))
        }
      </div>
    </SolutionLayout>
  );
};
