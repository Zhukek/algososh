import React, { SyntheticEvent, useRef, useState } from "react";
import { ElementStates } from "../../types/element-states";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { ArrowIcon } from "../ui/icons/arrow-icon";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { LinkedList, LinkedListNode } from "./list";
import styles from './styles.module.css';
import timeout from "../../services/timeout";

type TListItem = {
  state: ElementStates;
  value: string;
  head?: string;
  tail?: string;
}

export const ListPage: React.FC = () => {
  const newList = new LinkedList<TListItem>([... Array.from({length: Math.ceil((Math.random() * 4) + 2)}, () => ({
    value: `${Math.ceil(Math.random() * 1000)}`,
    state: ElementStates.Default
  }))]);
  const list = useRef(newList).current;
  const [value, setTextValue] = useState('');
  const [index, setIndex] = useState('');
  const [loading, setLoading] = useState(false);
  const [array, setArray] = useState([...list.toArray()]);
  const [action, setAction] = useState('');

  const onChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    switch(e.currentTarget.id) {
      case 'text':
        setTextValue(e.currentTarget.value)
      break;
      case 'index':
        setIndex(e.currentTarget.value)
      break;
      default:
        return
    }
  }

  const returnArray = () => {
    return [...list.toArray().map(item => ({...item}))];
  }

  const prepend = async () => {
    if (value === '') {
      return
    }
    setLoading(true);
    setAction('prepend');
    let arr = returnArray();
    if (arr.length > 0) {
      arr[0].head = value;
      setArray([...arr]);
      await timeout(500);
    }
    list.prepend({value: value, state: ElementStates.Default});
    arr = returnArray();
    arr[0].state = ElementStates.Modified;
    setArray([...arr]);
    await timeout(500);
    setArray([...list.toArray()]);
    setTextValue('');
    setLoading(false);
    setAction('');
  }

  const append = async () => {
    if (value === '') {
      return
    }
    setLoading(true);
    setAction('append');
    let arr = returnArray();
    if (arr.length > 0) {
      arr.at(-1)!.head = value;
      setArray([...arr]);
      await timeout(500);
    }
    list.append({value: value, state: ElementStates.Default});
    arr = returnArray();
    arr.at(-1)!.state = ElementStates.Modified;
    setArray([...arr]);
    await timeout(500);
    setArray([...list.toArray()]);
    setTextValue('');
    setLoading(false);
    setAction('');
  }

  const deleteHead = async () => {
    setLoading(true);
    setAction('deleteHead');
    let arr = returnArray();
    if (arr.length > 0) {
      arr[0].tail = arr[0].value;
      arr[0].value = '';
      setArray([...arr]);
      await timeout(500);
      list.deleteHead();
      setArray([...list.toArray()]);
      setTextValue('');
    }
    setLoading(false);
    setAction('');
  }

  const deleteTail = async () => {
    setLoading(true);
    setAction('deleteTail');
    let arr = returnArray();
    if (arr.length > 0) {
      arr.at(-1)!.tail = arr.at(-1)!.value;
      arr.at(-1)!.value = '';
      setArray([...arr]);
      await timeout(500);
      list.deleteTail();
      setArray([...list.toArray()]);
      setTextValue('');
    }
    setLoading(false);
    setAction('');
  }

  const deleteByIndex = async () => {
    if (index === '') {
      return
    }
    setLoading(true);
    setAction('deleteByIndex');
    let arr = returnArray();
    const num = Number(index);
    const size = list.getSize();
    if (size > 0 && num >= 0 && num < size) {
      for(let i = 0; i <= num; i++ ) {
        arr[i].state = ElementStates.Changing;
        setArray([...arr]);
        await timeout(500);
      }
      arr[num].tail = arr[num].value;
      arr[num].value = '';
      setArray([...arr]);
      await timeout(500);
      list.deleteByIndex(num);
      setArray([...list.toArray()]);
      setIndex('');
    }
    setLoading(false);
    setAction('');
  }

  const addByIndex = async () => {
    if (index === '' || value === '') {
      return
    }
    const size = list.getSize();
    const num = Number(index);
    if (num === size) {
      append()
      return
    }
    setLoading(true);
    setAction('addByIndex');
    let arr = returnArray();
    
    if (size > 0 && num >= 0 && num < size) {
      for(let i = 0; i <= num; i++ ) {
        if (i > 0) {
          arr[i - 1].state = ElementStates.Changing;
          arr[i - 1].head = undefined;
        }
        arr[i].head = value;
        setArray([...arr]);
        await timeout(1000);
      }
      list.addByIndex(Number(index), {value: value, state: ElementStates.Default});
      arr = returnArray();
      arr[num].state = ElementStates.Modified;
      setArray([...arr]);
      await timeout(1000);
      setArray([...list.toArray()]);
      setIndex('');
      setTextValue('')
    }
    setLoading(false);
    setAction('');
  }

  return (
    <SolutionLayout title="Связный список">
      <div className={styles.controll}>
        <Input disabled={loading} type="text" isLimitText={true} value={value} id='text' onChange={onChange} maxLength={4}/>
        <Button isLoader={action === 'prepend'} onClick={prepend} disabled={loading || value === ''} text="Добавить в head"/>
        <Button isLoader={action === 'append'} onClick={append} disabled={loading || value === ''} text="Добавить в tail"/>
        <Button isLoader={action === 'deleteHead'} onClick={deleteHead} disabled={loading || array.length === 0} text="Удалить из head"/>
        <Button isLoader={action === 'deleteTail'} onClick={deleteTail} disabled={loading || array.length === 0} text="Удалить из tail"/>
        <Input disabled={loading} type="number" id="index" value={index} onChange={onChange}/>
        <Button isLoader={action === 'addByIndex'} onClick={addByIndex} disabled={
          loading || value === '' || index === '' || Number(index) < 0 || Number(index) > array.length
        } extraClass={styles.longButton_left} text="Добавить по индексу"/>
        <Button isLoader={action === 'deleteByIndex'} onClick={deleteByIndex} disabled={
            loading || index === '' || array.length === 0 || Number(index) < 0 || Number(index) >= array.length
          } extraClass={styles.longButton_right} text="Удалить по индексу"/>
      </div>
      <div className={styles.solution}>
        {
          array.map((item, index) => (
            <div className={styles.wrapper} key={index}>
              <Circle state={item.state} index={index} head={
                item.head ? <Circle state={ElementStates.Changing} isSmall={true} letter={item.head}/> : index === 0 ? 'head' : ''
              }
                tail={
                  item.tail ? <Circle state={ElementStates.Changing} isSmall={true} letter={item.tail}/> : index === array.length - 1 ? 'tail' : ''
                } letter={item.value}
              />
              {index < array.length - 1 && <ArrowIcon/>}
            </div>
          ))
        }
      </div>

    </SolutionLayout>
  );
};
