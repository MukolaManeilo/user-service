
export interface ICustomError extends Error {
	statusCode?: number;
}

export class ValidationError extends Error {
	readonly statusCode = 400;

	constructor(message: string) {
		super(message);
		this.name = "ValidationError";
	}
}

export class UnauthorizedError extends Error {
	readonly statusCode = 401;

	constructor(message: string) {
		super(message);
		this.name = "UnauthorizedError";
	}
}

export class NotFoundError extends Error {
	readonly statusCode = 404;

	constructor(message: string) {
		super(message);
		this.name = "NotFoundError";
	}
}

export class InternalServerError extends Error {
	readonly statusCode = 500;

	constructor(message: string) {
		super(message);
		this.name = "InternalServerError";
	}
}

export class StartUpError extends Error {
	constructor(message: string) {
		super(message);
		this.name = "StartUpError";
	}
}

//For testing during development
export class TestingError extends Error {
	constructor(message: string) {
		super(message);
	}
}