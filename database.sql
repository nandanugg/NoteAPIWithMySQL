-- Run this query to your MySQL in order to run this API!
drop database if exists notes;
create database notes;
use notes;
create table users (
  id char(21) not null primary key,
  username varchar(32) unique not null,
  password text not null
);
create table notes(
  id char(21) not null primary key,
  note text not null,
  userId char(21) not null,
  foreign key (userId) references users(id)
);