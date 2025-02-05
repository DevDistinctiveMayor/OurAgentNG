
document.addEventListener("DOMContentLoaded", () => {
  document.body.style.display = "block"; // Show body when JS is ready
});


[...document.querySelectorAll(".input-location-dependant")].forEach(a=>a.classList.toggle("d-none"));const setAttributes=(a,o)=>{for(var i in o)a.setAttribute(i,o[i])},toggleLGA=a=>{let o={Abia:["Aba North","Aba South","Arochukwu","Bende","Ikwuano","Isiala Ngwa North","Isiala Ngwa South","Isuikwuato","Obi Ngwa","Ohafia","Osisioma","Ugwunagbo","Ukwa East","Ukwa West","Umuahia North","muahia South","Umu Nneochi"],Adamawa:["Demsa","Fufure","Ganye","Gayuk","Gombi","Grie","Hong","Jada","Larmurde","Madagali","Maiha","Mayo Belwa","Michika","Mubi North","Mubi South","Numan","Shelleng","Song","Toungo","Yola North","Yola South"],AkwaIbom:["Abak","Eastern Obolo","Eket","Esit Eket","Essien Udim","Etim Ekpo","Etinan","Ibeno","Ibesikpo Asutan","Ibiono-Ibom","Ika","Ikono","Ikot Abasi","Ikot Ekpene","Ini","Itu","Mbo","Mkpat-Enin","Nsit-Atai","Nsit-Ibom","Nsit-Ubium","Obot Akara","Okobo","Onna","Oron","Oruk Anam","Udung-Uko","Ukanafun","Uruan","Urue-Offong Oruko","Uyo"],Anambra:["Aguata","Anambra East","Anambra West","Anaocha","Awka North","Awka South","Ayamelum","Dunukofia","Ekwusigo","Idemili North","Idemili South","Ihiala","Njikoka","Nnewi North","Nnewi South","Ogbaru","Onitsha North","Onitsha South","Orumba North","Orumba South","Oyi"],Anambra:["Aguata","Anambra East","Anambra West","Anaocha","Awka North","Awka South","Ayamelum","Dunukofia","Ekwusigo","Idemili North","Idemili South","Ihiala","Njikoka","Nnewi North","Nnewi South","Ogbaru","Onitsha North","Onitsha South","Orumba North","Orumba South","Oyi"],Bauchi:["Alkaleri","Bauchi","Bogoro","Damban","Darazo","Dass","Gamawa","Ganjuwa","Giade","Itas-Gadau","Jama are","Katagum","Kirfi","Misau","Ningi","Shira","Tafawa Balewa"," Toro"," Warji"," Zaki"],Bayelsa:["Brass","Ekeremor","Kolokuma Opokuma","Nembe","Ogbia","Sagbama","Southern Ijaw","Yenagoa"],Benue:["Agatu","Apa","Ado","Buruku","Gboko","Guma","Gwer East","Gwer West","Katsina-Ala","Konshisha","Kwande","Logo","Makurdi","Obi","Ogbadibo","Ohimini","Oju","Okpokwu","Oturkpo","Tarka","Ukum","Ushongo","Vandeikya"],Borno:["Abadam","Askira-Uba","Bama","Bayo","Biu","Chibok","Damboa","Dikwa","Gubio","Guzamala","Gwoza","Hawul","Jere","Kaga","Kala-Balge","Konduga","Kukawa","Kwaya Kusar","Mafa","Magumeri","Maiduguri","Marte","Mobbar","Monguno","Ngala","Nganzai","Shani"],"Cross River":["Abi","Akamkpa","Akpabuyo","Bakassi","Bekwarra","Biase","Boki","Calabar Municipal","Calabar South","Etung","Ikom","Obanliku","Obubra","Obudu","Odukpani","Ogoja","Yakuur","Yala"],Delta:["Aniocha North","Aniocha South","Bomadi","Burutu","Ethiope East","Ethiope West","Ika North East","Ika South","Isoko North","Isoko South","Ndokwa East","Ndokwa West","Okpe","Oshimili North","Oshimili South","Patani","Sapele","Udu","Ughelli North","Ughelli South","Ukwuani","Uvwie","Warri North","Warri South","Warri South West"],Ebonyi:["Abakaliki","Afikpo North","Afikpo South","Ebonyi","Ezza North","Ezza South","Ikwo","Ishielu","Ivo","Izzi","Ohaozara","Ohaukwu","Onicha"],Edo:["Akoko-Edo","Egor","Esan Central","Esan North-East","Esan South-East","Esan West","Etsako Central","Etsako East","Etsako West","Igueben","Ikpoba Okha","Orhionmwon","Oredo","Ovia North-East","Ovia South-West","Owan East","Owan West","Uhunmwonde"],Ekiti:["Ado Ekiti","Efon","Ekiti East","Ekiti South-West","Ekiti West","Emure","Gbonyin","Ido Osi","Ijero","Ikere","Ikole","Ilejemeje","Irepodun-Ifelodun","Ise-Orun","Moba","Oye"],Rivers:["Port Harcourt","Obio-Akpor","Okrika","Ogu–Bolo","Eleme","Tai","Gokana","Khana","Oyigbo","Opobo–Nkoro","Andoni","Bonny","Degema","Asari-Toru","Akuku-Toru","Abua–Odual","Ahoada West","Ahoada East","Ogba–Egbema–Ndoni","Emohua","Ikwerre","Etche","Omuma"],Enugu:["Aninri","Awgu","Enugu East","Enugu North","Enugu South","Ezeagu","Igbo Etiti","Igbo Eze North","Igbo Eze South","Isi Uzo","Nkanu East","Nkanu West","Nsukka","Oji River","Udenu","Udi","Uzo Uwani"],FCT:["Abaji","Bwari","Gwagwalada","Kuje","Kwali","Municipal Area Council"],Gombe:["Akko","Balanga","Billiri","Dukku","Funakaye","Gombe","Kaltungo","Kwami","Nafada","Shongom","Yamaltu-Deba"],Imo:["Aboh Mbaise","Ahiazu Mbaise","Ehime Mbano","Ezinihitte","Ideato North","Ideato South","Ihitte-Uboma","Ikeduru","Isiala Mbano","Isu","Mbaitoli","Ngor Okpala","Njaba","Nkwerre","Nwangele","Obowo","Oguta","Ohaji-Egbema","Okigwe","Orlu","Orsu","Oru East","Oru West","Owerri Municipal","Owerri North","Owerri West","Unuimo"],Jigawa:["Auyo","Babura","Biriniwa","Birnin Kudu","Buji","Dutse","Gagarawa","Garki","Gumel","Guri","Gwaram","Gwiwa","Hadejia","Jahun","Kafin Hausa","Kazaure","Kiri Kasama","Kiyawa","Kaugama","Maigatari","Malam Madori","Miga","Ringim","Roni","Sule Tankarkar","Taura","Yankwashi"],Kaduna:["Birnin Gwari","Chikun","Giwa","Igabi","Ikara","Jaba","Jema a","Kachia","Kaduna North","Kaduna South","Kagarko","Kajuru","Kaura","Kauru","Kubau","Kudan","Lere","Makarfi","Sabon Gari","Sanga","Soba","Zangon Kataf","Zaria"],Kano:["Ajingi","Albasu","Bagwai","Bebeji","Bichi","Bunkure","Dala","Dambatta","Dawakin Kudu","Dawakin Tofa","Doguwa","Fagge","Gabasawa","Garko","Garun Mallam","Gaya","Gezawa","Gwale","Gwarzo","Kabo","Kano Municipal","Karaye","Kibiya","Kiru","Kumbotso","Kunchi","Kura","Madobi","Makoda","Minjibir","Nasarawa","Rano","Rimin Gado","Rogo","Shanono","Sumaila","Takai","Tarauni","Tofa","Tsanyawa","Tudun Wada","Ungogo","Warawa","Wudil"],Katsina:["Bakori","Batagarawa","Batsari","Baure","Bindawa","Charanchi","Dandume","Danja","Dan Musa","Daura","Dutsi","Dutsin Ma","Faskari","Funtua","Ingawa","Jibia","Kafur","Kaita","Kankara","Kankia","Katsina","Kurfi","Kusada","Mai Adua","Malumfashi","Mani","Mashi","Matazu","Musawa","Rimi","Sabuwa","Safana","Sandamu","Zango"],Kebbi:["Aleiro","Arewa Dandi","Argungu","Augie","Bagudo","Birnin Kebbi","Bunza","Dandi","Fakai","Gwandu","Jega","Kalgo","Koko Besse","Maiyama","Ngaski","Sakaba","Shanga","Suru","Wasagu Danko","Yauri","Zuru"],Kogi:["Adavi","Ajaokuta","Ankpa","Bassa","Dekina","Ibaji","Idah","Igalamela Odolu","Ijumu","Kabba Bunu","Kogi","Lokoja","Mopa Muro","Ofu","Ogori Magongo","Okehi","Okene","Olamaboro","Omala","Yagba East","Yagba West"],Kwara:["Asa","Baruten","Edu","Ekiti","Ifelodun","Ilorin East","Ilorin South","Ilorin West","Irepodun","Isin","Kaiama","Moro","Offa","Oke Ero","Oyun","Pategi"],Lagos:["Agege","Ajeromi-Ifelodun","Alimosho","Amuwo-Odofin","Apapa","Badagry","Epe","Eti Osa","Ibeju-Lekki","Ifako-Ijaiye","Ikeja","Ikorodu","Kosofe","Lagos Island","Lagos Mainland","Mushin","Ojo","Oshodi-Isolo","Shomolu","Surulere"],Nasarawa:["Akwanga","Awe","Doma","Karu","Keana","Keffi","Kokona","Lafia","Nasarawa","Nasarawa Egon","Obi","Toto","Wamba"],Niger:["Agaie","Agwara","Bida","Borgu","Bosso","Chanchaga","Edati","Gbako","Gurara","Katcha","Kontagora","Lapai","Lavun","Magama","Mariga","Mashegu","Mokwa","Moya","Paikoro","Rafi","Rijau","Shiroro","Suleja","Tafa","Wushishi"],Ogun:["Abeokuta North","Abeokuta South","Ado-Odo Ota","Egbado North","Egbado South","Ewekoro","Ifo","Ijebu East","Ijebu North","Ijebu North East","Ijebu Ode","Ikenne","Imeko Afon","Ipokia","Obafemi Owode","Odeda","Odogbolu","Ogun Waterside","Remo North","Shagamu"],Ondo:["Akoko North-East","Akoko North-West","Akoko South-West","Akoko South-East","Akure North","Akure South","Ese Odo","Idanre","Ifedore","Ilaje","Ile Oluji-Okeigbo","Irele","Odigbo","Okitipupa","Ondo East","Ondo West","Ose","Owo"],Osun:["Atakunmosa East","Atakunmosa West","Aiyedaade","Aiyedire","Boluwaduro","Boripe","Ede North","Ede South","Ife Central","Ife East","Ife North","Ife South","Egbedore","Ejigbo","Ifedayo","Ifelodun","Ila","Ilesa East","Ilesa West","Irepodun","Irewole","Isokan","Iwo","Obokun","Odo Otin","Ola Oluwa","Olorunda","Oriade","Orolu","Osogbo"],Oyo:["Afijio","Akinyele","Atiba","Atisbo","Egbeda","Ibadan North","Ibadan North-East","Ibadan North-West","Ibadan South-East","Ibadan South-West","Ibarapa Central","Ibarapa East","Ibarapa North","Ido","Irepo","Iseyin","Itesiwaju","Iwajowa","Kajola","Lagelu","Ogbomosho North","Ogbomosho South","Ogo Oluwa","Olorunsogo","Oluyole","Ona Ara","Orelope","Ori Ire","Oyo","Oyo East","Saki East","Saki West","Surulere"],Plateau:["Bokkos","Barkin Ladi","Bassa","Jos East","Jos North","Jos South","Kanam","Kanke","Langtang South","Langtang North","Mangu","Mikang","Pankshin","Qua an Pan","Riyom","Shendam","Wase"],Sokoto:["Binji","Bodinga","Dange Shuni","Gada","Goronyo","Gudu","Gwadabawa","Illela","Isa","Kebbe","Kware","Rabah","Sabon Birni","Shagari","Silame","Sokoto North","Sokoto South","Tambuwal","Tangaza","Tureta","Wamako","Wurno","Yabo"],Taraba:["Ardo Kola","Bali","Donga","Gashaka","Gassol","Ibi","Jalingo","Karim Lamido","Kumi","Lau","Sardauna","Takum","Ussa","Wukari","Yorro","Zing"],Yobe:["Bade","Bursari","Damaturu","Fika","Fune","Geidam","Gujba","Gulani","Jakusko","Karasuwa","Machina","Nangere","Nguru","Potiskum","Tarmuwa","Yunusari","Yusufari"],Zamfara:["Anka","Bakura","Birnin Magaji Kiyaw","Bukkuyum","Bungudu","Gummi","Gusau","Kaura Namoda","Maradun","Maru","Shinkafi","Talata Mafara","Chafe","Zurmi"]}[a.value],u=["Select LGA...",...Object.values(o)],e=a.parentElement.parentElement.parentElement.parentElement.querySelector(".select-lga"),r=e.options.length;for(i=r-1;i>=0;i--)e.options[i]=null;u.forEach(a=>{let o=document.createElement("option");o.appendChild(document.createTextNode(a)),o.value=a,a.includes("elect")&&setAttributes(o,{disabled:"disabled",selected:"selected"}),e.appendChild(o)})};



const menuToggle = document.querySelector(".menu-toggle");
const menu = document.querySelector(".nav-links");
const content = document.querySelector(".content"); // Target content-wrapper

menuToggle.addEventListener("click", () => {
  menuToggle.classList.toggle("open");
  menu.classList.toggle("active");
  content.classList.toggle("content-blur"); // Add blur effect to the content
  document.body.classList.toggle("disable-scroll"); // Prevent scrolling on the whole page
});



document.addEventListener("DOMContentLoaded", async () => {
  await loadUserSession(); // Ensure the session loads after the page is fully loaded
});

async function loadUserSession() {
  const clientId = sessionStorage.getItem("client_id");
  const greetings = document.querySelectorAll(".greeting");
  const loginButtons = document.querySelectorAll(".login-btn");
  const logoutButtons = document.querySelectorAll(".logout-btn");
  const postPropertyButtons = document.querySelectorAll(".post-property-btn");

  if (!clientId) {
    greetings.forEach((el) => (el.textContent = "Welcome, Guest!"));
    loginButtons.forEach((el) => (el.style.display = "inline"));
    logoutButtons.forEach((el) => (el.style.display = "none"));
    postPropertyButtons.forEach((el) => (el.style.display = "none"));
    return;
  }

  try {
    const response = await fetch("https://ouragent.com.ng/get_user_session.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ client_id: clientId }),
    });

    const data = await response.json();
    if (data.status === "success" && data.client) {
      greetings.forEach((el) => (el.textContent = `${data.client.fullName.substring(0, 8)}...`));
      loginButtons.forEach((el) => (el.style.display = "none"));
      logoutButtons.forEach((el) => (el.style.display = "inline"));
      postPropertyButtons.forEach((el) => (el.style.display = "inline"));
    } else {
      throw new Error("Invalid session.");
    }
  } catch (error) {
    console.error("Error loading session:", error);
    greetings.forEach((el) => (el.textContent = "Error loading session."));
  }

  logoutButtons.forEach((button) => {
    button.addEventListener("click", async () => {
      try {
        const logoutResponse = await fetch("https://ouragent.com.ng/logout.php", { method: "POST" });
        if (logoutResponse.ok) {
          sessionStorage.clear();
          window.location.reload();
        } else {
          console.error("Logout failed.");
        }
      } catch (error) {
        console.error("Error during logout:", error);
      }
    });
  });
}



document.addEventListener("DOMContentLoaded", () => {
  const loader = document.getElementById("loader");
  const content = document.getElementById("content");

  // Show loader immediately
  loader.style.display = "flex";
  content.style.display = "none";

  // Delay the execution of heavy JavaScript
  setTimeout(async () => {
    try {
      await fetchAndRenderProperties(); // Fetch properties
      await loadUserSession(); // Load user session
    } catch (error) {
      console.error("Error loading data:", error);
    } finally {
      // Hide loader and show content
      loader.style.display = "none";
      content.style.display = "block";
    }
  }, 100); // 100ms delay to ensure the loader is rendered
});



document.addEventListener("DOMContentLoaded", () => {
  const propertiesContainer = document.getElementById("properties");
  const stateSearch = document.getElementById("stateSearch");
  const lgaSearch = document.getElementById("lgaSearch");
  const cancelButton = document.getElementById("cancelFilter");
  const toggleButton = document.getElementById("toggleFilter");
  const filterContainer = document.querySelector(".advance-filter-container");
  const body = document.body;

  
  let selectedBedrooms = 0;
  let selectedPropertyType = "";

   // Function to fetch and render properties
   async function fetchAndRenderProperties(queryParams = "") {
    propertiesContainer.innerHTML = "Loading properties...";
    try {
      const response = await fetch(`https://ouragent.com.ng/advance_search.php?${queryParams}`);
      const data = await response.json();
      
      propertiesContainer.innerHTML = ""; // Clear existing content

      if (data.status === "success" && data.data.length > 0) {
        data.data.forEach((property) => {
          const propertyElement = document.createElement("div");
          propertyElement.className = "property-card";
          propertyElement.innerHTML = generatePropertyHTML(property);
          propertiesContainer.appendChild(propertyElement);
        });

        // Load bookmarks after rendering properties
        loadBookmarks();

        // Attach event listeners to bookmark buttons
        attachBookmarkListeners();

      } else {
        propertiesContainer.innerHTML = `<p>${data.message || "No properties found."}</p>`;
      }
    } catch (error) {
      console.error("Error:", error);
      propertiesContainer.innerHTML = `<p>An error occurred while fetching properties.</p>`;
    }
  }

  // Generate HTML content for each property
  const generatePropertyHTML = (property) => {
    return `
      <div class="featuredbox-container">
        <div class="sold-overlay">${property.propertystatus}</div>
        <div class="card">
          <div class="image-box">
            <img src="https://ouragent.com.ng/${property.images[0]}" alt="Property Image">
          </div>
          <div class="text-box">
            <div class="first-box">
              <p class="heading">${property.propertyName}</p>
              <p class="location">${property.state}</p>
              <p class="location">${property.lga}</p>
              <p class="description">${property.description.substring(0, 100)}...</p>
              <p class="details-link">
                <a href="../property-description/index.html?propertyId=${property.id}">Property Details &#10142;</a>
              </p>
              <p class="agent-profile">
                <p alt="Agent Name" class="agent-profile">Agent Name</p>
                <b class="agent-name">${property.fullName}</b>
              </p>
            </div>
            <div class="second-box">
              <div class="top-box">
                <div class="price">
                  <p>&#8358;${property.price.substring(0, 10)}</p>
                    <span class="icon">
                    <i class="fa-bookmark bookmark-btn fa-regular"
                    data-property-id="${property.id}" 
                    data-agent-id="${property.client_id}"></i>
                  </span>
                </div>
                <p class="availability">${property.roomNo} Beds | ${property.bathNo} Baths</p>
              </div>
              <div class="bottom-box">
                <a href="tel:${property.phoneNumber}" class="call-link"><i class='bx bxs-phone'></i> Call</a>
                <a href="${property.socialMediaHandles}" class="whatsapp-link"><i class='bx bxl-whatsapp'></i></a>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  };

  // Load Bookmarks
  async function loadBookmarks() {
    const clientId = sessionStorage.getItem("client_id");
    if (!clientId) return;

    try {
      const response = await fetch(`https://ouragent.com.ng/get_bookmark_button.php?client_id=${clientId}`);
      const result = await response.json();

      if (result.status === "success") {
        result.bookmarked.forEach((propertyId) => {
          const bookmarkIcon = document.querySelector(`.bookmark-btn[data-property-id="${propertyId}"]`);
          if (bookmarkIcon) {
            bookmarkIcon.classList.add("fa-solid", "bookmarked");
            bookmarkIcon.classList.remove("fa-regular");
          }
        });
      }
    } catch (error) {
      console.error("Error loading bookmarks:", error);
    }
  }

  // Handle Bookmark Action
  async function handleBookmark(propertyId, action) {
    const clientId = sessionStorage.getItem("client_id");
    if (!clientId) {
      alert("Please log in first.");
      return false;
    }

    try {
      const response = await fetch("https://ouragent.com.ng/bookmark.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ client_id: parseInt(clientId), property_id: parseInt(propertyId), action })
      });

      const result = await response.json();
      if (result.status === "success") {
        const actionMessage = action === "add" ? "Property bookmarked successfully!" : "Property removed from bookmarks!";
        showToast(actionMessage, "success");
        return true;
      } else {
        alert(result.message);
        return false;
      }
    } catch (error) {
      console.error("Error during bookmark action:", error);
      showToast("An error occurred while processing your request.", "error");
      return false;
    }
  }

  // Show Toast Notification
  function showToast(message, type) {
    const toast = document.createElement("div");
    toast.className = `toast ${type}`;
    toast.innerText = message;
    document.body.appendChild(toast);
    
    setTimeout(() => {
      toast.remove();
    }, 3000); // Remove toast after 3 seconds
  }

  // Attach Event Listeners to Bookmark Buttons
  function attachBookmarkListeners() {
    document.querySelectorAll(".bookmark-btn").forEach((button) => {
      button.addEventListener("click", async () => {
        const propertyId = button.getAttribute("data-property-id");
        const isBookmarked = button.classList.contains("bookmarked");
        const action = isBookmarked ? "remove" : "add";

        if (await handleBookmark(propertyId, action)) {
          button.classList.toggle("bookmarked", action === "add");
          button.classList.toggle("fa-solid", action === "add");
          button.classList.toggle("fa-regular", action === "remove");
        }
      });
    });
  }

  // Event listener for toggle filter button
  toggleButton.addEventListener("click", () => {
    filterContainer.classList.toggle("show");
    body.classList.toggle("overlay-active");
  });

  // Event listener for cancel filter button
  cancelButton.addEventListener("click", () => {
    filterContainer.classList.remove("show");
    body.classList.remove("overlay-active");
  });

  // Event listener for bedroom selection
  document.querySelectorAll(".row-select-box a").forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      selectedBedrooms = e.target.dataset.bedroom || 0;
      updateSelection(".row-select-box a", e.target);
    });
  });

  // Event listener for property type selection
  document.querySelectorAll(".row-display-container a").forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      selectedPropertyType = e.target.dataset.type || "";
      updateSelection(".row-display-container a", e.target);
    });
  });


  // Helper function to update the selection and toggle "selected" class
  const updateSelection = (selector, selectedElement) => {
    document.querySelectorAll(selector).forEach((el) => el.classList.remove("selected"));
    selectedElement.classList.add("selected");
  };

  // Event listener for location input
  
  const stateInput = document.getElementById("state");
  const lgaInput = document.getElementById("lga");

  // Reset filters
  document.getElementById("resetFilter").addEventListener("click", () => {
    document.getElementById("category").value = "";
    stateInput.value = "";
    lgaInput.value = "";
    selectedBedrooms = 0;
    selectedPropertyType = "";
    updateSelection(".row-select-box a, .row-display-container a", null);
    fetchAndRenderProperties(); // Fetch all properties again
  });

  // Apply filters when clicking "Apply Filter"
  document.getElementById("applyFilter").addEventListener("click", (e) => {
    e.preventDefault();

    const category = document.getElementById("category").value;
    const state = stateInput.value.trim();
    const lga = lgaInput.value.trim();

    // Build query parameters
    const queryParams = new URLSearchParams({
      ...(category && { category }),
      ...(state && { state }),
      ...(lga && { lga }),
      ...(selectedBedrooms > 0 && { bedrooms: selectedBedrooms }),
      ...(selectedPropertyType && { propertyType: selectedPropertyType }),
    }).toString();

    // Fetch filtered properties
    fetchAndRenderProperties(queryParams);

    // Close filter container and remove overlay
    filterContainer.classList.remove("show");
    body.classList.remove("overlay-active");
  });

  // Fetch all properties initially
  fetchAndRenderProperties();

  // Event listener for state input to fetch properties immediately
  stateSearch.addEventListener("input", () => {
    const state = stateSearch.value.trim();
    const queryParams = new URLSearchParams({ ...(state && { state }) }).toString();
    fetchAndRenderProperties(queryParams);
  });

  // Event listeners for LGA input
  lgaSearch.addEventListener("change", () => {
    const state = stateSearch.value.trim();
    const lga = lgaSearch.value.trim();
    const queryParams = new URLSearchParams({
      ...(state && { state }),
      ...(lga && { lga }),
    }).toString();
    fetchAndRenderProperties(queryParams);
  });

  // Automatically populate LGAs based on a dynamic dataset
  [...document.querySelectorAll(".input-location-dependant")].forEach((input) => {
    input.addEventListener("change", () => {
      const selectedState = input.value;
      // lgaSearch.innerHTML = "<option value='slete'> LGA</option>";

      if (lgaOptions[selectedState]) {
        lgaSearch.innerHTML = ""; // Clear previous options
        lgaOptions[selectedState].forEach((lga) => {
          const option = document.createElement("option");
          option.value = lga;
          option.textContent = lga;
          lgaSearch.appendChild(option);
        });
      }
    });
  });
});
