import { createContext, useContext } from 'react';
import type { ReactNode } from 'react';

interface YearContextValue {
	year: number;
}

const YearContext = createContext<YearContextValue | undefined>(undefined);

export function YearProvider({ year, children }: { year: number; children: ReactNode }) {
	return (
		<YearContext.Provider value={{ year }}>
			{children}
		</YearContext.Provider>
	);
}

// eslint-disable-next-line react-refresh/only-export-components
export function useYear() {
	const context = useContext(YearContext);
	if (context === undefined) {
		// Default to current year if no provider
		return { year: new Date().getFullYear() };
	}
	return context;
}
