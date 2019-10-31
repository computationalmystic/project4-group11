var urlsmall = "http://augur.osshealth.io:5000/api/unstable/repo-groups/24/repos/21625/pull-requests-merge-contributor-new";
var url = "http://augur.osshealth.io:5000/api/unstable/repos";            
var Contributors;
var keys;
$(document).ready(function(){
    hide();
    $.getJSON(url, function(result){
        //console.dir(result);
        Contributors = result;
        $(".loader").hide();
        show();
        keys = Object.keys(Contributors[0]);
        listOptions(Contributors, keys);
    
        

    });
    
});

function displayTable(combined){    
//    console.dir(combined);
    var container = document.getElementById("bar-horzontal");
    var leftcolumn = document.getElementById("column1");
    for(var i = 0, len = combined.length; i < len; i++){
        //creates the list to the left of the table that displays the key name, currently just repo
        var bar = document.createElement("div");
        bar.setAttribute("id", "bardata");
        bar.innerHTML = combined[i].count;
        //sets the color of the boxes and the width
        bar.style = "background: " + randDarkColor() + "; width: " + combined[i].count/20 + "%;";
        container.appendChild(bar);
        
        
        //creates the table bars with the text inside
        var list = document.createElement("div");
        list.setAttribute("id", "tablelist");        
        list.innerHTML = combined[i].id;
        leftcolumn.appendChild(list);
    }   
}
    
function randDarkColor() {
    //console.log(Contributors);
  var lum = -0.25;
  var hex = String('#' + Math.random().toString(16).slice(2, 8).toUpperCase()).replace(/[^0-9a-f]/gi, '');
    
  if (hex.length < 6) {
    hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
  }
    //console.dir(hex);
  var rgb = "#", c, i;
  for (i = 0; i < 3; i++) {
    c = parseInt(hex.substr(i * 2, 2), 16);
      //console.dir(c);
    c = Math.round(Math.min(Math.max(0, c + (c * lum)), 255)).toString(16);
    rgb += ("00" + c).substr(c.length);
  }
  return rgb;
}

function listOptions(Contributors, keys){
    //console.dir(Object.keys(Contributors[0]));
    var list = document.getElementById("dropdownlist");
    var keys = Object.keys(Contributors[0]);
    for(var i = 0, len = keys.length; i < len; i++ ){
        var add = document.createElement("p");
        add.setAttribute("id", "items");
        
        add.setAttribute("onclick", 'loadTable("' + keys[i] + '")');
        
        add.innerHTML = keys[i];
        list.appendChild(add);
    } 
    //call the table function on the items.innerHtml
    
}
function loadTable(keyName){
    //console.log(keyName);
    $("#h4").show();
    $(".row").show();
    var repo = [];
    var count = [];
    var combined = [];

    for(let c of Contributors){
            if(repo.includes(c[keyName])){
                count[repo.indexOf(c[keyName])] += 1;
            }
            else{
                repo.push(c[keyName]);
                count.push(1);
            }  

        }
    for(var i = 0, len = repo.length; i < len; i++){
        var group = {id: repo[i], count: count[i]};
        combined.push(group); 
    }
    displayTable(combined);
}
    
            



//            for(var i = 0, len = Contributors.length; i < len; i++){
//                if(repo.includes(Contributors[i].repo_group_id)){
//                    count[repo.indexOf(Contributors[i].repo_group_id)] += 1;
//                }
//                else{
//                    repo.push(Contributors[i].repo_group_id);
//                    count.push(1);
//                }  
//            }
//            for(var i = 0, len = repo.length; i < len; i++){
//                var group = {id: repo[i], count: count[i]};
//                combined.push(group); 
//            }
//    //            console.dir(combined);
//
//        displayTable(combined);
//        }

function hide(){
    $(".row").hide();
    $("#button1").hide();
    $(".dropdown").hide();
    $("#h3").hide();
    $("#h4").hide();
}
function show(){
    $("#button1").show();
    $("#h3").show();        
    $(".dropdown").show();
}
//function setTable(){
//    
//}

