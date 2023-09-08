import React, { useState, useCallback } from 'react';
import SockJsClient from 'react-stomp';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const SOCKET_URL = 'http://localhost:8081/ws-message';

const App = () => {
  const [message, setMessage] = useState('You server message here.');
  const [posts, setPosts] = useState([]);
  const [status, setStatus] = useState([]);

  const onConnected = useCallback(() => {
    console.log("Connected!!");
    setStatus("Connected");
  }, []);

  const onDisconnected = useCallback(() => {
    console.log("Disconnected!!")
    setStatus("Disconnected");
  }, []);

  const addToPosts = (msg) => {
    const newPost = {
      author: msg.author,
      title: msg.title,
      created_utc: msg.created_utc,
      selftext: msg.selftext,
      subreddit: msg.subreddit,
      url: msg.url
    };
    const newPosts = posts.concat(newPost);
    setPosts(newPosts);
  }

  const onMessageReceived = (msg) => {
    setMessage(msg.title);
    addToPosts(msg)
  };

  return (
    <div>
      <div>{status}</div>
      <SockJsClient
        url={SOCKET_URL}
        topics={['/topic/ws-reddit-posts']}
        onConnect={onConnected}
        onDisconnect={onDisconnected}
        onMessage={onMessageReceived}
        debug={false}
      />
      <div>{message}</div>
      <div>{posts.length}</div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Author</TableCell>
              <TableCell align="right">Title</TableCell>
              <TableCell align="right">Created UTC</TableCell>
              <TableCell align="right">Selftext</TableCell>
              <TableCell align="right">Subreddit</TableCell>
              <TableCell align="right">Url</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {posts.map((post) => (
              <TableRow
                key={post.title}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {post.author}
                </TableCell>
                <TableCell align="right">{post.title}</TableCell>
                <TableCell align="right">{post.created_utc}</TableCell>
                <TableCell align="right">{post.selftext}</TableCell>
                <TableCell align="right">{post.subreddit}</TableCell>
                <TableCell align="right">{post.url}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>

  );
}

export default App;