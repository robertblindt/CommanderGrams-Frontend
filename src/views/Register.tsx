import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import CategoryType from '../types/category';
import UserType from "../types/auth";
import { register, login } from '../lib/apiWrapper';


type RegisterProps = {
    logUserIn: (user: UserType) => void
    flashMessage: (message:string|null, category: CategoryType|null) => void,
}

export default function Register({ logUserIn, flashMessage }: RegisterProps) {
    const navigate = useNavigate()

    const [userFormData, setUserFormData] = useState<Partial<UserType>>({
            firstName: '', 
            lastName: '', 
            username: '', 
            email: '', 
            password: '',
            confirmPassword: '',
    })

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>):void => {
        setUserFormData({...userFormData, [e.target.name]:e.target.value})
    }

    const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>):Promise<void> => {
        e.preventDefault();
        let response = await register(userFormData)
        if (response.error){
            flashMessage(response.error, 'danger')
        } else {
            const newUser = response.data
            logUserIn(newUser!);
            let loginResponse = await login(userFormData.username!, userFormData.password!)
            localStorage.setItem('token', loginResponse.data?.token!)
            localStorage.setItem('tokenExp', loginResponse.data?.token_expiration!)
            navigate('/')
        }
        
    }

    const validatePasswords = (password:string,confirmPassword:string) => {
        return (password.length > 7 && password == confirmPassword)
    }

    const validPasswords:boolean = validatePasswords(userFormData.password!,userFormData.confirmPassword!);
    

    return (
        <>
        
        <Card className="my-3 border border-dark border-2 rounded-3 grad high-card-shadow">
            <Card.Body>
                <div className="text-center fs-1 ws-font">Register</div>
                <Form onSubmit={handleFormSubmit}>
                    <Form.Label className='ws-font'>First Name</Form.Label> 
                    <Form.Control className="custom-form-input" name='firstName' value={userFormData.firstName} onChange={handleInputChange}/>

                    <Form.Label className='ws-font'>Last Name</Form.Label>
                    <Form.Control  className="custom-form-input" name='lastName' value={userFormData.lastName} onChange={handleInputChange}/>

                    <Form.Label className='ws-font'>Email</Form.Label>
                    <Form.Control className="custom-form-input"  name='email' type='email' value={userFormData.email} onChange={handleInputChange}/>

                    <Form.Label className='ws-font'>Username</Form.Label>
                    <Form.Control className="custom-form-input"  name='username' value={userFormData.username} onChange={handleInputChange}/>

                    <Form.Label className='ws-font'>Password</Form.Label>
                    <Form.Control className="custom-form-input-pw"  name='password' type='password' value={userFormData.password} onChange={handleInputChange}  placeholder='Password must be at least 8 characters long'/>
                    
                    <Form.Label className='ws-font'>Confirm Password</Form.Label>
                    <Form.Control className="custom-form-input-pw" name='confirmPassword' type='password' value={userFormData.confirmPassword} onChange={handleInputChange}  placeholder='Passwords must match'/>

                    <Button type='submit' className="w-100 mt-3 btn-shadow" variant='outline-dark' disabled={!validPasswords}>Register</Button>

                    {!validPasswords && <Form.Text className='text-danger'>Your password must be at least 8 characters long and must match</Form.Text>}
                    </Form>
            </Card.Body>
        </Card>
        </>
)
}