import { Component } from '@angular/core';
import { Post } from '../../post.type';
@Component({
    selector: 'post-row',
    templateUrl: './post-row.component.html'
})
export class PostRowComponent {
    private p: Post;
}