import React, { SyntheticEvent, useRef, useState } from "react";
import timeout from "../../services/timeout";
import { ElementStates } from "../../types/element-states";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from './styles.module.css';
import {Queue} from './queue';

type TQueueItem = {
  text: string;
  state: ElementStates;
}

export const QueuePage: React.FC = () => {
  const newQueue = new Queue<TQueueItem>(7, {
    text: '',
    state: ElementStates.Default
  });
  const queue = useRef(newQueue).current;
  const [value, setValue] = useState('');
  const [queueValues, setQueue] = useState<TQueueItem[]>([...queue.getElements()]);
  const [loading, setLoading] = useState(false);

  const onChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setValue(e.currentTarget.value)
  }

  const onSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    if(!queue.hasFreePlace() || value === '') {
      return
    }
    setLoading(true)
    let arr = [...queue.getElements()];
    queue.enqueue({
      text: value,
      state: ElementStates.Default
    })
    arr[queue.getTail()].state = ElementStates.Changing;
    setQueue([...arr]);
    await timeout(500);
    setQueue([...queue.getElements()]);
    setValue('');
    setLoading(false);
  }

  const dequeue = () => {
    queue.dequeue();
    setQueue([...queue.getElements()]);
  }

  const clearAll = () => {
    queue.clear();
    setQueue([...queue.getElements()]);
  }

  return (
    <SolutionLayout title="Очередь">
      <form onSubmit={onSubmit} className={styles.contols}>
        <Input disabled={loading} type="text" isLimitText={true} value={value} onChange={onChange} maxLength={4}/>
        <Button isLoader={loading} disabled={loading || value === '' || !queue.hasFreePlace()} type={'submit'} text="Добавить"/>
        <Button disabled={loading || queue.isEmpty()} onClick={dequeue} type={'button'} text="Удалить" id="delete"/>
        <Button disabled={loading || queue.isEmpty()} onClick={clearAll} type={'button'} text="Очистить" id="clear"/>
      </form>
      <ul className={styles.result} id='solution'>
      {
        queueValues.map((item, index) => (
          <Circle state={item.state} letter={item.text} key={index} index={index} head={
            item.text !== '' && queue.getHead() === index ? 'head' : ''
          } tail={item.text !== '' && queue.getTail() === index ? 'tail': ''}/>
        ))
      }
      </ul>
    </SolutionLayout>
  );
};
