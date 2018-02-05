
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { NavbarModule, ActiveModule } from 'angular-bootstrap-md';
import { FeedContainerComponent } from './components/feed-container/feed-container.component';
import { SideBarComponent } from './components/side-bar/side-bar.component';
import { FeedContentContainerComponent } from './components/feed-content-container/feed-content-container.component';
import { HeaderComponent } from './components/header/header.component';
import { SearchFeedComponent } from './components/search-feed/search-feed.component';

import { FeedListContainerComponent } from './components/feed-list-container/feed-list-container.component';
import { FeedItemComponent } from './components/feed-list-container/feed-item/feed-item.component';

@NgModule({
  declarations: [
    AppComponent,
    FeedContainerComponent,
    SideBarComponent,
    FeedContentContainerComponent,
    HeaderComponent,
    SearchFeedComponent,
    FeedItemComponent,
    FeedListContainerComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ActiveModule.forRoot(),
    NavbarModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: []
})
export class AppModule { }
