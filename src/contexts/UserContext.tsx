import type { User } from '@/types/user';
import { createContext, useContext } from 'react';
import type { ReactNode } from 'react';

interface UserContextValue {
	user:User  | null;
}

const UserContext = createContext<UserContextValue | undefined>(undefined);

export function UserProvider({ user, children }: { user: User | null; children: ReactNode }) {
	return (
		<UserContext.Provider value={{ user }}>
			{children}
		</UserContext.Provider>
	);
}

// eslint-disable-next-line react-refresh/only-export-components
export function useUser() {
	const context = useContext(UserContext);
	
	if (context === undefined) {
		throw new Error('useUser must be used within a UserProvider');
	}

	return context.user;
}
