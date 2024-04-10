import React, { useState } from 'react';
import LinearProgress from '@mui/material/LinearProgress';
import { createTheme } from '@mui/material';

const BlackProgressBar = ({progress}) => {
  console.log(progress)
  return (
    <div >
      <LinearProgress sx={{
        background:'black',
        opacity: progress>0 ? 1 : 0,
        height: progress>0 ? "5px" : "0px"
      }} variant="indeterminate" 
      />
    </div>
  );
};

export default BlackProgressBar;
/**
 * <div 
      style={{
        width: '100%',
        backgroundColor: '#262b49',
        height: '5px',
        borderRadius: '4px',
        overflow: 'hidden', // Ensure overflow is hidden to prevent abrupt changes in width
      }}
    >
      <div 
        style={{
          width: `${progress}%`,
          backgroundColor: '#007bff',
          height: '100%',
          borderRadius: '4px',
          transition: 'width 1s ease-in-out', // CSS transition for smooth animation
          opacity: progress>0 ? 1 : 0,
        }}
      ></div>
    </div>
 */