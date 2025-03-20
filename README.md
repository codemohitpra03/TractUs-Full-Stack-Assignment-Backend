
# Contract Management System

This is the backend repository code of the Contract Management System

Frontend repository - [TractUs-Full-Stack-Assignment-Frontend](https://github.com/codemohitpra03/TractUs-Full-Stack-Assignment-Frontend)



## Features

- Pagination of contracts data
- Realtime updated of status over websockets
- Filters By Sorting and category criteria of Draft and Finalized
- Structured Data in Realtional Database


## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`PORT` - Port of the app on which it listens

`API_KEY` - API KEY for request validation

`PG_USER` - Postgres user

`PG_HOST` - Postgres host

`PG_DATABASE` - Postgres database

`PG_PASSWORD` - Postgres password

`PG_PORT` - Postgres port

`PG_CERTIFICATE` - Postgres certificate










## API Reference

#### Get Contract Data

```http
  GET /api/v1/contract
```
Query Params
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `contract_id` | `string` | **Required**. Id of the contract to be fetched |

#### Get All Contracts

```http
  GET /api/v1/contract/all
```
Query Params
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `sortBy`      | `enum` | Sorting field - `["created_at", "updated_at", "client_name"]`  |
| `order`      | `enum` | Sort Order- `["asc", "desc"]`  |
| `page`      | `number` | **Required**. Page Number  |
| `limit`      | `number` | **Required**. Contracts per page to request  |
| `status`      | `enum` | Status of contracts to be fetched - `["draft", "finalized", "both"]`  |
| `searchQuery`      | `string` | **Required**.Search string, matching client name or contract id  |

#### Create Contract

```http
  POST /api/v1/contract
```
Body
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `client_name`      | `string` |  **Required**. Client Name  |
| `contract_data`      | `string` |  **Required**. Contract data  |
| `type`      | `enum` |  **Required**. Contract type - `['text', 'json']`  |

#### Delete Contract

```http
  DELETE /api/v1/contract
```
Query Params
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `contract_id` | `string` | **Required**. Id of the contract to be fetched |

#### Update Contract

```http
  PATCH /api/v1/contract
```
Body
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `contract_id` | `string` | **Required**. Id of the contract to be fetched |
| `contract_data`      | `string` |   Contract data  |
| `type`      | `enum` |   Contract type - `['text', 'json']`  |

Note - for update, any one of the fields or both needs to be there in body



## Installation

Install my-project with npm


Clone the repository
```bash
  https://github.com/codemohitpra03/TractUs-Full-Stack-Assignment-Backend.git
```

Install dependencies
```bash
cd TractUs-Full-Stack-Assignment-Backend
npm install
```

Start the development Server
```bash
npm run dev
```
## Tech Stack

- Typescript
- Node.JS 
- Express
- socket.io 
- zod



## Database

- PostgreSQL


