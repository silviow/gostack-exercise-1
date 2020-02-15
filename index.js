const express = require("express");

const server = express();

server.use(express.json());

const projects = [
    {
        id: "1",
        title: "Tindev",
        version: "0.03",
        company: "Rocketseat",
        developers: ["Diego Fernandes", "Silvio Marques"],
        tasks: [
            {
                title: "Do something",
                description: "",
                responsible: "Diego Fernandes"
            },
            {
                title: "Do other thing",
                description: "",
                responsible: "Silvio Marques"
            }
        ]
    },
    {
        id: "2",
        title: "DevRadar",
        version: "0.01",
        company: "Rocketseat",
        developers: ["Diego Fernandes", "Silvio Marques"],
        tasks: [
            {
                title: "Do something",
                description: "",
                responsible: "Diego Fernandes"
            },
            {
                title: "Do other thing",
                description: "",
                responsible: "Silvio Marques"
            }
        ]
    }
];

let counter = 0;

server.use((req, res, next) => {
    counter++;
    console.log(`Request number ${counter} used the ${req.method} method.`);
    next();
});

function checkingProjectExistence(req, res, next) {
    for (let i = 0; i < projects.length; i++) {
        const project = projects[i];
        if (project.id === req.params.id) {
            req.project = project;
            return next();
        }
    }
    return res.status(400).json({ error: "The given id did not return a project" });
}

server.get("/projects", (req, res) => {
    return res.json(projects);
});

server.post("/projects", (req, res) => {
    const { id, title, version, company, developers, tasks } = req.body;
    projects.push({ id, title, version, company, developers, tasks });
    return res.json(projects);
});

server.put("/projects/:id", checkingProjectExistence, (req, res) => {
    const { title } = req.body;
    req.project.title = title;
    return res.json(projects);
});

server.post("/projects/:id/tasks", checkingProjectExistence, (req, res) => {
    const { title, description, responsible } = req.body;
    req.project.tasks.push({ title, description, responsible });
    return res.json(req.project);
})

server.delete("/projects/:id", checkingProjectExistence, (req, res) => {
    let index = projects.indexOf({ id: req.project.id });
    projects.splice(index, 1);
    return res.send();
})

server.listen(3000);