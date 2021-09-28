export class Task {
    id!: string;
    title!: string;
    listId!: string;
    
    constructor(data: any) {
        this.id = data.id;
        this.title = data.title;
        this.listId = data.listId;
        Object.assign(this, data)
    }
}