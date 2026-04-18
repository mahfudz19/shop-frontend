import {defineRouting} from 'next-intl/routing';
import {createNavigation} from 'next-intl/navigation';

export const routing = defineRouting({
  // Daftar bahasa yang disupport
  locales: ['en', 'id'],
  
  // Default bahasa
  defaultLocale: 'en',
  
  // KUNCI UTAMA: 'as-needed' membuat defaultLocale (en) tidak perlu prefix di URL.
  // /search -> Inggris
  // /id/search -> Indonesia
  localePrefix: 'as-needed' 
});

// Gunakan custom Link dan useRouter dari sini agar otomatis membawa prefix bahasa
export const {Link, redirect, usePathname, useRouter, getPathname} = createNavigation(routing);