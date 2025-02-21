/**
 * An array of routes that are public and do not require authentication
 * @type {string[]}
 **/

export const publicRoutes = ["/", "/blog"];

/**
 * Routes that start with /api/auth is used for authentication purposes,
 * it does not need to be authenticated
 * @type {string}
 **/

export const apiAuthRoutePrefix = "/api/auth";

/**
 * this routes is for client side login screen,
 * it does not need to be authenticated
 * @type {string[]}
 **/

export const authRoutes = ["/login", "/register", "/verify"];

/**
 * this is the default redirect route after login
 * @type {string}
 **/
export const DEFAULT_REDIRECT = "/dashboard";
