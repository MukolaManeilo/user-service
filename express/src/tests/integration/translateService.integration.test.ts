import dotenv from 'dotenv';
import translate from '../../services/translateService';

dotenv.config();

describe('Integration tests for DeepL API', () => {
	it('should translate text to the target language successfully', async () => {
		const translatedText = await translate('Привіт, як справи?', 'en-US');
		expect(translatedText).toBe('Hi, how are you?');
	});
});
