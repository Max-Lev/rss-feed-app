import { Feed } from './feed.model';
export const SELECT: string = 'SELECT';
export const DELETE: string = 'DELETE';


export interface IFeedMode {
    feed: Feed;
    mode: string;
};
