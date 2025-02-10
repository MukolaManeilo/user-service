import { Request, Response } from 'express';
import { defaultErrorMessage, ICustomError, UnknownError } from '../types/errorTypes';

const messageCreator = (childError?: ICustomError, wrapperError?: ICustomError): string => {
	let childMessage: string | undefined = childError?.message?.trim();
	let wrapperMessage: string | undefined = wrapperError?.message?.trim();

	if ((!childMessage || childMessage.trim() === '') && childError) {
		const childErrorName = childError?.name as keyof typeof defaultErrorMessage;
		childMessage = defaultErrorMessage[childErrorName];
	}

	if (childMessage && wrapperMessage) return `${wrapperMessage}: ${childMessage}`;

	return childMessage || wrapperMessage || 'Error message not found';
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const errorValidator = (unknownValidError: any, alterValue?: ICustomError | string): ICustomError => {
	let validatedError: ICustomError = new UnknownError();

	if (unknownValidError instanceof Error) {
		validatedError =
			unknownValidError.name !== 'Error' ? unknownValidError : new UnknownError(unknownValidError.message);
	} else if (typeof unknownValidError === 'string') {
		validatedError = new UnknownError(unknownValidError);
	} else if (typeof unknownValidError === 'object' && (unknownValidError?.message || unknownValidError?.error)) {
		validatedError = new UnknownError(unknownValidError.message || unknownValidError.error);
	}

	if (!alterValue) {
		validatedError.message = messageCreator(validatedError);
		return validatedError;
	}

	if (typeof alterValue === 'string') {
		validatedError.message = messageCreator(validatedError, new UnknownError(alterValue));
		return validatedError;
	} else if (alterValue instanceof Error) {
		if (alterValue.name !== 'Error') {
			alterValue.message = messageCreator(validatedError, alterValue);
			return alterValue;
		} else {
			return new UnknownError(messageCreator(validatedError, new UnknownError(alterValue.message)));
		}
	} else {
		return validatedError;
	}
};

const errorLogger = (err: ICustomError) => {
	console.log(`${err.name} : ${err.statusCode || 500} : ${err.message}`);
};

const errorHandler = (err: ICustomError, req?: Request, res?: Response) => {
	errorLogger(err);

	if (req && res) {
		return res.status(err.statusCode || 500).json({ message: err.message });
	} else if (err.name === 'StartUpError' || err.name === 'EnvironmentVariableError') {
		//process.exit(1);
	} else if (err.name === 'TestingError') {
		console.log('Testing Error Handling');
	}
};

export { errorValidator, errorHandler };
