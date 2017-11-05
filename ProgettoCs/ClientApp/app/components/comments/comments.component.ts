import { Component, Inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Comment } from '../../types/comment.type';
import { Headers, Http, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Component({
    selector: 'comments',
    templateUrl: './comments.component.html',
    styleUrls: ['./comments.component.css']
})
export class CommentsComponent {
    public headers = new Headers({ 'Content-Type': 'application/json' });
    constructor(private http: Http,
        @Inject('BASE_URL') private baseUrl: string) {

        this.http.get(this.baseUrl + 'api/Comment')

    }
}