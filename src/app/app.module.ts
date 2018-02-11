
import { SharedService } from './shared/shared.service';
import { DeepLinkingService } from './services/deep-linking.service';
import { FeedSearchService } from './services/feed-search.service';
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

import { FormBuilderService } from './components/search-feed/service/form-builder.service';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule, Routes, DefaultUrlSerializer, UrlSerializer } from '@angular/router';
import { ContentItemDirective } from './components/feed-content-container/content-item.directive';
import { ListLatestPipe } from './components/side-bar/pipes/list-latest.pipe';
import { CustomUrlSerializer } from './shared/url-serializer';

const routes: Routes = [
  {
    path: '', component: AppComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    FeedContainerComponent,
    SideBarComponent,
    FeedContentContainerComponent,
    HeaderComponent,
    SearchFeedComponent,
    ContentItemDirective,
    ListLatestPipe,

  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    ActiveModule.forRoot(),
    NavbarModule,
    RouterModule.forRoot(routes)
  ],
  providers: [
    FormBuilderService,
    FeedSearchService,
    DeepLinkingService,
    SharedService,
    {
      provide: UrlSerializer, useClass: CustomUrlSerializer
    }
  ],
  bootstrap: [AppComponent],
  entryComponents: []
})
export class AppModule { }
