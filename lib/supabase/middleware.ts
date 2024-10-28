import { createServerClient } from "@supabase/ssr";
import { type NextRequest, NextResponse } from "next/server";
import { userSession } from "./user-session";

export const updateSession = async (request: NextRequest) => {
  const user = await userSession();

  try {
    let response = NextResponse.next({
      request: {
        headers: request.headers,
      },
    });

    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL as string,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string,
      {
        cookies: {
          getAll() {
            return request.cookies.getAll();
          },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value }) =>
              request.cookies.set(name, value)
            );
            response = NextResponse.next({
              request,
            });
            cookiesToSet.forEach(({ name, value, options }) =>
              response.cookies.set(name, value, options)
            );
          },
        },
      }
    );

    // protected routes
    if (request.nextUrl.pathname === "/") {
      return NextResponse.redirect(new URL("/home", request.url));
    }

    if (
      !user &&
      request.nextUrl.pathname !== "/sign-in" &&
      request.nextUrl.pathname !== "/sign-up"
    ) {
      return NextResponse.redirect(new URL("/sign-in", request.url));
    }

    return response;
  } catch (error) {
    console.error(error);

    return NextResponse.next({
      request: {
        headers: request.headers,
      },
    });
  }
};
