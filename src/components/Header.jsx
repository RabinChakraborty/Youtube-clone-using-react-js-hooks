import React, { useContext, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import ytLogo from '../images/rabintube-background.png';
import ytLogoMobile from '../images/rabintube-.png';

import { SlMenu } from 'react-icons/sl';
import { IoIosSearch } from 'react-icons/io';
import { RiVideoAddLine } from 'react-icons/ri';
import { FiBell } from 'react-icons/fi';
import { CgClose } from 'react-icons/cg';

import { Context } from '../context/contextApi';
import Loader from '../shared/loader';

const Header = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const { loading, mobileMenu, setMobileMenu } = useContext(Context);

  const navigate = useNavigate();

  const searchQueryHandler = (event) => {
    if (
      (event?.key === 'Enter' || event === 'searchButton') &&
      searchQuery?.length > 0
    ) {
      navigate(`/searchResult/${searchQuery}`);
    }
  };

  const mobileMenuToggle = () => {
    setMobileMenu(!mobileMenu);
  };
  const { pathname } = useLocation();
  const pageName = pathname?.split('/')?.filter(Boolean)?.[0];

  return (
    <div className='sticky top-0 z-10 flex flex-row items-center justify-between h-14 px-4 md:px-5  bg-[#344D67]'>
      {loading && <Loader />}

      <div className='flex h-5 items-center'>
        {pageName !== 'video' && (
          <div
            className='flex md:hidden md:mr-6 cursor-pointer items-center justify-center h-10 w-10 rounded-full hover:bg-[#303030]/[0.6]'
            onClick={mobileMenuToggle}
          >
            {mobileMenu ? (
              <CgClose className='text-white text-xl' />
            ) : (
              <SlMenu className='text-white text-xl' />
            )}
          </div>
        )}
        <Link to='/' className='flex h-10 items-center'>
          <img
            className='h-full hidden dark:md:block'
            src={ytLogo}
            alt='Youtube'
          />
          <img className='h-full md:hidden' src={ytLogoMobile} alt='Youtube' />
        </Link>
      </div>
      <div className='group flex items-center'>
        <div className='flex h-8 md:h-10 md:ml-10 md:pl-5 border border-[#303030] rounded-l-3xl group-focus-within:border-blue-500 md:group-focus-within:ml-5 md:group-focus-within:pl-0'>
          <div className='w-10 items-center justify-center hidden group-focus-within:md:flex'>
            <IoIosSearch className='text-white text-xl' />
          </div>
          <input
            type='text'
            className='bg-transparent outline-none text-white pr-5 pl-5 md:pl-0 w-44 md:group-focus-within:pl-0 md:w-64 lg:w-[500px]'
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyUp={searchQueryHandler}
            placeholder='Search'
            value={searchQuery}
          />
        </div>
        <button
          className='w-[40px] md:w-[60px] h-8 md:h-10 flex items-center justify-center border border-l-0 border-[#303030] rounded-r-3xl bg-white/[0.1]'
          onClick={() => searchQueryHandler('searchButton')}
        >
          <IoIosSearch className='text-white text-xl' />
        </button>
      </div>
      <div className='flex items-center'>
        <div className='hidden md:flex'>
          <div className='flex items-center justify-center h-10 w-10 rounded-full hover:bg-[#303030]/[0.6]'>
            <RiVideoAddLine className='text-white text-xl cursor-pointer' />
          </div>
          <div className='flex items-center justify-center ml-2 h-10 w-10 rounded-full hover:bg-[#303030]/[0.6]'>
            <FiBell className='text-white text-xl cursor-pointer' />
          </div>
        </div>
        <div className='flex h-8 w-6 overflow-hidden rounded-full md:ml-4'>
          <img
            src='data:image/jpeg;base64,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'
            alt='pic'
          />
        </div>
      </div>
    </div>
  );
};

export default Header;
