export class LinkedListNode<T> {
    value: T;
    nextItem: LinkedListNode<T> | null;

    constructor(value: T, nextItem?: LinkedListNode<T> | null) {
        this.value = value;
        this.nextItem = nextItem ? nextItem : null
    }
}

interface ILinkedList<T> {
    toArray: () => T[];
    prepend: (item: T) => void;
    append: (item: T) => void;
    deleteHead: () => void;
    deleteTail: () => void;
    deleteByIndex: (index: number) => void;
    getSize: () => number;
}

export class LinkedList<T> implements ILinkedList<T> {
    private size: number = 0;
    private head: null | LinkedListNode<T> = null;

    constructor(initArray?: T[]) {
        if (initArray && initArray.length > 0) {
            const length = initArray.length;
            let head: null | LinkedListNode<T> = null;
            for(let i = length; i > 0; i--) {
                head = new LinkedListNode<T>(initArray[i - 1], head)
            }
            this.head = head;
            this.size = length;
        }
    }

    toArray = () => {
        let arr: T[] = [];
        let current = this.head
        if (current) {arr.push(current?.value)}
        while (current?.nextItem) {
            current = current.nextItem;
            arr.push(current?.value);
        }
        return arr
    }

    prepend = (item: T) => {
        if (this.head) {
            const currHead = {...this.head}
            this.head = new LinkedListNode<T>(item, currHead);
        } else {
            this.head = new LinkedListNode<T>(item);
        }
        this.size += 1;
    }

    append = (item: T) => {
        if (this.head?.nextItem) {
            let current = this.head;
            while (current?.nextItem) {
                current = current.nextItem;
            }
            current.nextItem = new LinkedListNode<T>(item);
        } else if (this.head) {
            this.head.nextItem = new LinkedListNode<T>(item);
        } else {
            this.head = new LinkedListNode<T>(item);
        }
        this.size += 1;
    }

    deleteHead = () => {
        if (this.head) {
            this.head = this.head.nextItem;
            this.size -= 1;
        }
    }

    deleteTail = () => {
        if (this.head) {
            const arr = this.toArray();
            if (arr.length > 1) {
                const length = arr.length;
                let head: null | LinkedListNode<T> = null;
                for(let i = length - 1; i > 0; i--) {
                    head = new LinkedListNode<T>(arr[i - 1], head)
                }
                this.head = head;
                this.size = length - 1;
            } else {
                this.head = null;
                this.size = 0;
            }
        }
    }

    deleteByIndex = (index: number) => {
        if (this.head && 0 < index && index < this.size) {
            let curr: LinkedListNode<T> | null = this.head;
            let prev: LinkedListNode<T> | null = this.head;
            for (let i = 0; i < index; i++) {
                prev = curr;
                curr = curr.nextItem!;
            }
            curr = curr.nextItem;
            prev.nextItem = curr;
            this.size -= 1;
        } else if (this.head && index === 0) {
            this.deleteHead()
        }
    }

    addByIndex = (index: number, item: T) => {
        if (this.head && 0 < index && index < this.size) {
            let curr: LinkedListNode<T> | null = this.head;
            let prev: LinkedListNode<T> | null = this.head;
            for (let i = 1; i <= index; i++) {
                prev = curr;
                curr = curr.nextItem!;
            }
            prev.nextItem = new LinkedListNode<T>(item, curr);
            this.size += 1;
        } else if (index === this.size) {
            this.append(item)
        } else if (index === 0) {
            this.prepend(item)
        }
    }

    getSize = () => {
        return this.size
    }
}