import React from 'react';
import { CompactConnectionForm } from './CompactConnectionForm';

interface FirstConnectionFormProps {
  onBack?: () => void;
}

export function FirstConnectionForm({ onBack }: FirstConnectionFormProps) {
  return <CompactConnectionForm onBack={onBack} isNewConnection={false} />;
}
