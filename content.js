/**
 * SAY IT - Speak & Translate the selected Text
 * By : Mahmoud Aly
 * engma7moud3ly@gmail.com
 */


//pop up menu appers when user select a text on pressing CTRL

var img = document.createElement('img');
img.setAttribute("id","say");
img.setAttribute("src","https://raw.githubusercontent.com/Ma7moud3ly/say-it/master/say.png");
img.style.cssText='display:inline-block;height:20px;vertical-align: middle;'
var label = document.createElement('label');
label.setAttribute("id","text");
var div = document.createElement('div');
div.setAttribute("id","pop");
div.style.cssText='position:absolute;top:200px;left:200px;display:inline-block;z-index:100;background: #aba9a9;color: blue;text-align: center;vertical-align: middle;padding: 2px;';
div.appendChild(img);
div.appendChild(label);
document.body.appendChild(div);

var selectedText = '';
//pop up menu
var pop = document.getElementById("pop")
//say button
var say = document.getElementById("say")
//the selected text label
var text = document.getElementById("text")

//when click on say button tts speaks the selected text
say.addEventListener("click", function () {
    chrome.runtime.sendMessage({ toSay: selectedText }, function () { });
});
//open selected text in google translate (en->ar)
text.addEventListener("click", function () {
    window.open('https://translate.google.com.eg/?hl=ar#view=home&op=translate&sl=en&tl=ar&text=' + selectedText)
});
//hide text selection menu
pop.style.visibility = "hidden"

function getSelectedText(event) {
    //set menu position near to the selected text
    var popX = event.pageX //+ event.offsetX;
    var popY = event.pageY + event.offsetY;
    //when user press on CTRL key get selected text
    if (event.ctrlKey) {
        var t = (document.all) ? document.selection.createRange().text : document.getSelection();
        text.innerText = t;
        pop.style.visibility = "visible"
        if (text.innerText.length == 0) {
            pop.style.visibility = "hidden"
            return;
        }
        if (text.innerText != selectedText) {
            pop.style.left = popX + 'px';
            pop.style.top = popY + 'px';
        }
        selectedText = text.innerText;
        //when CTRL not pressed, hide pop menu     
    } else {
        pop.style.visibility = "hidden"
    }
}

//extract selected text on mouse selection events..
document.onmouseup = getSelectedText;
if (!document.all) document.captureEvents(Event.MOUSEUP);


