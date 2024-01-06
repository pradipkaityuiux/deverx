import "./App.css"
import { db } from "./firebaseConfig";
import { collection, getDocs, doc, setDoc } from "firebase/firestore";
import Useronbording from './Onboarding/useronbording';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from 'react-hot-toast'

function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries:{
        staleTime: 60*1000
      }
    }
  })
  

  return (
    <QueryClientProvider client={queryClient}>
      <Useronbording/>
      <Toaster position='top-center' gutter={12} containerStyle={{margin: '8px'}} toastOptions={{
        success:{
          duration: 3000
        },error:{
          duration: 5000
        },style:{
          fontSize: "16px",
          maxWidth: "400px",
          padding: "16px 24px",
          backgroundColor: "#FFF",
          color: "#374151"
        }
      }}/>
    </QueryClientProvider>
  )
}

export default App
