/**
 * Initialization function
 */
(function () {
    
    function get_random() {
        return Math.floor((Math.random()*64));
    }
      
    function getDiamondPos(){
        let diamondPos = [];  
        let rand = null;  
        for (let i = 0; i < 8;){
            rand = get_random();
            if(diamondPos.indexOf(rand) < 0){
                diamondPos.push(rand);
                i++;
            }        
        }
    
        return diamondPos;
    } 

    let gridList = Array.from(document.querySelectorAll('.grid-item'));
    let diamondPosition = getDiamondPos();
    for (let i=0; i<gridList.length; i++) {
        gridList[i].addEventListener('click', function(event) {
            let index = i;
            if(diamondPosition.indexOf(index)> -1) {
                gridList[index].classList.remove('question');
                gridList[index].classList.add('diamond');
            }
            else {
                gridList[index].classList.remove('question');
            }
        })
    }
}());