import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

import { logo } from "../assets";

const Hero = () => {
  const { loginWithRedirect, isAuthenticated,logout ,user} = useAuth0();
  return (
    <header className='w-full flex justify-center items-center flex-col'>
      <nav className='flex justify-between items-center w-full mb-10 pt-3'>
        <img src={logo} alt='sumz_logo' className='w-28 object-contain' />
          
            
        
          
        {
          isAuthenticated ? (
            <li>
              <button 
        type='button' 
        onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}
        className='black_btn' 
        >
             Log Out
          </button>
            </li>
          ):
          (
            <li>
              <button
          type='button'
          onClick={() =>loginWithRedirect()
          }
          className='black_btn'
        >
          Log In
                
        </button>
              {isAuthenticated && (
            <li>
            <p>
              {user.name}
              </p>
              </li>
              )}
            </li>
          )
        }

        
            </nav>

      <h1 className='head_text'>
        Summarize Articles with <br className='max-md:hidden' />
        <span className='orange_gradient '>OpenAI GPT-4</span>
      </h1>
      <h2 className='desc'>
        Simplify your reading with Summize, an open-source article summarizer
        that transforms lengthy articles into clear and concise summaries
      </h2>
    </header>
  );
};

export default Hero;
