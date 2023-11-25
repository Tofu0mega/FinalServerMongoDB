import cloudinary from 'cloudinary';
import { uploadImage } from '../config/cloudinary.js';


cloudinary.config({
    cloud_name:"dtauaal8p",
    api_key:"117669798764489",
    api_secret: "dPUyjkKlrR0vZejDTvCfxHTRmNY",
});

const imagetoupload=
const banner_link = await uploadImage(req.body.banner);