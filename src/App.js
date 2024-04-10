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
import Skeleton from '@mui/material/Skeleton'; // Import Skeleton from @mui/material

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
        <Router>
            <div>
                {isLoggedIn && <Appbar navigateTo={navigateTo} progress={handleProgress} />}
                <div className="App-content">
                    {isLoading ? (
                        <>
                            <Skeleton animation="wave" width={200} height={40} />
                            <Skeleton animation="wave" variant="rectangular" width={300} height={200} />
                            <Skeleton animation="wave" variant="rectangular" width={300} height={200} />
                            <Skeleton animation="wave" variant="rectangular" width={300} height={200} />
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
                            </>
                        ) : (
                            <LoginPage onLogin={handleLogin} progress={handleProgress} />
                        )
                    )}
                </div>
            </div>
        </Router>
    )
}

export default App;
