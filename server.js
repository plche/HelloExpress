const express = require("express");
const app = express();
const port = 8000;

// Podemos preestablecer algunos usuarios más adelante almacenaremos los usuarios en una base de datos
const users = [
  { firstName: "Reimu",  lastName: "Hakurei"    },
  { firstName: "Marisa", lastName: "Kirisame"   },
  { firstName: "Sanae",  lastName: "Kochiya"    },
  { firstName: "Sakuya", lastName: "Izayoi"     },
  { firstName: "Momiji", lastName: "Inubashiri" }
];

// Para poder acceder a los datos POST, necesitamos poder extraerlos del objeto "request" (solicitud).
// Asegurarse de que las siguientes líneas se encuentren por encima de cualquier bloque de código app.get o app.post
// Tanto express.urlencoded() y express.json() son funciones middleware en Express.
// Son responsables de proporcionar y analizar los datos de "request.body".
app.use( express.json() );
app.use( express.urlencoded({ extended: true }) );

// "req" is short for "request" y "res" is short for "response"
app.get("/api", (req, res) => {
  res.send("Our express api server is now sending this over to the browser");
});

// GET datos
app.get("/api/users", (req, res) => {
  // En Postman se recibirá como una lista de objetos user, tal cual se ha declarado en la línea 12.
  res.json( users );
});

// POST datos
app.post("/api/users", (req, res) => {
  // "req.body" contendrá los datos del formulario desde Postman o desde React
  console.log(req.body);
  // Podemos hacer push en el array de usuarios por ahora... más tarde esto se insertará en una base de datos
  users.push(req.body);
  // siempre tendremos que responder con algo
  res.json( { status: "ok" } );
});

// Parámetros de ruta, obtener datos de una URL
// si queremos obtener un usuario con un "id" específico, podemos hacer que el "id" sea parte de la url
// asegurarse de preceder la variable "id" con dos puntos ":"
app.get("/api/users/:id", (req, res) => {
  // podemos obtener esta variable "id" del objeto "req.params"
  console.log(req.params.id);
  // asumiendo que este "id" es el índice del array de usuarios podríamos devolver un usuario de esta manera
  res.json( users[req.params.id] );
});

// PUT (Actualizar) datos
app.put("/api/users/:id", (req, res) => {
  // podemos obtener la variable "id" de "req.params"
  const id = req.params.id;
  // asumiendo que este "id" es el índice del array de usuarios podemos reemplazar el usuario así
  users[id] = req.body;
  // siempre debemos responder con algo
  res.json( { status: "ok" } );
});

// DELETE (Eliminar) datos
app.delete("/api/users/:id", (req, res) => {
  // podemos obtener la variable "id" de "req.params"
  const id = req.params.id;
  //  asumiendo que este "id" es el índice del array de usuarios podemos eliminar el usuario así
  users.splice(id, 1);
  //  siempre debemos responder con algo
  res.json( { status: "ok" } );
});

const server = app.listen(port, () =>
  console.log(`Server is locked and loaded on port ${server.address().port}!`)
);
