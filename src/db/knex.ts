import { knex, Knex } from 'knex';
import config from '../common/config';
   export class KnexDB {
        constructor() {
            console.log('knex db is created');
            //this.knexdb.seed.run();
        };
        config: Knex.Config = {
            client: "pg",
            connection: {
                host: config.PG_HOST,
                port: config.PG_DB_PORT,
                user: config.PG_USER_NAME,
                password: config.PG_USER_PSS,
                database: config.PG_DB_NAME
            },
            migrations: {
                directory: "./src/db/migrations"
            },
            seeds: {
                directory: "./src/db/seeds"
            } 
        };
        knexdb: Knex = knex(this.config);
        
        init() {
           
            return new Promise((resolve, reject) => {
                try {
                    const result = JSON.stringify(this.knexdb.migrate.latest());
                    console.log('Migration completed' + result);
                    
                    resolve(true);
                } catch (error) {
                    const rollback = JSON.stringify(this.knexdb.migrate.rollback());
                    console.log('Migration error' + error);
                    console.log('Migration error' + rollback);
                    reject(false);
                }

                resolve(true);
            });
        };
    };
    
    const knexdb = new KnexDB();
    export default knexdb;