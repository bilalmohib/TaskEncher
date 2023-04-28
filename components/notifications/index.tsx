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

const Feed = () => {
  return (
    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
    <div style={{ display: 'flex', padding: '10px', boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.25)', flexDirection: 'column', width: '50%'}}>
      {/* Avatar */}
      <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
      <img src="https://via.placeholder.com/50x50" alt="Avatar" style={{ borderRadius: '50%', marginRight: '10px' }} />
      <div>Ammar Mohib updated Feed</div>
      </div>
      
      <div style={{paddingTop: '0px'}}></div>
      {/* Text content */}
      <div style={{ display: 'flex', flexDirection: 'column', paddingLeft: '10px', paddingTop: '20px' }}>
      <div>hi</div>
        <div style={{ display: 'flex', alignItems: 'center', marginTop: '5px', flexDirection: 'row' }}>
          <div style={{ color: 'red', marginRight: '10px' }}>comment</div>
          <div>Yesterday at 12:00 pm</div>
        </div>
      </div>
    </div>
    </div>
  );
};

const Status = () => {
  return (
<div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
    <div style={{ display: 'flex', padding: '10px', boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.25)', flexDirection: 'column', width: '50%'}}>
      {/* Avatar */}
      <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
      <img src="https://via.placeholder.com/50x50" alt="Avatar" style={{ borderRadius: '50%', marginRight: '10px' }} />
      <div>Ammar Mohib updated Status</div>
      </div>
      
      <div style={{paddingTop: '0px'}}></div>
      {/* Text content */}
      <div style={{ display: 'flex', flexDirection: 'column', paddingLeft: '10px', paddingTop: '20px' }}>
      <div>hi</div>
        <div style={{ display: 'flex', alignItems: 'center', marginTop: '5px', flexDirection: 'row' }}>
          <div style={{ color: 'red', marginRight: '10px' }}>comment</div>
          <div>Yesterday at 12:00 pm</div>
        </div>
      </div>
    </div>
    </div>
  );
};

const ActivityStream = () => {
  return (
    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
    <div style={{ display: 'flex', padding: '10px', boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.25)', flexDirection: 'column', width: '50%'}}>
      {/* Avatar */}
      <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
      <img src="https://via.placeholder.com/50x50" alt="Avatar" style={{ borderRadius: '50%', marginRight: '10px' }} />
      <div>Ammar Mohib updated Activity</div>
      </div>
      
      <div style={{paddingTop: '0px'}}></div>
      {/* Text content */}
      <div style={{ display: 'flex', flexDirection: 'column', paddingLeft: '10px', paddingTop: '20px' }}>
      <div>hi</div>
        <div style={{ display: 'flex', alignItems: 'center', marginTop: '5px', flexDirection: 'row' }}>
          <div style={{ color: 'red', marginRight: '10px' }}>comment</div>
          <div>Yesterday at 12:00 pm</div>
        </div>
      </div>
    </div>
    </div>
  );
};
interface TabButtonProps {
  text: string;
  active: boolean;
  onClick: () => void;
}
const TabButton = ({ text, active, onClick }: TabButtonProps) => {
  const backgroundColor = active ? '#fff' : '#fff';
  const color = active ? '#000' : '#000';

  return (
    (active === true) ? <div
      style={{ backgroundColor, color, padding: '0px', borderRadius: '5px', cursor: 'pointer', marginRight: '10px' }}
      onClick={onClick}
    >
      <div style={{paddingTop: '30px',}}>{text}</div>
       <hr 
        style={{
          // borderColor: 'red',
          // borderTop: '4px solid #c52a04',
          // textShadow: 'none',
          // boxShadow: 'none',
          height: '4px',
          backgroundColor: 'red',
          border: 'none'
  
          //  paddingBottom: '10px'
        }} 
        /> 
    </div> : <div
      style={{ backgroundColor, color, padding: '10px', borderRadius: '5px', cursor: 'pointer', marginRight: '10px' }}
      onClick={onClick}
    >
      {text}
    </div>
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
  
  const [activeTab, setActiveTab] = React.useState<string>('feed');
  
  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };
  

  let content;

  if (activeTab === 'feed') {
    content = <Feed />;
  } else if (activeTab === 'status') {
    content = <Status />;
  } else if (activeTab === 'activityStream') {
    content = <ActivityStream />;
  }

  return (
    <div style={{height: '100%',backgroundColor: 'white'}}>
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
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '10px', textAlign: 'center', paddingTop: '30px', flexDirection: 'column'}}>
  {/* Avatar */}
  <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
    <div>
  <img src={avatarUrl} alt="Avatar" style={{ borderRadius: '50%', marginRight: '10px'}} />
  </div>
  <div>
  {isTextAreaOpen ? (
      <textarea
        placeholder="Enter your text here"
        style={{ width: '100vh', height: '100px', border: '1px solid #ccc', borderRadius: '5px' }}
      />
    ) : (
      <div onClick={handleTextFieldTap} style={{ width: '100vh', height: '40px', border: '1px solid #ccc', borderRadius: '5px', padding: '7px' }}>
        Click here to add text
      </div>
    )}
    </div>
  </div>
  {/* Text field */}
      
  <div style={{}}>
  
  </div>
</div>
<div style={{ display: 'flex', alignItems: 'center', marginLeft:'270px', marginTop: '50px' }}>
        <TabButton text="Feed" active={activeTab === 'feed'}  onClick={() => handleTabClick('feed')} />
        <TabButton text="Status" active={activeTab === 'status'} onClick={() => handleTabClick('status')} />
        <TabButton text="Activity Stream" active={activeTab === 'activityStream'} onClick={() => handleTabClick('activityStream')} />
      </div>
      <hr style={{position: 'relative', bottom: '34px'}} />
      {content}
      </div>
      );
  }
      export default Notifications;
