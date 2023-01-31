
import { Routes } from ".././routes";
import { Collection, Item, Header } from "postman-collection";

import * as fs from "fs";

export const generatePostmanCollection = () => {

    const rawHeaderString = 'Content-Type:application/json\ncache-control:no-cache\n';
    const rawHeaders = Header.parse(rawHeaderString);
    const requestHeader = rawHeaders.map((h) => new Header(h));
    
    const postmanCollection = new Collection({
        info: {
          name: 'Backend - API'
        },
        item: [],
        variable: [
            {
                key: "baseUrl",
                value: "http://localhost:3000",
                type: "default"
            }
        ]
      });
    Routes.forEach((route) => {
        const item = new Item({
            name: route.route,
            request: {
                method: route.method,
                header: requestHeader,
                body: {
                    mode: "raw",
                    raw: "",
                },
                url: {
                    host: ["{{baseUrl}}"],
                    path: [route.route],
                },
            },
        });
        if (route.params) {
            item.request.body.mode = "raw";
            item.request.body.raw = JSON.stringify(route.params.body);
        }
        postmanCollection.items.add(item);
    });
    
    const collectionJSON = postmanCollection.toJSON();
    fs.writeFile('./collection.json', JSON.stringify(collectionJSON), (err) => {
        if (err) { console.log(err); }
        console.log('File saved');
      });
}
generatePostmanCollection()