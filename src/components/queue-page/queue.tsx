interface IQueue<T> {
    enqueue: (item: T) => void;
    dequeue: () => void;
    isEmpty: () => boolean;
    hasFreePlace: () => boolean;
    getElements: () => T[];
    clear: () => void;
    getHead: () => number;
    getTail: () => number;
  }

export class Queue<T> implements IQueue<T> {
    private container: T[] = [];
    private head = 0;
    private tail = 0;
    private readonly size: number = 0;
    private length: number = 0;
    private item: T
  
    constructor(size: number, item: T) {
      this.size = size;
      this.item = {...item};
      this.container = [... Array.from({length: size}, () => ({...this.item}))];
    }
  
    enqueue = (item: T) => {
        if (this.length >= this.size) {
            return;
        }
        if (!this.isEmpty()) { 
            this.tail = (this.tail + 1) % this.size;
        }
        this.container[this.tail % this.size] = item;
        this.length = this.length + 1;   
        
    };
  
    dequeue = () => {
        if (this.isEmpty()) {
            return;
        }
        this.container[this.head % this.size] = {...this.item};
        this.head = (this.head + 1) % this.size;
        this.length = this.length - 1; 
        if (this.isEmpty()) {
            this.head = 0;
            this.tail = 0;
        }
    };
  
    isEmpty = () => this.length === 0;

    hasFreePlace = () => this.length < this.size;

    getElements = () => {
        return [...this.container];
    }

    clear = () => {
        this.container = [... Array.from({length: this.size}, () => ({...this.item}))];
        this.head = 0;
        this.tail = 0;
        this.length = 0;
    }

    getHead = () => {
        return this.head;
    }

    getTail = () => {
        return this.tail;
    }
}