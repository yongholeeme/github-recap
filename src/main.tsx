import {StrictMode} from 'react'

import {createAsyncStoragePersister} from '@tanstack/query-async-storage-persister'
import {QueryClient} from '@tanstack/react-query'
import {PersistQueryClientProvider} from '@tanstack/react-query-persist-client'
import {RouterProvider, createRouter} from '@tanstack/react-router'
import ReactDOM from 'react-dom/client'
import './index.css'

// i18n 초기화
import '@/libs/i18n'

// Import the generated route tree
import {REACT_QUERY_CACHE_STORAGE_KEY} from '@/constants/storage'
import {routeTree} from '@/routeTree.gen'

// Create a new router instance
const router = createRouter({routeTree})

// Create a query client
const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 1000 * 60 * 60 * 24 * 7, // 7 days
            gcTime: 1000 * 60 * 60 * 24 * 7, // 7 days (formerly cacheTime)
            refetchOnWindowFocus: false,
            refetchOnReconnect: false,
            refetchOnMount: false,
            retry: true,
        },
    },
})

// Create persister
const persister = createAsyncStoragePersister({
    storage: window.localStorage,
    key: REACT_QUERY_CACHE_STORAGE_KEY,
    serialize: JSON.stringify,
    deserialize: JSON.parse,
})

// Register the router instance for type safety
declare module '@tanstack/react-router' {
    interface Register {
        router: typeof router
    }
}

// Render the app
const rootElement = document.getElementById('root')!
if (!rootElement.innerHTML) {
    const root = ReactDOM.createRoot(rootElement)
    root.render(
        <StrictMode>
            <PersistQueryClientProvider
                client={queryClient}
                persistOptions={{
                    persister,
                    maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
                    buster: '',
                }}
            >
                <RouterProvider router={router} />
            </PersistQueryClientProvider>
        </StrictMode>,
    )
}
