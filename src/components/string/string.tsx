import React, { SyntheticEvent, useState } from "react";
import styles from './styles.module.css';
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { ElementStates } from "../../types/element-states";
import timeout from '../../services/timeout';

type TLetter = {
  letter: string;
  state: ElementStates;
}

export const StringComponent: React.FC = () => {
  const [value, setValue] = useState('');
  const [array, setArray] = useState<TLetter[]>([]);
  const [loading, setLoading] = useState(false)

  const onChange = (e: SyntheticEvent) => {
    setValue((e.target as HTMLInputElement).value)
  }

  const onSubmit =async (e:SyntheticEvent) => {
    e.preventDefault();
    setLoading(true)
    let newArr = value.split('').map(letter => ({
      letter: letter,
      state: ElementStates.Default
    }))
    setArray([...newArr]);
    const middle = Math.ceil(value.length / 2)
    for (let i = 0; i < middle; i++) {
      const changeElements = [i, value.length - 1 - i]
      await timeout(1000);
      newArr[changeElements[0]].state = ElementStates.Changing;
      newArr[changeElements[1]].state = ElementStates.Changing;
      setArray([...newArr])
      await timeout(1000);
      const buffer = newArr[changeElements[0]].letter;
      newArr[changeElements[0]] = {
        letter: newArr[changeElements[1]].letter,
        state: ElementStates.Modified
      };
      newArr[changeElements[1]] = {
        letter: buffer,
        state: ElementStates.Modified
      };
      setArray([...newArr])
    }
    setLoading(false)
  }

  return (
    <SolutionLayout title="Строка">
      <form onSubmit={onSubmit} className={styles.wrapper}>
        <Input maxLength={11} type="text" value={value} onChange={onChange}/>
        <Button isLoader={loading} type={'submit'} text={'Развернуть'}/>
        <p className={styles.sign}>Максимум — 11 символов</p>
      </form>
      <div className={styles.solution}>
        {
          array.map((item, index) => (
            <Circle state={item.state} letter={item.letter} key={index}/>
          ))
        }
      </div>
    </SolutionLayout>
  );
};
