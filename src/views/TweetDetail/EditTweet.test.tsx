import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
// @ts-ignore
import { create } from 'react-test-renderer';

import { EditTweet } from './EditTweet';
import { enableLocalStorageMock, enableMatchMedia } from 'utils/browserMocks';
import { testUser } from 'mocks/identity';

describe('EditTweet', () => {
  beforeEach(() => {
    enableMatchMedia();
    enableLocalStorageMock();

    // prepare work for identity
    localStorage.setItem('identity', JSON.stringify({ testUser }));
    localStorage.setItem('loginUser', testUser.username);
  });

  it('render EditTweet component', () => {
    render((
      <EditTweet
        openEditModal={true}
        setOpenEditModal={() => null}
      />
    ), { wrapper: BrowserRouter });
  });

  // TypeError: parentInstance.children.indexOf is not a function
  // same error with https://github.com/reactjs/react-modal/issues/553#issuecomment-1026292789
  // it('render EditTweet to snapshot', () => {
  //   const renderer = create(
  //     <BrowserRouter>
  //       <EditTweet
  //         openEditModal={true}
  //         setOpenEditModal={() => null}
  //       />
  //     </BrowserRouter>
  //   );
  //   expect(renderer.toJSON()).toMatchSnapshot();
  // });
});
