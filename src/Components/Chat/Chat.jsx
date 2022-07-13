import * as React from "react";
import FormControl from "@mui/material/FormControl";
import { useState } from "react";
import "./chat.css";
import { useInterval } from "./Hook.jsx";
import InputLabel from "@mui/material/InputLabel";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Grid from '@mui/material/Grid';

function MessageThing({ message, user }) {
  return (
    <Card>
      <CardContent sx={{ textAlign: "left" }}>
        {" "}
        {user}: {message}
      </CardContent>
    </Card>
  );
}



function CreateMessage({ addMessage }) {
   const [value, setValue] = useState("");

   const handleSubmit = (e) => {
    e.preventDefault();
    if (!value) return;

    addMessage(value);
    setValue("");
  };
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        className="input"
        value={value}
        placeholder="Type your message"
        onChange={(e) => setValue(e.target.value)}
      />
    </form>
  );
}

function Chats() {
  const [chats, setChat] = useState([{}]);
  const [messages, setMessages] = useState([{}]);
  const [currentChat, setCurrentChat] = useState({}); 
  const [userName, setUserName] = useState(""); 
  const [userText, setUserText] = useState("");
  const [tempChatName, setTempChatName] =useState("");
  

  const addMessage = (title) => {
    const message = {
      username: userName, 
      text: title,
      chatId: currentChat.id,
    };
    fetch("https://z36h06gqg7.execute-api.us-east-1.amazonaws.com/messages", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json", 
      },
      body: JSON.stringify(message),
    }).then(console.log("its working"));
  };

  const addChat = (title) => {
    const chat = {
      name: title,
    };

    fetch("https://z36h06gqg7.execute-api.us-east-1.amazonaws.com/chats", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json", 
      },
      body: JSON.stringify(chat),
    }).then(console.log("its working"));
  };

  const handleChange = (event) => {
    setCurrentChat(event.target.value);
    setCurrentChat({ id: event.target.value })
  };

  useInterval(
    (params) => {
      const chatId = params[0];
      fetch(
        `https://z36h06gqg7.execute-api.us-east-1.amazonaws.com/chats/${currentChat.id}/messages`
      )
        .then((response) => response.json())
        .then((data) => {
          setMessages(data.Items);
        });
    },
    1000, 
    currentChat
  );
  useInterval(() => {
    fetch(`https://z36h06gqg7.execute-api.us-east-1.amazonaws.com/chats`)
      .then((response) => response.json())
      .then((data) => {
        setChat(data.Items);
      });
  }, 1000);
  const handleClick = ({ chat }) => {
    this.setState({
      currentChat: { chat },
    });
  };

  return (
    <div>
      <div className="container">
      
        <Grid container spacing={2} className="grid">
          <Grid item xs={2.4} md={2.4}>
            <Box
              component="form"
              sx={{
              "& > :not(style)": { m: 1, width: "25ch" },
              }}
              noValidate
              autoComplete="off">
            </Box>
            <div
              style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",}}
            >
              <TextField
                id="outline=basic1"
                label="Add Chat"
                variant="outlined"
                onChange={(e) => setTempChatName(e.target.value)}
              />
            </div>
          </Grid>

          <Grid item xs={2.4} md={2.4} id="button">
            <Button style={{padding:15}}  onClick={() => {addChat(tempChatName); document.getElementById("outline=basic1").value = "";;}}>Add Chat</Button>
          </Grid>
          
          <Grid item xs={2.4} md={2.4}>
            <Box sx={{ minWidth: 120 }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Chat</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={currentChat.name}
                  label="Age"
                  onChange={handleChange}
                >
                {chats.map((chat, index) => (
                  <MenuItem value={chat.id}>{chat.name}</MenuItem>
                ))}
                </Select>
              </FormControl>
            </Box>
          </Grid>
         
          <Grid item xs={2.4} md={2.4}>
            <Box
              component="form"
              sx={{
              "& > :not(style)": { m: 1, width: "25ch" },
              }}
              noValidate
              autoComplete="off">
            </Box>
            <div
              style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",}}
            >
              <TextField
                id="outline=basic"
                label="Enter Username"
                variant="outlined"
                onChange={(event) => setUserText(event.target.value)}
              />
            </div>
 
          </Grid>
          <Grid item xs={2.4} md={2.4} id="button">
            <Button style={{padding:15}}  onClick={() => {setUserName(userText); document.getElementById("outline=basic").value = "";;}}>Set Username</Button>
          </Grid>
          <Grid item xs={12} md={12}>
            <div className="container">
              <div className="header">Messages</div>
              <div className="messages">
                {messages.map((message, index) => (
                <MessageThing
                  message={message.text}
                  key={index}
                  user={message.username}
                />
                ))}
              </div>
              <div className="create-chatMessage">
                <CreateMessage addMessage={addMessage} />
              </div>
            </div>

          </Grid>
          
        </Grid>
      </div>
    </div>

  );
}


export const Chat = () => {
  return <Chats />;
};
