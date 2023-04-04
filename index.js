var con = require("./connection");
const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());
const { v4: uuidv4 } = require("uuid");
app.use(express.json());

con.connect((error) => {
  if (error) {
    throw error;
  }
});

app.get("/eventList/:monthYear", (req, res) => {
  con.query(
    `select * from event_list where monthYear = '${req.params.monthYear}';`,
    (err, result) => {
      res.send(result);
    }
  );
});

app.post("/eventList", (req, res) => {
  const newId = uuidv4();
  con.query(
    `INSERT INTO event_list (id,event_details, monthYear, dateDay) VALUES ('${newId}','${req.body.event_details}', '${req.body.monthYear}', '${req.body.dateDay}')`,
    (err, result) => {
      res.send(newId);
    }
  );
});

app.delete("/eventList/:id", (req, res) => {
  con.query(
    `DELETE FROM event_list WHERE id='${req.params.id}';`,
    (err, result) => {
      res.send(result);
    }
  );
});

app.listen("3000", () => {
  console.log("Server started on port 3000");
});
