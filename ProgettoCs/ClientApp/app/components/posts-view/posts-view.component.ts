import { Component, Inject } from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';
import { Post } from '../../types/post.type';
import { Observable } from "rxjs/Observable";
import { Router } from '@angular/router';
import 'rxjs/add/observable/forkJoin';

@Component({
    selector: 'posts-view',
    templateUrl: './posts-view.component.html',
    styleUrls: ['./posts-view.component.css']
})
export class PostsViewComponent {
    public postList: Post[];

    constructor(private http: Http, @Inject('BASE_URL') private baseUrl: string, private router: Router) {
        this.refreshData();
    }

    async refreshData() {
        this.http.get(this.baseUrl + 'api/Post').subscribe(result => {
            let array: Post[] = <Post[]>JSON.parse(result.json());
            this.postList = array;
        }, error => console.error(error));
    }
    
    navigateToDetail(selectedId: any) {
        this.router.navigate(['post-detail', selectedId]);
    }
    
}
