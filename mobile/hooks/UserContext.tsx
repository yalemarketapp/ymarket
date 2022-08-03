import { createContext, FC, useState } from 'react'
import { UserType } from '../types'

type UserContextType = { user: UserType; setUser: (user: UserType) => void }
const UserContext = createContext<UserContextType>({} as UserContextType)

export const UserProvider: FC = ({ children }) => {
  const [user, setUser] = useState<UserType>({} as UserType)

  return <UserContext.Provider value={{ user, setUser }}>{children}</UserContext.Provider>
}

export default UserContext
