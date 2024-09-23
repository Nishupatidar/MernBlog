
const csvtojson = require('csvtojson');
const Blog = require('../Model/Add_Blog');
const slugify = require('slugify')
const CategoryModel = require('../Model/Category')
const multer = require('multer');
// const multer = require('multer');
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/uploads'); // Destination folder for uploaded images
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname); // Generate unique filename
  }
});
const upload = multer({ storage: storage }).single('image'); // 'image' should match the field name in the form
console.log("uploadimage",upload)
const Filesave = async (req, res,upload) => {
  // console.log(upload)
  try {
    if (!req.files || !req.files.uploadfile) {
      return res.status(400).json({ message: 'No file uploaded', success: false });
    }
    
    const filePath = './public/excelUploads/' + req.files.uploadfile[0].filename;
    // console.log(filePath)
    const jsonArray = await csvtojson().fromFile(filePath);
    console.log(jsonArray)
    const created_at = new Date();

    const existingTitles = await Blog.distinct('title');
    const uniqueRecords = jsonArray.filter(row => !existingTitles.includes(row.title));
    
    const arrayToInsert = await Promise.all(uniqueRecords.map(async (row) => {
      let category;
      if (row.category) {
        category = await CategoryModel.findOne({ category_name: row.category });
        if (!category) {
          category = new CategoryModel({ category_name: row.category });
          category = await category.save();
        }
      }

      let imageName;
      if (row.image) {
        console.log(row.image)
        const imagepath = ''
        // If image is uploaded, use the uploaded image filename
        imageName = req.image
        console.log(imageName)
      } else if (row.image && !row.image.includes('.')) {
        // If image name is provided in the CSV file, and it doesn't include an extension, use it
        imageName = row.image + '.jpg'; // Add the file extension (you may need to adjust this based on your file types)
      console.log(imageName)
      }

      const descriptions = {
        html: row.description || '',
        style: 'backend_style_here'
      };

      const slug = generateUniqueSlug(row.title); // Generate unique slug
      const existingSlug = await Blog.findOne({ slug: slug });
      if (existingSlug) {
        // If a record with the same slug exists, modify the slug to ensure uniqueness
        slug = slug + '-' + new Date().getTime(); // Append timestamp to ensure uniqueness
      }

      return {
        title: row.title || '',
        slug: slug,
        tag: row.tag,
        image: imageName, // Use the uploaded image filename here
        metatitle: row.metatitle,
        metadescription: row.metadescription,
        decsription: descriptions.html,
        category: category ? category._id : null,
        created_at: created_at,
        // Other fields...
      };
    }));

    const result = await Blog.insertMany(arrayToInsert.filter(record => record)); // Filter out null records
    res.json({ message: 'File imported successfully', success: true });
  } catch (error) {
    console.error('Error importing file:', error);
    res.status(500).json({ message: 'Internal Server Error', success: false });
  }
};





function generateUniqueSlug(title) {
    const slug = slugify(title, { lower: true })
    console.log(slug)
    return slug
  // Implement your logic to generate a unique slug based on the title
  // This function should return a unique slug for each case
}


const Category_filesave = async(req,res)=>{
  try {
    const filePath = './public/excelUploads/' + req.files.uploadfile[0].filename;
    
    const jsonArray = await csvtojson().fromFile(filePath);
    const created_at = new Date()
    // console.log(jsonArray)
    const existingTitles = await CategoryModel.distinct('category_name');
    const uniqueRecords = jsonArray.filter(row => !existingTitles.includes(row.category_name));
    const arrayToInsert =  await uniqueRecords.map(row => ({
      category_name:row.category_name,
            decsription:row.decsription,
            created_at: created_at,
      //       update_at: row.update_at,
    }));
    // const arrayToInsert = await Promise.all(jsonArray.map(async (row) => {
    //   let category = await CategoryModel.findOne({category_name:row.category_name})
    //   console.log(category)
    //   if(category == null){
    //     console.log(category)
    //   }
        
      
    //     return {
    //       // Use the category ID
    //       category_name:row.category_name,
    //       decsription:row.decsription,
    //       created_at: row.created_at,
    //       update_at: row.update_at,
    //       // ... other fields ...
    //     };
    //   }));
      
    //   Now, arrayToInsert contains the data with matched or newly added category IDs
      

    const result = await CategoryModel.insertMany(arrayToInsert);

    res.json({ message: 'File imported successfully', success: true,result });
  } catch (error) {
    console.error('Error importing file:', error);
    // res.status(500).json({ message: 'Internal Server Error', success: false });
  }
}
const mastertitle = require('../Model/Add_Title')
const master_title_filesave = async (req, res) => {
  try {
    const filePath = './public/excelUploads/' + req.files.uploadfile[0].filename;
    
    const jsonArray = await csvtojson().fromFile(filePath);

    console.log("excel length", jsonArray.length)
    const importcount = jsonArray.length;
    console.log(importcount)
    const importDate = new Date().toLocaleString()
    const created_at = new Date()
    console.log(importDate)

    // Fetch existing titles from the database
    const existingTitles = await mastertitle.distinct('title');

    // Filter out unique records based on the 'title' column
    const uniqueRecords = jsonArray.filter(row => !existingTitles.includes(row.title));

    // Create an array of objects for insertion
    const arrayToInsert = uniqueRecords.map(row => ({
      title: row.title,
      keyword: row.keyword,
      created_at: created_at,
      update_at: row.update_at,
      // Add other fields if needed
    }));

    // Insert unique records into the database
    const result = await mastertitle.insertMany(arrayToInsert);

    // console.log(result.BulkWriteResult.insertedCount);
    res.json({ message: 'File imported successfully', success: true, result });
  } catch (error) {
    console.error('Error importing file:', error);
    res.status(500).json({ message: 'Internal Server Error', success: false });
  }
}



module.exports = {Filesave,Category_filesave,master_title_filesave};
