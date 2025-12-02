import zlib from "node:zlib";
import { headers } from "next/headers";
import { type NextRequest, NextResponse, userAgent } from "next/server";
import { handleApiError } from "./api-error-handler";
import logger from "./logger";

type Handler = (request: NextRequest, context?: unknown) => Promise<Response>;

export const _400 = (error: string = "Invalid parameters") =>
	NextResponse.json({ error }, { status: 400 });
export const _401 = (error: string = "Unauthorized") =>
	NextResponse.json({ error }, { status: 401 });
export const _201 = (data: object, message: string = "Created successfully") =>
	NextResponse.json(
		{
			status_code: 201,
			success: true,
			message,
			data,
		},
		{ status: 201 },
	);

export const _200 = (data: object) => {
	const json = JSON.stringify(data);
	const jsonBuffer = Buffer.from(json, "utf-8");
	const compressed = zlib.gzipSync(new Uint8Array(jsonBuffer));

	return new NextResponse(new Uint8Array(compressed), {
		status: 200,
		headers: {
			"Content-Encoding": "gzip",
			"Content-Type": "application/json",
			"Content-Length": compressed.length.toString(),
		},
	});
};

export function createApiRoute(handler: Handler): Handler {
	return async (request, context) => {
		try {
			// return await so that we can catch any exceptions thrown
			return await handler(request, context);
		} catch (error) {
			const { buildId, href, origin, pathname, searchParams } = request.nextUrl;
			const headersList = await headers();

			const errorTraceId: string = crypto.randomUUID();

			logger.error({
				tag: "ERROR",
				middleware: "apiErrors",
				errorTraceId,
				error,
				context,
				userAgent: userAgent(request),
				request: {
					buildId,
					href,
					origin,
					pathname,
					searchParams: Object.fromEntries(searchParams),
				},
				headers: Object.fromEntries(headersList.entries()),
			});

			// Use handleApiError for consistent error handling
			return handleApiError(error, true);
		}
	};
}
