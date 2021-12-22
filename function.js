var count = 0;
var alert_count = 0;

function playGame() {
    var Name;

    //기본 선물 환경에서 사람뽑기 화면으로 바뀐다.
    if (count == 0) {
        document.getElementById("startIMG").remove();
        document.getElementById("board").innerHTML = "<span id=" + "winning" + "></span>";
        document.getElementById("log").innerText = "";
        count++;
    }

    Name = initName();
    Game(Name);
    //textarea에서 입력후 enter 단위로 나누는 함수
    function initName() {
        var text = document.getElementById("inputName").value;
        var splitText = text.split("\n");
        return splitText;
    }

    //실질적으로 Game을 주도하는 함수
    function Game(Name) {
        var count, tempNum;
        count = Name.length;

        while (1) {
            tempNum = Math.floor(Math.random() * count);
            if (checkRepeat(Name[tempNum], count)) {
                document.getElementById("winning").innerText = Name[tempNum];
                document.getElementById("log").innerText += Name[tempNum] + ",";
                break;
            }
        }
    }

    //선물은 한사람이 여러분 줄 수 없다 log 값을 인식하여 중복을 피한다.
    function checkRepeat(Name, count) {
        var text = $("#log").text();
        var splitText = text.split(",");
        if (count < splitText.length) {
            //한번 반복을 돌리면 경고후 다음부터는 자유롭게 돌린다.
            if (alert_count == 0) {
                alert("한번 실행을 완료하였고 이제부터는 중복합니다.");
                alert_count++;
            }
            return 1;
        }
        for (var i = 0; i < splitText.length; i++) {
            if (splitText[i] == Name) return 0; //같으면 0을 다시한번 돌린다.
        }
        return 1;
    }
}

function before() {
    //before버튼을 누르는 경우 마지막 log를 지운다.
    var text = $("#log").text();
    var splitText = text.split(",");

    document.getElementById("log").innerText = "";

    for (var i = 0; i < splitText.length - 2; i++) {
        document.getElementById("log").innerText += splitText[i] + ",";
    }
}
