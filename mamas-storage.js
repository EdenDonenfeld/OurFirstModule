const { v4: uuidv4 } = require('uuid');
const lodash = require('lodash');

class InMemoryStorage {
    constructor() {
        this.storage = {};
    }

    create(collectionName, item) {
        if (!this.storage[collectionName]) {
            this.storage[collectionName] = [];
        }
        const itemWithId = {_id: uuidv4(), ...item};
        this.storage[collectionName].push(itemWithId);
        return itemWithId;
    }

    find(collectionName, findFunc) {
        return this.storage[collectionName].filter(findFunc);
    }

    where(collectionName, where) {
        return this.storage[collectionName].filter((item) => {
            Object.keys(where).every((key) => item[key] == where[key]);
        });
    }

    remove(collectionName, findFunc) {
        const removedItems = [];
        this.storage[collectionName] = this.storage[collectionName].filter(item => {
            if (findFunc(item)) {
                removedItems.push(item);
                return false;
            }
            return true;
        });
        return removedItems;
    }
}

class InMemorySharedStorage {
    static sharedStorage = {};

    constructor() {
        this.storage = InMemorySharedStorage.sharedStorage;
    }

    create(collectionName, item) {
        if (!this.storage[collectionName]) {
            this.storage[collectionName] = [];
        }
        const itemWithId = {_id: uuidv4(), ...item};
        this.storage[collectionName].push(itemWithId);
        return itemWithId;
    }

    find(collectionName, findFunc) {
        return this.storage[collectionName].filter(findFunc);
    }

    where(collectionName, where) {
        return this.storage[collectionName].filter((item) => {
            Object.keys(where).every((key) => item[key] == where[key]);
        });
    }

    remove(collectionName, findFunc) {
        const removedItems = [];
        this.storage[collectionName] = this.storage[collectionName].filter(item => {
            if (findFunc(item)) {
                removedItems.push(item);
                return false;
            }
            return true;
        });
        return removedItems;
    }
}