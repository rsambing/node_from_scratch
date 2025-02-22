import { sql } from './db.js';

await sql `drop table if exists videos`.then(() => {
    console.log('deletado com sucesso');
})

await sql`
CREATE TABLE videos (
    id TEXT PRIMARY KEY,
    title TEXT,
    description TEXT,
    duration INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);`.then(() => {
    console.log('Tabela criada com sucesso!');
}).catch((err) => {
    console.error('Erro ao criar tabela:', err);
});
