select * from portfolioadmins
where username ilike $1
and password = $2