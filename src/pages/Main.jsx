import React, {useState} from 'react'
import styles from "../styles/Home.module.css"
import { useAuth } from '../contexts/authDetails'; // Angi riktig sti til AuthContext
import Link from 'next/link'
import {FaClipboardList} from "react-icons/fa"
import {BsCheck2All} from "react-icons/bs"
import {CopyToClipboard} from 'react-copy-to-clipboard';
import { bgColor } from '../styles/colors';
import CustomButton from '../components/CustomButton';

const Main = ({currentInstruction}) => {

    const { authUser } = useAuth();
    const [activeDropdown, setActiveDropdown] = useState(null);
    const[copied, setCopied] = useState(false)


    let header = ""
    let instructions = []

    if(currentInstruction){
      header = currentInstruction.header
      instructions = currentInstruction.instruction
    }

 

    
  return (
    <main className={styles.main}>

       <div className={styles.introduction}>
          <h1 className={styles.title}>Tailored ChatGPT Instructions</h1>
          <div className={styles.introductionContainer}>
            <p className={styles.description}>
              This platform provides you with a set of custom instructions that you can use to enhance your experience with ChatGPT. Navigate through different sets of instructions in the menu. You can copy these instructions and paste them into your ChatGPT custom instructions field to guide the AI in generating more tailored responses.
            </p>
          </div>
        </div>

      {authUser ? (
        <>
        <div className={styles.createInstructionContainer}>
          <p className={styles.customInstructionTxt}>Click here to create your own instructions</p>
          <CustomButton  label='Create Instruction' color={bgColor.green} path='/createInstruction'/>
      </div>
      </>

      ) : (
       <div className={styles.notLoggedInSection}>
         <p>Please remember to 
              <span>
                <Link href="/logIn" className={styles.loginShortcut} style={{color: bgColor.green}}>log in</Link> 
              </span>
              to fully enjoy the benefits. Once logged in, you&apos;ll have the option to create custom instructions.
            </p>
       </div>
      )}

      <div className={styles.instruction__container}>
        <div className={styles.instruction__header}>
        <h3 className={styles.instruction_title}>{header}</h3>
          {/* Library lets us copy the text */}
          <CopyToClipboard 
            text={instructions}
            className={styles.copyToClipboard__button}
          >
            <div onClick={() => setCopied(true)} style={{display: "flex", justifyContent:"center", alignItems:"center", gap:"10px"}}>
            { copied ? (
                <>
                <BsCheck2All size={20}/>
              </>
            ): (
              <>
                <FaClipboardList size={20}/>
              </>
            )}
            <span className={styles.copyToClipboard__text}>{copied ? "copied!" : "copy instruction"}</span>
            </div>
          </CopyToClipboard>
        </div>
          <div className={styles.instruction__list}>{instructions.map((instruction, index) =>(
            <li className={styles.instruction__item} key={index}>- {instruction}</li>
            ))}
          </div>

        </div>
      </main>

  
  )
}

export default Main