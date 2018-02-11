import { Feed } from './feed.model';
export const SELECT: string = 'SELECT';
export const DELETE: string = 'DELETE';
export const FEEDURLOPTIONS: Array<string> = [
    'http://www.feedforall.com/sample.xml',
    'http://www.feedforall.com/sample-feed.xml',
    'http://www.feedforall.com/blog-feed.xml',
    'http://www.rss-specifications.com/blog-feed.xml'
];
console.log('feed options: ', FEEDURLOPTIONS);

export interface IFeedMode {
    feed: Feed;
    mode: string;
};
