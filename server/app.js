const express = require("express");
const app = express();
const port = 3003;
app.use(express.json({ limit: '10mb' }));
const cors = require("cors");
app.use(cors());
const md5 = require('js-md5');
const uuid = require('uuid');
const mysql = require("mysql");
app.use(
    express.urlencoded({
        extended: true,
    })
);
app.use(express.json());


const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "logistika",
});

// AUTHENTICATION

const doAuth = function(req, res, next) {
    if (0 === req.url.indexOf('/server')) { // admin
        const sql = `
        SELECT
        name, role
        FROM users
        WHERE session = ?
    `;
        con.query(
            sql, [req.headers['authorization'] || ''],
            (err, results) => {
                if (err) throw err;
                if (!results.length || results[0].role !== 10) {
                    res.status(401).send({});
                    req.connection.destroy();
                } else {
                    next();
                }
            }
        );
    } else if (0 === req.url.indexOf('/login-check') || 0 === req.url.indexOf('/login') || 0 === req.url.indexOf('/register')) {
        next();
    } else { // fron
        const sql = `
        SELECT
        name, role
        FROM users
        WHERE session = ?
    `;
        con.query(
            sql, [req.headers['authorization'] || ''],
            (err, results) => {
                if (err) throw err;
                if (!results.length) {
                    res.status(401).send({});
                    req.connection.destroy();
                } else {
                    next();
                }
            }
        );
    }
}

app.use(doAuth)

// CHECK USER STATUS

app.get("/login-check", (req, res) => {
    const sql = `
         SELECT
         id, name, role
         FROM users
         WHERE session = ?
        `;
    con.query(sql, [req.headers['authorization'] || ''], (err, result) => {
        if (err) throw err;
        if (!result.length) {
            res.send({ msg: 'error', status: 1}); // user not logged
        } else {
            if ('admin' === req.query.role) {
                if (result[0].role !== 10) {
                    res.send({ msg: 'error', status: 2, id: result[0].id }); // not an admin
                } else {
                    res.send({ msg: 'ok', status: 3, id: result[0].id }); // is admin
                }
            } else {
                res.send({ msg: 'ok', status: 4, id: result[0].id }); // is user
            }
        }
    });
});


app.post("/login", (req, res) => {
    const key = uuid.v4();
    const sql = `
    UPDATE users
    SET session = ?
    WHERE name = ? AND password = ?
  `;
    con.query(sql, [key, req.body.user, md5(req.body.pass)], (err, result) => {
        if (err) throw err;
        if (!result.affectedRows) {
            res.send({ msg: 'error', key: '' });
        } else {
            res.send({ msg: 'ok', key });
        }
    });
});

app.post("/register", (req, res) => {
    const key = uuid.v4();
    const sql = `
    INSERT INTO users (name, password, session)
    VALUES (?, ?, ?)
  `;
    con.query(sql, [req.body.name, md5(req.body.pass), key], (err, result) => {
        if (err) throw err;
        res.send({ msg: 'ok', key, text: 'Welcome!', type: 'info' });
    });
});

// AUTHENTICATION END

//CREATE
app.post("/server/dezes", (req, res) => {
    const sql = `
    INSERT INTO boxes (name, weight, image, flamable, expiration, container_id)
    VALUES (?, ?, ?, ?, ?, ?)
    `;
    con.query(sql, [req.body.name, req.body.weight, req.body.image, req.body.flamable, req.body.expiration, req.body.container_id], (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});
app.post("/server/containers", (req, res) => {
    const sql = `
    INSERT INTO konteineriai (type, special_id)
    VALUES (?, ?)
    `;
    con.query(sql, [req.body.type, req.body.special_id], (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});


//READ ALL
app.get("/server/dezes", (req, res) => {
    const sql = `
    SELECT *
    FROM boxes
    `;
    con.query(sql, (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});
app.get("/server/containers", (req, res) => {
    const sql = `
    SELECT *
    FROM konteineriai
    `;
    con.query(sql, (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});
app.get("/server/containers/list", (req, res) => {
    const sql = `
    SELECT *
    FROM konteineriai
    WHERE type = 1 AND boxes_inside < 2 OR
          type = 2 AND boxes_inside < 4 OR
          type = 3 AND boxes_inside < 6
    `;
    con.query(sql, (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});
app.get("/home/dezes", (req, res) => {
    const sql = `
    SELECT konteineriai.*, boxes.*
    FROM konteineriai
    LEFT JOIN boxes
    ON boxes.container_id = konteineriai.id
    `;
    con.query(sql, (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});
app.get("/home/containers", (req, res) => {
    const sql = `
    SELECT *
    FROM konteineriai
    `;
    con.query(sql, (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});

//DELETE
app.delete("/server/dezes/:id", (req, res) => {
    const sql = `
    DELETE FROM boxes
    WHERE id = ?
    `;
    con.query(sql, [req.params.id], (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});
app.delete("/server/containers/:id", (req, res) => {
    const sql = `
    DELETE FROM konteineriai
    WHERE id = ?
    `;
    con.query(sql, [req.params.id], (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});

//EDIT
app.put("/server/dezes/:id", (req, res) => {
    const sql = `
    UPDATE boxes
    SET name = ?, container_id = ?, weight = ?, image = ?, flamable = ?, expiration = ?
    WHERE id = ?
    `;
    con.query(sql, [req.body.name, req.body.container_id, req.body.weight, req.body.image, req.body.flamable, req.body.expiration, req.params.id], (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});
app.put("/server/container/:id", (req, res) => {
    const sql = `
    UPDATE konteineriai
    SET boxes_inside = boxes_inside + 1
    WHERE id = ?
    `;
    con.query(sql, [req.params.id], (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});
app.put("/server/container/delete/:id", (req, res) => {
    const sql = `
    
    UPDATE konteineriai
    SET boxes_inside = CASE WHEN boxes_inside > 0 THEN boxes_inside - 1 ELSE 0
    END
    WHERE id = ?
    `;
    con.query(sql, [req.params.id], (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});

app.listen(port, () => {
    console.log(`Elektra teka per ${port} portą!`)
});