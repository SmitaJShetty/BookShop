import {PubSub } from 'graphql-subscriptions';

const pubsub = new PubSub();

interface Notification {
    bookName: string 
    authorName: string
}

const addNotification = (notification:Notification) => {
    pubsub.publish('bookAdded', notification);
}