'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function CreatePropertyRedirect() {
  const router = useRouter();
  useEffect(() => {
    router.replace('/post-property');
  }, [router]);

  return null;
}
