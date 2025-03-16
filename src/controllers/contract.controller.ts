import { NextFunction, Request, Response } from 'express';


import { ApiResponse } from '../utils/apiResponse.util';

import fs from 'fs';
import { contractService } from '../services/contract.service';



class ContractController {
    // @ts-ignore
    public async createContract(req: Request, res: Response, next: NextFunction) {
        try {
            
            const contract = await contractService.createContract(req.body);
            
            return res.status(200).json(new ApiResponse('Contract Created', contract, 201));
        } catch (error) {
            next(error);
        }
    }
    public async getContract(req: Request, res: Response, next: NextFunction) {
        try {
            const {contract_id} = req.query;
            const contract = await contractService.getContract(contract_id as string);
            
            return res.status(200).json(new ApiResponse('Contract Fetched', contract, 200));
        } catch (error) {
            next(error);
        }
    }
    public async deleteContract(req: Request, res: Response, next: NextFunction) {
        try {
            
            const {contract_id} = req.query;
            const contract = await contractService.deleteContract(contract_id as string);
            
            return res.status(200).json(new ApiResponse('Contract Deleted', contract, 200));
        } catch (error) {
            next(error);
        }
    }
    public async updateContract(req: Request, res: Response, next: NextFunction) {
        try {
            
            const { contract_id, contract_data, type } = req.body;
            const deleted_contract = await contractService.updateContract(contract_id, contract_data as string, type as ('text' | 'json'));
            return res.status(200).json(new ApiResponse('Updated contract', deleted_contract, 204));
        } catch (error) {
            next(error);
        }
    }


    public async getAllContracts(req: Request, res: Response, next: NextFunction) {
        try {
            
            

            const contracts = await contractService.getAllContracts(req.query as any);

            return res.status(200).json(new ApiResponse('Contracts Fetched',contracts, 200));
        } catch (error) {
            next(error);
        }
    }

    
   
}

export const contractController = new ContractController();
