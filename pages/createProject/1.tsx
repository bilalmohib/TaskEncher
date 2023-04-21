import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CloseIcon from '@mui/icons-material/Close';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import { BsBorderStyle } from 'react-icons/bs';
import { motion } from 'framer-motion';

const SimpleComponent: React.FC = () => {
    return (
        <div className='main-container'>
            <span style={{ position: 'absolute', left: '25px', top: '15.5px' }}>
                <ArrowBackIcon style={{ fontSize: '18px', color: '$211F1E' }} />
            </span>
            <span style={{ flex: 1, textAlign: 'center', marginBottom: '400px' }}>
                <div>
                    <h2 style={{ fontSize: '32px', lineHeight: '40px', fontWeight: '400', color: '$211F1E', fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Helvetica,Arial,sans-serif' }}>Create a new project</h2>
                    <h4 style={{ fontSize: '20px', lineHeight: '20px', fontWeight: '400', color: '$211F1E', fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Helvetica,Arial,sans-serif' }}>how would you like to start?</h4>
                </div>
  
                <span className='buttonSpan'>
                    <span style={{display:'inline-block', marginRight: '20px'}}>
                        <Button
                            variant="contained"
                            sx={{
                                marginTop: '100px', borderRadius: '20px', backgroundColor: 'white', border: '1px dashed #B0ABAC', boxShadow: 'none', width: '130px', height: '130px',
                            }}
                        //   startIcon={<AddIcon sx={{color: '#B0ABAC'}} />}
                        >
                            {/* Add */}
                            <AddIcon sx={{ color: '#B0ABAC', fontSize: '35px' }} />
                        </Button>
                        <div style={{ marginTop: '8px', fontWeight: '500', fontSize: '14px' }}>Blank Project</div>
                        <div style={{ fontWeight: '400', fontSize: '14px', fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Helvetica,Arial,sans-serif', color: '0x9C9D9D' }}>Start from scratch</div>
                    </span>
                    <span style={{display:'inline-block', marginRight: '20px'}}>
                        <Button
                            variant="contained"
                            sx={{
                                marginTop: '100px', borderRadius: '20px', backgroundColor: 'white', border: '1px solid #B0ABAC', boxShadow: 'none', width: '130px', height: '130px',
                            }}
                        //   startIcon={<AddIcon sx={{color: '#B0ABAC'}} />}
                        >
                            {/* Add */}
                            {/* <AddIcon sx={{ color: '#B0ABAC', fontSize: '35px' }} /> */}
                            <img alt="" src="https://d3ki9tyy5l5ruj.cloudfront.net/obj/2201b53b56249b2529f04482c2f2049dc1bf1c61/rocket.svg"></img>
                        </Button>
                        <div style={{ marginTop: '8px', fontWeight: '500', fontSize: '14px' }}>Blank Project</div>
                        <div style={{ fontWeight: '400', fontSize: '14px', fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Helvetica,Arial,sans-serif', color: '0x9C9D9D' }}>Start from scratch</div>
                    </span>
                    <span style={{display:'inline-block', marginRight: '20px'}}>
                        <Button
                            variant="contained"
                            sx={{
                                marginTop: '100px', borderRadius: '20px', backgroundColor: 'white', border: '1px solid #B0ABAC', boxShadow: 'none', width: '130px', height: '130px',
                            }}
                        //   startIcon={<AddIcon sx={{color: '#B0ABAC'}} />}
                        >
                            {/* Add */}
                            {/* <AddIcon sx={{ color: '#B0ABAC', fontSize: '35px' }} /> */}
                            <img alt="" src="https://d3ki9tyy5l5ruj.cloudfront.net/obj/f7326bd8ae1afc17da80db6d9ddeaca2d0d654a8/projectCreationImportCsv.svg"></img>
                        </Button>
                        <div style={{ marginTop: '8px', fontWeight: '500', fontSize: '14px' }}>Blank Project</div>
                        <div style={{ fontWeight: '400', fontSize: '14px', fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Helvetica,Arial,sans-serif', color: '0x9C9D9D' }}>Start from scratch</div>
                    </span>
                </span>
            </span>
            <span style={{ position: 'absolute', right: '20px', top: '15.5px' }}>
                <CloseIcon style={{ fontSize: '18px', color: '$211F1E' }} />
            </span>
        </div>
// {/* <motion.div
// initial={{ opacity: 0, y: -50 }}
// animate={{ opacity: 1, y: 0 }}
// transition={{ duration: 0.5 }}
// >
// <h1>Hello, world!</h1>
// <p>This component is being animated using Framer Motion.</p>
// </motion.div>
    );
};

export default SimpleComponent;
