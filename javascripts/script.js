const sectionOne = document.querySelector('.section-1')
const modalOpeners = sectionOne.querySelectorAll('.modalOpener')
const modalWindows = document.querySelectorAll('.modal')
const modalContent = document.querySelectorAll('.modalContent')
const closeWindow = document.querySelectorAll('.close-window-button')

const contactForm = document.querySelector('#contact-form')
const modalOne = document.querySelector('#modal-1-window')
const modalTwo = document.querySelector('#modal-2-window')
const modalThree = document.querySelector('#modal-3-window')
const modalFour = document.querySelector('#modal-4-window')
const modalFive = document.querySelector('#modal-5-window')
const modalSix = document.querySelector('#modal-6-window')
const modalSeven = document.querySelector('#modal-7-window')
const modalEight = document.querySelector('#modal-8-window')
const modalNine = document.querySelector('#modal-9-window')

// Open Select window on click.
modalOpeners.forEach(element => {
    element.addEventListener('click', e => {
        const clickedOpener = e.target.id
        switch(clickedOpener){
            case 'contact-link':
                openWindow(contactForm)
                break
            case 'modal-1':
                openWindow(modalOne)
                break
            case 'modal-2':
                openWindow(modalTwo)
                break
            case 'modal-3':
                openWindow(modalThree)
                break
            case 'modal-4':
                openWindow(modalFour)
                break
            case 'modal-5':
                openWindow(modalFive)
                break
            case 'modal-6':
                openWindow(modalSix)
                break
            case 'modal-7':
                openWindow(modalSeven)
                break
            case 'modal-8':
                openWindow(modalEight)
                break
            case 'modal-9':
                openWindow(modalNine)
            default:
                break
        }
    })
});

// if element has video, it will play on openning
const playVideo = (target) => { 
    const video = target.querySelector('video')
    if(video) video.play()
}

// if element has video, it will pause playing on exiting
const pauseVideo = (target) => {
    const video = target.querySelector('video')
    if(video) video.pause()
}

// open targetted window
const openWindow = (target) => {
    target.style = "display: block;"
    playVideo(target)
}

// close currently openned window
const closeWindows = (target) => {
    pauseVideo(target)

    target.style.animation = "form-out 0.3s ease-in"
    setTimeout(() => {
        target.style = "display: none; animation:"   
        
    }, 300);
}


// events for closing windows on click or keyboard
modalWindows.forEach(element => {
    const closeButton = element.querySelector('.close-window-button')

    closeButton.addEventListener('click', e => {
        closeWindows(element)
    })

    element.addEventListener('click', e => {
        const content = element.querySelector('.modalContent')
        const isClickInside = content.contains(event.target);

        if (!isClickInside) {
            closeWindows(element)
        }
    });
    
    document.addEventListener('keydown', e => {
        if(e.key === "Escape"){
            closeWindows(element)
        }
    })
});

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
        if(data.success) return location.reload();
      })
  });