import * as React from 'react';
import { AllMessagesContext } from 'store/allMessages';

import './messages.css';
import { UserContext } from 'store';

function Messages() {
  const messagesRef = React.useRef(null);
  const { allMessages } = React.useContext(AllMessagesContext);
  const { user } = React.useContext(UserContext);

  React.useEffect(() => {
    if(messagesRef.current) {
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
    };
  }, [allMessages]);

  return (
    <div className='messages' ref={messagesRef}>
        { allMessages.map((msg, i) => (
          <div key={i} className={`msg-wrapper ${msg.userId === user.id ? "msg-wrapper-right" : ""}`}>
            <p>
              <span>
                {[msg.text]}
              </span>
            </p>
          </div>
        ))}
    </div>
  );
}

export default Messages;
