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

document.addEventListener("DOMContentLoaded", () => {
  let selectedBedrooms = 0;
  let selectedPropertyType = "";

  const propertiesContainer = document.getElementById("properties");
  const cancelButton = document.getElementById("cancelFilter");
  const toggleButton = document.getElementById("toggleFilter");
  const filterContainer = document.querySelector(".advance-filter-container");
  const body = document.body;

  // Function to fetch and display properties
  const fetchAndRenderProperties = (queryParams = "") => {
    fetch(`https://ouragent.com.ng/advance_searchbuy.php?${queryParams}`)
      .then((response) => response.json())
      .then((data) => {
        propertiesContainer.innerHTML = ""; // Clear existing content

        if (data.status === "success" && data.data.length > 0) {
          data.data.forEach((property) => {
            const propertyElement = document.createElement("div");
            propertyElement.className = "property-card";
            propertyElement.innerHTML = `
              <div class="featuredbox-container">
                <div class="card">
                  <div class="image-box">
                    <img src="https://ouragent.com.ng/${
                      property.images[0]
                    }" alt="Property Image">
                  </div>
                  <div class="text-box">
                    <div class="first-box">
                      <p class="heading">${property.propertyName}</p>
                      <p class="location">${property.state}</p>
                       <p class="location">${property.lga}</p>
                      <p class="description">${property.description.substring(
                        0,
                        100
                      )}...</p>
                      <p class="details-link">
                        <a href="#">Property Details &#10142;</a>
                      </p>
                      <p class="agent-profile">
                        <p alt="Agent Name" class="agent-profile">Agent Name</p>
                        <b class="agent-name">${property.fullName}</b>
                      </p>
                    </div>
                    <div class="second-box">
                      <div class="top-box">
                        <div class="price">
                          <p>&#8358;${property.price}</p>
                          <i class="bx bx-bookmark i"></i>
                        </div>
                        <p class="availability">${property.roomNo} Bed ${
                        property.bathNo
                        } Baths</p>
                      </div>
                    <div class="bottom-box">
                        <a href="tel:${property.phoneNumber}" class="call-link"><i class='bx bxs-phone'></i> Call</a>
                        <a href="${
                          property.socialMediaHandles
                        }" class="whatsapp-link"><i class='bx bxl-whatsapp' value=""></i></a>
                      </div>
                    </div>
                    </div>
                  </div>
                </div>
              </div>
            `;
            propertiesContainer.appendChild(propertyElement);
          });
        } else {
          propertiesContainer.innerHTML = `<p>${
            data.message || "No properties found."
          }</p>`;
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        propertiesContainer.innerHTML = `<p>An error occurred while fetching properties.</p>`;
      });
  };

  // Fetch all properties initially
  fetchAndRenderProperties();

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

  // Event listener for bedrooms selection
  document.querySelectorAll(".row-select-box a").forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      selectedBedrooms = e.target.dataset.bedroom || 0;
      document
        .querySelectorAll(".row-select-box a")
        .forEach((el) => el.classList.remove("selected"));
      e.target.classList.add("selected");
    });
  });

  // Event listener for property type selection
  document.querySelectorAll(".row-display-container a").forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      selectedPropertyType = e.target.dataset.type || "";
      document
        .querySelectorAll(".row-display-container a")
        .forEach((el) => el.classList.remove("selected"));
      e.target.classList.add("selected");
    });
  });

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

    document
      .querySelectorAll(".row-select-box a, .row-display-container a")
      .forEach((el) => el.classList.remove("selected"));
    fetchAndRenderProperties(); // Fetch all properties again
  });

  // Apply filters when clicking "Apply Filter"
  document.getElementById("applyFilter").addEventListener("click", (e) => {
    e.preventDefault();

    const category = document.getElementById("category").value;
    const state = stateInput.value;
    const lga = lgaInput.value;

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
});



document.addEventListener("DOMContentLoaded", () => {
  const propertiesContainer = document.getElementById("properties");
  const stateSearch = document.getElementById("stateSearch");
  const lgaSearch = document.getElementById("lgaSearch");

  // Function to fetch and display properties
  const fetchAndRenderProperties = (queryParams = "") => {
      fetch(`https://ouragent.com.ng/advance_searchbuy.php?${queryParams}`)
          .then((response) => response.json())
          .then((data) => {
              propertiesContainer.innerHTML = ""; // Clear existing content

              if (data.status === "success" && data.data.length > 0) {
                  data.data.forEach((property) => {
                      const propertyElement = document.createElement("div");
                      propertyElement.className = "property-card";
                      propertyElement.innerHTML = `
                        <div class="featuredbox-container">
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
                                  <a href="#">Property Details &#10142;</a>
                                </p>
                                <p class="agent-profile">
                                  <p alt="Agent Name" class="agent-profile">Agent Name</p>
                                  <b class="agent-name">${property.fullName}</b>
                                </p>
                              </div>
                              <div class="second-box">
                                <div class="top-box">
                                  <div class="price">
                                    <p>&#8358;${property.price}</p>
                                    <i class="bx bx-bookmark i"></i>
                                  </div>
                                  <p class="availability">${property.roomNo} Bed ${property.bathNo} Baths</p>
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
                      propertiesContainer.appendChild(propertyElement);
                  });
              } else {
                  propertiesContainer.innerHTML = `<p>${data.message || "No properties found."}</p>`;
              }
          })
          .catch((error) => {
              console.error("Error:", error);
              propertiesContainer.innerHTML = `<p>An error occurred while fetching properties.</p>`;
          });
  };

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
          ...(lga && { lga })
      }).toString();
      fetchAndRenderProperties(queryParams);
  });

  // Automatically populate LGAs based on a dynamic dataset
  [...document.querySelectorAll(".input-location-dependant")].forEach(input => {
      input.addEventListener("change", () => {
          const selectedState = input.value;
          // lgaSearch.innerHTML = "<option value='slete'> LGA</option>";

          const lgaOptions = {
              Lagos: ["Ikeja", "Surulere", "Epe"],
              Ogun: ["Abeokuta", "Ijebu-Ode"]
          };

          if (lgaOptions[selectedState]) {
              lgaOptions[selectedState].forEach(lga => {
                  const option = document.createElement("option");
                  option.value = lga;
                  option.textContent = lga;
                  lgaSearch.appendChild(option);
              });
          }
      });
  });
});

const lgaSearch = document.getElementById('lgaSearch');

// lgaSearch.addEventListener('change', function () {
//     if (this.value === 'lga') {
//         this.style.border = '2px solid red';
//         this.style.color = 'red';
//         this.style.fontWeight = 'bold';
//         this.style.fontSize = "10px";

//     } else {
//         this.style.border = '2px solid green';
//         this.style.color = 'green';
//         this.style.fontWeight = 'bold';
//         this.style.fontSize = "10px";
//     }
// });