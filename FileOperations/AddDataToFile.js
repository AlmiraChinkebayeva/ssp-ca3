const fs = require('fs');
var path= require('path');
const AddData = (data, FileName, AutoGeneratedString, FilePassword) =>{
    console.log("from function -> addddata ", data)
    return new Promise((resolve, reject) => {
        var exists = false
        fs.readdir(
            path.resolve(__dirname, '../UserFiles'),
            (err, files) => {
                if (err) throw err;

                for (let file of files) {
                    console.log(file)
                    console.log(file.split('-'))
                    var ExistFileName = file.split('-')[0]
                    var RandomString = file.split('-')[1]
                    var ExistFilePassWord = file.split('-')[2]
                    if(ExistFileName === FileName && RandomString === AutoGeneratedString && ExistFilePassWord == FilePassword )
                    {
                        console.log("hye", ExistFileName,RandomString,ExistFilePassWord)
                        const content = fs.readFileSync(path.resolve(__dirname, '../UserFiles',ExistFileName+'-'+RandomString+'-'+ExistFilePassWord+'-File.json'),{encoding:'utf8', flag:'r'});
                        if(content != ""){
                            console.log("inside->",content)
                            var filedata = JSON.parse(content);
                            console.log(filedata)
                            // filedata.push(data)
                            /* for adding values in already existing object */
                            for (const [key, value] of Object.entries(data)) {
                                filedata[key] = value
                            }
                            console.log(filedata);
                            fs.writeFileSync(path.join(__dirname,"../UserFiles",ExistFileName+'-'+RandomString+'-'+ExistFilePassWord+'-File.json'), JSON.stringify(filedata));
                            // fs.writeFile(path.join(__dirname,"../UserFiles",ExistFileName+'-'+RandomString+'-'+ExistFilePassWord+'-File.json'), JSON.stringify(filedata), err => {
                            //     if (err) {
                            //       console.error(err)
                            //       return 
                            //     }
                            // })
                        }
                        else{
                            console.log("------------else ----------")
                            fs.appendFileSync(path.join(__dirname,"../UserFiles",ExistFileName+'-'+RandomString+'-'+ExistFilePassWord+'-File.json'), JSON.stringify(data));
                        }
                        // fs.readFile(path.resolve(__dirname, '../UserFiles',ExistFileName+'-'+RandomString+'-'+ExistFilePassWord+'-File.json'), 'utf-8', function(err, content) {
                        //     if (err) {
                        //         console.log("error",err)
                        //         return;
                        //     }
                        //     else{
                        //         if(content != ""){
                        //             console.log("inside->",content)
                        //             var filedata = JSON.parse(content);
                        //             console.log(filedata)
                        //             // filedata.push(data)
                        //             /* for adding values in already existing object */
                                    // for (const [key, value] of Object.entries(data)) {
                                    //     filedata[key] = value
                                    // }
                        //             console.log(filedata)
                        //             fs.writeFile(path.join(__dirname,"../UserFiles",ExistFileName+'-'+RandomString+'-'+ExistFilePassWord+'-File.json'), JSON.stringify(filedata), err => {
                        //                 if (err) {
                        //                   console.error(err)
                        //                   return
                        //                 }
                        //             })
                        //         }
                        //         else{
                                    // console.log("------------")
                                    // fs.appendFile(path.join(__dirname,"../UserFiles",ExistFileName+'-'+RandomString+'-'+ExistFilePassWord+'-File.json'),JSON.stringify(data), 'utf8',
                                    // // callback function
                                    // function(err) {     
                                    //     if (err) throw err;
                                    //     // if no error
                                    //     console.log("Data is appended to file successfully.")
                        //             });
                        //         }
                        //     }
                        //   });
                        exists = true
                    }
                }
                resolve(exists)
            }
        );
    })
}

module.exports.AddData = AddData