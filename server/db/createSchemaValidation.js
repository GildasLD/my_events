// API_PORT=4242
// MONGO_URI=mongodb://localhost:27042/mern-pool
// TOKEN_KEY=

// USERS

db.createCollection("users", {
  validator: {
    $and: [
      { _id: { $type: "int" } },
      { login: { $type: "string", $regex: /[\w]{5,20}/ } },
      {
        email: {
          $type: "string",
          $regex: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/,
        },
      },
      { password: { $type: "string" } },
      { type: { $type: "bool" } },
    ],
  },
});

db.getCollection("users").drop();
db.createCollection("users", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["id", "login", "email", "password", "type"],
      properties: {
        id: {
          bsonType: "int",
          description: "must be an integer and is required",
        },
        _id: {
          bsonType: "string",
          description: "must be a string in and isn't required",
        },
        login: {
          bsonType: "string",
          description: "must be a string and is required",
          minimum: 5,
          maximum: 20,
        },
        email: {
          pattern: "^\\S+@\\S+\\.\\S+$",
          description: "must be a string and match regex pattern",
        },
        password: {
          bsonType: "string",
          description: "must be an string and is required",
        },
        type: {
          type: ["boolean"],
          description: "must be a boolean",
        },
        connected: {
          type: ["boolean"],
          description: "must be a boolean",
        },
        token: {
          type: ["string"],
          description: "must be a string",
        },
        createdAt: {
          type: ["string"],
          description: "default : now()",
        },
      },
    },
  },
});

db.users.insertOne({
  _id: "628a6065864a3cdc045d46a1",
  id: 89861918,
  login: "Gildas",
  email: "gildasLD@gmail.com",
  password: "password",
  type: false,
  createdAt: "2022-05-22T17:00:09.381Z",
  token:
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImdpbGRhc0xEQGVwaXRlY2guZXUiLCJpYXQiOjE2NTMyMzU4MzUsImV4cCI6MTY1MzM4NzAzNX0.61kgtc7mchplAL5vNPwiusxSWKyrd3kkAKdYsID1p1c",
});

db.getSiblingDB("mern-pool")
  .getCollection("users")
  .deleteOne({ _id: new NumberInt("1111112") });

db.users.find({
  email: "gildas.le-drogoff@epitech.eu",
  password: "c7d6801df723bd569e53aa0edb1a5917ae4078c8",
});

// BLOG

db.getCollection("blog").drop();
db.createCollection("blog", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["user_id", "date", "content", "responses"],
      properties: {
        user_id: {
          bsonType: "string",
          description: "must be a string and is required",
        },
        date: {
          type: ["string"],
          description: "must be a date",
        },
        content: {
          bsonType: "string",
          description: "must be an string and is required",
        },
        responses: {
          type: ["string"],
          description: "must be a string",
        },
        createdAt: {
          type: ["string"],
          description: "default : now()",
        },
      },
    },
  },
});

db.blog.insertOne({
  user_id: "628a44b061b311349b573e22",
  date: "2022-05-22T14:12:00.006Z",
  content: "YOYOYO",
  responses: "{une: 'ici'}",
});

db.blog.insertOne({
  _id: "628a534305b0f30dfecd0d70",
  user_id: "628a44b061b311349b573e22",
  date: "2022-05-22T14:12:00.006Z",
  content: "YOYOYO",
  responses: "{une: 'ici'}",
});
