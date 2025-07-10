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
CREATE DATABASE ketemukan_v1;
GRANT ALL ON DATABASE ketemukan_v1 TO developer;
ALTER DATABASE ketemukan_v1 OWNER TO developer;

==========
migrations
==========
npm run migrate create "create table users"
npm run migrate create "create table authentications"
npm run migrate create "create table lost_items"
npm run migrate create "create table found_items"
npm run migrate create "create table lost_comments"
npm run migrate create "create table found_comments"

npm run migrate up
