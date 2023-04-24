import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CloseIcon from '@mui/icons-material/Close';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import { BsBorderStyle } from 'react-icons/bs';
import { motion } from 'framer-motion';
import { useState } from 'react';
import logo from './logo.png';
import Stack from '@mui/material/Stack';
import styled from 'styled-components';

const SimpleComponent: React.FC = () => {
  
  const [age, setAge] = useState("");

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
            <div style={{paddingLeft:'70px'}}>
              <h3 style={{fontWeight: '200'}}>New Project</h3>
              <Stack
      component="form"
      sx={{
        paddingTop: '20px',
        width: '25ch',
      }}
      spacing={2}
      noValidate
      autoComplete="off"
    >
      <p>Project Name</p>
      <TextField
      style={{width: '400px', bottom: '15px'}}
        hiddenLabel
        id="filled-hidden-label-small"
        variant="filled"
        size="small"
      />
    </Stack>
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

    <FormControl style={{paddingTop: '10px', width: '400px'}}>
    <p>Privacy</p>
        <Select
        style={{height: '36px'}}
          value={age}
          onChange={handleChange}
          displayEmpty
          inputProps={{ 'aria-label': 'Without label' }}
        >
          <MenuItem value="">
            <em>Public to my Workspace</em>
          </MenuItem>
          <MenuItem value={10}>Private to my project members</MenuItem>
        </Select>
      </FormControl>
      <div style={{paddingTop: '50px'}}>
        <p>Default view</p>
      <Container style={{display: 'flex', flexDirection: 'column'}}>
        
        {/* <Box sx={{display:'inline-flex',flexDirection:'row',justifyContent:'center'}}>
 <Logo style={{}} src="https://d3ki9tyy5l5ruj.cloudfront.net/obj/8101993eb31d0de88ea18fe53fc8e58a1b8988be/nux_project_list.svg" />

          <p style={{margin:0}}>Content 1</p>
        </Box> */}
      
          {/* <img src="https://d3ki9tyy5l5ruj.cloudfront.net/obj/8101993eb31d0de88ea18fe53fc8e58a1b8988be/nux_project_list.svg" alt="" />
          <span>List</span> */}
       {/* <ToggleButtonGroup value={selectedButton} onChange={handleButtonSelection} style={{display: 'flex', flexDirection: 'column'}} exclusive>
      <ToggleButton value="button1" style={{ width: '190px', display: 'flex', justifyContent: 'start' }}>
        <img src="https://d3ki9tyy5l5ruj.cloudfront.net/obj/8101993eb31d0de88ea18fe53fc8e58a1b8988be/nux_project_list.svg" alt="" />
          <span style={{paddingLeft: '20px'}}>List</span>
      </ToggleButton>
      <ToggleButton value="button2" style={{ width: '190px', display: 'flex', justifyContent: 'start' }}>
      <img alt="" src="https://d3ki9tyy5l5ruj.cloudfront.net/obj/cbdb658422a5978c8942552a903686f836bf1da4/nux_project_boards.svg" />
          <span style={{paddingLeft: '20px'}}>Board</span>
      </ToggleButton>
      <ToggleButton value="button3" style={{ width: '190px', display: 'flex', justifyContent: 'start' }}>
      <img alt="" src="https://d3ki9tyy5l5ruj.cloudfront.net/obj/c42e794d4028b4a6da7bde7356849fe24e66a622/nux_project_timeline.svg" />
          <span style={{paddingLeft: '20px'}}>Timeline</span>
      </ToggleButton>
      <ToggleButton value="button4" style={{ width: '190px', display: 'flex', justifyContent: 'start' }}>
      <img alt="" src="https://d3ki9tyy5l5ruj.cloudfront.net/obj/ce32c12c0e85bac71b4557a786cc5d981f29def8/nux_project_calendar.svg" />
          <span style={{paddingLeft: '20px'}}>Calender</span>
      </ToggleButton>
    </ToggleButtonGroup> */}
    <div style={{paddingTop: '0px', display: 'inline-block'}}>
  {/* <ToggleButtonGroup value={selectedButton} onChange={handleButtonSelection} style={{display: 'flex', flexDirection: 'row'}} >
    <ToggleButton value="button1" style={{ width: '190px' }}>
      <img src="https://d3ki9tyy5l5ruj.cloudfront.net/obj/8101993eb31d0de88ea18fe53fc8e58a1b8988be/nux_project_list.svg" alt="" />
        <span style={{paddingLeft: '20px'}}>List</span>
    </ToggleButton>
    <ToggleButton value="button2" style={{ width: '190px' }}>
      <img alt="" src="https://d3ki9tyy5l5ruj.cloudfront.net/obj/cbdb658422a5978c8942552a903686f836bf1da4/nux_project_boards.svg" />
        <span style={{paddingLeft: '20px'}}>Board</span>
    </ToggleButton>
  </ToggleButtonGroup> */}
  <ToggleButtonGroup value={selectedButton} onChange={handleButtonSelection} style={{display: 'flex', flexDirection: 'row'}} exclusive>
      <ToggleButton value="button1" style={{ width: '190px', display: 'flex', justifyContent: 'start' }}>
        <img src="https://d3ki9tyy5l5ruj.cloudfront.net/obj/8101993eb31d0de88ea18fe53fc8e58a1b8988be/nux_project_list.svg" alt="" />
          <span style={{paddingLeft: '20px'}}>List</span>
      </ToggleButton>
      <div style={{paddingLeft: '10px'}}>
      <ToggleButtonGroup value={selectedButton} onChange={handleButtonSelection} style={{display: 'flex', flexDirection: 'row'}} exclusive>
      <ToggleButton value="button2" style={{ width: '190px', display: 'flex', justifyContent: 'start' }}>
       <img alt="" src="https://d3ki9tyy5l5ruj.cloudfront.net/obj/cbdb658422a5978c8942552a903686f836bf1da4/nux_project_boards.svg" />
          <span style={{paddingLeft: '20px'}}>Board</span>
      </ToggleButton>
      </ToggleButtonGroup>
      </div>
      {/* <ToggleButton value="button3" style={{ width: '190px', display: 'flex', justifyContent: 'start' }}>
      <img alt="" src="https://d3ki9tyy5l5ruj.cloudfront.net/obj/c42e794d4028b4a6da7bde7356849fe24e66a622/nux_project_timeline.svg" />
          <span style={{paddingLeft: '20px'}}>Timeline</span>
      </ToggleButton>
      <ToggleButton value="button4" style={{ width: '190px', display: 'flex', justifyContent: 'start' }}>
      <img alt="" src="https://d3ki9tyy5l5ruj.cloudfront.net/obj/ce32c12c0e85bac71b4557a786cc5d981f29def8/nux_project_calendar.svg" />
          <span style={{paddingLeft: '20px'}}>Calender</span> */}
      {/* </ToggleButton> */}
    </ToggleButtonGroup>
</div>

<div style={{paddingTop: '10px'}}>
    {/* <ToggleButton value="button3" style={{ width: '190px' }}>
      <img alt="" src="https://d3ki9tyy5l5ruj.cloudfront.net/obj/c42e794d4028b4a6da7bde7356849fe24e66a622/nux_project_timeline.svg" />
        <span style={{paddingLeft: '20px'}}>Timeline</span>
    </ToggleButton>
    <ToggleButton value="button4" style={{ width: '190px' }}>
      <img alt="" src="https://d3ki9tyy5l5ruj.cloudfront.net/obj/07da9f7aa26bdfc09cced7a8ec1bb785b11c6ebd/nux_project_calendar.svg" />
        <span style={{paddingLeft: '20px'}}>Calendar</span>
    </ToggleButton> */}
    <ToggleButtonGroup value={selectedButton} onChange={handleButtonSelection} style={{display: 'flex', flexDirection: 'row'}} exclusive>
      <ToggleButton value="button3" style={{ width: '190px', display: 'flex', justifyContent: 'start' }}>
      <img alt="" src="https://d3ki9tyy5l5ruj.cloudfront.net/obj/c42e794d4028b4a6da7bde7356849fe24e66a622/nux_project_timeline.svg" />
          <span style={{paddingLeft: '20px'}}>Timeline</span>
      </ToggleButton>
      <div style={{paddingLeft: '10px'}}>
      <ToggleButtonGroup value={selectedButton} onChange={handleButtonSelection} style={{display: 'flex', flexDirection: 'row'}} exclusive>
      <ToggleButton value="button4" style={{ width: '190px', display: 'flex', justifyContent: 'start' }}>
      <img alt="" src="https://d3ki9tyy5l5ruj.cloudfront.net/obj/ce32c12c0e85bac71b4557a786cc5d981f29def8/nux_project_calendar.svg" />
          <span style={{paddingLeft: '20px'}}>Calender</span>
      </ToggleButton>
      </ToggleButtonGroup>
      </div>
    </ToggleButtonGroup>
</div>
      </Container>
      <div style={{paddingTop: '20px'}}>
      <Button variant="contained" sx={{width: '400px'}}>Continue</Button>
      </div>
      </div>

      {/* <ToggleButtonGroup value={selectedButton} onChange={handleButtonSelection} exclusive>
      <ToggleButton value="button1">Button 1</ToggleButton>
      <ToggleButton value="button2">Button 2</ToggleButton>
      <ToggleButton value="button3">Button 3</ToggleButton>
    </ToggleButtonGroup> */}
            </div>
            <span style={{position: 'absolute', right: '0px', bottom: '30px', border: '2px solid #D0CBCB', borderRadius: '4px', boxShadow:'1px 2px 9px #D0CBCB'}}>
              {(selectedButton === "button1") ? <img src="https://d3ki9tyy5l5ruj.cloudfront.net/obj/efa34dcd90db1f5a77cc3f1bb864dd3d91def55d/List,%20no%20avatars.png" width="850px" height="600px" alt="" /> : (selectedButton === "button2") ? <img src="https://d3ki9tyy5l5ruj.cloudfront.net/obj/621e3fecc417a5455269791daa22b5d5b1feda2b/Board,%20no%20avatars.png" width="850px" height="600px" alt="" /> : (selectedButton === "button3") ? <img src="https://d3ki9tyy5l5ruj.cloudfront.net/obj/bfeb331070017599fda4c96907b2fb7cea28d858/Timeline,%20no%20avatars.png" width="850px" height="600px" alt="" />: <img src="https://d3ki9tyy5l5ruj.cloudfront.net/obj/63306c12043b0a783a7ff409222ce80cc48e1dc1/Calendar,%20no%20avatars.png" width="850px" height="600px" alt="" /> }
            </span>
            <span style={{ position: 'absolute', right: '20px', top: '15.5px' }}>
                <CloseIcon style={{ fontSize: '18px', color: '$211F1E' }} />
            </span>
        </div>
    );
};

export default SimpleComponent;
