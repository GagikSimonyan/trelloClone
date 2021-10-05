export class Task {
    id: string;
    title: string;
    listId: string;
    description: string;
    position: number;
    
    constructor(data: any) {
        this.id = data.id;
        this.title = data.title;
        this.listId = data.listId;
        this.description = data.description;
        this.position = data.position;
        Object.assign(this, data)
    }
}