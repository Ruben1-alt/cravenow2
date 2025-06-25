import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import store from './REDUX/store.js'
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
const queryClient = new QueryClient


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initiallsOpen={false} /> 
      <Provider store={store}>
         <App />
         </Provider>
    </QueryClientProvider> 
  </StrictMode>,
)