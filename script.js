let currentStep = 1;
document.getElementById("step1").style.display = "block";

// Navigation functions
function nextStep(step) {
  document.getElementById("step" + step).style.display = "none";
  currentStep++;
  document.getElementById("step" + currentStep).style.display = "block";
}

function prevStep(step) {
  document.getElementById("step" + step).style.display = "none";
  currentStep--;
  document.getElementById("step" + currentStep).style.display = "block";
}

// Generate resume
function generateResume() {
  const name = document.getElementById("name").value;
  const jobTitle = document.getElementById("job-title").value;
  const address = document.getElementById("address").value;
  const email = document.getElementById("email").value;
  const phone = document.getElementById("phone").value;
  const degree = document.getElementById("degree").value;
  const college = document.getElementById("college").value;
  const year = document.getElementById("year").value;
  const company = document.getElementById("company").value;
  const role = document.getElementById("role").value;
  const duration = document.getElementById("duration").value;
  const responsibilities = document.getElementById("responsibilities").value
    .split("\n").map(line => line.trim()).filter(line => line);
  const skills = document.getElementById("skills").value
    .split(/,|\n/).map(s => s.trim()).filter(s => s);
  const campus = document.getElementById("campus").value
    .split("\n").map(line => line.trim()).filter(line => line);
  const certificates = document.getElementById("certificates").value
    .split("\n").map(line => line.trim()).filter(line => line);
  const summary = document.getElementById("summary").value;

  const responsibilitiesHTML = responsibilities.map(resp => `<li>${resp}</li>`).join('');
  const skillsHTML = skills.map(skill => `<p>${skill}</p>`).join('');
  const campusHTML = campus.map(act => `<li>${act}</li>`).join('');
  const certificatesHTML = certificates.map(cert => `<li>${cert}</li>`).join('');

  const photoFile = document.getElementById("photo").files[0];
  let reader = new FileReader();

  reader.onload = function () {
    const photoSrc = reader.result;
    renderResume(photoSrc);
  };

  if (photoFile) {
    reader.readAsDataURL(photoFile);
  } else {
    renderResume("placeholder.jpg"); // fallback image
  }

  function renderResume(photoSrc) {
    const resumeHTML = `
      <div class="left-column">
        <div class="profile-section">
          <img class="profile-pic" src="${photoSrc}" alt="Profile Photo">
          <h1 class="name">${name}</h1>
          <p class="job-title">${jobTitle}</p>
        </div>

        <div class="section contact-info">
          <p>${address}</p>
          <p>${email}</p>
          <p>${phone}</p>
        </div>

        <div class="section">
          <div class="section-title"><span class="icon education"></span>Education</div>
          <div class="section-content">
            <h4>${degree}</h4>
            <p>${college}</p>
            <p>${year}</p>
          </div>
        </div>

        <div class="section">
          <div class="section-title"><span class="icon skills"></span>Skills</div>
          <div class="skills-list">${skillsHTML}</div>
        </div>
      </div>

      <div class="right-column">
        <div class="section">
          <div class="section-title"><span class="icon summary"></span>About Me</div>
          <p class="section-content">${summary}</p>
        </div>

        <div class="section">
          <div class="section-title"><span class="icon work"></span>Work Experience</div>
          <div class="section-content">
            <h4>${role}</h4>
            <p>${company}</p>
            <p>${duration}</p>
            <ul>${responsibilitiesHTML}</ul>
          </div>
        </div>

        <div class="section">
          <div class="section-title"><span class="icon work"></span>Campus Involvement</div>
          <div class="section-content">
            <ul>${campusHTML}</ul>
          </div>
        </div>

        <div class="section">
          <div class="section-title"><span class="icon work"></span>Certificates</div>
          <div class="section-content">
            <ul>${certificatesHTML}</ul>
          </div>
        </div>
      </div>
    `;
    document.getElementById("resumeContent").innerHTML = resumeHTML;
    document.getElementById("finalResume").style.display = "block";
    document.querySelectorAll(".step").forEach(s => s.style.display = "none");
  }
}

// Download PDF
function downloadPDF() {
  const element = document.getElementById("resumeContent");
  const opt = {
    margin:       [10, 10, 10, 10],
    filename:     'Resume.pdf',
    image:        { type: 'jpeg', quality: 0.98 },
    html2canvas:  { scale: 2 },
    jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' }
  };
  html2pdf().set(opt).from(element).save();
}

function editResume() {
  document.getElementById("finalResume").style.display = "none";
  currentStep = 1;
  document.getElementById("step1").style.display = "block";
}
