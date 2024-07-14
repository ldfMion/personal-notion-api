import dotenv from 'dotenv';
import { Router, Request, Response } from 'express';
import assert from 'assert';
import getPrompt from '../../helpers/getPrompt';
import parseExpensePrompt from './parseExpensePrompt';
import addPageToDatabase from '../../helpers/addPageToDatabase';

dotenv.config();

const router = Router();
const dbId = process.env.EXPENSES_DATABASE_ID;

router.post('/', async (req: Request, res: Response) => {
    const prompt = getPrompt(req);
    if (prompt == undefined) {
        return res.status(400).send('No prompt provided');
    }
    try {
        const { name, url } = await addExpensesToNotion(prompt);
        res.send(url);
    } catch (error) {
        res.status(400).send((error as Error).toString());
        return;
    }
});

async function addExpensesToNotion(prompt: string): Promise<{ name: string; url: string }> {
    const properties = parseExpensePrompt(prompt);
    assert(dbId != undefined);
    const url = await addPageToDatabase(dbId, properties);
    return {
        url: url,
        name: 'Not implemented yet',
    };
}

export default router;
