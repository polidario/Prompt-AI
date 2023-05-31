import React from 'react';
import clsx from 'clsx';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
export default function ChatLine({ content, role = 'assistant' }) {
    if(!content) return;

    const { data: session } = useSession();
    const convertNewLines = (text) => {
        if(!text.includes("\n")) return text;

        text.split("\n").map((line, i) => (
            <span key={i}>
                {line}
                <br />
            </span>
        ))
    }

    const formatteMessage = convertNewLines(content);

    return (
        <div className="col-start-1 col-end-13 p-3 rounded-lg">
            <div className={clsx(
                'flex items-center',
                role == 'assistant' ? 'flex-row' : 'justify-start flex-row-reverse'
            )}>
                <div
                    className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0"
                >
                {role == 'assistant' ? 'AI' : <Image
                            src={session?.user.image}
                            width={37}
                            height={37}
                            alt="Profile"
                            className="rounded-full"
                        />}
                </div>
                <div
                    className={clsx(
                        'relative text-sm bg-white py-2 px-4 shadow rounded-xl',
                        role == 'assistant' ? 'ml-3' : 'mr-3'
                    )}
                >
                    <div>{formatteMessage}</div>
                </div>
            </div>
        </div>
    )
}