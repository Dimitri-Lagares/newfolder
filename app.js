import express from "express";
import { config } from "dotenv";
import pg from "pg";

config()

const app = express();
const PORT = process.env.PORT;

const connection = new pg.Pool({
    // user: "user",
    // password: "INeWtS5qOgD6kqZcK7rNeLBa0EHnhWZT",
    // host:"dpg-ciq76q5gkuvrtobf9o70-a.oregon-postgres.render.com",
    // database:"database_ymqr",
    connectionString: "postgres://user:INeWtS5qOgD6kqZcK7rNeLBa0EHnhWZT@dpg-ciq76q5gkuvrtobf9o70-a.oregon-postgres.render.com/database_ymqr",
    ssl:true
})

app.get('/', (req, res) => {
    res.send("App Running");
});

app.get('/get-all', (req, res) => {
    const sql = 'SELECT * FROM "integrator-project".form'
    connection.query(sql, (error, result) => {
        if (error) {
            res.send(error)
        } else {
            res.send(result.rows)
        }
    })
});

app.post('/add', (req, res) => {
    const { campo1, campo2 } = req.body;
    const sql = `INSERT INTO "integrator-project".form (campo1, campo2) VALUES ('${campo1}', '${campo2}')`;

    connection.query(sql, (error, result) => {
        if (error) {
            res.send(error)
        } else {
            res.send('added successfully')
        }
    })
});


app.listen(PORT, () => {
    console.log(`Server Running on Port ${PORT}`);
});

connection.connect((error) =>{
    if (error) {
        console.log(error);
    } else {
        console.log("Database connection established");
    }
})