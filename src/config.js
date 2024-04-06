import { config } from "dotenv";
config();

console.log(process.env.PORT);
console.log(process.env.DB_USER);
console.log(process.env.DB_PASSWORD);	
console.log(process.env.DB_HOST);
console.log(process.env.DB_NAME);
console.log(process.env.DB_PORT);


export const PORT = process.env.PORT || 5000;
export const DB_USER = process.env.DB_USER || "root";
export const DB_PASSWORD = process.env.DB_PASSWORD || "password";
export const DB_HOST = process.env.DB_HOST || "localhost";
export const DB_NAME = process.env.DB_NAME || "database";
export const DB_PORT = process.env.DB_PORT || 3306; 
