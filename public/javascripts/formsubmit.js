const UpdateNodes = (e) =>{
    console.log("Check it->",e.target.name,e, e.target.parentElement)
    var RecordId= e.target.parentElement.children[0].id;
    var RecordText= e.target.parentElement.children[0].value;
    var AcTion = e.target.name;
    var FirstChildText, SecondChildText;
    document.querySelectorAll(".app-header").forEach(e=>{
        FirstChildText = e.children[1].innerText ;
        SecondChildText = e.children[2].innerText ;
        console.log(e.children[0].innerText,e.children[1].innerText,FirstChildText, SecondChildText);
    })
    var FileName = FirstChildText.split(':')[1]+'-'+SecondChildText;
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var DataObject = {}
    DataObject[RecordId] = RecordText
    var raw = JSON.stringify(DataObject);
    var requestOptions = {
    method: 'PUT',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
    };
    if(AcTion === "update"){
        fetch("http://localhost:3000/modifyrecord/"+AcTion+"/"+FileName, requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
    }
    else{
        fetch("http://localhost:3000/modifyrecord/"+AcTion+"/"+FileName, requestOptions)
        .then(response => response.text())
        .then(result => {
            console.log(result)
            e.target.parentElement.remove();
        })
        .catch(error => console.log('error', error));
    }
    e.preventDefault();
}

const fetchdata = () =>{
    /* remove elements */
    console.log("hhhhhhhhhhhhhhhhhh")
    var form = document.querySelector(".modify-form-conn");
    form.innerHTML = ""
    var FirstChildText, SecondChildText;
    document.querySelectorAll(".app-header").forEach(e=>{
        FirstChildText = e.children[1].innerText ;
        SecondChildText = e.children[2].innerText ;
        console.log("inside function",e.children[0].innerText,e.children[1].innerText,FirstChildText, SecondChildText);
    })
    var FileName = FirstChildText.split(':')[1]+'-'+SecondChildText;
    console.log(typeof(FirstChildText), FileName)
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };    
    fetch("http://localhost:3000/display/"+FileName, requestOptions)
    .then(response => response.json())
    .then(result => {
        let heading  =  document.createElement('h3');
        heading.innerText = "Modify File";
        heading.setAttribute('style','margin-top:10px;margin-bottom:30px;font-weight: lighter;');
        document.querySelector(".modify-form-conn").append(heading)
        console.log("here is the result->",result);
        for (const [key, value] of Object.entries(result.response)) {
            console.log(key,value)
            /* here we will create new elements to append them  */
            let outerdiv = document.createElement("div");
            outerdiv.classList.add("d-flex");
            outerdiv.classList.add("email");
            outerdiv.classList.add("mb-3");
            let input = document.createElement("input");
            input.classList.add("form-control");
            input.classList.add("signin-email");
            input.value = value;
            input.setAttribute('id',key)
            input.setAttribute('name','signinemail')

            /* ---------------------------------------------- */

            let heading  =  document.createElement('h3');
            heading.innerText = "Modify File";
            heading.setAttribute('style','margin-top:10px;margin-bottom:30px;font-weight: lighter;');

            /* ---------------------------------------------- */
            let buttonupdate = document.createElement("button");
            buttonupdate.innerText="Update";
            buttonupdate.classList.add("btn");
            buttonupdate.addEventListener("click", UpdateNodes);
            buttonupdate.classList.add("app-btn-primary");
            buttonupdate.classList.add("create-node-text");
            buttonupdate.classList.add("theme-btn");
            buttonupdate.classList.add("mx-auto");
            buttonupdate.setAttribute('style',"margin-left:5px !important");
            buttonupdate.setAttribute('name',"update");

            /* ---------------------------------------------------------- */
            let buttondelete = document.createElement("button");
            buttondelete.classList.add("btn");
            buttondelete.innerText= "DELETE";
            buttondelete.addEventListener("click", UpdateNodes);
            buttondelete.setAttribute('style',"margin-left:5px !important");
            buttondelete.setAttribute('name',"delete")
            buttondelete.classList.add("text-white");
            buttondelete.classList.add("btn-danger");
            buttondelete.classList.add("create-node-text");
            buttondelete.classList.add("theme-btn");
            buttondelete.classList.add("mx-auto");
            outerdiv.append(input)
            outerdiv.append(buttonupdate)
            outerdiv.append(buttondelete)

            document.querySelector(".modify-form-conn").append(outerdiv)            
        }
    })
    .catch(error => console.log('error', error));
}

const DisplayData = () =>{
    var table = document.querySelector('.table');
    table.innerHTML = "";
    var FirstChildText, SecondChildText;

    
    document.querySelectorAll(".app-header").forEach(e=>{
        FirstChildText = e.children[1].innerText ;
        SecondChildText = e.children[2].innerText ;
        console.log(e.children[0].innerText,e.children[1].innerText,FirstChildText, SecondChildText);
    })
    var FileName = FirstChildText.split(':')[1]+'-'+SecondChildText;
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };    
    fetch("http://localhost:3000/display/"+FileName, requestOptions)
    .then(response => response.json())
    .then(result => {
        console.log("here is the result->",result);
        for (const [key, value] of Object.entries(result.response)) {
            console.log(key,value);

            /* here we will create new elements to append them  */

            var tablerow = document.createElement('tr');
            var input =  document.createElement('input');
            input.value = value;
            input.disabled = true;
            input.setAttribute('style','width: 80%; margin: 12px; padding: 10px; font-size: 20px; color: #2aab70; background: #f6e0e6; border: 1px; box-shadow: 1px 1px 2px #bea9a9;');
            tablerow.append(input);
            document.querySelector(".table").append(tablerow)
        }
    })
    .catch(error => console.log('error', error));
}