import path from 'node:path';
import express from 'express';
import baseReader from './baseReader.js';

const dirname = import.meta.dirname;
const PORTA = 3019;
const app = express();

const gruposFile = 'grupos.json';
const selecoesFile = 'selecoes.json';

app.use(express.static(path.join(dirname, 'public')));
app.use(express.json());

app.get('/api/copa', async (req, res) => {
    try{
        const selecoes = await baseReader(selecoesFile);
        res.json(selecoes);
    } catch(erro){
        console.error(`Não deu bom: ${erro}`);
        res.status(500).send('Não foi possível obter os dados');
    }
});

app.get('/api/grupos', async (req, res) => {
    try{
        const grupo = await baseReader(gruposFile);
        res.json(grupo);
    } catch(erro){
        console.error(`Não deu bom: ${erro}`);
        res.status(500).send('Não foi possível obter os dados');
    }
});


app.listen(PORTA, () => {
    console.log(`Servidor rodando em http://localhost:${PORTA}`);
});






// https://api.fifa.com/api/v3/picture/flags-sq-1/BRA