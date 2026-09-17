'use client';

import React from 'react';
import AuthGuard from '@/components/auth/AuthGuard';

export default function OfficerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthGuard allowedRoles={['MOTA_OFFICER']}>
      {children}
    </AuthGuard>
  );
}
