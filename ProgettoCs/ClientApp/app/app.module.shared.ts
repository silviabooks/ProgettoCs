import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './components/app/app.component';
import { NavMenuComponent } from './components/navmenu/navmenu.component';
import { HomeComponent } from './components/home/home.component';
import { PostsViewComponent } from './components/posts-view/posts-view.component';
import { PostDetailComponent } from './components/post-detail/post-detail.component';
import { NewPostComponent } from './components/new-post/new-post.component';

@NgModule({
    declarations: [
        AppComponent,
        NavMenuComponent,
        HomeComponent,
        PostsViewComponent,
        PostDetailComponent,
        NewPostComponent
    ],
    imports: [
        CommonModule,
        HttpModule,
        FormsModule,
        RouterModule.forRoot([
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            { path: 'home', component: HomeComponent },
            { path: 'posts-view', component: PostsViewComponent },
            { path: 'post-detail/:id', component: PostDetailComponent },
            { path: 'new-post', component:NewPostComponent },
            { path: '**', redirectTo: 'home' }
        ])
    ]
})
export class AppModuleShared {
}
