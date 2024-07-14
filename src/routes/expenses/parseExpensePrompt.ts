import parseSelectProperty from '../../helpers/parseSelectProperty';
import { PageProperties } from '../../helpers/addPageToDatabase';
export default function parseExpensePrompt(prompt: string): PageProperties {
    let currentPrompt = prompt.trim().toLowerCase();
    const properties: PageProperties = {};
    currentPrompt = parsePromptCost(currentPrompt, properties);
    currentPrompt = parseSelectProperty(currentPrompt, properties, payments, 'Payment', true, true);
    currentPrompt = parseSelectProperty(
        currentPrompt,
        properties,
        categories,
        'Category',
        false,
        false,
    );
    currentPrompt = capitalizeFirstLetter(currentPrompt);
    properties.Name = {
        title: [
            {
                text: {
                    content: currentPrompt,
                },
            },
        ],
    };
    properties['Travel status'] = {
        select: {
            name: 'Cbus',
        },
    };
    return properties;
}

function parsePromptCost(prompt: string, properties: PageProperties): string {
    const lastWord = getLastWord(prompt);
    const parseAttempt = parseFloat(lastWord);
    if (isNaN(parseAttempt)) {
        return prompt;
    }
    const newPrompt = prompt.replace(lastWord, '').trim();
    properties['Price'] = {
        number: parseAttempt,
    };
    return newPrompt;
}

function capitalizeFirstLetter(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function getLastWord(str: string): string {
    const trimmed = str.trim();
    if (trimmed.length == 0) {
        return '';
    }
    return str.split(' ').pop();
}

const payments = ['C6', 'Chase', 'Santander', 'Cash', 'Dining Dollars', 'Perdiem'];
const categories = [
    'Food',
    'Transportation',
    'Entertainment Events',
    'Other',
    'Supplies',
    'Decoration',
    'Fencing',
    'Clothes',
    'Courseword',
    'Groceries',
    'Coffee',
];
