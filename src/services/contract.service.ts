
import axios from 'axios';
import { ErrorEnum } from '../exceptions/errorCodes';
import { HttpException } from '../exceptions/httpException';
import { CreateContractBody, GetAllContractsQuery } from '../dtos/contract.dto';
import { pgClient } from '../database/db.database';





class ContractService {
    
    public async createContract(createContractBody:CreateContractBody){
        try {
            const { client_name, contract_data, type } = createContractBody;
            const newContract = await pgClient.query(
            `
                INSERT INTO contract_table (client_name, contract_data, type) VALUES ($1, $2, $3) RETURNING *;
            `,
                [client_name, contract_data, type]
            );
            return newContract.rows[0];
        } catch (error) {
            console.log(error);
            
            throw new HttpException(ErrorEnum._ERR_CONTRACT_1);
        }
    }

    public async getContract(contract_id:string){
        try {
            const query = `
                SELECT * FROM contract_table WHERE contract_id = $1;
            `;

            const contract = await pgClient.query(query, [contract_id]);
            
            if(contract.rowCount === 0){
                throw new Error('_CONTRACT_NOT_FOUND');
            }

            return contract.rows[0];
            

            // 404 not found
        } catch (error:any) {
            console.log(error);
            if(error.message === '_CONTRACT_NOT_FOUND'){
                throw new HttpException(ErrorEnum._CONTRACT_NOT_FOUND);    
            }
            throw new HttpException(ErrorEnum._ERR_CONTRACT_0);
        }
    }

    public async deleteContract(contract_id:string){
        try {
            
            const contract = await pgClient.query("SELECT * FROM contract_table WHERE contract_id = $1", [contract_id]);

            if (contract.rowCount === 0) {
                throw new Error('_CONTRACT_NOT_FOUND');
            }
        
            
            await pgClient.query("DELETE FROM contract_table WHERE contract_id = $1", [contract_id]);
        
            return {deletedContract: contract.rows[0] };
        } catch (error:any) {
            console.log(error);
            if(error.message === '_CONTRACT_NOT_FOUND'){
                throw new HttpException(ErrorEnum._CONTRACT_NOT_FOUND);    
            }
            throw new HttpException(ErrorEnum._ERR_CONTRACT_3);
        }
    }

    public async updateContract(contract_id:string, contract_data:string, type:'text' | 'json'){
        try {

            const contract = await pgClient.query("SELECT * FROM contract_table WHERE contract_id = $1", [contract_id]);

            if (contract.rowCount === 0) {
                throw new Error('_CONTRACT_NOT_FOUND');
            }


            const fields = [];
            const values = [];
            
            if (contract_data) {
                fields.push("contract_data = $1");
                values.push(contract_data);
            }
            if (type) {
                fields.push("type = $" + (values.length + 1));
                values.push(type);
            }
            values.push(contract_id);

            const updatedContract = await pgClient.query(
                `UPDATE contract_table SET ${fields.join(", ")}, updated_at = NOW() WHERE contract_id = $${values.length} RETURNING *`,
                values
            );
            return updatedContract.rows[0];
        } catch (error:any) {
            console.log(error);
            if(error.message === '_CONTRACT_NOT_FOUND'){
                throw new HttpException(ErrorEnum._CONTRACT_NOT_FOUND);    
            }
            throw new HttpException(ErrorEnum._ERR_CONTRACT_2);
        }

    }


    public async getAllContracts(getAllContractQiery:GetAllContractsQuery){
        try {
            const defaultSortBy = 'created_at';
            const defaultOrder = 'DESC';
            const defaultStatus = 'both';


            
            
            const { sortBy, order, page, limit, status, searchQuery } = getAllContractQiery;
            console.log(status);
            

            const offset = (parseInt(page as string) - 1) * parseInt(limit as string);
            let query = `SELECT * FROM contract_table`;

            let conditions: string[] = [];
            let values: any[] = [];

            
            if (status && status !== "both") {
                conditions.push("status = $1");
                values.push(status ?? defaultStatus);
            }

            
            if (searchQuery) {
                conditions.push(`(client_name ILIKE $${(status && status !== 'both') ? 2 : 1} OR contract_id::text ILIKE $${(status && status !== 'both') ? 2 : 1})`);
                values.push(`%${searchQuery}%`);
            }
        
            
            if (conditions.length) {
                query += ` WHERE ${conditions.join(" AND ")}`;
            }

            
            query += ` ORDER BY ${sortBy ?? defaultSortBy} ${order ?? defaultOrder} LIMIT $${values.length + 1} OFFSET $${values.length + 2};`;
            
            // let countQuery = query.replace('SELECT * FROM contract_table','SELECT COUNT(*) FROM contract_table');
            let countQuery = query.replace(`LIMIT $${values.length + 1} OFFSET $${values.length + 2}`,'');
            // countQuery = countQuery.replace(`ORDER`,'GROUP BY client_name ORDER');
            console.log(countQuery);
            

            values.push(parseInt(limit as string), offset);
            console.log(query);
            console.log(values);

            const countResult = await pgClient.query(countQuery,values.slice(0,-2));
            
            
            const result = await pgClient.query(query, values);


            const totalPages = Math.ceil(countResult.rowCount! / parseInt(limit))

            return {
                contracts:result.rows,
                totalPages

            };
        } catch (error) {
            console.log(error);
            throw new HttpException(ErrorEnum._ERR_CONTRACT_ALL_0);
        }
    }
    
}

export const contractService = new ContractService();
