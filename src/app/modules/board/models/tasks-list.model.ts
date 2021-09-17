import { Card } from "./task.model"

export class TasksList {
    title: string;
    cards: Task[] = [];

    constructor(data: any) {
        this.cards = data.cards.map((card: any) => new Card(card))
        this.title = data.title;
    }
}