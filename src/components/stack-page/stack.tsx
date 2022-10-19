interface IStack<T> {
    push: (item: T) => void;
    pop: () => void;
    getSize: () => number;
    getItems: () => T[];
    peek: () => T;
    clear: () => void;
}

export class Stack<T> implements IStack<T> {
    private container: T[] = [];

    push = (item: T) => {
        this.container.push(item);
    };

    pop = () => {
        if (this.peek()) {
            this.container.pop();
        }
    }

    clear = () => {
        this.container = [];
    }

    getSize = () => this.container.length;

    getItems = () => {
        return this.container;
    }

    peek = ()  => {
        return this.container[this.container.length - 1]
    }
}