const rgUrl = "https://test1-api.rescuegroups.org/v5/";
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

popPageData();

// Populates images of pets
function popPageData() {
  $.ajax({
    url: rgUrl + "public/animals/search/available/dogs",
    method: "GET",
    headers: {
      "Content-Type": "application/vnd.api+json",
      "Authorization": rgKey,
    },
    data: {
      "fieldName": "species.singular",
      "operation": "equals",
      "criteria": "Dog"
  },
  }).then(function(response) {
    atRiskImg(response);
    console.dir(response);
  });
}

function atRiskImg(response) {
  for (let i = 0; i < response.data.length; i++) {
    petImg = response.data[i].attributes.pictureThumbnailUrl;
    petImgEl = $("<img>");
    petImgEl.attr("src", petImg);
    $(".at-risk").append(petImgEl);
    console.log(petImg);
  }
}

//function to create carousel images
// takes dogs that are close to euthanization and creates image elements for them 

// function to get user selections
  // use click listeners on each selection and stores in the variables

//function to fetch API data based on user selections

//function to populate html elements based on reponse