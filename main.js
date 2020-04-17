import mongoose from 'mongoose';  //import your packages 


// setting mongoose to global
mongoose.Promise = global.Promise;

// setting schema to global  
const Schema = mongoose.Schema;

// create variables for connection to MongoDB
const mongoDBUrl = "localhost"; //url
const mongoDBPort = "27017";    //port used
const mongoDBDatabase = "Module3Assignment"; //database name 

//create a schema object representing students
const studentSchema = new Schema({

    FirstName: { type: "String", required: true},
    LastName: { type: "String", required: true},
    Major: { type: "String", required: true},
    PhoneNumber: { type: "String", required: true},
    Address: { type: "String", required: true},
    City: { type: "String", required: true},
    State: { type: "String", required: true},
    Zip: { type: "number", required: true},
    RegistrationStatus: { type: "String", required: true},

});

//set the defined schema as a model for Mongoose to use
const Student = mongoose.model("Student", studentSchema, "Student"); // "namd of model", schemaObject, "name of collection in DB"

// asynchronous functions to connect to DB
const connectToDB = async() => { // the async keyword makes this function an asynchronous function
    //This function will extablish the connection to the MongoDB DBMS
    try {
        //code that could cause an exception (or error) is written here
        const connectionInfo = `mongodb://${mongoDBUrl}:${mongoDBPort}/${mongoDBDatabase}`; //how we make our connection string
        const mongoDBConfigObject = {
            useNewUrlParser: true, 
            useUnifiedTopology: true
        };

        //await makes this part of javascript wait until it gets resolved(complete).  You can only use await within async functions
        await mongoose.connect(connectionInfo, mongoDBConfigObject); //insert our connection string and jason file

    }catch (err){
        //code to execute if an exception is raised (or thrown)
        //usually some kind of error recording code
        console.log(err);

    }
}

//write a function that can read all Student documents
const getAll = async() => {
    // use a try catch becuase of IO code
    try{
        // the moduleObject.find() will return a document or documents if no filter is specified.
        await Student.find().exec((err, StudentCollection) => {
            if(err){
                console.log(err);
            }
            //if we don't have an error, do something with them
            console.log({ StudentCollection });
        });
    }catch(err){
        console.log(err);
    }
}



//async functions can be called in the top-level of your code, but they CANNOT USE await.
//to get around that, create an entry point function that is async and then call your other async functions in that.
const main = async() => {
    // call your other async functions here
    // you can also write regular JS code here as well
    await connectToDB();
    await getAll();
}

//calling the main entry point
main();


