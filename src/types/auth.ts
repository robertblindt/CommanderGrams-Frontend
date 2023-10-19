

type UserType = {
    id: number,
    firstName: string,
    lastName: string,
    username: string,
    email: string,
    password?: string,
    confirmPassword?:string,
    token?: string,
    userId?: number
}


export default UserType