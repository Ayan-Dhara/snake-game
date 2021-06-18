import Express from 'express';
import File from 'fs';

process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = "0";

const app = Express();
app.use(Express.static('public'));

app.get("/", (request, response) => {
    File.readFile("./public/index.html", "utf-8", (error, content) => {
        if(content)
            response.status(200).send(content);
        else
            response.status(500).send("Server Error");
    });
    console.log(request.headers)
})

app.listen(process.env.PORT || 3000, () => console.log("Server Started"))
