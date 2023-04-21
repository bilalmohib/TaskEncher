import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CloseIcon from '@mui/icons-material/Close';

const SimpleComponent: React.FC = () => {
  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
        <span style={{}}>
      <ArrowBackIcon />
      </span>
      <span style={{ flex: 1, textAlign: 'center' }}>
        <h2 style={{fontSize: '32px', lineHeight: '40px'}}>Create a new project</h2>
        <h4 style={{fontSize: '20px', lineHeight: '20px'}}>how would you like to start</h4>
      </span>
      <CloseIcon />
    </div>
  );
};

export default SimpleComponent;
