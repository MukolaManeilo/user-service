export interface ICustomError extends Error {
	statusCode?: number;
}

export const defaultErrorMessage = {
	InputValidationError: "Invalid input data provided",
	SchemaValidationError: "Schema validation failed",
	BadDataError: "Invalid or malformed data",
	LoggingUserError: "Error occurred while logging user",
	LogoutUserError: "Error occurred while logging out user",
	LoggedUserError: "User is already logged in",
	UnauthorizedError: "Unauthorized access",
	NotFoundError: "The requested resource was not found",
	InternalServerError: "An internal server error occurred",
	DatabaseConnectionError: "Failed to connect to the database",
	DatabaseUpdatingError: "Failed to update the database",
	SessionError: "Session-related error occurred",
	CacheError: "Cache processing error",
	UnknownError: "An unknown error occurred",
	APIError: "API communication error",
	NetworkError: "Network error occurred",
	TimeoutError: "The request timed out",
	EnvironmentVariableError: "Environment variable is missing or invalid",
	StartUpError: "Error occurred during application startup",
	TestingError: "Error occurred during testing",
};


export class InputValidationError extends Error {
	readonly statusCode = 422;

	constructor(message?: string) {
		super(message);
		this.name = "InputValidationError";
	}
}

export class SchemaValidationError extends Error {
	readonly statusCode = 400;

	constructor(message?: string) {
		super(message);
		this.name = "SchemaValidationError";
	}
}

export class BadDataError extends Error {
	readonly statusCode = 400;

	constructor(message?: string) {
		super(message);
		this.name = "ValidationError";
	}
}

export class LogoutUserError extends Error {
	readonly statusCode = 401;

	constructor(message?: string) {
		super(message);
		this.name = "LogoutUserError";
	}
}

export class LoggingUserError extends Error {
	readonly statusCode = 401;

	constructor(message?: string) {
		super(message);
		this.name = "LoggingUserError";
	}
}

export class LoggedUserError extends Error {
	readonly statusCode = 401;

	constructor(message?: string) {
		super(message);
		this.name = "LoggedUserError";
	}
}

export class UnauthorizedError extends Error {
	readonly statusCode = 401;

	constructor(message?: string) {
		super(message);
		this.name = "UnauthorizedError";
	}
}

export class NotFoundError extends Error {
	readonly statusCode = 404;

	constructor(message?: string) {
		super(message);
		this.name = "NotFoundError";
	}
}

export class InternalServerError extends Error {
	readonly statusCode = 500;

	constructor(message?: string) {
		super(message);
		this.name = "InternalServerError";
	}
}

export class DatabaseConnectionError extends Error {
	readonly statusCode = 500;

	constructor(message?: string) {
		super(message);
		this.name = "DatabaseConnectionError";
	}
}

export class DatabaseUpdatingError extends Error {
	readonly statusCode = 500;

	constructor(message?: string) {
		super(message);
		this.name = "DatabaseUpdatingError";
	}
}

export class SessionError extends Error {
	readonly statusCode = 403;

	constructor(message?: string) {
		super(message);
		this.name = "SessionError";
	}
}

export class CacheError extends Error {
	readonly statusCode = 500;

	constructor(message?: string) {
		super(message);
		this.name = "CacheError";
	}
}

export class UnknownError extends Error {
	readonly statusCode = 500;

	constructor(message?: string) {
		super(message);
		this.name = "UnknownError";
	}
}

export class APIError extends Error {
	readonly statusCode = 502;

	constructor(message?: string) {
		super(message);
		this.name = "APIError";
	}
}

export class NetworkError extends Error {
	readonly statusCode = 503;

	constructor(message?: string) {
		super(message);
		this.name = "NetworkError";
	}
}

export class TimeoutError extends Error {
	readonly statusCode = 504;

	constructor(message?: string) {
		super(message);
		this.name = "TimeoutError";
	}
}

export class EnvironmentVariableError extends Error {
	readonly statusCode = 500;

	constructor(message?: string) {
		super(message);
		this.name = "EnvironmentVariableError";
	}
}

export class StartUpError extends Error {
	constructor(message?: string) {
		super(message);
		this.name = "StartUpError";
	}
}

//For testing during development
export class TestingError extends Error {
	constructor(message?: string) {
		super(message);
		this.name = "TestingError";
	}
}