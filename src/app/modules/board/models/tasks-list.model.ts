import { Task } from "./task.model";

export class TasksList {
    id: string;
    title: string;
    position: number;
    cardsIds: Array<string> = [];

    constructor(data: any) {
        this.id = data.id;
        this.cardsIds = data.cardsIds;
        this.title = data.title;
        this.position = data.position;
    }
}