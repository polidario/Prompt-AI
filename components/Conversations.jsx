"use client";

import React, { useState, useEffect } from 'react';
import { useSession, signIn } from 'next-auth/react';
import ChatLine from './ChatLine';
import axios from 'axios';

export default function Conversations() {
    const [chatInputValue, setChatInputValue] = useState('');
    const [chatLog, setChatLog] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const { data: session } = useSession();

    const handleSubmit = (event) => {
        event.preventDefault();
        if(!session?.user) {
            signIn();
            return;
        }

        setChatLog((prevChatLog) => [...prevChatLog, { role: 'user', message: chatInputValue }])

        sendMessage(chatInputValue);

        setChatInputValue('');  //Make the chat box empty again
    }

    const sendMessage = (message) => {
        const url = '/api/chat';
        setIsLoading(true);
        
		const data = {
            model: "gpt-3.5-turbo-0301",
            messages: [{
                "role": "user",
                "content": message
            }]
        }
        axios.post(url, data).then((response) => {
            const message = response.data;
            console.log(message.data.choices[0].message.content);
            setChatLog((prevChatLog) => [...prevChatLog, { role: "assistant", message: message.data.choices[0].message.content }])
            setIsLoading(false);
        }).catch((error) => {
            setIsLoading(false);
            console.log(error);
        });
    }

    useEffect(() => {

    });

    return (
        <section className='feed'>
            <div className="flex flex-col flex-auto w-full h-full">
                <div
                    className="flex flex-col flex-auto flex-shrink-0 rounded-2xl bg-gray-100 h-full p-4"
                >
                    <div className="flex flex-col w-full h-full overflow-x-auto mb-4">
                        <div className="flex flex-col h-full">
                            <div className="grid grid-cols-13 gap-y-2">
                                {
                                    chatLog.map((data, index) => (
                                        <ChatLine content={data.message} role={data.role} key={index} />
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='sticky mb-5 bottom-5 w-full'>
                <form 
                    className='relative w-full flex-center'
                    onSubmit={handleSubmit}
                    >
                    <input 
                        type="text" 
                        name="prompt" 
                        id="prompt" 
                        placeholder='Start a conversation' 
                        className='chat_input peer'
                        value={chatInputValue}
                        onChange={(e) => setChatInputValue(e.target.value)}
                        />
                    <button
                        className="absolute flex items-center justify-center h-full w-12 right-0 top-0 text-gray-400 hover:text-gray-600"
                        >
                        <svg
                            className="w-4 h-4 transform rotate-45 -mt-px"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                            ></path>
                        </svg>
                    </button>
                </form>
            </div>
        </section>
    )
}