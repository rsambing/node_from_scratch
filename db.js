import 'dotenv/config';
import postgres from "postgres";

// Pegando credenciais do .env
const { PGHOST, PGDATABASE, PGUSER, PGPASSWORD } = process.env;

// Criando a URL de conexão corretamente
const DATABASE_URL = `postgresql://${PGUSER}:${PGPASSWORD}@${PGHOST}/${PGDATABASE}?sslmode=require`;

// Criando conexão com Postgres
const sql = postgres(DATABASE_URL, { 
    // ssl: { rejectUnauthorized: false }, 
    ssl: 'require', // Para compatibilidade com o NeonDB
    prepare: false, // Evita erros de "cached plan must not change result type"
});

export { sql };
