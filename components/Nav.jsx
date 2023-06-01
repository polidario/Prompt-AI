"use client"

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { signIn, signOut, useSession, getProviders } from 'next-auth/react'
export default function Nav() {
    const { data: session } = useSession();
    const [providers, setProviders] = useState(null);
    const [profileToggleDropdown, setProfileToggleDropdown] = useState(false);
    
    useEffect(() => {
        const setupProviders = async () => {
            const response = await getProviders();

            setProviders(response);
        }

        setupProviders();
    }, [])

    return (
        <nav className='flex-between w-full pt-3 mb-16'>
            <Link href="/" className='flex flex-center gap-2'>
                <Image
                    src="/assets/images/logo.svg"
                    alt="Reminisce Logo"
                    width={50}
                    height={50}
                    className="object-contain"
                />
                <p className="logo_text">Reminisce</p>
            </Link>

            <div className="hidden sm:flex">
                {
                    session?.user ? (
                        <div className='flex gap-3 md:gap-5'>
                            <Link 
                                href="/start-here"
                                className="black_btn"
                            >
                                Start here
                            </Link>

                            <button 
                                type="button"
                                onClick={signOut}
                                className="outline_btn"
                            >
                                Sign Out
                            </button>

                            <Link 
                                href="/profile"
                            >
                                <Image
                                    src={session?.user.image}
                                    width={37}
                                    height={37}
                                    alt="Profile"
                                    className="rounded-full"
                                />
                            </Link>
                        </div>
                    ) : (
                        <>
                            {
                                providers &&
                                    Object.values(providers).map((provider) => {
                                        (
                                            <button 
                                                type="button"
                                                key={provider.name}
                                                onClick={() => signIn(provider.id)}
                                                className='black_btn'
                                            >
                                                Sign In
                                            </button>
                                        )
                                    })
                            }
                        </>
                    )
                }
            </div>

            <div className="flex relative sm:hidden">
                {session?.user ? (
                    <div className='flex'>
                        <Image
                            src={session?.user.image}
                            width={37}
                            height={37}
                            alt="Profile"
                            className="rounded-full"
                            onClick={() => { 
                                setProfileToggleDropdown((prevState) => !prevState)}
                            }
                        />

                        {profileToggleDropdown && (
                            <div className="dropdown">
                                <Link
                                    href="/profile"
                                    className="dropdown_link"
                                    onClick={() => setProfileToggleDropdown(false)}
                                >
                                    My Profile
                                </Link>

                                <button
                                    className="black_btn mt-5 w-full"
                                    onClick={() => {
                                        setProfileToggleDropdown(false);
                                        signOut();
                                    }}
                                >
                                    Sign Out
                                </button>
                            </div>
                        )}
                    </div>
                    
                ) : (
                    <>
                        {providers &&
                            Object.values(providers).map((provider) => (
                                <button 
                                    type="button"
                                    key={provider.name}
                                    onClick={() => signIn(provider.id)}
                                    className='black_btn'
                                >
                                    Sign In
                                </button>
                            ))
                        }
                    </>
                )}
            </div>
        </nav>
    )
}