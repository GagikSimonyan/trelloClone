export class Card {
    title!: string;

    constructor(data: any) {
        Object.assign(this, data)
    }
}