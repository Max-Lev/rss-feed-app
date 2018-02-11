import { UrlSerializer, DefaultUrlSerializer, UrlTree } from '@angular/router';

export class CustomUrlSerializer implements UrlSerializer {
    parse(url: string): UrlTree {
        const defaultUrlSerializer = new DefaultUrlSerializer();
        return defaultUrlSerializer.parse(url);
    }
    serialize(tree: UrlTree): string {
        const defaultUrlSerializer = new DefaultUrlSerializer();
        const path = defaultUrlSerializer.serialize(tree);
        const prettyUrl = path.replace(/%2F/g, '/');
        return prettyUrl;
    }
};