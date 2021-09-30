export class Task {
    id: string;
    title: string;
    listId: string;
    description: string;
    
    constructor(data: any) {
        this.id = data.id;
        this.title = data.title;
        this.listId = data.listId;
        this.description = data.description;
        Object.assign(this, data)
    }
}