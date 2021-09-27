export class Task {
    title!: string;
    listId!: string;
    
    constructor(data: any) {
        this.title = data.title;
        this.listId = data.listId;
        Object.assign(this, data)
    }
}