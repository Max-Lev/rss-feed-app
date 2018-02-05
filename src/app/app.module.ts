
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { MDBBootstrapModule, NavbarModule } from 'angular-bootstrap-md';
import { FeedContainerComponent } from './components/feed-container/feed-container.component';
import { SideBarComponent } from './components/side-bar/side-bar.component';
import { FeedContentContainerComponent } from './components/feed-content-container/feed-content-container.component';
import { HeaderComponent } from './components/header/header.component';

@NgModule({
  declarations: [
    AppComponent,
    FeedContainerComponent,
    SideBarComponent,
    FeedContentContainerComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    // MDBBootstrapModule
    NavbarModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: []
})
export class AppModule { }
