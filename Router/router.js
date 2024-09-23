const express = require('express')
const multer = require('multer')
const Register_controller = require('../Controller/Register_controller')
const {User_details_controller, Delete_user_details, Edit_user_details, Update_user} = require('../Controller/User_details')
const Login_controller = require('../Controller/Login_controller')
const {Category_controller, Category_show_controller, Delete_category_controller, Edit_category_controller, Update_category_controller, Update_category_status_controller, all_category_controller} = require('../Controller/Category_controller')
const { Add_Blog_controller, Blog_controller, Delete_blog_controller, Edit_blog_controller, Update_status_controller, Update_blog_controller, singleblog_controller, alltagges_controller, Export_csv_controller } = require('../Controller/Add_Blog_controller')
const {Comment_Blog_controller, Show_comment_controller, Update_comment_status, Delete_comment_controller, Edit_comment_controller, Update_comment_controller, reply_comment_controller, reply_user, reply_status_controller, reply_delete_controller, reply_edit_controller, reply_update_controller} = require('../Controller/Comment_Blog_controller')
const Subscribe_controller = require('../Controller/Subscribe_controller')
const {Add_title_controller, Get_title_controller, Upadate_title_status_controller, Delete_title_controller, Edit_title_controller, Update_title_controller} = require('../Controller/Add_title_controller')
const {Filesave, Category_filesave, master_title_filesave }= require('../Controller/Filesave')
const {sidebar_controller, role_permission_controller} = require('../Controller/Sidebar_controller')
const {Api_get_controller, Blog_api_controller, user_post_api_controller, update_api_controller, patch_api_controller, Blog_post_api} = require('../Controller/Api_get_controller')
const User_API = require('../Controller/Curl_API/User_API')
// const Autoblog_controller = require('../Controller/Autoblog_controller')
const { Integration_controller, Get_Integration_controller, Delete_Integration_controller, Edit_Integration_controller, Update_Integration_controller, Upadate_Integration_status_controller } = require('../Controller/Integration_controller')
const {Integration_create_controller,Integration_get_controller, Integration_edit_controller, Integration_delete_controller, Integration_update_controller} = require('../Controller/Integration/Integration_create_controller')
const { Socialmedia_controller, Social_media_get_controller, Social_media_edit_controller, Social_media_delete_controller, Social_media_update_controller } = require('../Controller/Socialmedia/Socialmedia_controller')
const { Indexer_controller, Indexer_get_controller, Indexer_delete_controller, Indexer_edit_controller, Indexer_update_controller } = require('../Controller/Indexer/Indexer_add_controller')
const { Knowledge_controller, Knowledege_get_controller, Knowledege_delete_controller, Knowledege_edit_controller, Knowledege_update_controller } = require('../Controller/Knowledege/Knowledege_controller')
const { Preset_create_controller, Preset_get_controller, Preset_edit_controller, Preset_delete_controller, Preset_update_controller } = require('../Controller/Preset/Preset_controller')
const { Autoblog_get_controller,Autoblog_create_controller, Autoblog_edit_controller, Autoblog_delete_controller, Autoblog_update_controller } = require('../Controller/AutoBlog/Autoblog_controller')
const router = express.Router()
const maxSize = 2 * 1024 * 1024;

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      // console.log(file);
      if(file.mimetype == "image/jpeg"|| file.mimetype =="image/png"){
        cb( null, './public/uploads')
      }
      else if(file.mimetype == "application/pdf"){
        cb( null, './public/document')
  
      }
      else{
  cb(null,'./public/excelUploads')
      }
    },
    filename : function(req,file,cb){
    // console.log(file)
      cb(null,Date.now() + file.originalname)
    }
  })
  const upload = multer({storage: storage});

// Define fields separately
const uploadFields = upload.fields([{name:"images"},{name:"newimage"},{name:"uploadfile"}]);

  // const upload = multer({storage:storage,limits: { fileSize: maxSize }})
  // .fields([{name:"image"},{name:"newimage"},{name:"uploadfile"}])
  // console.log(upload)
router.post("/signup",Register_controller)
router.post("/login",Login_controller)
router.get("/userdetails",User_details_controller)
router.get("/userdelete/:udid",Delete_user_details)
router.get("/useredit/:ueid",Edit_user_details)
router.put("/userupdate/:upid",Update_user)
router.post("/category",Category_controller)
router.get('/categories',Category_show_controller)
router.get('/categorydelete/:cdid',Delete_category_controller)
router.get('/categoryedit/:ceid',Edit_category_controller)
router.post('/addblog',uploadFields,Add_Blog_controller)
// router.post('/addblog',upload.array("images"),Add_Blog_controller)


router.get('/blog',Blog_controller)
router.get("/blogdelete/:bid",Delete_blog_controller)
router.get("/blogedit/:beid",Edit_blog_controller)
router.put('/updateStatus/:uid',Update_status_controller)
router.put("/categorupdateStatus/:ucid",Update_category_status_controller)
router.put('/updatess',uploadFields,Update_blog_controller)
router.put('/updatecategory',Update_category_controller)
router.get('/singleblog/:sid',singleblog_controller)
router.get('/tag/:tid',alltagges_controller)
router.get('/allcategory/:cid',all_category_controller)
router.post('/commentblog',Comment_Blog_controller)
router.get('/comment',Show_comment_controller)
router.put('/commentStatus/:uid',Update_comment_status)
router.get('/commentdelete/:bid',Delete_comment_controller)
router.get('/commentedit/:beid',Edit_comment_controller)
router.put('/commentupdate',Update_comment_controller)
router.post('/replycomment',reply_comment_controller)
router.get('/reply',reply_user)
router.put('/replyStatus/:rid',reply_status_controller)
router.get('/replydelete/:bid',reply_delete_controller)
router.get('/replyedit/:beid',reply_edit_controller)
router.put('/replyupdate',reply_update_controller)
router.post('/subscribe',Subscribe_controller)
router.post('/addtitle',Add_title_controller)
router.get('/gettitle',Get_title_controller)
router.put('/updatetitleStatus/:uid',Upadate_title_status_controller)
router.get('/titledelete/:tid',Delete_title_controller)
router.get('/titleedit/:beid',Edit_title_controller)
router.put('/updatetitle',Update_title_controller)
router.get('/export-csv',Export_csv_controller)
router.post('/filesave',uploadFields,Filesave)
router.post('/categoryfilesave',uploadFields,Category_filesave)
router.post('/mastertitlefilesave',uploadFields,master_title_filesave)
router.get('/sidebar',sidebar_controller)
router.get('/rolepermissin',role_permission_controller)
router.get('/userdata',Api_get_controller)
router.get('/apiblog',Blog_api_controller)
router.post('/apiuserpost',user_post_api_controller)
router.post('/user',User_API)
router.put('/updateuser/:uid',update_api_controller)
router.patch('/patchuser/:pid',patch_api_controller)
router.post('/blogpostapi',Blog_post_api)
// router.post('/generateAndSaveBlogPost',Autoblog_controller)
router.post('/integration',Integration_controller)
router.get('/integrationview',Get_Integration_controller)
router.get('/integrationdelete/:tid',Delete_Integration_controller)
router.get('/editintegration/:beid',Edit_Integration_controller)
router.put('/updateintegration',Update_Integration_controller)
router.put('/updateintegrationStatus/:uid',Upadate_Integration_status_controller)
router.post('/integrationcreate',Integration_create_controller)
router.get('/integrationget',Integration_get_controller)
router.get('/integrationedit/:eid',Integration_edit_controller)
router.get('/integrationfromdelete/:did',Integration_delete_controller)
router.put('/integrationfromupdate',Integration_update_controller)
router.post('/socialmedia',Socialmedia_controller)
router.get('/socialmediaget',Social_media_get_controller)
router.get('/socialmediaedit/:eid',Social_media_edit_controller)
router.get('/socialdelete/:did',Social_media_delete_controller)
router.put('/socialupdate',Social_media_update_controller)
router.post('/indexercrate',Indexer_controller)
router.get('/indexerget',Indexer_get_controller)
router.get('/indexerdelete/:did',Indexer_delete_controller)
router.get('/indexeredit/:eid',Indexer_edit_controller)
router.put('/indexerupdate',Indexer_update_controller)
router.post('/presetcreate',Preset_create_controller)
router.get('/presetget',Preset_get_controller)
router.get('/presetedit/:eid',Preset_edit_controller)
router.get('/presetdelete/:did',Preset_delete_controller)
router.put('/presetupdate',Preset_update_controller)
router.post('/knowledege', Knowledge_controller)
router.get('/knowledegeget',Knowledege_get_controller)
router.get('/knowledegedelete/:did',Knowledege_delete_controller)
router.get('/knowledegeedit/:eid',Knowledege_edit_controller)
router.put('/knowledegeupdate',Knowledege_update_controller)
router.post('/autoblogadd',Autoblog_create_controller)
router.get('/autoblog',Autoblog_get_controller)
router.get('/autoblogedit/:eid',Autoblog_edit_controller)
router.get('/autoblogdelete/:did',Autoblog_delete_controller)
router.put('/autoblogupdate',Autoblog_update_controller)
// router.get('/author',Author_controller)

module.exports = router