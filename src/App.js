import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import LoginPage from './LoginPage';
import Existing from './pages/Existing';
import Issued from './pages/Issued';
import Pending from './pages/Pending';
import Review from './pages/Review';
import Appbar from './pages/Appbar';    
import History from './pages/History';
import ProgressBar from './components/ProgressBar';
import { createTheme } from '@mui/material/styles';
import { CssBaseline, ThemeProvider } from '@mui/material';
import MyProvider from './components/Connection';
import Index from './pages/Index';
import {Box} from '@mui/material';
import { Report } from './pages/Report';

function App() {
    const [progress, setProgress] = useState(0);
    const [prefernce,setPreference]=useState(false)
    const [mode,setMode]=useState(localStorage.getItem('mode'))
    const handlePrefence=()=>{
        console.log("called for changing theme");
        setPreference(!prefernce)
        if(localStorage.getItem('mode')==null){
            localStorage.setItem('light')
            setPreference(false)
        }
        if(prefernce){
            localStorage.setItem('mode','dark')
        }else{
            localStorage.setItem('mode','light')
        }
        setMode(localStorage.getItem('mode'))
        console.log(mode)
    }
    useEffect(()=>{
        console.log("change in progress",progress)
    },[progress])
    
    useEffect(()=>{
        
    },[prefernce,mode])
    const MyTheme = createTheme({
        palette: {
          mode: mode,   
          primary: {
            main: '#00004D',
            ...(mode === 'dark' && {
              light: '#333', 
              contrastText: '#fff',
            }),
            title:"#ff1"
          },
          secondary: {
            main: '#f11', 
            ...(mode === 'dark' && {
              light: '#ff5722', 
              contrastText: '#000',
            }),
          },
          background: {
            paper: mode === 'dark' ? '#222' : '#fff', 
            default: mode === 'dark' ? '#111' : '#eee', 
            main: mode === 'dark' ? '#888' : '#f5f5f5', 
          },
          text: {
            primary: mode === 'dark' ? '#fff' : '#000', 
            secondary: mode === 'dark' ? '#ccc' : '#333', 
          },
        },
      });
    return (
    <ThemeProvider theme={MyTheme}>
        <CssBaseline/>
        <MyProvider>
            <Router>
                <ProgressBar progress={progress}/>
                    <Box className="App-content">
                        <Routes>
                            <Route path='' element={<Index/>}/>
                            <Route path='/report' element={<Report/>}/>
                            <Route path='/' element={
                                    <Box sx={{width:"100%"}}>
                                        <Appbar preference={handlePrefence}/>
                                        <Outlet/>
                                    </Box>
                                    }>
                                <Route path='/existing' element={<Existing preference={handlePrefence} />}/>
                                <Route path='/issued' element={<Issued preference={handlePrefence} />}/>
                                <Route path='/pending' element={<Pending preference={handlePrefence} />}/>
                                <Route path='/review' element={<Review preference={handlePrefence} />}/>

                            </Route>
                            <Route path='/login'  element={<LoginPage preference={handlePrefence}/>}/>
                            <Route path='/history' element={<History/>}/>
                        </Routes>
                    </Box>  
            </Router>
       
        </MyProvider>
    </ThemeProvider>
    )    
}

export default App;