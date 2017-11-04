import { Component, Inject, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
    constructor(private http: Http, @Inject('BASE_URL') private baseUrl: string, private route: ActivatedRoute) {
        let param = this.route.snapshot.params['id'] as string;
        //let id = route.params;
        console.log(param);
        this.http.get(this.baseUrl + 'api/Post/'+ param).subscribe(result => {
            this.currentPost = <Post>JSON.parse(result.json());
            console.log(this.currentPost);
            //this.selectPost();
        }, error => console.error(error));
    }
    
}