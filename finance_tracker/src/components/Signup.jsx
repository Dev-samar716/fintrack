import { useEffect,useState} from 'react' 
import { useNavigate } from 'react-router-dom'; 
import '../css/SignInpage.css'
function ValidateEmail(email, setIsEmailValid) {
  const emailOk = /^(?!.*\.\.)(?!\.)(?!.*\.$)[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/.test(email); //checks most common email syntax edge cases

  if(emailOk) setIsEmailValid(true); 
  else setIsEmailValid(false);
  
}

function  ValidatePassword(password, setIsPasswordValid){
         const lengthOK = password.length > 7 && password.length <= 15; //ensures the password is long enough
         if(lengthOK) setIsPasswordValid(true)
          else setIsPasswordValid(false)
    }


function ValidateUserName(userName, setIsUserNameValid) { 
  const lengthOk = userName.length >= 3 && userName.length <= 12; // ensures the length meets requirement
  const regexOk = /^[a-zA-Z0-9_]+$/.test(userName); // Basic test to ensure it doesn't contain special characters
  const isPureNumber = /^\d+$/.test(userName) // to ensure it's not purely a numeric value
  const first3AreNumbers = /^\d{3}/.test(userName); // to ensure the first 3 characters aren't numerical values



  if (lengthOk && regexOk && !(isPureNumber || first3AreNumbers)) setIsUserNameValid(true);
   else setIsUserNameValid(false);
}

function handleClick(navigate) {
    navigate("/home");
  }

export default function Sign_Up({userName, setUserName, password, setPassword, email, setEmail,addUserInfo}) { 
  const[isFormValid, setIsFormValid] = useState(false); //to check if all form data are valid
  const [isUserNameValid, setIsUserNameValid] = useState(null); //to check if UserName is Valid,initialized as null to stay neutral befor input is given. 
  const [isPasswordValid, setIsPasswordValid] = useState(null); //to check if password is Valid,initialized as null to stay neutral befor input is given. 
  const [isEmailValid, setIsEmailValid] = useState(null); //to check if Email is Valid,initialized as null to stay neutral befor input is given.
  const navigate = useNavigate();

          useEffect(()=>{  
            if(userName != '') {
           ValidateUserName(userName, setIsUserNameValid)
            } 
            if(password != '') {
              ValidatePassword(password, setIsPasswordValid)
            } 
            if(email != '') {
              ValidateEmail(email, setIsEmailValid)
            }
          },[userName, password, email]) 

          useEffect(() => {
       setIsFormValid(isUserNameValid && isPasswordValid && isEmailValid);
      }, [isUserNameValid, isPasswordValid, isEmailValid]);

           useEffect(()=>{ 
            // Change background when the page loads
            document.body.style.backgroundColor = "#1F1F1F"; 

           // Move to default background when path changes 
             return () => {
                document.body.style.backgroundColor = "";
             }
           }, []) 

        
       return( 
        <div className='SignUp-form-Parent'>
        <div className='SignUp-form-div'>  
          <div className='SignUP-form-header'> 
            <p>Create Your FinTrack Account</p>
          </div> 
          <div>
           {isUserNameValid === false && <p className='Invalid-feedback'>UserName not available!</p>}
           {isPasswordValid === false && <p className='Invalid-feedback' >Password must be longer than 7 and shorter than 16!</p>} 
           {isEmailValid === false &&  <p className='Invalid-feedback' >Invalid Email!</p>}
          </div> 
          <div className='UserName-Info'>
            <div className='Icon-container'>
             <label>Username</label> 
       <i className={`fa-regular fa-circle-check ${isUserNameValid === true ? "check-visible" : "check-invisible"}`}/>
    </div>
            <input placeholder='What should we call you?' className='Input-form' value={userName} onChange={(e)=>setUserName(e.target.value)}/>
          </div>
          <div className='Password-Info'> 
             <div className='Icon-container'>
             <label>Password</label> 
              <i className={`fa-regular fa-circle-check ${isPasswordValid === true ? "check-visible" : "check-invisible"}`}/>
             </div>
            <input placeholder='Choose a strong password' className='Input-form' value={password} onChange={(e)=>setPassword(e.target.value)}/>
          </div>
           <div className='Email-Info'>
             <div className='Icon-container'>
              <label>Email</label> 
               <i className={`fa-regular fa-circle-check ${isEmailValid === true ? "check-visible" : "check-invisible"}`}/>
             </div> 
            <input placeholder='Input your Email' className='Input-form' value={email} onChange={(e)=>setEmail(e.target.value)}/>
          </div> 
          <div className='SignUp-Btn-Container'>
            <button className='SignUp-BTN' disabled={!isFormValid} onClick={()=> {addUserInfo(); handleClick(navigate)}}>Next</button>
          </div>
          </div>  
         </div>
       ); 
       
}