# Website YLM

> [!IMPORTANT]
> Please see [Project Convention](./CONVENTION.md) before making contribution

## Requirements

- PHP 8.2.x or higher. [(Reference)][PHP Download Page]
- Node.js 20.10.0 LTS or higher. [(Reference)][Node.js Download Page]
- NPM 10.2.4 or higher
- MySQL 8.0 or higher [(Reference)][MySQL Download Page]

## Setup

1. **Clone this repository and `cd` into it**

2. **Install Composer & Node.js packages**

```shell
composer install
npm install
```

3. **Create .env file from example & Generate APP Key**

```shell
cp .env.example .env
php artisan key:generate
```

4. **Configure the database:** Update the `.env` file to match your MySQL database settings. Adjust the values for `DB_HOST`, `DB_PORT`, `DB_DATABASE`, `DB_USERNAME`, and `DB_PASSWORD` as needed.

5. **Run database migrations:** To set up the necessary tables, execute the migration command:

```shell
php artisan migrate
```

6. **Start the development server:** To run the local development server, use the following command:

```shell
composer run dev
```

[PHP Download Page]: https://www.php.net/downloads.php
[Node.js Download Page]: https://nodejs.org/en/download
[Conventional Commits Specification]: https://www.conventionalcommits.org/en/v1.0.0/
[MySQL Download Page]: https://dev.mysql.com/downloads/mysql
