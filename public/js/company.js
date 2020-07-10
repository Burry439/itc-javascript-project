

const setSymbol = () =>{

  //get the search params
  const params = new URLSearchParams(window.location.search)

  //get the company symbol
  const symbol = params.get("symbol");

  //get a reference to the jumbotron 
  const comapnyContainer = document.getElementById("company")

  //add the company symbol to the jumbotron
  comapnyContainer.innerHTML = `${symbol}`
}


setSymbol()
