import React, { useState } from 'react';
import {
  Box,
  Paper,
  TextField,
  Button,
  Typography,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Divider
} from '@mui/material';
import { Send as SendIcon } from '@mui/icons-material';
import type { ChatBotPrompt } from '../../../../../types/chat';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

interface ChatBotTesterProps {
  prompt: ChatBotPrompt;
}

const ChatBotTester: React.FC<ChatBotTesterProps> = ({ prompt }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      text: inputMessage,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages([...messages, newMessage]);
    setInputMessage('');

    // ボットの応答をシミュレート
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: `申し訳ありません、まだテスト中です。プロンプト: ${prompt.catchphrase}`,
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botResponse]);
    }, 1000);
  };

  return (
    <Paper sx={{ height: '600px', display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ p: 2, backgroundColor: 'primary.main', color: 'white' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Avatar src={prompt.imageUrl} alt={prompt.idolName} />
          <Typography variant="h6">{prompt.idolName}</Typography>
        </Box>
      </Box>

      <List sx={{ flexGrow: 1, overflow: 'auto', p: 2 }}>
        {messages.map((message) => (
          <ListItem
            key={message.id}
            sx={{
              flexDirection: message.sender === 'user' ? 'row-reverse' : 'row',
              gap: 2,
              mb: 2
            }}
          >
            <ListItemAvatar>
              <Avatar
                src={message.sender === 'bot' ? prompt.imageUrl : undefined}
              />
            </ListItemAvatar>
            <ListItemText
              primary={
                <Paper
                  elevation={1}
                  sx={{
                    p: 1,
                    backgroundColor: message.sender === 'user' ? 'primary.light' : 'grey.100',
                    maxWidth: '80%',
                    display: 'inline-block'
                  }}
                >
                  {message.text}
                </Paper>
              }
              sx={{ flex: 'none' }}
            />
          </ListItem>
        ))}
      </List>

      <Divider />

      <Box sx={{ p: 2, display: 'flex', gap: 1 }}>
        <TextField
          fullWidth
          size="small"
          placeholder="メッセージを入力..."
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              handleSendMessage();
            }
          }}
        />
        <Button
          variant="contained"
          onClick={handleSendMessage}
          disabled={!inputMessage.trim()}
        >
          <SendIcon />
        </Button>
      </Box>
    </Paper>
  );
};

export default ChatBotTester; 