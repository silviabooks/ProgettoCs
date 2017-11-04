import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './components/app/app.component';
import { NavMenuComponent } from './components/navmenu/navmenu.component';
import { HomeComponent } from './components/home/home.component';
import { CounterComponent } from './components/counter/counter.component';
import { PostsViewComponent } from './components/posts-view/posts-view.component';
import { PostDetailComponent } from './components/post-detail/post-detail.component';

@NgModule({
    declarations: [
        AppComponent,
        NavMenuComponent,
        CounterComponent,
        HomeComponent,
        PostsViewComponent,
        PostDetailComponent
    ],
    imports: [
        CommonModule,
        HttpModule,
        FormsModule,
        RouterModule.forRoot([
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            { path: 'home', component: HomeComponent },
            { path: 'counter', component: CounterComponent },
            { path: 'posts-view', component: PostsViewComponent },
            { path: 'post-detail/:id', component: PostDetailComponent },

            { path: '**', redirectTo: 'home' }
        ])
    ]
})
export class AppModuleShared {
}
