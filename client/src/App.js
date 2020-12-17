import React, {useState} from 'react';
import {toast, ToastContainer} from 'react-toastify';
import './App.css';
import 'react-toastify/dist/ReactToastify.css'
import {numbers, upperCaseLetters,lowerCaseLetters,specialCharacters} from './characters';
import {COPY_SUCCESS} from "./message";

function App() {

  const[password, setPassword]= useState('');
  const[passwordLength, setPasswordLength]= useState('5');
  const[includeUppercase, setIncludeUppercase]= useState(false);
  const[includeLowercase, setIncludeLowercase]= useState(false);
  const[includeNumbers, setIncludeNumbers]= useState(false);
  const[includeSymbols, setIncludeSymbols]= useState(false);

  const handleGeneratePassword=(e)=>{

    if(!includeUppercase && !includeLowercase && !includeSymbols && !includeNumbers){
      notify('You must select at least one option', true)
    }
    let characterList = ''

    if(includeLowercase){
          characterList= characterList + lowerCaseLetters
    }
    if(includeUppercase){
          characterList= characterList + upperCaseLetters
    }
    if(includeNumbers){
          characterList= characterList + numbers
    }
    if(includeSymbols){
          characterList= characterList + specialCharacters
    }
    setPassword(createPassword(characterList))

  }
  const createPassword=(characterList)=>{
    let password=''
    const characterListLength= characterList.length

    for(let i=0; i<passwordLength; i++){
      const characterIndex = Math.round(Math.random()*characterListLength)
      password=password+ characterList.charAt(characterIndex)
    }
    return password;
  }

  const copyToClipboard=()=>{
    const newTextArea=document.createElement('textarea');
    newTextArea.innerText=password
    document.body.appendChild(newTextArea)
    newTextArea.select()
    document.execCommand('copy')
    newTextArea.remove()
  }

  const notify =(message, hasError =false)=>{

    if(hasError){
      toast.error(message, {
        position: "bottom-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
    }else{
         toast(message, {
      position: "bottom-left",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      });
    }
  }

  const handleCopyPassword=(e)=>{
    if(password ==='') {
      notify('Nothing To Copy', true)
    }else{
      copyToClipboard()
    notify(COPY_SUCCESS)
    }
  }

  return (
    <div className="App">
        <div className="container">
          <div className="generator">
            <h2 className='generator-header'>Password Generator</h2>
                <div className='generator-password'>
                    <h3>{password}</h3>
                    <button onClick={handleCopyPassword} className='copy-btn'>
                        <i className= 'fas fa-clipboard'></i>
                    </button>
                </div>
                <div className='form-group'>
                     <label htmlFor='password-lenght'>Password lenght</label>
                     <input 
                      type='number' 
                      id='password-lenght'
                      name='password-lenght'
                      max='20' min='5'
                      defaultValue={passwordLength}
                      onChange={(e)=>setPasswordLength(e.target.value)}
                       />
                    
                </div>
                <div className='form-group'>
                     <label htmlFor='uppercase-letters'>Include Uppercase Letters</label>
                     <input 
                     type='checkbox' 
                     id='uppercase-letters' 
                     name='uppercase-letters' 
                     checked={includeUppercase}
                     onChange={(e)=>setIncludeUppercase(e.target.checked)}
                     />
                    
                </div>
                <div className='form-group'>
                     <label htmlFor='lowercase-letters'>Include Lowercase Letters</label>
                     <input 
                     type='checkbox' 
                     id='lowercase-letters' 
                     name='lowercase-letters' 
                     checked={includeLowercase}
                     onChange={(e)=>setIncludeLowercase(e.target.checked)}
                     
                     />
                    
                </div>
                <div className='form-group'>
                     <label htmlFor='include-numbers'>Include Numbers</label>
                     <input 
                     type='checkbox' 
                     id='include-numbers' 
                     name='include-numbers'                   
                     checked={includeNumbers}
                     onChange={(e)=>setIncludeNumbers(e.target.checked)}
                     />
                    
                </div>
                <div className='form-group'>
                     <label htmlFor='include-numbers'>Include Symbols</label>
                     <input 
                     type='checkbox' 
                     id='include-numbers' 
                     name='include-numbers'            
                     checked={includeSymbols}
                     onChange={(e)=>setIncludeSymbols(e.target.checked)}
                     />
                    
                </div>
               
              
                <button onClick={handleGeneratePassword} className='generator-btn'>Press Me</button>
                <ToastContainer
                    position="bottom-left"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    />
          </div>

        </div>
    </div>
  );
}

export default App;
