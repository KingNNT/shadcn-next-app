/**
 * Authentication service
 * Handles authentication business logic
 * Throws exceptions on errors - API layer handles exception to response conversion
 */

import {
	EmailExistsException,
	InvalidCredentialsException,
	InvalidEmailException,
	InvalidNameException,
	InvalidPasswordException,
	MissingCredentialsException,
} from "@/exceptions";
import type { IUser } from "@/types/user";

/**
 * AuthService class
 * Provides authentication-related operations
 */
export class AuthService {
	// In-memory user storage for demo purposes
	// TODO: Replace with actual database
	private users: Map<string, IUser & { password: string }> = new Map([
		[
			"demo@example.com",
			{
				id: "1",
				name: "Demo User",
				email: "demo@example.com",
				password: "demo123",
			},
		],
	]);

	/**
	 * Validates user credentials and returns user data if valid
	 *
	 * @param email - User's email address
	 * @param password - User's password
	 * @returns User data if credentials are valid, null otherwise
	 */
	async validateCredentials(email: string, password: string): Promise<IUser | null> {
		// TODO: Replace this with your actual database authentication logic

		// This is a simple example - you should validate against your database
		// Example implementation might include:
		// 1. Query user from database by email
		// 2. Compare hashed password using bcrypt
		// 3. Return user data if credentials match

		const user = this.users.get(email);
		if (user && user.password === password) {
			const { password: _, ...userWithoutPassword } = user;
			return userWithoutPassword;
		}

		// Return null if credentials are invalid
		return null;
	}

	/**
	 * Checks if an email is already registered
	 *
	 * @param email - Email address to check
	 * @returns True if email exists, false otherwise
	 */
	async emailExists(email: string): Promise<boolean> {
		// TODO: Replace with actual database query
		return this.users.has(email);
	}

	/**
	 * Creates a new user account
	 *
	 * @param name - User's full name
	 * @param email - User's email address
	 * @param password - User's password
	 * @returns User data if creation successful, null otherwise
	 */
	async createUser(name: string, email: string, password: string): Promise<IUser | null> {
		// TODO: Replace with actual database insertion and password hashing

		// Generate a new user ID
		const id = crypto.randomUUID();

		// Create user object
		const user: IUser & { password: string } = {
			id,
			name,
			email,
			password, // In production, this should be hashed using bcrypt
		};

		// Store user in memory
		this.users.set(email, user);

		// Return user without password
		const { password: _, ...userWithoutPassword } = user;
		return userWithoutPassword;
	}

	/**
	 * Validates email format
	 *
	 * @param email - Email address to validate
	 * @returns True if email is valid, false otherwise
	 */
	validateEmailFormat(email: string): boolean {
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return emailRegex.test(email);
	}

	/**
	 * Validates password requirements
	 *
	 * @param password - Password to validate
	 * @returns True if password is valid, false otherwise
	 */
	validatePasswordFormat(password: string): boolean {
		return password.length >= 6;
	}

	/**
	 * Authenticates a user with email and password
	 *
	 * @param email - User's email address
	 * @param password - User's password
	 * @returns User data if credentials are valid
	 * @throws {MissingCredentialsException} If email or password is missing
	 * @throws {InvalidEmailException} If email format is invalid
	 * @throws {InvalidPasswordException} If password format is invalid
	 * @throws {InvalidCredentialsException} If credentials don't match
	 */
	async login(email: string, password: string): Promise<IUser> {
		// Validate input
		if (!email || !password) {
			throw new MissingCredentialsException("Email and password are required");
		}

		// Validate email format
		if (!this.validateEmailFormat(email)) {
			throw new InvalidEmailException("Invalid email format");
		}

		// Validate password format
		if (!this.validatePasswordFormat(password)) {
			throw new InvalidPasswordException("Password must be at least 6 characters");
		}

		// Validate credentials
		const user = await this.validateCredentials(email, password);

		if (!user) {
			throw new InvalidCredentialsException("Invalid email or password");
		}

		return user;
	}

	/**
	 * Registers a new user account
	 *
	 * @param name - User's full name
	 * @param email - User's email address
	 * @param password - User's password
	 * @returns Created user data
	 * @throws {MissingCredentialsException} If any required field is missing
	 * @throws {InvalidNameException} If name is too short
	 * @throws {InvalidEmailException} If email format is invalid
	 * @throws {InvalidPasswordException} If password format is invalid
	 * @throws {EmailExistsException} If email is already registered
	 */
	async register(name: string, email: string, password: string): Promise<IUser> {
		// Validate input
		if (!name || !email || !password) {
			throw new MissingCredentialsException("Name, email and password are required");
		}

		// Validate name
		if (name.trim().length < 2) {
			throw new InvalidNameException("Name must be at least 2 characters");
		}

		// Validate email format
		if (!this.validateEmailFormat(email)) {
			throw new InvalidEmailException("Invalid email format");
		}

		// Validate password format
		if (!this.validatePasswordFormat(password)) {
			throw new InvalidPasswordException("Password must be at least 6 characters");
		}

		// Check if email already exists
		const exists = await this.emailExists(email);
		if (exists) {
			throw new EmailExistsException("An account with this email already exists");
		}

		// Create new user
		const user = await this.createUser(name, email, password);

		if (!user) {
			throw new Error("Failed to create user account");
		}

		return user;
	}
}

// Export singleton instance
export const authService = new AuthService();
