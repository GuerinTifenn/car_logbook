import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Middleware pour gérer l'accès aux pages en fonction des routes
export function middleware(request: NextRequest) {
const token = request.cookies.get('authToken');
console.log(token)
if(!token) {
  return NextResponse.redirect(new URL('/login', request.url));
}
return NextResponse.next();
}
// Configurer le matcher pour définir les routes sensibles à protéger
export const config = {
  matcher: [
    '/dashboard',
    // '/profile',
    // '/settings',
    // '/my-cars',
    // '/dashboard/:path*',
  ],
};

