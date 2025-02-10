
document.addEventListener("DOMContentLoaded", () => {
    document.body.style.display = "block"; // Show body when JS is ready
  });
  
  
  
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
  

function previewImages() {
    const input = document.getElementById('propertyImages');
    const previewContainer = document.getElementById('imagePreview');
    const fileChosenText = document.getElementById('file-chosen-text');
    const errorText = document.getElementById('images-error');
    const maxFiles = 3;

    // Reset content and messages
    previewContainer.innerHTML = '';
    errorText.textContent = '';
    fileChosenText.textContent = `${input.files.length} file(s) selected`;

    // **Validation: Check if images are selected**
    if (input.files.length === 0) {
        errorText.textContent = "Please select at least one image.";
        input.focus();
        return;
    }

    // **Validation: Check maximum file limit**
    if (input.files.length > maxFiles) {
        errorText.textContent = `You can upload a maximum of ${maxFiles} images only.`;
        input.value = ''; // Clear input
        fileChosenText.textContent = 'No images chosen';
        return;
    }

    // **Image Preview Generation**
    Array.from(input.files).forEach(file => {
        if (!file.type.startsWith('image/')) {
            errorText.textContent = "Only image files are allowed!";
            input.value = '';
            fileChosenText.textContent = 'No images chosen';
            return;
        }

        const reader = new FileReader();
        reader.onload = function (e) {
            const img = document.createElement('img');
            img.src = e.target.result;
            img.style.width = '100px';
            img.style.margin = '5px';
            previewContainer.appendChild(img);
        }
        reader.readAsDataURL(file);
    });
}

// Prevent Form Submission if Validation Fails
document.getElementById('addPropertyForm').addEventListener('submit', function (e) {
    const input = document.getElementById('propertyImages');
    if (input.files.length === 0) {
        e.preventDefault();
        document.getElementById('images-error').textContent = "Please upload at least one image before submitting.";
        input.focus();
    }
});



// Form Submission and Agent Verification
document.addEventListener("DOMContentLoaded", async () => {
    const form = document.getElementById("addPropertyForm");
    const agentId = sessionStorage.getItem("agent_id");

    if (!agentId) {
        redirectToLogin("Your session has expired. Redirecting to the login page...");
        return;
    }

    if (!(await verifyAgentProfile(agentId))) return;

    form?.addEventListener("submit", async (e) => {
        e.preventDefault();
        handleFormSubmission(form, agentId);
    });
});

// Redirect if session expires
function redirectToLogin(message) {
    Swal.fire({
        toast: true,
        title: "Session Expired",
        text: message,
        icon: "warning",
        iconColor: "rgba(8, 97, 175, 1)",
        confirmButtonText: "OK",
        confirmButtonColor: "rgba(8, 97, 175, 1)"
    }).then(() => {
        window.location.href = "../login-page/login.html";
    });
}

// Verify agent profile
async function verifyAgentProfile(agentId) {
    try {
        const response = await fetch("https://ouragent.com.ng/agent_profile_verification.php", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ agent_id: agentId })
        });
        const result = await response.json();

        if (result.status === "incomplete") {
            Swal.fire({
                toast: true,
                title: "Profile Incomplete",
                text: result.message,
                icon: "info",
                iconColor: "rgba(8, 97, 175, 1)",
                showConfirmButton: false,
            }).then(() => {
                window.location.href = "../agent-profile/agent-profile.html";
            });
            return false;
        }
        return true;
    } catch (error) {
        Swal.fire("Error", "An error occurred during profile verification.", "error");
        console.error("Verification Error:", error);
        return false;
    }
}

// Form Submission Handler
async function handleFormSubmission(form, agentId) {
    const submitButton = document.getElementById("submitButton");
    submitButton.disabled = true;
    submitButton.textContent = "Uploading...";

    const formData = new FormData(form);
    formData.append("agent_id", agentId);

    try {
        const response = await fetch("https://ouragent.com.ng/addproperty.php", {
            method: "POST",
            body: formData
        });

        const result = await response.json();

        if (result.status === "success") {
            Swal.fire({
                icon: "success",
                title: "Success",
                text: result.message,
                toast: true,
                iconColor: "rgba(8, 97, 175, 1)",
                position: "top-end",
                showConfirmButton: false,
                timer: 3000
            });

            form.reset();

            setTimeout(() => {
                window.location.href = "../agent-profile/agent-profile.html"; // Change to the actual admin page URL
            }, 3000);
        } else {
            Swal.fire("Error", result.message, "error");
        }
    } catch (error) {
        Swal.fire("Error", "An unexpected error occurred. Please try again.", "error");
        console.error("Submission Error:", error);
    } finally {
        submitButton.disabled = false;
        submitButton.textContent = "Submit Property";
    }
}

// Toggle Room and Bathroom Fields Based on Property Type
function toggleRoomBathroomFields() {
    const propertyType = document.getElementById("property-type").value;
    const roomBathroomSection = document.getElementById("roomBathroomSection");
    const sizeField = document.getElementById("sizeField");
    const fields = ["roomNo", "bathNo", "size"];

    if (propertyType === "land") {
        roomBathroomSection.style.display = "none";
        sizeField.style.display = "block";
        fields.forEach(field => {
            if (field !== "size") {
                document.getElementById(field).value = "";
                document.getElementById(field).removeAttribute("required");
            } else {
                document.getElementById(field).setAttribute("required", "true");
            }
        });
    } else {
        roomBathroomSection.style.display = "block";
        sizeField.style.display = "none";
        fields.forEach(field => {
            if (field !== "size") {
                document.getElementById(field).setAttribute("required", "true");
            } else {
                document.getElementById(field).value = "";
                document.getElementById(field).removeAttribute("required");
            }
        });
    }
}

// Currency Formatter with Decimal Support
function formatCurrency(input) {
    let value = input.value.replace(/[^0-9.]/g, '');
    const [integerPart, decimalPart] = value.split('.');
    input.value = decimalPart 
        ? `${integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}.${decimalPart.substring(0, 2)}`
        : integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

// Radio Button Validation
function validateRadioSelection() {
    const radios = document.querySelectorAll('input[name="category"]');
    const errorSpan = document.getElementById('category-error');
    const isChecked = Array.from(radios).some(radio => radio.checked);

    errorSpan.textContent = isChecked ? "" : "Please select a category!";
    return isChecked;
}
