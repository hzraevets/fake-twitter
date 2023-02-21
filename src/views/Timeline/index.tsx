import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';

import { IdentityContext } from 'effects/Identity';
import { Page404 } from 'views/Page404';
import { UserStatus } from './UserStatus';
import { NewTweet } from './NewTweet';
import { TweetsList } from './TweetsList';

export function Timeline() {
  const { username } = useParams();
  const { loginUser } = useContext(IdentityContext);

  if (username !== loginUser) {
    // login user can only visit his own timeline
    return <Page404/>;
  }

  return (
    <div id="scrollableDiv" className="timeline-container flex h-full overflow-auto">
      <div className="timeline relative pt-10 mx-auto gap-4 columns-1 md:columns-2">
        <div className="break-inside-avoid-column">
          <UserStatus/>
          <NewTweet/>
        </div>
        <TweetsList/>
      </div>
    </div>
  );
}
