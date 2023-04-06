import React, { useState, useEffect, useRef } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
// Importing Components
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
// Importing Icons
import { IoIosArrowDropdown } from 'react-icons/io';
import { AiOutlineCheck } from "react-icons/ai";
import { BsPeople } from "react-icons/bs";
// Importing Widgets
import Widget1 from '../components/Widgets/Widget1';
import Widget2 from '../components/Widgets/Widget2';
import Widget3 from '../components/Widgets/Widget3';
import Widget4 from '../components/Widgets/Widget4';
import Widget5 from '../components/Widgets/Widget5';
import Widget6 from '../components/Widgets/Widget6';

const Home: NextPage = () => {
  const [isOpen, setIsOpen] = useState<Boolean>(true);

  const [currentMenuItem, setCurrentMenuItem] = useState<Number>(1);

  const [currentFullLengthItem, setCurrentFullLengthItem] = useState<Number>(1);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const dragItem = useRef<any>();

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const dragOverItem = useRef<any>();

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [list, setList] = useState([
    {
      id: 1,
      src: <audio id='hoverSoundClip'>
        <source src="audio/1.mp3" />
        Your browser is not invited for super fun audio time.
      </audio>,
      name: "Projects",
    },
    {
      id: 2,
      src: <audio id='hoverSoundClip'>
        <source src="audio/2.mp3" />
        Your browser is not invited for super fun audio time.
      </audio>,
      name: "My Priorities",
    },
    {
      id: 3,
      src: <audio id='hoverSoundClip'>
        <source src="audio/3.mp3" />
        Your browser is not invited for super fun audio time.
      </audio>,
      name: "People",
    },
    {
      id: 4,
      src: <audio id='hoverSoundClip'>
        <source src="audio/4.mp3" />
        Your browser is not invited for super fun audio time.
      </audio>,
      name: "Tasks I've Assigned",
    },
    {
      id: 5,
      src: <audio id='hoverSoundClip'>
        <source src="audio/5.mp3" />
        Your browser is not invited for super fun audio time.
      </audio>,
      name: "My goals",
    },
    {
      id: 6,
      src: <audio id='hoverSoundClip'>
        <source src="audio/6.mp3" />
        Your browser is not invited for super fun audio time.
      </audio>,
      name: "Manager Tasks",
    }
  ]);

  const [currentAudio, setCurrentAudio] = useState<any>(list[5].src);

  // on Pointer Down
  const [pointerDown, setPointerDown] = useState<Boolean>(false);

  const dragStart = (e: any, position: any) => {
    dragItem.current = position;
    console.log(e.target.innerHTML);
  };

  const dragEnter = (e: any, position: any) => {
    dragOverItem.current = position;
    console.log(e.target.innerHTML);
  };

  const drop = (e: any) => {
    const copyListItems = [...list];
    const dragItemContent = copyListItems[dragItem.current];
    copyListItems.splice(dragItem.current, 1);
    copyListItems.splice(dragOverItem.current, 0, dragItemContent);
    dragItem.current = null;
    dragOverItem.current = null;
    setList(copyListItems);
  };

  return (
    <div className={styles.container}>
      <Head>
        <meta charSet="utf-8" />
        <link rel="icon" href="/logocopy.ico" />
        <meta name="description" content="A project management app built with Next JS, MUI,mdbootstrap and firebase" />
        <meta name="author" content="Muhammad-Bilal-7896" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <title> TaskEncher: Supercharge Your Workflow and Amplify Task Management</title>
      </Head>

      <main className={styles.main}>

        <div className='d-flex'>

        </div>
      </main>

      <footer className={styles.footer}>
        {/* <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a> */}
      </footer>
    </div>
  )
}
export default Home;
