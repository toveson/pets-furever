var rgUrl = "https://test1-api.rescuegroups.org/v5/public/animals/";
var rgKey = "k4QortUC";
//search variables
var breedSelect = $(".breed-select");
var houseTrainedSelect = $(".house-trained")[0];
var catsOkSelect = $(".cats-ok")[0];
var dogsOkSelect = $(".dogs-ok")[0];
var kidsOkSelect = $(".kids-ok")[0];
var genderSelect = $(".gender-select")[0];
var sizeSelect = $(".size-select");
var ageSelect = $(".age-select");
var distanceSelect = $(".distance-select");
var submitSearch = $(".submit-search");
var storedBreedSelect = JSON.parse(localStorage.getItem("breed"));
var storedHouseTrainedSelect = JSON.parse(localStorage.getItem("house-trained"));
var storedCatsOkSelect = JSON.parse(localStorage.getItem("cats-ok"));
var storedDogsOkSelect = JSON.parse(localStorage.getItem("dogs-ok"));
var storedKidsOkSelect = JSON.parse(localStorage.getItem("kids-ok"));
var storedGenderSelect = JSON.parse(localStorage.getItem("gender"));
var storedSizeSelect = JSON.parse(localStorage.getItem("size"));
var storedAgeSelect = JSON.parse(localStorage.getItem("age"));
var storedDistanceSelect = JSON.parse(localStorage.getItem("distance"));
// GRAB API RESPONSES
breedAPICall();
atRiskAPICall();
userSearchAPICall();
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
	var data = {
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
		url: rgUrl + "search/available/dogs/haspic?include=pictures&limit=50",
		method: "POST",
		headers: {
			"Content-Type": "application/vnd.api+json",
			"Authorization": rgKey,
		},
		data: JSON.stringify(data)
	}).then(function(response) {
		atRiskPets(response);
	});
}
function userSearchAPICall() {
	var breedCriteria;
	var houseTrainedCriteria;
	var catsOkCriteria;
	var dogsOkCriteria;
	var kidsOkCriteria;
	var genderCriteria;
	var sizeCriteria;
	var ageCriteria;
	var distanceCriteria;
	var filterRadius = {
		"miles": 250,
		"postalcode": 90210
	};
	var filters = [];
	if (storedBreedSelect !== null) {
		breedCriteria = {
			"fieldName": "animals.breedPrimary",
			"operation": "equal",
			"criteria": storedBreedSelect
		};
		filters.push(breedCriteria);

	}
	if (storedHouseTrainedSelect !== null) {
		houseTrainedCriteria = {
			"fieldName": "animals.isHousetrained",
			"operation": "equal",
			"criteria": storedHouseTrainedSelect
		};
		filters.push(houseTrainedCriteria);
	}
	if (storedCatsOkSelect !== null) {
		catsOkCriteria = {
			"fieldName": "animals.isCatsOk",
			"operation": "equal",
			"criteria": storedCatsOkSelect
		};
		filters.push(catsOkCriteria);
	}
	if (storedDogsOkSelect !== null) {
		dogsOkCriteria = {
			"fieldName": "animals.isDogsOk",
			"operation": "equal",
			"criteria": storedDogsOkSelect
		};
		filters.push(dogsOkCriteria);
	}
	if (storedKidsOkSelect !== null) {
		kidsOkCriteria = {
			"fieldName": "animals.isKidsOk",
			"operation": "equal",
			"criteria": storedKidsOkSelect
		};
	}
	if (storedGenderSelect !== null) {
		genderCriteria = {
			"fieldName": "animals.sex",
			"operation": "equal",
			"criteria": storedGenderSelect
		};
		filters.push(genderCriteria);
	}
	if (storedSizeSelect !== null) {
		sizeCriteria = {
			"fieldName": "animals.sizeGroup",
			"operation": "equal",
			"criteria": storedSizeSelect
		};
		filters.push(sizeCriteria);
	}
	if (storedAgeSelect !== null) {
		ageCriteria = {
			"fieldName": "animals.ageGroup",
			"operation": "equal",
			"criteria": storedAgeSelect
		};
		filters.push(ageCriteria);
	}
	if (storedDistanceSelect !== null) {
		distanceCriteria = {
			"miles": storedDistanceSelect,
			"postalcode": 90210
		};
		filterRadius = distanceCriteria;
	}
	var data = {
		"data": {
			"filterRadius": filterRadius,
			"filters": filters
		}
	};
	$.ajax({
		url: rgUrl + "search/available/dogs/haspic?include=pictures&limit=50",
		method: "POST",
		headers: {
			"Content-Type": "application/vnd.api+json",
			"Authorization": rgKey,
		},
		data: JSON.stringify(data)
	}).then(function(response) {
		if (response.meta.count === 0) {
			noDogFound();
		} else {
			userInputAnimalSearch(response);
		}
	console.log(response);
		
	});
}
// CREATES IMAGE CAROUSEL FOR AT RISK DOGS
function atRiskPets(response) {
	var dogImgID;
	var dogImg;
	for (var i = 0; i < response.data.length; i++) {
		dogImgID = response.data[i].relationships.pictures.data[0].id;
		for (var j = 0; j < response.included.length; j++) {
			var dogImgOptions = response.included[j].id;
			if (dogImgOptions === dogImgID) {
				dogImg = response.included[j].attributes.original.url;
				var imgLi = $("<li></li>");
				imgLi.addClass("at-risk-li");
				var dogImgEl = $("<img>");
				dogImgEl.attr("src", dogImg);
				$(".at-risk").append(imgLi);
				imgLi.append(dogImgEl);
			}
		}
	}
}
// POPULATES BREED OPTIONS
function breedPop (response, breedOp, breedOpEl) {
	for(var i = 0; i < response.data.length; i++) {
		breedOp = response.data[i].attributes.name;
		breedOpEl = $("<option></option>");
		breedOpEl.text(breedOp);
		$(".breed-select").append(breedOpEl);
	}
}
// PREVENT SELECTION OF MUTLIPLE CHOICES IN USER SELECTION OPTIONS
function onlyCheckUserSelect(checkedGroup, checkbox) {
	for(var i = 0; i < (checkedGroup.children).length; i++) {
		checkbox = (checkedGroup).children[i].children[0];
		checkbox.checked = false;
	}
}
// STORES USER INPUT FOR BREED
function storeBreedSelect() {
	var userBreedSelect = breedSelect[0].value;
	localStorage.setItem("breed", JSON.stringify(userBreedSelect));
}
// STORES USER INPUT FOR HOUSE TRAINING
function storeHouseTrainedSelect(userClick) {
	var userHouseTrainedSelect = userClick.trim().toLowerCase();
	if(userHouseTrainedSelect === "no preference") {
		localStorage.removeItem("house-trained");
	} else {
		localStorage.setItem("house-trained", JSON.stringify(userHouseTrainedSelect));
	}
}
// STORES USER INPUT ON CATS OK SELECTION
function storeCatsOkSelect(userClick) {
	var userCatsOkSelect = userClick.trim().toLowerCase();
	if(userCatsOkSelect === "no preference") {
		localStorage.removeItem("cats-ok");
	} else {
		localStorage.setItem("cats-ok", JSON.stringify(userCatsOkSelect));
	}
}
// STORES USER INPUT ON DOGS OK SELECTION
function storeDogsOkSelect(userClick) {
	var userDogsOkSelect = userClick.trim().toLowerCase();
	if(userDogsOkSelect === "no preference") {
		localStorage.removeItem("dogs-ok");
	} else {
		localStorage.setItem("dogs-ok", JSON.stringify(userDogsOkSelect));
	}
}
// STORES USER INPUT ON KIDS OK SELECTION
function storeKidsOkSelect(userClick) {
	var userKidsOkSelect = userClick.trim().toLowerCase();
	if(userKidsOkSelect === "no preference") {
		localStorage.removeItem("kids-ok");
	} else {
		localStorage.setItem("kids-ok", JSON.stringify(userKidsOkSelect));
	}
}
// STORES USER INPUT FOR GENDER
function storeGenderSelect(userClick) {
	var userGenderSelect = userClick.trim().toLowerCase();
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
// STORES USER INPUT FOR BREED

// CREATE ANIMAL PROFILE CARDS
function userInputAnimalSearch(response) {
	var dogImgID;
	var dogImg;
	for (var i = 0; i < response.data.length; i++) {
		dogImgID = response.data[i].relationships.pictures.data[0].id;
		for (var j = 0; j < response.included.length; j++) {
			var dogImgOptions = response.included[j].id;
			if (dogImgOptions === dogImgID) {
				dogImg = response.included[j].attributes.original.url;
			}
		}
		var dogName = response.data[i].attributes.name;
		var dogAgeGroup = response.data[i].attributes.ageGroup;
		var dogGender = response.data[i].attributes.sex;
		var dogPrimaryBreed = response.data[i].attributes.breedPrimary;
		var dogSizeGroup = response.data[i].attributes.sizeGroup;
		var dogDescription = response.data[i].attributes.descriptionText;
		var cardContainer = $(".dog-card-container");
		var profileCard = $("<div></div>");
		var highlightContainer = $("<div></div>");
		var descriptionContainer = $("<div></div>");
		var dogProfileImage = $("<div></div>");
		var dogProfileFacts = $("<div></div>");
		var dogImgEl = $("<img>");
		var dogNameEl = $("<h3></h3>");
		var dogAgeGroupEl = $("<h4></h4>");
		var dogGenderEl = $("<h4></h4>");
		var dogPrimaryBreedEl = $("<h4></h4>");
		var dogSizeGroupEl = $("<h4></h4>");
		var dogDescriptionEl = $("<p>" + dogDescription + "</p>");
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
	clearLocalStorage();
}
function noDogFound() {
	var cardContainer = $(".dog-card-container");
	var errorCard = $("<div></div>");
	var uhOh = $("<h2></h2>");
	var searchAgain = $("<p></p>");
	var searchBtnConatiner = $("<div></div>");
	var searchBtn = $("<a></a>");
	uhOh.text("Uh oh!");
	searchAgain.text("It looks like no dogs match the search criteria. Please search again.");
	searchBtn.text("Submit");
	errorCard.addClass("uk-card dark-background padding-20");
	uhOh.addClass("dark-background");
	searchAgain.addClass("dark-background");
	searchBtnConatiner.addClass("uk-margin");
	searchBtn.addClass("uk-button uk-button-default");
	searchBtn.attr("href", "./index.html");
	cardContainer.append(errorCard);
	errorCard.append(uhOh, searchAgain, searchBtnConatiner);
	searchBtnConatiner.append(searchBtn);
	localStorage.clear();
}
function clearLocalStorage() {
	localStorage.clear();
}
// ***** EVENT LISTENERS *****
// STORES USER BREED SELECTION
breedSelect.on("click", function() {
	storeBreedSelect();
});
// UNCHECKS ALL OPTIONS AND CHECKS BOX FOR USER SELECTION
$(".uk-checkbox").on("click", function() {
	var checkedGroup = ($(this).parent()).parent()[0];
	var userClick = $(this)[0].nextSibling.textContent;
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
	var userSizeSelect;
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
	var userAgeSelect;
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
submitSearch.on("click", function(response) {
	userSearchAPICall(response);
});