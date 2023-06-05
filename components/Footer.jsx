import React from 'react';
import { SocialIcon } from 'react-social-icons';

export default function Footer() {
    return (
        <footer className="relative bg-white rounded-lg shadow m-4 dark:bg-gray-800 z-[99]">
            <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
            <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">Made with ❤️ by <a href="https://github.com/sponsors/polidario" className="hover:underline">Bernard Polidario</a>.
            </span>
            <ul className="flex flex-wrap gap-3 items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
                <li>
                    <SocialIcon url='https://github.com/polidario' bgColor='#9ba1ad' style={{ height: 25, width: 25 }}/>
                </li>
                <li>
                    <SocialIcon url='https://youtube.com/weeklyhow' bgColor='#9ba1ad' style={{ height: 25, width: 25 }}/>
                </li>
                <li>
                    <SocialIcon url='https://twitter.com/weeklyhow' bgColor='#9ba1ad' style={{ height: 25, width: 25 }}/>
                </li>
                <li>
                    <SocialIcon url='https://weeklyhow.com/' bgColor='#9ba1ad' style={{ height: 25, width: 25 }}/>
                </li>
            </ul>
            </div>
        </footer>
    )
}