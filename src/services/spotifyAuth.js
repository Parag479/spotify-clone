export const getAuthUrl = () => {
    const params = new URLSearchParams({
      client_id: process.env.REACT_APP_CLIENT_ID,
      response_type: 'token',
      redirect_uri: process.env.REACT_APP_REDIRECT_URI,
      scope: process.env.REACT_APP_SCOPES,
      show_dialog: false
    });
    return `${process.env.REACT_APP_AUTH_ENDPOINT}?${params.toString()}`;
  };
  
  export const handleAuthRedirect = () => {
    const hash = window.location.hash.substring(1);
    const params = new URLSearchParams(hash);
    
    return {
      token: params.get('access_token'),
      expiresIn: params.get('expires_in'),
      error: params.get('error')
    };
  };