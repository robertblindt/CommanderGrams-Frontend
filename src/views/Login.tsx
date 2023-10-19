import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import UserType from '../types/auth'
import CategoryType from '../types/category'
import { login, getMe } from '../lib/apiWrapper'



type LoginProps = {
    isLoggedIn: boolean
    logUserIn: (user:UserType) => void
    flashMessage: (message:string|null, category:CategoryType|null) => void
}

export default function Login({ isLoggedIn, logUserIn, flashMessage }: LoginProps) {
    
    const navigate = useNavigate()
    
    if (isLoggedIn){
        flashMessage(`User is already logged in`, 'success');
        navigate('/');
    }

    const [user, setUser] = useState<Partial<UserType>>({username:'', password:''})


    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>):void => {
        setUser({...user, [e.target.name]:e.target.value})
    }

    const handleFormSubmit = async (e: React.FormEvent):Promise<void> => {
        e.preventDefault();
        const response = await login(user.username!,user.password!)
        console.log(response)
        if (response.error){
            flashMessage(response.error, 'danger')
        } else {
            localStorage.setItem('token',response.data?.token as string);
            localStorage.setItem('tokenExp', response.data?.token_expiration as string)
            const userResponse = await getMe(response.data?.token as string)
            logUserIn(userResponse.data!);
            navigate('/');
        }
        
        // setIsLoggedIn(!isLoggedIn)

    }

    const validPassword = (password:string):Boolean => password.length > 7
    return (
        <>
        <Card className='my-3 border border-dark border-2 rounded-3 grad high-card-shadow'>
            <Card.Body>
                <div className='text-center fs-1 ws-font'>Login</div>
                <Form onSubmit={handleFormSubmit}>
                    <Form.Label className='ws-font'>Username</Form.Label>
                    <Form.Control className="custom-form-input" name='username' value={user.username} onChange={handleInputChange}/>
                    <Form.Label className='ws-font'>Password</Form.Label>
                    <Form.Control className="custom-form-input" type='password' name='password' value={user.password} onChange={handleInputChange}/>
                    <Button type='submit' variant='outline-dark' className='w-100 mt-3 btn-shadow' disabled={!validPassword(user.password!)}>Submit</Button>
                </Form>
            </Card.Body>
        </Card>
        </>
    )
}