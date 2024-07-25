const express = require("express");
const app = new express();

app.listen(3100, () => {
    console.log('Server started on port 3100');
})

app.get('/', (req, res) => {
    res.send('Hello World!');
})

app.post('/dev', async (req, res) => {
    let data = await res.json({
        status: 200,
        message: "You allow Access."
    });

    console.log(data.res);
})