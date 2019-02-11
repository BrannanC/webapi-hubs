const express = require('express');
const db = require('./data/db.js');

const server = express();
server.use(express.json());

server.get('/', (req, res) => {
    res.send('<h2>ASFASF</h2>')
})

server.get('/now', (req, res) => {
    res.send(`<h2>${Date.now()}</h2>`);
})

server.get('/hubs', (req, res) => {

    db.hubs
        .find()
        .then(hubs => {
            res.status(200).json(hubs);
        })
        .catch(err => {
            res.status(err.code).json({ success: false, message: err.message});
        })
})

server.post('/hubs', (req, res) => {
    const hub = req.body;
    db.hubs
        .add(hub)
        .then(hub => {
            res.status(201).json({ success: true, hub});
        })
        .catch(({ code, message}) => {
            res.status(code).json({ succes: false, message });
        })
})

server.delete('/hubs/:id', (req, res) => {
    const hubId = req.params.id;
    db.hubs
        .remove(hubId)
        .then(deleted => {
            res.status(204).end();
        })
        .catch(({ code, message}) => {
            res.status(code).json({ succes: false, message });
        })
});

server.put('/hubs/:id', (req, res) => {
    const hubId = req.params.id;
    const changes = req.body;

    db.hubs
        .update(hubId, changes)        
        .then(updated => {
            updated ? 
            res.status(200).json({ success: true, updated})
            : res.status(404).json({ success: false, message: 'Hub not found'})
        })
        .catch(({ code, message}) => {
            res.status(code).json({ succes: false, message });
        })
});

server.listen(4000, () => {
    console.log('\n*** Running on port 4000 ***\n');
})