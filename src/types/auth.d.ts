/**
 * Authentication-related types
 */

import type { AuthServiceErrorCode } from "@/constants/error-codes";
import type { IErrorResponse, ISuccessResponse } from "@/types/api";
import type { IUser } from "@/types/user";

export interface ILoginRequest {
	email: string;
	password: string;
}

export interface ILoginData {
	readonly access_token: string;
	readonly refresh_token: string;
	readonly user: IUser;
}

export interface ILoginSuccessResponse extends ISuccessResponse<ILoginData> {}

export interface ILoginErrorResponse extends IErrorResponse<AuthServiceErrorCode> {}

export type TLoginResult = ILoginSuccessResponse | ILoginErrorResponse;

export interface IRegisterRequest {
	name: string;
	email: string;
	password: string;
}

export interface IRegisterData {
	readonly user: IUser;
}

export interface IRegisterSuccessResponse extends ISuccessResponse<IRegisterData> {}

export interface IRegisterErrorResponse extends IErrorResponse<AuthServiceErrorCode> {}

export type TRegisterResult = IRegisterSuccessResponse | IRegisterErrorResponse;
