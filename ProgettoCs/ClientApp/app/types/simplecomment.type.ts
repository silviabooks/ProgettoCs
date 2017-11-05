export class SimpleComment {
    author: string;
    body: string;
    postId: any;

    constructor(a: string, b: string, id: any) {
        this.author = a;
        this.body = b;
        this.postId = id;
    }

    public toJSON() {
        return {
            author: this.author,
            body: this.body,
            postId: this.postId
        };
    }
}