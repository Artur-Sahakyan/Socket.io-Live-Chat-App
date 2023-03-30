import * as React from 'react';

import './messages.css';

function Messages({ allMessages }) {
  return (
    <div className='messages'>
      { allMessages.map((msg, i) => <p key={i}> { [msg] } </p>)}
    </div>
  );
}

export default Messages;
