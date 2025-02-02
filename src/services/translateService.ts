import * as deepl from 'deepl-node';
import dotenv from 'dotenv';
import { APIError, EnvironmentVariableError } from '../types/errorTypes';
import { errorValidator } from '../utils/errorHandler';

dotenv.config();

const authKey = process.env.DEEPL_API_KEY;

if (!authKey) {
	throw new EnvironmentVariableError('DEEPL_API_KEY is missing');
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
	} catch (err) {
		throw errorValidator(err, new APIError('Translation failed'));
	}
};

export default translate;
