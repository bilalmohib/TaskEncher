import { Icon } from '@mui/material';
import React from 'react';
import { FaPlus, FaSearch, FaBell, } from 'react-icons/fa';
import { MdExtension } from 'react-icons/md';
import { FiSettings } from 'react-icons/fi';
import { AiOutlineMenu } from 'react-icons/ai';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: React.ReactNode;
}
const IconButton: React.FC<IconButtonProps> = ({ icon, children, ...rest }) => {
  
  return (
    <button {...rest}>
      {icon}
      {children}
    </button>
  );
};

const Notifications: React.FC = () => {
  const avatarUrl = 'https://via.placeholder.com/50';
  const [Projects, setProjects] = React.useState('');
  const handleChange = (event: SelectChangeEvent) => {
    setProjects(event.target.value);
  };
  const [isTextAreaOpen, setIsTextAreaOpen] = React.useState(false);

  // Event handler for when the text field is tapped
  const handleTextFieldTap = () => {
    setIsTextAreaOpen(true);
  };
  return (
    <div style={{height: '100%'}}>
      <div style={{boxShadow: '1px 1px 1px #888888', height: '90px'}}>
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <div style={{ flex: 1 }}>
      <h5 style={{ paddingLeft: '30px', paddingTop: '15px' }}>Notifications</h5>
      </div>
      <div style={{display: 'flex', backgroundColor:'white'}}>
        {/* <div style={{ flex: 1 }}>This is some text on the left</div> */}
        {/* <div style={{ marginLeft: '10px' }}><FaIcon /></div> */}
         <IconButton style={{border: 'none', backgroundColor:'white'}} icon={<FaPlus size={'20px'} />}></IconButton>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <IconButton style={{border: 'none', backgroundColor:'white'}} icon={<FaSearch size={'20px'} />} />
        </div>
        <div>
          <IconButton style={{border: 'none', backgroundColor:'white'}} icon={<FaBell size={'20px'} />}></IconButton>
          <IconButton style={{border: 'none', backgroundColor:'white'}} icon={<MdExtension size={'20px'} />}></IconButton>
          <IconButton style={{border: 'none', backgroundColor:'white'}} icon={<FiSettings size={'20px'} />}></IconButton>
          <IconButton style={{border: 'none', backgroundColor:'white'}} icon={<AiOutlineMenu size={'20px'} />}></IconButton>
        </div>
      </div>
      </div>
      <hr 
  style={{
    borderTop: '1px solid grey',
    textShadow: 'none',
    position: 'relative', 
    bottom: '15px',
    boxShadow: 'none' // add this line to disable drop shadow effect
  }} 
/>
<div style={{display:'flex', flexDirection: 'row'}}>
<div style={{position: 'relative', top: '-21px', paddingLeft: '30px'}}><p>Select Project</p></div>
{/* <div style={{position:'absolute', bottom: '-17.5px', paddingLeft: '22vh'}}><p>All Projects</p></div>   */}
</div>

      <FormControl sx={{ m: 1, minWidth: 120, position:'absolute', bottom: '0', top: '33px', paddingLeft: '20vh' }}>
        <Select
        sx={{
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: '#E5E5E5',
            borderWidth: '0px',
        },
        '&:hover .MuiOutlinedInput-notchedOutline': {
          borderColor: '#E5E5E5',
          borderWidth: '0px',
      },
      '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
          // Give the default border color of material ui input
          borderWidth: '0px',
      }
        }}
        style={{border: 'none'}}
                  value={Projects}
          onChange={handleChange}
          displayEmpty
          // inputProps={{  }}
        >
          <MenuItem value="">
            <em style={{color: '#FF6617', fontStyle: 'normal'}}>All projects</em>
          </MenuItem>
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
        {/* <FormHelperText>Without label</FormHelperText> */}
      </FormControl>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', padding: '10px' }}>
      {/* Avatar */}
      <img src={avatarUrl} alt="Avatar" style={{ borderRadius: '50%', marginRight: '10px' }} />

      {/* Text field */}
      <div style={{ flex: 1 }}>
        {isTextAreaOpen ? (
          <textarea
            placeholder="Enter your text here"
            style={{ width: '100%', height: '100px', border: '1px solid #ccc', borderRadius: '5px', padding: '10px' }}
          />
        ) : (
          <div onClick={handleTextFieldTap} style={{ width: '100%', height: '40px', border: '1px solid #ccc', borderRadius: '5px', padding: '10px' }}>
            Click here to add text
          </div>
        )}
      </div>
    </div>
      </div>
      );
  }
      export default Notifications;
