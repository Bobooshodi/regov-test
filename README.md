
### Clone the App

```bash
git clone https://github.com/Bobooshodi/regov-test.git
```

# Installation
Navigate to the folder where you cloned the project
```bash
$ cp .env.example .env
```
modify the env file accordingly.
```bash
$ npm install
```
## Running the app With Docker
```bash
$ docker-compose up -d
```
Done, you can noe access the app via http://localhost:3000


## Running the app Without Docker

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

Done, you can noe access the app via http://localhost:3000


PS: You can import the sample_dump.gz file for sample data

##Endpoints
###Users
POST /users
PATCH /users
```
Sample Request Body

{
    "firstName": "User One",
    "lastName": "Test",
    "email": "user-one@test.com",
    "username": "test-user-one",
    "password": "changeMe!"
}
```

GET /users
```
Query Parameeters
fields Array<String>
```
GET /users/{id}
```
Query Parameeters
fields Array<String>
```

### Users
POST /residents/seed
```
Sample Request Body

{
}
```

GET /residents
```
Query Parameeters
fields Array<String>
```
GET /residents/{id}
```
Query Parameeters
fields Array<String>
```

# Question 2
### Pre-order
```
preOrder() {
  let visited = [],
      current = this.root;

  let traverse = node => {
    visited.push(node.val);
    if (node.left) traverse(node.left);
    if (node.right) traverse(node.right);
  };

  traverse(current);
  return visited;
}
```

### In-order
```
inOrder() {
  let visited = [],
      current = this.root;

  let traverse = node => {
    if (node.left) traverse(node.left);
    visited.push(node.val);
    if (node.right) traverse(node.right);
  };

  traverse(current);
  return visited;
}
```

### Post-order
```
postOrder() {
  let visited = [],
      current = this.root;

  let traverse = node => {
    if (node.left) traverse(node.left);
    if (node.right) traverse(node.right);
    visited.push(node.val);
  };

  traverse(current);
  return visited;
}
```
