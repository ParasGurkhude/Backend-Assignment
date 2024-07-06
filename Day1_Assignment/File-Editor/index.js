const path = require("path");
const fs = require("fs");
const { error } = require("console");

const operation = process.argv[2];
const file = process.argv[3];
const content = process.argv[4];


const readTheFile = (file) => {
    fs.readFile(file, "utf-8", (err, data) => {
        if (err) {
            console.log(err);
        } else {
            console.log(data);
        }
    })
}

const deleteTheFile = (path) => {
    fs.unlink(path, (err) => {
        if(err){
            console.log(err);
        }
    })
}
const createTheFile = (file, content) => {
  fs.writeFile(file, content, (err)=>{
    if (err) {
      console.log(err);
    } else {
      console.log("New file created");
    }
  })
}
const appendTheFile = (file, content) => {
  const newLine = (content+"\n")
  fs.appendFile(file, newLine , (err) => {
    if(err){
      console.log(err);
    }
    console.log("The 'data to append' was appended to file!");
  })
}
const renameTheFile = (file) => {
  fs.rename('oldFile.txt', 'newFile.txt', (err) => {
    if (err) throw err;
    console.log('Rename complete!');
  })
}

const directoryPath = "."
const listTheFile = (directoryPath) => {
  fs.readdir(directoryPath, (err, files) => {
    if (err) {
        console.error(err);
    } else {
        console.log("Files in the directory:");
        files.forEach((fil) => {
            console.log(fil);
        });
    }
  });
}


switch (operation) {
  // complete the fillowing function.
  case "read" :
    if(file){
        readTheFile(file)
    }
    break;
  case "delete" :
    if (file) {
        deleteTheFile(file)
    }
    break;
  case "create" :
    if (file) {
        createTheFile(file, content)
    }
    break;
  case "append" :
    if (file) {
        appendTheFile(file, content)
    }
    break;
  case "rename" :
    if (file) {
        renameTheFile(file)
    }
    break;
  case "list" :
      listTheFile(directoryPath)
    break;
    
  default:
    console.log(`Invalid operation '${operation}'`);
}
