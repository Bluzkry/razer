import React from 'react';
import { ProfileList } from './features/ProfileList';
import { ProfileView } from './features/ProfileView';

import './css/profile.css';
import './css/tooltip.css';

function App() {
  return (
    <div className="main-container">
      <div className="thx-wrapper flex">
        <ProfileList />
        <ProfileView />
      </div>
    </div>
  );
}

export default App;
