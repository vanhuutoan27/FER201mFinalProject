import React from 'react';

import Navigation from '../../../components/Navigation';

function Profile() {
  return (
    <div className="ProfilePage">
      <Navigation />

      <div className="content">
        <div className="profile-avatar">
          <h2>Loc Nghien Dong Lai</h2>
          <h3>@AngLocDongLai</h3>
          <img src="../assets/images/avatar/Untitled1.png" alt="" />
          <a href="#!" className="btn">
            Update New Avatar
          </a>
          <hr />
          <p>Member Since 01 January 1900</p>
        </div>

        <div className="profile-info"></div>
      </div>
    </div>
  );
}

export default Profile;
