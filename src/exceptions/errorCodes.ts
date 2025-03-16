export enum ErrorEnum {
  /*CONTRACT*/
  _ERR_CONTRACT_0, // get contract failed
  _ERR_CONTRACT_ALL_0, // get contract failed
  _ERR_CONTRACT_1, // create contract failed
  _ERR_CONTRACT_2, // update contract failed
  _ERR_CONTRACT_3, // delete contract failed


  _CONTRACT_NOT_FOUND


  
  

}

interface ErrorCode {
  status: number;
  message: string;
}

export const ErrorCodes: Record<ErrorEnum, ErrorCode> = {
  [ErrorEnum._ERR_CONTRACT_0]: {
    message: 'Error fetching contract',
    status: 500,
  },
  [ErrorEnum._ERR_CONTRACT_1]: {
    message: 'Error creating contract',
    status: 500,
  },
  [ErrorEnum._ERR_CONTRACT_2]: {
    message: 'Error updating contract',
    status: 500,
  },
  [ErrorEnum._ERR_CONTRACT_3]: {
    message: 'Error delete contract',
    status: 500,
  },
  [ErrorEnum._ERR_CONTRACT_ALL_0]: {
    message: 'Error fetching all contract',
    status: 500,
  },


  [ErrorEnum._CONTRACT_NOT_FOUND]: {
    message: 'Contract Not found',
    status: 404,
  },


  






};

// for personal reference
export const ErrorMessagesCodes = {
	
};
