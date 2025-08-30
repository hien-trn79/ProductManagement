import morgan from 'morgan';
import express from 'express';
import {engine} from 'express-handlebars';
import path, { extname } from 'path';
import { fileURLToPath } from 'url';
import sass, { compileString } from 'sass';
import fs, { rmSync } from 'fs'
import route from './routes/index.js';
import db from './config/db/connect.js';
import methodOverride from 'method-override';
import SortMiddleware from './app/middlewares/SortMiddleware.js';
import Staff from './app/models/Staff.js';
import myMongoose from './util/mongoose.js'

const app = express();
const port = 3000;

// app.use(morgan('combined'));
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(methodOverride('_method'));

// Middleware custom => ap dung cho toan bo file
app.use(SortMiddleware)

// tra ve path hien tai dung locals
app.use((req, res, next) => {
    res.locals.currentPath = req.path;
    next();
})

// Tra ve danh sach tin nhan => local
app.use(async (req, res, next)=> {
    let staffs = await Staff.find({});
    staffs = await myMongoose.multileMongooseToObject(staffs)
    res.locals.staffs = staffs;
    next();
}) 

//Giai ma dang duong dan
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//Templete engine
app.engine('hbs', 
    engine({
        extname: '.hbs',
        helpers: {
            sortable: (fieldname, sort) => {
                const icons = {
                    default: 'fa-sort',
                    asc: 'fa-arrow-up-a-z',
                    desc: 'fa-arrow-down-a-z'
                }

                const types = {
                    default: 'asc',
                    asc: 'desc',
                    desc: 'asc'
                }

                const icon = icons[sort.type];
                const type = types[sort.type];

                return `
                <a href="?_sort&product_debut=name&type=${type}">
                    <i class="fa-solid ${icon} summary--icon sort-icon"></i>
                </a>
                `
            },

            loop: (start, n, list, options) => {
                let accum='';
                for(let i = start; i<start+n; i++) {
                    accum += options.fn(list[i])
                }
                return accum;
            }
        }
    })
);

//Set vi tri luu tru cac views
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, "resource/views"))

//Tao 1 file tinh => ho tro cho viec chuyen doi scss => css
app.use(express.static(path.join(__dirname, "public")));
//Ham compile
function compileSCSS() {
    try {
        const result = sass.compile(path.join(__dirname, "resource/scss/app.scss"));
        fs.writeFileSync(path.join(__dirname, "public/css/app.css"), result.css);
    } catch(error) {
        console.log("Loi bien dich");
        console.log(error);
    }
}

compileSCSS();

//Cap nhat thay doi tu scss va css
fs.watch(path.join(__dirname, "resource/scss/app.scss"), (event, __filename) => {
    if(__filename.endsWith('.scss')) {
        compileSCSS();
    }
})

route(app);

// Ket noi voi database
db.connect();

app.listen(port, () => {
    console.log(`Example app listening on port http://localhost:${port}`);
})