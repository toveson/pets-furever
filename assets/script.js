const rgUrl = "https://test1-api.rescuegroups.org/v5/public/animals/";
const rgKey = "k4QortUC";
//search variables
const breedSelect = $(".breed-select");
const houseTrainedSelect = $(".house-trained")[0];
const catsOkSelect = $(".cats-ok")[0];
const dogsOkSelect = $(".dogs-ok")[0];
const kidsOkSelect = $(".kids-ok")[0];
const genderSelect = $(".gender-select")[0];
const sizeSelect = $(".size-select");
const ageSelect = $(".age-select");
const distanceSelect = $(".distance-select");
// image variables
let petImg;

$(".uk-checkbox").on("click", function() {
  let checkboxSelect = ($(this).parent()).parent()[0];
  
  if (checkboxSelect === houseTrainedSelect) {
    console.log("house trained")
  }
  else if (checkboxSelect === catsOkSelect) {
    console.log("cats okay")
  }
  else if (checkboxSelect === dogsOkSelect) {
    console.log("dogs okay")
  }
  else if (checkboxSelect === kidsOkSelect) {
    console.log("kids okay")
  }
  else if (checkboxSelect === genderSelect) {
    console.log("gender")
  }
})

populatePage();

function populatePage() {
  atRiskPets();
  breedPop();
}

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
      imgLi = $("<li></li>");
      imgLi.addClass("uk-width-1-6");
      petImgEl = $("<img>");
      petImgEl.attr("src", petImg);

      $(".at-risk").append(imgLi);
      imgLi.append(petImgEl);
    }
  });
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
  });
}

// Event Listeners
// Changes text based on size selection
sizeSelect.on("input", function() {
  sizeText = $(".size-text")
    if (parseInt(this.value) === 1) {
      sizeText.text("Size Group: Small");
    }
    else if (parseInt(this.value) === 2) {
      sizeText.text("Size Group: Medium");
    }
    else if (parseInt(this.value) === 3) {
      sizeText.text("Size Group: Large");
    }
    else if (parseInt(this.value) === 4) {
      sizeText.text("Size Group: Extra Large");
    }
})
// Changes text based on age selection
ageSelect.on("input", function() {
  ageText = $(".age-text")
    if (parseInt(this.value) === 1) {
      ageText.text("Age Group: Puppy");
    }
    else if (parseInt(this.value) === 2) {
      ageText.text("Age Group: Young");
    }
    else if (parseInt(this.value) === 3) {
      ageText.text("Age Group: Adult");
    }
    else if (parseInt(this.value) === 4) {
      ageText.text("Age Group: Senior");
    }
})
// Changes text based on distance option
distanceSelect.on("input", function() {
  distanceText = $(".distance-text");
  distanceValue = parseInt(this.value);
  distanceText.text("Distance: " + distanceValue + " Miles");
})


// function to get user selections
  // use click listeners on each selection and stores in the variables

//function to fetch API data based on user selections

//function to populate html elements based on reponse