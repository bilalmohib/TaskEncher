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
            <span style={{ flex: 1, textAlign: 'center', paddingBottom: '50px'}}>
                <div>
                    <h2 style={{ fontSize: '32px', lineHeight: '40px', fontWeight: '400', color: '$211F1E', fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Helvetica,Arial,sans-serif' }}>Create a new project</h2>
                    <h4 style={{ fontSize: '20px', lineHeight: '20px', fontWeight: '400', color: '$211F1E', fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Helvetica,Arial,sans-serif' }}>how would you like to start?</h4>
                </div>
  
                <span className='buttonSpan'>
                    <span style={{display:'inline-block', marginRight: '20px', marginTop:'50px'}}>
                        <Button
                            variant="contained"
                            sx={{
                                '&:hover': {
                                    backgroundColor: 'white',
                                    boxShadow:'none'
                                  },
                                 borderRadius: '20px', backgroundColor: 'white', border: '1px dashed #B0ABAC', boxShadow: 'none', width: '130px', height: '130px',
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
                                '&:hover': {
                                    backgroundColor: 'white',
                                    boxShadow:'none'
                                  },
                                borderRadius: '20px', backgroundColor: 'white', border: '1px solid #B0ABAC', boxShadow: 'none', width: '130px', height: '130px',
                            }}
                        //   startIcon={<AddIcon sx={{color: '#B0ABAC'}} />}
                        >
                            {/* Add */}
                            {/* <AddIcon sx={{ color: '#B0ABAC', fontSize: '35px' }} /> */}
                            <img alt="" src="https://d3ki9tyy5l5ruj.cloudfront.net/obj/2201b53b56249b2529f04482c2f2049dc1bf1c61/rocket.svg"></img>
                        </Button>
                        <div style={{ marginTop: '8px', fontWeight: '500', fontSize: '14px' }}>Use a template</div>
                        <div style={{ fontWeight: '400', fontSize: '14px', fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Helvetica,Arial,sans-serif', color: '0x9C9D9D' }}>Choose from library</div>
                    </span>
                    <span style={{display:'inline-block', marginRight: '20px'}}>
                        <Button
                            variant="contained"
                            sx={{
                                '&:hover': {
                                    backgroundColor: 'white',
                                    boxShadow:'none'
                                  },
                                 borderRadius: '20px', backgroundColor: 'white', border: '1px solid #B0ABAC', boxShadow: 'none', width: '130px', height: '130px',
                            }}
                        //   startIcon={<AddIcon sx={{color: '#B0ABAC'}} />}
                        >
                            {/* Add */}
                            {/* <AddIcon sx={{ color: '#B0ABAC', fontSize: '35px' }} /> */}
                            <img alt="" src="https://d3ki9tyy5l5ruj.cloudfront.net/obj/f7326bd8ae1afc17da80db6d9ddeaca2d0d654a8/projectCreationImportCsv.svg"></img>
                        </Button>
                        <div style={{ marginTop: '8px', fontWeight: '500', fontSize: '14px' }}>Import spreadsheet</div>
                        <div style={{ fontWeight: '400', fontSize: '14px', fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Helvetica,Arial,sans-serif', color: '0x9C9D9D' }}>Add from another tool</div>
                    </span>
                </span>
                <p style={{marginTop: '50px', paddingRight: '280px', fontSize: '20px'}}>Recommended for you</p>
                <div style={{ display: 'flex', justifyContent: 'center', paddingRight:'50px' }}>
                <Button
  variant="contained"
  sx={{
    display: 'flex',
    flexDirection: 'row',
    justifyContent:'start',
    alignItems: 'center',
    '&:hover': {
      backgroundColor: 'white',
      boxShadow:'none'
    },
    marginTop: '0px',
    marginLeft: '10px',
    borderRadius: '10px',
    backgroundColor: 'white',
    border: '1px solid #B0ABAC',
    boxShadow: 'none',
    width: '455px',
    height: '60px',
  }}
>
  <img alt="" style={{paddingLeft:'10px'}} src="https://d3ki9tyy5l5ruj.cloudfront.net/obj/74fa97c0ad7c73347e8c44e146d704134cc743d8/creative-requests.svg" />
  <p style={{ color: 'black', margin: 'auto 0', paddingLeft: '10px' }}>Work Requests</p>
</Button>
</div>
<div style={{ display: 'flex', justifyContent: 'center', paddingRight:'50px' }}>
                <Button
  variant="contained"
  sx={{
    display: 'flex',
    flexDirection: 'row',
    justifyContent:'start',
    alignItems: 'center',
    '&:hover': {
      backgroundColor: 'white',
      boxShadow:'none'
    },
    marginTop: '15px',
    marginLeft: '10px',
    borderRadius: '10px',
    backgroundColor: 'white',
    border: '1px solid #B0ABAC',
    boxShadow: 'none',
    width: '455px',
    height: '60px',
  }}
>
<img alt="" style={{paddingLeft:'10px'}} src="https://d3ki9tyy5l5ruj.cloudfront.net/obj/fe1cf50de4537694051592d96cdae769a86714b4/campaign-management.svg" />
  <p style={{ color: 'black', margin: 'auto 0', paddingLeft: '10px' }}>Cross-Functional Project Plan</p>
</Button>
</div>
<div style={{ display: 'flex', justifyContent: 'center', paddingRight:'50px' }}>
                <Button
  variant="contained"
  sx={{
    display: 'flex',
    flexDirection: 'row',
    justifyContent:'start',
    alignItems: 'center',
    '&:hover': {
      backgroundColor: 'white',
      boxShadow:'none'
    },
    marginTop: '15px',
    marginLeft: '10px',
    borderRadius: '10px',
    backgroundColor: 'white',
    border: '1px solid #B0ABAC',
    boxShadow: 'none',
    width: '455px',
    height: '60px',
  }}
>
<img alt="" style={{paddingLeft:'10px'}} src="https://d3ki9tyy5l5ruj.cloudfront.net/obj/afd9581a12196328d27ca449daabf0c756435497/editorial-calendar.svg" />
  <p style={{ color: 'black', margin: 'auto 0', paddingLeft: '10px' }}>Meeting Agenda</p>
</Button>
</div>
            </span>
            <span style={{ position: 'absolute', right: '20px', top: '15.5px' }}>
                <CloseIcon style={{ fontSize: '18px', color: '$211F1E' }} />
            </span>
        </div>
    );
};

export default SimpleComponent;
