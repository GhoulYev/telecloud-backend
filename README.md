# Teleclod backend.

Telecloud is an easy way to upload files via Telegram for public access. This repository is its back end. It is primarily for my own use. The backend is written very lightly, without introducing any development patterns to keep things simple.

# API documentation

[Documentation](./doc.md) (Clickable)

# Deploy

To deploy this application on your server, install `NodeJS v20.15^`, `npm/yarn latest version`, `prisma v6.0^`

Download this repository to your machine and put it in your project directory:

```
npm install
```

or

```
yarn add
```

after that initialize prisma

```
npx prisma generate
```

and

```
npm run start
```

or

```
yarn run start
```
