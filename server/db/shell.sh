#!/bin/bash

#  mongodump --uri="mongodb://localhost:27042/?replicaSet=myReplicaSetName" [additional options]
#  
#  mongoexport --uri="mongodb://127.0.0.1:27042/mern-pool?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.3.1"  --collection=users  --out=mongoexport.json
#  
#  mongoexport --jsonFormat=canonical --collection=users mongodb://localhost:27042/mern-pool | jq >| mongoexport.json
#  
#  cat mongoexport.json | tee -a mern-pool.Users.mongodb


##  {
##    "_id": "628a6065864a3cdc045d46a1",
##    "id": {
##      "$numberInt": "1111112"
##    },
##    "login": "Gildas",
##    "email": "gildasLD@gmail.com",
##    "password": "202d44020abb332961824b6aa694547e8986dd0e",
##    "type": true,
##    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImdpbGRhc0xEQGVwaXRlY2guZXUiLCJpYXQiOjE2NTMyMzU4MzUsImV4cCI6MTY1MzM4NzAzNX0.61kgtc7mchplAL5vNPwiusxSWKyrd3kkAKdYsID1p1c"
##  }
##  {
##    "_id": {
##      "$oid": "628a6bb78e0d709a6d8290ee"
##    },
##    "id": {
##      "$numberInt": "54318163"
##    },
##    "login": "GildasLD",
##    "email": "gildasld@epitech.eu",
##    "password": "202d44020abb332961824b6aa694547e8986dd0e",
##    "type": false,
##    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImdpbGRhc0xEQGVwaXRlY2guZXUiLCJpYXQiOjE2NTMyMzg3MTEsImV4cCI6MTY1MzM4OTkxMX0.mV7Ni-vhXaj1oxKAELHBA4KHt3HoZ1gv7DfZ20BJMDg",
##    "createdAt": {
##      "$date": {
##        "$numberLong": "1653238711140"
##      }
##    },
##    "__v": {
##      "$numberInt": "0"
##    }
##  }
##  {
##    "_id": {
##      "$oid": "628a6c19109af413e167f0eb"
##    },
##    "id": {
##      "$numberInt": "89861918"
##    },
##    "login": "GildasLDu",
##    "email": "gildasld@epitech.euu",
##    "password": "202d44020abb332961824b6aa694547e8986dd0e",
##    "type": false,
##    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImdpbGRhc0xEQGVwaXRlY2guZXV1IiwiaWF0IjoxNjUzMjM4ODA5LCJleHAiOjE2NTMzOTAwMDl9.v0sngOyQdqtPtqUkFk6a9TQRprcxF5IBNuHnCWFFDdc",
##    "createdAt": {
##      "$date": {
##        "$numberLong": "1653238809381"
##      }
##    },
##    "__v": {
##      "$numberInt": "0"
##    }
##  }
##  {
##    "_id": {
##      "$oid": "628a6c8e109af413e167f0f1"
##    },
##    "id": {
##      "$numberInt": "89861918"
##    },
##    "login": "GildasLDu",
##    "email": "gildasld@epitech.a",
##    "password": "202d44020abb332961824b6aa694547e8986dd0e",
##    "type": false,
##    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImdpbGRhc0xEQGVwaXRlY2guYSIsImlhdCI6MTY1MzIzODkyNiwiZXhwIjoxNjUzMzkwMTI2fQ.HbOGN8hoqYrHPRgr-XgQIfzB4VyT9A3jRcZpENb8sr8",
##    "createdAt": {
##      "$date": {
##        "$numberLong": "1653238926739"
##      }
##    },
##    "__v": {
##      "$numberInt": "0"
##    }
##  }
##  {
##    "_id": {
##      "$oid": "6298b437068c7c82bfad9a30"
##    },
##    "id": {
##      "$numberInt": "47549299"
##    },
##    "login": "gildasmlkj",
##    "email": "gildasmlkj@mlkj.com",
##    "password": "202d44020abb332961824b6aa694547e8986dd0e",
##    "type": false,
##    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImdpbGRhc21sa2pAbWxrai5jb20iLCJpYXQiOjE2NTQxNzQ3NzUsImV4cCI6MTY1NDMyNTk3NX0.kYX8jCbhu-g3LsHJS0dSWg5dQkML-pXKVf1gAC8Ht0A",
##    "createdAt": {
##      "$date": {
##        "$numberLong": "1654174775385"
##      }
##    },
##    "__v": {
##      "$numberInt": "0"
##    }
##  }
##  {
##    "_id": {
##      "$oid": "6298b513564dd9b115eacd27"
##    },
##    "id": {
##      "$numberInt": "90099975"
##    },
##    "login": "uuu@ooo.com",
##    "email": "uuu@ooo.com",
##    "password": "202d44020abb332961824b6aa694547e8986dd0e",
##    "type": false,
##    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InV1dUBvb28uY29tIiwiaWF0IjoxNjU0MTc0OTk1LCJleHAiOjE2NTQzMjYxOTV9.DhKamZUxHgTwkdIao93qDnCYwQqbiugSEGIrLhA0vOc",
##    "createdAt": {
##      "$date": {
##        "$numberLong": "1654174995870"
##      }
##    },
##    "__v": {
##      "$numberInt": "0"
##    }
##  }
##  {
##    "_id": {
##      "$oid": "6314f6f917d3502056536653"
##    },
##    "id": {
##      "$numberInt": "80777336"
##    },
##    "login": "null",
##    "email": "gildas.le-drogoff@epitech.eu",
##    "type": false,
##    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImdpbGRhcy5sZS1kcm9nb2ZmQGVwaXRlY2guZXUiLCJpYXQiOjE2NjIzMTgzMjksImV4cCI6MTY2MjQ2OTUyOX0.OFFRr7zL9UCIIlU4_TVUNHC9FosXU75OIooHW3T_hCY",
##    "createdAt": {
##      "$date": {
##        "$numberLong": "1662318329965"
##      }
##    },
##    "__v": {
##      "$numberInt": "0"
##    },
##    "password": "202d44020abb332961824b6aa694547e8986dd0e"
##  }
##  {
##    "_id": {
##      "$oid": "6314fdb0a639fd329feeba89"
##    },
##    "name": "super_test",
##    "email": "gildas.le-drogoff@epitech.test",
##    "createdAt": {
##      "$date": {
##        "$numberLong": "1662327175000"
##      }
##    },
##    "password": "202d44020abb332961824b6aa694547e8986dd0e"
##  }
##  {
##    "_id": {
##      "$oid": "6314ff8e88bdd6c1eb15d2d5"
##    },
##    "id": {
##      "$numberInt": "87491833"
##    },
##    "login": "null",
##    "email": "mec.le-drogoff@epitech.eu",
##    "password": "mec.le-drogoff@epitech.eu",
##    "type": false,
##    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1lYy5sZS1kcm9nb2ZmQGVwaXRlY2guZXUiLCJpYXQiOjE2NjIzMjA1MjYsImV4cCI6MTY2MjQ3MTcyNn0.gUGTRJHlHXzG9rcCUHfWbDdLV3TwCVilWLl7J9ppXm0",
##    "createdAt": {
##      "$date": {
##        "$numberLong": "1662320526711"
##      }
##    },
##    "__v": {
##      "$numberInt": "0"
##    }
##  }
##  {
##    "_id": {
##      "$oid": "6315072d6cdc0ed98d44e723"
##    },
##    "id": {
##      "$numberInt": "25490224"
##    },
##    "login": "null",
##    "email": "test.le-drogoff@epitech.eu",
##    "password": "test.le-drogoff@epitech.eu",
##    "type": false,
##    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3QubGUtZHJvZ29mZkBlcGl0ZWNoLmV1IiwiaWF0IjoxNjYyMzIyNDc3LCJleHAiOjE2NjI0NzM2Nzd9.KK5qKQZ7dv8Lhnn3nAYDdKgwPzE8MGHGQ11FEYE4d2A",
##    "createdAt": {
##      "$date": {
##        "$numberLong": "1662322477978"
##      }
##    },
##    "__v": {
##      "$numberInt": "0"
##    }
##  }
