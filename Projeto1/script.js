playSound();
document.body.addEventListener('keyup', (event) => {
    playSound( event.code.toLowerCase() ) ;
}); 

document.querySelector('.composer button').addEventListener('click',() => {
    let music = document.querySelector('#input').value;
    
    if(music !== ''){
        let musicArray = music.split('');
        playComposition(musicArray);
    }
})

function playSound(sound){
    let audioElement = document.querySelector(`#s_${sound}`);
    let keyElement = document.querySelector(`div[data-key="${sound}"]`);

    if(audioElement) {
        audioElement.currentTime = 0;
        audioElement.play();
    }

    if (keyElement){
        keyElement.classList.add('active');

        setTimeout(()=>{
            keyElement.classList.remove('active');
        }, 300)
    }
}

function playComposition(musicArray){

    let wait = 0;

    for(let musicItem of musicArray){
        setTimeout(()=>{
            playSound(`key${musicItem}`);
        }, wait);
        
        wait += 245;

        
    }
}