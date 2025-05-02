import { Suspense } from 'react';
import ServiceManageClient from './ServiceManageClient';

export const dynamic = 'force-dynamic'; // needed for useSearchParams

export default function ServiceManagePage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ServiceManageClient />
    </Suspense>
  );
}
