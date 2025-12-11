var tablinks=document.getElementsByClassName("tablinks");
var tabcontents=document.getElementsByClassName("tabcontents");

function opentab(tabname){
    for(tablink of tablinks){
        tablink.classList.remove("activelink");
    }
    for(tabcontent of tabcontents){
        tabcontent.classList.remove("activetab");
    }
    event.currentTarget.classList.add("activelink");
    document.getElementById(tabname).classList.add("activetab");
}


  // Contact form removed from the page; submit handler disabled.
  // If you re-enable the form later, re-add the fetch handler here.


  // Certification modal handlers
  const certModal = document.getElementById('certModal');
  const certImage = document.getElementById('certImage');
  const certCloseBtn = certModal ? certModal.querySelector('.modal-close') : null;

  function openCert(src){
    if(!certModal || !certImage) return;
    certImage.src = src;
    certModal.classList.add('open');
    certModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeCert(){
    if(!certModal) return;
    certModal.classList.remove('open');
    certModal.setAttribute('aria-hidden', 'true');
    if(certImage) certImage.src = '';
    document.body.style.overflow = '';
  }

  if(certModal){
    certModal.addEventListener('click', function(e){
      if(e.target === certModal) closeCert();
    });
    if(certCloseBtn) certCloseBtn.addEventListener('click', closeCert);
    document.addEventListener('keydown', function(e){
      if(e.key === 'Escape' && certModal.classList.contains('open')){
        closeCert();
      }
    });
  }
