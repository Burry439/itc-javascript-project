//our ul for holding the list of companies
const companyList = document.getElementById("companyList")

//our div for displaying errors
const errorMessageContainer = document.getElementById("noResults")

//our loader
const loader = document.getElementById("loader")

//add an event listener to our form 
document.getElementById("companyForm").addEventListener("submit", (e) =>{
    
    //prevent the form from refreshing the page
    e.preventDefault()

    //get the list of companies
    getCompanies()
})

// get companies from the api
const getCompanies = async () =>{

    //remove the results from our previous search.
    resetPreviousSearch()

    //display our loader 
    toggleLoader("block")

    //get the value from our input element.
    const query = document.getElementById("query").value
    
    //make a request to the financial modeling prep api.
    const response = await fetch(`https://financialmodelingprep.com/api/v3/search?query=${query}&limit=10&exchange=NASDAQ&apikey=35002e15f80bef1908e94aa2b9a12f5e`)

    //resolve the promise and get the data.
    const companies = await response.json()
    
    //did we find anything? 
    companies.length ? 

    //set list of companies
    setCompanies(companies) : 

    //set an error message
    setErrorMessage(query)

    //hide loader
    toggleLoader("none")
   
}

//set the companies in the UI
const setCompanies = (companies) =>{

    //for ever company we found from our search
    companies.forEach(company => {

        //create an anchor tag element to hold the data and a link to the the company
        const anchorTag = document.createElement("a")
        
        //add attributes to our anchor tag
        Object.assign(anchorTag, {

            //add some classes to make it look nice
            className: "list-group-item company",

            //add an href to company website
            href: `/company.html?symbol=${company.symbol}`,

            //add a _blank target so the link will open in another tab 
            target: "_blank"
        })

        //create a text node to hold the name and symbol of the company
        const anchorTagText = document.createTextNode(`${company.name}  (${company.symbol})`);  
        
        //add the text node to the anchor tag
        anchorTag.appendChild(anchorTagText);    

        //add our newly created anchor tag to our ul element                         
        companyList.appendChild(anchorTag)
    });
}

//set an error message
const setErrorMessage = (query) =>{

    //set error message text
    errorMessageContainer.innerHTML = `Cant find any companies by the name ${query}`

    //show error message
    errorMessageContainer.style.display = "block"
}

//clear the previous results from our last search
const resetPreviousSearch = () =>{
    
    //hide our error message 
    errorMessageContainer.style.display = "none"

    //clear our list of results
    companyList.innerHTML = ""
}

//show or hide the loader
const toggleLoader = (displayOption) =>{
    //if we want to show the loader we set its display option to block 
    //if we want to hide it we set its display option to none 
    loader.style.display = displayOption
}