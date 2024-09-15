import { MongoClient } from 'mongodb';

// Your MongoDB connection code here

const uri = 'mongodb+srv://phucking:N4a6pkS9QmWz0wnS@cluster0.0bgtfdd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function showCollections() {
    try {
        await client.connect();
        const database = client.db('your_database_name'); // Replace with your database name
        const collections = await database.listCollections().toArray();
        console.log('Collections:');
        collections.forEach(collection => console.log(collection.name));
    } catch (err) {
        console.error('Error showing collections:', err);
    } finally {
        await client.close();
    }
}

showCollections();