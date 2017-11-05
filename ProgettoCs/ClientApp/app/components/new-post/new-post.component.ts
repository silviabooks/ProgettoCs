import { Component, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { Post } from '../../types/post.type';
import { SimplePost } from '../../types/simplepost.type';
import { Headers, Http, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Component({
    selector: 'new-post',
    templateUrl: './new-post.component.html',
    styleUrls: ['./new-post.component.css']
})
export class NewPostComponent {
    public newPostTitle: string;
    public newPostBody: string;
    public postAdded: boolean = false;
    constructor(private http: Http, @Inject('BASE_URL') private baseUrl: string, private router: Router) {
    }

    async addNewPost(): Promise<void> {
        // farò la put e rimanderò all'elenco dei post
        console.log(this.newPostTitle);
        console.log(this.newPostBody);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let p = new SimplePost(this.newPostTitle, this.newPostBody);
        let json = JSON.stringify(p.toJSON());
        this.http.put(this.baseUrl + 'api/Post/', json, { headers: headers }).subscribe(result => {
            console.log("evviva");
            this.postAdded = true;
            alert("Post added successfully!");
            this.router.navigateByUrl('/posts-view');
        }, error => console.error(error));
    }

}