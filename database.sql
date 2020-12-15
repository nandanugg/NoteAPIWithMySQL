-- To run this project, please run these queries
drop database if exists notes;
create database notes;
use notes;
create table users(
  id char(21) primary key,
  username varchar(32) not null unique,
  -- For specific columns like id or password that rely on a library to fill, make sure that
  -- we know how to store it properly by giving correct datatype and length
  -- 👇 https://stackoverflow.com/questions/5881169/what-column-type-length-should-i-use-for-storing-a-bcrypt-hashed-password-in-a-d
  password binary(60) not null,
  -- It's a good habit to track when the data is created and updated
  -- Because at work, there will be a high chance that our company
  -- need some statistic about user growth (registered user per month)
  -- or etc, these rows are precious it can be a deciding factor for
  -- the company
  updatedAt datetime not null default CURRENT_TIMESTAMP on update CURRENT_TIMESTAMP,
  createdAt datetime not null default CURRENT_TIMESTAMP
);
create table notes(
  id char(21) primary key,
  note text not null,
  isArchived boolean not null default false,
  userId char(21) not null,
  foreign key (userId) references users(id),
  updatedAt datetime not null default CURRENT_TIMESTAMP on update CURRENT_TIMESTAMP,
  createdAt datetime not null default CURRENT_TIMESTAMP
);