# ketemukan-be

npm init

npm install
@hapi/hapi
dotenv
joi
nanoid@3
node-pg-migrate
pg
@hapi/jwt
@hapi/inert
cloudinary
datauri
bcrypt

==========
database
==========
psql --username postgres
CREATE DATABASE ketemukan_v2_2;
GRANT ALL ON DATABASE ketemukan_v2_2 TO developer;
ALTER DATABASE ketemukan_v2_2 OWNER TO developer;

DROP DATABASE ketemukan_v2_2;

==========
migrations
==========
npm run migrate create "create table authentications"
npm run migrate create "create table categories"
npm run migrate create "create table locations"

npm run migrate create "create table achievements"
npm run migrate create "create table users"

npm run migrate create "create table user_achievements"

npm run migrate create "create table lost_items"
npm run migrate create "create table found_items"
npm run migrate create "create table lost_comments"
npm run migrate create "create table found_comments"

npm run migrate create "insert table categories"
npm run migrate create "insert table locations"
npm run migrate create "insert table achievements"

npm run migrate up
