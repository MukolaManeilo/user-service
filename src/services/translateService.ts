import * as deepl from 'deepl-node';
import dotenv from 'dotenv';

dotenv.config();

const authKey = process.env.DEEPL_API_KEY;

if (!authKey) {
	throw new Error('DEEPL_API_KEY is missing');
}

/**
 * Function to translate text using DeepL API.
 *
 * @param text - The text to be translated.
 * @param targetLanguage - The language to translate the text into. Defaults to English  ('en-US').
 * @returns Translated text.
 */

const translate = async (text: string, targetLanguage: deepl.TargetLanguageCode = 'en-US'): Promise<string> => {
	try {
		const translator = new deepl.Translator(authKey);
		const result = await translator.translateText(text, null, targetLanguage);
		return result.text;
	}catch(err) {
		if (err instanceof Error) {
			throw new Error(`Translation failed: ${err.message}`);
		}
		throw new Error('Translation failed for an unknown reason');
	}
}

export default translate;