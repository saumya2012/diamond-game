/**
* Initialization function
*/
(function () {
    function DiamondGame() {
        // get random position for diamond
        function get_random() {
            return Math.floor((Math.random() * 64));
        }
  
        // set diamond at 8 random positions
        function getDiamondPos() {
            let diamondPos = [];
            let rand = null;
            for (let i = 0; i < 8;) {
            rand = get_random();
            if (diamondPos.indexOf(rand) < 0) {
                diamondPos.push(rand);
                i++;
            }
        }
  
        return diamondPos;
    }
  
    // find coordinates for the diamond
    function getDiamondCoord(arr) {
        let result = [];
        for (let i = 0; i < arr.length; i++) {
            let diamondRow = parseInt(arr[i] / 8);
            let diamondCol = arr[i] % 8;
            result.push({ diamondRow, diamondCol });
        }

        return result;
    }
  
    // find the closest diamond coordinate
    function findClosestDiamond(row, col, diaCoord) {
        let copyDiaCoord = diaCoord.slice();
        for (let i = 0; i < copyDiaCoord.length; i++) {
            if (copyDiaCoord[i]['status'] === "done") {
                copyDiaCoord.splice(i, 1);
                i--;
            }
            else {
                let distance = Math.abs(copyDiaCoord[i]['diamondRow'] - row) + Math.abs(copyDiaCoord[i]['diamondCol'] - col);
                copyDiaCoord[i]['distance'] = distance;
                // same row
                if (row === copyDiaCoord[i]['diamondRow']) {
                    if (col < copyDiaCoord[i]['diamondCol']) {
                        // right arrow
                        copyDiaCoord[i]['arrow'] = 'hint-right';
                    }
                    else {
                        // left arrow
                        copyDiaCoord[i]['arrow'] = 'hint-left';
                    }
                }
                else if (row < copyDiaCoord[i]['diamondRow']) {
                    // bottom arrow
                    copyDiaCoord[i]['arrow'] = 'hint-bottom';
                }
                else {
                    // top arrow
                    copyDiaCoord[i]['arrow'] = 'hint-top';
                }
            }
        }
  
        copyDiaCoord.sort(function (a, b) {
          return a.distance - b.distance;
        })
        return copyDiaCoord[0]['arrow'];
    }
  
    function showScore() {
        var unTurnedSquare = document.querySelectorAll('.question').length;
  
        document.querySelector('.scoreContianer .score').innerHTML = unTurnedSquare;
        document.querySelector('.scoreContianer').classList.remove('hide');
        document.querySelector('.reload').classList.remove('hide');
        document.querySelector('.container').classList.add('hide');
        document.querySelector('.title').classList.add('hide');
    }

    this.init = function () {
        let gridList = Array.from(document.querySelectorAll('.grid-item'));
        let diamondPosition = getDiamondPos();
        let diamondCoordinate = getDiamondCoord(diamondPosition);
        let diamondFound = 0;
  
        for (let i = 0; i < gridList.length; i++) {
            gridList[i].addEventListener('click', function () {
                if (event.target.classList.contains('question')) {
                    let index = i;
                    let targetRow = parseInt(index / 8);
                    let targetCol = index % 8;
        
                    for (let k = 0; k < gridList.length; k++) {
                        gridList[k].classList.remove('hint-top', 'hint-bottom', 'hint-right', 'hint-left');
                    }
        
                    gridList[index].classList.remove('question');
                    let arrIndex = diamondPosition.indexOf(index);
                    if (arrIndex > -1) {
                        gridList[index].classList.add('diamond');
                        diamondCoordinate[arrIndex]['status'] = 'done';
                        diamondFound++;
                        if (diamondFound === 8) {
                            showScore();
                        }
                    }
                    else {
                        let hintClass = findClosestDiamond(targetRow, targetCol, diamondCoordinate);
                        gridList[index].classList.add(hintClass);
                    }
                }
            })
        }
  
        document.querySelector('.reload').addEventListener('click', function (event) {
            window.location.reload(true);
        })
      }
    }
    var diaGameObj = new DiamondGame();
    diaGameObj.init();
}());
    