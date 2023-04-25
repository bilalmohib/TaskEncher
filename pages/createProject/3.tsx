import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CloseIcon from '@mui/icons-material/Close';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import Button from '@mui/material/Button';
import { ReactNode, useState } from 'react';
import Stack from '@mui/material/Stack';
import styled from 'styled-components';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const SimpleComponent: React.FC = () => {
    const [value, setValue] = useState(0);
    const [age, setAge] = useState("");
    const [titleValue, settitleValue] = useState('');
    const handletitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        settitleValue(event.target.value);
    };
    const handletabChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };
    const handleChange = (event: SelectChangeEvent) => {
        setAge(event.target.value);
    };
    const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
`;

    const Logo = styled.img`
  height: 40px;
  margin-right: 8px;
`;

    const Boxst = styled.div`
  width: 45%;
`;
    const [selectedButton, setSelectedButton] = useState('button1');

    const handleButtonSelection = (event: React.MouseEvent<HTMLElement>, newSelection: string) => {
        setSelectedButton(newSelection);
    };

    return (
        <div className='main-container'>
            <span style={{ position: 'absolute', left: '25px', top: '15.5px' }}>
                <ArrowBackIcon style={{ fontSize: '18px', color: '$211F1E' }} />
            </span>
            <div style={{ paddingLeft: '70px' }}>
                <h3 style={{ fontWeight: '200', fontSize: '30px' }}>What do you want to do first?</h3>
                <ToggleButtonGroup value={selectedButton} onChange={handleButtonSelection} style={{ display: 'flex', flexDirection: 'row', paddingTop: '30px' }} exclusive>
                    <ToggleButton value="button1" style={{ width: '100%', display: 'flex', justifyContent: 'start', flexDirection: 'row' }}>
                        <img alt="" src="https://d3ki9tyy5l5ruj.cloudfront.net/obj/7ee9486ba089e9f8a3b2054252fc737e25b05631/Add tasks icon.svg" />
                        <div style={{ display: 'flex', justifyContent: 'start', flexDirection: 'column' }}>
                            {/* <span style={{paddingLeft: '20px', fontSize: '16px'}}>{"Start adding tasks".charAt(0).toUpperCase()}</span> */}
                            <span style={{ paddingLeft: '20px', fontSize: '16px', fontWeight: '400' }}>Start adding tasks</span>
                            {/* <span style={{paddingLeft: '20px', fontSize: '14px', }}>Assign, set due dates</span> */}
                            <span style={{ paddingLeft: '20px', fontSize: '14px', color: '#6E6D6F', fontWeight: '300' }}>
                                Assign, set due dates</span>
                        </div>
                    </ToggleButton>
                </ToggleButtonGroup>
                <ToggleButtonGroup value={selectedButton} onChange={handleButtonSelection} style={{ display: 'flex', flexDirection: 'row', paddingTop: '20px' }} exclusive>
                    <ToggleButton value="button2" style={{ width: '100%', display: 'flex', justifyContent: 'start', flexDirection: 'row' }}>
                        <img alt="" src="https://d3ki9tyy5l5ruj.cloudfront.net/obj/4257c35cade030e3f6ec1ad4d70bb1148d54c315/Share icon.svg" />

                        <div style={{ display: 'flex', justifyContent: 'start', flexDirection: 'column', alignItems: 'start', }}>
                            {/* <span style={{paddingLeft: '20px', fontSize: '16px'}}>{"Start adding tasks".charAt(0).toUpperCase()}</span> */}
                            <span style={{ paddingLeft: '20px', fontSize: '16px', fontWeight: '400' }}>Share with teammates</span>
                            {/* <span style={{paddingLeft: '20px', fontSize: '14px', }}>Assign, set due dates</span> */}
                            <span style={{ paddingLeft: '20px', fontSize: '14px', fontWeight: '300' }}>
                                Collaborate and stay in sync</span>
                        </div>
                    </ToggleButton>
                </ToggleButtonGroup>
                <ToggleButtonGroup value={selectedButton} onChange={handleButtonSelection} style={{ display: 'flex', flexDirection: 'row', paddingTop: '20px' }} exclusive>
                    <ToggleButton value="button3" style={{ width: '100%', display: 'flex', alignItems: 'start', justifyContent: 'start', flexDirection: 'row' }}>
                        <img alt="" src="https://d3ki9tyy5l5ruj.cloudfront.net/obj/db740ac785e615f35df26717e4cb873ebf192b13/Workflow%20icon.svg" />

                        <div style={{ display: 'flex', justifyContent: 'start', alignItems: 'start', flexDirection: 'column' }}>
                            {/* <span style={{paddingLeft: '20px', fontSize: '16px'}}>{"Start adding tasks".charAt(0).toUpperCase()}</span> */}
                            <span style={{ paddingLeft: '20px', fontSize: '16px', fontWeight: '400' }}>Set up Workflow</span>
                            {/* <span style={{paddingLeft: '20px', fontSize: '14px', }}>Assign, set due dates</span> */}
                            <span style={{ paddingLeft: '20px', fontSize: '14px', fontWeight: '300' }}>
                                Automate and visualize your team'process</span>
                        </div>
                    </ToggleButton>
                </ToggleButtonGroup>
                {/* <Box component="form"
      sx={{
        '& > :not(style)': { m: 0, width: '100px', paddingTop: '5px' },
      }}
      noValidate
      autoComplete="off"
    >
      <p>Project Name</p>
      <TextField   id="filled-hidden-label-small"
  defaultValue="Small"
  variant="filled"
  size="small" style={{width: '400px', height:'20px', paddingTop: '10px'}} />
    </Box> */}


                <div style={{ paddingTop: '50px' }}>
                    <div style={{ paddingTop: '20px' }}>
                        <Button variant="contained" sx={{ width: '400px' }}>Continue</Button>
                    </div>
                </div>
            </div>
            <span style={{ position: 'absolute', right: '0px', bottom: '20px', border: '2px solid #D0CBCB', borderRadius: '4px', boxShadow: '1px 2px 9px #D0CBCB' }}>
                <div style={{ position: 'absolute', top: '15px', left: '70px', fontWeight: '500' }}>{titleValue}</div>
                {/* <Box sx={{ width: '100%' }}> */}
                {/* <Box sx={{ borderBottom: 1, borderColor: 'divider' }}> */}
                <div style={{ position: 'absolute', top: '35px', left: '70px', display: 'flex' }}>
                    <p style={{ color: '#6d6e6f', fontSize: '15px', fontWeight: '500' }}>Overview</p>
                    <div style={{ paddingLeft: '15px' }}>
                        {(selectedButton === "button1" || selectedButton === "button2") ? <p style={{ color: '#236BC4', fontSize: '15px', fontWeight: '500' }}>List</p> : <p style={{ color: '#6d6e6f', fontSize: '15px', fontWeight: '500' }}>List</p>}
                        {(selectedButton === "button1" || selectedButton === "button2") ? <hr
                            style={{
                                borderTop: '3px solid #236BC4',
                                textShadow: 'none',
                                boxShadow: 'none',
                                position: 'relative', bottom: '7px'
                            }}
                        /> : <div></div>
                        }
                    </div>
                    <div style={{ paddingLeft: '15px' }}>
                        {/* <p style={{color: '#6d6e6f', fontSize: '15px', fontWeight: '500'}}>Board</p> */}
                         <p style={{ color: '#6d6e6f', fontSize: '15px', fontWeight: '500' }}>Board</p>
                        {/* <hr style={{borderTop: '3px solid black', position: 'relative', bottom: '7px'}} /> */}
                    </div>
                    <div style={{ paddingLeft: '15px' }}>
                        {/* <p style={{color: '#6d6e6f', fontSize: '15px', fontWeight: '500'}}>Timeline</p> */}
                         <p style={{ color: '#6d6e6f', fontSize: '15px', fontWeight: '500' }}>Timeline</p>
                        {/* <hr style={{borderTop: '3px solid black', position: 'relative', bottom: '7px'}} /> */}
                    </div>
                    <div style={{ paddingLeft: '15px' }}>
                        {/* <p style={{color: '#6d6e6f', fontSize: '15px', fontWeight: '500'}}>Calender</p> */}
                        <p style={{ color: '#6d6e6f', fontSize: '15px', fontWeight: '500' }}>Calender</p>
                        {/* <hr style={{borderTop: '3px solid black', position: 'relative', bottom: '7px'}} /> */}
                    </div>
                    <div style={{ paddingLeft: '15px' }}>
                    {(selectedButton === "button3") ? <p style={{ color: '#236BC4', fontSize: '15px', fontWeight: '500' }}>Workflow</p> : <p style={{ color: '#6d6e6f', fontSize: '15px', fontWeight: '500' }}>Workflow</p> }
                        {(selectedButton === "button3") ? <hr
                            style={{
                                borderTop: '3px solid #236BC4',
                                textShadow: 'none',
                                boxShadow: 'none',
                                position: 'relative', bottom: '7px'
                            }}
                        /> : <div></div>
                        }
                        
                        {/* <hr style={{borderTop: '3px solid black', position: 'relative', bottom: '7px'}} /> */}
                    </div>
                </div>
                {/* </Box> */}
                {/* </Box> */}
                {(selectedButton === "button1") ? <img src="https://d3ki9tyy5l5ruj.cloudfront.net/obj/efa34dcd90db1f5a77cc3f1bb864dd3d91def55d/List,%20no%20avatars.png" width="850px" height="600px" alt="" /> : (selectedButton === "button2") ? <img src="https://d3ki9tyy5l5ruj.cloudfront.net/obj/d1643e1996e0009941fb6f09811ac6e793d3d09c/List.png" width="850px" height="600px" alt="" /> : (selectedButton === "button3") ? <img src="https://d3ki9tyy5l5ruj.cloudfront.net/obj/ec3bb148be704a89bccd0d1a204b550b66fda19e/Workflow%20preview%20asset.png" width="850px" height="600px" alt="" /> : <img src="" width="850px" height="600px" alt="" />}
            </span>
            <span style={{ position: 'absolute', right: '20px', top: '15.5px' }}>
                <CloseIcon style={{ fontSize: '18px', color: '$211F1E' }} />
            </span>
        </div>
    );
};

export default SimpleComponent;
