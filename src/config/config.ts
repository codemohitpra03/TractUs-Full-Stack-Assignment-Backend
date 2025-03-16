const configObject={
    production :{
        
        
        pgUser: process.env.PG_USER,
        pgHost: process.env.PG_HOST,
        pgDatabase: process.env.PG_DATABASE,
        pgPassword: process.env.PG_PASSWORD,
        pgPort: process.env.PG_PORT,
        pgCertificate: process.env.PG_CERTIFICATE

    },
    default : {
        
        pgUser: process.env.PG_USER,
        pgHost: process.env.PG_HOST,
        pgDatabase: process.env.PG_DATABASE,
        pgPassword: process.env.PG_PASSWORD,
        pgPort: process.env.PG_PORT,
        pgCertificate: process.env.PG_CERTIFICATE
        
    }
}


export const config = function get(env:string){
    if(env === "PRODUCTION"){

        return configObject.production;
    }else{
        return configObject.default;
    }
}

