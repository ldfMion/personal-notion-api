import { PageProperties } from "../../../helpers/addPageToDatabase";

export default function parseTaskPrompt(prompt: string): PageProperties {
	let currentPrompt = prompt.trim().toLowerCase();
	const properties: PageProperties = {
		Scope: {
			select: {
				name: "Task",
			},
		},
	};
	currentPrompt = parsePromptDates(currentPrompt, properties);
	currentPrompt = parsePromptTags(currentPrompt, properties);
	currentPrompt = parsePromptPriority(currentPrompt, properties);
	properties.Name = {
		title: [
			{
				text: {
					content: currentPrompt,
				},
			},
		],
	};
	currentPrompt = capitalizeFirstLetter(currentPrompt);
	return properties;
}

const dateMapping: Record<string, Date> = {
	today: new Date(),
	tomorrow: (() => {
		const date = new Date();
		date.setDate(new Date().getDate() + 1);
		return date;
	})(),
};

function parsePromptDates(prompt: string, properties: PageProperties): string {
	let newPrompt = prompt;
	for (const [key, value] of Object.entries(dateMapping)) {
		if (newPrompt.toLowerCase().includes(key)) {
			properties["Do date"] = {
				date: {
					start: value.toISOString().slice(0, 10),
				},
			};
			newPrompt = newPrompt.replace(key, "").trim();
			return newPrompt;
		}
	}
	return newPrompt;
}
const tags = ["Highlight", "Must do", "Shopping", "Note"];

function parsePromptTags(prompt: string, properties: PageProperties): string {
	let newPrompt = prompt;
	const tagsFound: string[] = [];
	tags.forEach(tag => {
		if (newPrompt.toLowerCase().includes(tag.toLowerCase())) {
			tagsFound.push(tag);
		}
	});
	if (tagsFound.length > 0) {
		properties["Tags"] = {
			multi_select: tagsFound.map(tag => {
				newPrompt = newPrompt.replace(tag.toLowerCase(), "").trim();
				return { name: tag };
			}),
		};
		return newPrompt;
	}
	return newPrompt;
}

function capitalizeFirstLetter(string: string) {
	return string.charAt(0).toUpperCase() + string.slice(1);
}

const prirityMapping: Record<string, number> = {
	p4: 4,
	p3: 3,
	p2: 2,
	pq: 1,
};

function parsePromptPriority(
	prompt: string,
	properties: PageProperties
): string {
	let newPrompt = prompt;
	for (const [key, value] of Object.entries(prirityMapping)) {
		if (newPrompt.toLowerCase().includes(key)) {
			properties["Priority"] = {
				select: {
					name: value.toString(),
				},
			};
			newPrompt = newPrompt.replace(key, "").trim();
			return newPrompt;
		}
	}
	return newPrompt;
}
