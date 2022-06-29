import dotenv from 'dotenv'
dotenv.config()
class config {
    PG_USER_NAME = process.env.PG_USER_NAME;
    PG_USER_PSS = process.env.PG_USER_PSS;
    PG_DB_NAME = process.env.PG_DB_NAME;
    PG_DB_PORT = parseInt(process.env.PG_DB_PORT as string, 10) || 5432;
    PG_HOST = process.env.PG_HOST;
    JWT_SECRET = process.env.JWT_SECRET;
}
export default new config()

