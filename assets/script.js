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
const searchBtn = $(".search-pets");
// image variables
let petImg;
populatePage();
// populates the page with dynamic data from API
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
	}).then(function(response, imgLi, petImgEl) {
		for(let i = 0; i < response.data.length; i++) {
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
	}).then(function(response, breedOp, breedOpEl) {
		for(let i = 0; i < response.data.length; i++) {
			breedOp = response.data[i].attributes.name;
			breedOpEl = $("<option></option>");
			breedOpEl.text(breedOp);
			$(".breed-select").append(breedOpEl);
		}
	});
}
// Unchecks boxes in an option group so that only the user option is shown
function onlyCheckUserSelect(checkedGroup) {
	for(let i = 0; i < (checkedGroup.children).length; i++) {
		let checkbox = (checkedGroup).children[i].children[0];
		checkbox.checked = false;
	}
}

// stores the user's input for breed
function storeBreedSelect() {
  let userBreedSelect = breedSelect[0].value;
  localStorage.setItem("breed", JSON.stringify(userBreedSelect));
}
// stores the user's input for house training
function storeHouseTrainedSelect(userClick) {
  let userHouseTrainedSelect = userClick.trim().toLowerCase();
  if (userHouseTrainedSelect === "no preference") {
    localStorage.removeItem("house-trained");
  } else {
    localStorage.setItem("house-trained", JSON.stringify(userHouseTrainedSelect));
  }
}
// stores the user's input for cats ok
function storeCatsOkSelect(userClick) {
  let userCatsOkSelect = userClick.trim().toLowerCase();
  if (userCatsOkSelect === "no preference") {
    localStorage.removeItem("cat-ok");
  } else {
    localStorage.setItem("cat-ok", JSON.stringify(userCatsOkSelect));
  }
}
// stores the user's input for dogs ok
function storeDogsOkSelect(userClick) {
  let userDogsOkSelect = userClick.trim().toLowerCase();
  if (userDogsOkSelect === "no preference") {
    localStorage.removeItem("dogs-ok");
  } else {
    localStorage.setItem("dogs-ok", JSON.stringify(userDogsOkSelect));
  }
}
// stores the user's input for kids ok
function storeKidsOkSelect(userClick) {
  let userKidsOkSelect = userClick.trim().toLowerCase();
  if (userKidsOkSelect === "no preference") {
    localStorage.removeItem("kids-ok");
  } else {
    localStorage.setItem("kids-ok", JSON.stringify(userKidsOkSelect));
  }
}
// stores the user's input for gender
function storeGenderSelect(userClick) {
  let userGenderSelect = userClick.trim().toLowerCase();
  if (userGenderSelect === "no preference") {
    localStorage.removeItem("gender");
  } else {
    localStorage.setItem("gender", JSON.stringify(userGenderSelect));
  }
}
// stores the user's input for size
function storeSizeSelect(userSizeSelect) {
  localStorage.setItem("size", JSON.stringify(userSizeSelect));
}
// stores the user's input for age
function storeAgeSelect(userAgeSelect) {
  localStorage.setItem("age", JSON.stringify(userAgeSelect));
}
// stores the user's input for distance
function storeDistanceValue(distanceValue) {
  localStorage.setItem("distance", JSON.stringify(distanceValue));
}
// Event Listeners
breedSelect.on("click", function() {
  storeBreedSelect();
})
// only selects user's input for checkbox options
$(".uk-checkbox").on("click", function() {
  let checkedGroup = ($(this).parent()).parent()[0];
  let userClick = $(this)[0].nextSibling.textContent;
	if(checkedGroup === houseTrainedSelect) {
    storeHouseTrainedSelect(userClick);
		onlyCheckUserSelect(checkedGroup);
		this.checked = true;
	} else if(checkedGroup === catsOkSelect) {
    storeCatsOkSelect(userClick);
		onlyCheckUserSelect(checkedGroup);
		this.checked = true;
	} else if(checkedGroup === dogsOkSelect) {
    storeDogsOkSelect(userClick);
		onlyCheckUserSelect(checkedGroup);
		this.checked = true;
	} else if(checkedGroup === kidsOkSelect) {
    storeKidsOkSelect(userClick);
		onlyCheckUserSelect(checkedGroup);
		this.checked = true;
	} else if(checkedGroup === genderSelect) {
    storeGenderSelect(userClick);
		onlyCheckUserSelect(checkedGroup);
		this.checked = true;
	}
});
// Changes text based on size selection
sizeSelect.on("input", function(sizeText) {
  sizeText = $(".size-text");
  let userSizeSelect;
	if(parseInt(this.value) === 0) {
    localStorage.removeItem("size");
    sizeText.text("Size Group: No Preference");
  } else if(parseInt(this.value) === 1) {
    userSizeSelect = "small";
    storeSizeSelect(userSizeSelect);
		sizeText.text("Size Group: Small");
	} else if(parseInt(this.value) === 2) {
    userSizeSelect = "medium";
    storeSizeSelect(userSizeSelect);
		sizeText.text("Size Group: Medium");
	} else if(parseInt(this.value) === 3) {
    userSizeSelect = "large";
    storeSizeSelect(userSizeSelect);
		sizeText.text("Size Group: Large");
	} else if(parseInt(this.value) === 4) {
    userSizeSelect = "extra large";
    storeSizeSelect(userSizeSelect);
		sizeText.text("Size Group: Extra Large");
	}
});
// Changes text based on age selection
ageSelect.on("input", function(ageText) {
  ageText = $(".age-text");
  let userAgeSelect;
	if(parseInt(this.value) === 0) {
    localStorage.removeItem("age");
    ageText.text("Age Group: No Preference");
  } else if(parseInt(this.value) === 1) {
    userAgeSelect = "puppy";
    storeAgeSelect(userAgeSelect);
		ageText.text("Age Group: Puppy");
	} else if(parseInt(this.value) === 2) {
    userAgeSelect = "young";
    storeAgeSelect(userAgeSelect);
		ageText.text("Age Group: Young");
	} else if(parseInt(this.value) === 3) {
    userAgeSelect = "adult";
    storeAgeSelect(userAgeSelect);
		ageText.text("Age Group: Adult");
	} else if(parseInt(this.value) === 4) {
    userAgeSelect = "senior";
    storeAgeSelect(userAgeSelect);
		ageText.text("Age Group: Senior");
	}
});
// Changes text based on distance option
distanceSelect.on("input", function(distanceText, distanceValue) {
	distanceText = $(".distance-text");
  distanceValue = parseInt(this.value);
  console.log(distanceValue)
  distanceText.text("Distance: " + distanceValue + " Miles")
  storeDistanceValue(distanceValue);
  if(distanceValue === 0) {
    localStorage.removeItem("distance");
    distanceText.text("Distance: No Preference")
  }
});

searchBtn.on("click", function() {
  event.preventDefault();
  localStorage.clear();
})
// function to get user selections
// use click listeners on each selection and stores in the variables
//function to fetch API data based on user selections
//function to populate html elements based on reponse