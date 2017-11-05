export class Post {
    id: number;
    private _title: string;
    private _body: string;
    private _publicationDate: Date;
    private _lastModified: Date;

    get title(): string {
        return this._title;
    }

    set title(t: string) {
        this._title = t;
        console.log("set title");
    }

    get body(): string {
        return this._body;
    }

    set body(b: string) {
        this._body = b;
        console.log("set body");
    }

    get publicationDate(): Date {
        return this._publicationDate;
    }

    set publicationDate(d: Date) {
        this._publicationDate = d;
        console.log("set pub date");
    }

    get lastModified(): Date {
        return this._lastModified;
    }

    set lastModified(d: Date) {
        this._lastModified = d;
        console.log("set last modified");
    }

    public toJSON() {
        return {
            id: this.id,
            title: this._title,
            body: this._body,
            publicationDate: this._publicationDate,
            lastModified: this._lastModified,
        };
    };
}