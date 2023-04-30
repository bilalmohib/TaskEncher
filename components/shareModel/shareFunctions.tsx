import axios from 'axios';

const postToFacebook = async (message: string, accessToken: string) => {
  try {
    const response = await axios.post(
      `https://graph.facebook.com/me/feed?access_token=${accessToken}`,
      {
        message: message,
      }
    );
    console.log('Post created:', response.data);
  } catch (error) {
    console.error('Error creating post:', error);
  }
};

export default postToFacebook;
