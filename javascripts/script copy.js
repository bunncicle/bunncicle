
function validateForm() {
    let fname = document.forms["contact"]["fname"].value;
    let lname = document.forms["contact"]["lname"].value;
    let company = document.forms["contact"]["company"].value;
    let email = document.forms["contact"]["email"].value
    let subject = document.forms["contact"]["subject"].value;

    if (fname == "" || lname == "" || company == "" || email == "" || subject == "") {
    //   console.log('validate returns true')
      return true;

    }
    // console.log('validate returns false')
    return false;
}

// YOUTUBE VIDEO EMBEDDED; API
var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

var player;
function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        height: '390',
        width: '640',
        videoId: 'Jooj3hPqnx8',
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
        }
    });
}

function onPlayerReady(event) {
    event.target.playVideo();
}

var done = false;
function onPlayerStateChange(event) {
  if (event.data == YT.PlayerState.PLAYING && !done) {
    setTimeout(stopVideo, 0001);
    done = true;
  }
}
function stopVideo() {
  player.stopVideo();
}

let openModal = (target) => {
    target.style = "display: block;"
}
let closeModal = (trigger, target) => {
    let form  = document.querySelector('#contact-form form')
    // console.log('Variable form is created: ');
    // console.log(form)
    trigger.addEventListener('click', () => {
        
        if(validateForm(form) && trigger == document.querySelector('#submit')) return
        if(player)
            player.pauseVideo();

        target.style.animation = "form-out 0.3s ease-in"
        setTimeout(() => {
            target.style = "display: none; animation:;"
            // alert("it has been done")
        }, 300);
        return 1
    })

}

    const altopeners = document.querySelector(".section-body div");
    console.log(altopeners)

    altopeners.addEventListener('click', e => {
        const target = e.target.closest('a')
        console.log(target)
        openModal(target)
    })


let initializeOpeners = () => {
    openers = document.querySelectorAll(".modalOpener");
    // console.log(openers)
    
    
    for (let i = 0; i < openers.length; i++) {
        openers[i].addEventListener('click', function(){
            if(openers[i].id === 'contact-link' && document.querySelector('#contact-link').classList.contains('modalOpener')){
                openModal(document.querySelector('#contact-form'))
                // let trigger = document.querySelector('#submit')
                // let target = document.querySelector('#contact-form')
                // validateForm();
                if(!closeModal(document.querySelector('#submit'), document.querySelector('#contact-form')))
                    closeModal(document.querySelector('#closeForm'), document.querySelector('#contact-form'))
                
            }
            else if(openers[i].textContent.includes('Software')){ 
                // modalSelector(openers[i]) === 'software'
                let clickToClose = document.querySelector('#closeSoftware')
                let target = document.querySelector('#software')
                openModal(target)
                closeModal(clickToClose, target)
            }
            else if(openers[i].textContent.includes('Coding')){
                let clickToClose = document.querySelector('#closeCode')
                let target = document.querySelector('#code')
                openModal(target)
                closeModal(clickToClose, target)
            }
            else if(openers[i].textContent.includes('Broetje')){
                let clickToClose = document.querySelector('#closeBroetje')
                let target = document.querySelector('#broetje')
                openModal(target)
                closeModal(clickToClose, target)
            }
            else if(openers[i].textContent.includes('London')){
                let clickToClose = document.querySelector('#closeIntern')
                let target = document.querySelector('#intern')
                openModal(target)
                closeModal(clickToClose, target)
            }
            else if(openers[i].textContent.includes('Oakton')){
                let clickToClose = document.querySelector('#closeTutor')
                let target = document.querySelector('#tutor')
                openModal(target)
                closeModal(clickToClose, target)
            }
            else if(openers[i].textContent.includes('NASA')){
                let clickToClose = document.querySelector('#closermc')
                let target = document.querySelector('#rmc')

                player.playVideo();

                openModal(target)
                closeModal(clickToClose, target)
            }
            else if(openers[i].textContent.includes('Outreach')){
                let clickToClose = document.querySelector('#closeOutreach')
                let target = document.querySelector('#outreach')
                openModal(target)
                closeModal(clickToClose, target)
            }
            else if(openers[i].textContent.includes('Illinois')){
                let clickToClose = document.querySelector('#closeIllinois')
                let target = document.querySelector('#illinois')
                openModal(target)
                closeModal(clickToClose, target)
            }
            // console.log(openers)
        });
    }
}
initializeOpeners()
document.getElementById('contactForm').addEventListener('submit', e => {
    e.preventDefault();

    let fname = document.querySelector('#fname').value;
    let lname = document.querySelector('#lname').value;
    let company = document.querySelector('#company').value;
    let email = document.querySelector('#email').value;
    let subject = document.querySelector('#subject').value;
    let captcha = document.querySelector('#g-recaptcha-response').value;
    
    if(fname && lname && company && email && subject && captcha){
        document.querySelector('.success').style = "display: block; animation:;"
        document.querySelector('.failure').style = "display: none;"
    }
    else if(!fname || !lname || !company || !email || !subject || !captcha){
        document.querySelector('.failure').style = "display: block; animation:;"
    }

    return fetch('', {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify({ fname, lname, company, email, subject, captcha })
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        // alert(data.msg);
        if(data.success) return location.reload();
      })
      .catch(err => console.log(err));
  });