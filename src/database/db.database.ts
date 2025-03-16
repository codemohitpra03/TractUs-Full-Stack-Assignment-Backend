import dotenv from 'dotenv';
dotenv.config();


import { Pool } from 'pg';
import { config } from '../config/config';

const {pgUser,pgHost,pgDatabase,pgPassword,pgPort,pgCertificate} = config(process.env.NODE_ENV || 'development');



const fs = require('fs');
const pg = require('pg');
const url = require('url');


const configDB = {
    user: pgUser!,
    password: pgPassword!,
    host: pgHost!,
    port: parseInt(pgPort!),
    database: pgDatabase!,
    ssl: {
        rejectUnauthorized: true,
        ca: pgCertificate!
    },
};



export const pgClient = new Pool({
    ...configDB
})



pgClient.connect(function () {
    
    pgClient.query(`select count(*) from contract_table;`, [], function (err, result) {
        if (err)
            throw err;

        console.log(result.rows[0]);
        
    });
});