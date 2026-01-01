import React from 'react';
import { NewConnectionFormImage } from './NewConnectionFormImage';

interface NewConnectionFormProps {
  selectedPropertyNumber?: string;
  onBackToDashboard?: () => void;
}

export function NewConnectionForm({ selectedPropertyNumber, onBackToDashboard }: NewConnectionFormProps) {
  return <NewConnectionFormImage user={{}} onBack={onBackToDashboard} />;
}
