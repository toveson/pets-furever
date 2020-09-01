const rgUrl = "https://test1-api.rescuegroups.org/v5/public/animals/";
const rgKey = "k4QortUC";

// search variables
let breedSelect;
let sizeSelect;
let sexSelect;
let ageSelect;
let houseTrainedSelect;
let okCatsSelect;
let okDogsSelect;
let okKidsSelect;
let colorsSelect;

// image variables
let petImg;

populatePage();

function populatePage() {
  atRiskPets();
  breedPop();
};

// Creates images for at risk dogs to add to front page on load
function atRiskPets() {
  $.ajax({
    url: rgUrl + "search/available/dogs",
    method: "GET",
    headers: {
      "Content-Type": "application/vnd.api+json",
      "Authorization": rgKey,
    },
  }).then(function(response) {
    console.dir(response);
    for (let i = 0; i < response.data.length; i++) {
      petImg = response.data[i].attributes.pictureThumbnailUrl;
      petImgEl = $("<img>");
      petImgEl.attr("src", petImg);
      $(".at-risk").append(petImgEl);
    }
  })
}
// populates breed selection options
function breedPop() {
  $.ajax({
    url: rgUrl + "species/8/breeds/?limit=300",
    method: "GET",
    headers: {
      "Content-Type": "application/vnd.api+json",
      "Authorization": rgKey,
    },
  }).then(function(response) {
    console.dir(response);
    for (let i = 0; i < response.data.length; i++) {
      breedOp = response.data[i].attributes.name;
      breedOpEl = $("<option></option>");
      breedOpEl.text(breedOp);
      $(".breed-select").append(breedOpEl);
    }
  })
}


// function to get user selections
  // use click listeners on each selection and stores in the variables

//function to fetch API data based on user selections

//function to populate html elements based on reponse