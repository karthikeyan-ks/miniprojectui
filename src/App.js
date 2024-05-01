import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import LoginPage from './LoginPage';
import Existing from './pages/Existing';
import Issued from './pages/Issued';
import Pending from './Pending';
import Review from './Review';
import Appbar from './pages/Appbar';    
import History from './pages/History';
import ProgressBar from './components/ProgressBar';
import Skeleton from '@mui/material/Skeleton'   
import { createTheme } from '@mui/material/styles';
import { CssBaseline, ThemeProvider } from '@mui/material';
import MyProvider from './components/Connection';
import Index from './pages/Index';
import useMediaQuery from '@mui/material/useMediaQuery';

function App() {
    const [isLoading, setIsLoading] = useState(false); 
    const [progress, setProgress] = useState(0);
    const [prefernce,setPreference]=useState(false)
    const handlePrefence=()=>{
        console.log("called for changing theme");
        setPreference(!prefernce)
    }
    useEffect(()=>{
        console.log("change in progress",progress)
    },[progress])
    
    useEffect(()=>{
        
    },[prefernce])
    const MyTheme = createTheme({
        palette: {
                mode:prefernce?'dark':'light'
            }
        }
    );
    return (
    <ThemeProvider theme={MyTheme}>
        <CssBaseline/>
        <MyProvider>
            <Router>
                <ProgressBar progress={progress}/>
                <div>
                    <div className="App-content">
                        <Routes>
                            <Route path='' element={<Index/>}/>
                            <Route path='/' element={
                                    <div>
                                        <Appbar/>
                                        <Outlet/>
                                    </div>
                                    }>
                                <Route path='/existing' element={<Existing/>}/>
                                <Route path='/issued' element={<Issued/>}/>
                                <Route path='/pending' element={<Pending/>}/>
                                <Route path='/review' element={<Review/>}/>

                            </Route>
                            <Route path='/login'  element={<LoginPage preference={handlePrefence}/>}/>
                            <Route path='/history' element={<History/>}/>
                        </Routes>
                    </div>  
                </div>
            </Router>
       
        </MyProvider>
    </ThemeProvider>
    )    
}

export default App;
{/*{currentPage === 'home' && <Home progress={handleProgress} />}
                                        {currentPage === 'create' && <Create progress={handleProgress} />}
                                        {currentPage === 'existing' && <Existing progress={handleProgress} />}
                                        {currentPage === 'issued' && <Issued progress={handleProgress} />}
                                        {currentPage === 'pending' && <Pending />}
                                        {currentPage === 'review' && <Review />}
                                {currentPage === 'History' && <History progress={handleProgress} />}*/}