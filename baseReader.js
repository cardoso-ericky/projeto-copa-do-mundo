import fs from 'node:fs/promises';
import path from 'node:path';

const dirname = import.meta.dirname;

export default async function readTeams(fileName){
    try {
        const filePath = path.join(dirname, 'bancoDados', fileName);
        const rawData = await fs.readFile(filePath, "utf-8");
        const dados = JSON.parse(rawData);
        return dados;
    } catch (erro) {
        console.error(`Não foi possível ler os dados dos arquivos: Erro ${erro}`);
        return [];
    }
}