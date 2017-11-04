export class SimplePost {
    public title: string;
    public body: string;

    constructor(t: string, b: string) {
        this.title = t;
        this.body = b;
    }

    public toJSON() {
        return {
            title: this.title,
            body: this.body
        };
    }
}