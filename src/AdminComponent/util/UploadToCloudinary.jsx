const upload_preset= "soda-saira"
const cloud_name = "dg8rqp816"
const api_url = `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`

export const uploadToCloudinary = async (pics) => {
    
    if (pics) {

       
      
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "soda-saira");
      data.append("cloud_name", "dg8rqp816");
  
      const res = await 
      fetch(`https://api.cloudinary.com/v1_1/dg8rqp816/image/upload`, {
        method: "post",
        body: data,
      })
        
        const fileData=await res.json();
        console.log("url : ", fileData);
        return fileData.url
  
    } else {
      console.log("error");
    }
  };