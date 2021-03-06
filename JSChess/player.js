var color_scheme = "standard";
var color_scheme = "green_and_white";

var canvas = document.getElementById("board");
var ctx = canvas.getContext("2d");

var mouseX = 0;
var mouseY = 0;

var boardIndexX = 0;
var boardIndexY = 0;

const letters = ["a", "b", "c", "d", "e", "f", "g", "h"];

var positions = [02, 03, 04, 05, 06, 04, 03, 02, 
                 01, 01, 01, 01, 01, 01, 01, 01, 
                 00, 00, 00, 00, 00, 00, 00, 00, 
                 00, 00, 00, 00, 00, 00, 00, 00, 
                 00, 00, 00, 00, 00, 00, 00, 00, 
                 00, 00, 00, 00, 00, 00, 00, 00, 
                 11, 11, 11, 11, 11, 11, 11, 11, 
                 12, 13, 14, 15, 16, 14, 13, 12];

function yellowGradient(grd) {
    grd.addColorStop(0, "yellow");
    grd.addColorStop(1, "rgba(255, 255, 0, 0)");
    return grd;
}

function glowOutline(indx, indy) {
    // Create gradient
    var tpx = indx*75+25;
    var tpy = indy*75+25;

    var grd = ctx.createLinearGradient(tpx, 0, tpx+10, 0);
    grd = yellowGradient(grd); ctx.fillStyle = grd;
    ctx.fillRect(tpx, tpy, 10, 75);

    var grd = ctx.createLinearGradient(0, tpy, 0, tpy+10);
    grd = yellowGradient(grd); ctx.fillStyle = grd;
    ctx.fillRect(tpx, tpy, 75, 10);

    var grd = ctx.createLinearGradient(tpx+75, 0, tpx+75-10, 0);
    grd = yellowGradient(grd); ctx.fillStyle = grd;
    ctx.fillRect(tpx+75-10, tpy, 10, 75);

    var grd = ctx.createLinearGradient(0, tpy+75, 0, tpy+75-10);
    grd = yellowGradient(grd); ctx.fillStyle = grd;
    ctx.fillRect(tpx, tpy+75-10, 75, 10);
}

function checkers(x, y) {
    var xeven = (Math.floor(x/2.0)==x/2.0)?0:1;
    var yeven = (Math.floor(y/2.0)==y/2.0)?0:1;
    if (xeven == yeven) {
        return 1;
    }
    return 0;
}

function labelRowsColumns() {
    ctx.fillStyle = "black";
    ctx.font = "18px Consolas";
    for (var i = 0; i < 8; i++) {
        ctx.fillText(8-i, 6, 40+i*75);
        ctx.fillText(letters[i], 24+i*75, 644);
    }
}

function refreshBoard() {
    ctx.strokeStyle = "#000000";
    ctx.lineWidth = 5;
    ctx.strokeRect(25, 25, 600, 600);
    for (var i = 0; i < 8; i++) {
        for (var j = 0; j < 8; j++) {
            if (checkers(i, j) == 0) {
                if (color_scheme == "standard") {
                    ctx.fillStyle = "rgb(207, 133, 60)";
                } else {
                    ctx.fillStyle = "rgb(119, 149, 86)";
                }  
            } else {
                if (color_scheme == "standard") {
                    ctx.fillStyle = "rgb(255, 205, 156)";
                } else {
                    ctx.fillStyle = "rgb(235, 236, 208)";
                }
            }
            
            ctx.fillRect(i*75+25, j*75+25, 75, 75);
        }
    }
}

function setupPieces() {
    for (var i = 0; i < 8; i++) {
        for (var j = 0; j < 8; j++) {
            var index = j*8+i;
            var piece = positions[index];
            //ctx.fillStyle = "black";
            //ctx.font = "18px Consolas";
            //ctx.fillText(piece, 25+i*75, 25+j*75)
            if (piece != 00) {
                if (piece == 01) {
                    ctx.drawImage(black_pawn, 25+i*75, 25+j*75, 75, 75);
                } else if (piece == 02) {
                    ctx.drawImage(black_rook, 25+i*75, 25+j*75, 75, 75);
                } else if (piece == 03) {
                    ctx.drawImage(black_knight, 25+i*75, 25+j*75, 75, 75);
                } else if (piece == 04) {
                    ctx.drawImage(black_bishop, 25+i*75, 25+j*75, 75, 75);
                } else if (piece == 05) {
                    ctx.drawImage(black_queen, 25+i*75, 25+j*75, 75, 75);
                } else if (piece == 06) {
                    ctx.drawImage(black_king, 25+i*75, 25+j*75, 75, 75);
                }

                if (piece == 11) {
                    ctx.drawImage(white_pawn, 25+i*75, 25+j*75, 75, 75);
                } else if (piece == 12) {
                    ctx.drawImage(white_rook, 25+i*75, 25+j*75, 75, 75);
                } else if (piece == 13) {
                    ctx.drawImage(white_knight, 25+i*75, 25+j*75, 75, 75);
                } else if (piece == 14) {
                    ctx.drawImage(white_bishop, 25+i*75, 25+j*75, 75, 75);
                } else if (piece == 15) {
                    ctx.drawImage(white_queen, 25+i*75, 25+j*75, 75, 75);
                } else if (piece == 16) {
                    ctx.drawImage(white_king, 25+i*75, 25+j*75, 75, 75);
                }
            }
        }
    }
}

function completeReset() {
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    refreshBoard();
    labelRowsColumns();
    setupPieces();
}

canvas.addEventListener("mousemove", function(e) { 
    var cRect = canvas.getBoundingClientRect();
    mouseX = Math.round(e.clientX - cRect.left);
    mouseY = Math.round(e.clientY - cRect.top);
    var tempx = Math.floor((mouseX-25)/75);
    var tempy = Math.floor((mouseY-25)/75);
    if (tempx != boardIndexX || tempy != boardIndexY) {
        boardIndexX = tempx;
        boardIndexY = tempy;
        completeReset();
        if (tempx>=0&&tempx<8&&tempy>=0&&tempy<8) {
            glowOutline(tempx, tempy);
        }
    }
});

completeReset();
