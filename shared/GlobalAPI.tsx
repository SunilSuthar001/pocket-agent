
  import axios from "axios";
  



  export const ApiChatModel=async  (message:any)=>{

      /* Send POST request using Axios */
      const response = await axios.post(
          "https://kravixstudio.com/api/v1/chat",
          {

            //   message: [{ role: "user", content: "Hi" }], // Messages to AI
            message: message,
            aiModel: "gpt-5",                     // Selected AI model
              outputType: "text"                         // 'text' or 'json'
            },
            {
                headers: {
                    "Content-Type": "application/json",     // Tell server we're sending JSON
                    "Authorization":  "Bearer " + process.env.EXPO_PUBLIC_KRAVIX_STUDIO_API_KEY //"Bearer YOUR_API_KEY"  // Replace with your API key
                }
            }
        );
        
        console.log(response.data); 
        // console.log('');
        
        return response.data;
    }