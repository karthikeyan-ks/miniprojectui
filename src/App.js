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
import ProgressBar from './components/ProgressBar';
import SkeletonLoad from './components/Skeletion';

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [currentPage, setCurrentPage] = useState('existing');
    const [isLoading, setIsLoading] = useState(false); // State to track loading status
    const [progress,setProgress]=useState(0)
    const handleLogin = () => {
        console.log("loading handlelogin...")
      setTimeout(()=>{
        setIsLoggedIn(true);
      },1000)  
    };

    const navigateTo = (page) => {
        setCurrentPage(page);
    };

    useEffect(() => {
        setIsLoading(true);
        const fetchData = async () => {
            try {
                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setIsLoading(false);
            }
        };
        fetchData();
    }, [currentPage]); 
    
    const handleProgress=(val)=>{
      setProgress(val)
    }
    const con=()=>{
      console.log("loading....")
    }
    return (
        <Router>
            <div>
            <ProgressBar progress={progress}/>
            {isLoggedIn && <Appbar navigateTo={navigateTo} progress={handleProgress} />} 
                <div className="App-content">
                 
                    {isLoading ? (
                        <SkeletonLoad/>
                    ) : (
                        isLoggedIn ? (
                            <>
                                {currentPage === 'home' && <Home progress={handleProgress} />}
                                {currentPage === 'create' && <Create progress={handleProgress}/>}
                                {currentPage === 'existing' && <Existing progress={handleProgress} />}
                                {currentPage === 'issued' && <Issued progress={handleProgress} />}
                                {currentPage === 'pending' && <Pending  />}
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
