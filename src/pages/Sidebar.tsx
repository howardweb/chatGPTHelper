import {BsPlus} from "react-icons/bs"
import React, { Dispatch, FunctionComponent, SetStateAction, useEffect, useState } from 'react'
import styles from "../styles/sidebar/Sidebar.module.css"
import {TbLayoutSidebar} from "react-icons/tb"
import Link from 'next/link'
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../config/firebase'; // Importer fra din firebase.js fil
import { useAuth } from '../contexts/authDetails'; // Angi riktig sti til AuthContext
import {bgColor, linearGradients} from '../styles/colors'

import CustomButton from "../components/CustomButton"
import Instructions from "../components/sidebar/Instructions"
import useFirestoreData from '../hooks/useFirestoreData';
import { DataItem } from '../hooks/useFirestoreData';

// * Responsible for navigating to the default and custom instructions.
// * If logged in, let the user navigate to the "New instructions" page.

interface SidebarProps {
  setCurrentInstruction: Dispatch<SetStateAction<DataItem>>;
}

const Sidebar: FunctionComponent<SidebarProps> = ({ setCurrentInstruction }) => {
  const { authUser } = useAuth();

  // We are feching data on every render, but we can use the useEffect hook to only fetch data when the component mounts.
  const { data, loading } = useFirestoreData();  // Fetching the Firestore data here


  const [isOpen, setIsOpen] = useState(true)
  // TODO : Some how get the users custom instructions labels, 
  // TODO : Display the instruction labels below 

  const handleSignOut = () => {
    signOut(auth).then(() => {
      console.log("Sign-out successful.");
    }).catch((error) => {
      console.log(error);
    });
    };

  // FUNCTION FOR TOGGLING THE MENU STATE
  const handleMenu = () => {
    // set the state to the opposite
    setIsOpen(prev => !prev)
  }
  if (isOpen){

    
    // Fjene denne 
    if (loading) {
      return <div>Loading...</div>;
    }
    

  // SIDEBAR
  return (
    <div className={styles.container}>
      <div>
        {/* HEADER */}
        <div className={styles.header}>
          <Link href="links/createInstruction" legacyBehavior>
            <button className={styles.newInstruction__button}> 
              <BsPlus size={20}/>
              { authUser ? (
                <>
                New Instruction
                </>
              ) : (
                <>
                Create Instruction
                </>
              ) }
            </button>
          </Link>

          <button className={`${styles.closeMenu__button} ${!isOpen ? styles.openMenu__button : ''}`} onClick={handleMenu}>
            <TbLayoutSidebar size={20}/>
          </button>
        </div>


    {authUser ? (
      <>
        {data && (
        <Instructions
          title="Top 10 hottest instructions"
          instructions={data}  // Passing the data to Instructions component
          setCurrentInstruction={setCurrentInstruction}
        />
      )}
      </>
    ) : (
      <p>YOUR INSTRUCTIONS</p>
    )}



      </div>

      {/* Footer */}
      <div className={styles.footer}>
        {authUser ? (
          <CustomButton label="Log out" gradient={linearGradients.redLinearGradient} onClick={handleSignOut}/>
          ) : (
          <div style={{display:"flex", flexDirection:"column", gap:"1rem"}}>            
            <CustomButton label="Log in" gradient={linearGradients.greenLinearGradient} path="/auth/signin"/>
            <CustomButton label="sign up" gradient={linearGradients.blueLinearGradient} path="/auth/signup"/>
          </div>

        )}
      </div>

    </div>
  )
  }
  else{
    return(
      // CLOSE BUTTON
      <div style={{marginTop: 20, marginLeft: 10}}>
        <div className={styles.tooltipContainer}>
          <span className={styles.tooltipText}>Open sidebar</span>
          <button className={styles.openMenu__button} onClick={handleMenu}>
            <TbLayoutSidebar size={20}/>
          </button>
        </div>
      </div>
    )
  }
}

export default Sidebar

