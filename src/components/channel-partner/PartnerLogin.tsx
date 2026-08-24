// src/components/channel-partner/PartnerLogin.tsx
import React, { useState } from 'react';
import PartnerAuthPortal from './PartnerAuthPortal';

export default function PartnerLogin() {
  return <PartnerAuthPortal initialMode="login" />;
}
