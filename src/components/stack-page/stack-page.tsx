import React, { SyntheticEvent, useRef, useState } from "react";
import { ElementStates } from "../../types/element-states";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import timeout from "../../services/timeout";
import styles from './styles.module.css';
import {Stack} from './stack';

type TArrItem = {
  text: string;
  state: ElementStates;
}

export const StackPage: React.FC = () => {
  const [value, setValue] = useState('');
  const newStack = new Stack<TArrItem>();
  const stack = useRef(newStack).current;
  const [stackValues, setStack] = useState<TArrItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [action, setAction] = useState('');

  const onChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setValue(e.currentTarget.value)
  }

  const onSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    if (loading || value === '') {
      return
    }
    setLoading(true);
    setAction('add');
    let arr = [...stack.getItems()];
    arr.push({
      text: value,
      state: ElementStates.Changing
    });
    setStack([...arr]);
    await timeout(500);
    stack.push({text: value, state: ElementStates.Default});
    setStack([...stack.getItems()]);
    setValue('');
    setLoading(false);
    setAction('');
  }

  const pop = async () => {
    if (stack.getSize() === 0) {
      return
    }
    setLoading(true);
    setAction('pop');
    let arr = [...stack.getItems()];
    (arr.at(-1) as TArrItem).state = ElementStates.Changing;
    setStack([...arr]);
    await timeout(500);
    stack.pop();
    setStack([...stack.getItems()]);
    setLoading(false);
    setAction('');
  }

  const clearAll = () => {
    stack.clear();
    setStack([...stack.getItems()]);
  }

  return (
    <SolutionLayout title="Стек">
      <form onSubmit={onSubmit} className={styles.contols}>
        <Input type="text" isLimitText={true} value={value} onChange={onChange} maxLength={4}/>
        <Button isLoader={action === 'add'} disabled={loading || value === ''} type={'submit'} text="Добавить"/>
        <Button isLoader={action === 'pop'} disabled={loading || stack.getSize() === 0} onClick={pop} type={'button'} text="Удалить"/>
        <Button disabled={loading || stack.getSize() === 0} onClick={clearAll} type={'button'} text="Очистить"/>
      </form>
      <ul className={styles.result}>
      {
        stackValues.map((item, index) => (
          <Circle state={item.state} letter={item.text} key={index} index={index} head={index === stackValues.length - 1 ? 'top' : ''}/>
        ))
      }
      </ul>
    </SolutionLayout>
  );
};
