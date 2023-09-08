import React, { useState, useCallback } from 'react';
import SockJsClient from 'react-stomp';

const SOCKET_URL = 'http://localhost:8081/ws-message';

const App = () => {
  const [message, setMessage] = useState('You server message here.');

  const onConnected = useCallback(() => {
    console.log("Connected!!")
  }, []);

  const onDisconnected = useCallback(() => {
    console.log("Disconnected!!")
  }, []);

  const onMessageReceived = useCallback((msg) => {
    console.log("Received!!", msg)
    setMessage(msg.title);
  }, [setMessage]);

  return (
    <div>
      <SockJsClient
        url={SOCKET_URL}
        topics={['/topic/ws-reddit-posts']}
        onConnect={onConnected}
        onDisconnect={onDisconnected}
        onMessage={onMessageReceived}
        debug={false}
      />
      <div>{message}</div>
    </div>
  );
}

export default App;