import { Component, Inject } from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';
import { Observable } from "rxjs/Observable";
import { Post } from '../../post.type';

@Component({
    selector: 'posts-list',
    templateUrl: './posts-list.component.html',
    styleUrls: ['./posts-list.component.css']
})
export class PostsListComponent {
    public postList: Post[];
    constructor(private http: Http, @Inject('BASE_URL') private baseUrl: string) {
        this.getPostList();
    }

    async getPostList() {
        this.http.get(this.baseUrl + 'api/Post').subscribe(result => {
            let list = [];
            for (let p of result.json() as Post[]) {
                let post = new Post();
                post.id = p.id;
                post.title = p.title;
                post.body = p.body;
                post.lastModified = p.lastModified;
                post.publicationDate = p.publicationDate;
                list.push(post);
            }
            console.log("ok");
            this.postList = list;
        }, error => console.error(error));
            
    }
    //public getSinglePost(id: string) {
    //    return this.http.get(`api/Post/${id}`)
    //        .map(response => response.json() as Post)
    //        .toPromise();
    //}
}