"use client"
import { useState } from 'react';
import Button from '@mui/material/Button';
import { Box, Stack, TextField } from '@mui/material';

export default function Home() {
  const [messages, SetMessages] = useState([
    { role: 'Bot',
      content: 'Hi im fAIshonBot! How can I help you today?'}
  ]) 
  return (
    <Box
    width={'100vw'}
    height={'100vh'}
    display={'flex'}
    flexDirection={'column'}
    justifyContent={'center'}
    alignItems={'center'}
    >
      <Stack direction={'column'} width={'500px'} height={'700px'} border={'1px solid black'} p={2}>
        <Stack direction={'column'} spacing={2} flexGrow={1}>
          {
            messages.map((message, index) => (
              <Box
              key={index}
              display='flex'
              justifyContent={
                message.role === 'Bot' ? 'flex-start' : 'flex-end'
              }
              >
                <Box
                  bgcolor={
                    message.role === 'Bot' ? 'primary.main' : 'secondary.main'
                  }
                  color={'white'}
                  borderRadius={16}
                  p={2}
                >{message.content}
                </Box>
              </Box>
            ))
          }
        </Stack>
        <Stack direction={'row'} spacing={2}>
          <TextField label='Message' fullWidth/>
          <Button>Send</Button>
        </Stack>
      </Stack>
    </Box>
  )
}
