import { PageProperties } from './addPageToDatabase';

export default function parseSelectProperty(
    prompt: string,
    properties: PageProperties,
    values: string[],
    propertyName: string,
    removeSelect: boolean,
    useDefault: boolean,
): string {
    let option: string | undefined = values.find((value) => prompt.includes(value.toLowerCase()));
    let newPrompt = prompt;
    if (option && removeSelect) {
        newPrompt = prompt.replace(option.toLowerCase(), '').trim();
    } else if (useDefault) {
        option = values[0];
    }
    if (option) {
        properties[propertyName] = {
            select: {
                name: option,
            },
        };
    }
    return newPrompt;
}
