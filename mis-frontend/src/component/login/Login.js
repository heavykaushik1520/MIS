import React  , {useState} from 'react'
import { useNavigate } from 'react-router-dom'

export default function Login() {
    const [ credentials, setCredentials] = useState({
        email : '',
        passwordHash : '',
    })

    const [error, setError] = useState("")
    const navigate = useNavigate();

    const handleChange = (e) =>{
        setCredentials({
            ...credentials ,
            [e.target.name] : e.target.value
        })
    }

    const handleSubmit = async (e) =>{
        e.preventDefault()
        setError("")
        console.log(credentials)

        // const loginData = {
        //     email: credentials.email,
        //     password: credentials.passwordHash // Change key name to 'password'
        // };

        try{
            const response = await fetch("http://localhost:8080/api/auth/login",{
                method : 'POST',
                headers : {
                    'Content-Type' : 'application/json'
                },
                body : JSON.stringify(credentials)
            })

            const result = await response.json();

            if(response.ok){
                alert(result.message)
                localStorage.setItem("userEmail", result.email);
                
            }else{
                setError(result.error);
            }
        }catch(error){
            setError("Kuch to gadbad h , Dayaaa")
            console.error(error)
        }
       
      
    }
    
  return (
    <>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input type='email' name='email' placeholder='email' onChange={handleChange}></input>
        <input type='password' name='passwordHash' placeholder='password' onChange={handleChange}></input>
        <button type="submit">Login</button>
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}
    </>
  )
}
