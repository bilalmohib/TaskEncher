import React, { useEffect } from 'react';
import {
    Box,
    Typography,
    Modal,
    TextField,
    Button,
    Autocomplete,
    IconButton
} from '@mui/material'
import { FaFacebookF, FaLinkedin, FaLinkedinIn, FaTwitter, FaVoicemail, FaWhatsapp } from 'react-icons/fa';
import { AiFillFacebook } from 'react-icons/ai';
import { useRouter } from 'next/router';
import { RiLinkedinFill, RiLinkedinLine } from 'react-icons/ri';
// import postToFacebook from './shareFunctions';
import axios from 'axios';
import { FacebookShareButton, FacebookIcon, LinkedinShareButton, LinkedinIcon, WhatsappShareButton, WhatsappIcon, TwitterShareButton, TwitterIcon, EmailShareButton, EmailIcon } from 'react-share';
declare global {
    interface Window {
      fbAsyncInit: () => void;
    }
  }
  declare global {
    interface Window {
      FB: {
        ui: (params: any, callback?: (response: any) => void) => void;
      };
    }
  }
// Importing Add Data Function

interface ShareModalProps {
    setIsOpen: any,
    isOpen: boolean
}

const ShareModal: React.FC<ShareModalProps> = ({
    setIsOpen,
    isOpen
}) => {

    interface ProjectMemberOptionType {
        title: string;
    }

    const defaultProps = {
        getOptionLabel: (option: ProjectMemberOptionType) => option.title,
    };

    const [value, setValue] = React.useState<ProjectMemberOptionType | null>(null);


    const handleStartNewChat = () => {
        console.log("Start New Chat");
        // alert("value" + " " + value?.title);
        setIsOpen(false);

        // Extract user name from email

        // console.log("UsersListSingleChat ===> ", usersListSingleChat);

        // Check if user already exists in the database by checking the value in the 
        // projectMembersState array
        let userExists = false;
        // for (let i = 0; i < usersListSingleChat.length; i++) {
        //     if (usersListSingleChat[i]?.email == value?.title) {
        //         userExists = true;
        //         break;
        //     }
        // }

    }
    // const postToFacebook = async (message: string, accessToken: string) => {
    //     try {
    //       const response = await axios.post(
    //         `https://graph.facebook.com/me/feed?access_token=${accessToken}`,
    //         {
    //           message: message,
    //         }
    //       );
    //       console.log('Post created:', response.data);
    //     } catch (error) {
    //       console.error('Error creating post:', error);
    //     }
    //   };
    // useEffect(() => {
    //     if (typeof window !== 'undefined') {
    //       window.fbAsyncInit = function() {
    //         window.FB.init({
    //           appId: 'APP_ID',
    //           autoLogAppEvents: true,
    //           xfbml: true,
    //           version: 'v12.0',
    //         });
    //       };
    //     }
      
    //     // load Facebook SDK asynchronously
    //     (function(d, s, id) {
    //       var js,
    //         fjs = d.getElementsByTagName(s)[0];
    //       if (d.getElementById(id)) return;
    //       js = d.createElement(s);
    //       js.id = id;
    //       js.src = 'https://connect.facebook.net/en_US/sdk.js';
    //       fjs.parentNode.insertBefore(js, fjs);
    //     })(document, 'script', 'facebook-jssdk');
    //   }, []);
      
    //   const handleShare = () => {
    //     window.FB.ui({
    //       method: 'share',
    //       href: 'https://example.com', // replace with your app URL
    //     });
    //   };
      // Share app URL on Facebook
      function shareOnFacebook() {
        console.log("fdfdsf")
            window.location.href = `https://facebook.com/sharer/sharer.php?u=${currentUrl}`;
      }
      function shareOnLinkeDin() {
        console.log("fdfdsf")
        window.location.href = `https://www.linkedin.com/sharing/share-offsite/?url=${currentUrl}`;
        // window.location.href = `https://www.linkedin.com/shareArticle?mini=true&summary=${currentUrl}`;
            // Linking.openURL("https://www.linkedin.com/shareArticle?mini=true&summary=youtube&title=f1&url=https://www.youtube.com/watch?v=dQw4w9WgXcQ");

      }
    const router = useRouter();
    const currentUrl = "https://taskencher.com" + router.asPath;
    return (
        <Modal
            open={isOpen}
            onClose={() => setIsOpen(false)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={{
                position: 'absolute' as 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: "50%",
                bgcolor: 'background.paper',
                // border: '2px solid #000',
                boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
                p: 4,
                borderRadius: '10px',
            }}>
                <Typography
                    id="modal-modal-title"
                    variant="h4"
                    component="h4"
                >
                    Share
                </Typography>
                {/* <Typography id="modal-modal-title-start-chat" variant="h6" component="h6" sx={{ fontSize: "14px", fontWeight: "lighter" }}>
                    Please select the email address of the person you want to chat with.
                </Typography>
                <Autocomplete
                options={[]} {...defaultProps}
                id="SelectUserToChat"
                value={value}
                autoHighlight
                onChange={(event: any, newValue: ProjectMemberOptionType | null) => {
                    setValue(newValue);
                } }
                renderInput={(params) => (
                    <TextField {...params} label="Email Id" placeholder='Select the user from the list to chat with them' variant="standard" />
                )}                /> */}
                <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
                    {/* <Button style={{borderRadius: "50%", backgroundColor: '#008AD1', width: '70px', height: '70px'}} variant="outlined" color="info" onClick={() => setIsOpen(false)}><RiLinkedinFill style={{fontSize: '60px', color: 'white'}} onClick={shareOnLinkeDin} /></Button> */}
                    <LinkedinShareButton url={currentUrl.toString()}><LinkedinIcon style={{width: '70px', height: '70px'}} size={32} round /></LinkedinShareButton>
                    {/* <Button style={{borderRadius: "50%", width: '70px', height: '70px'}} variant="contained" color="info" sx={{ ml: 2 }} onClick={shareOnFacebook}><FaFacebookF style={{fontSize: '30px'}}/></Button> */}
                    <FacebookShareButton url={currentUrl.toString()}><FacebookIcon style={{width: '70px', height: '70px'}} size={32} round /></FacebookShareButton>
                    {/* <Button style={{borderRadius: "50%", backgroundColor: '#00ED71', width: '70px', height: '70px'}} variant="contained" color="info" sx={{ ml: 2 }} onClick={handleStartNewChat}> */}
                        {/* <FaWhatsapp style={{fontSize: '60px'}} /> */}
                        {/* <svg 'http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd'> */}
                            {/* <svg height="100%" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;" version="1.1" viewBox="0 0 512 512" width="100%" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:serif="http://www.serif.com/" xmlns:xlink="http://www.w3.org/1999/xlink"><g id="WhatsApp-Logo-Icon"><path d="M116.225,-0.001c-11.264,0.512 -26.112,1.536 -32.768,3.072c-10.24,2.048 -19.968,5.12 -27.648,9.216c-9.728,4.608 -17.92,10.752 -25.088,17.92c-7.68,7.68 -13.824,15.872 -18.432,25.6c-4.096,7.68 -7.168,17.408 -9.216,27.648c-1.536,6.656 -2.56,21.504 -2.56,32.768c-0.512,4.608 -0.512,10.752 -0.512,13.824l0,251.905l0,13.824c0.512,11.264 1.536,26.112 3.072,32.768c2.048,10.24 5.12,19.968 9.216,27.648c4.608,9.728 10.752,17.92 17.92,25.088c7.68,7.68 15.872,13.824 25.6,18.432c7.68,4.096 17.408,7.168 27.648,9.216c6.656,1.536 21.504,2.56 32.768,2.56c4.608,0.512 10.752,0.512 13.824,0.512l251.904,0l13.824,0c11.264,-0.512 26.112,-1.536 32.768,-3.072c10.24,-2.048 19.968,-5.12 27.648,-9.216c9.728,-4.608 17.92,-10.752 25.088,-17.92c7.68,-7.68 13.824,-15.872 18.432,-25.6c4.096,-7.68 7.168,-17.408 9.216,-27.648c1.536,-6.656 2.56,-21.504 2.56,-32.768c0.512,-4.608 0.512,-10.752 0.512,-13.824l0,-265.729c-0.512,-11.264 -1.536,-26.112 -3.072,-32.768c-2.048,-10.24 -5.12,-19.968 -9.216,-27.648c-4.608,-9.728 -10.752,-17.92 -17.92,-25.088c-7.68,-7.68 -15.872,-13.824 -25.6,-18.432c-7.68,-4.096 -17.408,-7.168 -27.648,-9.216c-6.656,-1.536 -21.504,-2.56 -32.768,-2.56c-4.608,-0.512 -10.752,-0.512 -13.824,-0.512l-265.728,0Z" style="fill:url(#_Linear1);fill-rule:nonzero;"/><path d="M344.754,289.698c-4.56,-2.282 -26.98,-13.311 -31.161,-14.832c-4.18,-1.521 -7.219,-2.282 -10.259,2.282c-3.041,4.564 -11.78,14.832 -14.44,17.875c-2.66,3.042 -5.32,3.423 -9.88,1.14c-4.561,-2.281 -19.254,-7.095 -36.672,-22.627c-13.556,-12.087 -22.709,-27.017 -25.369,-31.581c-2.66,-4.564 -0.283,-7.031 2,-9.304c2.051,-2.041 4.56,-5.324 6.84,-7.986c2.28,-2.662 3.04,-4.564 4.56,-7.606c1.52,-3.042 0.76,-5.705 -0.38,-7.987c-1.14,-2.282 -10.26,-24.72 -14.06,-33.848c-3.701,-8.889 -7.461,-7.686 -10.26,-7.826c-2.657,-0.132 -5.7,-0.16 -8.74,-0.16c-3.041,0 -7.98,1.141 -12.161,5.704c-4.18,4.564 -15.96,15.594 -15.96,38.032c0,22.438 16.34,44.116 18.62,47.159c2.281,3.043 32.157,49.089 77.902,68.836c10.88,4.697 19.374,7.501 25.997,9.603c10.924,3.469 20.866,2.98 28.723,1.806c8.761,-1.309 26.98,-11.029 30.781,-21.677c3.799,-10.649 3.799,-19.777 2.659,-21.678c-1.139,-1.902 -4.179,-3.043 -8.74,-5.325m-83.207,113.573l-0.061,0c-27.22,-0.011 -53.917,-7.32 -77.207,-21.137l-5.539,-3.287l-57.413,15.056l15.325,-55.959l-3.608,-5.736c-15.184,-24.145 -23.203,-52.051 -23.192,-80.704c0.033,-83.611 68.083,-151.635 151.756,-151.635c40.517,0.016 78.603,15.811 107.243,44.474c28.64,28.663 44.404,66.764 44.389,107.283c-0.035,83.617 -68.083,151.645 -151.693,151.645m129.102,-280.709c-34.457,-34.486 -80.281,-53.487 -129.103,-53.507c-100.595,0 -182.468,81.841 -182.508,182.437c-0.013,32.156 8.39,63.546 24.361,91.212l-25.892,94.545l96.75,-25.37c26.657,14.535 56.67,22.194 87.216,22.207l0.075,0c100.586,0 182.465,-81.852 182.506,-182.448c0.019,-48.751 -18.946,-94.59 -53.405,-129.076" style="fill:#fff;"/></g><defs><linearGradient gradientTransform="matrix(0,-512,-512,0,256.001,512)" gradientUnits="userSpaceOnUse" id="_Linear1" x1="0" x2="1" y1="0" y2="0"><stop offset="0" style="stop-color:#25cf43;stop-opacity:1"/><stop offset="1" style="stop-color:#61fd7d;stop-opacity:1"/></linearGradient></defs></svg> */}
                            {/* <svg height="100%" style={{fillRule: 'evenodd', clipRule: 'evenodd', strokeLinejoin: 'round', strokeMiterlimit: 2}} version="1.1" viewBox="0 0 512 512" width="100%" xmlSpace="preserve" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"><g id="WhatsApp-Logo-Icon"><path d="M116.225,-0.001c-11.264,0.512 -26.112,1.536 -32.768,3.072c-10.24,2.048 -19.968,5.12 -27.648,9.216c-9.728,4.608 -17.92,10.752 -25.088,17.92c-7.68,7.68 -13.824,15.872 -18.432,25.6c-4.096,7.68 -7.168,17.408 -9.216,27.648c-1.536,6.656 -2.56,21.504 -2.56,32.768c-0.512,4.608 -0.512,10.752 -0.512,13.824l0,251.905l0,13.824c0.512,11.264 1.536,26.112 3.072,32.768c2.048,10.24 5.12,19.968 9.216,27.648c4.608,9.728 10.752,17.92 17.92,25.088c7.68,7.68 15.872,13.824 25.6,18.432c7.68,4.096 17.408,7.168 27.648,9.216c6.656,1.536 21.504,2.56 32.768,2.56c4.608,0.512 10.752,0.512 13.824,0.512l251.904,0l13.824,0c11.264,-0.512 26.112,-1.536 32.768,-3.072c10.24,-2.048 19.968,-5.12 27.648,-9.216c9.728,-4.608 17.92,-10.752 25.088,-17.92c7.68,-7.68 13.824,-15.872 18.432,-25.6c4.096,-7.68 7.168,-17.408 9.216,-27.648c1.536,-6.656 2.56,-21.504 2.56,-32.768c0.512,-4.608 0.512,-10.752 0.512,-13.824l0,-265.729c-0.512,-11.264 -1.536,-26.112 -3.072,-32.768c-2.048,-10.24 -5.12,-19.968 -9.216,-27.648c-4.608,-9.728 -10.752,-17.92 -17.92,-25.088c-7.68,-7.68 -15.872,-13.824 -25.6,-18.432c-7.68,-4.096 -17.408,-7.168 -27.648,-9.216c-6.656,-1.536 -21.504,-2.56 -32.768,-2.56c-4.608,-0.512 -10.752,-0.512 -13.824,-0.512l-265.728,0Z" style={{fill: 'url(#_Linear1)', fillRule: 'nonzero'}} /><path d="M344.754,289.698c-4.56,-2.282 -26.98,-13.311 -31.161,-14.832c-4.18,-1.521 -7.219,-2.282 -10.259,2.282c-3.041,4.564 -11.78,14.832 -14.44,17.875c-2.66,3.042 -5.32,3.423 -9.88,1.14c-4.561,-2.281 -19.254,-7.095 -36.672,-22.627c-13.556,-12.087 -22.709,-27.017 -25.369,-31.581c-2.66,-4.564 -0.283,-7.031 2,-9.304c2.051,-2.041 4.56,-5.324 6.84,-7.986c2.28,-2.662 3.04,-4.564 4.56,-7.606c1.52,-3.042 0.76,-5.705 -0.38,-7.987c-1.14,-2.282 -10.26,-24.72 -14.06,-33.848c-3.701,-8.889 -7.461,-7.686 -10.26,-7.826c-2.657,-0.132 -5.7,-0.16 -8.74,-0.16c-3.041,0 -7.98,1.141 -12.161,5.704c-4.18,4.564 -15.96,15.594 -15.96,38.032c0,22.438 16.34,44.116 18.62,47.159c2.281,3.043 32.157,49.089 77.902,68.836c10.88,4.697 19.374,7.501 25.997,9.603c10.924,3.469 20.866,2.98 28.723,1.806c8.761,-1.309 26.98,-11.029 30.781,-21.677c3.799,-10.649 3.799,-19.777 2.659,-21.678c-1.139,-1.902 -4.179,-3.043 -8.74,-5.325m-83.207,113.573l-0.061,0c-27.22,-0.011 -53.917,-7.32 -77.207,-21.137l-5.539,-3.287l-57.413,15.056l15.325,-55.959l-3.608,-5.736c-15.184,-24.145 -23.203,-52.051 -23.192,-80.704c0.033,-83.611 68.083,-151.635 151.756,-151.635c40.517,0.016 78.603,15.811 107.243,44.474c28.64,28.663 44.404,66.764 44.389,107.283c-0.035,83.617 -68.083,151.645 -151.693,151.645m129.102,-280.709c-34.457,-34.486 -80.281,-53.487 -129.103,-53.507c-100.595,0 -182.468,81.841 -182.508,182.437c-0.013,32.156 8.39,63.546 24.361,91.212l-25.892,94.545l96.75,-25.37c26.657,14.535 56.67,22.194 87.216,22.207l0.075,0c100.586,0 182.465,-81.852 182.506,-182.448c0.019,-48.751 -18.946,-94.59 -53.405,-129.076" style={{fill: '#fff'}} /></g><defs><linearGradient gradientTransform="matrix(0,-512,-512,0,256.001,512)" gradientUnits="userSpaceOnUse" id="_Linear1" x1={0} x2={1} y1={0} y2={0}><stop offset={0} style={{stopColor: '#25cf43', stopOpacity: 1}} /><stop offset={1} style={{stopColor: '#61fd7d', stopOpacity: 1}} /></linearGradient></defs></svg> */}
                        {/* </Button> */}
                    <WhatsappShareButton url={currentUrl.toString()}><WhatsappIcon style={{width: '70px', height: '70px'}} size={32} round /></WhatsappShareButton>
                    {/* <Button style={{borderRadius: "50%", backgroundColor: '#00A4F3', width: '70px', height: '70px'}} variant="contained" sx={{ ml: 2 }} onClick={handleStartNewChat}>
                        <FaTwitter style={{fontSize: '60px'}} />
                        {/* <svg height="100%"  version="1.1" viewBox="0 0 512 512" width="100%"  xmlns="http://www.w3.org/2000/svg" xmlnsxlink="http://www.w3.org/1999/xlink"><g id="WhatsApp-Logo-Icon"><path d="M116.225,-0.001c-11.264,0.512 -26.112,1.536 -32.768,3.072c-10.24,2.048 -19.968,5.12 -27.648,9.216c-9.728,4.608 -17.92,10.752 -25.088,17.92c-7.68,7.68 -13.824,15.872 -18.432,25.6c-4.096,7.68 -7.168,17.408 -9.216,27.648c-1.536,6.656 -2.56,21.504 -2.56,32.768c-0.512,4.608 -0.512,10.752 -0.512,13.824l0,251.905l0,13.824c0.512,11.264 1.536,26.112 3.072,32.768c2.048,10.24 5.12,19.968 9.216,27.648c4.608,9.728 10.752,17.92 17.92,25.088c7.68,7.68 15.872,13.824 25.6,18.432c7.68,4.096 17.408,7.168 27.648,9.216c6.656,1.536 21.504,2.56 32.768,2.56c4.608,0.512 10.752,0.512 13.824,0.512l251.904,0l13.824,0c11.264,-0.512 26.112,-1.536 32.768,-3.072c10.24,-2.048 19.968,-5.12 27.648,-9.216c9.728,-4.608 17.92,-10.752 25.088,-17.92c7.68,-7.68 13.824,-15.872 18.432,-25.6c4.096,-7.68 7.168,-17.408 9.216,-27.648c1.536,-6.656 2.56,-21.504 2.56,-32.768c0.512,-4.608 0.512,-10.752 0.512,-13.824l0,-265.729c-0.512,-11.264 -1.536,-26.112 -3.072,-32.768c-2.048,-10.24 -5.12,-19.968 -9.216,-27.648c-4.608,-9.728 -10.752,-17.92 -17.92,-25.088c-7.68,-7.68 -15.872,-13.824 -25.6,-18.432c-7.68,-4.096 -17.408,-7.168 -27.648,-9.216c-6.656,-1.536 -21.504,-2.56 -32.768,-2.56c-4.608,-0.512 -10.752,-0.512 -13.824,-0.512l-265.728,0Z" style={{{{fill: ''}} 'url(#_linear1)', fillrule: 'nonzero'}} /><path d="M344.754,289.698c-4.56,-2.282 -26.98,-13.311 -31.161,-14.832c-4.18,-1.521 -7.219,-2.282 -10.259,2.282c-3.041,4.564 -11.78,14.832 -14.44,17.875c-2.66,3.042 -5.32,3.423 -9.88,1.14c-4.561,-2.281 -19.254,-7.095 -36.672,-22.627c-13.556,-12.087 -22.709,-27.017 -25.369,-31.581c-2.66,-4.564 -0.283,-7.031 2,-9.304c2.051,-2.041 4.56,-5.324 6.84,-7.986c2.28,-2.662 3.04,-4.564 4.56,-7.606c1.52,-3.042 0.76,-5.705 -0.38,-7.987c-1.14,-2.282 -10.26,-24.72 -14.06,-33.848c-3.701,-8.889 -7.461,-7.686 -10.26,-7.826c-2.657,-0.132 -5.7,-0.16 -8.74,-0.16c-3.041,0 -7.98,1.141 -12.161,5.704c-4.18,4.564 -15.96,15.594 -15.96,38.032c0,22.438 16.34,44.116 18.62,47.159c2.281,3.043 32.157,49.089 77.902,68.836c10.88,4.697 19.374,7.501 25.997,9.603c10.924,3.469 20.866,2.98 28.723,1.806c8.761,-1.309 26.98,-11.029 30.781,-21.677c3.799,-10.649 3.799,-19.777 2.659,-21.678c-1.139,-1.902 -4.179,-3.043 -8.74,-5.325m-83.207,113.573l-0.061,0c-27.22,-0.011 -53.917,-7.32 -77.207,-21.137l-5.539,-3.287l-57.413,15.056l15.325,-55.959l-3.608,-5.736c-15.184,-24.145 -23.203,-52.051 -23.192,-80.704c0.033,-83.611 68.083,-151.635 151.756,-151.635c40.517,0.016 78.603,15.811 107.243,44.474c28.64,28.663 44.404,66.764 44.389,107.283c-0.035,83.617 -68.083,151.645 -151.693,151.645m129.102,-280.709c-34.457,-34.486 -80.281,-53.487 -129.103,-53.507c-100.595,0 -182.468,81.841 -182.508,182.437c-0.013,32.156 8.39,63.546 24.361,91.212l-25.892,94.545l96.75,-25.37c26.657,14.535 56.67,22.194 87.216,22.207l0.075,0c100.586,0 182.465,-81.852 182.506,-182.448c0.019,-48.751 -18.946,-94.59 -53.405,-129.076" style={{{{fill: ''}} '#fff'}} /></g><defs><linearGradient gradientTransform="matrix(0,-512,-512,0,256.001,512)" gradientUnits="userSpaceOnUse" id="_Linear1" x1="{0}" x2="{1}" y1="{0}" y2="{0}"><stop offset="{0}" style={{{{stopcolor: ''}} '#25cf43', stopopacity: 1}} /><stop offset="{1}" style={{{{stopcolor: ''}} '#61fd7d', stopopacity: 1}} /></linearGradient></defs></svg> */}
                        {/* </Button> */}
                    <TwitterShareButton url={currentUrl.toString()}><TwitterIcon style={{width: '70px', height: '70px'}} size={32} round /></TwitterShareButton>
                    {/* <Button style={{borderRadius: "50%", width: '70px', height: '70px'}} variant="contained" color="info" sx={{ ml: 2 }} onClick={handleStartNewChat}><FaVoicemail style={{fontSize: '60px'}} /></Button> */}
                    <EmailShareButton url={currentUrl.toString()}><EmailIcon style={{width: '70px', height: '70px'}} size={32} round /></EmailShareButton>
                </Box>
                <div style={{paddingTop: '20px'}}>
                <div style={{border: '1px solid black', borderRadius: '20px',  display: 'flex', flexDirection: 'row', alignItems: 'start', justifyContent: 'start', paddingTop: '20px'}}>
                    <div style={{
                          width: '80%', 
                          whiteSpace: 'nowrap', 
                          overflow: 'clip', 
                          textOverflow: 'clip' 
                        
                    }}>
                <p style={{color: 'blue', paddingLeft: '10px'}}>{currentUrl}</p>
                </div>
                <Button variant="contained" style={{borderRadius: '20px', position: 'absolute', bottom: '45px', right: '50px'}}>Copy</Button>
                </div>
                </div>
            </Box>
        </Modal>
    )
}
export default ShareModal;