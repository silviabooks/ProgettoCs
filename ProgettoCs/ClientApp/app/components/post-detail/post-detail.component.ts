import { Component, Inject, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Post } from '../../types/post.type';
import { Headers, Http, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Comment } from '../../types/comment.type';
import { SimpleComment } from '../../types/simplecomment.type';

@Component({
    selector: 'post-detail',
    templateUrl: './post-detail.component.html',
    styleUrls: ['./post-detail.component.css']
})
export class PostDetailComponent {
    public currentPost: Post;
    public currentId: string;
    public comments: Comment[];
    public newCommentAuthor: string;
    public newCommentBody: string;
    public headers = new Headers({ 'Content-Type': 'application/json' });
    constructor(private http: Http,
                @Inject('BASE_URL') private baseUrl: string,
                private route: ActivatedRoute,
                private router: Router) {
        let param = this.route.snapshot.params['id'] as string;
        this.currentId = param;
        this.http.get(this.baseUrl + 'api/Post/' + param, { headers: this.headers }).subscribe(result => {
            this.currentPost = <Post>JSON.parse(result.json());
        }, error => console.error(error));

        this.http.get(this.baseUrl + 'api/Comment/' + param, { headers: this.headers }).subscribe(result => {
            this.comments = <Comment[]>JSON.parse(result.json());
        }, error => console.error(error)); 
    }

    async cancelPost(): Promise<void>  {
        let url = this.baseUrl + 'api/post/' + this.currentId;
        this.http.delete(url, { headers: this.headers }).subscribe(result => {
            alert("Post deleted successfully!");
            this.router.navigateByUrl("/posts-view");
        }, error => console.error(error));
    }

    async addNewComment(): Promise<void> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let c = new SimpleComment(this.newCommentAuthor, this.newCommentBody, this.currentId);
        let json = JSON.stringify(c.toJSON());
        this.http.put(this.baseUrl + 'api/Comment/', json, { headers: headers }).subscribe(result => {
            this.refreshComments();
        }, error => console.error(error));
    }

    async refreshComments(): Promise<void> {
        this.http.get(this.baseUrl + 'api/Comment/' + this.currentId, { headers: this.headers }).subscribe(result => {
            this.comments = <Comment[]>JSON.parse(result.json());
            //console.log(this.comments);
        }, error => console.error(error));
    }


}