
import React from 'react';
import SmartJournalPage from './SmartJournalPage';

interface JournalPageProps {
  accentColor: 'mint' | 'purple';
}

const JournalPage: React.FC<JournalPageProps> = ({ accentColor }) => {
  return <SmartJournalPage accentColor={accentColor} />;
};

export default JournalPage;
