update portfolioprojects
set title = $2,
description = $3,
image = $4, 
videoLink = $5
where id = $1