const carouselInner = document.querySelector('.carousel-inner');
const carouselItems = document.querySelectorAll('.carousel-item');
const prevButton = document.querySelector('.prev');
const nextButton = document.querySelector('.next');

let currentIndex = 0;

function updateCarousel() {
  const offset = -currentIndex * 100; 
  carouselInner.style.transform = `translateX(${offset}%)`;
}

prevButton.addEventListener('click', () => {
  currentIndex = (currentIndex > 0) ? currentIndex - 1 : carouselItems.length - 1;
  updateCarousel();
});

nextButton.addEventListener('click', () => {
  currentIndex = (currentIndex < carouselItems.length - 1) ? currentIndex + 1 : 0;
  updateCarousel();
});



// //Fetch all States
// fetch('https://nga-states-lga.onrender.com/fetch')
// 		.then((res) => res.json())
// 		.then((data) => {
// 		 var x = document.getElementById("state");
// 			for (let index = 0; index < Object.keys(data).length; index++) {
// 		        var option = document.createElement("option");
// 				option.text = data[index];
// 				option.value = data[index];
// 				x.add(option);
// 		       } 
// 	   		});
// //Fetch Local Goverments based on selected state
// function selectLGA(target) {
// 	var state = target.value;
// 		fetch('https://nga-states-lga.onrender.com/?state='+state)
// 		   .then((res) => res.json())
// 		   .then((data) => {
// 		    var x = document.getElementById("lga");
				
// 		    var select = document.getElementById("lga");
//               var length = select.options.length;
//               for (i = length-1; i >= 0; i--) {
//                 select.options[i] = null;
//               }
// 		    for (let index = 0; index < Object.keys(data).length; index++) {
// 		    		var option = document.createElement("option");
// 					option.text = data[index];
// 					option.value = data[index];
// 					x.add(option);
// 		        } 
// 	   		});
// 	}
const urlParams = new URLSearchParams(window.location.search);
const propertyId = urlParams.get('propertyId');

fetch(`https://ouragent.com.ng/get_property_by_id.php?property_id=${propertyId}`)
    .then(response => response.json())
    .then(data => {
        if (data.status === "success") {
            const property = data.data;

            // Set the property title
            document.querySelector(".left-container h1").textContent = property.propertyName;

            // Update the carousel images
            const carouselContainer = document.getElementById('propertyDetailsContainer');
            carouselContainer.innerHTML = property.images.map((image, index) => `
                <div class="carousel-item ${index === 0 ? 'active' : ''}">
                    <img src="https://ouragent.com.ng/${image}" alt="Property Image">
                </div>
            `).join('');

            // Update property details
            document.querySelector(".property-text-details h3").textContent = `₦${property.price}`;
            document.querySelector(".address-details .location").innerHTML = 
                `<img src="../../assets/icon/location-icon.png" alt="location icon"> ${property.state}, ${property.lga}`;
            document.querySelector(".address-details .last-updated").textContent = `Last updated: ${property.created_at}`;

            // Update description
            document.querySelector(".description-box p").textContent = property.description;

            // Update agent details (Profile Image, Name, Address, Phone)
            document.querySelector(".agent-name").textContent = property.fullName;
            document.querySelector(".agent-details .profile-pics img").src = `https://ouragent.com.ng/${property.ProfileImage}`;
            document.querySelector(".text-box .description").textContent = property.agentAddress;
			document.querySelector(".search-form-field .location").innerHTML = `${property.state}, ${property.lga}`
            document.querySelector(".text-box .telephone").textContent = `📞 ${property.phoneNumber}`;
			document.querySelector(".text-box .year-user").textContent = ` ${property.created_at}`;
			document.querySelector(".text-box .website").href = `${property.socialMediaHandles}`;
			
        } else {
            alert(data.message);
        }
    })
    .catch(error => {
        console.error('Error fetching property details:', error);
    });




	
{/* <div class="carousel-inner" id="propertyDetailsContainer"></div>
<div class="property-text-details">
    <h3></h3>
    <div class="address-details">
        <p class="location"></p>
        <p class="last-updated"></p>
    </div>
</div>
<div class="description-box">
    <p></p>
</div>
<div class="agent-details">
    <img src="" alt="Agent Profile Image" class="profile-pics">
    <p class="agent-name"></p>
    <p class="telephone"></p>
</div> */}
