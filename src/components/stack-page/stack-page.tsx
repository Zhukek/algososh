import React, { SyntheticEvent, useState } from "react";
import { ElementStates } from "../../types/element-states";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import timeout from "../../services/timeout";
import styles from './styles.module.css';

type TArrItem = {
  text: string;
  state: ElementStates;
}

export const StackPage: React.FC = () => {
  const [value, setValue] = useState('');
  const [stack, setStack] = useState<TArrItem[]>([]);
  const [loading, setLoading] = useState(false);

  const onChange = (e: SyntheticEvent) => {
    setValue((e.target as HTMLInputElement).value)
  }

  const onSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    if (loading || value === '') {
      return
    }
    setLoading(true);
    let arr = [...stack];
    arr.push({
      text: value,
      state: ElementStates.Changing
    });
    setValue('');
    setStack([...arr]);
    await timeout(500);
    (arr.at(-1) as TArrItem).state = ElementStates.Default;
    setStack([...arr]);
    setLoading(false);
  }

  const pop = async () => {
    if (stack.length === 0) {
      return
    }
    setLoading(true);
    let arr = [...stack];
    (arr.at(-1) as TArrItem).state = ElementStates.Changing;
    setStack([...arr]);
    await timeout(500);
    arr.pop()
    setStack([...arr]);
    setLoading(false);
  }

  const clearAll = () => {
    setStack([]);
  }

  return (
    <SolutionLayout title="Стек">
      <form onSubmit={onSubmit} className={styles.contols}>
        <Input type="text" isLimitText={true} value={value} onChange={onChange} maxLength={4}/>
        <Button disabled={loading} type={'submit'} text="Добавить"/>
        <Button disabled={loading} onClick={pop} type={'button'} text="Удалить"/>
        <Button disabled={loading} onClick={clearAll} type={'button'} text="Очистить"/>
      </form>
      <ul className={styles.result}>
      {
        stack.map((item, index) => (
          <Circle state={item.state} letter={item.text} key={index} index={index} head={index === stack.length - 1 ? 'top' : ''}/>
        ))
      }
      </ul>
    </SolutionLayout>
  );
};
