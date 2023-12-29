import React, { useEffect, useState } from 'react'
import {BrowserRouter, Routes, Route, useNavigate, useParams, Link, Navigate} from 'react-router-dom'
import AuthProvider from './ContextAuth'
import {useAuth} from './ContextAuth'
import { retrieveTodosByUsername } from './api/HelloWorldAPIService'


function AuthenticatedRoutes({children}){
    const authContext = useAuth()
    if (authContext.isAuthenticated){
        return children
    }
    return <Navigate to='/' />
}


function TodoApp() {
  return (
    <div className="TodoApp">
        <AuthProvider>
            <BrowserRouter>
                <HeaderComponent />
                    <Routes>
                        <Route path='/' element={<LoginComponent/>} />
                        <Route path='/login' element={<LoginComponent/>} />
                        <Route path='/welcome' element={<AuthenticatedRoutes><WelcomeComponent/></AuthenticatedRoutes>} />
                        <Route path='/todos' element={<AuthenticatedRoutes><ListTodosComponent/></AuthenticatedRoutes>} />
                        <Route path='/logout' element={<AuthenticatedRoutes><LogoutComponent/></AuthenticatedRoutes>} />
                        <Route path='*' element={<ErrorComponent/>} />
                    </Routes>
                <FooterComponent />
            </BrowserRouter>
        </AuthProvider>
        {/* <WelcomeComponent/> */}
    </div>
  )
}

function LoginComponent(){
    const [username, setUsername] = useState("in28minutes")
    const [password, setPassword] = useState('in28minutes')
    const [showFailMessage, setShowFailMessage] = useState(false)
    const navigate = useNavigate()
    const authContext = useAuth()



    function handleSubmit(){
        if (authContext.login(username, password)){
            navigate(`/welcome`)
        }else{
            setShowFailMessage(true)
        }
    }


    return (
        <div className='Login'>
            {showFailMessage && <div className='errorMessage'>Authenticated Failed. Please check your credintials</div>}
            <div className='Loginform'>
                <div>
                    <label htmlFor="username"> User Name </label>
                    <input type='text' name='username' value={username} onChange={(event) => setUsername(event.target.value)}/>
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input type="password" name='password' value={password} onChange={(event) => setPassword(event.target.value)}/>
                </div>
                <div>
                    <button type='button' name='login' onClick={handleSubmit}>Login</button>
                </div>
            </div>
        </div>
    )
}


function WelcomeComponent(){
    const authContext = useAuth()
    const [todos, setTodos] = useState()

    function refreshTodos(){
        retrieveTodosByUsername(authContext.username)
        .then((response) => setTodos(response.data))
        .catch((error) => {console.log(error)})
        .finally(()=>{console.log('cleanup')})
    }

    useEffect(()=> refreshTodos(), [])




    return (
        <div className='Login'>
            Welcome {authContext.username}
            <div>
                Manage your todos - <Link to='/todos'>Go here</Link>
            </div>
        </div>
    )
}
function HeaderComponent(){
    const authContext = useAuth()
    return (
        <div className='header'>
            Header {authContext.username} <hr></hr>
        </div>
    )
}
function FooterComponent(){

    return (
        <div className='footer'>
            <hr></hr>
            Footer 
        </div>
    )
}
function LogoutComponent(){

    return (
        <div className='logout'>
            You are logged out! 
            Thank you for using our app. 
        </div>
    )
}


function ErrorComponent(){
    return (
        <div className='errorComponent'>
            <h1>
                We are working really hard!
            </h1>
            <div>
                Apologies for 404. Reach out to our team at AVC-DEV-GIA. 
            </div>
        </div>
    )
}

function ListTodosComponent(){

    const today = new Date();
    const targetDate = new Date(today.getFullYear()+12, today.getMonth(), today.getDate())


    const todos = [
        { id: 1, description: 'Learn AWS', done: false, targetDate: targetDate },
        { id: 2, description: 'Learn Azure' , done: false, targetDate: targetDate },
        { id: 3, description: 'Learn GCP' , done: false, targetDate: targetDate }
    ]
    return (
        <div className='ListTodosComponent'>
            <h1>Things you want to do </h1>
            <div>
                <table>
                    <thead>
                        <tr>
                            <td>id</td>
                            <td>description</td>
                        </tr>
                    </thead>
                    <tbody>
                        {todos.map(
                            todo => {
                            return (
                                <tr key={todo.id}>
                                    <td>{todo.id}</td>
                                    <td>{todo.description}</td>
                                    <td>{todo.done.toString()}</td>
                                    <td>{todo.targetDate.toDateString()}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}



export default TodoApp