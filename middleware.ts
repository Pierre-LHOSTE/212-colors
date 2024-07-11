import authConfig from "@/src/lib/auth.config";
import NextAuth from "next-auth";
import {
  API_AUTH_PREFIX,
  APP_ROUTES,
  AUTH_ROUTES,
  DEFAULT_LOGIN_REDIRECT,
  PUBLIC_ROUTES,
} from "./src/lib/routes";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;

  const isApiAuthRoute = nextUrl.pathname.startsWith(API_AUTH_PREFIX);
  const isAuthRoute = AUTH_ROUTES.includes(nextUrl.pathname);
  const isPublicRoute = PUBLIC_ROUTES.includes(nextUrl.pathname) || isAuthRoute;
  const isAppRoute = APP_ROUTES.some((route) =>
    nextUrl.pathname.startsWith(route),
  );

  let urlType = "UNKNOWN";
  if (isApiAuthRoute) {
    urlType = "API_AUTH_ROUTE";
  } else if (isPublicRoute) {
    urlType = "PUBLIC_ROUTE";
  } else if (isAppRoute) {
    urlType = "APP_ROUTE";
  } else if (isAuthRoute) {
    urlType = "AUTH_ROUTE";
  }

  console.log(
    ` > ${nextUrl.pathname}, ${urlType}, ${isLoggedIn ? "Logged ✓" : "Logged Out"}`,
  );

  // Si c'est l'API, on ne fait rien
  if (isApiAuthRoute) {
    return;
  }

  // Si c'est une route de connexion et que l'utilisateur est déjà connecté, on le redirige
  if (isAuthRoute && isLoggedIn) {
    return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
  }

  // Si ce n'est pas une route publique ou une route de l'application et que l'utilisateur n'est pas connecté, on le redirige
  if (!isLoggedIn && (!isPublicRoute || isAppRoute)) {
    return Response.redirect(new URL("/auth/login", nextUrl));
  }

  return;
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
