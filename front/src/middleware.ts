import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Middleware pour gérer l'accès aux pages en fonction des routes
export function middleware(request: NextRequest) {
const token = request.cookies.get('token');
const url = request.nextUrl;
const vehicleId = url.searchParams.get('vehicleId'); // Get the vehicleId from query params

if(!token) {
  return NextResponse.redirect(new URL('/login', request.url));
}
  // Check if the route is /add-intervention and if vehicleId is missing
if (url.pathname.startsWith('/services') && !vehicleId) {
// Redirect to dashboard or an error page if vehicleId is missing
 return NextResponse.redirect(new URL('/dashboard', request.url));
}

return NextResponse.next();
}


// Configurer le matcher pour définir les routes sensibles à protéger
export const config = {
  matcher: [
    '/dashboard',
    '/services/:path*',
    '/admin'
    // '/profile',
    // '/settings',
    // '/my-cars',
    // '/dashboard/:path*',
  ],
};
