import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import InfoIcon from '@mui/icons-material/Info';

interface CustomPopOverProps {
    anchorEl: HTMLElement | null;
    setAnchorEl: (value: HTMLElement | null) => void;
    title: string;
    iconColor?: string;
}

const CustomPopOver: React.FC<CustomPopOverProps> = (
    {
        anchorEl,
        setAnchorEl,
        title,
        iconColor
    }) => {

    const open = Boolean(anchorEl);

    const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handlePopoverClose = () => {
        setAnchorEl(null);
    };

    return (
        <>
            <Typography variant="h6" component="h2"
                aria-owns={open ? 'mouse-over-popover' : undefined}
                aria-haspopup="true"
                onMouseEnter={handlePopoverOpen}
                onMouseLeave={handlePopoverClose}
                sx={{ display: "inline" }}
            >
                <InfoIcon style={{ color: iconColor ? (iconColor) : "#727374" }} />
            </Typography>
            <Popover
                id="mouse-over-popover"
                sx={{
                    pointerEvents: 'none',
                }}
                open={open}
                anchorEl={anchorEl}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                onClose={handlePopoverClose}
                disableRestoreFocus
            >
                <Typography sx={{
                    pl: 2,
                    pr: 2,
                    pt: 1,
                    pb: 1,
                    backgroundColor: "#363639",
                    color: "white",
                    width: "200px",
                    borderRadius: "5px",
                    fontSize: "12px",
                    fontWeight: 400,
                    height: "auto",
                }}
                >
                    {title}
                </Typography>
            </Popover>
        </>
    )
}
export default CustomPopOver;