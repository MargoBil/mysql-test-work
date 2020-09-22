const sql = `create table if not exists contacts(
    id int auto_increment not null,
    name varchar(30) not null,
    surname varchar(30) not null,
    phone varchar(15) not null,
    primary key (id)
  )`;

module.exports = sql;
