import "./App.css"
import { db } from "./firebaseConfig";
import { collection, getDocs, doc, setDoc } from "firebase/firestore";
import Useronbording from './Onboarding/Useronbording';
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import toast, { Toaster } from 'react-hot-toast'
import { getAuth } from "firebase/auth";
import BlogsLanding from "./MainPages/AllBlogs/BlogsLanding";
import WriteNewBlog from "./MainPages/CreateBlog/WriteNewBlog"
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Layout from "./MainPages/Layout";
import UserProfile from "./MainPages/UserProfile/UserProfile";

function App() {
  const auth = getAuth();
  const user = auth.currentUser;
  const queryClient = new QueryClient({
    defaultOptions: {
      queries:{
        staleTime: 60*1000
      }
    }
  })
  

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false}/>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout/>}>
            <Route index element={<Useronbording/>}/>
            <Route path="/" element={<Useronbording/>}/>
            {/* <Route index element={<Navigate replace to="/blog"/>}/> */}
            <Route path='/blog' element={<BlogsLanding/>}/>
            <Route path="/write-new-blog" element={<WriteNewBlog/>}/>
            <Route path="/user-profile/:username" element={<UserProfile/>}/>
          </Route>
        </Routes>
      
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
      </BrowserRouter>
    </QueryClientProvider>
  )
}

export default App
