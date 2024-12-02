'use client';
import React from 'react'
import Link from 'next/link'
import { useState } from 'react';
import { validateRequest } from "@/lib/auth";

interface NavbarProps {
  //isAuthenticated: boolean;
  role: string;
  
}

const Navbar = ({role}:NavbarProps) => {
  //const [isAuthenticated, setIsAuthenticated] = useState(false);
  // const [role, setRole] = useState("user");
  return (
    <div>
    <header className="absolute inset-x-0 top-0 z-50">
    <nav className="flex items-center justify-between p-6 lg:px-8 bg-slate-400 text-slate-50 fixed-top" aria-label="Global">
      <div className="flex lg:flex-1">
        <a href="#" className="-m-1.5 p-1.5">
          <span className="sr-only">Your Company</span>
          <img className="h-8 w-auto" src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600" alt=""/>
        </a>
      </div>
      <div className="flex lg:hidden">
        <button type="button" className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700">
          <span className="sr-only">Open main menu</span>
          <svg className="size-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>
        </button>
      </div>
      {role ? (
            <>
              {/* Links visible only when user is logged in */}    
              <div className="hidden lg:flex lg:gap-x-12">       
                <a className="text-sm/6 font-semibold text-gray-900" href="#">Dashboard</a>        
                <a className="text-sm/6 font-semibold text-gray-900" href="#">Profile</a>
              </div>
              {role === 'admin' && (
                <>
                    <div className="hidden lg:flex lg:gap-x-12">
                    <a className="text-sm/6 font-semibold text-gray-900" href="#">Admin Panel</a>
                    <a className="text-sm/6 font-semibold text-gray-900" href="#">Manage Users</a>
                    </div>
                </>
              )}
              <a className="text-sm/6 font-semibold text-gray-900" href="/ui/logout">Logout</a>
              </>
          ) : (
            <>
      <div className="hidden lg:flex lg:gap-x-12">
        <a href="#" className="text-sm/6 font-semibold text-gray-900">Home</a>
        <a href="#" className="text-sm/6 font-semibold text-gray-900">About</a>
        <a href="#" className="text-sm/6 font-semibold text-gray-900">Features</a>
        <a href="#" className="text-sm/6 font-semibold text-gray-900">Contact</a>
      </div>
     
      <div className="hidden lg:flex lg:flex-1 lg:justify-end">
        <Link href="/ui/login" className="text-sm/6 font-semibold text-gray-900">Login <span aria-hidden="true"></span></Link>&nbsp;&nbsp;
        <Link href="/ui/signup" className="text-sm/6 font-semibold text-gray-900">Signup <span aria-hidden="true"></span></Link>
      </div>
      </>
      )}
    </nav>
    
    <div className="lg:hidden" role="dialog" aria-modal="true">
      
      <div className="fixed inset-0 z-50"></div>
      <div className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
        <div className="flex items-center justify-between">
          <a href="#" className="-m-1.5 p-1.5">
            <span className="sr-only">Your Company</span>
            <img className="h-8 w-auto" src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600" alt=""/>
          </a>
          <button type="button" className="-m-2.5 rounded-md p-2.5 text-gray-700">
            <span className="sr-only">Close menu</span>
            <svg className="size-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="mt-6 flow-root">
          <div className="-my-6 divide-y divide-gray-500/10">
          {role ? (
            <>
              {/* Links visible only when user is logged in */}    
              <div className="hidden lg:flex lg:gap-x-12">       
                <a className="text-sm/6 font-semibold text-gray-900" href="#">Dashboard</a>        
                <a className="text-sm/6 font-semibold text-gray-900" href="#">Profile</a>
              </div>
              {role === 'admin' && (
                <>
                    <div className="hidden lg:flex lg:gap-x-12">
                    <a className="text-sm/6 font-semibold text-gray-900" href="#">Admin Panel</a>
                    <a className="text-sm/6 font-semibold text-gray-900" href="#">Manage Users</a>
                    </div>
                </>
              )}
              <a className="text-sm/6 font-semibold text-gray-900" href="#">Logout</a>
              </>
          ) : (
            <>
      <div className="hidden lg:flex lg:gap-x-12">
        <a href="#" className="text-sm/6 font-semibold text-gray-900">Home</a>
        <a href="#" className="text-sm/6 font-semibold text-gray-900">About</a>
        <a href="#" className="text-sm/6 font-semibold text-gray-900">Features</a>
        <a href="#" className="text-sm/6 font-semibold text-gray-900">Contact</a>
      </div>
     
      <div className="hidden lg:flex lg:flex-1 lg:justify-end">
        <Link href="/ui/login" className="text-sm/6 font-semibold text-gray-900">Login <span aria-hidden="true"></span></Link>&nbsp;&nbsp;
        <Link href="/ui/signup" className="text-sm/6 font-semibold text-gray-900">Signup <span aria-hidden="true"></span></Link>
      </div>
      </>
      )}
      </div>
            </div>
          </div>
        </div>
  </header>
    </div>
  )
}

export default Navbar