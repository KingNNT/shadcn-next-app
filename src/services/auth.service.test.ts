// @vitest-environment node
import { beforeEach, describe, expect, it } from "vitest";
import { AuthService } from "@/services/auth.service";

/**
 * Helper to assert that a promise rejects with a specific exception name.
 * Uses error.name instead of instanceof because Object.setPrototypeOf
 * in the exception classes can cause instanceof to fail across environments.
 */
async function expectToThrow(promise: Promise<unknown>, expectedName: string) {
	try {
		await promise;
		expect.fail(`Expected ${expectedName} to be thrown`);
	} catch (error: any) {
		expect(error.name).toBe(expectedName);
	}
}

describe("AuthService", () => {
	let service: AuthService;

	beforeEach(() => {
		service = new AuthService();
	});

	describe("validateEmailFormat", () => {
		it("returns true for valid emails", () => {
			expect(service.validateEmailFormat("user@example.com")).toBe(true);
			expect(service.validateEmailFormat("user+tag@domain.co.uk")).toBe(true);
		});

		it("returns false for invalid emails", () => {
			expect(service.validateEmailFormat("not-an-email")).toBe(false);
			expect(service.validateEmailFormat("@nodomain")).toBe(false);
			expect(service.validateEmailFormat("noatsign.com")).toBe(false);
			expect(service.validateEmailFormat("")).toBe(false);
		});
	});

	describe("validatePasswordFormat", () => {
		it("returns true for passwords >= 6 characters", () => {
			expect(service.validatePasswordFormat("abcdef")).toBe(true);
			expect(service.validatePasswordFormat("a very long password")).toBe(true);
		});

		it("returns false for passwords < 6 characters", () => {
			expect(service.validatePasswordFormat("abc")).toBe(false);
			expect(service.validatePasswordFormat("")).toBe(false);
		});
	});

	describe("login", () => {
		it("returns user without password when credentials are valid", async () => {
			const user = await service.login("demo@example.com", "demo123");

			expect(user).toMatchObject({
				id: "1",
				name: "Demo User",
				email: "demo@example.com",
			});
			expect(user).not.toHaveProperty("password");
		});

		it("throws MissingCredentialsException when email is empty", async () => {
			await expectToThrow(service.login("", "demo123"), "MissingCredentialsException");
		});

		it("throws MissingCredentialsException when password is empty", async () => {
			await expectToThrow(service.login("demo@example.com", ""), "MissingCredentialsException");
		});

		it("throws InvalidEmailException for malformed email", async () => {
			await expectToThrow(service.login("not-an-email", "demo123"), "InvalidEmailException");
		});

		it("throws InvalidPasswordException for short password", async () => {
			await expectToThrow(service.login("demo@example.com", "abc"), "InvalidPasswordException");
		});

		it("throws InvalidCredentialsException for wrong password", async () => {
			await expectToThrow(
				service.login("demo@example.com", "wrongpassword"),
				"InvalidCredentialsException",
			);
		});

		it("throws InvalidCredentialsException for unknown email", async () => {
			await expectToThrow(
				service.login("unknown@example.com", "demo123"),
				"InvalidCredentialsException",
			);
		});
	});

	describe("register", () => {
		it("creates and returns a new user without password", async () => {
			const user = await service.register("New User", "new@example.com", "securepass");

			expect(user.name).toBe("New User");
			expect(user.email).toBe("new@example.com");
			expect(user.id).toBeDefined();
			expect(user).not.toHaveProperty("password");
		});

		it("throws MissingCredentialsException when any field is empty", async () => {
			await expectToThrow(
				service.register("", "a@b.com", "pass123"),
				"MissingCredentialsException",
			);
			await expectToThrow(service.register("Name", "", "pass123"), "MissingCredentialsException");
			await expectToThrow(service.register("Name", "a@b.com", ""), "MissingCredentialsException");
		});

		it("throws InvalidNameException for single-character name", async () => {
			await expectToThrow(service.register("A", "a@b.com", "pass123"), "InvalidNameException");
		});

		it("throws InvalidEmailException for malformed email", async () => {
			await expectToThrow(
				service.register("Valid Name", "not-an-email", "pass123"),
				"InvalidEmailException",
			);
		});

		it("throws InvalidPasswordException for short password", async () => {
			await expectToThrow(
				service.register("Valid Name", "a@b.com", "abc"),
				"InvalidPasswordException",
			);
		});

		it("throws EmailExistsException for duplicate email", async () => {
			await service.register("User One", "taken@example.com", "pass123");
			await expectToThrow(
				service.register("User Two", "taken@example.com", "pass456"),
				"EmailExistsException",
			);
		});

		it("allows multiple distinct users", async () => {
			const user1 = await service.register("Alice", "alice@test.com", "pass123");
			const user2 = await service.register("Bob", "bob@test.com", "pass456");

			expect(user1.id).not.toBe(user2.id);
			expect(user1.email).toBe("alice@test.com");
			expect(user2.email).toBe("bob@test.com");
		});
	});

	describe("emailExists", () => {
		it("returns true for existing demo user", async () => {
			expect(await service.emailExists("demo@example.com")).toBe(true);
		});

		it("returns false for unknown email", async () => {
			expect(await service.emailExists("nobody@nowhere.com")).toBe(false);
		});
	});
});
