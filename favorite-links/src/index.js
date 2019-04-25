const express = require('express')                //requerimos express para crear el server
const morgan = require('morgan')                  //sirve para mostrar x consola las peticiones que van llegando
const path = require('path')                      //modulo de node
const exphbs = require('express-handlebars')      //motor de plantillas

const bodyParser = require('body-parser');

//inicializations
const app = express() //iniciar express


//settings
app.set('port', process.env.PORT || 4000)         //en que puerto va funcionar la app
app.set('views', path.join(__dirname, 'views'))   //establezco donde esta la carpeta views, __dirname devuelve el path actual de este archivo

app.engine('.hbs', exphbs({
  defaultLayout: 'main',                                  // nombre de la plantilla principal (views/layouts), partes comun de la app: navegacion, footer, etc
  layoutsDir: path.join(app.get('views'), 'layouts'),     //ubicacion de la carpeta layouts
  partialsDir: path.join(app.get('views'), 'partials'),   //partials: fragmentos de codigo reutilizables en las vistas
  extname: '.hbs',                                        // extension de los archivos handlebars
  helpers: require('./lib/handlebars')                    //archivos accesorios por afuera de handlebars
}))
app.set('view engine', '.hbs')                            //activar el motor de plantillas hbs


//middlewares
app.use(morgan('dev'))
//NO ME FUNCIONAN LAS RUTAS CON EXPRESS, USO BODY-PARSER
//app.use(express.urlencoded({extended: false}));//aceptar desde los form los datos que envia el usuario, extended: false solo acepta texto y no imagenes por ejemplo
//app.use(express.json());//para poder enviar y recibir JSON
app.use(bodyParser.urlencoded({extended: false}));//aceptar desde los form los datos que envia el usuario, extended: false solo acepta texto y no imagenes por ejemplo
app.use(bodyParser.json());//para poder enviar y recibir JSON

//global variables
app.use((req, res, next) => {
  next()
})

//routes
app.use(require('./routes/index.js'))   //index.js no haria falta escribirlo , lo tomaria x default
app.use(require('./routes/authentication'))   
app.use('/links', require('./routes/links'))   //antecede siempre la ruta /links 

//public
app.use(express.static(path.join(__dirname, 'public')))   //defino la ruta publica para img, css, etc


//starting the server
app.listen(app.get('port'), () => {
  console.log('Server on port ', app.get('port'))
})
