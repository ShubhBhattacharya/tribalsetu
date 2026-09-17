'use client';

import React from 'react';
import AuthGuard from '@/components/auth/AuthGuard';

export default function StudentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthGuard allowedRoles={['STUDENT']}>
      {children}
    </AuthGuard>
  );
}
