import React from 'react';
import { ProfileItem } from './ProfileItem';

type Props = {};

export const ProfileList: React.FC<Props> = ({}) => {
  return (
    <div className="thx-drawer flex">
      <div className="main-title">Profile List</div>
      <div id="profileWrapper" className="drawer-select flex">
        <div id="profileList" className="scrollable">
          <ProfileItem key="0" type="default" name="default" active />
          <ProfileItem key="1" type="game" name="game" />
          <ProfileItem key="2" type="movie" name="movie" />
          <ProfileItem key="3" type="music" name="music" />
          <ProfileItem key="4" type="custom" name="custom 1" />
          <ProfileItem key="5" type="custom" name="demo long text demo long text demo" />
          <input id="profileRename" className="profile-item" placeholder="Enter Profile Name" maxLength={25} />
        </div>
        <div className="toolbar flex">
          <div className="icon add" id="profileAdd"></div>
          <div className="icon edit" id="profileEdit"></div>
          <div className="icon delete" id="profileDelete"></div>

          <div className="icon down" id="profileDown"></div>
          <div className="icon up disabled" id="profileUp"></div>
        </div>
        <div id="profileDelCfm" className="profile-del alert flex">
          <div className="title">delete eq</div>
          <div className="body-text t-center" id="delName">
            delete eq
          </div>
          <div className="thx-btn" id="cfmDelete">
            delete
          </div>
        </div>
      </div>
    </div>
  );
};
