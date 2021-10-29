---
title: Practice SQL with MySQL and Docker
date: 2021-04-19
description: How I setup MySQL using Docker to manually issue SQL commands.
draft: false
template: post
---

<!-- intro -->

All my projects thus far favor NoSQL document databases such as
[MongoDB](https://www.mongodb.com/2) or Firebase's
[Cloud Firestore](https://firebase.google.com/products/firestore). To brush up
on my backend developer skills, I thought it time to dive into SQL and
relational databases. In this article, I'll cover a simple setup to manually
issue SQL commands against a MySQL database running inside a Docker container.

<!-- intro -->

- View the [source code](https://github.com/dtjv/mysql-demo).

## Prerequisites

You'll need [Docker Desktop](https://www.docker.com/products/docker-desktop)
installed on your local machine. Once installed, you'll have the `docker`
command-line interface tool available to start and stop Docker containers.

## Setup

If you'd like to follow along, create a project directory to hold your files and
a sub-directory called `data/`. If you wish to use `git` for version control,
add a `.gitignore` and include the `data/` inside.

```bash
$ mkdir mysql-demo
$ cd mysql-demo/
$ mkdir data
$ echo 'data/' > .gitignore
```

## Docker Compose

[Docker Compose](https://docs.docker.com/compose/) is a tool used to define,
start and stop multi-container applications. Although this project will use one
container, using Docker Compose positions the project to add future containers
without hassle.

Create a `docker-compose.yml` file and paste the following configuration inside.

```yaml:title=docker-compose.yml
version: '3.9'
services:
  mysql:
    image: mysql
    restart: always
    volumes:
      - ./data:/var/lib/mysql
    environment:
      MYSQL_ROOT_PASSWORD: root
      MYSQL_DATABASE: school_db
```

The above defines the configuration to start a MySQL Docker container. The
environment variables are values I chose. A key point to note is the volume
setting. I'm using a
[bind mount](https://docs.docker.com/get-started/06_bind_mounts/) volume setting
to link the `data/` folder to MySQL's data folder inside the container. In the
next section, we'll make use of this bind mount to issue SQL queries.

With the configuration complete, spin up a container using the following
command.

```bash
$ docker compose up -d
```

Use the following command to check the container status.

```bash
$ docker ps
CONTAINER ID  IMAGE  COMMAND      CREATED        STATUS        PORTS                NAMES
465870d37b52  mysql  "docker-e…"  7 seconds ago  Up 3 seconds  3306/tcp, 33060/tcp  sql_mysql_service_1
```

## SQL

Next, we'll create batch SQL files to create, populate and query the
`school_db`.

First, copy the following SQL statements into a file - I named this file
`school-schema.sql`. In this file, we create a 'students' table and populate the
table with four student names.

```sql:title=school-schema.sql
USE school_db

DROP TABLE IF EXISTS students;

CREATE TABLE students (
  student_id INT(9) UNSIGNED NOT NULL AUTO_INCREMENT,
  name VARCHAR(50) NOT NULL,
  PRIMARY KEY (student_id)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;

INSERT INTO students (name) VALUES ('joe');
INSERT INTO students (name) VALUES ('tom');
INSERT INTO students (name) VALUES ('may');
INSERT INTO students (name) VALUES ('dan');
```

Next, create `school-queries.sql` and write a simple SQL query.

```sql:title=school-queries.sql
USE school_db;

SELECT * FROM students;
```

If you've followed along thus far, your project folder should look like this:

```
mysql-demo/
├── .gitignore
├── data/
├── docker-compose.yml
├── school-queries.sql
└── school-schema.sql
```

## Run SQL against MySQL

Grab the container id from the `docker ps` command, and use it to log into the
container. Below, I use `<id>` to represent the actual container id.

```bash
# terminal 1
$ docker exec -it 465870d37b52 bash
root@<id>:
```

Open another terminal window and change into the project root directory. Copy
the SQL batch files into `data/`. Files in `data/` are visible from within the
running container - which you'll see in a moment.

```bash
# terminal 2
$ cd mysql-demo/
$ cp *.sql data/
```

Back in Terminal 1, run the SQL batch files against MySQL. Take note the
password is the value you assigned the MYSQL_ROOT_PASSWORD environment variable
in `docker-compose.yml`.

```bash
# terminal 1
root@<id>: mysql -tv -uroot -p school_db < var/lib/mysql/school-schema.sql
password: ****
root@<id>: mysql -tv -uroot -p school_db < var/lib/mysql/school-queries.sql
password: ****
--------------
SELECT * FROM students
--------------

+------------+------+
| student_id | name |
+------------+------+
|         10 | joe  |
|         11 | tom  |
|         12 | may  |
|         13 | dan  |
+------------+------+
```

Success!

Once you're logged into the container, you can make all the changes you want to
the batch files, and those changes will persist even when the container is
shutdown. Since we configured git to ignore `data/`, be sure to save your
changed batch files back into your project root folder for version control
tracking.

## Summary

I admit, this setup and workflow are cumbersome. Despite the tedious terminal
switching and file copying, I like the ability to run SQL commands directly. The
feedback loop is quick and allows me to focus on SQL and not the tooling and
debugging of a CLI and ORM.
