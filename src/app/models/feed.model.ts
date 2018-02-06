export interface IFeed {
    feedID: number;
    title: string;
    url: string;
    items?: IFeedItems[];
};

export interface IFeedItems {
    title: string;
    description: string;
    guid: string;
};

export class Feed implements IFeed {
    feedID: number;
    title: string;
    url: string;
    items?: IFeedItems[];
    constructor(feedID: number, feed: IFeed, feedItems: IFeedItems[]) {
        this.feedID = feedID;
        this.title = feed.title;
        this.url = feed.url;
        this.items = feedItems;
    }
};
