collections.forEach(function(collectionName) {
    const sourceCollection = db.getSiblingDB('users').getCollection(collectionName);
    const targetCollection = db.getCollection(collectionName);
    
    sourceCollection.find().forEach(function(doc) {
        targetCollection.insert(doc);
    });
});