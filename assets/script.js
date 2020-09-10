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
const storedBreedSelect = JSON.parse(localStorage.getItem("breed"));
const storedHouseTrainedSelect = JSON.parse(localStorage.getItem("house-trained"));
const storedCatsOkSelect = JSON.parse(localStorage.getItem("cats-ok"));
const storedDogsOkSelect = JSON.parse(localStorage.getItem("dogs-ok"));
const storedKidsOkSelect = JSON.parse(localStorage.getItem("kids-ok"));
const storedGenderSelect = JSON.parse(localStorage.getItem("gender"));
const storedSizeSelect = JSON.parse(localStorage.getItem("size"));
const storedAgeSelect = JSON.parse(localStorage.getItem("age"));
const storedDistanceSelect = JSON.parse(localStorage.getItem("distance"));
// GRAB API RESPONSES
breedAPICall();
atRiskAPICall();
dogAPICall();
// POPULATE RESPONSE FOR BREED SELECTION
function breedAPICall() {
	$.ajax({
		url: rgUrl + "species/8/breeds/?limit=300",
		method: "GET",
		headers: {
			"Content-Type": "application/vnd.api+json",
			"Authorization": rgKey,
		},
	}).then(function(response) {
		breedPop(response);
	});
}
// POPULATE RESPONSE FOR DOG SELECTION

function atRiskAPICall() {
	let data = {
		"data": {
			"filters": [
				{
				"fieldName": "animals.priority",
				"operation": "lessthan",
				"criteria": 1
				}
			]
		}
	};
	$.ajax({
		url: rgUrl + "search/available/dogs/?include=pictures",
		method: "POST",
		headers: {
			"Content-Type": "application/vnd.api+json",
			"Authorization": rgKey,
		},
		data: JSON.stringify(data)
	}).then(function(response) {
		console.dir(response);
		atRiskPets(response);
	});
}
function dogAPICall() {
	$.ajax({
		url: rgUrl + "search/available/dogs/?include=pictures",
		method: "GET",
		headers: {
			"Content-Type": "application/vnd.api+json",
			"Authorization": rgKey,
		},
	}).then(function(response) {
		userInputAnimalSearch(response)
	});
}
// CREATES IMAGE CAROUSEL FOR AT RISK DOGS
function atRiskPets(response) {
	let dogImgID;
	let dogImg;
	for (let i = 0; i < response.data.length; i++) {
		dogImgID = response.data[i].relationships.pictures.data[0].id;
		for (let j = 0; j < response.included.length; j++) {
			let dogImgOptions = response.included[j].id;
			if (dogImgOptions === dogImgID) {
				dogImg = response.included[j].attributes.original.url;
				imgLi = $("<li></li>");
				imgLi.addClass("at-risk-li");
				dogImgEl = $("<img>");
				dogImgEl.attr("src", dogImg);
				$(".at-risk").append(imgLi);
				imgLi.append(dogImgEl);
			}
		}
	}
}
// POPULATES BREED OPTIONS
function breedPop (response, breedOp, breedOpEl) {
	for(let i = 0; i < response.data.length; i++) {
		breedOp = response.data[i].attributes.name;
		breedOpEl = $("<option></option>");
		breedOpEl.text(breedOp);
		$(".breed-select").append(breedOpEl);
	}
}
// PREVENT SELECTION OF MUTLIPLE CHOICES IN USER SELECTION OPTIONS
function onlyCheckUserSelect(checkedGroup, checkbox) {
	for(let i = 0; i < (checkedGroup.children).length; i++) {
		let checkbox = (checkedGroup).children[i].children[0];
		console.dir(checkbox)
		checkbox.checked = false;
	}
}
// STORES USER INPUT FOR BREED
function storeBreedSelect() {
	let userBreedSelect = breedSelect[0].value;
	localStorage.setItem("breed", JSON.stringify(userBreedSelect));
}
// STORES USER INPUT FOR HOUSE TRAINING
function storeHouseTrainedSelect(userClick) {
	let userHouseTrainedSelect = userClick.trim().toLowerCase();
	if(userHouseTrainedSelect === "no preference") {
		localStorage.removeItem("house-trained");
	} else {
		localStorage.setItem("house-trained", JSON.stringify(userHouseTrainedSelect));
	}
}
// STORES USER INPUT ON CATS OK SELECTION
function storeCatsOkSelect(userClick) {
	let userCatsOkSelect = userClick.trim().toLowerCase();
	if(userCatsOkSelect === "no preference") {
		localStorage.removeItem("cat-ok");
	} else {
		localStorage.setItem("cat-ok", JSON.stringify(userCatsOkSelect));
	}
}
// STORES USER INPUT ON DOGS OK SELECTION
function storeDogsOkSelect(userClick) {
	let userDogsOkSelect = userClick.trim().toLowerCase();
	if(userDogsOkSelect === "no preference") {
		localStorage.removeItem("dogs-ok");
	} else {
		localStorage.setItem("dogs-ok", JSON.stringify(userDogsOkSelect));
	}
}
// STORES USER INPUT ON KIDS OK SELECTION
function storeKidsOkSelect(userClick) {
	let userKidsOkSelect = userClick.trim().toLowerCase();
	if(userKidsOkSelect === "no preference") {
		localStorage.removeItem("kids-ok");
	} else {
		localStorage.setItem("kids-ok", JSON.stringify(userKidsOkSelect));
	}
}
// STORES USER INPUT FOR GENDER
function storeGenderSelect(userClick) {
	let userGenderSelect = userClick.trim().toLowerCase();
	if(userGenderSelect === "no preference") {
		localStorage.removeItem("gender");
	} else {
		localStorage.setItem("gender", JSON.stringify(userGenderSelect));
	}
}
// STORES USER INPUT FOR SIZE
function storeSizeSelect(userSizeSelect) {
	localStorage.setItem("size", JSON.stringify(userSizeSelect));
}
// STORES USER INPUT FOR AGE
function storeAgeSelect(userAgeSelect) {
	localStorage.setItem("age", JSON.stringify(userAgeSelect));
}
// STORES USER INPUT FOR DISTANCE
function storeDistanceValue(distanceValue) {
	localStorage.setItem("distance", JSON.stringify(distanceValue));
}
// CREATE ANIMAL PROFILE CARDS
function userInputAnimalSearch(response) {
	let dogImgID;
	let dogImg;
	for (let i = 0; i < response.data.length; i++) {
		dogImgID = response.data[i].relationships.pictures.data[0].id;
		for (let j = 0; j < response.included.length; j++) {
			let dogImgOptions = response.included[j].id;
			if (dogImgOptions === dogImgID) {
				dogImg = response.included[j].attributes.original.url;
			}
		}
		let dogName = response.data[i].attributes.name;
		let dogAgeGroup = response.data[i].attributes.ageGroup;
		let dogGender = response.data[i].attributes.sex;
		let dogPrimaryBreed = response.data[i].attributes.breedPrimary;
		let dogSizeGroup = response.data[i].attributes.sizeGroup;
		let dogDescription = response.data[i].attributes.descriptionText;
		let cardContainer = $(".dog-card-container");
		let profileCard = $("<div></div>");
		let highlightContainer = $("<div></div>");
		let descriptionContainer = $("<div></div>");
		let dogProfileImage = $("<div></div>");
		let dogProfileFacts = $("<div></div>");
		let dogImgEl = $("<img>");
		let dogNameEl = $("<h3></h3>");
		let dogAgeGroupEl = $("<h4></h4>");
		let dogGenderEl = $("<h4></h4>");
		let dogPrimaryBreedEl = $("<h4></h4>");
		let dogSizeGroupEl = $("<h4></h4>");
		let dogDescriptionEl = $("<p>" + dogDescription + "</p>");
		profileCard.addClass("dog-profile-card");
		highlightContainer.addClass("highlight-container uk-card dark-background padding-20 uk-child-width-1-2 uk-grid uk-margin-remove");
		dogProfileImage.addClass("dog-profile-image padding-0 uk-card-media-left uk-cover-container");
		dogProfileFacts.addClass("dog-profile-facts padding-0 uk-card-body");
		descriptionContainer.addClass("description-container uk-card dark-background padding-20 uk-card-body");
		dogImgEl.addClass("search-images uk-cover");
		dogImgEl.attr("src", dogImg);
		dogNameEl.text("Name: " + dogName);
		dogAgeGroupEl.text("Age Group: " + dogAgeGroup);
		dogGenderEl.text("Gender: " + dogGender);
		dogPrimaryBreedEl.text("Primary Breed: " + dogPrimaryBreed);
		dogSizeGroupEl.text("Size Group: " + dogSizeGroup);
		cardContainer.append(profileCard);
		profileCard.append(highlightContainer, descriptionContainer);
		highlightContainer.append(dogProfileImage, dogProfileFacts);
		dogProfileImage.append(dogImgEl);
		dogProfileFacts.append(dogNameEl, dogAgeGroupEl, dogGenderEl, dogPrimaryBreedEl, dogSizeGroupEl);
		descriptionContainer.append(dogDescriptionEl);
	}
}
// ***** EVENT LISTENERS *****
// STORES USER BREED SELECTION
breedSelect.on("click", function() {
	storeBreedSelect();
});
// UNCHECKS ALL OPTIONS AND CHECKS BOX FOR USER SELECTION
$(".uk-checkbox").on("click", function() {
	let checkedGroup = ($(this).parent()).parent()[0];
	let userClick = $(this)[0].nextSibling.textContent;
	console.dir(checkedGroup)
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
	} else {
		onlyCheckUserSelect(checkedGroup, checkbox);
	}
});
// UPDATES SIZE TEXT BASED ON USER SELECTION
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
// UPDATES AGE TEXT BASED ON USER SELECTION
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
// UPDATES DISTANCE TEXT BASED ON USER SELECTION
distanceSelect.on("input", function(distanceText, distanceValue) {
	distanceText = $(".distance-text");
	distanceValue = parseInt(this.value);
	distanceText.text("Distance: " + distanceValue + " Miles");
	storeDistanceValue(distanceValue);
	if(distanceValue === 0) {
		localStorage.removeItem("distance");
		distanceText.text("Distance: No Preference");
	}
});
searchBtn.on("click", function() {
	event.preventDefault();
});
// function to get user selections
// use click listeners on each selection and stores in the variables
//function to fetch API data based on user selections
//function to populate html elements based on response