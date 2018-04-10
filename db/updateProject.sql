update portfolioprojects
set title = $2,
description = $3,
image = $4, 
video = $5,
projectlink = $6
where id = $1