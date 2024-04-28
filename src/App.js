import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './Home';
import LoginPage from './LoginPage';
import Create from './Create';
import Existing from './Existing';
import Issued from './Issued';
import Pending from './Pending';
import Review from './Review';
import Appbar from './Appbar';
import History from './History';
import ProgressBar from './components/ProgressBar';
import Skeleton from '@mui/material/Skeleton'
import MyTheme from './components/MyTheme';
import { ThemeProvider } from '@mui/material';

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [currentPage, setCurrentPage] = useState('existing');
    const [isLoading, setIsLoading] = useState(false); // Initialize as false
    const [progress, setProgress] = useState(0);

    const handleLogin = () => {
        setIsLoading(true); // Start loading when login process starts
        setTimeout(() => {
            setIsLoggedIn(true);
            setIsLoading(false); // Set loading to false once login is successful
        }, 1000);
    };

    const navigateTo = (page) => {
        setCurrentPage(page);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Simulate fetching data
                setIsLoading(true); // Start loading
                setTimeout(() => {
                    setIsLoading(false); // Set loading to false after data is fetched
                }, 1000);
            } catch (error) {
                console.error('Error fetching data:', error);
                setIsLoading(false);
            }
        };
        fetchData();
    }, [currentPage]);

    const handleProgress = (val) => {
        setProgress(val);
    };

    return (
    <ThemeProvider theme={MyTheme}>
         <Router>
            <ProgressBar progress={progress}/>
            <div>
                {isLoggedIn && <Appbar navigateTo={navigateTo} progress={handleProgress} />}
                <div className="App-content">
                    {isLoading ? (
                        <>
                            <Skeleton animation="wave" width="90%" sx={{margin:"10px"}} height={40} />
                            <Skeleton animation="wave" width="90%" variant="rectangular" sx={{margin:"10px"}} height={100} />
                            <Skeleton animation="wave" variant="rectangular" width="90%" height={100} sx={{margin:"10px"}} />
                            <Skeleton animation="wave" variant="rectangular" width="90%" height={100} sx={{margin:"10px"}} />
                        </>
                    ) : (
                        isLoggedIn ? (
                            <>
                                {currentPage === 'home' && <Home progress={handleProgress} />}
                                {currentPage === 'create' && <Create progress={handleProgress} />}
                                {currentPage === 'existing' && <Existing progress={handleProgress} />}
                                {currentPage === 'issued' && <Issued progress={handleProgress} />}
                                {currentPage === 'pending' && <Pending />}
                                {currentPage === 'review' && <Review />}
                                {currentPage === 'History' && <History progress={handleProgress} />}
                            </>
                        ) : (
                            <LoginPage onLogin={handleLogin} progress={handleProgress} />
                        )
                    )}
                </div>
            </div>
        </Router>
    </ThemeProvider>
    )    
}

export default App;
