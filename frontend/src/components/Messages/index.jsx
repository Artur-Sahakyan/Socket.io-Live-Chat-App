import * as React from 'react';

import './messages.css';

function Messages({ allMessages }) {
  const messagesRef = React.useRef(null);

  React.useEffect(() => {
    if(messagesRef.current) {
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
    };
  }, [allMessages]);

  return (
    <div className='messages' ref={messagesRef}>
      <div>
        { allMessages.map((msg, i) => <p key={i}> { [msg] } </p>)}
      </div>
    </div>
  );
}

export default Messages;
