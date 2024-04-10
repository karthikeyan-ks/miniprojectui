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

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [currentPage, setCurrentPage] = useState('existing');
    const [isLoading, setIsLoading] = useState(false); // State to track loading status

    const handleLogin = () => {
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
                await fetchDataAsync();
                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setIsLoading(false);
            }
        };
        fetchData();
    }, [currentPage]); 
    const [progress,setProgress]=useState(0)
    const handleProgress=(val)=>{
      setProgress(val)
    }
    const con=()=>{
      console.log("loading....")
    }
    return (
        <Router>
            <div>
            {isLoggedIn && <Appbar navigateTo={navigateTo} />} 
                <div className="App-content">
                  <ProgressBar progress={progress}/>
                    {isLoading ? (
                        <div>Loading...
                          {con}
                        </div>
                    ) : (
                        isLoggedIn ? (
                            // Conditional rendering based on currentPage state
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
    );
    async function fetchDataAsync() {
      console.log("loading")
      // Simulate fetching data from an API
      const response = await fetch('https://api.example.com/data');
      const data = await response.json();
    
      // Process the fetched data
      return data;
    }
    
}

export default App;
