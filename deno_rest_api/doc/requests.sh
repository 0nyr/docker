#!/bin/bash

LIGHT_ORANGE="\e[38;5;216m"
TURQUOISE="\e[38;5;43m"
LIGHT_BLUE="\e[38;5;153m"
RED="\e[38;5;196m"
NO_COLOR="\e[0m"

# get all users
echo -e "${LIGHT_BLUE}### get all users${NO_COLOR}"
curl --location --request GET 'localhost:8080/users'

echo -e ""
# get a specific user Deconan (base user)
echo -e "${LIGHT_BLUE}### get a specific user Deconan (base user)${NO_COLOR}"
curl --location --request GET 'localhost:8080/users/2451651708888098'

echo -e ""
# get a specific user Alme (not registered)
echo -e "${LIGHT_BLUE}### get a specific user Alme (not registered)${NO_COLOR}"
curl --location --request GET 'localhost:8080/users/2988140176787717'

echo -e ""
# post new user Axou
echo -e "${LIGHT_BLUE}### post new user Axou${NO_COLOR}"
curl --location --request POST 'localhost:8080/users/' \
--header 'Content-Type: application/json' \
--data-raw '{
    "pseudo": "Axou19",
    "mail": "axou.19@yahoo.fr",
    "age": 27
}'

echo -e ""
# get a specific user Axou
echo -e "${LIGHT_BLUE}### get a specific user Axou${NO_COLOR}"
curl --location --request GET 'localhost:8080/users/3657364567923210'

echo -e ""
# post new user Alme
echo -e "${LIGHT_BLUE}### post new user Alme${NO_COLOR}"
curl --location --request POST 'localhost:8080/users/' \
--header 'Content-Type: application/json' \
--data-raw '{
    "pseudo": "AlmeCapys",
    "mail": "alme.capys@gmail.com"
}'

echo -e ""
# get a specific user Alme
echo -e "${LIGHT_BLUE}### get a specific user Alme${NO_COLOR}"
curl --location --request GET 'localhost:8080/users/2988140176787717'

echo -e ""
# modify specific user Axou
echo -e "${LIGHT_BLUE}### modify specific user Axou${NO_COLOR}"
curl --location --request PUT 'localhost:8080/users/3657364567923210' \
--header 'Content-Type: application/json' \
--data-raw '{   
    "id": 3657364567923210,
    "pseudo": "Axou19",
    "mail": "calixte.petit@insa-lyon.fr",
    "age": 31
}'

echo -e ""
# get a specific user Axou
echo -e "${LIGHT_BLUE}### get a specific user Axou${NO_COLOR}"
curl --location --request GET 'localhost:8080/users/3657364567923210'

echo -e ""
# delete specific user Alme
echo -e "${LIGHT_BLUE}### delete specific user Alme${NO_COLOR}"
curl --location --request DELETE 'localhost:8080/users/2988140176787717'
# strangely prints nothing, howerver it works (in postman, there is msg)

echo -e ""
# get a specific user Alme (deleted)
echo -e "${LIGHT_BLUE}### get a specific user Alme (deleted)${NO_COLOR}"
curl --location --request GET 'localhost:8080/users/2988140176787717'

echo -e ""

