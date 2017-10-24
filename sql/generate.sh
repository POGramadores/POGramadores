awk '$0 ~ /CREATE TABLE/ {print "DROP TABLE " $3 "CASCADE;" } ' popule.sql | sed 's/(/ /g'> dropTudo.sql
