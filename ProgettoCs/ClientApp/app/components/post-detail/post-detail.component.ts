import { Component, Inject, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Post } from '../../post.type';
import { Headers, Http, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Component({
    selector: 'post-detail',
    templateUrl: './post-detail.component.html',
    styleUrls: ['./post-detail.component.css']
})
export class PostDetailComponent {
    public currentPost: Post;
    public currentId: string;
    public headers = new Headers({ 'Content-Type': 'application/json' });
    constructor(private http: Http,
                @Inject('BASE_URL') private baseUrl: string,
                private route: ActivatedRoute,
                private router: Router) {
        let param = this.route.snapshot.params['id'] as string;
        this.currentId = param;
        console.log(param);
        this.http.get(this.baseUrl + 'api/Post/' + param, { headers: this.headers }).subscribe(result => {
            this.currentPost = <Post>JSON.parse(result.json());
            console.log(this.currentPost);
        }, error => console.error(error));
    }

    async cancelPost(): Promise<void>  {
        let url = this.baseUrl + 'api/post/' + this.currentId;
        this.http.delete(url, { headers: this.headers }).subscribe(result => {
            alert("Post deleted successfully!");
            this.router.navigateByUrl("/posts-view");
        }, error => console.error(error));
    }
    
}