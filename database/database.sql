create table jokes(
	id serial primary key,
	whos_joke varchar(20),
	joke_question varchar(140),
	punch_line varchar (140),
	date_added date,
	funniness integer);

  insert into jokes(whos_joke, joke_question, punch_line, date_added, funniness)
values('Mike', 'Why can''t a bank keep a secret?', 'Because there are too many tellers!', '02/13/18', '1')

insert into jokes(whos_joke, joke_question, punch_line, date_added, funniness)
values('Danny', 'Why do scuba divers fall backwards out of boats?', 'If they fell forwards they’d still be in the boat!', '02/13/18', '1')
