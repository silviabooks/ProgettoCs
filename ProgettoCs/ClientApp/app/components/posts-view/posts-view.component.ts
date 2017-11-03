import { Component, Inject } from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';
import { Observable } from "rxjs/Observable";
import 'rxjs/add/observable/forkJoin';

@Component({
    selector: 'posts-view',
    templateUrl: './posts-view.component.html',
    styleUrls: ['./posts-view.component.css']
})
export class PostsViewComponent {
    public postList: Post[];
    public selectedPost: Post | undefined;

    constructor(private http: Http, @Inject('BASE_URL') private baseUrl: string) {
        this.refreshData();
    }

    async refreshData() {
        this.http.get(this.baseUrl + 'api/Post').subscribe(result => {
            let array: Post[] = <Post[]>JSON.parse(result.json());
            this.postList = array;
            this.selectPost();
        }, error => console.error(error));
    }

    selectPost(): void {
        this.selectedPost = undefined;

        for (let p of this.postList) {
            if (p.deleted == false) {
                this.selectedPost = p;
                break;
            }
        }
    }

    async putData(): Promise<void> {
        let headers = new Headers({ 'Content-Type': 'application/json' });

        let serverCalls = [];
        
        for (let p of this.postList) {
            if (p.hasChanges == true || p.deleted) {

                let json = JSON.stringify(p.toJSON());

                if (!p.id) { //create new post
                    if (!p.deleted) {
                        let call = this.http.put(this.baseUrl + 'api/post', json, { headers: headers });
                        serverCalls.push(call);
                    }
                }

                else {
                    if (p.deleted) { // delete post
                        let url = this.baseUrl + 'api/post?id=' + p.id;
                        let call = this.http.delete(url, { headers: headers });
                        serverCalls.push(call);
                    }
                    else { // update
                        let call = this.http.post(this.baseUrl + 'api/post', json, { headers: headers });
                        serverCalls.push(call);

                    }

                }
            }
        }
        Observable.forkJoin(serverCalls).subscribe(data => {
            this.refreshData();
        }, error => console.error(error));
    
    }

    onSelect(p: Post): void {
        if (p.deleted == false) {
            this.selectedPost = p;
        }
    }

    addNewPost(): void {
        this.selectedPost = new Post();
        this.selectedPost.hasChanges = true;
        this.postList.push(this.selectedPost);
    }

    async saveChanges(): Promise<void> {
        await this.putData();
        console.log("update completed");
    }

    delete(p: Post): void {
        p.deleted = true;
        this.selectPost();
    }

}

class Post {
    id: number;
    private _title: string;
    private _body: string;
    private _publicationDate: Date;
    private _lastModified: Date;

    public deleted: boolean = false;
    public hasChanges: boolean;

    get title(): string {
        return this._title;
    }

    set title(t: string) {
        this._title = t;
        this.hasChanges = true;
        console.log("set title");
    }

    get body(): string {
        return this._body;
    }

    set body(b: string) {
        this._body = b;
        this.hasChanges = true;
        console.log("set body");
    }

    get publicationDate(): Date {
        return this._publicationDate;
    }

    set publicationDate(d: Date) {
        this._publicationDate = d;
        this.hasChanges = true;
        console.log("set pub date");
    }

    get lastModified(): Date {
        return this._lastModified;
    }

    set lastModified(d: Date) {
        this._lastModified = d;
        this.hasChanges = true;
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