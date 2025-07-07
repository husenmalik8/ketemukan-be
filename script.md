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

==========
database
==========
psql --username postgres
CREATE DATABASE xxx;
GRANT ALL ON DATABASE xxx TO developer;
ALTER DATABASE xxx OWNER TO developer;

==========
migrations
==========
npm run migrate create "create table users"
npm run migrate create "create table lost_items"
npm run migrate create "create table found_items"
npm run migrate create "create table authentications"
npm run migrate create "create table lost_comments"
npm run migrate create "create table found_comments"

npm run migrate up
