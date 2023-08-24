import React, { useEffect } from 'react';

const Sending = () => {

     //Slide to Top
     useEffect(() => {
        window.scrollTo(0, 0)
      }, []);

    return (
        <div className='h-[100vh] bg-bgclr flex items-center justify-center text-primary'>
            <div className='bg-white h-[150px] w-[200px] flex items-center justify-center rounded-lg'>
                <h2 className='text-xl font-semibold'>Sending...</h2>
            </div>
        </div>
    );
};

export default Sending;