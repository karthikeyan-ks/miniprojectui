import React from 'react';
import { Skeleton } from '@mui/material';

function SkeletonLoad({ loading }) {
  return (
    <div>
      {loading ? (
        // Display skeleton loading state
        <div>
          <Skeleton animation="wave" variant="rectangular" width={200} height={100} />
          <Skeleton animation="wave" variant="text" />
          <Skeleton animation="wave" variant="text" />
        </div>
      ) : (
        // Display content when not loading
        <div>
          {/* Your content goes here */}
          <h2>Loaded Content</h2>
          <p>This is some content.</p>
        </div>
      )}
    </div>
  );
}
export default SkeletonLoad;