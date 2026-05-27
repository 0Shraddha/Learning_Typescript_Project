import { useState } from "react"

type AuthUser = {
    name : string,
    email : string
}

export const LoggedIn = () => {

    const [user, setUser] = useState<AuthUser | null>(null); //specifying type explicilty... this means the user will be either type null or type AuthUser  

    const handleLogin = () => {
        setIsLoggedIn(true);
        setUser({
            name : 'Shraddha',
            email : 'shraddha@gmail.com'
        })
    }
    const handleLogout = () => {
        setIsLoggedIn(false);
        setUser(null);
    }

    const [isLoggedIn, setIsLoggedIn] = useState(false)
    
    return (
        <>
        <button onClick={handleLogin}>Login</button>
        <button onClick={handleLogout}>Logiout</button>

        <div>User is {isLoggedIn ? 'logged in' : 'logged out'}. 
            <p>Name = {user?.name}
            <p>Email = {user?.email}</p>

            </p>
        </div>
        </>
    )
}