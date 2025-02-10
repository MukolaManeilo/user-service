import bcrypt from 'bcrypt';

/**
 * Password hashing
 * @param password - The password to hash
 * @returns A promise containing the hashed password
 */
export const hashPassword = async (password: string): Promise<string> => {
	return await bcrypt.hash(password, 10);
};

/**
 * Password verification
 * @param password - The password entered by the user
 * @param hashedPassword - The stored hashed password
 * @returns A promise containing the verification result
 */
export const comparePassword = async (password: string, hashedPassword: string): Promise<boolean> => {
	return await bcrypt.compare(password, hashedPassword);
};
