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
// Event Listeners
// Changes text based on size selection
sizeSelect.on("input", function(sizeText) {
	sizeText = $(".size-text");
	if(parseInt(this.value) === 0) {
    sizeText.text("Size Group: No Preference");
  } else if(parseInt(this.value) === 1) {
		sizeText.text("Size Group: Small");
	} else if(parseInt(this.value) === 2) {
		sizeText.text("Size Group: Medium");
	} else if(parseInt(this.value) === 3) {
		sizeText.text("Size Group: Large");
	} else if(parseInt(this.value) === 4) {
		sizeText.text("Size Group: Extra Large");
	}
});
// Changes text based on age selection
ageSelect.on("input", function(ageText) {
	ageText = $(".age-text");
	if(parseInt(this.value) === 0) {
    ageText.text("Age Group: No Preference");
  } else if(parseInt(this.value) === 1) {
		ageText.text("Age Group: Puppy");
	} else if(parseInt(this.value) === 2) {
		ageText.text("Age Group: Young");
	} else if(parseInt(this.value) === 3) {
		ageText.text("Age Group: Adult");
	} else if(parseInt(this.value) === 4) {
		ageText.text("Age Group: Senior");
	}
});
// Changes text based on distance option
distanceSelect.on("input", function(distanceText, distanceValue) {
	distanceText = $(".distance-text");
	distanceValue = parseInt(this.value);
	distanceText.text("Distance: " + distanceValue + " Miles");
});
// only selects user's input for checkbox options
$(".uk-checkbox").on("click", function() {
	let checkedGroup = ($(this).parent()).parent()[0];
	if(checkedGroup === houseTrainedSelect) {
		onlyCheckUserSelect(checkedGroup);
		this.checked = true;
	} else if(checkedGroup === catsOkSelect) {
		onlyCheckUserSelect(checkedGroup);
		this.checked = true;
	} else if(checkedGroup === dogsOkSelect) {
		onlyCheckUserSelect(checkedGroup);
		this.checked = true;
	} else if(checkedGroup === kidsOkSelect) {
		onlyCheckUserSelect(checkedGroup);
		this.checked = true;
	} else if(checkedGroup === genderSelect) {
		onlyCheckUserSelect(checkedGroup);
		this.checked = true;
	}
});
// function to get user selections
// use click listeners on each selection and stores in the variables
//function to fetch API data based on user selections
//function to populate html elements based on reponse