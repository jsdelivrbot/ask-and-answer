create table "user" (
	id serial primary key,
	username varchar(15) not null unique,
	password varchar(15) not null,
	picture_url varchar(100),
	description varchar(500)
);

create table category (
	id serial not null primary key,
	name varchar(15) not null
);

create table question (
	id serial primary key,
	title varchar(40) not null,
	content varchar(500) not null,
	"date" date not null,
	user_id integer references "user"(id),
	category_id integer references category(id)
);

create table answer (
	id serial primary key,
	content varchar(500) not null,
	user_id integer references "user"(id),
	question_id integer references question(id)
);

create table vote (
	id serial primary key,
	answer_id integer references answer(id),
	user_id integer references "user"(id),
	thumbs boolean not null
);

create table best_answer (
	id serial primary key,
	question_id integer unique references question(id),
	answer_id integer references answer(id)
);

insert into "user" (username, password, description) values ('admin', 'admin', 'admin');

insert into category (name) values ('Romance');
insert into category (name) values ('Science');

insert into question (title, content, "date", category_id) values ('Test Question', 'Content', '7/4/2018', 1);