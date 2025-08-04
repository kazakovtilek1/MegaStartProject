import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const cookie = request.headers.get("cookie") || "";
  const accessToken = cookie
    .split("; ")
    .find((c) => c.startsWith("accessToken="))
    ?.split("=")[1];

  const loginUrl = new URL("/", request.url);
  const pathname = request.nextUrl.pathname;

  // Пути, которые требуют авторизации
  const protectedPaths = ["/user/favorites", "/user/profile"];

  // Проверяем, защищён ли текущий путь
  const isProtectedUserPath = protectedPaths.some((path) =>
    pathname.startsWith(path),
  );

  // Проверка, является ли путь маршрутом бронирования тура и его вложенных страниц
  const isBookingPath = /^\/tours\/[^/]+\/booking(\/.*)?$/.test(pathname);

  // Если путь защищён и нет токена — редирект на главную
  if ((isProtectedUserPath || isBookingPath) && !accessToken) {
    return NextResponse.redirect(loginUrl);
  }

  // Всё ок — пропускаем запрос дальше
  return NextResponse.next();
}

export const config = {
  matcher: ["/user/:path*", "/tours/:id/booking/:path*"],
};
