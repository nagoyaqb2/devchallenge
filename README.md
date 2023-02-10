# Design Challenge Contact App

To run the app, first, clone the repository:

```bash
git clone https://github.com/nagoyaqb2/devchallenge.git
```

Install the required packages

```bash
npm install
```

Then, in the folder of the app, copy the .env.example file into the .env file

After this step, generate the Prisma schema

```bash
npx prisma generate
```

Followed by the migration, and db creation

```bash
npx prisma migrate dev --name init
```

And finally, run the app

```bash
npm run dev
```
