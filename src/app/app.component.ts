import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  data1: boolean = false;
  constructor(private httpClient: HttpClient) {

    this.httpClient.get('https://api.rss2json.com/v1/api.json?rss_url=http://www.feedforall.com/sample.xml').subscribe((data) => {
      // this.httpClient.get('http://www.feedforall.com/sample.xml').subscribe((data) => {
      // https://api.rss2json.com/v1/api.json?rss_url=[URL]
      console.log(data);
    });

  };
}
