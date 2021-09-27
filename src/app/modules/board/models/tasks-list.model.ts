import { Task } from "./task.model";

export class TasksList {
    id: string;
    title: string;
    cards: Task[] = [];

    constructor(data: any) {
        this.id = data.id;
        this.cards = data.cards.map((card: any) => new Task(card))
        this.title = data.title;
    }
}