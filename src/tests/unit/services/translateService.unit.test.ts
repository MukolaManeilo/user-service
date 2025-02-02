import translate from '../../../services/translateService';
import * as deepl from 'deepl-node';
import { TestingError } from '../../../types/errorTypes';

jest.mock('deepl-node');

describe('Unit tests for translateService', () => {
	const mockTranslator = {
		translateText: jest.fn(),
	};

	beforeAll(() => {
		(deepl.Translator as jest.Mock).mockImplementation(() => mockTranslator);
	});

	it('should return the translated text when successful', async () => {
		mockTranslator.translateText.mockResolvedValueOnce({ text: 'Привіт' });

		const result = await translate('Hello', 'uk');

		expect(result).toBe('Привіт');
		expect(mockTranslator.translateText).toHaveBeenCalledWith('Hello', null, 'uk');
	});

	it('should throw an error if translation fails', async () => {
		mockTranslator.translateText.mockRejectedValueOnce(new TestingError('API error'));
		await expect(translate('Hello', 'uk')).rejects.toThrow('Translation failed: API error');
	});

	it('should default to "en-US" if no target language is provided', async () => {
		mockTranslator.translateText.mockResolvedValueOnce({ text: 'Hello' });

		const result = await translate('Привіт');

		expect(result).toBe('Hello');
		expect(mockTranslator.translateText).toHaveBeenCalledWith('Привіт', null, 'en-US');
	});
});
