import express from 'express';

const app = express();

app.get("/", (req, res) => {
    return res.status(200).json({ Message: "Welcome to Home" })
})

app.get('/login', (req, res) => {
    return res.status(200).json({ Message: "Welcome to login screen" });
});

app.get('/google', (req, res) => {
    // handle with passport
});

app.get('/logout', (req, res) => {
    // handle with passport
});


app.listen(3000, (err) => {
    if (err) {
        console.log("An error occured", err);
    } else {
        console.log("App is listining to the port 3000");
    }
});