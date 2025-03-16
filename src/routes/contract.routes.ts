import { Router } from 'express';
const router = Router();

import { validateDTO } from '../middlewares/validation.middleware';

import { contractController } from '../controllers/contract.controller';
import { createContractDTO, deleteContractDTO, getAllContractsDTO, getContractDTO, updateContractDTO } from '../dtos/contract.dto';



// create contract
router.get('/', validateDTO(getContractDTO),contractController.getContract);


router.post('/',validateDTO(createContractDTO),contractController.createContract);

router.delete('/',validateDTO(deleteContractDTO),contractController.deleteContract);

router.patch('/',validateDTO(updateContractDTO),contractController.updateContract);

router.get('/all',validateDTO(getAllContractsDTO), contractController.getAllContracts);



export { router as contractRouter };
