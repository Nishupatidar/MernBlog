const mongoose = require("mongoose")
mongoose.connect(`mongodb+srv://patidarnisha2003:HuMzdTvd3BtwiY7P@cluster0.m3p26jq.mongodb.net/?retryWrites=true&w=majority`)
const PresetSchema = mongoose.Schema({

    presetname: { type: String,require },
    generationmode: { type: String , default:"" },
    title: { type: String, default: "" },
    keyword: { type: String, default: "" },
    description: { type: String, default: "" },
    language: { type: String, default: "" },
    country: { type: String, default: 0 },
    creativity: { type: Number, default: 0 },
    voice: { type: String, default: "" },
    pointofview: { type: String, default: "" },
    costominstruction: { type: String, default: "" },
    exactkeyword: { type: String, default: "" },
    webconnect: { type: Number, default:0  },
    knowledgebase: { type: String, default: "" },
    blod:{type:Number ,default:0},
    italics:{type:Number,default:0},
    tables:{type:Number,default:0},
    quotes:{type:Number,default:0},
    url:{type:Array,default:[]},
    key:{type:Number, default:0 },
    conclusion:{type:Number,default:0},
    articlesize:{type:String,default:""},
    automateheadings:{type:Number,default:0},
    calltoaction:{type:String,default:""},
    youtubelink:{type:String,default:""},
    imageprovider:{type:String,default:""},
    customimage:{type:String,default:""},
    promptimage:{type:String,default:""},
    featuredimage:{type:Number,default:0},
    articleimage:{type:Number,defaullt:1},
    youtubevideo:{type:Number,default:0},
    created_at: { type: Date ,default:null},
    updated_at: { type: Date , default:null }
})





const Preset_Create = mongoose.model('Preset', PresetSchema)

module.exports = Preset_Create