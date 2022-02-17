# Backend and Frontend for Teebay

First clone the project from `github` then, we will find two folders -

1. `teebay_fe` for frontend and
2. `teebay-backend` is the api application layer

#### Tech Stacks are used in this project

1. For FE - `ReactJS, ` Material-UI, `react-router-dom `and Apollo-Client
2. For BE - `NodeJS/Express, ` GraphQL

3. Database - `PostgreSQL`

4. ORM - `Sequelize `

### Docker-based setup

---

Syncing code changes between host machine and container costs a little bit. So in this approach, we run dependencies in `docker-compose` <br>
First, [install and start docker](https://docs.docker.com/get-docker/)

Then, after installing `Docker,` build and run through
<br>
Connect everything:

```
$ docker-compose build
```

```
$ docker-compose up
```

### Tail logs

`$ docker-compose logs -f`

### Documents

---

Since, our API's based on `GraphQL`
<br>
We have following
<br>
`Mutations`:

- loginUser - for login
- registerUser - for registration
- updateAccount - to update Account/User profile
- createProduct - to create a new product
- addProduct - to add a new product
- deleteProduct - to delete a product

`Query`

- searchProduct - to search a product
- getUser - to get user

---

Frontend Part
<br>
We have following routes :

- /
- /signin
- /registration
- /setting
- /myproducts
- /add
- /allproducts
- /allProducts/:id

## 1) Alternative Install PostgreSQL

We use PostgreSQL as database. Please search pg setup tutorials on Google for your local machine.

If you are using macOS, you can setup PostgresSQL in the following way:

```
brew install postgres
initdb /usr/local/var/postgres
brew services start postgresql
psql -h localhost -d postgres -c 'create user root with superuser;'
```

Git development guide:

```
- `develop` only contains production code.
- `on_developing` contains all developing code
- When start a new feature, checkout a new features branch from `develop`
- To test the new features, `git checkout on_developing` and `git merge features/your_features_branch`, and deploy `on_developing` to the dev server
- If it is all tested, then merge the `features branch` into `develop` and deploy `develop` to production server
- When there needs hot fix online, checkout a new `hotfix/branch_name` from develop, and test it on `on_developing`. When it is done, deploy the `hotfix branch` directly to production server to see whether it works well. If it works as expected, then merge the `hotfix branch` into `develop`
```
