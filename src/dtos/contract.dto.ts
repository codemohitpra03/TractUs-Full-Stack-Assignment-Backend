import { z } from "zod";

const createContractDTO = z.object({
    body: z.object({
        client_name: z.string({ message: "Client Name is required" })
            .min(1, { message: "Client Name cannot be empty" }),
        contract_data: z.string({ message: "Contract Data is required" }),
        type: z.enum(['text', 'json']),
        

    }).strict()
});
const getContractDTO = z.object({
    query: z.object({
        contract_id: z.string({ message: "Contract Id is required" })
            .min(1, { message: "Contract Id cannot be empty" }),
        
    }).strict()
});
const deleteContractDTO = z.object({
    query: z.object({
        contract_id: z.string({ message: "Contract Id is required" })
            .min(1, { message: "Contract Id cannot be empty" }),
        
    }).strict()
});

const updateContractDTO = z.object({
    body: z.object({
      contract_id: z.string().uuid({ message: "Invalid contract ID format" }),
      contract_data: z.string().optional(),
      type: z.enum(["text", "json"]).optional(),
    })
    .refine(data => data.contract_data || data.type, {
      message: "Either contract_data or type must be provided",
      path: ["contract_data", "type"],
    }),
    query: z.object({}).optional(), 
    params: z.object({}).optional() 
}).strict();




const getAllContractsDTO = z.object({
  query: z.object({
    sortBy: z.enum(["created_at", "updated_at", "client_name"]).optional(),
    order: z.enum(["asc", "desc"]).optional(),
    page: z.string().regex(/^\d+$/, { message: "Page must be a number" }),
    limit: z.string().regex(/^\d+$/, { message: "Limit must be a number" }),
    status: z.enum(["draft", "finalized", "both"]).optional(),
    searchQuery: z.string().optional(),
  }).strict(),
});


export {createContractDTO, getContractDTO, deleteContractDTO, updateContractDTO, getAllContractsDTO};

type CreateContractBody = z.infer<typeof createContractDTO.shape.body>;
type GetContractQuery = z.infer<typeof getContractDTO.shape.query>;
type DeleteContractQuery = z.infer<typeof deleteContractDTO.shape.query>;
type UpdateContractBody = z.infer<typeof updateContractDTO.shape.body>;

type GetAllContractsQuery = z.infer<typeof getAllContractsDTO.shape.query>;

export type {CreateContractBody,GetContractQuery, DeleteContractQuery, UpdateContractBody, GetAllContractsQuery}