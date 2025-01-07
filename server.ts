import express, { Request, Response } from "express";


// configures dotenv to work in your application
const app = express();

app.use(express.json())
const PORT = 3000
const db = require('./config/Sequelize');

db.authenticate().then((_:any) =>{ console.log('Database connected') })
 .catch((err:any) => console.error('Error connecting to database:', err));



///////////////////////////////////

app.get("/", (request: Request, response: Response) => { 
  response.status(200).send("Hello World");
}); 


//api get 
app.get("/city/:name", (request: Request, response: Response) => {
    
    db.query(`SELECT * FROM db."page_static_ville" WHERE name=?`, {
        replacements:[request.params.name],
        type: db.QueryTypes.SELECT }).then((resp:any) =>{

        console.log('Database seletion',resp)
        response.status(200).send({result:resp});

        
    })
  });
  /////////////////////////////
  app.get("/add", (request: Request, response: Response) => {
    
    db.query(`select count(*) from db."hotel" `, {
        replacements:[request.body.id,request.body.name,request.body.description],
        type: db.QueryTypes.SELECT }).then((resp:any) =>{

        response.status(200).send({message:'created successfully'});

        
    })
});

////////////////////////////////
app.put("/update/:id", (request: Request, response: Response) => { 
    
    db.query(`UPDATE db.page_static_ville
	SET  name=?, description=?
	WHERE id=?;`, {
        replacements:[request.body.name,request.body.description,request.params.id],
        type: db.QueryTypes.UPDATE }).then((resp:any) =>{

        response.status(200).send({message:'updated successfully'});

        
    })
  });


/////////////////////
app.get("/hotels/:place", (request:Request,response:Response) =>{

db.query(`select * from db."hotel" where place=?` ,{
    replacements:[request.params.name],type:db.QueryTypes.SELECT
    }).then((resp:any)=>{
        console.log('database selection ',resp)
        response.status(200).send({result:resp});
    })

});
////////////////
app.post("/ad", (request: Request, response: Response) => {
    
    const { id, name, place } = request.body;
    db.query(`INSERT INTO db."hotel" (id, name, place) values(?,?,?)`, {
        replacements:[id,name,place],
        type: db.QueryTypes.INSERT }).then((resp:any) =>{
        response.status(200).send({message:'created successfully'});
        
    })
});
//fgjkjhjkkjhgfjdfhgjhkjlhjkm
app.get("/aa/:name", (request: Request, response: Response) => {
    
    db.query(`delete from db.hotel where name=?`, {
        replacements:[request.params.name],
        type: db.QueryTypes.DELETE }).then((resp:any) =>{

        console.log('DELETE SUCCEFULY',resp)
        response.status(200).send({result:resp});

        
    })
});
////////////////////////////

  





app.listen(PORT, () => {
console.log("Server running at PORT: ", PORT);
}).on("error", (error: { message: string | undefined; }) => {
  // gracefully handle error
throw new Error(error.message);
});