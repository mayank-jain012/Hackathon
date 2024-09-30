import {v2 as cloudinary} from 'cloudinary';
cloudinary.config({
    cloud_name:process.env.CLODINARY_NAME||"dlej7qblb",
    api_key:process.env.CLOUDINARY_API_KEY||"143396425658614",
    api_secret:process.env.CLOUDINARY_API_SECRET||"1LjXjntdDhoXR_cuTnl63h628PE"
})

export default cloudinary;
