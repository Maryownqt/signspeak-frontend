import React from 'react';

const GestureDisplay = ({ gesture }) => {
  return (
    <div style={{ fontSize: '1.5rem', marginTop: '1rem' }}>
      {gesture ? `Detected Gesture: ${gesture}` : 'No gesture detected yet.'}
    </div>
  );
};

export default GestureDisplay;
